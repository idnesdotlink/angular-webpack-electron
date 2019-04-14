import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
var YAxisTicksComponent = /** @class */ (function () {
    function YAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
    }
    YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width: width });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    YAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale;
        var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.setReferencelines = function () {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [false, false, false, false]);
    };
    YAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicksComponent.prototype.getMaxTicks = function (tickHeight) {
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicksComponent.prototype.tickTransform = function (tick) {
        return "translate(" + this.adjustedScale(tick) + "," + this.verticalSpacing + ")";
    };
    YAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(5,0)";
    };
    YAxisTicksComponent.prototype.tickTrim = function (label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "scale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "orient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "tickArguments", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], YAxisTicksComponent.prototype, "tickValues", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "tickStroke", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "trimTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "maxTickLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "tickFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "showGridLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "referenceLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "showRefLabels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "showRefLines", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
    tslib_1.__decorate([
        ViewChild('ticksel'),
        tslib_1.__metadata("design:type", ElementRef)
    ], YAxisTicksComponent.prototype, "ticksElement", void 0);
    YAxisTicksComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-y-axis-ticks]',
            template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"transform(tick)\" >\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\">\n          {{tickTrim(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:path *ngIf=\"referenceLineLength > 1 && refMax && refMin && showRefLines\"\n      class=\"reference-area\"\n      [attr.d]=\"referenceAreaPath\"\n      [attr.transform]=\"gridLineTransform()\"\n    />\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"transform(tick)\">\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line *ngIf=\"orient === 'left'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line *ngIf=\"orient === 'right'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"-gridLineWidth\" />\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let refLine of referenceLines\">\n      <svg:g *ngIf=\"showRefLines\" [attr.transform]=\"transform(refLine.value)\">\n        <svg:line class=\"refline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          [attr.transform]=\"gridLineTransform()\"/>\n        <svg:g *ngIf=\"showRefLabels\">\n          <title>{{tickTrim(tickFormat(refLine.value))}}</title>\n          <svg:text\n            class=\"refline-label\"\n            [attr.dy]=\"dy\"\n            [attr.y]=\"-6\"\n            [attr.x]=\"gridLineWidth\"\n            [attr.text-anchor]=\"textAnchor\" >\n            {{refLine.name}}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisTicksComponent);
    return YAxisTicksComponent;
}());
export { YAxisTicksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy10aWNrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFFWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFnRXhEO0lBOURBO1FBa0VXLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFJdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFcEIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxrQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixnQkFBVyxHQUFRLENBQUMsQ0FBQztRQUVyQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQVEsUUFBUSxDQUFDO1FBVTNCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUdyQix3QkFBbUIsR0FBRyxDQUFDLENBQUM7SUFzSTFCLENBQUM7SUFqSUMseUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FB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RSxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFRCxzQ0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdkUsQ0FBQztJQXpLUTtRQUFSLEtBQUssRUFBRTs7c0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTs7dURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7OERBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzsyREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OzJEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTs7MERBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzs4REFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7OytEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzs4REFBdUI7SUFDdEI7UUFBUixLQUFLLEVBQUU7OzhEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3VEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7OytEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzs4REFBdUI7SUFDdEI7UUFBUixLQUFLLEVBQUU7OzZEQUFzQjtJQUVwQjtRQUFULE1BQU0sRUFBRTs7a0VBQXdDO0lBd0IzQjtRQUFyQixTQUFTLENBQUMsU0FBUyxDQUFDOzBDQUFlLFVBQVU7NkRBQUM7SUF6Q3BDLG1CQUFtQjtRQTlEL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLCtCQUErQjtZQUN6QyxRQUFRLEVBQUUseThEQXlEVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxtQkFBbUIsQ0E0Sy9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVLRCxJQTRLQztTQTVLWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uQ2hhbmdlcyxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vdHJpbS1sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgcmVkdWNlVGlja3MgfSBmcm9tICcuL3RpY2tzLmhlbHBlcic7XG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uLy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMteS1heGlzLXRpY2tzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnICN0aWNrc2VsPlxuICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzXCIgY2xhc3M9XCJ0aWNrXCJcbiAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybSh0aWNrKVwiID5cbiAgICAgICAgPHRpdGxlPnt7dGlja0Zvcm1hdCh0aWNrKX19PC90aXRsZT5cbiAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMC4wMVwiXG4gICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgIFthdHRyLnhdPVwieDFcIlxuICAgICAgICAgIFthdHRyLnldPVwieTFcIlxuICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgICAgIFtzdHlsZS5mb250LXNpemVdPVwiJzEycHgnXCI+XG4gICAgICAgICAge3t0aWNrVHJpbSh0aWNrRm9ybWF0KHRpY2spKX19XG4gICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG5cbiAgICA8c3ZnOnBhdGggKm5nSWY9XCJyZWZlcmVuY2VMaW5lTGVuZ3RoID4gMSAmJiByZWZNYXggJiYgcmVmTWluICYmIHNob3dSZWZMaW5lc1wiXG4gICAgICBjbGFzcz1cInJlZmVyZW5jZS1hcmVhXCJcbiAgICAgIFthdHRyLmRdPVwicmVmZXJlbmNlQXJlYVBhdGhcIlxuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cImdyaWRMaW5lVHJhbnNmb3JtKClcIlxuICAgIC8+XG4gICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm0odGljaylcIj5cbiAgICAgIDxzdmc6Z1xuICAgICAgICAqbmdJZj1cInNob3dHcmlkTGluZXNcIlxuICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JpZExpbmVUcmFuc2Zvcm0oKVwiPlxuICAgICAgICA8c3ZnOmxpbmUgKm5nSWY9XCJvcmllbnQgPT09ICdsZWZ0J1wiXG4gICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIGdyaWRsaW5lLXBhdGgtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICBbYXR0ci54Ml09XCJncmlkTGluZVdpZHRoXCIgLz5cbiAgICAgICAgPHN2ZzpsaW5lICpuZ0lmPVwib3JpZW50ID09PSAncmlnaHQnXCJcbiAgICAgICAgICBjbGFzcz1cImdyaWRsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIFthdHRyLngyXT1cIi1ncmlkTGluZVdpZHRoXCIgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cblxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgcmVmTGluZSBvZiByZWZlcmVuY2VMaW5lc1wiPlxuICAgICAgPHN2ZzpnICpuZ0lmPVwic2hvd1JlZkxpbmVzXCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybShyZWZMaW5lLnZhbHVlKVwiPlxuICAgICAgICA8c3ZnOmxpbmUgY2xhc3M9XCJyZWZsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIFthdHRyLngyXT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncmlkTGluZVRyYW5zZm9ybSgpXCIvPlxuICAgICAgICA8c3ZnOmcgKm5nSWY9XCJzaG93UmVmTGFiZWxzXCI+XG4gICAgICAgICAgPHRpdGxlPnt7dGlja1RyaW0odGlja0Zvcm1hdChyZWZMaW5lLnZhbHVlKSl9fTwvdGl0bGU+XG4gICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICBjbGFzcz1cInJlZmxpbmUtbGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgICAgW2F0dHIueV09XCItNlwiXG4gICAgICAgICAgICBbYXR0ci54XT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiID5cbiAgICAgICAgICAgIHt7cmVmTGluZS5uYW1lfX1cbiAgICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZQXhpc1RpY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBzY2FsZTtcbiAgQElucHV0KCkgb3JpZW50O1xuICBASW5wdXQoKSB0aWNrQXJndW1lbnRzID0gWzVdO1xuICBASW5wdXQoKSB0aWNrVmFsdWVzOiBhbnlbXTtcbiAgQElucHV0KCkgdGlja1N0cm9rZSA9ICcjY2NjJztcbiAgQElucHV0KCkgdHJpbVRpY2tzID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF4VGlja0xlbmd0aCA9IDE2O1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lcyA9IGZhbHNlO1xuICBASW5wdXQoKSBncmlkTGluZVdpZHRoO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lcyA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbm5lclRpY2tTaXplOiBhbnkgPSA2O1xuICB0aWNrUGFkZGluZzogYW55ID0gMztcbiAgdGlja1NwYWNpbmc6IGFueTtcbiAgdmVydGljYWxTcGFjaW5nID0gMjA7XG4gIHRleHRBbmNob3I6IGFueSA9ICdtaWRkbGUnO1xuICBkeTogYW55O1xuICB4MTogYW55O1xuICB4MjogYW55O1xuICB5MTogYW55O1xuICB5MjogYW55O1xuICBhZGp1c3RlZFNjYWxlOiBhbnk7XG4gIHRyYW5zZm9ybTogKG86IGFueSkgPT4gc3RyaW5nO1xuICB0aWNrRm9ybWF0OiAobzogYW55KSA9PiBzdHJpbmc7XG4gIHRpY2tzOiBhbnk7XG4gIHdpZHRoID0gMDtcbiAgb3V0ZXJUaWNrU2l6ZSA9IDY7XG4gIHJvdGF0ZUxhYmVscyA9IGZhbHNlO1xuICByZWZNYXg6IG51bWJlcjtcbiAgcmVmTWluOiBudW1iZXI7XG4gIHJlZmVyZW5jZUxpbmVMZW5ndGggPSAwO1xuICByZWZlcmVuY2VBcmVhUGF0aDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ3RpY2tzZWwnKSB0aWNrc0VsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XG4gIH1cblxuICB1cGRhdGVEaW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQodGhpcy50aWNrc0VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCwgMTApO1xuICAgIGlmICh3aWR0aCAhPT0gdGhpcy53aWR0aCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHsgd2lkdGggfSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNjYWxlO1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzLm9yaWVudCA9PT0gJ3RvcCcgfHwgdGhpcy5vcmllbnQgPT09ICdyaWdodCcgPyAtMSA6IDE7XG4gICAgdGhpcy50aWNrU3BhY2luZyA9IE1hdGgubWF4KHRoaXMuaW5uZXJUaWNrU2l6ZSwgMCkgKyB0aGlzLnRpY2tQYWRkaW5nO1xuXG4gICAgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMudGlja3MgPSB0aGlzLmdldFRpY2tzKCk7XG5cbiAgICBpZiAodGhpcy50aWNrRm9ybWF0dGluZykge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gdGhpcy50aWNrRm9ybWF0dGluZztcbiAgICB9IGVsc2UgaWYgKHNjYWxlLnRpY2tGb3JtYXQpIHtcbiAgICAgIHRoaXMudGlja0Zvcm1hdCA9IHNjYWxlLnRpY2tGb3JtYXQuYXBwbHkoc2NhbGUsIHRoaXMudGlja0FyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5hZGp1c3RlZFNjYWxlID0gc2NhbGUuYmFuZHdpZHRoID8gZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIHNjYWxlKGQpICsgc2NhbGUuYmFuZHdpZHRoKCkgKiAwLjU7XG4gICAgfSA6IHNjYWxlO1xuXG4gICAgaWYgKHRoaXMuc2hvd1JlZkxpbmVzICYmIHRoaXMucmVmZXJlbmNlTGluZXMpIHtcbiAgICAgIHRoaXMuc2V0UmVmZXJlbmNlbGluZXMoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMub3JpZW50KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJywwKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xuICAgICAgICB0aGlzLnkyID0gdGhpcy5pbm5lclRpY2tTaXplICogc2lnbjtcbiAgICAgICAgdGhpcy55MSA9IHRoaXMudGlja1NwYWNpbmcgKiBzaWduO1xuICAgICAgICB0aGlzLmR5ID0gc2lnbiA8IDAgPyAnMGVtJyA6ICcuNzFlbSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbih0aWNrKSB7XG4gICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHRoaXMuYWRqdXN0ZWRTY2FsZSh0aWNrKSArICcsMCknO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcbiAgICAgICAgdGhpcy55MiA9IHRoaXMuaW5uZXJUaWNrU2l6ZSAqIHNpZ247XG4gICAgICAgIHRoaXMueTEgPSB0aGlzLnRpY2tTcGFjaW5nICogc2lnbjtcbiAgICAgICAgdGhpcy5keSA9IHNpZ24gPCAwID8gJzBlbScgOiAnLjcxZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xuICAgICAgICB0aGlzLngyID0gdGhpcy5pbm5lclRpY2tTaXplICogLXNpZ247XG4gICAgICAgIHRoaXMueDEgPSB0aGlzLnRpY2tTcGFjaW5nICogLXNpZ247XG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbih0aWNrKSB7XG4gICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJyknO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICB0aGlzLngyID0gdGhpcy5pbm5lclRpY2tTaXplICogLXNpZ247XG4gICAgICAgIHRoaXMueDEgPSB0aGlzLnRpY2tTcGFjaW5nICogLXNpZ247XG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xuICB9XG5cbiAgc2V0UmVmZXJlbmNlbGluZXMoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZNaW4gPSB0aGlzLmFkanVzdGVkU2NhbGUoTWF0aC5taW4uYXBwbHkobnVsbCwgdGhpcy5yZWZlcmVuY2VMaW5lcy5tYXAoaXRlbSA9PiBpdGVtLnZhbHVlKSkpO1xuICAgIHRoaXMucmVmTWF4ID0gdGhpcy5hZGp1c3RlZFNjYWxlKE1hdGgubWF4LmFwcGx5KG51bGwsIHRoaXMucmVmZXJlbmNlTGluZXMubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSkpKTtcbiAgICB0aGlzLnJlZmVyZW5jZUxpbmVMZW5ndGggPSB0aGlzLnJlZmVyZW5jZUxpbmVzLmxlbmd0aDtcblxuICAgIHRoaXMucmVmZXJlbmNlQXJlYVBhdGggPSByb3VuZGVkUmVjdCgwLCB0aGlzLnJlZk1heCwgdGhpcy5ncmlkTGluZVdpZHRoLCB0aGlzLnJlZk1pbiAtIHRoaXMucmVmTWF4LFxuICAgICAgMCwgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSk7XG4gIH1cblxuICBnZXRUaWNrcygpOiBhbnkge1xuICAgIGxldCB0aWNrcztcbiAgICBjb25zdCBtYXhUaWNrcyA9IHRoaXMuZ2V0TWF4VGlja3MoMjApO1xuICAgIGNvbnN0IG1heFNjYWxlVGlja3MgPSB0aGlzLmdldE1heFRpY2tzKDUwKTtcblxuICAgIGlmICh0aGlzLnRpY2tWYWx1ZXMpIHtcbiAgICAgIHRpY2tzID0gdGhpcy50aWNrVmFsdWVzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZS50aWNrcykge1xuICAgICAgdGlja3MgPSB0aGlzLnNjYWxlLnRpY2tzLmFwcGx5KHRoaXMuc2NhbGUsIFttYXhTY2FsZVRpY2tzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpY2tzID0gdGhpcy5zY2FsZS5kb21haW4oKTtcbiAgICAgIHRpY2tzID0gcmVkdWNlVGlja3ModGlja3MsIG1heFRpY2tzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlja3M7XG4gIH1cblxuICBnZXRNYXhUaWNrcyh0aWNrSGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGlja0hlaWdodCk7XG4gIH1cblxuICB0aWNrVHJhbnNmb3JtKHRpY2spOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlKCR7dGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spfSwke3RoaXMudmVydGljYWxTcGFjaW5nfSlgO1xuICB9XG5cbiAgZ3JpZExpbmVUcmFuc2Zvcm0oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSg1LDApYDtcbiAgfVxuXG4gIHRpY2tUcmltKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRyaW1UaWNrcyA/IHRyaW1MYWJlbChsYWJlbCwgdGhpcy5tYXhUaWNrTGVuZ3RoKSA6IGxhYmVsO1xuICB9XG59XG4iXX0=