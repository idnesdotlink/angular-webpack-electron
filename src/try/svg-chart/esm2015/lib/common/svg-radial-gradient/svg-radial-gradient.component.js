import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let SvgRadialGradientComponent = class SvgRadialGradientComponent {
    constructor() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    get stops() {
        return this.stopsInput || this.stopsDefault;
    }
    set stops(value) {
        this.stopsInput = value;
    }
    ngOnChanges(changes) {
        this.r = '30%';
        if (('color' in changes) ||
            ('startOpacity' in changes) ||
            ('endOpacity' in changes)) {
            this.stopsDefault = [{
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                }, {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }];
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SvgRadialGradientComponent.prototype, "color", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SvgRadialGradientComponent.prototype, "name", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "cx", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "cy", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], SvgRadialGradientComponent.prototype, "stops", null);
SvgRadialGradientComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-svg-radial-gradient]',
        template: `
    <svg:radialGradient
      [id]="name"
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      gradientUnits="userSpaceOnUse">
      <svg:stop *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SvgRadialGradientComponent);
export { SvgRadialGradientComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vc3ZnLXJhZGlhbC1ncmFkaWVudC9zdmctcmFkaWFsLWdyYWRpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQ3JELE1BQU0sZUFBZSxDQUFDO0FBb0J2QixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQWxCdkM7UUF1QlcsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLE9BQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxPQUFFLEdBQUcsQ0FBQyxDQUFDO0lBa0NsQixDQUFDO0lBL0JDLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFPRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDZixJQUNFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUNwQixDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUM7WUFDM0IsQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDO29CQUNuQixNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtpQkFDM0IsRUFBRTtvQkFDRCxNQUFNLEVBQUUsR0FBRztvQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDekIsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQXZDVTtJQUFSLEtBQUssRUFBRTs7eURBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7d0RBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7Z0VBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzs4REFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7c0RBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7c0RBQVE7QUFHaEI7SUFEQyxLQUFLLEVBQUU7Ozt1REFHUDtBQVpVLDBCQUEwQjtJQWxCdEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNDQUFzQztRQUNoRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVywwQkFBMEIsQ0F5Q3RDO1NBekNZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy1zdmctcmFkaWFsLWdyYWRpZW50XScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpyYWRpYWxHcmFkaWVudFxuICAgICAgW2lkXT1cIm5hbWVcIlxuICAgICAgW2F0dHIuY3hdPVwiY3hcIlxuICAgICAgW2F0dHIuY3ldPVwiY3lcIlxuICAgICAgW2F0dHIucl09XCJyXCJcbiAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxuICAgICAgPHN2ZzpzdG9wICpuZ0Zvcj1cImxldCBzdG9wIG9mIHN0b3BzXCJcbiAgICAgICAgW2F0dHIub2Zmc2V0XT1cInN0b3Aub2Zmc2V0ICsgJyUnXCJcbiAgICAgICAgW3N0eWxlLnN0b3AtY29sb3JdPVwic3RvcC5jb2xvclwiXG4gICAgICAgIFtzdHlsZS5zdG9wLW9wYWNpdHldPVwic3RvcC5vcGFjaXR5XCJcbiAgICAgIC8+XG4gICAgPC9zdmc6cmFkaWFsR3JhZGllbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFN2Z1JhZGlhbEdyYWRpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0YXJ0T3BhY2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSBlbmRPcGFjaXR5ID0gMTtcbiAgQElucHV0KCkgY3ggPSAwO1xuICBASW5wdXQoKSBjeSA9IDA7XG5cbiAgQElucHV0KClcbiAgZ2V0IHN0b3BzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wc0lucHV0IHx8IHRoaXMuc3RvcHNEZWZhdWx0O1xuICB9XG5cbiAgc2V0IHN0b3BzKHZhbHVlOiBhbnlbXSkge1xuICAgIHRoaXMuc3RvcHNJbnB1dCA9IHZhbHVlO1xuICB9XG5cbiAgcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgc3RvcHNJbnB1dDogYW55W107XG4gIHByaXZhdGUgc3RvcHNEZWZhdWx0OiBhbnlbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5yID0gJzMwJSc7XG4gICAgaWYgKFxuICAgICAgKCdjb2xvcicgaW4gY2hhbmdlcykgfHxcbiAgICAgICgnc3RhcnRPcGFjaXR5JyBpbiBjaGFuZ2VzKSB8fFxuICAgICAgKCdlbmRPcGFjaXR5JyBpbiBjaGFuZ2VzKSkge1xuICAgICAgICB0aGlzLnN0b3BzRGVmYXVsdCA9IFt7XG4gICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICAgIG9wYWNpdHk6IHRoaXMuc3RhcnRPcGFjaXR5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBvZmZzZXQ6IDEwMCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLmVuZE9wYWNpdHlcbiAgICAgICAgfV07XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==