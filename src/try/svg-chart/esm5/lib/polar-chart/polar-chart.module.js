import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/';
import { LineChartModule } from '../line-chart/';
var PolarChartModule = /** @class */ (function () {
    function PolarChartModule() {
    }
    PolarChartModule = tslib_1.__decorate([
        NgModule({
            imports: [ChartCommonModule, PieChartModule, LineChartModule],
            declarations: [
                PolarChartComponent,
                PolarSeriesComponent
            ],
            exports: [
                PolarChartComponent,
                PolarSeriesComponent
            ]
        })
    ], PolarChartModule);
    return PolarChartModule;
}());
export { PolarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBYWpEO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixnQkFBZ0I7UUFYNUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztZQUM3RCxZQUFZLEVBQUU7Z0JBQ1osbUJBQW1CO2dCQUNuQixvQkFBb0I7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsbUJBQW1CO2dCQUNuQixvQkFBb0I7YUFDckI7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBQUc7SUFBRCx1QkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IFBvbGFyQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL3BvbGFyLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb2xhclNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vcG9sYXItc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaWVDaGFydE1vZHVsZSB9IGZyb20gJy4uL3BpZS1jaGFydC8nO1xuaW1wb3J0IHsgTGluZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi4vbGluZS1jaGFydC8nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGUsIFBpZUNoYXJ0TW9kdWxlLCBMaW5lQ2hhcnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQb2xhckNoYXJ0Q29tcG9uZW50LFxuICAgIFBvbGFyU2VyaWVzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQb2xhckNoYXJ0Q29tcG9uZW50LFxuICAgIFBvbGFyU2VyaWVzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUG9sYXJDaGFydE1vZHVsZSB7fVxuIl19