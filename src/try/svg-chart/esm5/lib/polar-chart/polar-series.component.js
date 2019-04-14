import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { lineRadial } from 'd3-shape';
import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
var PolarSeriesComponent = /** @class */ (function () {
    function PolarSeriesComponent() {
        this.tooltipDisabled = false;
        this.gradient = false;
        this.animations = true;
        this.circleRadius = 3;
    }
    PolarSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PolarSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradients();
        var line = this.getLineGenerator();
        var data = this.sortData(this.data.series);
        var seriesName = this.data.name;
        var linearScaleType = this.colors.scaleType === 'linear';
        var min = this.yScale.domain()[0];
        this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);
        this.path = line(data) || '';
        this.circles = data.map(function (d) {
            var a = _this.getAngle(d);
            var r = _this.getRadius(d);
            var value = d.value;
            var color = _this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
            var cData = {
                series: seriesName,
                value: value,
                name: d.name
            };
            return {
                data: cData,
                cx: r * Math.sin(a),
                cy: -r * Math.cos(a),
                value: value,
                color: color,
                label: d.name
            };
        });
        this.active = this.isActive(this.data);
        this.inactive = this.isInactive(this.data);
        this.tooltipText = this.tooltipText || (function (c) { return _this.defaultTooltipText(c); });
    };
    PolarSeriesComponent.prototype.getAngle = function (d) {
        var label = d.name;
        if (this.scaleType === 'time') {
            return this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            return this.xScale(Number(label));
        }
        return this.xScale(label);
    };
    PolarSeriesComponent.prototype.getRadius = function (d) {
        return this.yScale(d.value);
    };
    PolarSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return lineRadial()
            .angle(function (d) { return _this.getAngle(d); })
            .radius(function (d) { return _this.getRadius(d); })
            .curve(this.curve);
    };
    PolarSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            return sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            return sortByTime(data, 'name');
        }
        return sortByDomain(data, 'name', 'asc', this.xScale.domain());
    };
    PolarSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    PolarSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    PolarSeriesComponent.prototype.defaultTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + this.data.name + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    PolarSeriesComponent.prototype.updateGradients = function () {
        this.hasGradient = this.gradient || this.colors.scaleType === 'linear';
        if (!this.hasGradient) {
            return;
        }
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        if (this.colors.scaleType === 'linear') {
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, tslib_1.__spread(values));
            var min = Math.min.apply(Math, tslib_1.__spread(values));
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
        }
        else {
            this.gradientStops = undefined;
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "name", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "scaleType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "curve", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], PolarSeriesComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], PolarSeriesComponent.prototype, "rangeFillOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], PolarSeriesComponent.prototype, "tooltipText", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PolarSeriesComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "animations", void 0);
    PolarSeriesComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-polar-series]',
            template: "\n    <svg:g class=\"polar-charts-series\">\n      <defs>\n        <svg:g ng-svg-charts-svg-radial-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [color]=\"seriesColor\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"0.25\"\n          [endOpacity]=\"1\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ng-svg-charts-line\n        class=\"polar-series-path\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : seriesColor\"\n        [class.active]=\"active\"\n        [class.inactive]=\"inactive\"\n        [attr.fill-opacity]=\"rangeFillOpacity\"\n        [fill]=\"hasGradient ? gradientUrl : seriesColor\"\n        [animations]=\"animations\"\n      />\n      <svg:g ng-svg-charts-circle\n        *ngFor=\"let circle of circles\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circleRadius\"\n        [fill]=\"circle.color\"\n        [style.opacity]=\"inactive ? 0.2 : 1\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        tooltipType=\"tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PolarSeriesComponent);
    return PolarSeriesComponent;
}());
export { PolarSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3BvbGFyLWNoYXJ0L3BvbGFyLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV0QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQThDckU7SUE1Q0E7UUFzRFcsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBSTNCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBd0luQixDQUFDO0lBMUhDLDBDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFBQSxpQkF3Q0M7UUF2Q0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXJDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUM7UUFDM0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUN2QixJQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUV0QixJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRW5GLElBQU0sS0FBSyxHQUFHO2dCQUNaLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixLQUFLLE9BQUE7Z0JBQ0wsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2FBQ2IsQ0FBQztZQUVGLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLE9BQUE7Z0JBQ0wsS0FBSyxPQUFBO2dCQUNMLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSTthQUNkLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCx1Q0FBUSxHQUFSLFVBQVMsQ0FBQztRQUNSLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsd0NBQVMsR0FBVCxVQUFVLENBQUM7UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEI7UUFBQSxpQkFLQztRQUpDLE9BQU8sVUFBVSxFQUFPO2FBQ3JCLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUM7YUFDNUIsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQzthQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBUSxHQUFSLFVBQVMsSUFBSTtRQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUNwQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHVDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLEtBQUs7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDMUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsaURBQWtCLEdBQWxCLFVBQW1CLEVBQWdCO1lBQWQsZ0JBQUssRUFBRSxnQkFBSztRQUMvQixPQUFPLDJDQUN5QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQU0sS0FBSyxtREFDM0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxrQkFDbkQsQ0FBQztJQUNKLENBQUM7SUFFRCw4Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQztRQUV2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVEsSUFBSSxDQUFDLFVBQVUsTUFBRyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ3RDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLENBQUM7WUFDbEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLG1CQUFRLE1BQU0sRUFBQyxDQUFDO1lBQ2hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxtQkFBUSxNQUFNLEVBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNoQztJQUNILENBQUM7SUF4SlE7UUFBUixLQUFLLEVBQUU7O3NEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O3NEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7OzJEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7O3VEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7OytEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7a0VBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOztpRUFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7OzZEQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs7MERBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzBDQUFrQixXQUFXO2lFQUFNO0lBQ2xDO1FBQVIsS0FBSyxFQUFFOzs0REFBbUI7SUFkaEIsb0JBQW9CO1FBNUNoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFFBQVEsRUFBRSxtMUNBdUNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLG9CQUFvQixDQTBKaEM7SUFBRCwyQkFBQztDQUFBLEFBMUpELElBMEpDO1NBMUpZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBsaW5lUmFkaWFsIH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcbmltcG9ydCB7IHNvcnRMaW5lYXIsIHNvcnRCeVRpbWUsIHNvcnRCeURvbWFpbiB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtcG9sYXItc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIGNsYXNzPVwicG9sYXItY2hhcnRzLXNlcmllc1wiPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLXN2Zy1yYWRpYWwtZ3JhZGllbnQgKm5nSWY9XCJoYXNHcmFkaWVudFwiXG4gICAgICAgICAgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiXG4gICAgICAgICAgW2NvbG9yXT1cInNlcmllc0NvbG9yXCJcbiAgICAgICAgICBbbmFtZV09XCJncmFkaWVudElkXCJcbiAgICAgICAgICBbc3RhcnRPcGFjaXR5XT1cIjAuMjVcIlxuICAgICAgICAgIFtlbmRPcGFjaXR5XT1cIjFcIlxuICAgICAgICAgIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGVmcz5cbiAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWxpbmVcbiAgICAgICAgY2xhc3M9XCJwb2xhci1zZXJpZXMtcGF0aFwiXG4gICAgICAgIFtwYXRoXT1cInBhdGhcIlxuICAgICAgICBbc3Ryb2tlXT1cImhhc0dyYWRpZW50ID8gZ3JhZGllbnRVcmwgOiBzZXJpZXNDb2xvclwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlXCJcbiAgICAgICAgW2NsYXNzLmluYWN0aXZlXT1cImluYWN0aXZlXCJcbiAgICAgICAgW2F0dHIuZmlsbC1vcGFjaXR5XT1cInJhbmdlRmlsbE9wYWNpdHlcIlxuICAgICAgICBbZmlsbF09XCJoYXNHcmFkaWVudCA/IGdyYWRpZW50VXJsIDogc2VyaWVzQ29sb3JcIlxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1jaXJjbGVcbiAgICAgICAgKm5nRm9yPVwibGV0IGNpcmNsZSBvZiBjaXJjbGVzXCJcbiAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICBbY3hdPVwiY2lyY2xlLmN4XCJcbiAgICAgICAgW2N5XT1cImNpcmNsZS5jeVwiXG4gICAgICAgIFtyXT1cImNpcmNsZVJhZGl1c1wiXG4gICAgICAgIFtmaWxsXT1cImNpcmNsZS5jb2xvclwiXG4gICAgICAgIFtzdHlsZS5vcGFjaXR5XT1cImluYWN0aXZlID8gMC4yIDogMVwiXG4gICAgICAgIG5neC10b29sdGlwXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwiJ3RvcCdcIlxuICAgICAgICB0b29sdGlwVHlwZT1cInRvb2x0aXBcIlxuICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IHRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb2xhclNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG5hbWU7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIHhTY2FsZTsgLy8gVGhldGFcbiAgQElucHV0KCkgeVNjYWxlOyAvLyBSXG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgc2NhbGVUeXBlO1xuICBASW5wdXQoKSBjdXJ2ZTogYW55O1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgcmFuZ2VGaWxsT3BhY2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRleHQ6IChvOiBhbnkpID0+IHN0cmluZztcbiAgQElucHV0KCkgZ3JhZGllbnQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBwYXRoOiBzdHJpbmc7XG4gIGNpcmNsZXM6IGFueVtdO1xuICBjaXJjbGVSYWRpdXMgPSAzO1xuXG4gIG91dGVyUGF0aDogc3RyaW5nO1xuICBhcmVhUGF0aDogc3RyaW5nO1xuICBncmFkaWVudElkOiBzdHJpbmc7XG4gIGdyYWRpZW50VXJsOiBzdHJpbmc7XG4gIGhhc0dyYWRpZW50OiBib29sZWFuO1xuICBncmFkaWVudFN0b3BzOiBhbnlbXTtcbiAgYXJlYUdyYWRpZW50U3RvcHM6IGFueVtdO1xuICBzZXJpZXNDb2xvcjogc3RyaW5nO1xuXG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgaW5hY3RpdmU6IGJvb2xlYW47XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVHcmFkaWVudHMoKTtcblxuICAgIGNvbnN0IGxpbmUgPSB0aGlzLmdldExpbmVHZW5lcmF0b3IoKTtcblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnNvcnREYXRhKHRoaXMuZGF0YS5zZXJpZXMpO1xuXG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xuICAgIGNvbnN0IGxpbmVhclNjYWxlVHlwZSA9IHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcic7XG4gICAgY29uc3QgbWluID0gdGhpcy55U2NhbGUuZG9tYWluKClbMF07XG4gICAgdGhpcy5zZXJpZXNDb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxpbmVhclNjYWxlVHlwZSA/IG1pbiA6IHNlcmllc05hbWUpO1xuXG4gICAgdGhpcy5wYXRoID0gbGluZShkYXRhKSB8fCAnJztcblxuICAgIHRoaXMuY2lyY2xlcyA9IGRhdGEubWFwKGQgPT4ge1xuICAgICAgY29uc3QgYSA9IHRoaXMuZ2V0QW5nbGUoZCk7XG4gICAgICBjb25zdCByID0gdGhpcy5nZXRSYWRpdXMoZCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XG5cbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGluZWFyU2NhbGVUeXBlID8gTWF0aC5hYnModmFsdWUpIDogc2VyaWVzTmFtZSk7XG5cbiAgICAgIGNvbnN0IGNEYXRhID0ge1xuICAgICAgICBzZXJpZXM6IHNlcmllc05hbWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBuYW1lOiBkLm5hbWVcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGNEYXRhLFxuICAgICAgICBjeDogciAqIE1hdGguc2luKGEpLFxuICAgICAgICBjeTogLXIgKiBNYXRoLmNvcyhhKSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBsYWJlbDogZC5uYW1lXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLmlzQWN0aXZlKHRoaXMuZGF0YSk7XG4gICAgdGhpcy5pbmFjdGl2ZSA9IHRoaXMuaXNJbmFjdGl2ZSh0aGlzLmRhdGEpO1xuICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBUZXh0IHx8IChjID0+IHRoaXMuZGVmYXVsdFRvb2x0aXBUZXh0KGMpKTtcbiAgfVxuXG4gIGdldEFuZ2xlKGQpIHtcbiAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgcmV0dXJuIHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgcmV0dXJuIHRoaXMueFNjYWxlKE51bWJlcihsYWJlbCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54U2NhbGUobGFiZWwpO1xuICB9XG5cbiAgZ2V0UmFkaXVzKGQpIHtcbiAgICByZXR1cm4gdGhpcy55U2NhbGUoZC52YWx1ZSk7XG4gIH1cblxuICBnZXRMaW5lR2VuZXJhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIGxpbmVSYWRpYWw8YW55PigpXG4gICAgICAuYW5nbGUoZCA9PiB0aGlzLmdldEFuZ2xlKGQpKVxuICAgICAgLnJhZGl1cyhkID0+IHRoaXMuZ2V0UmFkaXVzKGQpKVxuICAgICAgLmN1cnZlKHRoaXMuY3VydmUpO1xuICB9XG5cbiAgc29ydERhdGEoZGF0YSkge1xuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIHJldHVybiBzb3J0TGluZWFyKGRhdGEsICduYW1lJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICByZXR1cm4gc29ydEJ5VGltZShkYXRhLCAnbmFtZScpO1xuICAgIH1cbiAgICByZXR1cm4gc29ydEJ5RG9tYWluKGRhdGEsICduYW1lJywgJ2FzYycsIHRoaXMueFNjYWxlLmRvbWFpbigpKTtcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaXNJbmFjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzIHx8IHRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZGVmYXVsdFRvb2x0aXBUZXh0KHsgbGFiZWwsIHZhbHVlIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke3RoaXMuZGF0YS5uYW1lfSDigKIgJHtsYWJlbH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgdXBkYXRlR3JhZGllbnRzKCkge1xuICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0aGlzLmdyYWRpZW50IHx8IHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcic7XG5cbiAgICBpZiAoIXRoaXMuaGFzR3JhZGllbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5ncmFkaWVudFVybCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xuXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZGF0YS5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSk7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xuICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcbiAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMobWF4LCBtaW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=