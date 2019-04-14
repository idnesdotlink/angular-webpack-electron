import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { max } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { formatLabel } from '../common/label.helper';
var PieSeriesComponent = /** @class */ (function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pieGenerator = pie()
            .value(function (d) { return d.value; })
            .sort(null);
        var arcData = pieGenerator(this.series);
        this.max = max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var factor = 1.5;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    };
    PieSeriesComponent.prototype.getTooltipTitle = function (a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    };
    PieSeriesComponent.prototype.labelText = function (myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    };
    PieSeriesComponent.prototype.label = function (myArc) {
        return formatLabel(myArc.data.name);
    };
    PieSeriesComponent.prototype.defaultTooltipText = function (myArc) {
        var label = this.label(myArc);
        var val = formatLabel(myArc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (myArc) {
        return this.colors.getColor(this.label(myArc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "series", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "innerRadius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "outerRadius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "explodeSlices", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "showLabels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PieSeriesComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], PieSeriesComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "labelFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "trimLabels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "maxLabelLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], PieSeriesComponent.prototype, "tooltipText", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "dblclick", void 0);
    PieSeriesComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-pie-series]',
            template: "<svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n  <svg:g ng-svg-charts-pie-label\n    *ngIf=\"labelVisible(arc)\"\n    [data]=\"arc\"\n    [radius]=\"outerRadius\"\n    [color]=\"color(arc)\"\n    [label]=\"labelText(arc)\"\n    [labelTrim]=\"trimLabels\"\n    [labelTrimSize]=\"maxLabelLength\"\n    [max]=\"max\"\n    [value]=\"arc.value\"\n    [explodeSlices]=\"explodeSlices\"\n    [animations]=\"animations\">\n  </svg:g>\n  <svg:g\n    ng-svg-charts-pie-arc\n    [startAngle]=\"arc.startAngle\"\n    [endAngle]=\"arc.endAngle\"\n    [innerRadius]=\"innerRadius\"\n    [outerRadius]=\"outerRadius\"\n    [fill]=\"color(arc)\"\n    [value]=\"arc.data.value\"\n    [gradient]=\"gradient\"\n    [data]=\"arc.data\"\n    [max]=\"max\"\n    [explodeSlices]=\"explodeSlices\"\n    [isActive]=\"isActive(arc.data)\"\n    [animate]=\"animations\"\n    (select)=\"onClick($event)\"\n    (activate)=\"activate.emit($event)\"\n    (deactivate)=\"deactivate.emit($event)\"\n    (dblclick)=\"dblclick.emit($event)\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'top'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipTitle]=\"getTooltipTitle(arc)\"\n    [tooltipTemplate]=\"tooltipTemplate\"\n    [tooltipContext]=\"arc.data\">\n  </svg:g>\n</svg:g>",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieSeriesComponent);
    return PieSeriesComponent;
}());
export { PieSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU9yRDtJQUxBO1FBT1csV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUVqQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQU1qQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXBCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUF3SDFDLENBQUM7SUFuSEMsd0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNFLElBQU0sWUFBWSxHQUFHLEdBQUcsRUFBWTthQUNqQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMs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UixLQUFLLEVBQUU7OzBEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7OERBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzsyREFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7OytEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTswQ0FBa0IsV0FBVzsrREFBTTtJQUNsQztRQUFSLEtBQUssRUFBRTs7MERBQW1CO0lBRWpCO1FBQVQsTUFBTSxFQUFFOztzREFBNkI7SUFDNUI7UUFBVCxNQUFNLEVBQUU7O3dEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7MERBQWlDO0lBQ2hDO1FBQVQsTUFBTSxFQUFFOzt3REFBK0I7SUFyQjdCLGtCQUFrQjtRQUw5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLGl4Q0FBdUM7WUFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLGtCQUFrQixDQTZJOUI7SUFBRCx5QkFBQztDQUFBLEFBN0lELElBNklDO1NBN0lZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1heCB9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7IGFyYywgcGllIH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtcGllLXNlcmllc10nLFxuICB0ZW1wbGF0ZVVybDogJ3BpZS1zZXJpZXMudGVtcGxhdGUuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBpZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgc2VyaWVzOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgZGltcztcbiAgQElucHV0KCkgaW5uZXJSYWRpdXMgPSA2MDtcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXMgPSA4MDtcbiAgQElucHV0KCkgZXhwbG9kZVNsaWNlcztcbiAgQElucHV0KCkgc2hvd0xhYmVscztcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgdHJpbUxhYmVscyA9IHRydWU7XG4gIEBJbnB1dCgpIG1heExhYmVsTGVuZ3RoID0gMTA7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiAobzogYW55KSA9PiBhbnk7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkYmxjbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtYXg6IG51bWJlcjtcbiAgZGF0YTogYW55O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHBpZUdlbmVyYXRvciA9IHBpZTxhbnksIGFueT4oKVxuICAgICAgLnZhbHVlKGQgPT4gZC52YWx1ZSlcbiAgICAgIC5zb3J0KG51bGwpO1xuXG4gICAgY29uc3QgYXJjRGF0YSA9IHBpZUdlbmVyYXRvcih0aGlzLnNlcmllcyk7XG5cbiAgICB0aGlzLm1heCA9IG1heChhcmNEYXRhLCBkID0+IHtcbiAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhID0gdGhpcy5jYWxjdWxhdGVMYWJlbFBvc2l0aW9ucyhhcmNEYXRhKTtcbiAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy50b29sdGlwVGV4dCB8fCB0aGlzLmRlZmF1bHRUb29sdGlwVGV4dDtcbiAgfVxuXG4gIG1pZEFuZ2xlKGQpOiBudW1iZXIge1xuICAgIHJldHVybiBkLnN0YXJ0QW5nbGUgKyAoZC5lbmRBbmdsZSAtIGQuc3RhcnRBbmdsZSkgLyAyO1xuICB9XG5cbiAgb3V0ZXJBcmMoKTogYW55IHtcbiAgICBjb25zdCBmYWN0b3IgPSAxLjU7XG5cbiAgICByZXR1cm4gYXJjKClcbiAgICAgIC5pbm5lclJhZGl1cyh0aGlzLm91dGVyUmFkaXVzICogZmFjdG9yKVxuICAgICAgLm91dGVyUmFkaXVzKHRoaXMub3V0ZXJSYWRpdXMgKiBmYWN0b3IpO1xuICB9XG5cbiAgY2FsY3VsYXRlTGFiZWxQb3NpdGlvbnMocGllRGF0YSk6IGFueSB7XG4gICAgY29uc3QgZmFjdG9yID0gMS41O1xuICAgIGNvbnN0IG1pbkRpc3RhbmNlID0gMTA7XG4gICAgY29uc3QgbGFiZWxQb3NpdGlvbnMgPSBwaWVEYXRhO1xuXG4gICAgbGFiZWxQb3NpdGlvbnMuZm9yRWFjaChkID0+IHtcbiAgICAgIGQucG9zID0gdGhpcy5vdXRlckFyYygpLmNlbnRyb2lkKGQpO1xuICAgICAgZC5wb3NbMF0gPSBmYWN0b3IgKiB0aGlzLm91dGVyUmFkaXVzICogKHRoaXMubWlkQW5nbGUoZCkgPCBNYXRoLlBJID8gMSA6IC0xKTtcbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFiZWxQb3NpdGlvbnMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjb25zdCBhID0gbGFiZWxQb3NpdGlvbnNbaV07XG4gICAgICBpZiAoIXRoaXMubGFiZWxWaXNpYmxlKGEpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBsYWJlbFBvc2l0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBiID0gbGFiZWxQb3NpdGlvbnNbal07XG4gICAgICAgIGlmICghdGhpcy5sYWJlbFZpc2libGUoYikpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGV5J3JlIG9uIHRoZSBzYW1lIHNpZGVcbiAgICAgICAgaWYgKGIucG9zWzBdICogYS5wb3NbMF0gPiAwKSB7XG4gICAgICAgICAgLy8gaWYgdGhleSdyZSBvdmVybGFwcGluZ1xuICAgICAgICAgIGNvbnN0IG8gPSBtaW5EaXN0YW5jZSAtIE1hdGguYWJzKGIucG9zWzFdIC0gYS5wb3NbMV0pO1xuICAgICAgICAgIGlmIChvID4gMCkge1xuICAgICAgICAgICAgLy8gcHVzaCB0aGUgc2Vjb25kIHVwIG9yIGRvd25cbiAgICAgICAgICAgIGIucG9zWzFdICs9IE1hdGguc2lnbihiLnBvc1swXSkgKiBvO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsYWJlbFBvc2l0aW9ucztcbiAgfVxuXG4gIGxhYmVsVmlzaWJsZShteUFyYyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dMYWJlbHMgJiYgbXlBcmMuZW5kQW5nbGUgLSBteUFyYy5zdGFydEFuZ2xlID4gTWF0aC5QSSAvIDMwO1xuICB9XG5cbiAgZ2V0VG9vbHRpcFRpdGxlKGEpIHtcbiAgICByZXR1cm4gdGhpcy50b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiB0aGlzLnRvb2x0aXBUZXh0KGEpO1xuICB9XG5cbiAgbGFiZWxUZXh0KG15QXJjKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5sYWJlbEZvcm1hdHRpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsRm9ybWF0dGluZyhteUFyYy5kYXRhLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sYWJlbChteUFyYyk7XG4gIH1cblxuICBsYWJlbChteUFyYyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdExhYmVsKG15QXJjLmRhdGEubmFtZSk7XG4gIH1cblxuICBkZWZhdWx0VG9vbHRpcFRleHQobXlBcmMpOiBzdHJpbmcge1xuICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbChteUFyYyk7XG4gICAgY29uc3QgdmFsID0gZm9ybWF0TGFiZWwobXlBcmMuZGF0YS52YWx1ZSk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx9PC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICBjb2xvcihteUFyYyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JzLmdldENvbG9yKHRoaXMubGFiZWwobXlBcmMpKTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLmRhdGEubmFtZTtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZSAmJiBlbnRyeS5zZXJpZXMgPT09IGQuc2VyaWVzO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==