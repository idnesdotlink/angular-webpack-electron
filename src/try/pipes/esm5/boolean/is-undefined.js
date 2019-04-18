import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isUndefined } from '../helpers/helpers';
var IsUndefinedPipe = /** @class */ (function () {
    function IsUndefinedPipe() {
    }
    IsUndefinedPipe.prototype.transform = function (input) {
        return isUndefined(input);
    };
    IsUndefinedPipe = tslib_1.__decorate([
        Pipe({ name: 'isUndefined' })
    ], IsUndefinedPipe);
    return IsUndefinedPipe;
}());
export { IsUndefinedPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtdW5kZWZpbmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImJvb2xlYW4vaXMtdW5kZWZpbmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHakQ7SUFBQTtJQUlBLENBQUM7SUFIQyxtQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBSFUsZUFBZTtRQUQzQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7T0FDakIsZUFBZSxDQUkzQjtJQUFELHNCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnaXNVbmRlZmluZWQnIH0pXG5leHBvcnQgY2xhc3MgSXNVbmRlZmluZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGlucHV0KTtcbiAgfVxufVxuIl19