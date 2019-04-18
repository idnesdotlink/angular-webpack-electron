import * as tslib_1 from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter, Optional, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dir } from '@angular/cdk/bidi';
import { MatInput } from '@angular/material/input';
import { debounceTime, skip } from 'rxjs/operators';
import { mixinControlValueAccessor } from '../../common';
var TdSearchInputBase = /** @class */ (function () {
    // tslint:disable-next-line: variable-name
    function TdSearchInputBase(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
    return TdSearchInputBase;
}());
export { TdSearchInputBase };
/* tslint:disable-next-line */
export var _TdSearchInputMixinBase = mixinControlValueAccessor(TdSearchInputBase);
var TdSearchInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TdSearchInputComponent, _super);
    function TdSearchInputComponent(
    // tslint:disable-next-line: variable-name
    _dir, 
    // tslint:disable-next-line: variable-name
    _changeDetectorRef) {
        var _this = _super.call(this, _changeDetectorRef) || this;
        _this._dir = _dir;
        /**
         * showUnderline?: boolean
         * Sets if the input underline should be visible. Defaults to 'false'.
         */
        _this.showUnderline = false;
        /**
         * debounce?: number
         * Debounce timeout between keypresses. Defaults to 400.
         */
        _this.debounce = 400;
        /**
         * clearIcon?: string
         * The icon used to clear the search input.
         * Defaults to 'cancel' icon.
         */
        _this.clearIcon = 'cancel';
        /**
         * searchDebounce: function($event)
         * Event emitted after the [debounce] timeout.
         */
        // tslint:disable-next-line
        _this.onSearchDebounce = new EventEmitter();
        /**
         * search: function($event)
         * Event emitted after the key enter has been pressed.
         */
        // tslint:disable-next-line
        _this.onSearch = new EventEmitter();
        /**
         * clear: function()
         * Event emitted after the clear icon has been clicked.
         */
        // tslint:disable-next-line
        _this.onClear = new EventEmitter();
        /**
         * blur: function()
         * Event emitted after the blur event has been called in underlying input.
         */
        // tslint:disable-next-line
        _this.onBlur = new EventEmitter();
        return _this;
    }
    TdSearchInputComponent_1 = TdSearchInputComponent;
    Object.defineProperty(TdSearchInputComponent.prototype, "isRTL", {
        get: function () {
            if (this._dir) {
                return this._dir.dir === 'rtl';
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    TdSearchInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._input.ngControl.valueChanges.pipe(debounceTime(this.debounce), skip(1)).subscribe(function (value) {
            _this._searchTermChanged(value);
        });
    };
    /**
     * Method to focus to underlying input.
     */
    TdSearchInputComponent.prototype.focus = function () {
        this._input.focus();
    };
    TdSearchInputComponent.prototype.handleBlur = function () {
        this.onBlur.emit(undefined);
    };
    TdSearchInputComponent.prototype.stopPropagation = function (event) {
        event.stopPropagation();
    };
    TdSearchInputComponent.prototype.handleSearch = function (event) {
        this.stopPropagation(event);
        this.onSearch.emit(this.value);
    };
    /**
     * Method to clear the underlying input.
     */
    TdSearchInputComponent.prototype.clearSearch = function () {
        this.value = '';
        this._changeDetectorRef.markForCheck();
        this.onClear.emit(undefined);
    };
    TdSearchInputComponent.prototype._searchTermChanged = function (value) {
        this.onSearchDebounce.emit(value);
    };
    var TdSearchInputComponent_1;
    tslib_1.__decorate([
        ViewChild(MatInput),
        tslib_1.__metadata("design:type", MatInput)
    ], TdSearchInputComponent.prototype, "_input", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchInputComponent.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchInputComponent.prototype, "showUnderline", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchInputComponent.prototype, "debounce", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TdSearchInputComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchInputComponent.prototype, "clearIcon", void 0);
    tslib_1.__decorate([
        Output('searchDebounce'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchInputComponent.prototype, "onSearchDebounce", void 0);
    tslib_1.__decorate([
        Output('search'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchInputComponent.prototype, "onSearch", void 0);
    tslib_1.__decorate([
        Output('clear'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchInputComponent.prototype, "onClear", void 0);
    tslib_1.__decorate([
        Output('blur'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchInputComponent.prototype, "onBlur", void 0);
    TdSearchInputComponent = TdSearchInputComponent_1 = tslib_1.__decorate([
        Component({
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return TdSearchInputComponent_1; }),
                    multi: true,
                }],
            selector: 'td-search-input',
            template: "<div class=\"td-search-input\">\n  <mat-form-field class=\"td-search-input-field\"\n                  [class.mat-hide-underline]=\"!showUnderline\"\n                  floatLabel=\"never\">\n    <input matInput\n            #searchElement\n            type=\"search\"\n            [(ngModel)]=\"value\"\n            [placeholder]=\"placeholder\"\n            (blur)=\"handleBlur()\"\n            (search)=\"stopPropagation($event)\"\n            (keyup.enter)=\"handleSearch($event)\"/>\n  </mat-form-field>\n  <button mat-icon-button\n          class=\"td-search-input-clear\"\n          type=\"button\"\n          [@searchState]=\"(searchElement.value ?  'show' : (isRTL ? 'hide-left' : 'hide-right'))\"\n          (click)=\"clearSearch()\">\n    <mat-icon>{{clearIcon}}</mat-icon>\n  </button>\n</div>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('searchState', [
                    state('hide-left', style({
                        transform: 'translateX(-150%)',
                        display: 'none',
                    })),
                    state('hide-right', style({
                        transform: 'translateX(150%)',
                        display: 'none',
                    })),
                    state('show', style({
                        transform: 'translateX(0%)',
                        display: 'block',
                    })),
                    transition('* => show', animate('200ms ease-in')),
                    transition('show => *', animate('200ms ease-out')),
                ]),
            ],
            styles: [":host .td-search-input{overflow-x:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;-ms-flex-line-pack:center;align-content:center;max-width:100%;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}:host .td-search-input .td-search-input-field{-webkit-box-flex:1;-ms-flex:1;flex:1}:host .td-search-input ::ng-deep mat-form-field .mat-input-element{caret-color:currentColor}:host .td-search-input ::ng-deep mat-form-field.mat-hide-underline .mat-form-field-underline{display:none}:host .td-search-input .td-search-input-clear{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}"]
        }),
        tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [Dir,
            ChangeDetectorRef])
    ], TdSearchInputComponent);
    return TdSearchInputComponent;
}(_TdSearchInputMixinBase));
export { TdSearchInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUNuRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEQsT0FBTyxFQUF5Qix5QkFBeUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRjtJQUNFLDBDQUEwQztJQUMxQywyQkFBbUIsa0JBQXFDO1FBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7SUFBSSxDQUFDO0lBQy9ELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQsOEJBQThCO0FBQzlCLE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUM7QUErQnBGO0lBQTRDLGtEQUF1QjtJQW1FakU7SUFDRSwwQ0FBMEM7SUFDdEIsSUFBUztJQUM3QiwwQ0FBMEM7SUFDMUMsa0JBQXFDO1FBSnZDLFlBS0Usa0JBQU0sa0JBQWtCLENBQUMs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ZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPcHRpb25hbCxcbiAgICAgICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEaXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBNYXRJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJQ29udHJvbFZhbHVlQWNjZXNzb3IsIG1peGluQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICcuLi8uLi9jb21tb24nO1xuXG5leHBvcnQgY2xhc3MgVGRTZWFyY2hJbnB1dEJhc2Uge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgY29uc3RydWN0b3IocHVibGljIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbmV4cG9ydCBjb25zdCBfVGRTZWFyY2hJbnB1dE1peGluQmFzZSA9IG1peGluQ29udHJvbFZhbHVlQWNjZXNzb3IoVGRTZWFyY2hJbnB1dEJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRkU2VhcmNoSW5wdXRDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlLFxuICB9XSxcbiAgc2VsZWN0b3I6ICd0ZC1zZWFyY2gtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWlucHV0LmNvbXBvbmVudC5zY3NzJyBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3NlYXJjaFN0YXRlJywgW1xuICAgICAgc3RhdGUoJ2hpZGUtbGVmdCcsIHN0eWxlKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTUwJSknLFxuICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB9KSksXG4gICAgICBzdGF0ZSgnaGlkZS1yaWdodCcsIHN0eWxlKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxNTAlKScsXG4gICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIH0pKSxcbiAgICAgIHN0YXRlKCdzaG93JywgIHN0eWxlKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknLFxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiBzaG93JywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICAgIHRyYW5zaXRpb24oJ3Nob3cgPT4gKicsIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0JykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUZFNlYXJjaElucHV0Q29tcG9uZW50IGV4dGVuZHMgX1RkU2VhcmNoSW5wdXRNaXhpbkJhc2UgaW1wbGVtZW50cyBJQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIEBWaWV3Q2hpbGQoTWF0SW5wdXQpIF9pbnB1dDogTWF0SW5wdXQ7XG5cbiAgQElucHV0KCkgdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogc2hvd1VuZGVybGluZT86IGJvb2xlYW5cbiAgICogU2V0cyBpZiB0aGUgaW5wdXQgdW5kZXJsaW5lIHNob3VsZCBiZSB2aXNpYmxlLiBEZWZhdWx0cyB0byAnZmFsc2UnLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd1VuZGVybGluZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBkZWJvdW5jZT86IG51bWJlclxuICAgKiBEZWJvdW5jZSB0aW1lb3V0IGJldHdlZW4ga2V5cHJlc3Nlcy4gRGVmYXVsdHMgdG8gNDAwLlxuICAgKi9cbiAgQElucHV0KCkgZGVib3VuY2UgPSA0MDA7XG5cbiAgLyoqXG4gICAqIHBsYWNlaG9sZGVyPzogc3RyaW5nXG4gICAqIFBsYWNlaG9sZGVyIGZvciB0aGUgdW5kZXJseWluZyBpbnB1dCBjb21wb25lbnQuXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjbGVhckljb24/OiBzdHJpbmdcbiAgICogVGhlIGljb24gdXNlZCB0byBjbGVhciB0aGUgc2VhcmNoIGlucHV0LlxuICAgKiBEZWZhdWx0cyB0byAnY2FuY2VsJyBpY29uLlxuICAgKi9cbiAgQElucHV0KCkgY2xlYXJJY29uID0gJ2NhbmNlbCc7XG5cbiAgLyoqXG4gICAqIHNlYXJjaERlYm91bmNlOiBmdW5jdGlvbigkZXZlbnQpXG4gICAqIEV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIFtkZWJvdW5jZV0gdGltZW91dC5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBAT3V0cHV0KCdzZWFyY2hEZWJvdW5jZScpIG9uU2VhcmNoRGVib3VuY2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIHNlYXJjaDogZnVuY3Rpb24oJGV2ZW50KVxuICAgKiBFdmVudCBlbWl0dGVkIGFmdGVyIHRoZSBrZXkgZW50ZXIgaGFzIGJlZW4gcHJlc3NlZC5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBAT3V0cHV0KCdzZWFyY2gnKSBvblNlYXJjaDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKipcbiAgICogY2xlYXI6IGZ1bmN0aW9uKClcbiAgICogRXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgY2xlYXIgaWNvbiBoYXMgYmVlbiBjbGlja2VkLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIEBPdXRwdXQoJ2NsZWFyJykgb25DbGVhcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBibHVyOiBmdW5jdGlvbigpXG4gICAqIEV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGJsdXIgZXZlbnQgaGFzIGJlZW4gY2FsbGVkIGluIHVuZGVybHlpbmcgaW5wdXQuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgQE91dHB1dCgnYmx1cicpIG9uQmx1cjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGdldCBpc1JUTCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZGlyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGlyLmRpciA9PT0gJ3J0bCc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihfY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXQubmdDb250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2UpLFxuICAgICAgc2tpcCgxKSwgLy8gc2tpcCBmaXJzdCBjaGFuZ2Ugd2hlbiB2YWx1ZSBpcyBzZXQgdG8gdW5kZWZpbmVkXG4gICAgKS5zdWJzY3JpYmUoKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuX3NlYXJjaFRlcm1DaGFuZ2VkKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZm9jdXMgdG8gdW5kZXJseWluZyBpbnB1dC5cbiAgICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCk6IHZvaWQge1xuICAgIHRoaXMub25CbHVyLmVtaXQodW5kZWZpbmVkKTtcbiAgfVxuXG4gIHN0b3BQcm9wYWdhdGlvbihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGhhbmRsZVNlYXJjaChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbihldmVudCk7XG4gICAgdGhpcy5vblNlYXJjaC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjbGVhciB0aGUgdW5kZXJseWluZyBpbnB1dC5cbiAgICovXG4gIGNsZWFyU2VhcmNoKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLm9uQ2xlYXIuZW1pdCh1bmRlZmluZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VhcmNoVGVybUNoYW5nZWQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMub25TZWFyY2hEZWJvdW5jZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG59XG4iXX0=