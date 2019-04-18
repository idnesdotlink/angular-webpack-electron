import { __decorate, __metadata } from 'tslib';
import { HostBinding, Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ContentChildren, QueryList, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, Subject, merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

let TdBreadcrumbComponent = class TdBreadcrumbComponent {
    constructor(_elementRef, _changeDetectorRef) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._displayCrumb = true;
        this._width = 0;
        // Sets the icon url shown between breadcrumbs. Defaults to 'chevron_right'
        this.separatorIcon = 'chevron_right';
        // Should show the right chevron or not before the label
        this._displayIcon = true;
    }
    get displayCrumb() {
        return this._displayCrumb;
    }
    /**
     * Whether to display the crumb or not
     */
    set displayCrumb(shouldDisplay) {
        this._displayCrumb = shouldDisplay;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Width of the DOM element of the crumb
     */
    get width() {
        return this._width;
    }
    /**
     * Gets the display style of the crumb
     */
    get displayBinding() {
        // Set the display to none on the component, just in case the end user is hiding
        // and showing them instead of the component doing itself for reasons like responsive
        return this._displayCrumb ? undefined : 'none';
    }
    ngAfterViewInit() {
        // set the width from the actual rendered DOM element
        setTimeout(() => {
            this._width = this._elementRef.nativeElement.getBoundingClientRect().width;
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * Stop click propagation when clicking on icon
     */
    _handleIconClick(event) {
        event.stopPropagation();
        event.preventDefault();
    }
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

let TdBreadcrumbsComponent = class TdBreadcrumbsComponent {
    constructor(_elementRef, _changeDetectorRef) {
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
    ngOnInit() {
        this._resizeSubscription = merge(fromEvent(window, 'resize').pipe(debounceTime(10)), this._widthSubject.asObservable().pipe(distinctUntilChanged())).subscribe(() => {
            if (!this._resizing) {
                this._resizing = true;
                setTimeout(() => {
                    this._calculateVisibility();
                    this._resizing = false;
                    this._changeDetectorRef.markForCheck();
                }, 100);
            }
        });
    }
    ngDoCheck() {
        if (this._elementRef && this._elementRef.nativeElement) {
            this._widthSubject.next(this.nativeElementWidth);
        }
    }
    ngAfterContentInit() {
        this.setCrumbIcons();
        this._changeDetectorRef.markForCheck();
    }
    ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
    }
    /*
    * Current width of the element container
    */
    get nativeElementWidth() {
        let element = this._elementRef.nativeElement;
        // Need to take into account border, margin and padding that might be around all the crumbs
        let style = window.getComputedStyle(element);
        let borderLeft = parseInt(style.borderLeft, 10);
        let borderRight = parseInt(style.borderRight, 10);
        let marginLeft = parseInt(style.marginLeft, 10);
        let marginRight = parseInt(style.marginRight, 10);
        let paddingLeft = parseInt(style.paddingLeft, 10);
        let paddingRight = parseInt(style.paddingRight, 10);
        return element.getBoundingClientRect().width - borderLeft - borderRight - marginLeft - marginRight - paddingLeft - paddingRight;
    }
    /**
     * The total count of individual breadcrumbs
     */
    get count() {
        return this._breadcrumbs ? this._breadcrumbs.length : 0;
    }
    /**
     * Set the crumb icon separators
     */
    setCrumbIcons() {
        let breadcrumbArray = this._breadcrumbs.toArray();
        if (breadcrumbArray.length > 0) {
            // don't show the icon on the last breadcrumb
            breadcrumbArray[breadcrumbArray.length - 1]._displayIcon = false;
        }
        breadcrumbArray.forEach((breadcrumb) => {
            breadcrumb.separatorIcon = this.separatorIcon;
        });
    }
    _calculateVisibility() {
        let crumbsArray = this._breadcrumbs.toArray();
        let crumbWidthSum = 0;
        let hiddenCrumbs = [];
        // loop through crumbs in reverse order to calculate which ones should be removed
        for (let i = crumbsArray.length - 1; i >= 0; i--) {
            let breadcrumb = crumbsArray[i];
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
    }
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

let CovalentBreadcrumbsModule = class CovalentBreadcrumbsModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { CovalentBreadcrumbsModule, TdBreadcrumbsComponent, TdBreadcrumbComponent as ɵa };
//# sourceMappingURL=try-tbreadcrumb.js.map
