import * as tslib_1 from "tslib";
import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, ElementRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ContextMenuContentComponent } from './context-menu.content.component';
let ContextMenuService = class ContextMenuService {
    constructor(overlay, scrollStrategy) {
        this.overlay = overlay;
        this.scrollStrategy = scrollStrategy;
        this.isDestroyingLeafMenu = false;
        this.show = new Subject();
        this.triggerClose = new Subject();
        this.close = new Subject();
        this.overlays = [];
        this.fakeElement = {
            getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0,
            })
        };
    }
    openContextMenu(context) {
        const { anchorElement, event, parentContextMenu } = context;
        let positionStrategy;
        if (!parentContextMenu) {
            const mouseEvent = event;
            this.fakeElement.getBoundingClientRect = () => ({
                bottom: mouseEvent.clientY,
                height: 0,
                left: mouseEvent.clientX,
                right: mouseEvent.clientX,
                top: mouseEvent.clientY,
                width: 0,
            });
            this.closeAllContextMenus({ eventType: 'cancel', event });
            // tslint:disable-next-line: deprecation
            positionStrategy = this.overlay.position().connectedTo(new ElementRef(anchorElement || this.fakeElement), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
                .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
                .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
                .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
                .withFallbackPosition({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
                .withFallbackPosition({ originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' });
            this.overlays = [this.overlay.create({
                    positionStrategy,
                    panelClass: 'ngx-contextmenu',
                    scrollStrategy: this.scrollStrategy.close(),
                })];
            this.attachContextMenu(this.overlays[0], context);
        }
        else {
            // tslint:disable-next-line: deprecation
            positionStrategy = this.overlay.position().connectedTo(new ElementRef(event ? event.target : anchorElement), { originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
                .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
                .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
                .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });
            const newOverlay = this.overlay.create({
                positionStrategy,
                panelClass: 'ngx-contextmenu',
                scrollStrategy: this.scrollStrategy.close(),
            });
            this.destroySubMenus(parentContextMenu);
            this.overlays = this.overlays.concat(newOverlay);
            this.attachContextMenu(newOverlay, context);
        }
    }
    attachContextMenu(overlay, context) {
        const { event, item, menuItems, menuClass } = context;
        const contextMenuContent = overlay.attach(new ComponentPortal(ContextMenuContentComponent));
        contextMenuContent.instance.event = event;
        contextMenuContent.instance.item = item;
        contextMenuContent.instance.menuItems = menuItems;
        contextMenuContent.instance.overlay = overlay;
        contextMenuContent.instance.isLeaf = true;
        contextMenuContent.instance.menuClass = menuClass;
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        overlay.contextMenu = contextMenuContent.instance;
        const subscriptions = new Subscription();
        subscriptions.add(contextMenuContent.instance.execute.asObservable()
            .subscribe((executeEvent) => this.closeAllContextMenus(Object.assign({ eventType: 'execute' }, executeEvent))));
        subscriptions.add(contextMenuContent.instance.closeAllMenus.asObservable()
            .subscribe((closeAllEvent) => this.closeAllContextMenus(Object.assign({ eventType: 'cancel' }, closeAllEvent))));
        subscriptions.add(contextMenuContent.instance.closeLeafMenu.asObservable()
            .subscribe(closeLeafMenuEvent => this.destroyLeafMenu(closeLeafMenuEvent)));
        subscriptions.add(contextMenuContent.instance.openSubMenu.asObservable()
            .subscribe((subMenuEvent) => {
            this.destroySubMenus(contextMenuContent.instance);
            if (!subMenuEvent.contextMenu) {
                contextMenuContent.instance.isLeaf = true;
                return;
            }
            contextMenuContent.instance.isLeaf = false;
            this.show.next(subMenuEvent);
        }));
        contextMenuContent.onDestroy(() => {
            menuItems.forEach(menuItem => menuItem.isActive = false);
            subscriptions.unsubscribe();
        });
        contextMenuContent.changeDetectorRef.detectChanges();
    }
    closeAllContextMenus(closeEvent) {
        if (this.overlays) {
            this.close.next(closeEvent);
            this.overlays.forEach((overlay, index) => {
                overlay.detach();
                overlay.dispose();
            });
        }
        this.overlays = [];
    }
    getLastAttachedOverlay() {
        let overlay = this.overlays[this.overlays.length - 1];
        while (this.overlays.length > 1 && overlay && !overlay.hasAttached()) {
            overlay.detach();
            overlay.dispose();
            this.overlays = this.overlays.slice(0, -1);
            overlay = this.overlays[this.overlays.length - 1];
        }
        return overlay;
    }
    destroyLeafMenu({ exceptRootMenu, event } = {}) {
        if (this.isDestroyingLeafMenu) {
            return;
        }
        this.isDestroyingLeafMenu = true;
        setTimeout(() => {
            const overlay = this.getLastAttachedOverlay();
            if (this.overlays.length > 1 && overlay) {
                overlay.detach();
                overlay.dispose();
            }
            if (!exceptRootMenu && this.overlays.length > 0 && overlay) {
                this.close.next({ eventType: 'cancel', event });
                overlay.detach();
                overlay.dispose();
            }
            const newLeaf = this.getLastAttachedOverlay();
            if (newLeaf) {
                newLeaf.contextMenu.isLeaf = true;
            }
            this.isDestroyingLeafMenu = false;
        });
    }
    destroySubMenus(contextMenu) {
        const overlay = contextMenu.overlay;
        const index = this.overlays.indexOf(overlay);
        this.overlays.slice(index + 1).forEach(subMenuOverlay => {
            subMenuOverlay.detach();
            subMenuOverlay.dispose();
        });
    }
    isLeafMenu(contextMenuContent) {
        const overlay = this.getLastAttachedOverlay();
        return contextMenuContent.overlay === overlay;
    }
};
ContextMenuService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Overlay,
        ScrollStrategyOptions])
], ContextMenuService);
export { ContextMenuService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBYyxxQkFBcUIsRUFBNkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFnQixVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSTdDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBbUMvRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQW9CN0IsWUFDVSxPQUFnQixFQUNoQixjQUFxQztRQURyQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQXJCeEMseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBRTdCLFNBQUksR0FBb0MsSUFBSSxPQUFPLEVBQTBCLENBQUM7UUFDOUUsaUJBQVksR0FBeUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuRSxVQUFLLEdBQW1DLElBQUksT0FBTyxFQUFFLENBQUM7UUFHckQsYUFBUSxHQUFpQixFQUFFLENBQUM7UUFDNUIsZ0JBQVcsR0FBUTtZQUN6QixxQkFBcUIsRUFBRSxHQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQzthQUNULENBQUM7U0FDSCxDQUFDO0lBS0UsQ0FBQztJ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T3ZlcmxheSwgT3ZlcmxheVJlZiwgU2Nyb2xsU3RyYXRlZ3lPcHRpb25zLCBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIEluamVjdGFibGUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDb250ZXh0TWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtbWVudS5pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbWVudS5jb250ZW50LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRleHRNZW51Q2xpY2tFdmVudCB7XG4gIGFuY2hvckVsZW1lbnQ/OiBFbGVtZW50IHwgRXZlbnRUYXJnZXQ7XG4gIGNvbnRleHRNZW51PzogQ29udGV4dE1lbnVDb21wb25lbnQ7XG4gIGV2ZW50PzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIHBhcmVudENvbnRleHRNZW51PzogQ29udGV4dE1lbnVDb250ZW50Q29tcG9uZW50O1xuICBpdGVtOiBhbnk7XG4gIGFjdGl2ZU1lbnVJdGVtSW5kZXg/OiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIElDb250ZXh0TWVudUNvbnRleHQgZXh0ZW5kcyBJQ29udGV4dE1lbnVDbGlja0V2ZW50IHtcbiAgbWVudUl0ZW1zOiBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmVbXTtcbiAgbWVudUNsYXNzOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIENsb3NlTGVhZk1lbnVFdmVudCB7XG4gIGV4Y2VwdFJvb3RNZW51PzogYm9vbGVhbjtcbiAgZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgT3ZlcmxheVJlZldpdGhDb250ZXh0TWVudSBleHRlbmRzIE92ZXJsYXlSZWYge1xuICBjb250ZXh0TWVudT86IENvbnRleHRNZW51Q29udGVudENvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYW5jZWxDb250ZXh0TWVudUV2ZW50IHtcbiAgZXZlbnRUeXBlOiAnY2FuY2VsJztcbiAgZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0ZUNvbnRleHRNZW51RXZlbnQge1xuICBldmVudFR5cGU6ICdleGVjdXRlJztcbiAgZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgaXRlbTogYW55O1xuICBtZW51SXRlbTogQ29udGV4dE1lbnVJdGVtRGlyZWN0aXZlO1xufVxuZXhwb3J0IHR5cGUgQ2xvc2VDb250ZXh0TWVudUV2ZW50ID0gRXhlY3V0ZUNvbnRleHRNZW51RXZlbnQgfCBDYW5jZWxDb250ZXh0TWVudUV2ZW50O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVTZXJ2aWNlIHtcbiAgcHVibGljIGlzRGVzdHJveWluZ0xlYWZNZW51ID0gZmFsc2U7XG5cbiAgcHVibGljIHNob3c6IFN1YmplY3Q8SUNvbnRleHRNZW51Q2xpY2tFdmVudD4gPSBuZXcgU3ViamVjdDxJQ29udGV4dE1lbnVDbGlja0V2ZW50PigpO1xuICBwdWJsaWMgdHJpZ2dlckNsb3NlOiBTdWJqZWN0PENvbnRleHRNZW51Q29udGVudENvbXBvbmVudD4gPSBuZXcgU3ViamVjdCgpO1xuICBwdWJsaWMgY2xvc2U6IFN1YmplY3Q8Q2xvc2VDb250ZXh0TWVudUV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJpdmF0ZSBjb250ZXh0TWVudUNvbnRlbnQ6IENvbXBvbmVudFJlZjxDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQ+O1xuICBwcml2YXRlIG92ZXJsYXlzOiBPdmVybGF5UmVmW10gPSBbXTtcbiAgcHJpdmF0ZSBmYWtlRWxlbWVudDogYW55ID0ge1xuICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdDogKCk6IENsaWVudFJlY3QgPT4gKHtcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiAwLFxuICAgIH0pXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3k6IFNjcm9sbFN0cmF0ZWd5T3B0aW9ucyxcbiAgKSB7IH1cblxuICBwdWJsaWMgb3BlbkNvbnRleHRNZW51KGNvbnRleHQ6IElDb250ZXh0TWVudUNvbnRleHQpIHtcbiAgICBjb25zdCB7IGFuY2hvckVsZW1lbnQsIGV2ZW50LCBwYXJlbnRDb250ZXh0TWVudSB9ID0gY29udGV4dDtcbiAgICBsZXQgcG9zaXRpb25TdHJhdGVneTogQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICAgIGlmICghcGFyZW50Q29udGV4dE1lbnUpIHtcbiAgICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBldmVudCBhcyBNb3VzZUV2ZW50O1xuICAgICAgdGhpcy5mYWtlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPSAoKTogQ2xpZW50UmVjdCA9PiAoe1xuICAgICAgICBib3R0b206IG1vdXNlRXZlbnQuY2xpZW50WSxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBsZWZ0OiBtb3VzZUV2ZW50LmNsaWVudFgsXG4gICAgICAgIHJpZ2h0OiBtb3VzZUV2ZW50LmNsaWVudFgsXG4gICAgICAgIHRvcDogbW91c2VFdmVudC5jbGllbnRZLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jbG9zZUFsbENvbnRleHRNZW51cyh7IGV2ZW50VHlwZTogJ2NhbmNlbCcsIGV2ZW50IH0pO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmNvbm5lY3RlZFRvKFxuICAgICAgICBuZXcgRWxlbWVudFJlZihhbmNob3JFbGVtZW50IHx8IHRoaXMuZmFrZUVsZW1lbnQpLFxuICAgICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICAgIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KVxuICAgICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KVxuICAgICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICAgICAgeyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ3RvcCcgfSxcbiAgICAgICAgICB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSlcbiAgICAgICAgLndpdGhGYWxsYmFja1Bvc2l0aW9uKFxuICAgICAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSxcbiAgICAgICAgICB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICd0b3AnIH0pXG4gICAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgICAgICB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9LFxuICAgICAgICAgIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9KVxuICAgICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9LFxuICAgICAgICAgIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicgfSlcbiAgICAgICAgO1xuICAgICAgdGhpcy5vdmVybGF5cyA9IFt0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICAgICAgcGFuZWxDbGFzczogJ25neC1jb250ZXh0bWVudScsXG4gICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5LmNsb3NlKCksXG4gICAgICB9KV07XG4gICAgICB0aGlzLmF0dGFjaENvbnRleHRNZW51KHRoaXMub3ZlcmxheXNbMF0sIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuY29ubmVjdGVkVG8oXG4gICAgICAgIG5ldyBFbGVtZW50UmVmKGV2ZW50ID8gZXZlbnQudGFyZ2V0IDogYW5jaG9yRWxlbWVudCksXG4gICAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnIH0sXG4gICAgICAgIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KVxuICAgICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcgfSlcbiAgICAgICAgLndpdGhGYWxsYmFja1Bvc2l0aW9uKFxuICAgICAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICAgICAgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG4gICAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICAgICAgeyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KVxuICAgICAgICA7XG4gICAgICBjb25zdCBuZXdPdmVybGF5ID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgIHBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICAgIHBhbmVsQ2xhc3M6ICduZ3gtY29udGV4dG1lbnUnLFxuICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneS5jbG9zZSgpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmRlc3Ryb3lTdWJNZW51cyhwYXJlbnRDb250ZXh0TWVudSk7XG4gICAgICB0aGlzLm92ZXJsYXlzID0gdGhpcy5vdmVybGF5cy5jb25jYXQobmV3T3ZlcmxheSk7XG4gICAgICB0aGlzLmF0dGFjaENvbnRleHRNZW51KG5ld092ZXJsYXksIGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhdHRhY2hDb250ZXh0TWVudShvdmVybGF5OiBPdmVybGF5UmVmLCBjb250ZXh0OiBJQ29udGV4dE1lbnVDb250ZXh0KTogdm9pZCB7XG4gICAgY29uc3QgeyBldmVudCwgaXRlbSwgbWVudUl0ZW1zLCBtZW51Q2xhc3MgfSA9IGNvbnRleHQ7XG5cbiAgICBjb25zdCBjb250ZXh0TWVudUNvbnRlbnQ6IENvbXBvbmVudFJlZjxDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQ+ID0gb3ZlcmxheS5hdHRhY2gobmV3IENvbXBvbmVudFBvcnRhbChDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQpKTtcbiAgICBjb250ZXh0TWVudUNvbnRlbnQuaW5zdGFuY2UuZXZlbnQgPSBldmVudDtcbiAgICBjb250ZXh0TWVudUNvbnRlbnQuaW5zdGFuY2UuaXRlbSA9IGl0ZW07XG4gICAgY29udGV4dE1lbnVDb250ZW50Lmluc3RhbmNlLm1lbnVJdGVtcyA9IG1lbnVJdGVtcztcbiAgICBjb250ZXh0TWVudUNvbnRlbnQuaW5zdGFuY2Uub3ZlcmxheSA9IG92ZXJsYXk7XG4gICAgY29udGV4dE1lbnVDb250ZW50Lmluc3RhbmNlLmlzTGVhZiA9IHRydWU7XG4gICAgY29udGV4dE1lbnVDb250ZW50Lmluc3RhbmNlLm1lbnVDbGFzcyA9IG1lbnVDbGFzcztcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cbiAgICAoPE92ZXJsYXlSZWZXaXRoQ29udGV4dE1lbnU+b3ZlcmxheSkuY29udGV4dE1lbnUgPSBjb250ZXh0TWVudUNvbnRlbnQuaW5zdGFuY2U7XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgc3Vic2NyaXB0aW9ucy5hZGQoY29udGV4dE1lbnVDb250ZW50Lmluc3RhbmNlLmV4ZWN1dGUuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5zdWJzY3JpYmUoKGV4ZWN1dGVFdmVudCkgPT4gdGhpcy5jbG9zZUFsbENvbnRleHRNZW51cyh7IGV2ZW50VHlwZTogJ2V4ZWN1dGUnLCAuLi5leGVjdXRlRXZlbnQgfSkpKTtcbiAgICBzdWJzY3JpcHRpb25zLmFkZChjb250ZXh0TWVudUNvbnRlbnQuaW5zdGFuY2UuY2xvc2VBbGxNZW51cy5hc09ic2VydmFibGUoKVxuICAgICAgLnN1YnNjcmliZSgoY2xvc2VBbGxFdmVudCkgPT4gdGhpcy5jbG9zZUFsbENvbnRleHRNZW51cyh7IGV2ZW50VHlwZTogJ2NhbmNlbCcsIC4uLmNsb3NlQWxsRXZlbnQgfSkpKTtcbiAgICBzdWJzY3JpcHRpb25zLmFkZChjb250ZXh0TWVudUNvbnRlbnQuaW5zdGFuY2UuY2xvc2VMZWFmTWVudS5hc09ic2VydmFibGUoKVxuICAgICAgLnN1YnNjcmliZShjbG9zZUxlYWZNZW51RXZlbnQgPT4gdGhpcy5kZXN0cm95TGVhZk1lbnUoY2xvc2VMZWFmTWVudUV2ZW50KSkpO1xuICAgIHN1YnNjcmlwdGlvbnMuYWRkKGNvbnRleHRNZW51Q29udGVudC5pbnN0YW5jZS5vcGVuU3ViTWVudS5hc09ic2VydmFibGUoKVxuICAgICAgLnN1YnNjcmliZSgoc3ViTWVudUV2ZW50OiBJQ29udGV4dE1lbnVDb250ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMuZGVzdHJveVN1Yk1lbnVzKGNvbnRleHRNZW51Q29udGVudC5pbnN0YW5jZSk7XG4gICAgICAgIGlmICghc3ViTWVudUV2ZW50LmNvbnRleHRNZW51KSB7XG4gICAgICAgICAgY29udGV4dE1lbnVDb250ZW50Lmluc3RhbmNlLmlzTGVhZiA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHRNZW51Q29udGVudC5pbnN0YW5jZS5pc0xlYWYgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93Lm5leHQoc3ViTWVudUV2ZW50KTtcbiAgICAgIH0pKTtcbiAgICBjb250ZXh0TWVudUNvbnRlbnQub25EZXN0cm95KCgpID0+IHtcbiAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IG1lbnVJdGVtLmlzQWN0aXZlID0gZmFsc2UpO1xuICAgICAgc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICAgIGNvbnRleHRNZW51Q29udGVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VBbGxDb250ZXh0TWVudXMoY2xvc2VFdmVudDogQ2xvc2VDb250ZXh0TWVudUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheXMpIHtcbiAgICAgIHRoaXMuY2xvc2UubmV4dChjbG9zZUV2ZW50KTtcbiAgICAgIHRoaXMub3ZlcmxheXMuZm9yRWFjaCgob3ZlcmxheSwgaW5kZXgpID0+IHtcbiAgICAgICAgb3ZlcmxheS5kZXRhY2goKTtcbiAgICAgICAgb3ZlcmxheS5kaXNwb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGdldExhc3RBdHRhY2hlZE92ZXJsYXkoKTogT3ZlcmxheVJlZldpdGhDb250ZXh0TWVudSB7XG4gICAgbGV0IG92ZXJsYXk6IE92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXlzW3RoaXMub3ZlcmxheXMubGVuZ3RoIC0gMV07XG4gICAgd2hpbGUgKHRoaXMub3ZlcmxheXMubGVuZ3RoID4gMSAmJiBvdmVybGF5ICYmICFvdmVybGF5Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIG92ZXJsYXkuZGV0YWNoKCk7XG4gICAgICBvdmVybGF5LmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMub3ZlcmxheXMgPSB0aGlzLm92ZXJsYXlzLnNsaWNlKDAsIC0xKTtcbiAgICAgIG92ZXJsYXkgPSB0aGlzLm92ZXJsYXlzW3RoaXMub3ZlcmxheXMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBvdmVybGF5O1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lMZWFmTWVudSh7IGV4Y2VwdFJvb3RNZW51LCBldmVudCB9OiBDbG9zZUxlYWZNZW51RXZlbnQgPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRGVzdHJveWluZ0xlYWZNZW51KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNEZXN0cm95aW5nTGVhZk1lbnUgPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5nZXRMYXN0QXR0YWNoZWRPdmVybGF5KCk7XG4gICAgICBpZiAodGhpcy5vdmVybGF5cy5sZW5ndGggPiAxICYmIG92ZXJsYXkpIHtcbiAgICAgICAgb3ZlcmxheS5kZXRhY2goKTtcbiAgICAgICAgb3ZlcmxheS5kaXNwb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIWV4Y2VwdFJvb3RNZW51ICYmIHRoaXMub3ZlcmxheXMubGVuZ3RoID4gMCAmJiBvdmVybGF5KSB7XG4gICAgICAgIHRoaXMuY2xvc2UubmV4dCh7IGV2ZW50VHlwZTogJ2NhbmNlbCcsIGV2ZW50IH0pO1xuICAgICAgICBvdmVybGF5LmRldGFjaCgpO1xuICAgICAgICBvdmVybGF5LmRpc3Bvc2UoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3TGVhZiA9IHRoaXMuZ2V0TGFzdEF0dGFjaGVkT3ZlcmxheSgpO1xuICAgICAgaWYgKG5ld0xlYWYpIHtcbiAgICAgICAgbmV3TGVhZi5jb250ZXh0TWVudS5pc0xlYWYgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlzRGVzdHJveWluZ0xlYWZNZW51ID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveVN1Yk1lbnVzKGNvbnRleHRNZW51OiBDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBvdmVybGF5ID0gY29udGV4dE1lbnUub3ZlcmxheTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcbiAgICB0aGlzLm92ZXJsYXlzLnNsaWNlKGluZGV4ICsgMSkuZm9yRWFjaChzdWJNZW51T3ZlcmxheSA9PiB7XG4gICAgICBzdWJNZW51T3ZlcmxheS5kZXRhY2goKTtcbiAgICAgIHN1Yk1lbnVPdmVybGF5LmRpc3Bvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0xlYWZNZW51KGNvbnRleHRNZW51Q29udGVudDogQ29udGV4dE1lbnVDb250ZW50Q29tcG9uZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuZ2V0TGFzdEF0dGFjaGVkT3ZlcmxheSgpO1xuICAgIHJldHVybiBjb250ZXh0TWVudUNvbnRlbnQub3ZlcmxheSA9PT0gb3ZlcmxheTtcbiAgfVxufVxuIl19