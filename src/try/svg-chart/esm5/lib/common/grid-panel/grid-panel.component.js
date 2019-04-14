import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var GridPanelComponent = /** @class */ (function () {
    function GridPanelComponent() {
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GridPanelComponent.prototype, "path", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GridPanelComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GridPanelComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GridPanelComponent.prototype, "x", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GridPanelComponent.prototype, "y", void 0);
    GridPanelComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-grid-panel]',
            template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GridPanelComponent);
    return GridPanelComponent;
}());
export { GridPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vZ3JpZC1wYW5lbC9ncmlkLXBhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBZ0J2QjtJQUFBO0lBUUEsQ0FBQztJQU5VO1FBQVIsS0FBSyxFQUFFOztvREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOztxREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOztzREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztpREFBRztJQUNGO1FBQVIsS0FBSyxFQUFFOztpREFBRztJQU5BLGtCQUFrQjtRQWQ5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFFBQVEsRUFBRSx5TEFTVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxrQkFBa0IsQ0FROUI7SUFBRCx5QkFBQztDQUFBLEFBUkQsSUFRQztTQVJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtZ3JpZC1wYW5lbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6cmVjdFxuICAgICAgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiXG4gICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICBbYXR0ci54XT1cInhcIlxuICAgICAgW2F0dHIueV09XCJ5XCJcbiAgICAgIHN0cm9rZT1cIm5vbmVcIlxuICAgICAgY2xhc3M9XCJncmlkcGFuZWxcIlxuICAgIC8+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRQYW5lbENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgcGF0aDtcbiAgQElucHV0KCkgd2lkdGg7XG4gIEBJbnB1dCgpIGhlaWdodDtcbiAgQElucHV0KCkgeDtcbiAgQElucHV0KCkgeTtcblxufVxuIl19