import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var FlattenPipe = /** @class */ (function () {
    function FlattenPipe() {
    }
    FlattenPipe.prototype.transform = function (input, shallow) {
        if (shallow === void 0) { shallow = false; }
        if (!Array.isArray(input)) {
            return input;
        }
        return shallow ? [].concat.apply([], input) : this.flatten(input);
    };
    FlattenPipe.prototype.flatten = function (array) {
        var _this = this;
        return array.reduce(function (arr, elm) {
            if (Array.isArray(elm)) {
                return arr.concat(_this.flatten(elm));
            }
            return arr.concat(elm);
        }, []);
    };
    FlattenPipe = tslib_1.__decorate([
        Pipe({ name: 'flatten' })
    ], FlattenPipe);
    return FlattenPipe;
}());
export { FlattenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9mbGF0dGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBcUJBLENBQUM7SUFqQkMsK0JBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxPQUF3QjtRQUF4Qix3QkFBQSxFQUFBLGVBQXdCO1FBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyw2QkFBTyxHQUFmLFVBQWdCLEtBQVk7UUFBNUIsaUJBUUM7UUFQQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFVLEVBQUUsR0FBUTtZQUN2QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEM7WUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQXBCVSxXQUFXO1FBRHZCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztPQUNiLFdBQVcsQ0FxQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdmbGF0dGVuJyB9KVxuZXhwb3J0IGNsYXNzIEZsYXR0ZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55W10sIHNoYWxsb3c/OiBib29sZWFuKTogYW55W107XG4gIHRyYW5zZm9ybTxUPihpbnB1dDogVCwgc2hhbGxvdz86IGJvb2xlYW4pOiBUO1xuXG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBzaGFsbG93OiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hhbGxvdyA/IFtdLmNvbmNhdC5hcHBseShbXSwgaW5wdXQpIDogdGhpcy5mbGF0dGVuKGlucHV0KTtcbiAgfVxuXG4gIHByaXZhdGUgZmxhdHRlbihhcnJheTogYW55W10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYXJyOiBhbnlbXSwgZWxtOiBhbnkpID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsbSkpIHtcbiAgICAgICAgcmV0dXJuIGFyci5jb25jYXQodGhpcy5mbGF0dGVuKGVsbSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJyLmNvbmNhdChlbG0pO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIl19