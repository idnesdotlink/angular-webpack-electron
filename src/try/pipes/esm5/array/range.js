import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var RangePipe = /** @class */ (function () {
    function RangePipe() {
    }
    RangePipe.prototype.transform = function (start, count, step) {
        if (start === void 0) { start = 1; }
        if (count === void 0) { count = 0; }
        if (step === void 0) { step = 1; }
        return Array(count)
            .fill('')
            .map(function (v, i) { return step * i + start; });
    };
    RangePipe = tslib_1.__decorate([
        Pipe({ name: 'range' })
    ], RangePipe);
    return RangePipe;
}());
export { RangePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvcmFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFNQSxDQUFDO0lBTEMsNkJBQVMsR0FBVCxVQUFVLEtBQWlCLEVBQUUsS0FBaUIsRUFBRSxJQUFnQjtRQUF0RCxzQkFBQSxFQUFBLFNBQWlCO1FBQUUsc0JBQUEsRUFBQSxTQUFpQjtRQUFFLHFCQUFBLEVBQUEsUUFBZ0I7UUFDOUQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDUixHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBTFUsU0FBUztRQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDWCxTQUFTLENBTXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdyYW5nZScgfSlcbmV4cG9ydCBjbGFzcyBSYW5nZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHN0YXJ0OiBudW1iZXIgPSAxLCBjb3VudDogbnVtYmVyID0gMCwgc3RlcDogbnVtYmVyID0gMSk6IGFueSB7XG4gICAgcmV0dXJuIEFycmF5KGNvdW50KVxuICAgICAgLmZpbGwoJycpXG4gICAgICAubWFwKCh2LCBpKSA9PiBzdGVwICogaSArIHN0YXJ0KTtcbiAgfVxufVxuIl19