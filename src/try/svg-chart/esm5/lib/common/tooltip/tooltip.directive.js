import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, HostListener, ViewContainerRef, Renderer2 } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';
import { TooltipService } from './tooltip.service';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.top;
        this.tooltipAlignment = AlignmentTypes.center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function () {
            return this.tooltipShowEvent === ShowTypes.all ||
                this.tooltipShowEvent === ShowTypes.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function () {
            return this.tooltipShowEvent === ShowTypes.all ||
                this.tooltipShowEvent === ShowTypes.mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                var contentDom = this.component.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains) {
                    return;
                }
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    };
    TooltipDirective.prototype.onMouseClick = function () {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        if (this.component || this.tooltipDisabled) {
            return;
        }
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            var options = _this.createBoundOptions();
            _this.component = _this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(function () {
                if (_this.component) {
                    _this.addHideListeners(_this.component.instance.element.nativeElement);
                }
            }, 10);
            _this.show.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip(_this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains) {
                    _this.hideTooltip();
                }
            });
        }
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        if (!this.component) {
            return;
        }
        var destroyFn = function () {
            // remove events
            if (_this.mouseLeaveContentEvent) {
                _this.mouseLeaveContentEvent();
            }
            if (_this.mouseEnterContentEvent) {
                _this.mouseEnterContentEvent();
            }
            if (_this.documentClickEvent) {
                _this.documentClickEvent();
            }
            // emit events
            _this.hide.emit(true);
            // destroy component
            _this.tooltipService.destroy(_this.component);
            _this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipCssClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipTitle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipSpacing", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipShowCaret", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipAlignment", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipShowEvent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipContext", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "show", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TooltipDirective.prototype, "hide", void 0);
    tslib_1.__decorate([
        HostListener('focusin'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onFocus", null);
    tslib_1.__decorate([
        HostListener('blur'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onBlur", null);
    tslib_1.__decorate([
        HostListener('mouseenter'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseEnter", null);
    tslib_1.__decorate([
        HostListener('mouseleave', ['$event.target']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseLeave", null);
    tslib_1.__decorate([
        HostListener('click'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseClick", null);
    TooltipDirective = tslib_1.__decorate([
        Directive({ selector: '[ngx-tooltip]' }),
        tslib_1.__metadata("design:paramtypes", [TooltipService,
            ViewContainerRef,
            Renderer2])
    ], TooltipDirective);
    return TooltipDirective;
}());
export { TooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQ3BELGdCQUFnQixFQUNoQixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUduRDtJQXVDRSwwQkFDVSxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsUUFBbUI7UUFGbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXhDcEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUN0RCxxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxnQkFBVyxHQUFlLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDN0MsK0JBQTBCLEdB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Qzs7OztrREFLcEI7SUFHRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7d0RBSzFCO0lBR0Q7UUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7Ozs7d0RBYTdDO0lBR0Q7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzs7O3dEQUtyQjtJQTFGVSxnQkFBZ0I7UUFENUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO2lEQXlDYixjQUFjO1lBQ1osZ0JBQWdCO1lBQ3hCLFNBQVM7T0ExQ2xCLGdCQUFnQixDQWlMNUI7SUFBRCx1QkFBQztDQUFBLEFBakxELElBaUxDO1NBakxZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyMiwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBBbGlnbm1lbnRUeXBlcyB9IGZyb20gJy4vYWxpZ25tZW50LnR5cGUnO1xuaW1wb3J0IHsgU2hvd1R5cGVzIH0gZnJvbSAnLi9zaG93LnR5cGUnO1xuXG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4vdG9vbHRpcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neC10b29sdGlwXScgfSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB0b29sdGlwQ3NzQ2xhc3MgPSAnJztcbiAgQElucHV0KCkgdG9vbHRpcFRpdGxlID0gJyc7XG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHkgPSB0cnVlO1xuICBASW5wdXQoKSB0b29sdGlwU3BhY2luZyA9IDEwO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFNob3dDYXJldCA9IHRydWU7XG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXMudG9wO1xuICBASW5wdXQoKSB0b29sdGlwQWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlcyA9IEFsaWdubWVudFR5cGVzLmNlbnRlcjtcbiAgQElucHV0KCkgdG9vbHRpcFR5cGU6IFN0eWxlVHlwZXMgPSBTdHlsZVR5cGVzLnBvcG92ZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXBDbG9zZU9uQ2xpY2tPdXRzaWRlID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcEhpZGVUaW1lb3V0ID0gMzAwO1xuICBASW5wdXQoKSB0b29sdGlwU2hvd1RpbWVvdXQgPSAxMDA7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogYW55O1xuICBASW5wdXQoKSB0b29sdGlwU2hvd0V2ZW50OiBTaG93VHlwZXMgPSBTaG93VHlwZXMuYWxsO1xuICBASW5wdXQoKSB0b29sdGlwQ29udGV4dDogYW55O1xuICBASW5wdXQoKSB0b29sdGlwSW1tZWRpYXRlRXhpdCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaGlkZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGdldCBsaXN0ZW5zRm9yRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmFsbCB8fFxuICAgICAgICAgICB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5mb2N1cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGxpc3RlbnNGb3JIb3ZlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8XG4gICAgICAgICAgIHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLm1vdXNlb3ZlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50OiBhbnk7XG4gIHByaXZhdGUgdGltZW91dDogYW55O1xuICBwcml2YXRlIG1vdXNlTGVhdmVDb250ZW50RXZlbnQ6IGFueTtcbiAgcHJpdmF0ZSBtb3VzZUVudGVyQ29udGVudEV2ZW50OiBhbnk7XG4gIHByaXZhdGUgZG9jdW1lbnRDbGlja0V2ZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b29sdGlwU2VydmljZTogVG9vbHRpcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nKVxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JGb2N1cykge1xuICAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcbiAgICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9yRm9jdXMpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIpIHtcbiAgICAgICB0aGlzLnNob3dUb29sdGlwKCk7XG4gICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Nb3VzZUxlYXZlKHRhcmdldCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3ZlciAmJiB0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBjb250ZW50RG9tID0gdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjb250YWlucyA9IGNvbnRlbnREb20uY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgaWYgKGNvbnRhaW5zKSB7IHJldHVybjsgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVUb29sdGlwKHRoaXMudG9vbHRpcEltbWVkaWF0ZUV4aXQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25Nb3VzZUNsaWNrKCkge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3Zlcikge1xuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBzaG93VG9vbHRpcChpbW1lZGlhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50IHx8IHRoaXMudG9vbHRpcERpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgdGltZSA9IGltbWVkaWF0ZSA/IDAgOiB0aGlzLnRvb2x0aXBTaG93VGltZW91dDtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95QWxsKCk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZUJvdW5kT3B0aW9ucygpO1xuICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLnRvb2x0aXBTZXJ2aWNlLmNyZWF0ZShvcHRpb25zKTtcblxuICAgICAgLy8gYWRkIGEgdGlueSB0aW1lb3V0IHRvIGF2b2lkIGV2ZW50IHJlLXRyaWdnZXJzXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgdGhpcy5hZGRIaWRlTGlzdGVuZXJzKHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcblxuICAgICAgdGhpcy5zaG93LmVtaXQodHJ1ZSk7XG4gICAgfSwgdGltZSk7XG4gIH1cblxuICBhZGRIaWRlTGlzdGVuZXJzKHRvb2x0aXApOiB2b2lkIHtcbiAgICAvLyBvbiBtb3VzZSBlbnRlciwgY2FuY2VsIHRoZSBoaWRlIHRyaWdnZXJlZCBieSB0aGUgbGVhdmVcbiAgICB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0b29sdGlwLCAnbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29udGVudCBtb3VzZSBsZWF2ZSBsaXN0ZW5lclxuICAgIGlmICh0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odG9vbHRpcCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb250ZW50IGNsb3NlIG9uIGNsaWNrIG91dHNpZGVcbiAgICBpZiAodGhpcy50b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5zID0gdG9vbHRpcC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKSB7IHRoaXMuaGlkZVRvb2x0aXAoKTsgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZVRvb2x0aXAoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgZGVzdHJveUZuID0gKCkgPT4ge1xuICAgICAgLy8gcmVtb3ZlIGV2ZW50c1xuICAgICAgaWYgKHRoaXMubW91c2VMZWF2ZUNvbnRlbnRFdmVudCkgeyB0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQoKTsgfVxuICAgICAgaWYgKHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCkgeyB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQoKTsgfVxuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KSB7IHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KCk7IH1cblxuICAgICAgLy8gZW1pdCBldmVudHNcbiAgICAgIHRoaXMuaGlkZS5lbWl0KHRydWUpO1xuXG4gICAgICAvLyBkZXN0cm95IGNvbXBvbmVudFxuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95KHRoaXMuY29tcG9uZW50KTtcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChkZXN0cm95Rm4sIHRoaXMudG9vbHRpcEhpZGVUaW1lb3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveUZuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCb3VuZE9wdGlvbnMoKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlLFxuICAgICAgdGVtcGxhdGU6IHRoaXMudG9vbHRpcFRlbXBsYXRlLFxuICAgICAgaG9zdDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQsXG4gICAgICBwbGFjZW1lbnQ6IHRoaXMudG9vbHRpcFBsYWNlbWVudCxcbiAgICAgIGFsaWdubWVudDogdGhpcy50b29sdGlwQWxpZ25tZW50LFxuICAgICAgdHlwZTogdGhpcy50b29sdGlwVHlwZSxcbiAgICAgIHNob3dDYXJldDogdGhpcy50b29sdGlwU2hvd0NhcmV0LFxuICAgICAgY3NzQ2xhc3M6IHRoaXMudG9vbHRpcENzc0NsYXNzLFxuICAgICAgc3BhY2luZzogdGhpcy50b29sdGlwU3BhY2luZyxcbiAgICAgIGNvbnRleHQ6IHRoaXMudG9vbHRpcENvbnRleHRcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==