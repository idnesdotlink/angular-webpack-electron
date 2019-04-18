import * as tslib_1 from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate, AUTO_STYLE } from '@angular/animations';
import { TdSearchInputComponent } from '../search-input/search-input.component';
import { mixinControlValueAccessor } from '../../common';
var TdSearchBoxBase = /** @class */ (function () {
    // tslint:disable-next-line
    function TdSearchBoxBase(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
    return TdSearchBoxBase;
}());
export { TdSearchBoxBase };
/* tslint:disable-next-line */
export var _TdSearchBoxMixinBase = mixinControlValueAccessor(TdSearchBoxBase);
var TdSearchBoxComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TdSearchBoxComponent, _super);
    function TdSearchBoxComponent(
    // tslint:disable-next-line
    _changeDetectorRef) {
        var _this = _super.call(this, _changeDetectorRef) || this;
        // tslint:disable-next-line: variable-name
        _this._searchVisible = false;
        /**
         * backIcon?: string
         * The icon used to close the search toggle, only shown when [alwaysVisible] is false.
         * Defaults to 'search' icon.
         */
        _this.backIcon = 'search';
        /**
         * searchIcon?: string
         * The icon used to open/focus the search toggle.
         * Defaults to 'search' icon.
         */
        _this.searchIcon = 'search';
        /**
         * clearIcon?: string
         * The icon used to clear the search input.
         * Defaults to 'cancel' icon.
         */
        _this.clearIcon = 'cancel';
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
         * alwaysVisible?: boolean
         * Sets if the input should always be visible. Defaults to 'false'.
         */
        _this.alwaysVisible = false;
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
    TdSearchBoxComponent_1 = TdSearchBoxComponent;
    Object.defineProperty(TdSearchBoxComponent.prototype, "searchVisible", {
        get: function () {
            return this._searchVisible;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method executed when the search icon is clicked.
     */
    TdSearchBoxComponent.prototype.searchClicked = function () {
        if (!this.alwaysVisible && this._searchVisible) {
            this.value = '';
            this.handleClear();
        }
        else if (this.alwaysVisible || !this._searchVisible) {
            this._searchInput.focus();
        }
        this.toggleVisibility();
    };
    TdSearchBoxComponent.prototype.toggleVisibility = function () {
        this._searchVisible = !this._searchVisible;
        this._changeDetectorRef.markForCheck();
    };
    TdSearchBoxComponent.prototype.handleSearchDebounce = function (value) {
        this.onSearchDebounce.emit(value);
    };
    TdSearchBoxComponent.prototype.handleSearch = function (value) {
        this.onSearch.emit(value);
    };
    TdSearchBoxComponent.prototype.handleClear = function () {
        this.onClear.emit(undefined);
    };
    TdSearchBoxComponent.prototype.handleBlur = function () {
        this.onBlur.emit(undefined);
    };
    var TdSearchBoxComponent_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "value", void 0);
    tslib_1.__decorate([
        ViewChild(TdSearchInputComponent),
        tslib_1.__metadata("design:type", TdSearchInputComponent)
    ], TdSearchBoxComponent.prototype, "_searchInput", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "backIcon", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "searchIcon", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "clearIcon", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "showUnderline", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "debounce", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TdSearchBoxComponent.prototype, "alwaysVisible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TdSearchBoxComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Output('searchDebounce'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchBoxComponent.prototype, "onSearchDebounce", void 0);
    tslib_1.__decorate([
        Output('search'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchBoxComponent.prototype, "onSearch", void 0);
    tslib_1.__decorate([
        Output('clear'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchBoxComponent.prototype, "onClear", void 0);
    tslib_1.__decorate([
        Output('blur'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TdSearchBoxComponent.prototype, "onBlur", void 0);
    TdSearchBoxComponent = TdSearchBoxComponent_1 = tslib_1.__decorate([
        Component({
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return TdSearchBoxComponent_1; }),
                    multi: true,
                }],
            selector: 'td-search-box',
            template: "<div class=\"td-search-box\">\n  <button mat-icon-button type=\"button\" class=\"td-search-icon\" (click)=\"searchClicked()\">\n    <mat-icon *ngIf=\"searchVisible && !alwaysVisible\">{{backIcon}}</mat-icon>\n    <mat-icon *ngIf=\"!searchVisible || alwaysVisible\">{{searchIcon}}</mat-icon>\n  </button>\n  <td-search-input #searchInput\n                   [@inputState]=\"alwaysVisible || searchVisible\"\n                   [debounce]=\"debounce\"\n                   [(ngModel)]=\"value\"\n                   [showUnderline]=\"showUnderline\"\n                   [placeholder]=\"placeholder\"\n                   [clearIcon]=\"clearIcon\"\n                   (searchDebounce)=\"handleSearchDebounce($event)\"\n                   (search)=\"handleSearch($event)\"\n                   (clear)=\"handleClear(); toggleVisibility()\"\n                   (blur)=\"handleBlur()\">\n  </td-search-input>\n</div>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('inputState', [
                    state('0', style({
                        width: '0%',
                        margin: '0px',
                    })),
                    state('1', style({
                        width: '100%',
                        margin: AUTO_STYLE,
                    })),
                    transition('0 => 1', animate('200ms ease-in')),
                    transition('1 => 0', animate('200ms ease-out')),
                ]),
            ],
            styles: [":host{display:block}.td-search-box{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;-ms-flex-line-pack:center;align-content:center;max-width:100%;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.td-search-box .td-search-icon{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.td-search-box td-search-input{margin-left:12px}::ng-deep [dir=rtl] .td-search-box td-search-input{margin-right:12px;margin-left:0!important}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
    ], TdSearchBoxComponent);
    return TdSearchBoxComponent;
}(_TdSearchBoxMixinBase));
export { TdSearchBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3RlcmEtZGF0YS8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBeUIseUJBQXlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFaEY7SUFDRSwyQkFBMkI7SUFDM0IseUJBQW1CLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO0lBQUksQ0FBQztJQUMvRCxzQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOztBQUVELDhCQUE4QjtBQUM5QixNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQTJCaEY7SUFBMEMsZ0RBQXFCO0lBcUY3RDtJQUNFLDJCQUEyQjtJQUMzQixrQkFBcUM7UUFGdkMsWUFJRSxrQkFBTSxrQkFBa0IsQ0FBQyxTQUMxQjtRQXZGRCwwQ0FBMEM7UUFDbEMsb0JBQWMsR0FBRyxLQUFLLENBQUM7UUFRL0I7Ozs7V0FJRztRQUNNLGNBQVEsR0FBRyxRQUFRLENBQUM7UUFFN0I7Ozs7V0FJRztRQUNNLGdCQUFVLEdBQUcsUUFBUSxDQUFDO1FB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LEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztvQkFDbkQsS0FBSyxFQUFFLElBQUk7aUJBQ1osQ0FBQztZQUNGLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLHM1QkFBMEM7WUFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BCLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO3dCQUNmLEtBQUssRUFBRSxJQUFJO3dCQUNYLE1BQU0sRUFBRSxLQUFLO3FCQUNkLENBQUMsQ0FBQztvQkFDSCxLQUFLLENBQUMsR0FBRyxFQUFHLEtBQUssQ0FBQzt3QkFDaEIsS0FBSyxFQUFFLE1BQU07d0JBQ2IsTUFBTSxFQUFFLFVBQVU7cUJBQ25CLENBQUMsQ0FBQztvQkFDSCxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDOUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDaEQsQ0FBQzthQUNIOztTQUNGLENBQUM7aURBd0ZzQixpQkFBaUI7T0F2RjVCLG9CQUFvQixDQTZIaEM7SUFBRCwyQkFBQztDQUFBLEFBN0hELENBQTBDLHFCQUFxQixHQTZIOUQ7U0E3SFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSwgQVVUT19TVFlMRSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBUZFNlYXJjaElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNvbnRyb2xWYWx1ZUFjY2Vzc29yLCBtaXhpbkNvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcblxuZXhwb3J0IGNsYXNzIFRkU2VhcmNoQm94QmFzZSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG59XG5cbi8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuZXhwb3J0IGNvbnN0IF9UZFNlYXJjaEJveE1peGluQmFzZSA9IG1peGluQ29udHJvbFZhbHVlQWNjZXNzb3IoVGRTZWFyY2hCb3hCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUZFNlYXJjaEJveENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dLFxuICBzZWxlY3RvcjogJ3RkLXNlYXJjaC1ib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1ib3guY29tcG9uZW50LnNjc3MnIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignaW5wdXRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCcwJywgc3R5bGUoe1xuICAgICAgICB3aWR0aDogJzAlJyxcbiAgICAgICAgbWFyZ2luOiAnMHB4JyxcbiAgICAgIH0pKSxcbiAgICAgIHN0YXRlKCcxJywgIHN0eWxlKHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWFyZ2luOiBBVVRPX1NUWUxFLFxuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignMCA9PiAxJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICAgIHRyYW5zaXRpb24oJzEgPT4gMCcsIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0JykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUZFNlYXJjaEJveENvbXBvbmVudCBleHRlbmRzIF9UZFNlYXJjaEJveE1peGluQmFzZSBpbXBsZW1lbnRzIElDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgdmFsdWU6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIHByaXZhdGUgX3NlYXJjaFZpc2libGUgPSBmYWxzZTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIEBWaWV3Q2hpbGQoVGRTZWFyY2hJbnB1dENvbXBvbmVudCkgX3NlYXJjaElucHV0OiBUZFNlYXJjaElucHV0Q29tcG9uZW50O1xuXG4gIGdldCBzZWFyY2hWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hWaXNpYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIGJhY2tJY29uPzogc3RyaW5nXG4gICAqIFRoZSBpY29uIHVzZWQgdG8gY2xvc2UgdGhlIHNlYXJjaCB0b2dnbGUsIG9ubHkgc2hvd24gd2hlbiBbYWx3YXlzVmlzaWJsZV0gaXMgZmFsc2UuXG4gICAqIERlZmF1bHRzIHRvICdzZWFyY2gnIGljb24uXG4gICAqL1xuICBASW5wdXQoKSBiYWNrSWNvbiA9ICdzZWFyY2gnO1xuXG4gIC8qKlxuICAgKiBzZWFyY2hJY29uPzogc3RyaW5nXG4gICAqIFRoZSBpY29uIHVzZWQgdG8gb3Blbi9mb2N1cyB0aGUgc2VhcmNoIHRvZ2dsZS5cbiAgICogRGVmYXVsdHMgdG8gJ3NlYXJjaCcgaWNvbi5cbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaEljb24gPSAnc2VhcmNoJztcblxuICAvKipcbiAgICogY2xlYXJJY29uPzogc3RyaW5nXG4gICAqIFRoZSBpY29uIHVzZWQgdG8gY2xlYXIgdGhlIHNlYXJjaCBpbnB1dC5cbiAgICogRGVmYXVsdHMgdG8gJ2NhbmNlbCcgaWNvbi5cbiAgICovXG4gIEBJbnB1dCgpIGNsZWFySWNvbiA9ICdjYW5jZWwnO1xuXG4gIC8qKlxuICAgKiBzaG93VW5kZXJsaW5lPzogYm9vbGVhblxuICAgKiBTZXRzIGlmIHRoZSBpbnB1dCB1bmRlcmxpbmUgc2hvdWxkIGJlIHZpc2libGUuIERlZmF1bHRzIHRvICdmYWxzZScuXG4gICAqL1xuICBASW5wdXQoKSBzaG93VW5kZXJsaW5lID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGRlYm91bmNlPzogbnVtYmVyXG4gICAqIERlYm91bmNlIHRpbWVvdXQgYmV0d2VlbiBrZXlwcmVzc2VzLiBEZWZhdWx0cyB0byA0MDAuXG4gICAqL1xuICBASW5wdXQoKSBkZWJvdW5jZSA9IDQwMDtcblxuICAvKipcbiAgICogYWx3YXlzVmlzaWJsZT86IGJvb2xlYW5cbiAgICogU2V0cyBpZiB0aGUgaW5wdXQgc2hvdWxkIGFsd2F5cyBiZSB2aXNpYmxlLiBEZWZhdWx0cyB0byAnZmFsc2UnLlxuICAgKi9cbiAgQElucHV0KCkgYWx3YXlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBwbGFjZWhvbGRlcj86IHN0cmluZ1xuICAgKiBQbGFjZWhvbGRlciBmb3IgdGhlIHVuZGVybHlpbmcgaW5wdXQgY29tcG9uZW50LlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAvKipcbiAgICogc2VhcmNoRGVib3VuY2U6IGZ1bmN0aW9uKCRldmVudClcbiAgICogRXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgW2RlYm91bmNlXSB0aW1lb3V0LlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIEBPdXRwdXQoJ3NlYXJjaERlYm91bmNlJykgb25TZWFyY2hEZWJvdW5jZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKipcbiAgICogc2VhcmNoOiBmdW5jdGlvbigkZXZlbnQpXG4gICAqIEV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGtleSBlbnRlciBoYXMgYmVlbiBwcmVzc2VkLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIG9uU2VhcmNoOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBjbGVhcjogZnVuY3Rpb24oKVxuICAgKiBFdmVudCBlbWl0dGVkIGFmdGVyIHRoZSBjbGVhciBpY29uIGhhcyBiZWVuIGNsaWNrZWQuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgQE91dHB1dCgnY2xlYXInKSBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIGJsdXI6IGZ1bmN0aW9uKClcbiAgICogRXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgYmx1ciBldmVudCBoYXMgYmVlbiBjYWxsZWQgaW4gdW5kZXJseWluZyBpbnB1dC5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBAT3V0cHV0KCdibHVyJykgb25CbHVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihfY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHRoZSBzZWFyY2ggaWNvbiBpcyBjbGlja2VkLlxuICAgKi9cbiAgc2VhcmNoQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWx3YXlzVmlzaWJsZSAmJiB0aGlzLl9zZWFyY2hWaXNpYmxlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICB0aGlzLmhhbmRsZUNsZWFyKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFsd2F5c1Zpc2libGUgfHwgIXRoaXMuX3NlYXJjaFZpc2libGUpIHtcbiAgICAgIHRoaXMuX3NlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgdG9nZ2xlVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWFyY2hWaXNpYmxlID0gIXRoaXMuX3NlYXJjaFZpc2libGU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoYW5kbGVTZWFyY2hEZWJvdW5jZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vblNlYXJjaERlYm91bmNlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlU2VhcmNoKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VhcmNoLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlQ2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5vbkNsZWFyLmVtaXQodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5vbkJsdXIuZW1pdCh1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=