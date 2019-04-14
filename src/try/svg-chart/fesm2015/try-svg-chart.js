import { __decorate, __metadata } from 'tslib';
import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, Input, ViewChild, HostBinding, HostListener, Component, ViewEncapsulation, ElementRef, Renderer2, EventEmitter, Output, Directive, ViewContainerRef, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { rgb } from 'd3-color';
import { range, min, max } from 'd3-array';
import { scaleQuantile, scaleOrdinal, scaleLinear, scaleBand, scaleTime, scalePoint } from 'd3-scale';
import { brushX } from 'd3-brush';
import { event, select } from 'd3-selection';
import { curveLinear, area, line, curveCardinalClosed, lineRadial, arc, pie } from 'd3-shape';
import { interpolate } from 'd3-interpolate';
import { format } from 'd3-format';
import { treemap, stratify } from 'd3-hierarchy';

// The export is needed here to generate a valid polyfills.metadata.json file
function ngxChartsPolyfills() {
    // IE11 fix
    // Ref: https://github.com/swimlane/ng-svg-charts/issues/386
    if (typeof (SVGElement) !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }
}
ngxChartsPolyfills();

var PlacementTypes;
(function (PlacementTypes) {
    PlacementTypes[PlacementTypes["top"] = 'top'] = "top";
    PlacementTypes[PlacementTypes["bottom"] = 'bottom'] = "bottom";
    PlacementTypes[PlacementTypes["left"] = 'left'] = "left";
    PlacementTypes[PlacementTypes["right"] = 'right'] = "right";
})(PlacementTypes || (PlacementTypes = {}));

const caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'top') {
        return elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 * @class PositionHelper
 */
class PositionHelper {
    /**
     * Calculate vertical alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    }
    /**
     * Calculate vertical caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    }
    /**
     * Calculate horz alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    }
    /**
     * Calculate horz caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    }
    /**
     * Checks if the element's position should be flipped
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} placement
     * @param {any} alignment
     * @param {any} spacing
     * @returns {boolean}
     *
     * @memberOf PositionHelper
     */
    static shouldFlip(elDimensions, popoverDimensions, placement, alignment, spacing) {
        let flip = false;
        if (placement === 'right') {
            const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    }
    /**
     * Position caret
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    static positionCaret(placement, elmDim, hostDim, caretDimensions, alignment) {
        let top = 0;
        let left = 0;
        if (placement === PlacementTypes.right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top, left };
    }
    /**
     * Position content
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    static positionContent(placement, elmDim, hostDim, spacing, alignment) {
        let top = 0;
        let left = 0;
        if (placement === PlacementTypes.right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top, left };
    }
    /**
     * Determine placement based on flip
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    static determinePlacement(placement, elmDim, hostDim, spacing, alignment) {
        const shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, alignment, spacing);
        if (shouldFlip) {
            if (placement === PlacementTypes.right) {
                return PlacementTypes.left;
            }
            else if (placement === PlacementTypes.left) {
                return PlacementTypes.right;
            }
            else if (placement === PlacementTypes.top) {
                return PlacementTypes.bottom;
            }
            else if (placement === PlacementTypes.bottom) {
                return PlacementTypes.top;
            }
        }
        return placement;
    }
}

var StyleTypes;
(function (StyleTypes) {
    StyleTypes[StyleTypes["popover"] = 'popover'] = "popover";
    StyleTypes[StyleTypes["tooltip"] = 'tooltip'] = "tooltip";
})(StyleTypes || (StyleTypes = {}));

var AlignmentTypes;
(function (AlignmentTypes) {
    AlignmentTypes[AlignmentTypes["left"] = 'left'] = "left";
    AlignmentTypes[AlignmentTypes["center"] = 'center'] = "center";
    AlignmentTypes[AlignmentTypes["right"] = 'right'] = "right";
})(AlignmentTypes || (AlignmentTypes = {}));

var ShowTypes;
(function (ShowTypes) {
    ShowTypes[ShowTypes["all"] = 'all'] = "all";
    ShowTypes[ShowTypes["focus"] = 'focus'] = "focus";
    ShowTypes[ShowTypes["mouseover"] = 'mouseover'] = "mouseover";
})(ShowTypes || (ShowTypes = {}));

var InjectionService_1;
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
InjectionService = InjectionService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ApplicationRef,
        ComponentFactoryResolver,
        Injector])
], InjectionService);

class InjectionRegistery {
    constructor(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    getByType(type = this.type) {
        return this.components.get(type);
    }
    create(bindings) {
        return this.createByType(this.type, bindings);
    }
    createByType(type, bindings) {
        bindings = this.assignDefaults(bindings);
        const component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    }
    destroy(instance) {
        const compsByType = this.components.get(instance.componentType);
        if (compsByType) {
            const idx = compsByType.indexOf(instance);
            if (idx > -1) {
                const component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    }
    destroyAll() {
        this.destroyByType(this.type);
    }
    destroyByType(type) {
        const comps = this.components.get(type);
        if (comps) {
            for (const comp of comps) {
                this.destroy(comp);
            }
        }
    }
    assignDefaults(bindings) {
        const { inputs, outputs } = this.defaults;
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = Object.assign(inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = Object.assign(outputs, bindings.outputs);
        }
        return bindings;
    }
    injectComponent(type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    }
    register(type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        const types = this.components.get(type);
        types.push(component);
    }
}

/**
 * Throttle a function
 *
 * @export
 * @param {*}      func
 * @param {number} wait
 * @param {*}      [options]
 * @returns
 */
function throttle(func, wait, options) {
    options = options || {};
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        const now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}

let TooltipContentComponent = class TooltipContentComponent {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    get cssClasses() {
        let clz = 'ng-svg-charts-tooltip-content';
        clz += ` position-${this.placement}`;
        clz += ` type-${this.type}`;
        clz += ` ${this.cssClass}`;
        return clz;
    }
    ngAfterViewInit() {
        setTimeout(this.position.bind(this));
    }
    position() {
        const nativeElm = this.element.nativeElement;
        const hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width) {
            return;
        }
        const elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
    }
    positionContent(nativeElm, hostDim, elmDim) {
        const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        this.renderer.setStyle(nativeElm, 'top', `${top}px`);
        this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
    positionCaret(hostDim, elmDim) {
        const caretElm = this.caretElm.nativeElement;
        const caretDimensions = caretElm.getBoundingClientRect();
        const { top, left } = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);
        this.renderer.setStyle(caretElm, 'top', `${top}px`);
        this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
    checkFlip(hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    }
    onWindowResize() {
        this.position();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipContentComponent.prototype, "host", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TooltipContentComponent.prototype, "showCaret", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "placement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "alignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "spacing", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TooltipContentComponent.prototype, "cssClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TooltipContentComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipContentComponent.prototype, "template", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipContentComponent.prototype, "context", void 0);
__decorate([
    ViewChild('caretElm'),
    __metadata("design:type", Object)
], TooltipContentComponent.prototype, "caretElm", void 0);
__decorate([
    HostBinding('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], TooltipContentComponent.prototype, "cssClasses", null);
__decorate([
    HostListener('window:resize'),
    throttleable(100),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipContentComponent.prototype, "onWindowResize", null);
TooltipContentComponent = __decorate([
    Component({
        selector: 'ngx-tooltip-content',
        template: `
    <div>
      <span
        #caretElm
        [hidden]="!showCaret"
        class="tooltip-caret position-{{this.placement}}">
      </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{ model: context }">
          </ng-template>
        </span>
        <span
          *ngIf="title"
          [innerHTML]="title">
        </span>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ng-svg-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;-webkit-box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ng-svg-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ng-svg-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ng-svg-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.position-right{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}.ng-svg-charts-tooltip-content.position-left{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}.ng-svg-charts-tooltip-content.position-top{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.ng-svg-charts-tooltip-content.position-bottom{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}.ng-svg-charts-tooltip-content.animate{opacity:1;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-o-transition:opacity .3s,transform .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2])
], TooltipContentComponent);

let TooltipService = class TooltipService extends InjectionRegistery {
    constructor(injectionService) {
        super(injectionService);
        this.injectionService = injectionService;
        this.type = TooltipContentComponent;
    }
};
TooltipService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [InjectionService])
], TooltipService);

let TooltipDirective = class TooltipDirective {
    constructor(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.top;
        this.tooltipAlignment = AlignmentTypes.center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    get listensForFocus() {
        return this.tooltipShowEvent === ShowTypes.all ||
            this.tooltipShowEvent === ShowTypes.focus;
    }
    get listensForHover() {
        return this.tooltipShowEvent === ShowTypes.all ||
            this.tooltipShowEvent === ShowTypes.mouseover;
    }
    ngOnDestroy() {
        this.hideTooltip(true);
    }
    onFocus() {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    }
    onBlur() {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    }
    onMouseEnter() {
        if (this.listensForHover) {
            this.showTooltip();
        }
    }
    onMouseLeave(target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                const contentDom = this.component.instance.element.nativeElement;
                const contains = contentDom.contains(target);
                if (contains) {
                    return;
                }
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    }
    onMouseClick() {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    }
    showTooltip(immediate) {
        if (this.component || this.tooltipDisabled) {
            return;
        }
        const time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltipService.destroyAll();
            const options = this.createBoundOptions();
            this.component = this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(() => {
                if (this.component) {
                    this.addHideListeners(this.component.instance.element.nativeElement);
                }
            }, 10);
            this.show.emit(true);
        }, time);
    }
    addHideListeners(tooltip) {
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
            clearTimeout(this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
                this.hideTooltip(this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', (event) => {
                const contains = tooltip.contains(event.target);
                if (!contains) {
                    this.hideTooltip();
                }
            });
        }
    }
    hideTooltip(immediate = false) {
        if (!this.component) {
            return;
        }
        const destroyFn = () => {
            // remove events
            if (this.mouseLeaveContentEvent) {
                this.mouseLeaveContentEvent();
            }
            if (this.mouseEnterContentEvent) {
                this.mouseEnterContentEvent();
            }
            if (this.documentClickEvent) {
                this.documentClickEvent();
            }
            // emit events
            this.hide.emit(true);
            // destroy component
            this.tooltipService.destroy(this.component);
            this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    }
    createBoundOptions() {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipCssClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipSpacing", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipShowCaret", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipPlacement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipAlignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipShowEvent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipContext", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "show", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "hide", void 0);
__decorate([
    HostListener('focusin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onFocus", null);
__decorate([
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onBlur", null);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseLeave", null);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseClick", null);
TooltipDirective = __decorate([
    Directive({ selector: '[ngx-tooltip]' }),
    __metadata("design:paramtypes", [TooltipService,
        ViewContainerRef,
        Renderer2])
], TooltipDirective);

let TooltipModule = class TooltipModule {
};
TooltipModule = __decorate([
    NgModule({
        declarations: [TooltipContentComponent, TooltipDirective],
        providers: [InjectionService, TooltipService],
        exports: [TooltipContentComponent, TooltipDirective],
        imports: [CommonModule],
        entryComponents: [TooltipContentComponent]
    })
], TooltipModule);

let ChartComponent = class ChartComponent {
    constructor(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        const chartColumns = 12 - legendColumns;
        this.chartWidth = ~~(this.view[0] * chartColumns / 12.0);
        this.legendWidth = (!this.legendOptions || this.legendOptions.position === 'right')
            ? ~~(this.view[0] * legendColumns / 12.0)
            : this.chartWidth;
    }
    getLegendType() {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "view", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "showLegend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ChartComponent.prototype, "legendLabelClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ChartComponent.prototype, "legendLabelActivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ChartComponent.prototype, "legendLabelDeactivate", void 0);
ChartComponent = __decorate([
    Component({
        providers: [TooltipService],
        selector: 'ng-svg-charts-chart',
        template: `
    <div
      class="ng-svg-charts-outer"
      [style.width.px]="view[0]"
      [@animationState]="'active'"
      [@.disabled]="!animations">
      <svg
        class="ng-svg-charts"
        [attr.width]="chartWidth"
        [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ng-svg-charts-scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth">
      </ng-svg-charts-scale-legend>
      <ng-svg-charts-legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)">
      </ng-svg-charts-legend>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('500ms 100ms', style({ opacity: 1 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [ViewContainerRef,
        TooltipService])
], ChartComponent);

let ScaleLegendComponent = class ScaleLegendComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = (this.horizontal) ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to ${direction}, ${gradientValues})`);
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "valueRange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "horizontal", void 0);
ScaleLegendComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-scale-legend',
        template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width">
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div
        class="scale-legend-wrap"
        [style.background]="gradient">
      </div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;-webkit-box-flex:1;-ms-flex:1;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"]
    }),
    __metadata("design:paramtypes", [DomSanitizer])
], ScaleLegendComponent);

/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}

let LegendComponent = class LegendComponent {
    constructor(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    }
    getLegendEntries() {
        const items = [];
        for (const label of this.data) {
            const formattedLabel = formatLabel(label);
            const idx = items.findIndex((i) => {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label,
                    formattedLabel,
                    color: this.colors.getColor(label)
                });
            }
        }
        return items;
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.label === d.name;
        });
        return item !== undefined;
    }
    activate(item) {
        this.labelActivate.emit(item);
    }
    deactivate(item) {
        this.labelDeactivate.emit(item);
    }
    trackBy(index, item) {
        return item.label;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "horizontal", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendComponent.prototype, "labelClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendComponent.prototype, "labelActivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendComponent.prototype, "labelDeactivate", void 0);
LegendComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-legend',
        template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{title}}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels"
            [class.horizontal-legend]="horizontal"
          [style.max-height.px]="height - 45">
          <li
            *ngFor="let entry of legendEntries; trackBy: trackBy"
            class="legend-label">
            <ng-svg-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)">
            </ng-svg-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}"]
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], LegendComponent);

let LegendEntryComponent = class LegendEntryComponent {
    constructor() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    get trimmedLabel() {
        return this.formattedLabel || '(empty)';
    }
    onMouseEnter() {
        this.activate.emit({ name: this.label });
    }
    onMouseLeave() {
        this.deactivate.emit({ name: this.label });
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], LegendEntryComponent.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendEntryComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], LegendEntryComponent.prototype, "formattedLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LegendEntryComponent.prototype, "isActive", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "deactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LegendEntryComponent.prototype, "toggle", void 0);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseLeave", null);
LegendEntryComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-legend-entry',
        template: `
    <span
      [title]="formattedLabel"
      tabindex="-1"
      [class.active]="isActive"
      (click)="select.emit(formattedLabel)">
      <span
        class="legend-label-color"
        [style.background-color]="color"
        (click)="toggle.emit(formattedLabel)">
      </span>
      <span class="legend-label-text">
        {{trimmedLabel}}
      </span>
    </span>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], LegendEntryComponent);

function trimLabel(s, max = 16) {
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    s = s.trim();
    if (s.length <= max) {
        return s;
    }
    else {
        return `${s.slice(0, max)}...`;
    }
}

let AdvancedLegendComponent = class AdvancedLegendComponent {
    constructor() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = label => label;
        this.percentageFormatting = percentage => percentage;
        this.defaultValueFormatting = value => value.toLocaleString();
    }
    ngOnChanges(changes) {
        this.update();
    }
    getTotal() {
        return this.data.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }
    update() {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    }
    getLegendItems() {
        return this.data.map(d => {
            const label = formatLabel(d.name);
            const value = d.value;
            const color = this.colors.getColor(label);
            const percentage = this.total > 0 ? (value / this.total) * 100 : 0;
            const formattedLabel = typeof this.labelFormatting === 'function' ? this.labelFormatting(label) : label;
            return {
                _value: value,
                value,
                color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: this.percentageFormatting ? this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    }
    trackBy(item) {
        return item.formattedLabel;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], AdvancedLegendComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AdvancedLegendComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AdvancedLegendComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AdvancedLegendComponent.prototype, "deactivate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AdvancedLegendComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AdvancedLegendComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AdvancedLegendComponent.prototype, "percentageFormatting", void 0);
AdvancedLegendComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-advanced-legend',
        template: `
    <div class="advanced-pie-legend" [style.width.px]="width">
      <div
        *ngIf="animations"
        class="total-value"
        ng-svg-charts-count-up
        [countTo]="roundedTotal"
        [valueFormatting]="valueFormatting">
      </div>
      <div class="total-value" *ngIf="!animations">
        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}
      </div>
      <div class="total-label">
        {{ label }}
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy: trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.label)"
            (mouseleave)="deactivate.emit(legendItem.label)"
            (click)="select.emit({ name: legendItem.label, value: legendItem.value })">
            <div class="item-color" [style.border-left-color]="legendItem.color"></div>
            <div
              *ngIf="animations"
              class="item-value"
              ng-svg-charts-count-up
              [countTo]="legendItem._value"
              [valueFormatting]="valueFormatting">
            </div>
            <div *ngIf="!animations" class="item-value">
              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}
            </div>
            <div class="item-label">{{ legendItem.displayLabel }}</div>
            <div
              *ngIf="animations"
              class="item-percent"
              ng-svg-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'">
            </div>
            <div *ngIf="!animations" class="item-percent">{{ legendItem.percentage.toLocaleString() }}%</div>
          </div>
        </div>
      </div>
    </div>
  `,
        preserveWhitespaces: false,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".advanced-pie-legend{float:left;position:relative;top:50%;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"]
    })
], AdvancedLegendComponent);

const cache = {};
/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
function id() {
    let newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = `a${newId}`;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}

let colorSets = [
    {
        name: 'vivid',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
        ]
    },
    {
        name: 'natural',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
        ]
    },
    {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
        ]
    },
    {
        name: 'fire',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
        ]
    },
    {
        name: 'solar',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
        ]
    },
    {
        name: 'air',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
        ]
    },
    {
        name: 'aqua',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
        ]
    },
    {
        name: 'flame',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
        ]
    },
    {
        name: 'ocean',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
        ]
    },
    {
        name: 'forest',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
        ]
    },
    {
        name: 'horizon',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
        ]
    },
    {
        name: 'neons',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
        ]
    },
    {
        name: 'picnic',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
        ]
    },
    {
        name: 'night',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
            '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
        ]
    },
    {
        name: 'nightLights',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
            '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
        ]
    }
];

function sortLinear(data, property, direction = 'asc') {
    return data.sort((a, b) => {
        if (direction === 'asc') {
            return a[property] - b[property];
        }
        else {
            return b[property] - a[property];
        }
    });
}
function sortByDomain(data, property, direction = 'asc', domain) {
    return data.sort((a, b) => {
        const aVal = a[property];
        const bVal = b[property];
        const aIdx = domain.indexOf(aVal);
        const bIdx = domain.indexOf(bVal);
        if (direction === 'asc') {
            return aIdx - bIdx;
        }
        else {
            return bIdx - aIdx;
        }
    });
}
function sortByTime(data, property, direction = 'asc') {
    return data.sort((a, b) => {
        const aDate = a[property].getTime();
        const bDate = b[property].getTime();
        if (direction === 'asc') {
            if (aDate > bDate)
                return 1;
            if (bDate > aDate)
                return -1;
            return 0;
        }
        else {
            if (aDate > bDate)
                return -1;
            if (bDate > aDate)
                return 1;
            return 0;
        }
    });
}

/**
 * Accepts a color (string) and returns a inverted hex color (string)
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 */
function invertColor(value) {
    const color = rgb(value);
    const { r, g, b, opacity } = color;
    if (opacity === 0) {
        return color.toString();
    }
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    const depth = (yiq >= 128) ? -.8 : .8;
    return shadeRGBColor(color, depth);
}
/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 */
function shadeRGBColor({ r, g, b }, percent) {
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    r = (Math.round((t - r) * p) + r);
    g = (Math.round((t - g) * p) + g);
    b = (Math.round((t - b) * p) + b);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Visibility Observer
 */
class VisibilityObserver {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    destroy() {
        clearTimeout(this.timeout);
    }
    onVisibilityChange() {
        // trigger zone recalc for columns
        this.zone.run(() => {
            this.isVisible = true;
            this.visible.emit(true);
        });
    }
    runCheck() {
        const check = () => {
            if (!this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            const { offsetHeight, offsetWidth } = this.element.nativeElement;
            if (offsetHeight && offsetWidth) {
                clearTimeout(this.timeout);
                this.onVisibilityChange();
            }
            else {
                clearTimeout(this.timeout);
                this.zone.runOutsideAngular(() => {
                    this.timeout = setTimeout(() => check(), 100);
                });
            }
        };
        this.zone.runOutsideAngular(() => {
            this.timeout = setTimeout(() => check());
        });
    }
}
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], VisibilityObserver.prototype, "visible", void 0);

