import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../../common/label.helper';
import { D0Types } from '../series-vertical/series-vertical.component';
var SeriesHorizontalComponent = /** @class */ (function () {
    function SeriesHorizontalComponent() {
        this.barsForDataLabels = [];
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelWidthChanged = new EventEmitter();
    }
    SeriesHorizontalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontalComponent.prototype.update = function () {
        var _this = this;
        var _a;
        this.updateTooltipSettings();
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type;
        d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        var xScaleMin = Math.max(this.xScale.domain()[0], 0);
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                formattedLabel: formattedLabel
            };
            bar.height = _this.yScale.bandwidth();
            var offset0;
            var offset1;
            if (_this.type === 'standard') {
                bar.width = Math.abs(_this.xScale(value) - _this.xScale(xScaleMin));
                if (value < 0) {
                    bar.x = _this.xScale(value);
                }
                else {
                    bar.x = _this.xScale(xScaleMin);
                }
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                offset0 = d0[d0Type];
                offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                offset0 = d0[d0Type];
                offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
                bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = _this.tooltipDisabled ? undefined : "\n        <span class=\"tooltip-label\">" + tooltipLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesHorizontalComponent.prototype.updateDataLabels = function () {
        var _this = this;
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            var section = {};
            section.series = this.seriesName;
            var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d > 0 ? sum + d : sum; }, 0);
            var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d < 0 ? sum + d : sum; }, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            // if total is positive then we show it on the right, otherwise on the left
            if (section.total > 0) {
                section.width = this.xScale(totalPositive);
            }
            else {
                section.width = this.xScale(totalNegative);
            }
            section.height = this.yScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.name;
                section.total = d.value;
                section.x = _this.xScale(0);
                section.y = _this.yScale(d.name);
                section.width = _this.xScale(section.total) - _this.xScale(0);
                section.height = _this.yScale.bandwidth();
                return section;
            });
        }
    };
    SeriesHorizontalComponent.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesHorizontalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesHorizontalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesHorizontalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    SeriesHorizontalComponent.prototype.click = function (data) {
        this.select.emit(data);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "series", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SeriesHorizontalComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], SeriesHorizontalComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SeriesHorizontalComponent.prototype, "seriesName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], SeriesHorizontalComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SeriesHorizontalComponent.prototype, "roundEdges", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "showDataLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "dataLabelFormatting", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesHorizontalComponent.prototype, "dataLabelWidthChanged", void 0);
    SeriesHorizontalComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-series-horizontal]',
            template: "\n    <svg:g ng-svg-charts-bar\n      *ngFor=\"let bar of bars; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [animations]=\"animations\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\">\n    </svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g ng-svg-charts-bar-label *ngFor=\"let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'horizontal'\"\n        (dimensionsChanged)=\"dataLabelWidthChanged.emit({size:$event, index:i})\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], SeriesHorizontalComponent);
    return SeriesHorizontalComponent;
}());
export { SeriesHorizontalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLWhvcml6b250YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L3Nlcmllcy1ob3Jpem9udGFsL3Nlcmllcy1ob3Jpem9udGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFDdkIsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBeUR2RTtJQXZEQTtRQTJERSxzQkFBaUIsR0FHWixFQUFFLENBQUM7UUFHQyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBS2xCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBTXhCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFHckIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTRLdkQsQ0FBQztJQXZLQywrQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQ0FBTSxHQUFOO1FBQUEsaUJBd0dDOztRQXRHQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFNLEVBQUU7WUFDTixHQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUcsQ0FBQztZQUNyQixHQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUcsQ0FBQztlQUN0QixDQUFDO1FBQ0YsSUFBSSxNQUFlLENBQUM7UUFDcEIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDMUIsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQzlCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsSUFBSyxPQUFBLEdBQUcsR0FBRyxDQUFDLEVBQVAsQ0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsS0FBSztZQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3BCLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFFekQsSUFBTSxHQUFHLEdBQVE7Z0JBQ2YsS0FBSyxPQUFBO2dCQUNMLEtBQUssT0FBQTtnQkFDTCxVQUFVLFlBQUE7Z0JBQ1YsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsY0FBYyxnQkFBQTthQUNmLENBQUM7WUFFRixHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFckMsSUFBSSxPQUFlLENBQUM7WUFDcEIsSUFBSSxPQUFlLENBQUM7WUFFcEIsSUFBSSxLQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDNUIsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QjtxQkFBTTtvQkFDTCxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ2hDO2dCQUNELEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLEtBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixPQUFPLEdBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQztnQkFFcEIsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hELEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1YsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksS0FBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7Z0JBQ3JDLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDO2dCQUVwQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2IsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDbEMsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDWixPQUFPLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO2dCQUVELEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RCxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdEIsS0FBSyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDOUM7WUFFRCxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDTCxJQUFJLEtBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO29CQUM1QixHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9EO3FCQUFNO29CQUNMLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xGO2FBQ0Y7WUFFRCxJQUFJLFlBQVksR0FBRyxjQUFjLENBQUM7WUFDbEMsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM5RCxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLFlBQVksR0FBTSxLQUFJLENBQUMsVUFBVSxnQkFBTSxjQUFnQixDQUFDO2dCQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNsQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDdkQ7WUFFRCxHQUFHLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsNkNBQ3JCLFlBQVkscURBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxvQkFDbkQsQ0FBQztZQUVGLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUUxQixDQUFDO0lBRUQsb0RBQWdCLEdBQWhCO1FBQUEsaUJBK0JDO1FBN0JDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUM1QixJQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7WUFDeEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFyQixDQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFyQixDQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUM5QyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsMkVBQTJFO1lBQzNFLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDNUM7WUFDRCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDeEMsSUFBTSxPQUFPLEdBQVEsRUFBRSxDQUFDO2dCQUN4QixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzVELE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDekMsT0FBTyxPQUFPLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCx5REFBcUIsR0FBckI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsNENBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1NBQUU7UUFDMUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkNBQU8sR0FBUCxVQUFRLEtBQUssRUFBRSxHQUFHO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBRUQsb0RBQWdCLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxRQUFRO1FBQzlCLE9BQU8sS0FBSyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7SUFFRCx5Q0FBSyxHQUFMLFVBQU0sSUFBSTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUE5TFE7UUFBUixLQUFLLEVBQUU7OzJEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7OzJEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7NkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7NkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7NkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7NkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7c0VBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzsrREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O29FQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7aUVBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOzBDQUFrQixXQUFXO3NFQUFNO0lBQ2xDO1FBQVIsS0FBSyxFQUFFOztpRUFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7O2lFQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7b0VBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFOzswRUFBMEI7SUFFeEI7UUFBVCxNQUFNLEVBQUU7OzZEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTs7K0RBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOztpRUFBaUM7SUFDaEM7UUFBVCxNQUFNLEVBQUU7OzRFQUE0QztJQTVCMUMseUJBQXlCO1FBdkRyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0NBQW9DO1lBQzlDLFFBQVEsRUFBRSx1OENBd0NUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDbkIsS0FBSyxDQUFDOzRCQUNKLE9BQU8sRUFBRSxDQUFDO3lCQUNYLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDcEMsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRixDQUFDO09BQ1cseUJBQXlCLENBd01yQztJQUFELGdDQUFDO0NBQUEsQUF4TUQsSUF3TUM7U0F4TVkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uLy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgRDBUeXBlcyB9IGZyb20gJy4uL3Nlcmllcy12ZXJ0aWNhbC9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXNlcmllcy1ob3Jpem9udGFsXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtYmFyXG4gICAgICAqbmdGb3I9XCJsZXQgYmFyIG9mIGJhcnM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgIFt3aWR0aF09XCJiYXIud2lkdGhcIlxuICAgICAgW2hlaWdodF09XCJiYXIuaGVpZ2h0XCJcbiAgICAgIFt4XT1cImJhci54XCJcbiAgICAgIFt5XT1cImJhci55XCJcbiAgICAgIFtmaWxsXT1cImJhci5jb2xvclwiXG4gICAgICBbc3RvcHNdPVwiYmFyLmdyYWRpZW50U3RvcHNcIlxuICAgICAgW2RhdGFdPVwiYmFyLmRhdGFcIlxuICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICBbcm91bmRFZGdlc109XCJiYXIucm91bmRFZGdlc1wiXG4gICAgICAoc2VsZWN0KT1cImNsaWNrKCRldmVudClcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShiYXIuZGF0YSlcIlxuICAgICAgW2FyaWFMYWJlbF09XCJiYXIuYXJpYUxhYmVsXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICBuZ3gtdG9vbHRpcFxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwidG9vbHRpcFR5cGVcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBiYXIudG9vbHRpcFRleHRcIlxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImJhci5kYXRhXCI+XG4gICAgPC9zdmc6Zz5cbiAgICA8c3ZnOmcgKm5nSWY9XCJzaG93RGF0YUxhYmVsXCI+XG4gICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1iYXItbGFiZWwgKm5nRm9yPVwibGV0IGIgb2YgYmFyc0ZvckRhdGFMYWJlbHM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6dHJhY2tEYXRhTGFiZWxCeVwiXG4gICAgICAgIFtiYXJYXT1cImIueFwiXG4gICAgICAgIFtiYXJZXT1cImIueVwiXG4gICAgICAgIFtiYXJXaWR0aF09XCJiLndpZHRoXCJcbiAgICAgICAgW2JhckhlaWdodF09XCJiLmhlaWdodFwiXG4gICAgICAgIFt2YWx1ZV09XCJiLnRvdGFsXCJcbiAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJkYXRhTGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJkYXRhTGFiZWxXaWR0aENoYW5nZWQuZW1pdCh7c2l6ZTokZXZlbnQsIGluZGV4Oml9KVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlcmllc0hvcml6b250YWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBiYXJzOiBhbnk7XG4gIHg6IGFueTtcbiAgeTogYW55O1xuICBiYXJzRm9yRGF0YUxhYmVsczogQXJyYXk8e1xuICAgIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyLCBzZXJpZXM6IHN0cmluZ1xuICB9PiA9IFtdO1xuXG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIHR5cGUgPSAnc3RhbmRhcmQnO1xuICBASW5wdXQoKSBzZXJpZXM7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIHNlcmllc05hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSByb3VuZEVkZ2VzOiBib29sZWFuO1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0RhdGFMYWJlbCA9IGZhbHNlO1xuICBASW5wdXQoKSBkYXRhTGFiZWxGb3JtYXR0aW5nOiBhbnk7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRhdGFMYWJlbFdpZHRoQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XG4gIHRvb2x0aXBUeXBlOiBzdHJpbmc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG5cbiAgICB0aGlzLnVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpO1xuICAgIGNvbnN0IGQwID0ge1xuICAgICAgW0QwVHlwZXMucG9zaXRpdmVdOiAwLFxuICAgICAgW0QwVHlwZXMubmVnYXRpdmVdOiAwXG4gICAgfTtcbiAgICBsZXQgZDBUeXBlOiBEMFR5cGVzO1xuICAgIGQwVHlwZSA9IEQwVHlwZXMucG9zaXRpdmU7XG4gICAgbGV0IHRvdGFsO1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xuICAgICAgdG90YWwgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gc3VtICsgZCwgMCk7XG4gICAgfVxuICAgIGNvbnN0IHhTY2FsZU1pbiA9IE1hdGgubWF4KHRoaXMueFNjYWxlLmRvbWFpbigpWzBdLCAwKTtcblxuICAgIHRoaXMuYmFycyA9IHRoaXMuc2VyaWVzLm1hcCgoZCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGQudmFsdWU7XG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuICAgICAgY29uc3Qgcm91bmRFZGdlcyA9IHRoaXMucm91bmRFZGdlcztcbiAgICAgIGQwVHlwZSA9IHZhbHVlID4gMCA/IEQwVHlwZXMucG9zaXRpdmUgOiBEMFR5cGVzLm5lZ2F0aXZlO1xuXG4gICAgICBjb25zdCBiYXI6IGFueSA9IHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGxhYmVsLFxuICAgICAgICByb3VuZEVkZ2VzLFxuICAgICAgICBkYXRhOiBkLFxuICAgICAgICBmb3JtYXR0ZWRMYWJlbFxuICAgICAgfTtcblxuICAgICAgYmFyLmhlaWdodCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpO1xuXG4gICAgICBsZXQgb2Zmc2V0MDogbnVtYmVyO1xuICAgICAgbGV0IG9mZnNldDE6IG51bWJlcjtcblxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgICBiYXIud2lkdGggPSBNYXRoLmFicyh0aGlzLnhTY2FsZSh2YWx1ZSkgLSB0aGlzLnhTY2FsZSh4U2NhbGVNaW4pKTtcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUoeFNjYWxlTWluKTtcbiAgICAgICAgfVxuICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKGxhYmVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcbiAgICAgICAgb2Zmc2V0MCA9IGQwW2QwVHlwZV07XG4gICAgICAgIG9mZnNldDEgPSBvZmZzZXQwICsgdmFsdWU7XG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XG5cbiAgICAgICAgYmFyLndpZHRoID0gdGhpcy54U2NhbGUob2Zmc2V0MSkgLSB0aGlzLnhTY2FsZShvZmZzZXQwKTtcbiAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZShvZmZzZXQwKTtcbiAgICAgICAgYmFyLnkgPSAwO1xuICAgICAgICBiYXIub2Zmc2V0MCA9IG9mZnNldDA7XG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgb2Zmc2V0MCA9IGQwW2QwVHlwZV07XG4gICAgICAgIG9mZnNldDEgPSBvZmZzZXQwICsgdmFsdWU7XG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRvdGFsID4gMCkge1xuICAgICAgICAgIG9mZnNldDAgPSAob2Zmc2V0MCAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgICBvZmZzZXQxID0gKG9mZnNldDEgKiAxMDApIC8gdG90YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0MCA9IDA7XG4gICAgICAgICAgb2Zmc2V0MSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBiYXIud2lkdGggPSB0aGlzLnhTY2FsZShvZmZzZXQxKSAtIHRoaXMueFNjYWxlKG9mZnNldDApO1xuICAgICAgICBiYXIueCA9IHRoaXMueFNjYWxlKG9mZnNldDApO1xuICAgICAgICBiYXIueSA9IDA7XG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcbiAgICAgICAgYmFyLm9mZnNldDEgPSBvZmZzZXQxO1xuICAgICAgICB2YWx1ZSA9IChvZmZzZXQxIC0gb2Zmc2V0MCkudG9GaXhlZCgyKSArICclJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihiYXIub2Zmc2V0MSk7XG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKGJhci5vZmZzZXQxLCBiYXIub2Zmc2V0MCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdHRlZExhYmVsO1xuICAgICAgYmFyLmFyaWFMYWJlbCA9IGZvcm1hdHRlZExhYmVsICsgJyAnICsgdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIGlmICh0aGlzLnNlcmllc05hbWUpIHtcbiAgICAgICAgdG9vbHRpcExhYmVsID0gYCR7dGhpcy5zZXJpZXNOYW1lfSDigKIgJHtmb3JtYXR0ZWRMYWJlbH1gO1xuICAgICAgICBiYXIuZGF0YS5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XG4gICAgICAgIGJhci5hcmlhTGFiZWwgPSB0aGlzLnNlcmllc05hbWUgKyAnICcgKyBiYXIuYXJpYUxhYmVsO1xuICAgICAgfVxuXG4gICAgICBiYXIudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHt0b29sdGlwTGFiZWx9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgIGA7XG5cbiAgICAgIHJldHVybiBiYXI7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZURhdGFMYWJlbHMoKTtcblxuICB9XG5cbiAgdXBkYXRlRGF0YUxhYmVscygpIHtcblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xuICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IFtdO1xuICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XG4gICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZTtcbiAgICAgIGNvbnN0IHRvdGFsUG9zaXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gZCA+IDAgPyBzdW0gKyBkIDogc3VtLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsTmVnYXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gZCA8IDAgPyBzdW0gKyBkIDogc3VtLCAwKTtcbiAgICAgIHNlY3Rpb24udG90YWwgPSB0b3RhbFBvc2l0aXZlICsgdG90YWxOZWdhdGl2ZTtcbiAgICAgIHNlY3Rpb24ueCA9IDA7XG4gICAgICBzZWN0aW9uLnkgPSAwO1xuICAgICAgLy8gaWYgdG90YWwgaXMgcG9zaXRpdmUgdGhlbiB3ZSBzaG93IGl0IG9uIHRoZSByaWdodCwgb3RoZXJ3aXNlIG9uIHRoZSBsZWZ0XG4gICAgICBpZiAoc2VjdGlvbi50b3RhbCA+IDApIHtcbiAgICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlKHRvdGFsUG9zaXRpdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlKHRvdGFsTmVnYXRpdmUpO1xuICAgICAgfVxuICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKTtcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMucHVzaChzZWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IHRoaXMuc2VyaWVzLm1hcChkID0+IHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XG4gICAgICAgIHNlY3Rpb24uc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lID8gdGhpcy5zZXJpZXNOYW1lIDogZC5uYW1lO1xuICAgICAgICBzZWN0aW9uLnRvdGFsID0gZC52YWx1ZTtcbiAgICAgICAgc2VjdGlvbi54ID0gdGhpcy54U2NhbGUoMCk7XG4gICAgICAgIHNlY3Rpb24ueSA9IHRoaXMueVNjYWxlKGQubmFtZSk7XG4gICAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZShzZWN0aW9uLnRvdGFsKSAtIHRoaXMueFNjYWxlKDApO1xuICAgICAgICBzZWN0aW9uLmhlaWdodCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpO1xuICAgICAgICByZXR1cm4gc2VjdGlvbjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpIHtcbiAgICB0aGlzLnRvb2x0aXBQbGFjZW1lbnQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b3AnO1xuICAgIHRoaXMudG9vbHRpcFR5cGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b29sdGlwJztcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZSAmJiBlbnRyeS5zZXJpZXMgPT09IGQuc2VyaWVzO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBiYXIpIHtcbiAgICByZXR1cm4gYmFyLmxhYmVsO1xuICB9XG5cbiAgdHJhY2tEYXRhTGFiZWxCeShpbmRleCwgYmFyTGFiZWwpIHtcbiAgICByZXR1cm4gaW5kZXggKyAnIycgKyBiYXJMYWJlbC5zZXJpZXMgKyAnIycgKyBiYXJMYWJlbC50b3RhbDtcbiAgfVxuXG4gIGNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG59XG4iXX0=