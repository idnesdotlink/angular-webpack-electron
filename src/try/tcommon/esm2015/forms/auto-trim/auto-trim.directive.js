import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { HostListener, Host, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
let TdAutoTrimDirective = class TdAutoTrimDirective {
    constructor(_model) {
        this._model = _model;
    }
    /**
     * Listens to host's (blur) event and trims value.
     */
    onBlur(event) {
        if (this._model && this._model.value && typeof (this._model.value) === 'string') {
            this._model.update.emit(this._model.value.trim());
        }
    }
};
tslib_1.__decorate([
    HostListener('blur', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Event]),
    tslib_1.__metadata("design:returntype", void 0)
], TdAutoTrimDirective.prototype, "onBlur", null);
TdAutoTrimDirective = tslib_1.__decorate([
    Directive({
        selector: '[tdAutoTrim]',
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Host()),
    tslib_1.__metadata("design:paramtypes", [NgModel])
], TdAutoTrimDirective);
export { TdAutoTrimDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by10cmltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGNvbW1vbi8iLCJzb3VyY2VzIjpbImZvcm1zL2F1dG8tdHJpbS9hdXRvLXRyaW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLekMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFFOUIsWUFBd0MsTUFBZTtRQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7SUFBRyxDQUFDO0lBRTNEOztPQUVHO0lBRUgsTUFBTSxDQUFDLEtBQVk7UUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7Q0FDRixDQUFBO0FBTEM7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNuQixLQUFLOztpREFJbEI7QUFaVSxtQkFBbUI7SUFIL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7S0FDekIsQ0FBQztJQUdhLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsSUFBSSxFQUFFLENBQUE7NkNBQWlCLE9BQU87R0FGNUMsbUJBQW1CLENBYS9CO1NBYlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIb3N0TGlzdGVuZXIsIEhvc3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ01vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGRBdXRvVHJpbV0nLFxufSlcbmV4cG9ydCBjbGFzcyBUZEF1dG9UcmltRGlyZWN0aXZlIHtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgX21vZGVsOiBOZ01vZGVsKSB7fVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIGhvc3QncyAoYmx1cikgZXZlbnQgYW5kIHRyaW1zIHZhbHVlLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXG4gIG9uQmx1cihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW9kZWwgJiYgdGhpcy5fbW9kZWwudmFsdWUgJiYgdHlwZW9mKHRoaXMuX21vZGVsLnZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZS5lbWl0KHRoaXMuX21vZGVsLnZhbHVlLnRyaW0oKSk7XG4gICAgfVxuICB9XG59XG4iXX0=