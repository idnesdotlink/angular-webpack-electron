import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var RightTrimPipe = /** @class */ (function () {
    function RightTrimPipe() {
    }
    RightTrimPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(new RegExp("[" + chars + "]+$"), '') : text;
    };
    RightTrimPipe = tslib_1.__decorate([
        Pipe({ name: 'rtrim' })
    ], RightTrimPipe);
    return RightTrimPipe;
}());
export { RightTrimPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsic3RyaW5nL3J0cmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFIQyxpQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLEtBQXFCO1FBQXJCLHNCQUFBLEVBQUEsYUFBcUI7UUFDM0MsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBSSxLQUFLLFFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUhVLGFBQWE7UUFEekIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO09BQ1gsYUFBYSxDQUl6QjtJQUFELG9CQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAncnRyaW0nIH0pXG5leHBvcnQgY2xhc3MgUmlnaHRUcmltUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nLCBjaGFyczogc3RyaW5nID0gJ1xcXFxzJyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHRleHQpID8gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske2NoYXJzfV0rJGApLCAnJykgOiB0ZXh0O1xuICB9XG59XG4iXX0=