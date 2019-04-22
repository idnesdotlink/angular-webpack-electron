import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var PercentagePipe = /** @class */ (function () {
    function PercentagePipe() {
    }
    PercentagePipe.prototype.transform = function (num, total, floor) {
        if (total === void 0) { total = 100; }
        if (floor === void 0) { floor = false; }
        if (isNaN(num)) {
            return num;
        }
        var percent = (num * 100) / total;
        return floor ? Math.floor(percent) : percent;
    };
    PercentagePipe = tslib_1.__decorate([
        Pipe({ name: 'percentage' })
    ], PercentagePipe);
    return PercentagePipe;
}());
export { PercentagePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL3BlcmNlbnRhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFhQSxDQUFDO0lBVEMsa0NBQVMsR0FBVCxVQUFVLEdBQVEsRUFBRSxLQUFtQixFQUFFLEtBQXNCO1FBQTNDLHNCQUFBLEVBQUEsV0FBbUI7UUFBRSxzQkFBQSxFQUFBLGFBQXNCO1FBQzdELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELElBQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVwQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFaVSxjQUFjO1FBRDFCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztPQUNoQixjQUFjLENBYTFCO0lBQUQscUJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdwZXJjZW50YWdlJyB9KVxuZXhwb3J0IGNsYXNzIFBlcmNlbnRhZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShudW06IG51bWJlciwgdG90YWw/OiBudW1iZXIsIGZsb29yPzogYm9vbGVhbik6IG51bWJlcjtcbiAgdHJhbnNmb3JtPFQ+KG51bTogVCwgdG90YWw/OiBudW1iZXIsIGZsb29yPzogYm9vbGVhbik6IFQ7XG5cbiAgdHJhbnNmb3JtKG51bTogYW55LCB0b3RhbDogbnVtYmVyID0gMTAwLCBmbG9vcjogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcbiAgICBpZiAoaXNOYU4obnVtKSkge1xuICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJjZW50ID0gKG51bSAqIDEwMCkgLyB0b3RhbDtcblxuICAgIHJldHVybiBmbG9vciA/IE1hdGguZmxvb3IocGVyY2VudCkgOiBwZXJjZW50O1xuICB9XG59XG4iXX0=