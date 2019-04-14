import * as tslib_1 from "tslib";
var InjectionService_1;
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
let InjectionService = InjectionService_1 = class InjectionService {
    constructor(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    static setGlobalRootViewContainer(container) {
        InjectionService_1.globalRootViewContainer = container;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    getRootViewContainer() {
        const rootComponents = this.applicationRef.components;
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
    }
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param {any} container
     *
     * @memberOf InjectionService
     */
    setRootViewContainer(container) {
        this._container = container;
    }
    /**
     * Gets the html element for a component ref.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    getComponentRootNode(componentRef) {
        // the top most component root node has no `hostView`
        if (!componentRef.hostView) {
            return componentRef.element.nativeElement;
        }
        return componentRef.hostView.rootNodes[0];
    }
    /**
     * Gets the root component container html element.
     *
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    getRootViewContainerNode() {
        return this.getComponentRootNode(this.getRootViewContainer());
    }
    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    projectComponentBindings(component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (const bindingName of bindingKeys) {
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (const eventName of eventKeys) {
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    }
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
    appendComponent(componentClass, bindings = {}, location = this.getRootViewContainerNode()) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const componentRef = componentFactory.create(this.injector);
        const appRef = this.applicationRef;
        const componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentBindings(componentRef, bindings);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            appRef.detachView(componentRef.hostView);
        });
        // use the renderer to append the element for univseral support
        const renderer = componentRef.instance.renderer;
        renderer.appendChild(location, componentRootNode);
        return componentRef;
    }
};
InjectionService.globalRootViewContainer = null;
InjectionService = InjectionService_1 = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ApplicationRef,
        ComponentFactoryResolver,
        Injector])
], InjectionService);
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBRXhCLFVBQVUsRUFDVixRQUFRLEVBSVQsTUFBTSxlQUFlLENBQUM7QUFFdkI7Ozs7Ozs7R0FPRztBQUVILElBQWEsZ0JBQWdCLHdCQUE3QixNQUFhLGdCQUFnQjtJQWUzQixZQUNVLGNBQThCLEVBQzlCLHdCQUFrRCxFQUNsRCxRQUFrQjtRQUZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7SUFoQko7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsMEJBQTBCLENBQUMsU0FBNEI7UUFDNUQsa0JBQWdCLENBQUMsdUJBQXVCLEdBQUcsU0FBUyxDQUFDO0lBQ3ZELENBQUM7SUFVRDs7Ozs7O09BTUc7SUFDSCxvQkFBb0I7UUFDbEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7UUFFdEQsc0NBQXNDO1FBQ3RDLElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFBRSxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUFFO1NBQ3pEO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQUU7UUFDaEQsSUFBSSxrQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRTtZQUM1QyxPQUFPLGtCQUFnQixDQUFDLHVCQUF1QixDQUFDO1NBQ2pEO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwRkFBMEYsQ0FBQyxDQUFDO0lBQzlH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QjtTQW5KWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIFR5cGUsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBJbmplY3Rpb24gc2VydmljZSBpcyBhIGhlbHBlciB0byBhcHBlbmQgY29tcG9uZW50c1xuICogZHluYW1pY2FsbHkgdG8gYSBrbm93biBsb2NhdGlvbiBpbiB0aGUgRE9NLCBtb3N0XG4gKiBub3RlYWJseSBmb3IgZGlhbG9ncy90b29sdGlwcyBhcHBlbmRpbmcgdG8gYm9keS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgSW5qZWN0aW9uU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5qZWN0aW9uU2VydmljZSB7XG4gIHN0YXRpYyBnbG9iYWxSb290Vmlld0NvbnRhaW5lcjogQ29tcG9uZW50UmVmPGFueT4gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTZXRzIGEgZGVmYXVsdCBnbG9iYWwgcm9vdCB2aWV3IGNvbnRhaW5lci4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gICAqIHRoaW5ncyBsaWtlIG5nVXBncmFkZSB0aGF0IGRvZXNuJ3QgaGF2ZSBhIEFwcGxpY2F0aW9uUmVmIHJvb3QuXG4gICAqXG4gICAqIEBwYXJhbSBjb250YWluZXJcbiAgICovXG4gIHN0YXRpYyBzZXRHbG9iYWxSb290Vmlld0NvbnRhaW5lcihjb250YWluZXI6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5lcjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvb3QgdmlldyBjb250YWluZXIgdG8gaW5qZWN0IHRoZSBjb21wb25lbnQgdG8uXG4gICAqXG4gICAqIEByZXR1cm5zIHtDb21wb25lbnRSZWY8YW55Pn1cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGdldFJvb3RWaWV3Q29udGFpbmVyKCk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBjb25zdCByb290Q29tcG9uZW50cyA9IHRoaXMuYXBwbGljYXRpb25SZWYuY29tcG9uZW50cztcblxuICAgIC8vIGZpeCBjYW5ub3QgcmVhZCBsZW5ndGggb2YgdW5kZWZpbmVkXG4gICAgaWYgKHJvb3RDb21wb25lbnRzKSB7XG4gICAgICBpZiAocm9vdENvbXBvbmVudHMubGVuZ3RoKSB7IHJldHVybiByb290Q29tcG9uZW50c1swXTsgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb250YWluZXIpIHsgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjsgfVxuICAgIGlmIChJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lcjtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZpZXcgQ29udGFpbmVyIG5vdCBmb3VuZCEgbmdVcGdyYWRlIG5lZWRzIHRvIG1hbnVhbGx5IHNldCB0aGlzIHZpYSBzZXRSb290Vmlld0NvbnRhaW5lci4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGRlZmF1bHQgcm9vdCB2aWV3IGNvbnRhaW5lci4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gICAqIHRoaW5ncyBsaWtlIG5nVXBncmFkZSB0aGF0IGRvZXNuJ3QgaGF2ZSBhIEFwcGxpY2F0aW9uUmVmIHJvb3QuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBjb250YWluZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyKGNvbnRhaW5lcik6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBodG1sIGVsZW1lbnQgZm9yIGEgY29tcG9uZW50IHJlZi5cbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnRSZWY8YW55Pn0gY29tcG9uZW50UmVmXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGdldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZjogYW55KTogSFRNTEVsZW1lbnQge1xuICAgIC8vIHRoZSB0b3AgbW9zdCBjb21wb25lbnQgcm9vdCBub2RlIGhhcyBubyBgaG9zdFZpZXdgXG4gICAgaWYgKCFjb21wb25lbnRSZWYuaG9zdFZpZXcpIHsgcmV0dXJuIGNvbXBvbmVudFJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7IH1cblxuICAgIHJldHVybiAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm9vdCBjb21wb25lbnQgY29udGFpbmVyIGh0bWwgZWxlbWVudC5cbiAgICpcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgZ2V0Um9vdFZpZXdDb250YWluZXJOb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb21wb25lbnRSb290Tm9kZSh0aGlzLmdldFJvb3RWaWV3Q29udGFpbmVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2plY3RzIHRoZSBiaW5kaW5ncyBvbnRvIHRoZSBjb21wb25lbnRcbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnRSZWY8YW55Pn0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7Q29tcG9uZW50UmVmPGFueT59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgYmluZGluZ3M6IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBpZiAoYmluZGluZ3MpIHtcbiAgICAgIGlmIChiaW5kaW5ncy5pbnB1dHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBiaW5kaW5nS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLmlucHV0cyk7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZ05hbWUgb2YgYmluZGluZ0tleXMpIHtcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbYmluZGluZ05hbWVdID0gYmluZGluZ3MuaW5wdXRzW2JpbmRpbmdOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYmluZGluZ3Mub3V0cHV0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLm91dHB1dHMpO1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudEtleXMpIHtcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbZXZlbnROYW1lXSA9IGJpbmRpbmdzLm91dHB1dHNbZXZlbnROYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIGNvbXBvbmVudCB0byBhIGFkamFjZW50IGxvY2F0aW9uXG4gICAqXG4gICAqIEB0ZW1wbGF0ZSBUXG4gICAqIEBwYXJhbSB7VHlwZTxUPn0gY29tcG9uZW50Q2xhc3NcbiAgICogQHBhcmFtIHsqfSBbb3B0aW9ucz17fV1cbiAgICogQHBhcmFtIHtFbGVtZW50fSBbbG9jYXRpb249dGhpcy5nZXRSb290Vmlld0NvbnRhaW5lck5vZGUoKV1cbiAgICogQHJldHVybnMge0NvbXBvbmVudFJlZjxhbnk+fVxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgYXBwZW5kQ29tcG9uZW50PFQ+KFxuICAgIGNvbXBvbmVudENsYXNzOiBUeXBlPFQ+LFxuICAgIGJpbmRpbmdzOiBhbnkgPSB7fSxcbiAgICBsb2NhdGlvbjogRWxlbWVudCA9IHRoaXMuZ2V0Um9vdFZpZXdDb250YWluZXJOb2RlKClcbiAgKTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRDbGFzcyk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmOiBhbnkgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICBjb25zdCBhcHBSZWY6IGFueSA9IHRoaXMuYXBwbGljYXRpb25SZWY7XG4gICAgY29uc3QgY29tcG9uZW50Um9vdE5vZGUgPSB0aGlzLmdldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZik7XG5cbiAgICAvLyBwcm9qZWN0IHRoZSBvcHRpb25zIHBhc3NlZCB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAgdGhpcy5wcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50UmVmLCBiaW5kaW5ncyk7XG5cbiAgICBhcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICBhcHBSZWYuZGV0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIH0pO1xuXG4gICAgLy8gdXNlIHRoZSByZW5kZXJlciB0byBhcHBlbmQgdGhlIGVsZW1lbnQgZm9yIHVuaXZzZXJhbCBzdXBwb3J0XG4gICAgY29uc3QgcmVuZGVyZXI6IFJlbmRlcmVyMiA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZS5yZW5kZXJlcjtcbiAgICByZW5kZXJlci5hcHBlbmRDaGlsZChsb2NhdGlvbiwgY29tcG9uZW50Um9vdE5vZGUpO1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgfVxufVxuIl19