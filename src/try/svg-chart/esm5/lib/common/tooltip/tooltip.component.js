import * as tslib_1 from "tslib";
import { Input, Component, ElementRef, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper, PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
var TooltipContentComponent = /** @class */ (function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'ng-svg-charts-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width) {
            return;
        }
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(function () { return _this.renderer.addClass(nativeElm, 'animate'); }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setStyle(nativeElm, 'top', top + "px");
        this.renderer.setStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setStyle(caretElm, 'top', top + "px");
        this.renderer.setStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
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
            template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template\n            [ngTemplateOutlet]=\"template\"\n            [ngTemplateOutletContext]=\"{ model: context }\">\n          </ng-template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styles: [".ng-svg-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ng-svg-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;-webkit-box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ng-svg-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ng-svg-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ng-svg-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.position-right{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}.ng-svg-charts-tooltip-content.position-left{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}.ng-svg-charts-tooltip-content.position-top{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.ng-svg-charts-tooltip-content.position-bottom{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}.ng-svg-charts-tooltip-content.animate{opacity:1;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-o-transition:opacity .3s,transform .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            Renderer2])
    ], TooltipContentComponent);
    return TooltipContentComponent;
}());
export { TooltipContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFpQixpQkFBaUIsRUFDOUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUNoRCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUE0QmxEO0lBd0JFLGlDQUNTLE9BQW1CLEVBQ2xCLFFBQW1CO1FBRHBCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUM3QixDQUFDO0lBWEQsc0JBQUksK0NBQVU7YUFBZDtZQUNFLElBQUksR0FBRyxHQUFHLCtCQUErQixDQUFDO1lBQzFDLEdBQUcsSUFBSSxlQUFhLElBQUksQ0FBQyxTQUFXLENBQUM7WUFDckMsR0FBRyxJQUFJLFdBQVMsSUFBSSxDQUFDLElBQU0sQ0FBQztZQUM1QixHQUFHLElBQUksTUFBSSxJQUFJLENBQUMsUUFBVSxDQUFDO1lBQzNCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQzs7O09BQUE7SUFPRCxpREFBZSxHQUFmO1FBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkMsSUFBTSxTQUFT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UUFDN0IsWUFBWSxDQUFDLEdBQUcsQ0FBQzs7OztpRUFHakI7SUEvRVUsdUJBQXVCO1FBMUJuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSw2Z0JBb0JUO1lBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBRXRDLENBQUM7aURBMEJrQixVQUFVO1lBQ1IsU0FBUztPQTFCbEIsdUJBQXVCLENBaUZuQztJQUFELDhCQUFDO0NBQUEsQUFqRkQsSUFpRkM7U0FqRlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5wdXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkLCBIb3N0QmluZGluZywgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0aHJvdHRsZWFibGUgfSBmcm9tICcuLi8uLi91dGlscy90aHJvdHRsZSc7XG5pbXBvcnQgeyBQb3NpdGlvbkhlbHBlciwgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuL3Bvc2l0aW9uJztcblxuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBBbGlnbm1lbnRUeXBlcyB9IGZyb20gJy4vYWxpZ25tZW50LnR5cGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdG9vbHRpcC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPHNwYW5cbiAgICAgICAgI2NhcmV0RWxtXG4gICAgICAgIFtoaWRkZW5dPVwiIXNob3dDYXJldFwiXG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1jYXJldCBwb3NpdGlvbi17e3RoaXMucGxhY2VtZW50fX1cIj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWNvbnRlbnRcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhdGl0bGVcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IG1vZGVsOiBjb250ZXh0IH1cIj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgKm5nSWY9XCJ0aXRsZVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJ0aXRsZVwiPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vdG9vbHRpcC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgaG9zdDogYW55O1xuICBASW5wdXQoKSBzaG93Q2FyZXQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHR5cGU6IFN0eWxlVHlwZXM7XG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50VHlwZXM7XG4gIEBJbnB1dCgpIGFsaWdubWVudDogQWxpZ25tZW50VHlwZXM7XG4gIEBJbnB1dCgpIHNwYWNpbmc6IG51bWJlcjtcbiAgQElucHV0KCkgY3NzQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgdGVtcGxhdGU6IGFueTtcbiAgQElucHV0KCkgY29udGV4dDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoJ2NhcmV0RWxtJykgY2FyZXRFbG07XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjc3NDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgbGV0IGNseiA9ICduZy1zdmctY2hhcnRzLXRvb2x0aXAtY29udGVudCc7XG4gICAgY2x6ICs9IGAgcG9zaXRpb24tJHt0aGlzLnBsYWNlbWVudH1gO1xuICAgIGNseiArPSBgIHR5cGUtJHt0aGlzLnR5cGV9YDtcbiAgICBjbHogKz0gYCAke3RoaXMuY3NzQ2xhc3N9YDtcbiAgICByZXR1cm4gY2x6O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCh0aGlzLnBvc2l0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcG9zaXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgbmF0aXZlRWxtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaG9zdERpbSA9IHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gaWYgbm8gZGltcyB3ZXJlIGZvdW5kLCBuZXZlciBzaG93XG4gICAgaWYgKCFob3N0RGltLmhlaWdodCAmJiAhaG9zdERpbS53aWR0aCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGVsbURpbSA9IG5hdGl2ZUVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLmNoZWNrRmxpcChob3N0RGltLCBlbG1EaW0pO1xuICAgIHRoaXMucG9zaXRpb25Db250ZW50KG5hdGl2ZUVsbSwgaG9zdERpbSwgZWxtRGltKTtcblxuICAgIGlmICh0aGlzLnNob3dDYXJldCkge1xuICAgICAgdGhpcy5wb3NpdGlvbkNhcmV0KGhvc3REaW0sIGVsbURpbSk7XG4gICAgfVxuXG4gICAgLy8gYW5pbWF0ZSBpdHMgZW50cnlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxtLCAnYW5pbWF0ZScpLCAxKTtcbiAgfVxuXG4gIHBvc2l0aW9uQ29udGVudChuYXRpdmVFbG0sIGhvc3REaW0sIGVsbURpbSk6IHZvaWQge1xuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBQb3NpdGlvbkhlbHBlci5wb3NpdGlvbkNvbnRlbnQoXG4gICAgICB0aGlzLnBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCB0aGlzLnNwYWNpbmcsIHRoaXMuYWxpZ25tZW50KTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxtLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbG0sICdsZWZ0JywgYCR7bGVmdH1weGApO1xuICB9XG5cbiAgcG9zaXRpb25DYXJldChob3N0RGltLCBlbG1EaW0pOiB2b2lkIHtcbiAgICBjb25zdCBjYXJldEVsbSA9IHRoaXMuY2FyZXRFbG0ubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjYXJldERpbWVuc2lvbnMgPSBjYXJldEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gUG9zaXRpb25IZWxwZXIucG9zaXRpb25DYXJldChcbiAgICAgIHRoaXMucGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIGNhcmV0RGltZW5zaW9ucywgdGhpcy5hbGlnbm1lbnQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2FyZXRFbG0sICdsZWZ0JywgYCR7bGVmdH1weGApO1xuICB9XG5cbiAgY2hlY2tGbGlwKGhvc3REaW0sIGVsbURpbSk6IHZvaWQge1xuICAgIHRoaXMucGxhY2VtZW50ID0gUG9zaXRpb25IZWxwZXIuZGV0ZXJtaW5lUGxhY2VtZW50KFxuICAgICAgdGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nLCB0aGlzLmFsaWdubWVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgQHRocm90dGxlYWJsZSgxMDApXG4gIG9uV2luZG93UmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMucG9zaXRpb24oKTtcbiAgfVxuXG59XG4iXX0=