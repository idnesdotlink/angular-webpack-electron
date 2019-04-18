import * as tslib_1 from "tslib";
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuService } from './context-menu.service';
import { Directive, HostListener, Input } from '@angular/core';
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
export { ContextMenuAttachDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmF0dGFjaC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1lbnUuYXR0YWNoLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSy9ELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBSXJDLFlBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUksQ0FBQztJQUd4RCxhQUFhLENBQUMsS0FBaUI7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLEtBQUs7Z0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7YUFDOUIsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Q0FDRixDQUFBO0FBakJVO0lBQVIsS0FBSyxFQUFFOztzRUFBZ0M7QUFDL0I7SUFBUixLQUFLLEVBQUU7c0NBQXFCLG9CQUFvQjsrREFBQztBQUtsRDtJQURDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ1osVUFBVTs7K0RBVXJDO0FBakJVLDBCQUEwQjtJQUh0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtLQUMxQixDQUFDOzZDQUt3QyxrQkFBa0I7R0FKL0MsMEJBQTBCLENBa0J0QztTQWxCWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZXh0TWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY29udGV4dE1lbnVdJyxcbn0pXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVBdHRhY2hEaXJlY3RpdmUge1xuICBASW5wdXQoKSBwdWJsaWMgY29udGV4dE1lbnVTdWJqZWN0OiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb250ZXh0TWVudTogQ29udGV4dE1lbnVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXh0TWVudVNlcnZpY2U6IENvbnRleHRNZW51U2VydmljZSkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Db250ZXh0TWVudShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250ZXh0TWVudS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jb250ZXh0TWVudVNlcnZpY2Uuc2hvdy5uZXh0KHtcbiAgICAgICAgY29udGV4dE1lbnU6IHRoaXMuY29udGV4dE1lbnUsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBpdGVtOiB0aGlzLmNvbnRleHRNZW51U3ViamVjdCxcbiAgICAgIH0pO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIl19