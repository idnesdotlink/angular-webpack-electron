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
            let position;
            if (this.orient === 'vertical') {
                position = this.xScale(d.name);
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
                position = this.yScale(d.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2dyaWQtcGFuZWwtc2VyaWVzL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFhLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUJwRyxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQWFuQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekIsSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLFFBQVEsQ0FBQztZQUViLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7Z0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXRGLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNCLFNBQVMsR0FBRyxNQUFNLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzlELEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNQO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLEVBQUU7Z0JBQ3ZDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXRGLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNCLFNBQVMsR0FBRyxNQUFNLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRTlELEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUMxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNOLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxDQUFDO2dCQUNELENBQUM7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQWpFVTtJQUFSLEtBQUssRUFBRTs7c0RBQU07QUFFTDtJQUFSLEtBQUssRUFBRTs7c0RBQU07QUFFTDtJQUFSLEtBQUssRUFBRTs7d0RBQVE7QUFFUDtJQUFSLEtBQUssRUFBRTs7d0RBQVE7QUFFUDtJQUFSLEtBQUssRUFBRTs7d0RBQVE7QUFYTCx3QkFBd0I7SUFmcEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9DQUFvQztRQUM5QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyx3QkFBd0IsQ0FvRXBDO1NBcEVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgU2ltcGxlQ2hhbmdlcywgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLWdyaWQtcGFuZWwtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtZ3JpZC1wYW5lbCAqbmdGb3I9XCJsZXQgZ3JpZFBhbmVsIG9mIGdyaWRQYW5lbHNcIlxuICAgICAgW2hlaWdodF09XCJncmlkUGFuZWwuaGVpZ2h0XCJcbiAgICAgIFt3aWR0aF09XCJncmlkUGFuZWwud2lkdGhcIlxuICAgICAgW3hdPVwiZ3JpZFBhbmVsLnhcIlxuICAgICAgW3ldPVwiZ3JpZFBhbmVsLnlcIlxuICAgICAgW2NsYXNzLmdyaWQtcGFuZWxdPVwidHJ1ZVwiXG4gICAgICBbY2xhc3Mub2RkXT1cImdyaWRQYW5lbC5jbGFzcyA9PT0gJ29kZCdcIlxuICAgICAgW2NsYXNzLmV2ZW5dPVwiZ3JpZFBhbmVsLmNsYXNzID09PSAnZXZlbidcIj5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUGFuZWxTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBncmlkUGFuZWxzOiBhbnlbXTtcblxuICBASW5wdXQoKSBkYXRhO1xuXG4gIEBJbnB1dCgpIGRpbXM7XG5cbiAgQElucHV0KCkgeFNjYWxlO1xuXG4gIEBJbnB1dCgpIHlTY2FsZTtcblxuICBASW5wdXQoKSBvcmllbnQ7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkUGFuZWxzID0gdGhpcy5nZXRHcmlkUGFuZWxzKCk7XG4gIH1cblxuICBnZXRHcmlkUGFuZWxzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcCgoZCkgPT4ge1xuICAgICAgbGV0IG9mZnNldDtcbiAgICAgIGxldCB3aWR0aDtcbiAgICAgIGxldCBoZWlnaHQ7XG4gICAgICBsZXQgeDtcbiAgICAgIGxldCB5O1xuICAgICAgbGV0IGNsYXNzTmFtZSA9ICdvZGQnO1xuICAgICAgbGV0IHBvc2l0aW9uO1xuXG4gICAgICBpZiAodGhpcy5vcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLnhTY2FsZShkLm5hbWUpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KChwb3NpdGlvbiAvIHRoaXMueFNjYWxlLnN0ZXAoKSkudG9TdHJpbmcoKSwgMTApO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbkluZGV4ICUgMiA9PT0gMSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9ICdldmVuJztcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKSAqIHRoaXMueFNjYWxlLnBhZGRpbmdJbm5lcigpO1xuICAgICAgICB3aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xuICAgICAgICBoZWlnaHQgPSB0aGlzLmRpbXMuaGVpZ2h0O1xuICAgICAgICB4ID0gdGhpcy54U2NhbGUoZC5uYW1lKSAtIG9mZnNldCAvIDI7XG4gICAgICAgIHkgPSAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy55U2NhbGUoZC5uYW1lKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25JbmRleCA9IE51bWJlci5wYXJzZUludCgocG9zaXRpb24gLyB0aGlzLnlTY2FsZS5zdGVwKCkpLnRvU3RyaW5nKCksIDEwKTtcblxuICAgICAgICBpZiAocG9zaXRpb25JbmRleCAlIDIgPT09IDEpIHtcbiAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbic7XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCkgKiB0aGlzLnlTY2FsZS5wYWRkaW5nSW5uZXIoKTtcblxuICAgICAgICB3aWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCkgKyBvZmZzZXQ7XG4gICAgICAgIHggPSAwO1xuICAgICAgICB5ID0gdGhpcy55U2NhbGUoZC5uYW1lKSAtIG9mZnNldCAvIDI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGQubmFtZSxcbiAgICAgICAgY2xhc3M6IGNsYXNzTmFtZSxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19