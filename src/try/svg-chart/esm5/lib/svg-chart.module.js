import * as tslib_1 from "tslib";
import './polyfills';
import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { BarChartModule } from './bar-chart/bar-chart.module';
// import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
// import { HeatMapModule } from './heat-map/heat-map.module';
import { LineChartModule } from './line-chart/line-chart.module';
// import { PolarChartModule } from './polar-chart/polar-chart.module';
// import { NumberCardModule } from './number-card/number-card.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
// import { TreeMapModule } from './tree-map/tree-map.module';
// import { GaugeModule } from './gauge/gauge.module';
var SvgChartsModule = /** @class */ (function () {
    function SvgChartsModule() {
    }
    SvgChartsModule = tslib_1.__decorate([
        NgModule({
            exports: [
                ChartCommonModule,
                AreaChartModule,
                BarChartModule,
                // BubbleChartModule,
                // HeatMapModule,
                LineChartModule,
                // PolarChartModule,
                // NumberCardModule,
                PieChartModule,
            ]
        })
    ], SvgChartsModule);
    return SvgChartsModule;
}());
export { SvgChartsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3N2Zy1jaGFydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sYUFBYSxDQUFDO0FBRXJCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCwwRUFBMEU7QUFDMUUsOERBQThEO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSx1RUFBdUU7QUFDdkUsdUVBQXVFO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCw4REFBOEQ7QUFDOUQsc0RBQXNEO0FBaUJ0RDtJQUFBO0lBQStCLENBQUM7SUFBbkIsZUFBZTtRQWYzQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2QscUJBQXFCO2dCQUNyQixpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQixvQkFBb0I7Z0JBQ3BCLGNBQWM7YUFHZjtTQUNGLENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vcG9seWZpbGxzJztcblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBBcmVhQ2hhcnRNb2R1bGUgfSBmcm9tICcuL2FyZWEtY2hhcnQvYXJlYS1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgQmFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlJztcbi8vIGltcG9ydCB7IEJ1YmJsZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9idWJibGUtY2hhcnQvYnViYmxlLWNoYXJ0Lm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBIZWF0TWFwTW9kdWxlIH0gZnJvbSAnLi9oZWF0LW1hcC9oZWF0LW1hcC5tb2R1bGUnO1xuaW1wb3J0IHsgTGluZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlJztcbi8vIGltcG9ydCB7IFBvbGFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuL3BvbGFyLWNoYXJ0L3BvbGFyLWNoYXJ0Lm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBOdW1iZXJDYXJkTW9kdWxlIH0gZnJvbSAnLi9udW1iZXItY2FyZC9udW1iZXItY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuL3BpZS1jaGFydC9waWUtY2hhcnQubW9kdWxlJztcbi8vIGltcG9ydCB7IFRyZWVNYXBNb2R1bGUgfSBmcm9tICcuL3RyZWUtbWFwL3RyZWUtbWFwLm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBHYXVnZU1vZHVsZSB9IGZyb20gJy4vZ2F1Z2UvZ2F1Z2UubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1xuICAgIENoYXJ0Q29tbW9uTW9kdWxlLFxuICAgIEFyZWFDaGFydE1vZHVsZSxcbiAgICBCYXJDaGFydE1vZHVsZSxcbiAgICAvLyBCdWJibGVDaGFydE1vZHVsZSxcbiAgICAvLyBIZWF0TWFwTW9kdWxlLFxuICAgIExpbmVDaGFydE1vZHVsZSxcbiAgICAvLyBQb2xhckNoYXJ0TW9kdWxlLFxuICAgIC8vIE51bWJlckNhcmRNb2R1bGUsXG4gICAgUGllQ2hhcnRNb2R1bGUsXG4gICAgLy8gVHJlZU1hcE1vZHVsZSxcbiAgICAvLyBHYXVnZU1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFN2Z0NoYXJ0c01vZHVsZSB7IH1cbiJdfQ==