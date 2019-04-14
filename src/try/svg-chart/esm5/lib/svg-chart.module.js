import * as tslib_1 from "tslib";
import './polyfills';
import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { BarChartModule } from './bar-chart/bar-chart.module';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { HeatMapModule } from './heat-map/heat-map.module';
import { LineChartModule } from './line-chart/line-chart.module';
import { PolarChartModule } from './polar-chart/polar-chart.module';
import { NumberCardModule } from './number-card/number-card.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
import { TreeMapModule } from './tree-map/tree-map.module';
import { GaugeModule } from './gauge/gauge.module';
var SvgChartsModule = /** @class */ (function () {
    function SvgChartsModule() {
    }
    SvgChartsModule = tslib_1.__decorate([
        NgModule({
            exports: [
                ChartCommonModule,
                AreaChartModule,
                BarChartModule,
                BubbleChartModule,
                HeatMapModule,
                LineChartModule,
                PolarChartModule,
                NumberCardModule,
                PieChartModule,
                TreeMapModule,
                GaugeModule
            ]
        })
    ], SvgChartsModule);
    return SvgChartsModule;
}());
export { SvgChartsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3N2Zy1jaGFydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sYUFBYSxDQUFDO0FBRXJCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUJuRDtJQUFBO0lBQStCLENBQUM7SUFBbkIsZUFBZTtRQWYzQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2QsaUJBQWlCO2dCQUNqQixhQUFhO2dCQUNiLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixnQkFBZ0I7Z0JBQ2hCLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixXQUFXO2FBQ1o7U0FDRixDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztTQUFuQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3BvbHlmaWxscyc7XG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQXJlYUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9hcmVhLWNoYXJ0L2FyZWEtY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IEJhckNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9iYXItY2hhcnQvYmFyLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBCdWJibGVDaGFydE1vZHVsZSB9IGZyb20gJy4vYnViYmxlLWNoYXJ0L2J1YmJsZS1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgSGVhdE1hcE1vZHVsZSB9IGZyb20gJy4vaGVhdC1tYXAvaGVhdC1tYXAubW9kdWxlJztcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4vbGluZS1jaGFydC9saW5lLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBQb2xhckNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9wb2xhci1jaGFydC9wb2xhci1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgTnVtYmVyQ2FyZE1vZHVsZSB9IGZyb20gJy4vbnVtYmVyLWNhcmQvbnVtYmVyLWNhcmQubW9kdWxlJztcbmltcG9ydCB7IFBpZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBUcmVlTWFwTW9kdWxlIH0gZnJvbSAnLi90cmVlLW1hcC90cmVlLW1hcC5tb2R1bGUnO1xuaW1wb3J0IHsgR2F1Z2VNb2R1bGUgfSBmcm9tICcuL2dhdWdlL2dhdWdlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICBDaGFydENvbW1vbk1vZHVsZSxcbiAgICBBcmVhQ2hhcnRNb2R1bGUsXG4gICAgQmFyQ2hhcnRNb2R1bGUsXG4gICAgQnViYmxlQ2hhcnRNb2R1bGUsXG4gICAgSGVhdE1hcE1vZHVsZSxcbiAgICBMaW5lQ2hhcnRNb2R1bGUsXG4gICAgUG9sYXJDaGFydE1vZHVsZSxcbiAgICBOdW1iZXJDYXJkTW9kdWxlLFxuICAgIFBpZUNoYXJ0TW9kdWxlLFxuICAgIFRyZWVNYXBNb2R1bGUsXG4gICAgR2F1Z2VNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdmdDaGFydHNNb2R1bGUgeyB9XG4iXX0=