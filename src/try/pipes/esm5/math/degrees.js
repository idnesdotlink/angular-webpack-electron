import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';
var DegreesPipe = /** @class */ (function () {
    function DegreesPipe() {
    }
    DegreesPipe.prototype.transform = function (radians) {
        if (!isNumberFinite(radians)) {
            return NaN;
        }
        return (radians * 180) / Math.PI;
    };
    DegreesPipe = tslib_1.__decorate([
        Pipe({ name: 'degrees' })
    ], DegreesPipe);
    return DegreesPipe;
}());
export { DegreesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVncmVlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL2RlZ3JlZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRDtJQUFBO0lBUUEsQ0FBQztJQVBDLCtCQUFTLEdBQVQsVUFBVSxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBUFUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBUXZCO0lBQUQsa0JBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOdW1iZXJGaW5pdGUgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdkZWdyZWVzJyB9KVxuZXhwb3J0IGNsYXNzIERlZ3JlZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShyYWRpYW5zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghaXNOdW1iZXJGaW5pdGUocmFkaWFucykpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgcmV0dXJuIChyYWRpYW5zICogMTgwKSAvIE1hdGguUEk7XG4gIH1cbn1cbiJdfQ==