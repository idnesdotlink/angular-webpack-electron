import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var InitialPipe = /** @class */ (function () {
    function InitialPipe() {
    }
    InitialPipe.prototype.transform = function (input, num) {
        if (num === void 0) { num = 0; }
        return Array.isArray(input) ? input.slice(0, input.length - num) : input;
    };
    InitialPipe = tslib_1.__decorate([
        Pipe({ name: 'initial' })
    ], InitialPipe);
    return InitialPipe;
}());
export { InitialPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9pbml0aWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBT0EsQ0FBQztJQUhDLCtCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsR0FBZTtRQUFmLG9CQUFBLEVBQUEsT0FBZTtRQUNuQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMzRSxDQUFDO0lBTlUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBT3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdpbml0aWFsJyB9KVxuZXhwb3J0IGNsYXNzIEluaXRpYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55W10sIG51bTogbnVtYmVyKTogYW55W107XG4gIHRyYW5zZm9ybShpbnB1dDogYW55KTogYW55O1xuXG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBudW06IG51bWJlciA9IDApOiBhbnlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQuc2xpY2UoMCwgaW5wdXQubGVuZ3RoIC0gbnVtKSA6IGlucHV0O1xuICB9XG59XG4iXX0=