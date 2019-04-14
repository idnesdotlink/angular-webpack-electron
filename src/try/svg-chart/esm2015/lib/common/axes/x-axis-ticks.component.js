import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
let XAxisTicksComponent = class XAxisTicksComponent {
    constructor() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.verticalSpacing = 20;
        this.rotateLabels = false;
        this.innerTickSize = 6;
        this.outerTickSize = 6;
        this.tickPadding = 3;
        this.textAnchor = 'middle';
        this.maxTicksLength = 0;
        this.maxAllowedLength = 16;
        this.height = 0;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        const height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
        if (height !== this.height) {
            this.height = height;
            this.dimensionsChanged.emit({ height });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        const scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = (d) => {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        const angle = this.getRotationAngle(this.ticks);
        this.adjustedScale = this.scale.bandwidth
            ? function (d) {
                return this.scale(d) + this.scale.bandwidth() * 0.5;
            }
            : this.scale;
        this.textTransform = '';
        if (angle !== 0) {
            this.textTransform = `rotate(${angle})`;
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
        else {
            this.textAnchor = 'middle';
        }
        setTimeout(() => this.updateDims());
    }
    getRotationAngle(ticks) {
        let angle = 0;
        this.maxTicksLength = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < ticks.length; i++) {
            const tick = this.tickFormat(ticks[i]).toString();
            let tickLength = tick.length;
            if (this.trimTicks) {
                tickLength = this.tickTrim(tick).length;
            }
            if (tickLength > this.maxTicksLength) {
                this.maxTicksLength = tickLength;
            }
        }
        const len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        const charWidth = 8; // need to measure this
        const wordWidth = len * charWidth;
        let baseWidth = wordWidth;
        const maxBaseWidth = Math.floor(this.width / ticks.length);
        // calculate optimal angle
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(100);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    }
    getMaxTicks(tickWidth) {
        return Math.floor(this.width / tickWidth);
    }
    tickTransform(tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    }
    gridLineTransform() {
        return `translate(0,${-this.verticalSpacing - 5})`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "scale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "orient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickArguments", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], XAxisTicksComponent.prototype, "tickValues", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickStroke", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "trimTicks", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "maxTickLength", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "showGridLines", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "width", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
tslib_1.__decorate([
    ViewChild('ticksel'),
    tslib_1.__metadata("design:type", ElementRef)
], XAxisTicksComponent.prototype, "ticksElement", void 0);
XAxisTicksComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-x-axis-ticks]',
        template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick"
        [attr.transform]="tickTransform(tick)">
        <title>{{tickFormat(tick)}}</title>
        <svg:text
          stroke-width="0.01"
          [attr.text-anchor]="textAnchor"
          [attr.transform]="textTransform"
          [style.font-size]="'12px'">
          {{tickTrim(tickFormat(tick))}}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="tickTransform(tick)">
      <svg:g *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line
          class="gridline-path gridline-path-vertical"
          [attr.y1]="-gridLineHeight"
          y2="0" />
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], XAxisTicksComponent);
export { XAxisTicksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3gtYXhpcy10aWNrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosVUFBVSxFQUNWLFNBQVMsRUFHVCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdDN0MsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUE5QmhDO1FBaUNXLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFJckIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixlQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUt0QixXQUFNLEdBQUcsQ0FBQyxDQUFDO0lBMEhiLENBQUM7SUF0SEMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQs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QUFLLEVBQUU7O3VEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTs7c0RBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOzswREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7OzJEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzswREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7OzJEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOztrREFBTztBQUVMO0lBQVQsTUFBTSxFQUFFOzs4REFBd0M7QUFnQjNCO0lBQXJCLFNBQVMsQ0FBQyxTQUFTLENBQUM7c0NBQWUsVUFBVTt5REFBQztBQTdCcEMsbUJBQW1CO0lBOUIvQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsK0JBQStCO1FBQ3pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxtQkFBbUIsQ0FxSi9CO1NBckpZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyByZWR1Y2VUaWNrcyB9IGZyb20gJy4vdGlja3MuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXgtYXhpcy10aWNrc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyAjdGlja3NlbD5cbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiIGNsYXNzPVwidGlja1wiXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrVHJhbnNmb3JtKHRpY2spXCI+XG4gICAgICAgIDx0aXRsZT57e3RpY2tGb3JtYXQodGljayl9fTwvdGl0bGU+XG4gICAgICAgIDxzdmc6dGV4dFxuICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjAuMDFcIlxuICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0ZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICBbc3R5bGUuZm9udC1zaXplXT1cIicxMnB4J1wiPlxuICAgICAgICAgIHt7dGlja1RyaW0odGlja0Zvcm1hdCh0aWNrKSl9fVxuICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuXG4gICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrVHJhbnNmb3JtKHRpY2spXCI+XG4gICAgICA8c3ZnOmcgKm5nSWY9XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cImdyaWRMaW5lVHJhbnNmb3JtKClcIj5cbiAgICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIGdyaWRsaW5lLXBhdGgtdmVydGljYWxcIlxuICAgICAgICAgIFthdHRyLnkxXT1cIi1ncmlkTGluZUhlaWdodFwiXG4gICAgICAgICAgeTI9XCIwXCIgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWEF4aXNUaWNrc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHNjYWxlO1xuICBASW5wdXQoKSBvcmllbnQ7XG4gIEBJbnB1dCgpIHRpY2tBcmd1bWVudHMgPSBbNV07XG4gIEBJbnB1dCgpIHRpY2tWYWx1ZXM6IGFueVtdO1xuICBASW5wdXQoKSB0aWNrU3Ryb2tlID0gJyNjY2MnO1xuICBASW5wdXQoKSB0cmltVGlja3MgPSB0cnVlO1xuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoID0gMTY7XG4gIEBJbnB1dCgpIHRpY2tGb3JtYXR0aW5nO1xuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyaWRMaW5lSGVpZ2h0O1xuICBASW5wdXQoKSB3aWR0aDtcblxuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdmVydGljYWxTcGFjaW5nID0gMjA7XG4gIHJvdGF0ZUxhYmVscyA9IGZhbHNlO1xuICBpbm5lclRpY2tTaXplID0gNjtcbiAgb3V0ZXJUaWNrU2l6ZSA9IDY7XG4gIHRpY2tQYWRkaW5nID0gMztcbiAgdGV4dEFuY2hvciA9ICdtaWRkbGUnO1xuICBtYXhUaWNrc0xlbmd0aCA9IDA7XG4gIG1heEFsbG93ZWRMZW5ndGggPSAxNjtcbiAgYWRqdXN0ZWRTY2FsZTogYW55O1xuICB0ZXh0VHJhbnNmb3JtOiBhbnk7XG4gIHRpY2tzOiBhbnk7XG4gIHRpY2tGb3JtYXQ6IChvOiBhbnkpID0+IGFueTtcbiAgaGVpZ2h0ID0gMDtcblxuICBAVmlld0NoaWxkKCd0aWNrc2VsJykgdGlja3NFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xuICB9XG5cbiAgdXBkYXRlRGltcygpOiB2b2lkIHtcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludCh0aGlzLnRpY2tzRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCwgMTApO1xuICAgIGlmIChoZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7IGhlaWdodCB9KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy50aWNrcyA9IHRoaXMuZ2V0VGlja3MoKTtcblxuICAgIGlmICh0aGlzLnRpY2tGb3JtYXR0aW5nKSB7XG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSB0aGlzLnRpY2tGb3JtYXR0aW5nO1xuICAgIH0gZWxzZSBpZiAoc2NhbGUudGlja0Zvcm1hdCkge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gc2NhbGUudGlja0Zvcm1hdC5hcHBseShzY2FsZSwgdGhpcy50aWNrQXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gKGQpID0+IHtcbiAgICAgICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLmdldFJvdGF0aW9uQW5nbGUodGhpcy50aWNrcyk7XG5cbiAgICB0aGlzLmFkanVzdGVkU2NhbGUgPSB0aGlzLnNjYWxlLmJhbmR3aWR0aFxuICAgICAgPyBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUoZCkgKyB0aGlzLnNjYWxlLmJhbmR3aWR0aCgpICogMC41O1xuICAgICAgICB9XG4gICAgICA6IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLnRleHRUcmFuc2Zvcm0gPSAnJztcbiAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgIHRoaXMudGV4dFRyYW5zZm9ybSA9IGByb3RhdGUoJHthbmdsZX0pYDtcbiAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xuICAgICAgdGhpcy52ZXJ0aWNhbFNwYWNpbmcgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ21pZGRsZSc7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XG4gIH1cblxuICBnZXRSb3RhdGlvbkFuZ2xlKHRpY2tzKTogbnVtYmVyIHtcbiAgICBsZXQgYW5nbGUgPSAwO1xuICAgIHRoaXMubWF4VGlja3NMZW5ndGggPSAwO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcHJlZmVyLWZvci1vZlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRpY2sgPSB0aGlzLnRpY2tGb3JtYXQodGlja3NbaV0pLnRvU3RyaW5nKCk7XG4gICAgICBsZXQgdGlja0xlbmd0aCA9IHRpY2subGVuZ3RoO1xuICAgICAgaWYgKHRoaXMudHJpbVRpY2tzKSB7XG4gICAgICAgIHRpY2tMZW5ndGggPSB0aGlzLnRpY2tUcmltKHRpY2spLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpY2tMZW5ndGggPiB0aGlzLm1heFRpY2tzTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWF4VGlja3NMZW5ndGggPSB0aWNrTGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxlbiA9IE1hdGgubWluKHRoaXMubWF4VGlja3NMZW5ndGgsIHRoaXMubWF4QWxsb3dlZExlbmd0aCk7XG4gICAgY29uc3QgY2hhcldpZHRoID0gODsgLy8gbmVlZCB0byBtZWFzdXJlIHRoaXNcbiAgICBjb25zdCB3b3JkV2lkdGggPSBsZW4gKiBjaGFyV2lkdGg7XG5cbiAgICBsZXQgYmFzZVdpZHRoID0gd29yZFdpZHRoO1xuICAgIGNvbnN0IG1heEJhc2VXaWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIHRpY2tzLmxlbmd0aCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgb3B0aW1hbCBhbmdsZVxuICAgIHdoaWxlIChiYXNlV2lkdGggPiBtYXhCYXNlV2lkdGggJiYgYW5nbGUgPiAtOTApIHtcbiAgICAgIGFuZ2xlIC09IDMwO1xuICAgICAgYmFzZVdpZHRoID0gTWF0aC5jb3MoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogd29yZFdpZHRoO1xuICAgIH1cblxuICAgIHJldHVybiBhbmdsZTtcbiAgfVxuXG4gIGdldFRpY2tzKCkge1xuICAgIGxldCB0aWNrcztcbiAgICBjb25zdCBtYXhUaWNrcyA9IHRoaXMuZ2V0TWF4VGlja3MoMjApO1xuICAgIGNvbnN0IG1heFNjYWxlVGlja3MgPSB0aGlzLmdldE1heFRpY2tzKDEwMCk7XG5cbiAgICBpZiAodGhpcy50aWNrVmFsdWVzKSB7XG4gICAgICB0aWNrcyA9IHRoaXMudGlja1ZhbHVlcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUudGlja3MpIHtcbiAgICAgIHRpY2tzID0gdGhpcy5zY2FsZS50aWNrcy5hcHBseSh0aGlzLnNjYWxlLCBbbWF4U2NhbGVUaWNrc10pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWNrcyA9IHRoaXMuc2NhbGUuZG9tYWluKCk7XG4gICAgICB0aWNrcyA9IHJlZHVjZVRpY2tzKHRpY2tzLCBtYXhUaWNrcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpY2tzO1xuICB9XG5cbiAgZ2V0TWF4VGlja3ModGlja1dpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMud2lkdGggLyB0aWNrV2lkdGgpO1xuICB9XG5cbiAgdGlja1RyYW5zZm9ybSh0aWNrKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJywnICsgdGhpcy52ZXJ0aWNhbFNwYWNpbmcgKyAnKSc7XG4gIH1cblxuICBncmlkTGluZVRyYW5zZm9ybSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlKDAsJHstdGhpcy52ZXJ0aWNhbFNwYWNpbmcgLSA1fSlgO1xuICB9XG5cbiAgdGlja1RyaW0obGFiZWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHJpbVRpY2tzID8gdHJpbUxhYmVsKGxhYmVsLCB0aGlzLm1heFRpY2tMZW5ndGgpIDogbGFiZWw7XG4gIH1cbn1cbiJdfQ==