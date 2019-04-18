import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuService } from './context-menu.service';
export declare class ContextMenuAttachDirective {
    private contextMenuService;
    contextMenuSubject: any;
    contextMenu: ContextMenuComponent;
    constructor(contextMenuService: ContextMenuService);
    onContextMenu(event: MouseEvent): void;
}
