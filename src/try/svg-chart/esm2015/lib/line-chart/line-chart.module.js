import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineSeriesComponent } from './line-series.component';
let LineChartModule = class LineChartModule {
};
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
export { LineChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWU5RCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUcsQ0FBQTtBQUFsQixlQUFlO0lBYjNCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1FBQzVCLFlBQVksRUFBRTtZQUNaLGFBQWE7WUFDYixrQkFBa0I7WUFDbEIsbUJBQW1CO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsYUFBYTtZQUNiLGtCQUFrQjtZQUNsQixtQkFBbUI7U0FDcEI7S0FDRixDQUFDO0dBQ1csZUFBZSxDQUFHO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMaW5lQ29tcG9uZW50IH0gZnJvbSAnLi9saW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5lQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2xpbmUtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2xpbmUtc2VyaWVzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIExpbmVDb21wb25lbnQsXG4gICAgTGluZUNoYXJ0Q29tcG9uZW50LFxuICAgIExpbmVTZXJpZXNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExpbmVDb21wb25lbnQsXG4gICAgTGluZUNoYXJ0Q29tcG9uZW50LFxuICAgIExpbmVTZXJpZXNDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lQ2hhcnRNb2R1bGUge31cbiJdfQ==