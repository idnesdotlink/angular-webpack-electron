import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { area } from 'd3-shape';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
var AreaSeriesComponent = /** @class */ (function () {
    function AreaSeriesComponent() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradient();
        var currentArea;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(function () { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = area()
                .x(xProperty)
                .y0(function (d) { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); })
                .y1(function (d) { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); });
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = .8;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    };
    AreaSeriesComponent.prototype.updateGradient = function () {
        var max;
        var min;
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                var d0values = this.data.series.map(function (d) { return d.d0; });
                var d1values = this.data.series.map(function (d) { return d.d1; });
                max = Math.max.apply(Math, tslib_1.__spread(d1values));
                min = Math.min.apply(Math, tslib_1.__spread(d0values));
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                var values = this.data.series.map(function (d) { return d.value; });
                max = Math.max.apply(Math, tslib_1.__spread(values));
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    };
    AreaSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    AreaSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0) {
            return false;
        }
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "baseValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "scaleType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "stacked", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "normalized", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "curve", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], AreaSeriesComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "select", void 0);
    AreaSeriesComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-area-series]',
            template: 'area-series.template.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AreaSeriesComponent);
    return AreaSeriesComponent;
}());
export { AreaSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYXJlYS1jaGFydC9hcmVhLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3JFO0lBTEE7UUFVVyxjQUFTLEdBQVEsTUFBTSxDQUFDO1FBR3hCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUluQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBc0d4QyxDQUFDO0lBN0ZDLHlDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFBQSxpQkFpREM7UUFoREMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksWUFBWSxDQUFDO1FBRWpCLElBQU0sU0FBUyxHQUFHLFVBQUMsQ0FBQztZQUNsQixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxXQUFXLEdBQUcsSUFBSSxFQUFPO2lCQUN0QixDQUFD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RUFBRTs7MERBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7d0RBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzsyREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3lEQUFVO0lBQ1Q7UUFBUixLQUFLLEVBQUU7O3NEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7OzhEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7MkRBQW1CO0lBRWpCO1FBQVQsTUFBTSxFQUFFOzt1REFBNkI7SUFmM0IsbUJBQW1CO1FBTC9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csbUJBQW1CLENBcUgvQjtJQUFELDBCQUFDO0NBQUEsQUFySEQsSUFxSEM7U0FySFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhcmVhIH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyBzb3J0TGluZWFyLCBzb3J0QnlUaW1lLCBzb3J0QnlEb21haW4gfSBmcm9tICcuLi91dGlscy9zb3J0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWFyZWEtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiAnYXJlYS1zZXJpZXMudGVtcGxhdGUuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFyZWFTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSBiYXNlVmFsdWU6IGFueSA9ICdhdXRvJztcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBzY2FsZVR5cGU7XG4gIEBJbnB1dCgpIHN0YWNrZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbm9ybWFsaXplZCA9IGZhbHNlO1xuICBASW5wdXQoKSBncmFkaWVudDtcbiAgQElucHV0KCkgY3VydmU7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG9wYWNpdHk6IG51bWJlcjtcbiAgcGF0aDogc3RyaW5nO1xuICBzdGFydGluZ1BhdGg6IHN0cmluZztcblxuICBoYXNHcmFkaWVudDogYm9vbGVhbjtcbiAgZ3JhZGllbnRTdG9wczogYW55W107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVHcmFkaWVudCgpO1xuXG4gICAgbGV0IGN1cnJlbnRBcmVhO1xuICAgIGxldCBzdGFydGluZ0FyZWE7XG5cbiAgICBjb25zdCB4UHJvcGVydHkgPSAoZCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgICByZXR1cm4gdGhpcy54U2NhbGUobGFiZWwpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5zdGFja2VkIHx8IHRoaXMubm9ybWFsaXplZCkge1xuICAgICAgY3VycmVudEFyZWEgPSBhcmVhPGFueT4oKVxuICAgICAgICAueCh4UHJvcGVydHkpXG4gICAgICAgIC55MCgoZCwgaSkgPT4gdGhpcy55U2NhbGUoZC5kMCkpXG4gICAgICAgIC55MSgoZCwgaSkgPT4gdGhpcy55U2NhbGUoZC5kMSkpO1xuXG4gICAgICBzdGFydGluZ0FyZWEgPSBhcmVhPGFueT4oKVxuICAgICAgICAueCh4UHJvcGVydHkpXG4gICAgICAgIC55MChkID0+IHRoaXMueVNjYWxlLnJhbmdlKClbMF0pXG4gICAgICAgIC55MShkID0+IHRoaXMueVNjYWxlLnJhbmdlKClbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50QXJlYSA9IGFyZWE8YW55PigpXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcbiAgICAgICAgLnkwKCgpID0+IHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKVxuICAgICAgICAueTEoZCA9PiB0aGlzLnlTY2FsZShkLnZhbHVlKSk7XG5cbiAgICAgIHN0YXJ0aW5nQXJlYSA9IGFyZWE8YW55PigpXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcbiAgICAgICAgLnkwKGQgPT4gdGhpcy5iYXNlVmFsdWUgPT09ICdhdXRvJyA/IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gOiB0aGlzLnlTY2FsZSh0aGlzLmJhc2VWYWx1ZSkpXG4gICAgICAgIC55MShkID0+IHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKTtcbiAgICB9XG5cbiAgICBjdXJyZW50QXJlYS5jdXJ2ZSh0aGlzLmN1cnZlKTtcbiAgICBzdGFydGluZ0FyZWEuY3VydmUodGhpcy5jdXJ2ZSk7XG5cbiAgICB0aGlzLm9wYWNpdHkgPSAuODtcblxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNlcmllcztcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICBkYXRhID0gc29ydExpbmVhcihkYXRhLCAnbmFtZScpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgZGF0YSA9IHNvcnRCeVRpbWUoZGF0YSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHNvcnRCeURvbWFpbihkYXRhLCAnbmFtZScsICdhc2MnLCB0aGlzLnhTY2FsZS5kb21haW4oKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXRoID0gY3VycmVudEFyZWEoZGF0YSk7XG4gICAgdGhpcy5zdGFydGluZ1BhdGggPSBzdGFydGluZ0FyZWEoZGF0YSk7XG4gIH1cblxuICB1cGRhdGVHcmFkaWVudCgpIHtcbiAgICBsZXQgbWF4OiBudW1iZXI7XG4gICAgbGV0IG1pbjogbnVtYmVyO1xuICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnN0YWNrZWQgfHwgdGhpcy5ub3JtYWxpemVkKSB7XG4gICAgICAgIGNvbnN0IGQwdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLmQwKTtcbiAgICAgICAgY29uc3QgZDF2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQuZDEpO1xuICAgICAgICBtYXggPSBNYXRoLm1heCguLi5kMXZhbHVlcyk7XG4gICAgICAgIG1pbiA9IE1hdGgubWluKC4uLmQwdmFsdWVzKTtcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhtYXgsIG1pbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpO1xuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKG1heCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlzSW5hY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcyB8fCB0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gPT09IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iXX0=