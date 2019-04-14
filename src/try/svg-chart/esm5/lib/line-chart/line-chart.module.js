import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineSeriesComponent } from './line-series.component';
var LineChartModule = /** @class */ (function () {
    function LineChartModule() {
    }
    LineChartModule = tslib_1.__decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                LineComponent,
                LineChartComponent,
                LineSeriesComponent
            ],
            exports: [
                LineComponent,
                LineChartComponent,
                LineSeriesComponent
            ]
        })
    ], LineChartModule);
    return LineChartModule;
}());
export { LineChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWU5RDtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQWIzQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUM1QixZQUFZLEVBQUU7Z0JBQ1osYUFBYTtnQkFDYixrQkFBa0I7Z0JBQ2xCLG1CQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxhQUFhO2dCQUNiLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2FBQ3BCO1NBQ0YsQ0FBQztPQUNXLGVBQWUsQ0FBRztJQUFELHNCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IExpbmVDb21wb25lbnQgfSBmcm9tICcuL2xpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmVDaGFydENvbXBvbmVudCB9IGZyb20gJy4vbGluZS1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGluZVNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vbGluZS1zZXJpZXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGluZUNvbXBvbmVudCxcbiAgICBMaW5lQ2hhcnRDb21wb25lbnQsXG4gICAgTGluZVNlcmllc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTGluZUNvbXBvbmVudCxcbiAgICBMaW5lQ2hhcnRDb21wb25lbnQsXG4gICAgTGluZVNlcmllc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmVDaGFydE1vZHVsZSB7fVxuIl19