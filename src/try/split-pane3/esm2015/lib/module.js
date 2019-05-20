import * as tslib_1 from "tslib";
var AngularSplitModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './component/split.component';
import { SplitAreaDirective } from './directive/splitArea.directive';
let AngularSplitModule = AngularSplitModule_1 = class AngularSplitModule {
    static forRoot() {
        return {
            ngModule: AngularSplitModule_1,
            providers: []
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFlckUsSUFBYSxrQkFBa0IsMEJBQS9CLE1BQWEsa0JBQWtCO0lBRXRCLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUTtRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFrQjtZQUM1QixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDO0NBRUYsQ0FBQTtBQWhCWSxrQkFBa0I7SUFiOUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osY0FBYztZQUNkLGtCQUFrQjtTQUNuQjtRQUNELE9BQU8sRUFBRTtZQUNQLGNBQWM7WUFDZCxrQkFBa0I7U0FDbkI7S0FDRixDQUFDO0dBQ1csa0JBQWtCLENBZ0I5QjtTQWhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU3BsaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU3BsaXRDb21wb25lbnQsXG4gICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU3BsaXRDb21wb25lbnQsXG4gICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTcGxpdE1vZHVsZSB7XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNwbGl0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNwbGl0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXVxuICAgIH07XG4gIH1cblxufVxuIl19