import { __decorate, __metadata, __param } from 'tslib';
import { OverlayRef, Overlay, ScrollStrategyOptions, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output, Directive, TemplateRef, ElementRef, InjectionToken, QueryList, ViewChild, ViewChildren, HostListener, Component, Optional, Inject, ChangeDetectorRef, Renderer2, Injectable, ContentChildren, ViewEncapsulation, NgModule } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ComponentPortal } from '@angular/cdk/portal';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

let ContextMenuItemDirective = class ContextMenuItemDirective {
    constructor(template, elementRef) {
        this.template = template;
        this.elementRef = elementRef;
        this.divider = false;
        this.enabled = true;
        this.passive = false;
        this.visible = true;
        this.execute = new EventEmitter();
        this.isActive = false;
    }
    get disabled() {
        return this.passive ||
            this.divider ||
            !this.evaluateIfFunction(this.enabled, this.currentItem);
    }
    evaluateIfFunction(value, item) {
        if (value instanceof Function) {
            return value(item);
        }
        return value;
    }
    setActiveStyles() {
        this.isActive = true;
    }
    setInactiveStyles() {
        this.isActive = false;
    }
    triggerExecute(item, $event) {
        if (!this.evaluateIfFunction(this.enabled, item)) {
            return;
        }
        this.execute.emit({ event: $event, item });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuItemDirective.prototype, "subMenu", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuItemDirective.prototype, "divider", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuItemDirective.prototype, "enabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuItemDirective.prototype, "passive", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuItemDirective.prototype, "visible", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuItemDirective.prototype, "execute", void 0);
ContextMenuItemDirective = __decorate([
    Directive({
        /* tslint:disable:directive-selector-type */
        selector: '[contextMenuItem]',
    }),
    __metadata("design:paramtypes", [TemplateRef, ElementRef])
], ContextMenuItemDirective);

const CONTEXT_MENU_OPTIONS = new InjectionToken('CONTEXT_MENU_OPTIONS');

const ARROW_LEFT_KEYCODE = 37;
let ContextMenuContentComponent = class ContextMenuContentComponent {
    constructor(changeDetector, elementRef, options, renderer) {
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.options = options;
        this.renderer = renderer;
        this.menuItems = [];
        this.isLeaf = false;
        this.execute = new EventEmitter();
        this.openSubMenu = new EventEmitter();
        this.closeLeafMenu = new EventEmitter();
        this.closeAllMenus = new EventEmitter();
        this.autoFocus = false;
        this.useBootstrap4 = false;
        this.subscription = new Subscription();
        if (options) {
            this.autoFocus = options.autoFocus;
            this.useBootstrap4 = options.useBootstrap4;
        }
    }
    ngOnInit() {
        this.menuItems.forEach(menuItem => {
            menuItem.currentItem = this.item;
            this.subscription.add(menuItem.execute.subscribe(event => this.execute.emit(Object.assign({}, event, { menuItem }))));
        });
        const queryList = new QueryList();
        queryList.reset(this.menuItems);
        this._keyManager = new ActiveDescendantKeyManager(queryList).withWrap();
    }
    ngAfterViewInit() {
        if (this.autoFocus) {
            setTimeout(() => this.focus());
        }
        this.overlay.updatePosition();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    focus() {
        if (this.autoFocus) {
            this.menuElement.nativeElement.focus();
        }
    }
    stopEvent($event) {
        $event.stopPropagation();
    }
    isMenuItemEnabled(menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.enabled);
    }
    isMenuItemVisible(menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.visible);
    }
    evaluateIfFunction(value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    }
    isDisabled(link) {
        return link.enabled && !link.enabled(this.item);
    }
    onKeyEvent(event) {
        if (!this.isLeaf) {
            return;
        }
        this._keyManager.onKeydown(event);
    }
    keyboardOpenSubMenu(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        const menuItem = this.menuItems[this._keyManager.activeItemIndex];
        if (menuItem) {
            this.onOpenSubMenu(menuItem);
        }
    }
    keyboardMenuItemSelect(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        const menuItem = this.menuItems[this._keyManager.activeItemIndex];
        if (menuItem) {
            this.onMenuItemSelect(menuItem, event);
        }
    }
    onCloseLeafMenu(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        // tslint:disable-next-line: deprecation
        this.closeLeafMenu.emit({ exceptRootMenu: event.keyCode === ARROW_LEFT_KEYCODE, event });
    }
    closeMenu(event) {
        if (event.type === 'click' && event.button === 2) {
            return;
        }
        this.closeAllMenus.emit({ event });
    }
    onOpenSubMenu(menuItem, event) {
        const anchorElementRef = this.menuItemElements.toArray()[this._keyManager.activeItemIndex];
        const anchorElement = anchorElementRef && anchorElementRef.nativeElement;
        this.openSubMenu.emit({
            anchorElement,
            contextMenu: menuItem.subMenu,
            event,
            item: this.item,
            parentContextMenu: this,
        });
    }
    onMenuItemSelect(menuItem, event) {
        event.preventDefault();
        event.stopPropagation();
        this.onOpenSubMenu(menuItem, event);
        if (!menuItem.subMenu) {
            menuItem.triggerExecute(this.item, event);
        }
    }
    cancelEvent(event) {
        if (!event) {
            return;
        }
        const target = event.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.tagName) > -1 || target.isContentEditable) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], ContextMenuContentComponent.prototype, "menuItems", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuContentComponent.prototype, "item", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuContentComponent.prototype, "event", void 0);
