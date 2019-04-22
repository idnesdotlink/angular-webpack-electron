import * as tslib_1 from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ElementRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { getPointFromEvent, getPixelSize, getInputBoolean, isValidTotalSize } from '../utils';
/**
 * angular-split
 *
 * Areas size are set in percentage of the split container.
 * Gutters size are set in pixels.
 *
 * So we set css 'flex-basis' property like this (where 0 <= area.size <= 1):
 *  calc( { area.size * 100 }% - { area.size * nbGutter * gutterSize }px );
 *
 * Examples with 3 visible areas and 2 gutters:
 *
 * |                     10px                   10px                                  |
 * |---------------------[]---------------------[]------------------------------------|
 * |  calc(20% - 4px)          calc(20% - 4px)              calc(60% - 12px)          |
 *
 *
 * |                          10px                        10px                        |
 * |--------------------------[]--------------------------[]--------------------------|
 * |  calc(33.33% - 6.667px)      calc(33.33% - 6.667px)      calc(33.33% - 6.667px)  |
 *
 *
 * |10px                                                  10px                        |
 * |[]----------------------------------------------------[]--------------------------|
 * |0                 calc(66.66% - 13.333px)                  calc(33%% - 6.667px)   |
 *
 *
 *  10px 10px                                                                         |
 * |[][]------------------------------------------------------------------------------|
 * |0 0                               calc(100% - 20px)                               |
 *
 */
