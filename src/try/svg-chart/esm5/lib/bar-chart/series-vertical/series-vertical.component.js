import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef, } from '@angular/core';
import { trigger, style, animate, transition, } from '@angular/animations';
import { formatLabel } from '../../common/label.helper';
export var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
var SeriesVerticalComponent = /** @class */ (function () {
    function SeriesVerticalComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelHeightChanged = new EventEmitter();
        this.barsForDataLabels = [];
    }
    SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVerticalComponent.prototype.update = function () {
        var _this = this;
        var _a;
        this.updateTooltipSettings();
        var width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        var yScaleMin = Math.max(this.yScale.domain()[0], 0);
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                width: width,
                formattedLabel: formattedLabel,
                height: 0,
                x: 0,
                y: 0,
            };
            var offset0;
            var offset1;
            if (_this.type === 'standard') {
                bar.height = Math.abs(_this.yScale(value) - _this.yScale(yScaleMin));
                bar.x = _this.xScale(label);
                if (value < 0) {
                    bar.y = _this.yScale(0);
                }
                else {
                    bar.y = _this.yScale(value);
                }
            }
            else if (_this.type === 'stacked') {
                offset0 = d0[d0Type];
                offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                offset0 = d0[d0Type];
                offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops =
                        _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
                bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = _this.tooltipDisabled ? undefined : "\n        <span class=\"tooltip-label\">" + tooltipLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesVerticalComponent.prototype.updateDataLabels = function () {
        var _this = this;
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            var section = {};
            section.series = this.seriesName;
            var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d > 0 ? sum + d : sum; }, 0);
            var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d < 0 ? sum + d : sum; }, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            if (section.total > 0) {
                section.height = this.yScale(totalPositive);
            }
            else {
                section.height = this.yScale(totalNegative);
            }
            section.width = this.xScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.name;
                section.total = d.value;
                section.x = _this.xScale(d.name);
                section.y = _this.yScale(0);
                section.height = _this.yScale(section.total) - _this.yScale(0);
                section.width = _this.xScale.bandwidth();
                return section;
            });
        }
    };
    SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesVerticalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesVerticalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "series", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], SeriesVerticalComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SeriesVerticalComponent.prototype, "seriesName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "roundEdges", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
    SeriesVerticalComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-series-vertical]',
            template: "\n    <svg:g ng-svg-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [animations]=\"animations\">\n    </svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g ng-svg-charts-bar-label *ngFor=\"let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'vertical'\"\n        (dimensionsChanged)=\"dataLabelHeightChanged.emit({size:$event, index:i})\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], SeriesVerticalComponent);
    return SeriesVerticalComponent;
}());
export { SeriesVerticalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9zZXJpZXMtdmVydGljYWwvc2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWix1QkFBdUIsRUFDdkIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEdBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsTUFBTSxDQUFOLElBQVksT0FHWDtBQUhELFdBQVksT0FBTztJQUNqQixnQ0FBcUIsQ0FBQTtJQUNyQixnQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsT0FBTyxLQUFQLE9BQU8sUUFHbEI7QUEwREQ7SUF4REE7UUEyRFcsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQVFsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBR3JCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLDJCQUFzQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRdEQsc0JBQWlCLEdBR1osRUFBRSxDQUFDO0lBaUxWLENBQUM7SUEvS0MsNkNBQVcsR0FBWCxVQUFZLE9BQU87UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx3Q0FBTSxHQUFOO1FBQUEs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RUFBRSxDQUFDLENBQUM7cUJBQ3BDLENBQUM7aUJBQ0gsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUNXLHVCQUF1QixDQWlObkM7SUFBRCw4QkFBQztDQUFBLEFBak5ELElBaU5DO1NBak5ZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uLy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuXG5leHBvcnQgZW51bSBEMFR5cGVzIHtcbiAgcG9zaXRpdmUgPSAncG9zaXRpdmUnLFxuICBuZWdhdGl2ZSA9ICduZWdhdGl2ZSdcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXNlcmllcy12ZXJ0aWNhbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWJhclxuICAgICAgKm5nRm9yPVwibGV0IGJhciBvZiBiYXJzOyB0cmFja0J5OiB0cmFja0J5XCJcbiAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxuICAgICAgW0AuZGlzYWJsZWRdPVwiIWFuaW1hdGlvbnNcIlxuICAgICAgW3dpZHRoXT1cImJhci53aWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cImJhci5oZWlnaHRcIlxuICAgICAgW3hdPVwiYmFyLnhcIlxuICAgICAgW3ldPVwiYmFyLnlcIlxuICAgICAgW2ZpbGxdPVwiYmFyLmNvbG9yXCJcbiAgICAgIFtzdG9wc109XCJiYXIuZ3JhZGllbnRTdG9wc1wiXG4gICAgICBbZGF0YV09XCJiYXIuZGF0YVwiXG4gICAgICBbb3JpZW50YXRpb25dPVwiJ3ZlcnRpY2FsJ1wiXG4gICAgICBbcm91bmRFZGdlc109XCJiYXIucm91bmRFZGdlc1wiXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxuICAgICAgW2FyaWFMYWJlbF09XCJiYXIuYXJpYUxhYmVsXCJcbiAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShiYXIuZGF0YSlcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICBuZ3gtdG9vbHRpcFxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwidG9vbHRpcFR5cGVcIlxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBiYXIudG9vbHRpcFRleHRcIlxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImJhci5kYXRhXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIj5cbiAgICA8L3N2ZzpnPlxuICAgIDxzdmc6ZyAqbmdJZj1cInNob3dEYXRhTGFiZWxcIj5cbiAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWJhci1sYWJlbCAqbmdGb3I9XCJsZXQgYiBvZiBiYXJzRm9yRGF0YUxhYmVsczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTp0cmFja0RhdGFMYWJlbEJ5XCJcbiAgICAgICAgW2JhclhdPVwiYi54XCJcbiAgICAgICAgW2JhclldPVwiYi55XCJcbiAgICAgICAgW2JhcldpZHRoXT1cImIud2lkdGhcIlxuICAgICAgICBbYmFySGVpZ2h0XT1cImIuaGVpZ2h0XCJcbiAgICAgICAgW3ZhbHVlXT1cImIudG90YWxcIlxuICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cImRhdGFMYWJlbEZvcm1hdHRpbmdcIlxuICAgICAgICBbb3JpZW50YXRpb25dPVwiJ3ZlcnRpY2FsJ1wiXG4gICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJkYXRhTGFiZWxIZWlnaHRDaGFuZ2VkLmVtaXQoe3NpemU6JGV2ZW50LCBpbmRleDppfSlcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZGltcztcbiAgQElucHV0KCkgdHlwZSA9ICdzdGFuZGFyZCc7XG4gIEBJbnB1dCgpIHNlcmllcztcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBzZXJpZXNOYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHJvdW5kRWRnZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGFMYWJlbEZvcm1hdHRpbmc6IGFueTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGF0YUxhYmVsSGVpZ2h0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XG4gIHRvb2x0aXBUeXBlOiBzdHJpbmc7XG5cbiAgYmFyczogYW55O1xuICB4OiBhbnk7XG4gIHk6IGFueTtcbiAgYmFyc0ZvckRhdGFMYWJlbHM6IEFycmF5PHtcbiAgICB4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlciwgc2VyaWVzOiBzdHJpbmdcbiAgfT4gPSBbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpO1xuICAgIGxldCB3aWR0aDtcbiAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xuICAgIH1cbiAgICBjb25zdCB5U2NhbGVNaW4gPSBNYXRoLm1heCh0aGlzLnlTY2FsZS5kb21haW4oKVswXSwgMCk7XG5cbiAgICBjb25zdCBkMCA9IHtcbiAgICAgIFtEMFR5cGVzLnBvc2l0aXZlXTogMCxcbiAgICAgIFtEMFR5cGVzLm5lZ2F0aXZlXTogMFxuICAgIH07XG4gICAgbGV0IGQwVHlwZSA9IEQwVHlwZXMucG9zaXRpdmU7XG5cbiAgICBsZXQgdG90YWw7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICB0b3RhbCA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcbiAgICB9XG5cbiAgICB0aGlzLmJhcnMgPSB0aGlzLnNlcmllcy5tYXAoKGQsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBkLnZhbHVlO1xuICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcbiAgICAgIGNvbnN0IHJvdW5kRWRnZXMgPSB0aGlzLnJvdW5kRWRnZXM7XG4gICAgICBkMFR5cGUgPSB2YWx1ZSA+IDAgPyBEMFR5cGVzLnBvc2l0aXZlIDogRDBUeXBlcy5uZWdhdGl2ZTtcblxuICAgICAgY29uc3QgYmFyOiBhbnkgPSB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgcm91bmRFZGdlcyxcbiAgICAgICAgZGF0YTogZCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGZvcm1hdHRlZExhYmVsLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICB9O1xuXG4gICAgICBsZXQgb2Zmc2V0MDogbnVtYmVyO1xuICAgICAgbGV0IG9mZnNldDE6IG51bWJlcjtcblxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgICBiYXIuaGVpZ2h0ID0gTWF0aC5hYnModGhpcy55U2NhbGUodmFsdWUpIC0gdGhpcy55U2NhbGUoeVNjYWxlTWluKSk7XG4gICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUobGFiZWwpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YWNrZWQnKSB7XG4gICAgICAgIG9mZnNldDAgPSBkMFtkMFR5cGVdO1xuICAgICAgICBvZmZzZXQxID0gb2Zmc2V0MCArIHZhbHVlO1xuICAgICAgICBkMFtkMFR5cGVdICs9IHZhbHVlO1xuXG4gICAgICAgIGJhci5oZWlnaHQgPSB0aGlzLnlTY2FsZShvZmZzZXQwKSAtIHRoaXMueVNjYWxlKG9mZnNldDEpO1xuICAgICAgICBiYXIueCA9IDA7XG4gICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUob2Zmc2V0MSk7XG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcbiAgICAgICAgYmFyLm9mZnNldDEgPSBvZmZzZXQxO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xuICAgICAgICBvZmZzZXQwID0gZDBbZDBUeXBlXTtcbiAgICAgICAgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcbiAgICAgICAgZDBbZDBUeXBlXSArPSB2YWx1ZTtcblxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgb2Zmc2V0MCA9IChvZmZzZXQwICogMTAwKSAvIHRvdGFsO1xuICAgICAgICAgIG9mZnNldDEgPSAob2Zmc2V0MSAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQwID0gMDtcbiAgICAgICAgICBvZmZzZXQxID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhci5oZWlnaHQgPSB0aGlzLnlTY2FsZShvZmZzZXQwKSAtIHRoaXMueVNjYWxlKG9mZnNldDEpO1xuICAgICAgICBiYXIueCA9IDA7XG4gICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUob2Zmc2V0MSk7XG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcbiAgICAgICAgYmFyLm9mZnNldDEgPSBvZmZzZXQxO1xuICAgICAgICB2YWx1ZSA9IChvZmZzZXQxIC0gb2Zmc2V0MCkudG9GaXhlZCgyKSArICclJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihiYXIub2Zmc2V0MSk7XG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPVxuICAgICAgICAgICAgdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhiYXIub2Zmc2V0MSwgYmFyLm9mZnNldDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCB0b29sdGlwTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbDtcbiAgICAgIGJhci5hcmlhTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbCArICcgJyArIHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICBpZiAodGhpcy5zZXJpZXNOYW1lKSB7XG4gICAgICAgIHRvb2x0aXBMYWJlbCA9IGAke3RoaXMuc2VyaWVzTmFtZX0g4oCiICR7Zm9ybWF0dGVkTGFiZWx9YDtcbiAgICAgICAgYmFyLmRhdGEuc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lO1xuICAgICAgICBiYXIuYXJpYUxhYmVsID0gdGhpcy5zZXJpZXNOYW1lICsgJyAnICsgYmFyLmFyaWFMYWJlbDtcbiAgICAgIH1cblxuICAgICAgYmFyLnRvb2x0aXBUZXh0ID0gdGhpcy50b29sdGlwRGlzYWJsZWQgPyB1bmRlZmluZWQgOiBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7dG9vbHRpcExhYmVsfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICBgO1xuXG4gICAgICByZXR1cm4gYmFyO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVEYXRhTGFiZWxzKCk7XG5cbiAgfVxuXG4gIHVwZGF0ZURhdGFMYWJlbHMoKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YWNrZWQnKSB7XG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzID0gW107XG4gICAgICBjb25zdCBzZWN0aW9uOiBhbnkgPSB7fTtcbiAgICAgIHNlY3Rpb24uc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lO1xuICAgICAgY29uc3QgdG90YWxQb3NpdGl2ZSA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBkID4gMCA/IHN1bSArIGQgOiBzdW0sIDApO1xuICAgICAgY29uc3QgdG90YWxOZWdhdGl2ZSA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBkIDwgMCA/IHN1bSArIGQgOiBzdW0sIDApO1xuICAgICAgc2VjdGlvbi50b3RhbCA9IHRvdGFsUG9zaXRpdmUgKyB0b3RhbE5lZ2F0aXZlO1xuICAgICAgc2VjdGlvbi54ID0gMDtcbiAgICAgIHNlY3Rpb24ueSA9IDA7XG4gICAgICBpZiAoc2VjdGlvbi50b3RhbCA+IDApIHtcbiAgICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZSh0b3RhbFBvc2l0aXZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUodG90YWxOZWdhdGl2ZSk7XG4gICAgICB9XG4gICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzLnB1c2goc2VjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xuICAgICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZSA/IHRoaXMuc2VyaWVzTmFtZSA6IGQubmFtZTtcbiAgICAgICAgc2VjdGlvbi50b3RhbCA9IGQudmFsdWU7XG4gICAgICAgIHNlY3Rpb24ueCA9IHRoaXMueFNjYWxlKGQubmFtZSk7XG4gICAgICAgIHNlY3Rpb24ueSA9IHRoaXMueVNjYWxlKDApO1xuICAgICAgICBzZWN0aW9uLmhlaWdodCA9IHRoaXMueVNjYWxlKHNlY3Rpb24udG90YWwpIC0gdGhpcy55U2NhbGUoMCk7XG4gICAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpIHtcbiAgICB0aGlzLnRvb2x0aXBQbGFjZW1lbnQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b3AnO1xuICAgIHRoaXMudG9vbHRpcFR5cGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b29sdGlwJztcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBiYXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBiYXIubGFiZWw7XG4gIH1cblxuICB0cmFja0RhdGFMYWJlbEJ5KGluZGV4LCBiYXJMYWJlbCkge1xuICAgIHJldHVybiBpbmRleCArICcjJyArIGJhckxhYmVsLnNlcmllcyArICcjJyArIGJhckxhYmVsLnRvdGFsO1xuICB9XG5cbn1cbiJdfQ==