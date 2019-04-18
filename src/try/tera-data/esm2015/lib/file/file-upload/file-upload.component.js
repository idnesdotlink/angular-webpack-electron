import * as tslib_1 from "tslib";
var TdFileUploadComponent_1;
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ContentChild, ChangeDetectorRef, forwardRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinDisabled, mixinControlValueAccessor } from '../../common';
import { TdFileInputComponent, TdFileInputLabelDirective } from '../file-input/file-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class TdFileUploadBase {
    constructor(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
}
/* tslint:disable-next-line */
export const _TdFileUploadMixinBase = mixinControlValueAccessor(mixinDisabled(TdFileUploadBase));
let TdFileUploadComponent = TdFileUploadComponent_1 = class TdFileUploadComponent extends _TdFileUploadMixinBase {
    constructor(_changeDetectorRef) {
        super(_changeDetectorRef);
        this._multiple = false;
        this._required = false;
        /**
         * defaultColor?: string
         * Sets browse button color. Uses same color palette accepted as [MatButton] and defaults to 'primary'.
         */
        this.defaultColor = 'primary';
        /**
         * activeColor?: string
         * Sets upload button color. Uses same color palette accepted as [MatButton] and defaults to 'accent'.
         */
        this.activeColor = 'accent';
        /**
         * cancelColor?: string
         * Sets cancel button color. Uses same color palette accepted as [MatButton] and defaults to 'warn'.
         */
        this.cancelColor = 'warn';
        /**
         * select?: function
         * Event emitted when a file is selected.
         * Emits a [File | FileList] object.
         */
        this.onSelect = new EventEmitter();
        /**
         * upload?: function
         * Event emitted when upload button is clicked.
         * Emits a [File | FileList] object.
         */
        this.onUpload = new EventEmitter();
        /**
         * cancel?: function
         * Event emitted when cancel button is clicked.
         */
        this.onCancel = new EventEmitter();
    }
    /**
     * multiple?: boolean
     * Sets if multiple files can be dropped/selected at once in [TdFileUploadComponent].
     */
    set multiple(multiple) {
        this._multiple = coerceBooleanProperty(multiple);
    }
    get multiple() {
        return this._multiple;
    }
    /**
     * required?: boolean
     * Forces at least one file upload.
     * Defaults to 'false'
     */
    set required(required) {
        this._required = coerceBooleanProperty(required);
    }
    get required() {
        return this._required;
    }
    /**
     * Method executed when upload button is clicked.
     */
    uploadPressed() {
        if (this.value) {
            this.onUpload.emit(this.value);
        }
    }
    /**
     * Method executed when a file is selected.
     */
    handleSelect(value) {
        this.value = value;
        this.onSelect.emit(value);
    }
    /**
     * Methods executed when cancel button is clicked.
     * Clears files.
     */
    cancel() {
        this.value = undefined;
        this.onCancel.emit(undefined);
        // check if the file input is rendered before clearing it
        if (this.fileInput) {
            this.fileInput.clear();
        }
    }
    /** Method executed when the disabled value changes */
    onDisabledChange(v) {
        if (v) {
            this.cancel();
        }
    }
};
tslib_1.__decorate([
    ViewChild(TdFileInputComponent),
    tslib_1.__metadata("design:type", TdFileInputComponent)
], TdFileUploadComponent.prototype, "fileInput", void 0);
tslib_1.__decorate([
    ContentChild(TdFileInputLabelDirective),
    tslib_1.__metadata("design:type", TdFileInputLabelDirective)
], TdFileUploadComponent.prototype, "inputLabel", void 0);
tslib_1.__decorate([
    Input('defaultColor'),
    tslib_1.__metadata("design:type", String)
], TdFileUploadComponent.prototype, "defaultColor", void 0);
tslib_1.__decorate([
    Input('activeColor'),
    tslib_1.__metadata("design:type", String)
], TdFileUploadComponent.prototype, "activeColor", void 0);
tslib_1.__decorate([
    Input('cancelColor'),
    tslib_1.__metadata("design:type", String)
], TdFileUploadComponent.prototype, "cancelColor", void 0);
tslib_1.__decorate([
    Input('multiple'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], TdFileUploadComponent.prototype, "multiple", null);
tslib_1.__decorate([
    Input('required'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], TdFileUploadComponent.prototype, "required", null);
tslib_1.__decorate([
    Input('accept'),
    tslib_1.__metadata("design:type", String)
], TdFileUploadComponent.prototype, "accept", void 0);
tslib_1.__decorate([
    Output('select'),
    tslib_1.__metadata("design:type", EventEmitter)
], TdFileUploadComponent.prototype, "onSelect", void 0);
tslib_1.__decorate([
    Output('upload'),
    tslib_1.__metadata("design:type", EventEmitter)
], TdFileUploadComponent.prototype, "onUpload", void 0);
tslib_1.__decorate([
    Output('cancel'),
    tslib_1.__metadata("design:type", EventEmitter)
], TdFileUploadComponent.prototype, "onCancel", void 0);
TdFileUploadComponent = TdFileUploadComponent_1 = tslib_1.__decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => TdFileUploadComponent_1),
                multi: true,
            }],
        selector: 'td-file-upload',
        inputs: ['disabled', 'value'],
        template: "<td-file-input *ngIf=\"!value\"\n               [(ngModel)]=\"value\"\n               [multiple]=\"multiple\"\n               [disabled]=\"disabled\"\n               [accept]=\"accept\"\n               [color]=\"defaultColor\"\n               (select)=\"handleSelect($event)\">\n  <ng-template [cdkPortalOutlet]=\"inputLabel\" [ngIf]=\"true\"></ng-template>\n</td-file-input>\n<div *ngIf=\"value\">\n  <button #fileUpload\n          class=\"td-file-upload\"\n          mat-raised-button\n          type=\"button\"\n          [color]=\"activeColor\"\n          (keyup.delete)=\"cancel()\"\n          (keyup.backspace)=\"cancel()\"\n          (keyup.escape)=\"cancel()\"\n          (click)=\"uploadPressed()\"> \n    <ng-content></ng-content>\n  </button>\n  <button mat-icon-button\n          type=\"button\"\n          class=\"td-file-upload-cancel\"\n          [color]=\"cancelColor\"            \n          (click)=\"cancel()\">\n    <mat-icon>cancel</mat-icon>\n  </button>\n</div>",
        styles: [".td-file-upload{padding-left:8px;padding-right:8px}.td-file-upload-cancel{height:24px;width:24px;position:relative;top:24px;left:-12px}::ng-deep [dir=rtl] .td-file-upload-cancel{right:-12px;left:0}.td-file-upload-cancel mat-icon{border-radius:12px;vertical-align:baseline}.drop-zone{border-radius:3px}.drop-zone *{pointer-events:none}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
], TdFileUploadComponent);
export { TdFileUploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS90ZXJhLWRhdGEvIiwic291cmNlcyI6WyJsaWIvZmlsZS9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQ2xILFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQWUsYUFBYSxFQUF5Qix5QkFBeUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFtQixrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtJQUFHLENBQUM7Q0FDN0Q7QUFFRCw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcseUJBQXlCLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQWNqRyxJQUFhLHFCQUFxQiw2QkFBbEMsTUFBYSxxQkFBc0IsU0FBUSxzQkFBc0I7SUErRS9ELFlBQVksa0JBQXFDO1FBQy9DLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBOUVwQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFNbkM7OztXQUdHO1FBQ29CLGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBRXhEOzs7V0FHRztRQUNtQixnQkFBVyxHQUFXLFFB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QUFRLEVBQUUsZ0JBQWdCO1FBQzFCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7UUFFN0IsbytCQUEyQzs7S0FDNUMsQ0FBQzs2Q0FnRmdDLGlCQUFpQjtHQS9FdEMscUJBQXFCLENBdUhqQztTQXZIWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdDaGlsZCwgQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IElDYW5EaXNhYmxlLCBtaXhpbkRpc2FibGVkLCBJQ29udHJvbFZhbHVlQWNjZXNzb3IsIG1peGluQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICcuLi8uLi9jb21tb24nO1xuaW1wb3J0IHsgVGRGaWxlSW5wdXRDb21wb25lbnQsIFRkRmlsZUlucHV0TGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuLi9maWxlLWlucHV0L2ZpbGUtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNsYXNzIFRkRmlsZVVwbG9hZEJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbn1cblxuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG5leHBvcnQgY29uc3QgX1RkRmlsZVVwbG9hZE1peGluQmFzZSA9IG1peGluQ29udHJvbFZhbHVlQWNjZXNzb3IobWl4aW5EaXNhYmxlZChUZEZpbGVVcGxvYWRCYXNlKSk7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRkRmlsZVVwbG9hZENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dLFxuICBzZWxlY3RvcjogJ3RkLWZpbGUtdXBsb2FkJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3ZhbHVlJ10sXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFRkRmlsZVVwbG9hZENvbXBvbmVudCBleHRlbmRzIF9UZEZpbGVVcGxvYWRNaXhpbkJhc2UgaW1wbGVtZW50cyBJQ29udHJvbFZhbHVlQWNjZXNzb3IsIElDYW5EaXNhYmxlIHtcblxuICBwcml2YXRlIF9tdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoVGRGaWxlSW5wdXRDb21wb25lbnQpIGZpbGVJbnB1dDogVGRGaWxlSW5wdXRDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChUZEZpbGVJbnB1dExhYmVsRGlyZWN0aXZlKSBpbnB1dExhYmVsOiBUZEZpbGVJbnB1dExhYmVsRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBkZWZhdWx0Q29sb3I/OiBzdHJpbmdcbiAgICogU2V0cyBicm93c2UgYnV0dG9uIGNvbG9yLiBVc2VzIHNhbWUgY29sb3IgcGFsZXR0ZSBhY2NlcHRlZCBhcyBbTWF0QnV0dG9uXSBhbmQgZGVmYXVsdHMgdG8gJ3ByaW1hcnknLlxuICAgKi9cbiAgQElucHV0KCdkZWZhdWx0Q29sb3InKSBkZWZhdWx0Q29sb3I6IHN0cmluZyA9ICdwcmltYXJ5JztcblxuICAvKipcbiAgICogYWN0aXZlQ29sb3I/OiBzdHJpbmdcbiAgICogU2V0cyB1cGxvYWQgYnV0dG9uIGNvbG9yLiBVc2VzIHNhbWUgY29sb3IgcGFsZXR0ZSBhY2NlcHRlZCBhcyBbTWF0QnV0dG9uXSBhbmQgZGVmYXVsdHMgdG8gJ2FjY2VudCcuXG4gICAqL1xuICBASW5wdXQoJ2FjdGl2ZUNvbG9yJykgYWN0aXZlQ29sb3I6IHN0cmluZyA9ICdhY2NlbnQnO1xuXG4gIC8qKlxuICAgKiBjYW5jZWxDb2xvcj86IHN0cmluZ1xuICAgKiBTZXRzIGNhbmNlbCBidXR0b24gY29sb3IuIFVzZXMgc2FtZSBjb2xvciBwYWxldHRlIGFjY2VwdGVkIGFzIFtNYXRCdXR0b25dIGFuZCBkZWZhdWx0cyB0byAnd2FybicuXG4gICAqL1xuICBASW5wdXQoJ2NhbmNlbENvbG9yJykgY2FuY2VsQ29sb3I6IHN0cmluZyA9ICd3YXJuJztcblxuICAvKipcbiAgICogbXVsdGlwbGU/OiBib29sZWFuXG4gICAqIFNldHMgaWYgbXVsdGlwbGUgZmlsZXMgY2FuIGJlIGRyb3BwZWQvc2VsZWN0ZWQgYXQgb25jZSBpbiBbVGRGaWxlVXBsb2FkQ29tcG9uZW50XS5cbiAgICovXG4gIEBJbnB1dCgnbXVsdGlwbGUnKVxuICBzZXQgbXVsdGlwbGUobXVsdGlwbGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShtdWx0aXBsZSk7XG4gIH1cbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXF1aXJlZD86IGJvb2xlYW5cbiAgICogRm9yY2VzIGF0IGxlYXN0IG9uZSBmaWxlIHVwbG9hZC5cbiAgICogRGVmYXVsdHMgdG8gJ2ZhbHNlJ1xuICAgKi9cbiAgQElucHV0KCdyZXF1aXJlZCcpXG4gIHNldCByZXF1aXJlZChyZXF1aXJlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlcXVpcmVkKTtcbiAgfVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIGFjY2VwdD86IHN0cmluZ1xuICAgKiBTZXRzIGZpbGVzIGFjY2VwdGVkIHdoZW4gb3BlbmluZyB0aGUgZmlsZSBicm93c2VyIGRpYWxvZy5cbiAgICogU2FtZSBhcyAnYWNjZXB0JyBhdHRyaWJ1dGUgaW4gPGlucHV0Lz4gZWxlbWVudC5cbiAgICovXG4gIEBJbnB1dCgnYWNjZXB0JykgYWNjZXB0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHNlbGVjdD86IGZ1bmN0aW9uXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIGZpbGUgaXMgc2VsZWN0ZWQuXG4gICAqIEVtaXRzIGEgW0ZpbGUgfCBGaWxlTGlzdF0gb2JqZWN0LlxuICAgKi9cbiAgQE91dHB1dCgnc2VsZWN0Jykgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxGaWxlIHwgRmlsZUxpc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlIHwgRmlsZUxpc3Q+KCk7XG5cbiAgLyoqXG4gICAqIHVwbG9hZD86IGZ1bmN0aW9uXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB1cGxvYWQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIEVtaXRzIGEgW0ZpbGUgfCBGaWxlTGlzdF0gb2JqZWN0LlxuICAgKi9cbiAgQE91dHB1dCgndXBsb2FkJykgb25VcGxvYWQ6IEV2ZW50RW1pdHRlcjxGaWxlIHwgRmlsZUxpc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlIHwgRmlsZUxpc3Q+KCk7XG5cbiAgLyoqXG4gICAqIGNhbmNlbD86IGZ1bmN0aW9uXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqL1xuICBAT3V0cHV0KCdjYW5jZWwnKSBvbkNhbmNlbDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihfY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHVwbG9hZCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICovXG4gIHVwbG9hZFByZXNzZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMub25VcGxvYWQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIHdoZW4gYSBmaWxlIGlzIHNlbGVjdGVkLlxuICAgKi9cbiAgaGFuZGxlU2VsZWN0KHZhbHVlOiBGaWxlIHwgRmlsZUxpc3QpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2RzIGV4ZWN1dGVkIHdoZW4gY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiBDbGVhcnMgZmlsZXMuXG4gICAqL1xuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uQ2FuY2VsLmVtaXQodW5kZWZpbmVkKTtcbiAgICAvLyBjaGVjayBpZiB0aGUgZmlsZSBpbnB1dCBpcyByZW5kZXJlZCBiZWZvcmUgY2xlYXJpbmcgaXRcbiAgICBpZiAodGhpcy5maWxlSW5wdXQpIHtcbiAgICAgIHRoaXMuZmlsZUlucHV0LmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHRoZSBkaXNhYmxlZCB2YWx1ZSBjaGFuZ2VzICovXG4gIG9uRGlzYWJsZWRDaGFuZ2UodjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxufVxuIl19