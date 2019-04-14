import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TreeMapCellComponent } from './tree-map-cell.component';
import { TreeMapCellSeriesComponent } from './tree-map-cell-series.component';
import { TreeMapComponent } from './tree-map.component';
var TreeMapModule = /** @class */ (function () {
    function TreeMapModule() {
    }
    TreeMapModule = tslib_1.__decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                TreeMapCellComponent,
                TreeMapCellSeriesComponent,
                TreeMapComponent
            ],
            exports: [
                TreeMapCellComponent,
                TreeMapCellSeriesComponent,
                TreeMapComponent
            ]
        })
    ], TreeMapModule);
    return TreeMapModule;
}());
export { TreeMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBZXhEO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixhQUFhO1FBYnpCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzVCLFlBQVksRUFBRTtnQkFDWixvQkFBb0I7Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsZ0JBQWdCO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQjtnQkFDcEIsMEJBQTBCO2dCQUMxQixnQkFBZ0I7YUFDakI7U0FDRixDQUFDO09BQ1csYUFBYSxDQUFHO0lBQUQsb0JBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgVHJlZU1hcENlbGxDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbWFwLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVNYXBDZWxsU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW1hcC1jZWxsLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU1hcENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1tYXAuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHJlZU1hcENlbGxDb21wb25lbnQsXG4gICAgVHJlZU1hcENlbGxTZXJpZXNDb21wb25lbnQsXG4gICAgVHJlZU1hcENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVHJlZU1hcENlbGxDb21wb25lbnQsXG4gICAgVHJlZU1hcENlbGxTZXJpZXNDb21wb25lbnQsXG4gICAgVHJlZU1hcENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNYXBNb2R1bGUge31cbiJdfQ==