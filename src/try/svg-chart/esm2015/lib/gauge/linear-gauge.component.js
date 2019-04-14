import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
let LinearGaugeComponent = class LinearGaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.margin = [10, 20, 10, 20];
        this.valueResizeScale = 1;
        this.unitsResizeScale = 1;
        this.valueTextTransform = '';
        this.valueTranslate = '';
        this.unitsTextTransform = '';
        this.unitsTranslate = '';
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.scaleText('value');
            this.scaleText('units');
        });
    }
    update() {
        super.update();
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
        this.valueTranslate = `translate(0, -15)`;
        this.unitsTranslate = `translate(0, 15)`;
        setTimeout(() => this.scaleText('value'), 50);
        setTimeout(() => this.scaleText('units'), 50);
    }
    getValueDomain() {
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    }
    getDisplayValue() {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    }
    scaleText(element, repeat = true) {
        let el;
        let resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        const { width, height } = el.nativeElement.getBoundingClientRect();
        if (width === 0 || height === 0)
            return;
        const oldScale = resizeScale;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(() => { this.scaleText(element, false); }, 50);
            }
        }
    }
    onClick() {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LinearGaugeComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LinearGaugeComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LinearGaugeComponent.prototype, "value", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LinearGaugeComponent.prototype, "units", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LinearGaugeComponent.prototype, "previousValue", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LinearGaugeComponent.prototype, "valueFormatting", void 0);
