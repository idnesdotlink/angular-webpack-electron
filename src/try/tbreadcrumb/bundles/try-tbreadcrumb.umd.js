(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/icon'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@try/tbreadcrumb', ['exports', '@angular/core', '@angular/common', '@angular/material/icon', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.try = global.try || {}, global.try.tbreadcrumb = {}), global.ng.core, global.ng.common, global.ng.material.icon, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, common, icon, rxjs, operators) { 'use strict';

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



    function __decorate(decorators, target, key, desc) {

        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);

        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;

        return c > 3 && r && Object.defineProperty(target, key, r), r;

    }



    function __metadata(metadataKey, metadataValue) {

        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);

    }

    var TdBreadcrumbComponent = /** @class */ (function () {
        function TdBreadcrumbComponent(_elementRef, _changeDetectorRef) {
            this._elementRef = _elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this._displayCrumb = true;
            this._width = 0;
            // Sets the icon url shown between breadcrumbs. Defaults to 'chevron_right'
            this.separatorIcon = 'chevron_right';
            // Should show the right chevron or not before the label
            this._displayIcon = true;
        }
        Object.defineProperty(TdBreadcrumbComponent.prototype, "displayCrumb", {
            get: function () {
                return this._displayCrumb;
            },
            /**
             * Whether to display the crumb or not
             */
            set: function (shouldDisplay) {
                this._displayCrumb = shouldDisplay;
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdBreadcrumbComponent.prototype, "width", {
            /**
             * Width of the DOM element of the crumb
             */
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdBreadcrumbComponent.prototype, "displayBinding", {
            /**
             * Gets the display style of the crumb
             */
            get: function () {
                // Set the display to none on the component, just in case the end user is hiding
                // and showing them instead of the component doing itself for reasons like responsive
                return this._displayCrumb ? undefined : 'none';
            },
            enumerable: true,
            configurable: true
        });
        TdBreadcrumbComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // set the width from the actual rendered DOM element
            setTimeout(function () {
                _this._width = _this._elementRef.nativeElement.getBoundingClientRect().width;
                _this._changeDetectorRef.markForCheck();
            });
        };
        /**
         * Stop click propagation when clicking on icon
         */
        TdBreadcrumbComponent.prototype._handleIconClick = function (event) {
            event.stopPropagation();
            event.preventDefault();
        };
        __decorate([
            core.HostBinding('style.display'),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], TdBreadcrumbComponent.prototype, "displayBinding", null);
        TdBreadcrumbComponent = __decorate([
            core.Component({
                selector: 'td-breadcrumb, a[td-breadcrumb]',
                template: "<ng-content></ng-content>\n<mat-icon *ngIf=\"_displayIcon\"\n          class=\"td-breadcrumb-separator-icon\"\n          [style.cursor]=\"'default'\"\n          (click)=\"_handleIconClick($event)\">\n  {{separatorIcon}}\n</mat-icon>\n",
                /* tslint:disable-next-line */
                host: {
                    class: 'mat-button td-breadcrumb',
                },
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [":host.td-breadcrumb{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}:host.td-breadcrumb ::ng-deep>*{margin:0 10px}:host .td-breadcrumb-separator-icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}:host.mat-button{min-width:0;padding:0}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.ChangeDetectorRef])
        ], TdBreadcrumbComponent);
        return TdBreadcrumbComponent;
    }());

    var TdBreadcrumbsComponent = /** @class */ (function () {
        function TdBreadcrumbsComponent(_elementRef, _changeDetectorRef) {
            this._elementRef = _elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this._resizeSubscription = rxjs.Subscription.EMPTY;
            this._widthSubject = new rxjs.Subject();
            this._resizing = false;
            // the list of hidden breadcrumbs not shown right now (responsive)
            this.hiddenBreadcrumbs = [];
            /**
             * Sets the icon url shown between breadcrumbs. Defaults to 'chevron_right'.
             */
            this.separatorIcon = 'chevron_right';
        }
        TdBreadcrumbsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this._resizeSubscription = rxjs.merge(rxjs.fromEvent(window, 'resize').pipe(operators.debounceTime(10)), this._widthSubject.asObservable().pipe(operators.distinctUntilChanged())).subscribe(function () {
                if (!_this._resizing) {
                    _this._resizing = true;
                    setTimeout(function () {
                        _this._calculateVisibility();
                        _this._resizing = false;
                        _this._changeDetectorRef.markForCheck();
                    }, 100);
                }
            });
        };
        TdBreadcrumbsComponent.prototype.ngDoCheck = function () {
            if (this._elementRef && this._elementRef.nativeElement) {
                this._widthSubject.next(this.nativeElementWidth);
            }
        };
        TdBreadcrumbsComponent.prototype.ngAfterContentInit = function () {
            this.setCrumbIcons();
            this._changeDetectorRef.markForCheck();
        };
        TdBreadcrumbsComponent.prototype.ngOnDestroy = function () {
            this._resizeSubscription.unsubscribe();
        };
        Object.defineProperty(TdBreadcrumbsComponent.prototype, "nativeElementWidth", {
            /*
            * Current width of the element container
            */
            get: function () {
                var element = this._elementRef.nativeElement;
                // Need to take into account border, margin and padding that might be around all the crumbs
                var style = window.getComputedStyle(element);
                var borderLeft = parseInt(style.borderLeft, 10);
                var borderRight = parseInt(style.borderRight, 10);
                var marginLeft = parseInt(style.marginLeft, 10);
                var marginRight = parseInt(style.marginRight, 10);
                var paddingLeft = parseInt(style.paddingLeft, 10);
                var paddingRight = parseInt(style.paddingRight, 10);
                return element.getBoundingClientRect().width - borderLeft - borderRight - marginLeft - marginRight - paddingLeft - paddingRight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TdBreadcrumbsComponent.prototype, "count", {
            /**
             * The total count of individual breadcrumbs
             */
            get: function () {
                return this._breadcrumbs ? this._breadcrumbs.length : 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Set the crumb icon separators
         */
        TdBreadcrumbsComponent.prototype.setCrumbIcons = function () {
            var _this = this;
            var breadcrumbArray = this._breadcrumbs.toArray();
            if (breadcrumbArray.length > 0) {
                // don't show the icon on the last breadcrumb
                breadcrumbArray[breadcrumbArray.length - 1]._displayIcon = false;
            }
            breadcrumbArray.forEach(function (breadcrumb) {
                breadcrumb.separatorIcon = _this.separatorIcon;
            });
        };
        TdBreadcrumbsComponent.prototype._calculateVisibility = function () {
            var crumbsArray = this._breadcrumbs.toArray();
            var crumbWidthSum = 0;
            var hiddenCrumbs = [];
            // loop through crumbs in reverse order to calculate which ones should be removed
            for (var i = crumbsArray.length - 1; i >= 0; i--) {
                var breadcrumb = crumbsArray[i];
                // if crumb exceeds width, then we skip it from the sum and add it into the hiddencrumbs array
                // and hide it
                if ((crumbWidthSum + breadcrumb.width) > this.nativeElementWidth) {
                    breadcrumb.displayCrumb = false;
                    hiddenCrumbs.push(breadcrumb);
                }
                else {
                    // else we show it
                    breadcrumb.displayCrumb = true;
                }
                crumbWidthSum += breadcrumb.width;
            }
            this.hiddenBreadcrumbs = hiddenCrumbs;
            this._changeDetectorRef.markForCheck();
        };
        __decorate([
            core.ContentChildren(TdBreadcrumbComponent),
            __metadata("design:type", core.QueryList)
        ], TdBreadcrumbsComponent.prototype, "_breadcrumbs", void 0);
        __decorate([
            core.Input('separatorIcon'),
            __metadata("design:type", String)
        ], TdBreadcrumbsComponent.prototype, "separatorIcon", void 0);
        TdBreadcrumbsComponent = __decorate([
            core.Component({
                selector: 'td-breadcrumbs',
                template: "<ng-content></ng-content>\n",
                /* tslint:disable-next-line */
                host: {
                    class: 'td-breadcrumbs',
                },
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;width:100%}:host.td-breadcrumbs{white-space:nowrap}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.ChangeDetectorRef])
        ], TdBreadcrumbsComponent);
        return TdBreadcrumbsComponent;
    }());

    var CovalentBreadcrumbsModule = /** @class */ (function () {
        function CovalentBreadcrumbsModule() {
        }
        CovalentBreadcrumbsModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    icon.MatIconModule,
                ],
                declarations: [
                    TdBreadcrumbsComponent,
                    TdBreadcrumbComponent,
                ],
                exports: [
                    TdBreadcrumbsComponent,
                    TdBreadcrumbComponent,
                ],
            })
        ], CovalentBreadcrumbsModule);
        return CovalentBreadcrumbsModule;
    }());

    exports.CovalentBreadcrumbsModule = CovalentBreadcrumbsModule;
    exports.TdBreadcrumbsComponent = TdBreadcrumbsComponent;
    exports.ɵa = TdBreadcrumbComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=try-tbreadcrumb.umd.js.map
