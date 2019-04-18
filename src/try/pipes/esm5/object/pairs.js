import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isObject } from '../helpers/helpers';
var PairsPipe = /** @class */ (function () {
    function PairsPipe() {
    }
    PairsPipe.prototype.transform = function (obj) {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }
        return Object.keys(obj).map(function (k) { return [k, obj[k]]; });
    };
    PairsPipe = tslib_1.__decorate([
        Pipe({ name: 'pairs' })
    ], PairsPipe);
    return PairsPipe;
}());
export { PairsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsib2JqZWN0L3BhaXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQVFBLENBQUM7SUFQQyw2QkFBUyxHQUFULFVBQVUsR0FBUTtRQUNoQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBUFUsU0FBUztRQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDWCxTQUFTLENBUXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdwYWlycycgfSlcbmV4cG9ydCBjbGFzcyBQYWlyc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG9iajogYW55KTogYW55W10ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikgfHwgIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGsgPT4gW2ssIG9ialtrXV0pO1xuICB9XG59XG4iXX0=