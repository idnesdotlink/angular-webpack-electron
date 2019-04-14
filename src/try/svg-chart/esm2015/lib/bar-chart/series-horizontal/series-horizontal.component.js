import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../../common/label.helper';
import { D0Types } from '../series-vertical/series-vertical.component';
let SeriesHorizontalComponent = class SeriesHorizontalComponent {
    constructor() {
        this.barsForDataLabels = [];
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelWidthChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateTooltipSettings();
        const d0 = {
            [D0Types.positive]: 0,
            [D0Types.negative]: 0
        };
        let d0Type;
        d0Type = D0Types.positive;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
        }
        const xScaleMin = Math.max(this.xScale.domain()[0], 0);
        this.bars = this.series.map((d, index) => {
            let value = d.value;
            const label = d.name;
            const formattedLabel = formatLabel(label);
            const roundEdges = this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            const bar = {
                value,
                label,
                roundEdges,
                data: d,
                formattedLabel
            };
            bar.height = this.yScale.bandwidth();
            if (this.type === 'standard') {
                bar.width = Math.abs(this.xScale(value) - this.xScale(xScaleMin));
                if (value < 0) {
                    bar.x = this.xScale(value);
                }
                else {
                    bar.x = this.xScale(xScaleMin);
                }
                bar.y = this.yScale(label);
            }
            else if (this.type === 'stacked') {
                const offset0 = d0[d0Type];
                const offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.width = this.xScale(offset1) - this.xScale(offset0);
                bar.x = this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (this.type === 'normalized') {
                let offset0 = d0[d0Type];
                let offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = this.xScale(offset1) - this.xScale(offset0);
                bar.x = this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (this.colors.scaleType === 'ordinal') {
                bar.color = this.colors.getColor(label);
            }
            else {
                if (this.type === 'standard') {
                    bar.color = this.colors.getColor(value);
                    bar.gradientStops = this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = this.colors.getColor(bar.offset1);
                    bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            let tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (this.seriesName) {
                tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
                bar.data.series = this.seriesName;
                bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = this.tooltipDisabled ? undefined : `
        <span class="tooltip-label">${tooltipLabel}</span>
        <span class="tooltip-val">${value.toLocaleString()}</span>
      `;
            return bar;
        });
        this.updateDataLabels();
    }
    updateDataLabels() {
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            const section = {};
            section.series = this.seriesName;
            const totalPositive = this.series.map(d => d.value).reduce((sum, d) => d > 0 ? sum + d : sum, 0);
            const totalNegative = this.series.map(d => d.value).reduce((sum, d) => d < 0 ? sum + d : sum, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            // if total is positive then we show it on the right, otherwise on the left
            if (section.total > 0) {
                section.width = this.xScale(totalPositive);
            }
            else {
                section.width = this.xScale(totalNegative);
            }
            section.height = this.yScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(d => {
                const section = {};
                section.series = this.seriesName ? this.seriesName : d.name;
                section.total = d.value;
                section.x = this.xScale(0);
                section.y = this.yScale(d.name);
                section.width = this.xScale(section.total) - this.xScale(0);
                section.height = this.yScale.bandwidth();
                return section;
            });
        }
    }
    updateTooltipSettings() {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    trackBy(index, bar) {
        return bar.label;
    }
    trackDataLabelBy(index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    }
    click(data) {
        this.select.emit(data);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "dims", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "type", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "series", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "xScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "yScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SeriesHorizontalComponent.prototype, "gradient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SeriesHorizontalComponent.prototype, "activeEntries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SeriesHorizontalComponent.prototype, "seriesName", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], SeriesHorizontalComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SeriesHorizontalComponent.prototype, "roundEdges", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "showDataLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "dataLabelFormatting", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "deactivate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "dataLabelWidthChanged", void 0);
SeriesHorizontalComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-series-horizontal]',
        template: `
    <svg:g ng-svg-charts-bar
      *ngFor="let bar of bars; trackBy:trackBy"
      [@animationState]="'active'"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'horizontal'"
      [roundEdges]="bar.roundEdges"
      (select)="click($event)"
      [gradient]="gradient"
      [isActive]="isActive(bar.data)"
      [ariaLabel]="bar.ariaLabel"
      [animations]="animations"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data">
    </svg:g>
    <svg:g *ngIf="showDataLabel">
      <svg:g ng-svg-charts-bar-label *ngFor="let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy"
        [barX]="b.x"
        [barY]="b.y"
        [barWidth]="b.width"
        [barHeight]="b.height"
        [value]="b.total"
        [valueFormatting]="dataLabelFormatting"
        [orientation]="'horizontal'"
        (dimensionsChanged)="dataLabelWidthChanged.emit({size:$event, index:i})"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1
                    }),
                    animate(500, style({ opacity: 0 }))
                ])
            ])
        ]
    })
], SeriesHorizontalComponent);
export { SeriesHorizontalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLWhvcml6b250YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L3Nlcmllcy1ob3Jpem9udGFsL3Nlcmllcy1ob3Jpem9udGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFDdkIsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBeUR2RSxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQXZEdEM7UUEyREUsc0JBQWlCLEdBQzJDLEVBQUUsQ0FBQztRQUd0RCxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBS2xCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBTXhCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFHckIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXlLdkQsQ0FBQztJQXBLQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBRUosSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsTUFBTSxFQUFF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LEVBQUU7O2tFQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTs7MkRBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOztnRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7OzZEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtzQ0FBa0IsV0FBVztrRUFBTTtBQUNsQztJQUFSLEtBQUssRUFBRTs7NkRBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFOzs2REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7O2dFQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7c0VBQTBCO0FBRXhCO0lBQVQsTUFBTSxFQUFFOzt5REFBNkI7QUFDNUI7SUFBVCxNQUFNLEVBQUU7OzJEQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTs7NkRBQWlDO0FBQ2hDO0lBQVQsTUFBTSxFQUFFOzt3RUFBNEM7QUExQjFDLHlCQUF5QjtJQXZEckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9DQUFvQztRQUM5QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxVQUFVLEVBQUU7WUFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLEtBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQztxQkFDWCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3BDLENBQUM7YUFDSCxDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1cseUJBQXlCLENBbU1yQztTQW5NWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBEMFR5cGVzIH0gZnJvbSAnLi4vc2VyaWVzLXZlcnRpY2FsL3Nlcmllcy12ZXJ0aWNhbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtc2VyaWVzLWhvcml6b250YWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1iYXJcbiAgICAgICpuZ0Zvcj1cImxldCBiYXIgb2YgYmFyczsgdHJhY2tCeTp0cmFja0J5XCJcbiAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxuICAgICAgW3dpZHRoXT1cImJhci53aWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cImJhci5oZWlnaHRcIlxuICAgICAgW3hdPVwiYmFyLnhcIlxuICAgICAgW3ldPVwiYmFyLnlcIlxuICAgICAgW2ZpbGxdPVwiYmFyLmNvbG9yXCJcbiAgICAgIFtzdG9wc109XCJiYXIuZ3JhZGllbnRTdG9wc1wiXG4gICAgICBbZGF0YV09XCJiYXIuZGF0YVwiXG4gICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgIFtyb3VuZEVkZ2VzXT1cImJhci5yb3VuZEVkZ2VzXCJcbiAgICAgIChzZWxlY3QpPVwiY2xpY2soJGV2ZW50KVwiXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGJhci5kYXRhKVwiXG4gICAgICBbYXJpYUxhYmVsXT1cImJhci5hcmlhTGFiZWxcIlxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIG5neC10b29sdGlwXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCJ0b29sdGlwVHlwZVwiXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGJhci50b29sdGlwVGV4dFwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwiYmFyLmRhdGFcIj5cbiAgICA8L3N2ZzpnPlxuICAgIDxzdmc6ZyAqbmdJZj1cInNob3dEYXRhTGFiZWxcIj5cbiAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWJhci1sYWJlbCAqbmdGb3I9XCJsZXQgYiBvZiBiYXJzRm9yRGF0YUxhYmVsczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTp0cmFja0RhdGFMYWJlbEJ5XCJcbiAgICAgICAgW2JhclhdPVwiYi54XCJcbiAgICAgICAgW2JhclldPVwiYi55XCJcbiAgICAgICAgW2JhcldpZHRoXT1cImIud2lkdGhcIlxuICAgICAgICBbYmFySGVpZ2h0XT1cImIuaGVpZ2h0XCJcbiAgICAgICAgW3ZhbHVlXT1cImIudG90YWxcIlxuICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cImRhdGFMYWJlbEZvcm1hdHRpbmdcIlxuICAgICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImRhdGFMYWJlbFdpZHRoQ2hhbmdlZC5lbWl0KHtzaXplOiRldmVudCwgaW5kZXg6aX0pXCJcbiAgICAgIC8+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoNTAwLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VyaWVzSG9yaXpvbnRhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGJhcnM6IGFueTtcbiAgeDogYW55O1xuICB5OiBhbnk7XG4gIGJhcnNGb3JEYXRhTGFiZWxzOiBBcnJheTx7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiBudW1iZXIsIHNlcmllczogc3RyaW5nfT4gPSBbXTtcblxuICBASW5wdXQoKSBkaW1zO1xuICBASW5wdXQoKSB0eXBlID0gJ3N0YW5kYXJkJztcbiAgQElucHV0KCkgc2VyaWVzO1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBzZXJpZXNOYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbjtcbiAgQElucHV0KCkgYW5pbWF0aW9ucyA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dEYXRhTGFiZWwgPSBmYWxzZTtcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkYXRhTGFiZWxXaWR0aENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nO1xuICB0b29sdGlwVHlwZTogc3RyaW5nO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuXG4gICAgdGhpcy51cGRhdGVUb29sdGlwU2V0dGluZ3MoKTtcbiAgICBjb25zdCBkMCA9IHtcbiAgICAgIFtEMFR5cGVzLnBvc2l0aXZlXTogMCxcbiAgICAgIFtEMFR5cGVzLm5lZ2F0aXZlXTogMFxuICAgIH07XG4gICAgbGV0IGQwVHlwZTogRDBUeXBlcztcbiAgICBkMFR5cGUgPSBEMFR5cGVzLnBvc2l0aXZlO1xuICAgIGxldCB0b3RhbDtcbiAgICBpZiAodGhpcy50eXBlID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgIHRvdGFsID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IHN1bSArIGQsIDApO1xuICAgIH1cbiAgICBjb25zdCB4U2NhbGVNaW4gPSBNYXRoLm1heCh0aGlzLnhTY2FsZS5kb21haW4oKVswXSwgMCk7XG5cbiAgICB0aGlzLmJhcnMgPSB0aGlzLnNlcmllcy5tYXAoKGQsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBkLnZhbHVlO1xuICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcbiAgICAgIGNvbnN0IHJvdW5kRWRnZXMgPSB0aGlzLnJvdW5kRWRnZXM7XG4gICAgICBkMFR5cGUgPSB2YWx1ZSA+IDAgPyBEMFR5cGVzLnBvc2l0aXZlIDogRDBUeXBlcy5uZWdhdGl2ZTtcblxuICAgICAgY29uc3QgYmFyOiBhbnkgPSB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgcm91bmRFZGdlcyxcbiAgICAgICAgZGF0YTogZCxcbiAgICAgICAgZm9ybWF0dGVkTGFiZWxcbiAgICAgIH07XG5cbiAgICAgIGJhci5oZWlnaHQgPSB0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKTtcblxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgICBiYXIud2lkdGggPSBNYXRoLmFicyh0aGlzLnhTY2FsZSh2YWx1ZSkgLSB0aGlzLnhTY2FsZSh4U2NhbGVNaW4pKTtcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUoeFNjYWxlTWluKTtcbiAgICAgICAgfVxuICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKGxhYmVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0MCA9IGQwW2QwVHlwZV07XG4gICAgICAgIGNvbnN0IG9mZnNldDEgPSBvZmZzZXQwICsgdmFsdWU7XG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XG5cbiAgICAgICAgYmFyLndpZHRoID0gdGhpcy54U2NhbGUob2Zmc2V0MSkgLSB0aGlzLnhTY2FsZShvZmZzZXQwKTtcbiAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZShvZmZzZXQwKTtcbiAgICAgICAgYmFyLnkgPSAwO1xuICAgICAgICBiYXIub2Zmc2V0MCA9IG9mZnNldDA7XG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgbGV0IG9mZnNldDAgPSBkMFtkMFR5cGVdO1xuICAgICAgICBsZXQgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcbiAgICAgICAgZDBbZDBUeXBlXSArPSB2YWx1ZTtcblxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgb2Zmc2V0MCA9IChvZmZzZXQwICogMTAwKSAvIHRvdGFsO1xuICAgICAgICAgIG9mZnNldDEgPSAob2Zmc2V0MSAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQwID0gMDtcbiAgICAgICAgICBvZmZzZXQxID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhci53aWR0aCA9IHRoaXMueFNjYWxlKG9mZnNldDEpIC0gdGhpcy54U2NhbGUob2Zmc2V0MCk7XG4gICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUob2Zmc2V0MCk7XG4gICAgICAgIGJhci55ID0gMDtcbiAgICAgICAgYmFyLm9mZnNldDAgPSBvZmZzZXQwO1xuICAgICAgICBiYXIub2Zmc2V0MSA9IG9mZnNldDE7XG4gICAgICAgIHZhbHVlID0gKG9mZnNldDEgLSBvZmZzZXQwKS50b0ZpeGVkKDIpICsgJyUnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgICAgYmFyLmNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHZhbHVlKTtcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHModmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGJhci5vZmZzZXQxKTtcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMoYmFyLm9mZnNldDEsIGJhci5vZmZzZXQwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgdG9vbHRpcExhYmVsID0gZm9ybWF0dGVkTGFiZWw7XG4gICAgICBiYXIuYXJpYUxhYmVsID0gZm9ybWF0dGVkTGFiZWwgKyAnICcgKyB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgaWYgKHRoaXMuc2VyaWVzTmFtZSkge1xuICAgICAgICB0b29sdGlwTGFiZWwgPSBgJHt0aGlzLnNlcmllc05hbWV9IOKAoiAke2Zvcm1hdHRlZExhYmVsfWA7XG4gICAgICAgIGJhci5kYXRhLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZTtcbiAgICAgICAgYmFyLmFyaWFMYWJlbCA9IHRoaXMuc2VyaWVzTmFtZSArICcgJyArICBiYXIuYXJpYUxhYmVsO1xuICAgICAgfVxuXG4gICAgICBiYXIudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHt0b29sdGlwTGFiZWx9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgIGA7XG5cbiAgICAgIHJldHVybiBiYXI7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZURhdGFMYWJlbHMoKTtcblxuICB9XG5cbiAgdXBkYXRlRGF0YUxhYmVscygpIHtcblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xuICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IFtdO1xuICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XG4gICAgICBzZWN0aW9uLnNlcmllcyA9ICB0aGlzLnNlcmllc05hbWU7XG4gICAgICBjb25zdCB0b3RhbFBvc2l0aXZlID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IGQgPiAwID8gc3VtICsgZCA6IHN1bSwgMCk7XG4gICAgICBjb25zdCB0b3RhbE5lZ2F0aXZlID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IGQgPCAwID8gc3VtICsgZCA6IHN1bSwgMCk7XG4gICAgICBzZWN0aW9uLnRvdGFsID0gdG90YWxQb3NpdGl2ZSArIHRvdGFsTmVnYXRpdmU7XG4gICAgICBzZWN0aW9uLnggPSAwO1xuICAgICAgc2VjdGlvbi55ID0gMDtcbiAgICAgIC8vIGlmIHRvdGFsIGlzIHBvc2l0aXZlIHRoZW4gd2Ugc2hvdyBpdCBvbiB0aGUgcmlnaHQsIG90aGVyd2lzZSBvbiB0aGUgbGVmdFxuICAgICAgaWYgKHNlY3Rpb24udG90YWwgPiAwKSB7XG4gICAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZSh0b3RhbFBvc2l0aXZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZSh0b3RhbE5lZ2F0aXZlKTtcbiAgICAgIH1cbiAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzLnB1c2goc2VjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IHRoaXMuc2VyaWVzLm1hcChkID0+IHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XG4gICAgICAgIHNlY3Rpb24uc2VyaWVzID0gIHRoaXMuc2VyaWVzTmFtZSA/IHRoaXMuc2VyaWVzTmFtZSA6IGQubmFtZTtcbiAgICAgICAgc2VjdGlvbi50b3RhbCA9IGQudmFsdWU7XG4gICAgICAgIHNlY3Rpb24ueCA9IHRoaXMueFNjYWxlKDApO1xuICAgICAgICBzZWN0aW9uLnkgPSB0aGlzLnlTY2FsZShkLm5hbWUpO1xuICAgICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUoc2VjdGlvbi50b3RhbCkgLSB0aGlzLnhTY2FsZSgwKTtcbiAgICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKTtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XG4gICAgICAgIH0pO1xuICAgICAgfVxuICB9XG5cbiAgdXBkYXRlVG9vbHRpcFNldHRpbmdzKCkge1xuICAgIHRoaXMudG9vbHRpcFBsYWNlbWVudCA9IHRoaXMudG9vbHRpcERpc2FibGVkID8gdW5kZWZpbmVkIDogJ3RvcCc7XG4gICAgdGhpcy50b29sdGlwVHlwZSA9IHRoaXMudG9vbHRpcERpc2FibGVkID8gdW5kZWZpbmVkIDogJ3Rvb2x0aXAnO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGJhcikge1xuICAgIHJldHVybiBiYXIubGFiZWw7XG4gIH1cblxuICB0cmFja0RhdGFMYWJlbEJ5KGluZGV4LCBiYXJMYWJlbCkge1xuICAgIHJldHVybiBpbmRleCArICcjJyArIGJhckxhYmVsLnNlcmllcyArICcjJyArIGJhckxhYmVsLnRvdGFsO1xuICB9XG5cbiAgY2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cbn1cbiJdfQ==