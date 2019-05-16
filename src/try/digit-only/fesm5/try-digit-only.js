import { __decorate, __metadata } from 'tslib';
import { HostListener, Directive, ElementRef, NgModule } from '@angular/core';

var DigitOnlyDirective = /** @class */ (function () {
    function DigitOnlyDirective(el) {
        this.el = el;
        this.navigationKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'Home',
            'End',
            'ArrowLeft',
            'ArrowRight',
            'Clear',
            'Copy',
            'Paste'
        ];
        this.inputElement = el.nativeElement;
    }
    DigitOnlyDirective.prototype.onKeyDown = function (e) {
        if (this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
            (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
            (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
            (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
            (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
        ) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if (
        // tslint:disable-next-line: deprecation
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
    DigitOnlyDirective.prototype.onPaste = function (event) {
        event.preventDefault();
        if (event.clipboardData === null) {
            return;
        }
        var pastedInput = event.clipboardData
            .getData('text/plain')
            .replace(/\D/g, ''); // get a digit-only string
        document.execCommand('insertText', false, pastedInput);
    };
    DigitOnlyDirective.prototype.onDrop = function (event) {
        event.preventDefault();
        if (event.dataTransfer === null) {
            return;
        }
        var textData = event.dataTransfer.getData('text').replace(/\D/g, '');
        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    };
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], DigitOnlyDirective.prototype, "onKeyDown", null);
    __decorate([
        HostListener('paste', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [ClipboardEvent]),
        __metadata("design:returntype", void 0)
    ], DigitOnlyDirective.prototype, "onPaste", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], DigitOnlyDirective.prototype, "onDrop", null);
    DigitOnlyDirective = __decorate([
        Directive({
            selector: '[digitOnly]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], DigitOnlyDirective);
    return DigitOnlyDirective;
}());

var DigitOnlyModule = /** @class */ (function () {
    function DigitOnlyModule() {
    }
    DigitOnlyModule = __decorate([
        NgModule({
            imports: [],
            declarations: [DigitOnlyDirective],
            exports: [DigitOnlyDirective]
        })
    ], DigitOnlyModule);
    return DigitOnlyModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DigitOnlyModule, DigitOnlyDirective as ɵa };
//# sourceMappingURL=try-digit-only.js.map
