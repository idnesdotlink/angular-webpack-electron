import { __spread, __decorate, __metadata } from 'tslib';
import { Input, Output, ViewChildren, QueryList, Component, ChangeDetectionStrategy, NgZone, ElementRef, ChangeDetectorRef, Renderer2, Directive, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function getPointFromEvent(event) {
    // TouchEvent
    if (event.touches !== undefined && event.touches.length > 0) {
        return {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };
    }
    // MouseEvent
    else if (event.clientX !== undefined && event.clientY !== undefined) {
        return {
            x: event.clientX,
            y: event.clientY,
        };
    }
    return null;
}
function getPixelSize(elRef, direction) {
    return elRef.nativeElement[(direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight'];
}
function getInputBoolean(v) {
    return (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
}
function isValidTotalSize(total) {
    return total > .999 && total < 1.001;
}

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
        (_a = this.displayedAreas).push.apply(_a, __spread(areas));
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
        (_a = this.hidedAreas).push.apply(_a, __spread(areas));
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
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SplitComponent.prototype, "direction", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitComponent.prototype, "gutterSize", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitComponent.prototype, "useTransition", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SplitComponent.prototype, "dir", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "dragStart", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "dragEnd", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "gutterClick", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable),
        __metadata("design:paramtypes", [])
    ], SplitComponent.prototype, "transitionEnd", null);
    __decorate([
        ViewChildren('gutterEls'),
        __metadata("design:type", QueryList)
    ], SplitComponent.prototype, "gutterEls", void 0);
    SplitComponent = __decorate([
        Component({
            selector: 'as-split',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-content></ng-content>\n<ng-template ngFor [ngForOf]=\"displayedAreas\" let-index=\"index\" let-last=\"last\">\n  <div *ngIf=\"last === false\" #gutterEls class=\"as-split-gutter\" [style.flex-basis.px]=\"gutterSize\"\n    [style.order]=\"index*2+1\" (as-split-undetected.click)=\"clickGutter($event, index+1)\"\n    (as-split-undetected.mousedown)=\"startDragging($event, index*2+1, index+1)\"\n    (as-split-undetected.touchstart)=\"startDragging($event, index*2+1, index+1)\">\n    <div class=\"as-split-gutter-icon\"></div>\n  </div>\n</ng-template>",
            styles: [":host{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden;width:100%;height:100%}:host>.as-split-gutter{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;background-color:#eee;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}:host>.as-split-gutter>.as-split-gutter-icon{width:100%;height:100%;background-position:center center;background-repeat:no-repeat}:host ::ng-deep>.as-split-area{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;overflow-x:hidden;overflow-y:auto}:host ::ng-deep>.as-split-area.is-hided{-ms-flex-preferred-size:0!important;flex-basis:0!important;overflow-x:hidden;overflow-y:hidden}:host.is-horizontal{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}:host.is-horizontal>.as-split-gutter{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;cursor:col-resize;height:100%}:host.is-horizontal>.as-split-gutter>.as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==)}:host.is-horizontal ::ng-deep>.as-split-area{height:100%}:host.is-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.is-vertical>.as-split-gutter{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;cursor:row-resize;width:100%}:host.is-vertical>.as-split-gutter .as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC)}:host.is-vertical ::ng-deep>.as-split-area{width:100%}:host.is-vertical ::ng-deep>.as-split-area.is-hided{max-width:0}:host.is-disabled>.as-split-gutter{cursor:default}:host.is-disabled>.as-split-gutter .as-split-gutter-icon{background-image:none}:host.is-transition.is-init:not(.is-dragging) ::ng-deep>.as-split-area,:host.is-transition.is-init:not(.is-dragging)>.as-split-gutter{-webkit-transition:-webkit-flex-basis .3s;transition:flex-basis .3s;-o-transition:flex-basis .3s;transition:flex-basis .3s,-webkit-flex-basis .3s,-ms-flex-preferred-size .3s}"]
        }),
        __metadata("design:paramtypes", [NgZone,
            ElementRef,
            ChangeDetectorRef,
            Renderer2])
    ], SplitComponent);
    return SplitComponent;
}());

var SplitAreaDirective = /** @class */ (function () {
    function SplitAreaDirective(ngZone, elRef, renderer, split) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        ////
        this._size = null;
        ////
        this._visible = true;
        this.lockListeners = [];
        this.renderer.addClass(this.elRef.nativeElement, 'as-split-area');
    }
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (v) {
            v = Number(v);
            this._order = !isNaN(v) ? v : null;
            this.split.updateArea(this, true, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            v = Number(v);
            this._size = (!isNaN(v) && v >= 0 && v <= 100) ? (v / 100) : null;
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (v) {
            this._visible = getInputBoolean(v);
            if (this._visible) {
                this.split.showArea(this);
                this.renderer.removeClass(this.elRef.nativeElement, 'is-hided');
            }
            else {
                this.split.hideArea(this);
                this.renderer.addClass(this.elRef.nativeElement, 'is-hided');
            }
        },
        enumerable: true,
        configurable: true
    });
    SplitAreaDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.split.addArea(this);
        this.ngZone.runOutsideAngular(function () {
            _this.transitionListener = _this.renderer.listen(_this.elRef.nativeElement, 'transitionend', function (event) {
                // Limit only flex-basis transition to trigger the event
                if (event.propertyName === 'flex-basis') {
                    _this.split.notify('transitionEnd');
                }
            });
        });
    };
    SplitAreaDirective.prototype.setStyleOrder = function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    SplitAreaDirective.prototype.setStyleFlexbasis = function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    };
    SplitAreaDirective.prototype.lockEvents = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'selectstart', function (e) { return false; }));
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'dragstart', function (e) { return false; }));
        });
    };
    SplitAreaDirective.prototype.unlockEvents = function () {
        while (this.lockListeners.length > 0) {
            var fct = this.lockListeners.pop();
            if (fct) {
                fct();
            }
        }
    };
    SplitAreaDirective.prototype.ngOnDestroy = function () {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitAreaDirective.prototype, "order", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitAreaDirective.prototype, "size", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitAreaDirective.prototype, "visible", null);
    SplitAreaDirective = __decorate([
        Directive({
            selector: 'as-split-area, [as-split-area]'
        }),
        __metadata("design:paramtypes", [NgZone,
            ElementRef,
            Renderer2,
            SplitComponent])
    ], SplitAreaDirective);
    return SplitAreaDirective;
}());

/**
 * Credit to Michael Strobel from:
 * https://github.com/kryops/ng2-events
 */
var UndetectedEventPlugin = /** @class */ (function () {
    function UndetectedEventPlugin() {
    }
    UndetectedEventPlugin.prototype.supports = function (eventName) {
        return eventName.indexOf('as-split-undetected.') === 0;
    };
    UndetectedEventPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        var realEventName = eventName.slice(20);
        return this.manager.getZone().runOutsideAngular(function () { return _this.manager.addEventListener(element, realEventName, handler); });
    };
    UndetectedEventPlugin = __decorate([
        Injectable()
    ], UndetectedEventPlugin);
    return UndetectedEventPlugin;
}());

var AngularSplitModule = /** @class */ (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule_1 = AngularSplitModule;
    AngularSplitModule.forRoot = function () {
        return {
            ngModule: AngularSplitModule_1,
            providers: [{
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: UndetectedEventPlugin,
                    multi: true
                }]
        };
    };
    AngularSplitModule.forChild = function () {
        return {
            ngModule: AngularSplitModule_1,
            providers: []
        };
    };
    var AngularSplitModule_1;
    AngularSplitModule = AngularSplitModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SplitComponent,
                SplitAreaDirective,
            ],
            exports: [
                SplitComponent,
                SplitAreaDirective,
            ]
        })
    ], AngularSplitModule);
    return AngularSplitModule;
}());

/*
 * Public API Surface of angular-split
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularSplitModule, SplitAreaDirective, SplitComponent, UndetectedEventPlugin as ɵa };
//# sourceMappingURL=try-split-pane.js.map
