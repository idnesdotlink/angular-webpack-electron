import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';
let DegreesPipe = class DegreesPipe {
    transform(radians) {
        if (!isNumberFinite(radians)) {
            return NaN;
        }
        return (radians * 180) / Math.PI;
    }
};
DegreesPipe = tslib_1.__decorate([
    Pipe({ name: 'degrees' })
], DegreesPipe);
export { DegreesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVncmVlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL2RlZ3JlZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQ3RCLFNBQVMsQ0FBQyxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0NBQ0YsQ0FBQTtBQVJZLFdBQVc7SUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ2IsV0FBVyxDQVF2QjtTQVJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc051bWJlckZpbml0ZSB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ2RlZ3JlZXMnIH0pXG5leHBvcnQgY2xhc3MgRGVncmVlc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHJhZGlhbnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFpc051bWJlckZpbml0ZShyYWRpYW5zKSkge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG5cbiAgICByZXR1cm4gKHJhZGlhbnMgKiAxODApIC8gTWF0aC5QSTtcbiAgfVxufVxuIl19