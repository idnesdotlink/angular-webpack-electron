import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
var PieChartComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartComponent, _super);
    function PieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labels = false;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.explodeSlices = false;
        _this.doughnut = false;
        _this.arcWidth = 0.25;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.trimLabels = true;
        _this.maxLabelLength = 10;
        _this.dblclick = new EventEmitter();
        _this.select = new EventEmitter();
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (this.labels) {
            this.margin = [30, 80, 30, 80];
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
        this.outerRadius = Math.min(this.dims.width, this.dims.height);
        if (this.labels) {
            // make room for labels
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * (1 - this.arcWidth);
        }
        this.domain = this.getDomain();
        // sort data according to domain
        this.data = this.results.sort(function (a, b) {
            return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
        });
        this.setColors();
        this.legendOptions = this.getLegendOptions();
    };
    PieChartComponent.prototype.getDomain = function () {
        var items = [];
        this.results.map(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            if (items.indexOf(label) === -1) {
                items.push(label);
            }
        });
        return items;
    };
    PieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieChartComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieChartComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.domain,
            colors: this.colors,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    PieChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = tslib_1.__spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = tslib_1.__spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "labels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "legend", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "legendTitle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "legendPosition", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "explodeSlices", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "doughnut", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "arcWidth", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PieChartComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], PieChartComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "labelFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "trimLabels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "maxLabelLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "tooltipText", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "dblclick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieChartComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PieChartComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PieChartComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        ContentChild('tooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PieChartComponent.prototype, "tooltipTemplate", void 0);
    PieChartComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-pie-chart',
            template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n    <svg:g ng-svg-charts-pie-series\n      [colors]=\"colors\"\n      [series]=\"data\"\n      [showLabels]=\"labels\"\n      [labelFormatting]=\"labelFormatting\"\n      [trimLabels]=\"trimLabels\"\n      [maxLabelLength]=\"maxLabelLength\"\n      [activeEntries]=\"activeEntries\"\n      [innerRadius]=\"innerRadius\"\n      [outerRadius]=\"outerRadius\"\n      [explodeSlices]=\"explodeSlices\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipText]=\"tooltipText\"\n      (dblclick)=\"dblclick.emit($event)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:750ms ease-in fadeIn;animation:750ms ease-in fadeIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;-webkit-transition:d 750ms;-o-transition:d 750ms;transition:d 750ms}@-webkit-keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}"]
        })
    ], PieChartComponent);
    return PieChartComponent;
}(BaseChartComponent));
export { PieChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFZL0U7SUFBdUMsNkNBQWtCO0lBVnpEO1FBQUEscUVBaUpDO1FBcklVLFlBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsaUJBQVcsR0FBRyxRQUFRLENBQUM7UUFDdkIsb0JBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIsbUJBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLG1CQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLHFCQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGdCQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR25CLGNBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLFlBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGNBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxnQkFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVzdELFlBQU0sR0FBRyxDQUFD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QUM5QjtRQUFULE1BQU0sRUFBRTs7cURBQTZCO0lBQzVCO1FBQVQsTUFBTSxFQUFFOzBDQUFXLFlBQVk7dURBQTJCO0lBQ2pEO1FBQVQsTUFBTSxFQUFFOzBDQUFhLFlBQVk7eURBQTJCO0lBRTVCO1FBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzswQ0FBa0IsV0FBVzs4REFBTTtJQXRCeEQsaUJBQWlCO1FBVjdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMseXJDQUFzQztZQUt0QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLGlCQUFpQixDQXVJN0I7SUFBRCx3QkFBQztDQUFBLEFBdklELENBQXVDLGtCQUFrQixHQXVJeEQ7U0F2SVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0L2Jhc2UtY2hhcnQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc3ZnLWNoYXJ0cy1waWUtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3BpZS1jaGFydC50ZW1wbGF0ZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4uL2NvbW1vbi9iYXNlLWNoYXJ0L2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnLFxuICAgICcuL3BpZS1jaGFydC5jb21wb25lbnQuc2NzcydcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllQ2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGxhYmVscyA9IGZhbHNlO1xuICBASW5wdXQoKSBsZWdlbmQgPSBmYWxzZTtcbiAgQElucHV0KCkgbGVnZW5kVGl0bGUgPSAnTGVnZW5kJztcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb24gPSAncmlnaHQnO1xuICBASW5wdXQoKSBleHBsb2RlU2xpY2VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRvdWdobnV0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFyY1dpZHRoID0gMC4yNTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgdHJpbUxhYmVscyA9IHRydWU7XG4gIEBJbnB1dCgpIG1heExhYmVsTGVuZ3RoID0gMTA7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiBhbnk7XG5cbiAgQE91dHB1dCgpIGRibGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHRyYW5zbGF0aW9uOiBzdHJpbmc7XG4gIG91dGVyUmFkaXVzOiBudW1iZXI7XG4gIGlubmVyUmFkaXVzOiBudW1iZXI7XG4gIGRhdGE6IGFueTtcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgZG9tYWluOiBhbnk7XG4gIGRpbXM6IGFueTtcbiAgbWFyZ2luID0gWzIwLCAyMCwgMjAsIDIwXTtcbiAgbGVnZW5kT3B0aW9uczogYW55O1xuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLmxhYmVscykge1xuICAgICAgdGhpcy5tYXJnaW4gPSBbMzAsIDgwLCAzMCwgODBdO1xuICAgIH1cblxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luLFxuICAgICAgc2hvd0xlZ2VuZDogdGhpcy5sZWdlbmQsXG4gICAgICBsZWdlbmRQb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxuICAgIH0pO1xuXG4gICAgY29uc3QgeE9mZnNldCA9IHRoaXMubWFyZ2luWzNdICsgdGhpcy5kaW1zLndpZHRoIC8gMjtcbiAgICBjb25zdCB5T2Zmc2V0ID0gdGhpcy5tYXJnaW5bMF0gKyB0aGlzLmRpbXMuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnRyYW5zbGF0aW9uID0gYHRyYW5zbGF0ZSgke3hPZmZzZXR9LCAke3lPZmZzZXR9KWA7XG4gICAgdGhpcy5vdXRlclJhZGl1cyA9IE1hdGgubWluKHRoaXMuZGltcy53aWR0aCwgdGhpcy5kaW1zLmhlaWdodCk7XG4gICAgaWYgKHRoaXMubGFiZWxzKSB7XG4gICAgICAvLyBtYWtlIHJvb20gZm9yIGxhYmVsc1xuICAgICAgdGhpcy5vdXRlclJhZGl1cyAvPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm91dGVyUmFkaXVzIC89IDI7XG4gICAgfVxuICAgIHRoaXMuaW5uZXJSYWRpdXMgPSAwO1xuICAgIGlmICh0aGlzLmRvdWdobnV0KSB7XG4gICAgICB0aGlzLmlubmVyUmFkaXVzID0gdGhpcy5vdXRlclJhZGl1cyAqICgxIC0gdGhpcy5hcmNXaWR0aCk7XG4gICAgfVxuXG4gICAgdGhpcy5kb21haW4gPSB0aGlzLmdldERvbWFpbigpO1xuXG4gICAgLy8gc29ydCBkYXRhIGFjY29yZGluZyB0byBkb21haW5cbiAgICB0aGlzLmRhdGEgPSB0aGlzLnJlc3VsdHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZG9tYWluLmluZGV4T2YoYS5uYW1lKSAtIHRoaXMuZG9tYWluLmluZGV4T2YoYi5uYW1lKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XG4gIH1cblxuICBnZXREb21haW4oKTogYW55W10ge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG5cbiAgICB0aGlzLnJlc3VsdHMubWFwKGQgPT4ge1xuICAgICAgbGV0IGxhYmVsID0gZC5uYW1lO1xuICAgICAgaWYgKGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xuICAgICAgICBsYWJlbCA9IGxhYmVsLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbXMuaW5kZXhPZihsYWJlbCkgPT09IC0xKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobGFiZWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgJ29yZGluYWwnLCB0aGlzLmRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xuICB9XG5cbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGVUeXBlOiAnb3JkaW5hbCcsXG4gICAgICBkb21haW46IHRoaXMuZG9tYWluLFxuICAgICAgY29sb3JzOiB0aGlzLmNvbG9ycyxcbiAgICAgIHRpdGxlOiB0aGlzLmxlZ2VuZFRpdGxlLFxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cbiAgICB9O1xuICB9XG5cbiAgb25BY3RpdmF0ZShpdGVtKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xuICAgIH0pO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsgaXRlbSwgLi4udGhpcy5hY3RpdmVFbnRyaWVzIF07XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZShpdGVtKSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xuXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xuICB9XG5cbn1cbiJdfQ==