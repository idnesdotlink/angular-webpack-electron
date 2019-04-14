import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
let CardComponent = class CardComponent {
    constructor(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    update() {
        this.zone.run(() => {
            const hasValue = this.data && typeof this.data.value !== 'undefined';
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const labelFormatting = this.labelFormatting || (card => trimLabel(card.label, 55));
            this.transform = `translate(${this.x} , ${this.y})`;
            this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
            this.cardWidth = Math.max(0, this.width);
            this.cardHeight = Math.max(0, this.height);
            this.label = this.data ? this.data.name : '';
            const cardData = {
                label: this.label,
                data: this.data,
                value: this.data.value
            };
            this.formattedLabel = labelFormatting(cardData);
            this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;
            const value = hasValue ? valueFormatting(cardData) : '';
            this.value = this.paddedValue(value);
            this.setPadding();
            this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);
            setTimeout(() => {
                this.scaleText();
                this.value = value;
                if (hasValue && !this.initialized) {
                    setTimeout(() => this.startCount(), 20);
                }
            }, 8);
        });
    }
    paddedValue(value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    }
    startCount() {
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            const val = this.data.value;
            const decs = decimalChecker(val);
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const callback = ({ value, finished }) => {
                this.zone.run(() => {
                    value = finished ? val : value;
                    this.value = valueFormatting({ label: this.label, data: this.data, value });
                    if (!finished) {
                        this.value = this.paddedValue(this.value);
                    }
                    this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    }
    scaleText() {
        this.zone.run(() => {
            const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
            if (width === 0 || height === 0) {
                return;
            }
            const textPadding = this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
            const availableWidth = this.cardWidth - 2 * textPadding;
            const availableHeight = this.cardHeight / 3;
            const resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
            this.cd.markForCheck();
        });
    }
    setPadding() {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        const padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    }
    onClick() {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "color", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "bandColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "textColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "x", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "y", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "width", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "height", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CardComponent.prototype, "medianSize", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "valueFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "labelFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CardComponent.prototype, "select", void 0);
tslib_1.__decorate([
    ViewChild('textEl'),
    tslib_1.__metadata("design:type", ElementRef)
], CardComponent.prototype, "textEl", void 0);
CardComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-card]',
        template: `
    <svg:g
      [attr.transform]="transform"
      class="cell"
      (click)="onClick()">
      <svg:rect
        class="card"
        [style.fill]="color"
        [attr.width]="cardWidth"
        [attr.height]="cardHeight"
        rx="3"
        ry="3"
      />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{label}}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging">
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel">
        </xhtml:p>
      </svg:foreignObject>
      <svg:text #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize">
        {{value}}
      </svg:text>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef, ChangeDetectorRef, NgZone])
], CardComponent);
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQ3hCLFNBQVMsRUFBRSx1QkFBdUIsRUFDNUQsaUJBQWlCLEVBQUUsTUFBTSxFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUF1RHhELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUF3Q3hCLFlBQVksT0FBbUIsRUFBVSxFQUFxQixFQUFVLElBQVk7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBekIzRSxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3RDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFNWCxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUdwQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCLGdCQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUtqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxP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SyxFQUFFOzs0Q0FBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzsyQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOztpREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O3NEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7c0RBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOztpREFBbUI7QUFFakI7SUFBVCxNQUFNLEVBQUU7OzZDQUE2QjtBQUVqQjtJQUFwQixTQUFTLENBQUMsUUFBUSxDQUFDO3NDQUFTLFVBQVU7NkNBQUM7QUFuQjdCLGFBQWE7SUFyRHpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRFQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDOzZDQXlDcUIsVUFBVSxFQUFjLGlCQUFpQixFQUFnQixNQUFNO0dBeEN6RSxhQUFhLENBNEp6QjtTQTVKWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5pbXBvcnQgeyBjb3VudCwgZGVjaW1hbENoZWNrZXIgfSBmcm9tICcuLi9jb21tb24vY291bnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtY2FyZF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Z1xuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiXG4gICAgICBjbGFzcz1cImNlbGxcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgIFtzdHlsZS5maWxsXT1cImNvbG9yXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiY2FyZFdpZHRoXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImNhcmRIZWlnaHRcIlxuICAgICAgICByeD1cIjNcIlxuICAgICAgICByeT1cIjNcIlxuICAgICAgLz5cbiAgICAgIDxzdmc6cGF0aFxuICAgICAgICAqbmdJZj1cImJhbmRDb2xvciAmJiBiYW5kQ29sb3IgIT09IGNvbG9yXCJcbiAgICAgICAgY2xhc3M9XCJjYXJkLWJhbmRcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImJhbmRDb2xvclwiXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1CYW5kXCJcbiAgICAgICAgc3Ryb2tlPVwibm9uZVwiXG4gICAgICAgIFthdHRyLmRdPVwiYmFuZFBhdGhcIlxuICAgICAgLz5cbiAgICAgIDx0aXRsZT57e2xhYmVsfX08L3RpdGxlPlxuICAgICAgPHN2Zzpmb3JlaWduT2JqZWN0XG4gICAgICAgIGNsYXNzPVwidHJpbW1lZC1sYWJlbFwiXG4gICAgICAgIHg9XCI1XCJcbiAgICAgICAgW2F0dHIueF09XCJ0ZXh0UGFkZGluZ1szXVwiXG4gICAgICAgIFthdHRyLnldPVwiY2FyZEhlaWdodCAtIHRleHRQYWRkaW5nWzJdXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwidGV4dFdpZHRoXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImxhYmVsRm9udFNpemUgKyB0ZXh0UGFkZGluZ1syXVwiXG4gICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImhhbmdpbmdcIj5cbiAgICAgICAgPHhodG1sOnBcbiAgICAgICAgICBbc3R5bGUuY29sb3JdPVwidGV4dENvbG9yXCJcbiAgICAgICAgICBbc3R5bGUuZm9udFNpemUucHhdPVwibGFiZWxGb250U2l6ZVwiXG4gICAgICAgICAgW3N0eWxlLmxpbmVIZWlnaHQucHhdPVwibGFiZWxGb250U2l6ZVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJmb3JtYXR0ZWRMYWJlbFwiPlxuICAgICAgICA8L3hodG1sOnA+XG4gICAgICA8L3N2Zzpmb3JlaWduT2JqZWN0PlxuICAgICAgPHN2Zzp0ZXh0ICN0ZXh0RWxcbiAgICAgICAgY2xhc3M9XCJ2YWx1ZS10ZXh0XCJcbiAgICAgICAgW2F0dHIueF09XCJ0ZXh0UGFkZGluZ1szXVwiXG4gICAgICAgIFthdHRyLnldPVwidGV4dFBhZGRpbmdbMF1cIlxuICAgICAgICBbc3R5bGUuZmlsbF09XCJ0ZXh0Q29sb3JcIlxuICAgICAgICB0ZXh0LWFuY2hvcj1cInN0YXJ0XCJcbiAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiXG4gICAgICAgIFtzdHlsZS5mb250LXNpemUucHRdPVwidGV4dEZvbnRTaXplXCI+XG4gICAgICAgIHt7dmFsdWV9fVxuICAgICAgPC9zdmc6dGV4dD5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGNvbG9yO1xuICBASW5wdXQoKSBiYW5kQ29sb3I7XG4gIEBJbnB1dCgpIHRleHRDb2xvcjtcblxuICBASW5wdXQoKSB4O1xuICBASW5wdXQoKSB5O1xuICBASW5wdXQoKSB3aWR0aDtcbiAgQElucHV0KCkgaGVpZ2h0O1xuICBASW5wdXQoKSBsYWJlbDtcbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgbWVkaWFuU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgndGV4dEVsJykgdGV4dEVsOiBFbGVtZW50UmVmO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB2YWx1ZSA9ICcnO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcbiAgY2FyZFdpZHRoOiBudW1iZXI7XG4gIGNhcmRIZWlnaHQ6IG51bWJlcjtcbiAgdGV4dFdpZHRoOiBudW1iZXI7XG4gIHRleHRGb250U2l6ZSA9IDEyO1xuICB0ZXh0VHJhbnNmb3JtID0gJyc7XG4gIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIGFuaW1hdGlvblJlcTogYW55O1xuXG4gIGJhbmRIZWlnaHQgPSAxMDtcbiAgdHJhbnNmb3JtQmFuZDogc3RyaW5nO1xuICB0ZXh0UGFkZGluZyA9IFsxMCwgMjAsIDUsIDIwXTtcbiAgbGFiZWxGb250U2l6ZSA9IDE1O1xuXG4gIGJhbmRQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IHRoaXMuZGF0YSAmJiB0eXBlb2YgdGhpcy5kYXRhLnZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG4gICAgICBjb25zdCBsYWJlbEZvcm1hdHRpbmcgPSB0aGlzLmxhYmVsRm9ybWF0dGluZyB8fCAoY2FyZCA9PiB0cmltTGFiZWwoY2FyZC5sYWJlbCwgNTUpKTtcblxuICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fSAsICR7dGhpcy55fSlgO1xuXG4gICAgICB0aGlzLnRleHRXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMud2lkdGgpIC0gdGhpcy50ZXh0UGFkZGluZ1sxXSAtIHRoaXMudGV4dFBhZGRpbmdbM107XG4gICAgICB0aGlzLmNhcmRXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMud2lkdGgpO1xuICAgICAgdGhpcy5jYXJkSGVpZ2h0ID0gTWF0aC5tYXgoMCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5kYXRhID8gdGhpcy5kYXRhLm5hbWUgOiAnJztcblxuICAgICAgY29uc3QgY2FyZERhdGEgPSB7XG4gICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIHZhbHVlOiB0aGlzLmRhdGEudmFsdWVcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZm9ybWF0dGVkTGFiZWwgPSBsYWJlbEZvcm1hdHRpbmcoY2FyZERhdGEpO1xuICAgICAgdGhpcy50cmFuc2Zvcm1CYW5kID0gYHRyYW5zbGF0ZSgwICwgJHt0aGlzLmNhcmRIZWlnaHQgLSB0aGlzLmJhbmRIZWlnaHR9KWA7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gaGFzVmFsdWUgPyB2YWx1ZUZvcm1hdHRpbmcoY2FyZERhdGEpIDogJyc7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhZGRlZFZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuXG4gICAgICB0aGlzLmJhbmRQYXRoID0gcm91bmRlZFJlY3QoMCwgMCwgdGhpcy5jYXJkV2lkdGgsIHRoaXMuYmFuZEhlaWdodCwgMywgW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0pO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zY2FsZVRleHQoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoaGFzVmFsdWUgJiYgIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc3RhcnRDb3VudCgpLCAyMCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDgpO1xuICAgIH0pO1xuICB9XG5cbiAgcGFkZGVkVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1lZGlhblNpemUgJiYgdGhpcy5tZWRpYW5TaXplID4gdmFsdWUubGVuZ3RoKSB7XG4gICAgICB2YWx1ZSArPSAnXFx1MjAwNycucmVwZWF0KHRoaXMubWVkaWFuU2l6ZSAtIHZhbHVlLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN0YXJ0Q291bnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuYW5pbWF0aW9ucykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xuXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmRhdGEudmFsdWU7XG4gICAgICBjb25zdCBkZWNzID0gZGVjaW1hbENoZWNrZXIodmFsKTtcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG5cbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHt2YWx1ZSwgZmluaXNoZWR9KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gZmluaXNoZWQgPyB2YWwgOiB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVGb3JtYXR0aW5nKHtsYWJlbDogdGhpcy5sYWJlbCwgZGF0YTogdGhpcy5kYXRhLCB2YWx1ZX0pO1xuICAgICAgICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhZGRlZFZhbHVlKHRoaXMudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYW5pbWF0aW9uUmVxID0gY291bnQoMCwgdmFsLCBkZWNzLCAxLCBjYWxsYmFjayk7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzY2FsZVRleHQoKTogdm9pZCB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMudGV4dEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAod2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGV4dFBhZGRpbmcgPSB0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gODtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5jYXJkV2lkdGggLSAyICogdGV4dFBhZGRpbmc7XG4gICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSB0aGlzLmNhcmRIZWlnaHQgLyAzO1xuXG4gICAgICBjb25zdCByZXNpemVTY2FsZSA9IE1hdGgubWluKGF2YWlsYWJsZVdpZHRoIC8gd2lkdGgsIGF2YWlsYWJsZUhlaWdodCAvIGhlaWdodCk7XG4gICAgICB0aGlzLnRleHRGb250U2l6ZSA9IE1hdGguZmxvb3IodGhpcy50ZXh0Rm9udFNpemUgKiByZXNpemVTY2FsZSk7XG4gICAgICB0aGlzLmxhYmVsRm9udFNpemUgPSBNYXRoLm1pbih0aGlzLnRleHRGb250U2l6ZSwgMTUpO1xuXG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRQYWRkaW5nKCkge1xuICAgIHRoaXMudGV4dFBhZGRpbmdbMV0gPSB0aGlzLnRleHRQYWRkaW5nWzNdID0gdGhpcy5jYXJkV2lkdGggLyA4O1xuICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLmNhcmRIZWlnaHQgLyAyO1xuICAgIHRoaXMudGV4dFBhZGRpbmdbMF0gPSBwYWRkaW5nIC0gdGhpcy50ZXh0Rm9udFNpemUgLSB0aGlzLmxhYmVsRm9udFNpemUgLyAyO1xuICAgIHRoaXMudGV4dFBhZGRpbmdbMl0gPSBwYWRkaW5nIC0gdGhpcy5sYWJlbEZvbnRTaXplO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIG5hbWU6IHRoaXMuZGF0YS5uYW1lLFxuICAgICAgdmFsdWU6IHRoaXMuZGF0YS52YWx1ZVxuICAgIH0pO1xuICB9XG59XG4iXX0=