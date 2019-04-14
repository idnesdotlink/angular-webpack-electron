import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ScaleLegendComponent = /** @class */ (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        var direction = (this.horizontal) ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to " + direction + ", " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "valueRange", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "horizontal", void 0);
    ScaleLegendComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-scale-legend',
            template: "\n    <div\n      class=\"scale-legend\"\n      [class.horizontal-legend]=\"horizontal\"\n      [style.height.px]=\"horizontal ? undefined : height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;-webkit-box-flex:1;-ms-flex:1;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [DomSanitizer])
    ], ScaleLegendComponent);
    return ScaleLegendComponent;
}());
export { ScaleLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUN2RixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUEwQnpEO0lBVUUsOEJBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFKbEMsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUltQixDQUFDO0lBRWhELDBDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLElBQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsd0JBQXNCLFNBQVMsVUFBSyxjQUFjLE1BQUcsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDZDQUFjLEdBQWQsVUFBZSxNQUFNLEVBQUUsTUFBTTtRQUMzQixlQUFlO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBSSxDQUFDLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUEvQlE7UUFBUixLQUFLLEVBQUU7OzREQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3VEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7OzREQUFvQjtJQU5qQixvQkFBb0I7UUF4QmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsUUFBUSxFQUFFLHloQkFpQlQ7WUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztpREFXK0IsWUFBWTtPQVZoQyxvQkFBb0IsQ0FtQ2hDO0lBQUQsMkJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQW5DWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLXNjYWxlLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJzY2FsZS1sZWdlbmRcIlxuICAgICAgW2NsYXNzLmhvcml6b250YWwtbGVnZW5kXT1cImhvcml6b250YWxcIlxuICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3Jpem9udGFsID8gdW5kZWZpbmVkIDogaGVpZ2h0XCJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzFdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJzY2FsZS1sZWdlbmQtd3JhcFwiXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImdyYWRpZW50XCI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgPHNwYW4+e3sgdmFsdWVSYW5nZVswXS50b0xvY2FsZVN0cmluZygpIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3NjYWxlLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTY2FsZUxlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgdmFsdWVSYW5nZTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHdpZHRoO1xuICBASW5wdXQoKSBob3Jpem9udGFsID0gZmFsc2U7XG5cbiAgZ3JhZGllbnQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgZ3JhZGllbnRWYWx1ZXMgPSB0aGlzLmdyYWRpZW50U3RyaW5nKHRoaXMuY29sb3JzLnJhbmdlKCksIHRoaXMuY29sb3JzLmRvbWFpbigpKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSAodGhpcy5ob3Jpem9udGFsKSA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgICB0aGlzLmdyYWRpZW50ID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBsaW5lYXItZ3JhZGllbnQodG8gJHtkaXJlY3Rpb259LCAke2dyYWRpZW50VmFsdWVzfSlgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIHN0cmluZyB1c2VkIGluIHRoZSBncmFkaWVudCBzdHlsZXNoZWV0IHByb3BlcnRpZXNcbiAgICogQHBhcmFtICB7YXJyYXl9IGNvbG9ycyBhcnJheSBvZiBjb2xvcnNcbiAgICogQHBhcmFtICB7YXJyYXl9IHNwbGl0cyBhcnJheSBvZiBzcGxpdHMgb24gYSBzY2FsZSBvZiAoMCwgMSlcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ3JhZGllbnRTdHJpbmcoY29sb3JzLCBzcGxpdHMpOiBzdHJpbmcge1xuICAgIC8vIGFkZCB0aGUgMTAwJVxuICAgIHNwbGl0cy5wdXNoKDEpO1xuICAgIGNvbnN0IHBhaXJzID0gW107XG4gICAgY29sb3JzLnJldmVyc2UoKS5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICBwYWlycy5wdXNoKGAke2N9ICR7TWF0aC5yb3VuZChzcGxpdHNbaV0gKiAxMDApfSVgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYWlycy5qb2luKCcsICcpO1xuICB9XG5cbn1cbiJdfQ==