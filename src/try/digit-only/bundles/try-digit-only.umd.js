(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@try/digit-only', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.try = global.try || {}, global.try['digit-only'] = {}), global.ng.core));
}(this, function (exports, core) { 'use strict';

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



    function __decorate(decorators, target, key, desc) {

        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);

        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;

        return c > 3 && r && Object.defineProperty(target, key, r), r;

    }



    function __metadata(metadataKey, metadataValue) {

        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);

    }

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
            var pastedInput = event.clipboardData
                .getData('text/plain')
                .replace(/\D/g, ''); // get a digit-only string
            document.execCommand('insertText', false, pastedInput);
        };
        DigitOnlyDirective.prototype.onDrop = function (event) {
            event.preventDefault();
            var textData = event.dataTransfer.getData('text').replace(/\D/g, '');
            this.inputElement.focus();
            document.execCommand('insertText', false, textData);
        };
        __decorate([
            core.HostListener('keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [KeyboardEvent]),
            __metadata("design:returntype", void 0)
        ], DigitOnlyDirective.prototype, "onKeyDown", null);
        __decorate([
            core.HostListener('paste', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [ClipboardEvent]),
            __metadata("design:returntype", void 0)
        ], DigitOnlyDirective.prototype, "onPaste", null);
        __decorate([
            core.HostListener('drop', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [DragEvent]),
            __metadata("design:returntype", void 0)
        ], DigitOnlyDirective.prototype, "onDrop", null);
        DigitOnlyDirective = __decorate([
            core.Directive({
                selector: '[digitOnly]'
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], DigitOnlyDirective);
        return DigitOnlyDirective;
    }());

    var DigitOnlyModule = /** @class */ (function () {
        function DigitOnlyModule() {
        }
        DigitOnlyModule = __decorate([
            core.NgModule({
                imports: [],
                declarations: [DigitOnlyDirective],
                exports: [DigitOnlyDirective]
            })
        ], DigitOnlyModule);
        return DigitOnlyModule;
    }());

    exports.DigitOnlyModule = DigitOnlyModule;
    exports.ɵa = DigitOnlyDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=try-digit-only.umd.js.map
