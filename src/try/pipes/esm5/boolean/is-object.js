import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isObject } from '../helpers/helpers';
var IsObjectPipe = /** @class */ (function () {
    function IsObjectPipe() {
    }
    IsObjectPipe.prototype.transform = function (input) {
        return isObject(input);
    };
    IsObjectPipe = tslib_1.__decorate([
        Pipe({ name: 'isObject' })
    ], IsObjectPipe);
    return IsObjectPipe;
}());
export { IsObjectPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtb2JqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImJvb2xlYW4vaXMtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFIQyxnQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBSFUsWUFBWTtRQUR4QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7T0FDZCxZQUFZLENBSXhCO0lBQUQsbUJBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdpc09iamVjdCcgfSlcbmV4cG9ydCBjbGFzcyBJc09iamVjdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNPYmplY3QoaW5wdXQpO1xuICB9XG59XG4iXX0=