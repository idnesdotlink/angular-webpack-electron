import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let GridPanelSeriesComponent = class GridPanelSeriesComponent {
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.gridPanels = this.getGridPanels();
    }
    getGridPanels() {
        return this.data.map((d) => {
            let offset;
            let width;
            let height;
            let x;
            let y;
            let className = 'odd';
            if (this.orient === 'vertical') {
                const position = this.xScale(d.name);
                const positionIndex = Number.parseInt((position / this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = this.xScale.bandwidth() * this.xScale.paddingInner();
                width = this.xScale.bandwidth() + offset;
                height = this.dims.height;
                x = this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (this.orient === 'horizontal') {
                const position = this.yScale(d.name);
                const positionIndex = Number.parseInt((position / this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = this.yScale.bandwidth() * this.yScale.paddingInner();
                width = this.dims.width;
                height = this.yScale.bandwidth() + offset;
                x = 0;
                y = this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height,
                width,
                x,
                y
            };
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "dims", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "xScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "yScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "orient", void 0);
GridPanelSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-grid-panel-series]',
        template: `
    <svg:g ng-svg-charts-grid-panel *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GridPanelSeriesComponent);
export { GridPanelSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2dyaWQtcGFuZWwtc2VyaWVzL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFhLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUJwRyxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQWFuQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekIsSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV0QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO2dCQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXRGLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNCLFNBQVMsR0FBRyxNQUFNLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzlELEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNQO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLEVBQUU7Z0JBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFdEYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDM0IsU0FBUyxHQUFHLE1BQU0sQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFFOUQsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQzFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDdEM7WUFFRCxPQUFPO2dCQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDWixLQUFLLEVBQUUsU0FBUztnQkFDaEIsTUFBTTtnQkFDTixLQUFLO2dCQUNMLENBQUM7Z0JBQ0QsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBaEVVO0lBQVIsS0FBSyxFQUFFOztzREFBTTtBQUVMO0lBQVIsS0FBSyxFQUFFOztzREFBTTtBQUVMO0lBQVIsS0FBSyxFQUFFOzt3REFBUTtBQUVQO0lBQVIsS0FBSyxFQUFFOzt3REFBUTtBQUVQO0lBQVIsS0FBSyxFQUFFOzt3REFBUTtBQVhMLHdCQUF3QjtJQWZwQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0NBQW9DO1FBQzlDLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLHdCQUF3QixDQW1FcEM7U0FuRVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBTaW1wbGVDaGFuZ2VzLCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtZ3JpZC1wYW5lbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1ncmlkLXBhbmVsICpuZ0Zvcj1cImxldCBncmlkUGFuZWwgb2YgZ3JpZFBhbmVsc1wiXG4gICAgICBbaGVpZ2h0XT1cImdyaWRQYW5lbC5oZWlnaHRcIlxuICAgICAgW3dpZHRoXT1cImdyaWRQYW5lbC53aWR0aFwiXG4gICAgICBbeF09XCJncmlkUGFuZWwueFwiXG4gICAgICBbeV09XCJncmlkUGFuZWwueVwiXG4gICAgICBbY2xhc3MuZ3JpZC1wYW5lbF09XCJ0cnVlXCJcbiAgICAgIFtjbGFzcy5vZGRdPVwiZ3JpZFBhbmVsLmNsYXNzID09PSAnb2RkJ1wiXG4gICAgICBbY2xhc3MuZXZlbl09XCJncmlkUGFuZWwuY2xhc3MgPT09ICdldmVuJ1wiPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRQYW5lbFNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGdyaWRQYW5lbHM6IGFueVtdO1xuXG4gIEBJbnB1dCgpIGRhdGE7XG5cbiAgQElucHV0KCkgZGltcztcblxuICBASW5wdXQoKSB4U2NhbGU7XG5cbiAgQElucHV0KCkgeVNjYWxlO1xuXG4gIEBJbnB1dCgpIG9yaWVudDtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRQYW5lbHMgPSB0aGlzLmdldEdyaWRQYW5lbHMoKTtcbiAgfVxuXG4gIGdldEdyaWRQYW5lbHMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKChkKSA9PiB7XG4gICAgICBsZXQgb2Zmc2V0O1xuICAgICAgbGV0IHdpZHRoO1xuICAgICAgbGV0IGhlaWdodDtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBsZXQgY2xhc3NOYW1lID0gJ29kZCc7XG5cbiAgICAgIGlmICh0aGlzLm9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMueFNjYWxlKGQubmFtZSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoKHBvc2l0aW9uIC8gdGhpcy54U2NhbGUuc3RlcCgpKS50b1N0cmluZygpLCAxMCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uSW5kZXggJSAyID09PSAxKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW4nO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpICogdGhpcy54U2NhbGUucGFkZGluZ0lubmVyKCk7XG4gICAgICAgIHdpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCkgKyBvZmZzZXQ7XG4gICAgICAgIGhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XG4gICAgICAgIHggPSB0aGlzLnhTY2FsZShkLm5hbWUpIC0gb2Zmc2V0IC8gMjtcbiAgICAgICAgeSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnlTY2FsZShkLm5hbWUpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KChwb3NpdGlvbiAvIHRoaXMueVNjYWxlLnN0ZXAoKSkudG9TdHJpbmcoKSwgMTApO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbkluZGV4ICUgMiA9PT0gMSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9ICdldmVuJztcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSB0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKSAqIHRoaXMueVNjYWxlLnBhZGRpbmdJbm5lcigpO1xuXG4gICAgICAgIHdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xuICAgICAgICBoZWlnaHQgPSB0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKSArIG9mZnNldDtcbiAgICAgICAgeCA9IDA7XG4gICAgICAgIHkgPSB0aGlzLnlTY2FsZShkLm5hbWUpIC0gb2Zmc2V0IC8gMjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZC5uYW1lLFxuICAgICAgICBjbGFzczogY2xhc3NOYW1lLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iXX0=