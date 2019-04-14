import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';

import { ChartComponent } from './charts/chart.component';
import {
  ScaleLegendComponent
} from './legend/scale-legend.component';
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

const COMPONENTS = [
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

@NgModule({
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
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    CommonModule,
    AxesModule,
    TooltipModule,
    ...COMPONENTS
  ]
})
export class ChartCommonModule { }
