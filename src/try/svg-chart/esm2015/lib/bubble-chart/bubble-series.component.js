import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../common/label.helper';
let BubbleSeriesComponent = class BubbleSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circles = this.getCircles();
    }
    getCircles() {
        const seriesName = this.data.name;
        return this.data.series.map((d, i) => {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                const y = d.y;
                const x = d.x;
                const r = d.r;
                const radius = this.rScale(r || 1);
                const tooltipLabel = formatLabel(d.name);
                const cx = (this.xScaleType === 'linear') ? this.xScale(Number(x)) : this.xScale(x);
                const cy = (this.yScaleType === 'linear') ? this.yScale(Number(y)) : this.yScale(y);
                const color = (this.colors.scaleType === 'linear') ?
                    this.colors.getColor(r) :
                    this.colors.getColor(seriesName);
                const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
                const opacity = isActive ? 1 : 0.3;
                const data = {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                };
                return {
                    data,
                    x,
                    y,
                    r,
                    classNames: [`circle-data-${i}`],
                    value: y,
                    label: x,
                    cx,
                    cy,
                    radius,
                    tooltipLabel,
                    color,
                    opacity,
                    seriesName,
                    isActive,
                    transform: `translate(${cx},${cy})`
                };
            }
        }).filter((circle) => circle !== undefined);
    }
    getTooltipText(circle) {
        const hasRadius = typeof circle.r !== 'undefined';
        const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        const hasSeriesName = circle.seriesName && circle.seriesName.length;
        const radiusValue = hasRadius ? formatLabel(circle.r) : '';
        const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
        const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
        const x = formatLabel(circle.x);
        const y = formatLabel(circle.y);
        const name = (hasSeriesName && hasTooltipLabel) ?
            `${circle.seriesName} • ${circle.tooltipLabel}` :
            circle.seriesName + circle.tooltipLabel;
        const tooltipTitle = (hasSeriesName || hasTooltipLabel) ?
            `<span class="tooltip-label">${name}</span>` :
            '';
        return `
      ${tooltipTitle}
      <span class="tooltip-label">
        <label>${xAxisLabel}</label> ${x}<br />
        <label>${yAxisLabel}</label> ${y}
      </span>
      <span class="tooltip-val">
        ${radiusValue}
      </span>
    `;
    }
    onClick(value, label) {
        this.select.emit({
            name: label,
            value
        });
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isVisible(circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    }
    activateCircle(circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle(circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    }
    trackBy(index, circle) {
        return `${circle.data.series} ${circle.data.name}`;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "xScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "yScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "rScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "xScaleType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "yScaleType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "visibleValue", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], BubbleSeriesComponent.prototype, "activeEntries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "deactivate", void 0);
BubbleSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-bubble-series]',
        template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g ng-svg-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick($event, circle.label)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="'top'"
          [tooltipType]="'tooltip'"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        opacity: 0,
                        transform: 'scale(0)'
                    }),
                    animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                ])
            ])
        ]
    })
], BubbleSeriesComponent);
export { BubbleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9idWJibGUtY2hhcnQvYnViYmxlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBOENyRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQTVDbEM7UUF5RFcsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHdkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFrSTVDLENBQUM7SUE3SEMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxD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QUNGLENBQUM7R0FDVyxxQkFBcUIsQ0FvSmpDO1NBcEpZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWJ1YmJsZS1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IGNpcmNsZSBvZiBjaXJjbGVzOyB0cmFja0J5OiB0cmFja0J5XCI+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cImNpcmNsZS50cmFuc2Zvcm1cIj5cbiAgICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtY2lyY2xlXG4gICAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICAgIFtjeF09XCIwXCJcbiAgICAgICAgICBbY3ldPVwiMFwiXG4gICAgICAgICAgW3JdPVwiY2lyY2xlLnJhZGl1c1wiXG4gICAgICAgICAgW2ZpbGxdPVwiY2lyY2xlLmNvbG9yXCJcbiAgICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJjaXJjbGUub3BhY2l0eVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJjaXJjbGUuaXNBY3RpdmVcIlxuICAgICAgICAgIFtwb2ludGVyRXZlbnRzXT1cIidhbGwnXCJcbiAgICAgICAgICBbZGF0YV09XCJjaXJjbGUudmFsdWVcIlxuICAgICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcbiAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50LCBjaXJjbGUubGFiZWwpXCJcbiAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGVDaXJjbGUoY2lyY2xlKVwiXG4gICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpXCJcbiAgICAgICAgICBuZ3gtdG9vbHRpcFxuICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXG4gICAgICAgICAgW3Rvb2x0aXBUeXBlXT1cIid0b29sdGlwJ1wiXG4gICAgICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBnZXRUb29sdGlwVGV4dChjaXJjbGUpXCJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImNpcmNsZS5kYXRhXCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMCknXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3NjYWxlKDEpJ30pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1YmJsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIHJTY2FsZTtcbiAgQElucHV0KCkgeFNjYWxlVHlwZTtcbiAgQElucHV0KCkgeVNjYWxlVHlwZTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSB2aXNpYmxlVmFsdWU7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSB4QXhpc0xhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGFyZWFQYXRoOiBhbnk7XG4gIGNpcmNsZXM6IGFueVtdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2lyY2xlcyA9IHRoaXMuZ2V0Q2lyY2xlcygpO1xuICB9XG5cbiAgZ2V0Q2lyY2xlcygpOiBhbnlbXSB7XG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xuXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5zZXJpZXMubWFwKChkLCBpKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGQueSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgeSA9IGQueTtcbiAgICAgICAgY29uc3QgeCA9IGQueDtcbiAgICAgICAgY29uc3QgciA9IGQucjtcblxuICAgICAgICBjb25zdCByYWRpdXMgPSB0aGlzLnJTY2FsZShyIHx8IDEpO1xuICAgICAgICBjb25zdCB0b29sdGlwTGFiZWwgPSBmb3JtYXRMYWJlbChkLm5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGN4ID0gKHRoaXMueFNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpID8gdGhpcy54U2NhbGUoTnVtYmVyKHgpKSA6IHRoaXMueFNjYWxlKHgpO1xuICAgICAgICBjb25zdCBjeSA9ICh0aGlzLnlTY2FsZVR5cGUgPT09ICdsaW5lYXInKSA/IHRoaXMueVNjYWxlKE51bWJlcih5KSkgOiB0aGlzLnlTY2FsZSh5KTtcblxuICAgICAgICBjb25zdCBjb2xvciA9ICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSA/XG4gICAgICAgICAgdGhpcy5jb2xvcnMuZ2V0Q29sb3IocikgOlxuICAgICAgICAgIHRoaXMuY29sb3JzLmdldENvbG9yKHNlcmllc05hbWUpO1xuXG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID0gIXRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPyB0cnVlIDogdGhpcy5pc0FjdGl2ZSh7bmFtZTogc2VyaWVzTmFtZX0pO1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gaXNBY3RpdmUgPyAxIDogMC4zO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxuICAgICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgICAgICB2YWx1ZTogZC55LFxuICAgICAgICAgIHg6IGQueCxcbiAgICAgICAgICByYWRpdXM6IGQuclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB4LFxuICAgICAgICAgIHksXG4gICAgICAgICAgcixcbiAgICAgICAgICBjbGFzc05hbWVzOiBbYGNpcmNsZS1kYXRhLSR7aX1gXSxcbiAgICAgICAgICB2YWx1ZTogeSxcbiAgICAgICAgICBsYWJlbDogeCxcbiAgICAgICAgICBjeCxcbiAgICAgICAgICBjeSxcbiAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgdG9vbHRpcExhYmVsLFxuICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgIG9wYWNpdHksXG4gICAgICAgICAgc2VyaWVzTmFtZSxcbiAgICAgICAgICBpc0FjdGl2ZSxcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjeH0sJHtjeX0pYFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pLmZpbHRlcigoY2lyY2xlKSA9PiBjaXJjbGUgIT09IHVuZGVmaW5lZCk7XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dChjaXJjbGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IGhhc1JhZGl1cyA9IHR5cGVvZiBjaXJjbGUuciAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgY29uc3QgaGFzVG9vbHRpcExhYmVsID0gY2lyY2xlLnRvb2x0aXBMYWJlbCAmJiBjaXJjbGUudG9vbHRpcExhYmVsLmxlbmd0aDtcbiAgICBjb25zdCBoYXNTZXJpZXNOYW1lID0gY2lyY2xlLnNlcmllc05hbWUgJiYgY2lyY2xlLnNlcmllc05hbWUubGVuZ3RoO1xuXG4gICAgY29uc3QgcmFkaXVzVmFsdWUgPSBoYXNSYWRpdXMgPyBmb3JtYXRMYWJlbChjaXJjbGUucikgOiAnJztcbiAgICBjb25zdCB4QXhpc0xhYmVsID0gdGhpcy54QXhpc0xhYmVsICYmIHRoaXMueEF4aXNMYWJlbCAhPT0gJycgPyBgJHt0aGlzLnhBeGlzTGFiZWx9OmAgOiAnJztcbiAgICBjb25zdCB5QXhpc0xhYmVsID0gdGhpcy55QXhpc0xhYmVsICYmIHRoaXMueUF4aXNMYWJlbCAhPT0gJycgPyBgJHt0aGlzLnlBeGlzTGFiZWx9OmAgOiAnJztcbiAgICBjb25zdCB4ID0gZm9ybWF0TGFiZWwoY2lyY2xlLngpO1xuICAgIGNvbnN0IHkgPSBmb3JtYXRMYWJlbChjaXJjbGUueSk7XG4gICAgY29uc3QgbmFtZSA9IChoYXNTZXJpZXNOYW1lICYmIGhhc1Rvb2x0aXBMYWJlbCkgP1xuICAgICAgYCR7Y2lyY2xlLnNlcmllc05hbWV9IOKAoiAke2NpcmNsZS50b29sdGlwTGFiZWx9YCA6XG4gICAgICBjaXJjbGUuc2VyaWVzTmFtZSArIGNpcmNsZS50b29sdGlwTGFiZWw7XG4gICAgY29uc3QgdG9vbHRpcFRpdGxlID0gKGhhc1Nlcmllc05hbWUgfHwgaGFzVG9vbHRpcExhYmVsKSA/XG4gICAgICBgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtuYW1lfTwvc3Bhbj5gIDpcbiAgICAgICcnO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICR7dG9vbHRpcFRpdGxlfVxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+XG4gICAgICAgIDxsYWJlbD4ke3hBeGlzTGFiZWx9PC9sYWJlbD4gJHt4fTxiciAvPlxuICAgICAgICA8bGFiZWw+JHt5QXhpc0xhYmVsfTwvbGFiZWw+ICR7eX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj5cbiAgICAgICAgJHtyYWRpdXNWYWx1ZX1cbiAgICAgIDwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgb25DbGljayh2YWx1ZSwgbGFiZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIG5hbWU6IGxhYmVsLFxuICAgICAgdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaXNWaXNpYmxlKGNpcmNsZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUoe25hbWU6IGNpcmNsZS5zZXJpZXNOYW1lfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNpcmNsZS5vcGFjaXR5ICE9PSAwO1xuICB9XG5cbiAgYWN0aXZhdGVDaXJjbGUoY2lyY2xlKTogdm9pZCB7XG4gICAgY2lyY2xlLmJhclZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7bmFtZTogdGhpcy5kYXRhLm5hbWV9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVDaXJjbGUoY2lyY2xlKTogdm9pZCB7XG4gICAgY2lyY2xlLmJhclZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7bmFtZTogdGhpcy5kYXRhLm5hbWV9KTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGNpcmNsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2NpcmNsZS5kYXRhLnNlcmllc30gJHtjaXJjbGUuZGF0YS5uYW1lfWA7XG4gIH1cbn1cbiJdfQ==