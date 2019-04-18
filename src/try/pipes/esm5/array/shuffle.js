import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ShufflePipe = /** @class */ (function () {
    function ShufflePipe() {
    }
    // Using a version of the Fisher-Yates shuffle algorithm
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    ShufflePipe.prototype.transform = function (input) {
        var _a;
        if (!Array.isArray(input)) {
            return input;
        }
        var shuffled = tslib_1.__spread(input);
        var n = input.length - 1;
        for (var i = 0; i < n; ++i) {
            var j = Math.floor(Math.random() * (n - i + 1)) + i;
            _a = tslib_1.__read([shuffled[j], shuffled[i]], 2), shuffled[i] = _a[0], shuffled[j] = _a[1];
        }
        return shuffled;
    };
    ShufflePipe = tslib_1.__decorate([
        Pipe({ name: 'shuffle' })
    ], ShufflePipe);
    return ShufflePipe;
}());
export { ShufflePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1ZmZsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9zaHVmZmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBb0JBLENBQUM7SUFoQkMsd0RBQXdEO0lBQ3hELDZEQUE2RDtJQUM3RCwrQkFBUyxHQUFULFVBQVUsS0FBVTs7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQU0sUUFBUSxvQkFBTyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzFCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RCxrREFBdUQsRUFBdEQsbUJBQVcsRUFBRSxtQkFBVyxDQUErQjtTQUN6RDtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFuQlUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBb0J2QjtJQUFELGtCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnc2h1ZmZsZScgfSlcbmV4cG9ydCBjbGFzcyBTaHVmZmxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdKTogYW55W107XG4gIHRyYW5zZm9ybTxUPihpbnB1dDogVCk6IFQ7XG5cbiAgLy8gVXNpbmcgYSB2ZXJzaW9uIG9mIHRoZSBGaXNoZXItWWF0ZXMgc2h1ZmZsZSBhbGdvcml0aG1cbiAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVyJUUyJTgwJTkzWWF0ZXNfc2h1ZmZsZVxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSk6IGFueSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmlucHV0XTtcbiAgICBjb25zdCBuID0gaW5wdXQubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChuIC0gaSArIDEpKSArIGk7XG4gICAgICBbc2h1ZmZsZWRbaV0sIHNodWZmbGVkW2pdXSA9IFtzaHVmZmxlZFtqXSwgc2h1ZmZsZWRbaV1dO1xuICAgIH1cblxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfVxufVxuIl19