import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
var GaugeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GaugeComponent, _super);
    function GaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.min = 0;
        _this.max = 100;
        _this.bigSegments = 10;
        _this.smallSegments = 5;
        _this.showAxis = true;
        _this.startAngle = -120;
        _this.angleSpan = 240;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.resizeScale = 1;
        _this.rotation = '';
        _this.textTransform = 'scale(1, 1)';
        _this.cornerRadius = 10;
        return _this;
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (!this.showAxis) {
            if (!this.margin) {
                this.margin = [10, 20, 10, 20];
            }
        }
        else {
            if (!this.margin) {
                this.margin = [60, 100, 60, 100];
            }
        }
        // make the starting angle positive
        if (this.startAngle < 0) {
            this.startAngle = (this.startAngle % 360) + 360;
        }
        this.angleSpan = Math.min(this.angleSpan, 360);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.domain = this.getDomain();
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
        this.arcs = this.getArcs();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.rotation = "rotate(" + this.startAngle + ")";
        setTimeout(function () { return _this.scaleText(); }, 50);
    };
    GaugeComponent.prototype.getArcs = function () {
        var e_1, _a;
        var arcs = [];
        var availableRadius = this.outerRadius * 0.7;
        var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        var arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        var i = 0;
        try {
            for (var _b = tslib_1.__values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var d = _c.value;
                var outerRadius = this.outerRadius - (i * radiusPerArc);
                var innerRadius = outerRadius - arcWidth;
                var backgroundArc = {
                    endAngle: this.angleSpan * Math.PI / 180,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    data: {
                        value: this.max,
                        name: d.name
                    }
                };
                var valueArc = {
                    endAngle: Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI / 180,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    data: {
                        value: d.value,
                        name: d.name
                    }
                };
                var arc = {
                    backgroundArc: backgroundArc,
                    valueArc: valueArc
                };
                arcs.push(arc);
                i++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return arcs;
    };
    GaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, tslib_1.__spread(values));
        var dataMax = Math.max.apply(Math, tslib_1.__spread(values));
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getDisplayValue = function () {
        var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
        if (this.textValue && 0 !== this.textValue.length) {
            return this.textValue.toLocaleString();
        }
        if (this.valueFormatting) {
            return this.valueFormatting(value);
        }
        return value.toLocaleString();
    };
    GaugeComponent.prototype.scaleText = function (repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        var oldScale = this.resizeScale;
        if (width === 0) {
            this.resizeScale = 1;
        }
        else {
            var availableSpace = this.textRadius;
            this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        }
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () { return _this.scaleText(false); }, 50);
            }
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    GaugeComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            colors: this.colors,
            domain: this.domain,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    GaugeComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = tslib_1.__spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = tslib_1.__spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    GaugeComponent.prototype.trackBy = function (index, item) {
        return item.valueArc.data.name;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "legend", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "legendTitle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "legendPosition", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "min", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "max", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], GaugeComponent.prototype, "textValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], GaugeComponent.prototype, "units", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "bigSegments", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "smallSegments", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], GaugeComponent.prototype, "results", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "showAxis", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "startAngle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "angleSpan", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], GaugeComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "axisTickFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], GaugeComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], GaugeComponent.prototype, "margin", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], GaugeComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], GaugeComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        ContentChild('tooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], GaugeComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        ViewChild('textEl'),
        tslib_1.__metadata("design:type", ElementRef)
    ], GaugeComponent.prototype, "textEl", void 0);
    GaugeComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-gauge',
            template: "\n    <ng-svg-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs; trackBy:trackBy\" [attr.transform]=\"rotation\">\n          <svg:g ng-svg-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            [isActive]=\"isActive(arc.valueArc.data)\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [valueFormatting]=\"valueFormatting\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\">\n          </svg:g>\n        </svg:g>\n\n        <svg:g ng-svg-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\"\n          [tickFormatting]=\"axisTickFormatting\">\n        </svg:g>\n\n        <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n          <tspan x=\"0\" dy=\"0\">{{displayValue}}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{units}}</tspan>\n        </svg:text>\n\n      </svg:g>\n    </ng-svg-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".gauge .background-arc path{fill:rgba(0,0,0,.05)}.gauge .gauge-tick path{stroke:#666}.gauge .gauge-tick text{font-size:12px;fill:#666;font-weight:700}.gauge .gauge-tick-large path{stroke-width:2px}.gauge .gauge-tick-small path{stroke-width:1px}"]
        })
    ], GaugeComponent);
    return GaugeComponent;
}(BaseChartComponent));
export { GaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvZ2F1Z2UvZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUVULHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQStEckQ7SUFBb0MsMENBQWtCO0lBN0R0RDtRQUFBLHFFQXNVQztRQXZRVSxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsaUJBQVcsR0FBRyxRQUFRLENBQUM7UUFDdkIsb0JBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIsU0FBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFNBQUcsR0FBRyxHQUFHLENBQUM7UUFHVixpQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQixjQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGdCQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDbEIsZUFBUyxHQUFHLEdBQUcsQ0FBQztRQUNoQixtQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUUxQixxQkFBZSxHQUFHLEtBQUssQ0FBQztRQU12QixjQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZ0JBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWdCN0QsaUJB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OztzREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O3FEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7eURBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFOzs4REFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7OzJEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7MkRBQXlDO0lBR3hDO1FBQVIsS0FBSyxFQUFFOztrREFBZTtJQUViO1FBQVQsTUFBTSxFQUFFOzBDQUFXLFlBQVk7b0RBQTJCO0lBQ2pEO1FBQVQsTUFBTSxFQUFFOzBDQUFhLFlBQVk7c0RBQTJCO0lBRTVCO1FBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzswQ0FBa0IsV0FBVzsyREFBTTtJQUU5QztRQUFwQixTQUFTLENBQUMsUUFBUSxDQUFDOzBDQUFTLFVBQVU7a0RBQUM7SUE1QjdCLGNBQWM7UUE3RDFCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsUUFBUSxFQUFFLDg1REFtRFQ7WUFLRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLGNBQWMsQ0F5UTFCO0lBQUQscUJBQUM7Q0FBQSxBQXpRRCxDQUFvQyxrQkFBa0IsR0F5UXJEO1NBelFZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcblxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQvYmFzZS1jaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc3ZnLWNoYXJ0cy1nYXVnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXN2Zy1jaGFydHMtY2hhcnRcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxuICAgICAgW2xlZ2VuZE9wdGlvbnNdPVwibGVnZW5kT3B0aW9uc1wiXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKGxlZ2VuZExhYmVsQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAobGVnZW5kTGFiZWxEZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCI+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiZ2F1Z2UgY2hhcnRcIj5cbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBhcmMgb2YgYXJjczsgdHJhY2tCeTp0cmFja0J5XCIgW2F0dHIudHJhbnNmb3JtXT1cInJvdGF0aW9uXCI+XG4gICAgICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtZ2F1Z2UtYXJjXG4gICAgICAgICAgICBbYmFja2dyb3VuZEFyY109XCJhcmMuYmFja2dyb3VuZEFyY1wiXG4gICAgICAgICAgICBbdmFsdWVBcmNdPVwiYXJjLnZhbHVlQXJjXCJcbiAgICAgICAgICAgIFtjb3JuZXJSYWRpdXNdPVwiY29ybmVyUmFkaXVzXCJcbiAgICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcbiAgICAgICAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShhcmMudmFsdWVBcmMuZGF0YSlcIlxuICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxuICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgPC9zdmc6Zz5cblxuICAgICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1nYXVnZS1heGlzXG4gICAgICAgICAgKm5nSWY9XCJzaG93QXhpc1wiXG4gICAgICAgICAgW2JpZ1NlZ21lbnRzXT1cImJpZ1NlZ21lbnRzXCJcbiAgICAgICAgICBbc21hbGxTZWdtZW50c109XCJzbWFsbFNlZ21lbnRzXCJcbiAgICAgICAgICBbbWluXT1cIm1pblwiXG4gICAgICAgICAgW21heF09XCJtYXhcIlxuICAgICAgICAgIFtyYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxuICAgICAgICAgIFthbmdsZVNwYW5dPVwiYW5nbGVTcGFuXCJcbiAgICAgICAgICBbdmFsdWVTY2FsZV09XCJ2YWx1ZVNjYWxlXCJcbiAgICAgICAgICBbc3RhcnRBbmdsZV09XCJzdGFydEFuZ2xlXCJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwiYXhpc1RpY2tGb3JtYXR0aW5nXCI+XG4gICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgPHN2Zzp0ZXh0ICN0ZXh0RWxcbiAgICAgICAgICAgIFtzdHlsZS50ZXh0QW5jaG9yXT1cIidtaWRkbGUnXCJcbiAgICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0ZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImNlbnRyYWxcIj5cbiAgICAgICAgICA8dHNwYW4geD1cIjBcIiBkeT1cIjBcIj57e2Rpc3BsYXlWYWx1ZX19PC90c3Bhbj5cbiAgICAgICAgICA8dHNwYW4geD1cIjBcIiBkeT1cIjEuMmVtXCI+e3t1bml0c319PC90c3Bhbj5cbiAgICAgICAgPC9zdmc6dGV4dD5cblxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25nLXN2Zy1jaGFydHMtY2hhcnQ+XG4gIGAsXG4gIHN0eWxlVXJsczogW1xuICAgICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJyxcbiAgICAnLi9nYXVnZS5jb21wb25lbnQuc2NzcydcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEdhdWdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgbGVnZW5kID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlID0gJ0xlZ2VuZCc7XG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uID0gJ3JpZ2h0JztcbiAgQElucHV0KCkgbWluID0gMDtcbiAgQElucHV0KCkgbWF4ID0gMTAwO1xuICBASW5wdXQoKSB0ZXh0VmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgdW5pdHM6IHN0cmluZztcbiAgQElucHV0KCkgYmlnU2VnbWVudHMgPSAxMDtcbiAgQElucHV0KCkgc21hbGxTZWdtZW50cyA9IDU7XG4gIEBJbnB1dCgpIHJlc3VsdHM6IGFueVtdO1xuICBASW5wdXQoKSBzaG93QXhpcyA9IHRydWU7XG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGUgPSAtMTIwO1xuICBASW5wdXQoKSBhbmdsZVNwYW4gPSAyNDA7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIGF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG4gIC8vIFNwZWNpZnkgbWFyZ2luc1xuICBASW5wdXQoKSBtYXJnaW46IGFueVtdO1xuXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQFZpZXdDaGlsZCgndGV4dEVsJykgdGV4dEVsOiBFbGVtZW50UmVmO1xuXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICBkb21haW46IGFueVtdO1xuICB2YWx1ZURvbWFpbjogYW55O1xuICB2YWx1ZVNjYWxlOiBhbnk7XG5cbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG5cbiAgb3V0ZXJSYWRpdXM6IG51bWJlcjtcbiAgdGV4dFJhZGl1czogbnVtYmVyOyAvLyBtYXggYXZhaWxhYmxlIHJhZGl1cyBmb3IgdGhlIHRleHRcbiAgcmVzaXplU2NhbGUgPSAxO1xuICByb3RhdGlvbiA9ICcnO1xuICB0ZXh0VHJhbnNmb3JtID0gJ3NjYWxlKDEsIDEpJztcbiAgY29ybmVyUmFkaXVzID0gMTA7XG4gIGFyY3M6IGFueVtdO1xuICBkaXNwbGF5VmFsdWU6IHN0cmluZztcbiAgbGVnZW5kT3B0aW9uczogYW55O1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KCkpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgaWYgKCF0aGlzLnNob3dBeGlzKSB7XG4gICAgICBpZiAoIXRoaXMubWFyZ2luKSB7XG4gICAgICAgIHRoaXMubWFyZ2luID0gWzEwLCAyMCwgMTAsIDIwXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLm1hcmdpbikge1xuICAgICAgICB0aGlzLm1hcmdpbiA9IFs2MCwgMTAwLCA2MCwgMTAwXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtYWtlIHRoZSBzdGFydGluZyBhbmdsZSBwb3NpdGl2ZVxuICAgIGlmICh0aGlzLnN0YXJ0QW5nbGUgPCAwKSB7XG4gICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAodGhpcy5zdGFydEFuZ2xlICUgMzYwKSArIDM2MDtcbiAgICB9XG5cbiAgICB0aGlzLmFuZ2xlU3BhbiA9IE1hdGgubWluKHRoaXMuYW5nbGVTcGFuLCAzNjApO1xuXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW4sXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXG4gICAgfSk7XG5cbiAgICB0aGlzLmRvbWFpbiA9IHRoaXMuZ2V0RG9tYWluKCk7XG4gICAgdGhpcy52YWx1ZURvbWFpbiA9IHRoaXMuZ2V0VmFsdWVEb21haW4oKTtcbiAgICB0aGlzLnZhbHVlU2NhbGUgPSB0aGlzLmdldFZhbHVlU2NhbGUoKTtcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKCk7XG5cbiAgICB0aGlzLm91dGVyUmFkaXVzID0gTWF0aC5taW4odGhpcy5kaW1zLndpZHRoLCB0aGlzLmRpbXMuaGVpZ2h0KSAvIDI7XG5cbiAgICB0aGlzLmFyY3MgPSB0aGlzLmdldEFyY3MoKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XG5cbiAgICBjb25zdCB4T2Zmc2V0ID0gdGhpcy5tYXJnaW5bM10gKyB0aGlzLmRpbXMud2lkdGggLyAyO1xuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLm1hcmdpblswXSArIHRoaXMuZGltcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7IHhPZmZzZXQgfSwgJHsgeU9mZnNldCB9KWA7XG4gICAgdGhpcy5yb3RhdGlvbiA9IGByb3RhdGUoJHsgdGhpcy5zdGFydEFuZ2xlIH0pYDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KCksIDUwKTtcbiAgfVxuXG4gIGdldEFyY3MoKTogYW55W10ge1xuICAgIGNvbnN0IGFyY3MgPSBbXTtcblxuICAgIGNvbnN0IGF2YWlsYWJsZVJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMgKiAwLjc7XG5cbiAgICBjb25zdCByYWRpdXNQZXJBcmMgPSBNYXRoLm1pbihhdmFpbGFibGVSYWRpdXMgLyB0aGlzLnJlc3VsdHMubGVuZ3RoLCAxMCk7XG4gICAgY29uc3QgYXJjV2lkdGggPSByYWRpdXNQZXJBcmMgKiAwLjc7XG4gICAgdGhpcy50ZXh0UmFkaXVzID0gdGhpcy5vdXRlclJhZGl1cyAtIHRoaXMucmVzdWx0cy5sZW5ndGggKiByYWRpdXNQZXJBcmM7XG4gICAgdGhpcy5jb3JuZXJSYWRpdXMgPSBNYXRoLmZsb29yKGFyY1dpZHRoIC8gMik7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBkIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgY29uc3Qgb3V0ZXJSYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzIC0gKGkgKiByYWRpdXNQZXJBcmMpO1xuICAgICAgY29uc3QgaW5uZXJSYWRpdXMgPSBvdXRlclJhZGl1cyAtIGFyY1dpZHRoO1xuXG4gICAgICBjb25zdCBiYWNrZ3JvdW5kQXJjID0ge1xuICAgICAgICBlbmRBbmdsZTogdGhpcy5hbmdsZVNwYW4gKiBNYXRoLlBJIC8gMTgwLFxuICAgICAgICBpbm5lclJhZGl1cyxcbiAgICAgICAgb3V0ZXJSYWRpdXMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy5tYXgsXG4gICAgICAgICAgbmFtZTogZC5uYW1lXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHZhbHVlQXJjID0ge1xuICAgICAgICBlbmRBbmdsZTogTWF0aC5taW4odGhpcy52YWx1ZVNjYWxlKGQudmFsdWUpLCB0aGlzLmFuZ2xlU3BhbikgKiBNYXRoLlBJIC8gMTgwLFxuICAgICAgICBpbm5lclJhZGl1cyxcbiAgICAgICAgb3V0ZXJSYWRpdXMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB2YWx1ZTogZC52YWx1ZSxcbiAgICAgICAgICBuYW1lOiBkLm5hbWVcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgYXJjID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQXJjLFxuICAgICAgICB2YWx1ZUFyY1xuICAgICAgfTtcblxuICAgICAgYXJjcy5wdXNoKGFyYyk7XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyY3M7XG4gIH1cblxuICBnZXREb21haW4oKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5uYW1lKTtcbiAgfVxuXG4gIGdldFZhbHVlRG9tYWluKCk6IGFueVtdIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC52YWx1ZSk7XG4gICAgY29uc3QgZGF0YU1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XG4gICAgY29uc3QgZGF0YU1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XG5cbiAgICBpZiAodGhpcy5taW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5taW4gPSBNYXRoLm1pbih0aGlzLm1pbiwgZGF0YU1pbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluID0gZGF0YU1pbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgZGF0YU1heCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF4ID0gZGF0YU1heDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3RoaXMubWluLCB0aGlzLm1heF07XG4gIH1cblxuICBnZXRWYWx1ZVNjYWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHNjYWxlTGluZWFyKClcbiAgICAgIC5yYW5nZShbMCwgdGhpcy5hbmdsZVNwYW5dKVxuICAgICAgLm5pY2UoKVxuICAgICAgLmRvbWFpbih0aGlzLnZhbHVlRG9tYWluKTtcbiAgfVxuXG4gIGdldERpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuXG4gICAgaWYgKHRoaXMudGV4dFZhbHVlICYmIDAgIT09IHRoaXMudGV4dFZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dFZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsdWVGb3JtYXR0aW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZUZvcm1hdHRpbmcodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgc2NhbGVUZXh0KHJlcGVhdCA9IHRydWUpOiB2b2lkIHtcbiAgICBjb25zdCB7IHdpZHRoIH0gPSB0aGlzLnRleHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IG9sZFNjYWxlID0gdGhpcy5yZXNpemVTY2FsZTtcblxuICAgIGlmICh3aWR0aCA9PT0gMCkge1xuICAgICAgdGhpcy5yZXNpemVTY2FsZSA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVNwYWNlID0gdGhpcy50ZXh0UmFkaXVzO1xuICAgICAgdGhpcy5yZXNpemVTY2FsZSA9IE1hdGguZmxvb3IoKGF2YWlsYWJsZVNwYWNlIC8gKHdpZHRoIC8gdGhpcy5yZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXNpemVTY2FsZSAhPT0gb2xkU2NhbGUpIHtcbiAgICAgIHRoaXMudGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgke3RoaXMucmVzaXplU2NhbGV9LCAke3RoaXMucmVzaXplU2NhbGV9KWA7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgaWYgKHJlcGVhdCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KGZhbHNlKSwgNTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBnZXRMZWdlbmRPcHRpb25zKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlVHlwZTogJ29yZGluYWwnLFxuICAgICAgY29sb3JzOiB0aGlzLmNvbG9ycyxcbiAgICAgIGRvbWFpbjogdGhpcy5kb21haW4sXG4gICAgICB0aXRsZTogdGhpcy5sZWdlbmRUaXRsZSxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXG4gICAgfTtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgJ29yZGluYWwnLCB0aGlzLmRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xuICB9XG5cbiAgb25BY3RpdmF0ZShpdGVtKTogdm9pZCB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xuICAgIH0pO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsgaXRlbSwgLi4udGhpcy5hY3RpdmVFbnRyaWVzIF07XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZShpdGVtKTogdm9pZCB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xuXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWUgJiYgZW50cnkuc2VyaWVzID09PSBkLnNlcmllcztcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0udmFsdWVBcmMuZGF0YS5uYW1lO1xuICB9XG59XG4iXX0=