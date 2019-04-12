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
        if (this.displayedAreas.some(a => a.component === component)) {
            const area = this.displayedAreas.find(a => a.component === component);
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some(a => a.component === component)) {
            const area = this.hidedAreas.find(a => a.component === component);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQTRCLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TCxPQUFPLEVBQUUsVUFBVSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQXFCSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBNkh2QixZQUFvQixNQUFjLEVBQ2QsS0FBaUIsRUFDakIsS0FBd0IsRUFDeEIsUUFBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTlIL0IsZUFBVSxHQUE4QixZQUFZLENBQUM7UUFlN0QsSUFBSTtRQUVJLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBYWpDLElBQUk7UUFFSSxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQWF4QyxJQUFJO1FBRUksY0FBUyxHQUFZLEtBQUssQ0FBQztRQWFuQyxJQUFJO1FBRUksU0FBSSxHQUFrQixLQUFLLENBQUM7UUFxQzVCLHdCQUFtQixHQUF1RCxJQUFJLE9BQU8sRUFBRSxDQUFDO1FB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bnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElBcmVhIH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lBcmVhJztcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZS9JUG9pbnQnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZ2V0UG9pbnRGcm9tRXZlbnQsIGdldFBpeGVsU2l6ZSwgZ2V0SW5wdXRCb29sZWFuLCBpc1ZhbGlkVG90YWxTaXplIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vKipcbiAqIGFuZ3VsYXItc3BsaXRcbiAqXG4gKiBBcmVhcyBzaXplIGFyZSBzZXQgaW4gcGVyY2VudGFnZSBvZiB0aGUgc3BsaXQgY29udGFpbmVyLlxuICogR3V0dGVycyBzaXplIGFyZSBzZXQgaW4gcGl4ZWxzLlxuICpcbiAqIFNvIHdlIHNldCBjc3MgJ2ZsZXgtYmFzaXMnIHByb3BlcnR5IGxpa2UgdGhpcyAod2hlcmUgMCA8PSBhcmVhLnNpemUgPD0gMSk6XG4gKiAgY2FsYyggeyBhcmVhLnNpemUgKiAxMDAgfSUgLSB7IGFyZWEuc2l6ZSAqIG5iR3V0dGVyICogZ3V0dGVyU2l6ZSB9cHggKTtcbiAqXG4gKiBFeGFtcGxlcyB3aXRoIDMgdmlzaWJsZSBhcmVhcyBhbmQgMiBndXR0ZXJzOlxuICpcbiAqIHwgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBjYWxjKDIwJSAtIDRweCkgICAgICAgICAgY2FsYygyMCUgLSA0cHgpICAgICAgICAgICAgICBjYWxjKDYwJSAtIDEycHgpICAgICAgICAgIHxcbiAqXG4gKlxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgICAgICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgfFxuICpcbiAqXG4gKiB8MTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgICAgICAgICAgICAgICAgIGNhbGMoNjYuNjYlIC0gMTMuMzMzcHgpICAgICAgICAgICAgICAgICAgY2FsYygzMyUlIC0gNi42NjdweCkgICB8XG4gKlxuICpcbiAqICAxMHB4IDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfFtdW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8MCAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGMoMTAwJSAtIDIwcHgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVVcmxzOiBbYC4vc3BsaXQuY29tcG9uZW50LnNjc3NgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJkaXNwbGF5ZWRBcmVhc1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAjZ3V0dGVyRWxzXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiYXMtc3BsaXQtZ3V0dGVyXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtYmFzaXMucHhdPVwiZ3V0dGVyU2l6ZVwiXG4gICAgICAgICAgICAgICAgIFtzdHlsZS5vcmRlcl09XCJpbmRleCoyKzFcIlxuICAgICAgICAgICAgICAgICAoYXMtc3BsaXQtdW5kZXRlY3RlZC5jbGljayk9XCJjbGlja0d1dHRlcigkZXZlbnQsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgICAgKGFzLXNwbGl0LXVuZGV0ZWN0ZWQubW91c2Vkb3duKT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgICAgKGFzLXNwbGl0LXVuZGV0ZWN0ZWQudG91Y2hzdGFydCk9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxLCBpbmRleCsxKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1zcGxpdC1ndXR0ZXItaWNvblwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+YCxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgc2V0IGRpcmVjdGlvbih2OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9ICh2ID09PSAndmVydGljYWwnKSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBpcy0keyB0aGlzLl9kaXJlY3Rpb24gfWApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgYGlzLSR7ICh0aGlzLl9kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJyB9YCk7XG5cbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGdldCBkaXJlY3Rpb24oKTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVyU2l6ZTogbnVtYmVyID0gMTE7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVyU2l6ZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fZ3V0dGVyU2l6ZSA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IDExO1xuXG4gICAgICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBnZXQgZ3V0dGVyU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF91c2VUcmFuc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgdXNlVHJhbnNpdGlvbih2OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3VzZVRyYW5zaXRpb24gPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICAgICAgaWYodGhpcy5fdXNlVHJhbnNpdGlvbikgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy10cmFuc2l0aW9uJyk7XG4gICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtdHJhbnNpdGlvbicpO1xuICAgIH1cblxuICAgIGdldCB1c2VUcmFuc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICAgICAgaWYodGhpcy5fZGlzYWJsZWQpICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIGVsc2UgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2RpcjogJ2x0cicgfCAncnRsJyA9ICdsdHInO1xuXG4gICAgQElucHV0KCkgc2V0IGRpcih2OiAnbHRyJyB8ICdydGwnKSB7XG4gICAgICAgIHYgPSAodiA9PT0gJ3J0bCcpID8gJ3J0bCcgOiAnbHRyJztcbiAgICAgICAgdGhpcy5fZGlyID0gdjtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkaXInLCB0aGlzLl9kaXIpO1xuICAgIH1cblxuICAgIGdldCBkaXIoKTogJ2x0cicgfCAncnRsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXI7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBkcmFnU3RhcnRTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PlxuICAgIEBPdXRwdXQoKSBnZXQgZHJhZ1N0YXJ0KCk6IE9ic2VydmFibGU8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy5kcmFnU3RhcnRTdWJzY3JpYmVyID0gc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnRW5kU3Vic2NyaWJlcjogU3Vic2NyaWJlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT5cbiAgICBAT3V0cHV0KCkgZ2V0IGRyYWdFbmQoKTogT2JzZXJ2YWJsZTx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB0aGlzLmRyYWdFbmRTdWJzY3JpYmVyID0gc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBndXR0ZXJDbGlja1N1YnNjcmliZXI6IFN1YnNjcmliZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+XG4gICAgQE91dHB1dCgpIGdldCBndXR0ZXJDbGljaygpOiBPYnNlcnZhYmxlPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHRoaXMuZ3V0dGVyQ2xpY2tTdWJzY3JpYmVyID0gc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uRW5kU3Vic2NyaWJlcjogU3Vic2NyaWJlcjxBcnJheTxudW1iZXI+PlxuICAgIEBPdXRwdXQoKSBnZXQgdHJhbnNpdGlvbkVuZCgpOiBPYnNlcnZhYmxlPEFycmF5PG51bWJlcj4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpLnBpcGUoXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWU8QXJyYXk8bnVtYmVyPj4oMjApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnUHJvZ3Jlc3NTdWJqZWN0OiBTdWJqZWN0PHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgZHJhZ1Byb2dyZXNzJDogT2JzZXJ2YWJsZTx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4gPSB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGN1cnJlbnRHdXR0ZXJOdW06IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzdGFydFBvaW50OiBJUG9pbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGVuZFBvaW50OiBJUG9pbnQgfCBudWxsID0gbnVsbDtcblxuICAgIHB1YmxpYyByZWFkb25seSBkaXNwbGF5ZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBoaWRlZEFyZWFzOiBBcnJheTxJQXJlYT4gPSBbXTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0xpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBkcmFnU3RhcnRWYWx1ZXMgPSB7XG4gICAgICAgIHNpemVQaXhlbENvbnRhaW5lcjogMCxcbiAgICAgICAgc2l6ZVBpeGVsQTogMCxcbiAgICAgICAgc2l6ZVBpeGVsQjogMCxcbiAgICAgICAgc2l6ZVBlcmNlbnRBOiAwLFxuICAgICAgICBzaXplUGVyY2VudEI6IDAsXG4gICAgfTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oJ2d1dHRlckVscycpIHByaXZhdGUgZ3V0dGVyRWxzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgICAgIC8vIFRvIGZvcmNlIGFkZGluZyBkZWZhdWx0IGNsYXNzLCBjb3VsZCBiZSBvdmVycmlkZSBieSB1c2VyIEBJbnB1dCgpIG9yIG5vdFxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAvLyBUbyBhdm9pZCB0cmFuc2l0aW9uIGF0IGZpcnN0IHJlbmRlcmluZ1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLWluaXQnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmJHdXR0ZXJzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDApID8gMCA6IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdBcmVhOiBJQXJlYSA9IHtcbiAgICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICAgIG9yZGVyOiAwLFxuICAgICAgICAgICAgc2l6ZTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZihjb21wb25lbnQudmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlZEFyZWFzLnB1c2gobmV3QXJlYSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSkge1xuICAgICAgICAgICAgY29uc3QgYXJlYSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcblxuICAgICAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuaGlkZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgICAgICAgICAgdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSwgcmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gT25seSByZWZyZXNoIGlmIGFyZWEgaXMgZGlzcGxheWVkIChObyBuZWVkIHRvIGNoZWNrIGluc2lkZSAnaGlkZWRBcmVhcycpXG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICAgICAgaWYoIWFyZWEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVpbGQocmVzZXRPcmRlcnMsIHJlc2V0U2l6ZXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICAgICAgaWYoIWFyZWEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcCk7XG4gICAgICAgIGlmKCFhcmVhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhcmVhcyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgIGFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLm9yZGVyID0gMDtcbiAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKC4uLmFyZWFzKTtcblxuICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRWaXNpYmxlQXJlYVNpemVzKCk6IEFycmF5PG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5tYXAoYSA9PiBhLnNpemUgKiAxMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRWaXNpYmxlQXJlYVNpemVzKHNpemVzOiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHNpemVzLmxlbmd0aCAhPT0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNpemVzID0gc2l6ZXMubWFwKHMgPT4gcyAvIDEwMCk7XG5cbiAgICAgICAgY29uc3QgdG90YWwgPSBzaXplcy5yZWR1Y2UoKHRvdGFsOiBudW1iZXIsIHY6IG51bWJlcikgPT4gdG90YWwgKyB2LCAwKTtcbiAgICAgICAgaWYoIWlzVmFsaWRUb3RhbFNpemUodG90YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGFyZWEuY29tcG9uZW50Ll9zaXplID0gc2l6ZXNbaV07XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGQocmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcblxuICAgICAgICAvLyDCpCBBUkVBUyBPUkRFUlxuXG4gICAgICAgIGlmKHJlc2V0T3JkZXJzID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ29yZGVyJyBmb3IgZWFjaCBhcmVhLCB1c2UgaXQgdG8gc29ydCB0aGVtLlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcG9uZW50Lm9yZGVyICE9PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc29ydCgoYSwgYikgPT4gKDxudW1iZXI+IGEuY29tcG9uZW50Lm9yZGVyKSAtICg8bnVtYmVyPiBiLmNvbXBvbmVudC5vcmRlcikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUaGVuIHNldCByZWFsIG9yZGVyIHdpdGggbXVsdGlwbGVzIG9mIDIsIG51bWJlcnMgYmV0d2VlbiB3aWxsIGJlIHVzZWQgYnkgZ3V0dGVycy5cbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGFyZWEub3JkZXIgPSBpICogMjtcbiAgICAgICAgICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZU9yZGVyKGFyZWEub3JkZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIMKkIEFSRUFTIFNJWkUgUEVSQ0VOVFxuXG4gICAgICAgIGlmKHJlc2V0U2l6ZXMgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgY29uc3QgdG90YWxVc2VyU2l6ZSA9IDxudW1iZXI+IHRoaXMuZGlzcGxheWVkQXJlYXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzOiBJQXJlYSkgPT4gcy5jb21wb25lbnQuc2l6ZSA/IHRvdGFsICsgcy5jb21wb25lbnQuc2l6ZSA6IHRvdGFsLCAwKTtcblxuICAgICAgICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnc2l6ZScgZm9yIGVhY2ggYXJlYSBhbmQgdG90YWwgPT0gMSwgdXNlIGl0LlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcG9uZW50LnNpemUgIT09IG51bGwpICYmIGlzVmFsaWRUb3RhbFNpemUodG90YWxVc2VyU2l6ZSkgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDxudW1iZXI+IGFyZWEuY29tcG9uZW50LnNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFbHNlIHNldCBlcXVhbCBzaXplcyBmb3IgYWxsIGFyZWFzLlxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IDEgLyB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gc2l6ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIMKkXG4gICAgICAgIC8vIElmIHNvbWUgcmVhbCBhcmVhIHNpemVzIGFyZSBsZXNzIHRoYW4gZ3V0dGVyU2l6ZSxcbiAgICAgICAgLy8gc2V0IHRoZW0gdG8gemVybyBhbmQgZGlzcGF0Y2ggc2l6ZSB0byBvdGhlcnMuXG5cbiAgICAgICAgbGV0IHBlcmNlbnRUb0Rpc3BhdGNoID0gMDtcblxuICAgICAgICAvLyBHZXQgY29udGFpbmVyIHBpeGVsIHNpemVcbiAgICAgICAgY29uc3QgY29udGFpbmVyU2l6ZVBpeGVsID0gZ2V0UGl4ZWxTaXplKHRoaXMuZWxSZWYsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBpZihhcmVhLnNpemUgKiBjb250YWluZXJTaXplUGl4ZWwgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgICAgICBwZXJjZW50VG9EaXNwYXRjaCArPSBhcmVhLnNpemU7XG4gICAgICAgICAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYocGVyY2VudFRvRGlzcGF0Y2ggPiAwICYmIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmJBcmVhc05vdFplcm8gPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZihuYkFyZWFzTm90WmVybyA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50VG9BZGQgPSBwZXJjZW50VG9EaXNwYXRjaCAvIG5iQXJlYXNOb3RaZXJvO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5maWx0ZXIoYSA9PiBhLnNpemUgIT09IDApLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSArPSBwZXJjZW50VG9BZGQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbGwgYXJlYSBzaXplcyAoY29udGFpbmVyIHBlcmNlbnRhZ2UpIGFyZSBsZXNzIHRoYW4gZ3V0ZXJTaXplLFxuICAgICAgICAgICAgLy8gSXQgbWVhbnMgY29udGFpbmVyU2l6ZSA8IG5nR3V0dGVycyAqIGd1dHRlclNpemVcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxXS5zaXplID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZVNpemVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdW1HdXR0ZXJTaXplID0gdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZTtcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZUZsZXhiYXNpcyhgY2FsYyggJHsgYXJlYS5zaXplICogMTAwIH0lIC0gJHsgYXJlYS5zaXplICogc3VtR3V0dGVyU2l6ZSB9cHggKWApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2tHdXR0ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGd1dHRlck51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmKHRoaXMuc3RhcnRQb2ludCAmJiB0aGlzLnN0YXJ0UG9pbnQueCA9PT0gZXZlbnQuY2xpZW50WCAmJiB0aGlzLnN0YXJ0UG9pbnQueSA9PT0gZXZlbnQuY2xpZW50WSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50R3V0dGVyTnVtID0gZ3V0dGVyTnVtO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydERyYWdnaW5nKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZ3V0dGVyT3JkZXI6IG51bWJlciwgZ3V0dGVyTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zdGFydFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgICAgICBpZighdGhpcy5zdGFydFBvaW50IHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFyZWFBID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgLSAxKTtcbiAgICAgICAgY29uc3QgYXJlYUIgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciArIDEpO1xuXG4gICAgICAgIGlmKCFhcmVhQSB8fCAhYXJlYUIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbENvbnRhaW5lciA9IGdldFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgPSBnZXRQaXhlbFNpemUoYXJlYUEuY29tcG9uZW50LmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgPSBnZXRQaXhlbFNpemUoYXJlYUIuY29tcG9uZW50LmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9IGFyZWFBLnNpemU7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiA9IGFyZWFCLnNpemU7XG4gICAgICAgIHRoaXMuY3VycmVudEd1dHRlck51bSA9IGd1dHRlck51bTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNldXAnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKSApO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpICk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgdGhpcy5zdG9wRHJhZ2dpbmcuYmluZCh0aGlzKSkgKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5kcmFnRXZlbnQoZSwgYXJlYUEsIGFyZWFCKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIGFyZWFBLCBhcmVhQikpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFyZWFBLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XG4gICAgICAgIGFyZWFCLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kcmFnZ2luZycpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZ3V0dGVyRWxzLnRvQXJyYXkoKVt0aGlzLmN1cnJlbnRHdXR0ZXJOdW0tMV0ubmF0aXZlRWxlbWVudCwgJ2lzLWRyYWdnZWQnKTtcblxuICAgICAgICB0aGlzLm5vdGlmeSgnc3RhcnQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGFyZWFBOiBJQXJlYSwgYXJlYUI6IElBcmVhKTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmKCF0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5kUG9pbnQgPSBnZXRQb2ludEZyb21FdmVudChldmVudCk7XG4gICAgICAgIGlmKCF0aGlzLmVuZFBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyDCpCBBUkVBUyBTSVpFIFBJWEVMXG5cbiAgICAgICAgbGV0IG9mZnNldFBpeGVsID0gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gKHRoaXMuc3RhcnRQb2ludC54IC0gdGhpcy5lbmRQb2ludC54KSA6ICh0aGlzLnN0YXJ0UG9pbnQueSAtIHRoaXMuZW5kUG9pbnQueSk7XG4gICAgICAgIGlmKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgICAgICAgb2Zmc2V0UGl4ZWwgPSAtb2Zmc2V0UGl4ZWw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U2l6ZVBpeGVsQSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgLSBvZmZzZXRQaXhlbDtcbiAgICAgICAgbGV0IG5ld1NpemVQaXhlbEIgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCICsgb2Zmc2V0UGl4ZWw7XG5cbiAgICAgICAgaWYobmV3U2l6ZVBpeGVsQSA8IHRoaXMuZ3V0dGVyU2l6ZSAmJiBuZXdTaXplUGl4ZWxCIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICAvLyBXVEYuLiBnZXQgb3V0IG9mIGhlcmUhXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxBIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxCICs9IG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxBID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG5ld1NpemVQaXhlbEIgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgIG5ld1NpemVQaXhlbEEgKz0gbmV3U2l6ZVBpeGVsQjtcbiAgICAgICAgICAgIG5ld1NpemVQaXhlbEIgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICAgICAgaWYobmV3U2l6ZVBpeGVsQSA9PT0gMCkge1xuICAgICAgICAgICAgYXJlYUIuc2l6ZSArPSBhcmVhQS5zaXplO1xuICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCID09PSAwKSB7XG4gICAgICAgICAgICBhcmVhQS5zaXplICs9IGFyZWFCLnNpemU7XG4gICAgICAgICAgICBhcmVhQi5zaXplID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5FV19QRVJDRU5UID0gU1RBUlRfUEVSQ0VOVCAvIFNUQVJUX1BJWEVMICogTkVXX1BJWEVMO1xuICAgICAgICAgICAgaWYodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKiBuZXdTaXplUGl4ZWxCO1xuICAgICAgICAgICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLSBhcmVhQi5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAtIGFyZWFBLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9ICh0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgKyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIpIC0gYXJlYUEuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcblxuICAgICAgICAvLyBJZiBtb3ZlZCBmcm9tIHN0YXJ0aW5nIHBvaW50LCBub3RpZnkgcHJvZ3Jlc3NcbiAgICAgICAgaWYodGhpcy5zdGFydFBvaW50LnggIT09IHRoaXMuZW5kUG9pbnQueCB8fCB0aGlzLnN0YXJ0UG9pbnQueSAhPT0gdGhpcy5lbmRQb2ludC55KSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgncHJvZ3Jlc3MnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcERyYWdnaW5nKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaXNEcmFnZ2luZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcG9uZW50LnVubG9ja0V2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aGlsZSh0aGlzLmRyYWdMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5kcmFnTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgICAgICAgaWYoZmN0KSB7XG4gICAgICAgICAgICAgICAgZmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBtb3ZlZCBmcm9tIHN0YXJ0aW5nIHBvaW50LCBub3RpZnkgZW5kXG4gICAgICAgIGlmKGV2ZW50ICYmIHRoaXMuZW5kUG9pbnQgJiYgKHRoaXMuc3RhcnRQb2ludC54ICE9PSB0aGlzLmVuZFBvaW50LnggfHwgdGhpcy5zdGFydFBvaW50LnkgIT09IHRoaXMuZW5kUG9pbnQueSkpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCdlbmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLWRyYWdnaW5nJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ndXR0ZXJFbHMudG9BcnJheSgpW3RoaXMuY3VycmVudEd1dHRlck51bS0xXS5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dlZCcpO1xuXG4gICAgICAgIC8vIE5lZWRlZCB0byBsZXQgKGNsaWNrKT1cImNsaWNrR3V0dGVyKC4uLilcIiBldmVudCBydW4gYW5kIHZlcmlmeSBpZiBtb3VzZSBtb3ZlZCBvciBub3RcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFBvaW50ID0gbnVsbDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3RpZnkodHlwZTogJ3N0YXJ0JyB8ICdwcm9ncmVzcycgfCAnZW5kJyB8ICdjbGljaycgfCAndHJhbnNpdGlvbkVuZCcpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2l6ZXM6IEFycmF5PG51bWJlcj4gPSB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuc2l6ZSAqIDEwMCk7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgaWYodGhpcy5kcmFnU3RhcnRTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaWJlci5uZXh0KHtndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXN9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlID09PSAnZW5kJykge1xuICAgICAgICAgICAgaWYodGhpcy5kcmFnRW5kU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdFbmRTdWJzY3JpYmVyLm5leHQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplc30pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZ3V0dGVyQ2xpY2tTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZ3V0dGVyQ2xpY2tTdWJzY3JpYmVyLm5leHQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplc30pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGUgPT09ICd0cmFuc2l0aW9uRW5kJykge1xuICAgICAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnRyYW5zaXRpb25FbmRTdWJzY3JpYmVyLm5leHQoc2l6ZXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGUgPT09ICdwcm9ncmVzcycpIHtcbiAgICAgICAgICAgIC8vIFN0YXkgb3V0c2lkZSB6b25lIHRvIGFsbG93IHVzZXJzIGRvIHdoYXQgdGhleSB3YW50IGFib3V0IGNoYW5nZSBkZXRlY3Rpb24gbWVjaGFuaXNtLlxuICAgICAgICAgICAgdGhpcy5kcmFnUHJvZ3Jlc3NTdWJqZWN0Lm5leHQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplc30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH1cbn1cbiJdfQ==