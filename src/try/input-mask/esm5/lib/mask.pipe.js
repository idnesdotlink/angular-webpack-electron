import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { MaskApplierService } from './mask-applier.service';
var MaskPipe = /** @class */ (function () {
    function MaskPipe(_maskService) {
        this._maskService = _maskService;
    }
    MaskPipe.prototype.transform = function (value, mask) {
        if (!value) {
            return '';
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask("" + value, mask);
        }
        return this._maskService.applyMaskWithPattern("" + value, mask);
    };
    MaskPipe = tslib_1.__decorate([
        Pipe({
            name: 'mask',
            pure: true
        }),
        tslib_1.__metadata("design:paramtypes", [MaskApplierService])
    ], MaskPipe);
    return MaskPipe;
}());
export { MaskPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9pbnB1dC1tYXNrLyIsInNvdXJjZXMiOlsibGliL21hc2sucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFPNUQ7SUFFRSxrQkFBMkIsWUFBZ0M7UUFBaEMsaUJBQVksR0FBWixZQUFZLENBQW9CO0lBQUksQ0FBQztJQUV6RCw0QkFBUyxHQUFoQixVQUFpQixLQUFvQixFQUFFLElBQTRDO1FBQ2pGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFHLEtBQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFHLEtBQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBWlUsUUFBUTtRQUpwQixJQUFJLENBQUM7WUFDSixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztpREFHeUMsa0JBQWtCO09BRmhELFFBQVEsQ0FhcEI7SUFBRCxlQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hc2tBcHBsaWVyU2VydmljZSB9IGZyb20gJy4vbWFzay1hcHBsaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuQFBpcGUoe1xuICBuYW1lOiAnbWFzaycsXG4gIHB1cmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgTWFza1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFza1NlcnZpY2U6IE1hc2tBcHBsaWVyU2VydmljZSkgeyB9XG5cbiAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nfG51bWJlciwgbWFzazogc3RyaW5nIHwgW3N0cmluZywgSUNvbmZpZ1sncGF0dGVybnMnXV0pOiBzdHJpbmcge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBtYXNrID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhgJHt2YWx1ZX1gLCBtYXNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFza1dpdGhQYXR0ZXJuKGAke3ZhbHVlfWAsIG1hc2spO1xuICB9XG59XG4iXX0=