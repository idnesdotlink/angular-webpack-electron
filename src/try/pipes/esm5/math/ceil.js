import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var CeilPipe = /** @class */ (function () {
    function CeilPipe() {
    }
    CeilPipe.prototype.transform = function (num, precision) {
        if (precision === void 0) { precision = 0; }
        if (precision <= 0) {
            return Math.ceil(num);
        }
        var tho = Math.pow(10, precision);
        return Math.ceil(num * tho) / tho;
    };
    CeilPipe = tslib_1.__decorate([
        Pipe({ name: 'ceil' })
    ], CeilPipe);
    return CeilPipe;
}());
export { CeilPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL2NlaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFVQSxDQUFDO0lBVEMsNEJBQVMsR0FBVCxVQUFVLEdBQVcsRUFBRSxTQUFxQjtRQUFyQiwwQkFBQSxFQUFBLGFBQXFCO1FBQzFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxJQUFNLEdBQUcsR0FBRyxTQUFBLEVBQUUsRUFBSSxTQUFTLENBQUEsQ0FBQztRQUU1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0lBVFUsUUFBUTtRQURwQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDVixRQUFRLENBVXBCO0lBQUQsZUFBQztDQUFBLEFBVkQsSUFVQztTQVZZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2NlaWwnIH0pXG5leHBvcnQgY2xhc3MgQ2VpbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIGlmIChwcmVjaXNpb24gPD0gMCkge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbChudW0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRobyA9IDEwICoqIHByZWNpc2lvbjtcblxuICAgIHJldHVybiBNYXRoLmNlaWwobnVtICogdGhvKSAvIHRobztcbiAgfVxufVxuIl19