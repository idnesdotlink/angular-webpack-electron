import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
let GaugeModule = class GaugeModule {
};
GaugeModule = tslib_1.__decorate([
    NgModule({
        imports: [ChartCommonModule, PieChartModule, BarChartModule],
        declarations: [
            LinearGaugeComponent,
            GaugeComponent,
            GaugeArcComponent,
            GaugeAxisComponent
        ],
        exports: [
            LinearGaugeComponent,
            GaugeComponent,
            GaugeArcComponent,
            GaugeAxisComponent
        ]
    })
], GaugeModule);
export { GaugeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvZ2F1Z2UvZ2F1Z2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBaUIvRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUcsQ0FBQTtBQUFkLFdBQVc7SUFmdkIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztRQUM1RCxZQUFZLEVBQUU7WUFDWixvQkFBb0I7WUFDcEIsY0FBYztZQUNkLGlCQUFpQjtZQUNqQixrQkFBa0I7U0FDbkI7UUFDRCxPQUFPLEVBQUU7WUFDUCxvQkFBb0I7WUFDcEIsY0FBYztZQUNkLGlCQUFpQjtZQUNqQixrQkFBa0I7U0FDbkI7S0FDRixDQUFDO0dBQ1csV0FBVyxDQUFHO1NBQWQsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IExpbmVhckdhdWdlQ29tcG9uZW50IH0gZnJvbSAnLi9saW5lYXItZ2F1Z2UuY29tcG9uZW50JztcbmltcG9ydCB7IEdhdWdlQ29tcG9uZW50IH0gZnJvbSAnLi9nYXVnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2F1Z2VBcmNDb21wb25lbnQgfSBmcm9tICcuL2dhdWdlLWFyYy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2F1Z2VBeGlzQ29tcG9uZW50IH0gZnJvbSAnLi9nYXVnZS1heGlzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaWVDaGFydE1vZHVsZSB9IGZyb20gJy4uL3BpZS1jaGFydC9waWUtY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IEJhckNoYXJ0TW9kdWxlIH0gZnJvbSAnLi4vYmFyLWNoYXJ0L2Jhci1jaGFydC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGUsIFBpZUNoYXJ0TW9kdWxlLCBCYXJDaGFydE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIExpbmVhckdhdWdlQ29tcG9uZW50LFxuICAgIEdhdWdlQ29tcG9uZW50LFxuICAgIEdhdWdlQXJjQ29tcG9uZW50LFxuICAgIEdhdWdlQXhpc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTGluZWFyR2F1Z2VDb21wb25lbnQsXG4gICAgR2F1Z2VDb21wb25lbnQsXG4gICAgR2F1Z2VBcmNDb21wb25lbnQsXG4gICAgR2F1Z2VBeGlzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2F1Z2VNb2R1bGUge31cbiJdfQ==