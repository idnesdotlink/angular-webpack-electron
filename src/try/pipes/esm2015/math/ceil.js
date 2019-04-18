import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let CeilPipe = class CeilPipe {
    transform(num, precision = 0) {
        if (precision <= 0) {
            return Math.ceil(num);
        }
        const tho = Math.pow(10, precision);
        return Math.ceil(num * tho) / tho;
    }
};
CeilPipe = tslib_1.__decorate([
    Pipe({ name: 'ceil' })
], CeilPipe);
export { CeilPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJtYXRoL2NlaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BELElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFDbkIsU0FBUyxDQUFDLEdBQVcsRUFBRSxZQUFvQixDQUFDO1FBQzFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFBLEVBQUUsRUFBSSxTQUFTLENBQUEsQ0FBQztRQUU1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0NBQ0YsQ0FBQTtBQVZZLFFBQVE7SUFEcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0dBQ1YsUUFBUSxDQVVwQjtTQVZZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2NlaWwnIH0pXG5leHBvcnQgY2xhc3MgQ2VpbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIGlmIChwcmVjaXNpb24gPD0gMCkge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbChudW0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRobyA9IDEwICoqIHByZWNpc2lvbjtcblxuICAgIHJldHVybiBNYXRoLmNlaWwobnVtICogdGhvKSAvIHRobztcbiAgfVxufVxuIl19