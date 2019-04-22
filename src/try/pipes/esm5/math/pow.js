import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var PowerPipe = /** @class */ (function () {
    function PowerPipe() {
    }
    PowerPipe.prototype.transform = function (num, power) {
        if (power === void 0) { power = 2; }
        return !isNaN(num) ? Math.pow(num, power) : num;
    };
    PowerPipe = tslib_1.__decorate([
        Pipe({ name: 'pow' })
    ], PowerPipe);
    return PowerPipe;
}());
export { PowerPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbIm1hdGgvcG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBT0EsQ0FBQztJQUhDLDZCQUFTLEdBQVQsVUFBVSxHQUFRLEVBQUUsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFBLEdBQUcsRUFBSSxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFOVSxTQUFTO1FBRHJCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztPQUNULFNBQVMsQ0FPckI7SUFBRCxnQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ3BvdycgfSlcbmV4cG9ydCBjbGFzcyBQb3dlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBwb3dlcj86IG51bWJlcik6IG51bWJlcjtcbiAgdHJhbnNmb3JtKG51bTogYW55LCBwb3dlcj86IG51bWJlcik6IGFueTtcblxuICB0cmFuc2Zvcm0obnVtOiBhbnksIHBvd2VyOiBudW1iZXIgPSAyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gIWlzTmFOKG51bSkgPyBudW0gKiogcG93ZXIgOiBudW07XG4gIH1cbn1cbiJdfQ==