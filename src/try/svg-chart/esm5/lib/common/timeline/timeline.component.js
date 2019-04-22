import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { select, event as d3event } from 'd3-selection';
import { id } from '../../utils/id';
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TimelineComponent.prototype.ngOnChanges = function (changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    TimelineComponent.prototype.update = function () {
        this.dims = this.getDims();
        this.height = this.dims.height;
        var offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = "translate(0 , " + offsetY + ")";
        this.filterId = 'filter' + id().toString();
        this.filter = "url(#" + this.filterId + ")";
        this.cd.markForCheck();
    };
    TimelineComponent.prototype.getXDomain = function () {
        var e_1, _a, e_2, _b;
        var values = [];
        try {
            for (var _c = tslib_1.__values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = tslib_1.__values(results.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!values.includes(d.name)) {
                            values.push(d.name);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var domain = [];
        var max;
        var min;
        if (this.scaleType === 'time') {
            min = Math.min.apply(Math, tslib_1.__spread(values));
            max = Math.max.apply(Math, tslib_1.__spread(values));
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            min = Math.min.apply(Math, tslib_1.__spread(values));
            max = Math.max.apply(Math, tslib_1.__spread(values));
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    TimelineComponent.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    TimelineComponent.prototype.addBrush = function () {
        var _this = this;
        if (this.brush) {
            return;
        }
        var height = this.height;
        var width = this.view[0];
        this.brush = brushX()
            .extent([[0, 0], [width, height]])
            .on('brush end', function () {
            var selection = d3event.selection || _this.xScale.range();
            var newDomain = selection.map(_this.xScale.invert);
            _this.onDomainChange.emit(newDomain);
            _this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    };
    TimelineComponent.prototype.updateBrush = function () {
        if (!this.brush) {
            return;
        }
        var height = this.height;
        var width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        select(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        select(this.element).select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    };
    TimelineComponent.prototype.getDims = function () {
        var width = this.view[0];
        var dims = {
            width: width,
            height: this.height
        };
        return dims;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "view", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "state", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "results", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "scheme", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "customColors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "legend", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "miniChart", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "autoScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "scaleType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "onDomainChange", void 0);
    TimelineComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-timeline]',
            template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\"\n        [attr.width]=\"view[0]\"\n        y=\"0\"\n        [attr.height]=\"height\"\n        class=\"brush-background\"\n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef])
    ], TimelineComponent);
    return TimelineComponent;
}());
export { TimelineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQ3ZDLHVCQUF1QixFQUNsQyxpQkFBaUIsRUFBaUIsaUJBQWlCLEVBQ3BELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUE2QnBDO0lBMEJFLDJCQUNFLE9BQW1CLEVBQ1gsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFqQnRCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFROUMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFPbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO0lB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QUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNCLElBQU0sSUFBSSxHQUFHO1lBQ1gsS0FBSyxPQUFBO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFoS1E7UUFBUixLQUFLLEVBQUU7O21EQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O29EQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7O3NEQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7O3FEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7OzJEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7O3FEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3dEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7O3dEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7O3dEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7O3FEQUFhO0lBRVg7UUFBVCxNQUFNLEVBQUU7O3FEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTs7NkRBQXFDO0lBZG5DLGlCQUFpQjtRQTNCN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUsNm5CQW9CVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO2lEQTRCVyxVQUFVO1lBQ1AsaUJBQWlCO09BNUJwQixpQkFBaUIsQ0FvSzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXBLRCxJQW9LQztTQXBLWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYnJ1c2hYIH0gZnJvbSAnZDMtYnJ1c2gnO1xuaW1wb3J0IHsgc2NhbGVMaW5lYXIsIHNjYWxlVGltZSwgc2NhbGVQb2ludCB9IGZyb20gJ2QzLXNjYWxlJztcbmltcG9ydCB7IHNlbGVjdCwgZXZlbnQgYXMgZDNldmVudCB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5cbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtdGltZWxpbmVdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIGNsYXNzPVwidGltZWxpbmVcIlxuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxuICAgICAgPHN2ZzpmaWx0ZXIgW2F0dHIuaWRdPVwiZmlsdGVySWRcIj5cbiAgICAgICAgPHN2ZzpmZUNvbG9yTWF0cml4IGluPVwiU291cmNlR3JhcGhpY1wiXG4gICAgICAgICAgICB0eXBlPVwibWF0cml4XCJcbiAgICAgICAgICAgIHZhbHVlcz1cIjAuMzMzMyAwLjMzMzMgMC4zMzMzIDAgMCAwLjMzMzMgMC4zMzMzIDAuMzMzMyAwIDAgMC4zMzMzIDAuMzMzMyAwLjMzMzMgMCAwIDAgMCAwIDEgMFwiIC8+XG4gICAgICA8L3N2ZzpmaWx0ZXI+XG4gICAgICA8c3ZnOmcgY2xhc3M9XCJlbWJlZGRlZC1jaGFydFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3N2ZzpnPlxuICAgICAgPHN2ZzpyZWN0IHg9XCIwXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwidmlld1swXVwiXG4gICAgICAgIHk9XCIwXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiXG4gICAgICAgIGNsYXNzPVwiYnJ1c2gtYmFja2dyb3VuZFwiXG4gICAgICAvPlxuICAgICAgPHN2ZzpnIGNsYXNzPVwiYnJ1c2hcIj48L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3RpbWVsaW5lLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSB2aWV3O1xuICBASW5wdXQoKSBzdGF0ZTtcbiAgQElucHV0KCkgcmVzdWx0cztcbiAgQElucHV0KCkgc2NoZW1lO1xuICBASW5wdXQoKSBjdXN0b21Db2xvcnM7XG4gIEBJbnB1dCgpIGxlZ2VuZDtcbiAgQElucHV0KCkgbWluaUNoYXJ0O1xuICBASW5wdXQoKSBhdXRvU2NhbGU7XG4gIEBJbnB1dCgpIHNjYWxlVHlwZTtcbiAgQElucHV0KCkgaGVpZ2h0ID0gNTA7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRG9tYWluQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBkaW1zOiBhbnk7XG4gIHhEb21haW46IGFueVtdO1xuICB4U2NhbGU6IGFueTtcbiAgYnJ1c2g6IGFueTtcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIGZpbHRlcklkOiBhbnk7XG4gIGZpbHRlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5hZGRCcnVzaCgpO1xuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZGltcyA9IHRoaXMuZ2V0RGltcygpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5kaW1zLmhlaWdodDtcbiAgICBjb25zdCBvZmZzZXRZID0gdGhpcy52aWV3WzFdIC0gdGhpcy5oZWlnaHQ7XG5cbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKCk7XG5cbiAgICBpZiAodGhpcy5icnVzaCkge1xuICAgICAgdGhpcy51cGRhdGVCcnVzaCgpO1xuICAgIH1cblxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgwICwgJHtvZmZzZXRZfSlgO1xuXG4gICAgdGhpcy5maWx0ZXJJZCA9ICdmaWx0ZXInICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuZmlsdGVyID0gYHVybCgjJHt0aGlzLmZpbHRlcklkfSlgO1xuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldFhEb21haW4oKTogYW55W10ge1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgcmVzdWx0cyBvZiB0aGlzLnJlc3VsdHMpIHtcbiAgICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHRzLnNlcmllcykge1xuICAgICAgICBpZiAoIXZhbHVlcy5pbmNsdWRlcyhkLm5hbWUpKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2goZC5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBkb21haW4gPSBbXTtcbiAgICBsZXQgbWF4OiBudW1iZXI7XG4gICAgbGV0IG1pbjogbnVtYmVyO1xuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xuICAgICAgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcbiAgICAgIGRvbWFpbiA9IFttaW4sIG1heF07XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xuICAgICAgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcbiAgICAgIG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb21haW4gPSB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbWFpbjtcbiAgfVxuXG4gIGdldFhTY2FsZSgpIHtcbiAgICBsZXQgc2NhbGU7XG5cbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgc2NhbGUgPSBzY2FsZVRpbWUoKVxuICAgICAgICAucmFuZ2UoWzAsIHRoaXMuZGltcy53aWR0aF0pXG4gICAgICAgIC5kb21haW4odGhpcy54RG9tYWluKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgc2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcbiAgICAgICAgLmRvbWFpbih0aGlzLnhEb21haW4pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgc2NhbGUgPSBzY2FsZVBvaW50KClcbiAgICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxuICAgICAgICAucGFkZGluZygwLjEpXG4gICAgICAgIC5kb21haW4odGhpcy54RG9tYWluKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBhZGRCcnVzaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5icnVzaCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xuXG4gICAgdGhpcy5icnVzaCA9IGJydXNoWCgpXG4gICAgICAuZXh0ZW50KFtbMCwgMF0sIFt3aWR0aCwgaGVpZ2h0XV0pXG4gICAgICAub24oJ2JydXNoIGVuZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDNldmVudC5zZWxlY3Rpb24gfHwgdGhpcy54U2NhbGUucmFuZ2UoKTtcbiAgICAgICAgY29uc3QgbmV3RG9tYWluID0gc2VsZWN0aW9uLm1hcCh0aGlzLnhTY2FsZS5pbnZlcnQpO1xuXG4gICAgICAgIHRoaXMub25Eb21haW5DaGFuZ2UuZW1pdChuZXdEb21haW4pO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG5cbiAgICBzZWxlY3QodGhpcy5lbGVtZW50KVxuICAgICAgLnNlbGVjdCgnLmJydXNoJylcbiAgICAgIC5jYWxsKHRoaXMuYnJ1c2gpO1xuICB9XG5cbiAgdXBkYXRlQnJ1c2goKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmJydXNoKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnZpZXdbMF07XG5cbiAgICB0aGlzLmJydXNoLmV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKTtcbiAgICBzZWxlY3QodGhpcy5lbGVtZW50KVxuICAgICAgLnNlbGVjdCgnLmJydXNoJylcbiAgICAgIC5jYWxsKHRoaXMuYnJ1c2gpO1xuXG4gICAgLy8gY2xlYXIgaGFyZGNvZGVkIHByb3BlcnRpZXMgc28gdGhleSBjYW4gYmUgZGVmaW5lZCBieSBDU1NcbiAgICBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5zZWxlY3Rpb24nKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCB1bmRlZmluZWQpXG4gICAgICAuYXR0cignc3Ryb2tlJywgdW5kZWZpbmVkKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHVuZGVmaW5lZCk7XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0RGltcygpOiBhbnkge1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xuXG4gICAgY29uc3QgZGltcyA9IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodFxuICAgIH07XG5cbiAgICByZXR1cm4gZGltcztcbiAgfVxuXG59XG4iXX0=