import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { SplitComponent } from './component/split.component';
import { SplitAreaDirective } from './directive/splitArea.directive';
import { UndetectedEventPlugin } from "./service/UndetectedEventPlugin";
var AngularSplitModule = /** @class */ (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule_1 = AngularSplitModule;
    AngularSplitModule.forRoot = function () {
        return {
            ngModule: AngularSplitModule_1,
            providers: [{
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: UndetectedEventPlugin,
                    multi: true
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWV4RTtJQUFBO0lBb0JBLENBQUM7MkJBcEJZLGtCQUFrQjtJQUViLDBCQUFPLEdBQXJCO1FBQ0ksT0FBTztZQUNILFFBQVEsRUFBRSxvQkFBa0I7WUFDNUIsU0FBUyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLHFCQUFxQjtvQkFDOUIsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRWEsMkJBQVEsR0FBdEI7UUFDSSxPQUFPO1lBQ0gsUUFBUSxFQUFFLG9CQUFrQjtZQUM1QixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO0lBQ04sQ0FBQzs7SUFsQlEsa0JBQWtCO1FBYjlCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsY0FBYztnQkFDZCxrQkFBa0I7YUFDckI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYztnQkFDZCxrQkFBa0I7YUFDckI7U0FDSixDQUFDO09BQ1csa0JBQWtCLENBb0I5QjtJQUFELHlCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFVkVOVF9NQU5BR0VSX1BMVUdJTlMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgU3BsaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBVbmRldGVjdGVkRXZlbnRQbHVnaW4gfSBmcm9tIFwiLi9zZXJ2aWNlL1VuZGV0ZWN0ZWRFdmVudFBsdWdpblwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3BsaXRDb21wb25lbnQsXG4gICAgICAgIFNwbGl0QXJlYURpcmVjdGl2ZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3BsaXRDb21wb25lbnQsXG4gICAgICAgIFNwbGl0QXJlYURpcmVjdGl2ZSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTcGxpdE1vZHVsZSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQW5ndWxhclNwbGl0TW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICAgICAgICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICAgICAgICAgICAgICB1c2VDbGFzczogVW5kZXRlY3RlZEV2ZW50UGx1Z2luLFxuICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQW5ndWxhclNwbGl0TW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXVxuICAgICAgICB9O1xuICAgIH1cblxufVxuIl19