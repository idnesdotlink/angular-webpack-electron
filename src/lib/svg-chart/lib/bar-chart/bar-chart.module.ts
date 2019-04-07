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

@NgModule({
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
export class BarChartModule {}
