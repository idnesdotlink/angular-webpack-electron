import * as tslib_1 from "tslib";
import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, Optional, Renderer2, ViewChild, ViewChildren, } from '@angular/core';
import { EventEmitter, Output, QueryList, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONTEXT_MENU_OPTIONS } from './tokens';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
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
            _this.subscription.add(menuItem.execute.subscribe(function (event) { return _this.execute.emit(tslib_1.__assign({}, event, { menuItem: menuItem })); }));
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ContextMenuContentComponent.prototype, "menuItems", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuContentComponent.prototype, "item", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuContentComponent.prototype, "event", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ContextMenuContentComponent)
    ], ContextMenuContentComponent.prototype, "parentContextMenu", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ContextMenuContentComponent.prototype, "menuClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OverlayRef)
    ], ContextMenuContentComponent.prototype, "overlay", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuContentComponent.prototype, "isLeaf", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuContentComponent.prototype, "execute", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuContentComponent.prototype, "openSubMenu", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuContentComponent.prototype, "closeLeafMenu", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuContentComponent.prototype, "closeAllMenus", void 0);
    tslib_1.__decorate([
        ViewChild('menu'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ContextMenuContentComponent.prototype, "menuElement", void 0);
    tslib_1.__decorate([
        ViewChildren('li'),
        tslib_1.__metadata("design:type", QueryList)
    ], ContextMenuContentComponent.prototype, "menuItemElements", void 0);
    tslib_1.__decorate([
        HostListener('window:keydown.ArrowDown', ['$event']),
        HostListener('window:keydown.ArrowUp', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ContextMenuContentComponent.prototype, "onKeyEvent", null);
    tslib_1.__decorate([
        HostListener('window:keydown.ArrowRight', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ContextMenuContentComponent.prototype, "keyboardOpenSubMenu", null);
    tslib_1.__decorate([
        HostListener('window:keydown.Enter', ['$event']),
        HostListener('window:keydown.Space', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ContextMenuContentComponent.prototype, "keyboardMenuItemSelect", null);
    tslib_1.__decorate([
        HostListener('window:keydown.Escape', ['$event']),
        HostListener('window:keydown.ArrowLeft', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ContextMenuContentComponent.prototype, "onCloseLeafMenu", null);
    tslib_1.__decorate([
        HostListener('document:click', ['$event']),
        HostListener('document:contextmenu', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [MouseEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ContextMenuContentComponent.prototype, "closeMenu", null);
    ContextMenuContentComponent = tslib_1.__decorate([
        Component({
            selector: 'context-menu-content',
            template: "<div class=\"dropdown open show ngx-contextmenu\" [ngClass]=\"menuClass\" tabindex=\"0\">\n  <ul #menu class=\"dropdown-menu show\" style=\"position: static; float: none;\" tabindex=\"0\">\n    <li #li *ngFor=\"let menuItem of menuItems; let i = index\" [class.disabled]=\"!isMenuItemEnabled(menuItem)\"\n        [class.divider]=\"menuItem.divider\" [class.dropdown-divider]=\"useBootstrap4 && menuItem.divider\"\n        [class.active]=\"menuItem.isActive && isMenuItemEnabled(menuItem)\"\n        [attr.role]=\"menuItem.divider ? 'separator' : undefined\">\n      <a *ngIf=\"!menuItem.divider && !menuItem.passive\" href [class.dropdown-item]=\"useBootstrap4\"\n        [class.active]=\"menuItem.isActive && isMenuItemEnabled(menuItem)\"\n        [class.disabled]=\"useBootstrap4 && !isMenuItemEnabled(menuItem)\" [class.hasSubMenu]=\"!!menuItem.subMenu\"\n        (click)=\"onMenuItemSelect(menuItem, $event)\" (mouseenter)=\"onOpenSubMenu(menuItem, $event)\">\n        <ng-template [ngTemplateOutlet]=\"menuItem.template\" [ngTemplateOutletContext]=\"{ $implicit: item }\"></ng-template>\n      </a>\n\n      <span (click)=\"stopEvent($event)\" (contextmenu)=\"stopEvent($event)\" class=\"passive\"\n            *ngIf=\"!menuItem.divider && menuItem.passive\" [class.dropdown-item]=\"useBootstrap4\"\n            [class.disabled]=\"useBootstrap4 && !isMenuItemEnabled(menuItem)\">\n        <ng-template [ngTemplateOutlet]=\"menuItem.template\" [ngTemplateOutletContext]=\"{ $implicit: item }\"></ng-template>\n      </span>\n    </li>\n  </ul>\n</div>",
            styles: ["\n    .passive {\n        display: block;\n        padding: 3px 20px;\n        clear: both;\n        font-weight: normal;\n        line-height: @line-height-base;\n        white-space: nowrap;\n    }\n    .hasSubMenu:before {\n      content: \"\u25B6\";\n      float: right;\n    }\n    "]
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(2, Inject(CONTEXT_MENU_OPTIONS)),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            ElementRef, Object, Renderer2])
    ], ContextMenuContentComponent);
    return ContextMenuContentComponent;
}());
export { ContextMenuContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tZW51LmNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxHQUNmLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJcEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUS9ELElBQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBc0I5QjtJQXFCRSxxQ0FDVSxjQUFpQyxFQUNqQyxVQUFzQixFQUVRLE9BQTRCLEVBQzNELFFBQW1CO1FBSmxCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRVEsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFDM0QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXpCWixjQUFTLEdBQStCLEVBQUUsQ0FBQztRQU0zQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2QsWUFBTyxHQUNwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ04sZ0JBQVcsR0FBeUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RSxrQkFBYSxHQUFxQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JFLGtCQUFhLEdBQXdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFJbEYsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUdyQixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBUXRELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCw4Q0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7WUFDN0IsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFNLEtBQUssSUFBRSxRQUFRLFVBQUEsSUFBRyxFQUF6QyxDQUF5QyxDQUFDLENBQUMsQ0FBQztRQUN4RyxDQUFDLENBQUMsQ0FBQztRQUNILElBQU0sU0FBUyxHQUFHLElBQUksU0FBUyxFQUE0QixDQUFDO1FBQzVELFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBMEIsQ0FBMkIsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEcsQ0FBQztJQUVELHFEQUFlLEdBQWY7UUFBQSxpQkFLQztRQUpDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGlEQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwyQ0FBSyxHQUFMO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELCtDQUFTLEdBQVQsVUFBVSxNQUFrQjtRQUMxQixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHVEQUFpQixHQUF4QixVQUF5QixRQUFrQztRQUN6RCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSx1REFBaUIsR0FBeEIsVUFBeUIsUUFBa0M7UUFDekQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sd0RBQWtCLEdBQXpCLFVBQTBCLEtBQVU7UUFDbEMsSUFBSSxLQUFLLFlBQVksUUFBUSxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGdEQUFVLEdBQWpCLFVBQWtCLElBQWlCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFJTSxnREFBVSxHQUFqQixVQUFrQixLQUFvQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBR00seURBQW1CLEdBQTFCLFVBQTJCLEtBQXFCO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFJTSw0REFBc0IsR0FBN0IsVUFBOEIsS0FBcUI7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUlNLHFEQUFlLEdBQXRCLFVBQXVCLEtBQW9CO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxPQUFPLEtBQUssa0JBQWtCLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFJTSwrQ0FBUyxHQUFoQixVQUFpQixLQUFpQjtRQUNoQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxtREFBYSxHQUFwQixVQUFxQixRQUFrQyxFQUFFLEtBQWtDO1FBQ3pGLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0YsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLGFBQWEsZUFBQTtZQUNiLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTztZQUM3QixLQUFLLE9BQUE7WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxzREFBZ0IsR0FBdkIsVUFBd0IsUUFBa0MsRUFBRSxLQUFpQztRQUMzRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFTyxpREFBVyxHQUFuQixVQUFvQixLQUFLO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPO1NBQ1I7UUFFRCxJQUFNLE1BQU0sR0FBZ0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtZQUM1RixPQUFPO1NBQ1I7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUExS1E7UUFBUixLQUFLLEVBQUU7O2tFQUFtRDtJQUNsRDtRQUFSLEtBQUssRUFBRTs7NkRBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzs4REFBMEM7SUFDekM7UUFBUixLQUFLLEVBQUU7MENBQTJCLDJCQUEyQjswRUFBQztJQUN0RDtRQUFSLEtBQUssRUFBRTs7a0VBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOzBDQUFpQixVQUFVO2dFQUFDO0lBQzNCO1FBQVIsS0FBSyxFQUFFOzsrREFBdUI7SUFDckI7UUFBVCxNQUFNLEVBQUU7MENBQWlCLFlBQVk7Z0VBQ2Y7SUFDYjtRQUFULE1BQU0sRUFBRTswQ0FBcUIsWUFBWTtvRUFBOEM7SUFDOUU7UUFBVCxNQUFNLEVBQUU7MENBQXVCLFlBQVk7c0VBQTBDO0lBQzVFO1FBQVQsTUFBTSxFQUFFOzBDQUF1QixZQUFZO3NFQUE2QztJQUN0RTtRQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDOzBDQUFxQixVQUFVO29FQUFDO0lBQzlCO1FBQW5CLFlBQVksQ0FBQyxJQUFJLENBQUM7MENBQTBCLFNBQVM7eUVBQWE7SUF3RW5FO1FBRkMsWUFBWSxDQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsWUFBWSxDQUFDLHdCQUF3QixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUMxQixhQUFhOztpRUFLckM7SUFHRDtRQURDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztpREFDbkIsYUFBYTs7MEVBUy9DO0lBSUQ7UUFGQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7aURBQ1gsYUFBYTs7NkVBU2xEO0lBSUQ7UUFGQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7aURBQ3ZCLGFBQWE7O3NFQU8xQztJQUlEO1FBRkMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUN6QixVQUFVOztnRUFLakM7SUF4SVUsMkJBQTJCO1FBcEJ2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBaUJoQywraERBQTRCO3FCQWYxQixpU0FhQztTQUdKLENBQUM7UUF5QkcsbUJBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixtQkFBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtpREFITCxpQkFBaUI7WUFDckIsVUFBVSxVQUdiLFNBQVM7T0ExQmpCLDJCQUEyQixDQTRLdkM7SUFBRCxrQ0FBQztDQUFBLEFBNUtELElBNEtDO1NBNUtZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsb3NlTGVhZk1lbnVFdmVudCwgSUNvbnRleHRNZW51Q2xpY2tFdmVudCB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IElDb250ZXh0TWVudU9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgQ09OVEVYVF9NRU5VX09QVElPTlMgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuZXhwb3J0IGludGVyZmFjZSBJTGlua0NvbmZpZyB7XG4gIGNsaWNrOiAoaXRlbTogYW55LCAkZXZlbnQ/OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBlbmFibGVkPzogKGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcbiAgaHRtbDogKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xufVxuXG5jb25zdCBBUlJPV19MRUZUX0tFWUNPREUgPSAzNztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29udGV4dC1tZW51LWNvbnRlbnQnLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLnBhc3NpdmUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcGFkZGluZzogM3B4IDIwcHg7XG4gICAgICAgIGNsZWFyOiBib3RoO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBsaW5lLWhlaWdodDogQGxpbmUtaGVpZ2h0LWJhc2U7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgfVxuICAgIC5oYXNTdWJNZW51OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiBcIlxcdTI1QjZcIjtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICB9XG4gICAgYCxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51SXRlbXM6IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZVtdID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBpdGVtOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb250ZXh0TWVudTogQ29udGV4dE1lbnVDb250ZW50Q29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgaXNMZWFmID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZXhlY3V0ZTogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50LCBpdGVtOiBhbnksIG1lbnVJdGVtOiBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmUgfT5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvcGVuU3ViTWVudTogRXZlbnRFbWl0dGVyPElDb250ZXh0TWVudUNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlTGVhZk1lbnU6IEV2ZW50RW1pdHRlcjxDbG9zZUxlYWZNZW51RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlQWxsTWVudXM6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAVmlld0NoaWxkKCdtZW51JykgcHVibGljIG1lbnVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKCdsaScpIHB1YmxpYyBtZW51SXRlbUVsZW1lbnRzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgcHVibGljIGF1dG9Gb2N1cyA9IGZhbHNlO1xuICBwdWJsaWMgdXNlQm9vdHN0cmFwNCA9IGZhbHNlO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Q29udGV4dE1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChDT05URVhUX01FTlVfT1BUSU9OUykgcHJpdmF0ZSBvcHRpb25zOiBJQ29udGV4dE1lbnVPcHRpb25zLFxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5hdXRvRm9jdXMgPSBvcHRpb25zLmF1dG9Gb2N1cztcbiAgICAgIHRoaXMudXNlQm9vdHN0cmFwNCA9IG9wdGlvbnMudXNlQm9vdHN0cmFwNDtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IHtcbiAgICAgIG1lbnVJdGVtLmN1cnJlbnRJdGVtID0gdGhpcy5pdGVtO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKG1lbnVJdGVtLmV4ZWN1dGUuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuZXhlY3V0ZS5lbWl0KHsgLi4uZXZlbnQsIG1lbnVJdGVtIH0pKSk7XG4gICAgfSk7XG4gICAgY29uc3QgcXVlcnlMaXN0ID0gbmV3IFF1ZXJ5TGlzdDxDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmU+KCk7XG4gICAgcXVlcnlMaXN0LnJlc2V0KHRoaXMubWVudUl0ZW1zKTtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPENvbnRleHRNZW51SXRlbURpcmVjdGl2ZT4ocXVlcnlMaXN0KS53aXRoV3JhcCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9Gb2N1cykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZvY3VzKCkpO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXkudXBkYXRlUG9zaXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvRm9jdXMpIHtcbiAgICAgIHRoaXMubWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BFdmVudCgkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbUVuYWJsZWQobWVudUl0ZW06IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlSWZGdW5jdGlvbihtZW51SXRlbSAmJiBtZW51SXRlbS5lbmFibGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBpc01lbnVJdGVtVmlzaWJsZShtZW51SXRlbTogQ29udGV4dE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtICYmIG1lbnVJdGVtLnZpc2libGUpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlSWZGdW5jdGlvbih2YWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHZhbHVlKHRoaXMuaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0Rpc2FibGVkKGxpbms6IElMaW5rQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxpbmsuZW5hYmxlZCAmJiAhbGluay5lbmFibGVkKHRoaXMuaXRlbSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uS2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93UmlnaHQnLCBbJyRldmVudCddKVxuICBwdWJsaWMga2V5Ym9hcmRPcGVuU3ViTWVudShldmVudD86IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5tZW51SXRlbXNbdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXhdO1xuICAgIGlmIChtZW51SXRlbSkge1xuICAgICAgdGhpcy5vbk9wZW5TdWJNZW51KG1lbnVJdGVtKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5FbnRlcicsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLlNwYWNlJywgWyckZXZlbnQnXSlcbiAgcHVibGljIGtleWJvYXJkTWVudUl0ZW1TZWxlY3QoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzTGVhZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNhbmNlbEV2ZW50KGV2ZW50KTtcbiAgICBjb25zdCBtZW51SXRlbSA9IHRoaXMubWVudUl0ZW1zW3RoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4XTtcbiAgICBpZiAobWVudUl0ZW0pIHtcbiAgICAgIHRoaXMub25NZW51SXRlbVNlbGVjdChtZW51SXRlbSwgZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkVzY2FwZScsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93TGVmdCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNsb3NlTGVhZk1lbnUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICB0aGlzLmNsb3NlTGVhZk1lbnUuZW1pdCh7IGV4Y2VwdFJvb3RNZW51OiBldmVudC5rZXlDb2RlID09PSBBUlJPV19MRUZUX0tFWUNPREUsIGV2ZW50IH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBjbG9zZU1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJyAmJiBldmVudC5idXR0b24gPT09IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbG9zZUFsbE1lbnVzLmVtaXQoe2V2ZW50fSk7XG4gIH1cblxuICBwdWJsaWMgb25PcGVuU3ViTWVudShtZW51SXRlbTogQ29udGV4dE1lbnVJdGVtRGlyZWN0aXZlLCBldmVudD86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgYW5jaG9yRWxlbWVudFJlZiA9IHRoaXMubWVudUl0ZW1FbGVtZW50cy50b0FycmF5KClbdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXhdO1xuICAgIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBhbmNob3JFbGVtZW50UmVmICYmIGFuY2hvckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLm9wZW5TdWJNZW51LmVtaXQoe1xuICAgICAgYW5jaG9yRWxlbWVudCxcbiAgICAgIGNvbnRleHRNZW51OiBtZW51SXRlbS5zdWJNZW51LFxuICAgICAgZXZlbnQsXG4gICAgICBpdGVtOiB0aGlzLml0ZW0sXG4gICAgICBwYXJlbnRDb250ZXh0TWVudTogdGhpcyxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1lbnVJdGVtU2VsZWN0KG1lbnVJdGVtOiBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmUsIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5vbk9wZW5TdWJNZW51KG1lbnVJdGVtLCBldmVudCk7XG4gICAgaWYgKCFtZW51SXRlbS5zdWJNZW51KSB7XG4gICAgICBtZW51SXRlbS50cmlnZ2VyRXhlY3V0ZSh0aGlzLml0ZW0sIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbmNlbEV2ZW50KGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKFsnSU5QVVQnLCAnVEVYVEFSRUEnLCAnU0VMRUNUJ10uaW5kZXhPZih0YXJnZXQudGFnTmFtZSkgPiAtMSB8fCB0YXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG4iXX0=