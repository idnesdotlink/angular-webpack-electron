import { CloseLeafMenuEvent, IContextMenuClickEvent } from './context-menu.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ContextMenuItemDirective } from './context-menu.item.directive';
import { IContextMenuOptions } from './options';
export interface ILinkConfig {
    click: (item: any, $event?: MouseEvent) => void;
    enabled?: (item: any) => boolean;
    html: (item: any) => string;
}
export declare class ContextMenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
    private changeDetector;
    private elementRef;
    private options;
    renderer: Renderer2;
    menuItems: ContextMenuItemDirective[];
    item: any;
    event: MouseEvent | KeyboardEvent;
    parentContextMenu: ContextMenuContentComponent;
    menuClass: string;
    overlay: OverlayRef;
    isLeaf: boolean;
    execute: EventEmitter<{
        event: MouseEvent | KeyboardEvent;
        item: any;
        menuItem: ContextMenuItemDirective;
    }>;
    openSubMenu: EventEmitter<IContextMenuClickEvent>;
    closeLeafMenu: EventEmitter<CloseLeafMenuEvent>;
    closeAllMenus: EventEmitter<{
        event: MouseEvent;
    }>;
    menuElement: ElementRef;
    menuItemElements: QueryList<ElementRef>;
    autoFocus: boolean;
    useBootstrap4: boolean;
    private _keyManager;
    private subscription;
    constructor(changeDetector: ChangeDetectorRef, elementRef: ElementRef, options: IContextMenuOptions, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    stopEvent($event: MouseEvent): void;
    isMenuItemEnabled(menuItem: ContextMenuItemDirective): boolean;
    isMenuItemVisible(menuItem: ContextMenuItemDirective): boolean;
    evaluateIfFunction(value: any): any;
    isDisabled(link: ILinkConfig): boolean;
    onKeyEvent(event: KeyboardEvent): void;
    keyboardOpenSubMenu(event?: KeyboardEvent): void;
    keyboardMenuItemSelect(event?: KeyboardEvent): void;
    onCloseLeafMenu(event: KeyboardEvent): void;
    closeMenu(event: MouseEvent): void;
    onOpenSubMenu(menuItem: ContextMenuItemDirective, event?: MouseEvent | KeyboardEvent): void;
    onMenuItemSelect(menuItem: ContextMenuItemDirective, event: MouseEvent | KeyboardEvent): void;
    private cancelEvent;
}
