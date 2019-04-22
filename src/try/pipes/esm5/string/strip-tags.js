import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var StripTagsPipe = /** @class */ (function () {
    function StripTagsPipe() {
    }
    StripTagsPipe.prototype.transform = function (text) {
        var allowedTags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            allowedTags[_i - 1] = arguments[_i];
        }
        return allowedTags.length > 0
            ? text.replace(new RegExp("<(?!/?(" + allowedTags.join('|') + ")s*/?)[^>]+>", 'g'), '')
            : text.replace(/<(?:.|\s)*?>/g, '');
    };
    StripTagsPipe = tslib_1.__decorate([
        Pipe({ name: 'stripTags' })
    ], StripTagsPipe);
    return StripTagsPipe;
}());
export { StripTagsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXAtdGFncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc3RyaXAtdGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQU1BLENBQUM7SUFMQyxpQ0FBUyxHQUFULFVBQVUsSUFBWTtRQUFFLHFCQUFxQjthQUFyQixVQUFxQixFQUFyQixxQkFBcUIsRUFBckIsSUFBcUI7WUFBckIsb0NBQXFCOztRQUMzQyxPQUFPLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFXLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFnQixFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUxVLGFBQWE7UUFEekIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDO09BQ2YsYUFBYSxDQU16QjtJQUFELG9CQUFDO0NBQUEsQUFORCxJQU1DO1NBTlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnc3RyaXBUYWdzJyB9KVxuZXhwb3J0IGNsYXNzIFN0cmlwVGFnc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgLi4uYWxsb3dlZFRhZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYWxsb3dlZFRhZ3MubGVuZ3RoID4gMFxuICAgICAgPyB0ZXh0LnJlcGxhY2UobmV3IFJlZ0V4cChgPCg/IVxcLz8oJHthbGxvd2VkVGFncy5qb2luKCd8Jyl9KVxccypcXC8/KVtePl0rPmAsICdnJyksICcnKVxuICAgICAgOiB0ZXh0LnJlcGxhY2UoLzwoPzoufFxccykqPz4vZywgJycpO1xuICB9XG59XG4iXX0=