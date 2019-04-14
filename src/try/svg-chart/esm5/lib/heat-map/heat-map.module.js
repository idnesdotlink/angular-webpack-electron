import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
var HeatMapModule = /** @class */ (function () {
    function HeatMapModule() {
    }
    HeatMapModule = tslib_1.__decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                HeatMapCellComponent,
                HeatCellSeriesComponent,
                HeatMapComponent
            ],
            exports: [
                HeatMapCellComponent,
                HeatCellSeriesComponent,
                HeatMapComponent
            ]
        })
    ], HeatMapModule);
    return HeatMapModule;
}());
export { HeatMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBZXhEO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixhQUFhO1FBYnpCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzVCLFlBQVksRUFBRTtnQkFDWixvQkFBb0I7Z0JBQ3BCLHVCQUF1QjtnQkFDdkIsZ0JBQWdCO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQjtnQkFDcEIsdUJBQXVCO2dCQUN2QixnQkFBZ0I7YUFDakI7U0FDRixDQUFDO09BQ1csYUFBYSxDQUFHO0lBQUQsb0JBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgSGVhdE1hcENlbGxDb21wb25lbnQgfSBmcm9tICcuL2hlYXQtbWFwLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC1jZWxsLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVhdE1hcENvbXBvbmVudCB9IGZyb20gJy4vaGVhdC1tYXAuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSGVhdE1hcENlbGxDb21wb25lbnQsXG4gICAgSGVhdENlbGxTZXJpZXNDb21wb25lbnQsXG4gICAgSGVhdE1hcENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSGVhdE1hcENlbGxDb21wb25lbnQsXG4gICAgSGVhdENlbGxTZXJpZXNDb21wb25lbnQsXG4gICAgSGVhdE1hcENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlYXRNYXBNb2R1bGUge31cbiJdfQ==