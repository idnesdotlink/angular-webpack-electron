import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { ChartComponent } from './charts/chart.component';
import { ScaleLegendComponent } from './legend/scale-legend.component';
import { LegendComponent } from './legend/legend.component';
import { LegendEntryComponent } from './legend/legend-entry.component';
import { AdvancedLegendComponent } from './legend/advanced-legend.component';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { CircleSeriesComponent } from './circle-series/circle-series.component';
import { CircleComponent } from './circle/circle.component';
import { GridPanelComponent } from './grid-panel/grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series/grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient/svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient/svg-radial-gradient.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AreaComponent } from '../area/area.component';
import { TooltipAreaComponent } from './tooltip-area/tooltip-area.component';
import { CountUpDirective } from './count/count.directive';
var COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipAreaComponent,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    TimelineComponent,
    AdvancedLegendComponent
];
var ChartCommonModule = /** @class */ (function () {
    function ChartCommonModule() {
    }
    ChartCommonModule = tslib_1.__decorate([
        NgModule({
            providers: [
                Location,
                {
                    provide: LocationStrategy,
                    useClass: PathLocationStrategy
                }
            ],
            imports: [
                CommonModule,
                AxesModule,
                TooltipModule
            ],
            declarations: tslib_1.__spread(COMPONENTS),
            exports: tslib_1.__spread([
                CommonModule,
                AxesModule,
                TooltipModule
            ], COMPONENTS)
        })
    ], ChartCommonModule);
    return ChartCommonModule;
}());
export { ChartCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFakcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFDTCxvQkFBb0IsRUFDckIsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNELElBQU0sVUFBVSxHQUFHO0lBQ2pCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2QsZUFBZTtJQUNmLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsaUJBQWlCO0lBQ2pCLHVCQUF1QjtDQUN4QixDQUFDO0FBeUJGO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUF2QjdCLFFBQVEsQ0FBQztZQUNSLFNBQVMsRUFBRTtnQkFDVCxRQUFRO2dCQUNSO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFFBQVEsRUFBRSxvQkFBb0I7aUJBQy9CO2FBQ0Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixVQUFVO2dCQUNWLGFBQWE7YUFDZDtZQUNELFlBQVksbUJBQ1AsVUFBVSxDQUNkO1lBQ0QsT0FBTztnQkFDTCxZQUFZO2dCQUNaLFVBQVU7Z0JBQ1YsYUFBYTtlQUNWLFVBQVUsQ0FDZDtTQUNGLENBQUM7T0FDVyxpQkFBaUIsQ0FBSTtJQUFELHdCQUFDO0NBQUEsQUFBbEMsSUFBa0M7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uLCBMb2NhdGlvblN0cmF0ZWd5LCBQYXRoTG9jYXRpb25TdHJhdGVneSwgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NoYXJ0cy9jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgU2NhbGVMZWdlbmRDb21wb25lbnRcbn0gZnJvbSAnLi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xlZ2VuZC9sZWdlbmQuY29tcG9uZW50JztcbmltcG9ydCB7IExlZ2VuZEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZHZhbmNlZExlZ2VuZENvbXBvbmVudCB9IGZyb20gJy4vbGVnZW5kL2FkdmFuY2VkLWxlZ2VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNoYXJ0L2Jhc2UtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEF4ZXNNb2R1bGUgfSBmcm9tICcuL2F4ZXMvYXhlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBDaXJjbGVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2NpcmNsZS1zZXJpZXMvY2lyY2xlLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2lyY2xlQ29tcG9uZW50IH0gZnJvbSAnLi9jaXJjbGUvY2lyY2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtcGFuZWwvZ3JpZC1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZFBhbmVsU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLXBhbmVsLXNlcmllcy9ncmlkLXBhbmVsLXNlcmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ZnTGluZWFyR3JhZGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N2Zy1saW5lYXItZ3JhZGllbnQvc3ZnLWxpbmVhci1ncmFkaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ZnUmFkaWFsR3JhZGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N2Zy1yYWRpYWwtZ3JhZGllbnQvc3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZWxpbmVDb21wb25lbnQgfSBmcm9tICcuL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcmVhQ29tcG9uZW50IH0gZnJvbSAnLi4vYXJlYS9hcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb29sdGlwQXJlYUNvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC1hcmVhL3Rvb2x0aXAtYXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291bnRVcERpcmVjdGl2ZSB9IGZyb20gJy4vY291bnQvY291bnQuZGlyZWN0aXZlJztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQXJlYUNvbXBvbmVudCxcbiAgQmFzZUNoYXJ0Q29tcG9uZW50LFxuICBDb3VudFVwRGlyZWN0aXZlLFxuICBUb29sdGlwQXJlYUNvbXBvbmVudCxcbiAgQ2hhcnRDb21wb25lbnQsXG4gIExlZ2VuZENvbXBvbmVudCxcbiAgTGVnZW5kRW50cnlDb21wb25lbnQsXG4gIFNjYWxlTGVnZW5kQ29tcG9uZW50LFxuICBDaXJjbGVDb21wb25lbnQsXG4gIENpcmNsZVNlcmllc0NvbXBvbmVudCxcbiAgR3JpZFBhbmVsQ29tcG9uZW50LFxuICBHcmlkUGFuZWxTZXJpZXNDb21wb25lbnQsXG4gIFN2Z0xpbmVhckdyYWRpZW50Q29tcG9uZW50LFxuICBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCxcbiAgVGltZWxpbmVDb21wb25lbnQsXG4gIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBMb2NhdGlvbixcbiAgICB7XG4gICAgICBwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LFxuICAgICAgdXNlQ2xhc3M6IFBhdGhMb2NhdGlvblN0cmF0ZWd5XG4gICAgfVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEF4ZXNNb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5DT01QT05FTlRTXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQXhlc01vZHVsZSxcbiAgICBUb29sdGlwTW9kdWxlLFxuICAgIC4uLkNPTVBPTkVOVFNcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydENvbW1vbk1vZHVsZSB7IH1cbiJdfQ==