import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var IsGreaterThanPipe = /** @class */ (function () {
    function IsGreaterThanPipe() {
    }
    IsGreaterThanPipe.prototype.transform = function (input, other) {
        return input > other;
    };
    IsGreaterThanPipe = tslib_1.__decorate([
        Pipe({ name: 'isGreaterThan' })
    ], IsGreaterThanPipe);
    return IsGreaterThanPipe;
}());
export { IsGreaterThanPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZ3JlYXRlci10aGFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImJvb2xlYW4vaXMtZ3JlYXRlci10aGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBSUEsQ0FBQztJQUhDLHFDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsS0FBYTtRQUNwQyxPQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUhVLGlCQUFpQjtRQUQ3QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUM7T0FDbkIsaUJBQWlCLENBSTdCO0lBQUQsd0JBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2lzR3JlYXRlclRoYW4nIH0pXG5leHBvcnQgY2xhc3MgSXNHcmVhdGVyVGhhblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBudW1iZXIsIG90aGVyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5wdXQgPiBvdGhlcjtcbiAgfVxufVxuIl19