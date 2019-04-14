import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
let GaugeArcComponent = class GaugeArcComponent {
    constructor() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    tooltipText(arc) {
        const label = formatLabel(arc.data.name);
        let val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
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
        template: `
    <svg:g ng-svg-charts-pie-arc
      class="background-arc"
      [startAngle]="0"
      [endAngle]="backgroundArc.endAngle"
      [innerRadius]="backgroundArc.innerRadius"
      [outerRadius]="backgroundArc.outerRadius"
      [cornerRadius]="cornerRadius"
      [data]="backgroundArc.data"
      [animate]="false"
      [pointerEvents]="false">
    </svg:g>
    <svg:g ng-svg-charts-pie-arc
      [startAngle]="0"
      [endAngle]="valueArc.endAngle"
      [innerRadius]="valueArc.innerRadius"
      [outerRadius]="valueArc.outerRadius"
      [cornerRadius]="cornerRadius"
      [fill]="colors.getColor(valueArc.data.name)"
      [data]="valueArc.data"
      [animate]="animations"
      [isActive]="isActive"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(valueArc)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="valueArc.data">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GaugeArcComponent);
export { GaugeArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXJjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2dhdWdlLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBd0NyRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQXRDOUI7UUE0Q1csYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBaUI1QyxDQUFDO0lBZkMsV0FBVyxDQUFDLEdBQUc7UUFDYixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLEdBQUcsQ0FBQztRQUVSLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPO29DQUN5QixLQUFLO2tDQUNQLEdBQUc7S0FDaEMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBN0JVO0lBQVIsS0FBSyxFQUFFOzt3REFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O21EQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7O3VEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtzQ0FBUyxXQUFXO2lEQUFDO0FBQ3BCO0lBQVIsS0FBSyxFQUFFOzttREFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7OzBEQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTs7MERBQXlDO0FBQ3hDO0lBQVIsS0FBSyxFQUFFO3NDQUFrQixXQUFXOzBEQUFNO0FBQ2xDO0lBQVIsS0FBSyxFQUFFOztxREFBbUI7QUFFakI7SUFBVCxNQUFNLEVBQUU7O2lEQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTs7bURBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFOztxREFBaUM7QUFkL0IsaUJBQWlCO0lBdEM3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLGlCQUFpQixDQStCN0I7U0EvQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtZ2F1Z2UtYXJjXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtcGllLWFyY1xuICAgICAgY2xhc3M9XCJiYWNrZ3JvdW5kLWFyY1wiXG4gICAgICBbc3RhcnRBbmdsZV09XCIwXCJcbiAgICAgIFtlbmRBbmdsZV09XCJiYWNrZ3JvdW5kQXJjLmVuZEFuZ2xlXCJcbiAgICAgIFtpbm5lclJhZGl1c109XCJiYWNrZ3JvdW5kQXJjLmlubmVyUmFkaXVzXCJcbiAgICAgIFtvdXRlclJhZGl1c109XCJiYWNrZ3JvdW5kQXJjLm91dGVyUmFkaXVzXCJcbiAgICAgIFtjb3JuZXJSYWRpdXNdPVwiY29ybmVyUmFkaXVzXCJcbiAgICAgIFtkYXRhXT1cImJhY2tncm91bmRBcmMuZGF0YVwiXG4gICAgICBbYW5pbWF0ZV09XCJmYWxzZVwiXG4gICAgICBbcG9pbnRlckV2ZW50c109XCJmYWxzZVwiPlxuICAgIDwvc3ZnOmc+XG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtcGllLWFyY1xuICAgICAgW3N0YXJ0QW5nbGVdPVwiMFwiXG4gICAgICBbZW5kQW5nbGVdPVwidmFsdWVBcmMuZW5kQW5nbGVcIlxuICAgICAgW2lubmVyUmFkaXVzXT1cInZhbHVlQXJjLmlubmVyUmFkaXVzXCJcbiAgICAgIFtvdXRlclJhZGl1c109XCJ2YWx1ZUFyYy5vdXRlclJhZGl1c1wiXG4gICAgICBbY29ybmVyUmFkaXVzXT1cImNvcm5lclJhZGl1c1wiXG4gICAgICBbZmlsbF09XCJjb2xvcnMuZ2V0Q29sb3IodmFsdWVBcmMuZGF0YS5uYW1lKVwiXG4gICAgICBbZGF0YV09XCJ2YWx1ZUFyYy5kYXRhXCJcbiAgICAgIFthbmltYXRlXT1cImFuaW1hdGlvbnNcIlxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoJGV2ZW50KVwiXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIG5neC10b29sdGlwXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcbiAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdG9vbHRpcFRleHQodmFsdWVBcmMpXCJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIFt0b29sdGlwQ29udGV4dF09XCJ2YWx1ZUFyYy5kYXRhXCI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdhdWdlQXJjQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBiYWNrZ3JvdW5kQXJjOiBhbnk7XG4gIEBJbnB1dCgpIHZhbHVlQXJjOiBhbnk7XG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1czogYW55O1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBpc0FjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdG9vbHRpcFRleHQoYXJjKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYWJlbCA9IGZvcm1hdExhYmVsKGFyYy5kYXRhLm5hbWUpO1xuICAgIGxldCB2YWw7XG5cbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcbiAgICAgIHZhbCA9IHRoaXMudmFsdWVGb3JtYXR0aW5nKGFyYy5kYXRhLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsID0gZm9ybWF0TGFiZWwoYXJjLmRhdGEudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbH08L3NwYW4+XG4gICAgYDtcbiAgfVxufVxuIl19