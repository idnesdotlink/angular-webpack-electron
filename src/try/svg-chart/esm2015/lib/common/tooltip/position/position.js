import { PlacementTypes } from './placement.type';
const caretOffset = 7;
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
export class PositionHelper {
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
    static calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    }
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
    static calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    }
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
    static calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    }
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
    static calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    }
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
    static shouldFlip(elDimensions, popoverDimensions, placement, alignment, spacing) {
        let flip = false;
        if (placement === 'right') {
            const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
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
            const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    }
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
    static positionCaret(placement, elmDim, hostDim, caretDimensions, alignment) {
        let top = 0;
        let left = 0;
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
        return { top, left };
    }
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
    static positionContent(placement, elmDim, hostDim, spacing, alignment) {
        let top = 0;
        let left = 0;
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
        return { top, left };
    }
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
    static determinePlacement(placement, elmDim, hostDim, spacing, alignment) {
        const shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, alignment, spacing);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9wb3NpdGlvbi9wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLFNBQVMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFNBQVM7SUFDbEUsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1FBQ3ZCLE9BQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7S0FDdkM7SUFFRCxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDMUIsT0FBTyxZQUFZLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztLQUN4RjtJQUVELElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUMxQixPQUFPLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNsRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTO0lBQ3BFLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtRQUN4QixPQUFPLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO1FBQ3pCLE9BQU8sWUFBWSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDdkY7SUFFRCxJQUFJLFNBQVMsS0FBSyxRQUFRLEVB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LENBQUMsTUFBTSxFQUFFO2dCQUM5QyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUM7YUFDM0I7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi9wbGFjZW1lbnQudHlwZSc7XG5cbmNvbnN0IGNhcmV0T2Zmc2V0ID0gNztcblxuZnVuY3Rpb24gdmVydGljYWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpIHtcbiAgaWYgKGFsaWdubWVudCA9PT0gJ3RvcCcpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLnRvcCAtIGNhcmV0T2Zmc2V0O1xuICB9XG5cbiAgaWYgKGFsaWdubWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLnRvcCArIGVsRGltZW5zaW9ucy5oZWlnaHQgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgKyBjYXJldE9mZnNldDtcbiAgfVxuXG4gIGlmIChhbGlnbm1lbnQgPT09ICdjZW50ZXInKSB7XG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy50b3AgKyBlbERpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAvIDI7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBob3Jpem9udGFsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KSB7XG4gIGlmIChhbGlnbm1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMubGVmdCAtIGNhcmV0T2Zmc2V0O1xuICB9XG5cbiAgaWYgKGFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMubGVmdCArIGVsRGltZW5zaW9ucy53aWR0aCAtIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoICsgY2FyZXRPZmZzZXQ7XG4gIH1cblxuICBpZiAoYWxpZ25tZW50ID09PSAnY2VudGVyJykge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMubGVmdCArIGVsRGltZW5zaW9ucy53aWR0aCAvIDIgLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAvIDI7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFBvc2l0aW9uIGhlbHBlciBmb3IgdGhlIHBvcG92ZXIgZGlyZWN0aXZlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQb3NpdGlvbkhlbHBlclxuICovXG5leHBvcnQgY2xhc3MgUG9zaXRpb25IZWxwZXIge1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdmVydGljYWwgYWxpZ25tZW50IHBvc2l0aW9uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHthbnl9IGVsRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gcG9wb3ZlckRpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IGFsaWdubWVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVWZXJ0aWNhbEFsaWdubWVudChlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQgPSB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG5cbiAgICBpZiAocmVzdWx0ICsgcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICByZXN1bHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdmVydGljYWwgY2FyZXQgcG9zaXRpb25cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge2FueX0gZWxEaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBwb3BvdmVyRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gY2FyZXREaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBhbGlnbm1lbnRcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgY2FsY3VsYXRlVmVydGljYWxDYXJldChlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChhbGlnbm1lbnQgPT09ICd0b3AnKSB7XG4gICAgICByZXN1bHQgPSBlbERpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIGNhcmV0RGltZW5zaW9ucy5oZWlnaHQgLyAyICsgY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAtIGVsRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXREaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSAnY2VudGVyJykge1xuICAgICAgcmVzdWx0ID0gcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0IC8gMiAtIGNhcmV0RGltZW5zaW9ucy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHBvcG92ZXJQb3NpdGlvbiA9IHZlcnRpY2FsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICBpZiAocG9wb3ZlclBvc2l0aW9uICsgcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICByZXN1bHQgKz0gKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgaG9yeiBhbGlnbm1lbnQgcG9zaXRpb25cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge2FueX0gZWxEaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBwb3BvdmVyRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gYWxpZ25tZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIGNhbGN1bGF0ZUhvcml6b250YWxBbGlnbm1lbnQoZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0ID0gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG5cbiAgICBpZiAocmVzdWx0ICsgcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgcmVzdWx0ID0gd2luZG93LmlubmVyV2lkdGggLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBob3J6IGNhcmV0IHBvc2l0aW9uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHthbnl9IGVsRGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gcG9wb3ZlckRpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IGNhcmV0RGltZW5zaW9uc1xuICAgKiBAcGFyYW0ge2FueX0gYWxpZ25tZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIGNhbGN1bGF0ZUhvcml6b250YWxDYXJldChlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChhbGlnbm1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgcmVzdWx0ID0gZWxEaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0RGltZW5zaW9ucy53aWR0aCAvIDIgKyBjYXJldE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSAncmlnaHQnKSB7XG4gICAgICByZXN1bHQgPSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAtIGVsRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyIC0gY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0RGltZW5zaW9ucy53aWR0aCAvIDI7XG4gICAgfVxuXG4gICAgY29uc3QgcG9wb3ZlclBvc2l0aW9uID0gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgIHJlc3VsdCArPSAocG9wb3ZlclBvc2l0aW9uICsgcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGVsZW1lbnQncyBwb3NpdGlvbiBzaG91bGQgYmUgZmxpcHBlZFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7YW55fSBlbERpbWVuc2lvbnNcbiAgICogQHBhcmFtIHthbnl9IHBvcG92ZXJEaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBwbGFjZW1lbnRcbiAgICogQHBhcmFtIHthbnl9IGFsaWdubWVudFxuICAgKiBAcGFyYW0ge2FueX0gc3BhY2luZ1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgc2hvdWxkRmxpcChlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBwbGFjZW1lbnQsIGFsaWdubWVudCwgc3BhY2luZyk6IGJvb2xlYW4ge1xuICAgIGxldCBmbGlwID0gZmFsc2U7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSAncmlnaHQnKSB7XG4gICAgICBjb25zdCBwb3BvdmVyUG9zaXRpb24gPSBob3Jpem9udGFsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICAgIGlmIChwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCArIHNwYWNpbmcgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSAnbGVmdCcpIHtcbiAgICAgIGNvbnN0IHBvcG92ZXJQb3NpdGlvbiA9IGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgICAgaWYgKHBvcG92ZXJQb3NpdGlvbiAtIHNwYWNpbmcgPCAwKSB7XG4gICAgICAgIGZsaXAgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgICBpZiAoZWxEaW1lbnNpb25zLnRvcCAtIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAtIHNwYWNpbmcgPCAwKSB7XG4gICAgICAgIGZsaXAgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICBjb25zdCBwb3BvdmVyUG9zaXRpb24gPSB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgICBpZiAocG9wb3ZlclBvc2l0aW9uICsgcG9wb3ZlckRpbWVuc2lvbnMuaGVpZ2h0ICsgc3BhY2luZyA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmxpcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBjYXJldFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7YW55fSBwbGFjZW1lbnRcbiAgICogQHBhcmFtIHthbnl9IGVsbURpbVxuICAgKiBAcGFyYW0ge2FueX0gaG9zdERpbVxuICAgKiBAcGFyYW0ge2FueX0gY2FyZXREaW1lbnNpb25zXG4gICAqIEBwYXJhbSB7YW55fSBhbGlnbm1lbnRcbiAgICogQHJldHVybnMgeyp9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIHBvc2l0aW9uQ2FyZXQocGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTogYW55IHtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5yaWdodCkge1xuICAgICAgbGVmdCA9IC03O1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxDYXJldChcbiAgICAgICAgaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmxlZnQpIHtcbiAgICAgIGxlZnQgPSBlbG1EaW0ud2lkdGg7XG4gICAgICB0b3AgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVWZXJ0aWNhbENhcmV0KFxuICAgICAgICBob3N0RGltLCBlbG1EaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMudG9wKSB7XG4gICAgICB0b3AgPSBlbG1EaW0uaGVpZ2h0O1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxDYXJldChcbiAgICAgICAgaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmJvdHRvbSkge1xuICAgICAgdG9wID0gLTc7XG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbENhcmV0KFxuICAgICAgICBob3N0RGltLCBlbG1EaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBjb250ZW50XG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHthbnl9IHBsYWNlbWVudFxuICAgKiBAcGFyYW0ge2FueX0gZWxtRGltXG4gICAqIEBwYXJhbSB7YW55fSBob3N0RGltXG4gICAqIEBwYXJhbSB7YW55fSBzcGFjaW5nXG4gICAqIEBwYXJhbSB7YW55fSBhbGlnbm1lbnRcbiAgICogQHJldHVybnMgeyp9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIHBvc2l0aW9uQ29udGVudChwbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgc3BhY2luZywgYWxpZ25tZW50KTogYW55IHtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5yaWdodCkge1xuICAgICAgbGVmdCA9IGhvc3REaW0ubGVmdCArIGhvc3REaW0ud2lkdGggKyBzcGFjaW5nO1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxBbGlnbm1lbnQoXG4gICAgICAgIGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMubGVmdCkge1xuICAgICAgbGVmdCA9IGhvc3REaW0ubGVmdCAtIGVsbURpbS53aWR0aCAtIHNwYWNpbmc7XG4gICAgICB0b3AgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVWZXJ0aWNhbEFsaWdubWVudChcbiAgICAgICAgaG9zdERpbSwgZWxtRGltLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy50b3ApIHtcbiAgICAgIHRvcCA9IGhvc3REaW0udG9wIC0gZWxtRGltLmhlaWdodCAtIHNwYWNpbmc7XG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbEFsaWdubWVudChcbiAgICAgICAgaG9zdERpbSwgZWxtRGltLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5ib3R0b20pIHtcbiAgICAgIHRvcCA9IGhvc3REaW0udG9wICsgaG9zdERpbS5oZWlnaHQgKyBzcGFjaW5nO1xuICAgICAgbGVmdCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZUhvcml6b250YWxBbGlnbm1lbnQoXG4gICAgICAgIGhvc3REaW0sIGVsbURpbSwgYWxpZ25tZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyB0b3AsIGxlZnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgcGxhY2VtZW50IGJhc2VkIG9uIGZsaXBcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge2FueX0gcGxhY2VtZW50XG4gICAqIEBwYXJhbSB7YW55fSBlbG1EaW1cbiAgICogQHBhcmFtIHthbnl9IGhvc3REaW1cbiAgICogQHBhcmFtIHthbnl9IHNwYWNpbmdcbiAgICogQHBhcmFtIHthbnl9IGFsaWdubWVudFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgZGV0ZXJtaW5lUGxhY2VtZW50KHBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCBzcGFjaW5nLCBhbGlnbm1lbnQpOiBhbnkge1xuICAgIGNvbnN0IHNob3VsZEZsaXAgPSBQb3NpdGlvbkhlbHBlci5zaG91bGRGbGlwKFxuICAgICAgaG9zdERpbSxcbiAgICAgIGVsbURpbSxcbiAgICAgIHBsYWNlbWVudCxcbiAgICAgIGFsaWdubWVudCxcbiAgICAgIHNwYWNpbmcpO1xuXG4gICAgaWYgKHNob3VsZEZsaXApIHtcbiAgICAgIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLnJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBQbGFjZW1lbnRUeXBlcy5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmxlZnQpIHtcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLnJpZ2h0O1xuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLnRvcCkge1xuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMuYm90dG9tO1xuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLmJvdHRvbSkge1xuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMudG9wO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gIH1cblxufVxuIl19