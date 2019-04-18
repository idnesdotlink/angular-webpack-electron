import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var SumPipe = /** @class */ (function () {
    function SumPipe() {
    }
    SumPipe.prototype.transform = function (arr) {
        return Array.isArray(arr) ? arr.reduce(function (sum, curr) { return sum + curr; }, 0) : arr;
    };
    SumPipe = tslib_1.__decorate([
        Pipe({ name: 'sum' })
    ], SumPipe);
    return SumPipe;
}());
export { SumPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbIm1hdGgvc3VtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBT0EsQ0FBQztJQUhDLDJCQUFTLEdBQVQsVUFBVSxHQUFRO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJLElBQUssT0FBQSxHQUFHLEdBQUcsSUFBSSxFQUFWLENBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzdFLENBQUM7SUFOVSxPQUFPO1FBRG5CLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztPQUNULE9BQU8sQ0FPbkI7SUFBRCxjQUFDO0NBQUEsQUFQRCxJQU9DO1NBUFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnc3VtJyB9KVxuZXhwb3J0IGNsYXNzIFN1bVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG51bTogYW55W10pOiBudW1iZXI7XG4gIHRyYW5zZm9ybTxUPihudW06IGFueSk6IFQ7XG5cbiAgdHJhbnNmb3JtKGFycjogYW55KTogYW55IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyLnJlZHVjZSgoc3VtLCBjdXJyKSA9PiBzdW0gKyBjdXJyLCAwKSA6IGFycjtcbiAgfVxufVxuIl19