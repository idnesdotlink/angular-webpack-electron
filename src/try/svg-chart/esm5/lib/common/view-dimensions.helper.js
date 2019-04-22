export function calculateViewDimensions(_a) {
    var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.legendPosition, legendPosition = _k === void 0 ? 'right' : _k, _l = _a.columns, columns = _l === void 0 ? 12 : _l;
    var xOffset = margins[3];
    var chartWidth = width;
    var chartHeight = height - margins[0] - margins[2];
    var offset;
    if (showLegend && legendPosition === 'right') {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = chartWidth * columns / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        // tslint:disable-next-line: no-bitwise
        width: ~~chartWidth,
        // tslint:disable-next-line: no-bitwise
        height: ~~chartHeight,
        // tslint:disable-next-line: no-bitwise
        xOffset: ~~xOffset
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaW1lbnNpb25zLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQUl2QztRQUhDLGdCQUFLLEVBQUUsa0JBQU0sRUFBRSxvQkFBTyxFQUFFLGlCQUFpQixFQUFqQixzQ0FBaUIsRUFBRSxpQkFBaUIsRUFBakIsc0NBQWlCLEVBQUUsbUJBQWUsRUFBZixvQ0FBZSxFQUM3RSxrQkFBYyxFQUFkLG1DQUFjLEVBQUUsa0JBQWtCLEVBQWxCLHVDQUFrQixFQUFFLGtCQUFrQixFQUFsQix1Q0FBa0IsRUFBRSxrQkFBa0IsRUFBbEIsdUNBQWtCLEVBQzFFLGtCQUFzQixFQUF0QiwyQ0FBc0IsRUFBRSxzQkFBd0IsRUFBeEIsNkNBQXdCLEVBQUUsZUFBWSxFQUFaLGlDQUFZO0lBRTlELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsSUFBSSxNQUFjLENBQUM7SUFFbkIsSUFBSSxVQUFVLElBQUksY0FBYyxLQUFLLE9BQU8sRUFBRTtRQUM1QyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ2Q7S0FDRjtJQUVELFVBQVUsR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUV2QyxVQUFVLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEQsSUFBSSxTQUFTLEVBQUU7UUFDYixXQUFXLElBQUksQ0FBQyxDQUFDO1FBQ2pCLFdBQVcsSUFBSSxXQUFXLENBQUM7UUFFM0IsSUFBSSxVQUFVLEVBQUU7WUFDZCwyREFBMkQ7WUFDM0QsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEIsV0FBVyxJQUFJLE1BQU0sQ0FBQztTQUN2QjtLQUNGO0lBRUQsSUFBSSxTQUFTLEVBQUU7UUFDYixVQUFVLElBQUksQ0FBQyxDQUFDO1FBQ2hCLFVBQVUsSUFBSSxVQUFVLENBQUM7UUFDekIsT0FBTyxJQUFJLFVBQVUsQ0FBQztRQUN0QixPQUFPLElBQUksRUFBRSxDQUFDO1FBRWQsSUFBSSxVQUFVLEVBQUU7WUFDZCwyREFBMkQ7WUFDM0QsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEIsVUFBVSxJQUFJLE1BQU0sQ0FBQztZQUNyQixPQUFPLElBQUksTUFBTSxDQUFDO1NBQ25CO0tBQ0Y7SUFFRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXZDLE9BQU87UUFDTCx1Q0FBdUM7UUFDdkMsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVO1FBQ25CLHVDQUF1QztRQUN2QyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFdBQVc7UUFDckIsdUNBQXVDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztLQUNuQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgVmlld0RpbWVuc2lvbnMge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgeE9mZnNldDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5zLCBzaG93WEF4aXMgPSBmYWxzZSwgc2hvd1lBeGlzID0gZmFsc2UsIHhBeGlzSGVpZ2h0ID0gMCxcbiAgeUF4aXNXaWR0aCA9IDAsIHNob3dYTGFiZWwgPSBmYWxzZSwgc2hvd1lMYWJlbCA9IGZhbHNlLCBzaG93TGVnZW5kID0gZmFsc2UsXG4gIGxlZ2VuZFR5cGUgPSAnb3JkaW5hbCcsIGxlZ2VuZFBvc2l0aW9uID0gJ3JpZ2h0JywgY29sdW1ucyA9IDEyXG59KTogVmlld0RpbWVuc2lvbnMge1xuICBsZXQgeE9mZnNldCA9IG1hcmdpbnNbM107XG4gIGxldCBjaGFydFdpZHRoID0gd2lkdGg7XG4gIGxldCBjaGFydEhlaWdodCA9IGhlaWdodCAtIG1hcmdpbnNbMF0gLSBtYXJnaW5zWzJdO1xuICBsZXQgb2Zmc2V0OiBudW1iZXI7XG5cbiAgaWYgKHNob3dMZWdlbmQgJiYgbGVnZW5kUG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICBpZiAobGVnZW5kVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBjb2x1bW5zIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbnMgLT0gMTtcbiAgICB9XG4gIH1cblxuICBjaGFydFdpZHRoID0gY2hhcnRXaWR0aCAqIGNvbHVtbnMgLyAxMjtcblxuICBjaGFydFdpZHRoID0gY2hhcnRXaWR0aCAtIG1hcmdpbnNbMV0gLSBtYXJnaW5zWzNdO1xuXG4gIGlmIChzaG93WEF4aXMpIHtcbiAgICBjaGFydEhlaWdodCAtPSA1O1xuICAgIGNoYXJ0SGVpZ2h0IC09IHhBeGlzSGVpZ2h0O1xuXG4gICAgaWYgKHNob3dYTGFiZWwpIHtcbiAgICAgIC8vIHRleHQgaGVpZ2h0ICsgc3BhY2luZyBiZXR3ZWVuIGF4aXMgbGFiZWwgYW5kIHRpY2sgbGFiZWxzXG4gICAgICBvZmZzZXQgPSAyNSArIDU7XG4gICAgICBjaGFydEhlaWdodCAtPSBvZmZzZXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNob3dZQXhpcykge1xuICAgIGNoYXJ0V2lkdGggLT0gNTtcbiAgICBjaGFydFdpZHRoIC09IHlBeGlzV2lkdGg7XG4gICAgeE9mZnNldCArPSB5QXhpc1dpZHRoO1xuICAgIHhPZmZzZXQgKz0gMTA7XG5cbiAgICBpZiAoc2hvd1lMYWJlbCkge1xuICAgICAgLy8gdGV4dCBoZWlnaHQgKyBzcGFjaW5nIGJldHdlZW4gYXhpcyBsYWJlbCBhbmQgdGljayBsYWJlbHNcbiAgICAgIG9mZnNldCA9IDI1ICsgNTtcbiAgICAgIGNoYXJ0V2lkdGggLT0gb2Zmc2V0O1xuICAgICAgeE9mZnNldCArPSBvZmZzZXQ7XG4gICAgfVxuICB9XG5cbiAgY2hhcnRXaWR0aCA9IE1hdGgubWF4KDAsIGNoYXJ0V2lkdGgpO1xuICBjaGFydEhlaWdodCA9IE1hdGgubWF4KDAsIGNoYXJ0SGVpZ2h0KTtcblxuICByZXR1cm4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxuICAgIHdpZHRoOiB+fmNoYXJ0V2lkdGgsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgaGVpZ2h0OiB+fmNoYXJ0SGVpZ2h0LFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxuICAgIHhPZmZzZXQ6IH5+eE9mZnNldFxuICB9O1xufVxuIl19