__decorate([
    Input(),
    __metadata("design:type", ContextMenuContentComponent)
], ContextMenuContentComponent.prototype, "parentContextMenu", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ContextMenuContentComponent.prototype, "menuClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", OverlayRef)
], ContextMenuContentComponent.prototype, "overlay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuContentComponent.prototype, "isLeaf", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuContentComponent.prototype, "execute", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuContentComponent.prototype, "openSubMenu", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuContentComponent.prototype, "closeLeafMenu", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuContentComponent.prototype, "closeAllMenus", void 0);
__decorate([
    ViewChild('menu'),
    __metadata("design:type", ElementRef)
], ContextMenuContentComponent.prototype, "menuElement", void 0);
__decorate([
    ViewChildren('li'),
    __metadata("design:type", QueryList)
], ContextMenuContentComponent.prototype, "menuItemElements", void 0);
__decorate([
    HostListener('window:keydown.ArrowDown', ['$event']),
    HostListener('window:keydown.ArrowUp', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ContextMenuContentComponent.prototype, "onKeyEvent", null);
__decorate([
    HostListener('window:keydown.ArrowRight', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ContextMenuContentComponent.prototype, "keyboardOpenSubMenu", null);
__decorate([
    HostListener('window:keydown.Enter', ['$event']),
    HostListener('window:keydown.Space', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ContextMenuContentComponent.prototype, "keyboardMenuItemSelect", null);
__decorate([
    HostListener('window:keydown.Escape', ['$event']),
    HostListener('window:keydown.ArrowLeft', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ContextMenuContentComponent.prototype, "onCloseLeafMenu", null);
__decorate([
    HostListener('document:click', ['$event']),
    HostListener('document:contextmenu', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ContextMenuContentComponent.prototype, "closeMenu", null);
ContextMenuContentComponent = __decorate([
    Component({
        selector: 'context-menu-content',
        template: "<div class=\"dropdown open show ngx-contextmenu\" [ngClass]=\"menuClass\" tabindex=\"0\">\n  <ul #menu class=\"dropdown-menu show\" style=\"position: static; float: none;\" tabindex=\"0\">\n    <li #li *ngFor=\"let menuItem of menuItems; let i = index\" [class.disabled]=\"!isMenuItemEnabled(menuItem)\"\n        [class.divider]=\"menuItem.divider\" [class.dropdown-divider]=\"useBootstrap4 && menuItem.divider\"\n        [class.active]=\"menuItem.isActive && isMenuItemEnabled(menuItem)\"\n        [attr.role]=\"menuItem.divider ? 'separator' : undefined\">\n      <a *ngIf=\"!menuItem.divider && !menuItem.passive\" href [class.dropdown-item]=\"useBootstrap4\"\n        [class.active]=\"menuItem.isActive && isMenuItemEnabled(menuItem)\"\n        [class.disabled]=\"useBootstrap4 && !isMenuItemEnabled(menuItem)\" [class.hasSubMenu]=\"!!menuItem.subMenu\"\n        (click)=\"onMenuItemSelect(menuItem, $event)\" (mouseenter)=\"onOpenSubMenu(menuItem, $event)\">\n        <ng-template [ngTemplateOutlet]=\"menuItem.template\" [ngTemplateOutletContext]=\"{ $implicit: item }\"></ng-template>\n      </a>\n\n      <span (click)=\"stopEvent($event)\" (contextmenu)=\"stopEvent($event)\" class=\"passive\"\n            *ngIf=\"!menuItem.divider && menuItem.passive\" [class.dropdown-item]=\"useBootstrap4\"\n            [class.disabled]=\"useBootstrap4 && !isMenuItemEnabled(menuItem)\">\n        <ng-template [ngTemplateOutlet]=\"menuItem.template\" [ngTemplateOutletContext]=\"{ $implicit: item }\"></ng-template>\n      </span>\n    </li>\n  </ul>\n</div>",
        styles: [`
    .passive {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: @line-height-base;
        white-space: nowrap;
    }
    .hasSubMenu:before {
      content: "\u25B6";
      float: right;
    }
    `]
    }),
    __param(2, Optional()),
    __param(2, Inject(CONTEXT_MENU_OPTIONS)),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        ElementRef, Object, Renderer2])
], ContextMenuContentComponent);

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
ContextMenuService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Overlay,
        ScrollStrategyOptions])
], ContextMenuService);

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
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "menuClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "autoFocus", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "useBootstrap4", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuComponent.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuComponent.prototype, "close", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ContextMenuComponent.prototype, "open", void 0);
__decorate([
    ContentChildren(ContextMenuItemDirective),
    __metadata("design:type", QueryList)
], ContextMenuComponent.prototype, "menuItems", void 0);
__decorate([
    ViewChild('menu'),
    __metadata("design:type", ElementRef)
], ContextMenuComponent.prototype, "menuElement", void 0);
ContextMenuComponent = __decorate([
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
    __param(3, Optional()),
    __param(3, Inject(CONTEXT_MENU_OPTIONS)),
    __metadata("design:paramtypes", [ContextMenuService,
        ChangeDetectorRef,
        ElementRef, Object])
], ContextMenuComponent);

let ContextMenuAttachDirective = class ContextMenuAttachDirective {
    constructor(contextMenuService) {
        this.contextMenuService = contextMenuService;
    }
    onContextMenu(event) {
        if (!this.contextMenu.disabled) {
            this.contextMenuService.show.next({
                contextMenu: this.contextMenu,
                event,
                item: this.contextMenuSubject,
            });
            event.preventDefault();
            event.stopPropagation();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContextMenuAttachDirective.prototype, "contextMenuSubject", void 0);
__decorate([
    Input(),
    __metadata("design:type", ContextMenuComponent)
], ContextMenuAttachDirective.prototype, "contextMenu", void 0);
__decorate([
    HostListener('contextmenu', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ContextMenuAttachDirective.prototype, "onContextMenu", null);
ContextMenuAttachDirective = __decorate([
    Directive({
        selector: '[contextMenu]',
    }),
    __metadata("design:paramtypes", [ContextMenuService])
], ContextMenuAttachDirective);

var ContextMenuModule_1;
let ContextMenuModule = ContextMenuModule_1 = class ContextMenuModule {
    static forRoot(options) {
        return {
            ngModule: ContextMenuModule_1,
            providers: [
                ContextMenuService,
                {
                    provide: CONTEXT_MENU_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
};
ContextMenuModule = ContextMenuModule_1 = __decorate([
    NgModule({
        declarations: [
            ContextMenuAttachDirective,
            ContextMenuComponent,
            ContextMenuContentComponent,
            ContextMenuItemDirective,
        ],
        entryComponents: [
            ContextMenuContentComponent,
        ],
        exports: [
            ContextMenuAttachDirective,
            ContextMenuComponent,
            ContextMenuItemDirective,
        ],
        imports: [
            CommonModule,
            OverlayModule,
        ],
    })
], ContextMenuModule);

/*
 * Public API Surface of ngx-contextmenu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ContextMenuComponent, ContextMenuModule, ContextMenuService, ContextMenuAttachDirective as ɵa, ContextMenuItemDirective as ɵb, CONTEXT_MENU_OPTIONS as ɵc, ContextMenuContentComponent as ɵd };
//# sourceMappingURL=try-context-menu.js.map
