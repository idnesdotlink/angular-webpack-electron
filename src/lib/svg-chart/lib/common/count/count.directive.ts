import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { count, decimalChecker } from './count.helper';

/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
@Component({
  selector: '[ng-svg-charts-count-up]',
  template: `{{value}}`
})
export class CountUpDirective implements OnDestroy {
  @Input() countDuration = 1;
  @Input() countPrefix = '';
  @Input() countSuffix = '';
  @Input() valueFormatting: any;

  @Input()
  set countDecimals(val: number) {
    this._countDecimals = val;
  }

  get countDecimals(): number {
    if (this._countDecimals) return this._countDecimals;
    return decimalChecker(this.countTo);
  }

  @Input()
  set countTo(val) {
    this._countTo = parseFloat(val);
    this.start();
  }

  get countTo(): any {
    return this._countTo;
  }

  @Input()
  set countFrom(val) {
    this._countFrom = parseFloat(val);
    this.start();
  }

  get countFrom(): any {
    return this._countFrom;
  }

  @Output() countChange = new EventEmitter();
  @Output() countFinish = new EventEmitter();

  nativeElement: any;

  value: any = '';
  formattedValue: string;

  private animationReq: any;

  private _countDecimals = 0;
  private _countTo = 0;
  private _countFrom = 0;

  constructor(private cd: ChangeDetectorRef, element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationReq);
  }

  start(): void {
    cancelAnimationFrame(this.animationReq);

    const valueFormatting =
      this.valueFormatting || (value => `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`);

    const callback = ({ value, progress, finished }) => {
      this.value = valueFormatting(value);
      this.cd.markForCheck();
      if (!finished) this.countChange.emit({ value: this.value, progress });
      if (finished) this.countFinish.emit({ value: this.value, progress });
    };

    this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
  }
}
