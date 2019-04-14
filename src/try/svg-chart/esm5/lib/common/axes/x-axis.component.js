import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
var XAxisComponent = /** @class */ (function () {
    function XAxisComponent() {
        this.showGridLines = false;
        this.xOrient = 'bottom';
        this.xAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
    }
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.padding + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "xScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], XAxisComponent.prototype, "trimTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], XAxisComponent.prototype, "maxTickLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "tickFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "showGridLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "showLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "labelText", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], XAxisComponent.prototype, "ticks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "xAxisTickInterval", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "xAxisTickCount", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "xOrient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "xAxisOffset", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], XAxisComponent.prototype, "dimensionsChanged", void 0);
    tslib_1.__decorate([
        ViewChild(XAxisTicksComponent),
        tslib_1.__metadata("design:type", XAxisTicksComponent)
    ], XAxisComponent.prototype, "ticksComponent", void 0);
    XAxisComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-x-axis]',
            template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ng-svg-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        [tickValues]=\"ticks\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g ng-svg-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], XAxisComponent);
    return XAxisComponent;
}());
export { XAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3gtYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQW1DL0Q7SUFqQ0E7UUF3Q1csa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFNdEIsWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVmLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsbUJBQWMsR0FBRyxRQUFRLENBQUM7UUFJMUIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFDbEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixnQkFBVyxHQUFHLE1BQU0sQ0FBQztRQUNyQixZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBMEJkLENBQUM7SUF0QkMsb0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQWUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxPQUFHLENBQUM7UUFFdEYsSUFBSSxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssV0FBVyxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsd0NBQWUsR0FBZixVQUFnQixFQUFVO1FBQTFCLGlCQVFDO1lBUmlCLGtCQUFNO1FBQ3RCLElBQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7WUFDbEMsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1A7SUFDSCxDQUFDO0lBakRRO1FBQVIsS0FBSyxFQUFFOztrREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztnREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOztxREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3lEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7MERBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O3lEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7cURBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7cURBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7aURBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7NkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzswREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7O21EQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs7dURBQWlCO0lBRWY7UUFBVCxNQUFNLEVBQUU7OzZEQUF3QztJQWFqQjtRQUEvQixTQUFTLENBQUMsbUJBQW1CLENBQUM7MENBQWlCLG1CQUFtQjswREFBQztJQTdCekQsY0FBYztRQWpDMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUscTRCQTRCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxjQUFjLENBcUQxQjtJQUFELHFCQUFDO0NBQUEsQUFyREQsSUFxREM7U0FyRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFhBeGlzVGlja3NDb21wb25lbnQgfSBmcm9tICcuL3gtYXhpcy10aWNrcy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMteC1heGlzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnXG4gICAgICBbYXR0ci5jbGFzc109XCJ4QXhpc0NsYXNzTmFtZVwiXG4gICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XG4gICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy14LWF4aXMtdGlja3NcbiAgICAgICAgKm5nSWY9XCJ4U2NhbGVcIlxuICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1UaWNrc1wiXG4gICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFRpY2tMZW5ndGhcIlxuICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwidGlja0Zvcm1hdHRpbmdcIlxuICAgICAgICBbdGlja0FyZ3VtZW50c109XCJ0aWNrQXJndW1lbnRzXCJcbiAgICAgICAgW3RpY2tTdHJva2VdPVwidGlja1N0cm9rZVwiXG4gICAgICAgIFtzY2FsZV09XCJ4U2NhbGVcIlxuICAgICAgICBbb3JpZW50XT1cInhPcmllbnRcIlxuICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgW2dyaWRMaW5lSGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgICBbdGlja1ZhbHVlc109XCJ0aWNrc1wiXG4gICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJlbWl0VGlja3NIZWlnaHQoJGV2ZW50KVwiXG4gICAgICAvPlxuICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtYXhpcy1sYWJlbFxuICAgICAgICAqbmdJZj1cInNob3dMYWJlbFwiXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxuICAgICAgICBbb2Zmc2V0XT1cImxhYmVsT2Zmc2V0XCJcbiAgICAgICAgW29yaWVudF09XCInYm90dG9tJ1wiXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBbd2lkdGhdPVwiZGltcy53aWR0aFwiPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBYQXhpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSBkaW1zO1xuICBASW5wdXQoKSB0cmltVGlja3M6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1heFRpY2tMZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc7XG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXMgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd0xhYmVsO1xuICBASW5wdXQoKSBsYWJlbFRleHQ7XG4gIEBJbnB1dCgpIHRpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgeEF4aXNUaWNrSW50ZXJ2YWw7XG4gIEBJbnB1dCgpIHhBeGlzVGlja0NvdW50OiBhbnk7XG4gIEBJbnB1dCgpIHhPcmllbnQgPSAnYm90dG9tJztcbiAgQElucHV0KCkgeEF4aXNPZmZzZXQgPSAwO1xuXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB4QXhpc0NsYXNzTmFtZSA9ICd4IGF4aXMnO1xuXG4gIHRpY2tBcmd1bWVudHM6IGFueTtcbiAgdHJhbnNmb3JtOiBhbnk7XG4gIGxhYmVsT2Zmc2V0ID0gMDtcbiAgZmlsbCA9ICdub25lJztcbiAgc3Ryb2tlID0gJ3N0cm9rZSc7XG4gIHRpY2tTdHJva2UgPSAnI2NjYyc7XG4gIHN0cm9rZVdpZHRoID0gJ25vbmUnO1xuICBwYWRkaW5nID0gNTtcblxuICBAVmlld0NoaWxkKFhBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBYQXhpc1RpY2tzQ29tcG9uZW50O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgwLCR7dGhpcy54QXhpc09mZnNldCArIHRoaXMucGFkZGluZyArIHRoaXMuZGltcy5oZWlnaHR9KWA7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMueEF4aXNUaWNrQ291bnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnRpY2tBcmd1bWVudHMgPSBbdGhpcy54QXhpc1RpY2tDb3VudF07XG4gICAgfVxuICB9XG5cbiAgZW1pdFRpY2tzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcbiAgICBjb25zdCBuZXdMYWJlbE9mZnNldCA9IGhlaWdodCArIDI1ICsgNTtcbiAgICBpZiAobmV3TGFiZWxPZmZzZXQgIT09IHRoaXMubGFiZWxPZmZzZXQpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSBuZXdMYWJlbE9mZnNldDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoe2hlaWdodH0pO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==