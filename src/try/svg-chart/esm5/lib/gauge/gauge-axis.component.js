import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { line } from 'd3-shape';
var GaugeAxisComponent = /** @class */ (function () {
    function GaugeAxisComponent() {
        this.rotate = '';
    }
    GaugeAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
    };
    GaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / (this.smallSegments);
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.radius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = angleDeg * Math.PI / 180;
            var textAnchor = this.getTextAnchor(angleDeg);
            var skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                var text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor: textAnchor,
                    text: text,
                    textTransform: "\n            translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")\n          "
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    };
    GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var lineGenerator = line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return lineGenerator(points);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "bigSegments", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "smallSegments", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "min", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "max", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], GaugeAxisComponent.prototype, "angleSpan", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], GaugeAxisComponent.prototype, "startAngle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "radius", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "valueScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "tickFormatting", void 0);
    GaugeAxisComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-gauge-axis]',
            template: "\n    <svg:g [attr.transform]=\"rotate\">\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:text\n                [style.textAnchor]=\"tick.textAnchor\"\n                [attr.transform]=\"tick.textTransform\"\n                alignment-baseline=\"central\">\n                {{tick.text}}\n            </svg:text>\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.small\"\n            class=\"gauge-tick gauge-tick-small\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeAxisComponent);
    return GaugeAxisComponent;
}());
export { GaugeAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXhpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9nYXVnZS9nYXVnZS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUEyQmhDO0lBekJBO1FBc0NFLFdBQU0sR0FBRyxFQUFFLENBQUM7SUE4RmQsQ0FBQztJQTVGQyx3Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBVyxJQUFJLENBQUMsYUFBYSxNQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDRSxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekQsSUFBTSxnQkFBZ0IsR0FBRyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0QsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQU0sS0FBSyxHQUFHO1lBQ1osR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN2QyxJQUFNLFFBQVEsR0FBRyxhQUFhLEdBQUcsVUFBVSxH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QUE2QjtZQUN2QyxRQUFRLEVBQUUsdXZCQW9CVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxrQkFBa0IsQ0EyRzlCO0lBQUQseUJBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQTNHWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbGluZSB9IGZyb20gJ2QzLXNoYXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWdhdWdlLWF4aXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInJvdGF0ZVwiPlxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3MuYmlnXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZ2F1Z2UtdGljayBnYXVnZS10aWNrLWxhcmdlXCI+XG4gICAgICAgICAgICA8c3ZnOnBhdGggW2F0dHIuZF09XCJ0aWNrLmxpbmVcIiAvPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3MuYmlnXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZ2F1Z2UtdGljayBnYXVnZS10aWNrLWxhcmdlXCI+XG4gICAgICAgICAgICA8c3ZnOnRleHRcbiAgICAgICAgICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCJ0aWNrLnRleHRBbmNob3JcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrLnRleHRUcmFuc2Zvcm1cIlxuICAgICAgICAgICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImNlbnRyYWxcIj5cbiAgICAgICAgICAgICAgICB7e3RpY2sudGV4dH19XG4gICAgICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3Muc21hbGxcIlxuICAgICAgICAgICAgY2xhc3M9XCJnYXVnZS10aWNrIGdhdWdlLXRpY2stc21hbGxcIj5cbiAgICAgICAgICAgIDxzdmc6cGF0aCBbYXR0ci5kXT1cInRpY2subGluZVwiIC8+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2F1Z2VBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYmlnU2VnbWVudHM6IGFueTtcbiAgQElucHV0KCkgc21hbGxTZWdtZW50czogYW55O1xuICBASW5wdXQoKSBtaW46IGFueTtcbiAgQElucHV0KCkgbWF4OiBhbnk7XG4gIEBJbnB1dCgpIGFuZ2xlU3BhbjogbnVtYmVyO1xuICBASW5wdXQoKSBzdGFydEFuZ2xlOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJhZGl1czogYW55O1xuICBASW5wdXQoKSB2YWx1ZVNjYWxlOiBhbnk7XG4gIEBJbnB1dCgpIHRpY2tGb3JtYXR0aW5nOiBhbnk7XG5cbiAgdGlja3M6IGFueTtcbiAgcm90YXRpb25BbmdsZTogbnVtYmVyO1xuICByb3RhdGUgPSAnJztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdGF0aW9uQW5nbGUgPSAtOTAgKyB0aGlzLnN0YXJ0QW5nbGU7XG4gICAgdGhpcy5yb3RhdGUgPSBgcm90YXRlKCR7IHRoaXMucm90YXRpb25BbmdsZSB9KWA7XG4gICAgdGhpcy50aWNrcyA9IHRoaXMuZ2V0VGlja3MoKTtcbiAgfVxuXG4gIGdldFRpY2tzKCk6IGFueSB7XG4gICAgY29uc3QgYmlnVGlja1NlZ21lbnQgPSB0aGlzLmFuZ2xlU3BhbiAvIHRoaXMuYmlnU2VnbWVudHM7XG4gICAgY29uc3Qgc21hbGxUaWNrU2VnbWVudCA9IGJpZ1RpY2tTZWdtZW50IC8gKHRoaXMuc21hbGxTZWdtZW50cyk7XG4gICAgY29uc3QgdGlja0xlbmd0aCA9IDIwO1xuICAgIGNvbnN0IHRpY2tzID0ge1xuICAgICAgYmlnOiBbXSxcbiAgICAgIHNtYWxsOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBzdGFydERpc3RhbmNlID0gdGhpcy5yYWRpdXMgKyAxMDtcbiAgICBjb25zdCB0ZXh0RGlzdCA9IHN0YXJ0RGlzdGFuY2UgKyB0aWNrTGVuZ3RoICsgMTA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmJpZ1NlZ21lbnRzOyBpKyspIHtcbiAgICAgIGNvbnN0IGFuZ2xlRGVnID0gaSAqIGJpZ1RpY2tTZWdtZW50O1xuICAgICAgY29uc3QgYW5nbGUgPSBhbmdsZURlZyAqIE1hdGguUEkgLyAxODA7XG5cbiAgICAgIGNvbnN0IHRleHRBbmNob3IgPSB0aGlzLmdldFRleHRBbmNob3IoYW5nbGVEZWcpO1xuXG4gICAgICBsZXQgc2tpcCA9IGZhbHNlO1xuICAgICAgaWYgKGkgPT09IDAgJiYgdGhpcy5hbmdsZVNwYW4gPT09IDM2MCkge1xuICAgICAgICBza2lwID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFza2lwKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gTnVtYmVyLnBhcnNlRmxvYXQodGhpcy52YWx1ZVNjYWxlLmludmVydChhbmdsZURlZykudG9TdHJpbmcoKSkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKHRoaXMudGlja0Zvcm1hdHRpbmcpIHtcbiAgICAgICAgICB0ZXh0ID0gdGhpcy50aWNrRm9ybWF0dGluZyh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB0aWNrcy5iaWcucHVzaCh7XG4gICAgICAgICAgbGluZTogdGhpcy5nZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoLCBhbmdsZSksXG4gICAgICAgICAgdGV4dEFuY2hvcixcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIHRleHRUcmFuc2Zvcm06IGBcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgke3RleHREaXN0ICogTWF0aC5jb3MoYW5nbGUpfSwgJHt0ZXh0RGlzdCAqIE1hdGguc2luKGFuZ2xlKX0pIHJvdGF0ZSgkeyAtdGhpcy5yb3RhdGlvbkFuZ2xlIH0pXG4gICAgICAgICAgYFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IHRoaXMuYmlnU2VnbWVudHMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHRoaXMuc21hbGxTZWdtZW50czsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNtYWxsQW5nbGVEZWcgPSBhbmdsZURlZyArIGogKiBzbWFsbFRpY2tTZWdtZW50O1xuICAgICAgICBjb25zdCBzbWFsbEFuZ2xlID0gc21hbGxBbmdsZURlZyAqIE1hdGguUEkgLyAxODA7XG5cbiAgICAgICAgdGlja3Muc21hbGwucHVzaCh7XG4gICAgICAgICAgbGluZTogdGhpcy5nZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoIC8gMiwgc21hbGxBbmdsZSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpY2tzO1xuICB9XG5cbiAgZ2V0VGV4dEFuY2hvcihhbmdsZSkge1xuICAgIC8vIFswLCA0NV0gPSAnbWlkZGxlJztcbiAgICAvLyBbNDYsIDEzNV0gPSAnc3RhcnQnO1xuICAgIC8vIFsxMzYsIDIyNV0gPSAnbWlkZGxlJztcbiAgICAvLyBbMjI2LCAzMTVdID0gJ2VuZCc7XG5cbiAgICBhbmdsZSA9ICh0aGlzLnN0YXJ0QW5nbGUgKyBhbmdsZSkgJSAzNjA7XG4gICAgbGV0IHRleHRBbmNob3IgPSAnbWlkZGxlJztcbiAgICBpZiAoYW5nbGUgPiA0NSAmJiBhbmdsZSA8PSAxMzUpIHtcbiAgICAgIHRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUgPiAyMjUgJiYgYW5nbGUgPD0gMzE1KSB7XG4gICAgICB0ZXh0QW5jaG9yID0gJ2VuZCc7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0QW5jaG9yO1xuICB9XG5cbiAgZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZSwgdGlja0xlbmd0aCwgYW5nbGUpOiBhbnkge1xuICAgIGNvbnN0IHkxID0gc3RhcnREaXN0YW5jZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICBjb25zdCB5MiA9IChzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCkgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgY29uc3QgeDEgPSBzdGFydERpc3RhbmNlICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIGNvbnN0IHgyID0gKHN0YXJ0RGlzdGFuY2UgKyB0aWNrTGVuZ3RoKSAqIE1hdGguY29zKGFuZ2xlKTtcblxuICAgIGNvbnN0IHBvaW50cyA9IFt7eDogeDEsIHk6IHkxfSwge3g6IHgyLCB5OiB5Mn1dO1xuICAgIGNvbnN0IGxpbmVHZW5lcmF0b3IgPSBsaW5lPGFueT4oKS54KGQgPT4gZC54KS55KGQgPT4gZC55KTtcbiAgICByZXR1cm4gbGluZUdlbmVyYXRvcihwb2ludHMpO1xuICB9XG5cbn1cbiJdfQ==