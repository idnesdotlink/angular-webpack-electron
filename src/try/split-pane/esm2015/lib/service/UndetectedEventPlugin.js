import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
/**
 * Credit to Michael Strobel from:
 * https://github.com/kryops/ng2-events
 */
let UndetectedEventPlugin = class UndetectedEventPlugin {
    supports(eventName) {
        return eventName.indexOf('as-split-undetected.') === 0;
    }
    addEventListener(element, eventName, handler) {
        const realEventName = eventName.slice(20);
        return this.manager.getZone().runOutsideAngular(() => this.manager.addEventListener(element, realEventName, handler));
    }
};
UndetectedEventPlugin = tslib_1.__decorate([
    Injectable()
], UndetectedEventPlugin);
export { UndetectedEventPlugin };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5kZXRlY3RlZEV2ZW50UGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvVW5kZXRlY3RlZEV2ZW50UGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDOzs7R0FHRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRzlCLFFBQVEsQ0FBQyxTQUFpQjtRQUN0QixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN2RSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxSCxDQUFDO0NBQ0osQ0FBQTtBQVpZLHFCQUFxQjtJQURqQyxVQUFVLEVBQUU7R0FDQSxxQkFBcUIsQ0FZakM7U0FaWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBDcmVkaXQgdG8gTWljaGFlbCBTdHJvYmVsIGZyb206XG4gKiBodHRwczovL2dpdGh1Yi5jb20va3J5b3BzL25nMi1ldmVudHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVuZGV0ZWN0ZWRFdmVudFBsdWdpbiB7XG4gICAgbWFuYWdlcjogRXZlbnRNYW5hZ2VyO1xuXG4gICAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50TmFtZS5pbmRleE9mKCdhcy1zcGxpdC11bmRldGVjdGVkLicpID09PSAwO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAgICAgY29uc3QgcmVhbEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5zbGljZSgyMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXRab25lKCkucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5tYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgcmVhbEV2ZW50TmFtZSwgaGFuZGxlcikpO1xuICAgIH1cbn1cbiJdfQ==