import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
var GaugeArcComponent = /** @class */ (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = formatLabel(arc.data.name);
        var val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "backgroundArc", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "valueArc", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "cornerRadius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ColorHelper)
    ], GaugeArcComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "isActive", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], GaugeArcComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "deactivate", void 0);
    GaugeArcComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-gauge-arc]',
            template: "\n    <svg:g ng-svg-charts-pie-arc\n      class=\"background-arc\"\n      [startAngle]=\"0\"\n      [endAngle]=\"backgroundArc.endAngle\"\n      [innerRadius]=\"backgroundArc.innerRadius\"\n      [outerRadius]=\"backgroundArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [data]=\"backgroundArc.data\"\n      [animate]=\"false\"\n      [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ng-svg-charts-pie-arc\n      [startAngle]=\"0\"\n      [endAngle]=\"valueArc.endAngle\"\n      [innerRadius]=\"valueArc.innerRadius\"\n      [outerRadius]=\"valueArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [fill]=\"colors.getColor(valueArc.data.name)\"\n      [data]=\"valueArc.data\"\n      [animate]=\"animations\"\n      [isActive]=\"isActive\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(valueArc)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"valueArc.data\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeArcComponent);
    return GaugeArcComponent;
}());
export { GaugeArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXJjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2dhdWdlLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBd0NyRDtJQXRDQTtRQTRDVyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBR3hCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFpQjVDLENBQUM7SUFmQyx1Q0FBVyxHQUFYLFVBQVksR0FBRztRQUNiLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksR0FBRyxDQUFDO1FBRVIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sMkNBQ3lCLEtBQUssbURBQ1AsR0FBRyxrQkFDaEMsQ0FBQztJQUNKLENBQUM7SUE1QlE7UUFBUixLQUFLLEVBQUU7OzREQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs7dURBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7MkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzBDQUFTLFdBQVc7cURBQUM7SUFDcEI7UUFBUixLQUFLLEVBQUU7O3VEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7OERBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzs4REFBeUM7SUFDeEM7UUFBUixLQUFLLEVBQUU7MENBQWtCLFdBQVc7OERBQU07SUFDbEM7UUFBUixLQUFLLEVBQUU7O3lEQUFtQjtJQUVqQjtRQUFULE1BQU0sRUFBRTs7cURBQTZCO0lBQzVCO1FBQVQsTUFBTSxFQUFFOzt1REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7O3lEQUFpQztJQWQvQixpQkFBaUI7UUF0QzdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsUUFBUSxFQUFFLHVzQ0FpQ1Q7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csaUJBQWlCLENBK0I3QjtJQUFELHdCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0EvQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtZ2F1Z2UtYXJjXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtcGllLWFyY1xuICAgICAgY2xhc3M9XCJiYWNrZ3JvdW5kLWFyY1wiXG4gICAgICBbc3RhcnRBbmdsZV09XCIwXCJcbiAgICAgIFtlbmRBbmdsZV09XCJiYWNrZ3JvdW5kQXJjLmVuZEFuZ2xlXCJcbiAgICAgIFtpbm5lclJhZGl1c109XCJiYWNrZ3JvdW5kQXJjLmlubmVyUmFkaXVzXCJcbiAgICAgIFtvdXRlclJhZGl1c109XCJiYWNrZ3JvdW5kQXJjLm91dGVyUmFkaXVzXCJcbiAgICAgIFtjb3JuZXJSYWRpdXNdPVwiY29ybmVyUmFkaXVzXCJcbiAgICAgIFtkYXRhXT1cImJhY2tncm91bmRBcmMuZGF0YVwiXG4gICAgICBbYW5pbWF0ZV09XCJmYWxzZVwiXG4gICAgICBbcG9pbnRlckV2ZW50c109XCJmYWxzZVwiPlxuICAgIDwvc3ZnOmc+XG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtcGllLWFyY1xuICAgICAgW3N0YXJ0QW5nbGVdPVwiMFwiXG4gICAgICBbZW5kQW5nbGVdPVwidmFsdWVBcmMuZW5kQW5nbGVcIlxuICAgICAgW2lubmVyUmFkaXVzXT1cInZhbHVlQXJjLmlubmVyUmFkaXVzXCJcbiAgICAgIFtvdXRlclJhZGl1c109XCJ2YWx1ZUFyYy5vdXRlclJhZGl1c1wiXG4gICAgICBbY29ybmVyUmFkaXVzXT1cImNvcm5lclJhZGl1c1wiXG4gICAgICBbZmlsbF09XCJjb2xvcnMuZ2V0Q29sb3IodmFsdWVBcmMuZGF0YS5uYW1lKVwiXG4gICAgICBbZGF0YV09XCJ2YWx1ZUFyYy5kYXRhXCJcbiAgICAgIFthbmltYXRlXT1cImFuaW1hdGlvbnNcIlxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoJGV2ZW50KVwiXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIG5neC10b29sdGlwXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcbiAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdG9vbHRpcFRleHQodmFsdWVBcmMpXCJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIFt0b29sdGlwQ29udGV4dF09XCJ2YWx1ZUFyYy5kYXRhXCI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdhdWdlQXJjQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBiYWNrZ3JvdW5kQXJjOiBhbnk7XG4gIEBJbnB1dCgpIHZhbHVlQXJjOiBhbnk7XG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1czogYW55O1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBpc0FjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdG9vbHRpcFRleHQoYXJjKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYWJlbCA9IGZvcm1hdExhYmVsKGFyYy5kYXRhLm5hbWUpO1xuICAgIGxldCB2YWw7XG5cbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcbiAgICAgIHZhbCA9IHRoaXMudmFsdWVGb3JtYXR0aW5nKGFyYy5kYXRhLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsID0gZm9ybWF0TGFiZWwoYXJjLmRhdGEudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbH08L3NwYW4+XG4gICAgYDtcbiAgfVxufVxuIl19