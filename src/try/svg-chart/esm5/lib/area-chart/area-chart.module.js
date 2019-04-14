import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';
var AreaChartModule = /** @class */ (function () {
    function AreaChartModule() {
    }
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
    return AreaChartModule;
}());
export { AreaChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9hcmVhLWNoYXJ0L2FyZWEtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBaUJsRTtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQWYzQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUM1QixZQUFZLEVBQUU7Z0JBQ1osa0JBQWtCO2dCQUNsQiw0QkFBNEI7Z0JBQzVCLHlCQUF5QjtnQkFDekIsbUJBQW1CO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGtCQUFrQjtnQkFDbEIsNEJBQTRCO2dCQUM1Qix5QkFBeUI7Z0JBQ3pCLG1CQUFtQjthQUNwQjtTQUNGLENBQUM7T0FDVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXJlYUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9hcmVhLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50IH0gZnJvbSAnLi9hcmVhLWNoYXJ0LW5vcm1hbGl6ZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFyZWFDaGFydFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2FyZWEtY2hhcnQtc3RhY2tlZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJlYVNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vYXJlYS1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcmVhQ2hhcnRDb21wb25lbnQsXG4gICAgQXJlYUNoYXJ0Tm9ybWFsaXplZENvbXBvbmVudCxcbiAgICBBcmVhQ2hhcnRTdGFja2VkQ29tcG9uZW50LFxuICAgIEFyZWFTZXJpZXNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFyZWFDaGFydENvbXBvbmVudCxcbiAgICBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50LFxuICAgIEFyZWFDaGFydFN0YWNrZWRDb21wb25lbnQsXG4gICAgQXJlYVNlcmllc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFyZWFDaGFydE1vZHVsZSB7fVxuIl19