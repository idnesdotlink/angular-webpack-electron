import * as tslib_1 from "tslib";
var ContextMenuModule_1;
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuAttachDirective } from './context-menu.attach.directive';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuItemDirective } from './context-menu.item.directive';
import { ContextMenuService } from './context-menu.service';
import { CONTEXT_MENU_OPTIONS } from './tokens';
import { ContextMenuContentComponent } from './context-menu.content.component';
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
export { ContextMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQXNCL0UsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBNkI7UUFDakQsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULGtCQUFrQjtnQkFDbEI7b0JBQ0UsT0FBTyxFQUFFLG9CQUFvQjtvQkFDN0IsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFiWSxpQkFBaUI7SUFwQjdCLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDBCQUEwQjtZQUMxQixvQkFBb0I7WUFDcEIsMkJBQTJCO1lBQzNCLHdCQUF3QjtTQUN6QjtRQUNELGVBQWUsRUFBRTtZQUNmLDJCQUEyQjtTQUM1QjtRQUNELE9BQU8sRUFBRTtZQUNQLDBCQUEwQjtZQUMxQixvQkFBb0I7WUFDcEIsd0JBQXdCO1NBQ3pCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLGFBQWE7U0FDZDtLQUNGLENBQUM7R0FDVyxpQkFBaUIsQ0FhN0I7U0FiWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRleHRNZW51QXR0YWNoRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuYXR0YWNoLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250ZXh0TWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtbWVudS5pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJQ29udGV4dE1lbnVPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IENvbnRleHRNZW51U2VydmljZSB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ09OVEVYVF9NRU5VX09QVElPTlMgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBDb250ZXh0TWVudUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbWVudS5jb250ZW50LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENvbnRleHRNZW51QXR0YWNoRGlyZWN0aXZlLFxuICAgIENvbnRleHRNZW51Q29tcG9uZW50LFxuICAgIENvbnRleHRNZW51Q29udGVudENvbXBvbmVudCxcbiAgICBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmUsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIENvbnRleHRNZW51Q29udGVudENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbnRleHRNZW51QXR0YWNoRGlyZWN0aXZlLFxuICAgIENvbnRleHRNZW51Q29tcG9uZW50LFxuICAgIENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogSUNvbnRleHRNZW51T3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29udGV4dE1lbnVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ09OVEVYVF9NRU5VX09QVElPTlMsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==