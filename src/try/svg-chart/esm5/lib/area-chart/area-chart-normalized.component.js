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
            var total = 0;
            try {
                for (var _c = tslib_1.__values(this_1.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    var d = group.series.find(function (item) {
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
                    var d = group.series.find(function (item) {
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
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, tslib_1.__spread(values));
            var max = Math.max.apply(Math, tslib_1.__spread(values));
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
            var min = Math.min.apply(Math, tslib_1.__spread(values));
            var max = Math.max.apply(Math, tslib_1.__spread(values));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC1ub3JtYWxpemVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2FyZWEtY2hhcnQvYXJlYS1jaGFydC1ub3JtYWxpemVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFTL0U7SUFBa0Qsd0RBQWtCO0lBUHBFO1FBQUEscUVBeVZDO1FBaFZVLFlBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixpQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QixvQkFBYyxHQUFHLE9BQU8sQ0FBQztRQVN6QixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixXQUFLLEdBQVEsV0FBVyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLG9CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG9CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHdCQUFr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RUFBTTtJQUM1QjtRQUF0QyxZQUFZLENBQUMsdUJBQXVCLENBQUM7MENBQXdCLFdBQVc7K0VBQU07SUEwTi9FO1FBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7OzttRUFJMUI7SUE3UFUsNEJBQTRCO1FBUHhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQ0FBcUM7WUFDL0MsdzBIQUFrRDtZQUNsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUUvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FDdEMsQ0FBQztPQUNXLDRCQUE0QixDQWtWeEM7SUFBRCxtQ0FBQztDQUFBLEFBbFZELENBQWtELGtCQUFrQixHQWtWbkU7U0FsVlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2NhbGVMaW5lYXIsIHNjYWxlUG9pbnQsIHNjYWxlVGltZSB9IGZyb20gJ2QzLXNjYWxlJztcbmltcG9ydCB7IGN1cnZlTGluZWFyIH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQvYmFzZS1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBnZXRVbmlxdWVYRG9tYWluVmFsdWVzLCBnZXRTY2FsZVR5cGUgfSBmcm9tICcuLi9jb21tb24vZG9tYWluLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXN2Zy1jaGFydHMtYXJlYS1jaGFydC1ub3JtYWxpemVkJyxcbiAgdGVtcGxhdGVVcmw6ICdhcmVhLWNoYXJ0LW5vcm1hbGl6ZWQudGVtcGxhdGUuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQvYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFyZWFDaGFydE5vcm1hbGl6ZWRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGxlZ2VuZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsZWdlbmRUaXRsZSA9ICdMZWdlbmQnO1xuICBASW5wdXQoKSBsZWdlbmRQb3NpdGlvbiA9ICdyaWdodCc7XG4gIEBJbnB1dCgpIHhBeGlzO1xuICBASW5wdXQoKSB5QXhpcztcbiAgQElucHV0KCkgc2hvd1hBeGlzTGFiZWw7XG4gIEBJbnB1dCgpIHNob3dZQXhpc0xhYmVsO1xuICBASW5wdXQoKSB4QXhpc0xhYmVsO1xuICBASW5wdXQoKSB5QXhpc0xhYmVsO1xuICBASW5wdXQoKSB0aW1lbGluZTtcbiAgQElucHV0KCkgZ3JhZGllbnQ7XG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXMgPSB0cnVlO1xuICBASW5wdXQoKSBjdXJ2ZTogYW55ID0gY3VydmVMaW5lYXI7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHNjaGVtZVR5cGU6IHN0cmluZztcbiAgQElucHV0KCkgdHJpbVhBeGlzVGlja3MgPSB0cnVlO1xuICBASW5wdXQoKSB0cmltWUF4aXNUaWNrcyA9IHRydWU7XG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aCA9IDE2O1xuICBASW5wdXQoKSBtYXhZQXhpc1RpY2tMZW5ndGggPSAxNjtcbiAgQElucHV0KCkgeEF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB5QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIHhBeGlzVGlja3M6IGFueVtdO1xuICBASW5wdXQoKSB5QXhpc1RpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgcm91bmREb21haW5zID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ3Nlcmllc1Rvb2x0aXBUZW1wbGF0ZScpIHNlcmllc1Rvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcbiAgc2NhbGVUeXBlOiBzdHJpbmc7XG4gIHhEb21haW46IGFueVtdO1xuICB4U2V0OiBhbnlbXTsgLy8gdGhlIHNldCBvZiBhbGwgdmFsdWVzIG9uIHRoZSBYIEF4aXNcbiAgeURvbWFpbjogYW55W107XG4gIHNlcmllc0RvbWFpbjogYW55O1xuICB4U2NhbGU6IGFueTtcbiAgeVNjYWxlOiBhbnk7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBjbGlwUGF0aElkOiBzdHJpbmc7XG4gIGNsaXBQYXRoOiBzdHJpbmc7XG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIG1hcmdpbiA9IFsxMCwgMjAsIDEwLCAyMF07XG4gIHRvb2x0aXBBcmVhczogYW55W107XG4gIGhvdmVyZWRWZXJ0aWNhbDogYW55OyAvLyB0aGUgdmFsdWUgb2YgdGhlIHggYXhpcyB0aGF0IGlzIGhvdmVyZWQgb3ZlclxuICB4QXhpc0hlaWdodCA9IDA7XG4gIHlBeGlzV2lkdGggPSAwO1xuICBmaWx0ZXJlZERvbWFpbjogYW55O1xuICBsZWdlbmRPcHRpb25zOiBhbnk7XG5cbiAgdGltZWxpbmVXaWR0aDogYW55O1xuICB0aW1lbGluZUhlaWdodCA9IDUwO1xuICB0aW1lbGluZVhTY2FsZTogYW55O1xuICB0aW1lbGluZVlTY2FsZTogYW55O1xuICB0aW1lbGluZVhEb21haW46IGFueTtcbiAgdGltZWxpbmVUcmFuc2Zvcm06IGFueTtcbiAgdGltZWxpbmVQYWRkaW5nID0gMTA7XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW4sXG4gICAgICBzaG93WEF4aXM6IHRoaXMueEF4aXMsXG4gICAgICBzaG93WUF4aXM6IHRoaXMueUF4aXMsXG4gICAgICB4QXhpc0hlaWdodDogdGhpcy54QXhpc0hlaWdodCxcbiAgICAgIHlBeGlzV2lkdGg6IHRoaXMueUF4aXNXaWR0aCxcbiAgICAgIHNob3dYTGFiZWw6IHRoaXMuc2hvd1hBeGlzTGFiZWwsXG4gICAgICBzaG93WUxhYmVsOiB0aGlzLnNob3dZQXhpc0xhYmVsLFxuICAgICAgc2hvd0xlZ2VuZDogdGhpcy5sZWdlbmQsXG4gICAgICBsZWdlbmRUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXG4gICAgICBsZWdlbmRQb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMudGltZWxpbmUpIHtcbiAgICAgIHRoaXMuZGltcy5oZWlnaHQgLT0gKHRoaXMudGltZWxpbmVIZWlnaHQgKyB0aGlzLm1hcmdpblsyXSArIHRoaXMudGltZWxpbmVQYWRkaW5nKTtcbiAgICB9XG5cbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcbiAgICBpZiAodGhpcy5maWx0ZXJlZERvbWFpbikge1xuICAgICAgdGhpcy54RG9tYWluID0gdGhpcy5maWx0ZXJlZERvbWFpbjtcbiAgICB9XG5cbiAgICB0aGlzLnlEb21haW4gPSB0aGlzLmdldFlEb21haW4oKTtcbiAgICB0aGlzLnNlcmllc0RvbWFpbiA9IHRoaXMuZ2V0U2VyaWVzRG9tYWluKCk7XG5cbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKHRoaXMueERvbWFpbiwgdGhpcy5kaW1zLndpZHRoKTtcbiAgICB0aGlzLnlTY2FsZSA9IHRoaXMuZ2V0WVNjYWxlKHRoaXMueURvbWFpbiwgdGhpcy5kaW1zLmhlaWdodCk7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMueFNldC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdmFsID0gdGhpcy54U2V0W2ldO1xuICAgICAgbGV0IGQwID0gMDtcblxuICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XG4gICAgICAgIGNvbnN0IGQgPSBncm91cC5zZXJpZXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICBsZXQgYSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICBsZXQgYiA9IHZhbDtcbiAgICAgICAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgICAgICAgYSA9IGEudmFsdWVPZigpO1xuICAgICAgICAgICAgYiA9IGIudmFsdWVPZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgdG90YWwgKz0gZC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgICBsZXQgZCA9IGdyb3VwLnNlcmllcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgIGxldCBhID0gaXRlbS5uYW1lO1xuICAgICAgICAgIGxldCBiID0gdmFsO1xuICAgICAgICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICAgICAgICBhID0gYS52YWx1ZU9mKCk7XG4gICAgICAgICAgICBiID0gYi52YWx1ZU9mKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZCkge1xuICAgICAgICAgIGQuZDAgPSBkMDtcbiAgICAgICAgICBkLmQxID0gZDAgKyBkLnZhbHVlO1xuICAgICAgICAgIGQwICs9IGQudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZCA9IHtcbiAgICAgICAgICAgIG5hbWU6IHZhbCxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgZDAsXG4gICAgICAgICAgICBkMTogZDBcbiAgICAgICAgICB9O1xuICAgICAgICAgIGdyb3VwLnNlcmllcy5wdXNoKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvdGFsID4gMCkge1xuICAgICAgICAgIGQuZDAgPSAoZC5kMCAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgICBkLmQxID0gKGQuZDEgKiAxMDApIC8gdG90YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZC5kMCA9IDA7XG4gICAgICAgICAgZC5kMSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVRpbWVsaW5lKCk7XG5cbiAgICB0aGlzLnNldENvbG9ycygpO1xuICAgIHRoaXMubGVnZW5kT3B0aW9ucyA9IHRoaXMuZ2V0TGVnZW5kT3B0aW9ucygpO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7IHRoaXMuZGltcy54T2Zmc2V0IH0gLCAkeyB0aGlzLm1hcmdpblswXSB9KWA7XG5cbiAgICB0aGlzLmNsaXBQYXRoSWQgPSAnY2xpcCcgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5jbGlwUGF0aCA9IGB1cmwoIyR7dGhpcy5jbGlwUGF0aElkfSlgO1xuICB9XG5cbiAgdXBkYXRlVGltZWxpbmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGltZWxpbmUpIHtcbiAgICAgIHRoaXMudGltZWxpbmVXaWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICAgIHRoaXMudGltZWxpbmVYRG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XG4gICAgICB0aGlzLnRpbWVsaW5lWFNjYWxlID0gdGhpcy5nZXRYU2NhbGUodGhpcy50aW1lbGluZVhEb21haW4sIHRoaXMudGltZWxpbmVXaWR0aCk7XG4gICAgICB0aGlzLnRpbWVsaW5lWVNjYWxlID0gdGhpcy5nZXRZU2NhbGUodGhpcy55RG9tYWluLCB0aGlzLnRpbWVsaW5lSGVpZ2h0KTtcbiAgICAgIHRoaXMudGltZWxpbmVUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7IHRoaXMuZGltcy54T2Zmc2V0IH0sICR7IC10aGlzLm1hcmdpblsyXSB9KWA7XG4gICAgfVxuICB9XG5cbiAgZ2V0WERvbWFpbigpOiBhbnlbXSB7XG4gICAgbGV0IHZhbHVlcyA9IGdldFVuaXF1ZVhEb21haW5WYWx1ZXModGhpcy5yZXN1bHRzKTtcblxuICAgIHRoaXMuc2NhbGVUeXBlID0gZ2V0U2NhbGVUeXBlKHZhbHVlcyk7XG4gICAgbGV0IGRvbWFpbiA9IFtdO1xuXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xuICAgICAgZG9tYWluID0gW25ldyBEYXRlKG1pbiksIG5ldyBEYXRlKG1heCldO1xuICAgICAgdGhpcy54U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBhRGF0ZSA9IGEuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBiRGF0ZSA9IGIuZ2V0VGltZSgpO1xuICAgICAgICBpZiAoYURhdGUgPiBiRGF0ZSkgeyByZXR1cm4gMTsgfVxuICAgICAgICBpZiAoYkRhdGUgPiBhRGF0ZSkgeyByZXR1cm4gLTE7IH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IE51bWJlcih2KSk7XG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcbiAgICAgIGRvbWFpbiA9IFttaW4sIG1heF07XG4gICAgICAvLyBVc2UgY29tcGFyZSBmdW5jdGlvbiB0byBzb3J0IG51bWJlcnMgbnVtZXJpY2FsbHlcbiAgICAgIHRoaXMueFNldCA9IFsuLi52YWx1ZXNdLnNvcnQoKGEsIGIpID0+IChhIC0gYikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb21haW4gPSB2YWx1ZXM7XG4gICAgICB0aGlzLnhTZXQgPSB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbWFpbjtcbiAgfVxuXG4gIGdldFlEb21haW4oKTogYW55W10ge1xuICAgIHJldHVybiBbMCwgMTAwXTtcbiAgfVxuXG4gIGdldFNlcmllc0RvbWFpbigpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLm5hbWUpO1xuICB9XG5cbiAgZ2V0WFNjYWxlKGRvbWFpbiwgd2lkdGgpOiBhbnkge1xuICAgIGxldCBzY2FsZTtcblxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlVGltZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlTGluZWFyKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlUG9pbnQoKVxuICAgICAgICAucGFkZGluZygwLjEpO1xuICAgIH1cblxuICAgIHNjYWxlXG4gICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgIC5kb21haW4oZG9tYWluKTtcblxuICAgIHJldHVybiB0aGlzLnJvdW5kRG9tYWlucyA/IHNjYWxlLm5pY2UoKSA6IHNjYWxlO1xuICB9XG5cbiAgZ2V0WVNjYWxlKGRvbWFpbiwgaGVpZ2h0KTogYW55IHtcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgIC5kb21haW4oZG9tYWluKTtcbiAgICByZXR1cm4gdGhpcy5yb3VuZERvbWFpbnMgPyBzY2FsZS5uaWNlKCkgOiBzY2FsZTtcbiAgfVxuXG4gIHVwZGF0ZURvbWFpbihkb21haW4pOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlcmVkRG9tYWluID0gZG9tYWluO1xuICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZmlsdGVyZWREb21haW47XG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSh0aGlzLnhEb21haW4sIHRoaXMuZGltcy53aWR0aCk7XG4gIH1cblxuICB1cGRhdGVIb3ZlcmVkVmVydGljYWwoaXRlbSk6IHZvaWQge1xuICAgIHRoaXMuaG92ZXJlZFZlcnRpY2FsID0gaXRlbS52YWx1ZTtcbiAgICB0aGlzLmRlYWN0aXZhdGVBbGwoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBoaWRlQ2lyY2xlcygpOiB2b2lkIHtcbiAgICB0aGlzLmhvdmVyZWRWZXJ0aWNhbCA9IG51bGw7XG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEsIHNlcmllcz8pOiB2b2lkIHtcbiAgICBpZiAoc2VyaWVzKSB7XG4gICAgICBkYXRhLnNlcmllcyA9IHNlcmllcy5uYW1lO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xuICB9XG5cbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xuICAgIGxldCBkb21haW47XG4gICAgaWYgKHRoaXMuc2NoZW1lVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBkb21haW4gPSB0aGlzLnNlcmllc0RvbWFpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdGhpcy55RG9tYWluO1xuICAgIH1cblxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCB0aGlzLnNjaGVtZVR5cGUsIGRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xuICB9XG5cbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgc2NhbGVUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXG4gICAgICBjb2xvcnM6IHVuZGVmaW5lZCxcbiAgICAgIGRvbWFpbjogW10sXG4gICAgICB0aXRsZTogdW5kZWZpbmVkLFxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cbiAgICB9O1xuICAgIGlmIChvcHRzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMuc2VyaWVzRG9tYWluO1xuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycztcbiAgICAgIG9wdHMudGl0bGUgPSB0aGlzLmxlZ2VuZFRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzLmRvbWFpbiA9IHRoaXMueURvbWFpbjtcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnMuc2NhbGU7XG4gICAgfVxuICAgIHJldHVybiBvcHRzO1xuICB9XG5cbiAgdXBkYXRlWUF4aXNXaWR0aCh7IHdpZHRoIH0pOiB2b2lkIHtcbiAgICB0aGlzLnlBeGlzV2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlWEF4aXNIZWlnaHQoeyBoZWlnaHQgfSk6IHZvaWQge1xuICAgIHRoaXMueEF4aXNIZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG9uQWN0aXZhdGUoaXRlbSkge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZTtcbiAgICB9KTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbIGl0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllcyBdO1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XG4gIH1cblxuICBvbkRlYWN0aXZhdGUoaXRlbSkge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcblxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVBbGwoKSB7XG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLnRoaXMuYWN0aXZlRW50cmllc107XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiB0aGlzLmFjdGl2ZUVudHJpZXMpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGVudHJ5LCBlbnRyaWVzOiBbXSB9KTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW107XG4gIH1cblxufVxuIl19