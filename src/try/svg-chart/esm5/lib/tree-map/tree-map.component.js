import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { treemap, stratify } from 'd3-hierarchy';
import { BaseChartComponent } from '../common/base-chart/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
var TreeMapComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TreeMapComponent, _super);
    function TreeMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.gradient = false;
        _this.select = new EventEmitter();
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    TreeMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.treemap = treemap()
            .size([this.dims.width, this.dims.height]);
        var rootNode = {
            name: 'root',
            value: 0,
            isRoot: true
        };
        var root = stratify()
            .id(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return label;
        })
            .parentId(function (d) { return d.isRoot ? null : 'root'; })(tslib_1.__spread([rootNode], this.results))
            .sum(function (d) { return d.value; });
        this.data = this.treemap(root);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    TreeMapComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    TreeMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapComponent.prototype, "results", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapComponent.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapComponent.prototype, "labelFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapComponent.prototype, "gradient", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TreeMapComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        ContentChild('tooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], TreeMapComponent.prototype, "tooltipTemplate", void 0);
    TreeMapComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-tree-map',
            template: "\n    <ng-svg-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g ng-svg-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ng-svg-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".tree-map .treemap-val{font-size:1.3em;padding-top:5px;display:inline-block}.tree-map .treemap-label p{display:table-cell;text-align:center;line-height:1.2em;vertical-align:middle}"]
        })
    ], TreeMapComponent);
    return TreeMapComponent;
}(BaseChartComponent));
export { TreeMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUE2QnJEO0lBQXNDLDRDQUFrQjtJQTNCeEQ7UUFBQSxxRUFxR0M7UUF2RVUscUJBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUVoQixZQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVV0QyxZQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUF3RDVCLENBQUM7SUF0REMsaUNBQU0sR0FBTjtRQUNFLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBTzthQUMxQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBTSxRQUFRLEdBQUc7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO1FBRUYsSUFBTSxJQUFJLEdBQUcsUUFBUSxFQUFPO2FBQ3pCLEVBQUUsQ0FBQyxVQUFBLENBQUM7WUFDSCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRW5CLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNyQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNoQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO2FBQ0QsUUFBUSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQXhCLENBQXdCLENBQUMsbUJBQ3RDLFFBQVEsR0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO2FBQzVCLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLFdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBSSxDQUFDO0lBQzdFLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGtDQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUF0RVE7UUFBUixLQUFLLEVBQUU7O3FEQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7OzZEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7NkRBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzs2REFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O3NEQUFrQjtJQUVoQjtRQUFULE1BQU0sRUFBRTs7b0RBQTZCO0lBRUw7UUFBaEMsWUFBWSxDQUFDLGlCQUFpQixDQUFDOzBDQUFrQixXQUFXOzZEQUFNO0lBVnhELGdCQUFnQjtRQTNCNUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsaXNCQW9CVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csZ0JBQWdCLENBMEU1QjtJQUFELHVCQUFDO0NBQUEsQUExRUQsQ0FBc0Msa0JBQWtCLEdBMEV2RDtTQTFFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJlZW1hcCwgc3RyYXRpZnkgfSBmcm9tICdkMy1oaWVyYXJjaHknO1xuXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXN2Zy1jaGFydHMtdHJlZS1tYXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1zdmctY2hhcnRzLWNoYXJ0XG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxuICAgICAgW3Nob3dMZWdlbmRdPVwiZmFsc2VcIlxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiPlxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cInRyZWUtbWFwIGNoYXJ0XCI+XG4gICAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLXRyZWUtbWFwLWNlbGwtc2VyaWVzXG4gICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxuICAgICAgICAgIFtkYXRhXT1cImRhdGFcIlxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxuICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxuICAgICAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9uZy1zdmctY2hhcnRzLWNoYXJ0PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi90cmVlLW1hcC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTWFwQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSByZXN1bHRzO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBncmFkaWVudCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGRpbXM6IGFueTtcbiAgZG9tYWluOiBhbnk7XG4gIHRyYW5zZm9ybTogYW55O1xuICBjb2xvcnM6IENvbG9ySGVscGVyO1xuICB0cmVlbWFwOiBhbnk7XG4gIGRhdGE6IGFueTtcbiAgbWFyZ2luID0gWzEwLCAxMCwgMTAsIDEwXTtcblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKCk7XG5cbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpblxuICAgIH0pO1xuXG4gICAgdGhpcy5kb21haW4gPSB0aGlzLmdldERvbWFpbigpO1xuXG4gICAgdGhpcy50cmVlbWFwID0gdHJlZW1hcDxhbnk+KClcbiAgICAgIC5zaXplKFt0aGlzLmRpbXMud2lkdGgsIHRoaXMuZGltcy5oZWlnaHRdKTtcblxuICAgIGNvbnN0IHJvb3ROb2RlID0ge1xuICAgICAgbmFtZTogJ3Jvb3QnLFxuICAgICAgdmFsdWU6IDAsXG4gICAgICBpc1Jvb3Q6IHRydWVcbiAgICB9O1xuXG4gICAgY29uc3Qgcm9vdCA9IHN0cmF0aWZ5PGFueT4oKVxuICAgICAgLmlkKGQgPT4ge1xuICAgICAgICBsZXQgbGFiZWwgPSBkLm5hbWU7XG5cbiAgICAgICAgaWYgKGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xuICAgICAgICAgIGxhYmVsID0gbGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYWJlbDtcbiAgICAgIH0pXG4gICAgICAucGFyZW50SWQoZCA9PiBkLmlzUm9vdCA/IG51bGwgOiAncm9vdCcpXG4gICAgICAoW3Jvb3ROb2RlLCAuLi50aGlzLnJlc3VsdHNdKVxuICAgICAgLnN1bShkID0+IGQudmFsdWUpO1xuXG4gICAgdGhpcy5kYXRhID0gdGhpcy50cmVlbWFwKHJvb3QpO1xuXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcblxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgkeyB0aGlzLmRpbXMueE9mZnNldCB9ICwgJHsgdGhpcy5tYXJnaW5bMF0gfSlgO1xuICB9XG5cbiAgZ2V0RG9tYWluKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQubmFtZSk7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIHRoaXMuZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XG4gIH1cblxufVxuIl19