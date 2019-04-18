import { __decorate, __metadata } from 'tslib';
import { HostBinding, Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ContentChildren, QueryList, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { merge, fromEvent, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
        HostBinding('style.display'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], TdBreadcrumbComponent.prototype, "displayBinding", null);
    TdBreadcrumbComponent = __decorate([
        Component({
            selector: 'td-breadcrumb, a[td-breadcrumb]',
            template: "<ng-content></ng-content>\n<mat-icon *ngIf=\"_displayIcon\"\n          class=\"td-breadcrumb-separator-icon\"\n          [style.cursor]=\"'default'\"\n          (click)=\"_handleIconClick($event)\">\n  {{separatorIcon}}\n</mat-icon>\n",
            /* tslint:disable-next-line */
            host: {
                class: 'mat-button td-breadcrumb',
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host.td-breadcrumb{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}:host.td-breadcrumb ::ng-deep>*{margin:0 10px}:host .td-breadcrumb-separator-icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}:host.mat-button{min-width:0;padding:0}"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef])
    ], TdBreadcrumbComponent);
    return TdBreadcrumbComponent;
}());

var TdBreadcrumbsComponent = /** @class */ (function () {
    function TdBreadcrumbsComponent(_elementRef, _changeDetectorRef) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._resizeSubscription = Subscription.EMPTY;
        this._widthSubject = new Subject();
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
        this._resizeSubscription = merge(fromEvent(window, 'resize').pipe(debounceTime(10)), this._widthSubject.asObservable().pipe(distinctUntilChanged())).subscribe(function () {
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
        ContentChildren(TdBreadcrumbComponent),
        __metadata("design:type", QueryList)
    ], TdBreadcrumbsComponent.prototype, "_breadcrumbs", void 0);
    __decorate([
        Input('separatorIcon'),
        __metadata("design:type", String)
    ], TdBreadcrumbsComponent.prototype, "separatorIcon", void 0);
    TdBreadcrumbsComponent = __decorate([
        Component({
            selector: 'td-breadcrumbs',
            template: "<ng-content></ng-content>\n",
            /* tslint:disable-next-line */
            host: {
                class: 'td-breadcrumbs',
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block;width:100%}:host.td-breadcrumbs{white-space:nowrap}"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef])
    ], TdBreadcrumbsComponent);
    return TdBreadcrumbsComponent;
}());

var CovalentBreadcrumbsModule = /** @class */ (function () {
    function CovalentBreadcrumbsModule() {
    }
    CovalentBreadcrumbsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MatIconModule,
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

/**
 * Generated bundle index. Do not edit.
 */

export { CovalentBreadcrumbsModule, TdBreadcrumbsComponent, TdBreadcrumbComponent as ɵa };
//# sourceMappingURL=try-tbreadcrumb.js.map
