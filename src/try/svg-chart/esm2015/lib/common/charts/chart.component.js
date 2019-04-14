import * as tslib_1 from "tslib";
import { Component, Input, ViewContainerRef, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip';
let ChartComponent = class ChartComponent {
    constructor(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        const chartColumns = 12 - legendColumns;
        this.chartWidth = ~~(this.view[0] * chartColumns / 12.0);
        this.legendWidth = (!this.legendOptions || this.legendOptions.position === 'right')
            ? ~~(this.view[0] * legendColumns / 12.0)
            : this.chartWidth;
    }
    getLegendType() {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "view", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "showLegend", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "legendOptions", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "legendData", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "legendType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], ChartComponent.prototype, "activeEntries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ChartComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ChartComponent.prototype, "legendLabelClick", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ChartComponent.prototype, "legendLabelActivate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ChartComponent.prototype, "legendLabelDeactivate", void 0);
ChartComponent = tslib_1.__decorate([
    Component({
        providers: [TooltipService],
        selector: 'ng-svg-charts-chart',
        template: `
    <div
      class="ng-svg-charts-outer"
      [style.width.px]="view[0]"
      [@animationState]="'active'"
      [@.disabled]="!animations">
      <svg
        class="ng-svg-charts"
        [attr.width]="chartWidth"
        [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ng-svg-charts-scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth">
      </ng-svg-charts-scale-legend>
      <ng-svg-charts-legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)">
      </ng-svg-charts-legend>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('500ms 100ms', style({ opacity: 1 }))
                ])
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
        TooltipService])
], ChartComponent);
export { ChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFhLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFDcEYsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBb0Q1QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBc0J6QixZQUNVLEdBQXFCLEVBQ3JCLGNBQThCO1FBRDlCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXJCL0IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVNuQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELHdCQUFtQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVELDBCQUFxQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBU3RFLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0JBQ2xFLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxhQUFhLEVBQUU7b0JBQ3JDLGFBQWEsR0FBRyxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLGFBQWEsR0FBRyxDQUFDLENBQUM7aUJBQ25CO2FBQ0Y7U0FDRjtRQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztZQUNqRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDN0MsT0FBTyxhQUFhLENBQUM7U0FDdEI7YUFBTTtZQUNMLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUE1RFU7SUFBUixLQUFLLEVBQUU7OzRDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7O2tEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7cURBQW9CO0FBR25CO0lBQVIsS0FBSyxFQUFFOzs0Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOztrREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOztrREFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7OzhDQUFhO0FBQ1o7SUFBUixLQUFLLEVBQUU7O3FEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7a0RBQW1CO0FBRWpCO0lBQVQsTUFBTSxFQUFFO3NDQUFtQixZQUFZO3dEQUEyQjtBQUN6RDtJQUFULE1BQU0sRUFBRTtzQ0FBc0IsWUFBWTsyREFBMkI7QUFDNUQ7SUFBVCxNQUFNLEVBQUU7c0NBQXdCLFlBQVk7NkRBQTJCO0FBaEI3RCxjQUFjO0lBbEQxQixTQUFTLENBQUM7UUFDVCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDM0IsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFVBQVUsRUFBRTtZQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNyQixPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUM5QyxDQUFDO2FBQ0gsQ0FBQztTQUNIO0tBQ0YsQ0FBQzs2Q0F3QmUsZ0JBQWdCO1FBQ0wsY0FBYztHQXhCN0IsY0FBYyxDQThEMUI7U0E5RFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4uL3Rvb2x0aXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgcHJvdmlkZXJzOiBbVG9vbHRpcFNlcnZpY2VdLFxuICBzZWxlY3RvcjogJ25nLXN2Zy1jaGFydHMtY2hhcnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibmctc3ZnLWNoYXJ0cy1vdXRlclwiXG4gICAgICBbc3R5bGUud2lkdGgucHhdPVwidmlld1swXVwiXG4gICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25zXCI+XG4gICAgICA8c3ZnXG4gICAgICAgIGNsYXNzPVwibmctc3ZnLWNoYXJ0c1wiXG4gICAgICAgIFthdHRyLndpZHRoXT1cImNoYXJ0V2lkdGhcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwidmlld1sxXVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxuZy1zdmctY2hhcnRzLXNjYWxlLWxlZ2VuZFxuICAgICAgICAqbmdJZj1cInNob3dMZWdlbmQgJiYgbGVnZW5kVHlwZSA9PT0gJ3NjYWxlTGVnZW5kJ1wiXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAnYmVsb3cnXCJcbiAgICAgICAgW3ZhbHVlUmFuZ2VdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCI+XG4gICAgICA8L25nLXN2Zy1jaGFydHMtc2NhbGUtbGVnZW5kPlxuICAgICAgPG5nLXN2Zy1jaGFydHMtbGVnZW5kXG4gICAgICAgICpuZ0lmPVwic2hvd0xlZ2VuZCAmJiBsZWdlbmRUeXBlID09PSAnbGVnZW5kJ1wiXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAnYmVsb3cnXCJcbiAgICAgICAgW2RhdGFdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxuICAgICAgICBbdGl0bGVdPVwibGVnZW5kT3B0aW9ucy50aXRsZVwiXG4gICAgICAgIFtjb2xvcnNdPVwibGVnZW5kT3B0aW9ucy5jb2xvcnNcIlxuICAgICAgICBbaGVpZ2h0XT1cInZpZXdbMV1cIlxuICAgICAgICBbd2lkdGhdPVwibGVnZW5kV2lkdGhcIlxuICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcbiAgICAgICAgKGxhYmVsQ2xpY2spPVwibGVnZW5kTGFiZWxDbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAobGFiZWxBY3RpdmF0ZSk9XCJsZWdlbmRMYWJlbEFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChsYWJlbERlYWN0aXZhdGUpPVwibGVnZW5kTGFiZWxEZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPC9uZy1zdmctY2hhcnRzLWxlZ2VuZD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICAgICAgICBhbmltYXRlKCc1MDBtcyAxMDBtcycsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgdmlldztcbiAgQElucHV0KCkgc2hvd0xlZ2VuZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsZWdlbmRPcHRpb25zOiBhbnk7XG5cbiAgLy8gcmVtb3ZlXG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIGxlZ2VuZERhdGE7XG4gIEBJbnB1dCgpIGxlZ2VuZFR5cGU6IGFueTtcbiAgQElucHV0KCkgY29sb3JzOiBhbnk7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbEFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2hhcnRXaWR0aDogYW55O1xuICB0aXRsZTogYW55O1xuICBsZWdlbmRXaWR0aDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdG9vbHRpcFNlcnZpY2U6IFRvb2x0aXBTZXJ2aWNlKSB7XG4gICAgdGhpcy50b29sdGlwU2VydmljZS5pbmplY3Rpb25TZXJ2aWNlLnNldFJvb3RWaWV3Q29udGFpbmVyKHRoaXMudmNyKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBsZWdlbmRDb2x1bW5zID0gMDtcbiAgICBpZiAodGhpcy5zaG93TGVnZW5kKSB7XG4gICAgICB0aGlzLmxlZ2VuZFR5cGUgPSB0aGlzLmdldExlZ2VuZFR5cGUoKTtcblxuICAgICAgaWYgKCF0aGlzLmxlZ2VuZE9wdGlvbnMgfHwgdGhpcy5sZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgIGlmICh0aGlzLmxlZ2VuZFR5cGUgPT09ICdzY2FsZUxlZ2VuZCcpIHtcbiAgICAgICAgICBsZWdlbmRDb2x1bW5zID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZWdlbmRDb2x1bW5zID0gMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYXJ0Q29sdW1ucyA9IDEyIC0gbGVnZW5kQ29sdW1ucztcblxuICAgIHRoaXMuY2hhcnRXaWR0aCA9IH5+KHRoaXMudmlld1swXSAqIGNoYXJ0Q29sdW1ucyAvIDEyLjApO1xuICAgIHRoaXMubGVnZW5kV2lkdGggPSAoIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdyaWdodCcpXG4gICAgICA/IH5+KHRoaXMudmlld1swXSAqIGxlZ2VuZENvbHVtbnMgLyAxMi4wKVxuICAgICAgOiB0aGlzLmNoYXJ0V2lkdGg7XG4gIH1cblxuICBnZXRMZWdlbmRUeXBlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubGVnZW5kT3B0aW9ucy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICByZXR1cm4gJ3NjYWxlTGVnZW5kJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdsZWdlbmQnO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=