import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
let LinesPipe = class LinesPipe {
    transform(text, chars = '\\s') {
        return isString(text) ? text.replace(/\r\n/g, '\n').split('\n') : text;
    }
};
LinesPipe = tslib_1.__decorate([
    Pipe({ name: 'lines' })
], LinesPipe);
export { LinesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsic3RyaW5nL2xpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUMsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUNwQixTQUFTLENBQUMsSUFBUyxFQUFFLFFBQWdCLEtBQUs7UUFDeEMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pFLENBQUM7Q0FDRixDQUFBO0FBSlksU0FBUztJQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7R0FDWCxTQUFTLENBSXJCO1NBSlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnbGluZXMnIH0pXG5leHBvcnQgY2xhc3MgTGluZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGNoYXJzOiBzdHJpbmcgPSAnXFxcXHMnKTogQXJyYXk8c3RyaW5nPiB8IGFueSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHRleHQpID8gdGV4dC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpLnNwbGl0KCdcXG4nKSA6IHRleHQ7XG4gIH1cbn1cbiJdfQ==