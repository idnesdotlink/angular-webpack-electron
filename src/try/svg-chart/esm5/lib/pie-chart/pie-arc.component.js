import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { id } from '../utils/id';
var PieArcComponent = /** @class */ (function () {
    function PieArcComponent(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.getGradient = function () {
        return this.gradient ? this.gradientFill : this.fill;
    };
    PieArcComponent.prototype.getPointerEvents = function () {
        return this.pointerEvents ? 'auto' : 'none';
    };
    PieArcComponent.prototype.update = function () {
        var calc = this.calculateArc();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = "url(#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
        else {
            this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = (this.outerRadius * this.value) / this.max;
        }
        return arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        })
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        var _this = this;
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () { return _this.select.emit(_this.data); }, 200);
    };
    PieArcComponent.prototype.onDblClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "fill", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "startAngle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "endAngle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "innerRadius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "outerRadius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "cornerRadius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "max", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "explodeSlices", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "animate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "pointerEvents", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "isActive", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PieArcComponent.prototype, "dblclick", void 0);
    PieArcComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-pie-arc]',
            template: "<svg:g class=\"arc-group\">\n  <svg:defs *ngIf=\"gradient\">\n    <svg:g ng-svg-charts-svg-radial-gradient\n      [color]=\"fill\"\n      orientation=\"vertical\"\n      [name]=\"radialGradientId\"\n      [startOpacity]=\"startOpacity\"\n    />\n  </svg:defs>\n  <svg:path\n    [attr.d]=\"path\"\n    class=\"arc\"\n    [class.active]=\"isActive\"\n    [attr.fill]=\"getGradient()\"\n    (click)=\"onClick()\"\n    (dblclick)=\"onDblClick($event)\"\n    (mouseenter)=\"activate.emit(data)\"\n    (mouseleave)=\"deactivate.emit(data)\"\n    [style.pointer-events]=\"getPointerEvents()\"\n  />\n</svg:g>",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], PieArcComponent);
    return PieArcComponent;
}());
export { PieArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWFyYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUdWLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFTakM7SUE4QkUseUJBQVksT0FBbUI7UUE1QnRCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixhQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFHdkIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFJakIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVF4QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUlsQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELHFD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Z0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7MERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOztxREFBa0I7SUFFaEI7UUFBVCxNQUFNLEVBQUU7O21EQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTs7cURBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzt1REFBaUM7SUFDaEM7UUFBVCxNQUFNLEVBQUU7O3FEQUErQjtJQW5CN0IsZUFBZTtRQUwzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLHFtQkFBb0M7WUFDcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztpREErQnFCLFVBQVU7T0E5QnBCLGVBQWUsQ0E4STNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlJRCxJQThJQztTQTlJWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnBvbGF0ZSB9IGZyb20gJ2QzLWludGVycG9sYXRlJztcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgeyBhcmMgfSBmcm9tICdkMy1zaGFwZSc7XG5cbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtcGllLWFyY10nLFxuICB0ZW1wbGF0ZVVybDogJ3BpZS1hcmMudGVtcGxhdGUuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBpZUFyY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGZpbGw7XG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGUgPSAwO1xuICBASW5wdXQoKSBlbmRBbmdsZSA9IE1hdGguUEkgKiAyO1xuICBASW5wdXQoKSBpbm5lclJhZGl1cztcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXM7XG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1cyA9IDA7XG4gIEBJbnB1dCgpIHZhbHVlO1xuICBASW5wdXQoKSBtYXg7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIGV4cGxvZGVTbGljZXMgPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JhZGllbnQgPSBmYWxzZTtcbiAgQElucHV0KCkgYW5pbWF0ZSA9IHRydWU7XG4gIEBJbnB1dCgpIHBvaW50ZXJFdmVudHMgPSB0cnVlO1xuICBASW5wdXQoKSBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkYmxjbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcGF0aDogYW55O1xuICBzdGFydE9wYWNpdHk6IG51bWJlcjtcbiAgcmFkaWFsR3JhZGllbnRJZDogc3RyaW5nO1xuICBsaW5lYXJHcmFkaWVudElkOiBzdHJpbmc7XG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xuICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIF90aW1lb3V0O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGdldEdyYWRpZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdyYWRpZW50ID8gdGhpcy5ncmFkaWVudEZpbGwgOiB0aGlzLmZpbGw7XG4gIH1cblxuICBnZXRQb2ludGVyRXZlbnRzKCkge1xuICAgIHJldHVybiB0aGlzLnBvaW50ZXJFdmVudHMgPyAnYXV0bycgOiAnbm9uZSc7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XG4gICAgdGhpcy5zdGFydE9wYWNpdHkgPSAwLjU7XG4gICAgdGhpcy5yYWRpYWxHcmFkaWVudElkID0gJ2xpbmVhckdyYWQnICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLnJhZGlhbEdyYWRpZW50SWR9KWA7XG5cbiAgICBpZiAodGhpcy5hbmltYXRlKSB7XG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUFuaW1hdGlvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkQW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGggPSBjYWxjLnN0YXJ0QW5nbGUodGhpcy5zdGFydEFuZ2xlKS5lbmRBbmdsZSh0aGlzLmVuZEFuZ2xlKSgpO1xuICAgIH1cbiAgfVxuXG4gIGNhbGN1bGF0ZUFyYygpOiBhbnkge1xuICAgIGxldCBvdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXM7XG4gICAgaWYgKHRoaXMuZXhwbG9kZVNsaWNlcyAmJiB0aGlzLmlubmVyUmFkaXVzID09PSAwKSB7XG4gICAgICBvdXRlclJhZGl1cyA9ICh0aGlzLm91dGVyUmFkaXVzICogdGhpcy52YWx1ZSkgLyB0aGlzLm1heDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJjKClcbiAgICAgIC5pbm5lclJhZGl1cyh0aGlzLmlubmVyUmFkaXVzKVxuICAgICAgLm91dGVyUmFkaXVzKG91dGVyUmFkaXVzKVxuICAgICAgLmNvcm5lclJhZGl1cyh0aGlzLmNvcm5lclJhZGl1cyk7XG4gIH1cblxuICBsb2FkQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGU6IGFueSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpXG4gICAgICAuc2VsZWN0QWxsKCcuYXJjJylcbiAgICAgIC5kYXRhKFt7IHN0YXJ0QW5nbGU6IHRoaXMuc3RhcnRBbmdsZSwgZW5kQW5nbGU6IHRoaXMuZW5kQW5nbGUgfV0pO1xuXG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XG5cbiAgICBub2RlXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuYXR0clR3ZWVuKCdkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XG4gICAgICAgIGNvbnN0IGNvcHlPZkQgPSBPYmplY3QuYXNzaWduKHt9LCBkKTtcbiAgICAgICAgY29weU9mRC5lbmRBbmdsZSA9IGNvcHlPZkQuc3RhcnRBbmdsZTtcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoY29weU9mRCwgY29weU9mRCk7XG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICAgIHJldHVybiBjYWxjKGludGVycG9sYXRlcih0KSk7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gKDxhbnk+dGhpcykuX2N1cnJlbnQgfHwgZDtcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoKDxhbnk+dGhpcykuX2N1cnJlbnQsIGQpO1xuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9IGludGVycG9sYXRlcigwKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICB1cGRhdGVBbmltYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZTogYW55ID0gc2VsZWN0KHRoaXMuZWxlbWVudClcbiAgICAgIC5zZWxlY3RBbGwoJy5hcmMnKVxuICAgICAgLmRhdGEoW3sgc3RhcnRBbmdsZTogdGhpcy5zdGFydEFuZ2xlLCBlbmRBbmdsZTogdGhpcy5lbmRBbmdsZSB9XSk7XG5cbiAgICBjb25zdCBjYWxjID0gdGhpcy5jYWxjdWxhdGVBcmMoKTtcblxuICAgIG5vZGVcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAuYXR0clR3ZWVuKCdkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XG4gICAgICAgIGNvbnN0IGludGVycG9sYXRlciA9IGludGVycG9sYXRlKCg8YW55PnRoaXMpLl9jdXJyZW50LCBkKTtcbiAgICAgICAgKDxhbnk+dGhpcykuX2N1cnJlbnQgPSBpbnRlcnBvbGF0ZXIoMCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGMoaW50ZXJwb2xhdGVyKHQpKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgdGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGEpLCAyMDApO1xuICB9XG5cbiAgb25EYmxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuXG4gICAgdGhpcy5kYmxjbGljay5lbWl0KHtcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIG5hdGl2ZUV2ZW50OiBldmVudFxuICAgIH0pO1xuICB9XG59XG4iXX0=