import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isObject } from '../helpers/helpers';
var InvertPipe = /** @class */ (function () {
    function InvertPipe() {
    }
    // tslint:disable-next-line: ban-types
    InvertPipe.prototype.transform = function (obj) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj).reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {}, _a[obj[k]] = k, _a));
        }, {});
    };
    InvertPipe = tslib_1.__decorate([
        Pipe({ name: 'invert' })
    ], InvertPipe);
    return InvertPipe;
}());
export { InvertPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZXJ0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbIm9iamVjdC9pbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc5QztJQUFBO0lBV0EsQ0FBQztJQVZDLHNDQUFzQztJQUN0Qyw4QkFBUyxHQUFULFVBQVUsR0FBUTtRQUNoQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzs7WUFDbEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLE1BQUcsQ0FBQztRQUMzQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBVlUsVUFBVTtRQUR0QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7T0FDWixVQUFVLENBV3RCO0lBQUQsaUJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdpbnZlcnQnIH0pXG5leHBvcnQgY2xhc3MgSW52ZXJ0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGJhbi10eXBlc1xuICB0cmFuc2Zvcm0ob2JqOiBhbnkpOiBPYmplY3Qge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikgfHwgIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChvLCBrKSA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvLCB7IFtvYmpba11dOiBrIH0pO1xuICAgIH0sIHt9KTtcbiAgfVxufVxuIl19