function isDate(value) {
    return toString.call(value) === '[object Date]';
}

let BaseChartComponent = class BaseChartComponent {
    constructor(chartElement, zone, cd) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.scheme = 'cool';
        this.schemeType = 'ordinal';
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngAfterViewInit() {
        this.bindWindowResizeEvent();
        // listen for visibility of the element for hidden by default scenario
        this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
        this.visibilityObserver.visible.subscribe(this.update.bind(this));
    }
    ngOnDestroy() {
        this.unbindEvents();
        if (this.visibilityObserver) {
            this.visibilityObserver.visible.unsubscribe();
            this.visibilityObserver.destroy();
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        else {
            this.results = [];
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            const dims = this.getContainerDims();
            if (dims) {
                this.width = dims.width;
                this.height = dims.height;
            }
        }
        // default values if width or height are 0 or undefined
        if (!this.width) {
            this.width = 600;
        }
        if (!this.height) {
            this.height = 400;
        }
        // tslint:disable-next-line: no-bitwise
        this.width = ~~this.width;
        // tslint:disable-next-line: no-bitwise
        this.height = ~~this.height;
        if (this.cd) {
            this.cd.markForCheck();
        }
    }
    getContainerDims() {
        let width;
        let height;
        const hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode !== null) {
            // Get the container dimensions
            const dims = hostElem.parentNode.getBoundingClientRect();
            width = dims.width;
            height = dims.height;
        }
        if (width && height) {
            return { width, height };
        }
        return null;
    }
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    formatDates() {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.results.length; i++) {
            const g = this.results[i];
            if (g.name instanceof Date) {
                g.name = g.name.toLocaleDateString();
            }
            if (g.series) {
                // tslint:disable-next-line: prefer-for-of
                for (let j = 0; j < g.series.length; j++) {
                    const d = g.series[j];
                    if (d.name instanceof Date) {
                        d.name = d.name.toLocaleDateString();
                    }
                }
            }
        }
    }
    unbindEvents() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    bindWindowResizeEvent() {
        const source = fromEvent(window, 'resize');
        const subscription = source.pipe(debounceTime(200)).subscribe(e => {
            this.update();
            if (this.cd) {
                this.cd.markForCheck();
            }
        });
        this.resizeSubscription = subscription;
    }
    /**
     * Clones the data into a new object
     *
     * @private
     * @param {any} data
     * @returns {*}
     *
     * @memberOf BaseChart
     */
    cloneData(data) {
        const results = [];
        for (const item of data) {
            const copy = {
                name: item['name']
            };
            if (item['value'] !== undefined) {
                copy['value'] = item['value'];
            }
            if (item['series'] !== undefined) {
                copy['series'] = [];
                for (const seriesItem of item['series']) {
                    const seriesItemCopy = Object.assign({}, seriesItem);
                    copy['series'].push(seriesItemCopy);
                }
            }
            if (item['extra'] !== undefined) {
                copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
            }
            results.push(copy);
        }
        return results;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "results", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BaseChartComponent.prototype, "view", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "scheme", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "customColors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "select", void 0);
BaseChartComponent = __decorate([
    Component({
        selector: 'base-chart',
        template: `<div></div>`
    }),
    __metadata("design:paramtypes", [ElementRef,
        NgZone,
        ChangeDetectorRef])
], BaseChartComponent);

let AxisLabelComponent = class AxisLabelComponent {
    constructor(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "orient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "offset", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "height", void 0);
AxisLabelComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-axis-label]',
        template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform">
      {{label}}
    </svg:text>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], AxisLabelComponent);

function reduceTicks(ticks, maxTicks) {
    if (ticks.length > maxTicks) {
        const reduced = [];
        const modulus = Math.floor(ticks.length / maxTicks);
        for (let i = 0; i < ticks.length; i++) {
            if (i % modulus === 0) {
                reduced.push(ticks[i]);
            }
        }
        ticks = reduced;
    }
    return ticks;
}

let XAxisTicksComponent = class XAxisTicksComponent {
    constructor() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.verticalSpacing = 20;
        this.rotateLabels = false;
        this.innerTickSize = 6;
        this.outerTickSize = 6;
        this.tickPadding = 3;
        this.textAnchor = 'middle';
        this.maxTicksLength = 0;
        this.maxAllowedLength = 16;
        this.height = 0;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        const height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
        if (height !== this.height) {
            this.height = height;
            this.dimensionsChanged.emit({ height });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        const scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = (d) => {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        const angle = this.getRotationAngle(this.ticks);
        this.adjustedScale = this.scale.bandwidth
            ? function (d) {
                return this.scale(d) + this.scale.bandwidth() * 0.5;
            }
            : this.scale;
        this.textTransform = '';
        if (angle !== 0) {
            this.textTransform = `rotate(${angle})`;
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
        else {
            this.textAnchor = 'middle';
        }
        setTimeout(() => this.updateDims());
    }
    getRotationAngle(ticks) {
        let angle = 0;
        this.maxTicksLength = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < ticks.length; i++) {
            const tick = this.tickFormat(ticks[i]).toString();
            let tickLength = tick.length;
            if (this.trimTicks) {
                tickLength = this.tickTrim(tick).length;
            }
            if (tickLength > this.maxTicksLength) {
                this.maxTicksLength = tickLength;
            }
        }
        const len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        const charWidth = 8; // need to measure this
        const wordWidth = len * charWidth;
        let baseWidth = wordWidth;
        const maxBaseWidth = Math.floor(this.width / ticks.length);
        // calculate optimal angle
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(100);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    }
    getMaxTicks(tickWidth) {
        return Math.floor(this.width / tickWidth);
    }
    tickTransform(tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    }
    gridLineTransform() {
        return `translate(0,${-this.verticalSpacing - 5})`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], XAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "trimTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "width", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild('ticksel'),
    __metadata("design:type", ElementRef)
], XAxisTicksComponent.prototype, "ticksElement", void 0);
XAxisTicksComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-x-axis-ticks]',
        template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick"
        [attr.transform]="tickTransform(tick)">
        <title>{{tickFormat(tick)}}</title>
        <svg:text
          stroke-width="0.01"
          [attr.text-anchor]="textAnchor"
          [attr.transform]="textTransform"
          [style.font-size]="'12px'">
          {{tickTrim(tickFormat(tick))}}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="tickTransform(tick)">
      <svg:g *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line
          class="gridline-path gridline-path-vertical"
          [attr.y1]="-gridLineHeight"
          y2="0" />
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], XAxisTicksComponent);

let XAxisComponent = class XAxisComponent {
    constructor() {
        this.showGridLines = false;
        this.xOrient = 'bottom';
        this.xAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    }
    emitTicksHeight({ height }) {
        const newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ height });
            }, 0);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], XAxisComponent.prototype, "trimTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], XAxisComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "showLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "labelText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], XAxisComponent.prototype, "ticks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisTickInterval", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisTickCount", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xOrient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisOffset", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild(XAxisTicksComponent),
    __metadata("design:type", XAxisTicksComponent)
], XAxisComponent.prototype, "ticksComponent", void 0);
XAxisComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-x-axis]',
        template: `
    <svg:g
      [attr.class]="xAxisClassName"
      [attr.transform]="transform">
      <svg:g ng-svg-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g ng-svg-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], XAxisComponent);

/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param {*} x, y, w, h, r, tl, tr, bl, br
 * @returns {string}
 */
function roundedRect(x, y, w, h, r, [tl, tr, bl, br]) {
    let retval = '';
    w = Math.floor(w);
    h = Math.floor(h);
    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;
    retval = `M${[x + r, y]}`;
    retval += `h${w - 2 * r}`;
    if (tr) {
        retval += `a${[r, r]} 0 0 1 ${[r, r]}`;
    }
    else {
        retval += `h${r}v${r}`;
    }
    retval += `v${h - 2 * r}`;
    if (br) {
        retval += `a${[r, r]} 0 0 1 ${[-r, r]}`;
    }
    else {
        retval += `v${r}h${-r}`;
    }
    retval += `h${2 * r - w}`;
    if (bl) {
        retval += `a${[r, r]} 0 0 1 ${[-r, -r]}`;
    }
    else {
        retval += `h${-r}v${-r}`;
    }
    retval += `v${2 * r - h}`;
    if (tl) {
        retval += `a${[r, r]} 0 0 1 ${[r, -r]}`;
    }
    else {
        retval += `v${-r}h${r}`;
    }
    retval += `z`;
    return retval;
}

let YAxisTicksComponent = class YAxisTicksComponent {
    constructor() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        let scale;
        const sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(() => this.updateDims());
    }
    setReferencelines() {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(item => item.value)));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(item => item.value)));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [false, false, false, false]);
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    }
    getMaxTicks(tickHeight) {
        return Math.floor(this.height / tickHeight);
    }
    tickTransform(tick) {
        return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
    }
    gridLineTransform() {
        return `translate(5,0)`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], YAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "trimTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "referenceLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "showRefLines", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild('ticksel'),
    __metadata("design:type", ElementRef)
], YAxisTicksComponent.prototype, "ticksElement", void 0);
YAxisTicksComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-y-axis-ticks]',
        template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick"
        [attr.transform]="transform(tick)" >
        <title>{{tickFormat(tick)}}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'">
          {{tickTrim(tickFormat(tick))}}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:path *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="transform(tick)">
      <svg:g
        *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line *ngIf="orient === 'left'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth" />
        <svg:line *ngIf="orient === 'right'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth" />
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let refLine of referenceLines">
      <svg:g *ngIf="showRefLines" [attr.transform]="transform(refLine.value)">
        <svg:line class="refline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
          [attr.transform]="gridLineTransform()"/>
        <svg:g *ngIf="showRefLabels">
          <title>{{tickTrim(tickFormat(refLine.value))}}</title>
          <svg:text
            class="refline-label"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor" >
            {{refLine.name}}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisTicksComponent);

let YAxisComponent = class YAxisComponent {
    constructor() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = `translate(${this.offset + this.dims.width} , 0)`;
        }
        else {
            this.offset = this.offset;
            this.transform = `translate(${this.offset} , 0)`;
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    }
    emitTicksWidth({ width }) {
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], YAxisComponent.prototype, "trimTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], YAxisComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], YAxisComponent.prototype, "ticks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "labelText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisTickInterval", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisTickCount", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yOrient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "referenceLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showRefLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisOffset", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild(YAxisTicksComponent),
    __metadata("design:type", YAxisTicksComponent)
], YAxisComponent.prototype, "ticksComponent", void 0);
YAxisComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-y-axis]',
        template: `
    <svg:g
      [attr.class]="yAxisClassName"
      [attr.transform]="transform">
      <svg:g ng-svg-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g ng-svg-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisComponent);

let AxesModule = class AxesModule {
};
AxesModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent],
        exports: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent]
    })
], AxesModule);

class ColorHelper {
    constructor(scheme, type, domain, customColors) {
        if (typeof (scheme) === 'string') {
            scheme = colorSets.find(cs => {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    generateColorScheme(scheme, type, domain) {
        if (typeof (scheme) === 'string') {
            scheme = colorSets.find(cs => {
                return cs.name === scheme;
            });
        }
        let colorScale;
        if (type === 'quantile') {
            colorScale = scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            const colorDomain = [...scheme.domain];
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            const points = range(0, 1, 1.0 / colorDomain.length);
            colorScale = scaleLinear()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    }
    getColor(value) {
        if (this.scaleType === 'linear') {
            const valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return (this.scale(valueScale(value)));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            const formattedValue = value.toString();
            let found; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find((mapping) => {
                    return mapping.name.toLowerCase() === formattedValue.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    }
    getLinearGradientStops(value, start) {
        if (start === undefined) {
            start = this.domain[0];
        }
        const valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        const colorValueScale = scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        const endColor = this.getColor(value);
        // generate the stops
        const startVal = valueScale(start);
        const startColor = this.getColor(start);
        const endVal = valueScale(value);
        let i = 1;
        let currentVal = startVal;
        const stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            const color = this.colorDomain[i];
            const offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color,
                offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                for (const s of stops) {
                    s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                }
            }
        }
        return stops;
    }
}

let CircleSeriesComponent = class CircleSeriesComponent {
    constructor() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    ngOnInit() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circle = this.getActiveCircle();
    }
    getActiveCircle() {
        const indexActiveDataPoint = this.data.series.findIndex((d) => {
            const label = d.name;
            return label && this.visibleValue && label.toString() === this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    }
    mapDataPointToCircle(d, i) {
        const seriesName = this.data.name;
        const value = d.value;
        const label = d.name;
        const tooltipLabel = formatLabel(label);
        let cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        const cy = this.yScale(this.type === 'standard' ? value : d.d1);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;
        const opacity = 1;
        let color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        const data = {
            series: seriesName,
            value,
            name: label
        };
        return {
            classNames: [`circle-data-${i}`],
            value,
            label,
            data,
            cx,
            cy,
            radius,
            height,
            tooltipLabel,
            color,
            opacity,
            seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    }
    getTooltipText({ tooltipLabel, value, seriesName, min, max }) {
        return `
      <span class="tooltip-label">${seriesName} • ${tooltipLabel}</span>
      <span class="tooltip-val">${value.toLocaleString()}${this.getTooltipMinMaxText(min, max)}</span>
    `;
    }
    getTooltipMinMaxText(min, max) {
        if (min !== undefined || max !== undefined) {
            let result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    }
    getGradientStops(color) {
        return [
            {
                offset: 0,
                color,
                opacity: 0.2
            },
            {
                offset: 100,
                color,
                opacity: 1
            }
        ];
    }
    onClick(value, label) {
        this.select.emit({
            name: label,
            value
        });
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    activateCircle() {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle() {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", ColorHelper)
], CircleSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "visibleValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CircleSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "deactivate", void 0);
CircleSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-circle-series]',
        template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g ng-svg-charts-svg-linear-gradient
          orientation="vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g ng-svg-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({name: circle.seriesName})"
        [pointerEvents]="circle.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick($event, circle.label)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        opacity: 0,
                    }),
                    animate(250, style({ opacity: 1 }))
                ])
            ])
        ]
    })
], CircleSeriesComponent);

let CircleComponent = class CircleComponent {
    constructor() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    onClick() {
        this.select.emit(this.data);
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    ngOnChanges(changes) {
        this.classNames = Array.isArray(this.classNames) ?
            this.classNames.join(' ') :
            '';
        this.classNames += 'circle';
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "cx", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "cy", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "r", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "stroke", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "classNames", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "circleOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "pointerEvents", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "deactivate", void 0);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onClick", null);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseLeave", null);
CircleComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-circle]',
        template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CircleComponent);

let GridPanelComponent = class GridPanelComponent {
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "path", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "x", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "y", void 0);
GridPanelComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-grid-panel]',
        template: `
    <svg:rect
      [attr.height]="height"
      [attr.width]="width"
      [attr.x]="x"
      [attr.y]="y"
      stroke="none"
      class="gridpanel"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GridPanelComponent);

let GridPanelSeriesComponent = class GridPanelSeriesComponent {
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.gridPanels = this.getGridPanels();
    }
    getGridPanels() {
        return this.data.map((d) => {
            let offset;
            let width;
            let height;
            let x;
            let y;
            let className = 'odd';
            if (this.orient === 'vertical') {
                const position = this.xScale(d.name);
                const positionIndex = Number.parseInt((position / this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = this.xScale.bandwidth() * this.xScale.paddingInner();
                width = this.xScale.bandwidth() + offset;
                height = this.dims.height;
                x = this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (this.orient === 'horizontal') {
                const position = this.yScale(d.name);
                const positionIndex = Number.parseInt((position / this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = this.yScale.bandwidth() * this.yScale.paddingInner();
                width = this.dims.width;
                height = this.yScale.bandwidth() + offset;
                x = 0;
                y = this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height,
                width,
                x,
                y
            };
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "orient", void 0);
GridPanelSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-grid-panel-series]',
        template: `
    <svg:g ng-svg-charts-grid-panel *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GridPanelSeriesComponent);

let SvgLinearGradientComponent = class SvgLinearGradientComponent {
    constructor() {
        this.orientation = 'vertical';
    }
    ngOnChanges(changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SvgLinearGradientComponent.prototype, "orientation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SvgLinearGradientComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SvgLinearGradientComponent.prototype, "stops", void 0);
SvgLinearGradientComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-svg-linear-gradient]',
        template: `
    <svg:linearGradient
      [id]="name"
      [attr.x1]="x1"
      [attr.y1]="y1"
      [attr.x2]="x2"
      [attr.y2]="y2">
      <svg:stop *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:linearGradient>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SvgLinearGradientComponent);

let SvgRadialGradientComponent = class SvgRadialGradientComponent {
    constructor() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    get stops() {
        return this.stopsInput || this.stopsDefault;
    }
    set stops(value) {
        this.stopsInput = value;
    }
    ngOnChanges(changes) {
        this.r = '30%';
        if (('color' in changes) ||
            ('startOpacity' in changes) ||
            ('endOpacity' in changes)) {
            this.stopsDefault = [{
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                }, {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }];
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], SvgRadialGradientComponent.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SvgRadialGradientComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "cx", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "cy", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], SvgRadialGradientComponent.prototype, "stops", null);
SvgRadialGradientComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-svg-radial-gradient]',
        template: `
    <svg:radialGradient
      [id]="name"
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      gradientUnits="userSpaceOnUse">
      <svg:stop *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SvgRadialGradientComponent);

