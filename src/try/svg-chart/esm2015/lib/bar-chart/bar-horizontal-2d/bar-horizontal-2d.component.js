import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions } from '../../common/view-dimensions.helper';
import { ColorHelper } from '../../common/color.helper';
import { BaseChartComponent } from '../../common/base-chart/base-chart.component';
let BarHorizontal2DComponent = class BarHorizontal2DComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.groupPadding = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
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
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getGroupScale() {
        const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    }
    getInnerScale() {
        const height = this.groupScale.bandwidth();
        const spacing = this.innerDomain.length / (height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, height])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    }
    getValueScale() {
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        const min = Math.min(0, ...domain);
        const max = this.xScaleMax
            ? Math.max(this.xScaleMax, ...domain)
            : Math.max(0, ...domain);
        return [min, max];
    }
    groupTransform(group) {
        return `translate(0, ${this.groupScale(group.name)})`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxWidthChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (groupIndex === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legend", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legendTitle", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legendPosition", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxis", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxis", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showXAxisLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showYAxisLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxisLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxisLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "gradient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showGridLines", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "activeEntries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], BarHorizontal2DComponent.prototype, "schemeType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "trimXAxisTicks", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "trimYAxisTicks", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "maxXAxisTickLength", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "maxYAxisTickLength", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxisTickFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxisTickFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "xAxisTicks", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "yAxisTicks", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "groupPadding", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "barPadding", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "roundDomains", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "roundEdges", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], BarHorizontal2DComponent.prototype, "xScaleMax", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showDataLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "dataLabelFormatting", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], BarHorizontal2DComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], BarHorizontal2DComponent.prototype, "deactivate", void 0);
tslib_1.__decorate([
    ContentChild('tooltipTemplate'),
    tslib_1.__metadata("design:type", TemplateRef)
], BarHorizontal2DComponent.prototype, "tooltipTemplate", void 0);
BarHorizontal2DComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-svg-charts-bar-horizontal-2d',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-grid-panel-series\n      [xScale]=\"valueScale\"\n      [yScale]=\"groupScale\"\n      [data]=\"results\"\n      [dims]=\"dims\"\n      orient=\"horizontal\">\n    </svg:g>\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"valueScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"groupScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-horizontal\n        [xScale]=\"valueScale\"\n        [activeEntries]=\"activeEntries\"\n        [yScale]=\"innerScale\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [roundEdges]=\"roundEdges\"\n        [animations]=\"animations\"\n        [showDataLabel]=\"showDataLabel\"\n        [dataLabelFormatting]=\"dataLabelFormatting\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n        (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarHorizontal2DComponent);
export { BarHorizontal2DComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWhvcml6b250YWwtMmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L2Jhci1ob3Jpem9udGFsLTJkL2Jhci1ob3Jpem9udGFsLTJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDWCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxELE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFvQmxGLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEsa0JBQWtCO0lBbEJoRTs7UUFvQlcsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLG1CQUFjLEdBQUcsT0FBTyxDQUFDO1FBT3pCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFLeEIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFHckIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWE3RCxXQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWYsc0JBQWlCLEdBQVEsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUMsQ0FBQztJQXFOdEQsQ0FBQztJQW5OQyxNQUFNO1FBQ0osS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDcEIsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ3JCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztZQUNyQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYztZQUMvQixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDcEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVEsTUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUM7SUFDN0UsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFckYsT0FBTyxTQUFTLEVBQUU7YUFDZixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQyxZQUFZLENBQUMsT0FBTyxDQUFDO2FBQ3JCLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFekUsT0FBTyxTQUFTLEVBQUU7YUFDZixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdkIsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFO2FBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFN0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtTQUNGO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7YUFDRjtTQUNGO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7YUFDRjtTQUNGO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUztZQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFLO1FBQ2xCLE9BQU8sZ0JBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDeEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBTTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCO2FBQU07WUFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE1BQU0sSUFBSSxHQUFHO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzFCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzlCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNqQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUU7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsVUFBVTtRQUMxQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFHO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0Y7UUFDRCxJQUFJLFVBQVUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzVDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFDRCxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQU07UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBTTtRQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGLENBQUE7QUFyUVU7SUFBUixLQUFLLEVBQUU7O3dEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzs2REFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7O2dFQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTs7dURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTs7dURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTs7Z0VBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7O2dFQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzs0REFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOzs0REFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOztpRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7OzBEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7K0RBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzsrREFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7OzREQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7Z0VBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFOztnRUFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7O29FQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTs7b0VBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFOztxRUFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7O3FFQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTs7NERBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzs0REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7OzhEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7NERBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OzhEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7NERBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzsyREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7OytEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7cUVBQTBCO0FBRXhCO0lBQVQsTUFBTSxFQUFFO3NDQUFXLFlBQVk7MERBQTJCO0FBQ2pEO0lBQVQsTUFBTSxFQUFFO3NDQUFhLFlBQVk7NERBQTJCO0FBRTVCO0lBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztzQ0FBa0IsV0FBVztpRUFBTTtBQW5DeEQsd0JBQXdCO0lBbEJwQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUNBQWlDO1FBQzNDLDRnRkFBOEM7UUFDOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsVUFBVSxFQUFFO1lBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFO2dCQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFO29CQUNuQixLQUFLLENBQUM7d0JBQ0osT0FBTyxFQUFFLENBQUM7d0JBQ1YsU0FBUyxFQUFFLEdBQUc7cUJBQ2YsQ0FBQztvQkFDRixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7aUJBQ3pELENBQUM7YUFDSCxDQUFDO1NBQ0g7O0tBQ0YsQ0FBQztHQUNXLHdCQUF3QixDQXVRcEM7U0F2UVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBzY2FsZUJhbmQsIHNjYWxlTGluZWFyIH0gZnJvbSAnZDMtc2NhbGUnO1xuXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tbW9uL2Jhc2UtY2hhcnQvYmFzZS1jaGFydC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLWJhci1ob3Jpem9udGFsLTJkJyxcbiAgdGVtcGxhdGVVcmw6ICdiYXItaG9yaXpvbnRhbC0yZC50ZW1wbGF0ZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogWycuLi8uLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgdHJhbnNmb3JtOiAnKicsXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlKDApJ30pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJhckhvcml6b250YWwyRENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgbGVnZW5kID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlID0gJ0xlZ2VuZCc7XG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uID0gJ3JpZ2h0JztcbiAgQElucHV0KCkgeEF4aXM7XG4gIEBJbnB1dCgpIHlBeGlzO1xuICBASW5wdXQoKSBzaG93WEF4aXNMYWJlbDtcbiAgQElucHV0KCkgc2hvd1lBeGlzTGFiZWw7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw7XG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lcyA9IHRydWU7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHNjaGVtZVR5cGU6IHN0cmluZztcbiAgQElucHV0KCkgdHJpbVhBeGlzVGlja3MgPSB0cnVlO1xuICBASW5wdXQoKSB0cmltWUF4aXNUaWNrcyA9IHRydWU7XG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aCA9IDE2O1xuICBASW5wdXQoKSBtYXhZQXhpc1RpY2tMZW5ndGggPSAxNjtcbiAgQElucHV0KCkgeEF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB5QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIHhBeGlzVGlja3M6IGFueVtdO1xuICBASW5wdXQoKSB5QXhpc1RpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgZ3JvdXBQYWRkaW5nID0gMTY7XG4gIEBJbnB1dCgpIGJhclBhZGRpbmcgPSA4O1xuICBASW5wdXQoKSByb3VuZERvbWFpbnMgPSBmYWxzZTtcbiAgQElucHV0KCkgcm91bmRFZGdlcyA9IHRydWU7XG4gIEBJbnB1dCgpIHhTY2FsZU1heDogbnVtYmVyO1xuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGFMYWJlbEZvcm1hdHRpbmc6IGFueTtcblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICBncm91cERvbWFpbjogYW55W107XG4gIGlubmVyRG9tYWluOiBhbnlbXTtcbiAgdmFsdWVzRG9tYWluOiBhbnlbXTtcbiAgZ3JvdXBTY2FsZTogYW55O1xuICBpbm5lclNjYWxlOiBhbnk7XG4gIHZhbHVlU2NhbGU6IGFueTtcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIG1hcmdpbiA9IFsxMCwgMjAsIDEwLCAyMF07XG4gIHhBeGlzSGVpZ2h0ID0gMDtcbiAgeUF4aXNXaWR0aCA9IDA7XG4gIGxlZ2VuZE9wdGlvbnM6IGFueTtcbiAgZGF0YUxhYmVsTWF4V2lkdGg6IGFueSA9IHtuZWdhdGl2ZTogMCwgcG9zaXRpdmU6IDB9O1xuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIGlmICghdGhpcy5zaG93RGF0YUxhYmVsKSB7XG4gICAgICB0aGlzLmRhdGFMYWJlbE1heFdpZHRoID0ge25lZ2F0aXZlOiAwLCBwb3NpdGl2ZTogMH07XG4gICAgfVxuXG4gICAgdGhpcy5tYXJnaW4gPSBbMTAsIDIwICsgdGhpcy5kYXRhTGFiZWxNYXhXaWR0aC5wb3NpdGl2ZSwgMTAsIDIwICsgdGhpcy5kYXRhTGFiZWxNYXhXaWR0aC5uZWdhdGl2ZV07XG5cbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcbiAgICAgIHNob3dYQXhpczogdGhpcy54QXhpcyxcbiAgICAgIHNob3dZQXhpczogdGhpcy55QXhpcyxcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxuICAgICAgeUF4aXNXaWR0aDogdGhpcy55QXhpc1dpZHRoLFxuICAgICAgc2hvd1hMYWJlbDogdGhpcy5zaG93WEF4aXNMYWJlbCxcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcbiAgICAgIGxlZ2VuZFR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXG4gICAgfSk7XG5cbiAgICB0aGlzLmZvcm1hdERhdGVzKCk7XG5cbiAgICB0aGlzLmdyb3VwRG9tYWluID0gdGhpcy5nZXRHcm91cERvbWFpbigpO1xuICAgIHRoaXMuaW5uZXJEb21haW4gPSB0aGlzLmdldElubmVyRG9tYWluKCk7XG4gICAgdGhpcy52YWx1ZXNEb21haW4gPSB0aGlzLmdldFZhbHVlRG9tYWluKCk7XG5cbiAgICB0aGlzLmdyb3VwU2NhbGUgPSB0aGlzLmdldEdyb3VwU2NhbGUoKTtcbiAgICB0aGlzLmlubmVyU2NhbGUgPSB0aGlzLmdldElubmVyU2NhbGUoKTtcbiAgICB0aGlzLnZhbHVlU2NhbGUgPSB0aGlzLmdldFZhbHVlU2NhbGUoKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XG5cbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHsgdGhpcy5kaW1zLnhPZmZzZXQgfSAsICR7IHRoaXMubWFyZ2luWzBdIH0pYDtcbiAgfVxuXG4gIGdldEdyb3VwU2NhbGUoKTogYW55IHtcbiAgICBjb25zdCBzcGFjaW5nID0gdGhpcy5ncm91cERvbWFpbi5sZW5ndGggLyAodGhpcy5kaW1zLmhlaWdodCAvIHRoaXMuZ3JvdXBQYWRkaW5nICsgMSk7XG5cbiAgICByZXR1cm4gc2NhbGVCYW5kKClcbiAgICAgIC5yYW5nZVJvdW5kKFswLCB0aGlzLmRpbXMuaGVpZ2h0XSlcbiAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcbiAgICAgIC5wYWRkaW5nT3V0ZXIoc3BhY2luZyAvIDIpXG4gICAgICAuZG9tYWluKHRoaXMuZ3JvdXBEb21haW4pO1xuICB9XG5cbiAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ3JvdXBTY2FsZS5iYW5kd2lkdGgoKTtcbiAgICBjb25zdCBzcGFjaW5nID0gdGhpcy5pbm5lckRvbWFpbi5sZW5ndGggLyAoaGVpZ2h0IC8gdGhpcy5iYXJQYWRkaW5nICsgMSk7XG5cbiAgICByZXR1cm4gc2NhbGVCYW5kKClcbiAgICAgIC5yYW5nZVJvdW5kKFswLCBoZWlnaHRdKVxuICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxuICAgICAgLmRvbWFpbih0aGlzLmlubmVyRG9tYWluKTtcbiAgfVxuXG4gIGdldFZhbHVlU2NhbGUoKTogYW55IHtcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcbiAgICAgIC5kb21haW4odGhpcy52YWx1ZXNEb21haW4pO1xuXG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XG4gIH1cblxuICBnZXRHcm91cERvbWFpbigpOiBhbnlbXSB7XG4gICAgY29uc3QgZG9tYWluID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgaWYgKCFkb21haW4uaW5jbHVkZXMoZ3JvdXAubmFtZSkpIHtcbiAgICAgICAgZG9tYWluLnB1c2goZ3JvdXAubmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbWFpbjtcbiAgfVxuXG4gIGdldElubmVyRG9tYWluKCk6IGFueVtdIHtcbiAgICBjb25zdCBkb21haW4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XG4gICAgICBmb3IgKGNvbnN0IGQgb2YgZ3JvdXAuc2VyaWVzKSB7XG4gICAgICAgIGlmICghZG9tYWluLmluY2x1ZGVzKGQubmFtZSkpIHtcbiAgICAgICAgICBkb21haW4ucHVzaChkLm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbWFpbjtcbiAgfVxuXG4gIGdldFZhbHVlRG9tYWluKCk6IGFueVtdIHtcbiAgICBjb25zdCBkb21haW4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XG4gICAgICBmb3IgKGNvbnN0IGQgb2YgZ3JvdXAuc2VyaWVzKSB7XG4gICAgICAgIGlmICghZG9tYWluLmluY2x1ZGVzKGQudmFsdWUpKSB7XG4gICAgICAgICAgZG9tYWluLnB1c2goZC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbigwLCAuLi5kb21haW4pO1xuICAgIGNvbnN0IG1heCA9IHRoaXMueFNjYWxlTWF4XG4gICAgICA/IE1hdGgubWF4KHRoaXMueFNjYWxlTWF4LCAuLi5kb21haW4pXG4gICAgICA6IE1hdGgubWF4KDAsIC4uLmRvbWFpbik7XG4gICAgcmV0dXJuIFttaW4sIG1heF07XG4gIH1cblxuICBncm91cFRyYW5zZm9ybShncm91cCkge1xuICAgIHJldHVybiBgdHJhbnNsYXRlKDAsICR7dGhpcy5ncm91cFNjYWxlKGdyb3VwLm5hbWUpfSlgO1xuICB9XG5cbiAgb25DbGljayhkYXRhLCBncm91cD8pOiB2b2lkIHtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGRhdGEuc2VyaWVzID0gZ3JvdXAubmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICBsZXQgZG9tYWluO1xuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgZG9tYWluID0gdGhpcy5pbm5lckRvbWFpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdGhpcy52YWx1ZXNEb21haW47XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIHRoaXMuc2NoZW1lVHlwZSwgZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XG4gIH1cblxuICBnZXRMZWdlbmRPcHRpb25zKCkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBzY2FsZVR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcbiAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxuICAgICAgZG9tYWluOiBbXSxcbiAgICAgIHRpdGxlOiB1bmRlZmluZWQsXG4gICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxuICAgIH07XG4gICAgaWYgKG9wdHMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy5pbm5lckRvbWFpbjtcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICBvcHRzLnRpdGxlID0gdGhpcy5sZWdlbmRUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnZhbHVlc0RvbWFpbjtcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnMuc2NhbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICB1cGRhdGVZQXhpc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGVYQXhpc0hlaWdodCh7IGhlaWdodCB9KTogdm9pZCB7XG4gICAgdGhpcy54QXhpc0hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgb25EYXRhTGFiZWxNYXhXaWR0aENoYW5nZWQoZXZlbnQsIGdyb3VwSW5kZXgpIHtcbiAgICBpZiAoZXZlbnQuc2l6ZS5uZWdhdGl2ZSkgIHtcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4V2lkdGgubmVnYXRpdmUgPSBNYXRoLm1heCh0aGlzLmRhdGFMYWJlbE1heFdpZHRoLm5lZ2F0aXZlLCBldmVudC5zaXplLndpZHRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhTGFiZWxNYXhXaWR0aC5wb3NpdGl2ZSA9IE1hdGgubWF4KHRoaXMuZGF0YUxhYmVsTWF4V2lkdGgucG9zaXRpdmUsIGV2ZW50LnNpemUud2lkdGgpO1xuICAgIH1cbiAgICBpZiAoZ3JvdXBJbmRleCA9PT0gKHRoaXMucmVzdWx0cy5sZW5ndGggLSAxKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcbiAgICB9XG4gIH1cbiAgb25BY3RpdmF0ZShldmVudCwgZ3JvdXA/KSB7XG4gICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGl0ZW0uc2VyaWVzID0gZ3JvdXAubmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWUgJiYgZC5zZXJpZXMgPT09IGl0ZW0uc2VyaWVzO1xuICAgIH0pO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsgaXRlbSwgLi4udGhpcy5hY3RpdmVFbnRyaWVzIF07XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZShldmVudCwgZ3JvdXA/KSB7XG4gICAgY29uc3QgaXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGl0ZW0uc2VyaWVzID0gZ3JvdXAubmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWUgJiYgZC5zZXJpZXMgPT09IGl0ZW0uc2VyaWVzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xuXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xuICB9XG59XG4iXX0=