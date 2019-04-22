import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var IsArrayPipe = /** @class */ (function () {
    function IsArrayPipe() {
    }
    IsArrayPipe.prototype.transform = function (input) {
        return Array.isArray(input);
    };
    IsArrayPipe = tslib_1.__decorate([
        Pipe({ name: 'isArray' })
    ], IsArrayPipe);
    return IsArrayPipe;
}());
export { IsArrayPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYm9vbGVhbi9pcy1hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQUlBLENBQUM7SUFIQywrQkFBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUhVLFdBQVc7UUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO09BQ2IsV0FBVyxDQUl2QjtJQUFELGtCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnaXNBcnJheScgfSlcbmV4cG9ydCBjbGFzcyBJc0FycmF5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGlucHV0KTtcbiAgfVxufVxuIl19