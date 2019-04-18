import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var CamelizePipe = /** @class */ (function () {
    function CamelizePipe() {
    }
    CamelizePipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        if (!isString(text)) {
            return text;
        }
        return text
            .toLowerCase()
            .split(/[-_\s]/g)
            .filter(function (v) { return !!v; })
            .map(function (word, key) {
            return !key ? word : word.slice(0, 1).toUpperCase() + word.slice(1);
        })
            .join('');
    };
    CamelizePipe = tslib_1.__decorate([
        Pipe({ name: 'camelize' })
    ], CamelizePipe);
    return CamelizePipe;
}());
export { CamelizePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWxpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsic3RyaW5nL2NhbWVsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQWtCQSxDQUFDO0lBZEMsZ0NBQVMsR0FBVCxVQUFVLElBQVMsRUFBRSxLQUFxQjtRQUFyQixzQkFBQSxFQUFBLGFBQXFCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSTthQUNSLFdBQVcsRUFBRTthQUNiLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDaEIsTUFBTSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLENBQUM7YUFDMUIsR0FBRyxDQUFDLFVBQUMsSUFBWSxFQUFFLEdBQVE7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7SUFqQlUsWUFBWTtRQUR4QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7T0FDZCxZQUFZLENBa0J4QjtJQUFELG1CQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FsQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnY2FtZWxpemUnIH0pXG5leHBvcnQgY2xhc3MgQ2FtZWxpemVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogc3RyaW5nLCBjaGFycz86IHN0cmluZyk6IHN0cmluZztcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIGNoYXJzPzogc3RyaW5nKTogYW55O1xuXG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGNoYXJzOiBzdHJpbmcgPSAnXFxcXHMnKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzU3RyaW5nKHRleHQpKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dFxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5zcGxpdCgvWy1fXFxzXS9nKVxuICAgICAgLmZpbHRlcigodjogc3RyaW5nKSA9PiAhIXYpXG4gICAgICAubWFwKCh3b3JkOiBzdHJpbmcsIGtleTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAha2V5ID8gd29yZCA6IHdvcmQuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSk7XG4gICAgICB9KVxuICAgICAgLmpvaW4oJycpO1xuICB9XG59XG4iXX0=