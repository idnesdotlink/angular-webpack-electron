import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { MouseEvent } from '../../events';

@Component({
  selector: 'g[ng-svg-charts-tooltip-area]',
  templateUrl: 'tooltip-area.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('inactive => active', [
        style({
          opacity: 0,
        }),
        animate(250, style({opacity: 0.7}))
      ]),
      transition('active => inactive', [
        style({
          opacity: 0.7,
        }),
        animate(250, style({opacity: 0}))
      ])
    ])
  ]
})
export class TooltipAreaComponent {
  anchorOpacity = 0;
  anchorPos = -1;
  anchorValues: any[] = [];
  lastAnchorPos: number;

  @Input() dims;
  @Input() xSet;
  @Input() xScale;
  @Input() yScale;
  @Input() results;
  @Input() colors;
  @Input() showPercentage = false;
  @Input() tooltipDisabled = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() hover = new EventEmitter();

  @ViewChild('tooltipAnchor') tooltipAnchor;

  getValues(xVal): any[] {
    const results = [];

    for (const group of this.results) {
      const item = group.series.find(d => d.name.toString() === xVal.toString());
      let groupName = group.name;
      if (groupName instanceof Date) {
        groupName = groupName.toLocaleDateString();
      }

      if (item) {
        const label = item.name;
        let val = item.value;
        if (this.showPercentage) {
          val = (item.d1 - item.d0).toFixed(2) + '%';
        }
        let color;
        if (this.colors.scaleType === 'linear') {
          let v = val;
          if (item.d1) {
            v = item.d1;
          }
          color = this.colors.getColor(v);
        } else {
          color = this.colors.getColor(group.name);
        }

        results.push({
          value: val,
          name: label,
          series: groupName,
          min: item.min,
          max: item.max,
          color
        });
      }
    }

    return results;
  }

  mouseMove(event) {
    const xPos = event.pageX - event.target.getBoundingClientRect().left;

    const closestIndex = this.findClosestPointIndex(xPos);
    const closestPoint = this.xSet[closestIndex];
    this.anchorPos = this.xScale(closestPoint);
    this.anchorPos = Math.max(0, this.anchorPos);
    this.anchorPos = Math.min(this.dims.width, this.anchorPos);

    this.anchorValues = this.getValues(closestPoint);
    if (this.anchorPos !== this.lastAnchorPos) {
      const ev = new MouseEvent('mouseleave', {bubbles: false});
      this.tooltipAnchor.nativeElement.dispatchEvent(ev);
      this.anchorOpacity = 0.7;
      this.hover.emit({
        value: closestPoint
      });
      this.showTooltip();

      this.lastAnchorPos = this.anchorPos;
    }
  }

  findClosestPointIndex(xPos) {
    let minIndex = 0;
    let maxIndex = this.xSet.length - 1;
    let minDiff = Number.MAX_VALUE;
    let closestIndex = 0;

    while (minIndex <= maxIndex) {
      // tslint:disable-next-line: no-bitwise
      const currentIndex = (minIndex + maxIndex) / 2 | 0;
      const currentElement = this.xScale(this.xSet[currentIndex]);

      const curDiff = Math.abs(currentElement - xPos);

      if (curDiff < minDiff) {
        minDiff = curDiff;
        closestIndex = currentIndex;
      }

      if (currentElement < xPos) {
        minIndex = currentIndex + 1;
      } else if (currentElement > xPos) {
        maxIndex = currentIndex - 1;
      } else {
        minDiff = 0;
        closestIndex = currentIndex;
        break;
      }
    }

    return closestIndex;
  }

  showTooltip(): void {
    const event = new MouseEvent('mouseenter', {bubbles: false});
    this.tooltipAnchor.nativeElement.dispatchEvent(event);
  }

  hideTooltip(): void {
    const event = new MouseEvent('mouseleave', {bubbles: false});
    this.tooltipAnchor.nativeElement.dispatchEvent(event);
    this.anchorOpacity = 0;
    this.lastAnchorPos = -1;
  }

  getToolTipText(tooltipItem: any): string {
    let result = '';
    if (tooltipItem.series !== undefined) {
      result += tooltipItem.series;
    } else {
      result += '???';
    }
    result += ': ';
    if (tooltipItem.value !== undefined) {
      result += tooltipItem.value.toLocaleString();
    }
    if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
      result += ' (';
      if (tooltipItem.min !== undefined) {
        if (tooltipItem.max === undefined) {
          result += '≥';
        }
        result += tooltipItem.min.toLocaleString();
        if (tooltipItem.max !== undefined) {
          result += ' - ';
        }
      } else if (tooltipItem.max !== undefined) {
        result += '≤';
      }
      if (tooltipItem.max !== undefined) {
        result += tooltipItem.max.toLocaleString();
      }
      result += ')';
    }
    return result;
  }

}
