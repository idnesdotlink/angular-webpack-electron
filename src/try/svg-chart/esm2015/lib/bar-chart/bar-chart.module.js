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
let BarChartModule = class BarChartModule {
};
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
export { BarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWlDcEUsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHLENBQUE7QUFBakIsY0FBYztJQS9CMUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDNUIsWUFBWSxFQUFFO1lBQ1osWUFBWTtZQUNaLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsZ0NBQWdDO1lBQ2hDLDZCQUE2QjtZQUM3QixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLDhCQUE4QjtZQUM5QiwyQkFBMkI7WUFDM0IsaUJBQWlCO1lBQ2pCLHlCQUF5QjtZQUN6Qix1QkFBdUI7U0FDeEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4QixnQ0FBZ0M7WUFDaEMsNkJBQTZCO1lBQzdCLG9CQUFvQjtZQUNwQixzQkFBc0I7WUFDdEIsOEJBQThCO1lBQzlCLDJCQUEyQjtZQUMzQixpQkFBaUI7WUFDakIseUJBQXlCO1lBQ3pCLHVCQUF1QjtTQUN4QjtLQUNGLENBQUM7R0FDVyxjQUFjLENBQUc7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyL2Jhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFySG9yaXpvbnRhbENvbXBvbmVudCB9IGZyb20gJy4vYmFyLWhvcml6b250YWwvYmFyLWhvcml6b250YWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJhckhvcml6b250YWwyRENvbXBvbmVudCB9IGZyb20gJy4vYmFyLWhvcml6b250YWwtMmQvYmFyLWhvcml6b250YWwtMmQuY29tcG9uZW50JztcbmltcG9ydCB7IEJhckhvcml6b250YWxOb3JtYWxpemVkQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItaG9yaXpvbnRhbC1ub3JtYWxpemVkL2Jhci1ob3Jpem9udGFsLW5vcm1hbGl6ZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEJhckhvcml6b250YWxTdGFja2VkQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItaG9yaXpvbnRhbC1zdGFja2VkL2Jhci1ob3Jpem9udGFsLXN0YWNrZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEJhclZlcnRpY2FsQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItdmVydGljYWwvYmFyLXZlcnRpY2FsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJWZXJ0aWNhbDJEQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItdmVydGljYWwtMmQvYmFyLXZlcnRpY2FsLTJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJWZXJ0aWNhbE5vcm1hbGl6ZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC1ub3JtYWxpemVkL2Jhci12ZXJ0aWNhbC1ub3JtYWxpemVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC1zdGFja2VkL2Jhci12ZXJ0aWNhbC1zdGFja2VkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJpZXNIb3Jpem9udGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zZXJpZXMtaG9yaXpvbnRhbC9zZXJpZXMtaG9yaXpvbnRhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VyaWVzVmVydGljYWxDb21wb25lbnQgfSBmcm9tICcuL3Nlcmllcy12ZXJ0aWNhbC9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJhckxhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItbGFiZWwvYmFyLWxhYmVsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEJhckNvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWwyRENvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsTm9ybWFsaXplZENvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsU3RhY2tlZENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbDJEQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsTm9ybWFsaXplZENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQsXG4gICAgQmFyTGFiZWxDb21wb25lbnQsXG4gICAgU2VyaWVzSG9yaXpvbnRhbENvbXBvbmVudCxcbiAgICBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQmFyQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWxDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbDJEQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWxOb3JtYWxpemVkQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWxTdGFja2VkQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsMkRDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWxOb3JtYWxpemVkQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsU3RhY2tlZENvbXBvbmVudCxcbiAgICBCYXJMYWJlbENvbXBvbmVudCxcbiAgICBTZXJpZXNIb3Jpem9udGFsQ29tcG9uZW50LFxuICAgIFNlcmllc1ZlcnRpY2FsQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQmFyQ2hhcnRNb2R1bGUge31cbiJdfQ==