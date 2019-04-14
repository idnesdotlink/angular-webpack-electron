import * as tslib_1 from "tslib";
import { Input, Component, ElementRef, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper, PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
let TooltipContentComponent = class TooltipContentComponent {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    get cssClasses() {
        let clz = 'ng-svg-charts-tooltip-content';
        clz += ` position-${this.placement}`;
        clz += ` type-${this.type}`;
        clz += ` ${this.cssClass}`;
        return clz;
    }
    ngAfterViewInit() {
        setTimeout(this.position.bind(this));
    }
    position() {
        const nativeElm = this.element.nativeElement;
        const hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width) {
            return;
        }
        const elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
    }
    positionContent(nativeElm, hostDim, elmDim) {
        const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        this.renderer.setStyle(nativeElm, 'top', `${top}px`);
        this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
    positionCaret(hostDim, elmDim) {
        const caretElm = this.caretElm.nativeElement;
        const caretDimensions = caretElm.getBoundingClientRect();
        const { top, left } = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);
        this.renderer.setStyle(caretElm, 'top', `${top}px`);
        this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
    checkFlip(hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    }
    onWindowResize() {
        this.position();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TooltipContentComponent.prototype, "host", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], TooltipContentComponent.prototype, "showCaret", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], TooltipContentComponent.prototype, "type", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], TooltipContentComponent.prototype, "placement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], TooltipContentComponent.prototype, "alignment", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], TooltipContentComponent.prototype, "spacing", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TooltipContentComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TooltipContentComponent.prototype, "title", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TooltipContentComponent.prototype, "template", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TooltipContentComponent.prototype, "context", void 0);
