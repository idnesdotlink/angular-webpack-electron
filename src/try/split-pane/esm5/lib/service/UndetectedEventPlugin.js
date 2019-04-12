import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
/**
 * Credit to Michael Strobel from:
 * https://github.com/kryops/ng2-events
 */
var UndetectedEventPlugin = /** @class */ (function () {
    function UndetectedEventPlugin() {
    }
    UndetectedEventPlugin.prototype.supports = function (eventName) {
        return eventName.indexOf('as-split-undetected.') === 0;
    };
    UndetectedEventPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        var realEventName = eventName.slice(20);
        return this.manager.getZone().runOutsideAngular(function () { return _this.manager.addEventListener(element, realEventName, handler); });
    };
    UndetectedEventPlugin = tslib_1.__decorate([
        Injectable()
    ], UndetectedEventPlugin);
    return UndetectedEventPlugin;
}());
export { UndetectedEventPlugin };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5kZXRlY3RlZEV2ZW50UGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvVW5kZXRlY3RlZEV2ZW50UGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDOzs7R0FHRztBQUVIO0lBQUE7SUFZQSxDQUFDO0lBVEcsd0NBQVEsR0FBUixVQUFTLFNBQWlCO1FBQ3RCLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUEzRSxpQkFJQztRQUhHLElBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFMUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQTlELENBQThELENBQUMsQ0FBQztJQUMxSCxDQUFDO0lBWFEscUJBQXFCO1FBRGpDLFVBQVUsRUFBRTtPQUNBLHFCQUFxQixDQVlqQztJQUFELDRCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbi8qKlxuICogQ3JlZGl0IHRvIE1pY2hhZWwgU3Ryb2JlbCBmcm9tOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2tyeW9wcy9uZzItZXZlbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVbmRldGVjdGVkRXZlbnRQbHVnaW4ge1xuICAgIG1hbmFnZXI6IEV2ZW50TWFuYWdlcjtcblxuICAgIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBldmVudE5hbWUuaW5kZXhPZignYXMtc3BsaXQtdW5kZXRlY3RlZC4nKSA9PT0gMDtcbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgICAgIGNvbnN0IHJlYWxFdmVudE5hbWUgPSBldmVudE5hbWUuc2xpY2UoMjApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMubWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIHJlYWxFdmVudE5hbWUsIGhhbmRsZXIpKTtcbiAgICB9XG59XG4iXX0=