let SplitComponent = class SplitComponent {
    constructor(ngZone, elRef, cdRef, renderer) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this._direction = 'horizontal';
        ////
        this._gutterSize = 11;
        ////
        this._useTransition = false;
        ////
        this._disabled = false;
        ////
        this._dir = 'ltr';
        this.dragProgressSubject = new Subject();
        this.dragProgress$ = this.dragProgressSubject.asObservable();
        ////
        this.isDragging = false;
        this.currentGutterNum = 0;
        this.startPoint = null;
        this.endPoint = null;
        this.displayedAreas = [];
        this.hidedAreas = [];
        this.dragListeners = [];
        this.dragStartValues = {
            sizePixelContainer: 0,
            sizePixelA: 0,
            sizePixelB: 0,
            sizePercentA: 0,
            sizePercentB: 0,
        };
        // To force adding default class, could be override by user @Input() or not
        this.direction = this._direction;
    }
    set direction(v) {
        this._direction = (v === 'vertical') ? 'vertical' : 'horizontal';
        this.renderer.addClass(this.elRef.nativeElement, `is-${this._direction}`);
        this.renderer.removeClass(this.elRef.nativeElement, `is-${(this._direction === 'vertical') ? 'horizontal' : 'vertical'}`);
        this.build(false, false);
    }
    get direction() {
        return this._direction;
    }
    set gutterSize(v) {
        v = Number(v);
        this._gutterSize = (!isNaN(v) && v > 0) ? v : 11;
        this.build(false, false);
    }
    get gutterSize() {
        return this._gutterSize;
    }
    set useTransition(v) {
        this._useTransition = getInputBoolean(v);
        if (this._useTransition)
            this.renderer.addClass(this.elRef.nativeElement, 'is-transition');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'is-transition');
    }
    get useTransition() {
        return this._useTransition;
    }
    set disabled(v) {
        this._disabled = getInputBoolean(v);
        if (this._disabled)
            this.renderer.addClass(this.elRef.nativeElement, 'is-disabled');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'is-disabled');
    }
    get disabled() {
        return this._disabled;
    }
    set dir(v) {
        v = (v === 'rtl') ? 'rtl' : 'ltr';
        this._dir = v;
        this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
    }
    get dir() {
        return this._dir;
    }
    get dragStart() {
        return new Observable(subscriber => this.dragStartSubscriber = subscriber);
    }
    get dragEnd() {
        return new Observable(subscriber => this.dragEndSubscriber = subscriber);
    }
    get gutterClick() {
        return new Observable(subscriber => this.gutterClickSubscriber = subscriber);
    }
    get transitionEnd() {
        return new Observable(subscriber => this.transitionEndSubscriber = subscriber).pipe(debounceTime(20));
    }
    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            // To avoid transition at first rendering
            setTimeout(() => this.renderer.addClass(this.elRef.nativeElement, 'is-init'));
        });
    }
    getNbGutters() {
        return (this.displayedAreas.length === 0) ? 0 : this.displayedAreas.length - 1;
    }
    addArea(component) {
        const newArea = {
            component,
            order: 0,
            size: 0,
        };
        if (component.visible === true) {
            this.displayedAreas.push(newArea);
            this.build(true, true);
        }
        else {
            this.hidedAreas.push(newArea);
        }
    }
    removeArea(component) {
        let area;
        if (this.displayedAreas.some(a => a.component === component)) {
            area = this.displayedAreas.find(a => a.component === component);
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some(a => a.component === component)) {
            area = this.hidedAreas.find(a => a.component === component);
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    }
    updateArea(component, resetOrders, resetSizes) {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')
        const area = this.displayedAreas.find(a => a.component === component);
        if (!area) {
            return;
        }
        this.build(resetOrders, resetSizes);
    }
    showArea(component) {
        const area = this.hidedAreas.find(a => a.component === component);
        if (!area) {
            return;
        }
        const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        this.displayedAreas.push(...areas);
        this.build(true, true);
    }
    hideArea(comp) {
        const area = this.displayedAreas.find(a => a.component === comp);
        if (!area) {
            return;
        }
        const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
        areas.forEach(area => {
            area.order = 0;
            area.size = 0;
        });
        this.hidedAreas.push(...areas);
        this.build(true, true);
    }
    getVisibleAreaSizes() {
        return this.displayedAreas.map(a => a.size * 100);
    }
    setVisibleAreaSizes(sizes) {
        if (sizes.length !== this.displayedAreas.length) {
            return false;
        }
        sizes = sizes.map(s => s / 100);
        const total = sizes.reduce((total, v) => total + v, 0);
        if (!isValidTotalSize(total)) {
            return false;
        }
        this.displayedAreas.forEach((area, i) => {
            // @ts-ignore
            area.component._size = sizes[i];
        });
        this.build(false, true);
        return true;
    }
    build(resetOrders, resetSizes) {
        this.stopDragging();
        // ¤ AREAS ORDER
        if (resetOrders === true) {
            // If user provided 'order' for each area, use it to sort them.
            if (this.displayedAreas.every(a => a.component.order !== null)) {
                this.displayedAreas.sort((a, b) => a.component.order - b.component.order);
            }
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach((area, i) => {
                area.order = i * 2;
                area.component.setStyleOrder(area.order);
            });
        }
        // ¤ AREAS SIZE PERCENT
        if (resetSizes === true) {
            const totalUserSize = this.displayedAreas.reduce((total, s) => s.component.size ? total + s.component.size : total, 0);
            // If user provided 'size' for each area and total == 1, use it.
            if (this.displayedAreas.every(a => a.component.size !== null) && isValidTotalSize(totalUserSize)) {
                this.displayedAreas.forEach(area => {
                    area.size = area.component.size;
                });
            }
            // Else set equal sizes for all areas.
            else {
                const size = 1 / this.displayedAreas.length;
                this.displayedAreas.forEach(area => {
                    area.size = size;
                });
            }
        }
        // ¤
        // If some real area sizes are less than gutterSize,
        // set them to zero and dispatch size to others.
        let percentToDispatch = 0;
        // Get container pixel size
        const containerSizePixel = getPixelSize(this.elRef, this.direction);
        this.displayedAreas.forEach(area => {
            if (area.size * containerSizePixel < this.gutterSize) {
                percentToDispatch += area.size;
                area.size = 0;
            }
        });
        if (percentToDispatch > 0 && this.displayedAreas.length > 0) {
            const nbAreasNotZero = this.displayedAreas.filter(a => a.size !== 0).length;
            if (nbAreasNotZero > 0) {
                const percentToAdd = percentToDispatch / nbAreasNotZero;
                this.displayedAreas.filter(a => a.size !== 0).forEach(area => {
                    area.size += percentToAdd;
                });
            }
            // All area sizes (container percentage) are less than guterSize,
            // It means containerSize < ngGutters * gutterSize
            else {
                this.displayedAreas[this.displayedAreas.length - 1].size = 1;
            }
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }
    refreshStyleSizes() {
        const sumGutterSize = this.getNbGutters() * this.gutterSize;
        this.displayedAreas.forEach(area => {
            area.component.setStyleFlexbasis(`calc( ${area.size * 100}% - ${area.size * sumGutterSize}px )`);
        });
    }
    clickGutter(event, gutterNum) {
        event.preventDefault();
        event.stopPropagation();
        if (this.startPoint && this.startPoint.x === event.clientX && this.startPoint.y === event.clientY) {
            this.currentGutterNum = gutterNum;
            this.notify('click');
        }
    }
    startDragging(event, gutterOrder, gutterNum) {
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = getPointFromEvent(event);
        if (!this.startPoint || this.disabled) {
            return;
        }
        const areaA = this.displayedAreas.find(a => a.order === gutterOrder - 1);
        const areaB = this.displayedAreas.find(a => a.order === gutterOrder + 1);
        if (!areaA || !areaB) {
            return;
        }
        this.dragStartValues.sizePixelContainer = getPixelSize(this.elRef, this.direction);
        this.dragStartValues.sizePixelA = getPixelSize(areaA.component.elRef, this.direction);
        this.dragStartValues.sizePixelB = getPixelSize(areaB.component.elRef, this.direction);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;
        this.currentGutterNum = gutterNum;
        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push(this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'mousemove', (e) => this.dragEvent(e, areaA, areaB)));
            this.dragListeners.push(this.renderer.listen('document', 'touchmove', (e) => this.dragEvent(e, areaA, areaB)));
        });
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'is-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.currentGutterNum - 1].nativeElement, 'is-dragged');
        this.notify('start');
    }
    dragEvent(event, areaA, areaB) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isDragging) {
            return;
        }
        this.endPoint = getPointFromEvent(event);
        if (!this.endPoint) {
            return;
        }
        // ¤ AREAS SIZE PIXEL
        let offsetPixel = (this.direction === 'horizontal') ? (this.startPoint.x - this.endPoint.x) : (this.startPoint.y - this.endPoint.y);
        if (this.dir === 'rtl') {
            offsetPixel = -offsetPixel;
        }
        let newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        let newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;
        if (newSizePixelA < this.gutterSize && newSizePixelB < this.gutterSize) {
            // WTF.. get out of here!
            return;
        }
        else if (newSizePixelA < this.gutterSize) {
            newSizePixelB += newSizePixelA;
            newSizePixelA = 0;
        }
        else if (newSizePixelB < this.gutterSize) {
            newSizePixelA += newSizePixelB;
            newSizePixelB = 0;
        }
        // ¤ AREAS SIZE PERCENT
        if (newSizePixelA === 0) {
            areaB.size += areaA.size;
            areaA.size = 0;
        }
        else if (newSizePixelB === 0) {
            areaA.size += areaB.size;
            areaB.size = 0;
        }
        else {
            // NEW_PERCENT = START_PERCENT / START_PIXEL * NEW_PIXEL;
            if (this.dragStartValues.sizePercentA === 0) {
                areaB.size = this.dragStartValues.sizePercentB / this.dragStartValues.sizePixelB * newSizePixelB;
                areaA.size = this.dragStartValues.sizePercentB - areaB.size;
            }
            else if (this.dragStartValues.sizePercentB === 0) {
                areaA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                areaB.size = this.dragStartValues.sizePercentA - areaA.size;
            }
            else {
                areaA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                areaB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - areaA.size;
            }
        }
        this.refreshStyleSizes();
        // If moved from starting point, notify progress
        if (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y) {
            this.notify('progress');
        }
    }
    stopDragging(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.isDragging === false) {
            return;
        }
        this.displayedAreas.forEach(area => {
            area.component.unlockEvents();
        });
        while (this.dragListeners.length > 0) {
            const fct = this.dragListeners.pop();
            if (fct) {
                fct();
            }
        }
        // If moved from starting point, notify end
        if (event && this.endPoint && (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y)) {
            this.notify('end');
        }
        this.isDragging = false;
        this.renderer.removeClass(this.elRef.nativeElement, 'is-dragging');
        this.renderer.removeClass(this.gutterEls.toArray()[this.currentGutterNum - 1].nativeElement, 'is-dragged');
        // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.startPoint = null;
                this.endPoint = null;
            });
        });
    }
    notify(type) {
        const sizes = this.displayedAreas.map(a => a.size * 100);
        if (type === 'start') {
            if (this.dragStartSubscriber) {
                this.ngZone.run(() => this.dragStartSubscriber.next({ gutterNum: this.currentGutterNum, sizes }));
            }
        }
        else if (type === 'end') {
            if (this.dragEndSubscriber) {
                this.ngZone.run(() => this.dragEndSubscriber.next({ gutterNum: this.currentGutterNum, sizes }));
            }
        }
        else if (type === 'click') {
            if (this.gutterClickSubscriber) {
                this.ngZone.run(() => this.gutterClickSubscriber.next({ gutterNum: this.currentGutterNum, sizes }));
            }
        }
        else if (type === 'transitionEnd') {
            if (this.transitionEndSubscriber) {
                this.ngZone.run(() => this.transitionEndSubscriber.next(sizes));
            }
        }
        else if (type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({ gutterNum: this.currentGutterNum, sizes });
        }
    }
    ngOnDestroy() {
        this.stopDragging();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], SplitComponent.prototype, "direction", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitComponent.prototype, "gutterSize", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], SplitComponent.prototype, "useTransition", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], SplitComponent.prototype, "disabled", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], SplitComponent.prototype, "dir", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Observable),
    tslib_1.__metadata("design:paramtypes", [])
], SplitComponent.prototype, "dragStart", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Observable),
    tslib_1.__metadata("design:paramtypes", [])
], SplitComponent.prototype, "dragEnd", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Observable),
    tslib_1.__metadata("design:paramtypes", [])
], SplitComponent.prototype, "gutterClick", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Observable),
    tslib_1.__metadata("design:paramtypes", [])
], SplitComponent.prototype, "transitionEnd", null);
tslib_1.__decorate([
    ViewChildren('gutterEls'),
    tslib_1.__metadata("design:type", QueryList)
], SplitComponent.prototype, "gutterEls", void 0);
SplitComponent = tslib_1.__decorate([
    Component({
        selector: 'as-split',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
        <ng-content></ng-content>
        <ng-template ngFor [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <div *ngIf="last === false"
                 #gutterEls
                 class="as-split-gutter"
                 [style.flex-basis.px]="gutterSize"
                 [style.order]="index*2+1"
                 (as-split-undetected.click)="clickGutter($event, index+1)"
                 (as-split-undetected.mousedown)="startDragging($event, index*2+1, index+1)"
                 (as-split-undetected.touchstart)="startDragging($event, index*2+1, index+1)">
                <div class="as-split-gutter-icon"></div>
            </div>
        </ng-template>`,
        styles: [":host{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden;width:100%;height:100%}:host>.as-split-gutter{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;background-color:#eee;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}:host>.as-split-gutter>.as-split-gutter-icon{width:100%;height:100%;background-position:center center;background-repeat:no-repeat}:host ::ng-deep>.as-split-area{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;overflow-x:hidden;overflow-y:auto}:host ::ng-deep>.as-split-area.is-hided{-ms-flex-preferred-size:0!important;flex-basis:0!important;overflow-x:hidden;overflow-y:hidden}:host.is-horizontal{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}:host.is-horizontal>.as-split-gutter{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;cursor:col-resize;height:100%}:host.is-horizontal>.as-split-gutter>.as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==)}:host.is-horizontal ::ng-deep>.as-split-area{height:100%}:host.is-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.is-vertical>.as-split-gutter{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;cursor:row-resize;width:100%}:host.is-vertical>.as-split-gutter .as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC)}:host.is-vertical ::ng-deep>.as-split-area{width:100%}:host.is-vertical ::ng-deep>.as-split-area.is-hided{max-width:0}:host.is-disabled>.as-split-gutter{cursor:default}:host.is-disabled>.as-split-gutter .as-split-gutter-icon{background-image:none}:host.is-transition.is-init:not(.is-dragging) ::ng-deep>.as-split-area,:host.is-transition.is-init:not(.is-dragging)>.as-split-gutter{-webkit-transition:-webkit-flex-basis .3s;transition:flex-basis .3s;-o-transition:flex-basis .3s;transition:flex-basis .3s,-webkit-flex-basis .3s,-ms-flex-preferred-size .3s}"]
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone,
        ElementRef,
        ChangeDetectorRef,
        Renderer2])
], SplitComponent);
export { SplitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQTRCLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TCxPQUFPLEVBQUUsVUFBVSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQXFCSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBNkh6QixZQUFvQixNQUFjLEVBQ3hCLEtBQWlCLEVBQ2pCLEtBQXdCLEVBQ3hCLFFBQW1CO1FBSFQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE5SHJCLGVBQVUsR0FBOEIsWUFBWSxDQUFDO1FBZTdELElBQUk7UUFFSSxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQWFqQyxJQUFJO1FBRUksbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFheEMsSUFBSTtRQUVJLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFhbkMsSUFBSTtRQUVJLFNBQUksR0FBa0IsS0FBSyxDQUFDO1FBcUM1Qix3QkFBbUIsR0FBeUQsSUFBSSxPQUFPLEVBQUUsQ0FBQztR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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgUmVuZGVyZXIyLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIE5nWm9uZSwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSUFyZWEgfSBmcm9tICcuLi9pbnRlcmZhY2UvSUFyZWEnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lQb2ludCc7XG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBnZXRQb2ludEZyb21FdmVudCwgZ2V0UGl4ZWxTaXplLCBnZXRJbnB1dEJvb2xlYW4sIGlzVmFsaWRUb3RhbFNpemUgfSBmcm9tICcuLi91dGlscyc7XG5cbi8qKlxuICogYW5ndWxhci1zcGxpdFxuICpcbiAqIEFyZWFzIHNpemUgYXJlIHNldCBpbiBwZXJjZW50YWdlIG9mIHRoZSBzcGxpdCBjb250YWluZXIuXG4gKiBHdXR0ZXJzIHNpemUgYXJlIHNldCBpbiBwaXhlbHMuXG4gKlxuICogU28gd2Ugc2V0IGNzcyAnZmxleC1iYXNpcycgcHJvcGVydHkgbGlrZSB0aGlzICh3aGVyZSAwIDw9IGFyZWEuc2l6ZSA8PSAxKTpcbiAqICBjYWxjKCB7IGFyZWEuc2l6ZSAqIDEwMCB9JSAtIHsgYXJlYS5zaXplICogbmJHdXR0ZXIgKiBndXR0ZXJTaXplIH1weCApO1xuICpcbiAqIEV4YW1wbGVzIHdpdGggMyB2aXNpYmxlIGFyZWFzIGFuZCAyIGd1dHRlcnM6XG4gKlxuICogfCAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMjAlIC0gNHB4KSAgICAgICAgICBjYWxjKDIwJSAtIDRweCkgICAgICAgICAgICAgIGNhbGMoNjAlIC0gMTJweCkgICAgICAgICAgfFxuICpcbiAqXG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgICAgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgICAgICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICB8XG4gKlxuICpcbiAqIHwxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfFtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8MCAgICAgICAgICAgICAgICAgY2FsYyg2Ni42NiUgLSAxMy4zMzNweCkgICAgICAgICAgICAgICAgICBjYWxjKDMzJSUgLSA2LjY2N3B4KSAgIHxcbiAqXG4gKlxuICogIDEwcHggMTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8W11bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwwIDAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsYygxMDAlIC0gMjBweCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcy1zcGxpdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFtgLi9zcGxpdC5jb21wb25lbnQuc2Nzc2BdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJkaXNwbGF5ZWRBcmVhc1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAjZ3V0dGVyRWxzXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiYXMtc3BsaXQtZ3V0dGVyXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtYmFzaXMucHhdPVwiZ3V0dGVyU2l6ZVwiXG4gICAgICAgICAgICAgICAgIFtzdHlsZS5vcmRlcl09XCJpbmRleCoyKzFcIlxuICAgICAgICAgICAgICAgICAoYXMtc3BsaXQtdW5kZXRlY3RlZC5jbGljayk9XCJjbGlja0d1dHRlcigkZXZlbnQsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgICAgKGFzLXNwbGl0LXVuZGV0ZWN0ZWQubW91c2Vkb3duKT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgICAgKGFzLXNwbGl0LXVuZGV0ZWN0ZWQudG91Y2hzdGFydCk9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxLCBpbmRleCsxKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1zcGxpdC1ndXR0ZXItaWNvblwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+YCxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpIHtcbiAgICB0aGlzLl9kaXJlY3Rpb24gPSAodiA9PT0gJ3ZlcnRpY2FsJykgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBpcy0ke3RoaXMuX2RpcmVjdGlvbn1gKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgYGlzLSR7KHRoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnfWApO1xuXG4gICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0IGRpcmVjdGlvbigpOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDExO1xuXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJTaXplKHY6IG51bWJlcikge1xuICAgIHYgPSBOdW1iZXIodik7XG4gICAgdGhpcy5fZ3V0dGVyU2l6ZSA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IDExO1xuXG4gICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0IGd1dHRlclNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF91c2VUcmFuc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgIHRoaXMuX3VzZVRyYW5zaXRpb24gPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICBpZiAodGhpcy5fdXNlVHJhbnNpdGlvbikgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy10cmFuc2l0aW9uJyk7XG4gICAgZWxzZSB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLXRyYW5zaXRpb24nKTtcbiAgfVxuXG4gIGdldCB1c2VUcmFuc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91c2VUcmFuc2l0aW9uO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGdldElucHV0Qm9vbGVhbih2KTtcblxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kaXNhYmxlZCcpO1xuICAgIGVsc2UgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9kaXI6ICdsdHInIHwgJ3J0bCcgPSAnbHRyJztcblxuICBASW5wdXQoKSBzZXQgZGlyKHY6ICdsdHInIHwgJ3J0bCcpIHtcbiAgICB2ID0gKHYgPT09ICdydGwnKSA/ICdydGwnIDogJ2x0cic7XG4gICAgdGhpcy5fZGlyID0gdjtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RpcicsIHRoaXMuX2Rpcik7XG4gIH1cblxuICBnZXQgZGlyKCk6ICdsdHInIHwgJ3J0bCcge1xuICAgIHJldHVybiB0aGlzLl9kaXI7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBkcmFnU3RhcnRTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+XG4gIEBPdXRwdXQoKSBnZXQgZHJhZ1N0YXJ0KCk6IE9ic2VydmFibGU8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaWJlciA9IHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmFnRW5kU3Vic2NyaWJlcjogU3Vic2NyaWJlcjx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PlxuICBAT3V0cHV0KCkgZ2V0IGRyYWdFbmQoKTogT2JzZXJ2YWJsZTx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy5kcmFnRW5kU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBndXR0ZXJDbGlja1N1YnNjcmliZXI6IFN1YnNjcmliZXI8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT5cbiAgQE91dHB1dCgpIGdldCBndXR0ZXJDbGljaygpOiBPYnNlcnZhYmxlPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB0aGlzLmd1dHRlckNsaWNrU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2l0aW9uRW5kU3Vic2NyaWJlcjogU3Vic2NyaWJlcjxBcnJheTxudW1iZXI+PlxuICBAT3V0cHV0KCkgZ2V0IHRyYW5zaXRpb25FbmQoKTogT2JzZXJ2YWJsZTxBcnJheTxudW1iZXI+PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWU8QXJyYXk8bnVtYmVyPj4oMjApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhZ1Byb2dyZXNzU3ViamVjdDogU3ViamVjdDx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PiA9IG5ldyBTdWJqZWN0KCk7XG4gIGRyYWdQcm9ncmVzcyQ6IE9ic2VydmFibGU8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT4gPSB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRHdXR0ZXJOdW06IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RhcnRQb2ludDogSVBvaW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZW5kUG9pbnQ6IElQb2ludCB8IG51bGwgPSBudWxsO1xuXG4gIHB1YmxpYyByZWFkb25seSBkaXNwbGF5ZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgaGlkZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnU3RhcnRWYWx1ZXMgPSB7XG4gICAgc2l6ZVBpeGVsQ29udGFpbmVyOiAwLFxuICAgIHNpemVQaXhlbEE6IDAsXG4gICAgc2l6ZVBpeGVsQjogMCxcbiAgICBzaXplUGVyY2VudEE6IDAsXG4gICAgc2l6ZVBlcmNlbnRCOiAwLFxuICB9O1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2d1dHRlckVscycpIHByaXZhdGUgZ3V0dGVyRWxzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIC8vIFRvIGZvcmNlIGFkZGluZyBkZWZhdWx0IGNsYXNzLCBjb3VsZCBiZSBvdmVycmlkZSBieSB1c2VyIEBJbnB1dCgpIG9yIG5vdFxuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBUbyBhdm9pZCB0cmFuc2l0aW9uIGF0IGZpcnN0IHJlbmRlcmluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLWluaXQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5iR3V0dGVycygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDApID8gMCA6IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3QXJlYTogSUFyZWEgPSB7XG4gICAgICBjb21wb25lbnQsXG4gICAgICBvcmRlcjogMCxcbiAgICAgIHNpemU6IDAsXG4gICAgfTtcblxuICAgIGlmIChjb21wb25lbnQudmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuXG4gICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgbGV0IGFyZWE6IElBcmVhO1xuICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSkge1xuICAgICAgYXJlYSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcblxuICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5oaWRlZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSkge1xuICAgICAgYXJlYSA9IHRoaXMuaGlkZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XG4gICAgICB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSwgcmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBPbmx5IHJlZnJlc2ggaWYgYXJlYSBpcyBkaXNwbGF5ZWQgKE5vIG5lZWQgdG8gY2hlY2sgaW5zaWRlICdoaWRlZEFyZWFzJylcbiAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XG4gICAgaWYgKCFhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5idWlsZChyZXNldE9yZGVycywgcmVzZXRTaXplcyk7XG4gIH1cblxuICBwdWJsaWMgc2hvd0FyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICBpZiAoIWFyZWEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVhcyA9IHRoaXMuaGlkZWRBcmVhcy5zcGxpY2UodGhpcy5oaWRlZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGhpZGVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcCk7XG4gICAgaWYgKCFhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXJlYXMgPSB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgIGFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBhcmVhLm9yZGVyID0gMDtcbiAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgfSlcbiAgICB0aGlzLmhpZGVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGdldFZpc2libGVBcmVhU2l6ZXMoKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gYS5zaXplICogMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWaXNpYmxlQXJlYVNpemVzKHNpemVzOiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7XG4gICAgaWYgKHNpemVzLmxlbmd0aCAhPT0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzaXplcyA9IHNpemVzLm1hcChzID0+IHMgLyAxMDApO1xuXG4gICAgY29uc3QgdG90YWwgPSBzaXplcy5yZWR1Y2UoKHRvdGFsOiBudW1iZXIsIHY6IG51bWJlcikgPT4gdG90YWwgKyB2LCAwKTtcbiAgICBpZiAoIWlzVmFsaWRUb3RhbFNpemUodG90YWwpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBhcmVhLmNvbXBvbmVudC5fc2l6ZSA9IHNpemVzW2ldO1xuICAgIH0pXG5cbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCB0cnVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGQocmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuXG4gICAgLy8gwqQgQVJFQVMgT1JERVJcblxuICAgIGlmIChyZXNldE9yZGVycyA9PT0gdHJ1ZSkge1xuXG4gICAgICAvLyBJZiB1c2VyIHByb3ZpZGVkICdvcmRlcicgZm9yIGVhY2ggYXJlYSwgdXNlIGl0IHRvIHNvcnQgdGhlbS5cbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wb25lbnQub3JkZXIgIT09IG51bGwpKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc29ydCgoYSwgYikgPT4gKDxudW1iZXI+YS5jb21wb25lbnQub3JkZXIpIC0gKDxudW1iZXI+Yi5jb21wb25lbnQub3JkZXIpKTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlbiBzZXQgcmVhbCBvcmRlciB3aXRoIG11bHRpcGxlcyBvZiAyLCBudW1iZXJzIGJldHdlZW4gd2lsbCBiZSB1c2VkIGJ5IGd1dHRlcnMuXG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgYXJlYS5vcmRlciA9IGkgKiAyO1xuICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZU9yZGVyKGFyZWEub3JkZXIpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvLyDCpCBBUkVBUyBTSVpFIFBFUkNFTlRcblxuICAgIGlmIChyZXNldFNpemVzID09PSB0cnVlKSB7XG5cbiAgICAgIGNvbnN0IHRvdGFsVXNlclNpemUgPSA8bnVtYmVyPnRoaXMuZGlzcGxheWVkQXJlYXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzOiBJQXJlYSkgPT4gcy5jb21wb25lbnQuc2l6ZSA/IHRvdGFsICsgcy5jb21wb25lbnQuc2l6ZSA6IHRvdGFsLCAwKTtcblxuICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnc2l6ZScgZm9yIGVhY2ggYXJlYSBhbmQgdG90YWwgPT0gMSwgdXNlIGl0LlxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMuZXZlcnkoYSA9PiBhLmNvbXBvbmVudC5zaXplICE9PSBudWxsKSAmJiBpc1ZhbGlkVG90YWxTaXplKHRvdGFsVXNlclNpemUpKSB7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgIGFyZWEuc2l6ZSA9IDxudW1iZXI+YXJlYS5jb21wb25lbnQuc2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBFbHNlIHNldCBlcXVhbCBzaXplcyBmb3IgYWxsIGFyZWFzLlxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSAxIC8gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgIGFyZWEuc2l6ZSA9IHNpemU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIMKkXG4gICAgLy8gSWYgc29tZSByZWFsIGFyZWEgc2l6ZXMgYXJlIGxlc3MgdGhhbiBndXR0ZXJTaXplLFxuICAgIC8vIHNldCB0aGVtIHRvIHplcm8gYW5kIGRpc3BhdGNoIHNpemUgdG8gb3RoZXJzLlxuXG4gICAgbGV0IHBlcmNlbnRUb0Rpc3BhdGNoID0gMDtcblxuICAgIC8vIEdldCBjb250YWluZXIgcGl4ZWwgc2l6ZVxuICAgIGNvbnN0IGNvbnRhaW5lclNpemVQaXhlbCA9IGdldFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBpZiAoYXJlYS5zaXplICogY29udGFpbmVyU2l6ZVBpeGVsIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgIHBlcmNlbnRUb0Rpc3BhdGNoICs9IGFyZWEuc2l6ZTtcbiAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwZXJjZW50VG9EaXNwYXRjaCA+IDAgJiYgdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBuYkFyZWFzTm90WmVybyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplICE9PSAwKS5sZW5ndGg7XG5cbiAgICAgIGlmIChuYkFyZWFzTm90WmVybyA+IDApIHtcbiAgICAgICAgY29uc3QgcGVyY2VudFRvQWRkID0gcGVyY2VudFRvRGlzcGF0Y2ggLyBuYkFyZWFzTm90WmVybztcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICBhcmVhLnNpemUgKz0gcGVyY2VudFRvQWRkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEFsbCBhcmVhIHNpemVzIChjb250YWluZXIgcGVyY2VudGFnZSkgYXJlIGxlc3MgdGhhbiBndXRlclNpemUsXG4gICAgICAvLyBJdCBtZWFucyBjb250YWluZXJTaXplIDwgbmdHdXR0ZXJzICogZ3V0dGVyU2l6ZVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxXS5zaXplID0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3VtR3V0dGVyU2l6ZSA9IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemU7XG5cbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZUZsZXhiYXNpcyhgY2FsYyggJHthcmVhLnNpemUgKiAxMDB9JSAtICR7YXJlYS5zaXplICogc3VtR3V0dGVyU2l6ZX1weCApYCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xpY2tHdXR0ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGd1dHRlck51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnN0YXJ0UG9pbnQgJiYgdGhpcy5zdGFydFBvaW50LnggPT09IGV2ZW50LmNsaWVudFggJiYgdGhpcy5zdGFydFBvaW50LnkgPT09IGV2ZW50LmNsaWVudFkpIHtcbiAgICAgIHRoaXMuY3VycmVudEd1dHRlck51bSA9IGd1dHRlck51bTtcblxuICAgICAgdGhpcy5ub3RpZnkoJ2NsaWNrJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXJ0RHJhZ2dpbmcoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBndXR0ZXJPcmRlcjogbnVtYmVyLCBndXR0ZXJOdW06IG51bWJlcik6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnN0YXJ0UG9pbnQgPSBnZXRQb2ludEZyb21FdmVudChldmVudCk7XG4gICAgaWYgKCF0aGlzLnN0YXJ0UG9pbnQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZWFBID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgLSAxKTtcbiAgICBjb25zdCBhcmVhQiA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyICsgMSk7XG5cbiAgICBpZiAoIWFyZWFBIHx8ICFhcmVhQikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbENvbnRhaW5lciA9IGdldFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSA9IGdldFBpeGVsU2l6ZShhcmVhQS5jb21wb25lbnQuZWxSZWYsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCID0gZ2V0UGl4ZWxTaXplKGFyZWFCLmNvbXBvbmVudC5lbFJlZiwgdGhpcy5kaXJlY3Rpb24pO1xuICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9IGFyZWFBLnNpemU7XG4gICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID0gYXJlYUIuc2l6ZTtcbiAgICB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gPSBndXR0ZXJOdW07XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcblxuICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLmRyYWdFdmVudChlLCBhcmVhQSwgYXJlYUIpKSk7XG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIGFyZWFBLCBhcmVhQikpKTtcbiAgICB9KTtcblxuICAgIGFyZWFBLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XG4gICAgYXJlYUIuY29tcG9uZW50LmxvY2tFdmVudHMoKTtcblxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kcmFnZ2luZycpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ndXR0ZXJFbHMudG9BcnJheSgpW3RoaXMuY3VycmVudEd1dHRlck51bSAtIDFdLm5hdGl2ZUVsZW1lbnQsICdpcy1kcmFnZ2VkJyk7XG5cbiAgICB0aGlzLm5vdGlmeSgnc3RhcnQnKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgYXJlYUE6IElBcmVhLCBhcmVhQjogSUFyZWEpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVuZFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgIGlmICghdGhpcy5lbmRQb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIMKkIEFSRUFTIFNJWkUgUElYRUxcblxuICAgIGxldCBvZmZzZXRQaXhlbCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICh0aGlzLnN0YXJ0UG9pbnQueCAtIHRoaXMuZW5kUG9pbnQueCkgOiAodGhpcy5zdGFydFBvaW50LnkgLSB0aGlzLmVuZFBvaW50LnkpO1xuICAgIGlmICh0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIG9mZnNldFBpeGVsID0gLW9mZnNldFBpeGVsO1xuICAgIH1cblxuICAgIGxldCBuZXdTaXplUGl4ZWxBID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAtIG9mZnNldFBpeGVsO1xuICAgIGxldCBuZXdTaXplUGl4ZWxCID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiArIG9mZnNldFBpeGVsO1xuXG4gICAgaWYgKG5ld1NpemVQaXhlbEEgPCB0aGlzLmd1dHRlclNpemUgJiYgbmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgLy8gV1RGLi4gZ2V0IG91dCBvZiBoZXJlIVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmIChuZXdTaXplUGl4ZWxBIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICBuZXdTaXplUGl4ZWxCICs9IG5ld1NpemVQaXhlbEE7XG4gICAgICBuZXdTaXplUGl4ZWxBID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAobmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgbmV3U2l6ZVBpeGVsQSArPSBuZXdTaXplUGl4ZWxCO1xuICAgICAgbmV3U2l6ZVBpeGVsQiA9IDA7XG4gICAgfVxuXG4gICAgLy8gwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICBpZiAobmV3U2l6ZVBpeGVsQSA9PT0gMCkge1xuICAgICAgYXJlYUIuc2l6ZSArPSBhcmVhQS5zaXplO1xuICAgICAgYXJlYUEuc2l6ZSA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5ld1NpemVQaXhlbEIgPT09IDApIHtcbiAgICAgIGFyZWFBLnNpemUgKz0gYXJlYUIuc2l6ZTtcbiAgICAgIGFyZWFCLnNpemUgPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIE5FV19QRVJDRU5UID0gU1RBUlRfUEVSQ0VOVCAvIFNUQVJUX1BJWEVMICogTkVXX1BJWEVMO1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9PT0gMCkge1xuICAgICAgICBhcmVhQi5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiAqIG5ld1NpemVQaXhlbEI7XG4gICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLSBhcmVhQi5zaXplO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID09PSAwKSB7XG4gICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgLyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBICogbmV3U2l6ZVBpeGVsQTtcbiAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAtIGFyZWFBLnNpemU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXJlYUEuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgKiBuZXdTaXplUGl4ZWxBO1xuICAgICAgICBhcmVhQi5zaXplID0gKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSArIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QikgLSBhcmVhQS5zaXplO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcblxuICAgIC8vIElmIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9pbnQsIG5vdGlmeSBwcm9ncmVzc1xuICAgIGlmICh0aGlzLnN0YXJ0UG9pbnQueCAhPT0gdGhpcy5lbmRQb2ludC54IHx8IHRoaXMuc3RhcnRQb2ludC55ICE9PSB0aGlzLmVuZFBvaW50LnkpIHtcbiAgICAgIHRoaXMubm90aWZ5KCdwcm9ncmVzcycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcERyYWdnaW5nKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgIGFyZWEuY29tcG9uZW50LnVubG9ja0V2ZW50cygpO1xuICAgIH0pO1xuXG4gICAgd2hpbGUgKHRoaXMuZHJhZ0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmY3QgPSB0aGlzLmRyYWdMaXN0ZW5lcnMucG9wKCk7XG4gICAgICBpZiAoZmN0KSB7XG4gICAgICAgIGZjdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9pbnQsIG5vdGlmeSBlbmRcbiAgICBpZiAoZXZlbnQgJiYgdGhpcy5lbmRQb2ludCAmJiAodGhpcy5zdGFydFBvaW50LnggIT09IHRoaXMuZW5kUG9pbnQueCB8fCB0aGlzLnN0YXJ0UG9pbnQueSAhPT0gdGhpcy5lbmRQb2ludC55KSkge1xuICAgICAgdGhpcy5ub3RpZnkoJ2VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZ3V0dGVyRWxzLnRvQXJyYXkoKVt0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dlZCcpO1xuXG4gICAgLy8gTmVlZGVkIHRvIGxldCAoY2xpY2spPVwiY2xpY2tHdXR0ZXIoLi4uKVwiIGV2ZW50IHJ1biBhbmQgdmVyaWZ5IGlmIG1vdXNlIG1vdmVkIG9yIG5vdFxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmVuZFBvaW50ID0gbnVsbDtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5KHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ3RyYW5zaXRpb25FbmQnKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZXM6IEFycmF5PG51bWJlcj4gPSB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuc2l6ZSAqIDEwMCk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnU3RhcnRTdWJzY3JpYmVyLm5leHQoeyBndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXMgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnZW5kJykge1xuICAgICAgaWYgKHRoaXMuZHJhZ0VuZFN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ0VuZFN1YnNjcmliZXIubmV4dCh7IGd1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplcyB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIGlmICh0aGlzLmd1dHRlckNsaWNrU3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5ndXR0ZXJDbGlja1N1YnNjcmliZXIubmV4dCh7IGd1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplcyB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd0cmFuc2l0aW9uRW5kJykge1xuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIubmV4dChzaXplcykpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAncHJvZ3Jlc3MnKSB7XG4gICAgICAvLyBTdGF5IG91dHNpZGUgem9uZSB0byBhbGxvdyB1c2VycyBkbyB3aGF0IHRoZXkgd2FudCBhYm91dCBjaGFuZ2UgZGV0ZWN0aW9uIG1lY2hhbmlzbS5cbiAgICAgIHRoaXMuZHJhZ1Byb2dyZXNzU3ViamVjdC5uZXh0KHsgZ3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICB9XG59XG4iXX0=