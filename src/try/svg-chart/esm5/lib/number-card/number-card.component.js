import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout, gridSize } from '../common/grid-layout.helper';
var NumberCardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emptyColor = 'rgba(0, 0, 0, 0)';
        _this.innerPadding = 15;
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    Object.defineProperty(NumberCardComponent.prototype, "clickable", {
        get: function () {
            return !!this.select.observers.length;
        },
        enumerable: true,
        configurable: true
    });
    NumberCardComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var size = gridSize(this.dims, this.results.length, 150);
        var N = size[0] * size[1];
        var data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NumberCardComponent.prototype, "cardColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NumberCardComponent.prototype, "bandColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NumberCardComponent.prototype, "emptyColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NumberCardComponent.prototype, "innerPadding", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NumberCardComponent.prototype, "textColor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NumberCardComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NumberCardComponent.prototype, "labelFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], NumberCardComponent.prototype, "designatedTotal", void 0);
    NumberCardComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-number-card',
            template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"false\"\n  [animations]=\"animations\">\n  <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n    <svg:g ng-svg-charts-card-series\n      [colors]=\"colors\"\n      [cardColor]=\"cardColor\"\n      [bandColor]=\"bandColor\"\n      [textColor]=\"textColor\"\n      [emptyColor]=\"emptyColor\"\n      [data]=\"data\"\n      [dims]=\"dims\"\n      [innerPadding]=\"innerPadding\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", "ng-svg-charts-number-card .cell .trimmed-label{font-size:12px;pointer-events:none;overflow:hidden;text-align:left;line-height:1em}ng-svg-charts-number-card .cell .trimmed-label p{overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis;width:100%;padding:0;margin:0}ng-svg-charts-number-card .cell .value-text{pointer-events:none}ng-svg-charts-number-card .number-card.clickable .cell .card,ng-svg-charts-number-card .number-card.clickable .cell .card-band{cursor:pointer}"]
        })
    ], NumberCardComponent);
    return NumberCardComponent;
}(BaseChartComponent));
export { NumberCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvbnVtYmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsS0FBSyxFQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVlwRTtJQUF5QywrQ0FBa0I7SUFWM0Q7UUFBQSxxRUF3RUM7UUEzRFUsZ0JBQVUsR0FBRyxrQkFBa0IsQ0FBQztRQUNoQyxrQkFBWSxHQUFHLEVBQUUsQ0FBQztRQVkzQixZQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUE4QzVCLENBQUM7SUExQ0Msc0JBQUksMENBQVM7YUFBYjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELG9DQUFNLEdBQU47UUFDRSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBYyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sV0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFJLENBQUM7UUFFM0UsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBM0RRO1FBQVIsS0FBSyxFQUFFOzswREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OzBEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7MkRBQWlDO0lBQ2hDO1FBQVIsS0FBSyxFQUFFOzs2REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OzBEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7Z0VBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOztnRUFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O2dFQUF5QjtJQVJ0QixtQkFBbUI7UUFWL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyx1c0JBQXdDO1lBS3hDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csbUJBQW1CLENBOEQvQjtJQUFELDBCQUFDO0NBQUEsQUE5REQsQ0FBeUMsa0JBQWtCLEdBOEQxRDtTQTlEWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgZ3JpZExheW91dCwgZ3JpZFNpemUgfSBmcm9tICcuLi9jb21tb24vZ3JpZC1sYXlvdXQuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc3ZnLWNoYXJ0cy1udW1iZXItY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnbnVtYmVyLWNhcmQudGVtcGxhdGUuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJyxcbiAgICAnLi9jYXJkLmNvbXBvbmVudC5zY3NzJ1xuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJDYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY2FyZENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhbmRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBlbXB0eUNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknO1xuICBASW5wdXQoKSBpbm5lclBhZGRpbmcgPSAxNTtcbiAgQElucHV0KCkgdGV4dENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgZGVzaWduYXRlZFRvdGFsOiBudW1iZXI7XG5cbiAgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIGRhdGE6IGFueVtdO1xuICBzbG90czogYW55W107XG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBkb21haW46IGFueVtdO1xuICBtYXJnaW4gPSBbMTAsIDEwLCAxMCwgMTBdO1xuXG4gIGJhY2tncm91bmRDYXJkczogYW55W107XG5cbiAgZ2V0IGNsaWNrYWJsZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLnNlbGVjdC5vYnNlcnZlcnMubGVuZ3RoO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cbiAgICB9KTtcblxuICAgIHRoaXMuZG9tYWluID0gdGhpcy5nZXREb21haW4oKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7IHRoaXMuZGltcy54T2Zmc2V0IH0gLCAkeyB0aGlzLm1hcmdpblswXSB9KWA7XG5cbiAgICBjb25zdCBzaXplID0gZ3JpZFNpemUodGhpcy5kaW1zLCB0aGlzLnJlc3VsdHMubGVuZ3RoLCAxNTApO1xuICAgIGNvbnN0IE4gPSBzaXplWzBdICogc2l6ZVsxXTtcblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnJlc3VsdHMuc2xpY2UoKTtcblxuICAgIHdoaWxlIChkYXRhLmxlbmd0aCA8IE4pIHtcbiAgICAgIGRhdGEucHVzaCh7dmFsdWU6IG51bGx9KTtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBncmlkTGF5b3V0KHRoaXMuZGltcywgZGF0YSwgMTUwLCB0aGlzLmRlc2lnbmF0ZWRUb3RhbCk7XG4gIH1cblxuICBnZXREb21haW4oKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5uYW1lKTtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBzZXRDb2xvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsICdvcmRpbmFsJywgdGhpcy5kb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcbiAgfVxuXG59XG4iXX0=