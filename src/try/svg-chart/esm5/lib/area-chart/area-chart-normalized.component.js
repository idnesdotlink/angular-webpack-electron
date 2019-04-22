import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, HostListener, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { curveLinear } from 'd3-shape';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { id } from '../utils/id';
import { getUniqueXDomainValues, getScaleType } from '../common/domain.helper';
var AreaChartNormalizedComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AreaChartNormalizedComponent, _super);
    function AreaChartNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartNormalizedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        var _loop_1 = function (i) {
            var e_1, _a, e_2, _b;
            var val = this_1.xSet[i];
            var d0 = 0;
            var d = void 0;
            var total = 0;
            try {
                for (var _c = tslib_1.__values(this_1.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    d = group.series.find(function (item) {
                        var a = item.name;
                        var b = val;
                        if (_this.scaleType === 'time') {
                            a = a.valueOf();
                            b = b.valueOf();
                        }
                        return a === b;
                    });
                    if (d) {
                        total += d.value;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = tslib_1.__values(this_1.results), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var group = _f.value;
                    d = group.series.find(function (item) {
                        var a = item.name;
                        var b = val;
                        if (_this.scaleType === 'time') {
                            a = a.valueOf();
                            b = b.valueOf();
                        }
                        return a === b;
                    });
                    if (d) {
                        d.d0 = d0;
                        d.d1 = d0 + d.value;
                        d0 += d.value;
                    }
                    else {
                        d = {
                            name: val,
                            value: 0,
                            d0: d0,
                            d1: d0
                        };
                        group.series.push(d);
                    }
                    if (total > 0) {
                        d.d0 = (d.d0 * 100) / total;
                        d.d1 = (d.d1 * 100) / total;
                    }
                    else {
                        d.d0 = 0;
                        d.d1 = 0;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        var this_1 = this;
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_1(i);
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    AreaChartNormalizedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartNormalizedComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        var min;
        var max;
        if (this.scaleType === 'time') {
            min = Math.min.apply(Math, tslib_1.__spread(values));
            max = Math.max.apply(Math, tslib_1.__spread(values));
            domain = [new Date(min), new Date(max)];
            this.xSet = tslib_1.__spread(values).sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate) {
                    return 1;
                }
                if (bDate > aDate) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            min = Math.min.apply(Math, tslib_1.__spread(values));
            max = Math.max.apply(Math, tslib_1.__spread(values));
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = tslib_1.__spread(values).sort(function (a, b) { return (a - b); });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartNormalizedComponent.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalizedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalizedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .padding(0.1);
        }
        scale
            .range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartNormalizedComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartNormalizedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartNormalizedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartNormalizedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartNormalizedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = tslib_1.__spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = tslib_1.__spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.deactivateAll = function () {
        var e_3, _a;
        this.activeEntries = tslib_1.__spread(this.activeEntries);
        try {
            for (var _b = tslib_1.__values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                this.deactivate.emit({ value: entry, entries: [] });
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.activeEntries = [];
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "legend", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "legendTitle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "legendPosition", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "xAxis", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "yAxis", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "showXAxisLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "showYAxisLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "xAxisLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "yAxisLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "timeline", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "showGridLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "curve", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AreaChartNormalizedComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AreaChartNormalizedComponent.prototype, "schemeType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "trimXAxisTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "trimYAxisTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AreaChartNormalizedComponent.prototype, "xAxisTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AreaChartNormalizedComponent.prototype, "yAxisTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "roundDomains", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AreaChartNormalizedComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AreaChartNormalizedComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        ContentChild('tooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], AreaChartNormalizedComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        ContentChild('seriesTooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], AreaChartNormalizedComponent.prototype, "seriesTooltipTemplate", void 0);
    tslib_1.__decorate([
        HostListener('mouseleave'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], AreaChartNormalizedComponent.prototype, "hideCircles", null);
    AreaChartNormalizedComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-area-chart-normalized',
            template: "<ng-svg-charts-chart\n[view]=\"[width, height]\"\n[showLegend]=\"legend\"\n[legendOptions]=\"legendOptions\"\n[activeEntries]=\"activeEntries\"\n[animations]=\"animations\"\n(legendLabelClick)=\"onClick($event)\"\n(legendLabelActivate)=\"onActivate($event)\"\n(legendLabelDeactivate)=\"onDeactivate($event)\">\n<svg:defs>\n  <svg:clipPath [attr.id]=\"clipPathId\">\n    <svg:rect\n      [attr.width]=\"dims.width + 10\"\n      [attr.height]=\"dims.height + 10\"\n      [attr.transform]=\"'translate(-5, -5)'\"/>\n  </svg:clipPath>\n</svg:defs>\n<svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n  <svg:g ng-svg-charts-x-axis\n    *ngIf=\"xAxis\"\n    [xScale]=\"xScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showXAxisLabel\"\n    [labelText]=\"xAxisLabel\"\n    [trimTicks]=\"trimXAxisTicks\"\n    [maxTickLength]=\"maxXAxisTickLength\"\n    [tickFormatting]=\"xAxisTickFormatting\"\n    [ticks]=\"xAxisTicks\"\n    (dimensionsChanged)=\"updateXAxisHeight($event)\">\n  </svg:g>\n  <svg:g ng-svg-charts-y-axis\n    *ngIf=\"yAxis\"\n    [yScale]=\"yScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showYAxisLabel\"\n    [labelText]=\"yAxisLabel\"\n    [trimTicks]=\"trimYAxisTicks\"\n    [maxTickLength]=\"maxYAxisTickLength\"\n    [tickFormatting]=\"yAxisTickFormatting\"\n    [ticks]=\"yAxisTicks\"\n    (dimensionsChanged)=\"updateYAxisWidth($event)\">\n  </svg:g>\n  <svg:g [attr.clip-path]=\"clipPath\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-area-series\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [activeEntries]=\"activeEntries\"\n        [gradient]=\"gradient\"\n        normalized=\"true\"\n        [curve]=\"curve\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n\n    <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n      <svg:g ng-svg-charts-tooltip-area\n        [dims]=\"dims\"\n        [xSet]=\"xSet\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [results]=\"results\"\n        [colors]=\"colors\"\n        [showPercentage]=\"true\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"seriesTooltipTemplate\"\n        (hover)=\"updateHoveredVertical($event)\"\n      />\n\n      <svg:g *ngFor=\"let series of results\">\n        <svg:g ng-svg-charts-circle-series\n          type=\"stacked\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [activeEntries]=\"activeEntries\"\n          [data]=\"series\"\n          [scaleType]=\"scaleType\"\n          [visibleValue]=\"hoveredVertical\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          (select)=\"onClick($event, series)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </svg:g>\n  </svg:g>\n</svg:g>\n<svg:g ng-svg-charts-timeline\n  *ngIf=\"timeline && scaleType != 'ordinal'\"\n  [attr.transform]=\"timelineTransform\"\n  [results]=\"results\"\n  [view]=\"[timelineWidth, height]\"\n  [height]=\"timelineHeight\"\n  [scheme]=\"scheme\"\n  [customColors]=\"customColors\"\n  [legend]=\"legend\"\n  [scaleType]=\"scaleType\"\n  (onDomainChange)=\"updateDomain($event)\">\n  <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n    <svg:g ng-svg-charts-area-series\n      [xScale]=\"timelineXScale\"\n      [yScale]=\"timelineYScale\"\n      [colors]=\"colors\"\n      [data]=\"series\"\n      [scaleType]=\"scaleType\"\n      [gradient]=\"gradient\"\n      normalized=\"true\"\n      [curve]=\"curve\"\n      [animations]=\"animations\"\n    />\n  </svg:g>\n</svg:g>\n</ng-svg-charts-chart>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
        })
    ], AreaChartNormalizedComponent);
    return AreaChartNormalizedComponent;
}(BaseChartComponent));
export { AreaChartNormalizedComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC1ub3JtYWxpemVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2FyZWEtY2hhcnQvYXJlYS1jaGFydC1ub3JtYWxpemVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFTL0U7SUFBa0Qsd0RBQWtCO0lBUHBFO1FBQUEscUVBNFZDO1FBblZVLFlBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixpQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixvQkFBYyxHQUFHLE9BQU8sQ0FBQztRQVN6QixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixXQUFLLEdBQVEsV0FBVyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLG9CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG9CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHdCQUFr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QyxZQUFZLENBQUMsaUJBQWlCLENBQUM7MENBQWtCLFdBQVc7eUVBQU07SUFDNUI7UUFBdEMsWUFBWSxDQUFDLHVCQUF1QixDQUFDOzBDQUF3QixXQUFXOytFQUFNO0lBNk4vRTtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7bUVBSTFCO0lBaFFVLDRCQUE0QjtRQVB4QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUNBQXFDO1lBQy9DLHcwSEFBa0Q7WUFDbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7T0FDVyw0QkFBNEIsQ0FxVnhDO0lBQUQsbUNBQUM7Q0FBQSxBQXJWRCxDQUFrRCxrQkFBa0IsR0FxVm5FO1NBclZZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNjYWxlTGluZWFyLCBzY2FsZVBvaW50LCBzY2FsZVRpbWUgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBjdXJ2ZUxpbmVhciB9IGZyb20gJ2QzLXNoYXBlJztcblxuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0L2Jhc2UtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuaW1wb3J0IHsgZ2V0VW5pcXVlWERvbWFpblZhbHVlcywgZ2V0U2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL2RvbWFpbi5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLWFyZWEtY2hhcnQtbm9ybWFsaXplZCcsXG4gIHRlbXBsYXRlVXJsOiAnYXJlYS1jaGFydC1ub3JtYWxpemVkLnRlbXBsYXRlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0L2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBsZWdlbmQgPSBmYWxzZTtcbiAgQElucHV0KCkgbGVnZW5kVGl0bGUgPSAnTGVnZW5kJztcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb24gPSAncmlnaHQnO1xuICBASW5wdXQoKSB4QXhpcztcbiAgQElucHV0KCkgeUF4aXM7XG4gIEBJbnB1dCgpIHNob3dYQXhpc0xhYmVsO1xuICBASW5wdXQoKSBzaG93WUF4aXNMYWJlbDtcbiAgQElucHV0KCkgeEF4aXNMYWJlbDtcbiAgQElucHV0KCkgeUF4aXNMYWJlbDtcbiAgQElucHV0KCkgdGltZWxpbmU7XG4gIEBJbnB1dCgpIGdyYWRpZW50O1xuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gdHJ1ZTtcbiAgQElucHV0KCkgY3VydmU6IGFueSA9IGN1cnZlTGluZWFyO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBzY2hlbWVUeXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRyaW1YQXhpc1RpY2tzID0gdHJ1ZTtcbiAgQElucHV0KCkgdHJpbVlBeGlzVGlja3MgPSB0cnVlO1xuICBASW5wdXQoKSBtYXhYQXhpc1RpY2tMZW5ndGggPSAxNjtcbiAgQElucHV0KCkgbWF4WUF4aXNUaWNrTGVuZ3RoID0gMTY7XG4gIEBJbnB1dCgpIHhBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgeUF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB4QXhpc1RpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgeUF4aXNUaWNrczogYW55W107XG4gIEBJbnB1dCgpIHJvdW5kRG9tYWlucyA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCdzZXJpZXNUb29sdGlwVGVtcGxhdGUnKSBzZXJpZXNUb29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIHNjYWxlVHlwZTogc3RyaW5nO1xuICB4RG9tYWluOiBhbnlbXTtcbiAgeFNldDogYW55W107IC8vIHRoZSBzZXQgb2YgYWxsIHZhbHVlcyBvbiB0aGUgWCBBeGlzXG4gIHlEb21haW46IGFueVtdO1xuICBzZXJpZXNEb21haW46IGFueTtcbiAgeFNjYWxlOiBhbnk7XG4gIHlTY2FsZTogYW55O1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgY2xpcFBhdGhJZDogc3RyaW5nO1xuICBjbGlwUGF0aDogc3RyaW5nO1xuICBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBtYXJnaW4gPSBbMTAsIDIwLCAxMCwgMjBdO1xuICB0b29sdGlwQXJlYXM6IGFueVtdO1xuICBob3ZlcmVkVmVydGljYWw6IGFueTsgLy8gdGhlIHZhbHVlIG9mIHRoZSB4IGF4aXMgdGhhdCBpcyBob3ZlcmVkIG92ZXJcbiAgeEF4aXNIZWlnaHQgPSAwO1xuICB5QXhpc1dpZHRoID0gMDtcbiAgZmlsdGVyZWREb21haW46IGFueTtcbiAgbGVnZW5kT3B0aW9uczogYW55O1xuXG4gIHRpbWVsaW5lV2lkdGg6IGFueTtcbiAgdGltZWxpbmVIZWlnaHQgPSA1MDtcbiAgdGltZWxpbmVYU2NhbGU6IGFueTtcbiAgdGltZWxpbmVZU2NhbGU6IGFueTtcbiAgdGltZWxpbmVYRG9tYWluOiBhbnk7XG4gIHRpbWVsaW5lVHJhbnNmb3JtOiBhbnk7XG4gIHRpbWVsaW5lUGFkZGluZyA9IDEwO1xuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luLFxuICAgICAgc2hvd1hBeGlzOiB0aGlzLnhBeGlzLFxuICAgICAgc2hvd1lBeGlzOiB0aGlzLnlBeGlzLFxuICAgICAgeEF4aXNIZWlnaHQ6IHRoaXMueEF4aXNIZWlnaHQsXG4gICAgICB5QXhpc1dpZHRoOiB0aGlzLnlBeGlzV2lkdGgsXG4gICAgICBzaG93WExhYmVsOiB0aGlzLnNob3dYQXhpc0xhYmVsLFxuICAgICAgc2hvd1lMYWJlbDogdGhpcy5zaG93WUF4aXNMYWJlbCxcbiAgICAgIHNob3dMZWdlbmQ6IHRoaXMubGVnZW5kLFxuICAgICAgbGVnZW5kVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxuICAgICAgbGVnZW5kUG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnRpbWVsaW5lKSB7XG4gICAgICB0aGlzLmRpbXMuaGVpZ2h0IC09ICh0aGlzLnRpbWVsaW5lSGVpZ2h0ICsgdGhpcy5tYXJnaW5bMl0gKyB0aGlzLnRpbWVsaW5lUGFkZGluZyk7XG4gICAgfVxuXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XG4gICAgaWYgKHRoaXMuZmlsdGVyZWREb21haW4pIHtcbiAgICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZmlsdGVyZWREb21haW47XG4gICAgfVxuXG4gICAgdGhpcy55RG9tYWluID0gdGhpcy5nZXRZRG9tYWluKCk7XG4gICAgdGhpcy5zZXJpZXNEb21haW4gPSB0aGlzLmdldFNlcmllc0RvbWFpbigpO1xuXG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSh0aGlzLnhEb21haW4sIHRoaXMuZGltcy53aWR0aCk7XG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSh0aGlzLnlEb21haW4sIHRoaXMuZGltcy5oZWlnaHQpO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnhTZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMueFNldFtpXTtcbiAgICAgIGxldCBkMCA9IDA7XG4gICAgICBsZXQgZDogYW55O1xuXG4gICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcbiAgICAgICAgZCA9IGdyb3VwLnNlcmllcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgIGxldCBhID0gaXRlbS5uYW1lO1xuICAgICAgICAgIGxldCBiID0gdmFsO1xuICAgICAgICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICAgICAgICBhID0gYS52YWx1ZU9mKCk7XG4gICAgICAgICAgICBiID0gYi52YWx1ZU9mKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGQpIHtcbiAgICAgICAgICB0b3RhbCArPSBkLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XG4gICAgICAgIGQgPSBncm91cC5zZXJpZXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICBsZXQgYSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICBsZXQgYiA9IHZhbDtcbiAgICAgICAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgICAgICAgYSA9IGEudmFsdWVPZigpO1xuICAgICAgICAgICAgYiA9IGIudmFsdWVPZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGQpIHtcbiAgICAgICAgICBkLmQwID0gZDA7XG4gICAgICAgICAgZC5kMSA9IGQwICsgZC52YWx1ZTtcbiAgICAgICAgICBkMCArPSBkLnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGQgPSB7XG4gICAgICAgICAgICBuYW1lOiB2YWwsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIGQwLFxuICAgICAgICAgICAgZDE6IGQwXG4gICAgICAgICAgfTtcbiAgICAgICAgICBncm91cC5zZXJpZXMucHVzaChkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3RhbCA+IDApIHtcbiAgICAgICAgICBkLmQwID0gKGQuZDAgKiAxMDApIC8gdG90YWw7XG4gICAgICAgICAgZC5kMSA9IChkLmQxICogMTAwKSAvIHRvdGFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGQuZDAgPSAwO1xuICAgICAgICAgIGQuZDEgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVUaW1lbGluZSgpO1xuXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcbiAgICB0aGlzLmxlZ2VuZE9wdGlvbnMgPSB0aGlzLmdldExlZ2VuZE9wdGlvbnMoKTtcblxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMuZGltcy54T2Zmc2V0fSAsICR7dGhpcy5tYXJnaW5bMF19KWA7XG5cbiAgICB0aGlzLmNsaXBQYXRoSWQgPSAnY2xpcCcgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5jbGlwUGF0aCA9IGB1cmwoIyR7dGhpcy5jbGlwUGF0aElkfSlgO1xuICB9XG5cbiAgdXBkYXRlVGltZWxpbmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGltZWxpbmUpIHtcbiAgICAgIHRoaXMudGltZWxpbmVXaWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICAgIHRoaXMudGltZWxpbmVYRG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XG4gICAgICB0aGlzLnRpbWVsaW5lWFNjYWxlID0gdGhpcy5nZXRYU2NhbGUodGhpcy50aW1lbGluZVhEb21haW4sIHRoaXMudGltZWxpbmVXaWR0aCk7XG4gICAgICB0aGlzLnRpbWVsaW5lWVNjYWxlID0gdGhpcy5nZXRZU2NhbGUodGhpcy55RG9tYWluLCB0aGlzLnRpbWVsaW5lSGVpZ2h0KTtcbiAgICAgIHRoaXMudGltZWxpbmVUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5kaW1zLnhPZmZzZXR9LCAkey10aGlzLm1hcmdpblsyXX0pYDtcbiAgICB9XG4gIH1cblxuICBnZXRYRG9tYWluKCk6IGFueVtdIHtcbiAgICBsZXQgdmFsdWVzID0gZ2V0VW5pcXVlWERvbWFpblZhbHVlcyh0aGlzLnJlc3VsdHMpO1xuXG4gICAgdGhpcy5zY2FsZVR5cGUgPSBnZXRTY2FsZVR5cGUodmFsdWVzKTtcbiAgICBsZXQgZG9tYWluID0gW107XG4gICAgbGV0IG1pbjogbnVtYmVyO1xuICAgIGxldCBtYXg6IG51bWJlcjtcblxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xuICAgICAgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcbiAgICAgIGRvbWFpbiA9IFtuZXcgRGF0ZShtaW4pLCBuZXcgRGF0ZShtYXgpXTtcbiAgICAgIHRoaXMueFNldCA9IFsuLi52YWx1ZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgYURhdGUgPSBhLmdldFRpbWUoKTtcbiAgICAgICAgY29uc3QgYkRhdGUgPSBiLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKGFEYXRlID4gYkRhdGUpIHsgcmV0dXJuIDE7IH1cbiAgICAgICAgaWYgKGJEYXRlID4gYURhdGUpIHsgcmV0dXJuIC0xOyB9XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xuICAgICAgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcbiAgICAgIG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xuICAgICAgLy8gVXNlIGNvbXBhcmUgZnVuY3Rpb24gdG8gc29ydCBudW1iZXJzIG51bWVyaWNhbGx5XG4gICAgICB0aGlzLnhTZXQgPSBbLi4udmFsdWVzXS5zb3J0KChhLCBiKSA9PiAoYSAtIGIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdmFsdWVzO1xuICAgICAgdGhpcy54U2V0ID0gdmFsdWVzO1xuICAgIH1cblxuICAgIHJldHVybiBkb21haW47XG4gIH1cblxuICBnZXRZRG9tYWluKCk6IGFueVtdIHtcbiAgICByZXR1cm4gWzAsIDEwMF07XG4gIH1cblxuICBnZXRTZXJpZXNEb21haW4oKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5uYW1lKTtcbiAgfVxuXG4gIGdldFhTY2FsZShkb21haW4sIHdpZHRoKTogYW55IHtcbiAgICBsZXQgc2NhbGU7XG5cbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgc2NhbGUgPSBzY2FsZVRpbWUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgc2NhbGUgPSBzY2FsZUxpbmVhcigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgc2NhbGUgPSBzY2FsZVBvaW50KClcbiAgICAgICAgLnBhZGRpbmcoMC4xKTtcbiAgICB9XG5cbiAgICBzY2FsZVxuICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAuZG9tYWluKGRvbWFpbik7XG5cbiAgICByZXR1cm4gdGhpcy5yb3VuZERvbWFpbnMgPyBzY2FsZS5uaWNlKCkgOiBzY2FsZTtcbiAgfVxuXG4gIGdldFlTY2FsZShkb21haW4sIGhlaWdodCk6IGFueSB7XG4gICAgY29uc3Qgc2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgICAuZG9tYWluKGRvbWFpbik7XG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XG4gIH1cblxuICB1cGRhdGVEb21haW4oZG9tYWluKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXJlZERvbWFpbiA9IGRvbWFpbjtcbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmZpbHRlcmVkRG9tYWluO1xuICAgIHRoaXMueFNjYWxlID0gdGhpcy5nZXRYU2NhbGUodGhpcy54RG9tYWluLCB0aGlzLmRpbXMud2lkdGgpO1xuICB9XG5cbiAgdXBkYXRlSG92ZXJlZFZlcnRpY2FsKGl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmhvdmVyZWRWZXJ0aWNhbCA9IGl0ZW0udmFsdWU7XG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgaGlkZUNpcmNsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5ob3ZlcmVkVmVydGljYWwgPSBudWxsO1xuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbCgpO1xuICB9XG5cbiAgb25DbGljayhkYXRhLCBzZXJpZXM/KTogdm9pZCB7XG4gICAgaWYgKHNlcmllcykge1xuICAgICAgZGF0YS5zZXJpZXMgPSBzZXJpZXMubmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICBsZXQgZG9tYWluO1xuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgZG9tYWluID0gdGhpcy5zZXJpZXNEb21haW47XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbWFpbiA9IHRoaXMueURvbWFpbjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgdGhpcy5zY2hlbWVUeXBlLCBkb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcbiAgfVxuXG4gIGdldExlZ2VuZE9wdGlvbnMoKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIHNjYWxlVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxuICAgICAgY29sb3JzOiB1bmRlZmluZWQsXG4gICAgICBkb21haW46IFtdLFxuICAgICAgdGl0bGU6IHVuZGVmaW5lZCxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXG4gICAgfTtcbiAgICBpZiAob3B0cy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnNlcmllc0RvbWFpbjtcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICBvcHRzLnRpdGxlID0gdGhpcy5sZWdlbmRUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnlEb21haW47XG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzLnNjYWxlO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbiAgfVxuXG4gIHVwZGF0ZVlBeGlzV2lkdGgoeyB3aWR0aCB9KTogdm9pZCB7XG4gICAgdGhpcy55QXhpc1dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZVhBeGlzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcbiAgICB0aGlzLnhBeGlzSGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBvbkFjdGl2YXRlKGl0ZW0pIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc107XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZShpdGVtKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xuXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZUFsbCgpIHtcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHRoaXMuYWN0aXZlRW50cmllcykge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogZW50cnksIGVudHJpZXM6IFtdIH0pO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbXTtcbiAgfVxuXG59XG4iXX0=