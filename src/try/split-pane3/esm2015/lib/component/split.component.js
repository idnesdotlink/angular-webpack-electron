import * as tslib_1 from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ElementRef, NgZone, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { getInputPositiveNumber, getInputBoolean, isUserSizesValid, getAreaMinSize, getAreaMaxSize, getPointFromEvent, getElementPixelSize, getGutterSideAbsorptionCapacity, updateAreaSize } from '../utils';
/**
 * angular-split
 *
 *
 *  PERCENT MODE ([unit]="'percent'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |       20                 30                 20                 15                 15      | <-- [size]="x"
 * |               10px               10px               10px               10px               | <-- [gutterSize]="10"
 * |calc(20% - 8px)    calc(30% - 12px)   calc(20% - 8px)    calc(15% - 6px)    calc(15% - 6px)| <-- CSS flex-basis property (with flex-grow&shrink at 0)
 * |     152px              228px              152px              114px              114px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <-- el.getBoundingClientRect().width
 *  flex-basis = calc( { area.size }% - { area.size/100 * nbGutter*gutterSize }px );
 *
 *
 *  PIXEL MODE ([unit]="'pixel'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |      100                250                 *                 150                100      | <-- [size]="y"
 * |               10px               10px               10px               10px               | <-- [gutterSize]="10"
 * |   0 0 100px          0 0 250px           1 1 auto          0 0 150px          0 0 100px   | <-- CSS flex property (flex-grow/flex-shrink/flex-basis)
 * |     100px              250px              200px              150px              100px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <-- el.getBoundingClientRect().width
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
        this._unit = 'percent';
        ////
        this._gutterSize = 11;
        ////
        this._gutterStep = 1;
        ////
        this._restrictMove = false;
        ////
        this._useTransition = false;
        ////
        this._disabled = false;
        ////
        this._dir = 'ltr';
        ////
        this._gutterDblClickDuration = 0;
        ////
        this.dragStart = new EventEmitter(false);
        this.dragEnd = new EventEmitter(false);
        this.gutterClick = new EventEmitter(false);
        this.gutterDblClick = new EventEmitter(false);
        this.dragProgressSubject = new Subject();
        this.dragProgress$ = this.dragProgressSubject.asObservable();
        ////
        this.isDragging = false;
        this.dragListeners = [];
        this.snapshot = null;
        this.startPoint = null;
        this.endPoint = null;
        this.displayedAreas = [];
        this.hidedAreas = [];
        this._clickTimeout = null;
        // To force adding default class, could be override by user @Input() or not
        this.direction = this._direction;
    }
    set direction(v) {
        this._direction = (v === 'vertical') ? 'vertical' : 'horizontal';
        this.renderer.addClass(this.elRef.nativeElement, `as-${this._direction}`);
        this.renderer.removeClass(this.elRef.nativeElement, `as-${(this._direction === 'vertical') ? 'horizontal' : 'vertical'}`);
        this.build(false, false);
    }
    get direction() {
        return this._direction;
    }
    set unit(v) {
        this._unit = (v === 'pixel') ? 'pixel' : 'percent';
        this.renderer.addClass(this.elRef.nativeElement, `as-${this._unit}`);
        this.renderer.removeClass(this.elRef.nativeElement, `as-${(this._unit === 'pixel') ? 'percent' : 'pixel'}`);
        this.build(false, true);
    }
    get unit() {
        return this._unit;
    }
    set gutterSize(v) {
        this._gutterSize = getInputPositiveNumber(v, 11);
        this.build(false, false);
    }
    get gutterSize() {
        return this._gutterSize;
    }
    set gutterStep(v) {
        this._gutterStep = getInputPositiveNumber(v, 1);
    }
    get gutterStep() {
        return this._gutterStep;
    }
    set restrictMove(v) {
        this._restrictMove = getInputBoolean(v);
    }
    get restrictMove() {
        return this._restrictMove;
    }
    set useTransition(v) {
        this._useTransition = getInputBoolean(v);
        if (this._useTransition)
            this.renderer.addClass(this.elRef.nativeElement, 'as-transition');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'as-transition');
    }
    get useTransition() {
        return this._useTransition;
    }
    set disabled(v) {
        this._disabled = getInputBoolean(v);
        if (this._disabled)
            this.renderer.addClass(this.elRef.nativeElement, 'as-disabled');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'as-disabled');
    }
    get disabled() {
        return this._disabled;
    }
    set dir(v) {
        this._dir = (v === 'rtl') ? 'rtl' : 'ltr';
        this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
    }
    get dir() {
        return this._dir;
    }
    set gutterDblClickDuration(v) {
        this._gutterDblClickDuration = getInputPositiveNumber(v, 0);
    }
    get gutterDblClickDuration() {
        return this._gutterDblClickDuration;
    }
    get transitionEnd() {
        return new Observable(subscriber => this.transitionEndSubscriber = subscriber).pipe(debounceTime(20));
    }
    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            // To avoid transition at first rendering
            setTimeout(() => this.renderer.addClass(this.elRef.nativeElement, 'as-init'));
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
            minSize: null,
            maxSize: null,
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
        if (component.visible === true) {
            this.build(resetOrders, resetSizes);
        }
    }
    showArea(component) {
        const area = this.hidedAreas.find(a => a.component === component);
        if (area === undefined) {
            return;
        }
        const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        this.displayedAreas.push(...areas);
        this.build(true, true);
    }
    hideArea(comp) {
        const area = this.displayedAreas.find(a => a.component === comp);
        if (area === undefined) {
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
        return this.displayedAreas.map(a => a.size === null ? '*' : a.size);
    }
    setVisibleAreaSizes(sizes) {
        if (sizes.length !== this.displayedAreas.length) {
            return false;
        }
        const formatedSizes = sizes.map(s => getInputPositiveNumber(s, null));
        const isValid = isUserSizesValid(this.unit, formatedSizes);
        if (isValid === false) {
            return false;
        }
        // @ts-ignore
        this.displayedAreas.forEach((area, i) => area.component._size = formatedSizes[i]);
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
        // ¤ AREAS SIZE
        if (resetSizes === true) {
            const useUserSizes = isUserSizesValid(this.unit, this.displayedAreas.map(a => a.component.size));
            switch (this.unit) {
                case 'percent': {
                    const defaultSize = 100 / this.displayedAreas.length;
                    this.displayedAreas.forEach(area => {
                        area.size = useUserSizes ? area.component.size : defaultSize;
                        area.minSize = getAreaMinSize(area);
                        area.maxSize = getAreaMaxSize(area);
                    });
                    break;
                }
                case 'pixel': {
                    if (useUserSizes) {
                        this.displayedAreas.forEach(area => {
                            area.size = area.component.size;
                            area.minSize = getAreaMinSize(area);
                            area.maxSize = getAreaMaxSize(area);
                        });
                    }
                    else {
                        const wildcardSizeAreas = this.displayedAreas.filter(a => a.component.size === null);
                        // No wildcard area > Need to select one arbitrarily > first
                        if (wildcardSizeAreas.length === 0 && this.displayedAreas.length > 0) {
                            this.displayedAreas.forEach((area, i) => {
                                area.size = (i === 0) ? null : area.component.size;
                                area.minSize = (i === 0) ? null : getAreaMinSize(area);
                                area.maxSize = (i === 0) ? null : getAreaMaxSize(area);
                            });
                        }
                        // More than one wildcard area > Need to keep only one arbitrarly > first
                        else if (wildcardSizeAreas.length > 1) {
                            let alreadyGotOne = false;
                            this.displayedAreas.forEach(area => {
                                if (area.component.size === null) {
                                    if (alreadyGotOne === false) {
                                        area.size = null;
                                        area.minSize = null;
                                        area.maxSize = null;
                                        alreadyGotOne = true;
                                    }
                                    else {
                                        area.size = 100;
                                        area.minSize = null;
                                        area.maxSize = null;
                                    }
                                }
                                else {
                                    area.size = area.component.size;
                                    area.minSize = getAreaMinSize(area);
                                    area.maxSize = getAreaMaxSize(area);
                                }
                            });
                        }
                    }
                    break;
                }
            }
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }
    refreshStyleSizes() {
        ///////////////////////////////////////////
        // PERCENT MODE
        if (this.unit === 'percent') {
            // Only one area > flex-basis 100%
            if (this.displayedAreas.length === 1) {
                this.displayedAreas[0].component.setStyleFlex(0, 0, `100%`, false, false);
            }
            // Multiple areas > use each percent basis
            else {
                const sumGutterSize = this.getNbGutters() * this.gutterSize;
                this.displayedAreas.forEach(area => {
                    area.component.setStyleFlex(0, 0, `calc( ${area.size}% - ${area.size / 100 * sumGutterSize}px )`, (area.minSize !== null && area.minSize === area.size) ? true : false, (area.maxSize !== null && area.maxSize === area.size) ? true : false);
                });
            }
        }
        ///////////////////////////////////////////
        // PIXEL MODE
        else if (this.unit === 'pixel') {
            this.displayedAreas.forEach(area => {
                // Area with wildcard size
                if (area.size === null) {
                    if (this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(1, 1, `100%`, false, false);
                    }
                    else {
                        area.component.setStyleFlex(1, 1, `auto`, false, false);
                    }
                }
                // Area with pixel size
                else {
                    // Only one area > flex-basis 100%
                    if (this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(0, 0, `100%`, false, false);
                    }
                    // Multiple areas > use each pixel basis
                    else {
                        area.component.setStyleFlex(0, 0, `${area.size}px`, (area.minSize !== null && area.minSize === area.size) ? true : false, (area.maxSize !== null && area.maxSize === area.size) ? true : false);
                    }
                }
            });
        }
    }
    clickGutter(event, gutterNum) {
        const tempPoint = getPointFromEvent(event);
        // Be sure mouseup/touchend happened at same point as mousedown/touchstart to trigger click/dblclick
        if (this.startPoint && this.startPoint.x === tempPoint.x && this.startPoint.y === tempPoint.y) {
            // If timeout in progress and new click > clearTimeout & dblClickEvent
            if (this._clickTimeout !== null) {
                window.clearTimeout(this._clickTimeout);
                this._clickTimeout = null;
                this.notify('dblclick', gutterNum);
                this.stopDragging();
            }
            // Else start timeout to call clickEvent at end
            else {
                this._clickTimeout = window.setTimeout(() => {
                    this._clickTimeout = null;
                    this.notify('click', gutterNum);
                    this.stopDragging();
                }, this.gutterDblClickDuration);
            }
        }
    }
    startDragging(event, gutterOrder, gutterNum) {
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = getPointFromEvent(event);
        if (this.startPoint === null || this.disabled === true) {
            return;
        }
        this.snapshot = {
            gutterNum,
            lastSteppedOffset: 0,
            allAreasSizePixel: getElementPixelSize(this.elRef, this.direction) - this.getNbGutters() * this.gutterSize,
            allInvolvedAreasSizePercent: 100,
            areasBeforeGutter: [],
            areasAfterGutter: [],
        };
        this.displayedAreas.forEach(area => {
            const areaSnapshot = {
                area,
                sizePixelAtStart: getElementPixelSize(area.component.elRef, this.direction),
                sizePercentAtStart: (this.unit === 'percent') ? area.size : -1 // If pixel mode, anyway, will not be used.
            };
            if (area.order < gutterOrder) {
                if (this.restrictMove === true) {
                    this.snapshot.areasBeforeGutter = [areaSnapshot];
                }
                else {
                    this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
                }
            }
            else if (area.order > gutterOrder) {
                if (this.restrictMove === true) {
                    if (this.snapshot.areasAfterGutter.length === 0)
                        this.snapshot.areasAfterGutter = [areaSnapshot];
                }
                else {
                    this.snapshot.areasAfterGutter.push(areaSnapshot);
                }
            }
        });
        this.snapshot.allInvolvedAreasSizePercent = [...this.snapshot.areasBeforeGutter, ...this.snapshot.areasAfterGutter].reduce((t, a) => t + a.sizePercentAtStart, 0);
        if (this.snapshot.areasBeforeGutter.length === 0 || this.snapshot.areasAfterGutter.length === 0) {
            return;
        }
        this.dragListeners.push(this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)));
        this.dragListeners.push(this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)));
        this.dragListeners.push(this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)));
        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push(this.renderer.listen('document', 'mousemove', this.dragEvent.bind(this)));
            this.dragListeners.push(this.renderer.listen('document', 'touchmove', this.dragEvent.bind(this)));
        });
        this.displayedAreas.forEach(area => area.component.lockEvents());
        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'as-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'as-dragged');
        this.notify('start', this.snapshot.gutterNum);
    }
    dragEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._clickTimeout !== null) {
            window.clearTimeout(this._clickTimeout);
            this._clickTimeout = null;
        }
        if (this.isDragging === false) {
            return;
        }
        this.endPoint = getPointFromEvent(event);
        if (this.endPoint === null) {
            return;
        }
        // Calculate steppedOffset
        let offset = (this.direction === 'horizontal') ? (this.startPoint.x - this.endPoint.x) : (this.startPoint.y - this.endPoint.y);
        if (this.dir === 'rtl') {
            offset = -offset;
        }
        const steppedOffset = Math.round(offset / this.gutterStep) * this.gutterStep;
        if (steppedOffset === this.snapshot.lastSteppedOffset) {
            return;
        }
        this.snapshot.lastSteppedOffset = steppedOffset;
        // Need to know if each gutter side areas could reacts to steppedOffset
        let areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -steppedOffset, this.snapshot.allAreasSizePixel);
        let areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset, this.snapshot.allAreasSizePixel);
        // Each gutter side areas can't absorb all offset
        if (areasBefore.remain !== 0 && areasAfter.remain !== 0) {
            if (Math.abs(areasBefore.remain) === Math.abs(areasAfter.remain)) {
            }
            else if (Math.abs(areasBefore.remain) > Math.abs(areasAfter.remain)) {
                areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset + areasBefore.remain, this.snapshot.allAreasSizePixel);
            }
            else {
                areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -(steppedOffset - areasAfter.remain), this.snapshot.allAreasSizePixel);
            }
        }
        // Areas before gutter can't absorbs all offset > need to recalculate sizes for areas after gutter.
        else if (areasBefore.remain !== 0) {
            areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset + areasBefore.remain, this.snapshot.allAreasSizePixel);
        }
        // Areas after gutter can't absorbs all offset > need to recalculate sizes for areas before gutter.
        else if (areasAfter.remain !== 0) {
            areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -(steppedOffset - areasAfter.remain), this.snapshot.allAreasSizePixel);
        }
        if (this.unit === 'percent') {
            // Hack because of browser messing up with sizes using calc(X% - Ypx) -> el.getBoundingClientRect()
            // If not there, playing with gutters makes total going down to 99.99875% then 99.99286%, 99.98986%,..
            const all = [...areasBefore.list, ...areasAfter.list];
            const areaToReset = all.find(a => a.percentAfterAbsorption !== 0 && a.percentAfterAbsorption !== a.areaSnapshot.area.minSize && a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize);
            if (areaToReset) {
                areaToReset.percentAfterAbsorption = this.snapshot.allInvolvedAreasSizePercent - all.filter(a => a !== areaToReset).reduce((total, a) => total + a.percentAfterAbsorption, 0);
            }
        }
        // Now we know areas could absorb steppedOffset, time to really update sizes
        areasBefore.list.forEach(item => updateAreaSize(this.unit, item));
        areasAfter.list.forEach(item => updateAreaSize(this.unit, item));
        this.refreshStyleSizes();
        this.notify('progress', this.snapshot.gutterNum);
    }
    stopDragging(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.isDragging === false) {
            return;
        }
        this.displayedAreas.forEach(area => area.component.unlockEvents());
        while (this.dragListeners.length > 0) {
            const fct = this.dragListeners.pop();
            if (fct)
                fct();
        }
        // Warning: Have to be before "notify('end')"
        // because "notify('end')"" can be linked to "[size]='x'" > "build()" > "stopDragging()"
        this.isDragging = false;
        // If moved from starting point, notify end
        if (this.endPoint && (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y)) {
            this.notify('end', this.snapshot.gutterNum);
        }
        this.renderer.removeClass(this.elRef.nativeElement, 'as-dragging');
        this.renderer.removeClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'as-dragged');
        this.snapshot = null;
        // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.startPoint = null;
                this.endPoint = null;
            });
        });
    }
    notify(type, gutterNum) {
        const sizes = this.getVisibleAreaSizes();
        if (type === 'start') {
            this.dragStart.emit({ gutterNum, sizes });
        }
        else if (type === 'end') {
            this.dragEnd.emit({ gutterNum, sizes });
        }
        else if (type === 'click') {
            this.gutterClick.emit({ gutterNum, sizes });
        }
        else if (type === 'dblclick') {
            this.gutterDblClick.emit({ gutterNum, sizes });
        }
        else if (type === 'transitionEnd') {
            if (this.transitionEndSubscriber) {
                this.ngZone.run(() => this.transitionEndSubscriber.next(sizes));
            }
        }
        else if (type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({ gutterNum, sizes });
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
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], SplitComponent.prototype, "unit", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitComponent.prototype, "gutterSize", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitComponent.prototype, "gutterStep", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], SplitComponent.prototype, "restrictMove", null);
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
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitComponent.prototype, "gutterDblClickDuration", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SplitComponent.prototype, "dragStart", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SplitComponent.prototype, "dragEnd", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SplitComponent.prototype, "gutterClick", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SplitComponent.prototype, "gutterDblClick", void 0);
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
        exportAs: 'asSplit',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
        <ng-content></ng-content>
        <ng-template ngFor [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <div
              *ngIf="last === false"
              #gutterEls
              class="as-split-gutter"
              [style.flex-basis.px]="gutterSize"
              [style.order]="index*2+1"
              (mousedown)="startDragging($event, index*2+1, index+1)"
              (touchstart)="startDragging($event, index*2+1, index+1)"
              (mouseup)="clickGutter($event, index+1)"
                (touchend)="clickGutter($event, index+1)">
                <div class="as-split-gutter-icon"></div>
            </div>
        </ng-template>`,
        styles: [":host{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden;width:100%;height:100%}:host>.as-split-gutter{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;background-color:#eee;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}:host>.as-split-gutter>.as-split-gutter-icon{width:100%;height:100%;background-position:center center;background-repeat:no-repeat}:host ::ng-deep>.as-split-area{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;overflow-x:hidden;overflow-y:auto}:host ::ng-deep>.as-split-area.as-hidden{-webkit-box-flex:0!important;-ms-flex:0 1 0px!important;flex:0 1 0!important;overflow-x:hidden;overflow-y:hidden}:host.as-horizontal{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}:host.as-horizontal>.as-split-gutter{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;cursor:col-resize;height:100%}:host.as-horizontal>.as-split-gutter>.as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==)}:host.as-horizontal ::ng-deep>.as-split-area{height:100%}:host.as-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.as-vertical>.as-split-gutter{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;cursor:row-resize;width:100%}:host.as-vertical>.as-split-gutter .as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC)}:host.as-vertical ::ng-deep>.as-split-area{width:100%}:host.as-vertical ::ng-deep>.as-split-area.as-hidden{max-width:0}:host.as-disabled>.as-split-gutter{cursor:default}:host.as-disabled>.as-split-gutter .as-split-gutter-icon{background-image:url(\"\")}:host.as-transition.as-init:not(.as-dragging) ::ng-deep>.as-split-area,:host.as-transition.as-init:not(.as-dragging)>.as-split-gutter{-webkit-transition:-webkit-flex-basis .3s;transition:flex-basis .3s;-o-transition:flex-basis .3s;transition:flex-basis .3s,-webkit-flex-basis .3s,-ms-flex-preferred-size .3s}"]
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone,
        ElementRef,
        ChangeDetectorRef,
        Renderer2])
], SplitComponent);
export { SplitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQTRCLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDck0sT0FBTyxFQUFFLFVBQVUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTlDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUF3QkgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQThKekIsWUFBb0IsTUFBYyxFQUN4QixLQUFpQixFQUNqQixLQUF3QixFQUN4QixRQUFtQjtRQUhULFdBQU0sR0FBTixNQUFNLENBQVE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBL0pyQixlQUFVLEdBQThCLFlBQVksQ0FBQztRQWU3RCxJQUFJO1FBRUksVUFBSyxHQUF3QixTQUFTLENBQUM7UUFlL0MsSUFBSTtRQUVJLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBWWpDLElBQUk7UUFFSSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQVVoQyxJQUFJO1FB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OzsrQ0FBK0M7QUFDOUM7SUFBVCxNQUFNLEVBQUU7O21EQUFtRDtBQUNsRDtJQUFULE1BQU0sRUFBRTs7c0RBQXNEO0FBR3JEO0lBQVQsTUFBTSxFQUFFO3NDQUFzQixVQUFVOzttREFJeEM7QUFnQjBCO0lBQTFCLFlBQVksQ0FBQyxXQUFXLENBQUM7c0NBQW9CLFNBQVM7aURBQWE7QUE1SnpELGNBQWM7SUF0QjFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBRS9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O3VCQWVXOztLQUN0QixDQUFDOzZDQStKNEIsTUFBTTtRQUNqQixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2QsU0FBUztHQWpLbEIsY0FBYyxDQXVvQjFCO1NBdm9CWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSUFyZWEsIElQb2ludCwgSVNwbGl0U25hcHNob3QsIElBcmVhU25hcHNob3QsIElPdXRwdXREYXRhLCBJT3V0cHV0QXJlYVNpemVzIH0gZnJvbSAnLi4vaW50ZXJmYWNlJztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZS9zcGxpdEFyZWEuZGlyZWN0aXZlJztcbmltcG9ydCB7IGdldElucHV0UG9zaXRpdmVOdW1iZXIsIGdldElucHV0Qm9vbGVhbiwgaXNVc2VyU2l6ZXNWYWxpZCwgZ2V0QXJlYU1pblNpemUsIGdldEFyZWFNYXhTaXplLCBnZXRQb2ludEZyb21FdmVudCwgZ2V0RWxlbWVudFBpeGVsU2l6ZSwgZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eSwgdXBkYXRlQXJlYVNpemUgfSBmcm9tICcuLi91dGlscyc7XG5cbi8qKlxuICogYW5ndWxhci1zcGxpdFxuICpcbiAqXG4gKiAgUEVSQ0VOVCBNT0RFIChbdW5pdF09XCIncGVyY2VudCdcIilcbiAqICBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXG4gKiB8ICAgICAgIEEgICAgICAgW2cxXSAgICAgICBCICAgICAgIFtnMl0gICAgICAgQyAgICAgICBbZzNdICAgICAgIEQgICAgICAgW2c0XSAgICAgICBFICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgICAgICAyMCAgICAgICAgICAgICAgICAgMzAgICAgICAgICAgICAgICAgIDIwICAgICAgICAgICAgICAgICAxNSAgICAgICAgICAgICAgICAgMTUgICAgICB8IDwtLSBbc2l6ZV09XCJ4XCJcbiAqIHwgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgfCA8LS0gW2d1dHRlclNpemVdPVwiMTBcIlxuICogfGNhbGMoMjAlIC0gOHB4KSAgICBjYWxjKDMwJSAtIDEycHgpICAgY2FsYygyMCUgLSA4cHgpICAgIGNhbGMoMTUlIC0gNnB4KSAgICBjYWxjKDE1JSAtIDZweCl8IDwtLSBDU1MgZmxleC1iYXNpcyBwcm9wZXJ0eSAod2l0aCBmbGV4LWdyb3cmc2hyaW5rIGF0IDApXG4gKiB8ICAgICAxNTJweCAgICAgICAgICAgICAgMjI4cHggICAgICAgICAgICAgIDE1MnB4ICAgICAgICAgICAgICAxMTRweCAgICAgICAgICAgICAgMTE0cHggICAgIHwgPC0tIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gKiB8X19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX3xcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODAwcHggICAgICAgICA8LS0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAqICBmbGV4LWJhc2lzID0gY2FsYyggeyBhcmVhLnNpemUgfSUgLSB7IGFyZWEuc2l6ZS8xMDAgKiBuYkd1dHRlcipndXR0ZXJTaXplIH1weCApO1xuICpcbiAqXG4gKiAgUElYRUwgTU9ERSAoW3VuaXRdPVwiJ3BpeGVsJ1wiKVxuICogIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cbiAqIHwgICAgICAgQSAgICAgICBbZzFdICAgICAgIEIgICAgICAgW2cyXSAgICAgICBDICAgICAgIFtnM10gICAgICAgRCAgICAgICBbZzRdICAgICAgIEUgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICAgICAgMTAwICAgICAgICAgICAgICAgIDI1MCAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgMTUwICAgICAgICAgICAgICAgIDEwMCAgICAgIHwgPC0tIFtzaXplXT1cInlcIlxuICogfCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICB8IDwtLSBbZ3V0dGVyU2l6ZV09XCIxMFwiXG4gKiB8ICAgMCAwIDEwMHB4ICAgICAgICAgIDAgMCAyNTBweCAgICAgICAgICAgMSAxIGF1dG8gICAgICAgICAgMCAwIDE1MHB4ICAgICAgICAgIDAgMCAxMDBweCAgIHwgPC0tIENTUyBmbGV4IHByb3BlcnR5IChmbGV4LWdyb3cvZmxleC1zaHJpbmsvZmxleC1iYXNpcylcbiAqIHwgICAgIDEwMHB4ICAgICAgICAgICAgICAyNTBweCAgICAgICAgICAgICAgMjAwcHggICAgICAgICAgICAgIDE1MHB4ICAgICAgICAgICAgICAxMDBweCAgICAgfCA8LS0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAqIHxfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19ffFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4MDBweCAgICAgICAgIDwtLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICpcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcy1zcGxpdCcsXG4gIGV4cG9ydEFzOiAnYXNTcGxpdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFtgLi9zcGxpdC5jb21wb25lbnQuc2Nzc2BdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJkaXNwbGF5ZWRBcmVhc1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAjZ3V0dGVyRWxzXG4gICAgICAgICAgICAgIGNsYXNzPVwiYXMtc3BsaXQtZ3V0dGVyXCJcbiAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtYmFzaXMucHhdPVwiZ3V0dGVyU2l6ZVwiXG4gICAgICAgICAgICAgIFtzdHlsZS5vcmRlcl09XCJpbmRleCoyKzFcIlxuICAgICAgICAgICAgICAobW91c2Vkb3duKT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnREcmFnZ2luZygkZXZlbnQsIGluZGV4KjIrMSwgaW5kZXgrMSlcIlxuICAgICAgICAgICAgICAobW91c2V1cCk9XCJjbGlja0d1dHRlcigkZXZlbnQsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwiY2xpY2tHdXR0ZXIoJGV2ZW50LCBpbmRleCsxKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1zcGxpdC1ndXR0ZXItaWNvblwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+YCxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpIHtcbiAgICB0aGlzLl9kaXJlY3Rpb24gPSAodiA9PT0gJ3ZlcnRpY2FsJykgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBhcy0ke3RoaXMuX2RpcmVjdGlvbn1gKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgYGFzLSR7KHRoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnfWApO1xuXG4gICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0IGRpcmVjdGlvbigpOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX3VuaXQ6ICdwZXJjZW50JyB8ICdwaXhlbCcgPSAncGVyY2VudCc7XG5cbiAgQElucHV0KCkgc2V0IHVuaXQodjogJ3BlcmNlbnQnIHwgJ3BpeGVsJykge1xuICAgIHRoaXMuX3VuaXQgPSAodiA9PT0gJ3BpeGVsJykgPyAncGl4ZWwnIDogJ3BlcmNlbnQnO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBhcy0ke3RoaXMuX3VuaXR9YCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBhcy0keyh0aGlzLl91bml0ID09PSAncGl4ZWwnKSA/ICdwZXJjZW50JyA6ICdwaXhlbCd9YCk7XG5cbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIGdldCB1bml0KCk6ICdwZXJjZW50JyB8ICdwaXhlbCcge1xuICAgIHJldHVybiB0aGlzLl91bml0O1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDExO1xuXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJTaXplKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLl9ndXR0ZXJTaXplID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCAxMSk7XG5cbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBnZXQgZ3V0dGVyU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9ndXR0ZXJTdGVwOiBudW1iZXIgPSAxO1xuXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJTdGVwKHY6IG51bWJlcikge1xuICAgIHRoaXMuX2d1dHRlclN0ZXAgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIDEpO1xuICB9XG5cbiAgZ2V0IGd1dHRlclN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU3RlcDtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9yZXN0cmljdE1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZXQgcmVzdHJpY3RNb3ZlKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXN0cmljdE1vdmUgPSBnZXRJbnB1dEJvb2xlYW4odik7XG4gIH1cblxuICBnZXQgcmVzdHJpY3RNb3ZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXN0cmljdE1vdmU7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfdXNlVHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl91c2VUcmFuc2l0aW9uID0gZ2V0SW5wdXRCb29sZWFuKHYpO1xuXG4gICAgaWYgKHRoaXMuX3VzZVRyYW5zaXRpb24pIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtdHJhbnNpdGlvbicpO1xuICAgIGVsc2UgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdhcy10cmFuc2l0aW9uJyk7XG4gIH1cblxuICBnZXQgdXNlVHJhbnNpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlVHJhbnNpdGlvbjtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtZGlzYWJsZWQnKTtcbiAgICBlbHNlIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfZGlyOiAnbHRyJyB8ICdydGwnID0gJ2x0cic7XG5cbiAgQElucHV0KCkgc2V0IGRpcih2OiAnbHRyJyB8ICdydGwnKSB7XG4gICAgdGhpcy5fZGlyID0gKHYgPT09ICdydGwnKSA/ICdydGwnIDogJ2x0cic7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkaXInLCB0aGlzLl9kaXIpO1xuICB9XG5cbiAgZ2V0IGRpcigpOiAnbHRyJyB8ICdydGwnIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2d1dHRlckRibENsaWNrRHVyYXRpb246IG51bWJlciA9IDA7XG5cbiAgQElucHV0KCkgc2V0IGd1dHRlckRibENsaWNrRHVyYXRpb24odjogbnVtYmVyKSB7XG4gICAgdGhpcy5fZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbiA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgMCk7XG4gIH1cblxuICBnZXQgZ3V0dGVyRGJsQ2xpY2tEdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ndXR0ZXJEYmxDbGlja0R1cmF0aW9uO1xuICB9XG5cbiAgLy8vL1xuXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPElPdXRwdXREYXRhPihmYWxzZSlcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPElPdXRwdXREYXRhPihmYWxzZSlcbiAgQE91dHB1dCgpIGd1dHRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxJT3V0cHV0RGF0YT4oZmFsc2UpXG4gIEBPdXRwdXQoKSBndXR0ZXJEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8SU91dHB1dERhdGE+KGZhbHNlKVxuXG4gIHByaXZhdGUgdHJhbnNpdGlvbkVuZFN1YnNjcmliZXI6IFN1YnNjcmliZXI8SU91dHB1dEFyZWFTaXplcz5cbiAgQE91dHB1dCgpIGdldCB0cmFuc2l0aW9uRW5kKCk6IE9ic2VydmFibGU8SU91dHB1dEFyZWFTaXplcz4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIgPSBzdWJzY3JpYmVyKS5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lPElPdXRwdXRBcmVhU2l6ZXM+KDIwKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGRyYWdQcm9ncmVzc1N1YmplY3Q6IFN1YmplY3Q8SU91dHB1dERhdGE+ID0gbmV3IFN1YmplY3QoKTtcbiAgZHJhZ1Byb2dyZXNzJDogT2JzZXJ2YWJsZTxJT3V0cHV0RGF0YT4gPSB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGRyYWdMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICBwcml2YXRlIHNuYXBzaG90OiBJU3BsaXRTbmFwc2hvdCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN0YXJ0UG9pbnQ6IElQb2ludCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGVuZFBvaW50OiBJUG9pbnQgfCBudWxsID0gbnVsbDtcblxuICBwdWJsaWMgcmVhZG9ubHkgZGlzcGxheWVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGhpZGVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2d1dHRlckVscycpIHByaXZhdGUgZ3V0dGVyRWxzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIC8vIFRvIGZvcmNlIGFkZGluZyBkZWZhdWx0IGNsYXNzLCBjb3VsZCBiZSBvdmVycmlkZSBieSB1c2VyIEBJbnB1dCgpIG9yIG5vdFxuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBUbyBhdm9pZCB0cmFuc2l0aW9uIGF0IGZpcnN0IHJlbmRlcmluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLWluaXQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5iR3V0dGVycygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDApID8gMCA6IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3QXJlYTogSUFyZWEgPSB7XG4gICAgICBjb21wb25lbnQsXG4gICAgICBvcmRlcjogMCxcbiAgICAgIHNpemU6IDAsXG4gICAgICBtaW5TaXplOiBudWxsLFxuICAgICAgbWF4U2l6ZTogbnVsbCxcbiAgICB9O1xuXG4gICAgaWYgKGNvbXBvbmVudC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2gobmV3QXJlYSk7XG5cbiAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5oaWRlZEFyZWFzLnB1c2gobmV3QXJlYSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUFyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcbiAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG5cbiAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuaGlkZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCkpIHtcbiAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgICAgdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZUFyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUsIHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGNvbXBvbmVudC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmJ1aWxkKHJlc2V0T3JkZXJzLCByZXNldFNpemVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvd0FyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICBpZiAoYXJlYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXJlYXMgPSB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXApO1xuICAgIGlmIChhcmVhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVhcyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgYXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgIGFyZWEub3JkZXIgPSAwO1xuICAgICAgYXJlYS5zaXplID0gMDtcbiAgICB9KVxuICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKC4uLmFyZWFzKTtcblxuICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VmlzaWJsZUFyZWFTaXplcygpOiBJT3V0cHV0QXJlYVNpemVzIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5tYXAoYSA9PiBhLnNpemUgPT09IG51bGwgPyAnKicgOiBhLnNpemUpO1xuICB9XG5cbiAgcHVibGljIHNldFZpc2libGVBcmVhU2l6ZXMoc2l6ZXM6IElPdXRwdXRBcmVhU2l6ZXMpOiBib29sZWFuIHtcbiAgICBpZiAoc2l6ZXMubGVuZ3RoICE9PSB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1hdGVkU2l6ZXMgPSBzaXplcy5tYXAocyA9PiBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHMsIG51bGwpKTtcbiAgICBjb25zdCBpc1ZhbGlkID0gaXNVc2VyU2l6ZXNWYWxpZCh0aGlzLnVuaXQsIGZvcm1hdGVkU2l6ZXMpO1xuXG4gICAgaWYgKGlzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4gYXJlYS5jb21wb25lbnQuX3NpemUgPSBmb3JtYXRlZFNpemVzW2ldKTtcblxuICAgIHRoaXMuYnVpbGQoZmFsc2UsIHRydWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZChyZXNldE9yZGVyczogYm9vbGVhbiwgcmVzZXRTaXplczogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG5cbiAgICAvLyDCpCBBUkVBUyBPUkRFUlxuXG4gICAgaWYgKHJlc2V0T3JkZXJzID09PSB0cnVlKSB7XG5cbiAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ29yZGVyJyBmb3IgZWFjaCBhcmVhLCB1c2UgaXQgdG8gc29ydCB0aGVtLlxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMuZXZlcnkoYSA9PiBhLmNvbXBvbmVudC5vcmRlciAhPT0gbnVsbCkpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zb3J0KChhLCBiKSA9PiAoPG51bWJlcj5hLmNvbXBvbmVudC5vcmRlcikgLSAoPG51bWJlcj5iLmNvbXBvbmVudC5vcmRlcikpO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGVuIHNldCByZWFsIG9yZGVyIHdpdGggbXVsdGlwbGVzIG9mIDIsIG51bWJlcnMgYmV0d2VlbiB3aWxsIGJlIHVzZWQgYnkgZ3V0dGVycy5cbiAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4ge1xuICAgICAgICBhcmVhLm9yZGVyID0gaSAqIDI7XG4gICAgICAgIGFyZWEuY29tcG9uZW50LnNldFN0eWxlT3JkZXIoYXJlYS5vcmRlcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyDCpCBBUkVBUyBTSVpFXG5cbiAgICBpZiAocmVzZXRTaXplcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgdXNlVXNlclNpemVzID0gaXNVc2VyU2l6ZXNWYWxpZCh0aGlzLnVuaXQsIHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gYS5jb21wb25lbnQuc2l6ZSkpO1xuXG4gICAgICBzd2l0Y2ggKHRoaXMudW5pdCkge1xuICAgICAgICBjYXNlICdwZXJjZW50Jzoge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRTaXplID0gMTAwIC8gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGg7XG5cbiAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLnNpemUgPSB1c2VVc2VyU2l6ZXMgPyA8bnVtYmVyPmFyZWEuY29tcG9uZW50LnNpemUgOiBkZWZhdWx0U2l6ZTtcbiAgICAgICAgICAgIGFyZWEubWluU2l6ZSA9IGdldEFyZWFNaW5TaXplKGFyZWEpO1xuICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gZ2V0QXJlYU1heFNpemUoYXJlYSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncGl4ZWwnOiB7XG4gICAgICAgICAgaWYgKHVzZVVzZXJTaXplcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICBhcmVhLnNpemUgPSBhcmVhLmNvbXBvbmVudC5zaXplO1xuICAgICAgICAgICAgICBhcmVhLm1pblNpemUgPSBnZXRBcmVhTWluU2l6ZShhcmVhKTtcbiAgICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gZ2V0QXJlYU1heFNpemUoYXJlYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3aWxkY2FyZFNpemVBcmVhcyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5jb21wb25lbnQuc2l6ZSA9PT0gbnVsbCk7XG5cbiAgICAgICAgICAgIC8vIE5vIHdpbGRjYXJkIGFyZWEgPiBOZWVkIHRvIHNlbGVjdCBvbmUgYXJiaXRyYXJpbHkgPiBmaXJzdFxuICAgICAgICAgICAgaWYgKHdpbGRjYXJkU2l6ZUFyZWFzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSAoaSA9PT0gMCkgPyBudWxsIDogYXJlYS5jb21wb25lbnQuc2l6ZTtcbiAgICAgICAgICAgICAgICBhcmVhLm1pblNpemUgPSAoaSA9PT0gMCkgPyBudWxsIDogZ2V0QXJlYU1pblNpemUoYXJlYSk7XG4gICAgICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gKGkgPT09IDApID8gbnVsbCA6IGdldEFyZWFNYXhTaXplKGFyZWEpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgYXJlYSA+IE5lZWQgdG8ga2VlcCBvbmx5IG9uZSBhcmJpdHJhcmx5ID4gZmlyc3RcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbGRjYXJkU2l6ZUFyZWFzLmxlbmd0aCA+IDEpIHtcblxuICAgICAgICAgICAgICBsZXQgYWxyZWFkeUdvdE9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZWEuY29tcG9uZW50LnNpemUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChhbHJlYWR5R290T25lID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBhcmVhLm1pblNpemUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBhcmVhLm1heFNpemUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5R290T25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEubWluU2l6ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEubWF4U2l6ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gYXJlYS5jb21wb25lbnQuc2l6ZTtcbiAgICAgICAgICAgICAgICAgIGFyZWEubWluU2l6ZSA9IGdldEFyZWFNaW5TaXplKGFyZWEpO1xuICAgICAgICAgICAgICAgICAgYXJlYS5tYXhTaXplID0gZ2V0QXJlYU1heFNpemUoYXJlYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKTogdm9pZCB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIFBFUkNFTlQgTU9ERVxuICAgIGlmICh0aGlzLnVuaXQgPT09ICdwZXJjZW50Jykge1xuICAgICAgLy8gT25seSBvbmUgYXJlYSA+IGZsZXgtYmFzaXMgMTAwJVxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbMF0uY29tcG9uZW50LnNldFN0eWxlRmxleCgwLCAwLCBgMTAwJWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICAvLyBNdWx0aXBsZSBhcmVhcyA+IHVzZSBlYWNoIHBlcmNlbnQgYmFzaXNcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBzdW1HdXR0ZXJTaXplID0gdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZTtcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KFxuICAgICAgICAgICAgMCwgMCwgYGNhbGMoICR7YXJlYS5zaXplfSUgLSAkezxudW1iZXI+YXJlYS5zaXplIC8gMTAwICogc3VtR3V0dGVyU2l6ZX1weCApYCxcbiAgICAgICAgICAgIChhcmVhLm1pblNpemUgIT09IG51bGwgJiYgYXJlYS5taW5TaXplID09PSBhcmVhLnNpemUpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgKGFyZWEubWF4U2l6ZSAhPT0gbnVsbCAmJiBhcmVhLm1heFNpemUgPT09IGFyZWEuc2l6ZSkgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBQSVhFTCBNT0RFXG4gICAgZWxzZSBpZiAodGhpcy51bml0ID09PSAncGl4ZWwnKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgIC8vIEFyZWEgd2l0aCB3aWxkY2FyZCBzaXplXG4gICAgICAgIGlmIChhcmVhLnNpemUgPT09IG51bGwpIHtcbiAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGFyZWEuY29tcG9uZW50LnNldFN0eWxlRmxleCgxLCAxLCBgMTAwJWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KDEsIDEsIGBhdXRvYCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXJlYSB3aXRoIHBpeGVsIHNpemVcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gT25seSBvbmUgYXJlYSA+IGZsZXgtYmFzaXMgMTAwJVxuICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KDAsIDAsIGAxMDAlYCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTXVsdGlwbGUgYXJlYXMgPiB1c2UgZWFjaCBwaXhlbCBiYXNpc1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXJlYS5jb21wb25lbnQuc2V0U3R5bGVGbGV4KFxuICAgICAgICAgICAgICAwLCAwLCBgJHthcmVhLnNpemV9cHhgLFxuICAgICAgICAgICAgICAoYXJlYS5taW5TaXplICE9PSBudWxsICYmIGFyZWEubWluU2l6ZSA9PT0gYXJlYS5zaXplKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgKGFyZWEubWF4U2l6ZSAhPT0gbnVsbCAmJiBhcmVhLm1heFNpemUgPT09IGFyZWEuc2l6ZSkgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX2NsaWNrVGltZW91dDogbnVtYmVyIHwgbnVsbCA9IG51bGxcblxuICBwdWJsaWMgY2xpY2tHdXR0ZXIoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBndXR0ZXJOdW06IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHRlbXBQb2ludCA9IGdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcblxuICAgIC8vIEJlIHN1cmUgbW91c2V1cC90b3VjaGVuZCBoYXBwZW5lZCBhdCBzYW1lIHBvaW50IGFzIG1vdXNlZG93bi90b3VjaHN0YXJ0IHRvIHRyaWdnZXIgY2xpY2svZGJsY2xpY2tcbiAgICBpZiAodGhpcy5zdGFydFBvaW50ICYmIHRoaXMuc3RhcnRQb2ludC54ID09PSB0ZW1wUG9pbnQueCAmJiB0aGlzLnN0YXJ0UG9pbnQueSA9PT0gdGVtcFBvaW50LnkpIHtcblxuICAgICAgLy8gSWYgdGltZW91dCBpbiBwcm9ncmVzcyBhbmQgbmV3IGNsaWNrID4gY2xlYXJUaW1lb3V0ICYgZGJsQ2xpY2tFdmVudFxuICAgICAgaWYgKHRoaXMuX2NsaWNrVGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX2NsaWNrVGltZW91dCk7XG4gICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMubm90aWZ5KCdkYmxjbGljaycsIGd1dHRlck51bSk7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgICAvLyBFbHNlIHN0YXJ0IHRpbWVvdXQgdG8gY2FsbCBjbGlja0V2ZW50IGF0IGVuZFxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIHRoaXMubm90aWZ5KCdjbGljaycsIGd1dHRlck51bSk7XG4gICAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgICAgfSwgdGhpcy5ndXR0ZXJEYmxDbGlja0R1cmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhcnREcmFnZ2luZyhldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGd1dHRlck9yZGVyOiBudW1iZXIsIGd1dHRlck51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc3RhcnRQb2ludCA9IGdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcbiAgICBpZiAodGhpcy5zdGFydFBvaW50ID09PSBudWxsIHx8IHRoaXMuZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNuYXBzaG90ID0ge1xuICAgICAgZ3V0dGVyTnVtLFxuICAgICAgbGFzdFN0ZXBwZWRPZmZzZXQ6IDAsXG4gICAgICBhbGxBcmVhc1NpemVQaXhlbDogZ2V0RWxlbWVudFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbikgLSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplLFxuICAgICAgYWxsSW52b2x2ZWRBcmVhc1NpemVQZXJjZW50OiAxMDAsXG4gICAgICBhcmVhc0JlZm9yZUd1dHRlcjogW10sXG4gICAgICBhcmVhc0FmdGVyR3V0dGVyOiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgY29uc3QgYXJlYVNuYXBzaG90OiBJQXJlYVNuYXBzaG90ID0ge1xuICAgICAgICBhcmVhLFxuICAgICAgICBzaXplUGl4ZWxBdFN0YXJ0OiBnZXRFbGVtZW50UGl4ZWxTaXplKGFyZWEuY29tcG9uZW50LmVsUmVmLCB0aGlzLmRpcmVjdGlvbiksXG4gICAgICAgIHNpemVQZXJjZW50QXRTdGFydDogKHRoaXMudW5pdCA9PT0gJ3BlcmNlbnQnKSA/IGFyZWEuc2l6ZSA6IC0xIC8vIElmIHBpeGVsIG1vZGUsIGFueXdheSwgd2lsbCBub3QgYmUgdXNlZC5cbiAgICAgIH07XG5cbiAgICAgIGlmIChhcmVhLm9yZGVyIDwgZ3V0dGVyT3JkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdHJpY3RNb3ZlID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlciA9IFthcmVhU25hcHNob3RdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIudW5zaGlmdChhcmVhU25hcHNob3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhcmVhLm9yZGVyID4gZ3V0dGVyT3JkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdHJpY3RNb3ZlID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlci5sZW5ndGggPT09IDApIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlciA9IFthcmVhU25hcHNob3RdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlci5wdXNoKGFyZWFTbmFwc2hvdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc25hcHNob3QuYWxsSW52b2x2ZWRBcmVhc1NpemVQZXJjZW50ID0gWy4uLnRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIsIC4uLnRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlcl0ucmVkdWNlKCh0LCBhKSA9PiB0ICsgYS5zaXplUGVyY2VudEF0U3RhcnQsIDApO1xuXG4gICAgaWYgKHRoaXMuc25hcHNob3QuYXJlYXNCZWZvcmVHdXR0ZXIubGVuZ3RoID09PSAwIHx8IHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcbiAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCB0aGlzLnN0b3BEcmFnZ2luZy5iaW5kKHRoaXMpKSk7XG4gICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgdGhpcy5zdG9wRHJhZ2dpbmcuYmluZCh0aGlzKSkpO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIHRoaXMuZHJhZ0V2ZW50LmJpbmQodGhpcykpKTtcbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaG1vdmUnLCB0aGlzLmRyYWdFdmVudC5iaW5kKHRoaXMpKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiBhcmVhLmNvbXBvbmVudC5sb2NrRXZlbnRzKCkpO1xuXG4gICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLWRyYWdnaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmd1dHRlckVscy50b0FycmF5KClbdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LCAnYXMtZHJhZ2dlZCcpO1xuXG4gICAgdGhpcy5ub3RpZnkoJ3N0YXJ0JywgdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmFnRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICh0aGlzLl9jbGlja1RpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fY2xpY2tUaW1lb3V0KTtcbiAgICAgIHRoaXMuX2NsaWNrVGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVuZFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgIGlmICh0aGlzLmVuZFBvaW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIHN0ZXBwZWRPZmZzZXRcblxuICAgIGxldCBvZmZzZXQgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAodGhpcy5zdGFydFBvaW50LnggLSB0aGlzLmVuZFBvaW50LngpIDogKHRoaXMuc3RhcnRQb2ludC55IC0gdGhpcy5lbmRQb2ludC55KTtcbiAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgIH1cbiAgICBjb25zdCBzdGVwcGVkT2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQgLyB0aGlzLmd1dHRlclN0ZXApICogdGhpcy5ndXR0ZXJTdGVwO1xuXG4gICAgaWYgKHN0ZXBwZWRPZmZzZXQgPT09IHRoaXMuc25hcHNob3QubGFzdFN0ZXBwZWRPZmZzZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNuYXBzaG90Lmxhc3RTdGVwcGVkT2Zmc2V0ID0gc3RlcHBlZE9mZnNldDtcblxuICAgIC8vIE5lZWQgdG8ga25vdyBpZiBlYWNoIGd1dHRlciBzaWRlIGFyZWFzIGNvdWxkIHJlYWN0cyB0byBzdGVwcGVkT2Zmc2V0XG5cbiAgICBsZXQgYXJlYXNCZWZvcmUgPSBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5KHRoaXMudW5pdCwgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlciwgLXN0ZXBwZWRPZmZzZXQsIHRoaXMuc25hcHNob3QuYWxsQXJlYXNTaXplUGl4ZWwpO1xuICAgIGxldCBhcmVhc0FmdGVyID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eSh0aGlzLnVuaXQsIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlciwgc3RlcHBlZE9mZnNldCwgdGhpcy5zbmFwc2hvdC5hbGxBcmVhc1NpemVQaXhlbCk7XG5cbiAgICAvLyBFYWNoIGd1dHRlciBzaWRlIGFyZWFzIGNhbid0IGFic29yYiBhbGwgb2Zmc2V0XG4gICAgaWYgKGFyZWFzQmVmb3JlLnJlbWFpbiAhPT0gMCAmJiBhcmVhc0FmdGVyLnJlbWFpbiAhPT0gMCkge1xuICAgICAgaWYgKE1hdGguYWJzKGFyZWFzQmVmb3JlLnJlbWFpbikgPT09IE1hdGguYWJzKGFyZWFzQWZ0ZXIucmVtYWluKSkge1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoTWF0aC5hYnMoYXJlYXNCZWZvcmUucmVtYWluKSA+IE1hdGguYWJzKGFyZWFzQWZ0ZXIucmVtYWluKSkge1xuICAgICAgICBhcmVhc0FmdGVyID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eSh0aGlzLnVuaXQsIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlciwgc3RlcHBlZE9mZnNldCArIGFyZWFzQmVmb3JlLnJlbWFpbiwgdGhpcy5zbmFwc2hvdC5hbGxBcmVhc1NpemVQaXhlbCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXJlYXNCZWZvcmUgPSBnZXRHdXR0ZXJTaWRlQWJzb3JwdGlvbkNhcGFjaXR5KHRoaXMudW5pdCwgdGhpcy5zbmFwc2hvdC5hcmVhc0JlZm9yZUd1dHRlciwgLShzdGVwcGVkT2Zmc2V0IC0gYXJlYXNBZnRlci5yZW1haW4pLCB0aGlzLnNuYXBzaG90LmFsbEFyZWFzU2l6ZVBpeGVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXJlYXMgYmVmb3JlIGd1dHRlciBjYW4ndCBhYnNvcmJzIGFsbCBvZmZzZXQgPiBuZWVkIHRvIHJlY2FsY3VsYXRlIHNpemVzIGZvciBhcmVhcyBhZnRlciBndXR0ZXIuXG4gICAgZWxzZSBpZiAoYXJlYXNCZWZvcmUucmVtYWluICE9PSAwKSB7XG4gICAgICBhcmVhc0FmdGVyID0gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eSh0aGlzLnVuaXQsIHRoaXMuc25hcHNob3QuYXJlYXNBZnRlckd1dHRlciwgc3RlcHBlZE9mZnNldCArIGFyZWFzQmVmb3JlLnJlbWFpbiwgdGhpcy5zbmFwc2hvdC5hbGxBcmVhc1NpemVQaXhlbCk7XG4gICAgfVxuICAgIC8vIEFyZWFzIGFmdGVyIGd1dHRlciBjYW4ndCBhYnNvcmJzIGFsbCBvZmZzZXQgPiBuZWVkIHRvIHJlY2FsY3VsYXRlIHNpemVzIGZvciBhcmVhcyBiZWZvcmUgZ3V0dGVyLlxuICAgIGVsc2UgaWYgKGFyZWFzQWZ0ZXIucmVtYWluICE9PSAwKSB7XG4gICAgICBhcmVhc0JlZm9yZSA9IGdldEd1dHRlclNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkodGhpcy51bml0LCB0aGlzLnNuYXBzaG90LmFyZWFzQmVmb3JlR3V0dGVyLCAtKHN0ZXBwZWRPZmZzZXQgLSBhcmVhc0FmdGVyLnJlbWFpbiksIHRoaXMuc25hcHNob3QuYWxsQXJlYXNTaXplUGl4ZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVuaXQgPT09ICdwZXJjZW50Jykge1xuICAgICAgLy8gSGFjayBiZWNhdXNlIG9mIGJyb3dzZXIgbWVzc2luZyB1cCB3aXRoIHNpemVzIHVzaW5nIGNhbGMoWCUgLSBZcHgpIC0+IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAvLyBJZiBub3QgdGhlcmUsIHBsYXlpbmcgd2l0aCBndXR0ZXJzIG1ha2VzIHRvdGFsIGdvaW5nIGRvd24gdG8gOTkuOTk4NzUlIHRoZW4gOTkuOTkyODYlLCA5OS45ODk4NiUsLi5cbiAgICAgIGNvbnN0IGFsbCA9IFsuLi5hcmVhc0JlZm9yZS5saXN0LCAuLi5hcmVhc0FmdGVyLmxpc3RdO1xuICAgICAgY29uc3QgYXJlYVRvUmVzZXQgPSBhbGwuZmluZChhID0+IGEucGVyY2VudEFmdGVyQWJzb3JwdGlvbiAhPT0gMCAmJiBhLnBlcmNlbnRBZnRlckFic29ycHRpb24gIT09IGEuYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSAmJiBhLnBlcmNlbnRBZnRlckFic29ycHRpb24gIT09IGEuYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSlcblxuICAgICAgaWYgKGFyZWFUb1Jlc2V0KSB7XG4gICAgICAgIGFyZWFUb1Jlc2V0LnBlcmNlbnRBZnRlckFic29ycHRpb24gPSB0aGlzLnNuYXBzaG90LmFsbEludm9sdmVkQXJlYXNTaXplUGVyY2VudCAtIGFsbC5maWx0ZXIoYSA9PiBhICE9PSBhcmVhVG9SZXNldCkucmVkdWNlKCh0b3RhbCwgYSkgPT4gdG90YWwgKyBhLnBlcmNlbnRBZnRlckFic29ycHRpb24sIDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBrbm93IGFyZWFzIGNvdWxkIGFic29yYiBzdGVwcGVkT2Zmc2V0LCB0aW1lIHRvIHJlYWxseSB1cGRhdGUgc2l6ZXNcblxuICAgIGFyZWFzQmVmb3JlLmxpc3QuZm9yRWFjaChpdGVtID0+IHVwZGF0ZUFyZWFTaXplKHRoaXMudW5pdCwgaXRlbSkpO1xuICAgIGFyZWFzQWZ0ZXIubGlzdC5mb3JFYWNoKGl0ZW0gPT4gdXBkYXRlQXJlYVNpemUodGhpcy51bml0LCBpdGVtKSk7XG5cbiAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgdGhpcy5ub3RpZnkoJ3Byb2dyZXNzJywgdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4gYXJlYS5jb21wb25lbnQudW5sb2NrRXZlbnRzKCkpO1xuXG4gICAgd2hpbGUgKHRoaXMuZHJhZ0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmY3QgPSB0aGlzLmRyYWdMaXN0ZW5lcnMucG9wKCk7XG4gICAgICBpZiAoZmN0KSBmY3QoKTtcbiAgICB9XG5cbiAgICAvLyBXYXJuaW5nOiBIYXZlIHRvIGJlIGJlZm9yZSBcIm5vdGlmeSgnZW5kJylcIlxuICAgIC8vIGJlY2F1c2UgXCJub3RpZnkoJ2VuZCcpXCJcIiBjYW4gYmUgbGlua2VkIHRvIFwiW3NpemVdPSd4J1wiID4gXCJidWlsZCgpXCIgPiBcInN0b3BEcmFnZ2luZygpXCJcbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIC8vIElmIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9pbnQsIG5vdGlmeSBlbmRcbiAgICBpZiAodGhpcy5lbmRQb2ludCAmJiAodGhpcy5zdGFydFBvaW50LnggIT09IHRoaXMuZW5kUG9pbnQueCB8fCB0aGlzLnN0YXJ0UG9pbnQueSAhPT0gdGhpcy5lbmRQb2ludC55KSkge1xuICAgICAgdGhpcy5ub3RpZnkoJ2VuZCcsIHRoaXMuc25hcHNob3QuZ3V0dGVyTnVtKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLWRyYWdnaW5nJyk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmd1dHRlckVscy50b0FycmF5KClbdGhpcy5zbmFwc2hvdC5ndXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LCAnYXMtZHJhZ2dlZCcpO1xuICAgIHRoaXMuc25hcHNob3QgPSBudWxsO1xuXG4gICAgLy8gTmVlZGVkIHRvIGxldCAoY2xpY2spPVwiY2xpY2tHdXR0ZXIoLi4uKVwiIGV2ZW50IHJ1biBhbmQgdmVyaWZ5IGlmIG1vdXNlIG1vdmVkIG9yIG5vdFxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmVuZFBvaW50ID0gbnVsbDtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5KHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ2RibGNsaWNrJyB8ICd0cmFuc2l0aW9uRW5kJywgZ3V0dGVyTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzaXplcyA9IHRoaXMuZ2V0VmlzaWJsZUFyZWFTaXplcygpO1xuXG4gICAgaWYgKHR5cGUgPT09ICdzdGFydCcpIHtcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0LmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnZW5kJykge1xuICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnY2xpY2snKSB7XG4gICAgICB0aGlzLmd1dHRlckNsaWNrLmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnZGJsY2xpY2snKSB7XG4gICAgICB0aGlzLmd1dHRlckRibENsaWNrLmVtaXQoeyBndXR0ZXJOdW0sIHNpemVzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAndHJhbnNpdGlvbkVuZCcpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25FbmRTdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnRyYW5zaXRpb25FbmRTdWJzY3JpYmVyLm5leHQoc2l6ZXMpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ3Byb2dyZXNzJykge1xuICAgICAgLy8gU3RheSBvdXRzaWRlIHpvbmUgdG8gYWxsb3cgdXNlcnMgZG8gd2hhdCB0aGV5IHdhbnQgYWJvdXQgY2hhbmdlIGRldGVjdGlvbiBtZWNoYW5pc20uXG4gICAgICB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QubmV4dCh7IGd1dHRlck51bSwgc2l6ZXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gIH1cbn1cbiJdfQ==