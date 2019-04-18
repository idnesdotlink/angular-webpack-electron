import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { HostListener, Host, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
var TdAutoTrimDirective = /** @class */ (function () {
    function TdAutoTrimDirective(_model) {
        this._model = _model;
    }
    /**
     * Listens to host's (blur) event and trims value.
     */
    TdAutoTrimDirective.prototype.onBlur = function (event) {
        if (this._model && this._model.value && typeof (this._model.value) === 'string') {
            this._model.update.emit(this._model.value.trim());
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
    return TdAutoTrimDirective;
}());
export { TdAutoTrimDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by10cmltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9mb3Jtcy9hdXRvLXRyaW0vYXV0by10cmltLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3pDO0lBRUUsNkJBQXdDLE1BQWU7UUFBZixXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQUcsQ0FBQztJQUUzRDs7T0FFRztJQUVILG9DQUFNLEdBQU4sVUFBTyxLQUFZO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBSkQ7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUNuQixLQUFLOztxREFJbEI7SUFaVSxtQkFBbUI7UUFIL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7U0FDekIsQ0FBQztRQUdhLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsSUFBSSxFQUFFLENBQUE7aURBQWlCLE9BQU87T0FGNUMsbUJBQW1CLENBYS9CO0lBQUQsMEJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciwgSG9zdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0ZEF1dG9UcmltXScsXG59KVxuZXhwb3J0IGNsYXNzIFRkQXV0b1RyaW1EaXJlY3RpdmUge1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBfbW9kZWw6IE5nTW9kZWwpIHt9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gaG9zdCdzIChibHVyKSBldmVudCBhbmQgdHJpbXMgdmFsdWUuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgb25CbHVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC52YWx1ZSAmJiB0eXBlb2YodGhpcy5fbW9kZWwudmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fbW9kZWwudXBkYXRlLmVtaXQodGhpcy5fbW9kZWwudmFsdWUudHJpbSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==