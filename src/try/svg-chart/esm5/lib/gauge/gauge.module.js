import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
var GaugeModule = /** @class */ (function () {
    function GaugeModule() {
    }
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
    return GaugeModule;
}());
export { GaugeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvZ2F1Z2UvZ2F1Z2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBaUIvRDtJQUFBO0lBQTBCLENBQUM7SUFBZCxXQUFXO1FBZnZCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUM7WUFDNUQsWUFBWSxFQUFFO2dCQUNaLG9CQUFvQjtnQkFDcEIsY0FBYztnQkFDZCxpQkFBaUI7Z0JBQ2pCLGtCQUFrQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxvQkFBb0I7Z0JBQ3BCLGNBQWM7Z0JBQ2QsaUJBQWlCO2dCQUNqQixrQkFBa0I7YUFDbkI7U0FDRixDQUFDO09BQ1csV0FBVyxDQUFHO0lBQUQsa0JBQUM7Q0FBQSxBQUEzQixJQUEyQjtTQUFkLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMaW5lYXJHYXVnZUNvbXBvbmVudCB9IGZyb20gJy4vbGluZWFyLWdhdWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYXVnZUNvbXBvbmVudCB9IGZyb20gJy4vZ2F1Z2UuY29tcG9uZW50JztcbmltcG9ydCB7IEdhdWdlQXJjQ29tcG9uZW50IH0gZnJvbSAnLi9nYXVnZS1hcmMuY29tcG9uZW50JztcbmltcG9ydCB7IEdhdWdlQXhpc0NvbXBvbmVudCB9IGZyb20gJy4vZ2F1Z2UtYXhpcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBCYXJDaGFydE1vZHVsZSB9IGZyb20gJy4uL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlLCBQaWVDaGFydE1vZHVsZSwgQmFyQ2hhcnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBMaW5lYXJHYXVnZUNvbXBvbmVudCxcbiAgICBHYXVnZUNvbXBvbmVudCxcbiAgICBHYXVnZUFyY0NvbXBvbmVudCxcbiAgICBHYXVnZUF4aXNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExpbmVhckdhdWdlQ29tcG9uZW50LFxuICAgIEdhdWdlQ29tcG9uZW50LFxuICAgIEdhdWdlQXJjQ29tcG9uZW50LFxuICAgIEdhdWdlQXhpc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdhdWdlTW9kdWxlIHt9XG4iXX0=