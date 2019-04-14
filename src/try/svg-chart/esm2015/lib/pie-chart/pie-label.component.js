import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
let PieLabelComponent = class PieLabelComponent {
    constructor() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = trimLabel;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        const innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        const innerPos = innerArc.centroid(this.data);
        let scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        const outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
    }
    get textX() {
        return this.data.pos[0];
    }
    get textY() {
        return this.data.pos[1];
    }
    get styleTransform() {
        return this.isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
    }
    get attrTransform() {
        return !this.isIE ? null : `translate(${this.textX},${this.textY})`;
    }
    get textTransition() {
        return this.isIE || !this.animations ? null : 'transform 0.75s';
    }
    textAnchor() {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
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
export { PieLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFpQjVCO1FBVFMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBS1gsU0FBSSxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHdkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkQ7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7YUFDbkIsV0FBVyxDQUFDLFdBQVcsQ0FBQzthQUN4QixXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFNUIsdUVBQXVFO1FBQ3ZFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtRQUNELE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDO0lBQzlFLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUNsRSxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsT0FBTyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRixDQUFBO0FBekVVO0lBQVIsS0FBSyxFQUFFOzsrQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOztpREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOztnREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFOztnREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzs4Q0FBSztBQUNKO0lBQVIsS0FBSyxFQUFFOztnREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzt3REFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOztxREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7O29EQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7d0RBQW9CO0FBVmpCLGlCQUFpQjtJQUw3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLDhrQkFBc0M7UUFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQzs7R0FDVyxpQkFBaUIsQ0EwRTdCO1NBMUVZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFyYyB9IGZyb20gJ2QzLXNoYXBlJztcblxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXBpZS1sYWJlbF0nLFxuICB0ZW1wbGF0ZVVybDogJ3BpZS1sYWJlbC50ZW1wbGF0ZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSByYWRpdXM7XG4gIEBJbnB1dCgpIGxhYmVsO1xuICBASW5wdXQoKSBjb2xvcjtcbiAgQElucHV0KCkgbWF4O1xuICBASW5wdXQoKSB2YWx1ZTtcbiAgQElucHV0KCkgZXhwbG9kZVNsaWNlcztcbiAgQElucHV0KCkgYW5pbWF0aW9ucyA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsVHJpbSA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsVHJpbVNpemUgPSAxMDtcblxuICB0cmltTGFiZWw6IChsYWJlbDogc3RyaW5nLCBtYXg/OiBudW1iZXIpID0+IHN0cmluZztcbiAgbGluZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaXNJRSA9IC8oZWRnZXxtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRyaW1MYWJlbCA9IHRyaW1MYWJlbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzdGFydFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgIGlmICh0aGlzLmV4cGxvZGVTbGljZXMpIHtcbiAgICAgIHN0YXJ0UmFkaXVzID0gdGhpcy5yYWRpdXMgKiB0aGlzLnZhbHVlIC8gdGhpcy5tYXg7XG4gICAgfVxuXG4gICAgY29uc3QgaW5uZXJBcmMgPSBhcmMoKVxuICAgICAgLmlubmVyUmFkaXVzKHN0YXJ0UmFkaXVzKVxuICAgICAgLm91dGVyUmFkaXVzKHN0YXJ0UmFkaXVzKTtcblxuICAgIC8vIENhbGN1bGF0ZSBpbm5lclBvcyB0aGVuIHNjYWxlIG91dGVyIHBvc2l0aW9uIHRvIG1hdGNoIGxhYmVsIHBvc2l0aW9uXG4gICAgY29uc3QgaW5uZXJQb3MgPSBpbm5lckFyYy5jZW50cm9pZCh0aGlzLmRhdGEpO1xuXG4gICAgbGV0IHNjYWxlID0gdGhpcy5kYXRhLnBvc1sxXSAvIGlubmVyUG9zWzFdO1xuICAgIGlmICh0aGlzLmRhdGEucG9zWzFdID09PSAwIHx8IGlubmVyUG9zWzFdID09PSAwKSB7XG4gICAgICBzY2FsZSA9IDE7XG4gICAgfVxuICAgIGNvbnN0IG91dGVyUG9zID0gW3NjYWxlICogaW5uZXJQb3NbMF0sIHNjYWxlICogaW5uZXJQb3NbMV1dO1xuXG4gICAgdGhpcy5saW5lID0gYE0ke2lubmVyUG9zfUwke291dGVyUG9zfUwke3RoaXMuZGF0YS5wb3N9YDtcbiAgfVxuXG4gIGdldCB0ZXh0WCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGEucG9zWzBdO1xuICB9XG5cbiAgZ2V0IHRleHRZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5wb3NbMV07XG4gIH1cblxuICBnZXQgc3R5bGVUcmFuc2Zvcm0oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudGV4dFh9cHgsJHt0aGlzLnRleHRZfXB4LCAwKWA7XG4gIH1cblxuICBnZXQgYXR0clRyYW5zZm9ybSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAhdGhpcy5pc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUoJHt0aGlzLnRleHRYfSwke3RoaXMudGV4dFl9KWA7XG4gIH1cblxuICBnZXQgdGV4dFRyYW5zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0lFIHx8ICF0aGlzLmFuaW1hdGlvbnMgPyBudWxsIDogJ3RyYW5zZm9ybSAwLjc1cyc7XG4gIH1cblxuICB0ZXh0QW5jaG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubWlkQW5nbGUodGhpcy5kYXRhKSA8IE1hdGguUEkgPyAnc3RhcnQnIDogJ2VuZCc7XG4gIH1cblxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZC5zdGFydEFuZ2xlICsgKGQuZW5kQW5nbGUgLSBkLnN0YXJ0QW5nbGUpIC8gMjtcbiAgfVxufVxuIl19