export function calculateViewDimensions({ width, height, margins, showXAxis = false, showYAxis = false, xAxisHeight = 0, yAxisWidth = 0, showXLabel = false, showYLabel = false, showLegend = false, legendType = 'ordinal', legendPosition = 'right', columns = 12 }) {
    let xOffset = margins[3];
    let chartWidth = width;
    let chartHeight = height - margins[0] - margins[2];
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
            const offset = 25 + 5;
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
            const offset = 25 + 5;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaW1lbnNpb25zLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQUN0QyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSyxFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUUsV0FBVyxHQUFHLENBQUMsRUFDN0UsVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsS0FBSyxFQUFFLFVBQVUsR0FBRyxLQUFLLEVBQUUsVUFBVSxHQUFHLEtBQUssRUFDMUUsVUFBVSxHQUFHLFNBQVMsRUFBRSxjQUFjLEdBQUcsT0FBTyxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQy9EO0lBQ0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUN2QixJQUFJLFdBQVcsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRCxJQUFJLFVBQVUsSUFBSSxjQUFjLEtBQUssT0FBTyxFQUFFO1FBQzVDLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDZDtLQUNGO0lBRUQsVUFBVSxHQUFHLFVBQVUsR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRXZDLFVBQVUsR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRCxJQUFJLFNBQVMsRUFBRTtRQUNiLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDakIsV0FBVyxJQUFJLFdBQVcsQ0FBQztRQUUzQixJQUFJLFVBQVUsRUFBRTtZQUNkLDJEQUEyRDtZQUMzRCxNQUFNLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLFdBQVcsSUFBSSxNQUFNLENBQUM7U0FDdkI7S0FDRjtJQUVELElBQUksU0FBUyxFQUFFO1FBQ2IsVUFBVSxJQUFJLENBQUMsQ0FBQztRQUNoQixVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxVQUFVLENBQUM7UUFDdEIsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUVkLElBQUksVUFBVSxFQUFFO1lBQ2QsMkRBQTJEO1lBQzNELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEIsVUFBVSxJQUFJLE1BQU0sQ0FBQztZQUNyQixPQUFPLElBQUksTUFBTSxDQUFDO1NBQ25CO0tBQ0Y7SUFFRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXZDLE9BQU87UUFDTCx1Q0FBdUM7UUFDdkMsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVO1FBQ25CLHVDQUF1QztRQUN2QyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFdBQVc7UUFDckIsdUNBQXVDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztLQUNuQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgVmlld0RpbWVuc2lvbnMge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgeE9mZnNldDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICB3aWR0aCwgaGVpZ2h0LCBtYXJnaW5zLCBzaG93WEF4aXMgPSBmYWxzZSwgc2hvd1lBeGlzID0gZmFsc2UsIHhBeGlzSGVpZ2h0ID0gMCxcbiAgeUF4aXNXaWR0aCA9IDAsIHNob3dYTGFiZWwgPSBmYWxzZSwgc2hvd1lMYWJlbCA9IGZhbHNlLCBzaG93TGVnZW5kID0gZmFsc2UsXG4gIGxlZ2VuZFR5cGUgPSAnb3JkaW5hbCcsIGxlZ2VuZFBvc2l0aW9uID0gJ3JpZ2h0JywgY29sdW1ucyA9IDEyXG59KTogVmlld0RpbWVuc2lvbnMge1xuICBsZXQgeE9mZnNldCA9IG1hcmdpbnNbM107XG4gIGxldCBjaGFydFdpZHRoID0gd2lkdGg7XG4gIGxldCBjaGFydEhlaWdodCA9IGhlaWdodCAtIG1hcmdpbnNbMF0gLSBtYXJnaW5zWzJdO1xuXG4gIGlmIChzaG93TGVnZW5kICYmIGxlZ2VuZFBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgaWYgKGxlZ2VuZFR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgY29sdW1ucyAtPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW5zIC09IDE7XG4gICAgfVxuICB9XG5cbiAgY2hhcnRXaWR0aCA9IGNoYXJ0V2lkdGggKiBjb2x1bW5zIC8gMTI7XG5cbiAgY2hhcnRXaWR0aCA9IGNoYXJ0V2lkdGggLSBtYXJnaW5zWzFdIC0gbWFyZ2luc1szXTtcblxuICBpZiAoc2hvd1hBeGlzKSB7XG4gICAgY2hhcnRIZWlnaHQgLT0gNTtcbiAgICBjaGFydEhlaWdodCAtPSB4QXhpc0hlaWdodDtcblxuICAgIGlmIChzaG93WExhYmVsKSB7XG4gICAgICAvLyB0ZXh0IGhlaWdodCArIHNwYWNpbmcgYmV0d2VlbiBheGlzIGxhYmVsIGFuZCB0aWNrIGxhYmVsc1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gMjUgKyA1O1xuICAgICAgY2hhcnRIZWlnaHQgLT0gb2Zmc2V0O1xuICAgIH1cbiAgfVxuXG4gIGlmIChzaG93WUF4aXMpIHtcbiAgICBjaGFydFdpZHRoIC09IDU7XG4gICAgY2hhcnRXaWR0aCAtPSB5QXhpc1dpZHRoO1xuICAgIHhPZmZzZXQgKz0geUF4aXNXaWR0aDtcbiAgICB4T2Zmc2V0ICs9IDEwO1xuXG4gICAgaWYgKHNob3dZTGFiZWwpIHtcbiAgICAgIC8vIHRleHQgaGVpZ2h0ICsgc3BhY2luZyBiZXR3ZWVuIGF4aXMgbGFiZWwgYW5kIHRpY2sgbGFiZWxzXG4gICAgICBjb25zdCBvZmZzZXQgPSAyNSArIDU7XG4gICAgICBjaGFydFdpZHRoIC09IG9mZnNldDtcbiAgICAgIHhPZmZzZXQgKz0gb2Zmc2V0O1xuICAgIH1cbiAgfVxuXG4gIGNoYXJ0V2lkdGggPSBNYXRoLm1heCgwLCBjaGFydFdpZHRoKTtcbiAgY2hhcnRIZWlnaHQgPSBNYXRoLm1heCgwLCBjaGFydEhlaWdodCk7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWJpdHdpc2VcbiAgICB3aWR0aDogfn5jaGFydFdpZHRoLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxuICAgIGhlaWdodDogfn5jaGFydEhlaWdodCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWJpdHdpc2VcbiAgICB4T2Zmc2V0OiB+fnhPZmZzZXRcbiAgfTtcbn1cbiJdfQ==