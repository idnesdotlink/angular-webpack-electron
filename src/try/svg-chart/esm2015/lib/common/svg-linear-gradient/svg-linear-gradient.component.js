import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let SvgLinearGradientComponent = class SvgLinearGradientComponent {
    constructor() {
        this.orientation = 'vertical';
    }
    ngOnChanges(changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SvgLinearGradientComponent.prototype, "orientation", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SvgLinearGradientComponent.prototype, "name", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SvgLinearGradientComponent.prototype, "stops", void 0);
SvgLinearGradientComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-svg-linear-gradient]',
        template: `
    <svg:linearGradient
      [id]="name"
      [attr.x1]="x1"
      [attr.y1]="y1"
      [attr.x2]="x2"
      [attr.y2]="y2">
      <svg:stop *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:linearGradient>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SvgLinearGradientComponent);
export { SvgLinearGradientComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWxpbmVhci1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vc3ZnLWxpbmVhci1ncmFkaWVudC9zdmctbGluZWFyLWdyYWRpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBb0J2QixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQWxCdkM7UUFvQlcsZ0JBQVcsR0FBRyxVQUFVLENBQUM7SUFzQnBDLENBQUM7SUFiQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUMxQyxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztTQUNsQjtJQUVILENBQUM7Q0FDRixDQUFBO0FBdEJVO0lBQVIsS0FBSyxFQUFFOzsrREFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7O3dEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7O3lEQUFjO0FBSlgsMEJBQTBCO0lBbEJ0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0NBQXNDO1FBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLDBCQUEwQixDQXdCdEM7U0F4QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmxpbmVhckdyYWRpZW50XG4gICAgICBbaWRdPVwibmFtZVwiXG4gICAgICBbYXR0ci54MV09XCJ4MVwiXG4gICAgICBbYXR0ci55MV09XCJ5MVwiXG4gICAgICBbYXR0ci54Ml09XCJ4MlwiXG4gICAgICBbYXR0ci55Ml09XCJ5MlwiPlxuICAgICAgPHN2ZzpzdG9wICpuZ0Zvcj1cImxldCBzdG9wIG9mIHN0b3BzXCJcbiAgICAgICAgW2F0dHIub2Zmc2V0XT1cInN0b3Aub2Zmc2V0ICsgJyUnXCJcbiAgICAgICAgW3N0eWxlLnN0b3AtY29sb3JdPVwic3RvcC5jb2xvclwiXG4gICAgICAgIFtzdHlsZS5zdG9wLW9wYWNpdHldPVwic3RvcC5vcGFjaXR5XCJcbiAgICAgIC8+XG4gICAgPC9zdmc6bGluZWFyR3JhZGllbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFN2Z0xpbmVhckdyYWRpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gIEBJbnB1dCgpIG5hbWU7XG4gIEBJbnB1dCgpIHN0b3BzOiBhbnlbXTtcblxuICB4MTogYW55O1xuICB4MjogYW55O1xuICB5MTogYW55O1xuICB5MjogYW55O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLngxID0gJzAlJztcbiAgICB0aGlzLngyID0gJzAlJztcbiAgICB0aGlzLnkxID0gJzAlJztcbiAgICB0aGlzLnkyID0gJzAlJztcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMueDIgPSAnMTAwJSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLnkxID0gJzEwMCUnO1xuICAgIH1cblxuICB9XG59XG4iXX0=