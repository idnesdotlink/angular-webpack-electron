import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var SlugifyPipe = /** @class */ (function () {
    function SlugifyPipe() {
    }
    SlugifyPipe.prototype.transform = function (str) {
        return isString(str)
            ? str
                .toLowerCase()
                .trim()
                .replace(/[^\w\-]+/g, ' ')
                .replace(/\s+/g, '-')
            : str;
    };
    SlugifyPipe = tslib_1.__decorate([
        Pipe({ name: 'slugify' })
    ], SlugifyPipe);
    return SlugifyPipe;
}());
export { SlugifyPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2x1Z2lmeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc2x1Z2lmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFVQSxDQUFDO0lBVEMsK0JBQVMsR0FBVCxVQUFVLEdBQVc7UUFDbkIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxHQUFHO2lCQUNBLFdBQVcsRUFBRTtpQkFDYixJQUFJLEVBQUU7aUJBQ04sT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDVixDQUFDO0lBVFUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBVXZCO0lBQUQsa0JBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdzbHVnaWZ5JyB9KVxuZXhwb3J0IGNsYXNzIFNsdWdpZnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHN0cilcbiAgICAgID8gc3RyXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgJyAnKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJylcbiAgICAgIDogc3RyO1xuICB9XG59XG4iXX0=