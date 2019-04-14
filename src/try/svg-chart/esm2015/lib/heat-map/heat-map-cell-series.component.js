import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel } from '../common/label.helper';
let HeatCellSeriesComponent = class HeatCellSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnInit() {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cells = this.getCells();
    }
    getCells() {
        const cells = [];
        this.data.map((row) => {
            row.series.map((cell) => {
                const value = cell.value;
                cells.push({
                    row,
                    cell,
                    x: this.xScale(row.name),
                    y: this.yScale(cell.name),
                    width: this.xScale.bandwidth(),
                    height: this.yScale.bandwidth(),
                    fill: this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    }
    getTooltipText({ label, data, series }) {
        return `
      <span class="tooltip-label">${series} • ${label}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
    }
    trackBy(index, item) {
        return item.tooltipText;
    }
    onClick(value, label, series) {
        this.select.emit({
            name: label,
            value,
            series
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "xScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "yScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], HeatCellSeriesComponent.prototype, "gradient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "tooltipText", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], HeatCellSeriesComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "select", void 0);
HeatCellSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-heat-map-cell-series]',
        template: `
    <svg:g
      ng-svg-charts-heat-map-cell
      *ngFor="let c of cells; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (select)="onClick($event, c.label, c.series)"
      [gradient]="gradient"
      [animations]="animations"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="{series: c.series, name: c.label, value: c.data}">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], HeatCellSeriesComponent);
export { HeatCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN2QixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBNEJyRCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQTFCcEM7UUFpQ1csb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQThEeEMsQ0FBQztJQTFEQyxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBRXpCLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsR0FBRztvQkFDSCxJQUFJO29CQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtvQkFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO29CQUNqQyxJQUFJLEVBQUUsS0FBSztvQkFDWCxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzdCLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSTtpQkFDakIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ3BDLE9BQU87b0NBQ3lCLE1BQU0sTUFBTSxLQUFLO2tDQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFO0tBQ2xELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSztZQUNMLE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUYsQ0FBQTtBQXhFVTtJQUFSLEtBQUssRUFBRTs7cURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTs7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7eURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOztnRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7OzREQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTtzQ0FBa0IsV0FBVztnRUFBTTtBQUNsQztJQUFSLEtBQUssRUFBRTs7MkRBQW1CO0FBRWpCO0lBQVQsTUFBTSxFQUFFOzt1REFBNkI7QUFaM0IsdUJBQXVCO0lBMUJuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUNBQXVDO1FBQ2pELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLHVCQUF1QixDQTBFbkM7U0ExRVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtaGVhdC1tYXAtY2VsbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5nLXN2Zy1jaGFydHMtaGVhdC1tYXAtY2VsbFxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY2VsbHM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBbeF09XCJjLnhcIlxuICAgICAgW3ldPVwiYy55XCJcbiAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcbiAgICAgIFtkYXRhXT1cImMuZGF0YVwiXG4gICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50LCBjLmxhYmVsLCBjLnNlcmllcylcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgbmd4LXRvb2x0aXBcbiAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiB0b29sdGlwVGV4dChjKVwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwie3NlcmllczogYy5zZXJpZXMsIG5hbWU6IGMubGFiZWwsIHZhbHVlOiBjLmRhdGF9XCI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRleHQ6IGFueTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNlbGxzOiBhbnlbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcFRleHQpIHtcbiAgICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLmdldFRvb2x0aXBUZXh0O1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XG4gIH1cblxuICBnZXRDZWxscygpIHtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgdGhpcy5kYXRhLm1hcCgocm93KSA9PiB7XG4gICAgICByb3cuc2VyaWVzLm1hcCgoY2VsbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNlbGwudmFsdWU7XG5cbiAgICAgICAgY2VsbHMucHVzaCh7XG4gICAgICAgICAgcm93LFxuICAgICAgICAgIGNlbGwsXG4gICAgICAgICAgeDogdGhpcy54U2NhbGUocm93Lm5hbWUpLFxuICAgICAgICAgIHk6IHRoaXMueVNjYWxlKGNlbGwubmFtZSksXG4gICAgICAgICAgd2lkdGg6IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpLFxuICAgICAgICAgIGhlaWdodDogdGhpcy55U2NhbGUuYmFuZHdpZHRoKCksXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpLFxuICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgIGxhYmVsOiBmb3JtYXRMYWJlbChjZWxsLm5hbWUpLFxuICAgICAgICAgIHNlcmllczogcm93Lm5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjZWxscztcbiAgfVxuXG4gIGdldFRvb2x0aXBUZXh0KHsgbGFiZWwsIGRhdGEsIHNlcmllcyB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtzZXJpZXN9IOKAoiAke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke2RhdGEudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgYDtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLnRvb2x0aXBUZXh0O1xuICB9XG5cbiAgb25DbGljayh2YWx1ZSwgbGFiZWwsIHNlcmllcyk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgbmFtZTogbGFiZWwsXG4gICAgICB2YWx1ZSxcbiAgICAgIHNlcmllc1xuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==