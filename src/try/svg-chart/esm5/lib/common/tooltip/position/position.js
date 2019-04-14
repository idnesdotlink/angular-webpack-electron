import { PlacementTypes } from './placement.type';
var caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'top') {
        return elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 * @class PositionHelper
 */
var PositionHelper = /** @class */ (function () {
    function PositionHelper() {
    }
    /**
     * Calculate vertical alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    /**
     * Calculate vertical caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    };
    /**
     * Calculate horz alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    /**
     * Calculate horz caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    };
    /**
     * Checks if the element's position should be flipped
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} placement
     * @param {any} alignment
     * @param {any} spacing
     * @returns {boolean}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, alignment, spacing) {
        var flip = false;
        if (placement === 'right') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    };
    /**
     * Position caret
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
        var top = 0;
        var left = 0;
        if (placement === PlacementTypes.right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Position content
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
        var top = 0;
        var left = 0;
        if (placement === PlacementTypes.right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Determine placement based on flip
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing, alignment) {
        var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, alignment, spacing);
        if (shouldFlip) {
            if (placement === PlacementTypes.right) {
                return PlacementTypes.left;
            }
            else if (placement === PlacementTypes.left) {
                return PlacementTypes.right;
            }
            else if (placement === PlacementTypes.top) {
                return PlacementTypes.bottom;
            }
            else if (placement === PlacementTypes.bottom) {
                return PlacementTypes.top;
            }
        }
        return placement;
    };
    return PositionHelper;
}());
export { PositionHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9wb3NpdGlvbi9wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbEQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLFNBQVMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFNBQVM7SUFDbEUsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1FBQ3ZCLE9BQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7S0FDdkM7SUFFRCxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDMUIsT0FBTyxZQUFZLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztLQUN4RjtJQUVELElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUMxQixPQUFPLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNsRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTO0lBQ3BFLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtRQUN4QixPQUFPLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO1FBQ3pCLE9BQU8sWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDdkY7SUFFRCxJQUFJLFNBQVMsS0FBSyxRQUFRLEVB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LENBQUMsTUFBTSxFQUFFO2dCQUM5QyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUM7YUFDM0I7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFSCxxQkFBQztBQUFELENBQUMsQUFoUkQsSUFnUkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcGxhY2VtZW50LnR5cGUnO1xuXG5jb25zdCBjYXJldE9mZnNldCA9IDc7XG5cbmZ1bmN0aW9uIHZlcnRpY2FsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KSB7XG4gIGlmIChhbGlnbm1lbnQgPT09ICd0b3AnKSB7XG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy50b3AgLSBjYXJldE9mZnNldDtcbiAgfVxuXG4gIGlmIChhbGlnbm1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy50b3AgKyBlbERpbWVuc2lvbnMuaGVpZ2h0IC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0ICsgY2FyZXRPZmZzZXQ7XG4gIH1cblxuICBpZiAoYWxpZ25tZW50ID09PSAnY2VudGVyJykge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMudG9wICsgZWxEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLyAyO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCkge1xuICBpZiAoYWxpZ25tZW50ID09PSAnbGVmdCcpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLmxlZnQgLSBjYXJldE9mZnNldDtcbiAgfVxuXG4gIGlmIChhbGlnbm1lbnQgPT09ICdyaWdodCcpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCArIGNhcmV0T2Zmc2V0O1xuICB9XG5cbiAgaWYgKGFsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggLyAyIC0gcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggLyAyO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBQb3NpdGlvbiBoZWxwZXIgZm9yIHRoZSBwb3BvdmVyIGRpcmVjdGl2ZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUG9zaXRpb25IZWxwZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFBvc2l0aW9uSGVscGVyIHtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHZlcnRpY2FsIGFsaWdubWVudCBwb3NpdGlvblxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7YW55fSBlbERpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IHBvcG92ZXJEaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBhbGlnbm1lbnRcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgY2FsY3VsYXRlVmVydGljYWxBbGlnbm1lbnQoZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0ID0gdmVydGljYWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuXG4gICAgaWYgKHJlc3VsdCArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgcmVzdWx0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHZlcnRpY2FsIGNhcmV0IHBvc2l0aW9uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHthbnl9IGVsRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gcG9wb3ZlckRpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IGNhcmV0RGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gYWxpZ25tZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIGNhbGN1bGF0ZVZlcnRpY2FsQ2FyZXQoZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSAndG9wJykge1xuICAgICAgcmVzdWx0ID0gZWxEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldERpbWVuc2lvbnMuaGVpZ2h0IC8gMiArIGNhcmV0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmIChhbGlnbm1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLSBlbERpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIGNhcmV0RGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldERpbWVuc2lvbnMuaGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3BvdmVyUG9zaXRpb24gPSB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgcmVzdWx0ICs9IChwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGhvcnogYWxpZ25tZW50IHBvc2l0aW9uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHthbnl9IGVsRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gcG9wb3ZlckRpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IGFsaWdubWVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVIb3Jpem9udGFsQWxpZ25tZW50KGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdCA9IGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuXG4gICAgaWYgKHJlc3VsdCArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgIHJlc3VsdCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gcG9wb3ZlckRpbWVuc2lvbnMud2lkdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgaG9yeiBjYXJldCBwb3NpdGlvblxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7YW55fSBlbERpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IHBvcG92ZXJEaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBjYXJldERpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IGFsaWdubWVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVIb3Jpem9udGFsQ2FyZXQoZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSAnbGVmdCcpIHtcbiAgICAgIHJlc3VsdCA9IGVsRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyICsgY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgcmVzdWx0ID0gcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggLSBlbERpbWVuc2lvbnMud2lkdGggLyAyIC0gY2FyZXREaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmIChhbGlnbm1lbnQgPT09ICdjZW50ZXInKSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHBvcG92ZXJQb3NpdGlvbiA9IGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIGlmIChwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICByZXN1bHQgKz0gKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBlbGVtZW50J3MgcG9zaXRpb24gc2hvdWxkIGJlIGZsaXBwZWRcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge2FueX0gZWxEaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBwb3BvdmVyRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gcGxhY2VtZW50XG4gICAqIEBwYXJhbSB7YW55fSBhbGlnbm1lbnRcbiAgICogQHBhcmFtIHthbnl9IHNwYWNpbmdcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIHNob3VsZEZsaXAoZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgcGxhY2VtZW50LCBhbGlnbm1lbnQsIHNwYWNpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgZmxpcCA9IGZhbHNlO1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgY29uc3QgcG9wb3ZlclBvc2l0aW9uID0gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgICBpZiAocG9wb3ZlclBvc2l0aW9uICsgcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggKyBzcGFjaW5nID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgZmxpcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gJ2xlZnQnKSB7XG4gICAgICBjb25zdCBwb3BvdmVyUG9zaXRpb24gPSBob3Jpem9udGFsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICAgIGlmIChwb3BvdmVyUG9zaXRpb24gLSBzcGFjaW5nIDwgMCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSAndG9wJykge1xuICAgICAgaWYgKGVsRGltZW5zaW9ucy50b3AgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLSBzcGFjaW5nIDwgMCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgY29uc3QgcG9wb3ZlclBvc2l0aW9uID0gdmVydGljYWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCArIHNwYWNpbmcgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgZmxpcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsaXA7XG4gIH1cblxuICAvKipcbiAgICogUG9zaXRpb24gY2FyZXRcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge2FueX0gcGxhY2VtZW50XG4gICAqIEBwYXJhbSB7YW55fSBlbG1EaW1cbiAgICogQHBhcmFtIHthbnl9IGhvc3REaW1cbiAgICogQHBhcmFtIHthbnl9IGNhcmV0RGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gYWxpZ25tZW50XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBwb3NpdGlvbkNhcmV0KHBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk6IGFueSB7XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMucmlnaHQpIHtcbiAgICAgIGxlZnQgPSAtNztcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQ2FyZXQoXG4gICAgICAgIGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5sZWZ0KSB7XG4gICAgICBsZWZ0ID0gZWxtRGltLndpZHRoO1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxDYXJldChcbiAgICAgICAgaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLnRvcCkge1xuICAgICAgdG9wID0gZWxtRGltLmhlaWdodDtcbiAgICAgIGxlZnQgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVIb3Jpem9udGFsQ2FyZXQoXG4gICAgICAgIGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5ib3R0b20pIHtcbiAgICAgIHRvcCA9IC03O1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxDYXJldChcbiAgICAgICAgaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdG9wLCBsZWZ0IH07XG4gIH1cblxuICAvKipcbiAgICogUG9zaXRpb24gY29udGVudFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7YW55fSBwbGFjZW1lbnRcbiAgICogQHBhcmFtIHthbnl9IGVsbURpbVxuICAgKiBAcGFyYW0ge2FueX0gaG9zdERpbVxuICAgKiBAcGFyYW0ge2FueX0gc3BhY2luZ1xuICAgKiBAcGFyYW0ge2FueX0gYWxpZ25tZW50XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBwb3NpdGlvbkNvbnRlbnQocGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHNwYWNpbmcsIGFsaWdubWVudCk6IGFueSB7XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMucmlnaHQpIHtcbiAgICAgIGxlZnQgPSBob3N0RGltLmxlZnQgKyBob3N0RGltLndpZHRoICsgc3BhY2luZztcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQWxpZ25tZW50KFxuICAgICAgICBob3N0RGltLCBlbG1EaW0sIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmxlZnQpIHtcbiAgICAgIGxlZnQgPSBob3N0RGltLmxlZnQgLSBlbG1EaW0ud2lkdGggLSBzcGFjaW5nO1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxBbGlnbm1lbnQoXG4gICAgICAgIGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMudG9wKSB7XG4gICAgICB0b3AgPSBob3N0RGltLnRvcCAtIGVsbURpbS5oZWlnaHQgLSBzcGFjaW5nO1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxBbGlnbm1lbnQoXG4gICAgICAgIGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuYm90dG9tKSB7XG4gICAgICB0b3AgPSBob3N0RGltLnRvcCArIGhvc3REaW0uaGVpZ2h0ICsgc3BhY2luZztcbiAgICAgIGxlZnQgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVIb3Jpem9udGFsQWxpZ25tZW50KFxuICAgICAgICBob3N0RGltLCBlbG1EaW0sIGFsaWdubWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdG9wLCBsZWZ0IH07XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHBsYWNlbWVudCBiYXNlZCBvbiBmbGlwXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHthbnl9IHBsYWNlbWVudFxuICAgKiBAcGFyYW0ge2FueX0gZWxtRGltXG4gICAqIEBwYXJhbSB7YW55fSBob3N0RGltXG4gICAqIEBwYXJhbSB7YW55fSBzcGFjaW5nXG4gICAqIEBwYXJhbSB7YW55fSBhbGlnbm1lbnRcbiAgICogQHJldHVybnMgeyp9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIGRldGVybWluZVBsYWNlbWVudChwbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgc3BhY2luZywgYWxpZ25tZW50KTogYW55IHtcbiAgICBjb25zdCBzaG91bGRGbGlwID0gUG9zaXRpb25IZWxwZXIuc2hvdWxkRmxpcChcbiAgICAgIGhvc3REaW0sXG4gICAgICBlbG1EaW0sXG4gICAgICBwbGFjZW1lbnQsXG4gICAgICBhbGlnbm1lbnQsXG4gICAgICBzcGFjaW5nKTtcblxuICAgIGlmIChzaG91bGRGbGlwKSB7XG4gICAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5yaWdodCkge1xuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5sZWZ0KSB7XG4gICAgICAgIHJldHVybiBQbGFjZW1lbnRUeXBlcy5yaWdodDtcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy50b3ApIHtcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLmJvdHRvbTtcbiAgICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5ib3R0b20pIHtcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLnRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG5cbn1cbiJdfQ==