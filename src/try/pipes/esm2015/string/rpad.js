import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
let RightPadPipe = class RightPadPipe {
    transform(str, length = 1, padCharacter = ' ') {
        if (!isString(str) || str.length >= length) {
            return str;
        }
        while (str.length < length) {
            str = str + padCharacter;
        }
        return str;
    }
};
RightPadPipe = tslib_1.__decorate([
    Pipe({ name: 'rpad' })
], RightPadPipe);
export { RightPadPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBhZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvcnBhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDdkIsU0FBUyxDQUFDLEdBQVcsRUFBRSxTQUFpQixDQUFDLEVBQUUsZUFBdUIsR0FBRztRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQzFDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQzFCLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO1NBQzFCO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQTtBQVhZLFlBQVk7SUFEeEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0dBQ1YsWUFBWSxDQVd4QjtTQVhZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3JwYWQnIH0pXG5leHBvcnQgY2xhc3MgUmlnaHRQYWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShzdHI6IHN0cmluZywgbGVuZ3RoOiBudW1iZXIgPSAxLCBwYWRDaGFyYWN0ZXI6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1N0cmluZyhzdHIpIHx8IHN0ci5sZW5ndGggPj0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgc3RyID0gc3RyICsgcGFkQ2hhcmFjdGVyO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiJdfQ==