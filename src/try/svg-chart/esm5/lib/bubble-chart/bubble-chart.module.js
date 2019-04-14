import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';
var BubbleChartModule = /** @class */ (function () {
    function BubbleChartModule() {
    }
    BubbleChartModule = tslib_1.__decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                BubbleChartComponent,
                BubbleSeriesComponent
            ],
            exports: [
                BubbleChartComponent,
                BubbleSeriesComponent
            ]
        })
    ], BubbleChartModule);
    return BubbleChartModule;
}());
export { BubbleChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2J1YmJsZS1jaGFydC9idWJibGUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBYWxFO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixpQkFBaUI7UUFYN0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDNUIsWUFBWSxFQUFFO2dCQUNaLG9CQUFvQjtnQkFDcEIscUJBQXFCO2FBQ3RCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQjtnQkFDcEIscUJBQXFCO2FBQ3RCO1NBQ0YsQ0FBQztPQUNXLGlCQUFpQixDQUFHO0lBQUQsd0JBQUM7Q0FBQSxBQUFqQyxJQUFpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCdWJibGVDaGFydENvbXBvbmVudCB9IGZyb20gJy4vYnViYmxlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdWJibGVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2J1YmJsZS1zZXJpZXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQnViYmxlQ2hhcnRDb21wb25lbnQsXG4gICAgQnViYmxlU2VyaWVzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBCdWJibGVDaGFydENvbXBvbmVudCxcbiAgICBCdWJibGVTZXJpZXNDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCdWJibGVDaGFydE1vZHVsZSB7fVxuIl19