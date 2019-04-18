import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let StripTagsPipe = class StripTagsPipe {
    transform(text, ...allowedTags) {
        return allowedTags.length > 0
            ? text.replace(new RegExp(`<(?!\/?(${allowedTags.join('|')})\s*\/?)[^>]+>`, 'g'), '')
            : text.replace(/<(?:.|\s)*?>/g, '');
    }
};
StripTagsPipe = tslib_1.__decorate([
    Pipe({ name: 'stripTags' })
], StripTagsPipe);
export { StripTagsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXAtdGFncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc3RyaXAtdGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4QixTQUFTLENBQUMsSUFBWSxFQUFFLEdBQUcsV0FBa0I7UUFDM0MsT0FBTyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRixDQUFBO0FBTlksYUFBYTtJQUR6QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7R0FDZixhQUFhLENBTXpCO1NBTlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnc3RyaXBUYWdzJyB9KVxuZXhwb3J0IGNsYXNzIFN0cmlwVGFnc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHRleHQ6IHN0cmluZywgLi4uYWxsb3dlZFRhZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYWxsb3dlZFRhZ3MubGVuZ3RoID4gMFxuICAgICAgPyB0ZXh0LnJlcGxhY2UobmV3IFJlZ0V4cChgPCg/IVxcLz8oJHthbGxvd2VkVGFncy5qb2luKCd8Jyl9KVxccypcXC8/KVtePl0rPmAsICdnJyksICcnKVxuICAgICAgOiB0ZXh0LnJlcGxhY2UoLzwoPzoufFxccykqPz4vZywgJycpO1xuICB9XG59XG4iXX0=