import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
var AxisLabelComponent = /** @class */ (function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
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
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], AxisLabelComponent);
    return AxisLabelComponent;
}());
export { AxisLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYXhlcy9heGlzLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUdWLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQWdCdkI7SUFpQkUsNEJBQVksT0FBbUI7UUFIL0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBR1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx3Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQy9CLE1BQU07WUFDUixRQUFRO1NBQ1Q7SUFDSCxDQUFDO0lBakRRO1FBQVIsS0FBSyxFQUFFOztzREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztxREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOztzREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztxREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOztzREFBUTtJQU5MLGtCQUFrQjtRQWQ5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFFBQVEsRUFBRSw4TkFTVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7aURBa0JxQixVQUFVO09BakJwQixrQkFBa0IsQ0FxRDlCO0lBQUQseUJBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXJEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtYXhpcy1sYWJlbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6dGV4dFxuICAgICAgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN0cm9rZVdpZHRoXCJcbiAgICAgIFthdHRyLnhdPVwieFwiXG4gICAgICBbYXR0ci55XT1cInlcIlxuICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiXG4gICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XG4gICAgICB7e2xhYmVsfX1cbiAgICA8L3N2Zzp0ZXh0PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBeGlzTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIG9yaWVudDtcbiAgQElucHV0KCkgbGFiZWw7XG4gIEBJbnB1dCgpIG9mZnNldDtcbiAgQElucHV0KCkgd2lkdGg7XG4gIEBJbnB1dCgpIGhlaWdodDtcblxuICB4OiBhbnk7XG4gIHk6IGFueTtcbiAgdHJhbnNmb3JtOiBhbnk7XG4gIHN0cm9rZVdpZHRoOiBhbnk7XG4gIHRleHRBbmNob3I6IGFueTtcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgdGV4dEhlaWdodCA9IDI1O1xuICBtYXJnaW4gPSA1O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0cm9rZVdpZHRoID0gJzAuMDEnO1xuICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xuICAgIHRoaXMudHJhbnNmb3JtID0gJyc7XG5cbiAgICBzd2l0Y2ggKHRoaXMub3JpZW50KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0aGlzLnkgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLnkgPSAtICh0aGlzLm9mZnNldCArIHRoaXMudGV4dEhlaWdodCArIHRoaXMubWFyZ2luKTtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSAncm90YXRlKDI3MCknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQgKyB0aGlzLm1hcmdpbjtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSAncm90YXRlKDI3MCknO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==