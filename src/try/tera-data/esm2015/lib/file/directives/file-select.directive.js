import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding, Host, Optional } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgModel } from '@angular/forms';
let TdFileSelectDirective = class TdFileSelectDirective {
    constructor(model) {
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
    /**
     * multiple?: boolean
     * Sets whether multiple files can be selected at once in host element, or just a single file.
     * Can also be 'multiple' native attribute.
     */
    set multiple(multiple) {
        this._multiple = coerceBooleanProperty(multiple);
    }
    /**
     * Binds native 'multiple' attribute if [multiple] property is 'true'.
     */
    get multipleBinding() {
        return this._multiple ? '' : undefined;
    }
    /**
     * Listens to 'change' host event to get [HTMLInputElement] files.
     * Emits the 'onFileSelect' event with a [FileList] or [File] depending if 'multiple' attr exists in host.
     * Uses [(ngModel)] if declared, instead of emitting 'onFileSelect' event.
     */
    onChange(event) {
        if (event.target instanceof HTMLInputElement) {
            let fileInputEl = event.target;
            let files = fileInputEl.files;
            if (files.length) {
                let value = this._multiple ? (files.length > 1 ? files : files[0]) : files[0];
                this.model ? this.model.update.emit(value) : this.onFileSelect.emit(value);
            }
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
export { TdFileSelectDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS90ZXJhLWRhdGEvIiwic291cmNlcyI6WyJsaWIvZmlsZS9kaXJlY3RpdmVzL2ZpbGUtc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt6QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQThCaEMsWUFBd0MsS0FBYztRQUFkLFVBQUssR0FBTCxLQUFLLENBQVM7UUE1QjlDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFZbkM7Ozs7O1dBS0c7UUFDbUIsaUJBQVksR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFXeEcsQ0FBQztJQTNCRDs7OztPQUlHO0lBRUgsSUFBSSxRQUFRLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBVUQ7O09BRUc7SUFFSCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0lBS0Q7Ozs7T0FJRztJQUVILFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksS0FBSyxDQUFDLE1BQU0sWUFBWSxnQkFBZ0IsRUFBRTtZQUM1QyxJQUFJLFdBQVcsR0FBd0MsS0FBSyxDQUFDLE1BQU8sQ0FBQztZQUNyRSxJQUFJLEtBQUssR0FBYSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3hDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsSUFBSSxLQUFLLEdBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1RTtTQUNGO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2Q0M7SUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDOzs7cURBR2pCO0FBUXFCO0lBQXJCLE1BQU0sQ0FBQyxZQUFZLENBQUM7c0NBQWUsWUFBWTsyREFBd0Q7QUFNeEc7SUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzs7NERBRzVCO0FBV0Q7SUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNuQixLQUFLOztxREFTcEI7QUFoRFUscUJBQXFCO0lBSGpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQztJQStCYSxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBOzZDQUFnQixPQUFPO0dBOUIzQyxxQkFBcUIsQ0FpRGpDO1NBakRZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIb3N0TGlzdGVuZXIsIEhvc3RCaW5kaW5nLCBIb3N0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0ZEZpbGVTZWxlY3RdJyxcbn0pXG5leHBvcnQgY2xhc3MgVGRGaWxlU2VsZWN0RGlyZWN0aXZlIHtcblxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBtdWx0aXBsZT86IGJvb2xlYW5cbiAgICogU2V0cyB3aGV0aGVyIG11bHRpcGxlIGZpbGVzIGNhbiBiZSBzZWxlY3RlZCBhdCBvbmNlIGluIGhvc3QgZWxlbWVudCwgb3IganVzdCBhIHNpbmdsZSBmaWxlLlxuICAgKiBDYW4gYWxzbyBiZSAnbXVsdGlwbGUnIG5hdGl2ZSBhdHRyaWJ1dGUuXG4gICAqL1xuICBASW5wdXQoJ211bHRpcGxlJylcbiAgc2V0IG11bHRpcGxlKG11bHRpcGxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobXVsdGlwbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGZpbGVTZWxlY3Q/OiBmdW5jdGlvblxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBmaWxlIG9yIGZpbGVzIGFyZSBzZWxlY3RlZCBpbiBob3N0IFtIVE1MSW5wdXRFbGVtZW50XS5cbiAgICogRW1pdHMgYSBbRmlsZUxpc3QgfCBGaWxlXSBvYmplY3QuXG4gICAqIEFsdGVybmF0aXZlIHRvIG5vdCB1c2UgWyhuZ01vZGVsKV0uXG4gICAqL1xuICBAT3V0cHV0KCdmaWxlU2VsZWN0Jykgb25GaWxlU2VsZWN0OiBFdmVudEVtaXR0ZXI8RmlsZUxpc3QgfCBGaWxlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUxpc3QgfCBGaWxlPigpO1xuXG4gIC8qKlxuICAgKiBCaW5kcyBuYXRpdmUgJ211bHRpcGxlJyBhdHRyaWJ1dGUgaWYgW211bHRpcGxlXSBwcm9wZXJ0eSBpcyAndHJ1ZScuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIubXVsdGlwbGUnKVxuICBnZXQgbXVsdGlwbGVCaW5kaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlID8gJycgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgbW9kZWw6IE5nTW9kZWwpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvICdjaGFuZ2UnIGhvc3QgZXZlbnQgdG8gZ2V0IFtIVE1MSW5wdXRFbGVtZW50XSBmaWxlcy5cbiAgICogRW1pdHMgdGhlICdvbkZpbGVTZWxlY3QnIGV2ZW50IHdpdGggYSBbRmlsZUxpc3RdIG9yIFtGaWxlXSBkZXBlbmRpbmcgaWYgJ211bHRpcGxlJyBhdHRyIGV4aXN0cyBpbiBob3N0LlxuICAgKiBVc2VzIFsobmdNb2RlbCldIGlmIGRlY2xhcmVkLCBpbnN0ZWFkIG9mIGVtaXR0aW5nICdvbkZpbGVTZWxlY3QnIGV2ZW50LlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25DaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgIGxldCBmaWxlSW5wdXRFbDogSFRNTElucHV0RWxlbWVudCA9ICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpO1xuICAgICAgbGV0IGZpbGVzOiBGaWxlTGlzdCA9IGZpbGVJbnB1dEVsLmZpbGVzO1xuICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICBsZXQgdmFsdWU6IEZpbGVMaXN0IHwgRmlsZSA9IHRoaXMuX211bHRpcGxlID8gKGZpbGVzLmxlbmd0aCA+IDEgPyBmaWxlcyA6IGZpbGVzWzBdKSA6IGZpbGVzWzBdO1xuICAgICAgICB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC51cGRhdGUuZW1pdCh2YWx1ZSkgOiB0aGlzLm9uRmlsZVNlbGVjdC5lbWl0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==