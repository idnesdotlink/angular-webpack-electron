import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';
let AreaChartModule = class AreaChartModule {
};
AreaChartModule = tslib_1.__decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            AreaChartComponent,
            AreaChartNormalizedComponent,
            AreaChartStackedComponent,
            AreaSeriesComponent
        ],
        exports: [
            AreaChartComponent,
            AreaChartNormalizedComponent,
            AreaChartStackedComponent,
            AreaSeriesComponent
        ]
    })
], AreaChartModule);
export { AreaChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9hcmVhLWNoYXJ0L2FyZWEtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBaUJsRSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUcsQ0FBQTtBQUFsQixlQUFlO0lBZjNCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1FBQzVCLFlBQVksRUFBRTtZQUNaLGtCQUFrQjtZQUNsQiw0QkFBNEI7WUFDNUIseUJBQXlCO1lBQ3pCLG1CQUFtQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNQLGtCQUFrQjtZQUNsQiw0QkFBNEI7WUFDNUIseUJBQXlCO1lBQ3pCLG1CQUFtQjtTQUNwQjtLQUNGLENBQUM7R0FDVyxlQUFlLENBQUc7U0FBbEIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcmVhQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2FyZWEtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFyZWFDaGFydE5vcm1hbGl6ZWRDb21wb25lbnQgfSBmcm9tICcuL2FyZWEtY2hhcnQtbm9ybWFsaXplZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJlYUNoYXJ0U3RhY2tlZENvbXBvbmVudCB9IGZyb20gJy4vYXJlYS1jaGFydC1zdGFja2VkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcmVhU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9hcmVhLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFyZWFDaGFydENvbXBvbmVudCxcbiAgICBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50LFxuICAgIEFyZWFDaGFydFN0YWNrZWRDb21wb25lbnQsXG4gICAgQXJlYVNlcmllc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQXJlYUNoYXJ0Q29tcG9uZW50LFxuICAgIEFyZWFDaGFydE5vcm1hbGl6ZWRDb21wb25lbnQsXG4gICAgQXJlYUNoYXJ0U3RhY2tlZENvbXBvbmVudCxcbiAgICBBcmVhU2VyaWVzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQXJlYUNoYXJ0TW9kdWxlIHt9XG4iXX0=