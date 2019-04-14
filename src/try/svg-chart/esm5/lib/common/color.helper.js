import * as tslib_1 from "tslib";
import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile } from 'd3-scale';
import { colorSets } from '../utils/color-sets';
var ColorHelper = /** @class */ (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof (scheme) === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof (scheme) === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            var colorDomain = tslib_1.__spread(scheme.domain);
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            var points = range(0, 1, 1.0 / colorDomain.length);
            colorScale = scaleLinear()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (this.scaleType === 'linear') {
            var valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return (this.scale(valueScale(value)));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            var formattedValue_1 = value.toString();
            var found = void 0; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    };
    ColorHelper.prototype.getLinearGradientStops = function (value, start) {
        var e_1, _a;
        if (start === undefined) {
            start = this.domain[0];
        }
        var valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 1;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color: color,
                offset: offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                try {
                    for (var stops_1 = tslib_1.__values(stops), stops_1_1 = stops_1.next(); !stops_1_1.done; stops_1_1 = stops_1.next()) {
                        var s = stops_1_1.value;
                        s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (stops_1_1 && !stops_1_1.done && (_a = stops_1.return)) _a.call(stops_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        return stops;
    };
    return ColorHelper;
}());
export { ColorHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NvbG9yLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRDtJQU9FLHFCQUFZLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQWE7UUFDN0MsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtnQkFDeEIsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBRWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCx5Q0FBbUIsR0FBbkIsVUFBb0IsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNO1FBQ3RDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNoQyxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLEVB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QThKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJhbmdlIH0gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciwgc2NhbGVPcmRpbmFsLCBzY2FsZVF1YW50aWxlIH0gZnJvbSAnZDMtc2NhbGUnO1xuXG5pbXBvcnQgeyBjb2xvclNldHMgfSBmcm9tICcuLi91dGlscy9jb2xvci1zZXRzJztcblxuZXhwb3J0IGNsYXNzIENvbG9ySGVscGVyIHtcbiAgc2NhbGU6IGFueTtcbiAgc2NhbGVUeXBlOiBhbnk7XG4gIGNvbG9yRG9tYWluOiBhbnlbXTtcbiAgZG9tYWluOiBhbnk7XG4gIGN1c3RvbUNvbG9yczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHNjaGVtZSwgdHlwZSwgZG9tYWluLCBjdXN0b21Db2xvcnM/KSB7XG4gICAgaWYgKHR5cGVvZiAoc2NoZW1lKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHNjaGVtZSA9IGNvbG9yU2V0cy5maW5kKGNzID0+IHtcbiAgICAgICAgcmV0dXJuIGNzLm5hbWUgPT09IHNjaGVtZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNvbG9yRG9tYWluID0gc2NoZW1lLmRvbWFpbjtcbiAgICB0aGlzLnNjYWxlVHlwZSA9IHR5cGU7XG4gICAgdGhpcy5kb21haW4gPSBkb21haW47XG4gICAgdGhpcy5jdXN0b21Db2xvcnMgPSBjdXN0b21Db2xvcnM7XG5cbiAgICB0aGlzLnNjYWxlID0gdGhpcy5nZW5lcmF0ZUNvbG9yU2NoZW1lKHNjaGVtZSwgdHlwZSwgdGhpcy5kb21haW4pO1xuICB9XG5cbiAgZ2VuZXJhdGVDb2xvclNjaGVtZShzY2hlbWUsIHR5cGUsIGRvbWFpbikge1xuICAgIGlmICh0eXBlb2YgKHNjaGVtZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzY2hlbWUgPSBjb2xvclNldHMuZmluZChjcyA9PiB7XG4gICAgICAgIHJldHVybiBjcy5uYW1lID09PSBzY2hlbWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgbGV0IGNvbG9yU2NhbGU7XG4gICAgaWYgKHR5cGUgPT09ICdxdWFudGlsZScpIHtcbiAgICAgIGNvbG9yU2NhbGUgPSBzY2FsZVF1YW50aWxlKClcbiAgICAgICAgLnJhbmdlKHNjaGVtZS5kb21haW4pXG4gICAgICAgIC5kb21haW4oZG9tYWluKTtcblxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBjb2xvclNjYWxlID0gc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLnJhbmdlKHNjaGVtZS5kb21haW4pXG4gICAgICAgIC5kb21haW4oZG9tYWluKTtcblxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIC8vIGxpbmVhciBzY2hlbWVzIG11c3QgaGF2ZSBhdCBsZWFzdCAyIGNvbG9yc1xuICAgICAgY29uc3QgY29sb3JEb21haW4gPSBbLi4uc2NoZW1lLmRvbWFpbl07XG4gICAgICBpZiAoY29sb3JEb21haW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbG9yRG9tYWluLnB1c2goY29sb3JEb21haW5bMF0pO1xuICAgICAgICB0aGlzLmNvbG9yRG9tYWluID0gY29sb3JEb21haW47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvaW50cyA9IHJhbmdlKDAsIDEsIDEuMCAvIGNvbG9yRG9tYWluLmxlbmd0aCk7XG4gICAgICBjb2xvclNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKHBvaW50cylcbiAgICAgICAgLnJhbmdlKGNvbG9yRG9tYWluKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sb3JTY2FsZTtcbiAgfVxuXG4gIGdldENvbG9yKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgY29uc3QgdmFsdWVTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbih0aGlzLmRvbWFpbilcbiAgICAgICAgLnJhbmdlKFswLCAxXSk7XG5cbiAgICAgIHJldHVybiAodGhpcy5zY2FsZSh2YWx1ZVNjYWxlKHZhbHVlKSkpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXN0b21Db2xvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tQ29sb3JzKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgbGV0IGZvdW5kOiBhbnk7IC8vIHRvZG8gdHlwZSBjdXN0b21Db2xvcnNcbiAgICAgIGlmICh0aGlzLmN1c3RvbUNvbG9ycyAmJiB0aGlzLmN1c3RvbUNvbG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvdW5kID0gdGhpcy5jdXN0b21Db2xvcnMuZmluZCgobWFwcGluZykgPT4ge1xuICAgICAgICAgIHJldHVybiBtYXBwaW5nLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gZm9ybWF0dGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICByZXR1cm4gZm91bmQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0TGluZWFyR3JhZGllbnRTdG9wcyh2YWx1ZSwgc3RhcnQpIHtcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RhcnQgPSB0aGlzLmRvbWFpblswXTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbih0aGlzLmRvbWFpbilcbiAgICAgIC5yYW5nZShbMCwgMV0pO1xuXG4gICAgY29uc3QgY29sb3JWYWx1ZVNjYWxlID0gc2NhbGVCYW5kKClcbiAgICAgIC5kb21haW4odGhpcy5jb2xvckRvbWFpbilcbiAgICAgIC5yYW5nZShbMCwgMV0pO1xuXG4gICAgY29uc3QgZW5kQ29sb3IgPSB0aGlzLmdldENvbG9yKHZhbHVlKTtcblxuICAgIC8vIGdlbmVyYXRlIHRoZSBzdG9wc1xuICAgIGNvbnN0IHN0YXJ0VmFsID0gdmFsdWVTY2FsZShzdGFydCk7XG4gICAgY29uc3Qgc3RhcnRDb2xvciA9IHRoaXMuZ2V0Q29sb3Ioc3RhcnQpO1xuXG4gICAgY29uc3QgZW5kVmFsID0gdmFsdWVTY2FsZSh2YWx1ZSk7XG4gICAgbGV0IGkgPSAxO1xuICAgIGxldCBjdXJyZW50VmFsID0gc3RhcnRWYWw7XG4gICAgY29uc3Qgc3RvcHMgPSBbXTtcblxuICAgIHN0b3BzLnB1c2goe1xuICAgICAgY29sb3I6IHN0YXJ0Q29sb3IsXG4gICAgICBvZmZzZXQ6IHN0YXJ0VmFsLFxuICAgICAgb3JpZ2luYWxPZmZzZXQ6IHN0YXJ0VmFsLFxuICAgICAgb3BhY2l0eTogMVxuICAgIH0pO1xuXG4gICAgd2hpbGUgKGN1cnJlbnRWYWwgPCBlbmRWYWwgJiYgaSA8IHRoaXMuY29sb3JEb21haW4ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JEb21haW5baV07XG4gICAgICBjb25zdCBvZmZzZXQgPSBjb2xvclZhbHVlU2NhbGUoY29sb3IpO1xuICAgICAgaWYgKG9mZnNldCA8PSBzdGFydFZhbCkge1xuICAgICAgICBpKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAob2Zmc2V0LnRvRml4ZWQoNCkgPj0gKGVuZFZhbCAtIGNvbG9yVmFsdWVTY2FsZS5iYW5kd2lkdGgoKSkudG9GaXhlZCg0KSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3RvcHMucHVzaCh7XG4gICAgICAgIGNvbG9yLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH0pO1xuICAgICAgY3VycmVudFZhbCA9IG9mZnNldDtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoc3RvcHNbc3RvcHMubGVuZ3RoIC0gMV0ub2Zmc2V0IDwgMTAwKSB7XG4gICAgICBzdG9wcy5wdXNoKHtcbiAgICAgICAgY29sb3I6IGVuZENvbG9yLFxuICAgICAgICBvZmZzZXQ6IGVuZFZhbCxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGVuZFZhbCA9PT0gc3RhcnRWYWwpIHtcbiAgICAgIHN0b3BzWzBdLm9mZnNldCA9IDA7XG4gICAgICBzdG9wc1sxXS5vZmZzZXQgPSAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vcm1hbGl6ZSB0aGUgb2Zmc2V0cyBpbnRvIHBlcmNlbnRhZ2VzXG4gICAgICBpZiAoc3RvcHNbc3RvcHMubGVuZ3RoIC0gMV0ub2Zmc2V0ICE9PSAxMDApIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHN0b3BzKSB7XG4gICAgICAgICAgcy5vZmZzZXQgPSAoKHMub2Zmc2V0IC0gc3RhcnRWYWwpIC8gKGVuZFZhbCAtIHN0YXJ0VmFsKSkgKiAxMDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RvcHM7XG4gIH1cbn1cbiJdfQ==