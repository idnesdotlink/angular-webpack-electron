import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
var YAxisComponent = /** @class */ (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.offset = this.offset;
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "yScale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "dims", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], YAxisComponent.prototype, "trimTicks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], YAxisComponent.prototype, "maxTickLength", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "tickFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], YAxisComponent.prototype, "ticks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "showGridLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "showLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "labelText", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisTickInterval", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisTickCount", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "yOrient", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "referenceLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "showRefLines", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "showRefLabels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisOffset", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], YAxisComponent.prototype, "dimensionsChanged", void 0);
    tslib_1.__decorate([
        ViewChild(YAxisTicksComponent),
        tslib_1.__metadata("design:type", YAxisTicksComponent)
    ], YAxisComponent.prototype, "ticksComponent", void 0);
    YAxisComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-y-axis]',
            template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ng-svg-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickValues]=\"ticks\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ng-svg-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisComponent);
    return YAxisComponent;
}());
export { YAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUVULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXVDL0Q7SUFyQ0E7UUE2Q1csa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFLdEIsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQUlqQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNmLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsbUJBQWMsR0FBRyxRQUFRLENBQUM7UUFJMUIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxNQUFNLENBQUM7UUFDaEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBcUNkLENBQUM7SUFqQ0Msb0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBYSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFPLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWEsSUFBSSxDQUFDLE1BQU0sVUFBUSxDQUFDO1NBQ25EO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELHVDQUFjLEdBQWQsVUFBZSxFQUFTO1FBQXhCLGlCQVlDO1lBWmdCLGdCQUFLO1FBQ3BCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QyxVQUFVLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssT0FBQSxFQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDthQUFNLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1A7SUFDSCxDQUFDO0lBOURRO1FBQVIsS0FBSyxFQUFFOztrREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztnREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOztxREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3lEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7MERBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O2lEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7O3lEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7cURBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7cURBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7NkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzswREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7O21EQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7MERBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O3dEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7O3lEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3VEQUFpQjtJQUNmO1FBQVQsTUFBTSxFQUFFOzs2REFBd0M7SUFhakI7UUFBL0IsU0FBUyxDQUFDLG1CQUFtQixDQUFDOzBDQUFpQixtQkFBbUI7MERBQUM7SUEvQnpELGNBQWM7UUFyQzFCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLHNnQ0FnQ1Q7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csY0FBYyxDQWtFMUI7SUFBRCxxQkFBQztDQUFBLEFBbEVELElBa0VDO1NBbEVZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWUF4aXNUaWNrc0NvbXBvbmVudCB9IGZyb20gJy4veS1heGlzLXRpY2tzLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy15LWF4aXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIFthdHRyLmNsYXNzXT1cInlBeGlzQ2xhc3NOYW1lXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cbiAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLXktYXhpcy10aWNrc1xuICAgICAgICAqbmdJZj1cInlTY2FsZVwiXG4gICAgICAgIFt0cmltVGlja3NdPVwidHJpbVRpY2tzXCJcbiAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4VGlja0xlbmd0aFwiXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXG4gICAgICAgIFt0aWNrQXJndW1lbnRzXT1cInRpY2tBcmd1bWVudHNcIlxuICAgICAgICBbdGlja1ZhbHVlc109XCJ0aWNrc1wiXG4gICAgICAgIFt0aWNrU3Ryb2tlXT1cInRpY2tTdHJva2VcIlxuICAgICAgICBbc2NhbGVdPVwieVNjYWxlXCJcbiAgICAgICAgW29yaWVudF09XCJ5T3JpZW50XCJcbiAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXG4gICAgICAgIFtncmlkTGluZVdpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgICBbcmVmZXJlbmNlTGluZXNdPVwicmVmZXJlbmNlTGluZXNcIlxuICAgICAgICBbc2hvd1JlZkxpbmVzXT1cInNob3dSZWZMaW5lc1wiXG4gICAgICAgIFtzaG93UmVmTGFiZWxzXT1cInNob3dSZWZMYWJlbHNcIlxuICAgICAgICBbaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc1dpZHRoKCRldmVudClcIlxuICAgICAgLz5cblxuICAgICAgPHN2ZzpnIG5nLXN2Zy1jaGFydHMtYXhpcy1sYWJlbFxuICAgICAgICAqbmdJZj1cInNob3dMYWJlbFwiXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxuICAgICAgICBbb2Zmc2V0XT1cImxhYmVsT2Zmc2V0XCJcbiAgICAgICAgW29yaWVudF09XCJ5T3JpZW50XCJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXG4gICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCI+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFlBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbjtcbiAgQElucHV0KCkgbWF4VGlja0xlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgdGlja3M6IGFueVtdO1xuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dMYWJlbDtcbiAgQElucHV0KCkgbGFiZWxUZXh0O1xuICBASW5wdXQoKSB5QXhpc1RpY2tJbnRlcnZhbDtcbiAgQElucHV0KCkgeUF4aXNUaWNrQ291bnQ6IGFueTtcbiAgQElucHV0KCkgeU9yaWVudCA9ICdsZWZ0JztcbiAgQElucHV0KCkgcmVmZXJlbmNlTGluZXM7XG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lcztcbiAgQElucHV0KCkgc2hvd1JlZkxhYmVscztcbiAgQElucHV0KCkgeUF4aXNPZmZzZXQgPSAwO1xuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgeUF4aXNDbGFzc05hbWUgPSAneSBheGlzJztcbiAgdGlja0FyZ3VtZW50czogYW55O1xuICBvZmZzZXQ6IGFueTtcbiAgdHJhbnNmb3JtOiBhbnk7XG4gIGxhYmVsT2Zmc2V0ID0gMTU7XG4gIGZpbGwgPSAnbm9uZSc7XG4gIHN0cm9rZSA9ICcjQ0NDJztcbiAgdGlja1N0cm9rZSA9ICcjQ0NDJztcbiAgc3Ryb2tlV2lkdGggPSAxO1xuICBwYWRkaW5nID0gNTtcblxuICBAVmlld0NoaWxkKFlBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBZQXhpc1RpY2tzQ29tcG9uZW50O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0ID0gLSh0aGlzLnlBeGlzT2Zmc2V0ICsgdGhpcy5wYWRkaW5nKTtcbiAgICBpZiAodGhpcy55T3JpZW50ID09PSAncmlnaHQnKSB7XG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gNjU7XG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLm9mZnNldCArIHRoaXMuZGltcy53aWR0aH0gLCAwKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLm9mZnNldCB9ICwgMClgO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnlBeGlzVGlja0NvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnlBeGlzVGlja0NvdW50XTtcbiAgICB9XG4gIH1cblxuICBlbWl0VGlja3NXaWR0aCh7IHdpZHRoIH0pOiB2b2lkIHtcbiAgICBpZiAod2lkdGggIT09IHRoaXMubGFiZWxPZmZzZXQgJiYgdGhpcy55T3JpZW50ID09PSAncmlnaHQnKSB7XG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gd2lkdGggKyB0aGlzLmxhYmVsT2Zmc2V0O1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7d2lkdGh9KTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSBpZiAod2lkdGggIT09IHRoaXMubGFiZWxPZmZzZXQpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSB3aWR0aDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoe3dpZHRofSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxufVxuIl19