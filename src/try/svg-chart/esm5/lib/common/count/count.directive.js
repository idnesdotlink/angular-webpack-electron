import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { count, decimalChecker } from './count.helper';
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
var CountUpDirective = /** @class */ (function () {
    function CountUpDirective(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function () {
            if (this._countDecimals)
                return this._countDecimals;
            return decimalChecker(this.countTo);
        },
        set: function (val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function () {
            return this._countTo;
        },
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function () {
            return this._countFrom;
        },
        set: function (val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var valueFormatting = this.valueFormatting || (function (value) { return "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix; });
        var callback = function (_a) {
            var value = _a.value, progress = _a.progress, finished = _a.finished;
            _this.value = valueFormatting(value);
            _this.cd.markForCheck();
            if (!finished)
                _this.countChange.emit({ value: _this.value, progress: progress });
            if (finished)
                _this.countFinish.emit({ value: _this.value, progress: progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountUpDirective.prototype, "countDuration", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountUpDirective.prototype, "countPrefix", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountUpDirective.prototype, "countSuffix", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountUpDirective.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], CountUpDirective.prototype, "countDecimals", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], CountUpDirective.prototype, "countTo", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], CountUpDirective.prototype, "countFrom", null);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CountUpDirective.prototype, "countChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CountUpDirective.prototype, "countFinish", void 0);
    CountUpDirective = tslib_1.__decorate([
        Component({
            selector: '[ng-svg-charts-count-up]',
            template: "{{value}}"
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef])
    ], CountUpDirective);
    return CountUpDirective;
}());
export { CountUpDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NvdW50L2NvdW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBYSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RDs7Ozs7Ozs7O0dBU0c7QUFLSDtJQWtERSwwQkFBb0IsRUFBcUIsRUFBRSxPQUFtQjtRQUExQyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWpEaEMsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFpQ2hCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJM0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUtSLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBR3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBN0NELHNCQUFJLDJDQUFhO2FBSWpCO1lBQ0UsSUFBSSxJQUFJLENBQUMsY0FBYztnQkFBRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDcEQsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7YUFQRCxVQUFrQixHQUFXO1lBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBUUQsc0JBQUkscUNBQU87YUFLWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO2FBUEQsVUFBWSxHQUFHO1lBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSx1Q0FBUzthQUtiO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7YUFQRCxVQUFjLEdBQUc7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDOzs7T0FBQTtJQXdCRCxzQ0FBVyxHQUFYO1FBQ0Usb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxnQ0FBSyxHQUFMO1FBQUEsaUJBY0M7UUFiQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEMsSUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUcsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLEdBQUcsS0FBSSxDQUFDLFdBQWEsRUFBakUsQ0FBaUUsQ0FBQyxDQUFDO1FBRXZHLElBQU0sUUFBUSxHQUFHLFVBQUMsRUFBNkI7Z0JBQTNCLGdCQUFLLEVBQUUsc0JBQVEsRUFBRSxzQkFBUTtZQUMzQyxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRO2dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksUUFBUTtnQkFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUF2RVE7UUFBUixLQUFLLEVBQUU7OzJEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7eURBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOzt5REFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7OzZEQUFzQjtJQUc5QjtRQURDLEtBQUssRUFBRTs7O3lEQUdQO0lBUUQ7UUFEQyxLQUFLLEVBQUU7OzttREFJUDtJQU9EO1FBREMsS0FBSyxFQUFFOzs7cURBSVA7SUFNUztRQUFULE1BQU0sRUFBRTs7eURBQWtDO0lBQ2pDO1FBQVQsTUFBTSxFQUFFOzt5REFBa0M7SUFyQ2hDLGdCQUFnQjtRQUo1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSxXQUFXO1NBQ3RCLENBQUM7aURBbUR3QixpQkFBaUIsRUFBVyxVQUFVO09BbERuRCxnQkFBZ0IsQ0F5RTVCO0lBQUQsdUJBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXpFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY291bnQsIGRlY2ltYWxDaGVja2VyIH0gZnJvbSAnLi9jb3VudC5oZWxwZXInO1xuXG4vKipcbiAqIENvdW50IHVwIGNvbXBvbmVudFxuICpcbiAqIExvb3NlbHkgaW5zcGlyZWQgYnk6XG4gKiAgLSBodHRwczovL2dpdGh1Yi5jb20vaXp1cGV0L2FuZ3VsYXIyLWNvdW50b1xuICogIC0gaHR0cHM6Ly9pbm9yZ2FuaWsuZ2l0aHViLmlvL2NvdW50VXAuanMvXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIENvdW50VXBEaXJlY3RpdmVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25nLXN2Zy1jaGFydHMtY291bnQtdXBdJyxcbiAgdGVtcGxhdGU6IGB7e3ZhbHVlfX1gXG59KVxuZXhwb3J0IGNsYXNzIENvdW50VXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb3VudER1cmF0aW9uID0gMTtcbiAgQElucHV0KCkgY291bnRQcmVmaXggPSAnJztcbiAgQElucHV0KCkgY291bnRTdWZmaXggPSAnJztcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvdW50RGVjaW1hbHModmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb3VudERlY2ltYWxzID0gdmFsO1xuICB9XG5cbiAgZ2V0IGNvdW50RGVjaW1hbHMoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fY291bnREZWNpbWFscykgcmV0dXJuIHRoaXMuX2NvdW50RGVjaW1hbHM7XG4gICAgcmV0dXJuIGRlY2ltYWxDaGVja2VyKHRoaXMuY291bnRUbyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY291bnRUbyh2YWwpIHtcbiAgICB0aGlzLl9jb3VudFRvID0gcGFyc2VGbG9hdCh2YWwpO1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIGdldCBjb3VudFRvKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvdW50VG87XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY291bnRGcm9tKHZhbCkge1xuICAgIHRoaXMuX2NvdW50RnJvbSA9IHBhcnNlRmxvYXQodmFsKTtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICBnZXQgY291bnRGcm9tKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvdW50RnJvbTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBjb3VudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvdW50RmluaXNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG5hdGl2ZUVsZW1lbnQ6IGFueTtcblxuICB2YWx1ZTogYW55ID0gJyc7XG4gIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBhbmltYXRpb25SZXE6IGFueTtcblxuICBwcml2YXRlIF9jb3VudERlY2ltYWxzID0gMDtcbiAgcHJpdmF0ZSBfY291bnRUbyA9IDA7XG4gIHByaXZhdGUgX2NvdW50RnJvbSA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XG5cbiAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPVxuICAgICAgdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKHZhbHVlID0+IGAke3RoaXMuY291bnRQcmVmaXh9JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfSR7dGhpcy5jb3VudFN1ZmZpeH1gKTtcblxuICAgIGNvbnN0IGNhbGxiYWNrID0gKHsgdmFsdWUsIHByb2dyZXNzLCBmaW5pc2hlZCB9KSA9PiB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVGb3JtYXR0aW5nKHZhbHVlKTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICBpZiAoIWZpbmlzaGVkKSB0aGlzLmNvdW50Q2hhbmdlLmVtaXQoeyB2YWx1ZTogdGhpcy52YWx1ZSwgcHJvZ3Jlc3MgfSk7XG4gICAgICBpZiAoZmluaXNoZWQpIHRoaXMuY291bnRGaW5pc2guZW1pdCh7IHZhbHVlOiB0aGlzLnZhbHVlLCBwcm9ncmVzcyB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hbmltYXRpb25SZXEgPSBjb3VudCh0aGlzLmNvdW50RnJvbSwgdGhpcy5jb3VudFRvLCB0aGlzLmNvdW50RGVjaW1hbHMsIHRoaXMuY291bnREdXJhdGlvbiwgY2FsbGJhY2spO1xuICB9XG59XG4iXX0=