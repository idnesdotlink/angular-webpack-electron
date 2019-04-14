import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../common/label.helper';
var BubbleSeriesComponent = /** @class */ (function () {
    function BubbleSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    BubbleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BubbleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    BubbleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series.map(function (d, i) {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                var y = d.y;
                var x = d.x;
                var r = d.r;
                var radius = _this.rScale(r || 1);
                var tooltipLabel = formatLabel(d.name);
                var cx = (_this.xScaleType === 'linear') ? _this.xScale(Number(x)) : _this.xScale(x);
                var cy = (_this.yScaleType === 'linear') ? _this.yScale(Number(y)) : _this.yScale(y);
                var color = (_this.colors.scaleType === 'linear') ?
                    _this.colors.getColor(r) :
                    _this.colors.getColor(seriesName);
                var isActive = !_this.activeEntries.length ? true : _this.isActive({ name: seriesName });
                var opacity = isActive ? 1 : 0.3;
                var data = {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                };
                return {
                    data: data,
                    x: x,
                    y: y,
                    r: r,
                    classNames: ["circle-data-" + i],
                    value: y,
                    label: x,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    isActive: isActive,
                    transform: "translate(" + cx + "," + cy + ")"
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    BubbleSeriesComponent.prototype.getTooltipText = function (circle) {
        var hasRadius = typeof circle.r !== 'undefined';
        var hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        var hasSeriesName = circle.seriesName && circle.seriesName.length;
        var radiusValue = hasRadius ? formatLabel(circle.r) : '';
        var xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? this.xAxisLabel + ":" : '';
        var yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? this.yAxisLabel + ":" : '';
        var x = formatLabel(circle.x);
        var y = formatLabel(circle.y);
        var name = (hasSeriesName && hasTooltipLabel) ?
            circle.seriesName + " \u2022 " + circle.tooltipLabel :
            circle.seriesName + circle.tooltipLabel;
        var tooltipTitle = (hasSeriesName || hasTooltipLabel) ?
            "<span class=\"tooltip-label\">" + name + "</span>" :
            '';
        return "\n      " + tooltipTitle + "\n      <span class=\"tooltip-label\">\n        <label>" + xAxisLabel + "</label> " + x + "<br />\n        <label>" + yAxisLabel + "</label> " + y + "\n      </span>\n      <span class=\"tooltip-val\">\n        " + radiusValue + "\n      </span>\n    ";
    };
    BubbleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    BubbleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    BubbleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    BubbleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.trackBy = function (index, circle) {
        return circle.data.series + " " + circle.data.name;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "rScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "xScaleType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "yScaleType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "visibleValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], BubbleSeriesComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "deactivate", void 0);
    BubbleSeriesComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-bubble-series]',
            template: "\n    <svg:g *ngFor=\"let circle of circles; trackBy: trackBy\">\n      <svg:g [attr.transform]=\"circle.transform\">\n        <svg:g ng-svg-charts-circle\n          [@animationState]=\"'active'\"\n          class=\"circle\"\n          [cx]=\"0\"\n          [cy]=\"0\"\n          [r]=\"circle.radius\"\n          [fill]=\"circle.color\"\n          [style.opacity]=\"circle.opacity\"\n          [class.active]=\"circle.isActive\"\n          [pointerEvents]=\"'all'\"\n          [data]=\"circle.value\"\n          [classNames]=\"circle.classNames\"\n          (select)=\"onClick($event, circle.label)\"\n          (activate)=\"activateCircle(circle)\"\n          (deactivate)=\"deactivateCircle(circle)\"\n          ngx-tooltip\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipPlacement]=\"'top'\"\n          [tooltipType]=\"'tooltip'\"\n          [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipContext]=\"circle.data\"\n        />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0,
                            transform: 'scale(0)'
                        }),
                        animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                    ])
                ])
            ]
        })
    ], BubbleSeriesComponent);
    return BubbleSeriesComponent;
}());
export { BubbleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9idWJibGUtY2hhcnQvYnViYmxlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBOENyRDtJQTVDQTtRQXlEVyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd2QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWtJNUMsQ0FBQztJQTdIQywyQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELDBDQUFVLEdBQVY7UUFBQSxpQkFrREM7UUFqREMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUMvQixJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxL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Q0FBQztxQkFDekQsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRixDQUFDO09BQ1cscUJBQXFCLENBb0pqQztJQUFELDRCQUFDO0NBQUEsQUFwSkQsSUFvSkM7U0FwSlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtYnViYmxlLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgY2lyY2xlIG9mIGNpcmNsZXM7IHRyYWNrQnk6IHRyYWNrQnlcIj5cbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwiY2lyY2xlLnRyYW5zZm9ybVwiPlxuICAgICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1jaXJjbGVcbiAgICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgICAgICBjbGFzcz1cImNpcmNsZVwiXG4gICAgICAgICAgW2N4XT1cIjBcIlxuICAgICAgICAgIFtjeV09XCIwXCJcbiAgICAgICAgICBbcl09XCJjaXJjbGUucmFkaXVzXCJcbiAgICAgICAgICBbZmlsbF09XCJjaXJjbGUuY29sb3JcIlxuICAgICAgICAgIFtzdHlsZS5vcGFjaXR5XT1cImNpcmNsZS5vcGFjaXR5XCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImNpcmNsZS5pc0FjdGl2ZVwiXG4gICAgICAgICAgW3BvaW50ZXJFdmVudHNdPVwiJ2FsbCdcIlxuICAgICAgICAgIFtkYXRhXT1cImNpcmNsZS52YWx1ZVwiXG4gICAgICAgICAgW2NsYXNzTmFtZXNdPVwiY2lyY2xlLmNsYXNzTmFtZXNcIlxuICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQsIGNpcmNsZS5sYWJlbClcIlxuICAgICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZUNpcmNsZShjaXJjbGUpXCJcbiAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlQ2lyY2xlKGNpcmNsZSlcIlxuICAgICAgICAgIG5neC10b29sdGlwXG4gICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcbiAgICAgICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcbiAgICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxuICAgICAgICAvPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKSdcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknfSkpXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQnViYmxlU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgclNjYWxlO1xuICBASW5wdXQoKSB4U2NhbGVUeXBlO1xuICBASW5wdXQoKSB5U2NhbGVUeXBlO1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIHZpc2libGVWYWx1ZTtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgeUF4aXNMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYXJlYVBhdGg6IGFueTtcbiAgY2lyY2xlczogYW55W107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaXJjbGVzID0gdGhpcy5nZXRDaXJjbGVzKCk7XG4gIH1cblxuICBnZXRDaXJjbGVzKCk6IGFueVtdIHtcbiAgICBjb25zdCBzZXJpZXNOYW1lID0gdGhpcy5kYXRhLm5hbWU7XG5cbiAgICByZXR1cm4gdGhpcy5kYXRhLnNlcmllcy5tYXAoKGQsIGkpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZC55ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZC54ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCB5ID0gZC55O1xuICAgICAgICBjb25zdCB4ID0gZC54O1xuICAgICAgICBjb25zdCByID0gZC5yO1xuXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuclNjYWxlKHIgfHwgMSk7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdExhYmVsKGQubmFtZSk7XG5cbiAgICAgICAgY29uc3QgY3ggPSAodGhpcy54U2NhbGVUeXBlID09PSAnbGluZWFyJykgPyB0aGlzLnhTY2FsZShOdW1iZXIoeCkpIDogdGhpcy54U2NhbGUoeCk7XG4gICAgICAgIGNvbnN0IGN5ID0gKHRoaXMueVNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpID8gdGhpcy55U2NhbGUoTnVtYmVyKHkpKSA6IHRoaXMueVNjYWxlKHkpO1xuXG4gICAgICAgIGNvbnN0IGNvbG9yID0gKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpID9cbiAgICAgICAgICB0aGlzLmNvbG9ycy5nZXRDb2xvcihyKSA6XG4gICAgICAgICAgdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XG5cbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSAhdGhpcy5hY3RpdmVFbnRyaWVzLmxlbmd0aCA/IHRydWUgOiB0aGlzLmlzQWN0aXZlKHtuYW1lOiBzZXJpZXNOYW1lfSk7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBpc0FjdGl2ZSA/IDEgOiAwLjM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICBzZXJpZXM6IHNlcmllc05hbWUsXG4gICAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgICAgIHZhbHVlOiBkLnksXG4gICAgICAgICAgeDogZC54LFxuICAgICAgICAgIHJhZGl1czogZC5yXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIHgsXG4gICAgICAgICAgeSxcbiAgICAgICAgICByLFxuICAgICAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxuICAgICAgICAgIHZhbHVlOiB5LFxuICAgICAgICAgIGxhYmVsOiB4LFxuICAgICAgICAgIGN4LFxuICAgICAgICAgIGN5LFxuICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICB0b29sdGlwTGFiZWwsXG4gICAgICAgICAgY29sb3IsXG4gICAgICAgICAgb3BhY2l0eSxcbiAgICAgICAgICBzZXJpZXNOYW1lLFxuICAgICAgICAgIGlzQWN0aXZlLFxuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke2N4fSwke2N5fSlgXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSkuZmlsdGVyKChjaXJjbGUpID0+IGNpcmNsZSAhPT0gdW5kZWZpbmVkKTtcbiAgfVxuXG4gIGdldFRvb2x0aXBUZXh0KGNpcmNsZSk6IHN0cmluZyB7XG4gICAgY29uc3QgaGFzUmFkaXVzID0gdHlwZW9mIGNpcmNsZS5yICE9PSAndW5kZWZpbmVkJztcbiAgICBjb25zdCBoYXNUb29sdGlwTGFiZWwgPSBjaXJjbGUudG9vbHRpcExhYmVsICYmIGNpcmNsZS50b29sdGlwTGFiZWwubGVuZ3RoO1xuICAgIGNvbnN0IGhhc1Nlcmllc05hbWUgPSBjaXJjbGUuc2VyaWVzTmFtZSAmJiBjaXJjbGUuc2VyaWVzTmFtZS5sZW5ndGg7XG5cbiAgICBjb25zdCByYWRpdXNWYWx1ZSA9IGhhc1JhZGl1cyA/IGZvcm1hdExhYmVsKGNpcmNsZS5yKSA6ICcnO1xuICAgIGNvbnN0IHhBeGlzTGFiZWwgPSB0aGlzLnhBeGlzTGFiZWwgJiYgdGhpcy54QXhpc0xhYmVsICE9PSAnJyA/IGAke3RoaXMueEF4aXNMYWJlbH06YCA6ICcnO1xuICAgIGNvbnN0IHlBeGlzTGFiZWwgPSB0aGlzLnlBeGlzTGFiZWwgJiYgdGhpcy55QXhpc0xhYmVsICE9PSAnJyA/IGAke3RoaXMueUF4aXNMYWJlbH06YCA6ICcnO1xuICAgIGNvbnN0IHggPSBmb3JtYXRMYWJlbChjaXJjbGUueCk7XG4gICAgY29uc3QgeSA9IGZvcm1hdExhYmVsKGNpcmNsZS55KTtcbiAgICBjb25zdCBuYW1lID0gKGhhc1Nlcmllc05hbWUgJiYgaGFzVG9vbHRpcExhYmVsKSA/XG4gICAgICBgJHtjaXJjbGUuc2VyaWVzTmFtZX0g4oCiICR7Y2lyY2xlLnRvb2x0aXBMYWJlbH1gIDpcbiAgICAgIGNpcmNsZS5zZXJpZXNOYW1lICsgY2lyY2xlLnRvb2x0aXBMYWJlbDtcbiAgICBjb25zdCB0b29sdGlwVGl0bGUgPSAoaGFzU2VyaWVzTmFtZSB8fCBoYXNUb29sdGlwTGFiZWwpID9cbiAgICAgIGA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke25hbWV9PC9zcGFuPmAgOlxuICAgICAgJyc7XG5cbiAgICByZXR1cm4gYFxuICAgICAgJHt0b29sdGlwVGl0bGV9XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj5cbiAgICAgICAgPGxhYmVsPiR7eEF4aXNMYWJlbH08L2xhYmVsPiAke3h9PGJyIC8+XG4gICAgICAgIDxsYWJlbD4ke3lBeGlzTGFiZWx9PC9sYWJlbD4gJHt5fVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPlxuICAgICAgICAke3JhZGl1c1ZhbHVlfVxuICAgICAgPC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICBvbkNsaWNrKHZhbHVlLCBsYWJlbCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgbmFtZTogbGFiZWwsXG4gICAgICB2YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBpc1Zpc2libGUoY2lyY2xlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZSh7bmFtZTogY2lyY2xlLnNlcmllc05hbWV9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2lyY2xlLm9wYWNpdHkgIT09IDA7XG4gIH1cblxuICBhY3RpdmF0ZUNpcmNsZShjaXJjbGUpOiB2b2lkIHtcbiAgICBjaXJjbGUuYmFyVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtuYW1lOiB0aGlzLmRhdGEubmFtZX0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpOiB2b2lkIHtcbiAgICBjaXJjbGUuYmFyVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHtuYW1lOiB0aGlzLmRhdGEubmFtZX0pO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgY2lyY2xlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7Y2lyY2xlLmRhdGEuc2VyaWVzfSAke2NpcmNsZS5kYXRhLm5hbWV9YDtcbiAgfVxufVxuIl19