import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { config } from './config';
var MaskApplierService = /** @class */ (function () {
    function MaskApplierService(_config) {
        this._config = _config;
        this.maskExpression = '';
        this.shownMaskExpression = '';
        this.separator = function (str, char, decimalChar, precision) {
            str += '';
            var x = str.split(decimalChar);
            var decimals = x.length > 1 ? "" + decimalChar + x[1] : '';
            var res = x[0];
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + char + '$2');
            }
            if (precision === undefined) {
                return res + decimals;
            }
            else if (precision === 0) {
                return res;
            }
            return res + decimals.substr(0, precision + 1);
        };
        this.percentage = function (str) {
            return Number(str) >= 0 && Number(str) <= 100;
        };
        this.getPrecision = function (maskExpression) {
            var x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        };
        this.checkInputPrecision = function (inputValue, precision, decimalMarker) {
            if (precision < Infinity) {
                var precisionRegEx = void 0;
                if (decimalMarker === '.') {
                    precisionRegEx = new RegExp("\\.\\d{" + precision + "}.*$");
                }
                else {
                    precisionRegEx = new RegExp(",\\d{" + precision + "}.*$");
                }
                var precisionMatch = inputValue.match(precisionRegEx);
                if (precisionMatch && precisionMatch[0].length - 1 > precision) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                else if (precision === 0 && inputValue.endsWith(decimalMarker)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
            }
            return inputValue;
        };
        this._shift = new Set();
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.sufix = this._config.sufix;
    }
    // tslint:disable-next-line:no-any
    MaskApplierService.prototype.applyMaskWithPattern = function (inputValue, maskAndPattern) {
        var _a = tslib_1.__read(maskAndPattern, 2), mask = _a[0], customPattern = _a[1];
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    };
    MaskApplierService.prototype.applyMask = function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        var cursor = 0;
        var result = "";
        var multi = false;
        var shiftStep;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        var inputArray = inputValue.toString()
            .split('');
        if (maskExpression === 'percent') {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            if (this.percentage(inputValue)) {
                result = inputValue;
            }
            else {
                result = inputValue.substring(0, inputValue.length - 1);
            }
        }
        else if (maskExpression === 'separator'
            || maskExpression === 'dot_separator' || maskExpression.startsWith('dot_separator')
            || maskExpression === 'coma_separator' || maskExpression.startsWith('coma_separator')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[@#!$%^&*()_+|~=`{}\[\]:";<>?\/]/)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            var precision = this.getPrecision(maskExpression);
            var strForSep = void 0;
            if (maskExpression === 'separator') {
                if (inputValue.includes(',')
                    && inputValue.endsWith(',') && inputValue.indexOf(',') !== inputValue.lastIndexOf(',')) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[@#!$%^&*()_+|~=`{}\[\]:.";<>?\/]/)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                strForSep = inputValue.replace(/\s/g, '');
                result = this.separator(strForSep, ' ', '.', precision);
            }
            else if (maskExpression === 'dot_separator' || maskExpression.startsWith('dot_separator')) {
                if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[@#!$%^&*()_+|~=`{}\[\]:\s";<>?\/]/)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                inputValue = this.checkInputPrecision(inputValue, precision, ',');
                strForSep = inputValue.replace(/\./g, '');
                result = this.separator(strForSep, '.', ',', precision);
            }
            else if (maskExpression === 'coma_separator' || maskExpression.startsWith('coma_separator')) {
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
                strForSep = inputValue.replace(/\,/g, '');
                result = this.separator(strForSep, ',', '.', precision);
            }
            position = result.length + 1;
            cursor = position;
            shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                ? inputArray.length
                : cursor;
            this._shift.add(shiftStep + this.prefix.length || 0);
        }
        else {
            // tslint:disable-next-line
            for (var i = 0, inputSymbol = inputArray[0]; i
                < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' && multi
                    && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])
                    && maskExpression[cursor + 1]
                        === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            result += 0;
                            cursor += 1;
                            shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            result += 0;
                            cursor += 1;
                            shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            result += 0;
                            cursor += 1;
                            shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputSymbol) > 3) {
                            result += 0;
                            cursor += 1;
                            shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor - 1] === 'd') {
                        if (Number(inputValue.slice(cursor - 1, cursor + 1)) > 31) {
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 1) {
                            result += 0;
                            cursor += 1;
                            shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor - 1] === 'm') {
                        if (Number(inputValue.slice(cursor - 1, cursor + 1)) > 12) {
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                        ? inputArray.length
                        : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1
                    && this.maskAvailablePatterns[maskExpression[cursor]]
                    && this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    cursor++;
                    i--;
                }
                else if ((this.maskExpression[cursor + 1] === '*')
                    && (this._findSpecialChar(this.maskExpression[cursor + 2]))
                    && (this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2]) && multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
            }
        }
        if (result.length + 1 === maskExpression.length
            && this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        var shift = 1;
        var newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        cb(this._shift.has(position) ? shift : 0);
        var res = "" + this.prefix + result;
        res = this.sufix ? "" + this.prefix + result + this.sufix : "" + this.prefix + result;
        if (result.length === 0) {
            res = "" + this.prefix + result;
        }
        return res;
    };
    MaskApplierService.prototype._findSpecialChar = function (inputSymbol) {
        var symbol = this.maskSpecialCharacters
            .find(function (val) { return val === inputSymbol; });
        return symbol;
    };
    MaskApplierService.prototype._checkSymbolMask = function (inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern
            ? this.customPattern
            : this.maskAvailablePatterns;
        return this.maskAvailablePatterns[maskSymbol]
            && this.maskAvailablePatterns[maskSymbol].pattern
            && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    };
    MaskApplierService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(config)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], MaskApplierService);
    return MaskApplierService;
}());
export { MaskApplierService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2lucHV0LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay1hcHBsaWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQVcsTUFBTSxVQUFVLENBQUM7QUFHM0M7SUFlRSw0QkFDNEIsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQVhyQyxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1Qix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFrUWhDLGNBQVMsR0FBRyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsV0FBbUIsRUFBRSxTQUFpQjtZQUNwRixHQUFHLElBQUksRUFBRSxDQUFDO1lBQ1YsSUFBTSxDQUFDLEdBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxJQUFNLFFBQVEsR0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckUsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQU0sR0FBRyxHQUFXLGNBQWMsQ0FBQztZQUNuQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUMzQixPQUFPLEdBQUcsR0FBRyxRQUFRLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxTQUFT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SUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztlQUN4QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTztlQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBdFFVLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7UUFpQlIsbUJBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBOztPQWhCTixrQkFBa0IsQ0F3VDlCO0lBQUQseUJBQUM7Q0FBQSxBQXhURCxJQXdUQztTQXhUWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hc2tBcHBsaWVyU2VydmljZSB7XG5cbiAgcHVibGljIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ107XG4gIHB1YmxpYyBzaG93VGVtcGxhdGU6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddO1xuICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXTtcbiAgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNob3duTWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgbWFza1NwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddO1xuICBwdWJsaWMgbWFza0F2YWlsYWJsZVBhdHRlcm5zOiBJQ29uZmlnWydwYXR0ZXJucyddO1xuICBwdWJsaWMgcHJlZml4OiBJQ29uZmlnWydwcmVmaXgnXTtcbiAgcHVibGljIHN1Zml4OiBJQ29uZmlnWydzdWZpeCddO1xuICBwdWJsaWMgY3VzdG9tUGF0dGVybjogSUNvbmZpZ1sncGF0dGVybnMnXTtcblxuICBwcml2YXRlIF9zaGlmdDogU2V0PG51bWJlcj47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZ1xuICApIHtcbiAgICB0aGlzLl9zaGlmdCA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZyEuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB0aGlzLl9jb25maWcucGF0dGVybnM7XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2ggPSB0aGlzLl9jb25maWcuY2xlYXJJZk5vdE1hdGNoO1xuICAgIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fY29uZmlnLmRyb3BTcGVjaWFsQ2hhcmFjdGVycztcbiAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZyEuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB0aGlzLl9jb25maWcucGF0dGVybnM7XG4gICAgdGhpcy5wcmVmaXggPSB0aGlzLl9jb25maWcucHJlZml4O1xuICAgIHRoaXMuc3VmaXggPSB0aGlzLl9jb25maWcuc3VmaXg7XG5cblxuICB9XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHVibGljIGFwcGx5TWFza1dpdGhQYXR0ZXJuKGlucHV0VmFsdWU6IHN0cmluZywgbWFza0FuZFBhdHRlcm46IFtzdHJpbmcsIElDb25maWdbJ3BhdHRlcm5zJ11dKTogc3RyaW5nIHtcbiAgICBjb25zdCBbbWFzaywgY3VzdG9tUGF0dGVybl0gPSBtYXNrQW5kUGF0dGVybjtcbiAgICB0aGlzLmN1c3RvbVBhdHRlcm4gPSBjdXN0b21QYXR0ZXJuO1xuICAgIHJldHVybiB0aGlzLmFwcGx5TWFzayhpbnB1dFZhbHVlLCBtYXNrKTtcbiAgfVxuICBwdWJsaWMgYXBwbHlNYXNrKFxuICAgIGlucHV0VmFsdWU6IHN0cmluZyxcbiAgICBtYXNrRXhwcmVzc2lvbjogc3RyaW5nLFxuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwLFxuICAgIGNiOiBGdW5jdGlvbiA9ICgpID0+IHsgfVxuICApOiBzdHJpbmcge1xuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQgfHwgaW5wdXRWYWx1ZSA9PT0gbnVsbCB8fCBtYXNrRXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBjdXJzb3I6IG51bWJlciA9IDA7XG4gICAgbGV0IHJlc3VsdDogc3RyaW5nID0gYGA7XG4gICAgbGV0IG11bHRpOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IHNoaWZ0U3RlcDogbnVtYmVyO1xuXG4gICAgaWYgKGlucHV0VmFsdWUuc2xpY2UoMCwgdGhpcy5wcmVmaXgubGVuZ3RoKSA9PT0gdGhpcy5wcmVmaXgpIHtcbiAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnNsaWNlKHRoaXMucHJlZml4Lmxlbmd0aCwgaW5wdXRWYWx1ZS5sZW5ndGgpO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0QXJyYXk6IHN0cmluZ1tdID0gaW5wdXRWYWx1ZS50b1N0cmluZygpXG4gICAgICAuc3BsaXQoJycpO1xuICAgIGlmIChtYXNrRXhwcmVzc2lvbiA9PT0gJ3BlcmNlbnQnKSB7XG4gICAgICBpZiAoaW5wdXRWYWx1ZS5tYXRjaCgnW2Etel18W0EtWl0nKSB8fCBpbnB1dFZhbHVlLm1hdGNoKC9bLSEkJV4mKigpXyt8fj1ge31cXFtcXF06XCI7Jzw+PyxcXC9dLykpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wZXJjZW50YWdlKGlucHV0VmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IGlucHV0VmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWFza0V4cHJlc3Npb24gPT09ICdzZXBhcmF0b3InXG4gICAgICB8fCBtYXNrRXhwcmVzc2lvbiA9PT0gJ2RvdF9zZXBhcmF0b3InIHx8IG1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ2RvdF9zZXBhcmF0b3InKVxuICAgICAgfHwgbWFza0V4cHJlc3Npb24gPT09ICdjb21hX3NlcGFyYXRvcicgfHwgbWFza0V4cHJlc3Npb24uc3RhcnRzV2l0aCgnY29tYV9zZXBhcmF0b3InKSkge1xuICAgICAgaWYgKGlucHV0VmFsdWUubWF0Y2goJ1thLXpdfFtBLVpdJykgfHwgaW5wdXRWYWx1ZS5tYXRjaCgvW0AjISQlXiYqKClfK3x+PWB7fVxcW1xcXTpcIjs8Pj9cXC9dLykpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgICBjb25zdCBwcmVjaXNpb246IG51bWJlciA9IHRoaXMuZ2V0UHJlY2lzaW9uKG1hc2tFeHByZXNzaW9uKTtcbiAgICAgIGxldCBzdHJGb3JTZXA6IHN0cmluZztcbiAgICAgIGlmIChtYXNrRXhwcmVzc2lvbiA9PT0gJ3NlcGFyYXRvcicpIHtcbiAgICAgICAgaWYgKGlucHV0VmFsdWUuaW5jbHVkZXMoJywnKVxuICAgICAgICAgICYmIGlucHV0VmFsdWUuZW5kc1dpdGgoJywnKSAmJiBpbnB1dFZhbHVlLmluZGV4T2YoJywnKSAhPT0gaW5wdXRWYWx1ZS5sYXN0SW5kZXhPZignLCcpKSB7XG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0VmFsdWUubWF0Y2goJ1thLXpdfFtBLVpdJykgfHwgaW5wdXRWYWx1ZS5tYXRjaCgvW0AjISQlXiYqKClfK3x+PWB7fVxcW1xcXTouXCI7PD4/XFwvXS8pKSB7XG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RyRm9yU2VwID0gaW5wdXRWYWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICByZXN1bHQgPSB0aGlzLnNlcGFyYXRvcihzdHJGb3JTZXAsICcgJywgJy4nLCBwcmVjaXNpb24pO1xuICAgICAgfSBlbHNlIGlmIChtYXNrRXhwcmVzc2lvbiA9PT0gJ2RvdF9zZXBhcmF0b3InIHx8IG1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ2RvdF9zZXBhcmF0b3InKSkge1xuICAgICAgICBpZiAoaW5wdXRWYWx1ZS5tYXRjaCgnW2Etel18W0EtWl0nKSB8fCBpbnB1dFZhbHVlLm1hdGNoKC9bQCMhJCVeJiooKV8rfH49YHt9XFxbXFxdOlxcc1wiOzw+P1xcL10vKSkge1xuICAgICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmNoZWNrSW5wdXRQcmVjaXNpb24oaW5wdXRWYWx1ZSwgcHJlY2lzaW9uLCAnLCcpO1xuICAgICAgICBzdHJGb3JTZXAgPSBpbnB1dFZhbHVlLnJlcGxhY2UoL1xcLi9nLCAnJyk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuc2VwYXJhdG9yKHN0ckZvclNlcCwgJy4nLCAnLCcsIHByZWNpc2lvbik7XG4gICAgICB9IGVsc2UgaWYgKG1hc2tFeHByZXNzaW9uID09PSAnY29tYV9zZXBhcmF0b3InIHx8IG1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ2NvbWFfc2VwYXJhdG9yJykpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY2hlY2tJbnB1dFByZWNpc2lvbihpbnB1dFZhbHVlLCBwcmVjaXNpb24sICcuJyk7XG4gICAgICAgIHN0ckZvclNlcCA9IGlucHV0VmFsdWUucmVwbGFjZSgvXFwsL2csICcnKTtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5zZXBhcmF0b3Ioc3RyRm9yU2VwLCAnLCcsICcuJywgcHJlY2lzaW9uKTtcbiAgICAgIH1cbiAgICAgIHBvc2l0aW9uID0gcmVzdWx0Lmxlbmd0aCArIDE7XG4gICAgICBjdXJzb3IgPSBwb3NpdGlvbjtcbiAgICAgIHNoaWZ0U3RlcCA9IC9cXCp8XFw/L2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKVxuICAgICAgICA/IGlucHV0QXJyYXkubGVuZ3RoXG4gICAgICAgIDogY3Vyc29yO1xuICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwLCBpbnB1dFN5bWJvbDogc3RyaW5nID0gaW5wdXRBcnJheVswXTsgaVxuICAgICAgICA8IGlucHV0QXJyYXkubGVuZ3RoOyBpKysgLCBpbnB1dFN5bWJvbCA9IGlucHV0QXJyYXlbaV0pIHtcbiAgICAgICAgaWYgKGN1cnNvciA9PT0gbWFza0V4cHJlc3Npb24ubGVuZ3RoKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkgJiYgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/Jykge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IgKz0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJyonICYmIG11bHRpXG4gICAgICAgICAgJiYgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgIG11bHRpID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKVxuICAgICAgICAgICYmIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdXG4gICAgICAgICAgPT09ICcqJykge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBtdWx0aSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJiB0aGlzLl9jaGVja1N5bWJvbE1hc2soXG4gICAgICAgICAgaW5wdXRTeW1ib2wsXG4gICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl1cbiAgICAgICAgKSkge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IgKz0gMztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pKSB7XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdIJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiAyKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSAwO1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgc2hpZnRTdGVwID0gL1xcKnxcXD8vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpXG4gICAgICAgICAgICAgICAgPyBpbnB1dEFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgICAgIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdoJykge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJzInICYmIE51bWJlcihpbnB1dFN5bWJvbCkgPiAzKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ20nKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDUpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ICs9IDA7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBzaGlmdFN0ZXAgPSAvXFwqfFxcPy9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSlcbiAgICAgICAgICAgICAgICA/IGlucHV0QXJyYXkubGVuZ3RoXG4gICAgICAgICAgICAgICAgOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAncycpIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gNSkge1xuICAgICAgICAgICAgICByZXN1bHQgKz0gMDtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIHNoaWZ0U3RlcCA9IC9cXCp8XFw/L2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKVxuICAgICAgICAgICAgICAgID8gaW5wdXRBcnJheS5sZW5ndGhcbiAgICAgICAgICAgICAgICA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdkJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiAzKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSAwO1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgc2hpZnRTdGVwID0gL1xcKnxcXD8vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpXG4gICAgICAgICAgICAgICAgPyBpbnB1dEFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgICAgIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yIC0gMV0gPT09ICdkJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDEsIGN1cnNvciArIDEpKSA+IDMxKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ20nKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDEpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ICs9IDA7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBzaGlmdFN0ZXAgPSAvXFwqfFxcPy9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSlcbiAgICAgICAgICAgICAgICA/IGlucHV0QXJyYXkubGVuZ3RoXG4gICAgICAgICAgICAgICAgOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3IgLSAxXSA9PT0gJ20nKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMSwgY3Vyc29yICsgMSkpID4gMTIpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICE9PSAtMSkge1xuICAgICAgICAgIHJlc3VsdCArPSBtYXNrRXhwcmVzc2lvbltjdXJzb3JdO1xuICAgICAgICAgIGN1cnNvcisrO1xuICAgICAgICAgIHNoaWZ0U3RlcCA9IC9cXCp8XFw/L2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKVxuICAgICAgICAgICAgPyBpbnB1dEFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgOiBjdXJzb3I7XG4gICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPiAtMVxuICAgICAgICAgICYmIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dXG4gICAgICAgICAgJiYgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0ub3B0aW9uYWwpIHtcbiAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgICBpLS07XG4gICAgICAgIH0gZWxzZSBpZiAoKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJylcbiAgICAgICAgICAmJiAodGhpcy5fZmluZFNwZWNpYWxDaGFyKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pKVxuICAgICAgICAgICYmICh0aGlzLl9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2wpID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKSAmJiBtdWx0aSkge1xuICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCArIDEgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aFxuICAgICAgJiYgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihtYXNrRXhwcmVzc2lvblttYXNrRXhwcmVzc2lvbi5sZW5ndGggLSAxXSkgIT09IC0xKSB7XG4gICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bbWFza0V4cHJlc3Npb24ubGVuZ3RoIC0gMV07XG4gICAgfVxuXG5cbiAgICBsZXQgc2hpZnQ6IG51bWJlciA9IDE7XG4gICAgbGV0IG5ld1Bvc2l0aW9uOiBudW1iZXIgPSBwb3NpdGlvbiArIDE7XG5cbiAgICB3aGlsZSAodGhpcy5fc2hpZnQuaGFzKG5ld1Bvc2l0aW9uKSkge1xuICAgICAgc2hpZnQrKztcbiAgICAgIG5ld1Bvc2l0aW9uKys7XG4gICAgfVxuXG4gICAgY2IodGhpcy5fc2hpZnQuaGFzKHBvc2l0aW9uKSA/IHNoaWZ0IDogMCk7XG4gICAgbGV0IHJlczogc3RyaW5nID0gYCR7dGhpcy5wcmVmaXh9JHtyZXN1bHR9YDtcbiAgICByZXMgPSB0aGlzLnN1Zml4ID8gYCR7dGhpcy5wcmVmaXh9JHtyZXN1bHR9JHt0aGlzLnN1Zml4fWAgOiBgJHt0aGlzLnByZWZpeH0ke3Jlc3VsdH1gO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXMgPSBgJHt0aGlzLnByZWZpeH0ke3Jlc3VsdH1gO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBfZmluZFNwZWNpYWxDaGFyKGlucHV0U3ltYm9sOiBzdHJpbmcpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIGNvbnN0IHN5bWJvbDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnNcbiAgICAgIC5maW5kKCh2YWw6IHN0cmluZykgPT4gdmFsID09PSBpbnB1dFN5bWJvbCk7XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbDogc3RyaW5nLCBtYXNrU3ltYm9sOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHRoaXMuY3VzdG9tUGF0dGVyblxuICAgICAgPyB0aGlzLmN1c3RvbVBhdHRlcm5cbiAgICAgIDogdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnM7XG4gICAgcmV0dXJuIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdXG4gICAgICAmJiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXS5wYXR0ZXJuXG4gICAgICAmJiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXS5wYXR0ZXJuLnRlc3QoaW5wdXRTeW1ib2wpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXBhcmF0b3IgPSAoc3RyOiBzdHJpbmcsIGNoYXI6IHN0cmluZywgZGVjaW1hbENoYXI6IHN0cmluZywgcHJlY2lzaW9uOiBudW1iZXIpID0+IHtcbiAgICBzdHIgKz0gJyc7XG4gICAgY29uc3QgeDogc3RyaW5nW10gPSBzdHIuc3BsaXQoZGVjaW1hbENoYXIpO1xuICAgIGNvbnN0IGRlY2ltYWxzOiBzdHJpbmcgPSB4Lmxlbmd0aCA+IDEgPyBgJHtkZWNpbWFsQ2hhcn0ke3hbMV19YCA6ICcnO1xuICAgIGxldCByZXM6IHN0cmluZyA9IHhbMF07XG4gICAgY29uc3Qgcmd4OiBSZWdFeHAgPSAvKFxcZCspKFxcZHszfSkvO1xuICAgIHdoaWxlIChyZ3gudGVzdChyZXMpKSB7XG4gICAgICByZXMgPSByZXMucmVwbGFjZShyZ3gsICckMScgKyBjaGFyICsgJyQyJyk7XG4gICAgfVxuICAgIGlmIChwcmVjaXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlcyArIGRlY2ltYWxzO1xuICAgIH0gZWxzZSBpZiAocHJlY2lzaW9uID09PSAwKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzICsgZGVjaW1hbHMuc3Vic3RyKDAsIHByZWNpc2lvbiArIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJjZW50YWdlID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIE51bWJlcihzdHIpID49IDAgJiYgTnVtYmVyKHN0cikgPD0gMTAwO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcmVjaXNpb24gPSAobWFza0V4cHJlc3Npb246IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgeDogc3RyaW5nW10gPSBtYXNrRXhwcmVzc2lvbi5zcGxpdCgnLicpO1xuICAgIGlmICh4Lmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBOdW1iZXIoeFt4Lmxlbmd0aCAtIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0lucHV0UHJlY2lzaW9uID0gKGlucHV0VmFsdWU6IHN0cmluZywgcHJlY2lzaW9uOiBudW1iZXIsIGRlY2ltYWxNYXJrZXI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHByZWNpc2lvbiA8IEluZmluaXR5KSB7XG4gICAgICBsZXQgcHJlY2lzaW9uUmVnRXg6IFJlZ0V4cDtcblxuICAgICAgaWYgKGRlY2ltYWxNYXJrZXIgPT09ICcuJykge1xuICAgICAgICBwcmVjaXNpb25SZWdFeCA9IG5ldyBSZWdFeHAoYFxcXFwuXFxcXGR7JHtwcmVjaXNpb259fS4qJGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJlY2lzaW9uUmVnRXggPSBuZXcgUmVnRXhwKGAsXFxcXGR7JHtwcmVjaXNpb259fS4qJGApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmVjaXNpb25NYXRjaDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSBpbnB1dFZhbHVlLm1hdGNoKHByZWNpc2lvblJlZ0V4KTtcbiAgICAgIGlmIChwcmVjaXNpb25NYXRjaCAmJiBwcmVjaXNpb25NYXRjaFswXS5sZW5ndGggLSAxID4gcHJlY2lzaW9uKSB7XG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDAgJiYgaW5wdXRWYWx1ZS5lbmRzV2l0aChkZWNpbWFsTWFya2VyKSkge1xuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0VmFsdWU7XG4gIH1cbn1cbiJdfQ==