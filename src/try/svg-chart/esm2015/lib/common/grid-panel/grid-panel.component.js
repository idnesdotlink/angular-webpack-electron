import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let GridPanelComponent = class GridPanelComponent {
};
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
        template: `
    <svg:rect
      [attr.height]="height"
      [attr.width]="width"
      [attr.x]="x"
      [attr.y]="y"
      stroke="none"
      class="gridpanel"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GridPanelComponent);
export { GridPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vZ3JpZC1wYW5lbC9ncmlkLXBhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBZ0J2QixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQVE5QixDQUFBO0FBTlU7SUFBUixLQUFLLEVBQUU7O2dEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7O2lEQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7O2tEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7OzZDQUFHO0FBQ0Y7SUFBUixLQUFLLEVBQUU7OzZDQUFHO0FBTkEsa0JBQWtCO0lBZDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxrQkFBa0IsQ0FROUI7U0FSWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWdyaWQtcGFuZWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnJlY3RcbiAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxuICAgICAgW2F0dHIueF09XCJ4XCJcbiAgICAgIFthdHRyLnldPVwieVwiXG4gICAgICBzdHJva2U9XCJub25lXCJcbiAgICAgIGNsYXNzPVwiZ3JpZHBhbmVsXCJcbiAgICAvPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUGFuZWxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHBhdGg7XG4gIEBJbnB1dCgpIHdpZHRoO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHg7XG4gIEBJbnB1dCgpIHk7XG5cbn1cbiJdfQ==