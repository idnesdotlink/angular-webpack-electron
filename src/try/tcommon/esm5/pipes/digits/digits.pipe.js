import * as tslib_1 from "tslib";
import { Pipe, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';
var TdDigitsPipe = /** @class */ (function () {
    function TdDigitsPipe(_locale) {
        if (_locale === void 0) { _locale = 'en'; }
        this._locale = _locale;
        this._decimalPipe = new DecimalPipe(this._locale);
    }
    /* `digits` needs to be type `digits: any` or TypeScript complains */
    TdDigitsPipe.prototype.transform = function (digits, precision) {
        if (precision === void 0) { precision = 1; }
        if (digits === 0) {
            return '0';
        }
        else if (isNaN(parseInt(digits, 10))) {
            /* If not a valid number, return the value */
            return digits;
        }
        else if (digits < 1) {
            return this._decimalPipe.transform(digits.toFixed(precision));
        }
        var k = 1000;
        var sizes = ['', 'K', 'M', 'B', 'T', 'Q'];
        var i = Math.floor(Math.log(digits) / Math.log(k));
        var size = sizes[i];
        return this._decimalPipe.transform(parseFloat((digits / Math.pow(k, i)).toFixed(precision))) + (size ? ' ' + size : '');
    };
    TdDigitsPipe = tslib_1.__decorate([
        Pipe({
            name: 'digits',
        }),
        tslib_1.__param(0, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [String])
    ], TdDigitsPipe);
    return TdDigitsPipe;
}());
export { TdDigitsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlnaXRzLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3Rjb21tb24vIiwic291cmNlcyI6WyJwaXBlcy9kaWdpdHMvZGlnaXRzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBTTlDO0lBSUUsc0JBQXVDLE9BQXNCO1FBQXRCLHdCQUFBLEVBQUEsY0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLGdDQUFTLEdBQVQsVUFBVSxNQUFXLEVBQUUsU0FBcUI7UUFBckIsMEJBQUEsRUFBQSxhQUFxQjtRQUMxQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxHQUFHLENBQUM7U0FDWjthQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN0Qyw2Q0FBNkM7WUFDN0MsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQztRQUNyQixJQUFJLEtBQUssR0FBYSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksR0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxSCxDQUFDO0lBdkJVLFlBQVk7UUFKeEIsSUFBSSxDQUFDO1lBQ0osSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO1FBTWEsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBOztPQUpuQixZQUFZLENBd0J4QjtJQUFELG1CQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0F4QlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIEluamVjdCwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RpZ2l0cycsXG59KVxuXG5leHBvcnQgY2xhc3MgVGREaWdpdHNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHJpdmF0ZSBfZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIF9sb2NhbGU6IHN0cmluZyA9ICdlbicpIHtcbiAgICB0aGlzLl9kZWNpbWFsUGlwZSA9IG5ldyBEZWNpbWFsUGlwZSh0aGlzLl9sb2NhbGUpO1xuICB9XG5cbiAgLyogYGRpZ2l0c2AgbmVlZHMgdG8gYmUgdHlwZSBgZGlnaXRzOiBhbnlgIG9yIFR5cGVTY3JpcHQgY29tcGxhaW5zICovXG4gIHRyYW5zZm9ybShkaWdpdHM6IGFueSwgcHJlY2lzaW9uOiBudW1iZXIgPSAxKTogc3RyaW5nIHtcbiAgICBpZiAoZGlnaXRzID09PSAwKSB7XG4gICAgICByZXR1cm4gJzAnO1xuICAgIH0gZWxzZSBpZiAoaXNOYU4ocGFyc2VJbnQoZGlnaXRzLCAxMCkpKSB7XG4gICAgICAvKiBJZiBub3QgYSB2YWxpZCBudW1iZXIsIHJldHVybiB0aGUgdmFsdWUgKi9cbiAgICAgIHJldHVybiBkaWdpdHM7XG4gICAgfSBlbHNlIGlmIChkaWdpdHMgPCAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVjaW1hbFBpcGUudHJhbnNmb3JtKGRpZ2l0cy50b0ZpeGVkKHByZWNpc2lvbikpO1xuICAgIH1cbiAgICBsZXQgazogbnVtYmVyID0gMTAwMDtcbiAgICBsZXQgc2l6ZXM6IHN0cmluZ1tdID0gWycnLCAnSycsICdNJywgJ0InLCAnVCcsICdRJ107XG4gICAgbGV0IGk6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5sb2coZGlnaXRzKSAvIE1hdGgubG9nKGspKTtcbiAgICBsZXQgc2l6ZTogc3RyaW5nID0gc2l6ZXNbaV07XG4gICAgcmV0dXJuIHRoaXMuX2RlY2ltYWxQaXBlLnRyYW5zZm9ybShwYXJzZUZsb2F0KChkaWdpdHMgLyBNYXRoLnBvdyhrLCBpKSkudG9GaXhlZChwcmVjaXNpb24pKSkgKyAoc2l6ZSA/ICcgJyArIHNpemUgOiAnJyk7XG4gIH1cbn1cbiJdfQ==