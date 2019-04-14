import * as tslib_1 from "tslib";
import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { config } from './config';
import { DOCUMENT } from '@angular/common';
import { MaskApplierService } from './mask-applier.service';
var MaskService = /** @class */ (function (_super) {
    tslib_1.__extends(MaskService, _super);
    function MaskService(
    // tslint:disable-next-line
    document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.showMaskTyped = false;
        _this.maskIsShown = '';
        // tslint:disable-next-line
        _this.onChange = function (_) { };
        _this.onTouch = function () { };
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    MaskService.prototype.applyMask = function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (!inputValue && this.showMaskTyped) {
            return this.prefix + this.maskIsShown;
        }
        var result = _super.prototype.applyMask.call(this, inputValue, maskExpression, position, cb);
        if (this.maskExpression === 'dot_separator.2' && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter(function (item) { return item !== ','; });
        }
        if ((this.maskExpression === 'coma_separator.2' && this.dropSpecialCharacters === true)) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter(function (item) { return item !== '.'; });
        }
        Array.isArray(this.dropSpecialCharacters)
            ? this.onChange(this._removeMask(this._removeSufix(this._removePrefix(result)), this.dropSpecialCharacters))
            : this.dropSpecialCharacters === true
                ? this.onChange(this.isNumberValue
                    ? Number(this._removeMask(this._removeSufix(this._removePrefix(result)), this.maskSpecialCharacters))
                    : this._removeMask(this._removeSufix(this._removePrefix(result)), this.maskSpecialCharacters))
                : this.onChange(this._removeSufix(this._removePrefix(result)));
        var ifMaskIsShown = '';
        if (!this.showMaskTyped) {
            return result;
        }
        var resLen = result.length;
        var prefNmask = this.prefix + this.maskIsShown;
        ifMaskIsShown = prefNmask.slice(resLen);
        return result + ifMaskIsShown;
    };
    MaskService.prototype.applyValueChanges = function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        var maskedInput = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        this._formElement.value = maskedInput;
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    MaskService.prototype.showMaskInInput = function () {
        if (this.showMaskTyped && !!this.shownMaskExpression) {
            if (this.maskExpression.length !== this.shownMaskExpression.length) {
                throw new Error('Mask expression must match mask placeholder length');
            }
            else {
                return this.shownMaskExpression;
            }
        }
        else if (this.showMaskTyped) {
            return this.maskExpression.replace(/\w/g, '_');
        }
        return '';
    };
    MaskService.prototype.clearIfNotMatchFn = function () {
        if (this.clearIfNotMatch === true &&
            this.maskExpression.length !== this._formElement.value.length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: function (_a) {
            var _b = tslib_1.__read(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    MaskService.prototype._removeMask = function (value, specialCharactersForRemove) {
        return value
            ? value.replace(this._regExpForRemove(specialCharactersForRemove), '')
            : value;
    };
    MaskService.prototype._removePrefix = function (value) {
        if (!this.prefix) {
            return value;
        }
        return value
            ? value.replace(this.prefix, '')
            : value;
    };
    MaskService.prototype._removeSufix = function (value) {
        if (!this.sufix) {
            return value;
        }
        return value
            ? value.replace(this.sufix, '')
            : value;
    };
    MaskService.prototype._regExpForRemove = function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map(function (item) { return "\\" + item; }).join('|'), 'gi');
    };
    MaskService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__param(1, Inject(config)),
        tslib_1.__metadata("design:paramtypes", [Object, Object, ElementRef,
            Renderer2])
    ], MaskService);
    return MaskService;
}(MaskApplierService));
export { MaskService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9pbnB1dC1tYXNrLyIsInNvdXJjZXMiOlsibGliL21hc2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxFQUFXLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUc1RDtJQUFpQyx1Q0FBa0I7SUFTakQ7SUFDRSwyQkFBMkI7SUFDRCxRQUFhLEVBQ2IsT0FBZ0IsRUFDbEMsV0FBdUIsRUFDdkIsU0FBb0I7UUFMOUIsWUFPRSxrQkFBTSxPQUFPLENBQUMsU0FFZjtRQVAyQixjQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2IsYUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNsQyxpQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixlQUFTLEdBQVQsU0FBUyxDQUFXO1FBYnZCLG9CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRWhDLDJCQUEyQjtRQUNwQixjQUFRLEdBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxDQUFDO1FBQzNCLGFBQU8sR0FBRyxjQUFRLENBQUMsQ0FBQztRQVN6QixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDOztJQUNyRCxDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFDRSxVQUFrQixFQUNsQixjQUFzQixFQUN0QixRQUFvQixFQUNwQixFQUF3QjtRQUR4Qix5QkFBQSxFQUFBLFlBQW9CO1FB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RSxJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUEzSVUsV0FBVztRQUR2QixVQUFVLEVBQUU7UUFZUixtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEIsbUJBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2lFQUNNLFVBQVU7WUFDWixTQUFTO09BZG5CLFdBQVcsQ0E0SXZCO0lBQUQsa0JBQUM7Q0FBQSxBQTVJRCxDQUFpQyxrQkFBa0IsR0E0SWxEO1NBNUlZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29uZmlnLCBJQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXNrU2VydmljZSBleHRlbmRzIE1hc2tBcHBsaWVyU2VydmljZSB7XG4gIHB1YmxpYyBtYXNrRXhwcmVzc2lvbjogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBpc051bWJlclZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93TWFza1R5cGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBtYXNrSXNTaG93bjogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2Zvcm1FbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHsgfTtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWcsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKF9jb25maWcpO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIGFwcGx5TWFzayhcbiAgICBpbnB1dFZhbHVlOiBzdHJpbmcsXG4gICAgbWFza0V4cHJlc3Npb246IHN0cmluZyxcbiAgICBwb3NpdGlvbjogbnVtYmVyID0gMCxcbiAgICBjYjogRnVuY3Rpb24gPSAoKSA9PiB7IH1cbiAgKTogc3RyaW5nIHtcblxuICAgIHRoaXMubWFza0lzU2hvd24gPSB0aGlzLnNob3dNYXNrVHlwZWQgPyB0aGlzLnNob3dNYXNrSW5JbnB1dCgpIDogJyc7XG4gICAgaWYgKCFpbnB1dFZhbHVlICYmIHRoaXMuc2hvd01hc2tUeXBlZCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0OiBzdHJpbmcgPSBzdXBlci5hcHBseU1hc2soXG4gICAgICBpbnB1dFZhbHVlLFxuICAgICAgbWFza0V4cHJlc3Npb24sXG4gICAgICBwb3NpdGlvbixcbiAgICAgIGNiXG4gICAgKTtcbiAgICBpZiAodGhpcy5tYXNrRXhwcmVzc2lvbiA9PT0gJ2RvdF9zZXBhcmF0b3IuMicgJiYgdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmlsdGVyKChpdGVtOiBzdHJpbmcpID0+IGl0ZW0gIT09ICcsJyk7XG4gICAgfVxuICAgIGlmICgodGhpcy5tYXNrRXhwcmVzc2lvbiA9PT0gJ2NvbWFfc2VwYXJhdG9yLjInICYmIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID09PSB0cnVlKSkge1xuICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5maWx0ZXIoKGl0ZW06IHN0cmluZykgPT4gaXRlbSAhPT0gJy4nKTtcblxuICAgIH1cbiAgICBBcnJheS5pc0FycmF5KHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKVxuICAgICAgPyB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycykpXG4gICAgICA6IHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID09PSB0cnVlXG4gICAgICAgID8gdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLmlzTnVtYmVyVmFsdWVcbiAgICAgICAgICAgID8gTnVtYmVyKHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycykpXG4gICAgICAgICAgICA6IHRoaXMuX3JlbW92ZU1hc2sodGhpcy5fcmVtb3ZlU3VmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycylcbiAgICAgICAgKVxuICAgICAgICA6IHRoaXMub25DaGFuZ2UodGhpcy5fcmVtb3ZlU3VmaXgodGhpcy5fcmVtb3ZlUHJlZml4KHJlc3VsdCkpKTtcbiAgICBsZXQgaWZNYXNrSXNTaG93bjogc3RyaW5nID0gJyc7XG4gICAgaWYgKCF0aGlzLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IHJlc0xlbjogbnVtYmVyID0gcmVzdWx0Lmxlbmd0aDtcbiAgICBjb25zdCBwcmVmTm1hc2s6IHN0cmluZyA9IHRoaXMucHJlZml4ICsgdGhpcy5tYXNrSXNTaG93bjtcbiAgICBpZk1hc2tJc1Nob3duID0gcHJlZk5tYXNrLnNsaWNlKHJlc0xlbik7XG4gICAgcmV0dXJuIHJlc3VsdCArIGlmTWFza0lzU2hvd247XG4gIH1cblxuICBwdWJsaWMgYXBwbHlWYWx1ZUNoYW5nZXMoXG4gICAgcG9zaXRpb246IG51bWJlciA9IDAsXG4gICAgY2I6IEZ1bmN0aW9uID0gKCkgPT4geyB9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG1hc2tlZElucHV0OiBzdHJpbmcgfCBudW1iZXIgPSB0aGlzLmFwcGx5TWFzayhcbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLFxuICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbixcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgY2JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlID0gbWFza2VkSW5wdXQ7XG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xuICB9XG5cbiAgcHVibGljIHNob3dNYXNrSW5JbnB1dCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNob3dNYXNrVHlwZWQgJiYgISF0aGlzLnNob3duTWFza0V4cHJlc3Npb24pIHtcbiAgICAgIGlmICh0aGlzLm1hc2tFeHByZXNzaW9uLmxlbmd0aCAhPT0gdGhpcy5zaG93bk1hc2tFeHByZXNzaW9uLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hc2sgZXhwcmVzc2lvbiBtdXN0IG1hdGNoIG1hc2sgcGxhY2Vob2xkZXIgbGVuZ3RoJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93bk1hc2tFeHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXNrRXhwcmVzc2lvbi5yZXBsYWNlKC9cXHcvZywgJ18nKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHVibGljIGNsZWFySWZOb3RNYXRjaEZuKCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoID09PSB0cnVlICYmXG4gICAgICB0aGlzLm1hc2tFeHByZXNzaW9uLmxlbmd0aCAhPT0gdGhpcy5fZm9ybUVsZW1lbnQudmFsdWUubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbJ3ZhbHVlJywgJyddO1xuICAgICAgdGhpcy5hcHBseU1hc2sodGhpcy5fZm9ybUVsZW1lbnQudmFsdWUsIHRoaXMubWFza0V4cHJlc3Npb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZm9ybUVsZW1lbnRQcm9wZXJ0eShbbmFtZSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmcgfCBib29sZWFuXSkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2Zvcm1FbGVtZW50LCBuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVNYXNrKFxuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmU6IHN0cmluZ1tdXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICA/IHZhbHVlLnJlcGxhY2UodGhpcy5fcmVnRXhwRm9yUmVtb3ZlKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlKSwgJycpXG4gICAgICA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlUHJlZml4KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5wcmVmaXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICA/IHZhbHVlLnJlcGxhY2UodGhpcy5wcmVmaXgsICcnKVxuICAgICAgOiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVN1Zml4KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5zdWZpeCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgICAgID8gdmFsdWUucmVwbGFjZSh0aGlzLnN1Zml4LCAnJylcbiAgICAgIDogdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9yZWdFeHBGb3JSZW1vdmUoc3BlY2lhbENoYXJhY3RlcnNGb3JSZW1vdmU6IHN0cmluZ1tdKTogUmVnRXhwIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgIHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBgXFxcXCR7aXRlbX1gKS5qb2luKCd8JyksXG4gICAgICAnZ2knXG4gICAgKTtcbiAgfVxufVxuIl19