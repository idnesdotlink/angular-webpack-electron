import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var IsLessThanPipe = /** @class */ (function () {
    function IsLessThanPipe() {
    }
    IsLessThanPipe.prototype.transform = function (input, other) {
        return input < other;
    };
    IsLessThanPipe = tslib_1.__decorate([
        Pipe({ name: 'isLessThan' })
    ], IsLessThanPipe);
    return IsLessThanPipe;
}());
export { IsLessThanPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbGVzcy10aGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImJvb2xlYW4vaXMtbGVzcy10aGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBSUEsQ0FBQztJQUhDLGtDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsS0FBYTtRQUNwQyxPQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUhVLGNBQWM7UUFEMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDO09BQ2hCLGNBQWMsQ0FJMUI7SUFBRCxxQkFBQztDQUFBLEFBSkQsSUFJQztTQUpZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2lzTGVzc1RoYW4nIH0pXG5leHBvcnQgY2xhc3MgSXNMZXNzVGhhblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBudW1iZXIsIG90aGVyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5wdXQgPCBvdGhlcjtcbiAgfVxufVxuIl19