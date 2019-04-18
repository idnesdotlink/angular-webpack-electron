import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var TailPipe = /** @class */ (function () {
    function TailPipe() {
    }
    TailPipe.prototype.transform = function (input, num) {
        if (num === void 0) { num = 0; }
        return Array.isArray(input) ? input.slice(num) : input;
    };
    TailPipe = tslib_1.__decorate([
        Pipe({ name: 'tail' })
    ], TailPipe);
    return TailPipe;
}());
export { TailPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS90YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBT0EsQ0FBQztJQUhDLDRCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsR0FBZTtRQUFmLG9CQUFBLEVBQUEsT0FBZTtRQUNuQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN6RCxDQUFDO0lBTlUsUUFBUTtRQURwQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDVixRQUFRLENBT3BCO0lBQUQsZUFBQztDQUFBLEFBUEQsSUFPQztTQVBZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ3RhaWwnIH0pXG5leHBvcnQgY2xhc3MgVGFpbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSwgbnVtPzogbnVtYmVyKTogYW55W107XG4gIHRyYW5zZm9ybTxUPihpbnB1dDogVCwgbnVtPzogbnVtYmVyKTogVDtcblxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgbnVtOiBudW1iZXIgPSAwKTogYW55IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dC5zbGljZShudW0pIDogaW5wdXQ7XG4gIH1cbn1cbiJdfQ==