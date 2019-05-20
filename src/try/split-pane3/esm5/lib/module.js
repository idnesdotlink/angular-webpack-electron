import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './component/split.component';
import { SplitAreaDirective } from './directive/splitArea.directive';
var AngularSplitModule = /** @class */ (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule_1 = AngularSplitModule;
    AngularSplitModule.forRoot = function () {
        return {
            ngModule: AngularSplitModule_1,
            providers: []
        };
    };
    AngularSplitModule.forChild = function () {
        return {
            ngModule: AngularSplitModule_1,
            providers: []
        };
    };
    var AngularSplitModule_1;
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
    return AngularSplitModule;
}());
export { AngularSplitModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWVyRTtJQUFBO0lBZ0JBLENBQUM7MkJBaEJZLGtCQUFrQjtJQUVmLDBCQUFPLEdBQXJCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBa0I7WUFDNUIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVhLDJCQUFRLEdBQXRCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBa0I7WUFDNUIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7SUFkVSxrQkFBa0I7UUFiOUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDWixjQUFjO2dCQUNkLGtCQUFrQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxjQUFjO2dCQUNkLGtCQUFrQjthQUNuQjtTQUNGLENBQUM7T0FDVyxrQkFBa0IsQ0FnQjlCO0lBQUQseUJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU3BsaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU3BsaXRDb21wb25lbnQsXG4gICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU3BsaXRDb21wb25lbnQsXG4gICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTcGxpdE1vZHVsZSB7XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNwbGl0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNwbGl0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXVxuICAgIH07XG4gIH1cblxufVxuIl19