import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var RightPadPipe = /** @class */ (function () {
    function RightPadPipe() {
    }
    RightPadPipe.prototype.transform = function (str, length, padCharacter) {
        if (length === void 0) { length = 1; }
        if (padCharacter === void 0) { padCharacter = ' '; }
        if (!isString(str) || str.length >= length) {
            return str;
        }
        while (str.length < length) {
            str = str + padCharacter;
        }
        return str;
    };
    RightPadPipe = tslib_1.__decorate([
        Pipe({ name: 'rpad' })
    ], RightPadPipe);
    return RightPadPipe;
}());
export { RightPadPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBhZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvcnBhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFXQSxDQUFDO0lBVkMsZ0NBQVMsR0FBVCxVQUFVLEdBQVcsRUFBRSxNQUFrQixFQUFFLFlBQTBCO1FBQTlDLHVCQUFBLEVBQUEsVUFBa0I7UUFBRSw2QkFBQSxFQUFBLGtCQUEwQjtRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQzFDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQzFCLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO1NBQzFCO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBVlUsWUFBWTtRQUR4QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDVixZQUFZLENBV3hCO0lBQUQsbUJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdycGFkJyB9KVxuZXhwb3J0IGNsYXNzIFJpZ2h0UGFkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oc3RyOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyID0gMSwgcGFkQ2hhcmFjdGVyOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuICAgIGlmICghaXNTdHJpbmcoc3RyKSB8fCBzdHIubGVuZ3RoID49IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgIHN0ciA9IHN0ciArIHBhZENoYXJhY3RlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG4iXX0=