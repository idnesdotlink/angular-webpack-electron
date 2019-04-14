import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
var PieLabelComponent = /** @class */ (function () {
    function PieLabelComponent() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = trimLabel;
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
    };
    Object.defineProperty(PieLabelComponent.prototype, "textX", {
        get: function () {
            return this.data.pos[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textY", {
        get: function () {
            return this.data.pos[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
        get: function () {
            return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
        get: function () {
            return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
        get: function () {
            return this.isIE || !this.animations ? null : 'transform 0.75s';
        },
        enumerable: true,
        configurable: true
    });
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "radius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "color", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "max", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "explodeSlices", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "labelTrim", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieLabelComponent.prototype, "labelTrimSize", void 0);
    PieLabelComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-pie-label]',
            template: "<title>{{label}}</title>\n<svg:g\n  [attr.transform]=\"attrTransform\"\n  [style.transform]=\"styleTransform\"\n  [style.transition]=\"textTransition\">\n  <svg:text\n    class=\"pie-label\"\n    [class.animation]=\"animations\"\n    dy=\".35em\"\n    [style.textAnchor]=\"textAnchor()\"\n    [style.shapeRendering]=\"'crispEdges'\">\n    {{labelTrim ? trimLabel(label, labelTrimSize) : label}}\n  </svg:text>\n</svg:g>\n<svg:path\n  [attr.d]=\"line\"\n  [attr.stroke]=\"color\"\n  fill=\"none\"\n  class=\"pie-label-line line\"\n  [class.animation]=\"animations\">\n</svg:path>",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PieLabelComponent);
    return PieLabelComponent;
}());
export { PieLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQ7SUFpQkU7UUFUUyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFLWCxTQUFJLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuRDtRQUVELElBQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTthQUNuQixXQUFXLENBQUMsV0FBVyxDQUFDO2FBQ3hCLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1Qix1RUFBdUU7UUFDdkUsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFyYyB9IGZyb20gJ2QzLXNoYXBlJztcblxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXBpZS1sYWJlbF0nLFxuICB0ZW1wbGF0ZVVybDogJ3BpZS1sYWJlbC50ZW1wbGF0ZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSByYWRpdXM7XG4gIEBJbnB1dCgpIGxhYmVsO1xuICBASW5wdXQoKSBjb2xvcjtcbiAgQElucHV0KCkgbWF4O1xuICBASW5wdXQoKSB2YWx1ZTtcbiAgQElucHV0KCkgZXhwbG9kZVNsaWNlcztcbiAgQElucHV0KCkgYW5pbWF0aW9ucyA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsVHJpbSA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsVHJpbVNpemUgPSAxMDtcblxuICB0cmltTGFiZWw6IChsYWJlbDogc3RyaW5nLCBtYXg/OiBudW1iZXIpID0+IHN0cmluZztcbiAgbGluZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaXNJRSA9IC8oZWRnZXxtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRyaW1MYWJlbCA9IHRyaW1MYWJlbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzdGFydFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgIGlmICh0aGlzLmV4cGxvZGVTbGljZXMpIHtcbiAgICAgIHN0YXJ0UmFkaXVzID0gdGhpcy5yYWRpdXMgKiB0aGlzLnZhbHVlIC8gdGhpcy5tYXg7XG4gICAgfVxuXG4gICAgY29uc3QgaW5uZXJBcmMgPSBhcmMoKVxuICAgICAgLmlubmVyUmFkaXVzKHN0YXJ0UmFkaXVzKVxuICAgICAgLm91dGVyUmFkaXVzKHN0YXJ0UmFkaXVzKTtcblxuICAgIC8vIENhbGN1bGF0ZSBpbm5lclBvcyB0aGVuIHNjYWxlIG91dGVyIHBvc2l0aW9uIHRvIG1hdGNoIGxhYmVsIHBvc2l0aW9uXG4gICAgY29uc3QgaW5uZXJQb3MgPSBpbm5lckFyYy5jZW50cm9pZCh0aGlzLmRhdGEpO1xuXG4gICAgbGV0IHNjYWxlID0gdGhpcy5kYXRhLnBvc1sxXSAvIGlubmVyUG9zWzFdO1xuICAgIGlmICh0aGlzLmRhdGEucG9zWzFdID09PSAwIHx8IGlubmVyUG9zWzFdID09PSAwKSB7XG4gICAgICBzY2FsZSA9IDE7XG4gICAgfVxuICAgIGNvbnN0IG91dGVyUG9zID0gW3NjYWxlICogaW5uZXJQb3NbMF0sIHNjYWxlICogaW5uZXJQb3NbMV1dO1xuXG4gICAgdGhpcy5saW5lID0gYE0ke2lubmVyUG9zfUwke291dGVyUG9zfUwke3RoaXMuZGF0YS5wb3N9YDtcbiAgfVxuXG4gIGdldCB0ZXh0WCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGEucG9zWzBdO1xuICB9XG5cbiAgZ2V0IHRleHRZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5wb3NbMV07XG4gIH1cblxuICBnZXQgc3R5bGVUcmFuc2Zvcm0oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudGV4dFh9cHgsJHt0aGlzLnRleHRZfXB4LCAwKWA7XG4gIH1cblxuICBnZXQgYXR0clRyYW5zZm9ybSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAhdGhpcy5pc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUoJHt0aGlzLnRleHRYfSwke3RoaXMudGV4dFl9KWA7XG4gIH1cblxuICBnZXQgdGV4dFRyYW5zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0lFIHx8ICF0aGlzLmFuaW1hdGlvbnMgPyBudWxsIDogJ3RyYW5zZm9ybSAwLjc1cyc7XG4gIH1cblxuICB0ZXh0QW5jaG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubWlkQW5nbGUodGhpcy5kYXRhKSA8IE1hdGguUEkgPyAnc3RhcnQnIDogJ2VuZCc7XG4gIH1cblxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZC5zdGFydEFuZ2xlICsgKGQuZW5kQW5nbGUgLSBkLnN0YXJ0QW5nbGUpIC8gMjtcbiAgfVxufVxuIl19