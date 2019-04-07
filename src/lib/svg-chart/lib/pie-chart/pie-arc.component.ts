import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';

import { id } from '../utils/id';
/* tslint:disable */
import { MouseEvent } from '../events';

@Component({
  selector: 'g[ng-svg-charts-pie-arc]',
  templateUrl: 'pie-arc.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieArcComponent implements OnChanges {
  @Input() fill;
  @Input() startAngle = 0;
  @Input() endAngle = Math.PI * 2;
  @Input() innerRadius;
  @Input() outerRadius;
  @Input() cornerRadius = 0;
  @Input() value;
  @Input() max;
  @Input() data;
  @Input() explodeSlices = false;
  @Input() gradient = false;
  @Input() animate = true;
  @Input() pointerEvents = true;
  @Input() isActive = false;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() dblclick = new EventEmitter();

  element: HTMLElement;
  path: any;
  startOpacity: number;
  radialGradientId: string;
  linearGradientId: string;
  gradientFill: string;
  initialized = false;
  private _timeout;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getGradient() {
    return this.gradient ? this.gradientFill : this.fill;
  }

  getPointerEvents() {
    return this.pointerEvents ? 'auto' : 'none';
  }

  update(): void {
    const calc = this.calculateArc();
    this.startOpacity = 0.5;
    this.radialGradientId = 'linearGrad' + id().toString();
    this.gradientFill = `url(#${this.radialGradientId})`;

    if (this.animate) {
      if (this.initialized) {
        this.updateAnimation();
      } else {
        this.loadAnimation();
        this.initialized = true;
      }
    } else {
      this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
    }
  }

  calculateArc(): any {
    let outerRadius = this.outerRadius;
    if (this.explodeSlices && this.innerRadius === 0) {
      outerRadius = (this.outerRadius * this.value) / this.max;
    }

    return arc()
      .innerRadius(this.innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(this.cornerRadius);
  }

  loadAnimation(): void {
    const node: any = select(this.element)
      .selectAll('.arc')
      .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);

    const calc = this.calculateArc();

    node
      .transition()
      .attrTween('d', function(d) {
        (<any>this)._current = (<any>this)._current || d;
        const copyOfD = Object.assign({}, d);
        copyOfD.endAngle = copyOfD.startAngle;
        const interpolater = interpolate(copyOfD, copyOfD);
        (<any>this)._current = interpolater(0);
        return function(t) {
          return calc(interpolater(t));
        };
      })
      .transition()
      .duration(750)
      .attrTween('d', function(d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        return function(t) {
          return calc(interpolater(t));
        };
      });
  }

  updateAnimation(): void {
    const node: any = select(this.element)
      .selectAll('.arc')
      .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);

    const calc = this.calculateArc();

    node
      .transition()
      .duration(750)
      .attrTween('d', function(d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        return function(t) {
          return calc(interpolater(t));
        };
      });
  }

  onClick(): void {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => this.select.emit(this.data), 200);
  }

  onDblClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this._timeout);

    this.dblclick.emit({
      data: this.data,
      nativeEvent: event
    });
  }
}
