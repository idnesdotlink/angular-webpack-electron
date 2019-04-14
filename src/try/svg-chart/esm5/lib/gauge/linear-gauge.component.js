import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
var LinearGaugeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = 0;
        _this.max = 100;
        _this.value = 0;
        _this.margin = [10, 20, 10, 20];
        _this.valueResizeScale = 1;
        _this.unitsResizeScale = 1;
        _this.valueTextTransform = '';
        _this.valueTranslate = '';
        _this.unitsTextTransform = '';
        _this.unitsTranslate = '';
        return _this;
    }
    LinearGaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
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
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.transformLine = "translate(" + (this.margin[3] + this.valueScale(this.previousValue)) + ", " + yOffset + ")";
        this.valueTranslate = "translate(0, -15)";
        this.unitsTranslate = "translate(0, 15)";
        setTimeout(function () { return _this.scaleText('value'); }, 50);
        setTimeout(function () { return _this.scaleText('units'); }, 50);
    };
    LinearGaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    LinearGaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    LinearGaugeComponent.prototype.getDisplayValue = function () {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    };
    LinearGaugeComponent.prototype.scaleText = function (element, repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        var el;
        var resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        var _a = el.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0)
            return;
        var oldScale = resizeScale;
        var availableWidth = this.dims.width;
        var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () { _this.scaleText(element, false); }, 50);
            }
        }
    };
    LinearGaugeComponent.prototype.onClick = function () {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    };
    LinearGaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
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
            template: "\n    <ng-svg-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      [animations]=\"animations\"\n      (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g ng-svg-charts-bar\n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\">\n        </svg:g>\n        <svg:g ng-svg-charts-bar\n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\">\n        </svg:g>\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\"\n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\"\n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:g [attr.transform]=\"transform\">\n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"\n              alignment-baseline=\"after-edge\">\n              {{displayValue}}\n            </svg:text>\n          </svg:g>\n\n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"\n              alignment-baseline=\"before-edge\">\n              {{units}}\n            </svg:text>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ng-svg-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:rgba(0,0,0,.05)}.linear-gauge .units{fill:#666}"]
        })
    ], LinearGaugeComponent);
    return LinearGaugeComponent;
}(BaseChartComponent));
export { LinearGaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2xpbmVhci1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFxRnJEO0lBQTBDLGdEQUFrQjtJQW5GNUQ7UUFBQSxxRUF5TkM7UUFwSVUsU0FBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFNBQUcsR0FBRyxHQUFHLENBQUM7UUFDVixXQUFLLEdBQUcsQ0FBQyxDQUFDO1FBY25CLFlBQU0sR0FBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBR2pDLHNCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixzQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsd0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLHdCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4QixvQkFBYyxHQUFHLEVBQUUsQ0FBQzs7SUE0R3RCLENBQUM7SUF4R0MsOENBQWUsR0FBZjtRQUFBLGlCQU1DO1FBTEMsaUJBQU0sZUFBZSxXQUFFLENBQUM7UUFDeEIsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZ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S0FBSyxFQUFFOztxREFBUztJQUNSO1FBQVIsS0FBSyxFQUFFOztxREFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzt1REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzt1REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzsrREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOztpRUFBc0I7SUFFSjtRQUF6QixTQUFTLENBQUMsYUFBYSxDQUFDOzBDQUFjLFVBQVU7NkRBQUM7SUFDeEI7UUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQzswQ0FBYyxVQUFVOzZEQUFDO0lBVnZDLG9CQUFvQjtRQW5GaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsNnRFQXlFVDtZQUtELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csb0JBQW9CLENBc0loQztJQUFELDJCQUFDO0NBQUEsQUF0SUQsQ0FBMEMsa0JBQWtCLEdBc0kzRDtTQXRJWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNjYWxlTGluZWFyIH0gZnJvbSAnZDMtc2NhbGUnO1xuXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLWxpbmVhci1nYXVnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXN2Zy1jaGFydHMtY2hhcnRcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXG4gICAgICBbc2hvd0xlZ2VuZF09XCJmYWxzZVwiXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxzdmc6ZyBjbGFzcz1cImxpbmVhci1nYXVnZSBjaGFydFwiPlxuICAgICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1iYXJcbiAgICAgICAgICBjbGFzcz1cImJhY2tncm91bmQtYmFyXCJcbiAgICAgICAgICBbd2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICAgICAgW2hlaWdodF09XCIzXCJcbiAgICAgICAgICBbeF09XCJtYXJnaW5bM11cIlxuICAgICAgICAgIFt5XT1cImRpbXMuaGVpZ2h0IC8gMiArIG1hcmdpblswXSAtIDJcIlxuICAgICAgICAgIFtkYXRhXT1cInt9XCJcbiAgICAgICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCI+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWJhclxuICAgICAgICAgIFt3aWR0aF09XCJ2YWx1ZVNjYWxlKHZhbHVlKVwiXG4gICAgICAgICAgW2hlaWdodF09XCIzXCJcbiAgICAgICAgICBbeF09XCJtYXJnaW5bM11cIlxuICAgICAgICAgIFt5XT1cImRpbXMuaGVpZ2h0IC8gMiArIG1hcmdpblswXSAtIDJcIlxuICAgICAgICAgIFtmaWxsXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAgIFtkYXRhXT1cInt9XCJcbiAgICAgICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCI+XG4gICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICAgKm5nSWY9XCJoYXNQcmV2aW91c1ZhbHVlXCJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtTGluZVwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICB5MT1cIjVcIlxuICAgICAgICAgIHgyPVwiMFwiXG4gICAgICAgICAgeTI9XCIxNVwiXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxzdmc6bGluZVxuICAgICAgICAgICpuZ0lmPVwiaGFzUHJldmlvdXNWYWx1ZVwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUxpbmVcIlxuICAgICAgICAgIHgxPVwiMFwiXG4gICAgICAgICAgeTE9XCItNVwiXG4gICAgICAgICAgeDI9XCIwXCJcbiAgICAgICAgICB5Mj1cIi0xNVwiXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ2YWx1ZVRyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0ICN2YWx1ZVRleHRFbFxuICAgICAgICAgICAgICBjbGFzcz1cInZhbHVlXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidmFsdWVUZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYWZ0ZXItZWRnZVwiPlxuICAgICAgICAgICAgICB7e2Rpc3BsYXlWYWx1ZX19XG4gICAgICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInVuaXRzVHJhbnNsYXRlXCI+XG4gICAgICAgICAgICA8c3ZnOnRleHQgI3VuaXRzVGV4dEVsXG4gICAgICAgICAgICAgIGNsYXNzPVwidW5pdHNcIlxuICAgICAgICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCInbWlkZGxlJ1wiXG4gICAgICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ1bml0c1RleHRUcmFuc2Zvcm1cIlxuICAgICAgICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJiZWZvcmUtZWRnZVwiPlxuICAgICAgICAgICAgICB7e3VuaXRzfX1cbiAgICAgICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgPC9zdmc6Zz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9uZy1zdmctY2hhcnRzLWNoYXJ0PlxuICBgLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi4vY29tbW9uL2Jhc2UtY2hhcnQvYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcycsXG4gICAgJy4vbGluZWFyLWdhdWdlLmNvbXBvbmVudC5zY3NzJ1xuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTGluZWFyR2F1Z2VDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHZhbHVlID0gMDtcbiAgQElucHV0KCkgdW5pdHM6IHN0cmluZztcbiAgQElucHV0KCkgcHJldmlvdXNWYWx1ZTtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgndmFsdWVUZXh0RWwnKSB2YWx1ZVRleHRFbDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndW5pdHNUZXh0RWwnKSB1bml0c1RleHRFbDogRWxlbWVudFJlZjtcblxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcbiAgdmFsdWVEb21haW46IGFueTtcbiAgdmFsdWVTY2FsZTogYW55O1xuXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBtYXJnaW46IGFueVtdID0gWzEwLCAyMCwgMTAsIDIwXTtcbiAgdHJhbnNmb3JtTGluZTogc3RyaW5nO1xuXG4gIHZhbHVlUmVzaXplU2NhbGUgPSAxO1xuICB1bml0c1Jlc2l6ZVNjYWxlID0gMTtcbiAgdmFsdWVUZXh0VHJhbnNmb3JtID0gJyc7XG4gIHZhbHVlVHJhbnNsYXRlID0gJyc7XG4gIHVuaXRzVGV4dFRyYW5zZm9ybSA9ICcnO1xuICB1bml0c1RyYW5zbGF0ZSA9ICcnO1xuICBkaXNwbGF5VmFsdWU6IHN0cmluZztcbiAgaGFzUHJldmlvdXNWYWx1ZTogYm9vbGVhbjtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjYWxlVGV4dCgndmFsdWUnKTtcbiAgICAgIHRoaXMuc2NhbGVUZXh0KCd1bml0cycpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy5oYXNQcmV2aW91c1ZhbHVlID0gdGhpcy5wcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgdGhpcy52YWx1ZSk7XG4gICAgdGhpcy5taW4gPSBNYXRoLm1pbih0aGlzLm1pbiwgdGhpcy52YWx1ZSk7XG4gICAgaWYgKHRoaXMuaGFzUHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgdGhpcy5wcmV2aW91c1ZhbHVlKTtcbiAgICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHRoaXMucHJldmlvdXNWYWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cbiAgICB9KTtcblxuICAgIHRoaXMudmFsdWVEb21haW4gPSB0aGlzLmdldFZhbHVlRG9tYWluKCk7XG4gICAgdGhpcy52YWx1ZVNjYWxlID0gdGhpcy5nZXRWYWx1ZVNjYWxlKCk7XG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmdldERpc3BsYXlWYWx1ZSgpO1xuXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcblxuICAgIGNvbnN0IHhPZmZzZXQgPSB0aGlzLm1hcmdpblszXSArIHRoaXMuZGltcy53aWR0aCAvIDI7XG4gICAgY29uc3QgeU9mZnNldCA9IHRoaXMubWFyZ2luWzBdICsgdGhpcy5kaW1zLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHsgeE9mZnNldCB9LCAkeyB5T2Zmc2V0IH0pYDtcbiAgICB0aGlzLnRyYW5zZm9ybUxpbmUgPSBgdHJhbnNsYXRlKCR7IHRoaXMubWFyZ2luWzNdICsgdGhpcy52YWx1ZVNjYWxlKHRoaXMucHJldmlvdXNWYWx1ZSkgfSwgJHsgeU9mZnNldCB9KWA7XG4gICAgdGhpcy52YWx1ZVRyYW5zbGF0ZSA9IGB0cmFuc2xhdGUoMCwgLTE1KWA7XG4gICAgdGhpcy51bml0c1RyYW5zbGF0ZSA9IGB0cmFuc2xhdGUoMCwgMTUpYDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KCd2YWx1ZScpLCA1MCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dCgndW5pdHMnKSwgNTApO1xuICB9XG5cbiAgZ2V0VmFsdWVEb21haW4oKTogYW55W10ge1xuICAgIHJldHVybiBbdGhpcy5taW4sIHRoaXMubWF4XTtcbiAgfVxuXG4gIGdldFZhbHVlU2NhbGUoKTogYW55IHtcbiAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxuICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxuICAgICAgLmRvbWFpbih0aGlzLnZhbHVlRG9tYWluKTtcbiAgfVxuXG4gIGdldERpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnZhbHVlRm9ybWF0dGluZykge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVGb3JtYXR0aW5nKHRoaXMudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgc2NhbGVUZXh0KGVsZW1lbnQsIHJlcGVhdCA9IHRydWUpOiB2b2lkIHtcbiAgICBsZXQgZWw7XG4gICAgbGV0IHJlc2l6ZVNjYWxlO1xuICAgIGlmIChlbGVtZW50ID09PSAndmFsdWUnKSB7XG4gICAgICBlbCA9IHRoaXMudmFsdWVUZXh0RWw7XG4gICAgICByZXNpemVTY2FsZSA9IHRoaXMudmFsdWVSZXNpemVTY2FsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwgPSB0aGlzLnVuaXRzVGV4dEVsO1xuICAgICAgcmVzaXplU2NhbGUgPSB0aGlzLnVuaXRzUmVzaXplU2NhbGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHJldHVybjtcbiAgICBjb25zdCBvbGRTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xuICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IE1hdGgubWF4KHRoaXMuZGltcy5oZWlnaHQgLyAyIC0gMTUsIDApO1xuICAgIGNvbnN0IHJlc2l6ZVNjYWxlV2lkdGggPSBNYXRoLmZsb29yKChhdmFpbGFibGVXaWR0aCAvICh3aWR0aCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IHJlc2l6ZVNjYWxlSGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlSGVpZ2h0IC8gKGhlaWdodCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xuICAgIHJlc2l6ZVNjYWxlID0gTWF0aC5taW4ocmVzaXplU2NhbGVIZWlnaHQsIHJlc2l6ZVNjYWxlV2lkdGgpO1xuXG4gICAgaWYgKHJlc2l6ZVNjYWxlICE9PSBvbGRTY2FsZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgdGhpcy52YWx1ZVJlc2l6ZVNjYWxlID0gcmVzaXplU2NhbGU7XG4gICAgICAgIHRoaXMudmFsdWVUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7IHJlc2l6ZVNjYWxlIH0sICR7IHJlc2l6ZVNjYWxlIH0pYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudW5pdHNSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgICAgICB0aGlzLnVuaXRzVGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgkeyByZXNpemVTY2FsZSB9LCAkeyByZXNpemVTY2FsZSB9KWA7XG4gICAgICB9XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgaWYgKHJlcGVhdCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zY2FsZVRleHQoZWxlbWVudCwgZmFsc2UpOyB9LCA1MCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIG5hbWU6ICdWYWx1ZScsXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIFt0aGlzLnZhbHVlXSwgdGhpcy5jdXN0b21Db2xvcnMpO1xuICB9XG59XG4iXX0=