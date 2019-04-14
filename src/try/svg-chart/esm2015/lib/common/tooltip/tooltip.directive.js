import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, HostListener, ViewContainerRef, Renderer2 } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';
import { TooltipService } from './tooltip.service';
let TooltipDirective = class TooltipDirective {
    constructor(tooltipService, viewContainerRef, renderer) {
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
    get listensForFocus() {
        return this.tooltipShowEvent === ShowTypes.all ||
            this.tooltipShowEvent === ShowTypes.focus;
    }
    get listensForHover() {
        return this.tooltipShowEvent === ShowTypes.all ||
            this.tooltipShowEvent === ShowTypes.mouseover;
    }
    ngOnDestroy() {
        this.hideTooltip(true);
    }
    onFocus() {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    }
    onBlur() {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    }
    onMouseEnter() {
        if (this.listensForHover) {
            this.showTooltip();
        }
    }
    onMouseLeave(target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                const contentDom = this.component.instance.element.nativeElement;
                const contains = contentDom.contains(target);
                if (contains) {
                    return;
                }
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    }
    onMouseClick() {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    }
    showTooltip(immediate) {
        if (this.component || this.tooltipDisabled) {
            return;
        }
        const time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltipService.destroyAll();
            const options = this.createBoundOptions();
            this.component = this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(() => {
                if (this.component) {
                    this.addHideListeners(this.component.instance.element.nativeElement);
                }
            }, 10);
            this.show.emit(true);
        }, time);
    }
    addHideListeners(tooltip) {
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
            clearTimeout(this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
                this.hideTooltip(this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', (event) => {
                const contains = tooltip.contains(event.target);
                if (!contains) {
                    this.hideTooltip();
                }
            });
        }
    }
    hideTooltip(immediate = false) {
        if (!this.component) {
            return;
        }
        const destroyFn = () => {
            // remove events
            if (this.mouseLeaveContentEvent) {
                this.mouseLeaveContentEvent();
            }
            if (this.mouseEnterContentEvent) {
                this.mouseEnterContentEvent();
            }
            if (this.documentClickEvent) {
                this.documentClickEvent();
            }
            // emit events
            this.hide.emit(true);
            // destroy component
            this.tooltipService.destroy(this.component);
            this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    }
    createBoundOptions() {
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
    }
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
export { TooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQ3BELGdCQUFnQixFQUNoQixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUduRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQXVDM0IsWUFDVSxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsUUFBbUI7UUFGbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXhDcEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUN0RCxxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxnQkFBVyxHQUFlLFVBQVUs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O29EQUsxQjtBQUdEO0lBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7O29EQWE3QztBQUdEO0lBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OztvREFLckI7QUExRlUsZ0JBQWdCO0lBRDVCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQzs2Q0F5Q2IsY0FBYztRQUNaLGdCQUFnQjtRQUN4QixTQUFTO0dBMUNsQixnQkFBZ0IsQ0FpTDVCO1NBakxZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyMiwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBBbGlnbm1lbnRUeXBlcyB9IGZyb20gJy4vYWxpZ25tZW50LnR5cGUnO1xuaW1wb3J0IHsgU2hvd1R5cGVzIH0gZnJvbSAnLi9zaG93LnR5cGUnO1xuXG5pbXBvcnQgeyBUb29sdGlwU2VydmljZSB9IGZyb20gJy4vdG9vbHRpcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neC10b29sdGlwXScgfSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB0b29sdGlwQ3NzQ2xhc3MgPSAnJztcbiAgQElucHV0KCkgdG9vbHRpcFRpdGxlID0gJyc7XG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHkgPSB0cnVlO1xuICBASW5wdXQoKSB0b29sdGlwU3BhY2luZyA9IDEwO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFNob3dDYXJldCA9IHRydWU7XG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXMudG9wO1xuICBASW5wdXQoKSB0b29sdGlwQWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlcyA9IEFsaWdubWVudFR5cGVzLmNlbnRlcjtcbiAgQElucHV0KCkgdG9vbHRpcFR5cGU6IFN0eWxlVHlwZXMgPSBTdHlsZVR5cGVzLnBvcG92ZXI7XG4gIEBJbnB1dCgpIHRvb2x0aXBDbG9zZU9uQ2xpY2tPdXRzaWRlID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcEhpZGVUaW1lb3V0ID0gMzAwO1xuICBASW5wdXQoKSB0b29sdGlwU2hvd1RpbWVvdXQgPSAxMDA7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogYW55O1xuICBASW5wdXQoKSB0b29sdGlwU2hvd0V2ZW50OiBTaG93VHlwZXMgPSBTaG93VHlwZXMuYWxsO1xuICBASW5wdXQoKSB0b29sdGlwQ29udGV4dDogYW55O1xuICBASW5wdXQoKSB0b29sdGlwSW1tZWRpYXRlRXhpdCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaGlkZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGdldCBsaXN0ZW5zRm9yRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmFsbCB8fFxuICAgICAgICAgICB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5mb2N1cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGxpc3RlbnNGb3JIb3ZlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8XG4gICAgICAgICAgIHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLm1vdXNlb3ZlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50OiBhbnk7XG4gIHByaXZhdGUgdGltZW91dDogYW55O1xuICBwcml2YXRlIG1vdXNlTGVhdmVDb250ZW50RXZlbnQ6IGFueTtcbiAgcHJpdmF0ZSBtb3VzZUVudGVyQ29udGVudEV2ZW50OiBhbnk7XG4gIHByaXZhdGUgZG9jdW1lbnRDbGlja0V2ZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b29sdGlwU2VydmljZTogVG9vbHRpcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nKVxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JGb2N1cykge1xuICAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcbiAgICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9yRm9jdXMpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIpIHtcbiAgICAgICB0aGlzLnNob3dUb29sdGlwKCk7XG4gICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Nb3VzZUxlYXZlKHRhcmdldCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3ZlciAmJiB0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBjb250ZW50RG9tID0gdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjb250YWlucyA9IGNvbnRlbnREb20uY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgaWYgKGNvbnRhaW5zKSB7IHJldHVybjsgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVUb29sdGlwKHRoaXMudG9vbHRpcEltbWVkaWF0ZUV4aXQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25Nb3VzZUNsaWNrKCkge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3Zlcikge1xuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBzaG93VG9vbHRpcChpbW1lZGlhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50IHx8IHRoaXMudG9vbHRpcERpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgdGltZSA9IGltbWVkaWF0ZSA/IDAgOiB0aGlzLnRvb2x0aXBTaG93VGltZW91dDtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95QWxsKCk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZUJvdW5kT3B0aW9ucygpO1xuICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLnRvb2x0aXBTZXJ2aWNlLmNyZWF0ZShvcHRpb25zKTtcblxuICAgICAgLy8gYWRkIGEgdGlueSB0aW1lb3V0IHRvIGF2b2lkIGV2ZW50IHJlLXRyaWdnZXJzXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgdGhpcy5hZGRIaWRlTGlzdGVuZXJzKHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcblxuICAgICAgdGhpcy5zaG93LmVtaXQodHJ1ZSk7XG4gICAgfSwgdGltZSk7XG4gIH1cblxuICBhZGRIaWRlTGlzdGVuZXJzKHRvb2x0aXApOiB2b2lkIHtcbiAgICAvLyBvbiBtb3VzZSBlbnRlciwgY2FuY2VsIHRoZSBoaWRlIHRyaWdnZXJlZCBieSB0aGUgbGVhdmVcbiAgICB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0b29sdGlwLCAnbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29udGVudCBtb3VzZSBsZWF2ZSBsaXN0ZW5lclxuICAgIGlmICh0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odG9vbHRpcCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb250ZW50IGNsb3NlIG9uIGNsaWNrIG91dHNpZGVcbiAgICBpZiAodGhpcy50b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5zID0gdG9vbHRpcC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKSB7IHRoaXMuaGlkZVRvb2x0aXAoKTsgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZVRvb2x0aXAoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgZGVzdHJveUZuID0gKCkgPT4ge1xuICAgICAgLy8gcmVtb3ZlIGV2ZW50c1xuICAgICAgaWYgKHRoaXMubW91c2VMZWF2ZUNvbnRlbnRFdmVudCkgeyB0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQoKTsgfVxuICAgICAgaWYgKHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCkgeyB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQoKTsgfVxuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KSB7IHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KCk7IH1cblxuICAgICAgLy8gZW1pdCBldmVudHNcbiAgICAgIHRoaXMuaGlkZS5lbWl0KHRydWUpO1xuXG4gICAgICAvLyBkZXN0cm95IGNvbXBvbmVudFxuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95KHRoaXMuY29tcG9uZW50KTtcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChkZXN0cm95Rm4sIHRoaXMudG9vbHRpcEhpZGVUaW1lb3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveUZuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCb3VuZE9wdGlvbnMoKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlLFxuICAgICAgdGVtcGxhdGU6IHRoaXMudG9vbHRpcFRlbXBsYXRlLFxuICAgICAgaG9zdDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQsXG4gICAgICBwbGFjZW1lbnQ6IHRoaXMudG9vbHRpcFBsYWNlbWVudCxcbiAgICAgIGFsaWdubWVudDogdGhpcy50b29sdGlwQWxpZ25tZW50LFxuICAgICAgdHlwZTogdGhpcy50b29sdGlwVHlwZSxcbiAgICAgIHNob3dDYXJldDogdGhpcy50b29sdGlwU2hvd0NhcmV0LFxuICAgICAgY3NzQ2xhc3M6IHRoaXMudG9vbHRpcENzc0NsYXNzLFxuICAgICAgc3BhY2luZzogdGhpcy50b29sdGlwU3BhY2luZyxcbiAgICAgIGNvbnRleHQ6IHRoaXMudG9vbHRpcENvbnRleHRcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==