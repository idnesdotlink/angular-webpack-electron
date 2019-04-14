import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/';
import { LineChartModule } from '../line-chart/';
let PolarChartModule = class PolarChartModule {
};
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
export { PolarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBYWpELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0NBQUcsQ0FBQTtBQUFuQixnQkFBZ0I7SUFYNUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztRQUM3RCxZQUFZLEVBQUU7WUFDWixtQkFBbUI7WUFDbkIsb0JBQW9CO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsbUJBQW1CO1lBQ25CLG9CQUFvQjtTQUNyQjtLQUNGLENBQUM7R0FDVyxnQkFBZ0IsQ0FBRztTQUFuQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQb2xhckNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9wb2xhci1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9sYXJTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL3BvbGFyLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9waWUtY2hhcnQvJztcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4uL2xpbmUtY2hhcnQvJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlLCBQaWVDaGFydE1vZHVsZSwgTGluZUNoYXJ0TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUG9sYXJDaGFydENvbXBvbmVudCxcbiAgICBQb2xhclNlcmllc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUG9sYXJDaGFydENvbXBvbmVudCxcbiAgICBQb2xhclNlcmllc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBvbGFyQ2hhcnRNb2R1bGUge31cbiJdfQ==