import { __decorate, __param, __metadata, __awaiter } from 'tslib';
import { InjectionToken, Injectable, Inject, ElementRef, Renderer2, Input, HostListener, Directive, forwardRef, Pipe, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const config = new InjectionToken('config');
const NEW_CONFIG = new InjectionToken('NEW_CONFIG');
const INITIAL_CONFIG = new InjectionToken('INITIAL_CONFIG');
const initialConfig = {
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

let MaskApplierService = class MaskApplierService {
    constructor(_config) {
        this._config = _config;
        this.maskExpression = '';
        this.shownMaskExpression = '';
        this.separator = (str, char, decimalChar, precision) => {
            str += '';
            const x = str.split(decimalChar);
            const decimals = x.length > 1 ? `${decimalChar}${x[1]}` : '';
            let res = x[0];
            const rgx = /(\d+)(\d{3})/;
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
        this.percentage = (str) => {
            return Number(str) >= 0 && Number(str) <= 100;
        };
        this.getPrecision = (maskExpression) => {
            const x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        };
        this.checkInputPrecision = (inputValue, precision, decimalMarker) => {
            if (precision < Infinity) {
                let precisionRegEx;
                if (decimalMarker === '.') {
                    precisionRegEx = new RegExp(`\\.\\d{${precision}}.*$`);
                }
                else {
                    precisionRegEx = new RegExp(`,\\d{${precision}}.*$`);
                }
                const precisionMatch = inputValue.match(precisionRegEx);
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
    applyMaskWithPattern(inputValue, maskAndPattern) {
        const [mask, customPattern] = maskAndPattern;
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    }
    applyMask(inputValue, maskExpression, position = 0, cb = () => { }) {
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        let cursor = 0;
        let result = ``;
        let multi = false;
        let shiftStep;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        const inputArray = inputValue.toString()
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
            const precision = this.getPrecision(maskExpression);
            let strForSep;
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
            for (let i = 0, inputSymbol = inputArray[0]; i
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
        let shift = 1;
        let newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        cb(this._shift.has(position) ? shift : 0);
        let res = `${this.prefix}${result}`;
        res = this.sufix ? `${this.prefix}${result}${this.sufix}` : `${this.prefix}${result}`;
        if (result.length === 0) {
            res = `${this.prefix}${result}`;
        }
        return res;
    }
    _findSpecialChar(inputSymbol) {
        const symbol = this.maskSpecialCharacters
            .find((val) => val === inputSymbol);
        return symbol;
    }
    _checkSymbolMask(inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern
            ? this.customPattern
            : this.maskAvailablePatterns;
        return this.maskAvailablePatterns[maskSymbol]
            && this.maskAvailablePatterns[maskSymbol].pattern
            && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    }
};
MaskApplierService = __decorate([
    Injectable(),
    __param(0, Inject(config)),
    __metadata("design:paramtypes", [Object])
], MaskApplierService);

let MaskService = class MaskService extends MaskApplierService {
    constructor(
    // tslint:disable-next-line
    document, _config, _elementRef, _renderer) {
        super(_config);
        this.document = document;
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.maskExpression = '';
        this.isNumberValue = false;
        this.showMaskTyped = false;
        this.maskIsShown = '';
        // tslint:disable-next-line
        this.onChange = (_) => { };
        this.onTouch = () => { };
        this._formElement = this._elementRef.nativeElement;
    }
    applyMask(inputValue, maskExpression, position = 0, cb = () => { }) {
        this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';
        if (!inputValue && this.showMaskTyped) {
            return this.prefix + this.maskIsShown;
        }
        const result = super.applyMask(inputValue, maskExpression, position, cb);
        if (this.maskExpression === 'dot_separator.2' && this.dropSpecialCharacters === true) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((item) => item !== ',');
        }
        if ((this.maskExpression === 'coma_separator.2' && this.dropSpecialCharacters === true)) {
            this.maskSpecialCharacters = this.maskSpecialCharacters.filter((item) => item !== '.');
        }
        Array.isArray(this.dropSpecialCharacters)
            ? this.onChange(this._removeMask(this._removeSufix(this._removePrefix(result)), this.dropSpecialCharacters))
            : this.dropSpecialCharacters === true
                ? this.onChange(this.isNumberValue
                    ? Number(this._removeMask(this._removeSufix(this._removePrefix(result)), this.maskSpecialCharacters))
                    : this._removeMask(this._removeSufix(this._removePrefix(result)), this.maskSpecialCharacters))
                : this.onChange(this._removeSufix(this._removePrefix(result)));
        let ifMaskIsShown = '';
        if (!this.showMaskTyped) {
            return result;
        }
        const resLen = result.length;
        const prefNmask = this.prefix + this.maskIsShown;
        ifMaskIsShown = prefNmask.slice(resLen);
        return result + ifMaskIsShown;
    }
    applyValueChanges(position = 0, cb = () => { }) {
        const maskedInput = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        this._formElement.value = maskedInput;
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    }
    showMaskInInput() {
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
    }
    clearIfNotMatchFn() {
        if (this.clearIfNotMatch === true &&
            this.maskExpression.length !== this._formElement.value.length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    }
    set formElementProperty([name, value]) {
        this._renderer.setProperty(this._formElement, name, value);
    }
    _removeMask(value, specialCharactersForRemove) {
        return value
            ? value.replace(this._regExpForRemove(specialCharactersForRemove), '')
            : value;
    }
    _removePrefix(value) {
        if (!this.prefix) {
            return value;
        }
        return value
            ? value.replace(this.prefix, '')
            : value;
    }
    _removeSufix(value) {
        if (!this.sufix) {
            return value;
        }
        return value
            ? value.replace(this.sufix, '')
            : value;
    }
    _regExpForRemove(specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map((item) => `\\${item}`).join('|'), 'gi');
    }
};
MaskService = __decorate([
    Injectable(),
    __param(0, Inject(DOCUMENT)),
    __param(1, Inject(config)),
    __metadata("design:paramtypes", [Object, Object, ElementRef,
        Renderer2])
], MaskService);

var MaskDirective_1;
let MaskDirective = MaskDirective_1 = class MaskDirective {
    constructor(
    // tslint:disable-next-line
    document, _maskService) {
        this.document = document;
        this._maskService = _maskService;
        this._position = null;
        // tslint:disable-next-line
        this.onChange = (_) => { };
        this.onTouch = () => { };
    }
    set maskExpression(value) {
        this._maskValue = value || '';
        if (!this._maskValue) {
            return;
        }
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue);
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)
        ];
    }
    set specialCharacters(value) {
        if (!value ||
            !Array.isArray(value) ||
            (Array.isArray(value) && !value.length)) {
            return;
        }
        this._maskService.maskSpecialCharacters = value;
    }
    set patterns(value) {
        if (!value) {
            return;
        }
        this._maskService.maskAvailablePatterns = value;
    }
    set prefix(value) {
        if (!value) {
            return;
        }
        this._maskService.prefix = value;
    }
    set sufix(value) {
        if (!value) {
            return;
        }
        this._maskService.sufix = value;
    }
    set dropSpecialCharacters(value) {
        this._maskService.dropSpecialCharacters = value;
    }
    set showMaskTyped(value) {
        if (!value) {
            return;
        }
        this._maskService.showMaskTyped = value;
    }
    set shownMaskExpression(value) {
        if (!value) {
            return;
        }
        this._maskService.shownMaskExpression = value;
    }
    set showTemplate(value) {
        this._maskService.showTemplate = value;
    }
    set clearIfNotMatch(value) {
        this._maskService.clearIfNotMatch = value;
    }
    onInput(e) {
        const el = e.target;
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        const position = el.selectionStart === 1
            ? el.selectionStart + this._maskService.prefix.length
            : el.selectionStart;
        let caretShift = 0;
        this._maskService.applyValueChanges(position, (shift) => (caretShift = shift));
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
    }
    onBlur() {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    }
    onFocus(e) {
        const el = e.target;
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
    }
    a(e) {
        const el = e.target;
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
    }
    onPaste() {
        this._position = Number.MAX_SAFE_INTEGER;
    }
    /** It writes the value in the input */
    writeValue(inputValue) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // tslint:disable-next-line
    registerOnChange(fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    }
    // tslint:disable-next-line
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /** It disables the input element */
    setDisabledState(isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    }
    _repeatPatternSymbols(maskExp) {
        return maskExp.match(/{[0-9]+}/)
            && maskExp.split('')
                .reduce((accum, currval, index) => {
                this._start = (currval === '{') ? index : this._start;
                if (currval !== '}') {
                    return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                this._end = index;
                const repeatNumber = Number(maskExp
                    .slice(this._start + 1, this._end));
                const repaceWith = new Array(repeatNumber + 1)
                    .join(maskExp[this._start - 1]);
                return accum + repaceWith;
            }, '') || maskExp;
    }
};
__decorate([
    Input('mask'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], MaskDirective.prototype, "maskExpression", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "specialCharacters", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "patterns", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "prefix", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "sufix", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "dropSpecialCharacters", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "showMaskTyped", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "shownMaskExpression", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "showTemplate", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MaskDirective.prototype, "clearIfNotMatch", null);
__decorate([
    HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], MaskDirective.prototype, "onInput", null);
__decorate([
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaskDirective.prototype, "onBlur", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaskDirective.prototype, "onFocus", null);
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], MaskDirective.prototype, "a", null);
__decorate([
    HostListener('paste'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaskDirective.prototype, "onPaste", null);
MaskDirective = MaskDirective_1 = __decorate([
    Directive({
        selector: '[mask]',
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MaskDirective_1),
                multi: true
            },
            MaskService
        ]
    }),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, MaskService])
], MaskDirective);

let MaskPipe = class MaskPipe {
    constructor(_maskService) {
        this._maskService = _maskService;
    }
    transform(value, mask) {
        if (!value) {
            return '';
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask(`${value}`, mask);
        }
        return this._maskService.applyMaskWithPattern(`${value}`, mask);
    }
};
MaskPipe = __decorate([
    Pipe({
        name: 'mask',
        pure: true
    }),
    __metadata("design:paramtypes", [MaskApplierService])
], MaskPipe);

var MaskModule_1;
let MaskModule = MaskModule_1 = class MaskModule {
    static forRoot(configValue) {
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
    }
    static forChild(configValue) {
        return {
            ngModule: MaskModule_1,
        };
    }
};
MaskModule = MaskModule_1 = __decorate([
    NgModule({
        providers: [MaskApplierService],
        exports: [MaskDirective, MaskPipe],
        declarations: [MaskDirective, MaskPipe]
    })
], MaskModule);
/**
 * @internal
 */
function _configFactory(initConfig, configValue) {
    return (typeof configValue === 'function') ? configValue() : Object.assign({}, initConfig, configValue);
}

/**
 * Generated bundle index. Do not edit.
 */

export { MaskApplierService, MaskDirective, MaskModule, MaskPipe, MaskService, _configFactory, config as ɵb, NEW_CONFIG as ɵc, INITIAL_CONFIG as ɵd, initialConfig as ɵe };
//# sourceMappingURL=try-input-mask.js.map
