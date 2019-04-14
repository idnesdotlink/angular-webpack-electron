import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
let CircleComponent = class CircleComponent {
    constructor() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    onClick() {
        this.select.emit(this.data);
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    ngOnChanges(changes) {
        this.classNames = Array.isArray(this.classNames) ?
            this.classNames.join(' ') :
            '';
        this.classNames += 'circle';
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "cx", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "cy", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "r", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "fill", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "stroke", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "classNames", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "circleOpacity", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "pointerEvents", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CircleComponent.prototype, "deactivate", void 0);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CircleComponent.prototype, "onClick", null);
tslib_1.__decorate([
    HostListener('mouseenter'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseEnter", null);
tslib_1.__decorate([
    HostListener('mouseleave'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseLeave", null);
CircleComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-circle]',
        template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CircleComponent);
export { CircleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9jaXJjbGUvY2lyY2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFFWix1QkFBdUIsRUFDdkIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBa0J2QixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBaEI1QjtRQTRCWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXdCNUMsQ0FBQztJQXJCQyxPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDO1FBQ0wsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7SUFDOUIsQ0FBQztDQUVGLENBQUE7QUFwQ1U7SUFBUixLQUFLLEVBQUU7OzJDQUFJO0FBQ0g7SUFBUixLQUFLLEVBQUU7OzJDQUFJO0FBQ0g7SUFBUixLQUFLLEVBQUU7OzBDQUFHO0FBQ0Y7SUFBUixLQUFLLEVBQUU7OzZDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7OytDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7OzZDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7O21EQUFZO0FBQ1g7SUFBUixLQUFLLEVBQUU7O3NEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7O3NEQUFlO0FBRWI7SUFBVCxNQUFNLEVBQUU7OytDQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTs7aURBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFOzttREFBaUM7QUFHMUM7SUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzs7OzhDQUdyQjtBQUdEO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7OzttREFHMUI7QUFHRDtJQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7bURBRzFCO0FBN0JVLGVBQWU7SUFoQjNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLGVBQWUsQ0FzQzNCO1NBdENZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSG9zdExpc3RlbmVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtY2lyY2xlXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpjaXJjbGVcbiAgICAgIFthdHRyLmN4XT1cImN4XCJcbiAgICAgIFthdHRyLmN5XT1cImN5XCJcbiAgICAgIFthdHRyLnJdPVwiclwiXG4gICAgICBbYXR0ci5maWxsXT1cImZpbGxcIlxuICAgICAgW2F0dHIuc3Ryb2tlXT1cInN0cm9rZVwiXG4gICAgICBbYXR0ci5vcGFjaXR5XT1cImNpcmNsZU9wYWNpdHlcIlxuICAgICAgW2F0dHIuY2xhc3NdPVwiY2xhc3NOYW1lc1wiXG4gICAgICBbYXR0ci5wb2ludGVyLWV2ZW50c109XCJwb2ludGVyRXZlbnRzXCJcbiAgICAvPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDaXJjbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGN4O1xuICBASW5wdXQoKSBjeTtcbiAgQElucHV0KCkgcjtcbiAgQElucHV0KCkgZmlsbDtcbiAgQElucHV0KCkgc3Ryb2tlO1xuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSBjbGFzc05hbWVzO1xuICBASW5wdXQoKSBjaXJjbGVPcGFjaXR5O1xuICBASW5wdXQoKSBwb2ludGVyRXZlbnRzO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc05hbWVzID0gQXJyYXkuaXNBcnJheSh0aGlzLmNsYXNzTmFtZXMpID9cbiAgICAgIHRoaXMuY2xhc3NOYW1lcy5qb2luKCcgJykgOlxuICAgICAgJyc7XG4gICAgdGhpcy5jbGFzc05hbWVzICs9ICdjaXJjbGUnO1xuICB9XG5cbn1cbiJdfQ==