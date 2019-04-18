import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding, Host, Optional } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgModel } from '@angular/forms';
var TdFileSelectDirective = /** @class */ (function () {
    function TdFileSelectDirective(model) {
        this.model = model;
        this._multiple = false;
        /**
         * fileSelect?: function
         * Event emitted when a file or files are selected in host [HTMLInputElement].
         * Emits a [FileList | File] object.
         * Alternative to not use [(ngModel)].
         */
        this.onFileSelect = new EventEmitter();
    }
    Object.defineProperty(TdFileSelectDirective.prototype, "multiple", {
        /**
         * multiple?: boolean
         * Sets whether multiple files can be selected at once in host element, or just a single file.
         * Can also be 'multiple' native attribute.
         */
        set: function (multiple) {
            this._multiple = coerceBooleanProperty(multiple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdFileSelectDirective.prototype, "multipleBinding", {
        /**
         * Binds native 'multiple' attribute if [multiple] property is 'true'.
         */
        get: function () {
            return this._multiple ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Listens to 'change' host event to get [HTMLInputElement] files.
     * Emits the 'onFileSelect' event with a [FileList] or [File] depending if 'multiple' attr exists in host.
     * Uses [(ngModel)] if declared, instead of emitting 'onFileSelect' event.
     */
    TdFileSelectDirective.prototype.onChange = function (event) {
        if (event.target instanceof HTMLInputElement) {
            var fileInputEl = event.target;
            var files = fileInputEl.files;
            if (files.length) {
                var value = this._multiple ? (files.length > 1 ? files : files[0]) : files[0];
                this.model ? this.model.update.emit(value) : this.onFileSelect.emit(value);
            }
        }
    };
    tslib_1.__decorate([
        Input('multiple'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], TdFileSelectDirective.prototype, "multiple", null);
    tslib_1.__decorate([
        Output('fileSelect'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdFileSelectDirective.prototype, "onFileSelect", void 0);
    tslib_1.__decorate([
        HostBinding('attr.multiple'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [])
    ], TdFileSelectDirective.prototype, "multipleBinding", null);
    tslib_1.__decorate([
        HostListener('change', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TdFileSelectDirective.prototype, "onChange", null);
    TdFileSelectDirective = tslib_1.__decorate([
        Directive({
            selector: '[tdFileSelect]',
        }),
        tslib_1.__param(0, Optional()), tslib_1.__param(0, Host()),
        tslib_1.__metadata("design:paramtypes", [NgModel])
    ], TdFileSelectDirective);
    return TdFileSelectDirective;
}());
export { TdFileSelectDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS90ZXJhLWRhdGEvIiwic291cmNlcyI6WyJsaWIvZmlsZS9kaXJlY3RpdmVzL2ZpbGUtc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt6QztJQThCRSwrQkFBd0MsS0FBYztRQUFkLFVBQUssR0FBTCxLQUFLLENBQVM7UUE1QjlDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFZbkM7Ozs7O1dBS0c7UUFDbUIsaUJBQVksR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFXeEcsQ0FBQztJQXJCRCxzQkFBSSwyQ0FBUTtRQU5aOzs7O1dBSUc7YUFFSCxVQUFhLFFBQWlCO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQzs7O09BQUE7SUFjRCxzQkFBSSxrREFBZTtRQUpuQjs7V0FFRzthQUVIO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUtEOzs7O09BSUc7SUFFSCx3Q0FBUSxHQUFSLFVBQVMsS0FBWTtRQUNuQixJQUFJLEtBQUssQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLEVBQUU7WUFDNUMsSUFBSSxXQUFXLEdBQXdDLEtBQUssQ0FBQyxNQUFPLENBQUM7WUFDckUsSUFBSSxLQUFLLEdBQWEsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN4QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLElBQUksS0FBSyxHQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9GLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUU7U0FDRjtJQUNILENBQUM7SUF0Q0Q7UUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDOzs7eURBR2pCO0lBUXFCO1FBQXJCLE1BQU0sQ0FBQyxZQUFZLENBQUM7MENBQWUsWUFBWTsrREFBd0Q7SUFNeEc7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzs7Z0VBRzVCO0lBV0Q7UUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUNuQixLQUFLOzt5REFTcEI7SUFoRFUscUJBQXFCO1FBSGpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQztRQStCYSxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBO2lEQUFnQixPQUFPO09BOUIzQyxxQkFBcUIsQ0FpRGpDO0lBQUQsNEJBQUM7Q0FBQSxBQWpERCxJQWlEQztTQWpEWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyLCBIb3N0QmluZGluZywgSG9zdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBOZ01vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGRGaWxlU2VsZWN0XScsXG59KVxuZXhwb3J0IGNsYXNzIFRkRmlsZVNlbGVjdERpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogbXVsdGlwbGU/OiBib29sZWFuXG4gICAqIFNldHMgd2hldGhlciBtdWx0aXBsZSBmaWxlcyBjYW4gYmUgc2VsZWN0ZWQgYXQgb25jZSBpbiBob3N0IGVsZW1lbnQsIG9yIGp1c3QgYSBzaW5nbGUgZmlsZS5cbiAgICogQ2FuIGFsc28gYmUgJ211bHRpcGxlJyBuYXRpdmUgYXR0cmlidXRlLlxuICAgKi9cbiAgQElucHV0KCdtdWx0aXBsZScpXG4gIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG11bHRpcGxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmaWxlU2VsZWN0PzogZnVuY3Rpb25cbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgZmlsZSBvciBmaWxlcyBhcmUgc2VsZWN0ZWQgaW4gaG9zdCBbSFRNTElucHV0RWxlbWVudF0uXG4gICAqIEVtaXRzIGEgW0ZpbGVMaXN0IHwgRmlsZV0gb2JqZWN0LlxuICAgKiBBbHRlcm5hdGl2ZSB0byBub3QgdXNlIFsobmdNb2RlbCldLlxuICAgKi9cbiAgQE91dHB1dCgnZmlsZVNlbGVjdCcpIG9uRmlsZVNlbGVjdDogRXZlbnRFbWl0dGVyPEZpbGVMaXN0IHwgRmlsZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVMaXN0IHwgRmlsZT4oKTtcblxuICAvKipcbiAgICogQmluZHMgbmF0aXZlICdtdWx0aXBsZScgYXR0cmlidXRlIGlmIFttdWx0aXBsZV0gcHJvcGVydHkgaXMgJ3RydWUnLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLm11bHRpcGxlJylcbiAgZ2V0IG11bHRpcGxlQmluZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZSA/ICcnIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIG1vZGVsOiBOZ01vZGVsKSB7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byAnY2hhbmdlJyBob3N0IGV2ZW50IHRvIGdldCBbSFRNTElucHV0RWxlbWVudF0gZmlsZXMuXG4gICAqIEVtaXRzIHRoZSAnb25GaWxlU2VsZWN0JyBldmVudCB3aXRoIGEgW0ZpbGVMaXN0XSBvciBbRmlsZV0gZGVwZW5kaW5nIGlmICdtdWx0aXBsZScgYXR0ciBleGlzdHMgaW4gaG9zdC5cbiAgICogVXNlcyBbKG5nTW9kZWwpXSBpZiBkZWNsYXJlZCwgaW5zdGVhZCBvZiBlbWl0dGluZyAnb25GaWxlU2VsZWN0JyBldmVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uQ2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICBsZXQgZmlsZUlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcbiAgICAgIGxldCBmaWxlczogRmlsZUxpc3QgPSBmaWxlSW5wdXRFbC5maWxlcztcbiAgICAgIGlmIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBGaWxlTGlzdCB8IEZpbGUgPSB0aGlzLl9tdWx0aXBsZSA/IChmaWxlcy5sZW5ndGggPiAxID8gZmlsZXMgOiBmaWxlc1swXSkgOiBmaWxlc1swXTtcbiAgICAgICAgdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwudXBkYXRlLmVtaXQodmFsdWUpIDogdGhpcy5vbkZpbGVTZWxlY3QuZW1pdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=