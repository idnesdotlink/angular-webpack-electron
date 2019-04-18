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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by10cmltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9mb3Jtcy9hdXRvLXRyaW0vYXV0by10cmltLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3pDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBRTlCLFlBQXdDLE1BQWU7UUFBZixXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQUcsQ0FBQztJQUUzRDs7T0FFRztJQUVILE1BQU0sQ0FBQyxLQUFZO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQUxDO0lBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs2Q0FDbkIsS0FBSzs7aURBSWxCO0FBWlUsbUJBQW1CO0lBSC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO0tBQ3pCLENBQUM7SUFHYSxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBOzZDQUFpQixPQUFPO0dBRjVDLG1CQUFtQixDQWEvQjtTQWJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyLCBIb3N0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdNb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RkQXV0b1RyaW1dJyxcbn0pXG5leHBvcnQgY2xhc3MgVGRBdXRvVHJpbURpcmVjdGl2ZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIF9tb2RlbDogTmdNb2RlbCkge31cblxuICAvKipcbiAgICogTGlzdGVucyB0byBob3N0J3MgKGJsdXIpIGV2ZW50IGFuZCB0cmltcyB2YWx1ZS5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICBvbkJsdXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21vZGVsICYmIHRoaXMuX21vZGVsLnZhbHVlICYmIHR5cGVvZih0aGlzLl9tb2RlbC52YWx1ZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9tb2RlbC51cGRhdGUuZW1pdCh0aGlzLl9tb2RlbC52YWx1ZS50cmltKCkpO1xuICAgIH1cbiAgfVxufVxuIl19