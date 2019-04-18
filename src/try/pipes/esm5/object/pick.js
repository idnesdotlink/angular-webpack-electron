import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isObject } from '../helpers/helpers';
var PickPipe = /** @class */ (function () {
    function PickPipe() {
    }
    // tslint:disable-next-line: ban-types
    PickPipe.prototype.transform = function (obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return args.reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {}, _a[k] = obj[k], _a));
        }, {});
    };
    PickPipe = tslib_1.__decorate([
        Pipe({ name: 'pick' })
    ], PickPipe);
    return PickPipe;
}());
export { PickPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJvYmplY3QvcGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFXQSxDQUFDO0lBVkMsc0NBQXNDO0lBQ3RDLDRCQUFTLEdBQVQsVUFBVSxHQUFRO1FBQUUsY0FBc0I7YUFBdEIsVUFBc0IsRUFBdEIscUJBQXNCLEVBQXRCLElBQXNCO1lBQXRCLDZCQUFzQjs7UUFDeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzs7WUFDdEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBSSxHQUFDLENBQUMsSUFBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztRQUMzQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBVlUsUUFBUTtRQURwQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDVixRQUFRLENBV3BCO0lBQUQsZUFBQztDQUFBLEFBWEQsSUFXQztTQVhZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3BpY2snIH0pXG5leHBvcnQgY2xhc3MgUGlja1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBiYW4tdHlwZXNcbiAgdHJhbnNmb3JtKG9iajogYW55LCAuLi5hcmdzOiBBcnJheTxzdHJpbmc+KTogT2JqZWN0IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopIHx8ICFpc09iamVjdChvYmopKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBhcmdzLnJlZHVjZSgobywgaykgPT4ge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obywgeyBba106IG9ialtrXSB9KTtcbiAgICB9LCB7fSk7XG4gIH1cbn1cbiJdfQ==