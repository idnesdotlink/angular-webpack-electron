import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var LeftTrimPipe = /** @class */ (function () {
    function LeftTrimPipe() {
    }
    LeftTrimPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(new RegExp("^[" + chars + "]+"), '') : text;
    };
    LeftTrimPipe = tslib_1.__decorate([
        Pipe({ name: 'ltrim' })
    ], LeftTrimPipe);
    return LeftTrimPipe;
}());
export { LeftTrimPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHRyaW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsic3RyaW5nL2x0cmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFIQyxnQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLEtBQXFCO1FBQXJCLHNCQUFBLEVBQUEsYUFBcUI7UUFDM0MsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBSyxLQUFLLE9BQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUhVLFlBQVk7UUFEeEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO09BQ1gsWUFBWSxDQUl4QjtJQUFELG1CQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnbHRyaW0nIH0pXG5leHBvcnQgY2xhc3MgTGVmdFRyaW1QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBzdHJpbmcsIGNoYXJzOiBzdHJpbmcgPSAnXFxcXHMnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNTdHJpbmcodGV4dCkgPyB0ZXh0LnJlcGxhY2UobmV3IFJlZ0V4cChgXlske2NoYXJzfV0rYCksICcnKSA6IHRleHQ7XG4gIH1cbn1cbiJdfQ==