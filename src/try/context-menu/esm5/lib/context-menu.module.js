import * as tslib_1 from "tslib";
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuAttachDirective } from './context-menu.attach.directive';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuItemDirective } from './context-menu.item.directive';
import { ContextMenuService } from './context-menu.service';
import { CONTEXT_MENU_OPTIONS } from './tokens';
import { ContextMenuContentComponent } from './context-menu.content.component';
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
    ContextMenuModule = ContextMenuModule_1 = tslib_1.__decorate([
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
export { ContextMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBc0IvRTtJQUFBO0lBYUEsQ0FBQzswQkFiWSxpQkFBaUI7SUFDZCx5QkFBTyxHQUFyQixVQUFzQixPQUE2QjtRQUNqRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCO2dCQUNsQjtvQkFDRSxPQUFPLEVBQUUsb0JBQW9CO29CQUM3QixRQUFRLEVBQUUsT0FBTztpQkFDbEI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztJQVpVLGlCQUFpQjtRQXBCN0IsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLDBCQUEwQjtnQkFDMUIsb0JBQW9CO2dCQUNwQiwyQkFBMkI7Z0JBQzNCLHdCQUF3QjthQUN6QjtZQUNELGVBQWUsRUFBRTtnQkFDZiwyQkFBMkI7YUFDNUI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsMEJBQTBCO2dCQUMxQixvQkFBb0I7Z0JBQ3BCLHdCQUF3QjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGFBQWE7YUFDZDtTQUNGLENBQUM7T0FDVyxpQkFBaUIsQ0FhN0I7SUFBRCx3QkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udGV4dE1lbnVBdHRhY2hEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtbWVudS5hdHRhY2guZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRleHRNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IElDb250ZXh0TWVudU9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBDT05URVhUX01FTlVfT1BUSU9OUyB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IENvbnRleHRNZW51Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1tZW51LmNvbnRlbnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ29udGV4dE1lbnVBdHRhY2hEaXJlY3RpdmUsXG4gICAgQ29udGV4dE1lbnVDb21wb25lbnQsXG4gICAgQ29udGV4dE1lbnVDb250ZW50Q29tcG9uZW50LFxuICAgIENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgQ29udGV4dE1lbnVDb250ZW50Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29udGV4dE1lbnVBdHRhY2hEaXJlY3RpdmUsXG4gICAgQ29udGV4dE1lbnVDb21wb25lbnQsXG4gICAgQ29udGV4dE1lbnVJdGVtRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51TW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KG9wdGlvbnM/OiBJQ29udGV4dE1lbnVPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb250ZXh0TWVudU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05URVhUX01FTlVfT1BUSU9OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19