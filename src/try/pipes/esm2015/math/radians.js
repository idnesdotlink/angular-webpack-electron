import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';
let RadiansPipe = class RadiansPipe {
    transform(degrees) {
        if (!isNumberFinite(degrees)) {
            return NaN;
        }
        return (degrees * Math.PI) / 180;
    }
};
RadiansPipe = tslib_1.__decorate([
    Pipe({ name: 'radians' })
], RadiansPipe);
export { RadiansPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaWFucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL3JhZGlhbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQ3RCLFNBQVMsQ0FBQyxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNuQyxDQUFDO0NBQ0YsQ0FBQTtBQVJZLFdBQVc7SUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ2IsV0FBVyxDQVF2QjtTQVJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc051bWJlckZpbml0ZSB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3JhZGlhbnMnIH0pXG5leHBvcnQgY2xhc3MgUmFkaWFuc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGRlZ3JlZXM6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFpc051bWJlckZpbml0ZShkZWdyZWVzKSkge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG5cbiAgICByZXR1cm4gKGRlZ3JlZXMgKiBNYXRoLlBJKSAvIDE4MDtcbiAgfVxufVxuIl19