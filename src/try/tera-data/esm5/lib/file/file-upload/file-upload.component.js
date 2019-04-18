import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ContentChild, ChangeDetectorRef, forwardRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinDisabled, mixinControlValueAccessor } from '../../common';
import { TdFileInputComponent, TdFileInputLabelDirective } from '../file-input/file-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var TdFileUploadBase = /** @class */ (function () {
    function TdFileUploadBase(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
    return TdFileUploadBase;
}());
export { TdFileUploadBase };
/* tslint:disable-next-line */
export var _TdFileUploadMixinBase = mixinControlValueAccessor(mixinDisabled(TdFileUploadBase));
var TdFileUploadComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TdFileUploadComponent, _super);
    function TdFileUploadComponent(_changeDetectorRef) {
        var _this = _super.call(this, _changeDetectorRef) || this;
        _this._multiple = false;
        _this._required = false;
        /**
         * defaultColor?: string
         * Sets browse button color. Uses same color palette accepted as [MatButton] and defaults to 'primary'.
         */
        _this.defaultColor = 'primary';
        /**
         * activeColor?: string
         * Sets upload button color. Uses same color palette accepted as [MatButton] and defaults to 'accent'.
         */
        _this.activeColor = 'accent';
        /**
         * cancelColor?: string
         * Sets cancel button color. Uses same color palette accepted as [MatButton] and defaults to 'warn'.
         */
        _this.cancelColor = 'warn';
        /**
         * select?: function
         * Event emitted when a file is selected.
         * Emits a [File | FileList] object.
         */
        _this.onSelect = new EventEmitter();
        /**
         * upload?: function
         * Event emitted when upload button is clicked.
         * Emits a [File | FileList] object.
         */
        _this.onUpload = new EventEmitter();
        /**
         * cancel?: function
         * Event emitted when cancel button is clicked.
         */
        _this.onCancel = new EventEmitter();
        return _this;
    }
    TdFileUploadComponent_1 = TdFileUploadComponent;
    Object.defineProperty(TdFileUploadComponent.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        /**
         * multiple?: boolean
         * Sets if multiple files can be dropped/selected at once in [TdFileUploadComponent].
         */
        set: function (multiple) {
            this._multiple = coerceBooleanProperty(multiple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TdFileUploadComponent.prototype, "required", {
        get: function () {
            return this._required;
        },
        /**
         * required?: boolean
         * Forces at least one file upload.
         * Defaults to 'false'
         */
        set: function (required) {
            this._required = coerceBooleanProperty(required);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method executed when upload button is clicked.
     */
    TdFileUploadComponent.prototype.uploadPressed = function () {
        if (this.value) {
            this.onUpload.emit(this.value);
        }
    };
    /**
     * Method executed when a file is selected.
     */
    TdFileUploadComponent.prototype.handleSelect = function (value) {
        this.value = value;
        this.onSelect.emit(value);
    };
    /**
     * Methods executed when cancel button is clicked.
     * Clears files.
     */
    TdFileUploadComponent.prototype.cancel = function () {
        this.value = undefined;
        this.onCancel.emit(undefined);
        // check if the file input is rendered before clearing it
        if (this.fileInput) {
            this.fileInput.clear();
        }
    };
    /** Method executed when the disabled value changes */
    TdFileUploadComponent.prototype.onDisabledChange = function (v) {
        if (v) {
            this.cancel();
        }
    };
    var TdFileUploadComponent_1;
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
                    useExisting: forwardRef(function () { return TdFileUploadComponent_1; }),
                    multi: true,
                }],
            selector: 'td-file-upload',
            inputs: ['disabled', 'value'],
            template: "<td-file-input *ngIf=\"!value\"\n               [(ngModel)]=\"value\"\n               [multiple]=\"multiple\"\n               [disabled]=\"disabled\"\n               [accept]=\"accept\"\n               [color]=\"defaultColor\"\n               (select)=\"handleSelect($event)\">\n  <ng-template [cdkPortalOutlet]=\"inputLabel\" [ngIf]=\"true\"></ng-template>\n</td-file-input>\n<div *ngIf=\"value\">\n  <button #fileUpload\n          class=\"td-file-upload\"\n          mat-raised-button\n          type=\"button\"\n          [color]=\"activeColor\"\n          (keyup.delete)=\"cancel()\"\n          (keyup.backspace)=\"cancel()\"\n          (keyup.escape)=\"cancel()\"\n          (click)=\"uploadPressed()\"> \n    <ng-content></ng-content>\n  </button>\n  <button mat-icon-button\n          type=\"button\"\n          class=\"td-file-upload-cancel\"\n          [color]=\"cancelColor\"            \n          (click)=\"cancel()\">\n    <mat-icon>cancel</mat-icon>\n  </button>\n</div>",
            styles: [".td-file-upload{padding-left:8px;padding-right:8px}.td-file-upload-cancel{height:24px;width:24px;position:relative;top:24px;left:-12px}::ng-deep [dir=rtl] .td-file-upload-cancel{right:-12px;left:0}.td-file-upload-cancel mat-icon{border-radius:12px;vertical-align:baseline}.drop-zone{border-radius:3px}.drop-zone *{pointer-events:none}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
    ], TdFileUploadComponent);
    return TdFileUploadComponent;
}(_TdFileUploadMixinBase));
export { TdFileUploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS90ZXJhLWRhdGEvIiwic291cmNlcyI6WyJsaWIvZmlsZS9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFDbEgsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBZSxhQUFhLEVBQXlCLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RTtJQUNFLDBCQUFtQixrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtJQUFHLENBQUM7SUFDOUQsdUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRCw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQUcseUJBQXlCLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQWNqRztJQUEyQyxpREFBc0I7SUErRS9ELCtCQUFZLGtCQUFxQztRQUFqRCxZQUNFLGtCQUFNLGtCQUFrQixDQUFDLFNBQzFCO1FBL0VPLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsZUFBUyxHQUFZLEtBQUssQ0FBQztRQU1uQzs7O1dBR0c7UUFDb0Isa0JBQVksR0FBVyxTQUFTLENBQUM7UUFFeEQ7OztXQUdHO1FBQ21CLGlCQUFXLEdBQVcsUUFBUSxDQUFDO1FBRXJEOzs7V0FH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SyxFQUFFLElBQUk7aUJBQ1osQ0FBQztZQUNGLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUU3QixvK0JBQTJDOztTQUM1QyxDQUFDO2lEQWdGZ0MsaUJBQWlCO09BL0V0QyxxQkFBcUIsQ0F1SGpDO0lBQUQsNEJBQUM7Q0FBQSxBQXZIRCxDQUEyQyxzQkFBc0IsR0F1SGhFO1NBdkhZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkLCBDb250ZW50Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmLFxuICBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgSUNhbkRpc2FibGUsIG1peGluRGlzYWJsZWQsIElDb250cm9sVmFsdWVBY2Nlc3NvciwgbWl4aW5Db250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJy4uLy4uL2NvbW1vbic7XG5pbXBvcnQgeyBUZEZpbGVJbnB1dENvbXBvbmVudCwgVGRGaWxlSW5wdXRMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4uL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY2xhc3MgVGRGaWxlVXBsb2FkQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbmV4cG9ydCBjb25zdCBfVGRGaWxlVXBsb2FkTWl4aW5CYXNlID0gbWl4aW5Db250cm9sVmFsdWVBY2Nlc3NvcihtaXhpbkRpc2FibGVkKFRkRmlsZVVwbG9hZEJhc2UpKTtcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGRGaWxlVXBsb2FkQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfV0sXG4gIHNlbGVjdG9yOiAndGQtZmlsZS11cGxvYWQnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndmFsdWUnXSxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS11cGxvYWQuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgVGRGaWxlVXBsb2FkQ29tcG9uZW50IGV4dGVuZHMgX1RkRmlsZVVwbG9hZE1peGluQmFzZSBpbXBsZW1lbnRzIElDb250cm9sVmFsdWVBY2Nlc3NvciwgSUNhbkRpc2FibGUge1xuXG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZChUZEZpbGVJbnB1dENvbXBvbmVudCkgZmlsZUlucHV0OiBUZEZpbGVJbnB1dENvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKFRkRmlsZUlucHV0TGFiZWxEaXJlY3RpdmUpIGlucHV0TGFiZWw6IFRkRmlsZUlucHV0TGFiZWxEaXJlY3RpdmU7XG5cbiAgLyoqXG4gICAqIGRlZmF1bHRDb2xvcj86IHN0cmluZ1xuICAgKiBTZXRzIGJyb3dzZSBidXR0b24gY29sb3IuIFVzZXMgc2FtZSBjb2xvciBwYWxldHRlIGFjY2VwdGVkIGFzIFtNYXRCdXR0b25dIGFuZCBkZWZhdWx0cyB0byAncHJpbWFyeScuXG4gICAqL1xuICBASW5wdXQoJ2RlZmF1bHRDb2xvcicpIGRlZmF1bHRDb2xvcjogc3RyaW5nID0gJ3ByaW1hcnknO1xuXG4gIC8qKlxuICAgKiBhY3RpdmVDb2xvcj86IHN0cmluZ1xuICAgKiBTZXRzIHVwbG9hZCBidXR0b24gY29sb3IuIFVzZXMgc2FtZSBjb2xvciBwYWxldHRlIGFjY2VwdGVkIGFzIFtNYXRCdXR0b25dIGFuZCBkZWZhdWx0cyB0byAnYWNjZW50Jy5cbiAgICovXG4gIEBJbnB1dCgnYWN0aXZlQ29sb3InKSBhY3RpdmVDb2xvcjogc3RyaW5nID0gJ2FjY2VudCc7XG5cbiAgLyoqXG4gICAqIGNhbmNlbENvbG9yPzogc3RyaW5nXG4gICAqIFNldHMgY2FuY2VsIGJ1dHRvbiBjb2xvci4gVXNlcyBzYW1lIGNvbG9yIHBhbGV0dGUgYWNjZXB0ZWQgYXMgW01hdEJ1dHRvbl0gYW5kIGRlZmF1bHRzIHRvICd3YXJuJy5cbiAgICovXG4gIEBJbnB1dCgnY2FuY2VsQ29sb3InKSBjYW5jZWxDb2xvcjogc3RyaW5nID0gJ3dhcm4nO1xuXG4gIC8qKlxuICAgKiBtdWx0aXBsZT86IGJvb2xlYW5cbiAgICogU2V0cyBpZiBtdWx0aXBsZSBmaWxlcyBjYW4gYmUgZHJvcHBlZC9zZWxlY3RlZCBhdCBvbmNlIGluIFtUZEZpbGVVcGxvYWRDb21wb25lbnRdLlxuICAgKi9cbiAgQElucHV0KCdtdWx0aXBsZScpXG4gIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG11bHRpcGxlKTtcbiAgfVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlcXVpcmVkPzogYm9vbGVhblxuICAgKiBGb3JjZXMgYXQgbGVhc3Qgb25lIGZpbGUgdXBsb2FkLlxuICAgKiBEZWZhdWx0cyB0byAnZmFsc2UnXG4gICAqL1xuICBASW5wdXQoJ3JlcXVpcmVkJylcbiAgc2V0IHJlcXVpcmVkKHJlcXVpcmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVxdWlyZWQpO1xuICB9XG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cblxuICAvKipcbiAgICogYWNjZXB0Pzogc3RyaW5nXG4gICAqIFNldHMgZmlsZXMgYWNjZXB0ZWQgd2hlbiBvcGVuaW5nIHRoZSBmaWxlIGJyb3dzZXIgZGlhbG9nLlxuICAgKiBTYW1lIGFzICdhY2NlcHQnIGF0dHJpYnV0ZSBpbiA8aW5wdXQvPiBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCdhY2NlcHQnKSBhY2NlcHQ6IHN0cmluZztcblxuICAvKipcbiAgICogc2VsZWN0PzogZnVuY3Rpb25cbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgZmlsZSBpcyBzZWxlY3RlZC5cbiAgICogRW1pdHMgYSBbRmlsZSB8IEZpbGVMaXN0XSBvYmplY3QuXG4gICAqL1xuICBAT3V0cHV0KCdzZWxlY3QnKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEZpbGUgfCBGaWxlTGlzdD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGUgfCBGaWxlTGlzdD4oKTtcblxuICAvKipcbiAgICogdXBsb2FkPzogZnVuY3Rpb25cbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHVwbG9hZCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogRW1pdHMgYSBbRmlsZSB8IEZpbGVMaXN0XSBvYmplY3QuXG4gICAqL1xuICBAT3V0cHV0KCd1cGxvYWQnKSBvblVwbG9hZDogRXZlbnRFbWl0dGVyPEZpbGUgfCBGaWxlTGlzdD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGUgfCBGaWxlTGlzdD4oKTtcblxuICAvKipcbiAgICogY2FuY2VsPzogZnVuY3Rpb25cbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICovXG4gIEBPdXRwdXQoJ2NhbmNlbCcpIG9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKF9jaGFuZ2VEZXRlY3RvclJlZik7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGV4ZWN1dGVkIHdoZW4gdXBsb2FkIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKi9cbiAgdXBsb2FkUHJlc3NlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5vblVwbG9hZC5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgZXhlY3V0ZWQgd2hlbiBhIGZpbGUgaXMgc2VsZWN0ZWQuXG4gICAqL1xuICBoYW5kbGVTZWxlY3QodmFsdWU6IEZpbGUgfCBGaWxlTGlzdCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZHMgZXhlY3V0ZWQgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIENsZWFycyBmaWxlcy5cbiAgICovXG4gIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25DYW5jZWwuZW1pdCh1bmRlZmluZWQpO1xuICAgIC8vIGNoZWNrIGlmIHRoZSBmaWxlIGlucHV0IGlzIHJlbmRlcmVkIGJlZm9yZSBjbGVhcmluZyBpdFxuICAgIGlmICh0aGlzLmZpbGVJbnB1dCkge1xuICAgICAgdGhpcy5maWxlSW5wdXQuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWV0aG9kIGV4ZWN1dGVkIHdoZW4gdGhlIGRpc2FibGVkIHZhbHVlIGNoYW5nZXMgKi9cbiAgb25EaXNhYmxlZENoYW5nZSh2OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgfVxuICB9XG59XG4iXX0=