let TimelineComponent = class TimelineComponent {
    constructor(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    }
    update() {
        this.dims = this.getDims();
        this.height = this.dims.height;
        const offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = `translate(0 , ${offsetY})`;
        this.filterId = 'filter' + id().toString();
        this.filter = `url(#${this.filterId})`;
        this.cd.markForCheck();
    }
    getXDomain() {
        let values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        let domain = [];
        if (this.scaleType === 'time') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    }
    getXScale() {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    }
    addBrush() {
        if (this.brush) {
            return;
        }
        const height = this.height;
        const width = this.view[0];
        this.brush = brushX()
            .extent([[0, 0], [width, height]])
            .on('brush end', () => {
            const selection = event.selection || this.xScale.range();
            const newDomain = selection.map(this.xScale.invert);
            this.onDomainChange.emit(newDomain);
            this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    }
    updateBrush() {
        if (!this.brush) {
            return;
        }
        const height = this.height;
        const width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        select(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        select(this.element).select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    }
    getDims() {
        const width = this.view[0];
        const dims = {
            width,
            height: this.height
        };
        return dims;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "view", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "state", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "results", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "scheme", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "customColors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "miniChart", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "autoScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "scaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "height", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "onDomainChange", void 0);
TimelineComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-timeline]',
        template: `
    <svg:g
      class="timeline"
      [attr.transform]="transform">
      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix in="SourceGraphic"
            type="matrix"
            values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
      </svg:filter>
      <svg:g class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>
      <svg:rect x="0"
        [attr.width]="view[0]"
        y="0"
        [attr.height]="height"
        class="brush-background"
      />
      <svg:g class="brush"></svg:g>
    </svg:g>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
    }),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef])
], TimelineComponent);

let AreaComponent = class AreaComponent {
    constructor(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    }
    update() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    }
    loadAnimation() {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    }
    updatePathEl() {
        const node = select(this.element).select('.area');
        if (this.animations) {
            node.transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    }
    getGradient() {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "path", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "startingPath", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "opacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "startOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "endOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "activeLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaComponent.prototype, "stops", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "select", void 0);
AreaComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-area]',
        template: 'area.template.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], AreaComponent);

// If we don't check whether 'window' and 'global' variables are defined,
// code will fail in browser/node with 'variable is undefined' error.
let root;
if (typeof window !== 'undefined') {
    root = window;
}
else if (typeof global !== 'undefined') {
    root = global;
}
// tslint:disable-next-line:variable-name
const MouseEvent = root.MouseEvent;

let TooltipAreaComponent = class TooltipAreaComponent {
    constructor() {
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    getValues(xVal) {
        const results = [];
        for (const group of this.results) {
            const item = group.series.find(d => d.name.toString() === xVal.toString());
            let groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                const label = item.name;
                let val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                let color;
                if (this.colors.scaleType === 'linear') {
                    let v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                results.push({
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color
                });
            }
        }
        return results;
    }
    mouseMove(event) {
        const xPos = event.pageX - event.target.getBoundingClientRect().left;
        const closestIndex = this.findClosestPointIndex(xPos);
        const closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            const ev = new MouseEvent('mouseleave', { bubbles: false });
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    }
    findClosestPointIndex(xPos) {
        let minIndex = 0;
        let maxIndex = this.xSet.length - 1;
        let minDiff = Number.MAX_VALUE;
        let closestIndex = 0;
        while (minIndex <= maxIndex) {
            // tslint:disable-next-line: no-bitwise
            const currentIndex = (minIndex + maxIndex) / 2 | 0;
            const currentElement = this.xScale(this.xSet[currentIndex]);
            const curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    }
    showTooltip() {
        const event = new MouseEvent('mouseenter', { bubbles: false });
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    }
    hideTooltip() {
        const event = new MouseEvent('mouseleave', { bubbles: false });
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    }
    getToolTipText(tooltipItem) {
        let result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "xSet", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "results", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "showPercentage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], TooltipAreaComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "hover", void 0);
__decorate([
    ViewChild('tooltipAnchor'),
    __metadata("design:type", Object)
], TooltipAreaComponent.prototype, "tooltipAnchor", void 0);
TooltipAreaComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-tooltip-area]',
        template: "<svg:g>\n  <svg:rect\n    class=\"tooltip-area\"\n    [attr.x]=\"0\"\n    y=\"0\"\n    [attr.width]=\"dims.width\"\n    [attr.height]=\"dims.height\"\n    style=\"opacity: 0; cursor: 'auto';\"\n    (mousemove)=\"mouseMove($event)\"\n    (mouseleave)=\"hideTooltip()\"\n  />\n  <xhtml:ng-template #defaultTooltipTemplate let-model=\"model\">\n    <xhtml:div class=\"area-tooltip-container\">\n      <xhtml:div\n        *ngFor=\"let tooltipItem of model\"\n        class=\"tooltip-item\">\n        <span\n          class=\"tooltip-item-color\"\n          [style.background-color]=\"tooltipItem.color\">\n        </span>\n        {{getToolTipText(tooltipItem)}}\n      </xhtml:div>\n    </xhtml:div>\n  </xhtml:ng-template>\n  <svg:rect\n    #tooltipAnchor\n    [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n    class=\"tooltip-anchor\"\n    [attr.x]=\"anchorPos\"\n    y=\"0\"\n    [attr.width]=\"1\"\n    [attr.height]=\"dims.height\"\n    [style.opacity]=\"anchorOpacity\"\n    [style.pointer-events]=\"'none'\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'right'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipSpacing]=\"15\"\n    [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate: defaultTooltipTemplate\"\n    [tooltipContext]=\"anchorValues\"\n    [tooltipImmediateExit]=\"true\"\n  />\n</svg:g>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition('inactive => active', [
                    style({
                        opacity: 0,
                    }),
                    animate(250, style({ opacity: 0.7 }))
                ]),
                transition('active => inactive', [
                    style({
                        opacity: 0.7,
                    }),
                    animate(250, style({ opacity: 0 }))
                ])
            ])
        ]
    })
], TooltipAreaComponent);

// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
}
/**
 * Counts from a number to the end incrementally.
 *
 * @export
 * @param {any} countFrom
 * @param {any} countTo
 * @param {any} countDecimals
 * @param {any} countDuration
 * @param {any} callback
 * @returns
 */
function count(countFrom, countTo, countDecimals, countDuration, callback) {
    const startVal = Number(countFrom);
    const endVal = Number(countTo);
    const countDown = startVal > endVal;
    const decimals = Math.max(0, countDecimals);
    const dec = Math.pow(10, decimals);
    const duration = Number(countDuration) * 1000;
    let startTime;
    function runCount(timestamp) {
        let frameVal;
        const progress = timestamp - startTime;
        if (countDown) {
            frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
        }
        else {
            frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
        }
        if (countDown) {
            frameVal = frameVal < endVal ? endVal : frameVal;
        }
        else {
            frameVal = frameVal > endVal ? endVal : frameVal;
        }
        frameVal = Math.round(frameVal * dec) / dec;
        const tick = progress < duration;
        callback({
            value: frameVal,
            progress,
            timestamp,
            finished: !tick
        });
        if (tick) {
            return requestAnimationFrame(val => runCount(val));
        }
    }
    return requestAnimationFrame(timestamp => {
        startTime = timestamp;
        return runCount(timestamp);
    });
}
/**
 * Determine decimals places
 *
 * @export
 * @param {any} countTo
 * @returns
 */
function decimalChecker(countTo) {
    const endVal = Number(countTo);
    if (endVal % 1 !== 0 && Math.abs(endVal) <= 10) {
        return 2;
    }
    return 0;
}

/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
let CountUpDirective = class CountUpDirective {
    constructor(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    set countDecimals(val) {
        this._countDecimals = val;
    }
    get countDecimals() {
        if (this._countDecimals)
            return this._countDecimals;
        return decimalChecker(this.countTo);
    }
    set countTo(val) {
        this._countTo = parseFloat(val);
        this.start();
    }
    get countTo() {
        return this._countTo;
    }
    set countFrom(val) {
        this._countFrom = parseFloat(val);
        this.start();
    }
    get countFrom() {
        return this._countFrom;
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    start() {
        cancelAnimationFrame(this.animationReq);
        const valueFormatting = this.valueFormatting || (value => `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`);
        const callback = ({ value, progress, finished }) => {
            this.value = valueFormatting(value);
            this.cd.markForCheck();
            if (!finished)
                this.countChange.emit({ value: this.value, progress });
            if (finished)
                this.countFinish.emit({ value: this.value, progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countDuration", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countPrefix", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countSuffix", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CountUpDirective.prototype, "countDecimals", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CountUpDirective.prototype, "countTo", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CountUpDirective.prototype, "countFrom", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countFinish", void 0);
CountUpDirective = __decorate([
    Component({
        selector: '[ng-svg-charts-count-up]',
        template: `{{value}}`
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, ElementRef])
], CountUpDirective);

const COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipAreaComponent,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    TimelineComponent,
    AdvancedLegendComponent
];
let ChartCommonModule = class ChartCommonModule {
};
ChartCommonModule = __decorate([
    NgModule({
        providers: [
            Location,
            {
                provide: LocationStrategy,
                useClass: PathLocationStrategy
            }
        ],
        imports: [
            CommonModule,
            AxesModule,
            TooltipModule
        ],
        declarations: [
            ...COMPONENTS
        ],
        exports: [
            CommonModule,
            AxesModule,
            TooltipModule,
            ...COMPONENTS
        ]
    })
], ChartCommonModule);

function calculateViewDimensions({ width, height, margins, showXAxis = false, showYAxis = false, xAxisHeight = 0, yAxisWidth = 0, showXLabel = false, showYLabel = false, showLegend = false, legendType = 'ordinal', legendPosition = 'right', columns = 12 }) {
    let xOffset = margins[3];
    let chartWidth = width;
    let chartHeight = height - margins[0] - margins[2];
    if (showLegend && legendPosition === 'right') {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = chartWidth * columns / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            const offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            const offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        // tslint:disable-next-line: no-bitwise
        width: ~~chartWidth,
        // tslint:disable-next-line: no-bitwise
        height: ~~chartHeight,
        // tslint:disable-next-line: no-bitwise
        xOffset: ~~xOffset
    };
}

/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
function getUniqueXDomainValues(results) {
    const valueSet = new Set();
    for (const result of results) {
        for (const d of result.series) {
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
function getScaleType(values, checkDateType = true) {
    if (checkDateType) {
        const allDates = values.every(value => value instanceof Date);
        if (allDates) {
            return 'time';
        }
    }
    const allNumbers = values.every(value => typeof value === 'number');
    if (allNumbers) {
        return 'linear';
    }
    return 'ordinal';
}

let AreaChartComponent = class AreaChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.baseValue = 'auto';
        this.showGridLines = true;
        this.curve = curveLinear;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset}, ${this.margin[0]})`;
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = `url(#${this.clipPathId})`;
    }
    updateTimeline() {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
        }
    }
    getXDomain() {
        let values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        let domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
        }
        let min;
        let max;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min = this.xScaleMin
                ? this.xScaleMin
                : Math.min(...values);
            max = this.xScaleMax
                ? this.xScaleMax
                : Math.max(...values);
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min), new Date(max)];
            this.xSet = [...values].sort((a, b) => {
                const aDate = a.getTime();
                const bDate = b.getTime();
                if (aDate > bDate) {
                    return 1;
                }
                if (bDate > aDate) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = [...values].sort((a, b) => (a - b));
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    }
    getYDomain() {
        const domain = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        const values = [...domain];
        if (!this.autoScale) {
            values.push(0);
        }
        if (this.baseValue !== 'auto') {
            values.push(this.baseValue);
        }
        const min = this.yScaleMin
            ? this.yScaleMin
            : Math.min(...values);
        const max = this.yScaleMax
            ? this.yScaleMax
            : Math.max(...values);
        return [min, max];
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .padding(0.1);
        }
        scale.range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getYScale(domain, height) {
        const scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getScaleType(values) {
        let date = true;
        let num = true;
        for (const value of values) {
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (num) {
            return 'linear';
        }
        return 'ordinal';
    }
    isDate(value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    }
    updateDomain(domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    }
    updateHoveredVertical(item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    }
    hideCircles() {
        this.hoveredVertical = null;
        this.deactivateAll();
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "state", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "baseValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "autoScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "timeline", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AreaChartComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AreaChartComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], AreaChartComponent.prototype, "yScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], AreaChartComponent.prototype, "yScaleMax", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AreaChartComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AreaChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AreaChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    ContentChild('seriesTooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AreaChartComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaChartComponent.prototype, "hideCircles", null);
AreaChartComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-area-chart',
        template: 'area-chart.template.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], AreaChartComponent);

let AreaChartNormalizedComponent = class AreaChartNormalizedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.showGridLines = true;
        this.curve = curveLinear;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.xSet.length; i++) {
            const val = this.xSet[i];
            let d0 = 0;
            let total = 0;
            for (const group of this.results) {
                const d = group.series.find(item => {
                    let a = item.name;
                    let b = val;
                    if (this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    total += d.value;
                }
            }
            for (const group of this.results) {
                let d = group.series.find(item => {
                    let a = item.name;
                    let b = val;
                    if (this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
                if (total > 0) {
                    d.d0 = (d.d0 * 100) / total;
                    d.d1 = (d.d1 * 100) / total;
                }
                else {
                    d.d0 = 0;
                    d.d1 = 0;
                }
            }
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = `url(#${this.clipPathId})`;
    }
    updateTimeline() {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
        }
    }
    getXDomain() {
        let values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        let domain = [];
        if (this.scaleType === 'time') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [new Date(min), new Date(max)];
            this.xSet = [...values].sort((a, b) => {
                const aDate = a.getTime();
                const bDate = b.getTime();
                if (aDate > bDate) {
                    return 1;
                }
                if (bDate > aDate) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = [...values].sort((a, b) => (a - b));
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    }
    getYDomain() {
        return [0, 100];
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .padding(0.1);
        }
        scale
            .range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getYScale(domain, height) {
        const scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    updateDomain(domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    }
    updateHoveredVertical(item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    }
    hideCircles() {
        this.hoveredVertical = null;
        this.deactivateAll();
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "timeline", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartNormalizedComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AreaChartNormalizedComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartNormalizedComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartNormalizedComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AreaChartNormalizedComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AreaChartNormalizedComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AreaChartNormalizedComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    ContentChild('seriesTooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AreaChartNormalizedComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaChartNormalizedComponent.prototype, "hideCircles", null);
AreaChartNormalizedComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-area-chart-normalized',
        template: "<ng-svg-charts-chart\n[view]=\"[width, height]\"\n[showLegend]=\"legend\"\n[legendOptions]=\"legendOptions\"\n[activeEntries]=\"activeEntries\"\n[animations]=\"animations\"\n(legendLabelClick)=\"onClick($event)\"\n(legendLabelActivate)=\"onActivate($event)\"\n(legendLabelDeactivate)=\"onDeactivate($event)\">\n<svg:defs>\n  <svg:clipPath [attr.id]=\"clipPathId\">\n    <svg:rect\n      [attr.width]=\"dims.width + 10\"\n      [attr.height]=\"dims.height + 10\"\n      [attr.transform]=\"'translate(-5, -5)'\"/>\n  </svg:clipPath>\n</svg:defs>\n<svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n  <svg:g ng-svg-charts-x-axis\n    *ngIf=\"xAxis\"\n    [xScale]=\"xScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showXAxisLabel\"\n    [labelText]=\"xAxisLabel\"\n    [trimTicks]=\"trimXAxisTicks\"\n    [maxTickLength]=\"maxXAxisTickLength\"\n    [tickFormatting]=\"xAxisTickFormatting\"\n    [ticks]=\"xAxisTicks\"\n    (dimensionsChanged)=\"updateXAxisHeight($event)\">\n  </svg:g>\n  <svg:g ng-svg-charts-y-axis\n    *ngIf=\"yAxis\"\n    [yScale]=\"yScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showYAxisLabel\"\n    [labelText]=\"yAxisLabel\"\n    [trimTicks]=\"trimYAxisTicks\"\n    [maxTickLength]=\"maxYAxisTickLength\"\n    [tickFormatting]=\"yAxisTickFormatting\"\n    [ticks]=\"yAxisTicks\"\n    (dimensionsChanged)=\"updateYAxisWidth($event)\">\n  </svg:g>\n  <svg:g [attr.clip-path]=\"clipPath\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-area-series\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [activeEntries]=\"activeEntries\"\n        [gradient]=\"gradient\"\n        normalized=\"true\"\n        [curve]=\"curve\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n\n    <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n      <svg:g ng-svg-charts-tooltip-area\n        [dims]=\"dims\"\n        [xSet]=\"xSet\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [results]=\"results\"\n        [colors]=\"colors\"\n        [showPercentage]=\"true\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"seriesTooltipTemplate\"\n        (hover)=\"updateHoveredVertical($event)\"\n      />\n\n      <svg:g *ngFor=\"let series of results\">\n        <svg:g ng-svg-charts-circle-series\n          type=\"stacked\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [activeEntries]=\"activeEntries\"\n          [data]=\"series\"\n          [scaleType]=\"scaleType\"\n          [visibleValue]=\"hoveredVertical\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          (select)=\"onClick($event, series)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </svg:g>\n  </svg:g>\n</svg:g>\n<svg:g ng-svg-charts-timeline\n  *ngIf=\"timeline && scaleType != 'ordinal'\"\n  [attr.transform]=\"timelineTransform\"\n  [results]=\"results\"\n  [view]=\"[timelineWidth, height]\"\n  [height]=\"timelineHeight\"\n  [scheme]=\"scheme\"\n  [customColors]=\"customColors\"\n  [legend]=\"legend\"\n  [scaleType]=\"scaleType\"\n  (onDomainChange)=\"updateDomain($event)\">\n  <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n    <svg:g ng-svg-charts-area-series\n      [xScale]=\"timelineXScale\"\n      [yScale]=\"timelineYScale\"\n      [colors]=\"colors\"\n      [data]=\"series\"\n      [scaleType]=\"scaleType\"\n      [gradient]=\"gradient\"\n      normalized=\"true\"\n      [curve]=\"curve\"\n      [animations]=\"animations\"\n    />\n  </svg:g>\n</svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], AreaChartNormalizedComponent);

let AreaChartStackedComponent = class AreaChartStackedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.showGridLines = true;
        this.curve = curveLinear;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.xSet.length; i++) {
            const val = this.xSet[i];
            let d0 = 0;
            for (const group of this.results) {
                let d = group.series.find(item => {
                    let a = item.name;
                    let b = val;
                    if (this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
            }
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = `url(#${this.clipPathId})`;
    }
    updateTimeline() {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
        }
    }
    getXDomain() {
        let values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        let domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
        }
        let min;
        let max;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min = this.xScaleMin
                ? this.xScaleMin
                : Math.min(...values);
            max = this.xScaleMax
                ? this.xScaleMax
                : Math.max(...values);
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min), new Date(max)];
            this.xSet = [...values].sort((a, b) => {
                const aDate = a.getTime();
                const bDate = b.getTime();
                if (aDate > bDate) {
                    return 1;
                }
                if (bDate > aDate) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = [...values].sort((a, b) => (a - b));
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    }
    getYDomain() {
        const domain = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.xSet.length; i++) {
            const val = this.xSet[i];
            let sum = 0;
            for (const group of this.results) {
                const d = group.series.find(item => {
                    let a = item.name;
                    let b = val;
                    if (this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    sum += d.value;
                }
            }
            domain.push(sum);
        }
        const min = this.yScaleMin
            ? this.yScaleMin
            : Math.min(0, ...domain);
        const max = this.yScaleMax
            ? this.yScaleMax
            : Math.max(...domain);
        return [min, max];
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .padding(0.1);
        }
        scale
            .range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getYScale(domain, height) {
        const scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    updateDomain(domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    }
    updateHoveredVertical(item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    }
    hideCircles() {
        this.hoveredVertical = null;
        this.deactivateAll();
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "timeline", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartStackedComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AreaChartStackedComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartStackedComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaChartStackedComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], AreaChartStackedComponent.prototype, "yScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], AreaChartStackedComponent.prototype, "yScaleMax", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AreaChartStackedComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AreaChartStackedComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AreaChartStackedComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    ContentChild('seriesTooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AreaChartStackedComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaChartStackedComponent.prototype, "hideCircles", null);
AreaChartStackedComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-area-chart-stacked',
        template: "<ng-svg-charts-chart\n[view]=\"[width, height]\"\n[showLegend]=\"legend\"\n[legendOptions]=\"legendOptions\"\n[activeEntries]=\"activeEntries\"\n[animations]=\"animations\"\n(legendLabelClick)=\"onClick($event)\"\n(legendLabelActivate)=\"onActivate($event)\"\n(legendLabelDeactivate)=\"onDeactivate($event)\">\n<svg:defs>\n  <svg:clipPath [attr.id]=\"clipPathId\">\n    <svg:rect\n      [attr.width]=\"dims.width + 10\"\n      [attr.height]=\"dims.height + 10\"\n      [attr.transform]=\"'translate(-5, -5)'\"/>\n  </svg:clipPath>\n</svg:defs>\n<svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n  <svg:g ng-svg-charts-x-axis\n    *ngIf=\"xAxis\"\n    [xScale]=\"xScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showXAxisLabel\"\n    [labelText]=\"xAxisLabel\"\n    [trimTicks]=\"trimXAxisTicks\"\n    [maxTickLength]=\"maxXAxisTickLength\"\n    [tickFormatting]=\"xAxisTickFormatting\"\n    [ticks]=\"xAxisTicks\"\n    (dimensionsChanged)=\"updateXAxisHeight($event)\">\n  </svg:g>\n  <svg:g ng-svg-charts-y-axis\n    *ngIf=\"yAxis\"\n    [yScale]=\"yScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showYAxisLabel\"\n    [labelText]=\"yAxisLabel\"\n    [trimTicks]=\"trimYAxisTicks\"\n    [maxTickLength]=\"maxYAxisTickLength\"\n    [tickFormatting]=\"yAxisTickFormatting\"\n    [ticks]=\"yAxisTicks\"\n    (dimensionsChanged)=\"updateYAxisWidth($event)\">\n  </svg:g>\n  <svg:g [attr.clip-path]=\"clipPath\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-area-series\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [gradient]=\"gradient\"\n        [activeEntries]=\"activeEntries\"\n        stacked=\"true\"\n        [curve]=\"curve\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n\n    <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n      <svg:g ng-svg-charts-tooltip-area\n        [dims]=\"dims\"\n        [xSet]=\"xSet\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [results]=\"results\"\n        [colors]=\"colors\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"seriesTooltipTemplate\"\n        (hover)=\"updateHoveredVertical($event)\"\n      />\n\n      <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n        <svg:g ng-svg-charts-circle-series\n          type=\"stacked\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [activeEntries]=\"activeEntries\"\n          [data]=\"series\"\n          [scaleType]=\"scaleType\"\n          [visibleValue]=\"hoveredVertical\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          (select)=\"onClick($event, series)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </svg:g>\n  </svg:g>\n</svg:g>\n<svg:g ng-svg-charts-timeline\n  *ngIf=\"timeline && scaleType != 'ordinal'\"\n  [attr.transform]=\"timelineTransform\"\n  [results]=\"results\"\n  [view]=\"[timelineWidth, height]\"\n  [height]=\"timelineHeight\"\n  [scheme]=\"scheme\"\n  [customColors]=\"customColors\"\n  [legend]=\"legend\"\n  [scaleType]=\"scaleType\"\n  (onDomainChange)=\"updateDomain($event)\">\n  <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n    <svg:g ng-svg-charts-area-series\n      [xScale]=\"timelineXScale\"\n      [yScale]=\"timelineYScale\"\n      [colors]=\"colors\"\n      [data]=\"series\"\n      [scaleType]=\"scaleType\"\n      [gradient]=\"gradient\"\n      stacked=\"true\"\n      [curve]=\"curve\"\n      [animations]=\"animations\"\n    />\n  </svg:g>\n</svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], AreaChartStackedComponent);

let AreaSeriesComponent = class AreaSeriesComponent {
    constructor() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradient();
        let currentArea;
        let startingArea;
        const xProperty = (d) => {
            const label = d.name;
            return this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0((d, i) => this.yScale(d.d0))
                .y1((d, i) => this.yScale(d.d1));
            startingArea = area()
                .x(xProperty)
                .y0(d => this.yScale.range()[0])
                .y1(d => this.yScale.range()[0]);
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(() => this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue))
                .y1(d => this.yScale(d.value));
            startingArea = area()
                .x(xProperty)
                .y0(d => this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue))
                .y1(d => this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue));
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = .8;
        let data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    }
    updateGradient() {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                const d0values = this.data.series.map(d => d.d0);
                const d1values = this.data.series.map(d => d.d1);
                const max = Math.max(...d1values);
                const min = Math.min(...d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                const values = this.data.series.map(d => d.value);
                const max = Math.max(...values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isInactive(entry) {
        if (!this.activeEntries || this.activeEntries.length === 0) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "baseValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "stacked", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "normalized", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AreaSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "select", void 0);
AreaSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-area-series]',
        template: 'area-series.template.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], AreaSeriesComponent);

let AreaChartModule = class AreaChartModule {
};
AreaChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            AreaChartComponent,
            AreaChartNormalizedComponent,
            AreaChartStackedComponent,
            AreaSeriesComponent
        ],
        exports: [
            AreaChartComponent,
            AreaChartNormalizedComponent,
            AreaChartStackedComponent,
            AreaSeriesComponent
        ]
    })
], AreaChartModule);

let BarComponent = class BarComponent {
    constructor(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    }
    update() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    }
    loadAnimation() {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    }
    updatePathEl() {
        const node = select(this.element).select('.bar');
        const path = this.getPath();
        if (this.animations) {
            node.transition().duration(500)
                .attr('d', path);
        }
        else {
            node.attr('d', path);
        }
    }
    getGradient() {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    getStartingPath() {
        if (!this.animations) {
            return this.getPath();
        }
        let radius = this.getRadius();
        let path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        return path;
    }
    getPath() {
        let radius = this.getRadius();
        let path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        }
        else {
            path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
        }
        return path;
    }
    getRadius() {
        let radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    }
    getStartOpacity() {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    }
    get edges() {
        let edges = [false, false, false, false];
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                if (this.data.value > 0) {
                    edges = [true, true, false, false];
                }
                else {
                    edges = [false, false, true, true];
                }
            }
            else if (this.orientation === 'horizontal') {
                if (this.data.value > 0) {
                    edges = [false, true, false, true];
                }
                else {
                    edges = [true, false, true, false];
                }
            }
        }
        return edges;
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "x", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "y", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "orientation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "offset", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "isActive", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarComponent.prototype, "stops", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "animations", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarComponent.prototype, "ariaLabel", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BarComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BarComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BarComponent.prototype, "deactivate", void 0);
__decorate([
    HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BarComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BarComponent.prototype, "onMouseLeave", null);
BarComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-bar]',
        template: "<svg:defs *ngIf=\"hasGradient\">\n  <svg:g ng-svg-charts-svg-linear-gradient\n    [orientation]=\"orientation\"\n    [name]=\"gradientId\"\n    [stops]=\"gradientStops\"\n  />\n</svg:defs>\n<svg:path\n  class=\"bar\"\n  stroke=\"none\"\n  role=\"img\"\n  tabIndex=\"-1\"\n  [class.active]=\"isActive\"\n  [attr.d]=\"path\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.fill]=\"hasGradient ? gradientFill : fill\"\n  (click)=\"select.emit(data)\"\n/>",
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], BarComponent);

let BarHorizontalComponent = class BarHorizontalComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getXScale() {
        this.xDomain = this.getXDomain();
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getYScale() {
        this.yDomain = this.getYDomain();
        const spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.yDomain);
    }
    getXDomain() {
        const values = this.results.map(d => d.value);
        const min = this.xScaleMin
            ? Math.min(this.xScaleMin, ...values)
            : Math.min(0, ...values);
        const max = this.xScaleMax
            ? Math.max(this.xScaleMax, ...values)
            : Math.max(0, ...values);
        return [min, max];
    }
    getYDomain() {
        return this.results.map(d => d.name);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.yDomain;
        }
        else {
            domain = this.xDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.yDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.xDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxWidthChanged(event) {
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (event.index === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarHorizontalComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarHorizontalComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarHorizontalComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarHorizontalComponent.prototype, "xScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontalComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontalComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarHorizontalComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-horizontal',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelClick)=\"onClick($event)\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-series-horizontal\n      [xScale]=\"xScale\"\n      [yScale]=\"yScale\"\n      [colors]=\"colors\"\n      [series]=\"results\"\n      [dims]=\"dims\"\n      [gradient]=\"gradient\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [activeEntries]=\"activeEntries\"\n      [roundEdges]=\"roundEdges\"\n      [animations]=\"animations\"\n      [showDataLabel]=\"showDataLabel\"\n      [dataLabelFormatting]=\"dataLabelFormatting\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n      (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event)\"\n      >\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarHorizontalComponent);

let BarHorizontal2DComponent = class BarHorizontal2DComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.groupPadding = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getGroupScale() {
        const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    }
    getInnerScale() {
        const height = this.groupScale.bandwidth();
        const spacing = this.innerDomain.length / (height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, height])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    }
    getValueScale() {
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        const min = Math.min(0, ...domain);
        const max = this.xScaleMax
            ? Math.max(this.xScaleMax, ...domain)
            : Math.max(0, ...domain);
        return [min, max];
    }
    groupTransform(group) {
        return `translate(0, ${this.groupScale(group.name)})`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxWidthChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (groupIndex === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarHorizontal2DComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "groupPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarHorizontal2DComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontal2DComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontal2DComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarHorizontal2DComponent.prototype, "tooltipTemplate", void 0);
BarHorizontal2DComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-horizontal-2d',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-grid-panel-series\n      [xScale]=\"valueScale\"\n      [yScale]=\"groupScale\"\n      [data]=\"results\"\n      [dims]=\"dims\"\n      orient=\"horizontal\">\n    </svg:g>\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"valueScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"groupScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-horizontal\n        [xScale]=\"valueScale\"\n        [activeEntries]=\"activeEntries\"\n        [yScale]=\"innerScale\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [roundEdges]=\"roundEdges\"\n        [animations]=\"animations\"\n        [showDataLabel]=\"showDataLabel\"\n        [dataLabelFormatting]=\"dataLabelFormatting\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n        (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarHorizontal2DComponent);

let BarHorizontalNormalizedComponent = class BarHorizontalNormalizedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        return [0, 100];
    }
    getYScale() {
        const spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    }
    getXScale() {
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    groupTransform(group) {
        return `translate(0, ${this.yScale(group.name)})`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarHorizontalNormalizedComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalNormalizedComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarHorizontalNormalizedComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalNormalizedComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalNormalizedComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "roundDomains", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontalNormalizedComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontalNormalizedComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarHorizontalNormalizedComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalNormalizedComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-horizontal-normalized',
        template: 'bar-horizontal-normalized.template.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarHorizontalNormalizedComponent);

let BarHorizontalStackedComponent = class BarHorizontalStackedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        let smallest = 0;
        let biggest = 0;
        for (const group of this.results) {
            let smallestSum = 0;
            let biggestSum = 0;
            for (const d of group.series) {
                if (d.value < 0) {
                    smallestSum += d.value;
                }
                else {
                    biggestSum += d.value;
                }
                smallest = d.value < smallest ? d.value : smallest;
                biggest = d.value > biggest ? d.value : biggest;
            }
            domain.push(smallestSum);
            domain.push(biggestSum);
        }
        domain.push(smallest);
        domain.push(biggest);
        const min = Math.min(0, ...domain);
        const max = this.xScaleMax
            ? Math.max(this.xScaleMax, ...domain)
            : Math.max(...domain);
        return [min, max];
    }
    getYScale() {
        const spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    }
    getXScale() {
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    groupTransform(group) {
        return `translate(0, ${this.yScale(group.name)})`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxWidthChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (groupIndex === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarHorizontalStackedComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalStackedComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarHorizontalStackedComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalStackedComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarHorizontalStackedComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarHorizontalStackedComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontalStackedComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarHorizontalStackedComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarHorizontalStackedComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalStackedComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-horizontal-stacked',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-horizontal\n        type=\"stacked\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [activeEntries]=\"activeEntries\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [animations]=\"animations\"\n        [showDataLabel]=\"showDataLabel\"\n        [dataLabelFormatting]=\"dataLabelFormatting\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n        (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarHorizontalStackedComponent);

let BarVerticalComponent = class BarVerticalComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
    }
    getXScale() {
        this.xDomain = this.getXDomain();
        const spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    }
    getYScale() {
        this.yDomain = this.getYDomain();
        const scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getXDomain() {
        return this.results.map(d => d.name);
    }
    getYDomain() {
        const values = this.results.map(d => d.value);
        const min = this.yScaleMin
            ? Math.min(this.yScaleMin, ...values)
            : Math.min(0, ...values);
        const max = this.yScaleMax
            ? Math.max(this.yScaleMax, ...values)
            : Math.max(0, ...values);
        return [min, max];
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxHeightChanged(event) {
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (event.index === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarVerticalComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarVerticalComponent.prototype, "yScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarVerticalComponent.prototype, "yScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVerticalComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVerticalComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarVerticalComponent.prototype, "tooltipTemplate", void 0);
BarVerticalComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-vertical',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelClick)=\"onClick($event)\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-series-vertical\n      [xScale]=\"xScale\"\n      [yScale]=\"yScale\"\n      [colors]=\"colors\"\n      [series]=\"results\"\n      [dims]=\"dims\"\n      [gradient]=\"gradient\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [showDataLabel]=\"showDataLabel\"\n      [dataLabelFormatting]=\"dataLabelFormatting\"\n      [activeEntries]=\"activeEntries\"\n      [roundEdges]=\"roundEdges\"\n      [animations]=\"animations\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n      (select)=\"onClick($event)\"\n      (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event)\"\n      >\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarVerticalComponent);

let BarVertical2DComponent = class BarVertical2DComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.scaleType = 'ordinal';
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.groupPadding = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
    }
    onDataLabelMaxHeightChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (groupIndex === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    getGroupScale() {
        const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    }
    getInnerScale() {
        const width = this.groupScale.bandwidth();
        const spacing = this.innerDomain.length / (width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, width])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    }
    getValueScale() {
        const scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        const min = Math.min(0, ...domain);
        const max = this.yScaleMax
            ? Math.max(this.yScaleMax, ...domain)
            : Math.max(0, ...domain);
        return [min, max];
    }
    groupTransform(group) {
        return `translate(${this.groupScale(group.name)}, 0)`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "scaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarVertical2DComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVertical2DComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarVertical2DComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVertical2DComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVertical2DComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "groupPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarVertical2DComponent.prototype, "yScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVertical2DComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVertical2DComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarVertical2DComponent.prototype, "tooltipTemplate", void 0);
BarVertical2DComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-vertical-2d',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-grid-panel-series\n      [xScale]=\"groupScale\"\n      [yScale]=\"valueScale\"\n      [data]=\"results\"\n      [dims]=\"dims\"\n      orient=\"vertical\">\n    </svg:g>\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"groupScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"valueScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-series-vertical\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\"\n      [activeEntries]=\"activeEntries\"\n      [xScale]=\"innerScale\"\n      [yScale]=\"valueScale\"\n      [colors]=\"colors\"\n      [series]=\"group.series\"\n      [dims]=\"dims\"\n      [gradient]=\"gradient\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [showDataLabel]=\"showDataLabel\"\n      [dataLabelFormatting]=\"dataLabelFormatting\"\n      [seriesName]=\"group.name\"\n      [roundEdges]=\"roundEdges\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event, group)\"\n      (activate)=\"onActivate($event, group)\"\n      (deactivate)=\"onDeactivate($event, group)\"\n      (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarVertical2DComponent);

let BarVerticalNormalizedComponent = class BarVerticalNormalizedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        return [0, 100];
    }
    getXScale() {
        const spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    }
    getYScale() {
        const scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    groupTransform(group) {
        return `translate(${this.xScale(group.name)}, 0)`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarVerticalNormalizedComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalNormalizedComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarVerticalNormalizedComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalNormalizedComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalNormalizedComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "roundDomains", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVerticalNormalizedComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVerticalNormalizedComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarVerticalNormalizedComponent.prototype, "tooltipTemplate", void 0);
BarVerticalNormalizedComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-vertical-normalized',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-vertical\n        type=\"normalized\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [activeEntries]=\"activeEntries\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [animations]=\"animations\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarVerticalNormalizedComponent);

let BarVerticalStackedComponent = class BarVerticalStackedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.showDataLabel = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
    }
    getGroupDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getInnerDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        let smallest = 0;
        let biggest = 0;
        for (const group of this.results) {
            let smallestSum = 0;
            let biggestSum = 0;
            for (const d of group.series) {
                if (d.value < 0) {
                    smallestSum += d.value;
                }
                else {
                    biggestSum += d.value;
                }
                smallest = d.value < smallest ? d.value : smallest;
                biggest = d.value > biggest ? d.value : biggest;
            }
            domain.push(smallestSum);
            domain.push(biggestSum);
        }
        domain.push(smallest);
        domain.push(biggest);
        const min = Math.min(0, ...domain);
        const max = this.yScaleMax
            ? Math.max(this.yScaleMax, ...domain)
            : Math.max(...domain);
        return [min, max];
    }
    getXScale() {
        const spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    }
    getYScale() {
        const scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    onDataLabelMaxHeightChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (groupIndex === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    groupTransform(group) {
        return `translate(${this.xScale(group.name)}, 0)`;
    }
    onClick(data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(event, group) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BarVerticalStackedComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalStackedComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BarVerticalStackedComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalStackedComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BarVerticalStackedComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "barPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BarVerticalStackedComponent.prototype, "yScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVerticalStackedComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarVerticalStackedComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BarVerticalStackedComponent.prototype, "tooltipTemplate", void 0);
BarVerticalStackedComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bar-vertical-stacked',
        template: 'bar-vertical-stacked.template.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                        transform: '*',
                    }),
                    animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarVerticalStackedComponent);

var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
let SeriesVerticalComponent = class SeriesVerticalComponent {
    constructor() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelHeightChanged = new EventEmitter();
        this.barsForDataLabels = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateTooltipSettings();
        let width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        const yScaleMin = Math.max(this.yScale.domain()[0], 0);
        const d0 = {
            [D0Types.positive]: 0,
            [D0Types.negative]: 0
        };
        let d0Type = D0Types.positive;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
        }
        this.bars = this.series.map((d, index) => {
            let value = d.value;
            const label = d.name;
            const formattedLabel = formatLabel(label);
            const roundEdges = this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            const bar = {
                value,
                label,
                roundEdges,
                data: d,
                width,
                formattedLabel,
                height: 0,
                x: 0,
                y: 0,
            };
            if (this.type === 'standard') {
                bar.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
                bar.x = this.xScale(label);
                if (value < 0) {
                    bar.y = this.yScale(0);
                }
                else {
                    bar.y = this.yScale(value);
                }
            }
            else if (this.type === 'stacked') {
                const offset0 = d0[d0Type];
                const offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = this.yScale(offset0) - this.yScale(offset1);
                bar.x = 0;
                bar.y = this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (this.type === 'normalized') {
                let offset0 = d0[d0Type];
                let offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = this.yScale(offset0) - this.yScale(offset1);
                bar.x = 0;
                bar.y = this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (this.colors.scaleType === 'ordinal') {
                bar.color = this.colors.getColor(label);
            }
            else {
                if (this.type === 'standard') {
                    bar.color = this.colors.getColor(value);
                    bar.gradientStops = this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = this.colors.getColor(bar.offset1);
                    bar.gradientStops =
                        this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            let tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (this.seriesName) {
                tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
                bar.data.series = this.seriesName;
                bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = this.tooltipDisabled ? undefined : `
        <span class="tooltip-label">${tooltipLabel}</span>
        <span class="tooltip-val">${value.toLocaleString()}</span>
      `;
            return bar;
        });
        this.updateDataLabels();
    }
    updateDataLabels() {
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            const section = {};
            section.series = this.seriesName;
            const totalPositive = this.series.map(d => d.value).reduce((sum, d) => d > 0 ? sum + d : sum, 0);
            const totalNegative = this.series.map(d => d.value).reduce((sum, d) => d < 0 ? sum + d : sum, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            if (section.total > 0) {
                section.height = this.yScale(totalPositive);
            }
            else {
                section.height = this.yScale(totalNegative);
            }
            section.width = this.xScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(d => {
                const section = {};
                section.series = this.seriesName ? this.seriesName : d.name;
                section.total = d.value;
                section.x = this.xScale(d.name);
                section.y = this.yScale(0);
                section.height = this.yScale(section.total) - this.yScale(0);
                section.width = this.xScale.bandwidth();
                return section;
            });
        }
    }
    updateTooltipSettings() {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    onClick(data) {
        this.select.emit(data);
    }
    trackBy(index, bar) {
        return bar.label;
    }
    trackDataLabelBy(index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "series", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SeriesVerticalComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SeriesVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SeriesVerticalComponent.prototype, "seriesName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SeriesVerticalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "animations", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "deactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
SeriesVerticalComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-series-vertical]',
        template: `
    <svg:g ng-svg-charts-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      [gradient]="gradient"
      [ariaLabel]="bar.ariaLabel"
      [isActive]="isActive(bar.data)"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data"
      [animations]="animations">
    </svg:g>
    <svg:g *ngIf="showDataLabel">
      <svg:g ng-svg-charts-bar-label *ngFor="let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy"
        [barX]="b.x"
        [barY]="b.y"
        [barWidth]="b.width"
        [barHeight]="b.height"
        [value]="b.total"
        [valueFormatting]="dataLabelFormatting"
        [orientation]="'vertical'"
        (dimensionsChanged)="dataLabelHeightChanged.emit({size:$event, index:i})"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1
                    }),
                    animate(500, style({ opacity: 0 }))
                ])
            ])
        ]
    })
], SeriesVerticalComponent);

let SeriesHorizontalComponent = class SeriesHorizontalComponent {
    constructor() {
        this.barsForDataLabels = [];
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelWidthChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateTooltipSettings();
        const d0 = {
            [D0Types.positive]: 0,
            [D0Types.negative]: 0
        };
        let d0Type;
        d0Type = D0Types.positive;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
        }
        const xScaleMin = Math.max(this.xScale.domain()[0], 0);
        this.bars = this.series.map((d, index) => {
            let value = d.value;
            const label = d.name;
            const formattedLabel = formatLabel(label);
            const roundEdges = this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            const bar = {
                value,
                label,
                roundEdges,
                data: d,
                formattedLabel
            };
            bar.height = this.yScale.bandwidth();
            if (this.type === 'standard') {
                bar.width = Math.abs(this.xScale(value) - this.xScale(xScaleMin));
                if (value < 0) {
                    bar.x = this.xScale(value);
                }
                else {
                    bar.x = this.xScale(xScaleMin);
                }
                bar.y = this.yScale(label);
            }
            else if (this.type === 'stacked') {
                const offset0 = d0[d0Type];
                const offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.width = this.xScale(offset1) - this.xScale(offset0);
                bar.x = this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (this.type === 'normalized') {
                let offset0 = d0[d0Type];
                let offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = this.xScale(offset1) - this.xScale(offset0);
                bar.x = this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (this.colors.scaleType === 'ordinal') {
                bar.color = this.colors.getColor(label);
            }
            else {
                if (this.type === 'standard') {
                    bar.color = this.colors.getColor(value);
                    bar.gradientStops = this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = this.colors.getColor(bar.offset1);
                    bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            let tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (this.seriesName) {
                tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
                bar.data.series = this.seriesName;
                bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = this.tooltipDisabled ? undefined : `
        <span class="tooltip-label">${tooltipLabel}</span>
        <span class="tooltip-val">${value.toLocaleString()}</span>
      `;
            return bar;
        });
        this.updateDataLabels();
    }
    updateDataLabels() {
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            const section = {};
            section.series = this.seriesName;
            const totalPositive = this.series.map(d => d.value).reduce((sum, d) => d > 0 ? sum + d : sum, 0);
            const totalNegative = this.series.map(d => d.value).reduce((sum, d) => d < 0 ? sum + d : sum, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            // if total is positive then we show it on the right, otherwise on the left
            if (section.total > 0) {
                section.width = this.xScale(totalPositive);
            }
            else {
                section.width = this.xScale(totalNegative);
            }
            section.height = this.yScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(d => {
                const section = {};
                section.series = this.seriesName ? this.seriesName : d.name;
                section.total = d.value;
                section.x = this.xScale(0);
                section.y = this.yScale(d.name);
                section.width = this.xScale(section.total) - this.xScale(0);
                section.height = this.yScale.bandwidth();
                return section;
            });
        }
    }
    updateTooltipSettings() {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    trackBy(index, bar) {
        return bar.label;
    }
    trackDataLabelBy(index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    }
    click(data) {
        this.select.emit(data);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "series", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SeriesHorizontalComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SeriesHorizontalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SeriesHorizontalComponent.prototype, "seriesName", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], SeriesHorizontalComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SeriesHorizontalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "animations", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "deactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SeriesHorizontalComponent.prototype, "dataLabelWidthChanged", void 0);
SeriesHorizontalComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-series-horizontal]',
        template: `
    <svg:g ng-svg-charts-bar
      *ngFor="let bar of bars; trackBy:trackBy"
      [@animationState]="'active'"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'horizontal'"
      [roundEdges]="bar.roundEdges"
      (select)="click($event)"
      [gradient]="gradient"
      [isActive]="isActive(bar.data)"
      [ariaLabel]="bar.ariaLabel"
      [animations]="animations"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data">
    </svg:g>
    <svg:g *ngIf="showDataLabel">
      <svg:g ng-svg-charts-bar-label *ngFor="let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy"
        [barX]="b.x"
        [barY]="b.y"
        [barWidth]="b.width"
        [barHeight]="b.height"
        [value]="b.total"
        [valueFormatting]="dataLabelFormatting"
        [orientation]="'horizontal'"
        (dimensionsChanged)="dataLabelWidthChanged.emit({size:$event, index:i})"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1
                    }),
                    animate(500, style({ opacity: 0 }))
                ])
            ])
        ]
    })
], SeriesHorizontalComponent);

let BarLabelComponent = class BarLabelComponent {
    constructor(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getSize() {
        const h = this.element.getBoundingClientRect().height;
        const w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    }
    ngAfterViewInit() {
        this.dimensionsChanged.emit(this.getSize());
    }
    update() {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        }
        else {
            this.formatedValue = formatLabel(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            // if the value is negative then it's on the left of the x0.
            // we need to put the data label in front of the bar
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        }
        else {
            // orientation must be "vertical"
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = `rotate(-45, ${this.x} , ${this.y})`;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "barX", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "barY", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "barWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "barHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarLabelComponent.prototype, "orientation", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarLabelComponent.prototype, "dimensionsChanged", void 0);
BarLabelComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-bar-label]',
        template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y">
      {{formatedValue}}
    </svg:text>

  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".textDataLabel{font-size:11px}"]
    }),
    __metadata("design:paramtypes", [ElementRef])
], BarLabelComponent);

let BarChartModule = class BarChartModule {
};
BarChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            BarComponent,
            BarHorizontalComponent,
            BarHorizontal2DComponent,
            BarHorizontalNormalizedComponent,
            BarHorizontalStackedComponent,
            BarVerticalComponent,
            BarVertical2DComponent,
            BarVerticalNormalizedComponent,
            BarVerticalStackedComponent,
            BarLabelComponent,
            SeriesHorizontalComponent,
            SeriesVerticalComponent
        ],
        exports: [
            BarComponent,
            BarHorizontalComponent,
            BarHorizontal2DComponent,
            BarHorizontalNormalizedComponent,
            BarHorizontalStackedComponent,
            BarVerticalComponent,
            BarVertical2DComponent,
            BarVerticalNormalizedComponent,
            BarVerticalStackedComponent,
            BarLabelComponent,
            SeriesHorizontalComponent,
            SeriesVerticalComponent
        ]
    })
], BarChartModule);

