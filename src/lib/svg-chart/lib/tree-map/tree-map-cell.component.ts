import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';

import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';
import { id } from '../utils/id';

@Component({
  selector: 'g[ng-svg-charts-tree-map-cell]',
  templateUrl: 'tree-map-cell.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellComponent implements OnChanges {
  @Input() data;
  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() value;
  @Input() valueType;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() gradient = false;
  @Input() animations = true;

  @Output() select = new EventEmitter();

  gradientStops: any[];
  gradientId: string;
  gradientUrl: string;

  element: HTMLElement;
  transform: string;
  formattedLabel: string;
  formattedValue: string;
  initialized = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(): void {
    this.update();

    this.valueFormatting = this.valueFormatting || (value => value.toLocaleString());
    const labelFormatting = this.labelFormatting || (cell => trimLabel(cell.label, 55));

    const cellData = {
      data: this.data,
      label: this.label,
      value: this.value
    };

    this.formattedValue = this.valueFormatting(cellData.value);
    this.formattedLabel = labelFormatting(cellData);

    this.gradientId = 'grad' + id().toString();
    this.gradientUrl = `url(#${this.gradientId})`;
    this.gradientStops = this.getGradientStops();
  }

  update(): void {
    if (this.initialized) {
      this.animateToCurrentForm();
    } else {
      if (this.animations) {
        this.loadAnimation();
      }
      this.initialized = true;
    }
  }

  loadAnimation(): void {
    const node = select(this.element).select('.cell');

    node
      .attr('opacity', 0)
      .attr('x', this.x)
      .attr('y', this.y);

    this.animateToCurrentForm();
  }

  getTextColor(): string {
    return invertColor(this.fill);
  }

  animateToCurrentForm(): void {
    const node: any = select(this.element).select('.cell');

    if (this.animations) {
      node
        .transition()
        .duration(750)
        .attr('opacity', 1)
        .attr('x', this.x)
        .attr('y', this.y)
        .attr('width', this.width)
        .attr('height', this.height);
    } else {
      node
        .attr('opacity', 1)
        .attr('x', this.x)
        .attr('y', this.y)
        .attr('width', this.width)
        .attr('height', this.height);
    }
  }

  onClick(): void {
    this.select.emit({
      name: this.label,
      value: this.value
    });
  }

  getGradientStops() {
    return [
      {
        offset: 0,
        color: this.fill,
        opacity: 0.3
      },
      {
        offset: 100,
        color: this.fill,
        opacity: 1
      }
    ];
  }
}
