import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';

import { calculateViewDimensions, ViewDimensions } from '../../common/view-dimensions.helper';
import { ColorHelper } from '../../common/color.helper';
import { BaseChartComponent } from '../../common/base-chart/base-chart.component';

@Component({
  selector: 'ng-svg-charts-bar-horizontal',
  templateUrl: 'bar-horizontal.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../common/base-chart/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarHorizontalComponent extends BaseChartComponent {

  @Input() legend = false;
  @Input() legendTitle = 'Legend';
  @Input() legendPosition = 'right';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() tooltipDisabled = false;
  @Input() gradient: boolean;
  @Input() showGridLines = true;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() trimXAxisTicks = true;
  @Input() trimYAxisTicks = true;
  @Input() maxXAxisTickLength = 16;
  @Input() maxYAxisTickLength = 16;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() barPadding = 8;
  @Input() roundDomains = false;
  @Input() roundEdges = true;
  @Input() xScaleMax: number;
  @Input() xScaleMin: number;
  @Input() showDataLabel = false;
  @Input() dataLabelFormatting: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  yScale: any;
  xScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  colors: ColorHelper;
  margin = [10, 20, 10, 20];
  xAxisHeight = 0;
  yAxisWidth = 0;
  legendOptions: any;
  dataLabelMaxWidth: any = {negative: 0, positive: 0};

  update(): void {
    super.update();

    if (!this.showDataLabel) {
      this.dataLabelMaxWidth = {negative: 0, positive: 0};
    }

    this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType,
      legendPosition: this.legendPosition
    });

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0]})`;
  }

  getXScale(): any {
    this.xDomain = this.getXDomain();

    const scale = scaleLinear()
      .range([0, this.dims.width])
      .domain(this.xDomain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getYScale(): any {
    this.yDomain = this.getYDomain();
    const spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);

    return scaleBand()
      .rangeRound([0, this.dims.height])
      .paddingInner(spacing)
      .domain(this.yDomain);
  }

  getXDomain(): any[] {
    const values = this.results.map(d => d.value);
    const min = this.xScaleMin
      ? Math.min(this.xScaleMin, ...values)
      : Math.min(0, ...values);

    const max = this.xScaleMax
      ? Math.max(this.xScaleMax, ...values)
      : Math.max(0, ...values);
    return [min, max];
  }

  getYDomain(): any[] {
    return this.results.map(d => d.name);
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.yDomain;
    } else {
      domain = this.xDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions() {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined,
      position: this.legendPosition
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.yDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.xDomain;
      opts.colors = this.colors.scale;
    }

    return opts;
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onDataLabelMaxWidthChanged(event) {
    if (event.size.negative)  {
      this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
    } else {
      this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
    }
    if (event.index === (this.results.length - 1)) {
      setTimeout(() => this.update());
    }
  }

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

}
