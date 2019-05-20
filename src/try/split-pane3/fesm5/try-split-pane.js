import { __spread, __decorate, __metadata } from 'tslib';
import { Input, Output, ViewChildren, QueryList, Component, ChangeDetectionStrategy, NgZone, ElementRef, ChangeDetectorRef, Renderer2, EventEmitter, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function getPointFromEvent(event) {
    // TouchEvent
    if (event.changedTouches !== undefined && event.changedTouches.length > 0) {
        return {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY,
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
function getElementPixelSize(elRef, direction) {
    var rect = elRef.nativeElement.getBoundingClientRect();
    return (direction === 'horizontal') ? rect.width : rect.height;
}
function getInputBoolean(v) {
    return (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
}
function getInputPositiveNumber(v, defaultValue) {
    if (v === null || v === undefined)
        return defaultValue;
    v = Number(v);
    return !isNaN(v) && v >= 0 ? v : defaultValue;
}
function isUserSizesValid(unit, sizes) {
    // All sizes have to be not null and total should be 100
    if (unit === 'percent') {
        var total = sizes.reduce(function (total, s) { return s !== null ? total + s : total; }, 0);
        return sizes.every(function (s) { return s !== null; }) && total > 99.9 && total < 100.1;
    }
    // A size at null is mandatory but only one.
    if (unit === 'pixel') {
        return sizes.filter(function (s) { return s === null; }).length === 1;
    }
}
function getAreaMinSize(a) {
    if (a.size === null) {
        return null;
    }
    if (a.component.lockSize === true) {
        return a.size;
    }
    if (a.component.minSize === null) {
        return null;
    }
    if (a.component.minSize > a.size) {
        return a.size;
    }
    return a.component.minSize;
}
function getAreaMaxSize(a) {
    if (a.size === null) {
        return null;
    }
    if (a.component.lockSize === true) {
        return a.size;
    }
    if (a.component.maxSize === null) {
        return null;
    }
    if (a.component.maxSize < a.size) {
        return a.size;
    }
    return a.component.maxSize;
}
function getGutterSideAbsorptionCapacity(unit, sideAreas, pixels, allAreasSizePixel) {
    return sideAreas.reduce(function (acc, area) {
        var res = getAreaAbsorptionCapacity(unit, area, acc.remain, allAreasSizePixel);
        acc.list.push(res);
        acc.remain = res.pixelRemain;
        return acc;
    }, { remain: pixels, list: [] });
}
function getAreaAbsorptionCapacity(unit, areaSnapshot, pixels, allAreasSizePixel) {
    // No pain no gain
    if (pixels === 0) {
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: areaSnapshot.sizePercentAtStart,
            pixelRemain: 0,
        };
    }
    // Area start at zero and need to be reduced, not possible
    if (areaSnapshot.sizePixelAtStart === 0 && pixels < 0) {
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: 0,
            pixelRemain: pixels,
        };
    }
    if (unit === 'percent') {
        return getAreaAbsorptionCapacityPercent(areaSnapshot, pixels, allAreasSizePixel);
    }
    if (unit === 'pixel') {
        return getAreaAbsorptionCapacityPixel(areaSnapshot, pixels, allAreasSizePixel);
    }
}
function getAreaAbsorptionCapacityPercent(areaSnapshot, pixels, allAreasSizePixel) {
    var tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    var tempPercentSize = tempPixelSize / allAreasSizePixel * 100;
    // ENLARGE AREA
    if (pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels
        if (areaSnapshot.area.maxSize !== null && tempPercentSize > areaSnapshot.area.maxSize) {
            // Use area.area.maxSize as newPercentSize and return calculate pixels remaining
            var maxSizePixel = areaSnapshot.area.maxSize / 100 * allAreasSizePixel;
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: maxSizePixel,
                percentAfterAbsorption: areaSnapshot.area.maxSize,
                pixelRemain: areaSnapshot.sizePixelAtStart + pixels - maxSizePixel
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: tempPercentSize > 100 ? 100 : tempPercentSize,
            pixelRemain: 0
        };
    }
    // REDUCE AREA
    else if (pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels
        if (areaSnapshot.area.minSize !== null && tempPercentSize < areaSnapshot.area.minSize) {
            // Use area.area.minSize as newPercentSize and return calculate pixels remaining
            var minSizePixel = areaSnapshot.area.minSize / 100 * allAreasSizePixel;
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: minSizePixel,
                percentAfterAbsorption: areaSnapshot.area.minSize,
                pixelRemain: areaSnapshot.sizePixelAtStart + pixels - minSizePixel
            };
        }
        // If reduced under zero > return remaining pixels
        else if (tempPercentSize < 0) {
            // Use 0 as newPercentSize and return calculate pixels remaining
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: 0,
                pixelRemain: pixels + areaSnapshot.sizePixelAtStart
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: tempPercentSize,
            pixelRemain: 0
        };
    }
}
function getAreaAbsorptionCapacityPixel(areaSnapshot, pixels, containerSizePixel) {
    var tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    // ENLARGE AREA
    if (pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels
        if (areaSnapshot.area.maxSize !== null && tempPixelSize > areaSnapshot.area.maxSize) {
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: areaSnapshot.area.maxSize - areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.maxSize
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: -1,
            pixelRemain: 0
        };
    }
    // REDUCE AREA
    else if (pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels
        if (areaSnapshot.area.minSize !== null && tempPixelSize < areaSnapshot.area.minSize) {
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: areaSnapshot.area.minSize + pixels - tempPixelSize,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.minSize
            };
        }
        // If reduced under zero > return remaining pixels
        else if (tempPixelSize < 0) {
            return {
                areaSnapshot: areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: pixels + areaSnapshot.sizePixelAtStart
            };
        }
        return {
            areaSnapshot: areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: -1,
            pixelRemain: 0
        };
    }
}
function updateAreaSize(unit, item) {
    if (unit === 'percent') {
        item.areaSnapshot.area.size = item.percentAfterAbsorption;
    }
    else if (unit === 'pixel') {
        // Update size except for the wildcard size area
        if (item.areaSnapshot.area.size !== null) {
            item.areaSnapshot.area.size = item.areaSnapshot.sizePixelAtStart + item.pixelAbsorb;
        }
    }
}

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
var SplitComponent = /** @class */ (function () {
    function SplitComponent(ngZone, elRef, cdRef, renderer) {
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
    Object.defineProperty(SplitComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (v) {
            this._direction = (v === 'vertical') ? 'vertical' : 'horizontal';
            this.renderer.addClass(this.elRef.nativeElement, "as-" + this._direction);
            this.renderer.removeClass(this.elRef.nativeElement, "as-" + ((this._direction === 'vertical') ? 'horizontal' : 'vertical'));
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "unit", {
        get: function () {
            return this._unit;
        },
        set: function (v) {
            this._unit = (v === 'pixel') ? 'pixel' : 'percent';
            this.renderer.addClass(this.elRef.nativeElement, "as-" + this._unit);
            this.renderer.removeClass(this.elRef.nativeElement, "as-" + ((this._unit === 'pixel') ? 'percent' : 'pixel'));
            this.build(false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterSize", {
        get: function () {
            return this._gutterSize;
        },
        set: function (v) {
            this._gutterSize = getInputPositiveNumber(v, 11);
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterStep", {
        get: function () {
            return this._gutterStep;
        },
        set: function (v) {
            this._gutterStep = getInputPositiveNumber(v, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "restrictMove", {
        get: function () {
            return this._restrictMove;
        },
        set: function (v) {
            this._restrictMove = getInputBoolean(v);
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
                this.renderer.addClass(this.elRef.nativeElement, 'as-transition');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'as-transition');
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
                this.renderer.addClass(this.elRef.nativeElement, 'as-disabled');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'as-disabled');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        set: function (v) {
            this._dir = (v === 'rtl') ? 'rtl' : 'ltr';
            this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterDblClickDuration", {
        get: function () {
            return this._gutterDblClickDuration;
        },
        set: function (v) {
            this._gutterDblClickDuration = getInputPositiveNumber(v, 0);
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
            setTimeout(function () { return _this.renderer.addClass(_this.elRef.nativeElement, 'as-init'); });
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
    };
    SplitComponent.prototype.removeArea = function (component) {
        if (this.displayedAreas.some(function (a) { return a.component === component; })) {
            var area = this.displayedAreas.find(function (a) { return a.component === component; });
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some(function (a) { return a.component === component; })) {
            var area = this.hidedAreas.find(function (a) { return a.component === component; });
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    };
    SplitComponent.prototype.updateArea = function (component, resetOrders, resetSizes) {
        if (component.visible === true) {
            this.build(resetOrders, resetSizes);
        }
    };
    SplitComponent.prototype.showArea = function (component) {
        var _a;
        var area = this.hidedAreas.find(function (a) { return a.component === component; });
        if (area === undefined) {
            return;
        }
        var areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        (_a = this.displayedAreas).push.apply(_a, __spread(areas));
        this.build(true, true);
    };
    SplitComponent.prototype.hideArea = function (comp) {
        var _a;
        var area = this.displayedAreas.find(function (a) { return a.component === comp; });
        if (area === undefined) {
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
        return this.displayedAreas.map(function (a) { return a.size === null ? '*' : a.size; });
    };
    SplitComponent.prototype.setVisibleAreaSizes = function (sizes) {
        if (sizes.length !== this.displayedAreas.length) {
            return false;
        }
        var formatedSizes = sizes.map(function (s) { return getInputPositiveNumber(s, null); });
        var isValid = isUserSizesValid(this.unit, formatedSizes);
        if (isValid === false) {
            return false;
        }
        // @ts-ignore
        this.displayedAreas.forEach(function (area, i) { return area.component._size = formatedSizes[i]; });
        this.build(false, true);
        return true;
    };
    SplitComponent.prototype.build = function (resetOrders, resetSizes) {
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
        // ¤ AREAS SIZE
        if (resetSizes === true) {
            var useUserSizes_1 = isUserSizesValid(this.unit, this.displayedAreas.map(function (a) { return a.component.size; }));
            switch (this.unit) {
                case 'percent': {
                    var defaultSize_1 = 100 / this.displayedAreas.length;
                    this.displayedAreas.forEach(function (area) {
                        area.size = useUserSizes_1 ? area.component.size : defaultSize_1;
                        area.minSize = getAreaMinSize(area);
                        area.maxSize = getAreaMaxSize(area);
                    });
                    break;
                }
                case 'pixel': {
                    if (useUserSizes_1) {
                        this.displayedAreas.forEach(function (area) {
                            area.size = area.component.size;
                            area.minSize = getAreaMinSize(area);
                            area.maxSize = getAreaMaxSize(area);
                        });
                    }
                    else {
                        var wildcardSizeAreas = this.displayedAreas.filter(function (a) { return a.component.size === null; });
                        // No wildcard area > Need to select one arbitrarily > first
                        if (wildcardSizeAreas.length === 0 && this.displayedAreas.length > 0) {
                            this.displayedAreas.forEach(function (area, i) {
                                area.size = (i === 0) ? null : area.component.size;
                                area.minSize = (i === 0) ? null : getAreaMinSize(area);
                                area.maxSize = (i === 0) ? null : getAreaMaxSize(area);
                            });
                        }
                        // More than one wildcard area > Need to keep only one arbitrarly > first
                        else if (wildcardSizeAreas.length > 1) {
                            var alreadyGotOne_1 = false;
                            this.displayedAreas.forEach(function (area) {
                                if (area.component.size === null) {
                                    if (alreadyGotOne_1 === false) {
                                        area.size = null;
                                        area.minSize = null;
                                        area.maxSize = null;
                                        alreadyGotOne_1 = true;
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
    };
    SplitComponent.prototype.refreshStyleSizes = function () {
        var _this = this;
        ///////////////////////////////////////////
        // PERCENT MODE
        if (this.unit === 'percent') {
            // Only one area > flex-basis 100%
            if (this.displayedAreas.length === 1) {
                this.displayedAreas[0].component.setStyleFlex(0, 0, "100%", false, false);
            }
            // Multiple areas > use each percent basis
            else {
                var sumGutterSize_1 = this.getNbGutters() * this.gutterSize;
                this.displayedAreas.forEach(function (area) {
                    area.component.setStyleFlex(0, 0, "calc( " + area.size + "% - " + area.size / 100 * sumGutterSize_1 + "px )", (area.minSize !== null && area.minSize === area.size) ? true : false, (area.maxSize !== null && area.maxSize === area.size) ? true : false);
                });
            }
        }
        ///////////////////////////////////////////
        // PIXEL MODE
        else if (this.unit === 'pixel') {
            this.displayedAreas.forEach(function (area) {
                // Area with wildcard size
                if (area.size === null) {
                    if (_this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(1, 1, "100%", false, false);
                    }
                    else {
                        area.component.setStyleFlex(1, 1, "auto", false, false);
                    }
                }
                // Area with pixel size
                else {
                    // Only one area > flex-basis 100%
                    if (_this.displayedAreas.length === 1) {
                        area.component.setStyleFlex(0, 0, "100%", false, false);
                    }
                    // Multiple areas > use each pixel basis
                    else {
                        area.component.setStyleFlex(0, 0, area.size + "px", (area.minSize !== null && area.minSize === area.size) ? true : false, (area.maxSize !== null && area.maxSize === area.size) ? true : false);
                    }
                }
            });
        }
    };
    SplitComponent.prototype.clickGutter = function (event, gutterNum) {
        var _this = this;
        var tempPoint = getPointFromEvent(event);
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
                this._clickTimeout = window.setTimeout(function () {
                    _this._clickTimeout = null;
                    _this.notify('click', gutterNum);
                    _this.stopDragging();
                }, this.gutterDblClickDuration);
            }
        }
    };
    SplitComponent.prototype.startDragging = function (event, gutterOrder, gutterNum) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = getPointFromEvent(event);
        if (this.startPoint === null || this.disabled === true) {
            return;
        }
        this.snapshot = {
            gutterNum: gutterNum,
            lastSteppedOffset: 0,
            allAreasSizePixel: getElementPixelSize(this.elRef, this.direction) - this.getNbGutters() * this.gutterSize,
            allInvolvedAreasSizePercent: 100,
            areasBeforeGutter: [],
            areasAfterGutter: [],
        };
        this.displayedAreas.forEach(function (area) {
            var areaSnapshot = {
                area: area,
                sizePixelAtStart: getElementPixelSize(area.component.elRef, _this.direction),
                sizePercentAtStart: (_this.unit === 'percent') ? area.size : -1 // If pixel mode, anyway, will not be used.
            };
            if (area.order < gutterOrder) {
                if (_this.restrictMove === true) {
                    _this.snapshot.areasBeforeGutter = [areaSnapshot];
                }
                else {
                    _this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
                }
            }
            else if (area.order > gutterOrder) {
                if (_this.restrictMove === true) {
                    if (_this.snapshot.areasAfterGutter.length === 0)
                        _this.snapshot.areasAfterGutter = [areaSnapshot];
                }
                else {
                    _this.snapshot.areasAfterGutter.push(areaSnapshot);
                }
            }
        });
        this.snapshot.allInvolvedAreasSizePercent = __spread(this.snapshot.areasBeforeGutter, this.snapshot.areasAfterGutter).reduce(function (t, a) { return t + a.sizePercentAtStart; }, 0);
        if (this.snapshot.areasBeforeGutter.length === 0 || this.snapshot.areasAfterGutter.length === 0) {
            return;
        }
        this.dragListeners.push(this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)));
        this.dragListeners.push(this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)));
        this.dragListeners.push(this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)));
        this.ngZone.runOutsideAngular(function () {
            _this.dragListeners.push(_this.renderer.listen('document', 'mousemove', _this.dragEvent.bind(_this)));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchmove', _this.dragEvent.bind(_this)));
        });
        this.displayedAreas.forEach(function (area) { return area.component.lockEvents(); });
        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'as-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'as-dragged');
        this.notify('start', this.snapshot.gutterNum);
    };
    SplitComponent.prototype.dragEvent = function (event) {
        var _this = this;
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
        var offset = (this.direction === 'horizontal') ? (this.startPoint.x - this.endPoint.x) : (this.startPoint.y - this.endPoint.y);
        if (this.dir === 'rtl') {
            offset = -offset;
        }
        var steppedOffset = Math.round(offset / this.gutterStep) * this.gutterStep;
        if (steppedOffset === this.snapshot.lastSteppedOffset) {
            return;
        }
        this.snapshot.lastSteppedOffset = steppedOffset;
        // Need to know if each gutter side areas could reacts to steppedOffset
        var areasBefore = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasBeforeGutter, -steppedOffset, this.snapshot.allAreasSizePixel);
        var areasAfter = getGutterSideAbsorptionCapacity(this.unit, this.snapshot.areasAfterGutter, steppedOffset, this.snapshot.allAreasSizePixel);
        // Each gutter side areas can't absorb all offset
        if (areasBefore.remain !== 0 && areasAfter.remain !== 0) {
            if (Math.abs(areasBefore.remain) === Math.abs(areasAfter.remain)) ;
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
            var all = __spread(areasBefore.list, areasAfter.list);
            var areaToReset_1 = all.find(function (a) { return a.percentAfterAbsorption !== 0 && a.percentAfterAbsorption !== a.areaSnapshot.area.minSize && a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize; });
            if (areaToReset_1) {
                areaToReset_1.percentAfterAbsorption = this.snapshot.allInvolvedAreasSizePercent - all.filter(function (a) { return a !== areaToReset_1; }).reduce(function (total, a) { return total + a.percentAfterAbsorption; }, 0);
            }
        }
        // Now we know areas could absorb steppedOffset, time to really update sizes
        areasBefore.list.forEach(function (item) { return updateAreaSize(_this.unit, item); });
        areasAfter.list.forEach(function (item) { return updateAreaSize(_this.unit, item); });
        this.refreshStyleSizes();
        this.notify('progress', this.snapshot.gutterNum);
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
        this.displayedAreas.forEach(function (area) { return area.component.unlockEvents(); });
        while (this.dragListeners.length > 0) {
            var fct = this.dragListeners.pop();
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
        this.ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.startPoint = null;
                _this.endPoint = null;
            });
        });
    };
    SplitComponent.prototype.notify = function (type, gutterNum) {
        var _this = this;
        var sizes = this.getVisibleAreaSizes();
        if (type === 'start') {
            this.dragStart.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'end') {
            this.dragEnd.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'click') {
            this.gutterClick.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'dblclick') {
            this.gutterDblClick.emit({ gutterNum: gutterNum, sizes: sizes });
        }
        else if (type === 'transitionEnd') {
            if (this.transitionEndSubscriber) {
                this.ngZone.run(function () { return _this.transitionEndSubscriber.next(sizes); });
            }
        }
        else if (type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({ gutterNum: gutterNum, sizes: sizes });
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
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SplitComponent.prototype, "unit", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitComponent.prototype, "gutterSize", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitComponent.prototype, "gutterStep", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitComponent.prototype, "restrictMove", null);
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
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitComponent.prototype, "gutterDblClickDuration", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "dragStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "dragEnd", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "gutterClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SplitComponent.prototype, "gutterDblClick", void 0);
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
            exportAs: 'asSplit',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n        <ng-content></ng-content>\n        <ng-template ngFor [ngForOf]=\"displayedAreas\" let-index=\"index\" let-last=\"last\">\n            <div\n              *ngIf=\"last === false\"\n              #gutterEls\n              class=\"as-split-gutter\"\n              [style.flex-basis.px]=\"gutterSize\"\n              [style.order]=\"index*2+1\"\n              (mousedown)=\"startDragging($event, index*2+1, index+1)\"\n              (touchstart)=\"startDragging($event, index*2+1, index+1)\"\n              (mouseup)=\"clickGutter($event, index+1)\"\n                (touchend)=\"clickGutter($event, index+1)\">\n                <div class=\"as-split-gutter-icon\"></div>\n            </div>\n        </ng-template>",
            styles: [":host{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;overflow:hidden;width:100%;height:100%}:host>.as-split-gutter{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;background-color:#eee;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}:host>.as-split-gutter>.as-split-gutter-icon{width:100%;height:100%;background-position:center center;background-repeat:no-repeat}:host ::ng-deep>.as-split-area{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;overflow-x:hidden;overflow-y:auto}:host ::ng-deep>.as-split-area.as-hidden{-webkit-box-flex:0!important;-ms-flex:0 1 0px!important;flex:0 1 0!important;overflow-x:hidden;overflow-y:hidden}:host.as-horizontal{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}:host.as-horizontal>.as-split-gutter{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;cursor:col-resize;height:100%}:host.as-horizontal>.as-split-gutter>.as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==)}:host.as-horizontal ::ng-deep>.as-split-area{height:100%}:host.as-vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host.as-vertical>.as-split-gutter{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;cursor:row-resize;width:100%}:host.as-vertical>.as-split-gutter .as-split-gutter-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC)}:host.as-vertical ::ng-deep>.as-split-area{width:100%}:host.as-vertical ::ng-deep>.as-split-area.as-hidden{max-width:0}:host.as-disabled>.as-split-gutter{cursor:default}:host.as-disabled>.as-split-gutter .as-split-gutter-icon{background-image:url(\"\")}:host.as-transition.as-init:not(.as-dragging) ::ng-deep>.as-split-area,:host.as-transition.as-init:not(.as-dragging)>.as-split-gutter{-webkit-transition:-webkit-flex-basis .3s;transition:flex-basis .3s;-o-transition:flex-basis .3s;transition:flex-basis .3s,-webkit-flex-basis .3s,-ms-flex-preferred-size .3s}"]
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
        this._minSize = null;
        ////
        this._maxSize = null;
        ////
        this._lockSize = false;
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
            this._order = getInputPositiveNumber(v, null);
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
            this._size = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSize", {
        get: function () {
            return this._minSize;
        },
        set: function (v) {
            this._minSize = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "maxSize", {
        get: function () {
            return this._maxSize;
        },
        set: function (v) {
            this._maxSize = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "lockSize", {
        get: function () {
            return this._lockSize;
        },
        set: function (v) {
            this._lockSize = getInputBoolean(v);
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
                this.renderer.removeClass(this.elRef.nativeElement, 'as-hidden');
            }
            else {
                this.split.hideArea(this);
                this.renderer.addClass(this.elRef.nativeElement, 'as-hidden');
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
                    _this.split.notify('transitionEnd', -1);
                }
            });
        });
    };
    SplitAreaDirective.prototype.setStyleOrder = function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    SplitAreaDirective.prototype.setStyleFlex = function (grow, shrink, basis, isMin, isMax) {
        // Need 3 separated properties to work on IE11 (https://github.com/angular/flex-layout/issues/323)
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', grow);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', shrink);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', basis);
        if (isMin === true)
            this.renderer.addClass(this.elRef.nativeElement, 'as-min');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'as-min');
        if (isMax === true)
            this.renderer.addClass(this.elRef.nativeElement, 'as-max');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'as-max');
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
            if (fct)
                fct();
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
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitAreaDirective.prototype, "minSize", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], SplitAreaDirective.prototype, "maxSize", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitAreaDirective.prototype, "lockSize", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SplitAreaDirective.prototype, "visible", null);
    SplitAreaDirective = __decorate([
        Directive({
            selector: 'as-split-area, [as-split-area]',
            exportAs: 'asSplitArea'
        }),
        __metadata("design:paramtypes", [NgZone,
            ElementRef,
            Renderer2,
            SplitComponent])
    ], SplitAreaDirective);
    return SplitAreaDirective;
}());

var AngularSplitModule = /** @class */ (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule_1 = AngularSplitModule;
    AngularSplitModule.forRoot = function () {
        return {
            ngModule: AngularSplitModule_1,
            providers: []
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

export { AngularSplitModule, SplitAreaDirective, SplitComponent };
//# sourceMappingURL=try-split-pane.js.map
