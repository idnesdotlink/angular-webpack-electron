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
        template: "<ng-content></ng-content>\n<ng-template ngFor [ngForOf]=\"displayedAreas\" let-index=\"index\" let-last=\"last\">\n  <div *ngIf=\"last === false\" #gutterEls class=\"as-split-gutter\" [style.flex-basis.px]=\"gutterSize\"\n    [style.order]=\"index*2+1\" (as-split-undetected.click)=\"clickGutter($event, index+1)\"\n    (as-split-undetected.mousedown)=\"startDragging($event, index*2+1, index+1)\"\n    (as-split-undetected.touchstart)=\"startDragging($event, index*2+1, index+1)\">\n    <div class=\"as-split-gutter-icon\"></div>\n  </div>\n</ng-template>",
        styles: [":host{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden;width:100%;height:100%}:host>.as-split-gutter{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;background-color:#eee;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}:host>.as-split-gutter>.as-split-gutter-icon{width:100%;height:100%;background-position:center center;background-repeat:no-repeat}:host ::ng-deep>.as-split-area{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;overflow-x:hidden;overflow-y:auto}:host ::ng-deep>.as-split-area.is-hided{-ms-flex-preferred-size:0!important;flex-basis:0!important;overflow-x:hidden;overflow-y:hidden}:host.is-horizontal{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}:host.is-horizontal>.as-split-gutter{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;cursor:col-resize;height:100%}:host.is-horizontal>.as-split-gutter>.as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==)}:host.is-horizontal ::ng-deep>.as-split-area{height:100%}:host.is-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.is-vertical>.as-split-gutter{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;cursor:row-resize;width:100%}:host.is-vertical>.as-split-gutter .as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC)}:host.is-vertical ::ng-deep>.as-split-area{width:100%}:host.is-vertical ::ng-deep>.as-split-area.is-hided{max-width:0}:host.is-disabled>.as-split-gutter{cursor:default}:host.is-disabled>.as-split-gutter .as-split-gutter-icon{background-image:none}:host.is-transition.is-init:not(.is-dragging) ::ng-deep>.as-split-area,:host.is-transition.is-init:not(.is-dragging)>.as-split-gutter{-webkit-transition:-webkit-flex-basis .3s;transition:flex-basis .3s;-o-transition:flex-basis .3s;transition:flex-basis .3s,-webkit-flex-basis .3s,-ms-flex-preferred-size .3s}"]
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone,
        ElementRef,
        ChangeDetectorRef,
        Renderer2])
], SplitComponent);
export { SplitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQTRCLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TCxPQUFPLEVBQUUsVUFBVSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQVFILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUE2SHpCLFlBQW9CLE1BQWMsRUFDeEIsS0FBaUIsRUFDakIsS0FBd0IsRUFDeEIsUUFBbUI7UUFIVCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTlIckIsZUFBVSxHQUE4QixZQUFZLENBQUM7UUFlN0QsSUFBSTtRQUVJLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBYWpDLElBQUk7UUFFSSxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQWF4QyxJQUFJO1FBRUksY0FBUyxHQUFZLEtBQUssQ0FBQztRQWFuQyxJQUFJO1FBRUksU0FBSSxHQUFrQixLQUFLLENBQUM7UUFxQzVCLHdCQUFtQixHQUF5RCxJQUFJLE9BQU8sRUFBRSxDQUFDO1FB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dCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgTmdab25lLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJQXJlYSB9IGZyb20gJy4uL2ludGVyZmFjZS9JQXJlYSc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2UvSVBvaW50JztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZS9zcGxpdEFyZWEuZGlyZWN0aXZlJztcbmltcG9ydCB7IGdldFBvaW50RnJvbUV2ZW50LCBnZXRQaXhlbFNpemUsIGdldElucHV0Qm9vbGVhbiwgaXNWYWxpZFRvdGFsU2l6ZSB9IGZyb20gJy4uL3V0aWxzJztcblxuLyoqXG4gKiBhbmd1bGFyLXNwbGl0XG4gKlxuICogQXJlYXMgc2l6ZSBhcmUgc2V0IGluIHBlcmNlbnRhZ2Ugb2YgdGhlIHNwbGl0IGNvbnRhaW5lci5cbiAqIEd1dHRlcnMgc2l6ZSBhcmUgc2V0IGluIHBpeGVscy5cbiAqXG4gKiBTbyB3ZSBzZXQgY3NzICdmbGV4LWJhc2lzJyBwcm9wZXJ0eSBsaWtlIHRoaXMgKHdoZXJlIDAgPD0gYXJlYS5zaXplIDw9IDEpOlxuICogIGNhbGMoIHsgYXJlYS5zaXplICogMTAwIH0lIC0geyBhcmVhLnNpemUgKiBuYkd1dHRlciAqIGd1dHRlclNpemUgfXB4ICk7XG4gKlxuICogRXhhbXBsZXMgd2l0aCAzIHZpc2libGUgYXJlYXMgYW5kIDIgZ3V0dGVyczpcbiAqXG4gKiB8ICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgY2FsYygyMCUgLSA0cHgpICAgICAgICAgIGNhbGMoMjAlIC0gNHB4KSAgICAgICAgICAgICAgY2FsYyg2MCUgLSAxMnB4KSAgICAgICAgICB8XG4gKlxuICpcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgICAgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgIHxcbiAqXG4gKlxuICogfDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8W10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwwICAgICAgICAgICAgICAgICBjYWxjKDY2LjY2JSAtIDEzLjMzM3B4KSAgICAgICAgICAgICAgICAgIGNhbGMoMzMlJSAtIDYuNjY3cHgpICAgfFxuICpcbiAqXG4gKiAgMTBweCAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FzLXNwbGl0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogW2AuL3NwbGl0LmNvbXBvbmVudC5zY3NzYF0sXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGxpdC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9kaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgQElucHV0KCkgc2V0IGRpcmVjdGlvbih2OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSB7XG4gICAgdGhpcy5fZGlyZWN0aW9uID0gKHYgPT09ICd2ZXJ0aWNhbCcpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCBgaXMtJHt0aGlzLl9kaXJlY3Rpb259YCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBpcy0keyh0aGlzLl9kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ31gKTtcblxuICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgfVxuXG4gIGdldCBkaXJlY3Rpb24oKTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB7XG4gICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9ndXR0ZXJTaXplOiBudW1iZXIgPSAxMTtcblxuICBASW5wdXQoKSBzZXQgZ3V0dGVyU2l6ZSh2OiBudW1iZXIpIHtcbiAgICB2ID0gTnVtYmVyKHYpO1xuICAgIHRoaXMuX2d1dHRlclNpemUgPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiAxMTtcblxuICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgfVxuXG4gIGdldCBndXR0ZXJTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2d1dHRlclNpemU7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfdXNlVHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl91c2VUcmFuc2l0aW9uID0gZ2V0SW5wdXRCb29sZWFuKHYpO1xuXG4gICAgaWYgKHRoaXMuX3VzZVRyYW5zaXRpb24pIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtdHJhbnNpdGlvbicpO1xuICAgIGVsc2UgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy10cmFuc2l0aW9uJyk7XG4gIH1cblxuICBnZXQgdXNlVHJhbnNpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlVHJhbnNpdGlvbjtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtZGlzYWJsZWQnKTtcbiAgICBlbHNlIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfZGlyOiAnbHRyJyB8ICdydGwnID0gJ2x0cic7XG5cbiAgQElucHV0KCkgc2V0IGRpcih2OiAnbHRyJyB8ICdydGwnKSB7XG4gICAgdiA9ICh2ID09PSAncnRsJykgPyAncnRsJyA6ICdsdHInO1xuICAgIHRoaXMuX2RpciA9IHY7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkaXInLCB0aGlzLl9kaXIpO1xuICB9XG5cbiAgZ2V0IGRpcigpOiAnbHRyJyB8ICdydGwnIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgZHJhZ1N0YXJ0U3Vic2NyaWJlcjogU3Vic2NyaWJlcjx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PlxuICBAT3V0cHV0KCkgZ2V0IGRyYWdTdGFydCgpOiBPYnNlcnZhYmxlPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB0aGlzLmRyYWdTdGFydFN1YnNjcmliZXIgPSBzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhZ0VuZFN1YnNjcmliZXI6IFN1YnNjcmliZXI8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT5cbiAgQE91dHB1dCgpIGdldCBkcmFnRW5kKCk6IE9ic2VydmFibGU8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHRoaXMuZHJhZ0VuZFN1YnNjcmliZXIgPSBzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgZ3V0dGVyQ2xpY2tTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+XG4gIEBPdXRwdXQoKSBnZXQgZ3V0dGVyQ2xpY2soKTogT2JzZXJ2YWJsZTx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy5ndXR0ZXJDbGlja1N1YnNjcmliZXIgPSBzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNpdGlvbkVuZFN1YnNjcmliZXI6IFN1YnNjcmliZXI8QXJyYXk8bnVtYmVyPj5cbiAgQE91dHB1dCgpIGdldCB0cmFuc2l0aW9uRW5kKCk6IE9ic2VydmFibGU8QXJyYXk8bnVtYmVyPj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIgPSBzdWJzY3JpYmVyKS5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lPEFycmF5PG51bWJlcj4+KDIwKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGRyYWdQcm9ncmVzc1N1YmplY3Q6IFN1YmplY3Q8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT4gPSBuZXcgU3ViamVjdCgpO1xuICBkcmFnUHJvZ3Jlc3MkOiBPYnNlcnZhYmxlPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+ID0gdGhpcy5kcmFnUHJvZ3Jlc3NTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8vLy9cblxuICBwcml2YXRlIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBjdXJyZW50R3V0dGVyTnVtOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHN0YXJ0UG9pbnQ6IElQb2ludCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGVuZFBvaW50OiBJUG9pbnQgfCBudWxsID0gbnVsbDtcblxuICBwdWJsaWMgcmVhZG9ubHkgZGlzcGxheWVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGhpZGVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0xpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ1N0YXJ0VmFsdWVzID0ge1xuICAgIHNpemVQaXhlbENvbnRhaW5lcjogMCxcbiAgICBzaXplUGl4ZWxBOiAwLFxuICAgIHNpemVQaXhlbEI6IDAsXG4gICAgc2l6ZVBlcmNlbnRBOiAwLFxuICAgIHNpemVQZXJjZW50QjogMCxcbiAgfTtcblxuICBAVmlld0NoaWxkcmVuKCdndXR0ZXJFbHMnKSBwcml2YXRlIGd1dHRlckVsczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAvLyBUbyBmb3JjZSBhZGRpbmcgZGVmYXVsdCBjbGFzcywgY291bGQgYmUgb3ZlcnJpZGUgYnkgdXNlciBASW5wdXQoKSBvciBub3RcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgLy8gVG8gYXZvaWQgdHJhbnNpdGlvbiBhdCBmaXJzdCByZW5kZXJpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1pbml0JykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROYkd1dHRlcnMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID09PSAwKSA/IDAgOiB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwdWJsaWMgYWRkQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IG5ld0FyZWE6IElBcmVhID0ge1xuICAgICAgY29tcG9uZW50LFxuICAgICAgb3JkZXI6IDAsXG4gICAgICBzaXplOiAwLFxuICAgIH07XG5cbiAgICBpZiAoY29tcG9uZW50LnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaChuZXdBcmVhKTtcblxuICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmhpZGVkQXJlYXMucHVzaChuZXdBcmVhKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGxldCBhcmVhOiBJQXJlYTtcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcbiAgICAgIGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG5cbiAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuaGlkZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcbiAgICAgIGFyZWEgPSB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgICAgdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZUFyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUsIHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gT25seSByZWZyZXNoIGlmIGFyZWEgaXMgZGlzcGxheWVkIChObyBuZWVkIHRvIGNoZWNrIGluc2lkZSAnaGlkZWRBcmVhcycpXG4gICAgY29uc3QgYXJlYSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgIGlmICghYXJlYSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVpbGQocmVzZXRPcmRlcnMsIHJlc2V0U2l6ZXMpO1xuICB9XG5cbiAgcHVibGljIHNob3dBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgYXJlYSA9IHRoaXMuaGlkZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XG4gICAgaWYgKCFhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXJlYXMgPSB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXApO1xuICAgIGlmICghYXJlYSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZWFzID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICBhcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgYXJlYS5vcmRlciA9IDA7XG4gICAgICBhcmVhLnNpemUgPSAwO1xuICAgIH0pXG4gICAgdGhpcy5oaWRlZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWaXNpYmxlQXJlYVNpemVzKCk6IEFycmF5PG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuc2l6ZSAqIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgc2V0VmlzaWJsZUFyZWFTaXplcyhzaXplczogQXJyYXk8bnVtYmVyPik6IGJvb2xlYW4ge1xuICAgIGlmIChzaXplcy5sZW5ndGggIT09IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2l6ZXMgPSBzaXplcy5tYXAocyA9PiBzIC8gMTAwKTtcblxuICAgIGNvbnN0IHRvdGFsID0gc2l6ZXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCB2OiBudW1iZXIpID0+IHRvdGFsICsgdiwgMCk7XG4gICAgaWYgKCFpc1ZhbGlkVG90YWxTaXplKHRvdGFsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgYXJlYS5jb21wb25lbnQuX3NpemUgPSBzaXplc1tpXTtcbiAgICB9KVxuXG4gICAgdGhpcy5idWlsZChmYWxzZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkKHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcblxuICAgIC8vIMKkIEFSRUFTIE9SREVSXG5cbiAgICBpZiAocmVzZXRPcmRlcnMgPT09IHRydWUpIHtcblxuICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnb3JkZXInIGZvciBlYWNoIGFyZWEsIHVzZSBpdCB0byBzb3J0IHRoZW0uXG4gICAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcG9uZW50Lm9yZGVyICE9PSBudWxsKSkge1xuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNvcnQoKGEsIGIpID0+ICg8bnVtYmVyPmEuY29tcG9uZW50Lm9yZGVyKSAtICg8bnVtYmVyPmIuY29tcG9uZW50Lm9yZGVyKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZW4gc2V0IHJlYWwgb3JkZXIgd2l0aCBtdWx0aXBsZXMgb2YgMiwgbnVtYmVycyBiZXR3ZWVuIHdpbGwgYmUgdXNlZCBieSBndXR0ZXJzLlxuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XG4gICAgICAgIGFyZWEub3JkZXIgPSBpICogMjtcbiAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVPcmRlcihhcmVhLm9yZGVyKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICBpZiAocmVzZXRTaXplcyA9PT0gdHJ1ZSkge1xuXG4gICAgICBjb25zdCB0b3RhbFVzZXJTaXplID0gPG51bWJlcj50aGlzLmRpc3BsYXllZEFyZWFzLnJlZHVjZSgodG90YWw6IG51bWJlciwgczogSUFyZWEpID0+IHMuY29tcG9uZW50LnNpemUgPyB0b3RhbCArIHMuY29tcG9uZW50LnNpemUgOiB0b3RhbCwgMCk7XG5cbiAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ3NpemUnIGZvciBlYWNoIGFyZWEgYW5kIHRvdGFsID09IDEsIHVzZSBpdC5cbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wb25lbnQuc2l6ZSAhPT0gbnVsbCkgJiYgaXNWYWxpZFRvdGFsU2l6ZSh0b3RhbFVzZXJTaXplKSkge1xuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICBhcmVhLnNpemUgPSA8bnVtYmVyPmFyZWEuY29tcG9uZW50LnNpemU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gRWxzZSBzZXQgZXF1YWwgc2l6ZXMgZm9yIGFsbCBhcmVhcy5cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBzaXplID0gMSAvIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICBhcmVhLnNpemUgPSBzaXplO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDCpFxuICAgIC8vIElmIHNvbWUgcmVhbCBhcmVhIHNpemVzIGFyZSBsZXNzIHRoYW4gZ3V0dGVyU2l6ZSxcbiAgICAvLyBzZXQgdGhlbSB0byB6ZXJvIGFuZCBkaXNwYXRjaCBzaXplIHRvIG90aGVycy5cblxuICAgIGxldCBwZXJjZW50VG9EaXNwYXRjaCA9IDA7XG5cbiAgICAvLyBHZXQgY29udGFpbmVyIHBpeGVsIHNpemVcbiAgICBjb25zdCBjb250YWluZXJTaXplUGl4ZWwgPSBnZXRQaXhlbFNpemUodGhpcy5lbFJlZiwgdGhpcy5kaXJlY3Rpb24pO1xuXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgaWYgKGFyZWEuc2l6ZSAqIGNvbnRhaW5lclNpemVQaXhlbCA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICBwZXJjZW50VG9EaXNwYXRjaCArPSBhcmVhLnNpemU7XG4gICAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocGVyY2VudFRvRGlzcGF0Y2ggPiAwICYmIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmJBcmVhc05vdFplcm8gPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkubGVuZ3RoO1xuXG4gICAgICBpZiAobmJBcmVhc05vdFplcm8gPiAwKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRUb0FkZCA9IHBlcmNlbnRUb0Rpc3BhdGNoIC8gbmJBcmVhc05vdFplcm87XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5maWx0ZXIoYSA9PiBhLnNpemUgIT09IDApLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgYXJlYS5zaXplICs9IHBlcmNlbnRUb0FkZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBBbGwgYXJlYSBzaXplcyAoY29udGFpbmVyIHBlcmNlbnRhZ2UpIGFyZSBsZXNzIHRoYW4gZ3V0ZXJTaXplLFxuICAgICAgLy8gSXQgbWVhbnMgY29udGFpbmVyU2l6ZSA8IG5nR3V0dGVycyAqIGd1dHRlclNpemVcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzW3RoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMV0uc2l6ZSA9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoU3R5bGVTaXplcygpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hTdHlsZVNpemVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHN1bUd1dHRlclNpemUgPSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplO1xuXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4YmFzaXMoYGNhbGMoICR7YXJlYS5zaXplICogMTAwfSUgLSAke2FyZWEuc2l6ZSAqIHN1bUd1dHRlclNpemV9cHggKWApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsaWNrR3V0dGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBndXR0ZXJOdW06IG51bWJlcik6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5zdGFydFBvaW50ICYmIHRoaXMuc3RhcnRQb2ludC54ID09PSBldmVudC5jbGllbnRYICYmIHRoaXMuc3RhcnRQb2ludC55ID09PSBldmVudC5jbGllbnRZKSB7XG4gICAgICB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gPSBndXR0ZXJOdW07XG5cbiAgICAgIHRoaXMubm90aWZ5KCdjbGljaycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGFydERyYWdnaW5nKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZ3V0dGVyT3JkZXI6IG51bWJlciwgZ3V0dGVyTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5zdGFydFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgIGlmICghdGhpcy5zdGFydFBvaW50IHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVhQSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyIC0gMSk7XG4gICAgY29uc3QgYXJlYUIgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciArIDEpO1xuXG4gICAgaWYgKCFhcmVhQSB8fCAhYXJlYUIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxDb250YWluZXIgPSBnZXRQaXhlbFNpemUodGhpcy5lbFJlZiwgdGhpcy5kaXJlY3Rpb24pO1xuICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgPSBnZXRQaXhlbFNpemUoYXJlYUEuY29tcG9uZW50LmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiA9IGdldFBpeGVsU2l6ZShhcmVhQi5jb21wb25lbnQuZWxSZWYsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgPSBhcmVhQS5zaXplO1xuICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiA9IGFyZWFCLnNpemU7XG4gICAgdGhpcy5jdXJyZW50R3V0dGVyTnVtID0gZ3V0dGVyTnVtO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNldXAnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKSk7XG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKSk7XG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hjYW5jZWwnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKSk7XG5cbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5kcmFnRXZlbnQoZSwgYXJlYUEsIGFyZWFCKSkpO1xuICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIChlOiBUb3VjaEV2ZW50KSA9PiB0aGlzLmRyYWdFdmVudChlLCBhcmVhQSwgYXJlYUIpKSk7XG4gICAgfSk7XG5cbiAgICBhcmVhQS5jb21wb25lbnQubG9ja0V2ZW50cygpO1xuICAgIGFyZWFCLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XG5cbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZ3V0dGVyRWxzLnRvQXJyYXkoKVt0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dlZCcpO1xuXG4gICAgdGhpcy5ub3RpZnkoJ3N0YXJ0Jyk7XG4gIH1cblxuICBwcml2YXRlIGRyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGFyZWFBOiBJQXJlYSwgYXJlYUI6IElBcmVhKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbmRQb2ludCA9IGdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcbiAgICBpZiAoIXRoaXMuZW5kUG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyDCpCBBUkVBUyBTSVpFIFBJWEVMXG5cbiAgICBsZXQgb2Zmc2V0UGl4ZWwgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAodGhpcy5zdGFydFBvaW50LnggLSB0aGlzLmVuZFBvaW50LngpIDogKHRoaXMuc3RhcnRQb2ludC55IC0gdGhpcy5lbmRQb2ludC55KTtcbiAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICBvZmZzZXRQaXhlbCA9IC1vZmZzZXRQaXhlbDtcbiAgICB9XG5cbiAgICBsZXQgbmV3U2l6ZVBpeGVsQSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgLSBvZmZzZXRQaXhlbDtcbiAgICBsZXQgbmV3U2l6ZVBpeGVsQiA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKyBvZmZzZXRQaXhlbDtcblxuICAgIGlmIChuZXdTaXplUGl4ZWxBIDwgdGhpcy5ndXR0ZXJTaXplICYmIG5ld1NpemVQaXhlbEIgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgIC8vIFdURi4uIGdldCBvdXQgb2YgaGVyZSFcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAobmV3U2l6ZVBpeGVsQSA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgbmV3U2l6ZVBpeGVsQiArPSBuZXdTaXplUGl4ZWxBO1xuICAgICAgbmV3U2l6ZVBpeGVsQSA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5ld1NpemVQaXhlbEIgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgIG5ld1NpemVQaXhlbEEgKz0gbmV3U2l6ZVBpeGVsQjtcbiAgICAgIG5ld1NpemVQaXhlbEIgPSAwO1xuICAgIH1cblxuICAgIC8vIMKkIEFSRUFTIFNJWkUgUEVSQ0VOVFxuXG4gICAgaWYgKG5ld1NpemVQaXhlbEEgPT09IDApIHtcbiAgICAgIGFyZWFCLnNpemUgKz0gYXJlYUEuc2l6ZTtcbiAgICAgIGFyZWFBLnNpemUgPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChuZXdTaXplUGl4ZWxCID09PSAwKSB7XG4gICAgICBhcmVhQS5zaXplICs9IGFyZWFCLnNpemU7XG4gICAgICBhcmVhQi5zaXplID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBORVdfUEVSQ0VOVCA9IFNUQVJUX1BFUkNFTlQgLyBTVEFSVF9QSVhFTCAqIE5FV19QSVhFTDtcbiAgICAgIGlmICh0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgPT09IDApIHtcbiAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKiBuZXdTaXplUGl4ZWxCO1xuICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCIC0gYXJlYUIuc2l6ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiA9PT0gMCkge1xuICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgIGFyZWFCLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgLSBhcmVhQS5zaXplO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgLyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBICogbmV3U2l6ZVBpeGVsQTtcbiAgICAgICAgYXJlYUIuc2l6ZSA9ICh0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgKyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIpIC0gYXJlYUEuc2l6ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG5cbiAgICAvLyBJZiBtb3ZlZCBmcm9tIHN0YXJ0aW5nIHBvaW50LCBub3RpZnkgcHJvZ3Jlc3NcbiAgICBpZiAodGhpcy5zdGFydFBvaW50LnggIT09IHRoaXMuZW5kUG9pbnQueCB8fCB0aGlzLnN0YXJ0UG9pbnQueSAhPT0gdGhpcy5lbmRQb2ludC55KSB7XG4gICAgICB0aGlzLm5vdGlmeSgncHJvZ3Jlc3MnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0b3BEcmFnZ2luZyhldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBhcmVhLmNvbXBvbmVudC51bmxvY2tFdmVudHMoKTtcbiAgICB9KTtcblxuICAgIHdoaWxlICh0aGlzLmRyYWdMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmN0ID0gdGhpcy5kcmFnTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgaWYgKGZjdCkge1xuICAgICAgICBmY3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBtb3ZlZCBmcm9tIHN0YXJ0aW5nIHBvaW50LCBub3RpZnkgZW5kXG4gICAgaWYgKGV2ZW50ICYmIHRoaXMuZW5kUG9pbnQgJiYgKHRoaXMuc3RhcnRQb2ludC54ICE9PSB0aGlzLmVuZFBvaW50LnggfHwgdGhpcy5zdGFydFBvaW50LnkgIT09IHRoaXMuZW5kUG9pbnQueSkpIHtcbiAgICAgIHRoaXMubm90aWZ5KCdlbmQnKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLWRyYWdnaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmd1dHRlckVscy50b0FycmF5KClbdGhpcy5jdXJyZW50R3V0dGVyTnVtIC0gMV0ubmF0aXZlRWxlbWVudCwgJ2lzLWRyYWdnZWQnKTtcblxuICAgIC8vIE5lZWRlZCB0byBsZXQgKGNsaWNrKT1cImNsaWNrR3V0dGVyKC4uLilcIiBldmVudCBydW4gYW5kIHZlcmlmeSBpZiBtb3VzZSBtb3ZlZCBvciBub3RcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zdGFydFBvaW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbmRQb2ludCA9IG51bGw7XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5vdGlmeSh0eXBlOiAnc3RhcnQnIHwgJ3Byb2dyZXNzJyB8ICdlbmQnIHwgJ2NsaWNrJyB8ICd0cmFuc2l0aW9uRW5kJyk6IHZvaWQge1xuICAgIGNvbnN0IHNpemVzOiBBcnJheTxudW1iZXI+ID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5tYXAoYSA9PiBhLnNpemUgKiAxMDApO1xuXG4gICAgaWYgKHR5cGUgPT09ICdzdGFydCcpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdTdGFydFN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaWJlci5uZXh0KHsgZ3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ2VuZCcpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdFbmRTdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdFbmRTdWJzY3JpYmVyLm5leHQoeyBndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXMgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnY2xpY2snKSB7XG4gICAgICBpZiAodGhpcy5ndXR0ZXJDbGlja1N1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZ3V0dGVyQ2xpY2tTdWJzY3JpYmVyLm5leHQoeyBndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXMgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAndHJhbnNpdGlvbkVuZCcpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25FbmRTdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnRyYW5zaXRpb25FbmRTdWJzY3JpYmVyLm5leHQoc2l6ZXMpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ3Byb2dyZXNzJykge1xuICAgICAgLy8gU3RheSBvdXRzaWRlIHpvbmUgdG8gYWxsb3cgdXNlcnMgZG8gd2hhdCB0aGV5IHdhbnQgYWJvdXQgY2hhbmdlIGRldGVjdGlvbiBtZWNoYW5pc20uXG4gICAgICB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QubmV4dCh7IGd1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplcyB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgfVxufVxuIl19