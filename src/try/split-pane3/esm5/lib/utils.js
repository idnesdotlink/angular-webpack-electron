export function getPointFromEvent(event) {
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
export function getElementPixelSize(elRef, direction) {
    var rect = elRef.nativeElement.getBoundingClientRect();
    return (direction === 'horizontal') ? rect.width : rect.height;
}
export function getInputBoolean(v) {
    return (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
}
export function getInputPositiveNumber(v, defaultValue) {
    if (v === null || v === undefined)
        return defaultValue;
    v = Number(v);
    return !isNaN(v) && v >= 0 ? v : defaultValue;
}
export function isUserSizesValid(unit, sizes) {
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
export function getAreaMinSize(a) {
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
export function getAreaMaxSize(a) {
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
export function getGutterSideAbsorptionCapacity(unit, sideAreas, pixels, allAreasSizePixel) {
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
export function updateAreaSize(unit, item) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3NwbGl0LXBhbmUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQThCO0lBQzlELGFBQWE7SUFDYixJQUFpQixLQUFNLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBaUIsS0FBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3JHLE9BQU87WUFDTCxDQUFDLEVBQWUsS0FBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ2hELENBQUMsRUFBZSxLQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87U0FDakQsQ0FBQztLQUNIO0lBQ0QsYUFBYTtTQUNSLElBQWlCLEtBQU0sQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFpQixLQUFNLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUMvRixPQUFPO1lBQ0wsQ0FBQyxFQUFlLEtBQU0sQ0FBQyxPQUFPO1lBQzlCLENBQUMsRUFBZSxLQUFNLENBQUMsT0FBTztTQUMvQixDQUFDO0tBQ0g7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsS0FBaUIsRUFBRSxTQUFvQztJQUN6RixJQUFNLElBQUksR0FBaUIsS0FBSyxDQUFDLGFBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRXhFLE9BQU8sQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDakUsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsQ0FBTTtJQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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RTtRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0tBQzNEO1NBQ0ksSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQ3pCLGdEQUFnRDtRQUNoRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNyRjtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUFyZWEsIElQb2ludCwgSUFyZWFTbmFwc2hvdCwgSVNwbGl0U2lkZUFic29ycHRpb25DYXBhY2l0eSwgSUFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2ludEZyb21FdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBJUG9pbnQge1xuICAvLyBUb3VjaEV2ZW50XG4gIGlmICgoPFRvdWNoRXZlbnQ+ZXZlbnQpLmNoYW5nZWRUb3VjaGVzICE9PSB1bmRlZmluZWQgJiYgKDxUb3VjaEV2ZW50PmV2ZW50KS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6ICg8VG91Y2hFdmVudD5ldmVudCkuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHk6ICg8VG91Y2hFdmVudD5ldmVudCkuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICB9O1xuICB9XG4gIC8vIE1vdXNlRXZlbnRcbiAgZWxzZSBpZiAoKDxNb3VzZUV2ZW50PmV2ZW50KS5jbGllbnRYICE9PSB1bmRlZmluZWQgJiYgKDxNb3VzZUV2ZW50PmV2ZW50KS5jbGllbnRZICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogKDxNb3VzZUV2ZW50PmV2ZW50KS5jbGllbnRYLFxuICAgICAgeTogKDxNb3VzZUV2ZW50PmV2ZW50KS5jbGllbnRZLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50UGl4ZWxTaXplKGVsUmVmOiBFbGVtZW50UmVmLCBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpOiBudW1iZXIge1xuICBjb25zdCByZWN0ID0gKDxIVE1MRWxlbWVudD5lbFJlZi5uYXRpdmVFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICByZXR1cm4gKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/IHJlY3Qud2lkdGggOiByZWN0LmhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldElucHV0Qm9vbGVhbih2OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICh0eXBlb2YgKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldElucHV0UG9zaXRpdmVOdW1iZXI8VD4odjogYW55LCBkZWZhdWx0VmFsdWU6IFQpOiBudW1iZXIgfCBUIHtcbiAgaWYgKHYgPT09IG51bGwgfHwgdiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gIHYgPSBOdW1iZXIodik7XG4gIHJldHVybiAhaXNOYU4odikgJiYgdiA+PSAwID8gdiA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVXNlclNpemVzVmFsaWQodW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJywgc2l6ZXM6IEFycmF5PG51bWJlciB8IG51bGw+KTogYm9vbGVhbiB7XG4gIC8vIEFsbCBzaXplcyBoYXZlIHRvIGJlIG5vdCBudWxsIGFuZCB0b3RhbCBzaG91bGQgYmUgMTAwXG4gIGlmICh1bml0ID09PSAncGVyY2VudCcpIHtcbiAgICBjb25zdCB0b3RhbCA9IHNpemVzLnJlZHVjZSgodG90YWwsIHMpID0+IHMgIT09IG51bGwgPyB0b3RhbCArIHMgOiB0b3RhbCwgMCk7XG4gICAgcmV0dXJuIHNpemVzLmV2ZXJ5KHMgPT4gcyAhPT0gbnVsbCkgJiYgdG90YWwgPiA5OS45ICYmIHRvdGFsIDwgMTAwLjE7XG4gIH1cblxuICAvLyBBIHNpemUgYXQgbnVsbCBpcyBtYW5kYXRvcnkgYnV0IG9ubHkgb25lLlxuICBpZiAodW5pdCA9PT0gJ3BpeGVsJykge1xuICAgIHJldHVybiBzaXplcy5maWx0ZXIocyA9PiBzID09PSBudWxsKS5sZW5ndGggPT09IDE7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFyZWFNaW5TaXplKGE6IElBcmVhKTogbnVsbCB8IG51bWJlciB7XG4gIGlmIChhLnNpemUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChhLmNvbXBvbmVudC5sb2NrU2l6ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBhLnNpemU7XG4gIH1cblxuICBpZiAoYS5jb21wb25lbnQubWluU2l6ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKGEuY29tcG9uZW50Lm1pblNpemUgPiBhLnNpemUpIHtcbiAgICByZXR1cm4gYS5zaXplO1xuICB9XG5cbiAgcmV0dXJuIGEuY29tcG9uZW50Lm1pblNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcmVhTWF4U2l6ZShhOiBJQXJlYSk6IG51bGwgfCBudW1iZXIge1xuICBpZiAoYS5zaXplID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoYS5jb21wb25lbnQubG9ja1NpemUgPT09IHRydWUpIHtcbiAgICByZXR1cm4gYS5zaXplO1xuICB9XG5cbiAgaWYgKGEuY29tcG9uZW50Lm1heFNpemUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChhLmNvbXBvbmVudC5tYXhTaXplIDwgYS5zaXplKSB7XG4gICAgcmV0dXJuIGEuc2l6ZTtcbiAgfVxuXG4gIHJldHVybiBhLmNvbXBvbmVudC5tYXhTaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3V0dGVyU2lkZUFic29ycHRpb25DYXBhY2l0eSh1bml0OiAncGVyY2VudCcgfCAncGl4ZWwnLCBzaWRlQXJlYXM6IEFycmF5PElBcmVhU25hcHNob3Q+LCBwaXhlbHM6IG51bWJlciwgYWxsQXJlYXNTaXplUGl4ZWw6IG51bWJlcik6IElTcGxpdFNpZGVBYnNvcnB0aW9uQ2FwYWNpdHkge1xuICByZXR1cm4gc2lkZUFyZWFzLnJlZHVjZSgoYWNjLCBhcmVhKSA9PiB7XG4gICAgY29uc3QgcmVzID0gZ2V0QXJlYUFic29ycHRpb25DYXBhY2l0eSh1bml0LCBhcmVhLCBhY2MucmVtYWluLCBhbGxBcmVhc1NpemVQaXhlbCk7XG4gICAgYWNjLmxpc3QucHVzaChyZXMpO1xuICAgIGFjYy5yZW1haW4gPSByZXMucGl4ZWxSZW1haW47XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgeyByZW1haW46IHBpeGVscywgbGlzdDogW10gfSk7XG59XG5cbmZ1bmN0aW9uIGdldEFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkodW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJywgYXJlYVNuYXBzaG90OiBJQXJlYVNuYXBzaG90LCBwaXhlbHM6IG51bWJlciwgYWxsQXJlYXNTaXplUGl4ZWw6IG51bWJlcik6IElBcmVhQWJzb3JwdGlvbkNhcGFjaXR5IHtcbiAgLy8gTm8gcGFpbiBubyBnYWluXG4gIGlmIChwaXhlbHMgPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgcGl4ZWxBYnNvcmI6IDAsXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiBhcmVhU25hcHNob3Quc2l6ZVBlcmNlbnRBdFN0YXJ0LFxuICAgICAgcGl4ZWxSZW1haW46IDAsXG4gICAgfTtcbiAgfVxuXG4gIC8vIEFyZWEgc3RhcnQgYXQgemVybyBhbmQgbmVlZCB0byBiZSByZWR1Y2VkLCBub3QgcG9zc2libGVcbiAgaWYgKGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ID09PSAwICYmIHBpeGVscyA8IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgcGl4ZWxBYnNvcmI6IDAsXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAwLFxuICAgICAgcGl4ZWxSZW1haW46IHBpeGVscyxcbiAgICB9O1xuICB9XG5cbiAgaWYgKHVuaXQgPT09ICdwZXJjZW50Jykge1xuICAgIHJldHVybiBnZXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5UGVyY2VudChhcmVhU25hcHNob3QsIHBpeGVscywgYWxsQXJlYXNTaXplUGl4ZWwpO1xuICB9XG5cbiAgaWYgKHVuaXQgPT09ICdwaXhlbCcpIHtcbiAgICByZXR1cm4gZ2V0QXJlYUFic29ycHRpb25DYXBhY2l0eVBpeGVsKGFyZWFTbmFwc2hvdCwgcGl4ZWxzLCBhbGxBcmVhc1NpemVQaXhlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXJlYUFic29ycHRpb25DYXBhY2l0eVBlcmNlbnQoYXJlYVNuYXBzaG90OiBJQXJlYVNuYXBzaG90LCBwaXhlbHM6IG51bWJlciwgYWxsQXJlYXNTaXplUGl4ZWw6IG51bWJlcik6IElBcmVhQWJzb3JwdGlvbkNhcGFjaXR5IHtcbiAgY29uc3QgdGVtcFBpeGVsU2l6ZSA9IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzO1xuICBjb25zdCB0ZW1wUGVyY2VudFNpemUgPSB0ZW1wUGl4ZWxTaXplIC8gYWxsQXJlYXNTaXplUGl4ZWwgKiAxMDA7XG5cbiAgLy8gRU5MQVJHRSBBUkVBXG5cbiAgaWYgKHBpeGVscyA+IDApIHtcbiAgICAvLyBJZiBtYXhTaXplICYgbmV3U2l6ZSBiaWdnZXIgdGhhbiBpdCA+IGFic29yYiB0byBtYXggYW5kIHJldHVybiByZW1haW5pbmcgcGl4ZWxzXG4gICAgaWYgKGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUgIT09IG51bGwgJiYgdGVtcFBlcmNlbnRTaXplID4gYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSkge1xuICAgICAgLy8gVXNlIGFyZWEuYXJlYS5tYXhTaXplIGFzIG5ld1BlcmNlbnRTaXplIGFuZCByZXR1cm4gY2FsY3VsYXRlIHBpeGVscyByZW1haW5pbmdcbiAgICAgIGNvbnN0IG1heFNpemVQaXhlbCA9IGFyZWFTbmFwc2hvdC5hcmVhLm1heFNpemUgLyAxMDAgKiBhbGxBcmVhc1NpemVQaXhlbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFyZWFTbmFwc2hvdCxcbiAgICAgICAgcGl4ZWxBYnNvcmI6IG1heFNpemVQaXhlbCxcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSxcbiAgICAgICAgcGl4ZWxSZW1haW46IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzIC0gbWF4U2l6ZVBpeGVsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgcGl4ZWxBYnNvcmI6IHBpeGVscyxcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IHRlbXBQZXJjZW50U2l6ZSA+IDEwMCA/IDEwMCA6IHRlbXBQZXJjZW50U2l6ZSxcbiAgICAgIHBpeGVsUmVtYWluOiAwXG4gICAgfTtcbiAgfVxuXG4gIC8vIFJFRFVDRSBBUkVBXG5cbiAgZWxzZSBpZiAocGl4ZWxzIDwgMCkge1xuICAgIC8vIElmIG1pblNpemUgJiBuZXdTaXplIHNtYWxsZXIgdGhhbiBpdCA+IGFic29yYiB0byBtaW4gYW5kIHJldHVybiByZW1haW5pbmcgcGl4ZWxzXG4gICAgaWYgKGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUgIT09IG51bGwgJiYgdGVtcFBlcmNlbnRTaXplIDwgYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSkge1xuICAgICAgLy8gVXNlIGFyZWEuYXJlYS5taW5TaXplIGFzIG5ld1BlcmNlbnRTaXplIGFuZCByZXR1cm4gY2FsY3VsYXRlIHBpeGVscyByZW1haW5pbmdcbiAgICAgIGNvbnN0IG1pblNpemVQaXhlbCA9IGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemUgLyAxMDAgKiBhbGxBcmVhc1NpemVQaXhlbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFyZWFTbmFwc2hvdCxcbiAgICAgICAgcGl4ZWxBYnNvcmI6IG1pblNpemVQaXhlbCxcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSxcbiAgICAgICAgcGl4ZWxSZW1haW46IGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgcGl4ZWxzIC0gbWluU2l6ZVBpeGVsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBJZiByZWR1Y2VkIHVuZGVyIHplcm8gPiByZXR1cm4gcmVtYWluaW5nIHBpeGVsc1xuICAgIGVsc2UgaWYgKHRlbXBQZXJjZW50U2l6ZSA8IDApIHtcbiAgICAgIC8vIFVzZSAwIGFzIG5ld1BlcmNlbnRTaXplIGFuZCByZXR1cm4gY2FsY3VsYXRlIHBpeGVscyByZW1haW5pbmdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFyZWFTbmFwc2hvdCxcbiAgICAgICAgcGl4ZWxBYnNvcmI6IC1hcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCxcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogMCxcbiAgICAgICAgcGl4ZWxSZW1haW46IHBpeGVscyArIGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgcGl4ZWxBYnNvcmI6IHBpeGVscyxcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IHRlbXBQZXJjZW50U2l6ZSxcbiAgICAgIHBpeGVsUmVtYWluOiAwXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBcmVhQWJzb3JwdGlvbkNhcGFjaXR5UGl4ZWwoYXJlYVNuYXBzaG90OiBJQXJlYVNuYXBzaG90LCBwaXhlbHM6IG51bWJlciwgY29udGFpbmVyU2l6ZVBpeGVsOiBudW1iZXIpOiBJQXJlYUFic29ycHRpb25DYXBhY2l0eSB7XG4gIGNvbnN0IHRlbXBQaXhlbFNpemUgPSBhcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCArIHBpeGVscztcblxuICAvLyBFTkxBUkdFIEFSRUFcblxuICBpZiAocGl4ZWxzID4gMCkge1xuICAgIC8vIElmIG1heFNpemUgJiBuZXdTaXplIGJpZ2dlciB0aGFuIGl0ID4gYWJzb3JiIHRvIG1heCBhbmQgcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcbiAgICBpZiAoYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSAhPT0gbnVsbCAmJiB0ZW1wUGl4ZWxTaXplID4gYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgICBwaXhlbEFic29yYjogYXJlYVNuYXBzaG90LmFyZWEubWF4U2l6ZSAtIGFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0LFxuICAgICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAtMSxcbiAgICAgICAgcGl4ZWxSZW1haW46IHRlbXBQaXhlbFNpemUgLSBhcmVhU25hcHNob3QuYXJlYS5tYXhTaXplXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgcGl4ZWxBYnNvcmI6IHBpeGVscyxcbiAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IC0xLFxuICAgICAgcGl4ZWxSZW1haW46IDBcbiAgICB9O1xuICB9XG5cbiAgLy8gUkVEVUNFIEFSRUFcblxuICBlbHNlIGlmIChwaXhlbHMgPCAwKSB7XG4gICAgLy8gSWYgbWluU2l6ZSAmIG5ld1NpemUgc21hbGxlciB0aGFuIGl0ID4gYWJzb3JiIHRvIG1pbiBhbmQgcmV0dXJuIHJlbWFpbmluZyBwaXhlbHNcbiAgICBpZiAoYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSAhPT0gbnVsbCAmJiB0ZW1wUGl4ZWxTaXplIDwgYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXJlYVNuYXBzaG90LFxuICAgICAgICBwaXhlbEFic29yYjogYXJlYVNuYXBzaG90LmFyZWEubWluU2l6ZSArIHBpeGVscyAtIHRlbXBQaXhlbFNpemUsXG4gICAgICAgIHBlcmNlbnRBZnRlckFic29ycHRpb246IC0xLFxuICAgICAgICBwaXhlbFJlbWFpbjogdGVtcFBpeGVsU2l6ZSAtIGFyZWFTbmFwc2hvdC5hcmVhLm1pblNpemVcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIElmIHJlZHVjZWQgdW5kZXIgemVybyA+IHJldHVybiByZW1haW5pbmcgcGl4ZWxzXG4gICAgZWxzZSBpZiAodGVtcFBpeGVsU2l6ZSA8IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFyZWFTbmFwc2hvdCxcbiAgICAgICAgcGl4ZWxBYnNvcmI6IC1hcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydCxcbiAgICAgICAgcGVyY2VudEFmdGVyQWJzb3JwdGlvbjogLTEsXG4gICAgICAgIHBpeGVsUmVtYWluOiBwaXhlbHMgKyBhcmVhU25hcHNob3Quc2l6ZVBpeGVsQXRTdGFydFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGFyZWFTbmFwc2hvdCxcbiAgICAgIHBpeGVsQWJzb3JiOiBwaXhlbHMsXG4gICAgICBwZXJjZW50QWZ0ZXJBYnNvcnB0aW9uOiAtMSxcbiAgICAgIHBpeGVsUmVtYWluOiAwXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXJlYVNpemUodW5pdDogJ3BlcmNlbnQnIHwgJ3BpeGVsJywgaXRlbTogSUFyZWFBYnNvcnB0aW9uQ2FwYWNpdHkpIHtcblxuICBpZiAodW5pdCA9PT0gJ3BlcmNlbnQnKSB7XG4gICAgaXRlbS5hcmVhU25hcHNob3QuYXJlYS5zaXplID0gaXRlbS5wZXJjZW50QWZ0ZXJBYnNvcnB0aW9uO1xuICB9XG4gIGVsc2UgaWYgKHVuaXQgPT09ICdwaXhlbCcpIHtcbiAgICAvLyBVcGRhdGUgc2l6ZSBleGNlcHQgZm9yIHRoZSB3aWxkY2FyZCBzaXplIGFyZWFcbiAgICBpZiAoaXRlbS5hcmVhU25hcHNob3QuYXJlYS5zaXplICE9PSBudWxsKSB7XG4gICAgICBpdGVtLmFyZWFTbmFwc2hvdC5hcmVhLnNpemUgPSBpdGVtLmFyZWFTbmFwc2hvdC5zaXplUGl4ZWxBdFN0YXJ0ICsgaXRlbS5waXhlbEFic29yYjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==