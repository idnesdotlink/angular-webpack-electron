import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var LeftPadPipe = /** @class */ (function () {
    function LeftPadPipe() {
    }
    LeftPadPipe.prototype.transform = function (str, length, padCharacter) {
        if (padCharacter === void 0) { padCharacter = ' '; }
        if (!isString(str) || str.length >= length) {
            return str;
        }
        while (str.length < length) {
            str = padCharacter + str;
        }
        return str;
    };
    LeftPadPipe = tslib_1.__decorate([
        Pipe({ name: 'lpad' })
    ], LeftPadPipe);
    return LeftPadPipe;
}());
export { LeftPadPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBhZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvbHBhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFXQSxDQUFDO0lBVkMsK0JBQVMsR0FBVCxVQUFVLEdBQVcsRUFBRSxNQUFjLEVBQUUsWUFBMEI7UUFBMUIsNkJBQUEsRUFBQSxrQkFBMEI7UUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUMxQyxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUMxQixHQUFHLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQztTQUMxQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQVZVLFdBQVc7UUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ1YsV0FBVyxDQVd2QjtJQUFELGtCQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnbHBhZCcgfSlcbmV4cG9ydCBjbGFzcyBMZWZ0UGFkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oc3RyOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBwYWRDaGFyYWN0ZXI6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1N0cmluZyhzdHIpIHx8IHN0ci5sZW5ndGggPj0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgc3RyID0gcGFkQ2hhcmFjdGVyICsgc3RyO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiJdfQ==