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
var SplitComponent = /** @class */ (function () {
    function SplitComponent(ngZone, elRef, cdRef, renderer) {
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
    Object.defineProperty(SplitComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (v) {
            this._direction = (v === 'vertical') ? 'vertical' : 'horizontal';
            this.renderer.addClass(this.elRef.nativeElement, "is-" + this._direction);
            this.renderer.removeClass(this.elRef.nativeElement, "is-" + ((this._direction === 'vertical') ? 'horizontal' : 'vertical'));
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterSize", {
        get: function () {
            return this._gutterSize;
        },
        set: function (v) {
            v = Number(v);
            this._gutterSize = (!isNaN(v) && v > 0) ? v : 11;
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "useTransition", {
        get: function () {
            return this._useTransition;
        },
        set: function (v) {
            this._useTransition = getInputBoolean(v);
            if (this._useTransition)
                this.renderer.addClass(this.elRef.nativeElement, 'is-transition');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'is-transition');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (v) {
            this._disabled = getInputBoolean(v);
            if (this._disabled)
                this.renderer.addClass(this.elRef.nativeElement, 'is-disabled');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'is-disabled');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        set: function (v) {
            v = (v === 'rtl') ? 'rtl' : 'ltr';
            this._dir = v;
            this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dragStart", {
        get: function () {
            var _this = this;
            return new Observable(function (subscriber) { return _this.dragStartSubscriber = subscriber; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dragEnd", {
        get: function () {
            var _this = this;
            return new Observable(function (subscriber) { return _this.dragEndSubscriber = subscriber; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterClick", {
        get: function () {
            var _this = this;
            return new Observable(function (subscriber) { return _this.gutterClickSubscriber = subscriber; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "transitionEnd", {
        get: function () {
            var _this = this;
            return new Observable(function (subscriber) { return _this.transitionEndSubscriber = subscriber; }).pipe(debounceTime(20));
        },
        enumerable: true,
        configurable: true
    });
    SplitComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            // To avoid transition at first rendering
            setTimeout(function () { return _this.renderer.addClass(_this.elRef.nativeElement, 'is-init'); });
        });
    };
    SplitComponent.prototype.getNbGutters = function () {
        return (this.displayedAreas.length === 0) ? 0 : this.displayedAreas.length - 1;
    };
    SplitComponent.prototype.addArea = function (component) {
        var newArea = {
            component: component,
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
    };
    SplitComponent.prototype.removeArea = function (component) {
        var area;
        if (this.displayedAreas.some(function (a) { return a.component === component; })) {
            area = this.displayedAreas.find(function (a) { return a.component === component; });
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some(function (a) { return a.component === component; })) {
            area = this.hidedAreas.find(function (a) { return a.component === component; });
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    };
    SplitComponent.prototype.updateArea = function (component, resetOrders, resetSizes) {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')
        var area = this.displayedAreas.find(function (a) { return a.component === component; });
        if (!area) {
            return;
        }
        this.build(resetOrders, resetSizes);
    };
    SplitComponent.prototype.showArea = function (component) {
        var _a;
        var area = this.hidedAreas.find(function (a) { return a.component === component; });
        if (!area) {
            return;
        }
        var areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        (_a = this.displayedAreas).push.apply(_a, tslib_1.__spread(areas));
        this.build(true, true);
    };
    SplitComponent.prototype.hideArea = function (comp) {
        var _a;
        var area = this.displayedAreas.find(function (a) { return a.component === comp; });
        if (!area) {
            return;
        }
        var areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
        areas.forEach(function (area) {
            area.order = 0;
            area.size = 0;
        });
        (_a = this.hidedAreas).push.apply(_a, tslib_1.__spread(areas));
        this.build(true, true);
    };
    SplitComponent.prototype.getVisibleAreaSizes = function () {
        return this.displayedAreas.map(function (a) { return a.size * 100; });
    };
    SplitComponent.prototype.setVisibleAreaSizes = function (sizes) {
        if (sizes.length !== this.displayedAreas.length) {
            return false;
        }
        sizes = sizes.map(function (s) { return s / 100; });
        var total = sizes.reduce(function (total, v) { return total + v; }, 0);
        if (!isValidTotalSize(total)) {
            return false;
        }
        this.displayedAreas.forEach(function (area, i) {
            // @ts-ignore
            area.component._size = sizes[i];
        });
        this.build(false, true);
        return true;
    };
    SplitComponent.prototype.build = function (resetOrders, resetSizes) {
        var _this = this;
        this.stopDragging();
        // ¤ AREAS ORDER
        if (resetOrders === true) {
            // If user provided 'order' for each area, use it to sort them.
            if (this.displayedAreas.every(function (a) { return a.component.order !== null; })) {
                this.displayedAreas.sort(function (a, b) { return a.component.order - b.component.order; });
            }
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach(function (area, i) {
                area.order = i * 2;
                area.component.setStyleOrder(area.order);
            });
        }
        // ¤ AREAS SIZE PERCENT
        if (resetSizes === true) {
            var totalUserSize = this.displayedAreas.reduce(function (total, s) { return s.component.size ? total + s.component.size : total; }, 0);
            // If user provided 'size' for each area and total == 1, use it.
            if (this.displayedAreas.every(function (a) { return a.component.size !== null; }) && isValidTotalSize(totalUserSize)) {
                this.displayedAreas.forEach(function (area) {
                    area.size = area.component.size;
                });
            }
            // Else set equal sizes for all areas.
            else {
                var size_1 = 1 / this.displayedAreas.length;
                this.displayedAreas.forEach(function (area) {
                    area.size = size_1;
                });
            }
        }
        // ¤
        // If some real area sizes are less than gutterSize,
        // set them to zero and dispatch size to others.
        var percentToDispatch = 0;
        // Get container pixel size
        var containerSizePixel = getPixelSize(this.elRef, this.direction);
        this.displayedAreas.forEach(function (area) {
            if (area.size * containerSizePixel < _this.gutterSize) {
                percentToDispatch += area.size;
                area.size = 0;
            }
        });
        if (percentToDispatch > 0 && this.displayedAreas.length > 0) {
            var nbAreasNotZero = this.displayedAreas.filter(function (a) { return a.size !== 0; }).length;
            if (nbAreasNotZero > 0) {
                var percentToAdd_1 = percentToDispatch / nbAreasNotZero;
                this.displayedAreas.filter(function (a) { return a.size !== 0; }).forEach(function (area) {
                    area.size += percentToAdd_1;
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
    };
    SplitComponent.prototype.refreshStyleSizes = function () {
        var sumGutterSize = this.getNbGutters() * this.gutterSize;
        this.displayedAreas.forEach(function (area) {
            area.component.setStyleFlexbasis("calc( " + area.size * 100 + "% - " + area.size * sumGutterSize + "px )");
        });
    };
    SplitComponent.prototype.clickGutter = function (event, gutterNum) {
        event.preventDefault();
        event.stopPropagation();
        if (this.startPoint && this.startPoint.x === event.clientX && this.startPoint.y === event.clientY) {
            this.currentGutterNum = gutterNum;
            this.notify('click');
        }
    };
    SplitComponent.prototype.startDragging = function (event, gutterOrder, gutterNum) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = getPointFromEvent(event);
        if (!this.startPoint || this.disabled) {
            return;
        }
        var areaA = this.displayedAreas.find(function (a) { return a.order === gutterOrder - 1; });
        var areaB = this.displayedAreas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        this.dragStartValues.sizePixelContainer = getPixelSize(this.elRef, this.direction);
        this.dragStartValues.sizePixelA = getPixelSize(areaA.component.elRef, this.direction);
        this.dragStartValues.sizePixelB = getPixelSize(areaB.component.elRef, this.direction);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;
        this.currentGutterNum = gutterNum;
        this.ngZone.runOutsideAngular(function () {
            _this.dragListeners.push(_this.renderer.listen('document', 'mouseup', _this.stopDragging.bind(_this)));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchend', _this.stopDragging.bind(_this)));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchcancel', _this.stopDragging.bind(_this)));
            _this.dragListeners.push(_this.renderer.listen('document', 'mousemove', function (e) { return _this.dragEvent(e, areaA, areaB); }));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchmove', function (e) { return _this.dragEvent(e, areaA, areaB); }));
        });
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'is-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.currentGutterNum - 1].nativeElement, 'is-dragged');
        this.notify('start');
    };
    SplitComponent.prototype.dragEvent = function (event, areaA, areaB) {
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
        var offsetPixel = (this.direction === 'horizontal') ? (this.startPoint.x - this.endPoint.x) : (this.startPoint.y - this.endPoint.y);
        if (this.dir === 'rtl') {
            offsetPixel = -offsetPixel;
        }
        var newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        var newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;
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
    };
    SplitComponent.prototype.stopDragging = function (event) {
        var _this = this;
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.isDragging === false) {
            return;
        }
        this.displayedAreas.forEach(function (area) {
            area.component.unlockEvents();
        });
        while (this.dragListeners.length > 0) {
            var fct = this.dragListeners.pop();
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
        this.ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.startPoint = null;
                _this.endPoint = null;
            });
        });
    };
    SplitComponent.prototype.notify = function (type) {
        var _this = this;
        var sizes = this.displayedAreas.map(function (a) { return a.size * 100; });
        if (type === 'start') {
            if (this.dragStartSubscriber) {
                this.ngZone.run(function () { return _this.dragStartSubscriber.next({ gutterNum: _this.currentGutterNum, sizes: sizes }); });
            }
        }
        else if (type === 'end') {
            if (this.dragEndSubscriber) {
                this.ngZone.run(function () { return _this.dragEndSubscriber.next({ gutterNum: _this.currentGutterNum, sizes: sizes }); });
            }
        }
        else if (type === 'click') {
            if (this.gutterClickSubscriber) {
                this.ngZone.run(function () { return _this.gutterClickSubscriber.next({ gutterNum: _this.currentGutterNum, sizes: sizes }); });
            }
        }
        else if (type === 'transitionEnd') {
            if (this.transitionEndSubscriber) {
                this.ngZone.run(function () { return _this.transitionEndSubscriber.next(sizes); });
            }
        }
        else if (type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({ gutterNum: this.currentGutterNum, sizes: sizes });
        }
    };
    SplitComponent.prototype.ngOnDestroy = function () {
        this.stopDragging();
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
    return SplitComponent;
}());
export { SplitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zcGxpdC1wYW5lLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQTRCLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TCxPQUFPLEVBQUUsVUFBVSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQVFIO0lBNkhFLHdCQUFvQixNQUFjLEVBQ3hCLEtBQWlCLEVBQ2pCLEtBQXdCLEVBQ3hCLFFBQW1CO1FBSFQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE5SHJCLGVBQVUsR0FBOEIsWUFBWSxDQUFDO1FBZTdELElBQUk7UUFFSSxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQWFqQyxJQUFJO1FBRUksbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFheEMsSUFBSTtRQUVJLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFhbkMsSUFBSTtRQUVJLFNBQUksR0FBa0IsS0FBSyxDQUFDO1FBcUM1Qix3QkFBbUIsR0FBeUQsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNsRyxrQkFBYSxHQUE0RCxJQUFJLENBQUMs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O0lBVVE7UUFBUixLQUFLLEVBQUU7Ozt1REFLUDtJQVVRO1FBQVIsS0FBSyxFQUFFOzs7a0RBS1A7SUFVUTtRQUFSLEtBQUssRUFBRTs7OzZDQUtQO0lBU1M7UUFBVCxNQUFNLEVBQUU7MENBQWtCLFVBQVU7O21EQUVwQztJQUdTO1FBQVQsTUFBTSxFQUFFOzBDQUFnQixVQUFVOztpREFFbEM7SUFHUztRQUFULE1BQU0sRUFBRTswQ0FBb0IsVUFBVTs7cURBRXRDO0lBR1M7UUFBVCxNQUFNLEVBQUU7MENBQXNCLFVBQVU7O3VEQUl4QztJQXdCMEI7UUFBMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQzswQ0FBb0IsU0FBUztxREFBYTtJQTNIekQsY0FBYztRQU4xQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUUvQyx3akJBQXFDOztTQUN0QyxDQUFDO2lEQThINEIsTUFBTTtZQUNqQixVQUFVO1lBQ1YsaUJBQWlCO1lBQ2QsU0FBUztPQWhJbEIsY0FBYyxDQXdnQjFCO0lBQUQscUJBQUM7Q0FBQSxBQXhnQkQsSUF3Z0JDO1NBeGdCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFJlbmRlcmVyMiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElBcmVhIH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lBcmVhJztcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZS9JUG9pbnQnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZ2V0UG9pbnRGcm9tRXZlbnQsIGdldFBpeGVsU2l6ZSwgZ2V0SW5wdXRCb29sZWFuLCBpc1ZhbGlkVG90YWxTaXplIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vKipcbiAqIGFuZ3VsYXItc3BsaXRcbiAqXG4gKiBBcmVhcyBzaXplIGFyZSBzZXQgaW4gcGVyY2VudGFnZSBvZiB0aGUgc3BsaXQgY29udGFpbmVyLlxuICogR3V0dGVycyBzaXplIGFyZSBzZXQgaW4gcGl4ZWxzLlxuICpcbiAqIFNvIHdlIHNldCBjc3MgJ2ZsZXgtYmFzaXMnIHByb3BlcnR5IGxpa2UgdGhpcyAod2hlcmUgMCA8PSBhcmVhLnNpemUgPD0gMSk6XG4gKiAgY2FsYyggeyBhcmVhLnNpemUgKiAxMDAgfSUgLSB7IGFyZWEuc2l6ZSAqIG5iR3V0dGVyICogZ3V0dGVyU2l6ZSB9cHggKTtcbiAqXG4gKiBFeGFtcGxlcyB3aXRoIDMgdmlzaWJsZSBhcmVhcyBhbmQgMiBndXR0ZXJzOlxuICpcbiAqIHwgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBjYWxjKDIwJSAtIDRweCkgICAgICAgICAgY2FsYygyMCUgLSA0cHgpICAgICAgICAgICAgICBjYWxjKDYwJSAtIDEycHgpICAgICAgICAgIHxcbiAqXG4gKlxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgICAgICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgfFxuICpcbiAqXG4gKiB8MTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgICAgICAgICAgICAgICAgIGNhbGMoNjYuNjYlIC0gMTMuMzMzcHgpICAgICAgICAgICAgICAgICAgY2FsYygzMyUlIC0gNi42NjdweCkgICB8XG4gKlxuICpcbiAqICAxMHB4IDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfFtdW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8MCAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGMoMTAwJSAtIDIwcHgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXMtc3BsaXQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVVcmxzOiBbYC4vc3BsaXQuY29tcG9uZW50LnNjc3NgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NwbGl0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpIHtcbiAgICB0aGlzLl9kaXJlY3Rpb24gPSAodiA9PT0gJ3ZlcnRpY2FsJykgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIGBpcy0ke3RoaXMuX2RpcmVjdGlvbn1gKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgYGlzLSR7KHRoaXMuX2RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnfWApO1xuXG4gICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0IGRpcmVjdGlvbigpOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDExO1xuXG4gIEBJbnB1dCgpIHNldCBndXR0ZXJTaXplKHY6IG51bWJlcikge1xuICAgIHYgPSBOdW1iZXIodik7XG4gICAgdGhpcy5fZ3V0dGVyU2l6ZSA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IDExO1xuXG4gICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0IGd1dHRlclNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF91c2VUcmFuc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgIHRoaXMuX3VzZVRyYW5zaXRpb24gPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICBpZiAodGhpcy5fdXNlVHJhbnNpdGlvbikgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy10cmFuc2l0aW9uJyk7XG4gICAgZWxzZSB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLXRyYW5zaXRpb24nKTtcbiAgfVxuXG4gIGdldCB1c2VUcmFuc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91c2VUcmFuc2l0aW9uO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGdldElucHV0Qm9vbGVhbih2KTtcblxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kaXNhYmxlZCcpO1xuICAgIGVsc2UgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kaXNhYmxlZCcpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9kaXI6ICdsdHInIHwgJ3J0bCcgPSAnbHRyJztcblxuICBASW5wdXQoKSBzZXQgZGlyKHY6ICdsdHInIHwgJ3J0bCcpIHtcbiAgICB2ID0gKHYgPT09ICdydGwnKSA/ICdydGwnIDogJ2x0cic7XG4gICAgdGhpcy5fZGlyID0gdjtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RpcicsIHRoaXMuX2Rpcik7XG4gIH1cblxuICBnZXQgZGlyKCk6ICdsdHInIHwgJ3J0bCcge1xuICAgIHJldHVybiB0aGlzLl9kaXI7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBkcmFnU3RhcnRTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+XG4gIEBPdXRwdXQoKSBnZXQgZHJhZ1N0YXJ0KCk6IE9ic2VydmFibGU8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaWJlciA9IHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmFnRW5kU3Vic2NyaWJlcjogU3Vic2NyaWJlcjx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PlxuICBAT3V0cHV0KCkgZ2V0IGRyYWdFbmQoKTogT2JzZXJ2YWJsZTx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy5kcmFnRW5kU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBndXR0ZXJDbGlja1N1YnNjcmliZXI6IFN1YnNjcmliZXI8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT5cbiAgQE91dHB1dCgpIGdldCBndXR0ZXJDbGljaygpOiBPYnNlcnZhYmxlPHsgZ3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+IH0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB0aGlzLmd1dHRlckNsaWNrU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2l0aW9uRW5kU3Vic2NyaWJlcjogU3Vic2NyaWJlcjxBcnJheTxudW1iZXI+PlxuICBAT3V0cHV0KCkgZ2V0IHRyYW5zaXRpb25FbmQoKTogT2JzZXJ2YWJsZTxBcnJheTxudW1iZXI+PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gdGhpcy50cmFuc2l0aW9uRW5kU3Vic2NyaWJlciA9IHN1YnNjcmliZXIpLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWU8QXJyYXk8bnVtYmVyPj4oMjApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhZ1Byb2dyZXNzU3ViamVjdDogU3ViamVjdDx7IGd1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPiB9PiA9IG5ldyBTdWJqZWN0KCk7XG4gIGRyYWdQcm9ncmVzcyQ6IE9ic2VydmFibGU8eyBndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj4gfT4gPSB0aGlzLmRyYWdQcm9ncmVzc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRHdXR0ZXJOdW06IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RhcnRQb2ludDogSVBvaW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZW5kUG9pbnQ6IElQb2ludCB8IG51bGwgPSBudWxsO1xuXG4gIHB1YmxpYyByZWFkb25seSBkaXNwbGF5ZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgaGlkZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnU3RhcnRWYWx1ZXMgPSB7XG4gICAgc2l6ZVBpeGVsQ29udGFpbmVyOiAwLFxuICAgIHNpemVQaXhlbEE6IDAsXG4gICAgc2l6ZVBpeGVsQjogMCxcbiAgICBzaXplUGVyY2VudEE6IDAsXG4gICAgc2l6ZVBlcmNlbnRCOiAwLFxuICB9O1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2d1dHRlckVscycpIHByaXZhdGUgZ3V0dGVyRWxzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIC8vIFRvIGZvcmNlIGFkZGluZyBkZWZhdWx0IGNsYXNzLCBjb3VsZCBiZSBvdmVycmlkZSBieSB1c2VyIEBJbnB1dCgpIG9yIG5vdFxuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBUbyBhdm9pZCB0cmFuc2l0aW9uIGF0IGZpcnN0IHJlbmRlcmluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2lzLWluaXQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5iR3V0dGVycygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPT09IDApID8gMCA6IHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3QXJlYTogSUFyZWEgPSB7XG4gICAgICBjb21wb25lbnQsXG4gICAgICBvcmRlcjogMCxcbiAgICAgIHNpemU6IDAsXG4gICAgfTtcblxuICAgIGlmIChjb21wb25lbnQudmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuXG4gICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBcmVhKGNvbXBvbmVudDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgbGV0IGFyZWE6IElBcmVhO1xuICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSkge1xuICAgICAgYXJlYSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcG9uZW50ID09PSBjb21wb25lbnQpO1xuICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcblxuICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5oaWRlZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KSkge1xuICAgICAgYXJlYSA9IHRoaXMuaGlkZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XG4gICAgICB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXJlYShjb21wb25lbnQ6IFNwbGl0QXJlYURpcmVjdGl2ZSwgcmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBPbmx5IHJlZnJlc2ggaWYgYXJlYSBpcyBkaXNwbGF5ZWQgKE5vIG5lZWQgdG8gY2hlY2sgaW5zaWRlICdoaWRlZEFyZWFzJylcbiAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wb25lbnQgPT09IGNvbXBvbmVudCk7XG4gICAgaWYgKCFhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5idWlsZChyZXNldE9yZGVycywgcmVzZXRTaXplcyk7XG4gIH1cblxuICBwdWJsaWMgc2hvd0FyZWEoY29tcG9uZW50OiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcG9uZW50KTtcbiAgICBpZiAoIWFyZWEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVhcyA9IHRoaXMuaGlkZWRBcmVhcy5zcGxpY2UodGhpcy5oaWRlZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGhpZGVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXBvbmVudCA9PT0gY29tcCk7XG4gICAgaWYgKCFhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXJlYXMgPSB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgIGFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBhcmVhLm9yZGVyID0gMDtcbiAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgfSlcbiAgICB0aGlzLmhpZGVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGdldFZpc2libGVBcmVhU2l6ZXMoKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gYS5zaXplICogMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWaXNpYmxlQXJlYVNpemVzKHNpemVzOiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7XG4gICAgaWYgKHNpemVzLmxlbmd0aCAhPT0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzaXplcyA9IHNpemVzLm1hcChzID0+IHMgLyAxMDApO1xuXG4gICAgY29uc3QgdG90YWwgPSBzaXplcy5yZWR1Y2UoKHRvdGFsOiBudW1iZXIsIHY6IG51bWJlcikgPT4gdG90YWwgKyB2LCAwKTtcbiAgICBpZiAoIWlzVmFsaWRUb3RhbFNpemUodG90YWwpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBhcmVhLmNvbXBvbmVudC5fc2l6ZSA9IHNpemVzW2ldO1xuICAgIH0pXG5cbiAgICB0aGlzLmJ1aWxkKGZhbHNlLCB0cnVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGQocmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuXG4gICAgLy8gwqQgQVJFQVMgT1JERVJcblxuICAgIGlmIChyZXNldE9yZGVycyA9PT0gdHJ1ZSkge1xuXG4gICAgICAvLyBJZiB1c2VyIHByb3ZpZGVkICdvcmRlcicgZm9yIGVhY2ggYXJlYSwgdXNlIGl0IHRvIHNvcnQgdGhlbS5cbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wb25lbnQub3JkZXIgIT09IG51bGwpKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc29ydCgoYSwgYikgPT4gKDxudW1iZXI+YS5jb21wb25lbnQub3JkZXIpIC0gKDxudW1iZXI+Yi5jb21wb25lbnQub3JkZXIpKTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlbiBzZXQgcmVhbCBvcmRlciB3aXRoIG11bHRpcGxlcyBvZiAyLCBudW1iZXJzIGJldHdlZW4gd2lsbCBiZSB1c2VkIGJ5IGd1dHRlcnMuXG4gICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgYXJlYS5vcmRlciA9IGkgKiAyO1xuICAgICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZU9yZGVyKGFyZWEub3JkZXIpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvLyDCpCBBUkVBUyBTSVpFIFBFUkNFTlRcblxuICAgIGlmIChyZXNldFNpemVzID09PSB0cnVlKSB7XG5cbiAgICAgIGNvbnN0IHRvdGFsVXNlclNpemUgPSA8bnVtYmVyPnRoaXMuZGlzcGxheWVkQXJlYXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzOiBJQXJlYSkgPT4gcy5jb21wb25lbnQuc2l6ZSA/IHRvdGFsICsgcy5jb21wb25lbnQuc2l6ZSA6IHRvdGFsLCAwKTtcblxuICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnc2l6ZScgZm9yIGVhY2ggYXJlYSBhbmQgdG90YWwgPT0gMSwgdXNlIGl0LlxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkQXJlYXMuZXZlcnkoYSA9PiBhLmNvbXBvbmVudC5zaXplICE9PSBudWxsKSAmJiBpc1ZhbGlkVG90YWxTaXplKHRvdGFsVXNlclNpemUpKSB7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgIGFyZWEuc2l6ZSA9IDxudW1iZXI+YXJlYS5jb21wb25lbnQuc2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBFbHNlIHNldCBlcXVhbCBzaXplcyBmb3IgYWxsIGFyZWFzLlxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSAxIC8gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgIGFyZWEuc2l6ZSA9IHNpemU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIMKkXG4gICAgLy8gSWYgc29tZSByZWFsIGFyZWEgc2l6ZXMgYXJlIGxlc3MgdGhhbiBndXR0ZXJTaXplLFxuICAgIC8vIHNldCB0aGVtIHRvIHplcm8gYW5kIGRpc3BhdGNoIHNpemUgdG8gb3RoZXJzLlxuXG4gICAgbGV0IHBlcmNlbnRUb0Rpc3BhdGNoID0gMDtcblxuICAgIC8vIEdldCBjb250YWluZXIgcGl4ZWwgc2l6ZVxuICAgIGNvbnN0IGNvbnRhaW5lclNpemVQaXhlbCA9IGdldFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBpZiAoYXJlYS5zaXplICogY29udGFpbmVyU2l6ZVBpeGVsIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgIHBlcmNlbnRUb0Rpc3BhdGNoICs9IGFyZWEuc2l6ZTtcbiAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwZXJjZW50VG9EaXNwYXRjaCA+IDAgJiYgdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBuYkFyZWFzTm90WmVybyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplICE9PSAwKS5sZW5ndGg7XG5cbiAgICAgIGlmIChuYkFyZWFzTm90WmVybyA+IDApIHtcbiAgICAgICAgY29uc3QgcGVyY2VudFRvQWRkID0gcGVyY2VudFRvRGlzcGF0Y2ggLyBuYkFyZWFzTm90WmVybztcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICBhcmVhLnNpemUgKz0gcGVyY2VudFRvQWRkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEFsbCBhcmVhIHNpemVzIChjb250YWluZXIgcGVyY2VudGFnZSkgYXJlIGxlc3MgdGhhbiBndXRlclNpemUsXG4gICAgICAvLyBJdCBtZWFucyBjb250YWluZXJTaXplIDwgbmdHdXR0ZXJzICogZ3V0dGVyU2l6ZVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxXS5zaXplID0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3VtR3V0dGVyU2l6ZSA9IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemU7XG5cbiAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICBhcmVhLmNvbXBvbmVudC5zZXRTdHlsZUZsZXhiYXNpcyhgY2FsYyggJHthcmVhLnNpemUgKiAxMDB9JSAtICR7YXJlYS5zaXplICogc3VtR3V0dGVyU2l6ZX1weCApYCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xpY2tHdXR0ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGd1dHRlck51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICh0aGlzLnN0YXJ0UG9pbnQgJiYgdGhpcy5zdGFydFBvaW50LnggPT09IGV2ZW50LmNsaWVudFggJiYgdGhpcy5zdGFydFBvaW50LnkgPT09IGV2ZW50LmNsaWVudFkpIHtcbiAgICAgIHRoaXMuY3VycmVudEd1dHRlck51bSA9IGd1dHRlck51bTtcblxuICAgICAgdGhpcy5ub3RpZnkoJ2NsaWNrJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXJ0RHJhZ2dpbmcoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBndXR0ZXJPcmRlcjogbnVtYmVyLCBndXR0ZXJOdW06IG51bWJlcik6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnN0YXJ0UG9pbnQgPSBnZXRQb2ludEZyb21FdmVudChldmVudCk7XG4gICAgaWYgKCF0aGlzLnN0YXJ0UG9pbnQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZWFBID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgLSAxKTtcbiAgICBjb25zdCBhcmVhQiA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyICsgMSk7XG5cbiAgICBpZiAoIWFyZWFBIHx8ICFhcmVhQikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbENvbnRhaW5lciA9IGdldFBpeGVsU2l6ZSh0aGlzLmVsUmVmLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSA9IGdldFBpeGVsU2l6ZShhcmVhQS5jb21wb25lbnQuZWxSZWYsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCID0gZ2V0UGl4ZWxTaXplKGFyZWFCLmNvbXBvbmVudC5lbFJlZiwgdGhpcy5kaXJlY3Rpb24pO1xuICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9IGFyZWFBLnNpemU7XG4gICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID0gYXJlYUIuc2l6ZTtcbiAgICB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gPSBndXR0ZXJOdW07XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcbiAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIHRoaXMuc3RvcERyYWdnaW5nLmJpbmQodGhpcykpKTtcblxuICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLmRyYWdFdmVudChlLCBhcmVhQSwgYXJlYUIpKSk7XG4gICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIGFyZWFBLCBhcmVhQikpKTtcbiAgICB9KTtcblxuICAgIGFyZWFBLmNvbXBvbmVudC5sb2NrRXZlbnRzKCk7XG4gICAgYXJlYUIuY29tcG9uZW50LmxvY2tFdmVudHMoKTtcblxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1kcmFnZ2luZycpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ndXR0ZXJFbHMudG9BcnJheSgpW3RoaXMuY3VycmVudEd1dHRlck51bSAtIDFdLm5hdGl2ZUVsZW1lbnQsICdpcy1kcmFnZ2VkJyk7XG5cbiAgICB0aGlzLm5vdGlmeSgnc3RhcnQnKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgYXJlYUE6IElBcmVhLCBhcmVhQjogSUFyZWEpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVuZFBvaW50ID0gZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgIGlmICghdGhpcy5lbmRQb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIMKkIEFSRUFTIFNJWkUgUElYRUxcblxuICAgIGxldCBvZmZzZXRQaXhlbCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICh0aGlzLnN0YXJ0UG9pbnQueCAtIHRoaXMuZW5kUG9pbnQueCkgOiAodGhpcy5zdGFydFBvaW50LnkgLSB0aGlzLmVuZFBvaW50LnkpO1xuICAgIGlmICh0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIG9mZnNldFBpeGVsID0gLW9mZnNldFBpeGVsO1xuICAgIH1cblxuICAgIGxldCBuZXdTaXplUGl4ZWxBID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAtIG9mZnNldFBpeGVsO1xuICAgIGxldCBuZXdTaXplUGl4ZWxCID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiArIG9mZnNldFBpeGVsO1xuXG4gICAgaWYgKG5ld1NpemVQaXhlbEEgPCB0aGlzLmd1dHRlclNpemUgJiYgbmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgLy8gV1RGLi4gZ2V0IG91dCBvZiBoZXJlIVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmIChuZXdTaXplUGl4ZWxBIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICBuZXdTaXplUGl4ZWxCICs9IG5ld1NpemVQaXhlbEE7XG4gICAgICBuZXdTaXplUGl4ZWxBID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAobmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgbmV3U2l6ZVBpeGVsQSArPSBuZXdTaXplUGl4ZWxCO1xuICAgICAgbmV3U2l6ZVBpeGVsQiA9IDA7XG4gICAgfVxuXG4gICAgLy8gwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICBpZiAobmV3U2l6ZVBpeGVsQSA9PT0gMCkge1xuICAgICAgYXJlYUIuc2l6ZSArPSBhcmVhQS5zaXplO1xuICAgICAgYXJlYUEuc2l6ZSA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5ld1NpemVQaXhlbEIgPT09IDApIHtcbiAgICAgIGFyZWFBLnNpemUgKz0gYXJlYUIuc2l6ZTtcbiAgICAgIGFyZWFCLnNpemUgPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIE5FV19QRVJDRU5UID0gU1RBUlRfUEVSQ0VOVCAvIFNUQVJUX1BJWEVMICogTkVXX1BJWEVMO1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9PT0gMCkge1xuICAgICAgICBhcmVhQi5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiAqIG5ld1NpemVQaXhlbEI7XG4gICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLSBhcmVhQi5zaXplO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID09PSAwKSB7XG4gICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgLyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBICogbmV3U2l6ZVBpeGVsQTtcbiAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAtIGFyZWFBLnNpemU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXJlYUEuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgKiBuZXdTaXplUGl4ZWxBO1xuICAgICAgICBhcmVhQi5zaXplID0gKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSArIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QikgLSBhcmVhQS5zaXplO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcblxuICAgIC8vIElmIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9pbnQsIG5vdGlmeSBwcm9ncmVzc1xuICAgIGlmICh0aGlzLnN0YXJ0UG9pbnQueCAhPT0gdGhpcy5lbmRQb2ludC54IHx8IHRoaXMuc3RhcnRQb2ludC55ICE9PSB0aGlzLmVuZFBvaW50LnkpIHtcbiAgICAgIHRoaXMubm90aWZ5KCdwcm9ncmVzcycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcERyYWdnaW5nKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgIGFyZWEuY29tcG9uZW50LnVubG9ja0V2ZW50cygpO1xuICAgIH0pO1xuXG4gICAgd2hpbGUgKHRoaXMuZHJhZ0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmY3QgPSB0aGlzLmRyYWdMaXN0ZW5lcnMucG9wKCk7XG4gICAgICBpZiAoZmN0KSB7XG4gICAgICAgIGZjdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9pbnQsIG5vdGlmeSBlbmRcbiAgICBpZiAoZXZlbnQgJiYgdGhpcy5lbmRQb2ludCAmJiAodGhpcy5zdGFydFBvaW50LnggIT09IHRoaXMuZW5kUG9pbnQueCB8fCB0aGlzLnN0YXJ0UG9pbnQueSAhPT0gdGhpcy5lbmRQb2ludC55KSkge1xuICAgICAgdGhpcy5ub3RpZnkoJ2VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dpbmcnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZ3V0dGVyRWxzLnRvQXJyYXkoKVt0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gLSAxXS5uYXRpdmVFbGVtZW50LCAnaXMtZHJhZ2dlZCcpO1xuXG4gICAgLy8gTmVlZGVkIHRvIGxldCAoY2xpY2spPVwiY2xpY2tHdXR0ZXIoLi4uKVwiIGV2ZW50IHJ1biBhbmQgdmVyaWZ5IGlmIG1vdXNlIG1vdmVkIG9yIG5vdFxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmVuZFBvaW50ID0gbnVsbDtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5KHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ3RyYW5zaXRpb25FbmQnKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZXM6IEFycmF5PG51bWJlcj4gPSB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuc2l6ZSAqIDEwMCk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnU3RhcnRTdWJzY3JpYmVyLm5leHQoeyBndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXMgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnZW5kJykge1xuICAgICAgaWYgKHRoaXMuZHJhZ0VuZFN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ0VuZFN1YnNjcmliZXIubmV4dCh7IGd1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplcyB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIGlmICh0aGlzLmd1dHRlckNsaWNrU3Vic2NyaWJlcikge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5ndXR0ZXJDbGlja1N1YnNjcmliZXIubmV4dCh7IGd1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplcyB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd0cmFuc2l0aW9uRW5kJykge1xuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMudHJhbnNpdGlvbkVuZFN1YnNjcmliZXIubmV4dChzaXplcykpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAncHJvZ3Jlc3MnKSB7XG4gICAgICAvLyBTdGF5IG91dHNpZGUgem9uZSB0byBhbGxvdyB1c2VycyBkbyB3aGF0IHRoZXkgd2FudCBhYm91dCBjaGFuZ2UgZGV0ZWN0aW9uIG1lY2hhbmlzbS5cbiAgICAgIHRoaXMuZHJhZ1Byb2dyZXNzU3ViamVjdC5uZXh0KHsgZ3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICB9XG59XG4iXX0=