function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    let domain = [];
    if (scaleType === 'linear') {
        values = values.map(v => Number(v));
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === 'time' || scaleType === 'linear') {
        const min = minVal ? minVal : Math.min(...values);
        const max = maxVal ? maxVal : Math.max(...values);
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
function getScale(domain, range, scaleType, roundDomains) {
    let scale;
    if (scaleType === 'time') {
        scale = scaleTime()
            .range(range)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = scaleLinear()
            .range(range)
            .domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    }
    else if (scaleType === 'ordinal') {
        scale = scalePoint()
            .range([range[0], range[1]])
            .domain(domain);
    }
    return scale;
}

let BubbleChartComponent = class BubbleChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.showGridLines = true;
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.xAxis = true;
        this.yAxis = true;
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.maxRadius = 10;
        this.minRadius = 3;
        this.schemeType = 'ordinal';
        this.tooltipDisabled = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.scaleType = 'linear';
        this.margin = [10, 20, 10, 20];
        this.bubblePadding = [0, 0, 0, 0];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.activeEntries = [];
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.seriesDomain = this.results.map(d => d.name);
        this.rDomain = this.getRDomain();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.transform = `translate(${this.dims.xOffset},${this.margin[0]})`;
        const colorDomain = this.schemeType === 'ordinal' ? this.seriesDomain : this.rDomain;
        this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);
        this.data = this.results;
        this.minRadius = Math.max(this.minRadius, 1);
        this.maxRadius = Math.max(this.maxRadius, 1);
        this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
        this.bubblePadding = [0, 0, 0, 0];
        this.setScales();
        this.bubblePadding = this.getBubblePadding();
        this.setScales();
        this.legendOptions = this.getLegendOptions();
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = `url(#${this.clipPathId})`;
    }
    hideCircles() {
        this.deactivateAll();
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    getBubblePadding() {
        let yMin = 0;
        let xMin = 0;
        let yMax = this.dims.height;
        let xMax = this.dims.width;
        for (const s of this.data) {
            for (const d of s.series) {
                const r = this.rScale(d.r);
                const cx = (this.xScaleType === 'linear') ? this.xScale(Number(d.x)) : this.xScale(d.x);
                const cy = (this.yScaleType === 'linear') ? this.yScale(Number(d.y)) : this.yScale(d.y);
                xMin = Math.max(r - cx, xMin);
                yMin = Math.max(r - cy, yMin);
                yMax = Math.max(cy + r, yMax);
                xMax = Math.max(cx + r, xMax);
            }
        }
        xMax = Math.max(xMax - this.dims.width, 0);
        yMax = Math.max(yMax - this.dims.height, 0);
        return [yMin, xMax, yMax, xMin];
    }
    setScales() {
        let width = this.dims.width;
        if (this.xScaleMin === undefined && this.xScaleMax === undefined) {
            width = width - this.bubblePadding[1];
        }
        let height = this.dims.height;
        if (this.yScaleMin === undefined && this.yScaleMax === undefined) {
            height = height - this.bubblePadding[2];
        }
        this.xScale = this.getXScale(this.xDomain, width);
        this.yScale = this.getYScale(this.yDomain, height);
    }
    getYScale(domain, height) {
        return getScale(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
    }
    getXScale(domain, width) {
        return getScale(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
    }
    getRScale(domain, range) {
        const scale = scaleLinear()
            .range(range)
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            position: this.legendPosition,
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.rDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    getXDomain() {
        const values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.x)) {
                    values.push(d.x);
                }
            }
        }
        this.xScaleType = getScaleType(values);
        return getDomain(values, this.xScaleType, this.autoScale, this.xScaleMin, this.xScaleMax);
    }
    getYDomain() {
        const values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.y)) {
                    values.push(d.y);
                }
            }
        }
        this.yScaleType = getScaleType(values);
        return getDomain(values, this.yScaleType, this.autoScale, this.yScaleMin, this.yScaleMax);
    }
    getRDomain() {
        let min = Infinity;
        let max = -Infinity;
        for (const results of this.results) {
            for (const d of results.series) {
                const value = Number(d.r) || 1;
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
        }
        return [min, max];
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
    trackBy(index, item) {
        return item.name;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BubbleChartComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BubbleChartComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "maxRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "minRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "autoScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "xScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "yScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "yScaleMax", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BubbleChartComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BubbleChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], BubbleChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BubbleChartComponent.prototype, "hideCircles", null);
BubbleChartComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-bubble-chart',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [activeEntries]="activeEntries"
      [legendOptions]="legendOptions"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"/>
        </svg:clipPath>
      </svg:defs>
      <svg:g [attr.transform]="transform" class="bubble-chart chart">
        <svg:g ng-svg-charts-x-axis
          *ngIf="xAxis"
          [showGridLines]="showGridLines"
          [dims]="dims"
          [xScale]="xScale"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"/>
        <svg:g ng-svg-charts-y-axis
          *ngIf="yAxis"
          [showGridLines]="showGridLines"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          (dimensionsChanged)="updateYAxisWidth($event)"/>
        <svg:rect
          class="bubble-chart-area"
          x="0"
          y="0"
          [attr.width]="dims.width"
          [attr.height]="dims.height"
          style="fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';"
          (mouseenter)="deactivateAll()"
        />
        <svg:g [attr.clip-path]="clipPath">
          <svg:g *ngFor="let series of data; trackBy:trackBy" [@animationState]="'active'">
            <svg:g ng-svg-charts-bubble-series
              [xScale]="xScale"
              [yScale]="yScale"
              [rScale]="rScale"
              [xScaleType]="xScaleType"
              [yScaleType]="yScaleType"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
              (select)="onClick($event, series)"
              (activate)="onActivate($event)"
              (deactivate)="onDeactivate($event)" />
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-svg-charts-chart>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                    }),
                    animate(500, style({
                        opacity: 0
                    }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BubbleChartComponent);

let BubbleSeriesComponent = class BubbleSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circles = this.getCircles();
    }
    getCircles() {
        const seriesName = this.data.name;
        return this.data.series.map((d, i) => {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                const y = d.y;
                const x = d.x;
                const r = d.r;
                const radius = this.rScale(r || 1);
                const tooltipLabel = formatLabel(d.name);
                const cx = (this.xScaleType === 'linear') ? this.xScale(Number(x)) : this.xScale(x);
                const cy = (this.yScaleType === 'linear') ? this.yScale(Number(y)) : this.yScale(y);
                const color = (this.colors.scaleType === 'linear') ?
                    this.colors.getColor(r) :
                    this.colors.getColor(seriesName);
                const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
                const opacity = isActive ? 1 : 0.3;
                const data = {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                };
                return {
                    data,
                    x,
                    y,
                    r,
                    classNames: [`circle-data-${i}`],
                    value: y,
                    label: x,
                    cx,
                    cy,
                    radius,
                    tooltipLabel,
                    color,
                    opacity,
                    seriesName,
                    isActive,
                    transform: `translate(${cx},${cy})`
                };
            }
        }).filter((circle) => circle !== undefined);
    }
    getTooltipText(circle) {
        const hasRadius = typeof circle.r !== 'undefined';
        const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        const hasSeriesName = circle.seriesName && circle.seriesName.length;
        const radiusValue = hasRadius ? formatLabel(circle.r) : '';
        const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
        const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
        const x = formatLabel(circle.x);
        const y = formatLabel(circle.y);
        const name = (hasSeriesName && hasTooltipLabel) ?
            `${circle.seriesName} • ${circle.tooltipLabel}` :
            circle.seriesName + circle.tooltipLabel;
        const tooltipTitle = (hasSeriesName || hasTooltipLabel) ?
            `<span class="tooltip-label">${name}</span>` :
            '';
        return `
      ${tooltipTitle}
      <span class="tooltip-label">
        <label>${xAxisLabel}</label> ${x}<br />
        <label>${yAxisLabel}</label> ${y}
      </span>
      <span class="tooltip-val">
        ${radiusValue}
      </span>
    `;
    }
    onClick(value, label) {
        this.select.emit({
            name: label,
            value
        });
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isVisible(circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    }
    activateCircle(circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle(circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    }
    trackBy(index, circle) {
        return `${circle.data.series} ${circle.data.name}`;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "rScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "xScaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "yScaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "visibleValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], BubbleSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "deactivate", void 0);
BubbleSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-bubble-series]',
        template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g ng-svg-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick($event, circle.label)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="'top'"
          [tooltipType]="'tooltip'"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        opacity: 0,
                        transform: 'scale(0)'
                    }),
                    animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                ])
            ])
        ]
    })
], BubbleSeriesComponent);

