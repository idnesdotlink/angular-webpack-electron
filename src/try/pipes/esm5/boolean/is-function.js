import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isFunction } from '../helpers/helpers';
var IsFunctionPipe = /** @class */ (function () {
    function IsFunctionPipe() {
    }
    IsFunctionPipe.prototype.transform = function (input) {
        return isFunction(input);
    };
    IsFunctionPipe = tslib_1.__decorate([
        Pipe({ name: 'isFunction' })
    ], IsFunctionPipe);
    return IsFunctionPipe;
}());
export { IsFunctionPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZnVuY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYm9vbGVhbi9pcy1mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR2hEO0lBQUE7SUFJQSxDQUFDO0lBSEMsa0NBQVMsR0FBVCxVQUFVLEtBQVU7UUFDbEIsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUhVLGNBQWM7UUFEMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDO09BQ2hCLGNBQWMsQ0FJMUI7SUFBRCxxQkFBQztDQUFBLEFBSkQsSUFJQztTQUpZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnaXNGdW5jdGlvbicgfSlcbmV4cG9ydCBjbGFzcyBJc0Z1bmN0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGlucHV0KTtcbiAgfVxufVxuIl19