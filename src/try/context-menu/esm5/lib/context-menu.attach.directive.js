import * as tslib_1 from "tslib";
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuService } from './context-menu.service';
import { Directive, HostListener, Input } from '@angular/core';
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuAttachDirective.prototype, "contextMenuSubject", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ContextMenuComponent)
    ], ContextMenuAttachDirective.prototype, "contextMenu", void 0);
    tslib_1.__decorate([
        HostListener('contextmenu', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [MouseEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ContextMenuAttachDirective.prototype, "onContextMenu", null);
    ContextMenuAttachDirective = tslib_1.__decorate([
        Directive({
            selector: '[contextMenu]',
        }),
        tslib_1.__metadata("design:paramtypes", [ContextMenuService])
    ], ContextMenuAttachDirective);
    return ContextMenuAttachDirective;
}());
export { ContextMenuAttachDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmF0dGFjaC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1lbnUuYXR0YWNoLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSy9EO0lBSUUsb0NBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUksQ0FBQztJQUd4RCxrREFBYSxHQUFwQixVQUFxQixLQUFpQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsS0FBSyxPQUFBO2dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCO2FBQzlCLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBaEJRO1FBQVIsS0FBSyxFQUFFOzswRUFBZ0M7SUFDL0I7UUFBUixLQUFLLEVBQUU7MENBQXFCLG9CQUFvQjttRUFBQztJQUtsRDtRQURDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7aURBQ1osVUFBVTs7bUVBVXJDO0lBakJVLDBCQUEwQjtRQUh0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtTQUMxQixDQUFDO2lEQUt3QyxrQkFBa0I7T0FKL0MsMEJBQTBCLENBa0J0QztJQUFELGlDQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FsQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dE1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NvbnRleHRNZW51XScsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51QXR0YWNoRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgcHVibGljIGNvbnRleHRNZW51U3ViamVjdDogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgY29udGV4dE1lbnU6IENvbnRleHRNZW51Q29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dE1lbnVTZXJ2aWNlOiBDb250ZXh0TWVudVNlcnZpY2UpIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uQ29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dE1lbnUuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLnNob3cubmV4dCh7XG4gICAgICAgIGNvbnRleHRNZW51OiB0aGlzLmNvbnRleHRNZW51LFxuICAgICAgICBldmVudCxcbiAgICAgICAgaXRlbTogdGhpcy5jb250ZXh0TWVudVN1YmplY3QsXG4gICAgICB9KTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==