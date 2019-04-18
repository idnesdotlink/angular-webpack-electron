import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var MinPipe = /** @class */ (function () {
    function MinPipe() {
    }
    MinPipe.prototype.transform = function (arr) {
        return Array.isArray(arr) ? Math.min.apply(Math, tslib_1.__spread(arr)) : arr;
    };
    MinPipe = tslib_1.__decorate([
        Pipe({ name: 'min' })
    ], MinPipe);
    return MinPipe;
}());
export { MinPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbIm1hdGgvbWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBSUEsQ0FBQztJQUhDLDJCQUFTLEdBQVQsVUFBVSxHQUFRO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLG1CQUFRLEdBQUcsR0FBRSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3JELENBQUM7SUFIVSxPQUFPO1FBRG5CLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztPQUNULE9BQU8sQ0FJbkI7SUFBRCxjQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnbWluJyB9KVxuZXhwb3J0IGNsYXNzIE1pblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGFycjogYW55KTogbnVtYmVyIHwgbnVtYmVyW10ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBNYXRoLm1pbiguLi5hcnIpIDogYXJyO1xuICB9XG59XG4iXX0=