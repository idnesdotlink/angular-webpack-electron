import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var IntersectionPipe = /** @class */ (function () {
    function IntersectionPipe() {
    }
    IntersectionPipe.prototype.transform = function (input) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Array.isArray(input)) {
            return input;
        }
        // tslint:disable-next-line no-bitwise
        return args.reduce(function (n, c) { return n.filter(function (e) { return !!~c.indexOf(e); }); }, input);
    };
    IntersectionPipe = tslib_1.__decorate([
        Pipe({ name: 'intersection' })
    ], IntersectionPipe);
    return IntersectionPipe;
}());
export { IntersectionPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImFycmF5L2ludGVyc2VjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQVlBLENBQUM7SUFSQyxvQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxzQ0FBc0M7UUFDdEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxFQUFyQyxDQUFxQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFYVSxnQkFBZ0I7UUFENUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDO09BQ2xCLGdCQUFnQixDQVk1QjtJQUFELHVCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdpbnRlcnNlY3Rpb24nIH0pXG5leHBvcnQgY2xhc3MgSW50ZXJzZWN0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdLCAuLi5hcmdzOiBhbnlbXSk6IGFueVtdO1xuICB0cmFuc2Zvcm08VD4oaW5wdXQ6IFQsIC4uLmFyZ3M6IGFueVtdKTogVDtcblxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgIHJldHVybiBhcmdzLnJlZHVjZSgobiwgYykgPT4gbi5maWx0ZXIoKGU6IGFueSkgPT4gISF+Yy5pbmRleE9mKGUpKSwgaW5wdXQpO1xuICB9XG59XG4iXX0=