tslib_1.__decorate([
    ViewChild('valueTextEl'),
    tslib_1.__metadata("design:type", ElementRef)
], LinearGaugeComponent.prototype, "valueTextEl", void 0);
tslib_1.__decorate([
    ViewChild('unitsTextEl'),
    tslib_1.__metadata("design:type", ElementRef)
], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
LinearGaugeComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-svg-charts-linear-gauge',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="false"
      [animations]="animations"
      (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g ng-svg-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="'horizontal'"
          [roundEdges]="true"
          [animations]="animations">
        </svg:g>
        <svg:g ng-svg-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="'horizontal'"
          [roundEdges]="true"
          [animations]="animations">
        </svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge">
              {{displayValue}}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge">
              {{units}}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-svg-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:rgba(0,0,0,.05)}.linear-gauge .units{fill:#666}"]
    })
], LinearGaugeComponent);
export { LinearGaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2xpbmVhci1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFxRnJELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsa0JBQWtCO0lBbkY1RDs7UUFxRlcsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFDVixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBY25CLFdBQU0sR0FBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBR2pDLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztJQTRHdEIsQ0FBQztJQXhHQyxlQUFlO1FBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLE9B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S0FBSyxFQUFFOztpREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzttREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzttREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOzsyREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOzs2REFBc0I7QUFFSjtJQUF6QixTQUFTLENBQUMsYUFBYSxDQUFDO3NDQUFjLFVBQVU7eURBQUM7QUFDeEI7SUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQztzQ0FBYyxVQUFVO3lEQUFDO0FBVnZDLG9CQUFvQjtJQW5GaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDRCQUE0QjtRQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5RVQ7UUFLRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLG9CQUFvQixDQXNJaEM7U0F0SVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcblxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQvYmFzZS1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc3ZnLWNoYXJ0cy1saW5lYXItZ2F1Z2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1zdmctY2hhcnRzLWNoYXJ0XG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxuICAgICAgW3Nob3dMZWdlbmRdPVwiZmFsc2VcIlxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgICAoY2xpY2spPVwib25DbGljaygpXCI+XG4gICAgICA8c3ZnOmcgY2xhc3M9XCJsaW5lYXItZ2F1Z2UgY2hhcnRcIj5cbiAgICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtYmFyXG4gICAgICAgICAgY2xhc3M9XCJiYWNrZ3JvdW5kLWJhclwiXG4gICAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgICAgIFtoZWlnaHRdPVwiM1wiXG4gICAgICAgICAgW3hdPVwibWFyZ2luWzNdXCJcbiAgICAgICAgICBbeV09XCJkaW1zLmhlaWdodCAvIDIgKyBtYXJnaW5bMF0gLSAyXCJcbiAgICAgICAgICBbZGF0YV09XCJ7fVwiXG4gICAgICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgW3JvdW5kRWRnZXNdPVwidHJ1ZVwiXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1iYXJcbiAgICAgICAgICBbd2lkdGhdPVwidmFsdWVTY2FsZSh2YWx1ZSlcIlxuICAgICAgICAgIFtoZWlnaHRdPVwiM1wiXG4gICAgICAgICAgW3hdPVwibWFyZ2luWzNdXCJcbiAgICAgICAgICBbeV09XCJkaW1zLmhlaWdodCAvIDIgKyBtYXJnaW5bMF0gLSAyXCJcbiAgICAgICAgICBbZmlsbF09XCJjb2xvcnMuZ2V0Q29sb3IodW5pdHMpXCJcbiAgICAgICAgICBbZGF0YV09XCJ7fVwiXG4gICAgICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgW3JvdW5kRWRnZXNdPVwidHJ1ZVwiXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiPlxuICAgICAgICA8L3N2ZzpnPlxuXG4gICAgICAgIDxzdmc6bGluZVxuICAgICAgICAgICpuZ0lmPVwiaGFzUHJldmlvdXNWYWx1ZVwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUxpbmVcIlxuICAgICAgICAgIHgxPVwiMFwiXG4gICAgICAgICAgeTE9XCI1XCJcbiAgICAgICAgICB4Mj1cIjBcIlxuICAgICAgICAgIHkyPVwiMTVcIlxuICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJjb2xvcnMuZ2V0Q29sb3IodW5pdHMpXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICAqbmdJZj1cImhhc1ByZXZpb3VzVmFsdWVcIlxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1MaW5lXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIHkxPVwiLTVcIlxuICAgICAgICAgIHgyPVwiMFwiXG4gICAgICAgICAgeTI9XCItMTVcIlxuICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJjb2xvcnMuZ2V0Q29sb3IodW5pdHMpXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxuICAgICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidmFsdWVUcmFuc2xhdGVcIj5cbiAgICAgICAgICAgIDxzdmc6dGV4dCAjdmFsdWVUZXh0RWxcbiAgICAgICAgICAgICAgY2xhc3M9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgIFtzdHlsZS50ZXh0QW5jaG9yXT1cIidtaWRkbGUnXCJcbiAgICAgICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInZhbHVlVGV4dFRyYW5zZm9ybVwiXG4gICAgICAgICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImFmdGVyLWVkZ2VcIj5cbiAgICAgICAgICAgICAge3tkaXNwbGF5VmFsdWV9fVxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgICA8L3N2ZzpnPlxuXG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ1bml0c1RyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0ICN1bml0c1RleHRFbFxuICAgICAgICAgICAgICBjbGFzcz1cInVuaXRzXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidW5pdHNUZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYmVmb3JlLWVkZ2VcIj5cbiAgICAgICAgICAgICAge3t1bml0c319XG4gICAgICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgICAgIDwvc3ZnOmc+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvbmctc3ZnLWNoYXJ0cy1jaGFydD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4uL2NvbW1vbi9iYXNlLWNoYXJ0L2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnLFxuICAgICcuL2xpbmVhci1nYXVnZS5jb21wb25lbnQuc2NzcydcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIExpbmVhckdhdWdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgbWluID0gMDtcbiAgQElucHV0KCkgbWF4ID0gMTAwO1xuICBASW5wdXQoKSB2YWx1ZSA9IDA7XG4gIEBJbnB1dCgpIHVuaXRzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByZXZpb3VzVmFsdWU7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuXG4gIEBWaWV3Q2hpbGQoJ3ZhbHVlVGV4dEVsJykgdmFsdWVUZXh0RWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3VuaXRzVGV4dEVsJykgdW5pdHNUZXh0RWw6IEVsZW1lbnRSZWY7XG5cbiAgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIHZhbHVlRG9tYWluOiBhbnk7XG4gIHZhbHVlU2NhbGU6IGFueTtcblxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgbWFyZ2luOiBhbnlbXSA9IFsxMCwgMjAsIDEwLCAyMF07XG4gIHRyYW5zZm9ybUxpbmU6IHN0cmluZztcblxuICB2YWx1ZVJlc2l6ZVNjYWxlID0gMTtcbiAgdW5pdHNSZXNpemVTY2FsZSA9IDE7XG4gIHZhbHVlVGV4dFRyYW5zZm9ybSA9ICcnO1xuICB2YWx1ZVRyYW5zbGF0ZSA9ICcnO1xuICB1bml0c1RleHRUcmFuc2Zvcm0gPSAnJztcbiAgdW5pdHNUcmFuc2xhdGUgPSAnJztcbiAgZGlzcGxheVZhbHVlOiBzdHJpbmc7XG4gIGhhc1ByZXZpb3VzVmFsdWU6IGJvb2xlYW47XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY2FsZVRleHQoJ3ZhbHVlJyk7XG4gICAgICB0aGlzLnNjYWxlVGV4dCgndW5pdHMnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIHRoaXMuaGFzUHJldmlvdXNWYWx1ZSA9IHRoaXMucHJldmlvdXNWYWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHRoaXMudmFsdWUpO1xuICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHRoaXMucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCB0aGlzLnByZXZpb3VzVmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luXG4gICAgfSk7XG5cbiAgICB0aGlzLnZhbHVlRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xuICAgIHRoaXMudmFsdWVTY2FsZSA9IHRoaXMuZ2V0VmFsdWVTY2FsZSgpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5nZXREaXNwbGF5VmFsdWUoKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG5cbiAgICBjb25zdCB4T2Zmc2V0ID0gdGhpcy5tYXJnaW5bM10gKyB0aGlzLmRpbXMud2lkdGggLyAyO1xuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLm1hcmdpblswXSArIHRoaXMuZGltcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7IHhPZmZzZXQgfSwgJHsgeU9mZnNldCB9KWA7XG4gICAgdGhpcy50cmFuc2Zvcm1MaW5lID0gYHRyYW5zbGF0ZSgkeyB0aGlzLm1hcmdpblszXSArIHRoaXMudmFsdWVTY2FsZSh0aGlzLnByZXZpb3VzVmFsdWUpIH0sICR7IHlPZmZzZXQgfSlgO1xuICAgIHRoaXMudmFsdWVUcmFuc2xhdGUgPSBgdHJhbnNsYXRlKDAsIC0xNSlgO1xuICAgIHRoaXMudW5pdHNUcmFuc2xhdGUgPSBgdHJhbnNsYXRlKDAsIDE1KWA7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dCgndmFsdWUnKSwgNTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoJ3VuaXRzJyksIDUwKTtcbiAgfVxuXG4gIGdldFZhbHVlRG9tYWluKCk6IGFueVtdIHtcbiAgICByZXR1cm4gW3RoaXMubWluLCB0aGlzLm1heF07XG4gIH1cblxuICBnZXRWYWx1ZVNjYWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHNjYWxlTGluZWFyKClcbiAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcbiAgICAgIC5kb21haW4odGhpcy52YWx1ZURvbWFpbik7XG4gIH1cblxuICBnZXREaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfVxuXG4gIHNjYWxlVGV4dChlbGVtZW50LCByZXBlYXQgPSB0cnVlKTogdm9pZCB7XG4gICAgbGV0IGVsO1xuICAgIGxldCByZXNpemVTY2FsZTtcbiAgICBpZiAoZWxlbWVudCA9PT0gJ3ZhbHVlJykge1xuICAgICAgZWwgPSB0aGlzLnZhbHVlVGV4dEVsO1xuICAgICAgcmVzaXplU2NhbGUgPSB0aGlzLnZhbHVlUmVzaXplU2NhbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsID0gdGhpcy51bml0c1RleHRFbDtcbiAgICAgIHJlc2l6ZVNjYWxlID0gdGhpcy51bml0c1Jlc2l6ZVNjYWxlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAod2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSByZXR1cm47XG4gICAgY29uc3Qgb2xkU2NhbGUgPSByZXNpemVTY2FsZTtcbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBNYXRoLm1heCh0aGlzLmRpbXMuaGVpZ2h0IC8gMiAtIDE1LCAwKTtcbiAgICBjb25zdCByZXNpemVTY2FsZVdpZHRoID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlV2lkdGggLyAod2lkdGggLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCByZXNpemVTY2FsZUhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsYWJsZUhlaWdodCAvIChoZWlnaHQgLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICByZXNpemVTY2FsZSA9IE1hdGgubWluKHJlc2l6ZVNjYWxlSGVpZ2h0LCByZXNpemVTY2FsZVdpZHRoKTtcblxuICAgIGlmIChyZXNpemVTY2FsZSAhPT0gb2xkU2NhbGUpIHtcbiAgICAgIGlmIChlbGVtZW50ID09PSAndmFsdWUnKSB7XG4gICAgICAgIHRoaXMudmFsdWVSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgICAgICB0aGlzLnZhbHVlVGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgkeyByZXNpemVTY2FsZSB9LCAkeyByZXNpemVTY2FsZSB9KWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVuaXRzUmVzaXplU2NhbGUgPSByZXNpemVTY2FsZTtcbiAgICAgICAgdGhpcy51bml0c1RleHRUcmFuc2Zvcm0gPSBgc2NhbGUoJHsgcmVzaXplU2NhbGUgfSwgJHsgcmVzaXplU2NhbGUgfSlgO1xuICAgICAgfVxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuc2NhbGVUZXh0KGVsZW1lbnQsIGZhbHNlKTsgfSwgNTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh7XG4gICAgICBuYW1lOiAnVmFsdWUnLFxuICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgJ29yZGluYWwnLCBbdGhpcy52YWx1ZV0sIHRoaXMuY3VzdG9tQ29sb3JzKTtcbiAgfVxufVxuIl19