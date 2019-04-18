import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { getKeysTwoObjects, isDeepEqual, isObject } from '../helpers/helpers';
var DiffObjPipe = /** @class */ (function () {
    function DiffObjPipe() {
    }
    DiffObjPipe.prototype.transform = function (obj, original) {
        if (original === void 0) { original = {}; }
        if (Array.isArray(obj) || Array.isArray(original) || !isObject(obj) || !isObject(original)) {
            return {};
        }
        return getKeysTwoObjects(obj, original).reduce(function (diff, key) {
            if (!isDeepEqual(original[key], obj[key])) {
                diff[key] = obj[key];
            }
            return diff;
        }, {});
    };
    DiffObjPipe = tslib_1.__decorate([
        Pipe({ name: 'diffObj' })
    ], DiffObjPipe);
    return DiffObjPipe;
}());
export { DiffObjPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi1vYmouanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsib2JqZWN0L2RpZmYtb2JqLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlFO0lBQUE7SUFjQSxDQUFDO0lBYkMsK0JBQVMsR0FBVCxVQUFVLEdBQVEsRUFBRSxRQUFrQjtRQUFsQix5QkFBQSxFQUFBLGFBQWtCO1FBQ3BDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFGLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxPQUFPLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFTLEVBQUUsR0FBUTtZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQWJVLFdBQVc7UUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO09BQ2IsV0FBVyxDQWN2QjtJQUFELGtCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldEtleXNUd29PYmplY3RzLCBpc0RlZXBFcXVhbCwgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdkaWZmT2JqJyB9KVxuZXhwb3J0IGNsYXNzIERpZmZPYmpQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShvYmo6IGFueSwgb3JpZ2luYWw6IGFueSA9IHt9KTogYW55IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopIHx8IEFycmF5LmlzQXJyYXkob3JpZ2luYWwpIHx8ICFpc09iamVjdChvYmopIHx8ICFpc09iamVjdChvcmlnaW5hbCkpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0S2V5c1R3b09iamVjdHMob2JqLCBvcmlnaW5hbCkucmVkdWNlKChkaWZmOiBhbnksIGtleTogYW55KSA9PiB7XG4gICAgICBpZiAoIWlzRGVlcEVxdWFsKG9yaWdpbmFsW2tleV0sIG9ialtrZXldKSkge1xuICAgICAgICBkaWZmW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpZmY7XG4gICAgfSwge30pO1xuICB9XG59XG4iXX0=