let BubbleChartModule = class BubbleChartModule {
};
BubbleChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            BubbleChartComponent,
            BubbleSeriesComponent
        ],
        exports: [
            BubbleChartComponent,
            BubbleSeriesComponent
        ]
    })
], BubbleChartModule);

let HeatMapCellComponent = class HeatMapCellComponent {
    constructor(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.transform = `translate(${this.x} , ${this.y})`;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
    }
    getGradientStops() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    loadAnimation() {
        const node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    }
    animateToCurrentForm() {
        const node = select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    }
    onClick() {
        this.select.emit(this.data);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "x", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "y", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "select", void 0);
HeatMapCellComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-heat-map-cell]',
        template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs *ngIf="gradient">
        <svg:g ng-svg-charts-svg-linear-gradient
          orientation="vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="cell"
        style="cursor: pointer"
        (click)="onClick()"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], HeatMapCellComponent);

let HeatCellSeriesComponent = class HeatCellSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnInit() {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cells = this.getCells();
    }
    getCells() {
        const cells = [];
        this.data.map((row) => {
            row.series.map((cell) => {
                const value = cell.value;
                cells.push({
                    row,
                    cell,
                    x: this.xScale(row.name),
                    y: this.yScale(cell.name),
                    width: this.xScale.bandwidth(),
                    height: this.yScale.bandwidth(),
                    fill: this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    }
    getTooltipText({ label, data, series }) {
        return `
      <span class="tooltip-label">${series} • ${label}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
    }
    trackBy(index, item) {
        return item.tooltipText;
    }
    onClick(value, label, series) {
        this.select.emit({
            name: label,
            value,
            series
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], HeatCellSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], HeatCellSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "select", void 0);
HeatCellSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-heat-map-cell-series]',
        template: `
    <svg:g
      ng-svg-charts-heat-map-cell
      *ngFor="let c of cells; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (select)="onClick($event, c.label, c.series)"
      [gradient]="gradient"
      [animations]="animations"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="{series: c.series, name: c.label, value: c.data}">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], HeatCellSeriesComponent);

let HeatMapComponent = class HeatMapComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.innerPadding = 8;
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.tooltipDisabled = false;
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.scaleType = 'linear';
    }
    update() {
        super.update();
        this.formatDates();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.scaleType = getScaleType(this.valueDomain, false);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.scaleType,
            legendPosition: this.legendPosition
        });
        if (this.scaleType === 'linear') {
            let min = this.min;
            let max = this.max;
            if (!this.min) {
                min = Math.min(0, ...this.valueDomain);
            }
            if (!this.max) {
                max = Math.max(...this.valueDomain);
            }
            this.valueDomain = [min, max];
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        this.rects = this.getRects();
    }
    getXDomain() {
        const domain = [];
        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    }
    getYDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    }
    getValueDomain() {
        const domain = [];
        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        return domain;
    }
    /**
     * Converts the input to gap paddingInner in fraction
     * Supports the following inputs:
     *    Numbers: 8
     *    Strings: "8", "8px", "8%"
     *    Arrays: [8,2], "8,2", "[8,2]"
     *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
     *
     * @param {(string | number | Array<string | number>)} value
     * @param {number} [index=0]
     * @param {number} N
     * @param {number} L
     * @returns {number}
     *
     * @memberOf HeatMapComponent
     */
    getDimension(value, index = 0, N, L) {
        if (typeof value === 'string') {
            value = value
                .replace('[', '')
                .replace(']', '')
                .replace('px', '')
                .replace('\'', '');
            if (value.includes(',')) {
                value = value.split(',');
            }
        }
        if (Array.isArray(value) && typeof index === 'number') {
            return this.getDimension(value[index], null, N, L);
        }
        if (typeof value === 'string' && value.includes('%')) {
            return +value.replace('%', '') / 100;
        }
        return N / (L / +value + 1);
    }
    getXScale() {
        const f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .domain(this.xDomain)
            .paddingInner(f);
    }
    getYScale() {
        const f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
        return scaleBand()
            .rangeRound([this.dims.height, 0])
            .domain(this.yDomain)
            .paddingInner(f);
    }
    getRects() {
        const rects = [];
        this.xDomain.map((xVal) => {
            this.yDomain.map((yVal) => {
                rects.push({
                    x: this.xScale(xVal),
                    y: this.yScale(yVal),
                    rx: 3,
                    width: this.xScale.bandwidth(),
                    height: this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain);
    }
    getLegendOptions() {
        return {
            scaleType: this.scaleType,
            domain: this.valueDomain,
            colors: this.scaleType === 'ordinal' ? this.colors : this.colors.scale,
            title: this.scaleType === 'ordinal' ? this.legendTitle : undefined,
            position: this.legendPosition
        };
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], HeatMapComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "innerPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], HeatMapComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], HeatMapComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "tooltipText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "max", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], HeatMapComponent.prototype, "tooltipTemplate", void 0);
HeatMapComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-heat-map',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [animations]="animations"
      [legendOptions]="legendOptions"
      (legendLabelClick)="onClick($event)">
      <svg:g [attr.transform]="transform" class="heat-map chart">
        <svg:g ng-svg-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g ng-svg-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:rect *ngFor="let rect of rects"
          [attr.x]="rect.x"
          [attr.y]="rect.y"
          [attr.rx]="rect.rx"
          [attr.width]="rect.width"
          [attr.height]="rect.height"
          [attr.fill]="rect.fill"
        />
        <svg:g ng-svg-charts-heat-map-cell-series
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [data]="results"
          [gradient]="gradient"
          [animations]="animations"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipText]="tooltipText"
          (select)="onClick($event)"
        />
      </svg:g>
    </ng-svg-charts-chart>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], HeatMapComponent);

let HeatMapModule = class HeatMapModule {
};
HeatMapModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            HeatMapCellComponent,
            HeatCellSeriesComponent,
            HeatMapComponent
        ],
        exports: [
            HeatMapCellComponent,
            HeatCellSeriesComponent,
            HeatMapComponent
        ]
    })
], HeatMapModule);

