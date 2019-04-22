import { __decorate, __metadata, __assign, __param } from 'tslib';
import { OverlayRef, Overlay, ScrollStrategyOptions, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter, Directive, TemplateRef, ElementRef, InjectionToken, QueryList, ViewChild, ViewChildren, HostListener, Component, Optional, Inject, ChangeDetectorRef, Renderer2, Injectable, ContentChildren, ViewEncapsulation, NgModule } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ComponentPortal } from '@angular/cdk/portal';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

var ContextMenuItemDirective = /** @class */ (function () {
    function ContextMenuItemDirective(template, elementRef) {
        this.template = template;
        this.elementRef = elementRef;
        this.divider = false;
        this.enabled = true;
        this.passive = false;
        this.visible = true;
        this.execute = new EventEmitter();
        this.isActive = false;
    }
    Object.defineProperty(ContextMenuItemDirective.prototype, "disabled", {
        get: function () {
            return this.passive ||
                this.divider ||
                !this.evaluateIfFunction(this.enabled, this.currentItem);
        },
        enumerable: true,
        configurable: true
    });
    ContextMenuItemDirective.prototype.evaluateIfFunction = function (value, item) {
        if (value instanceof Function) {
            return value(item);
        }
        return value;
    };
    ContextMenuItemDirective.prototype.setActiveStyles = function () {
        this.isActive = true;
    };
    ContextMenuItemDirective.prototype.setInactiveStyles = function () {
        this.isActive = false;
    };
    ContextMenuItemDirective.prototype.triggerExecute = function (item, $event) {
        if (!this.evaluateIfFunction(this.enabled, item)) {
            return;
        }
        this.execute.emit({ event: $event, item: item });
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
    return ContextMenuItemDirective;
}());

var CONTEXT_MENU_OPTIONS = new InjectionToken('CONTEXT_MENU_OPTIONS');

var ARROW_LEFT_KEYCODE = 37;
var ContextMenuContentComponent = /** @class */ (function () {
    function ContextMenuContentComponent(changeDetector, elementRef, options, renderer) {
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
    ContextMenuContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuItems.forEach(function (menuItem) {
            menuItem.currentItem = _this.item;
            _this.subscription.add(menuItem.execute.subscribe(function (event) { return _this.execute.emit(__assign({}, event, { menuItem: menuItem })); }));
        });
        var queryList = new QueryList();
        queryList.reset(this.menuItems);
        this._keyManager = new ActiveDescendantKeyManager(queryList).withWrap();
    };
    ContextMenuContentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.autoFocus) {
            setTimeout(function () { return _this.focus(); });
        }
        this.overlay.updatePosition();
    };
    ContextMenuContentComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ContextMenuContentComponent.prototype.focus = function () {
        if (this.autoFocus) {
            this.menuElement.nativeElement.focus();
        }
    };
    ContextMenuContentComponent.prototype.stopEvent = function ($event) {
        $event.stopPropagation();
    };
    ContextMenuContentComponent.prototype.isMenuItemEnabled = function (menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.enabled);
    };
    ContextMenuContentComponent.prototype.isMenuItemVisible = function (menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.visible);
    };
    ContextMenuContentComponent.prototype.evaluateIfFunction = function (value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    };
    ContextMenuContentComponent.prototype.isDisabled = function (link) {
        return link.enabled && !link.enabled(this.item);
    };
    ContextMenuContentComponent.prototype.onKeyEvent = function (event) {
        if (!this.isLeaf) {
            return;
        }
        this._keyManager.onKeydown(event);
    };
    ContextMenuContentComponent.prototype.keyboardOpenSubMenu = function (event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        var menuItem = this.menuItems[this._keyManager.activeItemIndex];
        if (menuItem) {
            this.onOpenSubMenu(menuItem);
        }
    };
    ContextMenuContentComponent.prototype.keyboardMenuItemSelect = function (event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        var menuItem = this.menuItems[this._keyManager.activeItemIndex];
        if (menuItem) {
            this.onMenuItemSelect(menuItem, event);
        }
    };
    ContextMenuContentComponent.prototype.onCloseLeafMenu = function (event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        // tslint:disable-next-line: deprecation
        this.closeLeafMenu.emit({ exceptRootMenu: event.keyCode === ARROW_LEFT_KEYCODE, event: event });
    };
    ContextMenuContentComponent.prototype.closeMenu = function (event) {
        if (event.type === 'click' && event.button === 2) {
            return;
        }
        this.closeAllMenus.emit({ event: event });
    };
    ContextMenuContentComponent.prototype.onOpenSubMenu = function (menuItem, event) {
        var anchorElementRef = this.menuItemElements.toArray()[this._keyManager.activeItemIndex];
        var anchorElement = anchorElementRef && anchorElementRef.nativeElement;
        this.openSubMenu.emit({
            anchorElement: anchorElement,
            contextMenu: menuItem.subMenu,
            event: event,
            item: this.item,
            parentContextMenu: this,
        });
    };
    ContextMenuContentComponent.prototype.onMenuItemSelect = function (menuItem, event) {
        event.preventDefault();
        event.stopPropagation();
        this.onOpenSubMenu(menuItem, event);
        if (!menuItem.subMenu) {
            menuItem.triggerExecute(this.item, event);
        }
    };
    ContextMenuContentComponent.prototype.cancelEvent = function (event) {
        if (!event) {
            return;
        }
        var target = event.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.tagName) > -1 || target.isContentEditable) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
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
            styles: ["\n    .passive {\n        display: block;\n        padding: 3px 20px;\n        clear: both;\n        font-weight: normal;\n        line-height: @line-height-base;\n        white-space: nowrap;\n    }\n    .hasSubMenu:before {\n      content: \"\u25B6\";\n      float: right;\n    }\n    "]
        }),
        __param(2, Optional()),
        __param(2, Inject(CONTEXT_MENU_OPTIONS)),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            ElementRef, Object, Renderer2])
    ], ContextMenuContentComponent);
    return ContextMenuContentComponent;
}());

