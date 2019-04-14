export function calculateViewDimensions(_a) {
    var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.legendPosition, legendPosition = _k === void 0 ? 'right' : _k, _l = _a.columns, columns = _l === void 0 ? 12 : _l;
    var xOffset = margins[3];
    var chartWidth = width;
    var chartHeight = height - margins[0] - margins[2];
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
            var offset = 25 + 5;
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
            var offset = 25 + 5;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaW1lbnNpb25zLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQUl2QztRQUhDLGdCQUFLLEVBQUUsa0JBQU0sRUFBRSxvQkFBTyxFQUFFLGlCQUFpQixFQUFqQixzQ0FBaUIsRUFBRSxpQkFBaUIsRUFBakIsc0NBQWlCLEVBQUUsbUJBQWUsRUFBZixvQ0FBZSxFQUM3RSxrQkFBYyxFQUFkLG1DQUFjLEVBQUUsa0JBQWtCLEVBQWxCLHVDQUFrQixFQUFFLGtCQUFrQixFQUFsQix1Q0FBa0IsRUFBRSxrQkFBa0IsRUFBbEIsdUNBQWtCLEVBQzFFLGtCQUFzQixFQUF0QiwyQ0FBc0IsRUFBRSxzQkFBd0IsRUFBeEIsNkNBQXdCLEVBQUUsZUFBWSxFQUFaLGlDQUFZO0lBRTlELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkQsSUFBSSxVQUFVLElBQUksY0FBYyxLQUFLLE9BQU8sRUFBRTtRQUM1QyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ2Q7S0FDRjtJQUVELFVBQVUsR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUV2QyxVQUFVLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEQsSUFBSSxTQUFTLEVBQUU7UUFDYixXQUFXLElBQUksQ0FBQyxDQUFDO1FBQ2pCLFdBQVcsSUFBSSxXQUFXLENBQUM7UUFFM0IsSUFBSSxVQUFVLEVBQUU7WUFDZCwyREFBMkQ7WUFDM0QsSUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QixXQUFXLElBQUksTUFBTSxDQUFDO1NBQ3ZCO0tBQ0Y7SUFFRCxJQUFJLFNBQVMsRUFBRTtRQUNiLFVBQVUsSUFBSSxDQUFDLENBQUM7UUFDaEIsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUN6QixPQUFPLElBQUksVUFBVSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFFZCxJQUFJLFVBQVUsRUFBRTtZQUNkLDJEQUEyRDtZQUMzRCxJQUFNLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLFVBQVUsSUFBSSxNQUFNLENBQUM7WUFDckIsT0FBTyxJQUFJLE1BQU0sQ0FBQztTQUNuQjtLQUNGO0lBRUQsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV2QyxPQUFPO1FBQ0wsdUNBQXVDO1FBQ3ZDLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVTtRQUNuQix1Q0FBdUM7UUFDdkMsTUFBTSxFQUFFLENBQUMsQ0FBQyxXQUFXO1FBQ3JCLHVDQUF1QztRQUN2QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87S0FDbkIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFZpZXdEaW1lbnNpb25zIHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHhPZmZzZXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgd2lkdGgsIGhlaWdodCwgbWFyZ2lucywgc2hvd1hBeGlzID0gZmFsc2UsIHNob3dZQXhpcyA9IGZhbHNlLCB4QXhpc0hlaWdodCA9IDAsXG4gIHlBeGlzV2lkdGggPSAwLCBzaG93WExhYmVsID0gZmFsc2UsIHNob3dZTGFiZWwgPSBmYWxzZSwgc2hvd0xlZ2VuZCA9IGZhbHNlLFxuICBsZWdlbmRUeXBlID0gJ29yZGluYWwnLCBsZWdlbmRQb3NpdGlvbiA9ICdyaWdodCcsIGNvbHVtbnMgPSAxMlxufSk6IFZpZXdEaW1lbnNpb25zIHtcbiAgbGV0IHhPZmZzZXQgPSBtYXJnaW5zWzNdO1xuICBsZXQgY2hhcnRXaWR0aCA9IHdpZHRoO1xuICBsZXQgY2hhcnRIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXTtcblxuICBpZiAoc2hvd0xlZ2VuZCAmJiBsZWdlbmRQb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgIGlmIChsZWdlbmRUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgIGNvbHVtbnMgLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1ucyAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIGNoYXJ0V2lkdGggPSBjaGFydFdpZHRoICogY29sdW1ucyAvIDEyO1xuXG4gIGNoYXJ0V2lkdGggPSBjaGFydFdpZHRoIC0gbWFyZ2luc1sxXSAtIG1hcmdpbnNbM107XG5cbiAgaWYgKHNob3dYQXhpcykge1xuICAgIGNoYXJ0SGVpZ2h0IC09IDU7XG4gICAgY2hhcnRIZWlnaHQgLT0geEF4aXNIZWlnaHQ7XG5cbiAgICBpZiAoc2hvd1hMYWJlbCkge1xuICAgICAgLy8gdGV4dCBoZWlnaHQgKyBzcGFjaW5nIGJldHdlZW4gYXhpcyBsYWJlbCBhbmQgdGljayBsYWJlbHNcbiAgICAgIGNvbnN0IG9mZnNldCA9IDI1ICsgNTtcbiAgICAgIGNoYXJ0SGVpZ2h0IC09IG9mZnNldDtcbiAgICB9XG4gIH1cblxuICBpZiAoc2hvd1lBeGlzKSB7XG4gICAgY2hhcnRXaWR0aCAtPSA1O1xuICAgIGNoYXJ0V2lkdGggLT0geUF4aXNXaWR0aDtcbiAgICB4T2Zmc2V0ICs9IHlBeGlzV2lkdGg7XG4gICAgeE9mZnNldCArPSAxMDtcblxuICAgIGlmIChzaG93WUxhYmVsKSB7XG4gICAgICAvLyB0ZXh0IGhlaWdodCArIHNwYWNpbmcgYmV0d2VlbiBheGlzIGxhYmVsIGFuZCB0aWNrIGxhYmVsc1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gMjUgKyA1O1xuICAgICAgY2hhcnRXaWR0aCAtPSBvZmZzZXQ7XG4gICAgICB4T2Zmc2V0ICs9IG9mZnNldDtcbiAgICB9XG4gIH1cblxuICBjaGFydFdpZHRoID0gTWF0aC5tYXgoMCwgY2hhcnRXaWR0aCk7XG4gIGNoYXJ0SGVpZ2h0ID0gTWF0aC5tYXgoMCwgY2hhcnRIZWlnaHQpO1xuXG4gIHJldHVybiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgd2lkdGg6IH5+Y2hhcnRXaWR0aCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWJpdHdpc2VcbiAgICBoZWlnaHQ6IH5+Y2hhcnRIZWlnaHQsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgeE9mZnNldDogfn54T2Zmc2V0XG4gIH07XG59XG4iXX0=