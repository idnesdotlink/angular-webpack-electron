import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ContextMenuItemDirective } from './context-menu.item.directive';
import { ContextMenuService } from './context-menu.service';
import { CONTEXT_MENU_OPTIONS } from './tokens';
let ContextMenuComponent = class ContextMenuComponent {
    constructor(
    // tslint:disable-next-line: variable-name
    _contextMenuService, changeDetector, elementRef, options) {
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
        this.subscription.add(_contextMenuService.show.subscribe(menuEvent => {
            this.onMenuEvent(menuEvent);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onMenuEvent(menuEvent) {
        if (this.disabled) {
            return;
        }
        const { contextMenu, event, item } = menuEvent;
        if (contextMenu && contextMenu !== this) {
            return;
        }
        this.event = event;
        this.item = item;
        this.setVisibleMenuItems();
        this._contextMenuService.openContextMenu(Object.assign({}, menuEvent, { menuItems: this.visibleMenuItems, menuClass: this.menuClass }));
        this._contextMenuService.close.asObservable().pipe(first()).subscribe(closeEvent => this.close.emit(closeEvent));
        this.open.next(menuEvent);
    }
    isMenuItemVisible(menuItem) {
        return this.evaluateIfFunction(menuItem.visible);
    }
    setVisibleMenuItems() {
        this.visibleMenuItems = this.menuItems.filter(menuItem => this.isMenuItemVisible(menuItem));
    }
    evaluateIfFunction(value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    }
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
        template: ` `,
        styles: [`
    .cdk-overlay-container {
      position: fixed;
      z-index: 1000;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .ngx-contextmenu.cdk-overlay-pane {
      position: absolute;
      pointer-events: auto;
      box-sizing: border-box;
    }
  `]
    }),
    tslib_1.__param(3, Optional()),
    tslib_1.__param(3, Inject(CONTEXT_MENU_OPTIONS)),
    tslib_1.__metadata("design:paramtypes", [ContextMenuService,
        ChangeDetectorRef,
        ElementRef, Object])
], ContextMenuComponent);
export { ContextMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUVaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQWlELE1BQU0sd0JBQXdCLENBQUM7QUFDM0csT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBbUNoRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQWdCL0I7SUFDRSwwQ0FBMEM7SUFDbEMsbUJBQXVDLEVBQ3ZDLGNBQWlDLEVBQ2pDLFVBQXNCLEVBRVEsT0FBNEI7UUFKMUQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUVRLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBckJwRCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBd0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRSxTQUFJLEdB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QUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxRQUFRLEVBQUUsY0FBYztRQWlCeEIsUUFBUSxFQUFFLEdBQUc7aUJBaEJKOzs7Ozs7Ozs7Ozs7Ozs7R0FlUjtLQUVGLENBQUM7SUFzQkcsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQTs2Q0FKQSxrQkFBa0I7UUFDdkIsaUJBQWlCO1FBQ3JCLFVBQVU7R0FwQnJCLG9CQUFvQixDQW1FaEM7U0FuRVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IElDb250ZXh0TWVudU9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlLCBJQ29udGV4dE1lbnVDbGlja0V2ZW50LCBDbG9zZUNvbnRleHRNZW51RXZlbnQgfSBmcm9tICcuL2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IENPTlRFWFRfTUVOVV9PUFRJT05TIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElMaW5rQ29uZmlnIHtcbiAgY2xpY2s6IChpdGVtOiBhbnksICRldmVudD86IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIGVuYWJsZWQ/OiAoaXRlbTogYW55KSA9PiBib29sZWFuO1xuICBodG1sOiAoaXRlbTogYW55KSA9PiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIE1vdXNlTG9jYXRpb24ge1xuICBsZWZ0Pzogc3RyaW5nO1xuICBtYXJnaW5MZWZ0Pzogc3RyaW5nO1xuICBtYXJnaW5Ub3A/OiBzdHJpbmc7XG4gIHRvcD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnY29udGV4dC1tZW51JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgICAubmd4LWNvbnRleHRtZW51LmNkay1vdmVybGF5LXBhbmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOiBgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDbGFzcyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VCb290c3RyYXA0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlOiBFdmVudEVtaXR0ZXI8Q2xvc2VDb250ZXh0TWVudUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvcGVuOiBFdmVudEVtaXR0ZXI8SUNvbnRleHRNZW51Q2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ29udGV4dE1lbnVJdGVtRGlyZWN0aXZlKSBwdWJsaWMgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8Q29udGV4dE1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgQFZpZXdDaGlsZCgnbWVudScpIHB1YmxpYyBtZW51RWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHVibGljIHZpc2libGVNZW51SXRlbXM6IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgcHVibGljIGxpbmtzOiBJTGlua0NvbmZpZ1tdID0gW107XG4gIHB1YmxpYyBpdGVtOiBhbnk7XG4gIHB1YmxpYyBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gICAgcHJpdmF0ZSBfY29udGV4dE1lbnVTZXJ2aWNlOiBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChDT05URVhUX01FTlVfT1BUSU9OUykgcHJpdmF0ZSBvcHRpb25zOiBJQ29udGV4dE1lbnVPcHRpb25zLFxuICApIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5hdXRvRm9jdXMgPSBvcHRpb25zLmF1dG9Gb2N1cztcbiAgICAgIHRoaXMudXNlQm9vdHN0cmFwNCA9IG9wdGlvbnMudXNlQm9vdHN0cmFwNDtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKF9jb250ZXh0TWVudVNlcnZpY2Uuc2hvdy5zdWJzY3JpYmUobWVudUV2ZW50ID0+IHtcbiAgICAgIHRoaXMub25NZW51RXZlbnQobWVudUV2ZW50KTtcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1lbnVFdmVudChtZW51RXZlbnQ6IElDb250ZXh0TWVudUNsaWNrRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbnRleHRNZW51LCBldmVudCwgaXRlbSB9ID0gbWVudUV2ZW50O1xuICAgIGlmIChjb250ZXh0TWVudSAmJiBjb250ZXh0TWVudSAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICB0aGlzLnNldFZpc2libGVNZW51SXRlbXMoKTtcbiAgICB0aGlzLl9jb250ZXh0TWVudVNlcnZpY2Uub3BlbkNvbnRleHRNZW51KHsgLi4ubWVudUV2ZW50LCBtZW51SXRlbXM6IHRoaXMudmlzaWJsZU1lbnVJdGVtcywgbWVudUNsYXNzOiB0aGlzLm1lbnVDbGFzcyB9KTtcbiAgICB0aGlzLl9jb250ZXh0TWVudVNlcnZpY2UuY2xvc2UuYXNPYnNlcnZhYmxlKCkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoY2xvc2VFdmVudCA9PiB0aGlzLmNsb3NlLmVtaXQoY2xvc2VFdmVudCkpO1xuICAgIHRoaXMub3Blbi5uZXh0KG1lbnVFdmVudCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW06IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlSWZGdW5jdGlvbihtZW51SXRlbS52aXNpYmxlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWaXNpYmxlTWVudUl0ZW1zKCk6IHZvaWQge1xuICAgIHRoaXMudmlzaWJsZU1lbnVJdGVtcyA9IHRoaXMubWVudUl0ZW1zLmZpbHRlcihtZW51SXRlbSA9PiB0aGlzLmlzTWVudUl0ZW1WaXNpYmxlKG1lbnVJdGVtKSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=