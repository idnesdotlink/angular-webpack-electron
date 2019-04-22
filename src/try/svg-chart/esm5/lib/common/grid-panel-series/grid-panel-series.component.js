import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var GridPanelSeriesComponent = /** @class */ (function () {
    function GridPanelSeriesComponent() {
    }
    GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GridPanelSeriesComponent.prototype.update = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeriesComponent.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d) {
            var offset;
            var width;
            var height;
            var x;
            var y;
            var className = 'odd';
            var position;
            if (_this.orient === 'vertical') {
                position = _this.xScale(d.name);
                var positionIndex = Number.parseInt((position / _this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                width = _this.xScale.bandwidth() + offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                position = _this.yScale(d.name);
                var positionIndex = Number.parseInt((position / _this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + offset;
                x = 0;
                y = _this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
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
            template: "\n    <svg:g ng-svg-charts-grid-panel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GridPanelSeriesComponent);
    return GridPanelSeriesComponent;
}());
export { GridPanelSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2dyaWQtcGFuZWwtc2VyaWVzL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFhLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUJwRztJQUFBO0lBb0VBLENBQUM7SUF2REMsOENBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQseUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxnREFBYSxHQUFiO1FBQUEsaUJBOENDO1FBN0NDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO1lBQ3JCLElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxRQUFRLENBQUM7WUFFYixJQUFJLEtBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO2dCQUM5QixRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixTQUFTLEdBQUcsTUFBTSxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUM5RCxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDMUIsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDUDtpQkFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFO2dCQUN2QyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixTQUFTLEdBQUcsTUFBTSxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUU5RCxLQUFLLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDMUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDTixDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNaLEtBQUssRUFBRSxTQUFTO2dCQUNoQixNQUFNLFFBQUE7Z0JBQ04sS0FBSyxPQUFBO2dCQUNMLENBQUMsR0FBQTtnQkFDRCxDQUFDLEdBQUE7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBaEVRO1FBQVIsS0FBSyxFQUFFOzswREFBTTtJQUVMO1FBQVIsS0FBSyxFQUFFOzswREFBTTtJQUVMO1FBQVIsS0FBSyxFQUFFOzs0REFBUTtJQUVQO1FBQVIsS0FBSyxFQUFFOzs0REFBUTtJQUVQO1FBQVIsS0FBSyxFQUFFOzs0REFBUTtJQVhMLHdCQUF3QjtRQWZwQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0NBQW9DO1lBQzlDLFFBQVEsRUFBRSxzV0FVVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyx3QkFBd0IsQ0FvRXBDO0lBQUQsK0JBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQXBFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFNpbXBsZUNoYW5nZXMsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy1ncmlkLXBhbmVsLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWdyaWQtcGFuZWwgKm5nRm9yPVwibGV0IGdyaWRQYW5lbCBvZiBncmlkUGFuZWxzXCJcbiAgICAgIFtoZWlnaHRdPVwiZ3JpZFBhbmVsLmhlaWdodFwiXG4gICAgICBbd2lkdGhdPVwiZ3JpZFBhbmVsLndpZHRoXCJcbiAgICAgIFt4XT1cImdyaWRQYW5lbC54XCJcbiAgICAgIFt5XT1cImdyaWRQYW5lbC55XCJcbiAgICAgIFtjbGFzcy5ncmlkLXBhbmVsXT1cInRydWVcIlxuICAgICAgW2NsYXNzLm9kZF09XCJncmlkUGFuZWwuY2xhc3MgPT09ICdvZGQnXCJcbiAgICAgIFtjbGFzcy5ldmVuXT1cImdyaWRQYW5lbC5jbGFzcyA9PT0gJ2V2ZW4nXCI+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR3JpZFBhbmVsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgZ3JpZFBhbmVsczogYW55W107XG5cbiAgQElucHV0KCkgZGF0YTtcblxuICBASW5wdXQoKSBkaW1zO1xuXG4gIEBJbnB1dCgpIHhTY2FsZTtcblxuICBASW5wdXQoKSB5U2NhbGU7XG5cbiAgQElucHV0KCkgb3JpZW50O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZFBhbmVscyA9IHRoaXMuZ2V0R3JpZFBhbmVscygpO1xuICB9XG5cbiAgZ2V0R3JpZFBhbmVscygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoKGQpID0+IHtcbiAgICAgIGxldCBvZmZzZXQ7XG4gICAgICBsZXQgd2lkdGg7XG4gICAgICBsZXQgaGVpZ2h0O1xuICAgICAgbGV0IHg7XG4gICAgICBsZXQgeTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSAnb2RkJztcbiAgICAgIGxldCBwb3NpdGlvbjtcblxuICAgICAgaWYgKHRoaXMub3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy54U2NhbGUoZC5uYW1lKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25JbmRleCA9IE51bWJlci5wYXJzZUludCgocG9zaXRpb24gLyB0aGlzLnhTY2FsZS5zdGVwKCkpLnRvU3RyaW5nKCksIDEwKTtcblxuICAgICAgICBpZiAocG9zaXRpb25JbmRleCAlIDIgPT09IDEpIHtcbiAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbic7XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCkgKiB0aGlzLnhTY2FsZS5wYWRkaW5nSW5uZXIoKTtcbiAgICAgICAgd2lkdGggPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKSArIG9mZnNldDtcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5kaW1zLmhlaWdodDtcbiAgICAgICAgeCA9IHRoaXMueFNjYWxlKGQubmFtZSkgLSBvZmZzZXQgLyAyO1xuICAgICAgICB5ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBwb3NpdGlvbiA9IHRoaXMueVNjYWxlKGQubmFtZSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoKHBvc2l0aW9uIC8gdGhpcy55U2NhbGUuc3RlcCgpKS50b1N0cmluZygpLCAxMCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uSW5kZXggJSAyID09PSAxKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW4nO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICogdGhpcy55U2NhbGUucGFkZGluZ0lubmVyKCk7XG5cbiAgICAgICAgd2lkdGggPSB0aGlzLmRpbXMud2lkdGg7XG4gICAgICAgIGhlaWdodCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xuICAgICAgICB4ID0gMDtcbiAgICAgICAgeSA9IHRoaXMueVNjYWxlKGQubmFtZSkgLSBvZmZzZXQgLyAyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBkLm5hbWUsXG4gICAgICAgIGNsYXNzOiBjbGFzc05hbWUsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==