import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { GroupByPipe } from './group-by';
// tslint:disable use-pipe-transform-interface
var GroupByImpurePipe = /** @class */ (function (_super) {
    tslib_1.__extends(GroupByImpurePipe, _super);
    function GroupByImpurePipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupByImpurePipe = tslib_1.__decorate([
        Pipe({ name: 'groupByImpure', pure: false })
    ], GroupByImpurePipe);
    return GroupByImpurePipe;
}(GroupByPipe));
export { GroupByImpurePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYnktaW1wdXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImFycmF5L2dyb3VwLWJ5LWltcHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXpDLDhDQUE4QztBQUU5QztJQUF1Qyw2Q0FBVztJQUFsRDs7SUFBb0QsQ0FBQztJQUF4QyxpQkFBaUI7UUFEN0IsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7T0FDaEMsaUJBQWlCLENBQXVCO0lBQUQsd0JBQUM7Q0FBQSxBQUFyRCxDQUF1QyxXQUFXLEdBQUc7U0FBeEMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JvdXBCeVBpcGUgfSBmcm9tICcuL2dyb3VwLWJ5JztcblxuLy8gdHNsaW50OmRpc2FibGUgdXNlLXBpcGUtdHJhbnNmb3JtLWludGVyZmFjZVxuQFBpcGUoeyBuYW1lOiAnZ3JvdXBCeUltcHVyZScsIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgR3JvdXBCeUltcHVyZVBpcGUgZXh0ZW5kcyBHcm91cEJ5UGlwZSB7fVxuIl19