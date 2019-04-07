import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';

@Component({
  selector: 'ng-svg-charts-advanced-pie-chart',
  templateUrl: 'advanced-pie-chart.template.html',
  styleUrls: ['../common/base-chart/base-chart.component.scss', './advanced-pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedPieChartComponent extends BaseChartComponent {
  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled = false;
  @Input() tooltipText: any;
  @Input() label = 'Total';

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  data: any;
  dims: ViewDimensions;
  domain: any[];
  outerRadius: number;
  innerRadius: number;
  transform: string;
  colors: ColorHelper;
  legendWidth: number;
  margin = [20, 20, 20, 20];

  @Input() valueFormatting: (value: number) => any;
  @Input() nameFormatting: (value: string) => any;
  @Input() percentageFormatting: (value: number) => any;

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: (this.width * 4) / 12.0,
      height: this.height,
      margins: this.margin
    });

    this.domain = this.getDomain();
    this.setColors();

    const xOffset = this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;
    this.legendWidth = this.width - this.dims.width - this.margin[1];

    this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
    this.innerRadius = this.outerRadius * 0.75;

    this.transform = `translate(${xOffset} , ${yOffset})`;
  }

  getDomain(): any[] {
    return this.results.map(d => d.name);
  }

  onClick(data) {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

  onActivate(event: Event): void {
    if (this.activeEntries.indexOf(event) > -1) { return; }
    this.activeEntries = [event, ...this.activeEntries];
    this.activate.emit({ value: event, entries: this.activeEntries });
  }

  onDeactivate(event: Event): void {
    const idx = this.activeEntries.indexOf(event);

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: event, entries: this.activeEntries });
  }
}
