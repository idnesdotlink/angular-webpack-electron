import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ContextMenuItemDirective } from './context-menu.item.directive';
import { ContextMenuService } from './context-menu.service';
import { CONTEXT_MENU_OPTIONS } from './tokens';
var ContextMenuComponent = /** @class */ (function () {
    function ContextMenuComponent(
    // tslint:disable-next-line: variable-name
    _contextMenuService, changeDetector, elementRef, options) {
        var _this = this;
        this._contextMenuService = _contextMenuService;
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.options = options;
        this.menuClass = '';
        this.autoFocus = false;
        this.useBootstrap4 = false;
        this.disabled = false;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.visibleMenuItems = [];
        this.links = [];
        this.subscription = new Subscription();
        if (options) {
            this.autoFocus = options.autoFocus;
            this.useBootstrap4 = options.useBootstrap4;
        }
        this.subscription.add(_contextMenuService.show.subscribe(function (menuEvent) {
            _this.onMenuEvent(menuEvent);
        }));
    }
    ContextMenuComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ContextMenuComponent.prototype.onMenuEvent = function (menuEvent) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        var contextMenu = menuEvent.contextMenu, event = menuEvent.event, item = menuEvent.item;
        if (contextMenu && contextMenu !== this) {
            return;
        }
        this.event = event;
        this.item = item;
        this.setVisibleMenuItems();
        this._contextMenuService.openContextMenu(tslib_1.__assign({}, menuEvent, { menuItems: this.visibleMenuItems, menuClass: this.menuClass }));
        this._contextMenuService.close.asObservable().pipe(first()).subscribe(function (closeEvent) { return _this.close.emit(closeEvent); });
        this.open.next(menuEvent);
    };
    ContextMenuComponent.prototype.isMenuItemVisible = function (menuItem) {
        return this.evaluateIfFunction(menuItem.visible);
    };
    ContextMenuComponent.prototype.setVisibleMenuItems = function () {
        var _this = this;
        this.visibleMenuItems = this.menuItems.filter(function (menuItem) { return _this.isMenuItemVisible(menuItem); });
    };
    ContextMenuComponent.prototype.evaluateIfFunction = function (value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuComponent.prototype, "menuClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuComponent.prototype, "autoFocus", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuComponent.prototype, "useBootstrap4", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuComponent.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuComponent.prototype, "close", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuComponent.prototype, "open", void 0);
    tslib_1.__decorate([
        ContentChildren(ContextMenuItemDirective),
        tslib_1.__metadata("design:type", QueryList)
    ], ContextMenuComponent.prototype, "menuItems", void 0);
    tslib_1.__decorate([
        ViewChild('menu'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ContextMenuComponent.prototype, "menuElement", void 0);
    ContextMenuComponent = tslib_1.__decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            selector: 'context-menu',
            template: " ",
            styles: ["\n    .cdk-overlay-container {\n      position: fixed;\n      z-index: 1000;\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n    }\n    .ngx-contextmenu.cdk-overlay-pane {\n      position: absolute;\n      pointer-events: auto;\n      box-sizing: border-box;\n    }\n  "]
        }),
        tslib_1.__param(3, Optional()),
        tslib_1.__param(3, Inject(CONTEXT_MENU_OPTIONS)),
        tslib_1.__metadata("design:paramtypes", [ContextMenuService,
            ChangeDetectorRef,
            ElementRef, Object])
    ], ContextMenuComponent);
    return ContextMenuComponent;
}());
export { ContextMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUVaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQWlELE1BQU0sd0JBQXdCLENBQUM7QUFDM0csT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBbUNoRDtJQWdCRTtJQUNFLDBDQUEwQztJQUNsQyxtQkFBdUMsRUFDdkMsY0FBaUMsRUFDakMsVUFBc0IsRUFFUSxPQUE0QjtRQU5wRSxpQkFlQztRQWJTLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7UUFDdkMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFUSxZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQXJCcEQsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQXdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsU0FBSSxHQUF5QyxJQUFJLFlBQVksRUFBRSxD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QW9CO1FBckJoQyxTQUFTLENBQUM7WUFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxRQUFRLEVBQUUsY0FBYztZQWlCeEIsUUFBUSxFQUFFLEdBQUc7cUJBaEJKLHFVQWVSO1NBRUYsQ0FBQztRQXNCRyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2lEQUpBLGtCQUFrQjtZQUN2QixpQkFBaUI7WUFDckIsVUFBVTtPQXBCckIsb0JBQW9CLENBbUVoQztJQUFELDJCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0FuRVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IElDb250ZXh0TWVudU9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlLCBJQ29udGV4dE1lbnVDbGlja0V2ZW50LCBDbG9zZUNvbnRleHRNZW51RXZlbnQgfSBmcm9tICcuL2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IENPTlRFWFRfTUVOVV9PUFRJT05TIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElMaW5rQ29uZmlnIHtcbiAgY2xpY2s6IChpdGVtOiBhbnksICRldmVudD86IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIGVuYWJsZWQ/OiAoaXRlbTogYW55KSA9PiBib29sZWFuO1xuICBodG1sOiAoaXRlbTogYW55KSA9PiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIE1vdXNlTG9jYXRpb24ge1xuICBsZWZ0Pzogc3RyaW5nO1xuICBtYXJnaW5MZWZ0Pzogc3RyaW5nO1xuICBtYXJnaW5Ub3A/OiBzdHJpbmc7XG4gIHRvcD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnY29udGV4dC1tZW51JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgICAubmd4LWNvbnRleHRtZW51LmNkay1vdmVybGF5LXBhbmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDbGFzcyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VCb290c3RyYXA0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlOiBFdmVudEVtaXR0ZXI8Q2xvc2VDb250ZXh0TWVudUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvcGVuOiBFdmVudEVtaXR0ZXI8SUNvbnRleHRNZW51Q2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ29udGV4dE1lbnVJdGVtRGlyZWN0aXZlKSBwdWJsaWMgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8Q29udGV4dE1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgQFZpZXdDaGlsZCgnbWVudScpIHB1YmxpYyBtZW51RWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHVibGljIHZpc2libGVNZW51SXRlbXM6IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgcHVibGljIGxpbmtzOiBJTGlua0NvbmZpZ1tdID0gW107XG4gIHB1YmxpYyBpdGVtOiBhbnk7XG4gIHB1YmxpYyBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gICAgcHJpdmF0ZSBfY29udGV4dE1lbnVTZXJ2aWNlOiBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChDT05URVhUX01FTlVfT1BUSU9OUykgcHJpdmF0ZSBvcHRpb25zOiBJQ29udGV4dE1lbnVPcHRpb25zLFxuICApIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5hdXRvRm9jdXMgPSBvcHRpb25zLmF1dG9Gb2N1cztcbiAgICAgIHRoaXMudXNlQm9vdHN0cmFwNCA9IG9wdGlvbnMudXNlQm9vdHN0cmFwNDtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKF9jb250ZXh0TWVudVNlcnZpY2Uuc2hvdy5zdWJzY3JpYmUobWVudUV2ZW50ID0+IHtcbiAgICAgIHRoaXMub25NZW51RXZlbnQobWVudUV2ZW50KTtcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1lbnVFdmVudChtZW51RXZlbnQ6IElDb250ZXh0TWVudUNsaWNrRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbnRleHRNZW51LCBldmVudCwgaXRlbSB9ID0gbWVudUV2ZW50O1xuICAgIGlmIChjb250ZXh0TWVudSAmJiBjb250ZXh0TWVudSAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICB0aGlzLnNldFZpc2libGVNZW51SXRlbXMoKTtcbiAgICB0aGlzLl9jb250ZXh0TWVudVNlcnZpY2Uub3BlbkNvbnRleHRNZW51KHsgLi4ubWVudUV2ZW50LCBtZW51SXRlbXM6IHRoaXMudmlzaWJsZU1lbnVJdGVtcywgbWVudUNsYXNzOiB0aGlzLm1lbnVDbGFzcyB9KTtcbiAgICB0aGlzLl9jb250ZXh0TWVudVNlcnZpY2UuY2xvc2UuYXNPYnNlcnZhYmxlKCkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoY2xvc2VFdmVudCA9PiB0aGlzLmNsb3NlLmVtaXQoY2xvc2VFdmVudCkpO1xuICAgIHRoaXMub3Blbi5uZXh0KG1lbnVFdmVudCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW06IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlSWZGdW5jdGlvbihtZW51SXRlbS52aXNpYmxlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWaXNpYmxlTWVudUl0ZW1zKCk6IHZvaWQge1xuICAgIHRoaXMudmlzaWJsZU1lbnVJdGVtcyA9IHRoaXMubWVudUl0ZW1zLmZpbHRlcihtZW51SXRlbSA9PiB0aGlzLmlzTWVudUl0ZW1WaXNpYmxlKG1lbnVJdGVtKSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=