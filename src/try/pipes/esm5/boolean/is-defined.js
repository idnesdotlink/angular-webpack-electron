import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isUndefined } from '../helpers/helpers';
var IsDefinedPipe = /** @class */ (function () {
    function IsDefinedPipe() {
    }
    IsDefinedPipe.prototype.transform = function (input) {
        return !isUndefined(input);
    };
    IsDefinedPipe = tslib_1.__decorate([
        Pipe({ name: 'isDefined' })
    ], IsDefinedPipe);
    return IsDefinedPipe;
}());
export { IsDefinedPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZGVmaW5lZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJib29sZWFuL2lzLWRlZmluZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdqRDtJQUFBO0lBSUEsQ0FBQztJQUhDLGlDQUFTLEdBQVQsVUFBVSxLQUFVO1FBQ2xCLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUhVLGFBQWE7UUFEekIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDO09BQ2YsYUFBYSxDQUl6QjtJQUFELG9CQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnaXNEZWZpbmVkJyB9KVxuZXhwb3J0IGNsYXNzIElzRGVmaW5lZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKGlucHV0KTtcbiAgfVxufVxuIl19