import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, TemplateRef, } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MouseEvent } from '../../events';
var TooltipAreaComponent = /** @class */ (function () {
    function TooltipAreaComponent() {
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    TooltipAreaComponent.prototype.getValues = function (xVal) {
        var e_1, _a;
        var results = [];
        try {
            for (var _b = tslib_1.__values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
                var groupName = group.name;
                if (groupName instanceof Date) {
                    groupName = groupName.toLocaleDateString();
                }
                if (item) {
                    var label = item.name;
                    var val = item.value;
                    if (this.showPercentage) {
                        val = (item.d1 - item.d0).toFixed(2) + '%';
                    }
                    var color = void 0;
                    if (this.colors.scaleType === 'linear') {
                        var v = val;
                        if (item.d1) {
                            v = item.d1;
                        }
                        color = this.colors.getColor(v);
                    }
                    else {
                        color = this.colors.getColor(group.name);
                    }
                    results.push({
                        value: val,
                        name: label,
                        series: groupName,
                        min: item.min,
                        max: item.max,
                        color: color
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    };
    TooltipAreaComponent.prototype.mouseMove = function (event) {
        var xPos = event.pageX - event.target.getBoundingClientRect().left;
        var closestIndex = this.findClosestPointIndex(xPos);
        var closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            var ev = new MouseEvent('mouseleave', { bubbles: false });
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    };
    TooltipAreaComponent.prototype.findClosestPointIndex = function (xPos) {
        var minIndex = 0;
        var maxIndex = this.xSet.length - 1;
        var minDiff = Number.MAX_VALUE;
        var closestIndex = 0;
        while (minIndex <= maxIndex) {
            // tslint:disable-next-line: no-bitwise
            var currentIndex = (minIndex + maxIndex) / 2 | 0;
            var currentElement = this.xScale(this.xSet[currentIndex]);
            var curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    };
    TooltipAreaComponent.prototype.showTooltip = function () {
        var event = new MouseEvent('mouseenter', { bubbles: false });
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    };
    TooltipAreaComponent.prototype.hideTooltip = function () {
        var event = new MouseEvent('mouseleave', { bubbles: false });
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    };
    TooltipAreaComponent.prototype.getToolTipText = function (tooltipItem) {
        var result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "xSet", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "results", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "showPercentage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], TooltipAreaComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "hover", void 0);
    tslib_1.__decorate([
        ViewChild('tooltipAnchor'),
        tslib_1.__metadata("design:type", Object)
    ], TooltipAreaComponent.prototype, "tooltipAnchor", void 0);
    TooltipAreaComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-tooltip-area]',
            template: "<svg:g>\n  <svg:rect\n    class=\"tooltip-area\"\n    [attr.x]=\"0\"\n    y=\"0\"\n    [attr.width]=\"dims.width\"\n    [attr.height]=\"dims.height\"\n    style=\"opacity: 0; cursor: 'auto';\"\n    (mousemove)=\"mouseMove($event)\"\n    (mouseleave)=\"hideTooltip()\"\n  />\n  <xhtml:ng-template #defaultTooltipTemplate let-model=\"model\">\n    <xhtml:div class=\"area-tooltip-container\">\n      <xhtml:div\n        *ngFor=\"let tooltipItem of model\"\n        class=\"tooltip-item\">\n        <span\n          class=\"tooltip-item-color\"\n          [style.background-color]=\"tooltipItem.color\">\n        </span>\n        {{getToolTipText(tooltipItem)}}\n      </xhtml:div>\n    </xhtml:div>\n  </xhtml:ng-template>\n  <svg:rect\n    #tooltipAnchor\n    [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n    class=\"tooltip-anchor\"\n    [attr.x]=\"anchorPos\"\n    y=\"0\"\n    [attr.width]=\"1\"\n    [attr.height]=\"dims.height\"\n    [style.opacity]=\"anchorOpacity\"\n    [style.pointer-events]=\"'none'\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'right'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipSpacing]=\"15\"\n    [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate: defaultTooltipTemplate\"\n    [tooltipContext]=\"anchorValues\"\n    [tooltipImmediateExit]=\"true\"\n  />\n</svg:g>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition('inactive => active', [
                        style({
                            opacity: 0,
                        }),
                        animate(250, style({ opacity: 0.7 }))
                    ]),
                    transition('active => inactive', [
                        style({
                            opacity: 0.7,
                        }),
                        animate(250, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], TooltipAreaComponent);
    return TooltipAreaComponent;
}());
export { TooltipAreaComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi90b29sdGlwLWFyZWEvdG9vbHRpcC1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQXVCMUM7SUFyQkE7UUFzQkUsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsaUJBQVksR0FBVSxFQUFFLENBQUM7UUFTaEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHdkIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFnSnZDLENBQUM7SUE1SUMsd0NBQVMsR0FBVCxVQUFVLElBQUk7O1FBQ1osSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDOztZQUVuQixLQUFvQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0IsSUFBTSxLQUFLLFdBQUE7Z0JBQ2QsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLFNBQVMsR0FBRyxL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RUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztxQkFDcEMsQ0FBQztvQkFDRixVQUFVLENBQUMsb0JBQW9CLEVBQUU7d0JBQy9CLEtBQUssQ0FBQzs0QkFDSixPQUFPLEVBQUUsR0FBRzt5QkFDYixDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7cUJBQ2xDLENBQUM7aUJBQ0gsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUNXLG9CQUFvQixDQWdLaEM7SUFBRCwyQkFBQztDQUFBLEFBaEtELElBZ0tDO1NBaEtZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtdG9vbHRpcC1hcmVhXScsXG4gIHRlbXBsYXRlVXJsOiAndG9vbHRpcC1hcmVhLnRlbXBsYXRlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignaW5hY3RpdmUgPT4gYWN0aXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7b3BhY2l0eTogMC43fSkpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJ2FjdGl2ZSA9PiBpbmFjdGl2ZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDAuNyxcbiAgICAgICAgfSksXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBBcmVhQ29tcG9uZW50IHtcbiAgYW5jaG9yT3BhY2l0eSA9IDA7XG4gIGFuY2hvclBvcyA9IC0xO1xuICBhbmNob3JWYWx1ZXM6IGFueVtdID0gW107XG4gIGxhc3RBbmNob3JQb3M6IG51bWJlcjtcblxuICBASW5wdXQoKSBkaW1zO1xuICBASW5wdXQoKSB4U2V0O1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIHlTY2FsZTtcbiAgQElucHV0KCkgcmVzdWx0cztcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBzaG93UGVyY2VudGFnZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCd0b29sdGlwQW5jaG9yJykgdG9vbHRpcEFuY2hvcjtcblxuICBnZXRWYWx1ZXMoeFZhbCk6IGFueVtdIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgY29uc3QgaXRlbSA9IGdyb3VwLnNlcmllcy5maW5kKGQgPT4gZC5uYW1lLnRvU3RyaW5nKCkgPT09IHhWYWwudG9TdHJpbmcoKSk7XG4gICAgICBsZXQgZ3JvdXBOYW1lID0gZ3JvdXAubmFtZTtcbiAgICAgIGlmIChncm91cE5hbWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIGdyb3VwTmFtZSA9IGdyb3VwTmFtZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBpdGVtLm5hbWU7XG4gICAgICAgIGxldCB2YWwgPSBpdGVtLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5zaG93UGVyY2VudGFnZSkge1xuICAgICAgICAgIHZhbCA9IChpdGVtLmQxIC0gaXRlbS5kMCkudG9GaXhlZCgyKSArICclJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sb3I7XG4gICAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICAgICAgbGV0IHYgPSB2YWw7XG4gICAgICAgICAgaWYgKGl0ZW0uZDEpIHtcbiAgICAgICAgICAgIHYgPSBpdGVtLmQxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoZ3JvdXAubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgbmFtZTogbGFiZWwsXG4gICAgICAgICAgc2VyaWVzOiBncm91cE5hbWUsXG4gICAgICAgICAgbWluOiBpdGVtLm1pbixcbiAgICAgICAgICBtYXg6IGl0ZW0ubWF4LFxuICAgICAgICAgIGNvbG9yXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgbW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgY29uc3QgeFBvcyA9IGV2ZW50LnBhZ2VYIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cbiAgICBjb25zdCBjbG9zZXN0SW5kZXggPSB0aGlzLmZpbmRDbG9zZXN0UG9pbnRJbmRleCh4UG9zKTtcbiAgICBjb25zdCBjbG9zZXN0UG9pbnQgPSB0aGlzLnhTZXRbY2xvc2VzdEluZGV4XTtcbiAgICB0aGlzLmFuY2hvclBvcyA9IHRoaXMueFNjYWxlKGNsb3Nlc3RQb2ludCk7XG4gICAgdGhpcy5hbmNob3JQb3MgPSBNYXRoLm1heCgwLCB0aGlzLmFuY2hvclBvcyk7XG4gICAgdGhpcy5hbmNob3JQb3MgPSBNYXRoLm1pbih0aGlzLmRpbXMud2lkdGgsIHRoaXMuYW5jaG9yUG9zKTtcblxuICAgIHRoaXMuYW5jaG9yVmFsdWVzID0gdGhpcy5nZXRWYWx1ZXMoY2xvc2VzdFBvaW50KTtcbiAgICBpZiAodGhpcy5hbmNob3JQb3MgIT09IHRoaXMubGFzdEFuY2hvclBvcykge1xuICAgICAgY29uc3QgZXYgPSBuZXcgTW91c2VFdmVudCgnbW91c2VsZWF2ZScsIHtidWJibGVzOiBmYWxzZX0pO1xuICAgICAgdGhpcy50b29sdGlwQW5jaG9yLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICB0aGlzLmFuY2hvck9wYWNpdHkgPSAwLjc7XG4gICAgICB0aGlzLmhvdmVyLmVtaXQoe1xuICAgICAgICB2YWx1ZTogY2xvc2VzdFBvaW50XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcblxuICAgICAgdGhpcy5sYXN0QW5jaG9yUG9zID0gdGhpcy5hbmNob3JQb3M7XG4gICAgfVxuICB9XG5cbiAgZmluZENsb3Nlc3RQb2ludEluZGV4KHhQb3MpIHtcbiAgICBsZXQgbWluSW5kZXggPSAwO1xuICAgIGxldCBtYXhJbmRleCA9IHRoaXMueFNldC5sZW5ndGggLSAxO1xuICAgIGxldCBtaW5EaWZmID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBsZXQgY2xvc2VzdEluZGV4ID0gMDtcblxuICAgIHdoaWxlIChtaW5JbmRleCA8PSBtYXhJbmRleCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSAobWluSW5kZXggKyBtYXhJbmRleCkgLyAyIHwgMDtcbiAgICAgIGNvbnN0IGN1cnJlbnRFbGVtZW50ID0gdGhpcy54U2NhbGUodGhpcy54U2V0W2N1cnJlbnRJbmRleF0pO1xuXG4gICAgICBjb25zdCBjdXJEaWZmID0gTWF0aC5hYnMoY3VycmVudEVsZW1lbnQgLSB4UG9zKTtcblxuICAgICAgaWYgKGN1ckRpZmYgPCBtaW5EaWZmKSB7XG4gICAgICAgIG1pbkRpZmYgPSBjdXJEaWZmO1xuICAgICAgICBjbG9zZXN0SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50RWxlbWVudCA8IHhQb3MpIHtcbiAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudCA+IHhQb3MpIHtcbiAgICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWluRGlmZiA9IDA7XG4gICAgICAgIGNsb3Nlc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb3Nlc3RJbmRleDtcbiAgfVxuXG4gIHNob3dUb29sdGlwKCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNlZW50ZXInLCB7YnViYmxlczogZmFsc2V9KTtcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGhpZGVUb29sdGlwKCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNlbGVhdmUnLCB7YnViYmxlczogZmFsc2V9KTtcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmFuY2hvck9wYWNpdHkgPSAwO1xuICAgIHRoaXMubGFzdEFuY2hvclBvcyA9IC0xO1xuICB9XG5cbiAgZ2V0VG9vbFRpcFRleHQodG9vbHRpcEl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGlmICh0b29sdGlwSXRlbS5zZXJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLnNlcmllcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ICs9ICc/Pz8nO1xuICAgIH1cbiAgICByZXN1bHQgKz0gJzogJztcbiAgICBpZiAodG9vbHRpcEl0ZW0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh0b29sdGlwSXRlbS5taW4gIT09IHVuZGVmaW5lZCB8fCB0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9ICcgKCc7XG4gICAgICBpZiAodG9vbHRpcEl0ZW0ubWluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRvb2x0aXBJdGVtLm1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICfiiaUnO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS5taW4udG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICcgLSAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSAn4omkJztcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0ubWF4LnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyknO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbn1cbiJdfQ==