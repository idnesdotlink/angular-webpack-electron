import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatProgressBarModule, MatRippleModule } from '@angular/material';
import { MatPasswordStrengthComponent } from './component/mat-password-strength/mat-password-strength.component';
import { MatPasswordStrengthInfoComponent } from './component/mat-password-strength-info/mat-password-strength-info.component';
import { MatPassToggleVisibilityComponent } from './component/mat-pass-toggle-visibility/mat-pass-toggle-visibility.component';
// Export module's public API
export { MatPasswordStrengthComponent } from './component/mat-password-strength/mat-password-strength.component';
export { MatPasswordStrengthInfoComponent } from './component/mat-password-strength-info/mat-password-strength-info.component';
export { MatPassToggleVisibilityComponent } from './component/mat-pass-toggle-visibility/mat-pass-toggle-visibility.component';
var MatPasswordStrengthModule = /** @class */ (function () {
    function MatPasswordStrengthModule() {
    }
    MatPasswordStrengthModule_1 = MatPasswordStrengthModule;
    MatPasswordStrengthModule.forRoot = function () {
        return {
            ngModule: MatPasswordStrengthModule_1,
            providers: []
        };
    };
    var MatPasswordStrengthModule_1;
    MatPasswordStrengthModule = MatPasswordStrengthModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                MatProgressBarModule,
                MatCardModule,
                MatIconModule,
                MatRippleModule
            ],
            exports: [
                MatPasswordStrengthComponent,
                MatPasswordStrengthInfoComponent,
                MatPassToggleVisibilityComponent
            ],
            declarations: [
                MatPasswordStrengthComponent,
                MatPasswordStrengthInfoComponent,
                MatPassToggleVisibilityComponent
            ],
            entryComponents: [MatPassToggleVisibilityComponent]
        })
    ], MatPasswordStrengthModule);
    return MatPasswordStrengthModule;
}());
export { MatPasswordStrengthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJtb2R1bGUvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXRHLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1FQUFtRSxDQUFDO0FBQy9HLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDZFQUE2RSxDQUFDO0FBQzdILE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDZFQUE2RSxDQUFDO0FBRTdILDZCQUE2QjtBQUM3QixPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxtRUFBbUUsQ0FBQztBQUMvRyxPQUFPLEVBQ0wsZ0NBQWdDLEVBQ2pDLE1BQU0sNkVBQTZFLENBQUM7QUFDckYsT0FBTyxFQUFDLGdDQUFnQyxFQUFDLE1BQU0sNkVBQTZFLENBQUM7QUFzQjdIO0lBQUE7SUFPQSxDQUFDO2tDQVBZLHlCQUF5QjtJQUM3QixpQ0FBTyxHQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSwyQkFBeUI7WUFDbkMsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7SUFOVSx5QkFBeUI7UUFwQnJDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLG9CQUFvQjtnQkFDcEIsYUFBYTtnQkFDYixhQUFhO2dCQUNiLGVBQWU7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsNEJBQTRCO2dCQUM1QixnQ0FBZ0M7Z0JBQ2hDLGdDQUFnQzthQUNqQztZQUNELFlBQVksRUFBRTtnQkFDWiw0QkFBNEI7Z0JBQzVCLGdDQUFnQztnQkFDaEMsZ0NBQWdDO2FBQ2pDO1lBQ0QsZUFBZSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDcEQsQ0FBQztPQUNXLHlCQUF5QixDQU9yQztJQUFELGdDQUFDO0NBQUEsQUFQRCxJQU9DO1NBUFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50JztcbmltcG9ydCB7TWF0UGFzc3dvcmRTdHJlbmd0aEluZm9Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvL21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQge01hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQnO1xuXG4vLyBFeHBvcnQgbW9kdWxlJ3MgcHVibGljIEFQSVxuZXhwb3J0IHtNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudCc7XG5leHBvcnQge1xuICBNYXRQYXNzd29yZFN0cmVuZ3RoSW5mb0NvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby5jb21wb25lbnQnO1xuZXhwb3J0IHtNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50LFxuICAgIE1hdFBhc3N3b3JkU3RyZW5ndGhJbmZvQ29tcG9uZW50LFxuICAgIE1hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnQsXG4gICAgTWF0UGFzc3dvcmRTdHJlbmd0aEluZm9Db21wb25lbnQsXG4gICAgTWF0UGFzc1RvZ2dsZVZpc2liaWxpdHlDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTWF0UGFzc1RvZ2dsZVZpc2liaWxpdHlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3N3b3JkU3RyZW5ndGhNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hdFBhc3N3b3JkU3RyZW5ndGhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtdXG4gICAgfTtcbiAgfVxufVxuIl19