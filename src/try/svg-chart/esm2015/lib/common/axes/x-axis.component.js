import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
let XAxisComponent = class XAxisComponent {
    constructor() {
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
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    }
    emitTicksHeight({ height }) {
        const newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ height });
            }, 0);
        }
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
        template: `
    <svg:g
      [attr.class]="xAxisClassName"
      [attr.transform]="transform">
      <svg:g ng-svg-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g ng-svg-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], XAxisComponent);
export { XAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3gtYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQW1DL0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQWpDM0I7UUF3Q1csa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFNdEIsWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVmLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsbUJBQWMsR0FBRyxRQUFRLENBQUM7UUFJMUIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFDbEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixnQkFBVyxHQUFHLE1BQU0sQ0FBQztRQUNyQixZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBMEJkLENBQUM7SUF0QkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUV0RixJQUFJLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxXQUFXLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUU7UUFDeEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxjQUFjLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztZQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFuRFU7SUFBUixLQUFLLEVBQUU7OzhDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7OzRDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7O2lEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7cURBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFOztzREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7cURBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFOztpREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOztpREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzs2Q0FBYztBQUNiO0lBQVIsS0FBSyxFQUFFOzt5REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7O3NEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTs7K0NBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzttREFBaUI7QUFFZjtJQUFULE1BQU0sRUFBRTs7eURBQXdDO0FBYWpCO0lBQS9CLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztzQ0FBaUIsbUJBQW1CO3NEQUFDO0FBN0J6RCxjQUFjO0lBakMxQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxjQUFjLENBcUQxQjtTQXJEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgWEF4aXNUaWNrc0NvbXBvbmVudCB9IGZyb20gJy4veC1heGlzLXRpY2tzLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy14LWF4aXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIFthdHRyLmNsYXNzXT1cInhBeGlzQ2xhc3NOYW1lXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cbiAgICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLXgtYXhpcy10aWNrc1xuICAgICAgICAqbmdJZj1cInhTY2FsZVwiXG4gICAgICAgIFt0cmltVGlja3NdPVwidHJpbVRpY2tzXCJcbiAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4VGlja0xlbmd0aFwiXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXG4gICAgICAgIFt0aWNrQXJndW1lbnRzXT1cInRpY2tBcmd1bWVudHNcIlxuICAgICAgICBbdGlja1N0cm9rZV09XCJ0aWNrU3Ryb2tlXCJcbiAgICAgICAgW3NjYWxlXT1cInhTY2FsZVwiXG4gICAgICAgIFtvcmllbnRdPVwieE9yaWVudFwiXG4gICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxuICAgICAgICBbZ3JpZExpbmVIZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBbd2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICAgIFt0aWNrVmFsdWVzXT1cInRpY2tzXCJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc0hlaWdodCgkZXZlbnQpXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1heGlzLWxhYmVsXG4gICAgICAgICpuZ0lmPVwic2hvd0xhYmVsXCJcbiAgICAgICAgW2xhYmVsXT1cImxhYmVsVGV4dFwiXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxuICAgICAgICBbb3JpZW50XT1cIidib3R0b20nXCJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXG4gICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCI+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFhBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbjtcbiAgQElucHV0KCkgbWF4VGlja0xlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lcyA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93TGFiZWw7XG4gIEBJbnB1dCgpIGxhYmVsVGV4dDtcbiAgQElucHV0KCkgdGlja3M6IGFueVtdO1xuICBASW5wdXQoKSB4QXhpc1RpY2tJbnRlcnZhbDtcbiAgQElucHV0KCkgeEF4aXNUaWNrQ291bnQ6IGFueTtcbiAgQElucHV0KCkgeE9yaWVudCA9ICdib3R0b20nO1xuICBASW5wdXQoKSB4QXhpc09mZnNldCA9IDA7XG5cbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHhBeGlzQ2xhc3NOYW1lID0gJ3ggYXhpcyc7XG5cbiAgdGlja0FyZ3VtZW50czogYW55O1xuICB0cmFuc2Zvcm06IGFueTtcbiAgbGFiZWxPZmZzZXQgPSAwO1xuICBmaWxsID0gJ25vbmUnO1xuICBzdHJva2UgPSAnc3Ryb2tlJztcbiAgdGlja1N0cm9rZSA9ICcjY2NjJztcbiAgc3Ryb2tlV2lkdGggPSAnbm9uZSc7XG4gIHBhZGRpbmcgPSA1O1xuXG4gIEBWaWV3Q2hpbGQoWEF4aXNUaWNrc0NvbXBvbmVudCkgdGlja3NDb21wb25lbnQ6IFhBeGlzVGlja3NDb21wb25lbnQ7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKDAsJHt0aGlzLnhBeGlzT2Zmc2V0ICsgdGhpcy5wYWRkaW5nICsgdGhpcy5kaW1zLmhlaWdodH0pYDtcblxuICAgIGlmICh0eXBlb2YgdGhpcy54QXhpc1RpY2tDb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnhBeGlzVGlja0NvdW50XTtcbiAgICB9XG4gIH1cblxuICBlbWl0VGlja3NIZWlnaHQoeyBoZWlnaHQgfSk6IHZvaWQge1xuICAgIGNvbnN0IG5ld0xhYmVsT2Zmc2V0ID0gaGVpZ2h0ICsgMjUgKyA1O1xuICAgIGlmIChuZXdMYWJlbE9mZnNldCAhPT0gdGhpcy5sYWJlbE9mZnNldCkge1xuICAgICAgdGhpcy5sYWJlbE9mZnNldCA9IG5ld0xhYmVsT2Zmc2V0O1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7aGVpZ2h0fSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxufVxuIl19