import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
var CardComponent = /** @class */ (function () {
    function CardComponent(element, cd, zone) {
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
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return trimLabel(card.label, 55); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.data ? _this.data.name : '';
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = decimalChecker(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = _this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8;
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 15);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
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
            template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\">\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [style.lineHeight.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\">\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, ChangeDetectorRef, NgZone])
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQ3hCLFNBQVMsRUFBRSx1QkFBdUIsRUFDNUQsaUJBQWlCLEVBQUUsTUFBTSxFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUF1RHhEO0lBd0NFLHVCQUFZLE9BQW1CLEVBQVUsRUFBcUIsRUFBVSxJQUFZO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQXpCM0UsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUt0QyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBTVgsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFHcEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVoQixnQkFBVyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFLakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0Usb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQUEsaUJBc0NDO1FBckNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ1osSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQztZQUNyRSxJQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxFQUEzQixDQUEyQixDQUFDLENBQUM7WUFDdEYsSUFBTSxlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUVwRixLQUFJLENBQUMsU0FBUyxHQUFHLGVBQWEsS0FBSSxDQUFDLENBQUMsV0FBTSxLQUFJLENBQUMsQ0FBQyxNQUFHLENBQUM7WUFFcEQsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUU3QyxJQUFNLFFBQVEsR0FBRztnQkFDZixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSTtnQkFDZixLQUFLLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLO2FBQ3ZCLENBQUM7WUFFRixLQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFpQixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLE9BQUcsQ0FBQztZQUUzRSxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRXhELEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVsRyxVQUFVLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFO29CQUNqQyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksS0FBYTtRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3JELEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV4QyxJQUFNLEtBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsS0FBRyxDQUFDLENBQUM7WUFDakMsSUFBTSxpQkFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQTNCLENBQTJCLENBQUMsQ0FBQztZQUV0RixJQUFNLFFBQVEsR0FBRyxVQUFDLEVBQWlCO29CQUFoQixnQkFBSyxFQUFFLHNCQUFRO2dCQUNoQyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDWixLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxpQkFBZSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFDO29CQUMxRSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNiLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNDO29CQUNELEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFBQSxpQkFrQkM7UUFqQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDTixJQUFBLHVEQUFxRSxFQUFuRSxnQkFBSyxFQUFFLGtCQUE0RCxDQUFDO1lBQzVFLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMvQixPQUFPO2FBQ1I7WUFFRCxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkYsSUFBTSxjQUFjLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQ3hELElBQU0sZUFBZSxHQUFHLEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBRTVDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEtBQUssRUFBRSxlQUFlLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDL0UsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDaEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckQsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMvRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDckQsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBekpRO1FBQVIsS0FBSyxFQUFFOztnREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOztvREFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOztvREFBVztJQUVWO1FBQVIsS0FBSyxFQUFFOzs0Q0FBRztJQUNGO1FBQVIsS0FBSyxFQUFFOzs0Q0FBRztJQUNGO1FBQVIsS0FBSyxFQUFFOztnREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOztpREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztnREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOzsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOztxREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7OzBEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7MERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOztxREFBbUI7SUFFakI7UUFBVCxNQUFNLEVBQUU7O2lEQUE2QjtJQUVqQjtRQUFwQixTQUFTLENBQUMsUUFBUSxDQUFDOzBDQUFTLFVBQVU7aURBQUM7SUFuQjdCLGFBQWE7UUFyRHpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLGs3Q0FnRFQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO2lEQXlDcUIsVUFBVSxFQUFjLGlCQUFpQixFQUFnQixNQUFNO09BeEN6RSxhQUFhLENBNEp6QjtJQUFELG9CQUFDO0NBQUEsQUE1SkQsSUE0SkM7U0E1SlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxuICBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUsIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xuaW1wb3J0IHsgY291bnQsIGRlY2ltYWxDaGVja2VyIH0gZnJvbSAnLi4vY29tbW9uL2NvdW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWNhcmRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxuICAgICAgY2xhc3M9XCJjZWxsXCJcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxzdmc6cmVjdFxuICAgICAgICBjbGFzcz1cImNhcmRcIlxuICAgICAgICBbc3R5bGUuZmlsbF09XCJjb2xvclwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cImNhcmRXaWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJjYXJkSGVpZ2h0XCJcbiAgICAgICAgcng9XCIzXCJcbiAgICAgICAgcnk9XCIzXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOnBhdGhcbiAgICAgICAgKm5nSWY9XCJiYW5kQ29sb3IgJiYgYmFuZENvbG9yICE9PSBjb2xvclwiXG4gICAgICAgIGNsYXNzPVwiY2FyZC1iYW5kXCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJiYW5kQ29sb3JcIlxuICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtQmFuZFwiXG4gICAgICAgIHN0cm9rZT1cIm5vbmVcIlxuICAgICAgICBbYXR0ci5kXT1cImJhbmRQYXRoXCJcbiAgICAgIC8+XG4gICAgICA8dGl0bGU+e3tsYWJlbH19PC90aXRsZT5cbiAgICAgIDxzdmc6Zm9yZWlnbk9iamVjdFxuICAgICAgICBjbGFzcz1cInRyaW1tZWQtbGFiZWxcIlxuICAgICAgICB4PVwiNVwiXG4gICAgICAgIFthdHRyLnhdPVwidGV4dFBhZGRpbmdbM11cIlxuICAgICAgICBbYXR0ci55XT1cImNhcmRIZWlnaHQgLSB0ZXh0UGFkZGluZ1syXVwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cInRleHRXaWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJsYWJlbEZvbnRTaXplICsgdGV4dFBhZGRpbmdbMl1cIlxuICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJoYW5naW5nXCI+XG4gICAgICAgIDx4aHRtbDpwXG4gICAgICAgICAgW3N0eWxlLmNvbG9yXT1cInRleHRDb2xvclwiXG4gICAgICAgICAgW3N0eWxlLmZvbnRTaXplLnB4XT1cImxhYmVsRm9udFNpemVcIlxuICAgICAgICAgIFtzdHlsZS5saW5lSGVpZ2h0LnB4XT1cImxhYmVsRm9udFNpemVcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwiZm9ybWF0dGVkTGFiZWxcIj5cbiAgICAgICAgPC94aHRtbDpwPlxuICAgICAgPC9zdmc6Zm9yZWlnbk9iamVjdD5cbiAgICAgIDxzdmc6dGV4dCAjdGV4dEVsXG4gICAgICAgIGNsYXNzPVwidmFsdWUtdGV4dFwiXG4gICAgICAgIFthdHRyLnhdPVwidGV4dFBhZGRpbmdbM11cIlxuICAgICAgICBbYXR0ci55XT1cInRleHRQYWRkaW5nWzBdXCJcbiAgICAgICAgW3N0eWxlLmZpbGxdPVwidGV4dENvbG9yXCJcbiAgICAgICAgdGV4dC1hbmNob3I9XCJzdGFydFwiXG4gICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImhhbmdpbmdcIlxuICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB0XT1cInRleHRGb250U2l6ZVwiPlxuICAgICAgICB7e3ZhbHVlfX1cbiAgICAgIDwvc3ZnOnRleHQ+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBjb2xvcjtcbiAgQElucHV0KCkgYmFuZENvbG9yO1xuICBASW5wdXQoKSB0ZXh0Q29sb3I7XG5cbiAgQElucHV0KCkgeDtcbiAgQElucHV0KCkgeTtcbiAgQElucHV0KCkgd2lkdGg7XG4gIEBJbnB1dCgpIGhlaWdodDtcbiAgQElucHV0KCkgbGFiZWw7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIG1lZGlhblNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3RleHRFbCcpIHRleHRFbDogRWxlbWVudFJlZjtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdmFsdWUgPSAnJztcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XG4gIGNhcmRXaWR0aDogbnVtYmVyO1xuICBjYXJkSGVpZ2h0OiBudW1iZXI7XG4gIHRleHRXaWR0aDogbnVtYmVyO1xuICB0ZXh0Rm9udFNpemUgPSAxMjtcbiAgdGV4dFRyYW5zZm9ybSA9ICcnO1xuICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBhbmltYXRpb25SZXE6IGFueTtcblxuICBiYW5kSGVpZ2h0ID0gMTA7XG4gIHRyYW5zZm9ybUJhbmQ6IHN0cmluZztcbiAgdGV4dFBhZGRpbmcgPSBbMTAsIDIwLCA1LCAyMF07XG4gIGxhYmVsRm9udFNpemUgPSAxNTtcblxuICBiYW5kUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgY29uc3QgaGFzVmFsdWUgPSB0aGlzLmRhdGEgJiYgdHlwZW9mIHRoaXMuZGF0YS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbGFiZWxGb3JtYXR0aW5nID0gdGhpcy5sYWJlbEZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gdHJpbUxhYmVsKGNhcmQubGFiZWwsIDU1KSk7XG5cbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMueH0gLCAke3RoaXMueX0pYDtcblxuICAgICAgdGhpcy50ZXh0V2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKSAtIHRoaXMudGV4dFBhZGRpbmdbMV0gLSB0aGlzLnRleHRQYWRkaW5nWzNdO1xuICAgICAgdGhpcy5jYXJkV2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKTtcbiAgICAgIHRoaXMuY2FyZEhlaWdodCA9IE1hdGgubWF4KDAsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuZGF0YSA/IHRoaXMuZGF0YS5uYW1lIDogJyc7XG5cbiAgICAgIGNvbnN0IGNhcmREYXRhID0ge1xuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICB2YWx1ZTogdGhpcy5kYXRhLnZhbHVlXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmZvcm1hdHRlZExhYmVsID0gbGFiZWxGb3JtYXR0aW5nKGNhcmREYXRhKTtcbiAgICAgIHRoaXMudHJhbnNmb3JtQmFuZCA9IGB0cmFuc2xhdGUoMCAsICR7dGhpcy5jYXJkSGVpZ2h0IC0gdGhpcy5iYW5kSGVpZ2h0fSlgO1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IGhhc1ZhbHVlID8gdmFsdWVGb3JtYXR0aW5nKGNhcmREYXRhKSA6ICcnO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcblxuICAgICAgdGhpcy5iYW5kUGF0aCA9IHJvdW5kZWRSZWN0KDAsIDAsIHRoaXMuY2FyZFdpZHRoLCB0aGlzLmJhbmRIZWlnaHQsIDMsIFtmYWxzZSwgZmFsc2UsIHRydWUsIHRydWVdKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NhbGVUZXh0KCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGhhc1ZhbHVlICYmICF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnN0YXJ0Q291bnQoKSwgMjApO1xuICAgICAgICB9XG4gICAgICB9LCA4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhZGRlZFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tZWRpYW5TaXplICYmIHRoaXMubWVkaWFuU2l6ZSA+IHZhbHVlLmxlbmd0aCkge1xuICAgICAgdmFsdWUgKz0gJ1xcdTIwMDcnLnJlcGVhdCh0aGlzLm1lZGlhblNpemUgLSB2YWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzdGFydENvdW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcblxuICAgICAgY29uc3QgdmFsID0gdGhpcy5kYXRhLnZhbHVlO1xuICAgICAgY29uc3QgZGVjcyA9IGRlY2ltYWxDaGVja2VyKHZhbCk7XG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xuXG4gICAgICBjb25zdCBjYWxsYmFjayA9ICh7dmFsdWUsIGZpbmlzaGVkfSkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB2YWx1ZSA9IGZpbmlzaGVkID8gdmFsIDogdmFsdWU7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlRm9ybWF0dGluZyh7bGFiZWw6IHRoaXMubGFiZWwsIGRhdGE6IHRoaXMuZGF0YSwgdmFsdWV9KTtcbiAgICAgICAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFuaW1hdGlvblJlcSA9IGNvdW50KDAsIHZhbCwgZGVjcywgMSwgY2FsbGJhY2spO1xuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2NhbGVUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnRleHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHdpZHRoID09PSAwIHx8IGhlaWdodCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRleHRQYWRkaW5nID0gdGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDg7XG4gICAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuY2FyZFdpZHRoIC0gMiAqIHRleHRQYWRkaW5nO1xuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gdGhpcy5jYXJkSGVpZ2h0IC8gMztcblxuICAgICAgY29uc3QgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihhdmFpbGFibGVXaWR0aCAvIHdpZHRoLCBhdmFpbGFibGVIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgdGhpcy50ZXh0Rm9udFNpemUgPSBNYXRoLmZsb29yKHRoaXMudGV4dEZvbnRTaXplICogcmVzaXplU2NhbGUpO1xuICAgICAgdGhpcy5sYWJlbEZvbnRTaXplID0gTWF0aC5taW4odGhpcy50ZXh0Rm9udFNpemUsIDE1KTtcblxuICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0UGFkZGluZygpIHtcbiAgICB0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gODtcbiAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5jYXJkSGVpZ2h0IC8gMjtcbiAgICB0aGlzLnRleHRQYWRkaW5nWzBdID0gcGFkZGluZyAtIHRoaXMudGV4dEZvbnRTaXplIC0gdGhpcy5sYWJlbEZvbnRTaXplIC8gMjtcbiAgICB0aGlzLnRleHRQYWRkaW5nWzJdID0gcGFkZGluZyAtIHRoaXMubGFiZWxGb250U2l6ZTtcbiAgfVxuXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZSxcbiAgICAgIHZhbHVlOiB0aGlzLmRhdGEudmFsdWVcbiAgICB9KTtcbiAgfVxufVxuIl19