import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ElementRef, Output, EventEmitter } from '@angular/core';
import { formatLabel } from '../../common/label.helper';
var BarLabelComponent = /** @class */ (function () {
    function BarLabelComponent(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    BarLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BarLabelComponent.prototype.getSize = function () {
        var h = this.element.getBoundingClientRect().height;
        var w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    };
    BarLabelComponent.prototype.ngAfterViewInit = function () {
        this.dimensionsChanged.emit(this.getSize());
    };
    BarLabelComponent.prototype.update = function () {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        }
        else {
            this.formatedValue = formatLabel(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            // if the value is negative then it's on the left of the x0.
            // we need to put the data label in front of the bar
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        }
        else {
            // orientation must be "vertical"
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = "rotate(-45, " + this.x + " , " + this.y + ")";
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barX", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barY", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barWidth", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barHeight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarLabelComponent.prototype, "orientation", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], BarLabelComponent.prototype, "dimensionsChanged", void 0);
    BarLabelComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-bar-label]',
            template: "\n    <svg:text\n      class=\"textDataLabel\"\n      alignment-baseline=\"middle\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\">\n      {{formatedValue}}\n    </svg:text>\n\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".textDataLabel{font-size:11px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], BarLabelComponent);
    return BarLabelComponent;
}());
export { BarLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItbGFiZWwvYmFyLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQW9CdEQ7SUFxQkUsMkJBQVksT0FBbUI7UUFYckIsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLcEUsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQU8sR0FBUDtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNFLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ25DLDREQUE0RDtZQUM1RCxvREFBb0Q7WUFDcEQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FFM0M7YUFBTTtZQUNMLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWdCLElBQUksQ0FBQyxDQUFDLFdBQVEsSUFBSSxDQUFDLENBQUMsTUFBSSxDQUFDO1NBQzNEO0lBRUgsQ0FBQztJQXhFUTtRQUFSLEtBQUssRUFBRTs7b0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTs7OERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzttREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzttREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzt1REFBVTtJQUNUO1FBQVIsS0FBSyxFQUFFOzt3REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzswREFBYTtJQUVYO1FBQVQsTUFBTSxFQUFFOzBDQUFvQixZQUFZO2dFQUEyQjtJQVZ6RCxpQkFBaUI7UUFsQi9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsUUFBUSxFQUFFLGlRQVdUO1lBRUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7aURBdUJ1QixVQUFVO09BckJwQixpQkFBaUIsQ0EyRTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNFRCxJQTJFQztTQTNFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXJcbiAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy1iYXItbGFiZWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnRleHRcbiAgICAgIGNsYXNzPVwidGV4dERhdGFMYWJlbFwiXG4gICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJtaWRkbGVcIlxuICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiXG4gICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCJcbiAgICAgIFthdHRyLnhdPVwieFwiXG4gICAgICBbYXR0ci55XT1cInlcIj5cbiAgICAgIHt7Zm9ybWF0ZWRWYWx1ZX19XG4gICAgPC9zdmc6dGV4dD5cblxuICBgLFxuICBzdHlsZVVybHM6IFsnYmFyLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG4gIGV4cG9ydCBjbGFzcyBCYXJMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTtcbiAgICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcbiAgICBASW5wdXQoKSBiYXJYO1xuICAgIEBJbnB1dCgpIGJhclk7XG4gICAgQElucHV0KCkgYmFyV2lkdGg7XG4gICAgQElucHV0KCkgYmFySGVpZ2h0O1xuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uO1xuXG4gICAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGVsZW1lbnQ6IGFueTtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIGhvcml6b250YWxQYWRkaW5nID0gMjtcbiAgICB2ZXJ0aWNhbFBhZGRpbmcgPSA1O1xuICAgIGZvcm1hdGVkVmFsdWU6IHN0cmluZztcbiAgICB0cmFuc2Zvcm06IHN0cmluZztcbiAgICB0ZXh0QW5jaG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IGFueSB7XG4gICAgICBjb25zdCBoID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIGNvbnN0IHcgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICByZXR1cm4geyBoZWlnaHQ6IGgsIHdpZHRoOiB3LCBuZWdhdGl2ZTogdGhpcy52YWx1ZSA8IDAgfTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQodGhpcy5nZXRTaXplKCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRm9ybWF0dGluZykge1xuICAgICAgICB0aGlzLmZvcm1hdGVkVmFsdWUgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm9ybWF0ZWRWYWx1ZSA9IGZvcm1hdExhYmVsKHRoaXMudmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgdGhpcy54ID0gdGhpcy5iYXJYICsgdGhpcy5iYXJXaWR0aDtcbiAgICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgbmVnYXRpdmUgdGhlbiBpdCdzIG9uIHRoZSBsZWZ0IG9mIHRoZSB4MC5cbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHB1dCB0aGUgZGF0YSBsYWJlbCBpbiBmcm9udCBvZiB0aGUgYmFyXG4gICAgICAgICAgaWYgKHRoaXMudmFsdWUgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLnggLSB0aGlzLmhvcml6b250YWxQYWRkaW5nO1xuICAgICAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCArIHRoaXMuaG9yaXpvbnRhbFBhZGRpbmc7XG4gICAgICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnkgPSB0aGlzLmJhclkgKyB0aGlzLmJhckhlaWdodCAvIDI7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9yaWVudGF0aW9uIG11c3QgYmUgXCJ2ZXJ0aWNhbFwiXG4gICAgICAgIHRoaXMueCA9IHRoaXMuYmFyWCArIHRoaXMuYmFyV2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmJhclkgKyB0aGlzLmJhckhlaWdodDtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA8IDApIHtcbiAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgKyB0aGlzLnZlcnRpY2FsUGFkZGluZztcbiAgICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnZW5kJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnkgPSB0aGlzLnkgLSB0aGlzLnZlcnRpY2FsUGFkZGluZztcbiAgICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gYHJvdGF0ZSgtNDUsICR7IHRoaXMueCB9ICwgJHsgdGhpcy55IH0pYDtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuIl19