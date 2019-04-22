import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var EveryPipe = /** @class */ (function () {
    function EveryPipe() {
    }
    EveryPipe.prototype.transform = function (input, predicate) {
        return Array.isArray(input) ? input.every(predicate) : false;
    };
    EveryPipe = tslib_1.__decorate([
        Pipe({ name: 'every' })
    ], EveryPipe);
    return EveryPipe;
}());
export { EveryPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvZXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFJQSxDQUFDO0lBSEMsNkJBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxTQUErRDtRQUNuRixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvRCxDQUFDO0lBSFUsU0FBUztRQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDWCxTQUFTLENBSXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdldmVyeScgfSlcbmV4cG9ydCBjbGFzcyBFdmVyeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIHByZWRpY2F0ZTogKHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIsIGFycmF5OiBhbnlbXSkgPT4gYm9vbGVhbik6IGJvb2xlYW4gfCBhbnlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQuZXZlcnkocHJlZGljYXRlKSA6IGZhbHNlO1xuICB9XG59XG4iXX0=