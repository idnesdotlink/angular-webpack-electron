import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { OrderByPipe } from './order-by';
// tslint:disable use-pipe-transform-interface
var OrderByImpurePipe = /** @class */ (function (_super) {
    tslib_1.__extends(OrderByImpurePipe, _super);
    function OrderByImpurePipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderByImpurePipe = tslib_1.__decorate([
        Pipe({ name: 'orderByImpure', pure: false })
    ], OrderByImpurePipe);
    return OrderByImpurePipe;
}(OrderByPipe));
export { OrderByImpurePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYnktaW1wdXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImFycmF5L29yZGVyLWJ5LWltcHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXpDLDhDQUE4QztBQUU5QztJQUF1Qyw2Q0FBVztJQUFsRDs7SUFBb0QsQ0FBQztJQUF4QyxpQkFBaUI7UUFEN0IsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7T0FDaEMsaUJBQWlCLENBQXVCO0lBQUQsd0JBQUM7Q0FBQSxBQUFyRCxDQUF1QyxXQUFXLEdBQUc7U0FBeEMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuL29yZGVyLWJ5JztcblxuLy8gdHNsaW50OmRpc2FibGUgdXNlLXBpcGUtdHJhbnNmb3JtLWludGVyZmFjZVxuQFBpcGUoeyBuYW1lOiAnb3JkZXJCeUltcHVyZScsIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgT3JkZXJCeUltcHVyZVBpcGUgZXh0ZW5kcyBPcmRlckJ5UGlwZSB7fVxuIl19