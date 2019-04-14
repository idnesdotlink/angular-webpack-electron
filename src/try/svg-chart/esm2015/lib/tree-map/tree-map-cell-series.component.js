import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
let TreeMapCellSeriesComponent = class TreeMapCellSeriesComponent {
    constructor() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.cells = this.getCells();
    }
    getCells() {
        return this.data.children
            .filter((d) => {
            return d.depth === 1;
        })
            .map((d, index) => {
            const label = d.id;
            const data = {
                name: label,
                value: d.value
            };
            return {
                data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: this.colors.getColor(label),
                label,
                value: d.value,
                valueType: d.valueType
            };
        });
    }
    getTooltipText({ label, value }) {
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
    }
    onClick(data) {
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.label;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "dims", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "select", void 0);
TreeMapCellSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-tree-map-cell-series]',
        template: `
    <svg:g ng-svg-charts-tree-map-cell *ngFor="let c of cells; trackBy:trackBy"
      [data]="c"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [gradient]="gradient"
      [animations]="animations"
      (select)="onClick($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="c.data">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], TreeMapCellSeriesComponent);
export { TreeMapCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUErQnZCLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBN0J2QztRQW9DVyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFpRHhDLENBQUM7SUE3Q0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRW5CLE1BQU0sSUFBSSxHQUFHO2dCQUNYLElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzthQUNmLENBQUM7WUFFRixPQUFPO2dCQUNMLElBQUk7Z0JBQ0osQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNQLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDUCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbEIsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLEtBQUs7Z0JBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO2dCQUNkLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUzthQUN2QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUM3QixPQUFPO29DQUN5QixLQUFLO2tDQUNQLEtBQUssQ0FBQyxjQUFjLEVBQUU7S0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFBO0FBM0RVO0lBQVIsS0FBSyxFQUFFOzt3REFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzt3REFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzswREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzttRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7O21FQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7NERBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOzttRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7c0NBQWtCLFdBQVc7bUVBQU07QUFDbEM7SUFBUixLQUFLLEVBQUU7OzhEQUFtQjtBQUVqQjtJQUFULE1BQU0sRUFBRTs7MERBQTZCO0FBWjNCLDBCQUEwQjtJQTdCdEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVDQUF1QztRQUNqRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVywwQkFBMEIsQ0E2RHRDO1NBN0RZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25DaGFuZ2VzLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXRyZWUtbWFwLWNlbGwtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtdHJlZS1tYXAtY2VsbCAqbmdGb3I9XCJsZXQgYyBvZiBjZWxsczsgdHJhY2tCeTp0cmFja0J5XCJcbiAgICAgIFtkYXRhXT1cImNcIlxuICAgICAgW3hdPVwiYy54XCJcbiAgICAgIFt5XT1cImMueVwiXG4gICAgICBbd2lkdGhdPVwiYy53aWR0aFwiXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcbiAgICAgIFtmaWxsXT1cImMuZmlsbFwiXG4gICAgICBbbGFiZWxdPVwiYy5sYWJlbFwiXG4gICAgICBbdmFsdWVdPVwiYy52YWx1ZVwiXG4gICAgICBbdmFsdWVUeXBlXT1cImMudmFsdWVUeXBlXCJcbiAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcbiAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgIG5neC10b29sdGlwXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcbiAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogZ2V0VG9vbHRpcFRleHQoYylcIlxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImMuZGF0YVwiPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNYXBDZWxsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSBkaW1zO1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgZ3JhZGllbnQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgYW5pbWF0aW9ucyA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjZWxsczogYW55W107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XG4gIH1cblxuICBnZXRDZWxscygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5jaGlsZHJlblxuICAgICAgLmZpbHRlcigoZCkgPT4ge1xuICAgICAgICByZXR1cm4gZC5kZXB0aCA9PT0gMTtcbiAgICAgIH0pXG4gICAgICAubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGQuaWQ7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICBuYW1lOiBsYWJlbCxcbiAgICAgICAgICB2YWx1ZTogZC52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB4OiBkLngwLFxuICAgICAgICAgIHk6IGQueTAsXG4gICAgICAgICAgd2lkdGg6IGQueDEgLSBkLngwLFxuICAgICAgICAgIGhlaWdodDogZC55MSAtIGQueTAsXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpLFxuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIHZhbHVlOiBkLnZhbHVlLFxuICAgICAgICAgIHZhbHVlVHlwZTogZC52YWx1ZVR5cGVcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9vbHRpcFRleHQoeyBsYWJlbCwgdmFsdWUgfSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgYDtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgfVxufVxuIl19