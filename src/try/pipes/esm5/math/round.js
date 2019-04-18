import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { applyPrecision } from '../helpers/helpers';
var RoundPipe = /** @class */ (function () {
    function RoundPipe() {
    }
    RoundPipe.prototype.transform = function (num, precision) {
        if (precision === void 0) { precision = 0; }
        return applyPrecision(num, precision);
    };
    RoundPipe = tslib_1.__decorate([
        Pipe({ name: 'round' })
    ], RoundPipe);
    return RoundPipe;
}());
export { RoundPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91bmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsibWF0aC9yb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BEO0lBQUE7SUFJQSxDQUFDO0lBSEMsNkJBQVMsR0FBVCxVQUFVLEdBQVcsRUFBRSxTQUFxQjtRQUFyQiwwQkFBQSxFQUFBLGFBQXFCO1FBQzFDLE9BQU8sY0FBYyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBSFUsU0FBUztRQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDWCxTQUFTLENBSXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYXBwbHlQcmVjaXNpb24gfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdyb3VuZCcgfSlcbmV4cG9ydCBjbGFzcyBSb3VuZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIHJldHVybiBhcHBseVByZWNpc2lvbihudW0sIHByZWNpc2lvbik7XG4gIH1cbn1cbiJdfQ==