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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXBhdGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9zZXJ2aWNlcy9yb3V0ZXItcGF0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2xEO0lBRUUsMkJBQW9CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEIsTUFBTSxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxZQUFZLGdCQUFnQixFQUE3QixDQUE2QixDQUFDLEVBQ2pELFFBQVEsRUFBRSxDQUNYLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBUTtZQUNuQixtQkFBaUIsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzswQkFUVSxpQkFBaUI7SUFXNUI7OztNQUdFO0lBQ0YsNENBQWdCLEdBQWhCO1FBQ0UsT0FBTyxtQkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQzs7SUFoQlksZ0NBQWMsR0FBVyxHQUFHLENBQUM7SUFEL0IsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtpREFHa0IsTUFBTTtPQUZ4QixpQkFBaUIsQ0FrQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlc1JlY29nbml6ZWQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBmaWx0ZXIsIHBhaXJ3aXNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm91dGVyUGF0aFNlcnZpY2Uge1xucHJpdmF0ZSBzdGF0aWMgX3ByZXZpb3VzUm91dGU6IHN0cmluZyA9ICcvJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICBmaWx0ZXIoKGU6IGFueSkgPT4gZSBpbnN0YW5jZW9mIFJvdXRlc1JlY29nbml6ZWQpLFxuICAgICAgcGFpcndpc2UoKSxcbiAgICApLnN1YnNjcmliZSgoZTogYW55W10pID0+IHtcbiAgICAgIFJvdXRlclBhdGhTZXJ2aWNlLl9wcmV2aW91c1JvdXRlID0gZVswXS51cmxBZnRlclJlZGlyZWN0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICogVXRpbGl0eSBmdW5jdGlvbiB0byBnZXQgdGhlIHJvdXRlIHRoZSB1c2VyIHByZXZpb3VzbHkgd2VudCB0b1xuICAqIGdvb2QgZm9yIHVzZSBpbiBhIFwiYmFjayBidXR0b25cIlxuICAqL1xuICBnZXRQcmV2aW91c1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJvdXRlclBhdGhTZXJ2aWNlLl9wcmV2aW91c1JvdXRlO1xuICB9XG59XG4iXX0=