import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var DiffPipe = /** @class */ (function () {
    function DiffPipe() {
    }
    DiffPipe.prototype.transform = function (input) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Array.isArray(input)) {
            return input;
        }
        // tslint:disable-next-line no-bitwise
        return args.reduce(function (d, c) { return d.filter(function (e) { return !~c.indexOf(e); }); }, input);
    };
    DiffPipe = tslib_1.__decorate([
        Pipe({ name: 'diff' })
    ], DiffPipe);
    return DiffPipe;
}());
export { DiffPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9kaWZmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBWUEsQ0FBQztJQVJDLDRCQUFTLEdBQVQsVUFBVSxLQUFVO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELHNDQUFzQztRQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFkLENBQWMsQ0FBQyxFQUFwQyxDQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFYVSxRQUFRO1FBRHBCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUNWLFFBQVEsQ0FZcEI7SUFBRCxlQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnZGlmZicgfSlcbmV4cG9ydCBjbGFzcyBEaWZmUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdLCAuLi5hcmdzOiBhbnlbXSk6IGFueVtdO1xuICB0cmFuc2Zvcm08VD4oaW5wdXQ6IFQsIC4uLmFyZ3M6IGFueVtdKTogVDtcblxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgIHJldHVybiBhcmdzLnJlZHVjZSgoZCwgYykgPT4gZC5maWx0ZXIoKGU6IGFueSkgPT4gIX5jLmluZGV4T2YoZSkpLCBpbnB1dCk7XG4gIH1cbn1cbiJdfQ==