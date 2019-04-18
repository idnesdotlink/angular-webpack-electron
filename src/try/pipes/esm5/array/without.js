import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var WithoutPipe = /** @class */ (function () {
    function WithoutPipe() {
    }
    WithoutPipe.prototype.transform = function (input, args) {
        if (args === void 0) { args = []; }
        return Array.isArray(input)
            ? // tslint:disable-next-line:no-bitwise
                input.filter(function (e) { return !~args.indexOf(e); })
            : input;
    };
    WithoutPipe = tslib_1.__decorate([
        Pipe({ name: 'without' })
    ], WithoutPipe);
    return WithoutPipe;
}());
export { WithoutPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aG91dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS93aXRob3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUFBO0lBVUEsQ0FBQztJQU5DLCtCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxTQUFnQjtRQUNwQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxzQ0FBc0M7Z0JBQ3RDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQztZQUN0QyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ1osQ0FBQztJQVRVLFdBQVc7UUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO09BQ2IsV0FBVyxDQVV2QjtJQUFELGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnd2l0aG91dCcgfSlcbmV4cG9ydCBjbGFzcyBXaXRob3V0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdLCBhcmdzPzogYW55W10pOiBhbnlbXTtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIGFyZ3M/OiBhbnlbXSk6IGFueTtcblxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgYXJnczogYW55W10gPSBbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dClcbiAgICAgID8gLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcbiAgICAgICAgaW5wdXQuZmlsdGVyKGUgPT4gIX5hcmdzLmluZGV4T2YoZSkpXG4gICAgICA6IGlucHV0O1xuICB9XG59XG4iXX0=