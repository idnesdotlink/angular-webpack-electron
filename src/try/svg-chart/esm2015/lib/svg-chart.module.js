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
let SvgChartsModule = class SvgChartsModule {
};
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
export { SvgChartsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3N2Zy1jaGFydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sYUFBYSxDQUFDO0FBRXJCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUJuRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUksQ0FBQTtBQUFuQixlQUFlO0lBZjNCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsY0FBYztZQUNkLGlCQUFpQjtZQUNqQixhQUFhO1lBQ2IsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLGFBQWE7WUFDYixXQUFXO1NBQ1o7S0FDRixDQUFDO0dBQ1csZUFBZSxDQUFJO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vcG9seWZpbGxzJztcblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBBcmVhQ2hhcnRNb2R1bGUgfSBmcm9tICcuL2FyZWEtY2hhcnQvYXJlYS1jaGFydC5tb2R1bGUnO1xuaW1wb3J0IHsgQmFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IEJ1YmJsZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9idWJibGUtY2hhcnQvYnViYmxlLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBIZWF0TWFwTW9kdWxlIH0gZnJvbSAnLi9oZWF0LW1hcC9oZWF0LW1hcC5tb2R1bGUnO1xuaW1wb3J0IHsgTGluZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IFBvbGFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuL3BvbGFyLWNoYXJ0L3BvbGFyLWNoYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOdW1iZXJDYXJkTW9kdWxlIH0gZnJvbSAnLi9udW1iZXItY2FyZC9udW1iZXItY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgUGllQ2hhcnRNb2R1bGUgfSBmcm9tICcuL3BpZS1jaGFydC9waWUtY2hhcnQubW9kdWxlJztcbmltcG9ydCB7IFRyZWVNYXBNb2R1bGUgfSBmcm9tICcuL3RyZWUtbWFwL3RyZWUtbWFwLm1vZHVsZSc7XG5pbXBvcnQgeyBHYXVnZU1vZHVsZSB9IGZyb20gJy4vZ2F1Z2UvZ2F1Z2UubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1xuICAgIENoYXJ0Q29tbW9uTW9kdWxlLFxuICAgIEFyZWFDaGFydE1vZHVsZSxcbiAgICBCYXJDaGFydE1vZHVsZSxcbiAgICBCdWJibGVDaGFydE1vZHVsZSxcbiAgICBIZWF0TWFwTW9kdWxlLFxuICAgIExpbmVDaGFydE1vZHVsZSxcbiAgICBQb2xhckNoYXJ0TW9kdWxlLFxuICAgIE51bWJlckNhcmRNb2R1bGUsXG4gICAgUGllQ2hhcnRNb2R1bGUsXG4gICAgVHJlZU1hcE1vZHVsZSxcbiAgICBHYXVnZU1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFN2Z0NoYXJ0c01vZHVsZSB7IH1cbiJdfQ==