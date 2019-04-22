import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isNumberFinite } from '../helpers/helpers';
var RadiansPipe = /** @class */ (function () {
    function RadiansPipe() {
    }
    RadiansPipe.prototype.transform = function (degrees) {
        if (!isNumberFinite(degrees)) {
            return NaN;
        }
        return (degrees * Math.PI) / 180;
    };
    RadiansPipe = tslib_1.__decorate([
        Pipe({ name: 'radians' })
    ], RadiansPipe);
    return RadiansPipe;
}());
export { RadiansPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaWFucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL3JhZGlhbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRDtJQUFBO0lBUUEsQ0FBQztJQVBDLCtCQUFTLEdBQVQsVUFBVSxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNuQyxDQUFDO0lBUFUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBUXZCO0lBQUQsa0JBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOdW1iZXJGaW5pdGUgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdyYWRpYW5zJyB9KVxuZXhwb3J0IGNsYXNzIFJhZGlhbnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShkZWdyZWVzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghaXNOdW1iZXJGaW5pdGUoZGVncmVlcykpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgcmV0dXJuIChkZWdyZWVzICogTWF0aC5QSSkgLyAxODA7XG4gIH1cbn1cbiJdfQ==