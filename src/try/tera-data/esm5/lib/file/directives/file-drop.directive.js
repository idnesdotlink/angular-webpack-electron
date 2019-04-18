import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinDisabled } from '../../common';
var TdFileDropBase = /** @class */ (function () {
    function TdFileDropBase() {
    }
    return TdFileDropBase;
}());
export { TdFileDropBase };
/* tslint:disable-next-line */
export var _TdFileDropMixinBase = mixinDisabled(TdFileDropBase);
var TdFileDropDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TdFileDropDirective, _super);
    function TdFileDropDirective(_renderer, _element) {
        var _this = _super.call(this) || this;
        _this._renderer = _renderer;
        _this._element = _element;
        // tslint:disable-next-line: variable-name
        _this._multiple = false;
        /**
         * fileDrop?: function
         * Event emitted when a file or files are dropped in host element after being validated.
         * Emits a [FileList | File] object.
         */
        // tslint:disable-next-line
        _this.onFileDrop = new EventEmitter();
        return _this;
    }
    Object.defineProperty(TdFileDropDirective.prototype, "multiple", {
        /**
         * multiple?: boolean
         * Sets whether multiple files can be dropped at once in host element, or just a single file.
         * Can also be 'multiple' native attribute.
         */
        set: function (multiple) {
            this._multiple = coerceBooleanProperty(multiple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdFileDropDirective.prototype, "multipleBinding", {
        /**
         * Binds native 'multiple' attribute if [multiple] property is 'true'.
         */
        get: function () {
            return this._multiple ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdFileDropDirective.prototype, "disabledBinding", {
        /**
         * Binds native 'disabled' attribute if [disabled] property is 'true'.
         */
        get: function () {
            return this.disabled ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Listens to 'drop' host event to get validated transfer items.
     * Emits the 'onFileDrop' event with a [FileList] or [File] depending if 'multiple' attr exists in host.
     * Stops event propagation and default action from browser for 'drop' event.
     */
    TdFileDropDirective.prototype.onDrop = function (event) {
        if (!this.disabled) {
            var transfer = event.dataTransfer;
            var files = transfer.files;
            if (files.length) {
                var value = this._multiple ? (files.length > 1 ? files : files[0]) : files[0];
                this.onFileDrop.emit(value);
            }
        }
        this._renderer.removeClass(this._element.nativeElement, 'drop-zone');
        this._stopEvent(event);
    };
    /**
     * Listens to 'dragover' host event to validate transfer items.
     * Checks if 'multiple' attr exists in host to allow multiple file drops.
     * Stops event propagation and default action from browser for 'dragover' event.
     */
    TdFileDropDirective.prototype.onDragOver = function (event) {
        var transfer = event.dataTransfer;
        transfer.dropEffect = this._typeCheck(transfer.types);
        if (this.disabled || (!this._multiple &&
            ((transfer.items && transfer.items.length > 1) || transfer.mozItemCount > 1))) {
            transfer.dropEffect = 'none';
        }
        else {
            transfer.dropEffect = 'copy';
        }
        this._stopEvent(event);
    };
    /**
     * Listens to 'dragenter' host event to add animation class 'drop-zone' which can be overriden in host.
     * Stops event propagation and default action from browser for 'dragenter' event.
     */
    TdFileDropDirective.prototype.onDragEnter = function (event) {
        if (!this.disabled) {
            this._renderer.addClass(this._element.nativeElement, 'drop-zone');
        }
        this._stopEvent(event);
    };
    /**
     * Listens to 'dragleave' host event to remove animation class 'drop-zone'.
     * Stops event propagation and default action from browser for 'dragleave' event.
     */
    TdFileDropDirective.prototype.onDragLeave = function (event) {
        this._renderer.removeClass(this._element.nativeElement, 'drop-zone');
        this._stopEvent(event);
    };
    /**
     * Validates if the transfer item types are 'Files'.
     */
    TdFileDropDirective.prototype._typeCheck = function (types) {
        var dropEffect = 'none';
        if (types) {
            if ((types.contains && types.contains('Files'))
                || (types.indexOf && types.indexOf('Files') !== -1)) {
                dropEffect = 'copy';
            }
        }
        return dropEffect;
    };
    TdFileDropDirective.prototype._stopEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdFileDropDirective.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input('multiple'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], TdFileDropDirective.prototype, "multiple", null);
    tslib_1.__decorate([
        Output('fileDrop'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdFileDropDirective.prototype, "onFileDrop", void 0);
    tslib_1.__decorate([
        HostBinding('attr.multiple'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [])
    ], TdFileDropDirective.prototype, "multipleBinding", null);
    tslib_1.__decorate([
        HostBinding('attr.disabled'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [])
    ], TdFileDropDirective.prototype, "disabledBinding", null);
    tslib_1.__decorate([
        HostListener('drop', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TdFileDropDirective.prototype, "onDrop", null);
    tslib_1.__decorate([
        HostListener('dragover', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TdFileDropDirective.prototype, "onDragOver", null);
    tslib_1.__decorate([
        HostListener('dragenter', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TdFileDropDirective.prototype, "onDragEnter", null);
    tslib_1.__decorate([
        HostListener('dragleave', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TdFileDropDirective.prototype, "onDragLeave", null);
    TdFileDropDirective = tslib_1.__decorate([
        Directive({
            selector: '[tdFileDrop]',
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2, ElementRef])
    ], TdFileDropDirective);
    return TdFileDropDirective;
}(_TdFileDropMixinBase));
export { TdFileDropDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL2ZpbGUvZGlyZWN0aXZlcy9maWxlLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFlLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxRDtJQUFBO0lBQTZCLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFBOUIsSUFBOEI7O0FBRTlCLDhCQUE4QjtBQUM5QixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFNbEU7SUFBeUMsK0NBQW9CO0lBMEMzRCw2QkFBb0IsU0FBb0IsRUFBVSxRQUFvQjtRQUF0RSxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsZUFBUyxHQUFULFNBQVMsQ0FBVztRQUFVLGNBQVEsR0FBUixRQUFRLENBQVk7UUF4Q3RFLDBDQUEwQztRQUNsQyxlQUFTLEdBQVksS0FBSyxDQUFDO1FBY25DOzs7O1dBSUc7UUFFSCwyQkFBMkI7UUFDUCxnQkFBVSxHQUFrQyxJQUFJLFlBQVksRUFBbUIsQ0FBQzs7SUFvQnBHLENBQUM7SUEvQkQsc0JBQUkseUNBQVE7UUFOWjs7OztXQUlHO2FBRUgsVUFBYSxRQUFpQjtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7OztPQUFBO0lBZUQsc0JBQUksZ0RBQWU7UUFKbkI7O1dB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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIb3N0TGlzdGVuZXIsIEhvc3RCaW5kaW5nLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmltcG9ydCB7IElDYW5EaXNhYmxlLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcblxuZXhwb3J0IGNsYXNzIFRkRmlsZURyb3BCYXNlIHt9XG5cbi8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuZXhwb3J0IGNvbnN0IF9UZEZpbGVEcm9wTWl4aW5CYXNlID0gbWl4aW5EaXNhYmxlZChUZEZpbGVEcm9wQmFzZSk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0ZEZpbGVEcm9wXScsXG4gIC8vIGlucHV0czogWydkaXNhYmxlZCddLFxufSlcbmV4cG9ydCBjbGFzcyBUZEZpbGVEcm9wRGlyZWN0aXZlIGV4dGVuZHMgX1RkRmlsZURyb3BNaXhpbkJhc2UgaW1wbGVtZW50cyBJQ2FuRGlzYWJsZSB7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ7XG5cbiAgLyoqXG4gICAqIG11bHRpcGxlPzogYm9vbGVhblxuICAgKiBTZXRzIHdoZXRoZXIgbXVsdGlwbGUgZmlsZXMgY2FuIGJlIGRyb3BwZWQgYXQgb25jZSBpbiBob3N0IGVsZW1lbnQsIG9yIGp1c3QgYSBzaW5nbGUgZmlsZS5cbiAgICogQ2FuIGFsc28gYmUgJ211bHRpcGxlJyBuYXRpdmUgYXR0cmlidXRlLlxuICAgKi9cbiAgQElucHV0KCdtdWx0aXBsZScpXG4gIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG11bHRpcGxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmaWxlRHJvcD86IGZ1bmN0aW9uXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIGZpbGUgb3IgZmlsZXMgYXJlIGRyb3BwZWQgaW4gaG9zdCBlbGVtZW50IGFmdGVyIGJlaW5nIHZhbGlkYXRlZC5cbiAgICogRW1pdHMgYSBbRmlsZUxpc3QgfCBGaWxlXSBvYmplY3QuXG4gICAqL1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBAT3V0cHV0KCdmaWxlRHJvcCcpIG9uRmlsZURyb3A6IEV2ZW50RW1pdHRlcjxGaWxlTGlzdCB8IEZpbGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlTGlzdCB8IEZpbGU+KCk7XG5cbiAgLyoqXG4gICAqIEJpbmRzIG5hdGl2ZSAnbXVsdGlwbGUnIGF0dHJpYnV0ZSBpZiBbbXVsdGlwbGVdIHByb3BlcnR5IGlzICd0cnVlJy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5tdWx0aXBsZScpXG4gIGdldCBtdWx0aXBsZUJpbmRpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGUgPyAnJyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBuYXRpdmUgJ2Rpc2FibGVkJyBhdHRyaWJ1dGUgaWYgW2Rpc2FibGVkXSBwcm9wZXJ0eSBpcyAndHJ1ZScuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWRCaW5kaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAnJyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gJ2Ryb3AnIGhvc3QgZXZlbnQgdG8gZ2V0IHZhbGlkYXRlZCB0cmFuc2ZlciBpdGVtcy5cbiAgICogRW1pdHMgdGhlICdvbkZpbGVEcm9wJyBldmVudCB3aXRoIGEgW0ZpbGVMaXN0XSBvciBbRmlsZV0gZGVwZW5kaW5nIGlmICdtdWx0aXBsZScgYXR0ciBleGlzdHMgaW4gaG9zdC5cbiAgICogU3RvcHMgZXZlbnQgcHJvcGFnYXRpb24gYW5kIGRlZmF1bHQgYWN0aW9uIGZyb20gYnJvd3NlciBmb3IgJ2Ryb3AnIGV2ZW50LlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIG9uRHJvcChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGxldCB0cmFuc2ZlcjogRGF0YVRyYW5zZmVyID0gKDxEcmFnRXZlbnQ+ZXZlbnQpLmRhdGFUcmFuc2ZlcjtcbiAgICAgIGxldCBmaWxlczogRmlsZUxpc3QgPSB0cmFuc2Zlci5maWxlcztcbiAgICAgIGlmIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBGaWxlTGlzdCB8IEZpbGUgPSB0aGlzLl9tdWx0aXBsZSA/IChmaWxlcy5sZW5ndGggPiAxID8gZmlsZXMgOiBmaWxlc1swXSkgOiBmaWxlc1swXTtcbiAgICAgICAgdGhpcy5vbkZpbGVEcm9wLmVtaXQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkcm9wLXpvbmUnKTtcbiAgICB0aGlzLl9zdG9wRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gJ2RyYWdvdmVyJyBob3N0IGV2ZW50IHRvIHZhbGlkYXRlIHRyYW5zZmVyIGl0ZW1zLlxuICAgKiBDaGVja3MgaWYgJ211bHRpcGxlJyBhdHRyIGV4aXN0cyBpbiBob3N0IHRvIGFsbG93IG11bHRpcGxlIGZpbGUgZHJvcHMuXG4gICAqIFN0b3BzIGV2ZW50IHByb3BhZ2F0aW9uIGFuZCBkZWZhdWx0IGFjdGlvbiBmcm9tIGJyb3dzZXIgZm9yICdkcmFnb3ZlcicgZXZlbnQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ092ZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgbGV0IHRyYW5zZmVyOiBEYXRhVHJhbnNmZXIgPSAoPERyYWdFdmVudD5ldmVudCkuZGF0YVRyYW5zZmVyO1xuICAgIHRyYW5zZmVyLmRyb3BFZmZlY3QgPSB0aGlzLl90eXBlQ2hlY2sodHJhbnNmZXIudHlwZXMpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICghdGhpcy5fbXVsdGlwbGUgJiZcbiAgICAgICgodHJhbnNmZXIuaXRlbXMgJiYgdHJhbnNmZXIuaXRlbXMubGVuZ3RoID4gMSkgfHwgKDxhbnk+dHJhbnNmZXIpLm1vekl0ZW1Db3VudCA+IDEpKSkge1xuICAgICAgdHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB9XG4gICAgdGhpcy5fc3RvcEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvICdkcmFnZW50ZXInIGhvc3QgZXZlbnQgdG8gYWRkIGFuaW1hdGlvbiBjbGFzcyAnZHJvcC16b25lJyB3aGljaCBjYW4gYmUgb3ZlcnJpZGVuIGluIGhvc3QuXG4gICAqIFN0b3BzIGV2ZW50IHByb3BhZ2F0aW9uIGFuZCBkZWZhdWx0IGFjdGlvbiBmcm9tIGJyb3dzZXIgZm9yICdkcmFnZW50ZXInIGV2ZW50LlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgWyckZXZlbnQnXSlcbiAgb25EcmFnRW50ZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkcm9wLXpvbmUnKTtcbiAgICB9XG4gICAgdGhpcy5fc3RvcEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvICdkcmFnbGVhdmUnIGhvc3QgZXZlbnQgdG8gcmVtb3ZlIGFuaW1hdGlvbiBjbGFzcyAnZHJvcC16b25lJy5cbiAgICogU3RvcHMgZXZlbnQgcHJvcGFnYXRpb24gYW5kIGRlZmF1bHQgYWN0aW9uIGZyb20gYnJvd3NlciBmb3IgJ2RyYWdsZWF2ZScgZXZlbnQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBvbkRyYWdMZWF2ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkcm9wLXpvbmUnKTtcbiAgICB0aGlzLl9zdG9wRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyBpZiB0aGUgdHJhbnNmZXIgaXRlbSB0eXBlcyBhcmUgJ0ZpbGVzJy5cbiAgICovXG4gIHByaXZhdGUgX3R5cGVDaGVjayh0eXBlczogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHwgRE9NU3RyaW5nTGlzdCk6IHN0cmluZyB7XG4gICAgbGV0IGRyb3BFZmZlY3Q6IHN0cmluZyA9ICdub25lJztcbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIGlmICgoKDxhbnk+dHlwZXMpLmNvbnRhaW5zICYmICg8YW55PnR5cGVzKS5jb250YWlucygnRmlsZXMnKSlcbiAgICAgIHx8ICgoPGFueT50eXBlcykuaW5kZXhPZiAmJiAoPGFueT50eXBlcykuaW5kZXhPZignRmlsZXMnKSAhPT0gLTEpKSB7XG4gICAgICAgIGRyb3BFZmZlY3QgPSAnY29weSc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkcm9wRWZmZWN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RvcEV2ZW50KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiJdfQ==