import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { extractDeepPropertyByMapKey, isObject } from '../helpers/helpers';
var PluckPipe = /** @class */ (function () {
    function PluckPipe() {
    }
    PluckPipe.prototype.transform = function (input, map) {
        if (Array.isArray(input)) {
            return input.map(function (e) { return extractDeepPropertyByMapKey(e, map); });
        }
        return isObject(input) ? extractDeepPropertyByMapKey(input, map) : input;
    };
    PluckPipe = tslib_1.__decorate([
        Pipe({ name: 'pluck', pure: false })
    ], PluckPipe);
    return PluckPipe;
}());
export { PluckPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Y2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvcGx1Y2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczRTtJQUFBO0lBWUEsQ0FBQztJQVBDLDZCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsR0FBVztRQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsMkJBQTJCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDM0UsQ0FBQztJQVhVLFNBQVM7UUFEckIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7T0FDeEIsU0FBUyxDQVlyQjtJQUFELGdCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGV4dHJhY3REZWVwUHJvcGVydHlCeU1hcEtleSwgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdwbHVjaycsIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgUGx1Y2tQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55W10sIG1hcDogc3RyaW5nKTogYW55W107XG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBtYXA6IHN0cmluZyk6IGFueTtcbiAgdHJhbnNmb3JtPFQ+KGlucHV0OiBULCBtYXA6IHN0cmluZyk6IFQ7XG5cbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIG1hcDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dC5tYXAoZSA9PiBleHRyYWN0RGVlcFByb3BlcnR5QnlNYXBLZXkoZSwgbWFwKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0KGlucHV0KSA/IGV4dHJhY3REZWVwUHJvcGVydHlCeU1hcEtleShpbnB1dCwgbWFwKSA6IGlucHV0O1xuICB9XG59XG4iXX0=