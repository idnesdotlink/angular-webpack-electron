import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BarComponent } from './bar/bar.component';
import { BarHorizontalComponent } from './bar-horizontal/bar-horizontal.component';
import { BarHorizontal2DComponent } from './bar-horizontal-2d/bar-horizontal-2d.component';
import { BarHorizontalNormalizedComponent } from './bar-horizontal-normalized/bar-horizontal-normalized.component';
import { BarHorizontalStackedComponent } from './bar-horizontal-stacked/bar-horizontal-stacked.component';
import { BarVerticalComponent } from './bar-vertical/bar-vertical.component';
import { BarVertical2DComponent } from './bar-vertical-2d/bar-vertical-2d.component';
import { BarVerticalNormalizedComponent } from './bar-vertical-normalized/bar-vertical-normalized.component';
import { BarVerticalStackedComponent } from './bar-vertical-stacked/bar-vertical-stacked.component';
import { SeriesHorizontalComponent } from './series-horizontal/series-horizontal.component';
import { SeriesVerticalComponent } from './series-vertical/series-vertical.component';
import { BarLabelComponent } from './bar-label/bar-label.component';
var BarChartModule = /** @class */ (function () {
    function BarChartModule() {
    }
    BarChartModule = tslib_1.__decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                BarComponent,
                BarHorizontalComponent,
                BarHorizontal2DComponent,
                BarHorizontalNormalizedComponent,
                BarHorizontalStackedComponent,
                BarVerticalComponent,
                BarVertical2DComponent,
                BarVerticalNormalizedComponent,
                BarVerticalStackedComponent,
                BarLabelComponent,
                SeriesHorizontalComponent,
                SeriesVerticalComponent
            ],
            exports: [
                BarComponent,
                BarHorizontalComponent,
                BarHorizontal2DComponent,
                BarHorizontalNormalizedComponent,
                BarHorizontalStackedComponent,
                BarVerticalComponent,
                BarVertical2DComponent,
                BarVerticalNormalizedComponent,
                BarVerticalStackedComponent,
                BarLabelComponent,
                SeriesHorizontalComponent,
                SeriesVerticalComponent
            ]
        })
    ], BarChartModule);
    return BarChartModule;
}());
export { BarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWlDcEU7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUEvQjFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzVCLFlBQVksRUFBRTtnQkFDWixZQUFZO2dCQUNaLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2dCQUN4QixnQ0FBZ0M7Z0JBQ2hDLDZCQUE2QjtnQkFDN0Isb0JBQW9CO2dCQUNwQixzQkFBc0I7Z0JBQ3RCLDhCQUE4QjtnQkFDOUIsMkJBQTJCO2dCQUMzQixpQkFBaUI7Z0JBQ2pCLHlCQUF5QjtnQkFDekIsdUJBQXVCO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLGdDQUFnQztnQkFDaEMsNkJBQTZCO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLHNCQUFzQjtnQkFDdEIsOEJBQThCO2dCQUM5QiwyQkFBMkI7Z0JBQzNCLGlCQUFpQjtnQkFDakIseUJBQXlCO2dCQUN6Qix1QkFBdUI7YUFDeEI7U0FDRixDQUFDO09BQ1csY0FBYyxDQUFHO0lBQUQscUJBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXIvYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJIb3Jpem9udGFsQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItaG9yaXpvbnRhbC9iYXItaG9yaXpvbnRhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFySG9yaXpvbnRhbDJEQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItaG9yaXpvbnRhbC0yZC9iYXItaG9yaXpvbnRhbC0yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFySG9yaXpvbnRhbE5vcm1hbGl6ZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci1ob3Jpem9udGFsLW5vcm1hbGl6ZWQvYmFyLWhvcml6b250YWwtbm9ybWFsaXplZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFySG9yaXpvbnRhbFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci1ob3Jpem9udGFsLXN0YWNrZWQvYmFyLWhvcml6b250YWwtc3RhY2tlZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFyVmVydGljYWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC9iYXItdmVydGljYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJhclZlcnRpY2FsMkRDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC0yZC9iYXItdmVydGljYWwtMmQuY29tcG9uZW50JztcbmltcG9ydCB7IEJhclZlcnRpY2FsTm9ybWFsaXplZENvbXBvbmVudCB9IGZyb20gJy4vYmFyLXZlcnRpY2FsLW5vcm1hbGl6ZWQvYmFyLXZlcnRpY2FsLW5vcm1hbGl6ZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEJhclZlcnRpY2FsU3RhY2tlZENvbXBvbmVudCB9IGZyb20gJy4vYmFyLXZlcnRpY2FsLXN0YWNrZWQvYmFyLXZlcnRpY2FsLXN0YWNrZWQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlcmllc0hvcml6b250YWxDb21wb25lbnQgfSBmcm9tICcuL3Nlcmllcy1ob3Jpem9udGFsL3Nlcmllcy1ob3Jpem9udGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudCB9IGZyb20gJy4vc2VyaWVzLXZlcnRpY2FsL3Nlcmllcy12ZXJ0aWNhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFyTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci1sYWJlbC9iYXItbGFiZWwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQmFyQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWxDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbDJEQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWxOb3JtYWxpemVkQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWxTdGFja2VkQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsMkRDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWxOb3JtYWxpemVkQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsU3RhY2tlZENvbXBvbmVudCxcbiAgICBCYXJMYWJlbENvbXBvbmVudCxcbiAgICBTZXJpZXNIb3Jpem9udGFsQ29tcG9uZW50LFxuICAgIFNlcmllc1ZlcnRpY2FsQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBCYXJDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbENvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsMkRDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbE5vcm1hbGl6ZWRDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbFN0YWNrZWRDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWxDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWwyRENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbE5vcm1hbGl6ZWRDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWxTdGFja2VkQ29tcG9uZW50LFxuICAgIEJhckxhYmVsQ29tcG9uZW50LFxuICAgIFNlcmllc0hvcml6b250YWxDb21wb25lbnQsXG4gICAgU2VyaWVzVmVydGljYWxDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCYXJDaGFydE1vZHVsZSB7fVxuIl19