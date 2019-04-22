import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var UcFirstPipe = /** @class */ (function () {
    function UcFirstPipe() {
    }
    UcFirstPipe.prototype.transform = function (text) {
        return isString(text) ? text.slice(0, 1).toUpperCase() + text.slice(1) : text;
    };
    UcFirstPipe = tslib_1.__decorate([
        Pipe({ name: 'ucfirst' })
    ], UcFirstPipe);
    return UcFirstPipe;
}());
export { UcFirstPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWNmaXJzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvdWNmaXJzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFPQSxDQUFDO0lBSEMsK0JBQVMsR0FBVCxVQUFVLElBQVM7UUFDakIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNoRixDQUFDO0lBTlUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBT3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICd1Y2ZpcnN0JyB9KVxuZXhwb3J0IGNsYXNzIFVjRmlyc3RQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogc3RyaW5nKTogc3RyaW5nO1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSk6IGFueTtcblxuICB0cmFuc2Zvcm0odGV4dDogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNTdHJpbmcodGV4dCkgPyB0ZXh0LnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpIDogdGV4dDtcbiAgfVxufVxuIl19