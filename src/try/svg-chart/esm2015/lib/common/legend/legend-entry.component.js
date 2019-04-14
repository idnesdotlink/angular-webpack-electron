import * as tslib_1 from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
let LegendEntryComponent = class LegendEntryComponent {
    constructor() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    get trimmedLabel() {
        return this.formattedLabel || '(empty)';
    }
    onMouseEnter() {
        this.activate.emit({ name: this.label });
    }
    onMouseLeave() {
        this.deactivate.emit({ name: this.label });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LegendEntryComponent.prototype, "color", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LegendEntryComponent.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LegendEntryComponent.prototype, "formattedLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LegendEntryComponent.prototype, "isActive", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "deactivate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "toggle", void 0);
tslib_1.__decorate([
    HostListener('mouseenter'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseEnter", null);
tslib_1.__decorate([
    HostListener('mouseleave'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseLeave", null);
LegendEntryComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-svg-charts-legend-entry',
        template: `
    <span
      [title]="formattedLabel"
      tabindex="-1"
      [class.active]="isActive"
      (click)="select.emit(formattedLabel)">
      <span
        class="legend-label-color"
        [style.background-color]="color"
        (click)="toggle.emit(formattedLabel)">
      </span>
      <span class="legend-label-text">
        {{trimmedLabel}}
      </span>
    </span>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], LegendEntryComponent);
export { LegendEntryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBc0J4QixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQXBCakM7UUF5QlcsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVoQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFnQjNELENBQUM7SUFkQyxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxDQUFDO0lBQzFDLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBRUYsQ0FBQTtBQXhCVTtJQUFSLEtBQUssRUFBRTs7bURBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7bURBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTs7NERBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFOztzREFBa0I7QUFFaEI7SUFBVCxNQUFNLEVBQUU7c0NBQVMsWUFBWTtvREFBMkI7QUFDL0M7SUFBVCxNQUFNLEVBQUU7c0NBQVcsWUFBWTtzREFBMkI7QUFDakQ7SUFBVCxNQUFNLEVBQUU7c0NBQWEsWUFBWTt3REFBMkI7QUFDbkQ7SUFBVCxNQUFNLEVBQUU7c0NBQVMsWUFBWTtvREFBMkI7QUFPekQ7SUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzs7O3dEQUcxQjtBQUdEO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7Ozt3REFHMUI7QUF4QlUsb0JBQW9CO0lBcEJoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csb0JBQW9CLENBMEJoQztTQTFCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBIb3N0TGlzdGVuZXIsXG4gIEV2ZW50RW1pdHRlclxuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXN2Zy1jaGFydHMtbGVnZW5kLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhblxuICAgICAgW3RpdGxlXT1cImZvcm1hdHRlZExhYmVsXCJcbiAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZVwiXG4gICAgICAoY2xpY2spPVwic2VsZWN0LmVtaXQoZm9ybWF0dGVkTGFiZWwpXCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImxlZ2VuZC1sYWJlbC1jb2xvclwiXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZS5lbWl0KGZvcm1hdHRlZExhYmVsKVwiPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmQtbGFiZWwtdGV4dFwiPlxuICAgICAgICB7e3RyaW1tZWRMYWJlbH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMZWdlbmRFbnRyeUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgbGFiZWw6IGFueTtcbiAgQElucHV0KCkgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgaXNBY3RpdmUgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgdHJpbW1lZExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVkTGFiZWwgfHwgJyhlbXB0eSknO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe25hbWU6IHRoaXMubGFiZWx9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoe25hbWU6IHRoaXMubGFiZWx9KTtcbiAgfVxuXG59XG4iXX0=