tslib_1.__decorate([
    ViewChild('caretElm'),
    tslib_1.__metadata("design:type", Object)
], TooltipContentComponent.prototype, "caretElm", void 0);
tslib_1.__decorate([
    HostBinding('class'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [])
], TooltipContentComponent.prototype, "cssClasses", null);
tslib_1.__decorate([
    HostListener('window:resize'),
    throttleable(100),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TooltipContentComponent.prototype, "onWindowResize", null);
TooltipContentComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-tooltip-content',
        template: `
    <div>
      <span
        #caretElm
        [hidden]="!showCaret"
        class="tooltip-caret position-{{this.placement}}">
      </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{ model: context }">
          </ng-template>
        </span>
        <span
          *ngIf="title"
          [innerHTML]="title">
        </span>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ng-svg-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;-webkit-box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ng-svg-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ng-svg-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ng-svg-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.position-right{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}.ng-svg-charts-tooltip-content.position-left{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}.ng-svg-charts-tooltip-content.position-top{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.ng-svg-charts-tooltip-content.position-bottom{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}.ng-svg-charts-tooltip-content.animate{opacity:1;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-o-transition:opacity .3s,transform .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        Renderer2])
], TooltipContentComponent);
export { TooltipContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFpQixpQkFBaUIsRUFDOUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUNoRCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUE0QmxELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBd0JsQyxZQUNTLE9BQW1CLEVBQ2xCLFFBQW1CO1FBRHBCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUM3QixDQUFDO0lBWEQsSUFBSSxVQUFVO1FBQ1osSUFBSSxHQUFHLEdBQUcsK0JBQStCLENBQUM7UUFDMUMsR0FBRyxJQUFJLGFBQWEsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBT0QsZUFBZTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVoRSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRWxELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVqRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDckM7UUFFRCxvQkFBb0I7UUFDcEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTTtRQUN4QyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQ2xELElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQzdDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3pELE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxrQkFBa0IsQ0FDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFJRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FFRixDQUFBO0FBL0VVO0lBQVIsS0FBSyxFQUFFOztxREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzswREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O3FEQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7MERBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOzswREFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7O3dEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7eURBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOztzREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOzt5REFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOzt3REFBYztBQUVDO0lBQXRCLFNBQVMsQ0FBQyxVQUFVLENBQUM7O3lEQUFVO0FBR2hDO0lBREMsV0FBVyxDQUFDLE9BQU8sQ0FBQzs7O3lEQU9wQjtBQXVERDtJQUZDLFlBQVksQ0FBQyxlQUFlLENBQUM7SUFDN0IsWUFBWSxDQUFDLEdBQUcsQ0FBQzs7Ozs2REFHakI7QUEvRVUsdUJBQXVCO0lBMUJuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7UUFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FFdEMsQ0FBQzs2Q0EwQmtCLFVBQVU7UUFDUixTQUFTO0dBMUJsQix1QkFBdUIsQ0FpRm5DO1NBakZZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCwgSG9zdEJpbmRpbmcsIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdGhyb3R0bGVhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGhyb3R0bGUnO1xuaW1wb3J0IHsgUG9zaXRpb25IZWxwZXIsIFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi9wb3NpdGlvbic7XG5cbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuL3N0eWxlLnR5cGUnO1xuaW1wb3J0IHsgQWxpZ25tZW50VHlwZXMgfSBmcm9tICcuL2FsaWdubWVudC50eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRvb2x0aXAtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxzcGFuXG4gICAgICAgICNjYXJldEVsbVxuICAgICAgICBbaGlkZGVuXT1cIiFzaG93Q2FyZXRcIlxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtY2FyZXQgcG9zaXRpb24te3t0aGlzLnBsYWNlbWVudH19XCI+XG4gICAgICA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1jb250ZW50XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRpdGxlXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBtb2RlbDogY29udGV4dCB9XCI+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhblxuICAgICAgICAgICpuZ0lmPVwidGl0bGVcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwidGl0bGVcIj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGhvc3Q6IGFueTtcbiAgQElucHV0KCkgc2hvd0NhcmV0OiBib29sZWFuO1xuICBASW5wdXQoKSB0eXBlOiBTdHlsZVR5cGVzO1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzO1xuICBASW5wdXQoKSBhbGlnbm1lbnQ6IEFsaWdubWVudFR5cGVzO1xuICBASW5wdXQoKSBzcGFjaW5nOiBudW1iZXI7XG4gIEBJbnB1dCgpIGNzc0NsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBhbnk7XG4gIEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcblxuICBAVmlld0NoaWxkKCdjYXJldEVsbScpIGNhcmV0RWxtO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgY3NzQ2xhc3NlcygpOiBzdHJpbmcge1xuICAgIGxldCBjbHogPSAnbmctc3ZnLWNoYXJ0cy10b29sdGlwLWNvbnRlbnQnO1xuICAgIGNseiArPSBgIHBvc2l0aW9uLSR7dGhpcy5wbGFjZW1lbnR9YDtcbiAgICBjbHogKz0gYCB0eXBlLSR7dGhpcy50eXBlfWA7XG4gICAgY2x6ICs9IGAgJHt0aGlzLmNzc0NsYXNzfWA7XG4gICAgcmV0dXJuIGNsejtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQodGhpcy5wb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdGl2ZUVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhvc3REaW0gPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIGlmIG5vIGRpbXMgd2VyZSBmb3VuZCwgbmV2ZXIgc2hvd1xuICAgIGlmICghaG9zdERpbS5oZWlnaHQgJiYgIWhvc3REaW0ud2lkdGgpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBlbG1EaW0gPSBuYXRpdmVFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5jaGVja0ZsaXAoaG9zdERpbSwgZWxtRGltKTtcbiAgICB0aGlzLnBvc2l0aW9uQ29udGVudChuYXRpdmVFbG0sIGhvc3REaW0sIGVsbURpbSk7XG5cbiAgICBpZiAodGhpcy5zaG93Q2FyZXQpIHtcbiAgICAgIHRoaXMucG9zaXRpb25DYXJldChob3N0RGltLCBlbG1EaW0pO1xuICAgIH1cblxuICAgIC8vIGFuaW1hdGUgaXRzIGVudHJ5XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsbSwgJ2FuaW1hdGUnKSwgMSk7XG4gIH1cblxuICBwb3NpdGlvbkNvbnRlbnQobmF0aXZlRWxtLCBob3N0RGltLCBlbG1EaW0pOiB2b2lkIHtcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gUG9zaXRpb25IZWxwZXIucG9zaXRpb25Db250ZW50KFxuICAgICAgdGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nLCB0aGlzLmFsaWdubWVudCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxtLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcbiAgfVxuXG4gIHBvc2l0aW9uQ2FyZXQoaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XG4gICAgY29uc3QgY2FyZXRFbG0gPSB0aGlzLmNhcmV0RWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY2FyZXREaW1lbnNpb25zID0gY2FyZXRFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IFBvc2l0aW9uSGVscGVyLnBvc2l0aW9uQ2FyZXQoXG4gICAgICB0aGlzLnBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCBjYXJldERpbWVuc2lvbnMsIHRoaXMuYWxpZ25tZW50KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2FyZXRFbG0sICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNhcmV0RWxtLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcbiAgfVxuXG4gIGNoZWNrRmxpcChob3N0RGltLCBlbG1EaW0pOiB2b2lkIHtcbiAgICB0aGlzLnBsYWNlbWVudCA9IFBvc2l0aW9uSGVscGVyLmRldGVybWluZVBsYWNlbWVudChcbiAgICAgIHRoaXMucGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHRoaXMuc3BhY2luZywgdGhpcy5hbGlnbm1lbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEB0aHJvdHRsZWFibGUoMTAwKVxuICBvbldpbmRvd1Jlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uKCk7XG4gIH1cblxufVxuIl19