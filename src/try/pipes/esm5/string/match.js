import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var MatchPipe = /** @class */ (function () {
    function MatchPipe() {
    }
    MatchPipe.prototype.transform = function (text, pattern, flags) {
        if (!isString(text)) {
            return text;
        }
        return text.match(new RegExp(pattern, flags));
    };
    MatchPipe = tslib_1.__decorate([
        Pipe({ name: 'match' })
    ], MatchPipe);
    return MatchPipe;
}());
export { MatchPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsic3RyaW5nL21hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQVdBLENBQUM7SUFQQyw2QkFBUyxHQUFULFVBQVUsSUFBUyxFQUFFLE9BQWUsRUFBRSxLQUFjO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBVlUsU0FBUztRQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDWCxTQUFTLENBV3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdtYXRjaCcgfSlcbmV4cG9ydCBjbGFzcyBNYXRjaFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsO1xuICB0cmFuc2Zvcm08VD4odGV4dDogVCwgcGF0dGVybjogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IFQ7XG5cbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgcGF0dGVybjogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCFpc1N0cmluZyh0ZXh0KSkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHQubWF0Y2gobmV3IFJlZ0V4cChwYXR0ZXJuLCBmbGFncykpO1xuICB9XG59XG4iXX0=