var ContextMenuService = /** @class */ (function () {
    function ContextMenuService(overlay, scrollStrategy) {
        this.overlay = overlay;
        this.scrollStrategy = scrollStrategy;
        this.isDestroyingLeafMenu = false;
        this.show = new Subject();
        this.triggerClose = new Subject();
        this.close = new Subject();
        this.overlays = [];
        this.fakeElement = {
            getBoundingClientRect: function () { return ({
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0,
            }); }
        };
    }
    ContextMenuService.prototype.openContextMenu = function (context) {
        var anchorElement = context.anchorElement, event = context.event, parentContextMenu = context.parentContextMenu;
        var positionStrategy;
        if (!parentContextMenu) {
            var mouseEvent_1 = event;
            this.fakeElement.getBoundingClientRect = function () { return ({
                bottom: mouseEvent_1.clientY,
                height: 0,
                left: mouseEvent_1.clientX,
                right: mouseEvent_1.clientX,
                top: mouseEvent_1.clientY,
                width: 0,
            }); };
            this.closeAllContextMenus({ eventType: 'cancel', event: event });
            // tslint:disable-next-line: deprecation
            positionStrategy = this.overlay.position().connectedTo(new ElementRef(anchorElement || this.fakeElement), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
                .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
                .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
                .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
                .withFallbackPosition({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
                .withFallbackPosition({ originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' });
            this.overlays = [this.overlay.create({
                    positionStrategy: positionStrategy,
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
            var newOverlay = this.overlay.create({
                positionStrategy: positionStrategy,
                panelClass: 'ngx-contextmenu',
                scrollStrategy: this.scrollStrategy.close(),
            });
            this.destroySubMenus(parentContextMenu);
            this.overlays = this.overlays.concat(newOverlay);
            this.attachContextMenu(newOverlay, context);
        }
    };
    ContextMenuService.prototype.attachContextMenu = function (overlay, context) {
        var _this = this;
        var event = context.event, item = context.item, menuItems = context.menuItems, menuClass = context.menuClass;
        var contextMenuContent = overlay.attach(new ComponentPortal(ContextMenuContentComponent));
        contextMenuContent.instance.event = event;
        contextMenuContent.instance.item = item;
        contextMenuContent.instance.menuItems = menuItems;
        contextMenuContent.instance.overlay = overlay;
        contextMenuContent.instance.isLeaf = true;
        contextMenuContent.instance.menuClass = menuClass;
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        overlay.contextMenu = contextMenuContent.instance;
        var subscriptions = new Subscription();
        subscriptions.add(contextMenuContent.instance.execute.asObservable()
            .subscribe(function (executeEvent) { return _this.closeAllContextMenus(__assign({ eventType: 'execute' }, executeEvent)); }));
        subscriptions.add(contextMenuContent.instance.closeAllMenus.asObservable()
            .subscribe(function (closeAllEvent) { return _this.closeAllContextMenus(__assign({ eventType: 'cancel' }, closeAllEvent)); }));
        subscriptions.add(contextMenuContent.instance.closeLeafMenu.asObservable()
            .subscribe(function (closeLeafMenuEvent) { return _this.destroyLeafMenu(closeLeafMenuEvent); }));
        subscriptions.add(contextMenuContent.instance.openSubMenu.asObservable()
            .subscribe(function (subMenuEvent) {
            _this.destroySubMenus(contextMenuContent.instance);
            if (!subMenuEvent.contextMenu) {
                contextMenuContent.instance.isLeaf = true;
                return;
            }
            contextMenuContent.instance.isLeaf = false;
            _this.show.next(subMenuEvent);
        }));
        contextMenuContent.onDestroy(function () {
            menuItems.forEach(function (menuItem) { return menuItem.isActive = false; });
            subscriptions.unsubscribe();
        });
        contextMenuContent.changeDetectorRef.detectChanges();
    };
    ContextMenuService.prototype.closeAllContextMenus = function (closeEvent) {
        if (this.overlays) {
            this.close.next(closeEvent);
            this.overlays.forEach(function (overlay, index) {
                overlay.detach();
                overlay.dispose();
            });
        }
        this.overlays = [];
    };
    ContextMenuService.prototype.getLastAttachedOverlay = function () {
        var overlay = this.overlays[this.overlays.length - 1];
        while (this.overlays.length > 1 && overlay && !overlay.hasAttached()) {
            overlay.detach();
            overlay.dispose();
            this.overlays = this.overlays.slice(0, -1);
            overlay = this.overlays[this.overlays.length - 1];
        }
        return overlay;
    };
    ContextMenuService.prototype.destroyLeafMenu = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, exceptRootMenu = _b.exceptRootMenu, event = _b.event;
        if (this.isDestroyingLeafMenu) {
            return;
        }
        this.isDestroyingLeafMenu = true;
        setTimeout(function () {
            var overlay = _this.getLastAttachedOverlay();
            if (_this.overlays.length > 1 && overlay) {
                overlay.detach();
                overlay.dispose();
            }
            if (!exceptRootMenu && _this.overlays.length > 0 && overlay) {
                _this.close.next({ eventType: 'cancel', event: event });
                overlay.detach();
                overlay.dispose();
            }
            var newLeaf = _this.getLastAttachedOverlay();
            if (newLeaf) {
                newLeaf.contextMenu.isLeaf = true;
            }
            _this.isDestroyingLeafMenu = false;
        });
    };
    ContextMenuService.prototype.destroySubMenus = function (contextMenu) {
        var overlay = contextMenu.overlay;
        var index = this.overlays.indexOf(overlay);
        this.overlays.slice(index + 1).forEach(function (subMenuOverlay) {
            subMenuOverlay.detach();
            subMenuOverlay.dispose();
        });
    };
    ContextMenuService.prototype.isLeafMenu = function (contextMenuContent) {
        var overlay = this.getLastAttachedOverlay();
        return contextMenuContent.overlay === overlay;
    };
    ContextMenuService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Overlay,
            ScrollStrategyOptions])
    ], ContextMenuService);
    return ContextMenuService;
}());

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
        this._contextMenuService.openContextMenu(__assign({}, menuEvent, { menuItems: this.visibleMenuItems, menuClass: this.menuClass }));
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
            template: " ",
            styles: ["\n    .cdk-overlay-container {\n      position: fixed;\n      z-index: 1000;\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n    }\n    .ngx-contextmenu.cdk-overlay-pane {\n      position: absolute;\n      pointer-events: auto;\n      box-sizing: border-box;\n    }\n  "]
        }),
        __param(3, Optional()),
        __param(3, Inject(CONTEXT_MENU_OPTIONS)),
        __metadata("design:paramtypes", [ContextMenuService,
            ChangeDetectorRef,
            ElementRef, Object])
    ], ContextMenuComponent);
    return ContextMenuComponent;
}());

var ContextMenuAttachDirective = /** @class */ (function () {
    function ContextMenuAttachDirective(contextMenuService) {
        this.contextMenuService = contextMenuService;
    }
    ContextMenuAttachDirective.prototype.onContextMenu = function (event) {
        if (!this.contextMenu.disabled) {
            this.contextMenuService.show.next({
                contextMenu: this.contextMenu,
                event: event,
                item: this.contextMenuSubject,
            });
            event.preventDefault();
            event.stopPropagation();
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
    return ContextMenuAttachDirective;
}());

var ContextMenuModule = /** @class */ (function () {
    function ContextMenuModule() {
    }
    ContextMenuModule_1 = ContextMenuModule;
    ContextMenuModule.forRoot = function (options) {
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
    };
    var ContextMenuModule_1;
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
    return ContextMenuModule;
}());

/*
 * Public API Surface of ngx-contextmenu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ContextMenuComponent, ContextMenuModule, ContextMenuService, ContextMenuAttachDirective as ɵa, ContextMenuItemDirective as ɵb, CONTEXT_MENU_OPTIONS as ɵc, ContextMenuContentComponent as ɵd };
//# sourceMappingURL=try-context-menu.js.map
