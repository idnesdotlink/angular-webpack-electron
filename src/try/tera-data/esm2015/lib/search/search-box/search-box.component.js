import * as tslib_1 from "tslib";
var TdSearchBoxComponent_1;
import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate, AUTO_STYLE } from '@angular/animations';
import { TdSearchInputComponent } from '../search-input/search-input.component';
import { mixinControlValueAccessor } from '../../common';
export class TdSearchBoxBase {
    // tslint:disable-next-line
    constructor(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
    }
}
/* tslint:disable-next-line */
export const _TdSearchBoxMixinBase = mixinControlValueAccessor(TdSearchBoxBase);
let TdSearchBoxComponent = TdSearchBoxComponent_1 = class TdSearchBoxComponent extends _TdSearchBoxMixinBase {
    constructor(
    // tslint:disable-next-line
    _changeDetectorRef) {
        super(_changeDetectorRef);
        // tslint:disable-next-line: variable-name
        this._searchVisible = false;
        /**
         * backIcon?: string
         * The icon used to close the search toggle, only shown when [alwaysVisible] is false.
         * Defaults to 'search' icon.
         */
        this.backIcon = 'search';
        /**
         * searchIcon?: string
         * The icon used to open/focus the search toggle.
         * Defaults to 'search' icon.
         */
        this.searchIcon = 'search';
        /**
         * clearIcon?: string
         * The icon used to clear the search input.
         * Defaults to 'cancel' icon.
         */
        this.clearIcon = 'cancel';
        /**
         * showUnderline?: boolean
         * Sets if the input underline should be visible. Defaults to 'false'.
         */
        this.showUnderline = false;
        /**
         * debounce?: number
         * Debounce timeout between keypresses. Defaults to 400.
         */
        this.debounce = 400;
        /**
         * alwaysVisible?: boolean
         * Sets if the input should always be visible. Defaults to 'false'.
         */
        this.alwaysVisible = false;
        /**
         * searchDebounce: function($event)
         * Event emitted after the [debounce] timeout.
         */
        // tslint:disable-next-line
        this.onSearchDebounce = new EventEmitter();
        /**
         * search: function($event)
         * Event emitted after the key enter has been pressed.
         */
        // tslint:disable-next-line
        this.onSearch = new EventEmitter();
        /**
         * clear: function()
         * Event emitted after the clear icon has been clicked.
         */
        // tslint:disable-next-line
        this.onClear = new EventEmitter();
        /**
         * blur: function()
         * Event emitted after the blur event has been called in underlying input.
         */
        // tslint:disable-next-line
        this.onBlur = new EventEmitter();
    }
    get searchVisible() {
        return this._searchVisible;
    }
    /**
     * Method executed when the search icon is clicked.
     */
    searchClicked() {
        if (!this.alwaysVisible && this._searchVisible) {
            this.value = '';
            this.handleClear();
        }
        else if (this.alwaysVisible || !this._searchVisible) {
            this._searchInput.focus();
        }
        this.toggleVisibility();
    }
    toggleVisibility() {
        this._searchVisible = !this._searchVisible;
        this._changeDetectorRef.markForCheck();
    }
    handleSearchDebounce(value) {
        this.onSearchDebounce.emit(value);
    }
    handleSearch(value) {
        this.onSearch.emit(value);
    }
    handleClear() {
        this.onClear.emit(undefined);
    }
    handleBlur() {
        this.onBlur.emit(undefined);
    }
};
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
                useExisting: forwardRef(() => TdSearchBoxComponent_1),
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
export { TdSearchBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3RlcmEtZGF0YS8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLWJveC9zZWFyY2gtYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU3RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRixPQUFPLEVBQXlCLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE1BQU0sT0FBTyxlQUFlO0lBQzFCLDJCQUEyQjtJQUMzQixZQUFtQixrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtJQUFJLENBQUM7Q0FDOUQ7QUFFRCw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcseUJBQXlCLENBQUMsZUFBZSxDQUFDLENBQUM7QUEyQmhGLElBQWEsb0JBQW9CLDRCQUFqQyxNQUFhLG9CQUFxQixTQUFRLHFCQUFxQjtJQXFGN0Q7SUFDRSwyQkFBMkI7SUFDM0Isa0JBQXFDO1FBRXJDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBdEY1QiwwQ0FBMEM7UUFDbEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFRL0I7Ozs7V0FJRztRQUNNLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFFN0I7Ozs7V0FJRztRQUNNLGVBQVUs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QUFHLEVBQUUsQ0FBQyxzQkFBb0IsQ0FBQztnQkFDbkQsS0FBSyxFQUFFLElBQUk7YUFDWixDQUFDO1FBQ0YsUUFBUSxFQUFFLGVBQWU7UUFDekIsczVCQUEwQztRQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxVQUFVLEVBQUU7WUFDVixPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUNwQixLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztvQkFDZixLQUFLLEVBQUUsSUFBSTtvQkFDWCxNQUFNLEVBQUUsS0FBSztpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLEdBQUcsRUFBRyxLQUFLLENBQUM7b0JBQ2hCLEtBQUssRUFBRSxNQUFNO29CQUNiLE1BQU0sRUFBRSxVQUFVO2lCQUNuQixDQUFDLENBQUM7Z0JBQ0gsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzlDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDaEQsQ0FBQztTQUNIOztLQUNGLENBQUM7NkNBd0ZzQixpQkFBaUI7R0F2RjVCLG9CQUFvQixDQTZIaEM7U0E3SFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSwgQVVUT19TVFlMRSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBUZFNlYXJjaElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNvbnRyb2xWYWx1ZUFjY2Vzc29yLCBtaXhpbkNvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcblxuZXhwb3J0IGNsYXNzIFRkU2VhcmNoQm94QmFzZSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG59XG5cbi8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuZXhwb3J0IGNvbnN0IF9UZFNlYXJjaEJveE1peGluQmFzZSA9IG1peGluQ29udHJvbFZhbHVlQWNjZXNzb3IoVGRTZWFyY2hCb3hCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUZFNlYXJjaEJveENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dLFxuICBzZWxlY3RvcjogJ3RkLXNlYXJjaC1ib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1ib3guY29tcG9uZW50LnNjc3MnIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignaW5wdXRTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCcwJywgc3R5bGUoe1xuICAgICAgICB3aWR0aDogJzAlJyxcbiAgICAgICAgbWFyZ2luOiAnMHB4JyxcbiAgICAgIH0pKSxcbiAgICAgIHN0YXRlKCcxJywgIHN0eWxlKHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWFyZ2luOiBBVVRPX1NUWUxFLFxuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignMCA9PiAxJywgYW5pbWF0ZSgnMjAwbXMgZWFzZS1pbicpKSxcbiAgICAgIHRyYW5zaXRpb24oJzEgPT4gMCcsIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0JykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUZFNlYXJjaEJveENvbXBvbmVudCBleHRlbmRzIF9UZFNlYXJjaEJveE1peGluQmFzZSBpbXBsZW1lbnRzIElDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgdmFsdWU6IGFueTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIHByaXZhdGUgX3NlYXJjaFZpc2libGUgPSBmYWxzZTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIEBWaWV3Q2hpbGQoVGRTZWFyY2hJbnB1dENvbXBvbmVudCkgX3NlYXJjaElucHV0OiBUZFNlYXJjaElucHV0Q29tcG9uZW50O1xuXG4gIGdldCBzZWFyY2hWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWFyY2hWaXNpYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIGJhY2tJY29uPzogc3RyaW5nXG4gICAqIFRoZSBpY29uIHVzZWQgdG8gY2xvc2UgdGhlIHNlYXJjaCB0b2dnbGUsIG9ubHkgc2hvd24gd2hlbiBbYWx3YXlzVmlzaWJsZV0gaXMgZmFsc2UuXG4gICAqIERlZmF1bHRzIHRvICdzZWFyY2gnIGljb24uXG4gICAqL1xuICBASW5wdXQoKSBiYWNrSWNvbiA9ICdzZWFyY2gnO1xuXG4gIC8qKlxuICAgKiBzZWFyY2hJY29uPzogc3RyaW5nXG4gICAqIFRoZSBpY29uIHVzZWQgdG8gb3Blbi9mb2N1cyB0aGUgc2VhcmNoIHRvZ2dsZS5cbiAgICogRGVmYXVsdHMgdG8gJ3NlYXJjaCcgaWNvbi5cbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaEljb24gPSAnc2VhcmNoJztcblxuICAvKipcbiAgICogY2xlYXJJY29uPzogc3RyaW5nXG4gICAqIFRoZSBpY29uIHVzZWQgdG8gY2xlYXIgdGhlIHNlYXJjaCBpbnB1dC5cbiAgICogRGVmYXVsdHMgdG8gJ2NhbmNlbCcgaWNvbi5cbiAgICovXG4gIEBJbnB1dCgpIGNsZWFySWNvbiA9ICdjYW5jZWwnO1xuXG4gIC8qKlxuICAgKiBzaG93VW5kZXJsaW5lPzogYm9vbGVhblxuICAgKiBTZXRzIGlmIHRoZSBpbnB1dCB1bmRlcmxpbmUgc2hvdWxkIGJlIHZpc2libGUuIERlZmF1bHRzIHRvICdmYWxzZScuXG4gICAqL1xuICBASW5wdXQoKSBzaG93VW5kZXJsaW5lID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGRlYm91bmNlPzogbnVtYmVyXG4gICAqIERlYm91bmNlIHRpbWVvdXQgYmV0d2VlbiBrZXlwcmVzc2VzLiBEZWZhdWx0cyB0byA0MDAuXG4gICAqL1xuICBASW5wdXQoKSBkZWJvdW5jZSA9IDQwMDtcblxuICAvKipcbiAgICogYWx3YXlzVmlzaWJsZT86IGJvb2xlYW5cbiAgICogU2V0cyBpZiB0aGUgaW5wdXQgc2hvdWxkIGFsd2F5cyBiZSB2aXNpYmxlLiBEZWZhdWx0cyB0byAnZmFsc2UnLlxuICAgKi9cbiAgQElucHV0KCkgYWx3YXlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBwbGFjZWhvbGRlcj86IHN0cmluZ1xuICAgKiBQbGFjZWhvbGRlciBmb3IgdGhlIHVuZGVybHlpbmcgaW5wdXQgY29tcG9uZW50LlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAvKipcbiAgICogc2VhcmNoRGVib3VuY2U6IGZ1bmN0aW9uKCRldmVudClcbiAgICogRXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgW2RlYm91bmNlXSB0aW1lb3V0LlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIEBPdXRwdXQoJ3NlYXJjaERlYm91bmNlJykgb25TZWFyY2hEZWJvdW5jZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKipcbiAgICogc2VhcmNoOiBmdW5jdGlvbigkZXZlbnQpXG4gICAqIEV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGtleSBlbnRlciBoYXMgYmVlbiBwcmVzc2VkLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIG9uU2VhcmNoOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBjbGVhcjogZnVuY3Rpb24oKVxuICAgKiBFdmVudCBlbWl0dGVkIGFmdGVyIHRoZSBjbGVhciBpY29uIGhhcyBiZWVuIGNsaWNrZWQuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgQE91dHB1dCgnY2xlYXInKSBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIGJsdXI6IGZ1bmN0aW9uKClcbiAgICogRXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgYmx1ciBldmVudCBoYXMgYmVlbiBjYWxsZWQgaW4gdW5kZXJseWluZyBpbnB1dC5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBAT3V0cHV0KCdibHVyJykgb25CbHVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihfY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBleGVjdXRlZCB3aGVuIHRoZSBzZWFyY2ggaWNvbiBpcyBjbGlja2VkLlxuICAgKi9cbiAgc2VhcmNoQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWx3YXlzVmlzaWJsZSAmJiB0aGlzLl9zZWFyY2hWaXNpYmxlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICB0aGlzLmhhbmRsZUNsZWFyKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFsd2F5c1Zpc2libGUgfHwgIXRoaXMuX3NlYXJjaFZpc2libGUpIHtcbiAgICAgIHRoaXMuX3NlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgdG9nZ2xlVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWFyY2hWaXNpYmxlID0gIXRoaXMuX3NlYXJjaFZpc2libGU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoYW5kbGVTZWFyY2hEZWJvdW5jZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vblNlYXJjaERlYm91bmNlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlU2VhcmNoKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VhcmNoLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlQ2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5vbkNsZWFyLmVtaXQodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5vbkJsdXIuZW1pdCh1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=