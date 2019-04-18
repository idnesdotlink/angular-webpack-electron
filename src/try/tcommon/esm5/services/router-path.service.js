import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
var RouterPathService = /** @class */ (function () {
    function RouterPathService(_router) {
        this._router = _router;
        this._router.events.pipe(filter(function (e) { return e instanceof RoutesRecognized; }), pairwise()).subscribe(function (e) {
            RouterPathService_1._previousRoute = e[0].urlAfterRedirects;
        });
    }
    RouterPathService_1 = RouterPathService;
    /*
    * Utility function to get the route the user previously went to
    * good for use in a "back button"
    */
    RouterPathService.prototype.getPreviousRoute = function () {
        return RouterPathService_1._previousRoute;
    };
    var RouterPathService_1;
    RouterPathService._previousRoute = '/';
    RouterPathService = RouterPathService_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], RouterPathService);
    return RouterPathService;
}());
export { RouterPathService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXBhdGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGNvbW1vbi8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3JvdXRlci1wYXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNELE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbEQ7SUFFRSwyQkFBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN0QixNQUFNLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLFlBQVksZ0JBQWdCLEVBQTdCLENBQTZCLENBQUMsRUFDakQsUUFBUSxFQUFFLENBQ1gsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFRO1lBQ25CLG1CQUFpQixDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzBCQVRVLGlCQUFpQjtJQVc1Qjs7O01BR0U7SUFDRiw0Q0FBZ0IsR0FBaEI7UUFDRSxPQUFPLG1CQUFpQixDQUFDLGNBQWMsQ0FBQztJQUMxQyxDQUFDOztJQWhCWSxnQ0FBYyxHQUFXLEdBQUcsQ0FBQztJQUQvQixpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO2lEQUdrQixNQUFNO09BRnhCLGlCQUFpQixDQWtCN0I7SUFBRCx3QkFBQztDQUFBLEFBbEJELElBa0JDO1NBbEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGVzUmVjb2duaXplZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IGZpbHRlciwgcGFpcndpc2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3V0ZXJQYXRoU2VydmljZSB7XG5wcml2YXRlIHN0YXRpYyBfcHJldmlvdXNSb3V0ZTogc3RyaW5nID0gJy8nO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMuX3JvdXRlci5ldmVudHMucGlwZShcbiAgICAgIGZpbHRlcigoZTogYW55KSA9PiBlIGluc3RhbmNlb2YgUm91dGVzUmVjb2duaXplZCksXG4gICAgICBwYWlyd2lzZSgpLFxuICAgICkuc3Vic2NyaWJlKChlOiBhbnlbXSkgPT4ge1xuICAgICAgUm91dGVyUGF0aFNlcnZpY2UuX3ByZXZpb3VzUm91dGUgPSBlWzBdLnVybEFmdGVyUmVkaXJlY3RzO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGdldCB0aGUgcm91dGUgdGhlIHVzZXIgcHJldmlvdXNseSB3ZW50IHRvXG4gICogZ29vZCBmb3IgdXNlIGluIGEgXCJiYWNrIGJ1dHRvblwiXG4gICovXG4gIGdldFByZXZpb3VzUm91dGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUm91dGVyUGF0aFNlcnZpY2UuX3ByZXZpb3VzUm91dGU7XG4gIH1cbn1cbiJdfQ==