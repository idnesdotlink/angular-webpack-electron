import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { min } from 'd3-array';
import { format } from 'd3-format';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';
import { gridLayout } from '../common/grid-layout.helper';
import { formatLabel } from '../common/label.helper';
var PieGridComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PieGridComponent, _super);
    function PieGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.minWidth = 150;
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieGridComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieGridComponent.prototype.defaultTooltipText = function (_a) {
        var data = _a.data;
        var label = trimLabel(formatLabel(data.name));
        var val = data.value.toLocaleString();
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieGridComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGridComponent.prototype.getSeries = function () {
        var _this = this;
        var total = this.designatedTotal ? this.designatedTotal : this.getTotal();
        return this.data.map(function (d) {
            var baselineLabelHeight = 20;
            var padding = 10;
            var name = d.data.name;
            var label = formatLabel(name);
            var value = d.data.value;
            var radius = (min([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
            var innerRadius = radius * 0.9;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale.getColor(label);
                }
            };
            var xPos = d.x + (d.width - padding) / 2;
            var yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: "translate(" + xPos + ", " + yPos + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                name: name,
                label: trimLabel(label),
                total: value,
                value: value,
                percent: format('.1%')(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }]
            };
        });
    };
    PieGridComponent.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    PieGridComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieGridComponent.prototype.setColors = function () {
        this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], PieGridComponent.prototype, "designatedTotal", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieGridComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], PieGridComponent.prototype, "tooltipText", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieGridComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieGridComponent.prototype, "minWidth", void 0);
    tslib_1.__decorate([
        ContentChild('tooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PieGridComponent.prototype, "tooltipTemplate", void 0);
    PieGridComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-pie-grid',
            template: 'pie-grid.template.html',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}"]
        })
    ], PieGridComponent);
    return PieGridComponent;
}(BaseChartComponent));
export { PieGridComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvcGllLWNoYXJ0L3BpZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBWXJEO0lBQXNDLDRDQUFrQjtJQVZ4RDtRQUFBLHFFQXdIQztRQTVHVSxxQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV4QixXQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLGNBQVEsR0FBRyxHQUFHLENBQUM7UUFReEIsWUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0lBaUc1QixDQUFDO0lBN0ZDLGlDQUFNLEdBQU47UUFDRSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFL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QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUEzR1E7UUFBUixLQUFLLEVBQUU7OzZEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7NkRBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzt5REFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7O21EQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7c0RBQWdCO0lBVVM7UUFBaEMsWUFBWSxDQUFDLGlCQUFpQixDQUFDOzBDQUFrQixXQUFXOzZEQUFNO0lBZnhELGdCQUFnQjtRQVY1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSx3QkFBd0I7WUFLbEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxnQkFBZ0IsQ0E4RzVCO0lBQUQsdUJBQUM7Q0FBQSxBQTlHRCxDQUFzQyxrQkFBa0IsR0E4R3ZEO1NBOUdZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1pbiB9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2QzLWZvcm1hdCc7XG5cbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgZ3JpZExheW91dCB9IGZyb20gJy4uL2NvbW1vbi9ncmlkLWxheW91dC5oZWxwZXInO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc3ZnLWNoYXJ0cy1waWUtZ3JpZCcsXG4gIHRlbXBsYXRlOiAncGllLWdyaWQudGVtcGxhdGUuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJyxcbiAgICAnLi9waWUtZ3JpZC5jb21wb25lbnQuc2NzcydcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBpZUdyaWRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSBkZXNpZ25hdGVkVG90YWw6IG51bWJlcjtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiAobzogYW55KSA9PiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsID0gJ1RvdGFsJztcbiAgQElucHV0KCkgbWluV2lkdGggPSAxNTA7XG5cbiAgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIGRhdGE6IGFueVtdO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgc2VyaWVzOiBhbnlbXTtcbiAgZG9tYWluOiBhbnlbXTtcbiAgY29sb3JTY2FsZTogQ29sb3JIZWxwZXI7XG4gIG1hcmdpbiA9IFsyMCwgMjAsIDIwLCAyMF07XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luXG4gICAgfSk7XG5cbiAgICB0aGlzLmRvbWFpbiA9IHRoaXMuZ2V0RG9tYWluKCk7XG5cbiAgICB0aGlzLmRhdGEgPSBncmlkTGF5b3V0KHRoaXMuZGltcywgdGhpcy5yZXN1bHRzLCB0aGlzLm1pbldpZHRoLCB0aGlzLmRlc2lnbmF0ZWRUb3RhbCk7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5tYXJnaW5bM119ICwgJHt0aGlzLm1hcmdpblswXX0pYDtcblxuICAgIHRoaXMuc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoKTtcbiAgICB0aGlzLnNldENvbG9ycygpO1xuXG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcFRleHQgfHwgdGhpcy5kZWZhdWx0VG9vbHRpcFRleHQ7XG4gIH1cblxuICBkZWZhdWx0VG9vbHRpcFRleHQoeyBkYXRhIH0pOiBzdHJpbmcge1xuICAgIGNvbnN0IGxhYmVsID0gdHJpbUxhYmVsKGZvcm1hdExhYmVsKGRhdGEubmFtZSkpO1xuICAgIGNvbnN0IHZhbCA9IGRhdGEudmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx9PC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICBnZXREb21haW4oKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5uYW1lKTtcbiAgfVxuXG4gIGdldFNlcmllcygpOiBhbnlbXSB7XG4gICAgY29uc3QgdG90YWwgPSB0aGlzLmRlc2lnbmF0ZWRUb3RhbCA/IHRoaXMuZGVzaWduYXRlZFRvdGFsIDogdGhpcy5nZXRUb3RhbCgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoKGQpID0+IHtcbiAgICAgIGNvbnN0IGJhc2VsaW5lTGFiZWxIZWlnaHQgPSAyMDtcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcbiAgICAgIGNvbnN0IG5hbWUgPSBkLmRhdGEubmFtZTtcbiAgICAgIGNvbnN0IGxhYmVsID0gZm9ybWF0TGFiZWwobmFtZSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGQuZGF0YS52YWx1ZTtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IChtaW4oW2Qud2lkdGggLSBwYWRkaW5nLCBkLmhlaWdodCAtIGJhc2VsaW5lTGFiZWxIZWlnaHRdKSAvIDIpIC0gNTtcbiAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzICogMC45O1xuXG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgY29uc3QgY29sb3JzID0gKCkgPT4ge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoMTAwLDEwMCwxMDAsMC4zKSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvcihsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHhQb3MgPSBkLnggKyAoZC53aWR0aCAtIHBhZGRpbmcpIC8gMjtcbiAgICAgIGNvbnN0IHlQb3MgPSBkLnkgKyAoZC5oZWlnaHQgLSBiYXNlbGluZUxhYmVsSGVpZ2h0KSAvIDI7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3hQb3N9LCAke3lQb3N9KWAsXG4gICAgICAgIGNvbG9ycyxcbiAgICAgICAgaW5uZXJSYWRpdXMsXG4gICAgICAgIG91dGVyUmFkaXVzOiByYWRpdXMsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxhYmVsOiB0cmltTGFiZWwobGFiZWwpLFxuICAgICAgICB0b3RhbDogdmFsdWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBwZXJjZW50OiBmb3JtYXQoJy4xJScpKGQuZGF0YS5wZXJjZW50KSxcbiAgICAgICAgZGF0YTogW2QsIHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBvdGhlcjogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB0b3RhbCAtIHZhbHVlLFxuICAgICAgICAgICAgbmFtZTogZC5kYXRhLm5hbWVcbiAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG90YWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzXG4gICAgICAubWFwKGQgPT4gZC52YWx1ZSlcbiAgICAgIC5yZWR1Y2UoKHN1bSwgZCkgPT4gc3VtICsgZCwgMCk7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuY29sb3JTY2FsZSA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgJ29yZGluYWwnLCB0aGlzLmRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xuICB9XG5cbn1cbiJdfQ==