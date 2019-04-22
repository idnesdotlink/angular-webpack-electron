import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
let ReversePipe = class ReversePipe {
    transform(input) {
        if (isString(input)) {
            return input
                .split('')
                .reverse()
                .join('');
        }
        return Array.isArray(input) ? input.slice().reverse() : input;
    }
};
ReversePipe = tslib_1.__decorate([
    Pipe({ name: 'reverse' })
], ReversePipe);
export { ReversePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2ZXJzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9yZXZlcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixTQUFTLENBQUMsS0FBVTtRQUNsQixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLEtBQUs7aUJBQ1QsS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDVCxPQUFPLEVBQUU7aUJBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2I7UUFFRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hFLENBQUM7Q0FDRixDQUFBO0FBWFksV0FBVztJQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7R0FDYixXQUFXLENBV3ZCO1NBWFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAncmV2ZXJzZScgfSlcbmV4cG9ydCBjbGFzcyBSZXZlcnNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSk6IGFueSB7XG4gICAgaWYgKGlzU3RyaW5nKGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0XG4gICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAuam9pbignJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQuc2xpY2UoKS5yZXZlcnNlKCkgOiBpbnB1dDtcbiAgfVxufVxuIl19