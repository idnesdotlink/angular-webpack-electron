import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var IsStringPipe = /** @class */ (function () {
    function IsStringPipe() {
    }
    IsStringPipe.prototype.transform = function (input) {
        return isString(input);
    };
    IsStringPipe = tslib_1.__decorate([
        Pipe({ name: 'isString' })
    ], IsStringPipe);
    return IsStringPipe;
}());
export { IsStringPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImJvb2xlYW4vaXMtc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFIQyxnQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBSFUsWUFBWTtRQUR4QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7T0FDZCxZQUFZLENBSXhCO0lBQUQsbUJBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdpc1N0cmluZycgfSlcbmV4cG9ydCBjbGFzcyBJc1N0cmluZ1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoaW5wdXQpO1xuICB9XG59XG4iXX0=