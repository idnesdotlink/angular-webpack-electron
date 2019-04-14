import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
var InjectionService = /** @class */ (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService_1 = InjectionService;
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    InjectionService.setGlobalRootViewContainer = function (container) {
        InjectionService_1.globalRootViewContainer = container;
    };
    /**
     * Gets the root view container to inject the component to.
     *
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        var rootComponents = this.applicationRef.components;
        // fix cannot read length of undefined
        if (rootComponents) {
            if (rootComponents.length) {
                return rootComponents[0];
            }
        }
        if (this._container) {
            return this._container;
        }
        if (InjectionService_1.globalRootViewContainer) {
            return InjectionService_1.globalRootViewContainer;
        }
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param {any} container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        // the top most component root node has no `hostView`
        if (!componentRef.hostView) {
            return componentRef.element.nativeElement;
        }
        return componentRef.hostView.rootNodes[0];
    };
    /**
     * Gets the root component container html element.
     *
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function () {
        return this.getComponentRootNode(this.getRootViewContainer());
    };
    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        var e_1, _a, e_2, _b;
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                try {
                    for (var bindingKeys_1 = tslib_1.__values(bindingKeys), bindingKeys_1_1 = bindingKeys_1.next(); !bindingKeys_1_1.done; bindingKeys_1_1 = bindingKeys_1.next()) {
                        var bindingName = bindingKeys_1_1.value;
                        component.instance[bindingName] = bindings.inputs[bindingName];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (bindingKeys_1_1 && !bindingKeys_1_1.done && (_a = bindingKeys_1.return)) _a.call(bindingKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                try {
                    for (var eventKeys_1 = tslib_1.__values(eventKeys), eventKeys_1_1 = eventKeys_1.next(); !eventKeys_1_1.done; eventKeys_1_1 = eventKeys_1.next()) {
                        var eventName = eventKeys_1_1.value;
                        component.instance[eventName] = bindings.outputs[eventName];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (eventKeys_1_1 && !eventKeys_1_1.done && (_b = eventKeys_1.return)) _b.call(eventKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @template T
     * @param {Type<T>} componentClass
     * @param {*} [options={}]
     * @param {Element} [location=this.getRootViewContainerNode()]
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (location === void 0) { location = this.getRootViewContainerNode(); }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var componentRef = componentFactory.create(this.injector);
        var appRef = this.applicationRef;
        var componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentBindings(componentRef, bindings);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            appRef.detachView(componentRef.hostView);
        });
        // use the renderer to append the element for univseral support
        var renderer = componentRef.instance.renderer;
        renderer.appendChild(location, componentRootNode);
        return componentRef;
    };
    var InjectionService_1;
    InjectionService.globalRootViewContainer = null;
    InjectionService = InjectionService_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ApplicationRef,
            ComponentFactoryResolver,
            Injector])
    ], InjectionService);
    return InjectionService;
}());
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFFeEIsVUFBVSxFQUNWLFFBQVEsRUFJVCxNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7Ozs7OztHQU9HO0FBRUg7SUFlRSwwQkFDVSxjQUE4QixFQUM5Qix3QkFBa0QsRUFDbEQsUUFBa0I7UUFGbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6QixDQUFDO3lCQW5CTyxnQkFBZ0I7SUFHM0I7Ozs7O09BS0c7SUFDSSwyQ0FBMEIsR0FBakMsVUFBa0MsU0FBNEI7UUFDNUQsa0JBQWdCLENBQUMsdUJBQXVCLEdBQUcsU0FBUyxDQUFDO0lBQ3ZELENBQUM7SUFVRDs7Ozs7O09BTUc7SUFDSCwrQ0FBb0IsR0FBcEI7UUFDRSxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUV0RCxzQ0FBc0M7UUFDdEMsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUU7U0FDekQ7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FBRTtRQUNoRCxJQUFJLGtCQUFnQixDQUFDLHVCQUF1QixFQUFFO1lBQzVDLE9BQU8sa0JBQWdCLENBQUMsdUJBQXVCLENBQUM7U0FDakQ7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLDBGQUEwRixDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCwrQ0FBb0IsR0FBcEIsVUFBcUIsU0FBUztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILCtDQUFvQixHQUFwQixVQUFxQixZQUFpQjtRQUNwQyxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1NBQUU7UUFFMUUsT0FBUSxZQUFZLENBQUMsUUFBaUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO0lBQ3JGLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxtREFBd0IsR0FBeEI7UUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILG1EQUF3QixHQUF4QixVQUF5QixTQUE0QixFQUFFLFFBQWE7O1FBQ2xFLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDakMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7b0JBQ2hFLEtBQTBCLElBQUEsZ0JBQUEsaUJBQUEsV0FBVyxDQUFBLHdDQUFBLGlFQUFFO3dCQUFsQyxJQUFNLFdBQVcsd0JBQUE7d0JBQ3BCLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDaEU7Ozs7Ozs7OzthQUNGO1lBRUQsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7b0JBQy9ELEtBQXdCLElBQUEsY0FBQSxpQkFBQSxTQUFTLENBQUEsb0NBQUEsMkRBQUU7d0JBQTlCLElBQU0sU0FBUyxzQkFBQTt3QkFDbEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUM3RDs7Ozs7Ozs7O2FBQ0Y7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsMENBQWUsR0FBZixVQUNFLGNBQXVCLEVBQ3ZCLFFBQWtCLEVBQ2xCLFFBQW1EO1FBRG5ELHlCQUFBLEVBQUEsYUFBa0I7UUFDbEIseUJBQUEsRUFBQSxXQUFvQixJQUFJLENBQUMsd0JBQXdCLEVBQUU7UUFFbkQsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0YsSUFBTSxZQUFZLEdBQVEsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3hDLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxFLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRELE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCwrREFBK0Q7UUFDL0QsSUFBTSxRQUFRLEdBQWMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDM0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVsRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOztJQWpKTSx3Q0FBdUIsR0FBc0IsSUFBSSxDQUFDO0lBRDlDLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7aURBaUJlLGNBQWM7WUFDSix3QkFBd0I7WUFDeEMsUUFBUTtPQWxCakIsZ0JBQWdCLENBbUo1QjtJQUFELHVCQUFDO0NBQUEsQUFuSkQsSUFtSkM7U0FuSlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBUeXBlLFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogSW5qZWN0aW9uIHNlcnZpY2UgaXMgYSBoZWxwZXIgdG8gYXBwZW5kIGNvbXBvbmVudHNcbiAqIGR5bmFtaWNhbGx5IHRvIGEga25vd24gbG9jYXRpb24gaW4gdGhlIERPTSwgbW9zdFxuICogbm90ZWFibHkgZm9yIGRpYWxvZ3MvdG9vbHRpcHMgYXBwZW5kaW5nIHRvIGJvZHkuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEluamVjdGlvblNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluamVjdGlvblNlcnZpY2Uge1xuICBzdGF0aWMgZ2xvYmFsUm9vdFZpZXdDb250YWluZXI6IENvbXBvbmVudFJlZjxhbnk+ID0gbnVsbDtcblxuICAvKipcbiAgICogU2V0cyBhIGRlZmF1bHQgZ2xvYmFsIHJvb3QgdmlldyBjb250YWluZXIuIFRoaXMgaXMgdXNlZnVsIGZvclxuICAgKiB0aGluZ3MgbGlrZSBuZ1VwZ3JhZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBBcHBsaWNhdGlvblJlZiByb290LlxuICAgKlxuICAgKiBAcGFyYW0gY29udGFpbmVyXG4gICAqL1xuICBzdGF0aWMgc2V0R2xvYmFsUm9vdFZpZXdDb250YWluZXIoY29udGFpbmVyOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuICAgIEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluZXI6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb290IHZpZXcgY29udGFpbmVyIHRvIGluamVjdCB0aGUgY29tcG9uZW50IHRvLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Q29tcG9uZW50UmVmPGFueT59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBnZXRSb290Vmlld0NvbnRhaW5lcigpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgY29uc3Qgcm9vdENvbXBvbmVudHMgPSB0aGlzLmFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHM7XG5cbiAgICAvLyBmaXggY2Fubm90IHJlYWQgbGVuZ3RoIG9mIHVuZGVmaW5lZFxuICAgIGlmIChyb290Q29tcG9uZW50cykge1xuICAgICAgaWYgKHJvb3RDb21wb25lbnRzLmxlbmd0aCkgeyByZXR1cm4gcm9vdENvbXBvbmVudHNbMF07IH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29udGFpbmVyKSB7IHJldHVybiB0aGlzLl9jb250YWluZXI7IH1cbiAgICBpZiAoSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXI7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdWaWV3IENvbnRhaW5lciBub3QgZm91bmQhIG5nVXBncmFkZSBuZWVkcyB0byBtYW51YWxseSBzZXQgdGhpcyB2aWEgc2V0Um9vdFZpZXdDb250YWluZXIuJyk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IHJvb3QgdmlldyBjb250YWluZXIuIFRoaXMgaXMgdXNlZnVsIGZvclxuICAgKiB0aGluZ3MgbGlrZSBuZ1VwZ3JhZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBBcHBsaWNhdGlvblJlZiByb290LlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gY29udGFpbmVyXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBzZXRSb290Vmlld0NvbnRhaW5lcihjb250YWluZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaHRtbCBlbGVtZW50IGZvciBhIGNvbXBvbmVudCByZWYuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50UmVmPGFueT59IGNvbXBvbmVudFJlZlxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBnZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWY6IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgICAvLyB0aGUgdG9wIG1vc3QgY29tcG9uZW50IHJvb3Qgbm9kZSBoYXMgbm8gYGhvc3RWaWV3YFxuICAgIGlmICghY29tcG9uZW50UmVmLmhvc3RWaWV3KSB7IHJldHVybiBjb21wb25lbnRSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50OyB9XG5cbiAgICByZXR1cm4gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvb3QgY29tcG9uZW50IGNvbnRhaW5lciBodG1sIGVsZW1lbnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGdldFJvb3RWaWV3Q29udGFpbmVyTm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUodGhpcy5nZXRSb290Vmlld0NvbnRhaW5lcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0cyB0aGUgYmluZGluZ3Mgb250byB0aGUgY29tcG9uZW50XG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50UmVmPGFueT59IGNvbXBvbmVudFxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAgICogQHJldHVybnMge0NvbXBvbmVudFJlZjxhbnk+fVxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHJvamVjdENvbXBvbmVudEJpbmRpbmdzKGNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4sIGJpbmRpbmdzOiBhbnkpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgaWYgKGJpbmRpbmdzKSB7XG4gICAgICBpZiAoYmluZGluZ3MuaW5wdXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYmluZGluZ0tleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiaW5kaW5ncy5pbnB1dHMpO1xuICAgICAgICBmb3IgKGNvbnN0IGJpbmRpbmdOYW1lIG9mIGJpbmRpbmdLZXlzKSB7XG4gICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW2JpbmRpbmdOYW1lXSA9IGJpbmRpbmdzLmlucHV0c1tiaW5kaW5nTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGJpbmRpbmdzLm91dHB1dHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBldmVudEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiaW5kaW5ncy5vdXRwdXRzKTtcbiAgICAgICAgZm9yIChjb25zdCBldmVudE5hbWUgb2YgZXZlbnRLZXlzKSB7XG4gICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW2V2ZW50TmFtZV0gPSBiaW5kaW5ncy5vdXRwdXRzW2V2ZW50TmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBjb21wb25lbnQgdG8gYSBhZGphY2VudCBsb2NhdGlvblxuICAgKlxuICAgKiBAdGVtcGxhdGUgVFxuICAgKiBAcGFyYW0ge1R5cGU8VD59IGNvbXBvbmVudENsYXNzXG4gICAqIEBwYXJhbSB7Kn0gW29wdGlvbnM9e31dXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gW2xvY2F0aW9uPXRoaXMuZ2V0Um9vdFZpZXdDb250YWluZXJOb2RlKCldXG4gICAqIEByZXR1cm5zIHtDb21wb25lbnRSZWY8YW55Pn1cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGFwcGVuZENvbXBvbmVudDxUPihcbiAgICBjb21wb25lbnRDbGFzczogVHlwZTxUPixcbiAgICBiaW5kaW5nczogYW55ID0ge30sXG4gICAgbG9jYXRpb246IEVsZW1lbnQgPSB0aGlzLmdldFJvb3RWaWV3Q29udGFpbmVyTm9kZSgpXG4gICk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50Q2xhc3MpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZjogYW55ID0gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgY29uc3QgYXBwUmVmOiBhbnkgPSB0aGlzLmFwcGxpY2F0aW9uUmVmO1xuICAgIGNvbnN0IGNvbXBvbmVudFJvb3ROb2RlID0gdGhpcy5nZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWYpO1xuXG4gICAgLy8gcHJvamVjdCB0aGUgb3B0aW9ucyBwYXNzZWQgdG8gdGhlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIHRoaXMucHJvamVjdENvbXBvbmVudEJpbmRpbmdzKGNvbXBvbmVudFJlZiwgYmluZGluZ3MpO1xuXG4gICAgYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIGNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgYXBwUmVmLmRldGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB9KTtcblxuICAgIC8vIHVzZSB0aGUgcmVuZGVyZXIgdG8gYXBwZW5kIHRoZSBlbGVtZW50IGZvciB1bml2c2VyYWwgc3VwcG9ydFxuICAgIGNvbnN0IHJlbmRlcmVyOiBSZW5kZXJlcjIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UucmVuZGVyZXI7XG4gICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQobG9jYXRpb24sIGNvbXBvbmVudFJvb3ROb2RlKTtcblxuICAgIHJldHVybiBjb21wb25lbnRSZWY7XG4gIH1cbn1cbiJdfQ==