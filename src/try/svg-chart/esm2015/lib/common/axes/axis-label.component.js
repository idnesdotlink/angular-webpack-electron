import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
let AxisLabelComponent = class AxisLabelComponent {
    constructor(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AxisLabelComponent.prototype, "orient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AxisLabelComponent.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AxisLabelComponent.prototype, "offset", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AxisLabelComponent.prototype, "width", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AxisLabelComponent.prototype, "height", void 0);
AxisLabelComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-axis-label]',
        template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform">
      {{label}}
    </svg:text>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], AxisLabelComponent);
export { AxisLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYXhlcy9heGlzLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUdWLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQWdCdkIsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFpQjdCLFlBQVksT0FBbUI7UUFIL0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBR1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQy9CLE1BQU07WUFDUixRQUFRO1NBQ1Q7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQW5EVTtJQUFSLEtBQUssRUFBRTs7a0RBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7aURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTs7a0RBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7aURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTs7a0RBQVE7QUFOTCxrQkFBa0I7SUFkOUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQzs2Q0FrQnFCLFVBQVU7R0FqQnBCLGtCQUFrQixDQXFEOUI7U0FyRFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWF4aXMtbGFiZWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnRleHRcbiAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiXG4gICAgICBbYXR0ci54XT1cInhcIlxuICAgICAgW2F0dHIueV09XCJ5XCJcbiAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxuICAgICAge3tsYWJlbH19XG4gICAgPC9zdmc6dGV4dD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQXhpc0xhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBvcmllbnQ7XG4gIEBJbnB1dCgpIGxhYmVsO1xuICBASW5wdXQoKSBvZmZzZXQ7XG4gIEBJbnB1dCgpIHdpZHRoO1xuICBASW5wdXQoKSBoZWlnaHQ7XG5cbiAgeDogYW55O1xuICB5OiBhbnk7XG4gIHRyYW5zZm9ybTogYW55O1xuICBzdHJva2VXaWR0aDogYW55O1xuICB0ZXh0QW5jaG9yOiBhbnk7XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHRleHRIZWlnaHQgPSAyNTtcbiAgbWFyZ2luID0gNTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdHJva2VXaWR0aCA9ICcwLjAxJztcbiAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcbiAgICB0aGlzLnRyYW5zZm9ybSA9ICcnO1xuXG4gICAgc3dpdGNoICh0aGlzLm9yaWVudCkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0O1xuICAgICAgICB0aGlzLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdGhpcy55ID0gLSAodGhpcy5vZmZzZXQgKyB0aGlzLnRleHRIZWlnaHQgKyB0aGlzLm1hcmdpbik7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gJ3JvdGF0ZSgyNzApJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0ICsgdGhpcy5tYXJnaW47XG4gICAgICAgIHRoaXMueCA9IC10aGlzLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gJ3JvdGF0ZSgyNzApJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxuXG59XG4iXX0=