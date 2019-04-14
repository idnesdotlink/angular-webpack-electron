import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { InjectionRegistery } from './injection-registery.service';
import { TooltipContentComponent } from './tooltip.component';
var TooltipService = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipService, _super);
    function TooltipService(injectionService) {
        var _this = _super.call(this, injectionService) || this;
        _this.injectionService = injectionService;
        _this.type = TooltipContentComponent;
        return _this;
    }
    TooltipService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [InjectionService])
    ], TooltipService);
    return TooltipService;
}(InjectionRegistery));
export { TooltipService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzlEO0lBQW9DLDBDQUFrQjtJQUlwRCx3QkFBbUIsZ0JBQWtDO1FBQXJELFlBQ0Usa0JBQU0sZ0JBQWdCLENBQUMsU0FDeEI7UUFGa0Isc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUZyRCxVQUFJLEdBQVEsdUJBQXVCLENBQUM7O0lBSXBDLENBQUM7SUFOVSxjQUFjO1FBRDFCLFVBQVUsRUFBRTtpREFLMEIsZ0JBQWdCO09BSjFDLGNBQWMsQ0FRMUI7SUFBRCxxQkFBQztDQUFBLEFBUkQsQ0FBb0Msa0JBQWtCLEdBUXJEO1NBUlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGlvblNlcnZpY2UgfSBmcm9tICcuL2luamVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEluamVjdGlvblJlZ2lzdGVyeSB9IGZyb20gJy4vaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFRvb2x0aXBDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb29sdGlwU2VydmljZSBleHRlbmRzIEluamVjdGlvblJlZ2lzdGVyeSB7XG5cbiAgdHlwZTogYW55ID0gVG9vbHRpcENvbnRlbnRDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluamVjdGlvblNlcnZpY2U6IEluamVjdGlvblNlcnZpY2UpIHtcbiAgICBzdXBlcihpbmplY3Rpb25TZXJ2aWNlKTtcbiAgfVxuXG59XG4iXX0=