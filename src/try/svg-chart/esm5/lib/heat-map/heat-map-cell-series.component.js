import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel } from '../common/label.helper';
var HeatCellSeriesComponent = /** @class */ (function () {
    function HeatCellSeriesComponent() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnInit = function () {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    };
    HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    HeatCellSeriesComponent.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                cells.push({
                    row: row,
                    cell: cell,
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + series + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (value, label, series) {
        this.select.emit({
            name: label,
            value: value,
            series: series
        });
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
            template: "\n    <svg:g\n      ng-svg-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"{series: c.series, name: c.label, value: c.data}\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HeatCellSeriesComponent);
    return HeatCellSeriesComponent;
}());
export { HeatCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN2QixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBNEJyRDtJQTFCQTtRQWlDVyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBOER4QyxDQUFDO0lBMURDLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsNkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsd0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBdUJDO1FBdEJDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO2dCQUNsQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUV6QixLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNULEdBQUcsS0FBQTtvQkFDSCxJQUFJLE1BQUE7b0JBQ0osQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDeEIsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDekIsS0FBSyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUM5QixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQy9CLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLElBQUksRUFBRSxLQUFLO29CQUNYLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDN0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsZ0RBQWMsR0FBZCxVQUFlLEVBQXVCO1lBQXJCLGdCQUFLLEVBQUUsY0FBSSxFQUFFLGtCQUFNO1FBQ2xDLE9BQU8sMkNBQ3lCLE1BQU0sZ0JBQU0sS0FBSyxtREFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxrQkFDbEQsQ0FBQztJQUNKLENBQUM7SUFFRCx5Q0FBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCx5Q0FBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLE9BQUE7WUFDTCxNQUFNLFFBQUE7U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBdEVRO1FBQVIsS0FBSyxFQUFFOzt5REFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzsyREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzsyREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzsyREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzs2REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O29FQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7Z0VBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzBDQUFrQixXQUFXO29FQUFNO0lBQ2xDO1FBQVIsS0FBSyxFQUFFOzsrREFBbUI7SUFFakI7UUFBVCxNQUFNLEVBQUU7OzJEQUE2QjtJQVozQix1QkFBdUI7UUExQm5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1Q0FBdUM7WUFDakQsUUFBUSxFQUFFLHVzQkFxQlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csdUJBQXVCLENBMEVuQztJQUFELDhCQUFDO0NBQUEsQUExRUQsSUEwRUM7U0ExRVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtaGVhdC1tYXAtY2VsbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5nLXN2Zy1jaGFydHMtaGVhdC1tYXAtY2VsbFxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY2VsbHM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBbeF09XCJjLnhcIlxuICAgICAgW3ldPVwiYy55XCJcbiAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcbiAgICAgIFtkYXRhXT1cImMuZGF0YVwiXG4gICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50LCBjLmxhYmVsLCBjLnNlcmllcylcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgbmd4LXRvb2x0aXBcbiAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiB0b29sdGlwVGV4dChjKVwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwie3NlcmllczogYy5zZXJpZXMsIG5hbWU6IGMubGFiZWwsIHZhbHVlOiBjLmRhdGF9XCI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRleHQ6IGFueTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNlbGxzOiBhbnlbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcFRleHQpIHtcbiAgICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLmdldFRvb2x0aXBUZXh0O1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XG4gIH1cblxuICBnZXRDZWxscygpIHtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuXG4gICAgdGhpcy5kYXRhLm1hcCgocm93KSA9PiB7XG4gICAgICByb3cuc2VyaWVzLm1hcCgoY2VsbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNlbGwudmFsdWU7XG5cbiAgICAgICAgY2VsbHMucHVzaCh7XG4gICAgICAgICAgcm93LFxuICAgICAgICAgIGNlbGwsXG4gICAgICAgICAgeDogdGhpcy54U2NhbGUocm93Lm5hbWUpLFxuICAgICAgICAgIHk6IHRoaXMueVNjYWxlKGNlbGwubmFtZSksXG4gICAgICAgICAgd2lkdGg6IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpLFxuICAgICAgICAgIGhlaWdodDogdGhpcy55U2NhbGUuYmFuZHdpZHRoKCksXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpLFxuICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgIGxhYmVsOiBmb3JtYXRMYWJlbChjZWxsLm5hbWUpLFxuICAgICAgICAgIHNlcmllczogcm93Lm5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjZWxscztcbiAgfVxuXG4gIGdldFRvb2x0aXBUZXh0KHsgbGFiZWwsIGRhdGEsIHNlcmllcyB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtzZXJpZXN9IOKAoiAke2xhYmVsfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke2RhdGEudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgYDtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLnRvb2x0aXBUZXh0O1xuICB9XG5cbiAgb25DbGljayh2YWx1ZSwgbGFiZWwsIHNlcmllcyk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgbmFtZTogbGFiZWwsXG4gICAgICB2YWx1ZSxcbiAgICAgIHNlcmllc1xuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==