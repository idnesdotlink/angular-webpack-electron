import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isObject } from '../helpers/helpers';
var OmitPipe = /** @class */ (function () {
    function OmitPipe() {
    }
    OmitPipe.prototype.transform = function (obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return (Object.keys(obj)
            // tslint:disable-next-line:no-bitwise
            .filter(function (k) { return !~args.indexOf(k); })
            .reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {}, _a[k] = obj[k], _a));
        }, {}));
    };
    OmitPipe = tslib_1.__decorate([
        Pipe({ name: 'omit' })
    ], OmitPipe);
    return OmitPipe;
}());
export { OmitPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib21pdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJvYmplY3Qvb21pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFlQSxDQUFDO0lBZEMsNEJBQVMsR0FBVCxVQUFVLEdBQVE7UUFBRSxjQUFzQjthQUF0QixVQUFzQixFQUF0QixxQkFBc0IsRUFBdEIsSUFBc0I7WUFBdEIsNkJBQXNCOztRQUN4QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNkLHNDQUFzQzthQUNyQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQzthQUM5QixNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzs7WUFDWCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFJLEdBQUMsQ0FBQyxJQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBRyxDQUFDO1FBQzNDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQWRVLFFBQVE7UUFEcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ1YsUUFBUSxDQWVwQjtJQUFELGVBQUM7Q0FBQSxBQWZELElBZUM7U0FmWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdvbWl0JyB9KVxuZXhwb3J0IGNsYXNzIE9taXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShvYmo6IGFueSwgLi4uYXJnczogQXJyYXk8c3RyaW5nPik6IE9iamVjdCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSB8fCAhaXNPYmplY3Qob2JqKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgT2JqZWN0LmtleXMob2JqKVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgICAuZmlsdGVyKGsgPT4gIX5hcmdzLmluZGV4T2YoaykpXG4gICAgICAgIC5yZWR1Y2UoKG8sIGspID0+IHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvLCB7IFtrXTogb2JqW2tdIH0pO1xuICAgICAgICB9LCB7fSlcbiAgICApO1xuICB9XG59XG4iXX0=