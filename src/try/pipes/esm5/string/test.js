import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var TestPipe = /** @class */ (function () {
    function TestPipe() {
    }
    TestPipe.prototype.transform = function (text, pattern, flags) {
        if (!isString(text)) {
            return text;
        }
        return new RegExp(pattern, flags).test(text);
    };
    TestPipe = tslib_1.__decorate([
        Pipe({ name: 'test' })
    ], TestPipe);
    return TestPipe;
}());
export { TestPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFXQSxDQUFDO0lBUEMsNEJBQVMsR0FBVCxVQUFVLElBQVMsRUFBRSxPQUFlLEVBQUUsS0FBYztRQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQVZVLFFBQVE7UUFEcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ1YsUUFBUSxDQVdwQjtJQUFELGVBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICd0ZXN0JyB9KVxuZXhwb3J0IGNsYXNzIFRlc3RQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZywgZmxhZ3M/OiBzdHJpbmcpOiBib29sZWFuO1xuICB0cmFuc2Zvcm08VD4odGV4dDogVCwgcGF0dGVybjogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IFQ7XG5cbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgcGF0dGVybjogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCFpc1N0cmluZyh0ZXh0KSkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpLnRlc3QodGV4dCk7XG4gIH1cbn1cbiJdfQ==