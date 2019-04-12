import * as tslib_1 from "tslib";
var AngularSplitModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { SplitComponent } from './component/split.component';
import { SplitAreaDirective } from './directive/splitArea.directive';
import { UndetectedEventPlugin } from "./service/UndetectedEventPlugin";
let AngularSplitModule = AngularSplitModule_1 = class AngularSplitModule {
    static forRoot() {
        return {
            ngModule: AngularSplitModule_1,
            providers: [{
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: UndetectedEventPlugin,
                    multi: true
                }]
        };
    }
    static forChild() {
        return {
            ngModule: AngularSplitModule_1,
            providers: []
        };
    }
};
AngularSplitModule = AngularSplitModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            SplitComponent,
            SplitAreaDirective,
        ],
        exports: [
            SplitComponent,
            SplitAreaDirective,
        ]
    })
], AngularSplitModule);
export { AngularSplitModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFleEUsSUFBYSxrQkFBa0IsMEJBQS9CLE1BQWEsa0JBQWtCO0lBRXBCLE1BQU0sQ0FBQyxPQUFPO1FBQ2pCLE9BQU87WUFDSCxRQUFRLEVBQUUsb0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxDQUFDO29CQUNSLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUUsb0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7SUFDTixDQUFDO0NBRUosQ0FBQTtBQXBCWSxrQkFBa0I7SUFiOUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsY0FBYztZQUNkLGtCQUFrQjtTQUNyQjtRQUNELE9BQU8sRUFBRTtZQUNMLGNBQWM7WUFDZCxrQkFBa0I7U0FDckI7S0FDSixDQUFDO0dBQ1csa0JBQWtCLENBb0I5QjtTQXBCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVWRU5UX01BTkFHRVJfUExVR0lOUyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBTcGxpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9zcGxpdEFyZWEuZGlyZWN0aXZlJztcbmltcG9ydCB7IFVuZGV0ZWN0ZWRFdmVudFBsdWdpbiB9IGZyb20gXCIuL3NlcnZpY2UvVW5kZXRlY3RlZEV2ZW50UGx1Z2luXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTcGxpdENvbXBvbmVudCxcbiAgICAgICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTcGxpdENvbXBvbmVudCxcbiAgICAgICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhclNwbGl0TW9kdWxlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBbmd1bGFyU3BsaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgICAgICAgICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgICAgICAgICAgICAgIHVzZUNsYXNzOiBVbmRldGVjdGVkRXZlbnRQbHVnaW4sXG4gICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBbmd1bGFyU3BsaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXX0=