import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../label.helper';
import { id } from '../../utils/id';
import { ColorHelper } from '../color.helper';
var CircleSeriesComponent = /** @class */ (function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circle = this.getActiveCircle();
    };
    CircleSeriesComponent.prototype.getActiveCircle = function () {
        var _this = this;
        var indexActiveDataPoint = this.data.series.findIndex(function (d) {
            var label = d.name;
            return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    };
    CircleSeriesComponent.prototype.mapDataPointToCircle = function (d, i) {
        var seriesName = this.data.name;
        var value = d.value;
        var label = d.name;
        var tooltipLabel = formatLabel(label);
        var cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        var cy = this.yScale(this.type === 'standard' ? value : d.d1);
        var radius = 5;
        var height = this.yScale.range()[0] - cy;
        var opacity = 1;
        var color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        var data = {
            series: seriesName,
            value: value,
            name: label
        };
        return {
            classNames: ["circle-data-" + i],
            value: value,
            label: label,
            data: data,
            cx: cx,
            cy: cy,
            radius: radius,
            height: height,
            tooltipLabel: tooltipLabel,
            color: color,
            opacity: opacity,
            seriesName: seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
        return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
        if (min !== undefined || max !== undefined) {
            var result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }
        ];
    };
    CircleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ColorHelper)
    ], CircleSeriesComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "scaleType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "visibleValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CircleSeriesComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "deactivate", void 0);
    CircleSeriesComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-circle-series]',
            template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g ng-svg-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ng-svg-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0,
                        }),
                        animate(250, style({ opacity: 1 }))
                    ])
                ])
            ]
        })
    ], CircleSeriesComponent);
    return CircleSeriesComponent;
}());
export { CircleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vY2lyY2xlLXNlcmllcy9jaXJjbGUtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFlBQVksRUFHWix1QkFBdUIsRUFDdkIsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQTBEOUM7SUF4REE7UUEyRFcsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQU9sQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd2QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUkxQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBK0pyQixDQUFDO0lBM0pDLHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVEsSUFBSSxDQUFDLFVBQVUsTUFBRyxDQUFDO0lBQ2pELENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFBQSxpQkFZQztRQVhDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBQztZQUN4RCxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sS0FBSyxJQUFJLEtBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDbEgsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLG9CQUFvQixLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLDBEQUEwRDtZQUMxRCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQsb0RBQW9CLEdBQXBCLFVBQXFCLENBQU0sRUFBRSxDQUFTO1FBQ3BDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWxDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEMsSUFBSSxFQUFFLENBQUM7UUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQzdCLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN0QyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ0wsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0MsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEM7U0FDRjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBTSxJQUFJLEdBQUc7WUFDWCxNQUFNLEVBQUUsVUFBVTtZQUNsQixLQUFLLE9BQUE7WUFDTCxJQUFJLEVBQUUsS0FBSztTQUNaLENBQUM7UUFFRixPQUFPO1lBQ0wsVUFBVSxFQUFFLENBQUMsaUJBQWUsQ0FBRyxDQUFDO1lBQ2hDLEtBQUssT0FBQTtZQUNMLEtBQUssT0FBQTtZQUNMLElBQUksTUFBQTtZQUNKLEVBQUUsSUFBQTtZQUNGLEVBQUUsSUFBQTtZQUNGLE1BQU0sUUFBQTtZQUNOLE1BQU0sUUFBQTtZQUNOLFlBQVksY0FBQTtZQUNaLEtBQUssT0FBQTtZQUNMLE9BQU8sU0FBQTtZQUNQLFVBQVUsWUFBQTtZQUNWLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1lBQzNDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRztZQUNWLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRztTQUNYLENBQUM7SUFDSixDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLEVBQTRDO1lBQTFDLDhCQUFZLEVBQUUsZ0JBQUssRUFBRSwwQkFBVSxFQUFFLFlBQUcsRUFBRSxZQUFHO1FBQ3hELE9BQU8sMkNBQ3lCLFVBQVUsZ0JBQU0sWUFBWSxtREFDOUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLGtCQUN6RixDQUFDO0lBQ0osQ0FBQztJQUVELG9EQUFvQixHQUFwQixVQUFxQixHQUFRLEVBQUUsR0FBUTtRQUNyQyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFNLFNBQVMsRUFBRTtZQUMzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUNyQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7b0JBQ3JCLE1BQU0sSUFBSSxHQUFHLENBQUM7aUJBQ2Y7Z0JBQ0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUNyQixNQUFNLElBQUksS0FBSyxDQUFDO2lCQUNqQjthQUNGO2lCQUFNLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsTUFBTSxJQUFJLEdBQUcsQ0FBQzthQUNmO1lBQ0QsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUNyQixNQUFNLElBQUksR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUNkLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCLFVBQWlCLEtBQUs7UUFDcEIsT0FBTztZQUNMO2dCQUNFLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssT0FBQTtnQkFDTCxPQUFPLEVBQUUsR0FBRzthQUNiO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsS0FBSyxPQUFBO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUFPLEdBQVAsVUFBUSxLQUFLLEVBQUUsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxPQUFBO1NBQ04sQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBQzFDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBOUtRO1FBQVIsS0FBSyxFQUFFOzt1REFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzt1REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O3lEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3lEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7MENBQVMsV0FBVzt5REFBQztJQUNwQjtRQUFSLEtBQUssRUFBRTs7NERBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7K0RBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7Z0VBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOztrRUFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7MENBQWtCLFdBQVc7a0VBQU07SUFFakM7UUFBVCxNQUFNLEVBQUU7O3lEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTs7MkRBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzs2REFBaUM7SUFmL0IscUJBQXFCO1FBeERqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0NBQWdDO1lBQzFDLFFBQVEsRUFBRSwrNkNBeUNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDbkIsS0FBSyxDQUFDOzRCQUNKLE9BQU8sRUFBRSxDQUFDO3lCQUNYLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztxQkFDbEMsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRixDQUFDO09BQ1cscUJBQXFCLENBa0xqQztJQUFELDRCQUFDO0NBQUEsQUFsTEQsSUFrTEM7U0FsTFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQnO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb2xvci5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtY2lyY2xlLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyAqbmdJZj1cImNpcmNsZVwiPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnRcbiAgICAgICAgICBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcbiAgICAgICAgICBbbmFtZV09XCJncmFkaWVudElkXCJcbiAgICAgICAgICBbc3RvcHNdPVwiY2lyY2xlLmdyYWRpZW50U3RvcHNcIlxuICAgICAgICAvPlxuICAgICAgPC9kZWZzPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgICpuZ0lmPVwiYmFyVmlzaWJsZSAmJiB0eXBlID09PSAnc3RhbmRhcmQnXCJcbiAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICAgIFthdHRyLnhdPVwiY2lyY2xlLmN4IC0gY2lyY2xlLnJhZGl1c1wiXG4gICAgICAgIFthdHRyLnldPVwiY2lyY2xlLmN5XCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiY2lyY2xlLnJhZGl1cyAqIDJcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiY2lyY2xlLmhlaWdodFwiXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnRGaWxsXCJcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwLWJhclwiXG4gICAgICAvPlxuICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtY2lyY2xlXG4gICAgICAgIGNsYXNzPVwiY2lyY2xlXCJcbiAgICAgICAgW2N4XT1cImNpcmNsZS5jeFwiXG4gICAgICAgIFtjeV09XCJjaXJjbGUuY3lcIlxuICAgICAgICBbcl09XCJjaXJjbGUucmFkaXVzXCJcbiAgICAgICAgW2ZpbGxdPVwiY2lyY2xlLmNvbG9yXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZSh7bmFtZTogY2lyY2xlLnNlcmllc05hbWV9KVwiXG4gICAgICAgIFtwb2ludGVyRXZlbnRzXT1cImNpcmNsZS52YWx1ZSA9PT0gMCA/ICdub25lJzogJ2FsbCdcIlxuICAgICAgICBbZGF0YV09XCJjaXJjbGUudmFsdWVcIlxuICAgICAgICBbY2xhc3NOYW1lc109XCJjaXJjbGUuY2xhc3NOYW1lc1wiXG4gICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQsIGNpcmNsZS5sYWJlbClcIlxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGVDaXJjbGUoKVwiXG4gICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGVDaXJjbGUoKVwiXG4gICAgICAgIG5neC10b29sdGlwXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwiJ3RvcCdcIlxuICAgICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcbiAgICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBnZXRUb29sdGlwVGV4dChjaXJjbGUpXCJcbiAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7b3BhY2l0eTogMX0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENpcmNsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSB0eXBlID0gJ3N0YW5kYXJkJztcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIHNjYWxlVHlwZTtcbiAgQElucHV0KCkgdmlzaWJsZVZhbHVlO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGFyZWFQYXRoOiBhbnk7XG4gIGNpcmNsZTogYW55OyAvLyBhY3RpdmUgY2lyY2xlXG4gIGJhclZpc2libGUgPSBmYWxzZTtcbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xuICBncmFkaWVudEZpbGw6IHN0cmluZztcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5ncmFkaWVudEZpbGwgPSBgdXJsKCMke3RoaXMuZ3JhZGllbnRJZH0pYDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2lyY2xlID0gdGhpcy5nZXRBY3RpdmVDaXJjbGUoKTtcbiAgfVxuXG4gIGdldEFjdGl2ZUNpcmNsZSgpOiB7fSB7XG4gICAgY29uc3QgaW5kZXhBY3RpdmVEYXRhUG9pbnQgPSB0aGlzLmRhdGEuc2VyaWVzLmZpbmRJbmRleCgoZCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgICByZXR1cm4gbGFiZWwgJiYgdGhpcy52aXNpYmxlVmFsdWUgJiYgbGFiZWwudG9TdHJpbmcoKSA9PT0gdGhpcy52aXNpYmxlVmFsdWUudG9TdHJpbmcoKSAmJiBkLnZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoaW5kZXhBY3RpdmVEYXRhUG9pbnQgPT09IC0xKSB7XG4gICAgICAvLyBObyB2YWxpZCBwb2ludCBpcyAnYWN0aXZlL2hvdmVyZWQgb3ZlcicgYXQgdGhpcyBtb21lbnQuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hcERhdGFQb2ludFRvQ2lyY2xlKHRoaXMuZGF0YS5zZXJpZXNbaW5kZXhBY3RpdmVEYXRhUG9pbnRdLCBpbmRleEFjdGl2ZURhdGFQb2ludCk7XG4gIH1cblxuICBtYXBEYXRhUG9pbnRUb0NpcmNsZShkOiBhbnksIGk6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xuXG4gICAgY29uc3QgdmFsdWUgPSBkLnZhbHVlO1xuICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xuICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcblxuICAgIGxldCBjeDtcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgY3ggPSB0aGlzLnhTY2FsZShsYWJlbCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUoTnVtYmVyKGxhYmVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUobGFiZWwpO1xuICAgIH1cblxuICAgIGNvbnN0IGN5ID0gdGhpcy55U2NhbGUodGhpcy50eXBlID09PSAnc3RhbmRhcmQnID8gdmFsdWUgOiBkLmQxKTtcbiAgICBjb25zdCByYWRpdXMgPSA1O1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gLSBjeTtcbiAgICBjb25zdCBvcGFjaXR5ID0gMTtcblxuICAgIGxldCBjb2xvcjtcbiAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoZC5kMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHNlcmllczogc2VyaWVzTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgbmFtZTogbGFiZWxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxuICAgICAgdmFsdWUsXG4gICAgICBsYWJlbCxcbiAgICAgIGRhdGEsXG4gICAgICBjeCxcbiAgICAgIGN5LFxuICAgICAgcmFkaXVzLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdG9vbHRpcExhYmVsLFxuICAgICAgY29sb3IsXG4gICAgICBvcGFjaXR5LFxuICAgICAgc2VyaWVzTmFtZSxcbiAgICAgIGdyYWRpZW50U3RvcHM6IHRoaXMuZ2V0R3JhZGllbnRTdG9wcyhjb2xvciksXG4gICAgICBtaW46IGQubWluLFxuICAgICAgbWF4OiBkLm1heFxuICAgIH07XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dCh7IHRvb2x0aXBMYWJlbCwgdmFsdWUsIHNlcmllc05hbWUsIG1pbiwgbWF4fSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7c2VyaWVzTmFtZX0g4oCiICR7dG9vbHRpcExhYmVsfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9JHt0aGlzLmdldFRvb2x0aXBNaW5NYXhUZXh0KG1pbiwgbWF4KX08L3NwYW4+XG4gICAgYDtcbiAgfVxuXG4gIGdldFRvb2x0aXBNaW5NYXhUZXh0KG1pbjogYW55LCBtYXg6IGFueSkge1xuICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCB8fCBtYXggICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCByZXN1bHQgPSAnICgnO1xuICAgICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdCArPSAn4omlJztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gbWluLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdCArPSAnIC0gJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gJ+KJpCc7XG4gICAgICB9XG4gICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0ICs9IG1heC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9ICcpJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBnZXRHcmFkaWVudFN0b3BzKGNvbG9yKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgb3BhY2l0eTogMC4yXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvZmZzZXQ6IDEwMCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XTtcbiAgfVxuXG4gIG9uQ2xpY2sodmFsdWUsIGxhYmVsKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICBuYW1lOiBsYWJlbCxcbiAgICAgIHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFjdGl2YXRlQ2lyY2xlKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtuYW1lOiB0aGlzLmRhdGEubmFtZX0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZUNpcmNsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmJhclZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmNpcmNsZS5vcGFjaXR5ID0gMDtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7bmFtZTogdGhpcy5kYXRhLm5hbWV9KTtcbiAgfVxuXG59XG4iXX0=