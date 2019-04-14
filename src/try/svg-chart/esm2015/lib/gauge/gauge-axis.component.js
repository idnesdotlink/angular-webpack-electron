import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { line } from 'd3-shape';
let GaugeAxisComponent = class GaugeAxisComponent {
    constructor() {
        this.rotate = '';
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = `rotate(${this.rotationAngle})`;
        this.ticks = this.getTicks();
    }
    getTicks() {
        const bigTickSegment = this.angleSpan / this.bigSegments;
        const smallTickSegment = bigTickSegment / (this.smallSegments);
        const tickLength = 20;
        const ticks = {
            big: [],
            small: []
        };
        const startDistance = this.radius + 10;
        const textDist = startDistance + tickLength + 10;
        for (let i = 0; i <= this.bigSegments; i++) {
            const angleDeg = i * bigTickSegment;
            const angle = angleDeg * Math.PI / 180;
            const textAnchor = this.getTextAnchor(angleDeg);
            let skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                let text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor,
                    text,
                    textTransform: `
            translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(${-this.rotationAngle})
          `
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (let j = 1; j <= this.smallSegments; j++) {
                const smallAngleDeg = angleDeg + j * smallTickSegment;
                const smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    }
    getTextAnchor(angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        let textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    }
    getTickPath(startDistance, tickLength, angle) {
        const y1 = startDistance * Math.sin(angle);
        const y2 = (startDistance + tickLength) * Math.sin(angle);
        const x1 = startDistance * Math.cos(angle);
        const x2 = (startDistance + tickLength) * Math.cos(angle);
        const points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        const lineGenerator = line().x(d => d.x).y(d => d.y);
        return lineGenerator(points);
    }
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
        template: `
    <svg:g [attr.transform]="rotate">
        <svg:g *ngFor="let tick of ticks.big"
            class="gauge-tick gauge-tick-large">
            <svg:path [attr.d]="tick.line" />
        </svg:g>
        <svg:g *ngFor="let tick of ticks.big"
            class="gauge-tick gauge-tick-large">
            <svg:text
                [style.textAnchor]="tick.textAnchor"
                [attr.transform]="tick.textTransform"
                alignment-baseline="central">
                {{tick.text}}
            </svg:text>
        </svg:g>
        <svg:g *ngFor="let tick of ticks.small"
            class="gauge-tick gauge-tick-small">
            <svg:path [attr.d]="tick.line" />
        </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GaugeAxisComponent);
export { GaugeAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXhpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9nYXVnZS9nYXVnZS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUEyQmhDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBekIvQjtRQXNDRSxXQUFNLEdBQUcsRUFBRSxDQUFDO0lBOEZkLENBQUM7SUE1RkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVcsSUFBSSxDQUFDLGFBQWMsR0FBRyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRztZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcsYUFB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLGtCQUFrQixDQTJHOUI7U0EzR1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGxpbmUgfSBmcm9tICdkMy1zaGFwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy1nYXVnZS1heGlzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJyb3RhdGVcIj5cbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLmJpZ1wiXG4gICAgICAgICAgICBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1sYXJnZVwiPlxuICAgICAgICAgICAgPHN2ZzpwYXRoIFthdHRyLmRdPVwidGljay5saW5lXCIgLz5cbiAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLmJpZ1wiXG4gICAgICAgICAgICBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1sYXJnZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwidGljay50ZXh0QW5jaG9yXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidGljay50ZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJjZW50cmFsXCI+XG4gICAgICAgICAgICAgICAge3t0aWNrLnRleHR9fVxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLnNtYWxsXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZ2F1Z2UtdGljayBnYXVnZS10aWNrLXNtYWxsXCI+XG4gICAgICAgICAgICA8c3ZnOnBhdGggW2F0dHIuZF09XCJ0aWNrLmxpbmVcIiAvPlxuICAgICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdhdWdlQXhpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGJpZ1NlZ21lbnRzOiBhbnk7XG4gIEBJbnB1dCgpIHNtYWxsU2VnbWVudHM6IGFueTtcbiAgQElucHV0KCkgbWluOiBhbnk7XG4gIEBJbnB1dCgpIG1heDogYW55O1xuICBASW5wdXQoKSBhbmdsZVNwYW46IG51bWJlcjtcbiAgQElucHV0KCkgc3RhcnRBbmdsZTogbnVtYmVyO1xuICBASW5wdXQoKSByYWRpdXM6IGFueTtcbiAgQElucHV0KCkgdmFsdWVTY2FsZTogYW55O1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZzogYW55O1xuXG4gIHRpY2tzOiBhbnk7XG4gIHJvdGF0aW9uQW5nbGU6IG51bWJlcjtcbiAgcm90YXRlID0gJyc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5yb3RhdGlvbkFuZ2xlID0gLTkwICsgdGhpcy5zdGFydEFuZ2xlO1xuICAgIHRoaXMucm90YXRlID0gYHJvdGF0ZSgkeyB0aGlzLnJvdGF0aW9uQW5nbGUgfSlgO1xuICAgIHRoaXMudGlja3MgPSB0aGlzLmdldFRpY2tzKCk7XG4gIH1cblxuICBnZXRUaWNrcygpOiBhbnkge1xuICAgIGNvbnN0IGJpZ1RpY2tTZWdtZW50ID0gdGhpcy5hbmdsZVNwYW4gLyB0aGlzLmJpZ1NlZ21lbnRzO1xuICAgIGNvbnN0IHNtYWxsVGlja1NlZ21lbnQgPSBiaWdUaWNrU2VnbWVudCAvICh0aGlzLnNtYWxsU2VnbWVudHMpO1xuICAgIGNvbnN0IHRpY2tMZW5ndGggPSAyMDtcbiAgICBjb25zdCB0aWNrcyA9IHtcbiAgICAgIGJpZzogW10sXG4gICAgICBzbWFsbDogW11cbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnREaXN0YW5jZSA9IHRoaXMucmFkaXVzICsgMTA7XG4gICAgY29uc3QgdGV4dERpc3QgPSBzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCArIDEwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5iaWdTZWdtZW50czsgaSsrKSB7XG4gICAgICBjb25zdCBhbmdsZURlZyA9IGkgKiBiaWdUaWNrU2VnbWVudDtcbiAgICAgIGNvbnN0IGFuZ2xlID0gYW5nbGVEZWcgKiBNYXRoLlBJIC8gMTgwO1xuXG4gICAgICBjb25zdCB0ZXh0QW5jaG9yID0gdGhpcy5nZXRUZXh0QW5jaG9yKGFuZ2xlRGVnKTtcblxuICAgICAgbGV0IHNraXAgPSBmYWxzZTtcbiAgICAgIGlmIChpID09PSAwICYmIHRoaXMuYW5nbGVTcGFuID09PSAzNjApIHtcbiAgICAgICAgc2tpcCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2tpcCkge1xuICAgICAgICBsZXQgdGV4dCA9IE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWVTY2FsZS5pbnZlcnQoYW5nbGVEZWcpLnRvU3RyaW5nKCkpLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLnRpY2tGb3JtYXR0aW5nKSB7XG4gICAgICAgICAgdGV4dCA9IHRoaXMudGlja0Zvcm1hdHRpbmcodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGlja3MuYmlnLnB1c2goe1xuICAgICAgICAgIGxpbmU6IHRoaXMuZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZSwgdGlja0xlbmd0aCwgYW5nbGUpLFxuICAgICAgICAgIHRleHRBbmNob3IsXG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiBgXG4gICAgICAgICAgICB0cmFuc2xhdGUoJHt0ZXh0RGlzdCAqIE1hdGguY29zKGFuZ2xlKX0sICR7dGV4dERpc3QgKiBNYXRoLnNpbihhbmdsZSl9KSByb3RhdGUoJHsgLXRoaXMucm90YXRpb25BbmdsZSB9KVxuICAgICAgICAgIGBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSB0aGlzLmJpZ1NlZ21lbnRzKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnNtYWxsU2VnbWVudHM7IGorKykge1xuICAgICAgICBjb25zdCBzbWFsbEFuZ2xlRGVnID0gYW5nbGVEZWcgKyBqICogc21hbGxUaWNrU2VnbWVudDtcbiAgICAgICAgY29uc3Qgc21hbGxBbmdsZSA9IHNtYWxsQW5nbGVEZWcgKiBNYXRoLlBJIC8gMTgwO1xuXG4gICAgICAgIHRpY2tzLnNtYWxsLnB1c2goe1xuICAgICAgICAgIGxpbmU6IHRoaXMuZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZSwgdGlja0xlbmd0aCAvIDIsIHNtYWxsQW5nbGUpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIGdldFRleHRBbmNob3IoYW5nbGUpIHtcbiAgICAvLyBbMCwgNDVdID0gJ21pZGRsZSc7XG4gICAgLy8gWzQ2LCAxMzVdID0gJ3N0YXJ0JztcbiAgICAvLyBbMTM2LCAyMjVdID0gJ21pZGRsZSc7XG4gICAgLy8gWzIyNiwgMzE1XSA9ICdlbmQnO1xuXG4gICAgYW5nbGUgPSAodGhpcy5zdGFydEFuZ2xlICsgYW5nbGUpICUgMzYwO1xuICAgIGxldCB0ZXh0QW5jaG9yID0gJ21pZGRsZSc7XG4gICAgaWYgKGFuZ2xlID4gNDUgJiYgYW5nbGUgPD0gMTM1KSB7XG4gICAgICB0ZXh0QW5jaG9yID0gJ3N0YXJ0JztcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID4gMjI1ICYmIGFuZ2xlIDw9IDMxNSkge1xuICAgICAgdGV4dEFuY2hvciA9ICdlbmQnO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dEFuY2hvcjtcbiAgfVxuXG4gIGdldFRpY2tQYXRoKHN0YXJ0RGlzdGFuY2UsIHRpY2tMZW5ndGgsIGFuZ2xlKTogYW55IHtcbiAgICBjb25zdCB5MSA9IHN0YXJ0RGlzdGFuY2UgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgY29uc3QgeTIgPSAoc3RhcnREaXN0YW5jZSArIHRpY2tMZW5ndGgpICogTWF0aC5zaW4oYW5nbGUpO1xuICAgIGNvbnN0IHgxID0gc3RhcnREaXN0YW5jZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICBjb25zdCB4MiA9IChzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCkgKiBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgICBjb25zdCBwb2ludHMgPSBbe3g6IHgxLCB5OiB5MX0sIHt4OiB4MiwgeTogeTJ9XTtcbiAgICBjb25zdCBsaW5lR2VuZXJhdG9yID0gbGluZTxhbnk+KCkueChkID0+IGQueCkueShkID0+IGQueSk7XG4gICAgcmV0dXJuIGxpbmVHZW5lcmF0b3IocG9pbnRzKTtcbiAgfVxuXG59XG4iXX0=