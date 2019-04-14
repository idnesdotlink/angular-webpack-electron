import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ElementRef, Output, EventEmitter } from '@angular/core';
import { formatLabel } from '../../common/label.helper';
let BarLabelComponent = class BarLabelComponent {
    constructor(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getSize() {
        const h = this.element.getBoundingClientRect().height;
        const w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    }
    ngAfterViewInit() {
        this.dimensionsChanged.emit(this.getSize());
    }
    update() {
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
            this.transform = `rotate(-45, ${this.x} , ${this.y})`;
        }
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
        template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y">
      {{formatedValue}}
    </svg:text>

  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".textDataLabel{font-size:11px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], BarLabelComponent);
export { BarLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItbGFiZWwvYmFyLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQW9CdEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFxQjVCLFlBQVksT0FBbUI7UUFYckIsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLcEUsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ25DLDREQUE0RDtZQUM1RCxvREFBb0Q7WUFDcEQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FFM0M7YUFBTTtZQUNMLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZ0IsSUFBSSxDQUFDLENBQUUsTUFBTyxJQUFJLENBQUMsQ0FBRSxHQUFHLENBQUM7U0FDM0Q7SUFFSCxDQUFDO0NBQ0YsQ0FBQTtBQXpFVTtJQUFSLEtBQUssRUFBRTs7Z0RBQU87QUFDTjtJQUFSLEtBQUssRUFBRTs7MERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzsrQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzsrQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzttREFBVTtBQUNUO0lBQVIsS0FBSyxFQUFFOztvREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOztzREFBYTtBQUVYO0lBQVQsTUFBTSxFQUFFO3NDQUFvQixZQUFZOzREQUEyQjtBQVZ6RCxpQkFBaUI7SUFsQi9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO1FBRUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7NkNBdUJ1QixVQUFVO0dBckJwQixpQkFBaUIsQ0EyRTdCO1NBM0VZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlclxuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi8uLi9jb21tb24vbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWJhci1sYWJlbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6dGV4dFxuICAgICAgY2xhc3M9XCJ0ZXh0RGF0YUxhYmVsXCJcbiAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cIm1pZGRsZVwiXG4gICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxuICAgICAgW2F0dHIueF09XCJ4XCJcbiAgICAgIFthdHRyLnldPVwieVwiPlxuICAgICAge3tmb3JtYXRlZFZhbHVlfX1cbiAgICA8L3N2Zzp0ZXh0PlxuXG4gIGAsXG4gIHN0eWxlVXJsczogWydiYXItbGFiZWwuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbiAgZXhwb3J0IGNsYXNzIEJhckxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHZhbHVlO1xuICAgIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuICAgIEBJbnB1dCgpIGJhclg7XG4gICAgQElucHV0KCkgYmFyWTtcbiAgICBASW5wdXQoKSBiYXJXaWR0aDtcbiAgICBASW5wdXQoKSBiYXJIZWlnaHQ7XG4gICAgQElucHV0KCkgb3JpZW50YXRpb247XG5cbiAgICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZWxlbWVudDogYW55O1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgaG9yaXpvbnRhbFBhZGRpbmcgPSAyO1xuICAgIHZlcnRpY2FsUGFkZGluZyA9IDU7XG4gICAgZm9ybWF0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIHRyYW5zZm9ybTogc3RyaW5nO1xuICAgIHRleHRBbmNob3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGdldFNpemUoKTogYW55IHtcbiAgICAgIGNvbnN0IGggPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgY29uc3QgdyA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgIHJldHVybiB7IGhlaWdodDogaCwgd2lkdGg6IHcsIG5lZ2F0aXZlOiB0aGlzLnZhbHVlIDwgMCB9O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh0aGlzLmdldFNpemUoKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgaWYgKHRoaXMudmFsdWVGb3JtYXR0aW5nKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0ZWRWYWx1ZSA9IHRoaXMudmFsdWVGb3JtYXR0aW5nKHRoaXMudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb3JtYXRlZFZhbHVlID0gZm9ybWF0TGFiZWwodGhpcy52YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICB0aGlzLnggPSB0aGlzLmJhclggKyB0aGlzLmJhcldpZHRoO1xuICAgICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBuZWdhdGl2ZSB0aGVuIGl0J3Mgb24gdGhlIGxlZnQgb2YgdGhlIHgwLlxuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gcHV0IHRoZSBkYXRhIGxhYmVsIGluIGZyb250IG9mIHRoZSBiYXJcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCAtIHRoaXMuaG9yaXpvbnRhbFBhZGRpbmc7XG4gICAgICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnZW5kJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy54ICsgdGhpcy5ob3Jpem9udGFsUGFkZGluZztcbiAgICAgICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdzdGFydCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMueSA9IHRoaXMuYmFyWSArIHRoaXMuYmFySGVpZ2h0IC8gMjtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3JpZW50YXRpb24gbXVzdCBiZSBcInZlcnRpY2FsXCJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5iYXJYICsgdGhpcy5iYXJXaWR0aCAvIDI7XG4gICAgICAgIHRoaXMueSA9IHRoaXMuYmFyWSArIHRoaXMuYmFySGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgMCkge1xuICAgICAgICAgIHRoaXMueSA9IHRoaXMueSArIHRoaXMudmVydGljYWxQYWRkaW5nO1xuICAgICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMueSA9IHRoaXMueSAtIHRoaXMudmVydGljYWxQYWRkaW5nO1xuICAgICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdzdGFydCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgcm90YXRlKC00NSwgJHsgdGhpcy54IH0gLCAkeyB0aGlzLnkgfSlgO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG4iXX0=