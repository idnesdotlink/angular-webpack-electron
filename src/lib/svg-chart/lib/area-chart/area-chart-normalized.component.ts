import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { curveLinear } from 'd3-shape';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { id } from '../utils/id';
import { getUniqueXDomainValues, getScaleType } from '../common/domain.helper';

@Component({
  selector: 'ng-svg-charts-area-chart-normalized',
  templateUrl: 'area-chart-normalized.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AreaChartNormalizedComponent extends BaseChartComponent {

  @Input() legend = false;
  @Input() legendTitle = 'Legend';
  @Input() legendPosition = 'right';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() timeline;
  @Input() gradient;
  @Input() showGridLines = true;
  @Input() curve: any = curveLinear;
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
  @Input() roundDomains = false;
  @Input() tooltipDisabled = false;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
  @ContentChild('seriesTooltipTemplate') seriesTooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  scaleType: string;
  xDomain: any[];
  xSet: any[]; // the set of all values on the X Axis
  yDomain: any[];
  seriesDomain: any;
  xScale: any;
  yScale: any;
  transform: string;
  clipPathId: string;
  clipPath: string;
  colors: ColorHelper;
  margin = [10, 20, 10, 20];
  tooltipAreas: any[];
  hoveredVertical: any; // the value of the x axis that is hovered over
  xAxisHeight = 0;
  yAxisWidth = 0;
  filteredDomain: any;
  legendOptions: any;

  timelineWidth: any;
  timelineHeight = 50;
  timelineXScale: any;
  timelineYScale: any;
  timelineXDomain: any;
  timelineTransform: any;
  timelinePadding = 10;

  update(): void {
    super.update();

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

    if (this.timeline) {
      this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
    }

    this.xDomain = this.getXDomain();
    if (this.filteredDomain) {
      this.xDomain = this.filteredDomain;
    }

    this.yDomain = this.getYDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.xSet.length; i++) {
      const val = this.xSet[i];
      let d0 = 0;
      let d: any;

      let total = 0;
      for (const group of this.results) {
        d = group.series.find(item => {
          let a = item.name;
          let b = val;
          if (this.scaleType === 'time') {
            a = a.valueOf();
            b = b.valueOf();
          }
          return a === b;
        });
        if (d) {
          total += d.value;
        }
      }

      for (const group of this.results) {
        d = group.series.find(item => {
          let a = item.name;
          let b = val;
          if (this.scaleType === 'time') {
            a = a.valueOf();
            b = b.valueOf();
          }
          return a === b;
        });

        if (d) {
          d.d0 = d0;
          d.d1 = d0 + d.value;
          d0 += d.value;
        } else {
          d = {
            name: val,
            value: 0,
            d0,
            d1: d0
          };
          group.series.push(d);
        }

        if (total > 0) {
          d.d0 = (d.d0 * 100) / total;
          d.d1 = (d.d1 * 100) / total;
        } else {
          d.d0 = 0;
          d.d1 = 0;
        }
      }
    }

    this.updateTimeline();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
  }

  updateTimeline(): void {
    if (this.timeline) {
      this.timelineWidth = this.dims.width;
      this.timelineXDomain = this.getXDomain();
      this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
      this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
      this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
    }
  }

  getXDomain(): any[] {
    let values = getUniqueXDomainValues(this.results);

    this.scaleType = getScaleType(values);
    let domain = [];
    let min: number;
    let max: number;

    if (this.scaleType === 'time') {
      min = Math.min(...values);
      max = Math.max(...values);
      domain = [new Date(min), new Date(max)];
      this.xSet = [...values].sort((a, b) => {
        const aDate = a.getTime();
        const bDate = b.getTime();
        if (aDate > bDate) { return 1; }
        if (bDate > aDate) { return -1; }
        return 0;
      });
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      min = Math.min(...values);
      max = Math.max(...values);
      domain = [min, max];
      // Use compare function to sort numbers numerically
      this.xSet = [...values].sort((a, b) => (a - b));
    } else {
      domain = values;
      this.xSet = values;
    }

    return domain;
  }

  getYDomain(): any[] {
    return [0, 100];
  }

  getSeriesDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getXScale(domain, width): any {
    let scale;

    if (this.scaleType === 'time') {
      scale = scaleTime();
    } else if (this.scaleType === 'linear') {
      scale = scaleLinear();
    } else if (this.scaleType === 'ordinal') {
      scale = scalePoint()
        .padding(0.1);
    }

    scale
      .range([0, width])
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getYScale(domain, height): any {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(domain);
    return this.roundDomains ? scale.nice() : scale;
  }

  updateDomain(domain): void {
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScale = this.getXScale(this.xDomain, this.dims.width);
  }

  updateHoveredVertical(item): void {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  }

  onClick(data, series?): void {
    if (series) {
      data.series = series.name;
    }

    this.select.emit(data);
  }

  trackBy(index, item): string {
    return item.name;
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.seriesDomain;
    } else {
      domain = this.yDomain;
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
      opts.domain = this.seriesDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.yDomain;
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

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  deactivateAll() {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }

}
