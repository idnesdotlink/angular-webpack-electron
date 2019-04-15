import * as tslib_1 from "tslib";
import { Input, Component, ElementRef, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position/position';
import { PlacementTypes } from './position/placement.type';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFpQixpQkFBaUIsRUFDOUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUNoRCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQTRCbEQ7SUF3QkUsaUNBQ1MsT0FBbUIsRUFDbEIsUUFBbUI7UUFEcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQzdCLENBQUM7SUFYRCxzQkFBSSwrQ0FBVTthQUFkO1lBQ0UsSUFBSSxHQUFHLEdBQUcsK0JBQStCLENBQUM7WUFDMUMsR0FBRyxJQUFJLGVBQWEsSUFBSSxDQUFDLFNBQVcsQ0FBQztZQUNyQyxHQUFHLElBQUksV0FBUyxJQUFJLENBQUMsSUFBTSxDQUFDO1lBQzVCLEdBQUcsSUFBSSxNQUFJLElBQUksQ0FBQyxRQUFVLENBQUM7WUFDM0IsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQU9ELGlEQUFlLEdBQWY7UUFDRSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMENB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T3BCO0lBdUREO1FBRkMsWUFBWSxDQUFDLGVBQWUsQ0FBQztRQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDOzs7O2lFQUdqQjtJQS9FVSx1QkFBdUI7UUExQm5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsUUFBUSxFQUFFLDZnQkFvQlQ7WUFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FFdEMsQ0FBQztpREEwQmtCLFVBQVU7WUFDUixTQUFTO09BMUJsQix1QkFBdUIsQ0FpRm5DO0lBQUQsOEJBQUM7Q0FBQSxBQWpGRCxJQWlGQztTQWpGWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGQsIEhvc3RCaW5kaW5nLCBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRocm90dGxlYWJsZSB9IGZyb20gJy4uLy4uL3V0aWxzL3Rocm90dGxlJztcbmltcG9ydCB7IFBvc2l0aW9uSGVscGVyIH0gZnJvbSAnLi9wb3NpdGlvbi9wb3NpdGlvbic7XG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24vcGxhY2VtZW50LnR5cGUnO1xuXG5pbXBvcnQgeyBTdHlsZVR5cGVzIH0gZnJvbSAnLi9zdHlsZS50eXBlJztcbmltcG9ydCB7IEFsaWdubWVudFR5cGVzIH0gZnJvbSAnLi9hbGlnbm1lbnQudHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10b29sdGlwLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8c3BhblxuICAgICAgICAjY2FyZXRFbG1cbiAgICAgICAgW2hpZGRlbl09XCIhc2hvd0NhcmV0XCJcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwLWNhcmV0IHBvc2l0aW9uLXt7dGhpcy5wbGFjZW1lbnR9fVwiPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtY29udGVudFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiF0aXRsZVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgbW9kZWw6IGNvbnRleHQgfVwiPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICAqbmdJZj1cInRpdGxlXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cInRpdGxlXCI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi90b29sdGlwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBob3N0OiBhbnk7XG4gIEBJbnB1dCgpIHNob3dDYXJldDogYm9vbGVhbjtcbiAgQElucHV0KCkgdHlwZTogU3R5bGVUeXBlcztcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcztcbiAgQElucHV0KCkgYWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlcztcbiAgQElucHV0KCkgc3BhY2luZzogbnVtYmVyO1xuICBASW5wdXQoKSBjc3NDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSB0ZW1wbGF0ZTogYW55O1xuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgnY2FyZXRFbG0nKSBjYXJldEVsbTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNzc0NsYXNzZXMoKTogc3RyaW5nIHtcbiAgICBsZXQgY2x6ID0gJ25nLXN2Zy1jaGFydHMtdG9vbHRpcC1jb250ZW50JztcbiAgICBjbHogKz0gYCBwb3NpdGlvbi0ke3RoaXMucGxhY2VtZW50fWA7XG4gICAgY2x6ICs9IGAgdHlwZS0ke3RoaXMudHlwZX1gO1xuICAgIGNseiArPSBgICR7dGhpcy5jc3NDbGFzc31gO1xuICAgIHJldHVybiBjbHo7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KHRoaXMucG9zaXRpb24uYmluZCh0aGlzKSk7XG4gIH1cblxuICBwb3NpdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBuYXRpdmVFbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBob3N0RGltID0gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBpZiBubyBkaW1zIHdlcmUgZm91bmQsIG5ldmVyIHNob3dcbiAgICBpZiAoIWhvc3REaW0uaGVpZ2h0ICYmICFob3N0RGltLndpZHRoKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgZWxtRGltID0gbmF0aXZlRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuY2hlY2tGbGlwKGhvc3REaW0sIGVsbURpbSk7XG4gICAgdGhpcy5wb3NpdGlvbkNvbnRlbnQobmF0aXZlRWxtLCBob3N0RGltLCBlbG1EaW0pO1xuXG4gICAgaWYgKHRoaXMuc2hvd0NhcmV0KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uQ2FyZXQoaG9zdERpbSwgZWxtRGltKTtcbiAgICB9XG5cbiAgICAvLyBhbmltYXRlIGl0cyBlbnRyeVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbG0sICdhbmltYXRlJyksIDEpO1xuICB9XG5cbiAgcG9zaXRpb25Db250ZW50KG5hdGl2ZUVsbSwgaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IFBvc2l0aW9uSGVscGVyLnBvc2l0aW9uQ29udGVudChcbiAgICAgIHRoaXMucGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHRoaXMuc3BhY2luZywgdGhpcy5hbGlnbm1lbnQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbG0sICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsbSwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gIH1cblxuICBwb3NpdGlvbkNhcmV0KGhvc3REaW0sIGVsbURpbSk6IHZvaWQge1xuICAgIGNvbnN0IGNhcmV0RWxtID0gdGhpcy5jYXJldEVsbS5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNhcmV0RGltZW5zaW9ucyA9IGNhcmV0RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBQb3NpdGlvbkhlbHBlci5wb3NpdGlvbkNhcmV0KFxuICAgICAgdGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgY2FyZXREaW1lbnNpb25zLCB0aGlzLmFsaWdubWVudCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNhcmV0RWxtLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gIH1cblxuICBjaGVja0ZsaXAoaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XG4gICAgdGhpcy5wbGFjZW1lbnQgPSBQb3NpdGlvbkhlbHBlci5kZXRlcm1pbmVQbGFjZW1lbnQoXG4gICAgICB0aGlzLnBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCB0aGlzLnNwYWNpbmcsIHRoaXMuYWxpZ25tZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBAdGhyb3R0bGVhYmxlKDEwMClcbiAgb25XaW5kb3dSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbigpO1xuICB9XG5cbn1cbiJdfQ==