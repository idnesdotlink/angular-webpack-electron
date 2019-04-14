import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
var TreeMapCellSeriesComponent = /** @class */ (function () {
    function TreeMapCellSeriesComponent() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.cells = this.getCells();
    };
    TreeMapCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            var data = {
                name: label,
                value: d.value
            };
            return {
                data: data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors.getColor(label),
                label: label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    TreeMapCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "select", void 0);
    TreeMapCellSeriesComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-tree-map-cell-series]',
            template: "\n    <svg:g ng-svg-charts-tree-map-cell *ngFor=\"let c of cells; trackBy:trackBy\"\n      [data]=\"c\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"c.data\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], TreeMapCellSeriesComponent);
    return TreeMapCellSeriesComponent;
}());
export { TreeMapCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUErQnZCO0lBN0JBO1FBb0NXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWlEeEMsQ0FBQztJQTdDQyxnREFBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELDZDQUFRLEdBQVI7UUFBQSxpQkF5QkM7UUF4QkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDdEIsTUFBTSxDQUFDLFVBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLEtBQUs7WUFDWixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRW5CLElBQU0sSUFBSSxHQUFHO2dCQUNYLElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzthQUNmLENBQUM7WUFFRixPQUFPO2dCQUNMLElBQUksTUFBQTtnQkFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNQLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDakMsS0FBSyxPQUFBO2dCQUNMLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztnQkFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7YUFDdkIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1EQUFjLEdBQWQsVUFBZSxFQUFnQjtZQUFkLGdCQUFLLEVBQUUsZ0JBQUs7UUFDM0IsT0FBTywyQ0FDeUIsS0FBSyxtREFDUCxLQUFLLENBQUMsY0FBYyxFQUFFLGtCQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVELDRDQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELDRDQUFPLEdBQVAsVUFBUSxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQTFEUTtRQUFSLEtBQUssRUFBRTs7NERBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7NERBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7OERBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7dUVBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzt1RUFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O2dFQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7dUVBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzBDQUFrQixXQUFXO3VFQUFNO0lBQ2xDO1FBQVIsS0FBSyxFQUFFOztrRUFBbUI7SUFFakI7UUFBVCxNQUFNLEVBQUU7OzhEQUE2QjtJQVozQiwwQkFBMEI7UUE3QnRDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1Q0FBdUM7WUFDakQsUUFBUSxFQUFFLDZ5QkF3QlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csMEJBQTBCLENBNkR0QztJQUFELGlDQUFDO0NBQUEsQUE3REQsSUE2REM7U0E3RFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtdHJlZS1tYXAtY2VsbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy10cmVlLW1hcC1jZWxsICpuZ0Zvcj1cImxldCBjIG9mIGNlbGxzOyB0cmFja0J5OnRyYWNrQnlcIlxuICAgICAgW2RhdGFdPVwiY1wiXG4gICAgICBbeF09XCJjLnhcIlxuICAgICAgW3ldPVwiYy55XCJcbiAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcbiAgICAgIFtsYWJlbF09XCJjLmxhYmVsXCJcbiAgICAgIFt2YWx1ZV09XCJjLnZhbHVlXCJcbiAgICAgIFt2YWx1ZVR5cGVdPVwiYy52YWx1ZVR5cGVcIlxuICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxuICAgICAgW2xhYmVsRm9ybWF0dGluZ109XCJsYWJlbEZvcm1hdHRpbmdcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgbmd4LXRvb2x0aXBcbiAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBnZXRUb29sdGlwVGV4dChjKVwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwiYy5kYXRhXCI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU1hcENlbGxTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBncmFkaWVudCA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNlbGxzOiBhbnlbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5jZWxscyA9IHRoaXMuZ2V0Q2VsbHMoKTtcbiAgfVxuXG4gIGdldENlbGxzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmNoaWxkcmVuXG4gICAgICAuZmlsdGVyKChkKSA9PiB7XG4gICAgICAgIHJldHVybiBkLmRlcHRoID09PSAxO1xuICAgICAgfSlcbiAgICAgIC5tYXAoKGQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gZC5pZDtcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIG5hbWU6IGxhYmVsLFxuICAgICAgICAgIHZhbHVlOiBkLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIHg6IGQueDAsXG4gICAgICAgICAgeTogZC55MCxcbiAgICAgICAgICB3aWR0aDogZC54MSAtIGQueDAsXG4gICAgICAgICAgaGVpZ2h0OiBkLnkxIC0gZC55MCxcbiAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCksXG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgdmFsdWU6IGQudmFsdWUsXG4gICAgICAgICAgdmFsdWVUeXBlOiBkLnZhbHVlVHlwZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dCh7IGxhYmVsLCB2YWx1ZSB9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLmxhYmVsO1xuICB9XG59XG4iXX0=