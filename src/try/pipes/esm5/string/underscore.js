import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var UnderscorePipe = /** @class */ (function () {
    function UnderscorePipe() {
    }
    UnderscorePipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text)
            ? text
                .trim()
                .replace(/\s+/g, '')
                .replace(/[A-Z]/g, function (c, k) {
                return k ? "_" + c.toLowerCase() : c.toLowerCase();
            })
            : text;
    };
    UnderscorePipe = tslib_1.__decorate([
        Pipe({ name: 'underscore' })
    ], UnderscorePipe);
    return UnderscorePipe;
}());
export { UnderscorePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kZXJzY29yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvdW5kZXJzY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFjQSxDQUFDO0lBVkMsa0NBQVMsR0FBVCxVQUFVLElBQVMsRUFBRSxLQUFxQjtRQUFyQixzQkFBQSxFQUFBLGFBQXFCO1FBQ3hDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMsSUFBSTtpQkFDRCxJQUFJLEVBQUU7aUJBQ04sT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7aUJBQ25CLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFTLEVBQUUsQ0FBTTtnQkFDbkMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUksQ0FBQyxDQUFDLFdBQVcsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckQsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFiVSxjQUFjO1FBRDFCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztPQUNoQixjQUFjLENBYzFCO0lBQUQscUJBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICd1bmRlcnNjb3JlJyB9KVxuZXhwb3J0IGNsYXNzIFVuZGVyc2NvcmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogc3RyaW5nLCBjaGFycz86IHN0cmluZyk6IHN0cmluZztcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIGNoYXJzPzogc3RyaW5nKTogYW55O1xuXG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGNoYXJzOiBzdHJpbmcgPSAnXFxcXHMnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNTdHJpbmcodGV4dClcbiAgICAgID8gdGV4dFxuICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnJylcbiAgICAgICAgICAucmVwbGFjZSgvW0EtWl0vZywgKGM6IHN0cmluZywgazogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gayA/IGBfJHtjLnRvTG93ZXJDYXNlKCl9YCA6IGMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9KVxuICAgICAgOiB0ZXh0O1xuICB9XG59XG4iXX0=