(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('@angular/platform-browser'), require('rxjs'), require('rxjs/operators'), require('d3-array'), require('d3-scale'), require('d3-brush'), require('d3-selection'), require('d3-shape'), require('d3-interpolate'), require('d3-format'), require('d3-time-format')) :
    typeof define === 'function' && define.amd ? define('@try/svg-chart', ['exports', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser', 'rxjs', 'rxjs/operators', 'd3-array', 'd3-scale', 'd3-brush', 'd3-selection', 'd3-shape', 'd3-interpolate', 'd3-format', 'd3-time-format'], factory) :
    (global = global || self, factory((global.try = global.try || {}, global.try['svg-chart'] = {}), global.ng.core, global.ng.common, global.ng.animations, global.ng.platformBrowser, global.rxjs, global.rxjs.operators, global.d3Array, global.d3Scale, global.d3Brush, global.d3Selection, global.d3Shape, global.d3Interpolate, global.d3Format, global.d3TimeFormat));
}(this, function (exports, core, common, animations, platformBrowser, rxjs, operators, d3Array, d3Scale, d3Brush, d3Selection, d3Shape, d3Interpolate, d3Format, d3TimeFormat) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    // The export is needed here to generate a valid polyfills.metadata.json file
    function ngxChartsPolyfills() {
        // IE11 fix
        // Ref: https://github.com/swimlane/ng-svg-charts/issues/386
        if (typeof (SVGElement) !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
            SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
        }
    }
    ngxChartsPolyfills();

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
                        for (var bindingKeys_1 = __values(bindingKeys), bindingKeys_1_1 = bindingKeys_1.next(); !bindingKeys_1_1.done; bindingKeys_1_1 = bindingKeys_1.next()) {
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
                        for (var eventKeys_1 = __values(eventKeys), eventKeys_1_1 = eventKeys_1.next(); !eventKeys_1_1.done; eventKeys_1_1 = eventKeys_1.next()) {
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
        InjectionService = InjectionService_1 = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core.ApplicationRef,
                core.ComponentFactoryResolver,
                core.Injector])
        ], InjectionService);
        return InjectionService;
    }());

    var InjectionRegistery = /** @class */ (function () {
        function InjectionRegistery(injectionService) {
            this.injectionService = injectionService;
            this.defaults = {};
            this.components = new Map();
        }
        InjectionRegistery.prototype.getByType = function (type) {
            if (type === void 0) { type = this.type; }
            return this.components.get(type);
        };
        InjectionRegistery.prototype.create = function (bindings) {
            return this.createByType(this.type, bindings);
        };
        InjectionRegistery.prototype.createByType = function (type, bindings) {
            bindings = this.assignDefaults(bindings);
            var component = this.injectComponent(type, bindings);
            this.register(type, component);
            return component;
        };
        InjectionRegistery.prototype.destroy = function (instance) {
            var compsByType = this.components.get(instance.componentType);
            if (compsByType) {
                var idx = compsByType.indexOf(instance);
                if (idx > -1) {
                    var component = compsByType[idx];
                    component.destroy();
                    compsByType.splice(idx, 1);
                }
            }
        };
        InjectionRegistery.prototype.destroyAll = function () {
            this.destroyByType(this.type);
        };
        InjectionRegistery.prototype.destroyByType = function (type) {
            var e_1, _a;
            var comps = this.components.get(type);
            if (comps) {
                try {
                    for (var comps_1 = __values(comps), comps_1_1 = comps_1.next(); !comps_1_1.done; comps_1_1 = comps_1.next()) {
                        var comp = comps_1_1.value;
                        this.destroy(comp);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (comps_1_1 && !comps_1_1.done && (_a = comps_1.return)) _a.call(comps_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        InjectionRegistery.prototype.assignDefaults = function (bindings) {
            var _a = this.defaults, inputs = _a.inputs, outputs = _a.outputs;
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
        };
        InjectionRegistery.prototype.injectComponent = function (type, bindings) {
            return this.injectionService.appendComponent(type, bindings);
        };
        InjectionRegistery.prototype.register = function (type, component) {
            if (!this.components.has(type)) {
                this.components.set(type, []);
            }
            var types = this.components.get(type);
            types.push(component);
        };
        return InjectionRegistery;
    }());

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
        var context;
        var args;
        var result;
        var timeout = null;
        var previous = 0;
        function later() {
            previous = options.leading === false ? 0 : +new Date();
            timeout = null;
            result = func.apply(context, args);
        }
        return function () {
            var now = +new Date();
            if (!previous && options.leading === false) {
                previous = now;
            }
            var remaining = wait - (now - previous);
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

    var PlacementTypes;
    (function (PlacementTypes) {
        PlacementTypes[PlacementTypes["top"] = 'top'] = "top";
        PlacementTypes[PlacementTypes["bottom"] = 'bottom'] = "bottom";
        PlacementTypes[PlacementTypes["left"] = 'left'] = "left";
        PlacementTypes[PlacementTypes["right"] = 'right'] = "right";
    })(PlacementTypes || (PlacementTypes = {}));

    var caretOffset = 7;
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
    var PositionHelper = /** @class */ (function () {
        function PositionHelper() {
        }
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
        PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
            var result = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (result + popoverDimensions.height > window.innerHeight) {
                result = window.innerHeight - popoverDimensions.height;
            }
            return result;
        };
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
        PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
            var result;
            if (alignment === 'top') {
                result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
            }
            if (alignment === 'bottom') {
                result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
            }
            if (alignment === 'center') {
                result = popoverDimensions.height / 2 - caretDimensions.height / 2;
            }
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height > window.innerHeight) {
                result += (popoverPosition + popoverDimensions.height - window.innerHeight);
            }
            return result;
        };
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
        PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
            var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (result + popoverDimensions.width > window.innerWidth) {
                result = window.innerWidth - popoverDimensions.width;
            }
            return result;
        };
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
        PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
            var result;
            if (alignment === 'left') {
                result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
            }
            if (alignment === 'right') {
                result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
            }
            if (alignment === 'center') {
                result = popoverDimensions.width / 2 - caretDimensions.width / 2;
            }
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width > window.innerWidth) {
                result += (popoverPosition + popoverDimensions.width - window.innerWidth);
            }
            return result;
        };
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
        PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, alignment, spacing) {
            var flip = false;
            if (placement === 'right') {
                var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
                if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                    flip = true;
                }
            }
            if (placement === 'left') {
                var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
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
                var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
                if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                    flip = true;
                }
            }
            return flip;
        };
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
        PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
            var top = 0;
            var left = 0;
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
            return { top: top, left: left };
        };
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
        PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
            var top = 0;
            var left = 0;
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
            return { top: top, left: left };
        };
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
        PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing, alignment) {
            var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, alignment, spacing);
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
        };
        return PositionHelper;
    }());


    (function (StyleTypes) {
        StyleTypes[StyleTypes["popover"] = 'popover'] = "popover";
        StyleTypes[StyleTypes["tooltip"] = 'tooltip'] = "tooltip";
    })(exports.StyleTypes || (exports.StyleTypes = {}));


    (function (AlignmentTypes) {
        AlignmentTypes[AlignmentTypes["left"] = 'left'] = "left";
        AlignmentTypes[AlignmentTypes["center"] = 'center'] = "center";
        AlignmentTypes[AlignmentTypes["right"] = 'right'] = "right";
    })(exports.AlignmentTypes || (exports.AlignmentTypes = {}));

    var TooltipContentComponent = /** @class */ (function () {
        function TooltipContentComponent(element, renderer) {
            this.element = element;
            this.renderer = renderer;
        }
        Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
            get: function () {
                var clz = 'ng-svg-charts-tooltip-content';
                clz += " position-" + this.placement;
                clz += " type-" + this.type;
                clz += " " + this.cssClass;
                return clz;
            },
            enumerable: true,
            configurable: true
        });
        TooltipContentComponent.prototype.ngAfterViewInit = function () {
            setTimeout(this.position.bind(this));
        };
        TooltipContentComponent.prototype.position = function () {
            var _this = this;
            var nativeElm = this.element.nativeElement;
            var hostDim = this.host.nativeElement.getBoundingClientRect();
            // if no dims were found, never show
            if (!hostDim.height && !hostDim.width) {
                return;
            }
            var elmDim = nativeElm.getBoundingClientRect();
            this.checkFlip(hostDim, elmDim);
            this.positionContent(nativeElm, hostDim, elmDim);
            if (this.showCaret) {
                this.positionCaret(hostDim, elmDim);
            }
            // animate its entry
            setTimeout(function () { return _this.renderer.addClass(nativeElm, 'animate'); }, 1);
        };
        TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
            var _a = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
            this.renderer.setStyle(nativeElm, 'top', top + "px");
            this.renderer.setStyle(nativeElm, 'left', left + "px");
        };
        TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
            var caretElm = this.caretElm.nativeElement;
            var caretDimensions = caretElm.getBoundingClientRect();
            var _a = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
            this.renderer.setStyle(caretElm, 'top', top + "px");
            this.renderer.setStyle(caretElm, 'left', left + "px");
        };
        TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
            this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        };
        TooltipContentComponent.prototype.onWindowResize = function () {
            this.position();
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipContentComponent.prototype, "host", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TooltipContentComponent.prototype, "showCaret", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipContentComponent.prototype, "type", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipContentComponent.prototype, "placement", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipContentComponent.prototype, "alignment", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipContentComponent.prototype, "spacing", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TooltipContentComponent.prototype, "cssClass", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TooltipContentComponent.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipContentComponent.prototype, "template", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipContentComponent.prototype, "context", void 0);
        __decorate([
            core.ViewChild('caretElm'),
            __metadata("design:type", Object)
        ], TooltipContentComponent.prototype, "caretElm", void 0);
        __decorate([
            core.HostBinding('class'),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], TooltipContentComponent.prototype, "cssClasses", null);
        __decorate([
            core.HostListener('window:resize'),
            throttleable(100),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TooltipContentComponent.prototype, "onWindowResize", null);
        TooltipContentComponent = __decorate([
            core.Component({
                selector: 'ngx-tooltip-content',
                template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template\n            [ngTemplateOutlet]=\"template\"\n            [ngTemplateOutletContext]=\"{ model: context }\">\n          </ng-template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  ",
                encapsulation: core.ViewEncapsulation.None,
                styles: [".ng-svg-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ng-svg-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;-webkit-box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ng-svg-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ng-svg-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ng-svg-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ng-svg-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ng-svg-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ng-svg-charts-tooltip-content.position-right{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}.ng-svg-charts-tooltip-content.position-left{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}.ng-svg-charts-tooltip-content.position-top{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.ng-svg-charts-tooltip-content.position-bottom{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}.ng-svg-charts-tooltip-content.animate{opacity:1;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-o-transition:opacity .3s,transform .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.Renderer2])
        ], TooltipContentComponent);
        return TooltipContentComponent;
    }());

    var TooltipService = /** @class */ (function (_super) {
        __extends(TooltipService, _super);
        function TooltipService(injectionService) {
            var _this = _super.call(this, injectionService) || this;
            _this.injectionService = injectionService;
            _this.type = TooltipContentComponent;
            return _this;
        }
        TooltipService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [InjectionService])
        ], TooltipService);
        return TooltipService;
    }(InjectionRegistery));

    var ChartComponent = /** @class */ (function () {
        function ChartComponent(vcr, tooltipService) {
            this.vcr = vcr;
            this.tooltipService = tooltipService;
            this.showLegend = false;
            this.animations = true;
            this.legendLabelClick = new core.EventEmitter();
            this.legendLabelActivate = new core.EventEmitter();
            this.legendLabelDeactivate = new core.EventEmitter();
            this.tooltipService.injectionService.setRootViewContainer(this.vcr);
        }
        ChartComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        ChartComponent.prototype.update = function () {
            var legendColumns = 0;
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
            var chartColumns = 12 - legendColumns;
            this.chartWidth = ~~(this.view[0] * chartColumns / 12.0);
            this.legendWidth = (!this.legendOptions || this.legendOptions.position === 'right')
                ? ~~(this.view[0] * legendColumns / 12.0)
                : this.chartWidth;
        };
        ChartComponent.prototype.getLegendType = function () {
            if (this.legendOptions.scaleType === 'linear') {
                return 'scaleLegend';
            }
            else {
                return 'legend';
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "view", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "showLegend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "legendOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "legendData", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "legendType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], ChartComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ChartComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ChartComponent.prototype, "legendLabelClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ChartComponent.prototype, "legendLabelActivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ChartComponent.prototype, "legendLabelDeactivate", void 0);
        ChartComponent = __decorate([
            core.Component({
                providers: [TooltipService],
                selector: 'ng-svg-charts-chart',
                template: "\n    <div\n      class=\"ng-svg-charts-outer\"\n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\">\n      <svg\n        class=\"ng-svg-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ng-svg-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ng-svg-charts-scale-legend>\n      <ng-svg-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ng-svg-charts-legend>\n    </div>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':enter', [
                            animations.style({ opacity: 0 }),
                            animations.animate('500ms 100ms', animations.style({ opacity: 1 }))
                        ])
                    ])
                ]
            }),
            __metadata("design:paramtypes", [core.ViewContainerRef,
                TooltipService])
        ], ChartComponent);
        return ChartComponent;
    }());

    var ScaleLegendComponent = /** @class */ (function () {
        function ScaleLegendComponent(sanitizer) {
            this.sanitizer = sanitizer;
            this.horizontal = false;
        }
        ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
            var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
            var direction = (this.horizontal) ? 'right' : 'bottom';
            this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to " + direction + ", " + gradientValues + ")");
        };
        /**
         * Generates the string used in the gradient stylesheet properties
         * @param  {array} colors array of colors
         * @param  {array} splits array of splits on a scale of (0, 1)
         * @return {string}
         */
        ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
            // add the 100%
            splits.push(1);
            var pairs = [];
            colors.reverse().forEach(function (c, i) {
                pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
            });
            return pairs.join(', ');
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ScaleLegendComponent.prototype, "valueRange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ScaleLegendComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ScaleLegendComponent.prototype, "height", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ScaleLegendComponent.prototype, "width", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ScaleLegendComponent.prototype, "horizontal", void 0);
        ScaleLegendComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-scale-legend',
                template: "\n    <div\n      class=\"scale-legend\"\n      [class.horizontal-legend]=\"horizontal\"\n      [style.height.px]=\"horizontal ? undefined : height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;-webkit-box-flex:1;-ms-flex:1;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"]
            }),
            __metadata("design:paramtypes", [platformBrowser.DomSanitizer])
        ], ScaleLegendComponent);
        return ScaleLegendComponent;
    }());

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

    var LegendComponent = /** @class */ (function () {
        function LegendComponent(cd) {
            this.cd = cd;
            this.horizontal = false;
            this.labelClick = new core.EventEmitter();
            this.labelActivate = new core.EventEmitter();
            this.labelDeactivate = new core.EventEmitter();
            this.legendEntries = [];
        }
        LegendComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        LegendComponent.prototype.update = function () {
            this.cd.markForCheck();
            this.legendEntries = this.getLegendEntries();
        };
        LegendComponent.prototype.getLegendEntries = function () {
            var e_1, _a;
            var items = [];
            var _loop_1 = function (label) {
                var formattedLabel = formatLabel(label);
                var idx = items.findIndex(function (i) {
                    return i.label === formattedLabel;
                });
                if (idx === -1) {
                    items.push({
                        label: label,
                        formattedLabel: formattedLabel,
                        color: this_1.colors.getColor(label)
                    });
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var label = _c.value;
                    _loop_1(label);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return items;
        };
        LegendComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.label === d.name;
            });
            return item !== undefined;
        };
        LegendComponent.prototype.activate = function (item) {
            this.labelActivate.emit(item);
        };
        LegendComponent.prototype.deactivate = function (item) {
            this.labelDeactivate.emit(item);
        };
        LegendComponent.prototype.trackBy = function (index, item) {
            return item.label;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "height", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "width", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendComponent.prototype, "horizontal", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendComponent.prototype, "labelClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendComponent.prototype, "labelActivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendComponent.prototype, "labelDeactivate", void 0);
        LegendComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-legend',
                template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\" *ngIf=\"title?.length > 0\">\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n            [class.horizontal-legend]=\"horizontal\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ng-svg-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ng-svg-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}"]
            }),
            __metadata("design:paramtypes", [core.ChangeDetectorRef])
        ], LegendComponent);
        return LegendComponent;
    }());

    var LegendEntryComponent = /** @class */ (function () {
        function LegendEntryComponent() {
            this.isActive = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.toggle = new core.EventEmitter();
        }
        Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
            get: function () {
                return this.formattedLabel || '(empty)';
            },
            enumerable: true,
            configurable: true
        });
        LegendEntryComponent.prototype.onMouseEnter = function () {
            this.activate.emit({ name: this.label });
        };
        LegendEntryComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit({ name: this.label });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LegendEntryComponent.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendEntryComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LegendEntryComponent.prototype, "formattedLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LegendEntryComponent.prototype, "isActive", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendEntryComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendEntryComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendEntryComponent.prototype, "deactivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LegendEntryComponent.prototype, "toggle", void 0);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], LegendEntryComponent.prototype, "onMouseEnter", null);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], LegendEntryComponent.prototype, "onMouseLeave", null);
        LegendEntryComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-legend-entry',
                template: "\n    <span\n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], LegendEntryComponent);
        return LegendEntryComponent;
    }());

    function trimLabel(s, max) {
        if (max === void 0) { max = 16; }
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
            return s.slice(0, max) + "...";
        }
    }

    var AdvancedLegendComponent = /** @class */ (function () {
        function AdvancedLegendComponent() {
            this.label = 'Total';
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.legendItems = [];
            this.labelFormatting = function (label) { return label; };
            this.percentageFormatting = function (percentage) { return percentage; };
            this.defaultValueFormatting = function (value) { return value.toLocaleString(); };
        }
        AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        AdvancedLegendComponent.prototype.getTotal = function () {
            return this.data.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        };
        AdvancedLegendComponent.prototype.update = function () {
            this.total = this.getTotal();
            this.roundedTotal = this.total;
            this.legendItems = this.getLegendItems();
        };
        AdvancedLegendComponent.prototype.getLegendItems = function () {
            var _this = this;
            return this.data.map(function (d) {
                var label = formatLabel(d.name);
                var value = d.value;
                var color = _this.colors.getColor(label);
                var percentage = _this.total > 0 ? (value / _this.total) * 100 : 0;
                var formattedLabel = typeof _this.labelFormatting === 'function' ? _this.labelFormatting(label) : label;
                return {
                    _value: value,
                    value: value,
                    color: color,
                    label: formattedLabel,
                    displayLabel: trimLabel(formattedLabel, 20),
                    origialLabel: d.name,
                    percentage: _this.percentageFormatting ? _this.percentageFormatting(percentage) : percentage.toLocaleString()
                };
            });
        };
        AdvancedLegendComponent.prototype.trackBy = function (item) {
            return item.formattedLabel;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AdvancedLegendComponent.prototype, "width", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedLegendComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedLegendComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedLegendComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedLegendComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AdvancedLegendComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AdvancedLegendComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AdvancedLegendComponent.prototype, "deactivate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AdvancedLegendComponent.prototype, "valueFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AdvancedLegendComponent.prototype, "labelFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AdvancedLegendComponent.prototype, "percentageFormatting", void 0);
        AdvancedLegendComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-advanced-legend',
                template: "\n    <div class=\"advanced-pie-legend\" [style.width.px]=\"width\">\n      <div\n        *ngIf=\"animations\"\n        class=\"total-value\"\n        ng-svg-charts-count-up\n        [countTo]=\"roundedTotal\"\n        [valueFormatting]=\"valueFormatting\">\n      </div>\n      <div class=\"total-value\" *ngIf=\"!animations\">\n        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}\n      </div>\n      <div class=\"total-label\">\n        {{ label }}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy: trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div class=\"item-color\" [style.border-left-color]=\"legendItem.color\"></div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-value\"\n              ng-svg-charts-count-up\n              [countTo]=\"legendItem._value\"\n              [valueFormatting]=\"valueFormatting\">\n            </div>\n            <div *ngIf=\"!animations\" class=\"item-value\">\n              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}\n            </div>\n            <div class=\"item-label\">{{ legendItem.displayLabel }}</div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-percent\"\n              ng-svg-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n            <div *ngIf=\"!animations\" class=\"item-percent\">{{ legendItem.percentage.toLocaleString() }}%</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                preserveWhitespaces: false,
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".advanced-pie-legend{float:left;position:relative;top:50%;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"]
            })
        ], AdvancedLegendComponent);
        return AdvancedLegendComponent;
    }());

    /**
     * Visibility Observer
     */
    var VisibilityObserver = /** @class */ (function () {
        function VisibilityObserver(element, zone) {
            this.element = element;
            this.zone = zone;
            this.visible = new core.EventEmitter();
            this.isVisible = false;
            this.runCheck();
        }
        VisibilityObserver.prototype.destroy = function () {
            clearTimeout(this.timeout);
        };
        VisibilityObserver.prototype.onVisibilityChange = function () {
            var _this = this;
            // trigger zone recalc for columns
            this.zone.run(function () {
                _this.isVisible = true;
                _this.visible.emit(true);
            });
        };
        VisibilityObserver.prototype.runCheck = function () {
            var _this = this;
            var check = function () {
                if (!_this.element) {
                    return;
                }
                // https://davidwalsh.name/offsetheight-visibility
                var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
                if (offsetHeight && offsetWidth) {
                    clearTimeout(_this.timeout);
                    _this.onVisibilityChange();
                }
                else {
                    clearTimeout(_this.timeout);
                    _this.zone.runOutsideAngular(function () {
                        _this.timeout = setTimeout(function () { return check(); }, 100);
                    });
                }
            };
            this.zone.runOutsideAngular(function () {
                _this.timeout = setTimeout(function () { return check(); });
            });
        };
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], VisibilityObserver.prototype, "visible", void 0);
        return VisibilityObserver;
    }());

    var BaseChartComponent = /** @class */ (function () {
        function BaseChartComponent(chartElement, zone, cd) {
            this.chartElement = chartElement;
            this.zone = zone;
            this.cd = cd;
            this.scheme = 'cool';
            this.schemeType = 'ordinal';
            this.animations = true;
            this.select = new core.EventEmitter();
        }
        BaseChartComponent.prototype.ngAfterViewInit = function () {
            this.bindWindowResizeEvent();
            // listen for visibility of the element for hidden by default scenario
            this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
            this.visibilityObserver.visible.subscribe(this.update.bind(this));
        };
        BaseChartComponent.prototype.ngOnDestroy = function () {
            this.unbindEvents();
            if (this.visibilityObserver) {
                this.visibilityObserver.visible.unsubscribe();
                this.visibilityObserver.destroy();
            }
        };
        BaseChartComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        BaseChartComponent.prototype.update = function () {
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
                var dims = this.getContainerDims();
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
        };
        BaseChartComponent.prototype.getContainerDims = function () {
            var width;
            var height;
            var hostElem = this.chartElement.nativeElement;
            if (hostElem.parentNode !== null) {
                // Get the container dimensions
                var dims = hostElem.parentNode.getBoundingClientRect();
                width = dims.width;
                height = dims.height;
            }
            if (width && height) {
                return { width: width, height: height };
            }
            return null;
        };
        /**
         * Converts all date objects that appear as name
         * into formatted date strings
         */
        BaseChartComponent.prototype.formatDates = function () {
            // tslint:disable-next-line: prefer-for-of
            for (var i = 0; i < this.results.length; i++) {
                var g = this.results[i];
                if (g.name instanceof Date) {
                    g.name = g.name.toLocaleDateString();
                }
                if (g.series) {
                    // tslint:disable-next-line: prefer-for-of
                    for (var j = 0; j < g.series.length; j++) {
                        var d = g.series[j];
                        if (d.name instanceof Date) {
                            d.name = d.name.toLocaleDateString();
                        }
                    }
                }
            }
        };
        BaseChartComponent.prototype.unbindEvents = function () {
            if (this.resizeSubscription) {
                this.resizeSubscription.unsubscribe();
            }
        };
        BaseChartComponent.prototype.bindWindowResizeEvent = function () {
            var _this = this;
            var source = rxjs.fromEvent(window, 'resize');
            var subscription = source.pipe(operators.debounceTime(200)).subscribe(function (e) {
                _this.update();
                if (_this.cd) {
                    _this.cd.markForCheck();
                }
            });
            this.resizeSubscription = subscription;
        };
        /**
         * Clones the data into a new object
         *
         * @private
         * @param {any} data
         * @returns {*}
         *
         * @memberOf BaseChart
         */
        BaseChartComponent.prototype.cloneData = function (data) {
            var e_1, _a, e_2, _b;
            var results = [];
            try {
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var item = data_1_1.value;
                    var copy = {
                        name: item['name']
                    };
                    if (item['value'] !== undefined) {
                        copy['value'] = item['value'];
                    }
                    if (item['series'] !== undefined) {
                        copy['series'] = [];
                        try {
                            for (var _c = __values(item['series']), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var seriesItem = _d.value;
                                var seriesItemCopy = Object.assign({}, seriesItem);
                                copy['series'].push(seriesItemCopy);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    if (item['extra'] !== undefined) {
                        copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
                    }
                    results.push(copy);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return results;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BaseChartComponent.prototype, "results", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BaseChartComponent.prototype, "view", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BaseChartComponent.prototype, "scheme", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BaseChartComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BaseChartComponent.prototype, "customColors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BaseChartComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], BaseChartComponent.prototype, "select", void 0);
        BaseChartComponent = __decorate([
            core.Component({
                selector: 'base-chart',
                template: "<div></div>"
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.NgZone,
                core.ChangeDetectorRef])
        ], BaseChartComponent);
        return BaseChartComponent;
    }());

    var AxisLabelComponent = /** @class */ (function () {
        function AxisLabelComponent(element) {
            this.textHeight = 25;
            this.margin = 5;
            this.element = element.nativeElement;
        }
        AxisLabelComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        AxisLabelComponent.prototype.update = function () {
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AxisLabelComponent.prototype, "orient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AxisLabelComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AxisLabelComponent.prototype, "offset", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AxisLabelComponent.prototype, "width", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AxisLabelComponent.prototype, "height", void 0);
        AxisLabelComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-axis-label]',
                template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], AxisLabelComponent);
        return AxisLabelComponent;
    }());

    function reduceTicks(ticks, maxTicks) {
        if (ticks.length > maxTicks) {
            var reduced = [];
            var modulus = Math.floor(ticks.length / maxTicks);
            for (var i = 0; i < ticks.length; i++) {
                if (i % modulus === 0) {
                    reduced.push(ticks[i]);
                }
            }
            ticks = reduced;
        }
        return ticks;
    }

    var XAxisTicksComponent = /** @class */ (function () {
        function XAxisTicksComponent() {
            this.tickArguments = [5];
            this.tickStroke = '#ccc';
            this.trimTicks = true;
            this.maxTickLength = 16;
            this.showGridLines = false;
            this.dimensionsChanged = new core.EventEmitter();
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
        XAxisTicksComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        XAxisTicksComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.updateDims(); });
        };
        XAxisTicksComponent.prototype.updateDims = function () {
            var _this = this;
            var height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
            if (height !== this.height) {
                this.height = height;
                this.dimensionsChanged.emit({ height: height });
                setTimeout(function () { return _this.updateDims(); });
            }
        };
        XAxisTicksComponent.prototype.update = function () {
            var _this = this;
            var scale = this.scale;
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
            var angle = this.getRotationAngle(this.ticks);
            this.adjustedScale = this.scale.bandwidth
                ? function (d) {
                    return this.scale(d) + this.scale.bandwidth() * 0.5;
                }
                : this.scale;
            this.textTransform = '';
            if (angle !== 0) {
                this.textTransform = "rotate(" + angle + ")";
                this.textAnchor = 'end';
                this.verticalSpacing = 10;
            }
            else {
                this.textAnchor = 'middle';
            }
            setTimeout(function () { return _this.updateDims(); });
        };
        XAxisTicksComponent.prototype.getRotationAngle = function (ticks) {
            var angle = 0;
            this.maxTicksLength = 0;
            // tslint:disable-next-line: prefer-for-of
            for (var i = 0; i < ticks.length; i++) {
                var tick = this.tickFormat(ticks[i]).toString();
                var tickLength = tick.length;
                if (this.trimTicks) {
                    tickLength = this.tickTrim(tick).length;
                }
                if (tickLength > this.maxTicksLength) {
                    this.maxTicksLength = tickLength;
                }
            }
            var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
            var charWidth = 8; // need to measure this
            var wordWidth = len * charWidth;
            var baseWidth = wordWidth;
            var maxBaseWidth = Math.floor(this.width / ticks.length);
            // calculate optimal angle
            while (baseWidth > maxBaseWidth && angle > -90) {
                angle -= 30;
                baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
            }
            return angle;
        };
        XAxisTicksComponent.prototype.getTicks = function () {
            var ticks;
            var maxTicks = this.getMaxTicks(20);
            var maxScaleTicks = this.getMaxTicks(100);
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
        };
        XAxisTicksComponent.prototype.getMaxTicks = function (tickWidth) {
            return Math.floor(this.width / tickWidth);
        };
        XAxisTicksComponent.prototype.tickTransform = function (tick) {
            return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
        };
        XAxisTicksComponent.prototype.gridLineTransform = function () {
            return "translate(0," + (-this.verticalSpacing - 5) + ")";
        };
        XAxisTicksComponent.prototype.tickTrim = function (label) {
            return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "scale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "orient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "tickArguments", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], XAxisTicksComponent.prototype, "tickValues", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "tickStroke", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "trimTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "maxTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "tickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "width", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
        __decorate([
            core.ViewChild('ticksel'),
            __metadata("design:type", core.ElementRef)
        ], XAxisTicksComponent.prototype, "ticksElement", void 0);
        XAxisTicksComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-x-axis-ticks]',
                template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"tickTransform(tick)\">\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.text-anchor]=\"textAnchor\"\n          [attr.transform]=\"textTransform\"\n          [style.font-size]=\"'12px'\">\n          {{tickTrim(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"tickTransform(tick)\">\n      <svg:g *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          class=\"gridline-path gridline-path-vertical\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], XAxisTicksComponent);
        return XAxisTicksComponent;
    }());

    var XAxisComponent = /** @class */ (function () {
        function XAxisComponent() {
            this.showGridLines = false;
            this.xOrient = 'bottom';
            this.xAxisOffset = 0;
            this.dimensionsChanged = new core.EventEmitter();
            this.xAxisClassName = 'x axis';
            this.labelOffset = 0;
            this.fill = 'none';
            this.stroke = 'stroke';
            this.tickStroke = '#ccc';
            this.strokeWidth = 'none';
            this.padding = 5;
        }
        XAxisComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        XAxisComponent.prototype.update = function () {
            this.transform = "translate(0," + (this.xAxisOffset + this.padding + this.dims.height) + ")";
            if (typeof this.xAxisTickCount !== 'undefined') {
                this.tickArguments = [this.xAxisTickCount];
            }
        };
        XAxisComponent.prototype.emitTicksHeight = function (_a) {
            var _this = this;
            var height = _a.height;
            var newLabelOffset = height + 25 + 5;
            if (newLabelOffset !== this.labelOffset) {
                this.labelOffset = newLabelOffset;
                setTimeout(function () {
                    _this.dimensionsChanged.emit({ height: height });
                }, 0);
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], XAxisComponent.prototype, "trimTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], XAxisComponent.prototype, "maxTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "tickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "showLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "labelText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], XAxisComponent.prototype, "ticks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "xAxisTickInterval", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "xAxisTickCount", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "xOrient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "xAxisOffset", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], XAxisComponent.prototype, "dimensionsChanged", void 0);
        __decorate([
            core.ViewChild(XAxisTicksComponent),
            __metadata("design:type", XAxisTicksComponent)
        ], XAxisComponent.prototype, "ticksComponent", void 0);
        XAxisComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-x-axis]',
                template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ng-svg-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        [tickValues]=\"ticks\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g ng-svg-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], XAxisComponent);
        return XAxisComponent;
    }());

    /**
     * Generates a rounded rectanglar path
     *
     * @export
     * @param {*} x, y, w, h, r, tl, tr, bl, br
     * @returns {string}
     */
    function roundedRect(x, y, w, h, r, _a) {
        var _b = __read(_a, 4), tl = _b[0], tr = _b[1], bl = _b[2], br = _b[3];
        var retval = '';
        w = Math.floor(w);
        h = Math.floor(h);
        w = w === 0 ? 1 : w;
        h = h === 0 ? 1 : h;
        retval = "M" + [x + r, y];
        retval += "h" + (w - 2 * r);
        if (tr) {
            retval += "a" + [r, r] + " 0 0 1 " + [r, r];
        }
        else {
            retval += "h" + r + "v" + r;
        }
        retval += "v" + (h - 2 * r);
        if (br) {
            retval += "a" + [r, r] + " 0 0 1 " + [-r, r];
        }
        else {
            retval += "v" + r + "h" + -r;
        }
        retval += "h" + (2 * r - w);
        if (bl) {
            retval += "a" + [r, r] + " 0 0 1 " + [-r, -r];
        }
        else {
            retval += "h" + -r + "v" + -r;
        }
        retval += "v" + (2 * r - h);
        if (tl) {
            retval += "a" + [r, r] + " 0 0 1 " + [r, -r];
        }
        else {
            retval += "v" + -r + "h" + r;
        }
        retval += "z";
        return retval;
    }

    var YAxisTicksComponent = /** @class */ (function () {
        function YAxisTicksComponent() {
            this.tickArguments = [5];
            this.tickStroke = '#ccc';
            this.trimTicks = true;
            this.maxTickLength = 16;
            this.showGridLines = false;
            this.showRefLabels = false;
            this.showRefLines = false;
            this.dimensionsChanged = new core.EventEmitter();
            this.innerTickSize = 6;
            this.tickPadding = 3;
            this.verticalSpacing = 20;
            this.textAnchor = 'middle';
            this.width = 0;
            this.outerTickSize = 6;
            this.rotateLabels = false;
            this.referenceLineLength = 0;
        }
        YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        YAxisTicksComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.updateDims(); });
        };
        YAxisTicksComponent.prototype.updateDims = function () {
            var _this = this;
            var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
            if (width !== this.width) {
                this.width = width;
                this.dimensionsChanged.emit({ width: width });
                setTimeout(function () { return _this.updateDims(); });
            }
        };
        YAxisTicksComponent.prototype.update = function () {
            var _this = this;
            var scale;
            var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
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
            setTimeout(function () { return _this.updateDims(); });
        };
        YAxisTicksComponent.prototype.setReferencelines = function () {
            this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(function (item) { return item.value; })));
            this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(function (item) { return item.value; })));
            this.referenceLineLength = this.referenceLines.length;
            this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [false, false, false, false]);
        };
        YAxisTicksComponent.prototype.getTicks = function () {
            var ticks;
            var maxTicks = this.getMaxTicks(20);
            var maxScaleTicks = this.getMaxTicks(50);
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
        };
        YAxisTicksComponent.prototype.getMaxTicks = function (tickHeight) {
            return Math.floor(this.height / tickHeight);
        };
        YAxisTicksComponent.prototype.tickTransform = function (tick) {
            return "translate(" + this.adjustedScale(tick) + "," + this.verticalSpacing + ")";
        };
        YAxisTicksComponent.prototype.gridLineTransform = function () {
            return "translate(5,0)";
        };
        YAxisTicksComponent.prototype.tickTrim = function (label) {
            return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "scale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "orient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "tickArguments", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], YAxisTicksComponent.prototype, "tickValues", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "tickStroke", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "trimTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "maxTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "tickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "height", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "referenceLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "showRefLabels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "showRefLines", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
        __decorate([
            core.ViewChild('ticksel'),
            __metadata("design:type", core.ElementRef)
        ], YAxisTicksComponent.prototype, "ticksElement", void 0);
        YAxisTicksComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-y-axis-ticks]',
                template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"transform(tick)\" >\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\">\n          {{tickTrim(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:path *ngIf=\"referenceLineLength > 1 && refMax && refMin && showRefLines\"\n      class=\"reference-area\"\n      [attr.d]=\"referenceAreaPath\"\n      [attr.transform]=\"gridLineTransform()\"\n    />\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"transform(tick)\">\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line *ngIf=\"orient === 'left'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line *ngIf=\"orient === 'right'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"-gridLineWidth\" />\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let refLine of referenceLines\">\n      <svg:g *ngIf=\"showRefLines\" [attr.transform]=\"transform(refLine.value)\">\n        <svg:line class=\"refline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          [attr.transform]=\"gridLineTransform()\"/>\n        <svg:g *ngIf=\"showRefLabels\">\n          <title>{{tickTrim(tickFormat(refLine.value))}}</title>\n          <svg:text\n            class=\"refline-label\"\n            [attr.dy]=\"dy\"\n            [attr.y]=\"-6\"\n            [attr.x]=\"gridLineWidth\"\n            [attr.text-anchor]=\"textAnchor\" >\n            {{refLine.name}}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], YAxisTicksComponent);
        return YAxisTicksComponent;
    }());

    var YAxisComponent = /** @class */ (function () {
        function YAxisComponent() {
            this.showGridLines = false;
            this.yOrient = 'left';
            this.yAxisOffset = 0;
            this.dimensionsChanged = new core.EventEmitter();
            this.yAxisClassName = 'y axis';
            this.labelOffset = 15;
            this.fill = 'none';
            this.stroke = '#CCC';
            this.tickStroke = '#CCC';
            this.strokeWidth = 1;
            this.padding = 5;
        }
        YAxisComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        YAxisComponent.prototype.update = function () {
            this.offset = -(this.yAxisOffset + this.padding);
            if (this.yOrient === 'right') {
                this.labelOffset = 65;
                this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
            }
            else {
                this.offset = this.offset;
                this.transform = "translate(" + this.offset + " , 0)";
            }
            if (this.yAxisTickCount !== undefined) {
                this.tickArguments = [this.yAxisTickCount];
            }
        };
        YAxisComponent.prototype.emitTicksWidth = function (_a) {
            var _this = this;
            var width = _a.width;
            if (width !== this.labelOffset && this.yOrient === 'right') {
                this.labelOffset = width + this.labelOffset;
                setTimeout(function () {
                    _this.dimensionsChanged.emit({ width: width });
                }, 0);
            }
            else if (width !== this.labelOffset) {
                this.labelOffset = width;
                setTimeout(function () {
                    _this.dimensionsChanged.emit({ width: width });
                }, 0);
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], YAxisComponent.prototype, "trimTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], YAxisComponent.prototype, "maxTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "tickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], YAxisComponent.prototype, "ticks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "showLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "labelText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "yAxisTickInterval", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "yAxisTickCount", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "yOrient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "referenceLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "showRefLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "showRefLabels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "yAxisOffset", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], YAxisComponent.prototype, "dimensionsChanged", void 0);
        __decorate([
            core.ViewChild(YAxisTicksComponent),
            __metadata("design:type", YAxisTicksComponent)
        ], YAxisComponent.prototype, "ticksComponent", void 0);
        YAxisComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-y-axis]',
                template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ng-svg-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickValues]=\"ticks\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ng-svg-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], YAxisComponent);
        return YAxisComponent;
    }());

    var AxesModule = /** @class */ (function () {
        function AxesModule() {
        }
        AxesModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent],
                exports: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent]
            })
        ], AxesModule);
        return AxesModule;
    }());


    (function (ShowTypes) {
        ShowTypes[ShowTypes["all"] = 'all'] = "all";
        ShowTypes[ShowTypes["focus"] = 'focus'] = "focus";
        ShowTypes[ShowTypes["mouseover"] = 'mouseover'] = "mouseover";
    })(exports.ShowTypes || (exports.ShowTypes = {}));

    var TooltipDirective = /** @class */ (function () {
        function TooltipDirective(tooltipService, viewContainerRef, renderer) {
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
            this.tooltipAlignment = exports.AlignmentTypes.center;
            this.tooltipType = exports.StyleTypes.popover;
            this.tooltipCloseOnClickOutside = true;
            this.tooltipCloseOnMouseLeave = true;
            this.tooltipHideTimeout = 300;
            this.tooltipShowTimeout = 100;
            this.tooltipShowEvent = exports.ShowTypes.all;
            this.tooltipImmediateExit = false;
            this.show = new core.EventEmitter();
            this.hide = new core.EventEmitter();
        }
        Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
            get: function () {
                return this.tooltipShowEvent === exports.ShowTypes.all ||
                    this.tooltipShowEvent === exports.ShowTypes.focus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
            get: function () {
                return this.tooltipShowEvent === exports.ShowTypes.all ||
                    this.tooltipShowEvent === exports.ShowTypes.mouseover;
            },
            enumerable: true,
            configurable: true
        });
        TooltipDirective.prototype.ngOnDestroy = function () {
            this.hideTooltip(true);
        };
        TooltipDirective.prototype.onFocus = function () {
            if (this.listensForFocus) {
                this.showTooltip();
            }
        };
        TooltipDirective.prototype.onBlur = function () {
            if (this.listensForFocus) {
                this.hideTooltip(true);
            }
        };
        TooltipDirective.prototype.onMouseEnter = function () {
            if (this.listensForHover) {
                this.showTooltip();
            }
        };
        TooltipDirective.prototype.onMouseLeave = function (target) {
            if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
                clearTimeout(this.timeout);
                if (this.component) {
                    var contentDom = this.component.instance.element.nativeElement;
                    var contains = contentDom.contains(target);
                    if (contains) {
                        return;
                    }
                }
                this.hideTooltip(this.tooltipImmediateExit);
            }
        };
        TooltipDirective.prototype.onMouseClick = function () {
            if (this.listensForHover) {
                this.hideTooltip(true);
            }
        };
        TooltipDirective.prototype.showTooltip = function (immediate) {
            var _this = this;
            if (this.component || this.tooltipDisabled) {
                return;
            }
            var time = immediate ? 0 : this.tooltipShowTimeout;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                _this.tooltipService.destroyAll();
                var options = _this.createBoundOptions();
                _this.component = _this.tooltipService.create(options);
                // add a tiny timeout to avoid event re-triggers
                setTimeout(function () {
                    if (_this.component) {
                        _this.addHideListeners(_this.component.instance.element.nativeElement);
                    }
                }, 10);
                _this.show.emit(true);
            }, time);
        };
        TooltipDirective.prototype.addHideListeners = function (tooltip) {
            var _this = this;
            // on mouse enter, cancel the hide triggered by the leave
            this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
                clearTimeout(_this.timeout);
            });
            // content mouse leave listener
            if (this.tooltipCloseOnMouseLeave) {
                this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                    _this.hideTooltip(_this.tooltipImmediateExit);
                });
            }
            // content close on click outside
            if (this.tooltipCloseOnClickOutside) {
                this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                    var contains = tooltip.contains(event.target);
                    if (!contains) {
                        _this.hideTooltip();
                    }
                });
            }
        };
        TooltipDirective.prototype.hideTooltip = function (immediate) {
            var _this = this;
            if (immediate === void 0) { immediate = false; }
            if (!this.component) {
                return;
            }
            var destroyFn = function () {
                // remove events
                if (_this.mouseLeaveContentEvent) {
                    _this.mouseLeaveContentEvent();
                }
                if (_this.mouseEnterContentEvent) {
                    _this.mouseEnterContentEvent();
                }
                if (_this.documentClickEvent) {
                    _this.documentClickEvent();
                }
                // emit events
                _this.hide.emit(true);
                // destroy component
                _this.tooltipService.destroy(_this.component);
                _this.component = undefined;
            };
            clearTimeout(this.timeout);
            if (!immediate) {
                this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
            }
            else {
                destroyFn();
            }
        };
        TooltipDirective.prototype.createBoundOptions = function () {
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipCssClass", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipSpacing", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipShowCaret", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipDirective.prototype, "tooltipPlacement", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipDirective.prototype, "tooltipAlignment", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipDirective.prototype, "tooltipType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TooltipDirective.prototype, "tooltipShowEvent", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipContext", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "show", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TooltipDirective.prototype, "hide", void 0);
        __decorate([
            core.HostListener('focusin'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TooltipDirective.prototype, "onFocus", null);
        __decorate([
            core.HostListener('blur'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TooltipDirective.prototype, "onBlur", null);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TooltipDirective.prototype, "onMouseEnter", null);
        __decorate([
            core.HostListener('mouseleave', ['$event.target']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TooltipDirective.prototype, "onMouseLeave", null);
        __decorate([
            core.HostListener('click'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TooltipDirective.prototype, "onMouseClick", null);
        TooltipDirective = __decorate([
            core.Directive({ selector: '[ngx-tooltip]' }),
            __metadata("design:paramtypes", [TooltipService,
                core.ViewContainerRef,
                core.Renderer2])
        ], TooltipDirective);
        return TooltipDirective;
    }());

    var TooltipModule = /** @class */ (function () {
        function TooltipModule() {
        }
        TooltipModule = __decorate([
            core.NgModule({
                declarations: [TooltipContentComponent, TooltipDirective],
                providers: [InjectionService, TooltipService],
                exports: [TooltipContentComponent, TooltipDirective],
                imports: [common.CommonModule],
                entryComponents: [TooltipContentComponent]
            })
        ], TooltipModule);
        return TooltipModule;
    }());

    var cache = {};
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
        var newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        // append a 'a' because neo gets mad
        newId = "a" + newId;
        // ensure not already used
        if (!cache[newId]) {
            cache[newId] = true;
            return newId;
        }
        return id();
    }

    var colorSets = [
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

    var ColorHelper = /** @class */ (function () {
        function ColorHelper(scheme, type, domain, customColors) {
            if (typeof (scheme) === 'string') {
                scheme = colorSets.find(function (cs) {
                    return cs.name === scheme;
                });
            }
            this.colorDomain = scheme.domain;
            this.scaleType = type;
            this.domain = domain;
            this.customColors = customColors;
            this.scale = this.generateColorScheme(scheme, type, this.domain);
        }
        ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
            if (typeof (scheme) === 'string') {
                scheme = colorSets.find(function (cs) {
                    return cs.name === scheme;
                });
            }
            var colorScale;
            if (type === 'quantile') {
                colorScale = d3Scale.scaleQuantile()
                    .range(scheme.domain)
                    .domain(domain);
            }
            else if (type === 'ordinal') {
                colorScale = d3Scale.scaleOrdinal()
                    .range(scheme.domain)
                    .domain(domain);
            }
            else if (type === 'linear') {
                // linear schemes must have at least 2 colors
                var colorDomain = __spread(scheme.domain);
                if (colorDomain.length === 1) {
                    colorDomain.push(colorDomain[0]);
                    this.colorDomain = colorDomain;
                }
                var points = d3Array.range(0, 1, 1.0 / colorDomain.length);
                colorScale = d3Scale.scaleLinear()
                    .domain(points)
                    .range(colorDomain);
            }
            return colorScale;
        };
        ColorHelper.prototype.getColor = function (value) {
            if (this.scaleType === 'linear') {
                var valueScale = d3Scale.scaleLinear()
                    .domain(this.domain)
                    .range([0, 1]);
                return (this.scale(valueScale(value)));
            }
            else {
                if (typeof this.customColors === 'function') {
                    return this.customColors(value);
                }
                var formattedValue_1 = value.toString();
                var found = void 0; // todo type customColors
                if (this.customColors && this.customColors.length > 0) {
                    found = this.customColors.find(function (mapping) {
                        return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                    });
                }
                if (found) {
                    return found.value;
                }
                else {
                    return this.scale(value);
                }
            }
        };
        ColorHelper.prototype.getLinearGradientStops = function (value, start) {
            var e_1, _a;
            if (start === undefined) {
                start = this.domain[0];
            }
            var valueScale = d3Scale.scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            var colorValueScale = d3Scale.scaleBand()
                .domain(this.colorDomain)
                .range([0, 1]);
            var endColor = this.getColor(value);
            // generate the stops
            var startVal = valueScale(start);
            var startColor = this.getColor(start);
            var endVal = valueScale(value);
            var i = 1;
            var currentVal = startVal;
            var stops = [];
            stops.push({
                color: startColor,
                offset: startVal,
                originalOffset: startVal,
                opacity: 1
            });
            while (currentVal < endVal && i < this.colorDomain.length) {
                var color = this.colorDomain[i];
                var offset = colorValueScale(color);
                if (offset <= startVal) {
                    i++;
                    continue;
                }
                if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                    break;
                }
                stops.push({
                    color: color,
                    offset: offset,
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
                    try {
                        for (var stops_1 = __values(stops), stops_1_1 = stops_1.next(); !stops_1_1.done; stops_1_1 = stops_1.next()) {
                            var s = stops_1_1.value;
                            s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (stops_1_1 && !stops_1_1.done && (_a = stops_1.return)) _a.call(stops_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            return stops;
        };
        return ColorHelper;
    }());

    var CircleSeriesComponent = /** @class */ (function () {
        function CircleSeriesComponent() {
            this.type = 'standard';
            this.tooltipDisabled = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.barVisible = false;
        }
        CircleSeriesComponent.prototype.ngOnInit = function () {
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
        };
        CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        CircleSeriesComponent.prototype.update = function () {
            this.circle = this.getActiveCircle();
        };
        CircleSeriesComponent.prototype.getActiveCircle = function () {
            var _this = this;
            var indexActiveDataPoint = this.data.series.findIndex(function (d) {
                var label = d.name;
                return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
            });
            if (indexActiveDataPoint === -1) {
                // No valid point is 'active/hovered over' at this moment.
                return undefined;
            }
            return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
        };
        CircleSeriesComponent.prototype.mapDataPointToCircle = function (d, i) {
            var seriesName = this.data.name;
            var value = d.value;
            var label = d.name;
            var tooltipLabel = formatLabel(label);
            var cx;
            if (this.scaleType === 'time') {
                cx = this.xScale(label);
            }
            else if (this.scaleType === 'linear') {
                cx = this.xScale(Number(label));
            }
            else {
                cx = this.xScale(label);
            }
            var cy = this.yScale(this.type === 'standard' ? value : d.d1);
            var radius = 5;
            var height = this.yScale.range()[0] - cy;
            var opacity = 1;
            var color;
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
            var data = {
                series: seriesName,
                value: value,
                name: label
            };
            return {
                classNames: ["circle-data-" + i],
                value: value,
                label: label,
                data: data,
                cx: cx,
                cy: cy,
                radius: radius,
                height: height,
                tooltipLabel: tooltipLabel,
                color: color,
                opacity: opacity,
                seriesName: seriesName,
                gradientStops: this.getGradientStops(color),
                min: d.min,
                max: d.max
            };
        };
        CircleSeriesComponent.prototype.getTooltipText = function (_a) {
            var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
            return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
        };
        CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
            if (min !== undefined || max !== undefined) {
                var result = ' (';
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
        };
        CircleSeriesComponent.prototype.getGradientStops = function (color) {
            return [
                {
                    offset: 0,
                    color: color,
                    opacity: 0.2
                },
                {
                    offset: 100,
                    color: color,
                    opacity: 1
                }
            ];
        };
        CircleSeriesComponent.prototype.onClick = function (value, label) {
            this.select.emit({
                name: label,
                value: value
            });
        };
        CircleSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries) {
                return false;
            }
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        CircleSeriesComponent.prototype.activateCircle = function () {
            this.barVisible = true;
            this.activate.emit({ name: this.data.name });
        };
        CircleSeriesComponent.prototype.deactivateCircle = function () {
            this.barVisible = false;
            this.circle.opacity = 0;
            this.deactivate.emit({ name: this.data.name });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "type", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", ColorHelper)
        ], CircleSeriesComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "scaleType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "visibleValue", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], CircleSeriesComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CircleSeriesComponent.prototype, "deactivate", void 0);
        CircleSeriesComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-circle-series]',
                template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g ng-svg-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ng-svg-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':enter', [
                            animations.style({
                                opacity: 0,
                            }),
                            animations.animate(250, animations.style({ opacity: 1 }))
                        ])
                    ])
                ]
            })
        ], CircleSeriesComponent);
        return CircleSeriesComponent;
    }());

    var CircleComponent = /** @class */ (function () {
        function CircleComponent() {
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
        }
        CircleComponent.prototype.onClick = function () {
            this.select.emit(this.data);
        };
        CircleComponent.prototype.onMouseEnter = function () {
            this.activate.emit(this.data);
        };
        CircleComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit(this.data);
        };
        CircleComponent.prototype.ngOnChanges = function (changes) {
            this.classNames = Array.isArray(this.classNames) ?
                this.classNames.join(' ') :
                '';
            this.classNames += 'circle';
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "cx", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "cy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "r", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "fill", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "stroke", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "classNames", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "circleOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "pointerEvents", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CircleComponent.prototype, "deactivate", void 0);
        __decorate([
            core.HostListener('click'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], CircleComponent.prototype, "onClick", null);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], CircleComponent.prototype, "onMouseEnter", null);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], CircleComponent.prototype, "onMouseLeave", null);
        CircleComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-circle]',
                template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], CircleComponent);
        return CircleComponent;
    }());

    var GridPanelComponent = /** @class */ (function () {
        function GridPanelComponent() {
        }
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelComponent.prototype, "path", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelComponent.prototype, "width", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelComponent.prototype, "height", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelComponent.prototype, "x", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelComponent.prototype, "y", void 0);
        GridPanelComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-grid-panel]',
                template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], GridPanelComponent);
        return GridPanelComponent;
    }());

    var GridPanelSeriesComponent = /** @class */ (function () {
        function GridPanelSeriesComponent() {
        }
        GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        GridPanelSeriesComponent.prototype.update = function () {
            this.gridPanels = this.getGridPanels();
        };
        GridPanelSeriesComponent.prototype.getGridPanels = function () {
            var _this = this;
            return this.data.map(function (d) {
                var offset;
                var width;
                var height;
                var x;
                var y;
                var className = 'odd';
                if (_this.orient === 'vertical') {
                    var position = _this.xScale(d.name);
                    var positionIndex = Number.parseInt((position / _this.xScale.step()).toString(), 10);
                    if (positionIndex % 2 === 1) {
                        className = 'even';
                    }
                    offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                    width = _this.xScale.bandwidth() + offset;
                    height = _this.dims.height;
                    x = _this.xScale(d.name) - offset / 2;
                    y = 0;
                }
                else if (_this.orient === 'horizontal') {
                    var position = _this.yScale(d.name);
                    var positionIndex = Number.parseInt((position / _this.yScale.step()).toString(), 10);
                    if (positionIndex % 2 === 1) {
                        className = 'even';
                    }
                    offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                    width = _this.dims.width;
                    height = _this.yScale.bandwidth() + offset;
                    x = 0;
                    y = _this.yScale(d.name) - offset / 2;
                }
                return {
                    name: d.name,
                    class: className,
                    height: height,
                    width: width,
                    x: x,
                    y: y
                };
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelSeriesComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelSeriesComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelSeriesComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelSeriesComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridPanelSeriesComponent.prototype, "orient", void 0);
        GridPanelSeriesComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-grid-panel-series]',
                template: "\n    <svg:g ng-svg-charts-grid-panel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\">\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], GridPanelSeriesComponent);
        return GridPanelSeriesComponent;
    }());

    var SvgLinearGradientComponent = /** @class */ (function () {
        function SvgLinearGradientComponent() {
            this.orientation = 'vertical';
        }
        SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SvgLinearGradientComponent.prototype, "orientation", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SvgLinearGradientComponent.prototype, "name", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], SvgLinearGradientComponent.prototype, "stops", void 0);
        SvgLinearGradientComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-svg-linear-gradient]',
                template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:linearGradient>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], SvgLinearGradientComponent);
        return SvgLinearGradientComponent;
    }());

    var SvgRadialGradientComponent = /** @class */ (function () {
        function SvgRadialGradientComponent() {
            this.endOpacity = 1;
            this.cx = 0;
            this.cy = 0;
        }
        Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
            get: function () {
                return this.stopsInput || this.stopsDefault;
            },
            set: function (value) {
                this.stopsInput = value;
            },
            enumerable: true,
            configurable: true
        });
        SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SvgRadialGradientComponent.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SvgRadialGradientComponent.prototype, "name", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SvgRadialGradientComponent.prototype, "cx", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SvgRadialGradientComponent.prototype, "cy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], SvgRadialGradientComponent.prototype, "stops", null);
        SvgRadialGradientComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-svg-radial-gradient]',
                template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], SvgRadialGradientComponent);
        return SvgRadialGradientComponent;
    }());

    var TimelineComponent = /** @class */ (function () {
        function TimelineComponent(element, cd) {
            this.cd = cd;
            this.height = 50;
            this.select = new core.EventEmitter();
            this.onDomainChange = new core.EventEmitter();
            this.initialized = false;
            this.element = element.nativeElement;
        }
        TimelineComponent.prototype.ngOnChanges = function (changes) {
            this.update();
            if (!this.initialized) {
                this.addBrush();
                this.initialized = true;
            }
        };
        TimelineComponent.prototype.update = function () {
            this.dims = this.getDims();
            this.height = this.dims.height;
            var offsetY = this.view[1] - this.height;
            this.xDomain = this.getXDomain();
            this.xScale = this.getXScale();
            if (this.brush) {
                this.updateBrush();
            }
            this.transform = "translate(0 , " + offsetY + ")";
            this.filterId = 'filter' + id().toString();
            this.filter = "url(#" + this.filterId + ")";
            this.cd.markForCheck();
        };
        TimelineComponent.prototype.getXDomain = function () {
            var e_1, _a, e_2, _b;
            var values = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = __values(results.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!values.includes(d.name)) {
                                values.push(d.name);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var domain = [];
            if (this.scaleType === 'time') {
                var min = Math.min.apply(Math, __spread(values));
                var max = Math.max.apply(Math, __spread(values));
                domain = [min, max];
            }
            else if (this.scaleType === 'linear') {
                values = values.map(function (v) { return Number(v); });
                var min = Math.min.apply(Math, __spread(values));
                var max = Math.max.apply(Math, __spread(values));
                domain = [min, max];
            }
            else {
                domain = values;
            }
            return domain;
        };
        TimelineComponent.prototype.getXScale = function () {
            var scale;
            if (this.scaleType === 'time') {
                scale = d3Scale.scaleTime()
                    .range([0, this.dims.width])
                    .domain(this.xDomain);
            }
            else if (this.scaleType === 'linear') {
                scale = d3Scale.scaleLinear()
                    .range([0, this.dims.width])
                    .domain(this.xDomain);
            }
            else if (this.scaleType === 'ordinal') {
                scale = d3Scale.scalePoint()
                    .range([0, this.dims.width])
                    .padding(0.1)
                    .domain(this.xDomain);
            }
            return scale;
        };
        TimelineComponent.prototype.addBrush = function () {
            var _this = this;
            if (this.brush) {
                return;
            }
            var height = this.height;
            var width = this.view[0];
            this.brush = d3Brush.brushX()
                .extent([[0, 0], [width, height]])
                .on('brush end', function () {
                var selection = d3Selection.event.selection || _this.xScale.range();
                var newDomain = selection.map(_this.xScale.invert);
                _this.onDomainChange.emit(newDomain);
                _this.cd.markForCheck();
            });
            d3Selection.select(this.element)
                .select('.brush')
                .call(this.brush);
        };
        TimelineComponent.prototype.updateBrush = function () {
            if (!this.brush) {
                return;
            }
            var height = this.height;
            var width = this.view[0];
            this.brush.extent([[0, 0], [width, height]]);
            d3Selection.select(this.element)
                .select('.brush')
                .call(this.brush);
            // clear hardcoded properties so they can be defined by CSS
            d3Selection.select(this.element).select('.selection')
                .attr('fill', undefined)
                .attr('stroke', undefined)
                .attr('fill-opacity', undefined);
            this.cd.markForCheck();
        };
        TimelineComponent.prototype.getDims = function () {
            var width = this.view[0];
            var dims = {
                width: width,
                height: this.height
            };
            return dims;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "view", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "state", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "results", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "scheme", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "customColors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "miniChart", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "autoScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "scaleType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "height", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TimelineComponent.prototype, "onDomainChange", void 0);
        TimelineComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-timeline]',
                template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\"\n        [attr.width]=\"view[0]\"\n        y=\"0\"\n        [attr.height]=\"height\"\n        class=\"brush-background\"\n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.ChangeDetectorRef])
        ], TimelineComponent);
        return TimelineComponent;
    }());

    var AreaComponent = /** @class */ (function () {
        function AreaComponent(element) {
            this.opacity = 1;
            this.startOpacity = 0.5;
            this.endOpacity = 1;
            this.gradient = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.initialized = false;
            this.hasGradient = false;
            this.element = element.nativeElement;
        }
        AreaComponent.prototype.ngOnChanges = function (changes) {
            if (!this.initialized) {
                this.loadAnimation();
                this.initialized = true;
            }
            else {
                this.update();
            }
        };
        AreaComponent.prototype.update = function () {
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
            if (this.gradient || this.stops) {
                this.gradientStops = this.getGradient();
                this.hasGradient = true;
            }
            else {
                this.hasGradient = false;
            }
            this.updatePathEl();
        };
        AreaComponent.prototype.loadAnimation = function () {
            this.areaPath = this.startingPath;
            setTimeout(this.update.bind(this), 100);
        };
        AreaComponent.prototype.updatePathEl = function () {
            var node = d3Selection.select(this.element).select('.area');
            if (this.animations) {
                node.transition().duration(750)
                    .attr('d', this.path);
            }
            else {
                node.attr('d', this.path);
            }
        };
        AreaComponent.prototype.getGradient = function () {
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "path", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "startingPath", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "fill", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "opacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "startOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "endOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "activeLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaComponent.prototype, "stops", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AreaComponent.prototype, "select", void 0);
        AreaComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-area]',
                template: 'area.template.html',
                changeDetection: core.ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], AreaComponent);
        return AreaComponent;
    }());

    // If we don't check whether 'window' and 'global' variables are defined,
    // code will fail in browser/node with 'variable is undefined' error.
    var root;
    if (typeof window !== 'undefined') {
        root = window;
    }
    else if (typeof global !== 'undefined') {
        root = global;
    }
    // tslint:disable-next-line:variable-name
    var MouseEvent = root.MouseEvent;

    var TooltipAreaComponent = /** @class */ (function () {
        function TooltipAreaComponent() {
            this.anchorOpacity = 0;
            this.anchorPos = -1;
            this.anchorValues = [];
            this.showPercentage = false;
            this.tooltipDisabled = false;
            this.hover = new core.EventEmitter();
        }
        TooltipAreaComponent.prototype.getValues = function (xVal) {
            var e_1, _a;
            var results = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
                    var groupName = group.name;
                    if (groupName instanceof Date) {
                        groupName = groupName.toLocaleDateString();
                    }
                    if (item) {
                        var label = item.name;
                        var val = item.value;
                        if (this.showPercentage) {
                            val = (item.d1 - item.d0).toFixed(2) + '%';
                        }
                        var color = void 0;
                        if (this.colors.scaleType === 'linear') {
                            var v = val;
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
                            color: color
                        });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return results;
        };
        TooltipAreaComponent.prototype.mouseMove = function (event) {
            var xPos = event.pageX - event.target.getBoundingClientRect().left;
            var closestIndex = this.findClosestPointIndex(xPos);
            var closestPoint = this.xSet[closestIndex];
            this.anchorPos = this.xScale(closestPoint);
            this.anchorPos = Math.max(0, this.anchorPos);
            this.anchorPos = Math.min(this.dims.width, this.anchorPos);
            this.anchorValues = this.getValues(closestPoint);
            if (this.anchorPos !== this.lastAnchorPos) {
                var ev = new MouseEvent('mouseleave', { bubbles: false });
                this.tooltipAnchor.nativeElement.dispatchEvent(ev);
                this.anchorOpacity = 0.7;
                this.hover.emit({
                    value: closestPoint
                });
                this.showTooltip();
                this.lastAnchorPos = this.anchorPos;
            }
        };
        TooltipAreaComponent.prototype.findClosestPointIndex = function (xPos) {
            var minIndex = 0;
            var maxIndex = this.xSet.length - 1;
            var minDiff = Number.MAX_VALUE;
            var closestIndex = 0;
            while (minIndex <= maxIndex) {
                // tslint:disable-next-line: no-bitwise
                var currentIndex = (minIndex + maxIndex) / 2 | 0;
                var currentElement = this.xScale(this.xSet[currentIndex]);
                var curDiff = Math.abs(currentElement - xPos);
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
        };
        TooltipAreaComponent.prototype.showTooltip = function () {
            var event = new MouseEvent('mouseenter', { bubbles: false });
            this.tooltipAnchor.nativeElement.dispatchEvent(event);
        };
        TooltipAreaComponent.prototype.hideTooltip = function () {
            var event = new MouseEvent('mouseleave', { bubbles: false });
            this.tooltipAnchor.nativeElement.dispatchEvent(event);
            this.anchorOpacity = 0;
            this.lastAnchorPos = -1;
        };
        TooltipAreaComponent.prototype.getToolTipText = function (tooltipItem) {
            var result = '';
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
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "xSet", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "results", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "showPercentage", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], TooltipAreaComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "hover", void 0);
        __decorate([
            core.ViewChild('tooltipAnchor'),
            __metadata("design:type", Object)
        ], TooltipAreaComponent.prototype, "tooltipAnchor", void 0);
        TooltipAreaComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-tooltip-area]',
                template: "<svg:g>\n  <svg:rect\n    class=\"tooltip-area\"\n    [attr.x]=\"0\"\n    y=\"0\"\n    [attr.width]=\"dims.width\"\n    [attr.height]=\"dims.height\"\n    style=\"opacity: 0; cursor: 'auto';\"\n    (mousemove)=\"mouseMove($event)\"\n    (mouseleave)=\"hideTooltip()\"\n  />\n  <xhtml:ng-template #defaultTooltipTemplate let-model=\"model\">\n    <xhtml:div class=\"area-tooltip-container\">\n      <xhtml:div\n        *ngFor=\"let tooltipItem of model\"\n        class=\"tooltip-item\">\n        <span\n          class=\"tooltip-item-color\"\n          [style.background-color]=\"tooltipItem.color\">\n        </span>\n        {{getToolTipText(tooltipItem)}}\n      </xhtml:div>\n    </xhtml:div>\n  </xhtml:ng-template>\n  <svg:rect\n    #tooltipAnchor\n    [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n    class=\"tooltip-anchor\"\n    [attr.x]=\"anchorPos\"\n    y=\"0\"\n    [attr.width]=\"1\"\n    [attr.height]=\"dims.height\"\n    [style.opacity]=\"anchorOpacity\"\n    [style.pointer-events]=\"'none'\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'right'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipSpacing]=\"15\"\n    [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate: defaultTooltipTemplate\"\n    [tooltipContext]=\"anchorValues\"\n    [tooltipImmediateExit]=\"true\"\n  />\n</svg:g>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition('inactive => active', [
                            animations.style({
                                opacity: 0,
                            }),
                            animations.animate(250, animations.style({ opacity: 0.7 }))
                        ]),
                        animations.transition('active => inactive', [
                            animations.style({
                                opacity: 0.7,
                            }),
                            animations.animate(250, animations.style({ opacity: 0 }))
                        ])
                    ])
                ]
            })
        ], TooltipAreaComponent);
        return TooltipAreaComponent;
    }());

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
        var startVal = Number(countFrom);
        var endVal = Number(countTo);
        var countDown = startVal > endVal;
        var decimals = Math.max(0, countDecimals);
        var dec = Math.pow(10, decimals);
        var duration = Number(countDuration) * 1000;
        var startTime;
        function runCount(timestamp) {
            var frameVal;
            var progress = timestamp - startTime;
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
            var tick = progress < duration;
            callback({
                value: frameVal,
                progress: progress,
                timestamp: timestamp,
                finished: !tick
            });
            if (tick) {
                return requestAnimationFrame(function (val) { return runCount(val); });
            }
        }
        return requestAnimationFrame(function (timestamp) {
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
        var endVal = Number(countTo);
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
    var CountUpDirective = /** @class */ (function () {
        function CountUpDirective(cd, element) {
            this.cd = cd;
            this.countDuration = 1;
            this.countPrefix = '';
            this.countSuffix = '';
            this.countChange = new core.EventEmitter();
            this.countFinish = new core.EventEmitter();
            this.value = '';
            this._countDecimals = 0;
            this._countTo = 0;
            this._countFrom = 0;
            this.nativeElement = element.nativeElement;
        }
        Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
            get: function () {
                if (this._countDecimals)
                    return this._countDecimals;
                return decimalChecker(this.countTo);
            },
            set: function (val) {
                this._countDecimals = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CountUpDirective.prototype, "countTo", {
            get: function () {
                return this._countTo;
            },
            set: function (val) {
                this._countTo = parseFloat(val);
                this.start();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CountUpDirective.prototype, "countFrom", {
            get: function () {
                return this._countFrom;
            },
            set: function (val) {
                this._countFrom = parseFloat(val);
                this.start();
            },
            enumerable: true,
            configurable: true
        });
        CountUpDirective.prototype.ngOnDestroy = function () {
            cancelAnimationFrame(this.animationReq);
        };
        CountUpDirective.prototype.start = function () {
            var _this = this;
            cancelAnimationFrame(this.animationReq);
            var valueFormatting = this.valueFormatting || (function (value) { return "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix; });
            var callback = function (_a) {
                var value = _a.value, progress = _a.progress, finished = _a.finished;
                _this.value = valueFormatting(value);
                _this.cd.markForCheck();
                if (!finished)
                    _this.countChange.emit({ value: _this.value, progress: progress });
                if (finished)
                    _this.countFinish.emit({ value: _this.value, progress: progress });
            };
            this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CountUpDirective.prototype, "countDuration", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CountUpDirective.prototype, "countPrefix", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CountUpDirective.prototype, "countSuffix", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CountUpDirective.prototype, "valueFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], CountUpDirective.prototype, "countDecimals", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], CountUpDirective.prototype, "countTo", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], CountUpDirective.prototype, "countFrom", null);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CountUpDirective.prototype, "countChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], CountUpDirective.prototype, "countFinish", void 0);
        CountUpDirective = __decorate([
            core.Component({
                selector: '[ng-svg-charts-count-up]',
                template: "{{value}}"
            }),
            __metadata("design:paramtypes", [core.ChangeDetectorRef, core.ElementRef])
        ], CountUpDirective);
        return CountUpDirective;
    }());

    var COMPONENTS = [
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
    var ChartCommonModule = /** @class */ (function () {
        function ChartCommonModule() {
        }
        ChartCommonModule = __decorate([
            core.NgModule({
                providers: [
                    common.Location,
                    {
                        provide: common.LocationStrategy,
                        useClass: common.PathLocationStrategy
                    }
                ],
                imports: [
                    common.CommonModule,
                    AxesModule,
                    TooltipModule
                ],
                declarations: __spread(COMPONENTS),
                exports: __spread([
                    common.CommonModule,
                    AxesModule,
                    TooltipModule
                ], COMPONENTS)
            })
        ], ChartCommonModule);
        return ChartCommonModule;
    }());

    function calculateViewDimensions(_a) {
        var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.legendPosition, legendPosition = _k === void 0 ? 'right' : _k, _l = _a.columns, columns = _l === void 0 ? 12 : _l;
        var xOffset = margins[3];
        var chartWidth = width;
        var chartHeight = height - margins[0] - margins[2];
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
                var offset = 25 + 5;
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
                var offset = 25 + 5;
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
        var e_1, _a, e_2, _b;
        var valueSet = new Set();
        try {
            for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                var result = results_1_1.value;
                try {
                    for (var _c = __values(result.series), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var d = _d.value;
                        valueSet.add(d.name);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Array.from(valueSet);
    }
    /**
     * Get the scaleType of enumerable of values.
     * @param values
     * @returns {string} 'time', 'linear' or 'ordinal'
     */
    function getScaleType(values, checkDateType) {
        if (checkDateType === void 0) { checkDateType = true; }
        if (checkDateType) {
            var allDates = values.every(function (value) { return value instanceof Date; });
            if (allDates) {
                return 'time';
            }
        }
        var allNumbers = values.every(function (value) { return typeof value === 'number'; });
        if (allNumbers) {
            return 'linear';
        }
        return 'ordinal';
    }

    var AreaChartComponent = /** @class */ (function (_super) {
        __extends(AreaChartComponent, _super);
        function AreaChartComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.baseValue = 'auto';
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            return _this;
        }
        AreaChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        AreaChartComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        AreaChartComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === 'linear') {
                values = values.map(function (v) { return Number(v); });
            }
            var min;
            var max;
            if (this.scaleType === 'time' || this.scaleType === 'linear') {
                min = this.xScaleMin
                    ? this.xScaleMin
                    : Math.min.apply(Math, __spread(values));
                max = this.xScaleMax
                    ? this.xScaleMax
                    : Math.max.apply(Math, __spread(values));
            }
            if (this.scaleType === 'time') {
                domain = [new Date(min), new Date(max)];
                this.xSet = __spread(values).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
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
                this.xSet = __spread(values).sort(function (a, b) { return (a - b); });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        AreaChartComponent.prototype.getYDomain = function () {
            var e_1, _a, e_2, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = __values(results.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var values = __spread(domain);
            if (!this.autoScale) {
                values.push(0);
            }
            if (this.baseValue !== 'auto') {
                values.push(this.baseValue);
            }
            var min = this.yScaleMin
                ? this.yScaleMin
                : Math.min.apply(Math, __spread(values));
            var max = this.yScaleMax
                ? this.yScaleMax
                : Math.max.apply(Math, __spread(values));
            return [min, max];
        };
        AreaChartComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AreaChartComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === 'time') {
                scale = d3Scale.scaleTime();
            }
            else if (this.scaleType === 'linear') {
                scale = d3Scale.scaleLinear();
            }
            else if (this.scaleType === 'ordinal') {
                scale = d3Scale.scalePoint()
                    .padding(0.1);
            }
            scale.range([0, width])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear()
                .range([height, 0])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartComponent.prototype.getScaleType = function (values) {
            var e_3, _a;
            var date = true;
            var num = true;
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    if (!this.isDate(value)) {
                        date = false;
                    }
                    if (typeof value !== 'number') {
                        num = false;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (date) {
                return 'time';
            }
            if (num) {
                return 'linear';
            }
            return 'ordinal';
        };
        AreaChartComponent.prototype.isDate = function (value) {
            if (value instanceof Date) {
                return true;
            }
            return false;
        };
        AreaChartComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        AreaChartComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        AreaChartComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        AreaChartComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        AreaChartComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        AreaChartComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        AreaChartComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        AreaChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        AreaChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        AreaChartComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartComponent.prototype.deactivateAll = function () {
            var e_4, _a;
            this.activeEntries = __spread(this.activeEntries);
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this.activeEntries = [];
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "state", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "baseValue", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "autoScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "timeline", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AreaChartComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "curve", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AreaChartComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "xScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartComponent.prototype, "xScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AreaChartComponent.prototype, "yScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AreaChartComponent.prototype, "yScaleMax", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AreaChartComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AreaChartComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AreaChartComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.ContentChild('seriesTooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AreaChartComponent.prototype, "seriesTooltipTemplate", void 0);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], AreaChartComponent.prototype, "hideCircles", null);
        AreaChartComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-area-chart',
                template: 'area-chart.template.html',
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], AreaChartComponent);
        return AreaChartComponent;
    }(BaseChartComponent));

    var AreaChartNormalizedComponent = /** @class */ (function (_super) {
        __extends(AreaChartNormalizedComponent, _super);
        function AreaChartNormalizedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            return _this;
        }
        AreaChartNormalizedComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
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
            var _loop_1 = function (i) {
                var e_1, _a, e_2, _b;
                var val = this_1.xSet[i];
                var d0 = 0;
                var total = 0;
                try {
                    for (var _c = __values(this_1.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var group = _d.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === 'time') {
                                a = a.valueOf();
                                b = b.valueOf();
                            }
                            return a === b;
                        });
                        if (d) {
                            total += d.value;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _e = __values(this_1.results), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var group = _f.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === 'time') {
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
                                d0: d0,
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
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            };
            var this_1 = this;
            // tslint:disable-next-line: prefer-for-of
            for (var i = 0; i < this.xSet.length; i++) {
                _loop_1(i);
            }
            this.updateTimeline();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        AreaChartNormalizedComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        AreaChartNormalizedComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === 'time') {
                var min = Math.min.apply(Math, __spread(values));
                var max = Math.max.apply(Math, __spread(values));
                domain = [new Date(min), new Date(max)];
                this.xSet = __spread(values).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
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
                values = values.map(function (v) { return Number(v); });
                var min = Math.min.apply(Math, __spread(values));
                var max = Math.max.apply(Math, __spread(values));
                domain = [min, max];
                // Use compare function to sort numbers numerically
                this.xSet = __spread(values).sort(function (a, b) { return (a - b); });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        AreaChartNormalizedComponent.prototype.getYDomain = function () {
            return [0, 100];
        };
        AreaChartNormalizedComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AreaChartNormalizedComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === 'time') {
                scale = d3Scale.scaleTime();
            }
            else if (this.scaleType === 'linear') {
                scale = d3Scale.scaleLinear();
            }
            else if (this.scaleType === 'ordinal') {
                scale = d3Scale.scalePoint()
                    .padding(0.1);
            }
            scale
                .range([0, width])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartNormalizedComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear()
                .range([height, 0])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartNormalizedComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        AreaChartNormalizedComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        AreaChartNormalizedComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        AreaChartNormalizedComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        AreaChartNormalizedComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        AreaChartNormalizedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        AreaChartNormalizedComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        AreaChartNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        AreaChartNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        AreaChartNormalizedComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartNormalizedComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartNormalizedComponent.prototype.deactivateAll = function () {
            var e_3, _a;
            this.activeEntries = __spread(this.activeEntries);
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.activeEntries = [];
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "timeline", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "curve", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartNormalizedComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AreaChartNormalizedComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartNormalizedComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartNormalizedComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartNormalizedComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AreaChartNormalizedComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AreaChartNormalizedComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AreaChartNormalizedComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.ContentChild('seriesTooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AreaChartNormalizedComponent.prototype, "seriesTooltipTemplate", void 0);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], AreaChartNormalizedComponent.prototype, "hideCircles", null);
        AreaChartNormalizedComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-area-chart-normalized',
                template: "<ng-svg-charts-chart\n[view]=\"[width, height]\"\n[showLegend]=\"legend\"\n[legendOptions]=\"legendOptions\"\n[activeEntries]=\"activeEntries\"\n[animations]=\"animations\"\n(legendLabelClick)=\"onClick($event)\"\n(legendLabelActivate)=\"onActivate($event)\"\n(legendLabelDeactivate)=\"onDeactivate($event)\">\n<svg:defs>\n  <svg:clipPath [attr.id]=\"clipPathId\">\n    <svg:rect\n      [attr.width]=\"dims.width + 10\"\n      [attr.height]=\"dims.height + 10\"\n      [attr.transform]=\"'translate(-5, -5)'\"/>\n  </svg:clipPath>\n</svg:defs>\n<svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n  <svg:g ng-svg-charts-x-axis\n    *ngIf=\"xAxis\"\n    [xScale]=\"xScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showXAxisLabel\"\n    [labelText]=\"xAxisLabel\"\n    [trimTicks]=\"trimXAxisTicks\"\n    [maxTickLength]=\"maxXAxisTickLength\"\n    [tickFormatting]=\"xAxisTickFormatting\"\n    [ticks]=\"xAxisTicks\"\n    (dimensionsChanged)=\"updateXAxisHeight($event)\">\n  </svg:g>\n  <svg:g ng-svg-charts-y-axis\n    *ngIf=\"yAxis\"\n    [yScale]=\"yScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showYAxisLabel\"\n    [labelText]=\"yAxisLabel\"\n    [trimTicks]=\"trimYAxisTicks\"\n    [maxTickLength]=\"maxYAxisTickLength\"\n    [tickFormatting]=\"yAxisTickFormatting\"\n    [ticks]=\"yAxisTicks\"\n    (dimensionsChanged)=\"updateYAxisWidth($event)\">\n  </svg:g>\n  <svg:g [attr.clip-path]=\"clipPath\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-area-series\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [activeEntries]=\"activeEntries\"\n        [gradient]=\"gradient\"\n        normalized=\"true\"\n        [curve]=\"curve\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n\n    <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n      <svg:g ng-svg-charts-tooltip-area\n        [dims]=\"dims\"\n        [xSet]=\"xSet\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [results]=\"results\"\n        [colors]=\"colors\"\n        [showPercentage]=\"true\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"seriesTooltipTemplate\"\n        (hover)=\"updateHoveredVertical($event)\"\n      />\n\n      <svg:g *ngFor=\"let series of results\">\n        <svg:g ng-svg-charts-circle-series\n          type=\"stacked\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [activeEntries]=\"activeEntries\"\n          [data]=\"series\"\n          [scaleType]=\"scaleType\"\n          [visibleValue]=\"hoveredVertical\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          (select)=\"onClick($event, series)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </svg:g>\n  </svg:g>\n</svg:g>\n<svg:g ng-svg-charts-timeline\n  *ngIf=\"timeline && scaleType != 'ordinal'\"\n  [attr.transform]=\"timelineTransform\"\n  [results]=\"results\"\n  [view]=\"[timelineWidth, height]\"\n  [height]=\"timelineHeight\"\n  [scheme]=\"scheme\"\n  [customColors]=\"customColors\"\n  [legend]=\"legend\"\n  [scaleType]=\"scaleType\"\n  (onDomainChange)=\"updateDomain($event)\">\n  <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n    <svg:g ng-svg-charts-area-series\n      [xScale]=\"timelineXScale\"\n      [yScale]=\"timelineYScale\"\n      [colors]=\"colors\"\n      [data]=\"series\"\n      [scaleType]=\"scaleType\"\n      [gradient]=\"gradient\"\n      normalized=\"true\"\n      [curve]=\"curve\"\n      [animations]=\"animations\"\n    />\n  </svg:g>\n</svg:g>\n</ng-svg-charts-chart>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], AreaChartNormalizedComponent);
        return AreaChartNormalizedComponent;
    }(BaseChartComponent));

    var AreaChartStackedComponent = /** @class */ (function (_super) {
        __extends(AreaChartStackedComponent, _super);
        function AreaChartStackedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            return _this;
        }
        AreaChartStackedComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
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
            var _loop_1 = function (i) {
                var e_1, _a;
                var val = this_1.xSet[i];
                var d0 = 0;
                try {
                    for (var _b = __values(this_1.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var group = _c.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === 'time') {
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
                                d0: d0,
                                d1: d0
                            };
                            group.series.push(d);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
            var this_1 = this;
            // tslint:disable-next-line: prefer-for-of
            for (var i = 0; i < this.xSet.length; i++) {
                _loop_1(i);
            }
            this.updateTimeline();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        AreaChartStackedComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        AreaChartStackedComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === 'linear') {
                values = values.map(function (v) { return Number(v); });
            }
            var min;
            var max;
            if (this.scaleType === 'time' || this.scaleType === 'linear') {
                min = this.xScaleMin
                    ? this.xScaleMin
                    : Math.min.apply(Math, __spread(values));
                max = this.xScaleMax
                    ? this.xScaleMax
                    : Math.max.apply(Math, __spread(values));
            }
            if (this.scaleType === 'time') {
                domain = [new Date(min), new Date(max)];
                this.xSet = __spread(values).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
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
                this.xSet = __spread(values).sort(function (a, b) { return (a - b); });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        AreaChartStackedComponent.prototype.getYDomain = function () {
            var _this = this;
            var domain = [];
            var _loop_2 = function (i) {
                var e_2, _a;
                var val = this_2.xSet[i];
                var sum = 0;
                try {
                    for (var _b = __values(this_2.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var group = _c.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === 'time') {
                                a = a.valueOf();
                                b = b.valueOf();
                            }
                            return a === b;
                        });
                        if (d) {
                            sum += d.value;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                domain.push(sum);
            };
            var this_2 = this;
            // tslint:disable-next-line: prefer-for-of
            for (var i = 0; i < this.xSet.length; i++) {
                _loop_2(i);
            }
            var min = this.yScaleMin
                ? this.yScaleMin
                : Math.min.apply(Math, __spread([0], domain));
            var max = this.yScaleMax
                ? this.yScaleMax
                : Math.max.apply(Math, __spread(domain));
            return [min, max];
        };
        AreaChartStackedComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AreaChartStackedComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === 'time') {
                scale = d3Scale.scaleTime();
            }
            else if (this.scaleType === 'linear') {
                scale = d3Scale.scaleLinear();
            }
            else if (this.scaleType === 'ordinal') {
                scale = d3Scale.scalePoint()
                    .padding(0.1);
            }
            scale
                .range([0, width])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartStackedComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear()
                .range([height, 0])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartStackedComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        AreaChartStackedComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        AreaChartStackedComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        AreaChartStackedComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        AreaChartStackedComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        AreaChartStackedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        AreaChartStackedComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        AreaChartStackedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        AreaChartStackedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        AreaChartStackedComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartStackedComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartStackedComponent.prototype.deactivateAll = function () {
            var e_3, _a;
            this.activeEntries = __spread(this.activeEntries);
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.activeEntries = [];
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "timeline", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "curve", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartStackedComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AreaChartStackedComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartStackedComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaChartStackedComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "xScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaChartStackedComponent.prototype, "xScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AreaChartStackedComponent.prototype, "yScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AreaChartStackedComponent.prototype, "yScaleMax", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AreaChartStackedComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AreaChartStackedComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AreaChartStackedComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.ContentChild('seriesTooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AreaChartStackedComponent.prototype, "seriesTooltipTemplate", void 0);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], AreaChartStackedComponent.prototype, "hideCircles", null);
        AreaChartStackedComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-area-chart-stacked',
                template: "<ng-svg-charts-chart\n[view]=\"[width, height]\"\n[showLegend]=\"legend\"\n[legendOptions]=\"legendOptions\"\n[activeEntries]=\"activeEntries\"\n[animations]=\"animations\"\n(legendLabelClick)=\"onClick($event)\"\n(legendLabelActivate)=\"onActivate($event)\"\n(legendLabelDeactivate)=\"onDeactivate($event)\">\n<svg:defs>\n  <svg:clipPath [attr.id]=\"clipPathId\">\n    <svg:rect\n      [attr.width]=\"dims.width + 10\"\n      [attr.height]=\"dims.height + 10\"\n      [attr.transform]=\"'translate(-5, -5)'\"/>\n  </svg:clipPath>\n</svg:defs>\n<svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n  <svg:g ng-svg-charts-x-axis\n    *ngIf=\"xAxis\"\n    [xScale]=\"xScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showXAxisLabel\"\n    [labelText]=\"xAxisLabel\"\n    [trimTicks]=\"trimXAxisTicks\"\n    [maxTickLength]=\"maxXAxisTickLength\"\n    [tickFormatting]=\"xAxisTickFormatting\"\n    [ticks]=\"xAxisTicks\"\n    (dimensionsChanged)=\"updateXAxisHeight($event)\">\n  </svg:g>\n  <svg:g ng-svg-charts-y-axis\n    *ngIf=\"yAxis\"\n    [yScale]=\"yScale\"\n    [dims]=\"dims\"\n    [showGridLines]=\"showGridLines\"\n    [showLabel]=\"showYAxisLabel\"\n    [labelText]=\"yAxisLabel\"\n    [trimTicks]=\"trimYAxisTicks\"\n    [maxTickLength]=\"maxYAxisTickLength\"\n    [tickFormatting]=\"yAxisTickFormatting\"\n    [ticks]=\"yAxisTicks\"\n    (dimensionsChanged)=\"updateYAxisWidth($event)\">\n  </svg:g>\n  <svg:g [attr.clip-path]=\"clipPath\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-area-series\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [gradient]=\"gradient\"\n        [activeEntries]=\"activeEntries\"\n        stacked=\"true\"\n        [curve]=\"curve\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n\n    <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n      <svg:g ng-svg-charts-tooltip-area\n        [dims]=\"dims\"\n        [xSet]=\"xSet\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [results]=\"results\"\n        [colors]=\"colors\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"seriesTooltipTemplate\"\n        (hover)=\"updateHoveredVertical($event)\"\n      />\n\n      <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n        <svg:g ng-svg-charts-circle-series\n          type=\"stacked\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [activeEntries]=\"activeEntries\"\n          [data]=\"series\"\n          [scaleType]=\"scaleType\"\n          [visibleValue]=\"hoveredVertical\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          (select)=\"onClick($event, series)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </svg:g>\n  </svg:g>\n</svg:g>\n<svg:g ng-svg-charts-timeline\n  *ngIf=\"timeline && scaleType != 'ordinal'\"\n  [attr.transform]=\"timelineTransform\"\n  [results]=\"results\"\n  [view]=\"[timelineWidth, height]\"\n  [height]=\"timelineHeight\"\n  [scheme]=\"scheme\"\n  [customColors]=\"customColors\"\n  [legend]=\"legend\"\n  [scaleType]=\"scaleType\"\n  (onDomainChange)=\"updateDomain($event)\">\n  <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n    <svg:g ng-svg-charts-area-series\n      [xScale]=\"timelineXScale\"\n      [yScale]=\"timelineYScale\"\n      [colors]=\"colors\"\n      [data]=\"series\"\n      [scaleType]=\"scaleType\"\n      [gradient]=\"gradient\"\n      stacked=\"true\"\n      [curve]=\"curve\"\n      [animations]=\"animations\"\n    />\n  </svg:g>\n</svg:g>\n</ng-svg-charts-chart>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], AreaChartStackedComponent);
        return AreaChartStackedComponent;
    }(BaseChartComponent));

    function sortLinear(data, property, direction) {
        if (direction === void 0) { direction = 'asc'; }
        return data.sort(function (a, b) {
            if (direction === 'asc') {
                return a[property] - b[property];
            }
            else {
                return b[property] - a[property];
            }
        });
    }
    function sortByDomain(data, property, direction, domain) {
        if (direction === void 0) { direction = 'asc'; }
        return data.sort(function (a, b) {
            var aVal = a[property];
            var bVal = b[property];
            var aIdx = domain.indexOf(aVal);
            var bIdx = domain.indexOf(bVal);
            if (direction === 'asc') {
                return aIdx - bIdx;
            }
            else {
                return bIdx - aIdx;
            }
        });
    }
    function sortByTime(data, property, direction) {
        if (direction === void 0) { direction = 'asc'; }
        return data.sort(function (a, b) {
            var aDate = a[property].getTime();
            var bDate = b[property].getTime();
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

    var AreaSeriesComponent = /** @class */ (function () {
        function AreaSeriesComponent() {
            this.baseValue = 'auto';
            this.stacked = false;
            this.normalized = false;
            this.animations = true;
            this.select = new core.EventEmitter();
        }
        AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        AreaSeriesComponent.prototype.update = function () {
            var _this = this;
            this.updateGradient();
            var currentArea;
            var startingArea;
            var xProperty = function (d) {
                var label = d.name;
                return _this.xScale(label);
            };
            if (this.stacked || this.normalized) {
                currentArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function (d, i) { return _this.yScale(d.d0); })
                    .y1(function (d, i) { return _this.yScale(d.d1); });
                startingArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function (d) { return _this.yScale.range()[0]; })
                    .y1(function (d) { return _this.yScale.range()[0]; });
            }
            else {
                currentArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function () { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); })
                    .y1(function (d) { return _this.yScale(d.value); });
                startingArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function (d) { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); })
                    .y1(function (d) { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); });
            }
            currentArea.curve(this.curve);
            startingArea.curve(this.curve);
            this.opacity = .8;
            var data = this.data.series;
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
        };
        AreaSeriesComponent.prototype.updateGradient = function () {
            if (this.colors.scaleType === 'linear') {
                this.hasGradient = true;
                if (this.stacked || this.normalized) {
                    var d0values = this.data.series.map(function (d) { return d.d0; });
                    var d1values = this.data.series.map(function (d) { return d.d1; });
                    var max = Math.max.apply(Math, __spread(d1values));
                    var min = Math.min.apply(Math, __spread(d0values));
                    this.gradientStops = this.colors.getLinearGradientStops(max, min);
                }
                else {
                    var values = this.data.series.map(function (d) { return d.value; });
                    var max = Math.max.apply(Math, __spread(values));
                    this.gradientStops = this.colors.getLinearGradientStops(max);
                }
            }
            else {
                this.hasGradient = false;
                this.gradientStops = undefined;
            }
        };
        AreaSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries) {
                return false;
            }
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        AreaSeriesComponent.prototype.isInactive = function (entry) {
            if (!this.activeEntries || this.activeEntries.length === 0) {
                return false;
            }
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item === undefined;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "baseValue", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "scaleType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "stacked", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "normalized", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "curve", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AreaSeriesComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AreaSeriesComponent.prototype, "select", void 0);
        AreaSeriesComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-area-series]',
                template: 'area-series.template.html',
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], AreaSeriesComponent);
        return AreaSeriesComponent;
    }());

    var AreaChartModule = /** @class */ (function () {
        function AreaChartModule() {
        }
        AreaChartModule = __decorate([
            core.NgModule({
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
        return AreaChartModule;
    }());

    var BarComponent = /** @class */ (function () {
        function BarComponent(element) {
            this.roundEdges = true;
            this.gradient = false;
            this.offset = 0;
            this.isActive = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.initialized = false;
            this.hasGradient = false;
            this.element = element.nativeElement;
        }
        BarComponent.prototype.ngOnChanges = function (changes) {
            if (!this.initialized) {
                this.loadAnimation();
                this.initialized = true;
            }
            else {
                this.update();
            }
        };
        BarComponent.prototype.update = function () {
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
            if (this.gradient || this.stops) {
                this.gradientStops = this.getGradient();
                this.hasGradient = true;
            }
            else {
                this.hasGradient = false;
            }
            this.updatePathEl();
        };
        BarComponent.prototype.loadAnimation = function () {
            this.path = this.getStartingPath();
            setTimeout(this.update.bind(this), 100);
        };
        BarComponent.prototype.updatePathEl = function () {
            var node = d3Selection.select(this.element).select('.bar');
            var path = this.getPath();
            if (this.animations) {
                node.transition().duration(500)
                    .attr('d', path);
            }
            else {
                node.attr('d', path);
            }
        };
        BarComponent.prototype.getGradient = function () {
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
        };
        BarComponent.prototype.getStartingPath = function () {
            if (!this.animations) {
                return this.getPath();
            }
            var radius = this.getRadius();
            var path;
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
        };
        BarComponent.prototype.getPath = function () {
            var radius = this.getRadius();
            var path;
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
        };
        BarComponent.prototype.getRadius = function () {
            var radius = 0;
            if (this.roundEdges && this.height > 5 && this.width > 5) {
                radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
            }
            return radius;
        };
        BarComponent.prototype.getStartOpacity = function () {
            if (this.roundEdges) {
                return 0.2;
            }
            else {
                return 0.5;
            }
        };
        Object.defineProperty(BarComponent.prototype, "edges", {
            get: function () {
                var edges = [false, false, false, false];
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
            },
            enumerable: true,
            configurable: true
        });
        BarComponent.prototype.onMouseEnter = function () {
            this.activate.emit(this.data);
        };
        BarComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit(this.data);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "fill", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "width", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "height", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "x", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "y", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "orientation", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "offset", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "isActive", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarComponent.prototype, "stops", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "animations", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarComponent.prototype, "ariaLabel", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], BarComponent.prototype, "deactivate", void 0);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], BarComponent.prototype, "onMouseEnter", null);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], BarComponent.prototype, "onMouseLeave", null);
        BarComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-bar]',
                template: "<svg:defs *ngIf=\"hasGradient\">\n  <svg:g ng-svg-charts-svg-linear-gradient\n    [orientation]=\"orientation\"\n    [name]=\"gradientId\"\n    [stops]=\"gradientStops\"\n  />\n</svg:defs>\n<svg:path\n  class=\"bar\"\n  stroke=\"none\"\n  role=\"img\"\n  tabIndex=\"-1\"\n  [class.active]=\"isActive\"\n  [attr.d]=\"path\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.fill]=\"hasGradient ? gradientFill : fill\"\n  (click)=\"select.emit(data)\"\n/>",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], BarComponent);
        return BarComponent;
    }());

    var BarHorizontalComponent = /** @class */ (function (_super) {
        __extends(BarHorizontalComponent, _super);
        function BarHorizontalComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            return _this;
        }
        BarHorizontalComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontalComponent.prototype.getXScale = function () {
            this.xDomain = this.getXDomain();
            var scale = d3Scale.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontalComponent.prototype.getYScale = function () {
            this.yDomain = this.getYDomain();
            var spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.height])
                .paddingInner(spacing)
                .domain(this.yDomain);
        };
        BarHorizontalComponent.prototype.getXDomain = function () {
            var values = this.results.map(function (d) { return d.value; });
            var min = this.xScaleMin
                ? Math.min.apply(Math, __spread([this.xScaleMin], values)) : Math.min.apply(Math, __spread([0], values));
            var max = this.xScaleMax
                ? Math.max.apply(Math, __spread([this.xScaleMax], values)) : Math.max.apply(Math, __spread([0], values));
            return [min, max];
        };
        BarHorizontalComponent.prototype.getYDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        BarHorizontalComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BarHorizontalComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.yDomain;
            }
            else {
                domain = this.xDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontalComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarHorizontalComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontalComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontalComponent.prototype.onDataLabelMaxWidthChanged = function (event) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
            }
            else {
                this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
            }
            if (event.index === (this.results.length - 1)) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarHorizontalComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontalComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarHorizontalComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarHorizontalComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarHorizontalComponent.prototype, "xScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarHorizontalComponent.prototype, "xScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontalComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontalComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarHorizontalComponent.prototype, "tooltipTemplate", void 0);
        BarHorizontalComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-horizontal',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelClick)=\"onClick($event)\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-series-horizontal\n      [xScale]=\"xScale\"\n      [yScale]=\"yScale\"\n      [colors]=\"colors\"\n      [series]=\"results\"\n      [dims]=\"dims\"\n      [gradient]=\"gradient\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [activeEntries]=\"activeEntries\"\n      [roundEdges]=\"roundEdges\"\n      [animations]=\"animations\"\n      [showDataLabel]=\"showDataLabel\"\n      [dataLabelFormatting]=\"dataLabelFormatting\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n      (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event)\"\n      >\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarHorizontalComponent);
        return BarHorizontalComponent;
    }(BaseChartComponent));

    var BarHorizontal2DComponent = /** @class */ (function (_super) {
        __extends(BarHorizontal2DComponent, _super);
        function BarHorizontal2DComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.groupPadding = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            return _this;
        }
        BarHorizontal2DComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontal2DComponent.prototype.getGroupScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.height])
                .paddingInner(spacing)
                .paddingOuter(spacing / 2)
                .domain(this.groupDomain);
        };
        BarHorizontal2DComponent.prototype.getInnerScale = function () {
            var height = this.groupScale.bandwidth();
            var spacing = this.innerDomain.length / (height / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, height])
                .paddingInner(spacing)
                .domain(this.innerDomain);
        };
        BarHorizontal2DComponent.prototype.getValueScale = function () {
            var scale = d3Scale.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.valuesDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontal2DComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarHorizontal2DComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarHorizontal2DComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            var min = Math.min.apply(Math, __spread([0], domain));
            var max = this.xScaleMax
                ? Math.max.apply(Math, __spread([this.xScaleMax], domain)) : Math.max.apply(Math, __spread([0], domain));
            return [min, max];
        };
        BarHorizontal2DComponent.prototype.groupTransform = function (group) {
            return "translate(0, " + this.groupScale(group.name) + ")";
        };
        BarHorizontal2DComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarHorizontal2DComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BarHorizontal2DComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.innerDomain;
            }
            else {
                domain = this.valuesDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontal2DComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarHorizontal2DComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontal2DComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontal2DComponent.prototype.onDataLabelMaxWidthChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
            }
            else {
                this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
            }
            if (groupIndex === (this.results.length - 1)) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarHorizontal2DComponent.prototype.onActivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontal2DComponent.prototype.onDeactivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarHorizontal2DComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontal2DComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarHorizontal2DComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontal2DComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontal2DComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "groupPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarHorizontal2DComponent.prototype, "xScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontal2DComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontal2DComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontal2DComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarHorizontal2DComponent.prototype, "tooltipTemplate", void 0);
        BarHorizontal2DComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-horizontal-2d',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-grid-panel-series\n      [xScale]=\"valueScale\"\n      [yScale]=\"groupScale\"\n      [data]=\"results\"\n      [dims]=\"dims\"\n      orient=\"horizontal\">\n    </svg:g>\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"valueScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"groupScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-horizontal\n        [xScale]=\"valueScale\"\n        [activeEntries]=\"activeEntries\"\n        [yScale]=\"innerScale\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [roundEdges]=\"roundEdges\"\n        [animations]=\"animations\"\n        [showDataLabel]=\"showDataLabel\"\n        [dataLabelFormatting]=\"dataLabelFormatting\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n        (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                                transform: '*',
                            }),
                            animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarHorizontal2DComponent);
        return BarHorizontal2DComponent;
    }(BaseChartComponent));

    var BarHorizontalNormalizedComponent = /** @class */ (function (_super) {
        __extends(BarHorizontalNormalizedComponent, _super);
        function BarHorizontalNormalizedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            return _this;
        }
        BarHorizontalNormalizedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontalNormalizedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarHorizontalNormalizedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarHorizontalNormalizedComponent.prototype.getValueDomain = function () {
            return [0, 100];
        };
        BarHorizontalNormalizedComponent.prototype.getYScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.height])
                .paddingInner(spacing)
                .domain(this.groupDomain);
        };
        BarHorizontalNormalizedComponent.prototype.getXScale = function () {
            var scale = d3Scale.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontalNormalizedComponent.prototype.groupTransform = function (group) {
            return "translate(0, " + this.yScale(group.name) + ")";
        };
        BarHorizontalNormalizedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarHorizontalNormalizedComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BarHorizontalNormalizedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontalNormalizedComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarHorizontalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontalNormalizedComponent.prototype.onActivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontalNormalizedComponent.prototype.onDeactivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarHorizontalNormalizedComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalNormalizedComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarHorizontalNormalizedComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalNormalizedComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalNormalizedComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalNormalizedComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontalNormalizedComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontalNormalizedComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarHorizontalNormalizedComponent.prototype, "tooltipTemplate", void 0);
        BarHorizontalNormalizedComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-horizontal-normalized',
                template: 'bar-horizontal-normalized.template.html',
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                                transform: '*',
                            }),
                            animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarHorizontalNormalizedComponent);
        return BarHorizontalNormalizedComponent;
    }(BaseChartComponent));

    var BarHorizontalStackedComponent = /** @class */ (function (_super) {
        __extends(BarHorizontalStackedComponent, _super);
        function BarHorizontalStackedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.showDataLabel = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            return _this;
        }
        BarHorizontalStackedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarHorizontalStackedComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            var smallest = 0;
            var biggest = 0;
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    var smallestSum = 0;
                    var biggestSum = 0;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (d.value < 0) {
                                smallestSum += d.value;
                            }
                            else {
                                biggestSum += d.value;
                            }
                            smallest = d.value < smallest ? d.value : smallest;
                            biggest = d.value > biggest ? d.value : biggest;
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    domain.push(smallestSum);
                    domain.push(biggestSum);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            domain.push(smallest);
            domain.push(biggest);
            var min = Math.min.apply(Math, __spread([0], domain));
            var max = this.xScaleMax
                ? Math.max.apply(Math, __spread([this.xScaleMax], domain)) : Math.max.apply(Math, __spread(domain));
            return [min, max];
        };
        BarHorizontalStackedComponent.prototype.getYScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.height])
                .paddingInner(spacing)
                .domain(this.groupDomain);
        };
        BarHorizontalStackedComponent.prototype.getXScale = function () {
            var scale = d3Scale.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
            return "translate(0, " + this.yScale(group.name) + ")";
        };
        BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarHorizontalStackedComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BarHorizontalStackedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontalStackedComponent.prototype.onDataLabelMaxWidthChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
            }
            else {
                this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
            }
            if (groupIndex === (this.results.length - 1)) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarHorizontalStackedComponent.prototype.onActivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontalStackedComponent.prototype.onDeactivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarHorizontalStackedComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalStackedComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarHorizontalStackedComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalStackedComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarHorizontalStackedComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarHorizontalStackedComponent.prototype, "xScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarHorizontalStackedComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontalStackedComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarHorizontalStackedComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarHorizontalStackedComponent.prototype, "tooltipTemplate", void 0);
        BarHorizontalStackedComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-horizontal-stacked',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-horizontal\n        type=\"stacked\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [activeEntries]=\"activeEntries\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [animations]=\"animations\"\n        [showDataLabel]=\"showDataLabel\"\n        [dataLabelFormatting]=\"dataLabelFormatting\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n        (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                                transform: '*',
                            }),
                            animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarHorizontalStackedComponent);
        return BarHorizontalStackedComponent;
    }(BaseChartComponent));

    var BarVerticalComponent = /** @class */ (function (_super) {
        __extends(BarVerticalComponent, _super);
        function BarVerticalComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            return _this;
        }
        BarVerticalComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
        };
        BarVerticalComponent.prototype.getXScale = function () {
            this.xDomain = this.getXDomain();
            var spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.width])
                .paddingInner(spacing)
                .domain(this.xDomain);
        };
        BarVerticalComponent.prototype.getYScale = function () {
            this.yDomain = this.getYDomain();
            var scale = d3Scale.scaleLinear()
                .range([this.dims.height, 0])
                .domain(this.yDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVerticalComponent.prototype.getXDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        BarVerticalComponent.prototype.getYDomain = function () {
            var values = this.results.map(function (d) { return d.value; });
            var min = this.yScaleMin
                ? Math.min.apply(Math, __spread([this.yScaleMin], values)) : Math.min.apply(Math, __spread([0], values));
            var max = this.yScaleMax
                ? Math.max.apply(Math, __spread([this.yScaleMax], values)) : Math.max.apply(Math, __spread([0], values));
            return [min, max];
        };
        BarVerticalComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BarVerticalComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.xDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVerticalComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVerticalComponent.prototype.onDataLabelMaxHeightChanged = function (event) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
            }
            else {
                this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
            }
            if (event.index === (this.results.length - 1)) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarVerticalComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVerticalComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarVerticalComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarVerticalComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarVerticalComponent.prototype, "yScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarVerticalComponent.prototype, "yScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVerticalComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVerticalComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarVerticalComponent.prototype, "tooltipTemplate", void 0);
        BarVerticalComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-vertical',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelClick)=\"onClick($event)\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-series-vertical\n      [xScale]=\"xScale\"\n      [yScale]=\"yScale\"\n      [colors]=\"colors\"\n      [series]=\"results\"\n      [dims]=\"dims\"\n      [gradient]=\"gradient\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [showDataLabel]=\"showDataLabel\"\n      [dataLabelFormatting]=\"dataLabelFormatting\"\n      [activeEntries]=\"activeEntries\"\n      [roundEdges]=\"roundEdges\"\n      [animations]=\"animations\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n      (select)=\"onClick($event)\"\n      (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event)\"\n      >\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                encapsulation: core.ViewEncapsulation.None,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarVerticalComponent);
        return BarVerticalComponent;
    }(BaseChartComponent));

    var BarVertical2DComponent = /** @class */ (function (_super) {
        __extends(BarVertical2DComponent, _super);
        function BarVertical2DComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.scaleType = 'ordinal';
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.groupPadding = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            return _this;
        }
        BarVertical2DComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
        };
        BarVertical2DComponent.prototype.onDataLabelMaxHeightChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
            }
            else {
                this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
            }
            if (groupIndex === (this.results.length - 1)) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarVertical2DComponent.prototype.getGroupScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.width])
                .paddingInner(spacing)
                .paddingOuter(spacing / 2)
                .domain(this.groupDomain);
        };
        BarVertical2DComponent.prototype.getInnerScale = function () {
            var width = this.groupScale.bandwidth();
            var spacing = this.innerDomain.length / (width / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, width])
                .paddingInner(spacing)
                .domain(this.innerDomain);
        };
        BarVertical2DComponent.prototype.getValueScale = function () {
            var scale = d3Scale.scaleLinear()
                .range([this.dims.height, 0])
                .domain(this.valuesDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVertical2DComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarVertical2DComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarVertical2DComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            var min = Math.min.apply(Math, __spread([0], domain));
            var max = this.yScaleMax
                ? Math.max.apply(Math, __spread([this.yScaleMax], domain)) : Math.max.apply(Math, __spread([0], domain));
            return [min, max];
        };
        BarVertical2DComponent.prototype.groupTransform = function (group) {
            return "translate(" + this.groupScale(group.name) + ", 0)";
        };
        BarVertical2DComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarVertical2DComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BarVertical2DComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.innerDomain;
            }
            else {
                domain = this.valuesDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVertical2DComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarVertical2DComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVertical2DComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVertical2DComponent.prototype.onActivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVertical2DComponent.prototype.onDeactivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "scaleType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarVertical2DComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVertical2DComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarVertical2DComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVertical2DComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVertical2DComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "groupPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarVertical2DComponent.prototype, "yScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVertical2DComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVertical2DComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVertical2DComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarVertical2DComponent.prototype, "tooltipTemplate", void 0);
        BarVertical2DComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-vertical-2d',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-grid-panel-series\n      [xScale]=\"groupScale\"\n      [yScale]=\"valueScale\"\n      [data]=\"results\"\n      [dims]=\"dims\"\n      orient=\"vertical\">\n    </svg:g>\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"groupScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"valueScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-series-vertical\n      *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\"\n      [activeEntries]=\"activeEntries\"\n      [xScale]=\"innerScale\"\n      [yScale]=\"valueScale\"\n      [colors]=\"colors\"\n      [series]=\"group.series\"\n      [dims]=\"dims\"\n      [gradient]=\"gradient\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [showDataLabel]=\"showDataLabel\"\n      [dataLabelFormatting]=\"dataLabelFormatting\"\n      [seriesName]=\"group.name\"\n      [roundEdges]=\"roundEdges\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event, group)\"\n      (activate)=\"onActivate($event, group)\"\n      (deactivate)=\"onDeactivate($event, group)\"\n      (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                                transform: '*',
                            }),
                            animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarVertical2DComponent);
        return BarVertical2DComponent;
    }(BaseChartComponent));

    var BarVerticalNormalizedComponent = /** @class */ (function (_super) {
        __extends(BarVerticalNormalizedComponent, _super);
        function BarVerticalNormalizedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            return _this;
        }
        BarVerticalNormalizedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarVerticalNormalizedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarVerticalNormalizedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarVerticalNormalizedComponent.prototype.getValueDomain = function () {
            return [0, 100];
        };
        BarVerticalNormalizedComponent.prototype.getXScale = function () {
            var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.width])
                .paddingInner(spacing)
                .domain(this.groupDomain);
        };
        BarVerticalNormalizedComponent.prototype.getYScale = function () {
            var scale = d3Scale.scaleLinear()
                .range([this.dims.height, 0])
                .domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVerticalNormalizedComponent.prototype.groupTransform = function (group) {
            return "translate(" + this.xScale(group.name) + ", 0)";
        };
        BarVerticalNormalizedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarVerticalNormalizedComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BarVerticalNormalizedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVerticalNormalizedComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarVerticalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVerticalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVerticalNormalizedComponent.prototype.onActivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVerticalNormalizedComponent.prototype.onDeactivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarVerticalNormalizedComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalNormalizedComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarVerticalNormalizedComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalNormalizedComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalNormalizedComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalNormalizedComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVerticalNormalizedComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVerticalNormalizedComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarVerticalNormalizedComponent.prototype, "tooltipTemplate", void 0);
        BarVerticalNormalizedComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-vertical-normalized',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g\n      *ngFor=\"let group of results; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [attr.transform]=\"groupTransform(group)\">\n      <svg:g ng-svg-charts-series-vertical\n        type=\"normalized\"\n        [xScale]=\"xScale\"\n        [yScale]=\"yScale\"\n        [activeEntries]=\"activeEntries\"\n        [colors]=\"colors\"\n        [series]=\"group.series\"\n        [dims]=\"dims\"\n        [gradient]=\"gradient\"\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [seriesName]=\"group.name\"\n        [animations]=\"animations\"\n        (select)=\"onClick($event, group)\"\n        (activate)=\"onActivate($event, group)\"\n        (deactivate)=\"onDeactivate($event, group)\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                                transform: '*',
                            }),
                            animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarVerticalNormalizedComponent);
        return BarVerticalNormalizedComponent;
    }(BaseChartComponent));

    var BarVerticalStackedComponent = /** @class */ (function (_super) {
        __extends(BarVerticalStackedComponent, _super);
        function BarVerticalStackedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.showDataLabel = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            return _this;
        }
        BarVerticalStackedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
        };
        BarVerticalStackedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarVerticalStackedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarVerticalStackedComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            var smallest = 0;
            var biggest = 0;
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    var smallestSum = 0;
                    var biggestSum = 0;
                    try {
                        for (var _e = __values(group.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (d.value < 0) {
                                smallestSum += d.value;
                            }
                            else {
                                biggestSum += d.value;
                            }
                            smallest = d.value < smallest ? d.value : smallest;
                            biggest = d.value > biggest ? d.value : biggest;
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    domain.push(smallestSum);
                    domain.push(biggestSum);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            domain.push(smallest);
            domain.push(biggest);
            var min = Math.min.apply(Math, __spread([0], domain));
            var max = this.yScaleMax
                ? Math.max.apply(Math, __spread([this.yScaleMax], domain)) : Math.max.apply(Math, __spread(domain));
            return [min, max];
        };
        BarVerticalStackedComponent.prototype.getXScale = function () {
            var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.width])
                .paddingInner(spacing)
                .domain(this.groupDomain);
        };
        BarVerticalStackedComponent.prototype.getYScale = function () {
            var scale = d3Scale.scaleLinear()
                .range([this.dims.height, 0])
                .domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVerticalStackedComponent.prototype.onDataLabelMaxHeightChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
            }
            else {
                this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
            }
            if (groupIndex === (this.results.length - 1)) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarVerticalStackedComponent.prototype.groupTransform = function (group) {
            return "translate(" + this.xScale(group.name) + ", 0)";
        };
        BarVerticalStackedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarVerticalStackedComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BarVerticalStackedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVerticalStackedComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        BarVerticalStackedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVerticalStackedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVerticalStackedComponent.prototype.onActivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVerticalStackedComponent.prototype.onDeactivate = function (event, group) {
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], BarVerticalStackedComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalStackedComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], BarVerticalStackedComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalStackedComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], BarVerticalStackedComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "barPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], BarVerticalStackedComponent.prototype, "yScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarVerticalStackedComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVerticalStackedComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarVerticalStackedComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], BarVerticalStackedComponent.prototype, "tooltipTemplate", void 0);
        BarVerticalStackedComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-bar-vertical-stacked',
                template: 'bar-vertical-stacked.template.html',
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                                transform: '*',
                            }),
                            animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], BarVerticalStackedComponent);
        return BarVerticalStackedComponent;
    }(BaseChartComponent));


    (function (D0Types) {
        D0Types["positive"] = "positive";
        D0Types["negative"] = "negative";
    })(exports.D0Types || (exports.D0Types = {}));
    var SeriesVerticalComponent = /** @class */ (function () {
        function SeriesVerticalComponent() {
            this.type = 'standard';
            this.tooltipDisabled = false;
            this.animations = true;
            this.showDataLabel = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dataLabelHeightChanged = new core.EventEmitter();
            this.barsForDataLabels = [];
        }
        SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        SeriesVerticalComponent.prototype.update = function () {
            var _this = this;
            var _a;
            this.updateTooltipSettings();
            var width;
            if (this.series.length) {
                width = this.xScale.bandwidth();
            }
            var yScaleMin = Math.max(this.yScale.domain()[0], 0);
            var d0 = (_a = {},
                _a[exports.D0Types.positive] = 0,
                _a[exports.D0Types.negative] = 0,
                _a);
            var d0Type = exports.D0Types.positive;
            var total;
            if (this.type === 'normalized') {
                total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
            }
            this.bars = this.series.map(function (d, index) {
                var value = d.value;
                var label = d.name;
                var formattedLabel = formatLabel(label);
                var roundEdges = _this.roundEdges;
                d0Type = value > 0 ? exports.D0Types.positive : exports.D0Types.negative;
                var bar = {
                    value: value,
                    label: label,
                    roundEdges: roundEdges,
                    data: d,
                    width: width,
                    formattedLabel: formattedLabel,
                    height: 0,
                    x: 0,
                    y: 0,
                };
                if (_this.type === 'standard') {
                    bar.height = Math.abs(_this.yScale(value) - _this.yScale(yScaleMin));
                    bar.x = _this.xScale(label);
                    if (value < 0) {
                        bar.y = _this.yScale(0);
                    }
                    else {
                        bar.y = _this.yScale(value);
                    }
                }
                else if (_this.type === 'stacked') {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                    bar.x = 0;
                    bar.y = _this.yScale(offset1);
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                }
                else if (_this.type === 'normalized') {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    if (total > 0) {
                        offset0 = (offset0 * 100) / total;
                        offset1 = (offset1 * 100) / total;
                    }
                    else {
                        offset0 = 0;
                        offset1 = 0;
                    }
                    bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                    bar.x = 0;
                    bar.y = _this.yScale(offset1);
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                    value = (offset1 - offset0).toFixed(2) + '%';
                }
                if (_this.colors.scaleType === 'ordinal') {
                    bar.color = _this.colors.getColor(label);
                }
                else {
                    if (_this.type === 'standard') {
                        bar.color = _this.colors.getColor(value);
                        bar.gradientStops = _this.colors.getLinearGradientStops(value);
                    }
                    else {
                        bar.color = _this.colors.getColor(bar.offset1);
                        bar.gradientStops =
                            _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                    }
                }
                var tooltipLabel = formattedLabel;
                bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
                if (_this.seriesName) {
                    tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                    bar.data.series = _this.seriesName;
                    bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
                }
                bar.tooltipText = _this.tooltipDisabled ? undefined : "\n        <span class=\"tooltip-label\">" + tooltipLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
                return bar;
            });
            this.updateDataLabels();
        };
        SeriesVerticalComponent.prototype.updateDataLabels = function () {
            var _this = this;
            if (this.type === 'stacked') {
                this.barsForDataLabels = [];
                var section = {};
                section.series = this.seriesName;
                var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d > 0 ? sum + d : sum; }, 0);
                var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d < 0 ? sum + d : sum; }, 0);
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
                this.barsForDataLabels = this.series.map(function (d) {
                    var section = {};
                    section.series = _this.seriesName ? _this.seriesName : d.name;
                    section.total = d.value;
                    section.x = _this.xScale(d.name);
                    section.y = _this.yScale(0);
                    section.height = _this.yScale(section.total) - _this.yScale(0);
                    section.width = _this.xScale.bandwidth();
                    return section;
                });
            }
        };
        SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
            this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
            this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
        };
        SeriesVerticalComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name && entry.series === d.series;
            });
            return item !== undefined;
        };
        SeriesVerticalComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
            return bar.label;
        };
        SeriesVerticalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
            return index + '#' + barLabel.series + '#' + barLabel.total;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "type", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "series", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SeriesVerticalComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], SeriesVerticalComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SeriesVerticalComponent.prototype, "seriesName", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SeriesVerticalComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "animations", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "deactivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
        SeriesVerticalComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-series-vertical]',
                template: "\n    <svg:g ng-svg-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [animations]=\"animations\">\n    </svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g ng-svg-charts-bar-label *ngFor=\"let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'vertical'\"\n        (dimensionsChanged)=\"dataLabelHeightChanged.emit({size:$event, index:i})\"\n      />\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1
                            }),
                            animations.animate(500, animations.style({ opacity: 0 }))
                        ])
                    ])
                ]
            })
        ], SeriesVerticalComponent);
        return SeriesVerticalComponent;
    }());

    var SeriesHorizontalComponent = /** @class */ (function () {
        function SeriesHorizontalComponent() {
            this.barsForDataLabels = [];
            this.type = 'standard';
            this.tooltipDisabled = false;
            this.animations = true;
            this.showDataLabel = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dataLabelWidthChanged = new core.EventEmitter();
        }
        SeriesHorizontalComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        SeriesHorizontalComponent.prototype.update = function () {
            var _this = this;
            var _a;
            this.updateTooltipSettings();
            var d0 = (_a = {},
                _a[exports.D0Types.positive] = 0,
                _a[exports.D0Types.negative] = 0,
                _a);
            var d0Type;
            d0Type = exports.D0Types.positive;
            var total;
            if (this.type === 'normalized') {
                total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
            }
            var xScaleMin = Math.max(this.xScale.domain()[0], 0);
            this.bars = this.series.map(function (d, index) {
                var value = d.value;
                var label = d.name;
                var formattedLabel = formatLabel(label);
                var roundEdges = _this.roundEdges;
                d0Type = value > 0 ? exports.D0Types.positive : exports.D0Types.negative;
                var bar = {
                    value: value,
                    label: label,
                    roundEdges: roundEdges,
                    data: d,
                    formattedLabel: formattedLabel
                };
                bar.height = _this.yScale.bandwidth();
                if (_this.type === 'standard') {
                    bar.width = Math.abs(_this.xScale(value) - _this.xScale(xScaleMin));
                    if (value < 0) {
                        bar.x = _this.xScale(value);
                    }
                    else {
                        bar.x = _this.xScale(xScaleMin);
                    }
                    bar.y = _this.yScale(label);
                }
                else if (_this.type === 'stacked') {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                    bar.x = _this.xScale(offset0);
                    bar.y = 0;
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                }
                else if (_this.type === 'normalized') {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    if (total > 0) {
                        offset0 = (offset0 * 100) / total;
                        offset1 = (offset1 * 100) / total;
                    }
                    else {
                        offset0 = 0;
                        offset1 = 0;
                    }
                    bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                    bar.x = _this.xScale(offset0);
                    bar.y = 0;
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                    value = (offset1 - offset0).toFixed(2) + '%';
                }
                if (_this.colors.scaleType === 'ordinal') {
                    bar.color = _this.colors.getColor(label);
                }
                else {
                    if (_this.type === 'standard') {
                        bar.color = _this.colors.getColor(value);
                        bar.gradientStops = _this.colors.getLinearGradientStops(value);
                    }
                    else {
                        bar.color = _this.colors.getColor(bar.offset1);
                        bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                    }
                }
                var tooltipLabel = formattedLabel;
                bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
                if (_this.seriesName) {
                    tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                    bar.data.series = _this.seriesName;
                    bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
                }
                bar.tooltipText = _this.tooltipDisabled ? undefined : "\n        <span class=\"tooltip-label\">" + tooltipLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
                return bar;
            });
            this.updateDataLabels();
        };
        SeriesHorizontalComponent.prototype.updateDataLabels = function () {
            var _this = this;
            if (this.type === 'stacked') {
                this.barsForDataLabels = [];
                var section = {};
                section.series = this.seriesName;
                var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d > 0 ? sum + d : sum; }, 0);
                var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return d < 0 ? sum + d : sum; }, 0);
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
                this.barsForDataLabels = this.series.map(function (d) {
                    var section = {};
                    section.series = _this.seriesName ? _this.seriesName : d.name;
                    section.total = d.value;
                    section.x = _this.xScale(0);
                    section.y = _this.yScale(d.name);
                    section.width = _this.xScale(section.total) - _this.xScale(0);
                    section.height = _this.yScale.bandwidth();
                    return section;
                });
            }
        };
        SeriesHorizontalComponent.prototype.updateTooltipSettings = function () {
            this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
            this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
        };
        SeriesHorizontalComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries) {
                return false;
            }
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name && entry.series === d.series;
            });
            return item !== undefined;
        };
        SeriesHorizontalComponent.prototype.trackBy = function (index, bar) {
            return bar.label;
        };
        SeriesHorizontalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
            return index + '#' + barLabel.series + '#' + barLabel.total;
        };
        SeriesHorizontalComponent.prototype.click = function (data) {
            this.select.emit(data);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "type", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "series", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SeriesHorizontalComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], SeriesHorizontalComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SeriesHorizontalComponent.prototype, "seriesName", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], SeriesHorizontalComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SeriesHorizontalComponent.prototype, "roundEdges", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "animations", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "showDataLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "dataLabelFormatting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "deactivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SeriesHorizontalComponent.prototype, "dataLabelWidthChanged", void 0);
        SeriesHorizontalComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-series-horizontal]',
                template: "\n    <svg:g ng-svg-charts-bar\n      *ngFor=\"let bar of bars; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [animations]=\"animations\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\">\n    </svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g ng-svg-charts-bar-label *ngFor=\"let b of barsForDataLabels; let i = index; trackBy:trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'horizontal'\"\n        (dimensionsChanged)=\"dataLabelWidthChanged.emit({size:$event, index:i})\"\n      />\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1
                            }),
                            animations.animate(500, animations.style({ opacity: 0 }))
                        ])
                    ])
                ]
            })
        ], SeriesHorizontalComponent);
        return SeriesHorizontalComponent;
    }());

    var BarLabelComponent = /** @class */ (function () {
        function BarLabelComponent(element) {
            this.dimensionsChanged = new core.EventEmitter();
            this.horizontalPadding = 2;
            this.verticalPadding = 5;
            this.element = element.nativeElement;
        }
        BarLabelComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        BarLabelComponent.prototype.getSize = function () {
            var h = this.element.getBoundingClientRect().height;
            var w = this.element.getBoundingClientRect().width;
            return { height: h, width: w, negative: this.value < 0 };
        };
        BarLabelComponent.prototype.ngAfterViewInit = function () {
            this.dimensionsChanged.emit(this.getSize());
        };
        BarLabelComponent.prototype.update = function () {
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
                this.transform = "rotate(-45, " + this.x + " , " + this.y + ")";
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "value", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "valueFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "barX", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "barY", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "barWidth", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "barHeight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], BarLabelComponent.prototype, "orientation", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], BarLabelComponent.prototype, "dimensionsChanged", void 0);
        BarLabelComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-bar-label]',
                template: "\n    <svg:text\n      class=\"textDataLabel\"\n      alignment-baseline=\"middle\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\">\n      {{formatedValue}}\n    </svg:text>\n\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".textDataLabel{font-size:11px}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], BarLabelComponent);
        return BarLabelComponent;
    }());

    var BarChartModule = /** @class */ (function () {
        function BarChartModule() {
        }
        BarChartModule = __decorate([
            core.NgModule({
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
        return BarChartModule;
    }());

    var LineComponent = /** @class */ (function () {
        function LineComponent(element) {
            this.element = element;
            this.fill = 'none';
            this.animations = true;
            this.select = new core.EventEmitter();
            this.initialized = false;
        }
        LineComponent.prototype.ngOnChanges = function (changes) {
            if (!this.initialized) {
                this.initialized = true;
                this.initialPath = this.path;
            }
            else {
                this.updatePathEl();
            }
        };
        LineComponent.prototype.updatePathEl = function () {
            var node = d3Selection.select(this.element.nativeElement).select('.line');
            if (this.animations) {
                node
                    .transition().duration(750)
                    .attr('d', this.path);
            }
            else {
                node.attr('d', this.path);
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineComponent.prototype, "path", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineComponent.prototype, "stroke", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineComponent.prototype, "fill", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], LineComponent.prototype, "select", void 0);
        LineComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-line]',
                template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':enter', [
                            animations.style({
                                strokeDasharray: 2000,
                                strokeDashoffset: 2000,
                            }),
                            animations.animate(1000, animations.style({
                                strokeDashoffset: 0
                            }))
                        ])
                    ])
                ]
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], LineComponent);
        return LineComponent;
    }());

    var LineChartComponent = /** @class */ (function (_super) {
        __extends(LineChartComponent, _super);
        function LineChartComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.showRefLines = false;
            _this.showRefLabels = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            return _this;
        }
        LineChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
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
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        LineChartComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        LineChartComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === 'linear') {
                values = values.map(function (v) { return Number(v); });
            }
            var min;
            var max;
            if (this.scaleType === 'time' || this.scaleType === 'linear') {
                min = this.xScaleMin
                    ? this.xScaleMin
                    : Math.min.apply(Math, __spread(values));
                max = this.xScaleMax
                    ? this.xScaleMax
                    : Math.max.apply(Math, __spread(values));
            }
            if (this.scaleType === 'time') {
                domain = [new Date(min), new Date(max)];
                this.xSet = __spread(values).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
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
                this.xSet = __spread(values).sort(function (a, b) { return (a - b); });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        LineChartComponent.prototype.getYDomain = function () {
            var e_1, _a, e_2, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = __values(results.series), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
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
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var values = __spread(domain);
            if (!this.autoScale) {
                values.push(0);
            }
            var min = this.yScaleMin
                ? this.yScaleMin
                : Math.min.apply(Math, __spread(values));
            var max = this.yScaleMax
                ? this.yScaleMax
                : Math.max.apply(Math, __spread(values));
            return [min, max];
        };
        LineChartComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        LineChartComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === 'time') {
                scale = d3Scale.scaleTime()
                    .range([0, width])
                    .domain(domain);
            }
            else if (this.scaleType === 'linear') {
                scale = d3Scale.scaleLinear()
                    .range([0, width])
                    .domain(domain);
                if (this.roundDomains) {
                    scale = scale.nice();
                }
            }
            else if (this.scaleType === 'ordinal') {
                scale = d3Scale.scalePoint()
                    .range([0, width])
                    .padding(0.1)
                    .domain(domain);
            }
            return scale;
        };
        LineChartComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear()
                .range([height, 0])
                .domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        LineChartComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        LineChartComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        LineChartComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        LineChartComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        LineChartComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        LineChartComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === 'ordinal') {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        LineChartComponent.prototype.getLegendOptions = function () {
            var opts = {
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
        };
        LineChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        LineChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        LineChartComponent.prototype.onActivate = function (item) {
            this.deactivateAll();
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = [item];
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        LineChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        LineChartComponent.prototype.deactivateAll = function () {
            var e_3, _a;
            this.activeEntries = __spread(this.activeEntries);
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.activeEntries = [];
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "xAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "yAxis", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "showXAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "showYAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "xAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "yAxisLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "autoScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "timeline", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], LineChartComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "showGridLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "curve", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LineChartComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LineChartComponent.prototype, "schemeType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LineChartComponent.prototype, "rangeFillOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "trimXAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "trimYAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "maxXAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "maxYAxisTickLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "xAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "yAxisTickFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LineChartComponent.prototype, "xAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LineChartComponent.prototype, "yAxisTicks", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "roundDomains", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "showRefLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "referenceLines", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "showRefLabels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "xScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineChartComponent.prototype, "xScaleMax", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LineChartComponent.prototype, "yScaleMin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LineChartComponent.prototype, "yScaleMax", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LineChartComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LineChartComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], LineChartComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.ContentChild('seriesTooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], LineChartComponent.prototype, "seriesTooltipTemplate", void 0);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], LineChartComponent.prototype, "hideCircles", null);
        LineChartComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-line-chart',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelClick)=\"onClick($event)\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\">\n  <svg:defs>\n    <svg:clipPath [attr.id]=\"clipPathId\">\n      <svg:rect\n        [attr.width]=\"dims.width + 10\"\n        [attr.height]=\"dims.height + 10\"\n        [attr.transform]=\"'translate(-5, -5)'\"/>\n    </svg:clipPath>\n  </svg:defs>\n  <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n    <svg:g ng-svg-charts-x-axis\n      *ngIf=\"xAxis\"\n      [xScale]=\"xScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showXAxisLabel\"\n      [labelText]=\"xAxisLabel\"\n      [trimTicks]=\"trimXAxisTicks\"\n      [maxTickLength]=\"maxXAxisTickLength\"\n      [tickFormatting]=\"xAxisTickFormatting\"\n      [ticks]=\"xAxisTicks\"\n      (dimensionsChanged)=\"updateXAxisHeight($event)\">\n    </svg:g>\n    <svg:g ng-svg-charts-y-axis\n      *ngIf=\"yAxis\"\n      [yScale]=\"yScale\"\n      [dims]=\"dims\"\n      [showGridLines]=\"showGridLines\"\n      [showLabel]=\"showYAxisLabel\"\n      [labelText]=\"yAxisLabel\"\n      [trimTicks]=\"trimYAxisTicks\"\n      [maxTickLength]=\"maxYAxisTickLength\"\n      [tickFormatting]=\"yAxisTickFormatting\"\n      [ticks]=\"yAxisTicks\"\n      [referenceLines]=\"referenceLines\"\n      [showRefLines]=\"showRefLines\"\n      [showRefLabels]=\"showRefLabels\"\n      (dimensionsChanged)=\"updateYAxisWidth($event)\">\n    </svg:g>\n    <svg:g [attr.clip-path]=\"clipPath\">\n      <svg:g *ngFor=\"let series of results; trackBy:trackBy\" [@animationState]=\"'active'\">\n        <svg:g ng-svg-charts-line-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"series\"\n          [activeEntries]=\"activeEntries\"\n          [scaleType]=\"scaleType\"\n          [curve]=\"curve\"\n          [rangeFillOpacity]=\"rangeFillOpacity\"\n          [hasRange]=\"hasRange\"\n          [animations]=\"animations\"\n        />\n      </svg:g>\n\n      <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n        <svg:g ng-svg-charts-tooltip-area\n          [dims]=\"dims\"\n          [xSet]=\"xSet\"\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [results]=\"results\"\n          [colors]=\"colors\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"seriesTooltipTemplate\"\n          (hover)=\"updateHoveredVertical($event)\"\n        />\n\n        <svg:g *ngFor=\"let series of results\">\n          <svg:g ng-svg-charts-circle-series\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [visibleValue]=\"hoveredVertical\"\n            [activeEntries]=\"activeEntries\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            (select)=\"onClick($event, series)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          />\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  </svg:g>\n  <svg:g ng-svg-charts-timeline\n    *ngIf=\"timeline && scaleType != 'ordinal'\"\n    [attr.transform]=\"timelineTransform\"\n    [results]=\"results\"\n    [view]=\"[timelineWidth, height]\"\n    [height]=\"timelineHeight\"\n    [scheme]=\"scheme\"\n    [customColors]=\"customColors\"\n    [scaleType]=\"scaleType\"\n    [legend]=\"legend\"\n    (onDomainChange)=\"updateDomain($event)\">\n    <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n      <svg:g ng-svg-charts-line-series\n        [xScale]=\"timelineXScale\"\n        [yScale]=\"timelineYScale\"\n        [colors]=\"colors\"\n        [data]=\"series\"\n        [scaleType]=\"scaleType\"\n        [curve]=\"curve\"\n        [hasRange]=\"hasRange\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  </svg:g>\n</ng-svg-charts-chart>",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('animationState', [
                        animations.transition(':leave', [
                            animations.style({
                                opacity: 1,
                            }),
                            animations.animate(500, animations.style({
                                opacity: 0
                            }))
                        ])
                    ])
                ],
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
            })
        ], LineChartComponent);
        return LineChartComponent;
    }(BaseChartComponent));

    var LineSeriesComponent = /** @class */ (function () {
        function LineSeriesComponent() {
            this.animations = true;
        }
        LineSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        LineSeriesComponent.prototype.update = function () {
            this.updateGradients();
            var data = this.sortData(this.data.series);
            var lineGen = this.getLineGenerator();
            this.path = lineGen(data) || '';
            var areaGen = this.getAreaGenerator();
            this.areaPath = areaGen(data) || '';
            if (this.hasRange) {
                var range = this.getRangeGenerator();
                this.outerPath = range(data) || '';
            }
            if (this.hasGradient) {
                this.stroke = this.gradientUrl;
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, __spread(values));
                var min = Math.min.apply(Math, __spread(values));
                if (max === min) {
                    this.stroke = this.colors.getColor(max);
                }
            }
            else {
                this.stroke = this.colors.getColor(this.data.name);
            }
        };
        LineSeriesComponent.prototype.getLineGenerator = function () {
            var _this = this;
            return d3Shape.line()
                .x(function (d) {
                var label = d.name;
                var value;
                if (_this.scaleType === 'time') {
                    value = _this.xScale(label);
                }
                else if (_this.scaleType === 'linear') {
                    value = _this.xScale(Number(label));
                }
                else {
                    value = _this.xScale(label);
                }
                return value;
            })
                .y(function (d) { return _this.yScale(d.value); })
                .curve(this.curve);
        };
        LineSeriesComponent.prototype.getRangeGenerator = function () {
            var _this = this;
            return d3Shape.area()
                .x(function (d) {
                var label = d.name;
                var value;
                if (_this.scaleType === 'time') {
                    value = _this.xScale(label);
                }
                else if (_this.scaleType === 'linear') {
                    value = _this.xScale(Number(label));
                }
                else {
                    value = _this.xScale(label);
                }
                return value;
            })
                .y0(function (d) { return _this.yScale(typeof d.min === 'number' ? d.min : d.value); })
                .y1(function (d) { return _this.yScale(typeof d.max === 'number' ? d.max : d.value); })
                .curve(this.curve);
        };
        LineSeriesComponent.prototype.getAreaGenerator = function () {
            var _this = this;
            var xProperty = function (d) {
                var label = d.name;
                return _this.xScale(label);
            };
            return d3Shape.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); })
                .curve(this.curve);
        };
        LineSeriesComponent.prototype.sortData = function (data) {
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
        };
        LineSeriesComponent.prototype.updateGradients = function () {
            if (this.colors.scaleType === 'linear') {
                this.hasGradient = true;
                this.gradientId = 'grad' + id().toString();
                this.gradientUrl = "url(#" + this.gradientId + ")";
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, __spread(values));
                var min = Math.min.apply(Math, __spread(values));
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
                this.areaGradientStops = this.colors.getLinearGradientStops(max);
            }
            else {
                this.hasGradient = false;
                this.gradientStops = undefined;
                this.areaGradientStops = undefined;
            }
        };
        LineSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries) {
                return false;
            }
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        LineSeriesComponent.prototype.isInactive = function (entry) {
            if (!this.activeEntries || this.activeEntries.length === 0) {
                return false;
            }
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item === undefined;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "xScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "yScale", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "scaleType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "curve", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], LineSeriesComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], LineSeriesComponent.prototype, "hasRange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LineSeriesComponent.prototype, "animations", void 0);
        LineSeriesComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-line-series]',
                template: "\n    <svg:g>\n      <defs>\n        <svg:g ng-svg-charts-svg-linear-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ng-svg-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [animations]=\"animations\"\n      />\n      <svg:g ng-svg-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"stroke\"\n        [animations]=\"animations\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n    <svg:g ng-svg-charts-area\n        *ngIf=\"hasRange\"\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], LineSeriesComponent);
        return LineSeriesComponent;
    }());

    var LineChartModule = /** @class */ (function () {
        function LineChartModule() {
        }
        LineChartModule = __decorate([
            core.NgModule({
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
        return LineChartModule;
    }());

    var AdvancedPieChartComponent = /** @class */ (function (_super) {
        __extends(AdvancedPieChartComponent, _super);
        function AdvancedPieChartComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.activeEntries = [];
            _this.tooltipDisabled = false;
            _this.label = 'Total';
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [20, 20, 20, 20];
            return _this;
        }
        AdvancedPieChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: (this.width * 4) / 12.0,
                height: this.height,
                margins: this.margin
            });
            this.domain = this.getDomain();
            this.setColors();
            var xOffset = this.dims.width / 2;
            var yOffset = this.margin[0] + this.dims.height / 2;
            this.legendWidth = this.width - this.dims.width - this.margin[1];
            this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
            this.innerRadius = this.outerRadius * 0.75;
            this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        };
        AdvancedPieChartComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AdvancedPieChartComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        AdvancedPieChartComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
        };
        AdvancedPieChartComponent.prototype.onActivate = function (event) {
            if (this.activeEntries.indexOf(event) > -1) {
                return;
            }
            this.activeEntries = __spread([event], this.activeEntries);
            this.activate.emit({ value: event, entries: this.activeEntries });
        };
        AdvancedPieChartComponent.prototype.onDeactivate = function (event) {
            var idx = this.activeEntries.indexOf(event);
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: event, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AdvancedPieChartComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedPieChartComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedPieChartComponent.prototype, "tooltipText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AdvancedPieChartComponent.prototype, "label", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AdvancedPieChartComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], AdvancedPieChartComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], AdvancedPieChartComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AdvancedPieChartComponent.prototype, "valueFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AdvancedPieChartComponent.prototype, "nameFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], AdvancedPieChartComponent.prototype, "percentageFormatting", void 0);
        AdvancedPieChartComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-advanced-pie-chart',
                template: "<div\n  [style.width.px]=\"width\"\n  [style.height.px]=\"height\">\n  <div class=\"advanced-pie chart\"\n    [style.width.px]=\"dims.width\"\n    [style.height.px]=\"dims.height\">\n    <ng-svg-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      [animations]=\"animations\">\n      <svg:g\n        [attr.transform]=\"transform\"\n        class=\"pie chart\">\n        <svg:g ng-svg-charts-pie-series\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [innerRadius]=\"innerRadius\"\n          [activeEntries]=\"activeEntries\"\n          [outerRadius]=\"outerRadius\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n          [animations]=\"animations\">\n        </svg:g>\n      </svg:g>\n    </ng-svg-charts-chart>\n  </div>\n  <div\n    class=\"advanced-pie-legend-wrapper\"\n    [style.width.px]=\"width - dims.width\"\n    [style.height.px]=\"height\">\n    <ng-svg-charts-advanced-legend\n      [data]=\"results\"\n      [colors]=\"colors\"\n      [width]=\"width - dims.width - margin[1]\"\n      [label]=\"label\"\n      [animations]=\"animations\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"nameFormatting\"\n      [percentageFormatting]=\"percentageFormatting\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\">\n    </ng-svg-charts-advanced-legend>\n  </div>\n</div>",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".advanced-pie,.advanced-pie-legend-wrapper{display:inline-block}"]
            })
        ], AdvancedPieChartComponent);
        return AdvancedPieChartComponent;
    }(BaseChartComponent));

    var PieLabelComponent = /** @class */ (function () {
        function PieLabelComponent() {
            this.animations = true;
            this.labelTrim = true;
            this.labelTrimSize = 10;
            this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
            this.trimLabel = trimLabel;
        }
        PieLabelComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieLabelComponent.prototype.update = function () {
            var startRadius = this.radius;
            if (this.explodeSlices) {
                startRadius = this.radius * this.value / this.max;
            }
            var innerArc = d3Shape.arc()
                .innerRadius(startRadius)
                .outerRadius(startRadius);
            // Calculate innerPos then scale outer position to match label position
            var innerPos = innerArc.centroid(this.data);
            var scale = this.data.pos[1] / innerPos[1];
            if (this.data.pos[1] === 0 || innerPos[1] === 0) {
                scale = 1;
            }
            var outerPos = [scale * innerPos[0], scale * innerPos[1]];
            this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
        };
        Object.defineProperty(PieLabelComponent.prototype, "textX", {
            get: function () {
                return this.data.pos[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PieLabelComponent.prototype, "textY", {
            get: function () {
                return this.data.pos[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
            get: function () {
                return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
            get: function () {
                return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
            get: function () {
                return this.isIE || !this.animations ? null : 'transform 0.75s';
            },
            enumerable: true,
            configurable: true
        });
        PieLabelComponent.prototype.textAnchor = function () {
            return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
        };
        PieLabelComponent.prototype.midAngle = function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "radius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "max", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "value", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "explodeSlices", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "animations", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "labelTrim", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieLabelComponent.prototype, "labelTrimSize", void 0);
        PieLabelComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-pie-label]',
                template: "<title>{{label}}</title>\n<svg:g\n  [attr.transform]=\"attrTransform\"\n  [style.transform]=\"styleTransform\"\n  [style.transition]=\"textTransition\">\n  <svg:text\n    class=\"pie-label\"\n    [class.animation]=\"animations\"\n    dy=\".35em\"\n    [style.textAnchor]=\"textAnchor()\"\n    [style.shapeRendering]=\"'crispEdges'\">\n    {{labelTrim ? trimLabel(label, labelTrimSize) : label}}\n  </svg:text>\n</svg:g>\n<svg:path\n  [attr.d]=\"line\"\n  [attr.stroke]=\"color\"\n  fill=\"none\"\n  class=\"pie-label-line line\"\n  [class.animation]=\"animations\">\n</svg:path>",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [])
        ], PieLabelComponent);
        return PieLabelComponent;
    }());

    var PieArcComponent = /** @class */ (function () {
        function PieArcComponent(element) {
            this.startAngle = 0;
            this.endAngle = Math.PI * 2;
            this.cornerRadius = 0;
            this.explodeSlices = false;
            this.gradient = false;
            this.animate = true;
            this.pointerEvents = true;
            this.isActive = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dblclick = new core.EventEmitter();
            this.initialized = false;
            this.element = element.nativeElement;
        }
        PieArcComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieArcComponent.prototype.getGradient = function () {
            return this.gradient ? this.gradientFill : this.fill;
        };
        PieArcComponent.prototype.getPointerEvents = function () {
            return this.pointerEvents ? 'auto' : 'none';
        };
        PieArcComponent.prototype.update = function () {
            var calc = this.calculateArc();
            this.startOpacity = 0.5;
            this.radialGradientId = 'linearGrad' + id().toString();
            this.gradientFill = "url(#" + this.radialGradientId + ")";
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
        };
        PieArcComponent.prototype.calculateArc = function () {
            var outerRadius = this.outerRadius;
            if (this.explodeSlices && this.innerRadius === 0) {
                outerRadius = (this.outerRadius * this.value) / this.max;
            }
            return d3Shape.arc()
                .innerRadius(this.innerRadius)
                .outerRadius(outerRadius)
                .cornerRadius(this.cornerRadius);
        };
        PieArcComponent.prototype.loadAnimation = function () {
            var node = d3Selection.select(this.element)
                .selectAll('.arc')
                .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
            var calc = this.calculateArc();
            node
                .transition()
                .attrTween('d', function (d) {
                this._current = this._current || d;
                var copyOfD = Object.assign({}, d);
                copyOfD.endAngle = copyOfD.startAngle;
                var interpolater = d3Interpolate.interpolate(copyOfD, copyOfD);
                this._current = interpolater(0);
                return function (t) {
                    return calc(interpolater(t));
                };
            })
                .transition()
                .duration(750)
                .attrTween('d', function (d) {
                this._current = this._current || d;
                var interpolater = d3Interpolate.interpolate(this._current, d);
                this._current = interpolater(0);
                return function (t) {
                    return calc(interpolater(t));
                };
            });
        };
        PieArcComponent.prototype.updateAnimation = function () {
            var node = d3Selection.select(this.element)
                .selectAll('.arc')
                .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
            var calc = this.calculateArc();
            node
                .transition()
                .duration(750)
                .attrTween('d', function (d) {
                this._current = this._current || d;
                var interpolater = d3Interpolate.interpolate(this._current, d);
                this._current = interpolater(0);
                return function (t) {
                    return calc(interpolater(t));
                };
            });
        };
        PieArcComponent.prototype.onClick = function () {
            var _this = this;
            clearTimeout(this._timeout);
            this._timeout = setTimeout(function () { return _this.select.emit(_this.data); }, 200);
        };
        PieArcComponent.prototype.onDblClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this._timeout);
            this.dblclick.emit({
                data: this.data,
                nativeEvent: event
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "fill", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "startAngle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "endAngle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "innerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "outerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "cornerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "value", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "max", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "explodeSlices", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "animate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "pointerEvents", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "isActive", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "deactivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieArcComponent.prototype, "dblclick", void 0);
        PieArcComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-pie-arc]',
                template: "<svg:g class=\"arc-group\">\n  <svg:defs *ngIf=\"gradient\">\n    <svg:g ng-svg-charts-svg-radial-gradient\n      [color]=\"fill\"\n      orientation=\"vertical\"\n      [name]=\"radialGradientId\"\n      [startOpacity]=\"startOpacity\"\n    />\n  </svg:defs>\n  <svg:path\n    [attr.d]=\"path\"\n    class=\"arc\"\n    [class.active]=\"isActive\"\n    [attr.fill]=\"getGradient()\"\n    (click)=\"onClick()\"\n    (dblclick)=\"onDblClick($event)\"\n    (mouseenter)=\"activate.emit(data)\"\n    (mouseleave)=\"deactivate.emit(data)\"\n    [style.pointer-events]=\"getPointerEvents()\"\n  />\n</svg:g>",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], PieArcComponent);
        return PieArcComponent;
    }());

    var PieChartComponent = /** @class */ (function (_super) {
        __extends(PieChartComponent, _super);
        function PieChartComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.labels = false;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = 'right';
            _this.explodeSlices = false;
            _this.doughnut = false;
            _this.arcWidth = 0.25;
            _this.activeEntries = [];
            _this.tooltipDisabled = false;
            _this.trimLabels = true;
            _this.maxLabelLength = 10;
            _this.dblclick = new core.EventEmitter();
            _this.select = new core.EventEmitter();
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [20, 20, 20, 20];
            return _this;
        }
        PieChartComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
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
            var xOffset = this.margin[3] + this.dims.width / 2;
            var yOffset = this.margin[0] + this.dims.height / 2;
            this.translation = "translate(" + xOffset + ", " + yOffset + ")";
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
            this.data = this.results.sort(function (a, b) {
                return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
            });
            this.setColors();
            this.legendOptions = this.getLegendOptions();
        };
        PieChartComponent.prototype.getDomain = function () {
            var items = [];
            this.results.map(function (d) {
                var label = d.name;
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
        };
        PieChartComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        PieChartComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
        };
        PieChartComponent.prototype.getLegendOptions = function () {
            return {
                scaleType: 'ordinal',
                domain: this.domain,
                colors: this.colors,
                title: this.legendTitle,
                position: this.legendPosition
            };
        };
        PieChartComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spread([item], this.activeEntries);
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        PieChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spread(this.activeEntries);
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "labels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "legend", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "legendTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "legendPosition", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "explodeSlices", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "doughnut", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "arcWidth", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], PieChartComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], PieChartComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "labelFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "trimLabels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "maxLabelLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "tooltipText", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "dblclick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieChartComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], PieChartComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], PieChartComponent.prototype, "deactivate", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], PieChartComponent.prototype, "tooltipTemplate", void 0);
        PieChartComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-pie-chart',
                template: "<ng-svg-charts-chart\n  [view]=\"[width, height]\"\n  [showLegend]=\"legend\"\n  [legendOptions]=\"legendOptions\"\n  [activeEntries]=\"activeEntries\"\n  [animations]=\"animations\"\n  (legendLabelActivate)=\"onActivate($event)\"\n  (legendLabelDeactivate)=\"onDeactivate($event)\"\n  (legendLabelClick)=\"onClick($event)\">\n  <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n    <svg:g ng-svg-charts-pie-series\n      [colors]=\"colors\"\n      [series]=\"data\"\n      [showLabels]=\"labels\"\n      [labelFormatting]=\"labelFormatting\"\n      [trimLabels]=\"trimLabels\"\n      [maxLabelLength]=\"maxLabelLength\"\n      [activeEntries]=\"activeEntries\"\n      [innerRadius]=\"innerRadius\"\n      [outerRadius]=\"outerRadius\"\n      [explodeSlices]=\"explodeSlices\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipText]=\"tooltipText\"\n      (dblclick)=\"dblclick.emit($event)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"onActivate($event)\"\n      (deactivate)=\"onDeactivate($event)\"\n    />\n  </svg:g>\n</ng-svg-charts-chart>",
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:750ms ease-in fadeIn;animation:750ms ease-in fadeIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;-webkit-transition:d 750ms;-o-transition:d 750ms;transition:d 750ms}@-webkit-keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}"]
            })
        ], PieChartComponent);
        return PieChartComponent;
    }(BaseChartComponent));

    function gridSize(dims, len, minWidth) {
        var rows = 1;
        var cols = len;
        var width = dims.width;
        if (width > minWidth) {
            while (width / cols < minWidth) {
                rows += 1;
                cols = Math.ceil(len / rows);
            }
        }
        return [cols, rows];
    }
    function gridLayout(dims, data, minWidth, designatedTotal) {
        var xScale = d3Scale.scaleBand();
        var yScale = d3Scale.scaleBand();
        var width = dims.width;
        var height = dims.height;
        var _a = __read(gridSize(dims, data.length, minWidth), 2), columns = _a[0], rows = _a[1];
        var xDomain = [];
        var yDomain = [];
        for (var i = 0; i < rows; i++) {
            yDomain.push(i);
        }
        for (var i = 0; i < columns; i++) {
            xDomain.push(i);
        }
        xScale.domain(xDomain);
        yScale.domain(yDomain);
        xScale.rangeRound([0, width], 0.1);
        yScale.rangeRound([0, height], 0.1);
        var res = [];
        var total = designatedTotal ? designatedTotal : getTotal(data);
        var cardWidth = xScale.bandwidth();
        var cardHeight = yScale.bandwidth();
        for (var i = 0; i < data.length; i++) {
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
            .map(function (d) { return d ? d.value : 0; })
            .reduce(function (sum, val) { return sum + val; }, 0);
    }

    var PieGridComponent = /** @class */ (function (_super) {
        __extends(PieGridComponent, _super);
        function PieGridComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tooltipDisabled = false;
            _this.label = 'Total';
            _this.minWidth = 150;
            _this.margin = [20, 20, 20, 20];
            return _this;
        }
        PieGridComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin
            });
            this.domain = this.getDomain();
            this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
            this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
            this.series = this.getSeries();
            this.setColors();
            this.tooltipText = this.tooltipText || this.defaultTooltipText;
        };
        PieGridComponent.prototype.defaultTooltipText = function (_a) {
            var data = _a.data;
            var label = trimLabel(formatLabel(data.name));
            var val = data.value.toLocaleString();
            return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
        };
        PieGridComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        PieGridComponent.prototype.getSeries = function () {
            var _this = this;
            var total = this.designatedTotal ? this.designatedTotal : this.getTotal();
            return this.data.map(function (d) {
                var baselineLabelHeight = 20;
                var padding = 10;
                var name = d.data.name;
                var label = formatLabel(name);
                var value = d.data.value;
                var radius = (d3Array.min([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
                var innerRadius = radius * 0.9;
                var count = 0;
                var colors = function () {
                    count += 1;
                    if (count === 1) {
                        return 'rgba(100,100,100,0.3)';
                    }
                    else {
                        return _this.colorScale.getColor(label);
                    }
                };
                var xPos = d.x + (d.width - padding) / 2;
                var yPos = d.y + (d.height - baselineLabelHeight) / 2;
                return {
                    transform: "translate(" + xPos + ", " + yPos + ")",
                    colors: colors,
                    innerRadius: innerRadius,
                    outerRadius: radius,
                    name: name,
                    label: trimLabel(label),
                    total: value,
                    value: value,
                    percent: d3Format.format('.1%')(d.data.percent),
                    data: [d, {
                            data: {
                                other: true,
                                value: total - value,
                                name: d.data.name
                            }
                        }]
                };
            });
        };
        PieGridComponent.prototype.getTotal = function () {
            return this.results
                .map(function (d) { return d.value; })
                .reduce(function (sum, d) { return sum + d; }, 0);
        };
        PieGridComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        PieGridComponent.prototype.setColors = function () {
            this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], PieGridComponent.prototype, "designatedTotal", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], PieGridComponent.prototype, "tooltipText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridComponent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridComponent.prototype, "minWidth", void 0);
        __decorate([
            core.ContentChild('tooltipTemplate'),
            __metadata("design:type", core.TemplateRef)
        ], PieGridComponent.prototype, "tooltipTemplate", void 0);
        PieGridComponent = __decorate([
            core.Component({
                selector: 'ng-svg-charts-pie-grid',
                template: 'pie-grid.template.html',
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".ng-svg-charts{float:left;overflow:visible}.ng-svg-charts .arc,.ng-svg-charts .bar,.ng-svg-charts .circle{pointer-events:fill;cursor:pointer}.ng-svg-charts .arc.active,.ng-svg-charts .arc:hover,.ng-svg-charts .bar.active,.ng-svg-charts .bar:hover,.ng-svg-charts .card.active,.ng-svg-charts .card:hover,.ng-svg-charts .cell.active,.ng-svg-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ng-svg-charts .arc:focus,.ng-svg-charts .bar:focus,.ng-svg-charts .card:focus,.ng-svg-charts .cell:focus,.ng-svg-charts g:focus{outline:0}.ng-svg-charts .area-series.inactive,.ng-svg-charts .line-series-range.inactive,.ng-svg-charts .line-series.inactive,.ng-svg-charts .polar-series-area.inactive,.ng-svg-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ng-svg-charts .line-highlight{display:none}.ng-svg-charts .line-highlight.active{display:block}.ng-svg-charts .area{opacity:.6}.ng-svg-charts .circle:hover{cursor:pointer}.ng-svg-charts .label{font-size:12px;font-weight:400}.ng-svg-charts .tooltip-anchor{fill:#000}.ng-svg-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ng-svg-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ng-svg-charts .refline-label{font-size:9px}.ng-svg-charts .reference-area{fill-opacity:.05;fill:#000}.ng-svg-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ng-svg-charts .grid-panel rect{fill:none}.ng-svg-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}"]
            })
        ], PieGridComponent);
        return PieGridComponent;
    }(BaseChartComponent));

    var PieGridSeriesComponent = /** @class */ (function () {
        function PieGridSeriesComponent(element) {
            this.innerRadius = 70;
            this.outerRadius = 80;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.element = element.nativeElement;
        }
        PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieGridSeriesComponent.prototype.update = function () {
            this.layout = d3Shape.pie()
                .value(function (d) { return d.data.value; }).sort(null);
            this.arcs = this.getArcs();
        };
        PieGridSeriesComponent.prototype.getArcs = function () {
            var _this = this;
            return this.layout(this.data).map(function (arc, index) {
                var label = arc.data.data.name;
                var other = arc.data.data.other;
                if (index === 0) {
                    arc.startAngle = 0;
                }
                var color = _this.colors(label);
                return {
                    data: arc.data.data,
                    class: 'arc ' + 'arc' + index,
                    fill: color,
                    startAngle: other ? 0 : arc.startAngle,
                    endAngle: arc.endAngle,
                    animate: _this.animations && !other,
                    pointerEvents: !other
                };
            });
        };
        PieGridSeriesComponent.prototype.onClick = function (data) {
            this.select.emit({
                name: this.data[0].data.name,
                value: this.data[0].data.value
            });
        };
        PieGridSeriesComponent.prototype.trackBy = function (index, item) {
            return item.data.name;
        };
        PieGridSeriesComponent.prototype.label = function (arc) {
            return arc.data.name;
        };
        PieGridSeriesComponent.prototype.color = function (arc) {
            return this.colors(this.label(arc));
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridSeriesComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridSeriesComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridSeriesComponent.prototype, "innerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridSeriesComponent.prototype, "outerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieGridSeriesComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieGridSeriesComponent.prototype, "select", void 0);
        PieGridSeriesComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-pie-grid-series]',
                template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g ng-svg-charts-pie-arc *ngFor=\"let arc of arcs; trackBy:trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\">\n      </svg:g>\n    </svg:g>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], PieGridSeriesComponent);
        return PieGridSeriesComponent;
    }());

    var PieSeriesComponent = /** @class */ (function () {
        function PieSeriesComponent() {
            this.series = [];
            this.innerRadius = 60;
            this.outerRadius = 80;
            this.trimLabels = true;
            this.maxLabelLength = 10;
            this.tooltipDisabled = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dblclick = new core.EventEmitter();
        }
        PieSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieSeriesComponent.prototype.update = function () {
            var pieGenerator = d3Shape.pie()
                .value(function (d) { return d.value; })
                .sort(null);
            var arcData = pieGenerator(this.series);
            this.max = d3Array.max(arcData, function (d) {
                return d.value;
            });
            this.data = this.calculateLabelPositions(arcData);
            this.tooltipText = this.tooltipText || this.defaultTooltipText;
        };
        PieSeriesComponent.prototype.midAngle = function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        };
        PieSeriesComponent.prototype.outerArc = function () {
            var factor = 1.5;
            return d3Shape.arc()
                .innerRadius(this.outerRadius * factor)
                .outerRadius(this.outerRadius * factor);
        };
        PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
            var _this = this;
            var factor = 1.5;
            var minDistance = 10;
            var labelPositions = pieData;
            labelPositions.forEach(function (d) {
                d.pos = _this.outerArc().centroid(d);
                d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
            });
            for (var i = 0; i < labelPositions.length - 1; i++) {
                var a = labelPositions[i];
                if (!this.labelVisible(a)) {
                    continue;
                }
                for (var j = i + 1; j < labelPositions.length; j++) {
                    var b = labelPositions[j];
                    if (!this.labelVisible(b)) {
                        continue;
                    }
                    // if they're on the same side
                    if (b.pos[0] * a.pos[0] > 0) {
                        // if they're overlapping
                        var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                        if (o > 0) {
                            // push the second up or down
                            b.pos[1] += Math.sign(b.pos[0]) * o;
                        }
                    }
                }
            }
            return labelPositions;
        };
        PieSeriesComponent.prototype.labelVisible = function (myArc) {
            return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
        };
        PieSeriesComponent.prototype.getTooltipTitle = function (a) {
            return this.tooltipTemplate ? undefined : this.tooltipText(a);
        };
        PieSeriesComponent.prototype.labelText = function (myArc) {
            if (this.labelFormatting) {
                return this.labelFormatting(myArc.data.name);
            }
            return this.label(myArc);
        };
        PieSeriesComponent.prototype.label = function (myArc) {
            return formatLabel(myArc.data.name);
        };
        PieSeriesComponent.prototype.defaultTooltipText = function (myArc) {
            var label = this.label(myArc);
            var val = formatLabel(myArc.data.value);
            return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
        };
        PieSeriesComponent.prototype.color = function (myArc) {
            return this.colors.getColor(this.label(myArc));
        };
        PieSeriesComponent.prototype.trackBy = function (index, item) {
            return item.data.name;
        };
        PieSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        PieSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name && entry.series === d.series;
            });
            return item !== undefined;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "colors", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "series", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "dims", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "innerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "outerRadius", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "explodeSlices", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "showLabels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], PieSeriesComponent.prototype, "gradient", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], PieSeriesComponent.prototype, "activeEntries", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "labelFormatting", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "trimLabels", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "maxLabelLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], PieSeriesComponent.prototype, "tooltipText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "animations", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "select", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "activate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "deactivate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PieSeriesComponent.prototype, "dblclick", void 0);
        PieSeriesComponent = __decorate([
            core.Component({
                selector: 'g[ng-svg-charts-pie-series]',
                template: "<svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n  <svg:g ng-svg-charts-pie-label\n    *ngIf=\"labelVisible(arc)\"\n    [data]=\"arc\"\n    [radius]=\"outerRadius\"\n    [color]=\"color(arc)\"\n    [label]=\"labelText(arc)\"\n    [labelTrim]=\"trimLabels\"\n    [labelTrimSize]=\"maxLabelLength\"\n    [max]=\"max\"\n    [value]=\"arc.value\"\n    [explodeSlices]=\"explodeSlices\"\n    [animations]=\"animations\">\n  </svg:g>\n  <svg:g\n    ng-svg-charts-pie-arc\n    [startAngle]=\"arc.startAngle\"\n    [endAngle]=\"arc.endAngle\"\n    [innerRadius]=\"innerRadius\"\n    [outerRadius]=\"outerRadius\"\n    [fill]=\"color(arc)\"\n    [value]=\"arc.data.value\"\n    [gradient]=\"gradient\"\n    [data]=\"arc.data\"\n    [max]=\"max\"\n    [explodeSlices]=\"explodeSlices\"\n    [isActive]=\"isActive(arc.data)\"\n    [animate]=\"animations\"\n    (select)=\"onClick($event)\"\n    (activate)=\"activate.emit($event)\"\n    (deactivate)=\"deactivate.emit($event)\"\n    (dblclick)=\"dblclick.emit($event)\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'top'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipTitle]=\"getTooltipTitle(arc)\"\n    [tooltipTemplate]=\"tooltipTemplate\"\n    [tooltipContext]=\"arc.data\">\n  </svg:g>\n</svg:g>",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            })
        ], PieSeriesComponent);
        return PieSeriesComponent;
    }());

    var PieChartModule = /** @class */ (function () {
        function PieChartModule() {
        }
        PieChartModule = __decorate([
            core.NgModule({
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
        return PieChartModule;
    }());

    // import { TreeMapModule } from './tree-map/tree-map.module';
    // import { GaugeModule } from './gauge/gauge.module';
    var SvgChartsModule = /** @class */ (function () {
        function SvgChartsModule() {
        }
        SvgChartsModule = __decorate([
            core.NgModule({
                exports: [
                    ChartCommonModule,
                    AreaChartModule,
                    BarChartModule,
                    // BubbleChartModule,
                    // HeatMapModule,
                    LineChartModule,
                    // PolarChartModule,
                    // NumberCardModule,
                    PieChartModule,
                ]
            })
        ], SvgChartsModule);
        return SvgChartsModule;
    }());

    function tickFormat(fieldType, groupByType) {
        return function (label) {
            if (label === 'No Value' || label === 'Other') {
                return label;
            }
            if (fieldType === 'date' && groupByType === 'groupBy') {
                var formatter = d3TimeFormat.timeFormat('MM/DD/YYYY');
                return formatter(label);
            }
            return label.toString();
        };
    }

    exports.AdvancedLegendComponent = AdvancedLegendComponent;
    exports.AdvancedPieChartComponent = AdvancedPieChartComponent;
    exports.AreaChartComponent = AreaChartComponent;
    exports.AreaChartModule = AreaChartModule;
    exports.AreaChartNormalizedComponent = AreaChartNormalizedComponent;
    exports.AreaChartStackedComponent = AreaChartStackedComponent;
    exports.AreaComponent = AreaComponent;
    exports.AreaSeriesComponent = AreaSeriesComponent;
    exports.AxesModule = AxesModule;
    exports.AxisLabelComponent = AxisLabelComponent;
    exports.BarChartModule = BarChartModule;
    exports.BarComponent = BarComponent;
    exports.BarHorizontal2DComponent = BarHorizontal2DComponent;
    exports.BarHorizontalComponent = BarHorizontalComponent;
    exports.BarHorizontalNormalizedComponent = BarHorizontalNormalizedComponent;
    exports.BarHorizontalStackedComponent = BarHorizontalStackedComponent;
    exports.BarLabelComponent = BarLabelComponent;
    exports.BarVertical2DComponent = BarVertical2DComponent;
    exports.BarVerticalComponent = BarVerticalComponent;
    exports.BarVerticalNormalizedComponent = BarVerticalNormalizedComponent;
    exports.BarVerticalStackedComponent = BarVerticalStackedComponent;
    exports.BaseChartComponent = BaseChartComponent;
    exports.ChartCommonModule = ChartCommonModule;
    exports.ChartComponent = ChartComponent;
    exports.CircleComponent = CircleComponent;
    exports.CircleSeriesComponent = CircleSeriesComponent;
    exports.ColorHelper = ColorHelper;
    exports.CountUpDirective = CountUpDirective;
    exports.GridPanelComponent = GridPanelComponent;
    exports.GridPanelSeriesComponent = GridPanelSeriesComponent;
    exports.LegendComponent = LegendComponent;
    exports.LegendEntryComponent = LegendEntryComponent;
    exports.LineChartComponent = LineChartComponent;
    exports.LineChartModule = LineChartModule;
    exports.LineComponent = LineComponent;
    exports.LineSeriesComponent = LineSeriesComponent;
    exports.PieArcComponent = PieArcComponent;
    exports.PieChartComponent = PieChartComponent;
    exports.PieChartModule = PieChartModule;
    exports.PieGridComponent = PieGridComponent;
    exports.PieLabelComponent = PieLabelComponent;
    exports.PieSeriesComponent = PieSeriesComponent;
    exports.ScaleLegendComponent = ScaleLegendComponent;
    exports.SeriesHorizontalComponent = SeriesHorizontalComponent;
    exports.SeriesVerticalComponent = SeriesVerticalComponent;
    exports.SvgChartsModule = SvgChartsModule;
    exports.SvgLinearGradientComponent = SvgLinearGradientComponent;
    exports.SvgRadialGradientComponent = SvgRadialGradientComponent;
    exports.TimelineComponent = TimelineComponent;
    exports.TooltipAreaComponent = TooltipAreaComponent;
    exports.TooltipContentComponent = TooltipContentComponent;
    exports.TooltipDirective = TooltipDirective;
    exports.TooltipModule = TooltipModule;
    exports.TooltipService = TooltipService;
    exports.XAxisComponent = XAxisComponent;
    exports.XAxisTicksComponent = XAxisTicksComponent;
    exports.YAxisComponent = YAxisComponent;
    exports.YAxisTicksComponent = YAxisTicksComponent;
    exports.calculateViewDimensions = calculateViewDimensions;
    exports.count = count;
    exports.decimalChecker = decimalChecker;
    exports.formatLabel = formatLabel;
    exports.getScaleType = getScaleType;
    exports.getUniqueXDomainValues = getUniqueXDomainValues;
    exports.gridLayout = gridLayout;
    exports.gridSize = gridSize;
    exports.reduceTicks = reduceTicks;
    exports.tickFormat = tickFormat;
    exports.trimLabel = trimLabel;
    exports.ɵa = throttleable;
    exports.ɵb = InjectionRegistery;
    exports.ɵc = InjectionService;
    exports.ɵd = PieGridSeriesComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=try-svg-chart.umd.js.map
