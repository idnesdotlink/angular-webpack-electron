import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
let HeatMapModule = class HeatMapModule {
};
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
export { HeatMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBZXhELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBRyxDQUFBO0FBQWhCLGFBQWE7SUFiekIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDNUIsWUFBWSxFQUFFO1lBQ1osb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixnQkFBZ0I7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxvQkFBb0I7WUFDcEIsdUJBQXVCO1lBQ3ZCLGdCQUFnQjtTQUNqQjtLQUNGLENBQUM7R0FDVyxhQUFhLENBQUc7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IEhlYXRNYXBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWF0Q2VsbFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYXRNYXBDb21wb25lbnQgfSBmcm9tICcuL2hlYXQtbWFwLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEhlYXRNYXBDZWxsQ29tcG9uZW50LFxuICAgIEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50LFxuICAgIEhlYXRNYXBDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEhlYXRNYXBDZWxsQ29tcG9uZW50LFxuICAgIEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50LFxuICAgIEhlYXRNYXBDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWF0TWFwTW9kdWxlIHt9XG4iXX0=