let LineComponent = class LineComponent {
    constructor(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    }
    updatePathEl() {
        const node = select(this.element.nativeElement).select('.line');
        if (this.animations) {
            node
                .transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "path", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "stroke", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LineComponent.prototype, "select", void 0);
LineComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-line]',
        template: `
    <svg:path
      [@animationState]="'active'"
      class="line"
      [attr.d]="initialPath"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      stroke-width="1.5px"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        strokeDasharray: 2000,
                        strokeDashoffset: 2000,
                    }),
                    animate(1000, style({
                        strokeDashoffset: 0
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [ElementRef])
], LineComponent);

let LineChartComponent = class LineChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.showGridLines = true;
        this.curve = curveLinear;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.showRefLines = false;
        this.showRefLabels = true;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = `url(#${this.clipPathId})`;
    }
    updateTimeline() {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
        }
    }
    getXDomain() {
        let values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        let domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
        }
        let min;
        let max;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min = this.xScaleMin
                ? this.xScaleMin
                : Math.min(...values);
            max = this.xScaleMax
                ? this.xScaleMax
                : Math.max(...values);
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min), new Date(max)];
            this.xSet = [...values].sort((a, b) => {
                const aDate = a.getTime();
                const bDate = b.getTime();
                if (aDate > bDate) {
                    return 1;
                }
                if (bDate > aDate) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = [...values].sort((a, b) => (a - b));
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    }
    getYDomain() {
        const domain = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    this.hasRange = true;
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    this.hasRange = true;
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        const values = [...domain];
        if (!this.autoScale) {
            values.push(0);
        }
        const min = this.yScaleMin
            ? this.yScaleMin
            : Math.min(...values);
        const max = this.yScaleMax
            ? this.yScaleMax
            : Math.max(...values);
        return [min, max];
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, width])
                .domain(domain);
            if (this.roundDomains) {
                scale = scale.nice();
            }
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    }
    getYScale(domain, height) {
        const scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    updateDomain(domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    }
    updateHoveredVertical(item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    }
    hideCircles() {
        this.hoveredVertical = null;
        this.deactivateAll();
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.name;
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        this.deactivateAll();
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "autoScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "timeline", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], LineChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], LineChartComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LineChartComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], LineChartComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], LineChartComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showRefLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "referenceLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LineChartComponent.prototype, "yScaleMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LineChartComponent.prototype, "yScaleMax", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LineChartComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LineChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], LineChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    ContentChild('seriesTooltipTemplate'),
    __metadata("design:type", TemplateRef)
], LineChartComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LineChartComponent.prototype, "hideCircles", null);
LineChartComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-line-chart',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelClick)=\"onClick($event)\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\">\n  <svg:defs>\n    <svg:clipPath [attr.id]=\"clipPathId\">\n      <svg:rect\n        [attr.width]=\"dims.width + 10\"\n        [attr.height]=\"dims.height + 10\"\n        [attr.transform]=\"'translate(-5, -5)'\"/>\n    </svg:clipPath>\n  </svg:defs>\n  <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [referenceLines]=\"referenceLines\"\n      [showRefLines]=\"showRefLines\"\n      [showRefLabels]=\"showRefLabels\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g [attr.clip-path]=\"clipPath\">\n      <svg:g *ngFor=\"let series of results; trackBy:trackBy\" [@animationState]=\"'active'\">\n        <svg:g ng-svg-charts-line-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"series\"\n          [activeEntries]=\"activeEntries\"\n          [scaleType]=\"scaleType\"\n          [curve]=\"curve\"\n          [rangeFillOpacity]=\"rangeFillOpacity\"\n          [hasRange]=\"hasRange\"\n          [animations]=\"animations\"\n        />\n      </svg:g>\n\n      <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n        <svg:g ng-svg-charts-tooltip-area\n          [dims]=\"dims\"\n          [xSet]=\"xSet\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [results]=\"results\"\n          [colors]=\"colors\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"seriesTooltipTemplate\"\n          (hover)=\"updateHoveredVertical($event)\"\n        />\n\n        <svg:g *ngFor=\"let series of results\">\n          <svg:g ng-svg-charts-circle-series\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [visibleValue]=\"hoveredVertical\"\n            [activeEntries]=\"activeEntries\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            (select)=\"onClick($event, series)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          />\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  </svg:g>\n  <svg:g ng-svg-charts-timeline\n    *ngIf=\"timeline && scaleType != 'ordinal'\"\n    [attr.transform]=\"timelineTransform\"\n    [results]=\"results\"\n    [view]=\"[timelineWidth, height]\"\n    [height]=\"timelineHeight\"\n    [scheme]=\"scheme\"\n    [customColors]=\"customColors\"\n    [scaleType]=\"scaleType\"\n    [legend]=\"legend\"\n    (onDomainChange)=\"updateDomain($event)\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-line-series\n        [xScale]=\"timelineXScale\"\n        [yScale]=\"timelineYScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [curve]=\"curve\"\n        [hasRange]=\"hasRange\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                    }),
                    animate(500, style({
                        opacity: 0
                    }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], LineChartComponent);

let LineSeriesComponent = class LineSeriesComponent {
    constructor() {
        this.animations = true;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradients();
        const data = this.sortData(this.data.series);
        const lineGen = this.getLineGenerator();
        this.path = lineGen(data) || '';
        const areaGen = this.getAreaGenerator();
        this.areaPath = areaGen(data) || '';
        if (this.hasRange) {
            const range = this.getRangeGenerator();
            this.outerPath = range(data) || '';
        }
        if (this.hasGradient) {
            this.stroke = this.gradientUrl;
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            if (max === min) {
                this.stroke = this.colors.getColor(max);
            }
        }
        else {
            this.stroke = this.colors.getColor(this.data.name);
        }
    }
    getLineGenerator() {
        return line()
            .x(d => {
            const label = d.name;
            let value;
            if (this.scaleType === 'time') {
                value = this.xScale(label);
            }
            else if (this.scaleType === 'linear') {
                value = this.xScale(Number(label));
            }
            else {
                value = this.xScale(label);
            }
            return value;
        })
            .y(d => this.yScale(d.value))
            .curve(this.curve);
    }
    getRangeGenerator() {
        return area()
            .x(d => {
            const label = d.name;
            let value;
            if (this.scaleType === 'time') {
                value = this.xScale(label);
            }
            else if (this.scaleType === 'linear') {
                value = this.xScale(Number(label));
            }
            else {
                value = this.xScale(label);
            }
            return value;
        })
            .y0(d => this.yScale(typeof d.min === 'number' ? d.min : d.value))
            .y1(d => this.yScale(typeof d.max === 'number' ? d.max : d.value))
            .curve(this.curve);
    }
    getAreaGenerator() {
        const xProperty = (d) => {
            const label = d.name;
            return this.xScale(label);
        };
        return area()
            .x(xProperty)
            .y0(() => this.yScale.range()[0])
            .y1(d => this.yScale(d.value))
            .curve(this.curve);
    }
    sortData(data) {
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    }
    updateGradients() {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = `url(#${this.gradientId})`;
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isInactive(entry) {
        if (!this.activeEntries || this.activeEntries.length === 0) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], LineSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], LineSeriesComponent.prototype, "hasRange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "animations", void 0);
LineSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-line-series]',
        template: `
    <svg:g>
      <defs>
        <svg:g ng-svg-charts-svg-linear-gradient *ngIf="hasGradient"
          orientation="vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:g ng-svg-charts-area
        class="line-highlight"
        [data]="data"
        [path]="areaPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [opacity]="0.25"
        [startOpacity]="0"
        [gradient]="true"
        [stops]="areaGradientStops"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [animations]="animations"
      />
      <svg:g ng-svg-charts-line
        class="line-series"
        [data]="data"
        [path]="path"
        [stroke]="stroke"
        [animations]="animations"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
      />
    <svg:g ng-svg-charts-area
        *ngIf="hasRange"
        class="line-series-range"
        [data]="data"
        [path]="outerPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [opacity]="rangeFillOpacity"
        [animations]="animations"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], LineSeriesComponent);

let LineChartModule = class LineChartModule {
};
LineChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            LineComponent,
            LineChartComponent,
            LineSeriesComponent
        ],
        exports: [
            LineComponent,
            LineChartComponent,
            LineSeriesComponent
        ]
    })
], LineChartModule);

const twoPI = 2 * Math.PI;
let PolarChartComponent = class PolarChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.showGridLines = true;
        this.curve = curveCardinalClosed;
        this.activeEntries = [];
        this.rangeFillOpacity = 0.15;
        this.trimYAxisTicks = true;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.showSeriesOnHover = true;
        this.gradient = false;
        this.yAxisMinScale = 0;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    update() {
        super.update();
        this.setDims();
        this.setScales();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.setTicks();
    }
    setDims() {
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        const halfWidth = ~~(this.dims.width / 2);
        const halfHeight = ~~(this.dims.height / 2);
        const outerRadius = this.outerRadius = Math.min(halfHeight / 1.5, halfWidth / 1.5);
        const yOffset = Math.max(0, halfHeight - outerRadius);
        this.yAxisDims = Object.assign({}, this.dims, { width: halfWidth });
        this.transform = `translate(${this.dims.xOffset}, ${this.margin[0]})`;
        this.transformYAxis = `translate(0, ${yOffset})`;
        this.labelOffset = this.dims.height + 40;
        this.transformPlot = `translate(${halfWidth}, ${halfHeight})`;
    }
    setScales() {
        const xValues = this.getXValues();
        this.scaleType = getScaleType(xValues);
        this.xDomain = this.filteredDomain || this.getXDomain(xValues);
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, twoPI);
        this.yScale = this.getYScale(this.yDomain, this.outerRadius);
        this.yAxisScale = this.getYScale(this.yDomain.reverse(), this.outerRadius);
    }
    setTicks() {
        let tickFormat;
        if (this.xAxisTickFormatting) {
            tickFormat = this.xAxisTickFormatting;
        }
        else if (this.xScale.tickFormat) {
            tickFormat = this.xScale.tickFormat.apply(this.xScale, [5]);
        }
        else {
            tickFormat = d => {
                if (isDate(d)) {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        const outerRadius = this.outerRadius;
        const s = 1.1;
        this.thetaTicks = this.xDomain.map(d => {
            const startAngle = this.xScale(d);
            const dd = s * outerRadius * (startAngle > Math.PI ? -1 : 1);
            const label = tickFormat(d);
            const startPos = [outerRadius * Math.sin(startAngle), -outerRadius * Math.cos(startAngle)];
            const pos = [dd, s * startPos[1]];
            return {
                innerRadius: 0,
                outerRadius,
                startAngle,
                endAngle: startAngle,
                value: outerRadius,
                label,
                startPos,
                pos
            };
        });
        const minDistance = 10;
        /* from pie chart, abstract out -*/
        for (let i = 0; i < this.thetaTicks.length - 1; i++) {
            const a = this.thetaTicks[i];
            for (let j = i + 1; j < this.thetaTicks.length; j++) {
                const b = this.thetaTicks[j];
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        this.radiusTicks = this.yAxisScale
            .ticks(~~(this.dims.height / 50))
            .map(d => this.yScale(d));
    }
    getXValues() {
        const values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        return values;
    }
    getXDomain(values = this.getXValues()) {
        if (this.scaleType === 'time') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            return [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            return [min, max];
        }
        return values;
    }
    getYValues() {
        const domain = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        return domain;
    }
    getYDomain(domain = this.getYValues()) {
        let min = Math.min(...domain);
        const max = Math.max(this.yAxisMinScale, ...domain);
        min = Math.max(0, min);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        switch (this.scaleType) {
            case 'time':
                return scaleTime()
                    .range([0, width])
                    .domain(domain);
            case 'linear':
                const scale = scaleLinear()
                    .range([0, width])
                    .domain(domain);
                return this.roundDomains ? scale.nice() : scale;
            default:
                return scalePoint()
                    .range([0, width - twoPI / domain.length])
                    .padding(0)
                    .domain(domain);
        }
    }
    getYScale(domain, height) {
        const scale = scaleLinear()
            .range([0, height])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    setColors() {
        const domain = (this.schemeType === 'ordinal') ?
            this.seriesDomain :
            this.yDomain.reverse();
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        if (this.schemeType === 'ordinal') {
            return {
                scaleType: this.schemeType,
                colors: this.colors,
                domain: this.seriesDomain,
                title: this.legendTitle,
                position: this.legendPosition
            };
        }
        return {
            scaleType: this.schemeType,
            colors: this.colors.scale,
            domain: this.yDomain,
            title: undefined,
            position: this.legendPosition
        };
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = this.showSeriesOnHover ? [item, ...this.activeEntries] : this.activeEntries;
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
    trackBy(index, item) {
        return item.name;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "xAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "yAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "autoScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "showGridLines", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PolarChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "schemeType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], PolarChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], PolarChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "roundDomains", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "showSeriesOnHover", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "yAxisMinScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "labelTrim", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "labelTrimSize", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PolarChartComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PolarChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], PolarChartComponent.prototype, "tooltipTemplate", void 0);
PolarChartComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-polar-chart',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:g class="polar-chart chart" [attr.transform]="transform">
        <svg:g [attr.transform]="transformPlot">
          <svg:circle
            class="polar-chart-background"
            cx="0" cy="0"
            [attr.r]="this.outerRadius" />
          <svg:g *ngIf="showGridLines">
            <svg:circle
              *ngFor="let r of radiusTicks"
              class="gridline-path radial-gridline-path"
              cx="0" cy="0"
              [attr.r]="r" />
          </svg:g>
          <svg:g *ngIf="xAxis">
            <svg:g ng-svg-charts-pie-label
              *ngFor="let tick of thetaTicks"
              [data]="tick"
              [radius]="outerRadius"
              [label]="tick.label"
              [max]="outerRadius"
              [value]="showGridLines ? 1 : outerRadius"
              [explodeSlices]="true"
              [animations]="animations"
              [labelTrim]="labelTrim"
              [labelTrimSize]="labelTrimSize">
            </svg:g>
          </svg:g>
        </svg:g>
        <svg:g ng-svg-charts-y-axis
          [attr.transform]="transformYAxis"
          *ngIf="yAxis"
          [yScale]="yAxisScale"
          [dims]="yAxisDims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g ng-svg-charts-axis-label
          *ngIf="xAxis && showXAxisLabel"
          [label]="xAxisLabel"
          [offset]="labelOffset"
          [orient]="'bottom'"
          [height]="dims.height"
          [width]="dims.width">
        </svg:g>
        <svg:g [attr.transform]="transformPlot">
          <svg:g *ngFor="let series of results; trackBy:trackBy" [@animationState]="'active'">
            <svg:g ng-svg-charts-polar-series
              [gradient]="gradient"
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [scaleType]="scaleType"
              [curve]="curve"
              [rangeFillOpacity]="rangeFillOpacity"
              [animations]="animations"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
            />
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-svg-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1,
                    }),
                    animate(500, style({
                        opacity: 0
                    }))
                ])
            ])
        ],
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:750ms ease-in fadeIn;animation:750ms ease-in fadeIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;-webkit-transition:d 750ms;-o-transition:d 750ms;transition:d 750ms}@-webkit-keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}", ".polar-chart .polar-chart-background{fill:none}.polar-chart .radial-gridline-path{stroke-dasharray:10 10;fill:none}.polar-chart .pie-label-line{stroke:#2f3646}.polar-charts-series .polar-series-area,.polar-series-path{pointer-events:none}"]
    })
], PolarChartComponent);

let PolarSeriesComponent = class PolarSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.gradient = false;
        this.animations = true;
        this.circleRadius = 3;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradients();
        const line = this.getLineGenerator();
        const data = this.sortData(this.data.series);
        const seriesName = this.data.name;
        const linearScaleType = this.colors.scaleType === 'linear';
        const min = this.yScale.domain()[0];
        this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);
        this.path = line(data) || '';
        this.circles = data.map(d => {
            const a = this.getAngle(d);
            const r = this.getRadius(d);
            const value = d.value;
            const color = this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
            const cData = {
                series: seriesName,
                value,
                name: d.name
            };
            return {
                data: cData,
                cx: r * Math.sin(a),
                cy: -r * Math.cos(a),
                value,
                color,
                label: d.name
            };
        });
        this.active = this.isActive(this.data);
        this.inactive = this.isInactive(this.data);
        this.tooltipText = this.tooltipText || (c => this.defaultTooltipText(c));
    }
    getAngle(d) {
        const label = d.name;
        if (this.scaleType === 'time') {
            return this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            return this.xScale(Number(label));
        }
        return this.xScale(label);
    }
    getRadius(d) {
        return this.yScale(d.value);
    }
    getLineGenerator() {
        return lineRadial()
            .angle(d => this.getAngle(d))
            .radius(d => this.getRadius(d))
            .curve(this.curve);
    }
    sortData(data) {
        if (this.scaleType === 'linear') {
            return sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            return sortByTime(data, 'name');
        }
        return sortByDomain(data, 'name', 'asc', this.xScale.domain());
    }
    isActive(entry) {
        if (!this.activeEntries) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isInactive(entry) {
        if (!this.activeEntries || this.activeEntries.length === 0) {
            return false;
        }
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
    defaultTooltipText({ label, value }) {
        return `
      <span class="tooltip-label">${this.data.name} • ${label}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
    }
    updateGradients() {
        this.hasGradient = this.gradient || this.colors.scaleType === 'linear';
        if (!this.hasGradient) {
            return;
        }
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        if (this.colors.scaleType === 'linear') {
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
        }
        else {
            this.gradientStops = undefined;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "curve", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PolarSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PolarSeriesComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], PolarSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], PolarSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "animations", void 0);
PolarSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-polar-series]',
        template: `
    <svg:g class="polar-charts-series">
      <defs>
        <svg:g ng-svg-charts-svg-radial-gradient *ngIf="hasGradient"
          orientation="vertical"
          [color]="seriesColor"
          [name]="gradientId"
          [startOpacity]="0.25"
          [endOpacity]="1"
          [stops]="gradientStops"
        />
      </defs>
      <svg:g ng-svg-charts-line
        class="polar-series-path"
        [path]="path"
        [stroke]="hasGradient ? gradientUrl : seriesColor"
        [class.active]="active"
        [class.inactive]="inactive"
        [attr.fill-opacity]="rangeFillOpacity"
        [fill]="hasGradient ? gradientUrl : seriesColor"
        [animations]="animations"
      />
      <svg:g ng-svg-charts-circle
        *ngFor="let circle of circles"
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circleRadius"
        [fill]="circle.color"
        [style.opacity]="inactive ? 0.2 : 1"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        tooltipType="tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data">
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PolarSeriesComponent);

let AdvancedPieChartComponent = class AdvancedPieChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.activeEntries = [];
        this.tooltipDisabled = false;
        this.label = 'Total';
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [20, 20, 20, 20];
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: (this.width * 4) / 12.0,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        const xOffset = this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.legendWidth = this.width - this.dims.width - this.margin[1];
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = `translate(${xOffset} , ${yOffset})`;
    }
    getDomain() {
        return this.results.map(d => d.name);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
    onActivate(event) {
        if (this.activeEntries.indexOf(event) > -1) {
            return;
        }
        this.activeEntries = [event, ...this.activeEntries];
        this.activate.emit({ value: event, entries: this.activeEntries });
    }
    onDeactivate(event) {
        const idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AdvancedPieChartComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedPieChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedPieChartComponent.prototype, "tooltipText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AdvancedPieChartComponent.prototype, "label", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AdvancedPieChartComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AdvancedPieChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], AdvancedPieChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AdvancedPieChartComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AdvancedPieChartComponent.prototype, "nameFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AdvancedPieChartComponent.prototype, "percentageFormatting", void 0);
AdvancedPieChartComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-advanced-pie-chart',
        template: "<div\n  [style.width.px]=\"width\"\n  [style.height.px]=\"height\">\n  <div class=\"advanced-pie chart\"\n    [style.width.px]=\"dims.width\"\n    [style.height.px]=\"dims.height\">\n    <ng-svg-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      [animations]=\"animations\">\n      <svg:g\n        [attr.transform]=\"transform\"\n        class=\"pie chart\">\n        <svg:g ng-svg-charts-pie-series\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [innerRadius]=\"innerRadius\"\n          [activeEntries]=\"activeEntries\"\n          [outerRadius]=\"outerRadius\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n          [animations]=\"animations\">\n        </svg:g>\n      </svg:g>\n    </ng-svg-charts-chart>\n  </div>\n  <div\n    class=\"advanced-pie-legend-wrapper\"\n    [style.width.px]=\"width - dims.width\"\n    [style.height.px]=\"height\">\n    <ng-svg-charts-advanced-legend\n      [data]=\"results\"\n      [colors]=\"colors\"\n      [width]=\"width - dims.width - margin[1]\"\n      [label]=\"label\"\n      [animations]=\"animations\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"nameFormatting\"\n      [percentageFormatting]=\"percentageFormatting\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\">\n    </ng-svg-charts-advanced-legend>\n  </div>\n</div>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".advanced-pie,.advanced-pie-legend-wrapper{display:inline-block}"]
    })
], AdvancedPieChartComponent);

let PieLabelComponent = class PieLabelComponent {
    constructor() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = trimLabel;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        const innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        const innerPos = innerArc.centroid(this.data);
        let scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        const outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
    }
    get textX() {
        return this.data.pos[0];
    }
    get textY() {
        return this.data.pos[1];
    }
    get styleTransform() {
        return this.isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
    }
    get attrTransform() {
        return !this.isIE ? null : `translate(${this.textX},${this.textY})`;
    }
    get textTransition() {
        return this.isIE || !this.animations ? null : 'transform 0.75s';
    }
    textAnchor() {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "radius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "explodeSlices", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "animations", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "labelTrim", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "labelTrimSize", void 0);
PieLabelComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-pie-label]',
        template: "<title>{{label}}</title>\n<svg:g\n  [attr.transform]=\"attrTransform\"\n  [style.transform]=\"styleTransform\"\n  [style.transition]=\"textTransition\">\n  <svg:text\n    class=\"pie-label\"\n    [class.animation]=\"animations\"\n    dy=\".35em\"\n    [style.textAnchor]=\"textAnchor()\"\n    [style.shapeRendering]=\"'crispEdges'\">\n    {{labelTrim ? trimLabel(label, labelTrimSize) : label}}\n  </svg:text>\n</svg:g>\n<svg:path\n  [attr.d]=\"line\"\n  [attr.stroke]=\"color\"\n  fill=\"none\"\n  class=\"pie-label-line line\"\n  [class.animation]=\"animations\">\n</svg:path>",
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], PieLabelComponent);

let PieArcComponent = class PieArcComponent {
    constructor(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getGradient() {
        return this.gradient ? this.gradientFill : this.fill;
    }
    getPointerEvents() {
        return this.pointerEvents ? 'auto' : 'none';
    }
    update() {
        const calc = this.calculateArc();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = `url(#${this.radialGradientId})`;
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
        else {
            this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        }
    }
    calculateArc() {
        let outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = (this.outerRadius * this.value) / this.max;
        }
        return arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    }
    loadAnimation() {
        const node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        const calc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            const interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        })
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    }
    updateAnimation() {
        const node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        const calc = this.calculateArc();
        node
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    }
    onClick() {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => this.select.emit(this.data), 200);
    }
    onDblClick(event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "startAngle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "endAngle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "innerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "outerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "explodeSlices", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "animate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "pointerEvents", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "isActive", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "deactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "dblclick", void 0);
PieArcComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-pie-arc]',
        template: "<svg:g class=\"arc-group\">\n  <svg:defs *ngIf=\"gradient\">\n    <svg:g ng-svg-charts-svg-radial-gradient\n      [color]=\"fill\"\n      orientation=\"vertical\"\n      [name]=\"radialGradientId\"\n      [startOpacity]=\"startOpacity\"\n    />\n  </svg:defs>\n  <svg:path\n    [attr.d]=\"path\"\n    class=\"arc\"\n    [class.active]=\"isActive\"\n    [attr.fill]=\"getGradient()\"\n    (click)=\"onClick()\"\n    (dblclick)=\"onDblClick($event)\"\n    (mouseenter)=\"activate.emit(data)\"\n    (mouseleave)=\"deactivate.emit(data)\"\n    [style.pointer-events]=\"getPointerEvents()\"\n  />\n</svg:g>",
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], PieArcComponent);

let PieChartComponent = class PieChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.labels = false;
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.explodeSlices = false;
        this.doughnut = false;
        this.arcWidth = 0.25;
        this.activeEntries = [];
        this.tooltipDisabled = false;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.dblclick = new EventEmitter();
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [20, 20, 20, 20];
    }
    update() {
        super.update();
        if (this.labels) {
            this.margin = [30, 80, 30, 80];
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.translation = `translate(${xOffset}, ${yOffset})`;
        this.outerRadius = Math.min(this.dims.width, this.dims.height);
        if (this.labels) {
            // make room for labels
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * (1 - this.arcWidth);
        }
        this.domain = this.getDomain();
        // sort data according to domain
        this.data = this.results.sort((a, b) => {
            return this.domain.indexOf(a.name) - this.domain.indexOf(b.name);
        });
        this.setColors();
        this.legendOptions = this.getLegendOptions();
    }
    getDomain() {
        const items = [];
        this.results.map(d => {
            let label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            if (items.indexOf(label) === -1) {
                items.push(label);
            }
        });
        return items;
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
    getLegendOptions() {
        return {
            scaleType: 'ordinal',
            domain: this.domain,
            colors: this.colors,
            title: this.legendTitle,
            position: this.legendPosition
        };
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "labels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "explodeSlices", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "doughnut", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "arcWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PieChartComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "trimLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "maxLabelLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "tooltipText", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "dblclick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PieChartComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PieChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], PieChartComponent.prototype, "tooltipTemplate", void 0);
PieChartComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-pie-chart',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n    <svg:g ng-svg-charts-pie-series\n      [colors]=\"colors\"\n      [series]=\"data\"\n      [showLabels]=\"labels\"\n      [labelFormatting]=\"labelFormatting\"\n      [trimLabels]=\"trimLabels\"\n      [maxLabelLength]=\"maxLabelLength\"\n      [activeEntries]=\"activeEntries\"\n      [innerRadius]=\"innerRadius\"\n      [outerRadius]=\"outerRadius\"\n      [explodeSlices]=\"explodeSlices\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipText]=\"tooltipText\"\n      (dblclick)=\"dblclick.emit($event)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:750ms ease-in fadeIn;animation:750ms ease-in fadeIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;-webkit-transition:d 750ms;-o-transition:d 750ms;transition:d 750ms}@-webkit-keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}"]
    })
], PieChartComponent);

function gridSize(dims, len, minWidth) {
    let rows = 1;
    let cols = len;
    const width = dims.width;
    if (width > minWidth) {
        while (width / cols < minWidth) {
            rows += 1;
            cols = Math.ceil(len / rows);
        }
    }
    return [cols, rows];
}
function gridLayout(dims, data, minWidth, designatedTotal) {
    const xScale = scaleBand();
    const yScale = scaleBand();
    const width = dims.width;
    const height = dims.height;
    const [columns, rows] = gridSize(dims, data.length, minWidth);
    const xDomain = [];
    const yDomain = [];
    for (let i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (let i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    const res = [];
    const total = designatedTotal ? designatedTotal : getTotal(data);
    const cardWidth = xScale.bandwidth();
    const cardHeight = yScale.bandwidth();
    for (let i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i] ? data[i].name : '',
            value: data[i] ? data[i].value : undefined,
            extra: data[i] ? data[i].extra : undefined,
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = (total > 0) ? res[i].data.value / total : 0;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results
        .map(d => d ? d.value : 0)
        .reduce((sum, val) => sum + val, 0);
}

let PieGridComponent = class PieGridComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.tooltipDisabled = false;
        this.label = 'Total';
        this.minWidth = 150;
        this.margin = [20, 20, 20, 20];
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
        this.transform = `translate(${this.margin[3]} , ${this.margin[0]})`;
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    }
    defaultTooltipText({ data }) {
        const label = trimLabel(formatLabel(data.name));
        const val = data.value.toLocaleString();
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
    getDomain() {
        return this.results.map(d => d.name);
    }
    getSeries() {
        const total = this.designatedTotal ? this.designatedTotal : this.getTotal();
        return this.data.map((d) => {
            const baselineLabelHeight = 20;
            const padding = 10;
            const name = d.data.name;
            const label = formatLabel(name);
            const value = d.data.value;
            const radius = (min([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
            const innerRadius = radius * 0.9;
            let count = 0;
            const colors = () => {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return this.colorScale.getColor(label);
                }
            };
            const xPos = d.x + (d.width - padding) / 2;
            const yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: `translate(${xPos}, ${yPos})`,
                colors,
                innerRadius,
                outerRadius: radius,
                name,
                label: trimLabel(label),
                total: value,
                value,
                percent: format('.1%')(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }]
            };
        });
    }
    getTotal() {
        return this.results
            .map(d => d.value)
            .reduce((sum, d) => sum + d, 0);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], PieGridComponent.prototype, "designatedTotal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], PieGridComponent.prototype, "tooltipText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridComponent.prototype, "minWidth", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], PieGridComponent.prototype, "tooltipTemplate", void 0);
PieGridComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-pie-grid',
        template: 'pie-grid.template.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}"]
    })
], PieGridComponent);

let PieGridSeriesComponent = class PieGridSeriesComponent {
    constructor(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.layout = pie()
            .value((d) => d.data.value).sort(null);
        this.arcs = this.getArcs();
    }
    getArcs() {
        return this.layout(this.data).map((arc, index) => {
            const label = arc.data.data.name;
            const other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            const color = this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: this.animations && !other,
                pointerEvents: !other
            };
        });
    }
    onClick(data) {
        this.select.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    }
    trackBy(index, item) {
        return item.data.name;
    }
    label(arc) {
        return arc.data.name;
    }
    color(arc) {
        return this.colors(this.label(arc));
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "innerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "outerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "select", void 0);
PieGridSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-pie-grid-series]',
        template: `
    <svg:g class="pie-grid-arcs">
      <svg:g ng-svg-charts-pie-arc *ngFor="let arc of arcs; trackBy:trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)">
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], PieGridSeriesComponent);

let PieSeriesComponent = class PieSeriesComponent {
    constructor() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        const pieGenerator = pie()
            .value(d => d.value)
            .sort(null);
        const arcData = pieGenerator(this.series);
        this.max = max(arcData, d => {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    outerArc() {
        const factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    }
    calculateLabelPositions(pieData) {
        const factor = 1.5;
        const minDistance = 10;
        const labelPositions = pieData;
        labelPositions.forEach(d => {
            d.pos = this.outerArc().centroid(d);
            d.pos[0] = factor * this.outerRadius * (this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (let i = 0; i < labelPositions.length - 1; i++) {
            const a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (let j = i + 1; j < labelPositions.length; j++) {
                const b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    }
    labelVisible(myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    }
    getTooltipTitle(a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    }
    labelText(myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    }
    label(myArc) {
        return formatLabel(myArc.data.name);
    }
    defaultTooltipText(myArc) {
        const label = this.label(myArc);
        const val = formatLabel(myArc.data.value);
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
    color(myArc) {
        return this.colors.getColor(this.label(myArc));
    }
    trackBy(index, item) {
        return item.data.name;
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "series", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "innerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "outerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "explodeSlices", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "showLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PieSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PieSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "trimLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "maxLabelLength", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], PieSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "deactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "dblclick", void 0);
PieSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-pie-series]',
        template: "<svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n  <svg:g ng-svg-charts-pie-label\n    *ngIf=\"labelVisible(arc)\"\n    [data]=\"arc\"\n    [radius]=\"outerRadius\"\n    [color]=\"color(arc)\"\n    [label]=\"labelText(arc)\"\n    [labelTrim]=\"trimLabels\"\n    [labelTrimSize]=\"maxLabelLength\"\n    [max]=\"max\"\n    [value]=\"arc.value\"\n    [explodeSlices]=\"explodeSlices\"\n    [animations]=\"animations\">\n  </svg:g>\n  <svg:g\n    ng-svg-charts-pie-arc\n    [startAngle]=\"arc.startAngle\"\n    [endAngle]=\"arc.endAngle\"\n    [innerRadius]=\"innerRadius\"\n    [outerRadius]=\"outerRadius\"\n    [fill]=\"color(arc)\"\n    [value]=\"arc.data.value\"\n    [gradient]=\"gradient\"\n    [data]=\"arc.data\"\n    [max]=\"max\"\n    [explodeSlices]=\"explodeSlices\"\n    [isActive]=\"isActive(arc.data)\"\n    [animate]=\"animations\"\n    (select)=\"onClick($event)\"\n    (activate)=\"activate.emit($event)\"\n    (deactivate)=\"deactivate.emit($event)\"\n    (dblclick)=\"dblclick.emit($event)\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'top'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipTitle]=\"getTooltipTitle(arc)\"\n    [tooltipTemplate]=\"tooltipTemplate\"\n    [tooltipContext]=\"arc.data\">\n  </svg:g>\n</svg:g>",
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PieSeriesComponent);

let PieChartModule = class PieChartModule {
};
PieChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            AdvancedPieChartComponent,
            PieLabelComponent,
            PieArcComponent,
            PieChartComponent,
            PieGridComponent,
            PieGridSeriesComponent,
            PieSeriesComponent
        ],
        exports: [
            AdvancedPieChartComponent,
            PieLabelComponent,
            PieArcComponent,
            PieChartComponent,
            PieGridComponent,
            PieGridSeriesComponent,
            PieSeriesComponent
        ]
    })
], PieChartModule);

let PolarChartModule = class PolarChartModule {
};
PolarChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule, PieChartModule, LineChartModule],
        declarations: [
            PolarChartComponent,
            PolarSeriesComponent
        ],
        exports: [
            PolarChartComponent,
            PolarSeriesComponent
        ]
    })
], PolarChartModule);

let CardComponent = class CardComponent {
    constructor(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    update() {
        this.zone.run(() => {
            const hasValue = this.data && typeof this.data.value !== 'undefined';
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const labelFormatting = this.labelFormatting || (card => trimLabel(card.label, 55));
            this.transform = `translate(${this.x} , ${this.y})`;
            this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
            this.cardWidth = Math.max(0, this.width);
            this.cardHeight = Math.max(0, this.height);
            this.label = this.data ? this.data.name : '';
            const cardData = {
                label: this.label,
                data: this.data,
                value: this.data.value
            };
            this.formattedLabel = labelFormatting(cardData);
            this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;
            const value = hasValue ? valueFormatting(cardData) : '';
            this.value = this.paddedValue(value);
            this.setPadding();
            this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);
            setTimeout(() => {
                this.scaleText();
                this.value = value;
                if (hasValue && !this.initialized) {
                    setTimeout(() => this.startCount(), 20);
                }
            }, 8);
        });
    }
    paddedValue(value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    }
    startCount() {
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            const val = this.data.value;
            const decs = decimalChecker(val);
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const callback = ({ value, finished }) => {
                this.zone.run(() => {
                    value = finished ? val : value;
                    this.value = valueFormatting({ label: this.label, data: this.data, value });
                    if (!finished) {
                        this.value = this.paddedValue(this.value);
                    }
                    this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    }
    scaleText() {
        this.zone.run(() => {
            const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
            if (width === 0 || height === 0) {
                return;
            }
            const textPadding = this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
            const availableWidth = this.cardWidth - 2 * textPadding;
            const availableHeight = this.cardHeight / 3;
            const resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
            this.cd.markForCheck();
        });
    }
    setPadding() {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        const padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    }
    onClick() {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "bandColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "textColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "x", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "y", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CardComponent.prototype, "medianSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CardComponent.prototype, "select", void 0);
__decorate([
    ViewChild('textEl'),
    __metadata("design:type", ElementRef)
], CardComponent.prototype, "textEl", void 0);
CardComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-card]',
        template: `
    <svg:g
      [attr.transform]="transform"
      class="cell"
      (click)="onClick()">
      <svg:rect
        class="card"
        [style.fill]="color"
        [attr.width]="cardWidth"
        [attr.height]="cardHeight"
        rx="3"
        ry="3"
      />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{label}}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging">
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel">
        </xhtml:p>
      </svg:foreignObject>
      <svg:text #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize">
        {{value}}
      </svg:text>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef, NgZone])
], CardComponent);

let CardSeriesComponent = class CardSeriesComponent {
    constructor() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        if (this.data.length > 2) {
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const sortedLengths = this.data
                .map(d => {
                const hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue ? valueFormatting({
                    data: d.data,
                    label: d ? d.data.name : '',
                    value: (d && d.data) ? d.data.value : ''
                }).length : 0;
            })
                .sort((a, b) => b - a);
            const idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        const cards = this.getCards();
        this.cards = cards.filter(d => d.data.value !== null);
        this.emptySlots = cards.filter(d => d.data.value === null);
    }
    getCards() {
        const yPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[0] + this.innerPadding[2];
        const xPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[1] + this.innerPadding[3];
        return this.data
            .map((d, index) => {
            let label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            d.data.name = label;
            const value = d.data.value;
            const valueColor = label ? this.colors.getColor(label) : this.emptyColor;
            const color = this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color,
                bandColor: this.bandColor || valueColor,
                textColor: this.textColor || invertColor(color),
                label,
                data: d.data,
                tooltipText: `${label}: ${value}`
            };
        });
    }
    trackBy(index, card) {
        return card.label;
    }
    onClick(data) {
        this.select.emit(data);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], CardSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CardSeriesComponent.prototype, "slots", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "innerPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "cardColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "bandColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "emptyColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "textColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "select", void 0);
CardSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-card-series]',
        template: `
    <svg:rect
      *ngFor="let c of emptySlots; trackBy:trackBy"
      class="card-empty"
      [attr.x]="c.x"
      [attr.y]="c.y"
      [style.fill]="emptyColor"
      [attr.width]="c.width"
      [attr.height]="c.height"
      rx="3"
      ry="3"
    />
    <svg:g ng-svg-charts-card *ngFor="let c of cards; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [textColor]="c.textColor"
      [data]="c.data"
      [medianSize]="medianSize"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [animations]="animations"
      (select)="onClick($event)"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CardSeriesComponent);

let NumberCardComponent = class NumberCardComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.innerPadding = 15;
        this.margin = [10, 10, 10, 10];
    }
    get clickable() {
        return !!this.select.observers.length;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        const size = gridSize(this.dims, this.results.length, 150);
        const N = size[0] * size[1];
        const data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
    }
    getDomain() {
        return this.results.map(d => d.name);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "cardColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "bandColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "emptyColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "innerPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "textColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], NumberCardComponent.prototype, "designatedTotal", void 0);
NumberCardComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-number-card',
        template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"false\"\n  [animations]=\"animations\">\n  <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n    <svg:g ng-svg-charts-card-series\n      [colors]=\"colors\"\n      [cardColor]=\"cardColor\"\n      [bandColor]=\"bandColor\"\n      [textColor]=\"textColor\"\n      [emptyColor]=\"emptyColor\"\n      [data]=\"data\"\n      [dims]=\"dims\"\n      [innerPadding]=\"innerPadding\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", "ng-svg-charts-number-card .cell .trimmed-label{font-size:12px;pointer-events:none;overflow:hidden;text-align:left;line-height:1em}ng-svg-charts-number-card .cell .trimmed-label p{overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis;width:100%;padding:0;margin:0}ng-svg-charts-number-card .cell .value-text{pointer-events:none}ng-svg-charts-number-card .number-card.clickable .cell .card,ng-svg-charts-number-card .number-card.clickable .cell .card-band{cursor:pointer}"]
    })
], NumberCardComponent);

let NumberCardModule = class NumberCardModule {
};
NumberCardModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            CardComponent,
            CardSeriesComponent,
            NumberCardComponent
        ],
        exports: [
            CardComponent,
            CardSeriesComponent,
            NumberCardComponent
        ]
    })
], NumberCardModule);

let TreeMapCellComponent = class TreeMapCellComponent {
    constructor(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges() {
        this.update();
        this.valueFormatting = this.valueFormatting || (value => value.toLocaleString());
        const labelFormatting = this.labelFormatting || (cell => trimLabel(cell.label, 55));
        const cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedValue = this.valueFormatting(cellData.value);
        this.formattedLabel = labelFormatting(cellData);
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradientStops();
    }
    update() {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            if (this.animations) {
                this.loadAnimation();
            }
            this.initialized = true;
        }
    }
    loadAnimation() {
        const node = select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    }
    getTextColor() {
        return invertColor(this.fill);
    }
    animateToCurrentForm() {
        const node = select(this.element).select('.cell');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
        else {
            node
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
    }
    onClick() {
        this.select.emit({
            name: this.label,
            value: this.value
        });
    }
    getGradientStops() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "x", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "y", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "valueType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "select", void 0);
TreeMapCellComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-tree-map-cell]',
        template: "<svg:g>\n  <defs *ngIf=\"gradient\">\n    <svg:g ng-svg-charts-svg-linear-gradient\n      orientation=\"vertical\"\n      [name]=\"gradientId\"\n      [stops]=\"gradientStops\"\n    />\n  </defs>\n  <svg:rect\n    [attr.fill]=\"gradient ? gradientUrl : fill\"\n    [attr.width]=\"width\"\n    [attr.height]=\"height\"\n    [attr.x]=\"x\"\n    [attr.y]=\"y\"\n    [style.cursor]=\"'pointer'\"\n    class=\"cell\"\n    (click)=\"onClick()\"\n  />\n  <svg:foreignObject\n    *ngIf=\"width >= 70 && height >= 35\"\n    [attr.x]=\"x\"\n    [attr.y]=\"y\"\n    [attr.width]=\"width\"\n    [attr.height]=\"height\"\n    class=\"treemap-label\"\n    [style.pointer-events]=\"'none'\">\n    <xhtml:p\n      [style.color]=\"getTextColor()\"\n      [style.height]=\"height + 'px'\"\n      [style.width]=\"width + 'px'\">\n      <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\">\n      </xhtml:span>\n      <xhtml:br />\n      <xhtml:span *ngIf=\"animations\"\n        class=\"treemap-val\"\n        ng-svg-charts-count-up\n        [countTo]=\"value\"\n        [valueFormatting]=\"valueFormatting\">\n      </xhtml:span>\n      <xhtml:span *ngIf=\"!animations\"\n        class=\"treemap-val\">\n        {{formattedValue}}\n      </xhtml:span>\n    </xhtml:p>\n  </svg:foreignObject>\n</svg:g>",
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef])
], TreeMapCellComponent);

let TreeMapCellSeriesComponent = class TreeMapCellSeriesComponent {
    constructor() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.cells = this.getCells();
    }
    getCells() {
        return this.data.children
            .filter((d) => {
            return d.depth === 1;
        })
            .map((d, index) => {
            const label = d.id;
            const data = {
                name: label,
                value: d.value
            };
            return {
                data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: this.colors.getColor(label),
                label,
                value: d.value,
                valueType: d.valueType
            };
        });
    }
    getTooltipText({ label, value }) {
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
    }
    onClick(data) {
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.label;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "dims", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "select", void 0);
TreeMapCellSeriesComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-tree-map-cell-series]',
        template: `
    <svg:g ng-svg-charts-tree-map-cell *ngFor="let c of cells; trackBy:trackBy"
      [data]="c"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [gradient]="gradient"
      [animations]="animations"
      (select)="onClick($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="c.data">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], TreeMapCellSeriesComponent);

