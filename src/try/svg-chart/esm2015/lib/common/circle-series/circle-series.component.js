import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../label.helper';
import { id } from '../../utils/id';
import { ColorHelper } from '../color.helper';
let CircleSeriesComponent = class CircleSeriesComponent {
    constructor() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    ngOnInit() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circle = this.getActiveCircle();
    }
    getActiveCircle() {
        const indexActiveDataPoint = this.data.series.findIndex((d) => {
            const label = d.name;
            return label && this.visibleValue && label.toString() === this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    }
    mapDataPointToCircle(d, i) {
        const seriesName = this.data.name;
        const value = d.value;
        const label = d.name;
        const tooltipLabel = formatLabel(label);
        let cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        const cy = this.yScale(this.type === 'standard' ? value : d.d1);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;
        const opacity = 1;
        let color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        const data = {
            series: seriesName,
            value,
            name: label
        };
        return {
            classNames: [`circle-data-${i}`],
            value,
            label,
            data,
            cx,
            cy,
            radius,
            height,
            tooltipLabel,
            color,
            opacity,
            seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    }
    getTooltipText({ tooltipLabel, value, seriesName, min, max }) {
        return `
      <span class="tooltip-label">${seriesName} • ${tooltipLabel}</span>
      <span class="tooltip-val">${value.toLocaleString()}${this.getTooltipMinMaxText(min, max)}</span>
    `;
    }
    getTooltipMinMaxText(min, max) {
        if (min !== undefined || max !== undefined) {
            let result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    }
    getGradientStops(color) {
        return [
            {
                offset: 0,
                color,
                opacity: 0.2
            },
            {
                offset: 100,
                color,
                opacity: 1
            }
        ];
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
    activateCircle() {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle() {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "type", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "xScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "yScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ColorHelper)
], CircleSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "scaleType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "visibleValue", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CircleSeriesComponent.prototype, "activeEntries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CircleSeriesComponent.prototype, "deactivate", void 0);
CircleSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-circle-series]',
        template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g ng-svg-charts-svg-linear-gradient
          orientation="vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g ng-svg-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({name: circle.seriesName})"
        [pointerEvents]="circle.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick($event, circle.label)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        opacity: 0,
                    }),
                    animate(250, style({ opacity: 1 }))
                ])
            ])
        ]
    })
], CircleSeriesComponent);
export { CircleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vY2lyY2xlLXNlcmllcy9jaXJjbGUtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFlBQVksRUFHWix1QkFBdUIsRUFDdkIsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQTBEOUMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUF4RGxDO1FBMkRXLFNBQUksR0FBRyxVQUFVLENBQUM7UUFPbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHdkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJMUMsZUFBVSxHQUFHLEtBQUssQ0FBQztJQStKckIsQ0FBQztJQTNKQyxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVB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Q29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi8uLi91dGlscy9pZCc7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbG9yLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy1jaXJjbGUtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnICpuZ0lmPVwiY2lyY2xlXCI+XG4gICAgICA8ZGVmcz5cbiAgICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudFxuICAgICAgICAgIG9yaWVudGF0aW9uPVwidmVydGljYWxcIlxuICAgICAgICAgIFtuYW1lXT1cImdyYWRpZW50SWRcIlxuICAgICAgICAgIFtzdG9wc109XCJjaXJjbGUuZ3JhZGllbnRTdG9wc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2RlZnM+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgKm5nSWY9XCJiYXJWaXNpYmxlICYmIHR5cGUgPT09ICdzdGFuZGFyZCdcIlxuICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgICAgW2F0dHIueF09XCJjaXJjbGUuY3ggLSBjaXJjbGUucmFkaXVzXCJcbiAgICAgICAgW2F0dHIueV09XCJjaXJjbGUuY3lcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJjaXJjbGUucmFkaXVzICogMlwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJjaXJjbGUuaGVpZ2h0XCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJncmFkaWVudEZpbGxcIlxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYmFyXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1jaXJjbGVcbiAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICBbY3hdPVwiY2lyY2xlLmN4XCJcbiAgICAgICAgW2N5XT1cImNpcmNsZS5jeVwiXG4gICAgICAgIFtyXT1cImNpcmNsZS5yYWRpdXNcIlxuICAgICAgICBbZmlsbF09XCJjaXJjbGUuY29sb3JcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKHtuYW1lOiBjaXJjbGUuc2VyaWVzTmFtZX0pXCJcbiAgICAgICAgW3BvaW50ZXJFdmVudHNdPVwiY2lyY2xlLnZhbHVlID09PSAwID8gJ25vbmUnOiAnYWxsJ1wiXG4gICAgICAgIFtkYXRhXT1cImNpcmNsZS52YWx1ZVwiXG4gICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudCwgY2lyY2xlLmxhYmVsKVwiXG4gICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZUNpcmNsZSgpXCJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZSgpXCJcbiAgICAgICAgbmd4LXRvb2x0aXBcbiAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXG4gICAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxuICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHtvcGFjaXR5OiAxfSkpXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2lyY2xlU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIHR5cGUgPSAnc3RhbmRhcmQnO1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgc2NhbGVUeXBlO1xuICBASW5wdXQoKSB2aXNpYmxlVmFsdWU7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYXJlYVBhdGg6IGFueTtcbiAgY2lyY2xlOiBhbnk7IC8vIGFjdGl2ZSBjaXJjbGVcbiAgYmFyVmlzaWJsZSA9IGZhbHNlO1xuICBncmFkaWVudElkOiBzdHJpbmc7XG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaXJjbGUgPSB0aGlzLmdldEFjdGl2ZUNpcmNsZSgpO1xuICB9XG5cbiAgZ2V0QWN0aXZlQ2lyY2xlKCk6IHt9IHtcbiAgICBjb25zdCBpbmRleEFjdGl2ZURhdGFQb2ludCA9IHRoaXMuZGF0YS5zZXJpZXMuZmluZEluZGV4KChkKSA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcbiAgICAgIHJldHVybiBsYWJlbCAmJiB0aGlzLnZpc2libGVWYWx1ZSAmJiBsYWJlbC50b1N0cmluZygpID09PSB0aGlzLnZpc2libGVWYWx1ZS50b1N0cmluZygpICYmIGQudmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIGlmIChpbmRleEFjdGl2ZURhdGFQb2ludCA9PT0gLTEpIHtcbiAgICAgIC8vIE5vIHZhbGlkIHBvaW50IGlzICdhY3RpdmUvaG92ZXJlZCBvdmVyJyBhdCB0aGlzIG1vbWVudC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwRGF0YVBvaW50VG9DaXJjbGUodGhpcy5kYXRhLnNlcmllc1tpbmRleEFjdGl2ZURhdGFQb2ludF0sIGluZGV4QWN0aXZlRGF0YVBvaW50KTtcbiAgfVxuXG4gIG1hcERhdGFQb2ludFRvQ2lyY2xlKGQ6IGFueSwgaTogbnVtYmVyKTogYW55IHtcbiAgICBjb25zdCBzZXJpZXNOYW1lID0gdGhpcy5kYXRhLm5hbWU7XG5cbiAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XG4gICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgY29uc3QgdG9vbHRpcExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuXG4gICAgbGV0IGN4O1xuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgY3ggPSB0aGlzLnhTY2FsZShOdW1iZXIobGFiZWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3ggPSB0aGlzLnhTY2FsZShsYWJlbCk7XG4gICAgfVxuXG4gICAgY29uc3QgY3kgPSB0aGlzLnlTY2FsZSh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcgPyB2YWx1ZSA6IGQuZDEpO1xuICAgIGNvbnN0IHJhZGl1cyA9IDU7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy55U2NhbGUucmFuZ2UoKVswXSAtIGN5O1xuICAgIGNvbnN0IG9wYWNpdHkgPSAxO1xuXG4gICAgbGV0IGNvbG9yO1xuICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihkLmQxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihzZXJpZXNOYW1lKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxuICAgICAgdmFsdWUsXG4gICAgICBuYW1lOiBsYWJlbFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NOYW1lczogW2BjaXJjbGUtZGF0YS0ke2l9YF0sXG4gICAgICB2YWx1ZSxcbiAgICAgIGxhYmVsLFxuICAgICAgZGF0YSxcbiAgICAgIGN4LFxuICAgICAgY3ksXG4gICAgICByYWRpdXMsXG4gICAgICBoZWlnaHQsXG4gICAgICB0b29sdGlwTGFiZWwsXG4gICAgICBjb2xvcixcbiAgICAgIG9wYWNpdHksXG4gICAgICBzZXJpZXNOYW1lLFxuICAgICAgZ3JhZGllbnRTdG9wczogdGhpcy5nZXRHcmFkaWVudFN0b3BzKGNvbG9yKSxcbiAgICAgIG1pbjogZC5taW4sXG4gICAgICBtYXg6IGQubWF4XG4gICAgfTtcbiAgfVxuXG4gIGdldFRvb2x0aXBUZXh0KHsgdG9vbHRpcExhYmVsLCB2YWx1ZSwgc2VyaWVzTmFtZSwgbWluLCBtYXh9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtzZXJpZXNOYW1lfSDigKIgJHt0b29sdGlwTGFiZWx9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0ke3RoaXMuZ2V0VG9vbHRpcE1pbk1heFRleHQobWluLCBtYXgpfTwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgZ2V0VG9vbHRpcE1pbk1heFRleHQobWluOiBhbnksIG1heDogYW55KSB7XG4gICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkIHx8IG1heCAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHJlc3VsdCA9ICcgKCc7XG4gICAgICBpZiAobWluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICfiiaUnO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBtaW4udG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICcgLSAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSAn4omkJztcbiAgICAgIH1cbiAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gbWF4LnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyknO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIGdldEdyYWRpZW50U3RvcHMoY29sb3IpIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBvcGFjaXR5OiAwLjJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG9mZnNldDogMTAwLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgb3BhY2l0eTogMVxuICAgIH1dO1xuICB9XG5cbiAgb25DbGljayh2YWx1ZSwgbGFiZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIG5hbWU6IGxhYmVsLFxuICAgICAgdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe25hbWU6IHRoaXMuZGF0YS5uYW1lfSk7XG4gIH1cblxuICBkZWFjdGl2YXRlQ2lyY2xlKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuY2lyY2xlLm9wYWNpdHkgPSAwO1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHtuYW1lOiB0aGlzLmRhdGEubmFtZX0pO1xuICB9XG5cbn1cbiJdfQ==