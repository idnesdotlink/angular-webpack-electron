(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@try/input-mask', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory((global.try = global.try || {}, global.try['input-mask'] = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, function (exports, core, common, forms) { 'use strict';

    /*! *****************************************************************************

    Copyright (c) Microsoft Corporation. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License"); you may not use

    this file except in compliance with the License. You may obtain a copy of the

    License at http://www.apache.org/licenses/LICENSE-2.0



    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY

    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED

    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,

    MERCHANTABLITY OR NON-INFRINGEMENT.



    See the Apache Version 2.0 License for specific language governing permissions

    and limitations under the License.

    ***************************************************************************** */

    /* global Reflect, Promise */



    var extendStatics = function(d, b) {

        extendStatics = Object.setPrototypeOf ||

            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||

            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

        return extendStatics(d, b);

    };



    function __extends(d, b) {

        extendStatics(d, b);

        function __() { this.constructor = d; }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());

    }



    var __assign = function() {

        __assign = Object.assign || function __assign(t) {

            for (var s, i = 1, n = arguments.length; i < n; i++) {

                s = arguments[i];

                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];

            }

            return t;

        };

        return __assign.apply(this, arguments);

    };



    function __decorate(decorators, target, key, desc) {

        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);

        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;

        return c > 3 && r && Object.defineProperty(target, key, r), r;

    }



    function __param(paramIndex, decorator) {

        return function (target, key) { decorator(target, key, paramIndex); }

    }



    function __metadata(metadataKey, metadataValue) {

        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);

    }



    function __awaiter(thisArg, _arguments, P, generator) {

        return new (P || (P = Promise))(function (resolve, reject) {

            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }

            step((generator = generator.apply(thisArg, _arguments || [])).next());

        });

    }



    function __generator(thisArg, body) {

        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;

        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

        function verb(n) { return function (v) { return step([n, v]); }; }

        function step(op) {

            if (f) throw new TypeError("Generator is already executing.");

            while (_) try {

                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;

                if (y = 0, t) op = [op[0] & 2, t.value];

                switch (op[0]) {

                    case 0: case 1: t = op; break;

                    case 4: _.label++; return { value: op[1], done: false };

                    case 5: _.label++; y = op[1]; op = [0]; continue;

                    case 7: op = _.ops.pop(); _.trys.pop(); continue;

                    default:

                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }

                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }

                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }

                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }

                        if (t[2]) _.ops.pop();

                        _.trys.pop(); continue;

                }

                op = body.call(thisArg, _);

            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }

            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };

        }

    }



    function __read(o, n) {

        var m = typeof Symbol === "function" && o[Symbol.iterator];

        if (!m) return o;

        var i = m.call(o), r, ar = [], e;

        try {

            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);

        }

        catch (error) { e = { error: error }; }

        finally {

            try {

                if (r && !r.done && (m = i["return"])) m.call(i);

            }

            finally { if (e) throw e.error; }

        }

        return ar;

    }

    var config = new core.InjectionToken('config');
    var NEW_CONFIG = new core.InjectionToken('NEW_CONFIG');
    var INITIAL_CONFIG = new core.InjectionToken('INITIAL_CONFIG');
    var initialConfig = {
        sufix: '',
        prefix: '',
        clearIfNotMatch: false,
        showTemplate: false,
        showMaskTyped: false,
        dropSpecialCharacters: true,
        shownMaskExpression: '',
        specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '\"', '\''],
        patterns: {
            '0': {
                pattern: new RegExp('\\d'),
            },
            '9': {
                pattern: new RegExp('\\d'),
                optional: true
            },
            'A': {
                pattern: new RegExp('\[a-zA-Z0-9\]')
            },
            'S': {
                pattern: new RegExp('\[a-zA-Z\]')
            },
            'd': {
                pattern: new RegExp('\\d'),
            },
            'm': {
                pattern: new RegExp('\\d'),
            },
            'H': {
                pattern: new RegExp('\\d'),
            },
            'h': {
                pattern: new RegExp('\\d'),
            },
            's': {
                pattern: new RegExp('\\d'),
            }
        }
    };

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
            var _a = __read(maskAndPattern, 2), mask = _a[0], customPattern = _a[1];
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
                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
                                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
                                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
                                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
                                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
                                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
                        var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
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
        MaskApplierService = __decorate([
            core.Injectable(),
            __param(0, core.Inject(config)),
            __metadata("design:paramtypes", [Object])
        ], MaskApplierService);
        return MaskApplierService;
    }());

    var MaskService = /** @class */ (function (_super) {
        __extends(MaskService, _super);
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
                var _b = __read(_a, 2), name = _b[0], value = _b[1];
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
        MaskService = __decorate([
            core.Injectable(),
            __param(0, core.Inject(common.DOCUMENT)),
            __param(1, core.Inject(config)),
            __metadata("design:paramtypes", [Object, Object, core.ElementRef,
                core.Renderer2])
        ], MaskService);
        return MaskService;
    }(MaskApplierService));

    var MaskDirective = /** @class */ (function () {
        function MaskDirective(
        // tslint:disable-next-line
        document, _maskService) {
            this.document = document;
            this._maskService = _maskService;
            this._position = null;
            // tslint:disable-next-line
            this.onChange = function (_) { };
            this.onTouch = function () { };
        }
        MaskDirective_1 = MaskDirective;
        Object.defineProperty(MaskDirective.prototype, "maskExpression", {
            set: function (value) {
                this._maskValue = value || '';
                if (!this._maskValue) {
                    return;
                }
                this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue);
                this._maskService.formElementProperty = [
                    'value',
                    this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)
                ];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "specialCharacters", {
            set: function (value) {
                if (!value ||
                    !Array.isArray(value) ||
                    (Array.isArray(value) && !value.length)) {
                    return;
                }
                this._maskService.maskSpecialCharacters = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "patterns", {
            set: function (value) {
                if (!value) {
                    return;
                }
                this._maskService.maskAvailablePatterns = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "prefix", {
            set: function (value) {
                if (!value) {
                    return;
                }
                this._maskService.prefix = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "sufix", {
            set: function (value) {
                if (!value) {
                    return;
                }
                this._maskService.sufix = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "dropSpecialCharacters", {
            set: function (value) {
                this._maskService.dropSpecialCharacters = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "showMaskTyped", {
            set: function (value) {
                if (!value) {
                    return;
                }
                this._maskService.showMaskTyped = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "shownMaskExpression", {
            set: function (value) {
                if (!value) {
                    return;
                }
                this._maskService.shownMaskExpression = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "showTemplate", {
            set: function (value) {
                this._maskService.showTemplate = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaskDirective.prototype, "clearIfNotMatch", {
            set: function (value) {
                this._maskService.clearIfNotMatch = value;
            },
            enumerable: true,
            configurable: true
        });
        MaskDirective.prototype.onInput = function (e) {
            var el = e.target;
            this._inputValue = el.value;
            if (!this._maskValue) {
                this.onChange(el.value);
                return;
            }
            var position = el.selectionStart === 1
                ? el.selectionStart + this._maskService.prefix.length
                : el.selectionStart;
            var caretShift = 0;
            this._maskService.applyValueChanges(position, function (shift) { return (caretShift = shift); });
            // only set the selection if the element is active
            if (this.document.activeElement !== el) {
                return;
            }
            el.selectionStart = el.selectionEnd =
                this._position !== null
                    ? this._position
                    : position +
                        // tslint:disable-next-line
                        (e.inputType === 'deleteContentBackward' ? 0 : caretShift);
            this._position = null;
        };
        MaskDirective.prototype.onBlur = function () {
            this._maskService.clearIfNotMatchFn();
            this.onTouch();
        };
        MaskDirective.prototype.onFocus = function (e) {
            var el = e.target;
            if (el !== null && el.selectionStart !== null &&
                el.selectionStart === el.selectionEnd &&
                el.selectionStart > this._maskService.prefix.length &&
                // tslint:disable-next-line
                e.keyCode !== 38) {
                return;
            }
            if (this._maskService.showMaskTyped) {
                this._maskService.maskIsShown = this._maskService.showMaskInInput();
            }
            el.value = !el.value || el.value === this._maskService.prefix
                ? this._maskService.prefix + this._maskService.maskIsShown
                : el.value;
            /** fix of cursor position with prefix when mouse click occur */
            if ((el.selectionStart || el.selectionEnd) <= this._maskService.prefix.length) {
                el.selectionStart = this._maskService.prefix.length;
                return;
            }
        };
        MaskDirective.prototype.a = function (e) {
            var el = e.target;
            if (e.keyCode === 38) {
                e.preventDefault();
            }
            if (e.keyCode === 37 || e.keyCode === 8) {
                if (el.selectionStart <= this._maskService.prefix.length
                    && el.selectionEnd <= this._maskService.prefix.length) {
                    e.preventDefault();
                }
                this.onFocus(e);
                if (e.keyCode === 8
                    && el.selectionStart === 0
                    && el.selectionEnd === el.value.length) {
                    el.value = this._maskService.prefix;
                    this._position = this._maskService.prefix ? this._maskService.prefix.length : 1;
                    this.onInput(e);
                }
            }
        };
        MaskDirective.prototype.onPaste = function () {
            this._position = Number.MAX_SAFE_INTEGER;
        };
        /** It writes the value in the input */
        MaskDirective.prototype.writeValue = function (inputValue) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (inputValue === undefined) {
                        inputValue = '';
                    }
                    if (typeof inputValue === 'number') {
                        inputValue = String(inputValue);
                        this._maskService.isNumberValue = true;
                    }
                    inputValue && this._maskService.maskExpression ||
                        this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped)
                        ? (this._maskService.formElementProperty = [
                            'value',
                            this._maskService.applyMask(inputValue, this._maskService.maskExpression)
                        ])
                        : (this._maskService.formElementProperty = ['value', inputValue]);
                    this._inputValue = inputValue;
                    return [2 /*return*/];
                });
            });
        };
        // tslint:disable-next-line
        MaskDirective.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
            this._maskService.onChange = this.onChange;
        };
        // tslint:disable-next-line
        MaskDirective.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        /** It disables the input element */
        MaskDirective.prototype.setDisabledState = function (isDisabled) {
            this._maskService.formElementProperty = ['disabled', isDisabled];
        };
        MaskDirective.prototype._repeatPatternSymbols = function (maskExp) {
            var _this = this;
            return maskExp.match(/{[0-9]+}/)
                && maskExp.split('')
                    .reduce(function (accum, currval, index) {
                    _this._start = (currval === '{') ? index : _this._start;
                    if (currval !== '}') {
                        return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                    }
                    _this._end = index;
                    var repeatNumber = Number(maskExp
                        .slice(_this._start + 1, _this._end));
                    var repaceWith = new Array(repeatNumber + 1)
                        .join(maskExp[_this._start - 1]);
                    return accum + repaceWith;
                }, '') || maskExp;
        };
        var MaskDirective_1;
        __decorate([
            core.Input('mask'),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], MaskDirective.prototype, "maskExpression", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "specialCharacters", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "patterns", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "prefix", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "sufix", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "dropSpecialCharacters", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "showMaskTyped", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "shownMaskExpression", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "showTemplate", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], MaskDirective.prototype, "clearIfNotMatch", null);
        __decorate([
            core.HostListener('input', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [KeyboardEvent]),
            __metadata("design:returntype", void 0)
        ], MaskDirective.prototype, "onInput", null);
        __decorate([
            core.HostListener('blur'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MaskDirective.prototype, "onBlur", null);
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], MaskDirective.prototype, "onFocus", null);
        __decorate([
            core.HostListener('keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [KeyboardEvent]),
            __metadata("design:returntype", void 0)
        ], MaskDirective.prototype, "a", null);
        __decorate([
            core.HostListener('paste'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MaskDirective.prototype, "onPaste", null);
        MaskDirective = MaskDirective_1 = __decorate([
            core.Directive({
                selector: '[mask]',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return MaskDirective_1; }),
                        multi: true
                    },
                    MaskService
                ]
            }),
            __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, MaskService])
        ], MaskDirective);
        return MaskDirective;
    }());

    var MaskPipe = /** @class */ (function () {
        function MaskPipe(_maskService) {
            this._maskService = _maskService;
        }
        MaskPipe.prototype.transform = function (value, mask) {
            if (!value) {
                return '';
            }
            if (typeof mask === 'string') {
                return this._maskService.applyMask("" + value, mask);
            }
            return this._maskService.applyMaskWithPattern("" + value, mask);
        };
        MaskPipe = __decorate([
            core.Pipe({
                name: 'mask',
                pure: true
            }),
            __metadata("design:paramtypes", [MaskApplierService])
        ], MaskPipe);
        return MaskPipe;
    }());

    var MaskModule = /** @class */ (function () {
        function MaskModule() {
        }
        MaskModule_1 = MaskModule;
        MaskModule.forRoot = function (configValue) {
            return {
                ngModule: MaskModule_1,
                providers: [
                    {
                        provide: NEW_CONFIG,
                        useValue: configValue
                    },
                    {
                        provide: INITIAL_CONFIG,
                        useValue: initialConfig
                    },
                    {
                        provide: config,
                        useFactory: _configFactory,
                        deps: [INITIAL_CONFIG, NEW_CONFIG]
                    },
                ]
            };
        };
        MaskModule.forChild = function (configValue) {
            return {
                ngModule: MaskModule_1,
            };
        };
        var MaskModule_1;
        MaskModule = MaskModule_1 = __decorate([
            core.NgModule({
                providers: [MaskApplierService],
                exports: [MaskDirective, MaskPipe],
                declarations: [MaskDirective, MaskPipe]
            })
        ], MaskModule);
        return MaskModule;
    }());
    /**
     * @internal
     */
    function _configFactory(initConfig, configValue) {
        return (typeof configValue === 'function') ? configValue() : __assign({}, initConfig, configValue);
    }

    exports.MaskApplierService = MaskApplierService;
    exports.MaskDirective = MaskDirective;
    exports.MaskModule = MaskModule;
    exports.MaskPipe = MaskPipe;
    exports.MaskService = MaskService;
    exports._configFactory = _configFactory;
    exports.ɵb = config;
    exports.ɵc = NEW_CONFIG;
    exports.ɵd = INITIAL_CONFIG;
    exports.ɵe = initialConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=try-input-mask.umd.js.map