let TreeMapComponent = class TreeMapComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.tooltipDisabled = false;
        this.gradient = false;
        this.select = new EventEmitter();
        this.margin = [10, 10, 10, 10];
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.treemap = treemap()
            .size([this.dims.width, this.dims.height]);
        const rootNode = {
            name: 'root',
            value: 0,
            isRoot: true
        };
        const root = stratify()
            .id(d => {
            let label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return label;
        })
            .parentId(d => d.isRoot ? null : 'root')([rootNode, ...this.results])
            .sum(d => d.value);
        this.data = this.treemap(root);
        this.setColors();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getDomain() {
        return this.results.map(d => d.name);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "results", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "gradient", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "select", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], TreeMapComponent.prototype, "tooltipTemplate", void 0);
TreeMapComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-tree-map',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="false"
      [animations]="animations">
      <svg:g [attr.transform]="transform" class="tree-map chart">
        <svg:g ng-svg-charts-tree-map-cell-series
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [valueFormatting]="valueFormatting"
          [labelFormatting]="labelFormatting"
          [gradient]="gradient"
          [animations]="animations"
          (select)="onClick($event)"
        />
      </svg:g>
    </ng-svg-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".tree-map .treemap-val{font-size:1.3em;padding-top:5px;display:inline-block}.tree-map .treemap-label p{display:table-cell;text-align:center;line-height:1.2em;vertical-align:middle}"]
    })
], TreeMapComponent);

let TreeMapModule = class TreeMapModule {
};
TreeMapModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            TreeMapCellComponent,
            TreeMapCellSeriesComponent,
            TreeMapComponent
        ],
        exports: [
            TreeMapCellComponent,
            TreeMapCellSeriesComponent,
            TreeMapComponent
        ]
    })
], TreeMapModule);

let LinearGaugeComponent = class LinearGaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.margin = [10, 20, 10, 20];
        this.valueResizeScale = 1;
        this.unitsResizeScale = 1;
        this.valueTextTransform = '';
        this.valueTranslate = '';
        this.unitsTextTransform = '';
        this.unitsTranslate = '';
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.scaleText('value');
            this.scaleText('units');
        });
    }
    update() {
        super.update();
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
        this.valueTranslate = `translate(0, -15)`;
        this.unitsTranslate = `translate(0, 15)`;
        setTimeout(() => this.scaleText('value'), 50);
        setTimeout(() => this.scaleText('units'), 50);
    }
    getValueDomain() {
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    }
    getDisplayValue() {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    }
    scaleText(element, repeat = true) {
        let el;
        let resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        const { width, height } = el.nativeElement.getBoundingClientRect();
        if (width === 0 || height === 0)
            return;
        const oldScale = resizeScale;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(() => { this.scaleText(element, false); }, 50);
            }
        }
    }
    onClick() {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], LinearGaugeComponent.prototype, "units", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "previousValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "valueFormatting", void 0);
__decorate([
    ViewChild('valueTextEl'),
    __metadata("design:type", ElementRef)
], LinearGaugeComponent.prototype, "valueTextEl", void 0);
__decorate([
    ViewChild('unitsTextEl'),
    __metadata("design:type", ElementRef)
], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
LinearGaugeComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-linear-gauge',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="false"
      [animations]="animations"
      (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g ng-svg-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="'horizontal'"
          [roundEdges]="true"
          [animations]="animations">
        </svg:g>
        <svg:g ng-svg-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="'horizontal'"
          [roundEdges]="true"
          [animations]="animations">
        </svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge">
              {{displayValue}}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge">
              {{units}}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-svg-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:rgba(0,0,0,.05)}.linear-gauge .units{fill:#666}"]
    })
], LinearGaugeComponent);

let GaugeComponent = class GaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.min = 0;
        this.max = 100;
        this.bigSegments = 10;
        this.smallSegments = 5;
        this.showAxis = true;
        this.startAngle = -120;
        this.angleSpan = 240;
        this.activeEntries = [];
        this.tooltipDisabled = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.resizeScale = 1;
        this.rotation = '';
        this.textTransform = 'scale(1, 1)';
        this.cornerRadius = 10;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => this.scaleText());
    }
    update() {
        super.update();
        if (!this.showAxis) {
            if (!this.margin) {
                this.margin = [10, 20, 10, 20];
            }
        }
        else {
            if (!this.margin) {
                this.margin = [60, 100, 60, 100];
            }
        }
        // make the starting angle positive
        if (this.startAngle < 0) {
            this.startAngle = (this.startAngle % 360) + 360;
        }
        this.angleSpan = Math.min(this.angleSpan, 360);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.domain = this.getDomain();
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
        this.arcs = this.getArcs();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.rotation = `rotate(${this.startAngle})`;
        setTimeout(() => this.scaleText(), 50);
    }
    getArcs() {
        const arcs = [];
        const availableRadius = this.outerRadius * 0.7;
        const radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        const arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        let i = 0;
        for (const d of this.results) {
            const outerRadius = this.outerRadius - (i * radiusPerArc);
            const innerRadius = outerRadius - arcWidth;
            const backgroundArc = {
                endAngle: this.angleSpan * Math.PI / 180,
                innerRadius,
                outerRadius,
                data: {
                    value: this.max,
                    name: d.name
                }
            };
            const valueArc = {
                endAngle: Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI / 180,
                innerRadius,
                outerRadius,
                data: {
                    value: d.value,
                    name: d.name
                }
            };
            const arc = {
                backgroundArc,
                valueArc
            };
            arcs.push(arc);
            i++;
        }
        return arcs;
    }
    getDomain() {
        return this.results.map(d => d.name);
    }
    getValueDomain() {
        const values = this.results.map(d => d.value);
        const dataMin = Math.min(...values);
        const dataMax = Math.max(...values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    }
    getDisplayValue() {
        const value = this.results.map(d => d.value).reduce((a, b) => a + b, 0);
        if (this.textValue && 0 !== this.textValue.length) {
            return this.textValue.toLocaleString();
        }
        if (this.valueFormatting) {
            return this.valueFormatting(value);
        }
        return value.toLocaleString();
    }
    scaleText(repeat = true) {
        const { width } = this.textEl.nativeElement.getBoundingClientRect();
        const oldScale = this.resizeScale;
        if (width === 0) {
            this.resizeScale = 1;
        }
        else {
            const availableSpace = this.textRadius;
            this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        }
        if (this.resizeScale !== oldScale) {
            this.textTransform = `scale(${this.resizeScale}, ${this.resizeScale})`;
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(() => this.scaleText(false), 50);
            }
        }
    }
    onClick(data) {
        this.select.emit(data);
    }
    getLegendOptions() {
        return {
            scaleType: 'ordinal',
            colors: this.colors,
            domain: this.domain,
            title: this.legendTitle,
            position: this.legendPosition
        };
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    trackBy(index, item) {
        return item.valueArc.data.name;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "legendTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "legendPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], GaugeComponent.prototype, "textValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], GaugeComponent.prototype, "units", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "bigSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "smallSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], GaugeComponent.prototype, "results", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "showAxis", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "startAngle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "angleSpan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], GaugeComponent.prototype, "activeEntries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "axisTickFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], GaugeComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], GaugeComponent.prototype, "margin", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], GaugeComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], GaugeComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", TemplateRef)
], GaugeComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    ViewChild('textEl'),
    __metadata("design:type", ElementRef)
], GaugeComponent.prototype, "textEl", void 0);
GaugeComponent = __decorate([
    Component({
        selector: 'ng-svg-charts-gauge',
        template: `
    <ng-svg-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:g [attr.transform]="transform" class="gauge chart">
        <svg:g *ngFor="let arc of arcs; trackBy:trackBy" [attr.transform]="rotation">
          <svg:g ng-svg-charts-gauge-arc
            [backgroundArc]="arc.backgroundArc"
            [valueArc]="arc.valueArc"
            [cornerRadius]="cornerRadius"
            [colors]="colors"
            [isActive]="isActive(arc.valueArc.data)"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [valueFormatting]="valueFormatting"
            [animations]="animations"
            (select)="onClick($event)"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)">
          </svg:g>
        </svg:g>

        <svg:g ng-svg-charts-gauge-axis
          *ngIf="showAxis"
          [bigSegments]="bigSegments"
          [smallSegments]="smallSegments"
          [min]="min"
          [max]="max"
          [radius]="outerRadius"
          [angleSpan]="angleSpan"
          [valueScale]="valueScale"
          [startAngle]="startAngle"
          [tickFormatting]="axisTickFormatting">
        </svg:g>

        <svg:text #textEl
            [style.textAnchor]="'middle'"
            [attr.transform]="textTransform"
            alignment-baseline="central">
          <tspan x="0" dy="0">{{displayValue}}</tspan>
          <tspan x="0" dy="1.2em">{{units}}</tspan>
        </svg:text>

      </svg:g>
    </ng-svg-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".gauge .background-arc path{fill:rgba(0,0,0,.05)}.gauge .gauge-tick path{stroke:#666}.gauge .gauge-tick text{font-size:12px;fill:#666;font-weight:700}.gauge .gauge-tick-large path{stroke-width:2px}.gauge .gauge-tick-small path{stroke-width:1px}"]
    })
], GaugeComponent);

let GaugeArcComponent = class GaugeArcComponent {
    constructor() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    tooltipText(arc) {
        const label = formatLabel(arc.data.name);
        let val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "backgroundArc", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "valueArc", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", ColorHelper)
], GaugeArcComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "isActive", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], GaugeArcComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "animations", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "select", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "activate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "deactivate", void 0);
GaugeArcComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-gauge-arc]',
        template: `
    <svg:g ng-svg-charts-pie-arc
      class="background-arc"
      [startAngle]="0"
      [endAngle]="backgroundArc.endAngle"
      [innerRadius]="backgroundArc.innerRadius"
      [outerRadius]="backgroundArc.outerRadius"
      [cornerRadius]="cornerRadius"
      [data]="backgroundArc.data"
      [animate]="false"
      [pointerEvents]="false">
    </svg:g>
    <svg:g ng-svg-charts-pie-arc
      [startAngle]="0"
      [endAngle]="valueArc.endAngle"
      [innerRadius]="valueArc.innerRadius"
      [outerRadius]="valueArc.outerRadius"
      [cornerRadius]="cornerRadius"
      [fill]="colors.getColor(valueArc.data.name)"
      [data]="valueArc.data"
      [animate]="animations"
      [isActive]="isActive"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(valueArc)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="valueArc.data">
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GaugeArcComponent);

let GaugeAxisComponent = class GaugeAxisComponent {
    constructor() {
        this.rotate = '';
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = `rotate(${this.rotationAngle})`;
        this.ticks = this.getTicks();
    }
    getTicks() {
        const bigTickSegment = this.angleSpan / this.bigSegments;
        const smallTickSegment = bigTickSegment / (this.smallSegments);
        const tickLength = 20;
        const ticks = {
            big: [],
            small: []
        };
        const startDistance = this.radius + 10;
        const textDist = startDistance + tickLength + 10;
        for (let i = 0; i <= this.bigSegments; i++) {
            const angleDeg = i * bigTickSegment;
            const angle = angleDeg * Math.PI / 180;
            const textAnchor = this.getTextAnchor(angleDeg);
            let skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                let text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor,
                    text,
                    textTransform: `
            translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(${-this.rotationAngle})
          `
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (let j = 1; j <= this.smallSegments; j++) {
                const smallAngleDeg = angleDeg + j * smallTickSegment;
                const smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    }
    getTextAnchor(angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        let textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    }
    getTickPath(startDistance, tickLength, angle) {
        const y1 = startDistance * Math.sin(angle);
        const y2 = (startDistance + tickLength) * Math.sin(angle);
        const x1 = startDistance * Math.cos(angle);
        const x2 = (startDistance + tickLength) * Math.cos(angle);
        const points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        const lineGenerator = line().x(d => d.x).y(d => d.y);
        return lineGenerator(points);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "bigSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "smallSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], GaugeAxisComponent.prototype, "angleSpan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], GaugeAxisComponent.prototype, "startAngle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "radius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "valueScale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "tickFormatting", void 0);
GaugeAxisComponent = __decorate([
    Component({
        selector: 'g[ng-svg-charts-gauge-axis]',
        template: `
    <svg:g [attr.transform]="rotate">
        <svg:g *ngFor="let tick of ticks.big"
            class="gauge-tick gauge-tick-large">
            <svg:path [attr.d]="tick.line" />
        </svg:g>
        <svg:g *ngFor="let tick of ticks.big"
            class="gauge-tick gauge-tick-large">
            <svg:text
                [style.textAnchor]="tick.textAnchor"
                [attr.transform]="tick.textTransform"
                alignment-baseline="central">
                {{tick.text}}
            </svg:text>
        </svg:g>
        <svg:g *ngFor="let tick of ticks.small"
            class="gauge-tick gauge-tick-small">
            <svg:path [attr.d]="tick.line" />
        </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GaugeAxisComponent);

let GaugeModule = class GaugeModule {
};
GaugeModule = __decorate([
    NgModule({
        imports: [ChartCommonModule, PieChartModule, BarChartModule],
        declarations: [
            LinearGaugeComponent,
            GaugeComponent,
            GaugeArcComponent,
            GaugeAxisComponent
        ],
        exports: [
            LinearGaugeComponent,
            GaugeComponent,
            GaugeArcComponent,
            GaugeAxisComponent
        ]
    })
], GaugeModule);

let SvgChartsModule = class SvgChartsModule {
};
SvgChartsModule = __decorate([
    NgModule({
        exports: [
            ChartCommonModule,
            AreaChartModule,
            BarChartModule,
            BubbleChartModule,
            HeatMapModule,
            LineChartModule,
            PolarChartModule,
            NumberCardModule,
            PieChartModule,
            TreeMapModule,
            GaugeModule
        ]
    })
], SvgChartsModule);

// export * from './lib/bar-chart/index';
// export * from './lib/bubble-chart/index';
// export * from './lib/heat-map/index';
// export * from './lib/line-chart/index';
// export * from './lib/polar-chart/index';
// export * from './lib/number-card/index';
// export * from './lib/pie-chart/index';
// export * from './lib/tree-map/index';
// export * from './lib/gauge/index';

/**
 * Generated bundle index. Do not edit.
 */

export { AreaChartModule, ChartCommonModule, SvgChartsModule, AxesModule as ɵa, AxisLabelComponent as ɵb, SvgLinearGradientComponent as ɵba, SvgRadialGradientComponent as ɵbb, TimelineComponent as ɵbc, AdvancedLegendComponent as ɵbd, AreaChartComponent as ɵbe, AreaChartNormalizedComponent as ɵbf, AreaChartStackedComponent as ɵbg, AreaSeriesComponent as ɵbh, BarChartModule as ɵbi, BarComponent as ɵbj, BarHorizontalComponent as ɵbk, BarHorizontal2DComponent as ɵbl, BarHorizontalNormalizedComponent as ɵbm, BarHorizontalStackedComponent as ɵbn, BarVerticalComponent as ɵbo, BarVertical2DComponent as ɵbp, BarVerticalNormalizedComponent as ɵbq, BarVerticalStackedComponent as ɵbr, BarLabelComponent as ɵbs, SeriesHorizontalComponent as ɵbt, SeriesVerticalComponent as ɵbu, BubbleChartModule as ɵbv, BubbleChartComponent as ɵbw, BubbleSeriesComponent as ɵbx, HeatMapModule as ɵby, HeatMapCellComponent as ɵbz, XAxisComponent as ɵc, HeatCellSeriesComponent as ɵca, HeatMapComponent as ɵcb, LineChartModule as ɵcc, LineComponent as ɵcd, LineChartComponent as ɵce, LineSeriesComponent as ɵcf, PolarChartModule as ɵcg, PieChartModule as ɵch, LineChartModule as ɵci, PolarChartComponent as ɵcj, PolarSeriesComponent as ɵck, NumberCardModule as ɵcl, CardComponent as ɵcm, CardSeriesComponent as ɵcn, NumberCardComponent as ɵco, PieChartModule as ɵcp, AdvancedPieChartComponent as ɵcq, PieLabelComponent as ɵcr, PieArcComponent as ɵcs, PieChartComponent as ɵct, PieGridComponent as ɵcu, PieGridSeriesComponent as ɵcv, PieSeriesComponent as ɵcw, TreeMapModule as ɵcx, TreeMapCellComponent as ɵcy, TreeMapCellSeriesComponent as ɵcz, XAxisTicksComponent as ɵd, TreeMapComponent as ɵda, GaugeModule as ɵdb, LinearGaugeComponent as ɵdc, GaugeComponent as ɵdd, GaugeArcComponent as ɵde, GaugeAxisComponent as ɵdf, YAxisComponent as ɵe, YAxisTicksComponent as ɵf, TooltipModule as ɵg, TooltipContentComponent as ɵh, throttleable as ɵi, TooltipDirective as ɵj, TooltipService as ɵk, InjectionRegistery as ɵl, InjectionService as ɵm, AreaComponent as ɵn, BaseChartComponent as ɵo, CountUpDirective as ɵp, TooltipAreaComponent as ɵq, ChartComponent as ɵr, TooltipService as ɵs, LegendComponent as ɵt, LegendEntryComponent as ɵu, ScaleLegendComponent as ɵv, CircleComponent as ɵw, CircleSeriesComponent as ɵx, GridPanelComponent as ɵy, GridPanelSeriesComponent as ɵz };
//# sourceMappingURL=try-svg-chart.js.map
