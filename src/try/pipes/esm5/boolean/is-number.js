import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isNumber } from '../helpers/helpers';
var IsNumberPipe = /** @class */ (function () {
    function IsNumberPipe() {
    }
    IsNumberPipe.prototype.transform = function (input) {
        return isNumber(input);
    };
    IsNumberPipe = tslib_1.__decorate([
        Pipe({ name: 'isNumber' })
    ], IsNumberPipe);
    return IsNumberPipe;
}());
export { IsNumberPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbnVtYmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImJvb2xlYW4vaXMtbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFIQyxnQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBSFUsWUFBWTtRQUR4QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7T0FDZCxZQUFZLENBSXhCO0lBQUQsbUJBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdpc051bWJlcicgfSlcbmV4cG9ydCBjbGFzcyBJc051bWJlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNOdW1iZXIoaW5wdXQpO1xuICB9XG59XG4iXX0=