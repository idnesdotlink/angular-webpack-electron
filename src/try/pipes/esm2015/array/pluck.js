import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { extractDeepPropertyByMapKey, isObject } from '../helpers/helpers';
let PluckPipe = class PluckPipe {
    transform(input, map) {
        if (Array.isArray(input)) {
            return input.map(e => extractDeepPropertyByMapKey(e, map));
        }
        return isObject(input) ? extractDeepPropertyByMapKey(input, map) : input;
    }
};
PluckPipe = tslib_1.__decorate([
    Pipe({ name: 'pluck', pure: false })
], PluckPipe);
export { PluckPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Y2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvcGx1Y2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczRSxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBS3BCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsR0FBVztRQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDM0UsQ0FBQztDQUNGLENBQUE7QUFaWSxTQUFTO0lBRHJCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0dBQ3hCLFNBQVMsQ0FZckI7U0FaWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZXh0cmFjdERlZXBQcm9wZXJ0eUJ5TWFwS2V5LCBpc09iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3BsdWNrJywgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBQbHVja1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSwgbWFwOiBzdHJpbmcpOiBhbnlbXTtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIG1hcDogc3RyaW5nKTogYW55O1xuICB0cmFuc2Zvcm08VD4oaW5wdXQ6IFQsIG1hcDogc3RyaW5nKTogVDtcblxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgbWFwOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0Lm1hcChlID0+IGV4dHJhY3REZWVwUHJvcGVydHlCeU1hcEtleShlLCBtYXApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3QoaW5wdXQpID8gZXh0cmFjdERlZXBQcm9wZXJ0eUJ5TWFwS2V5KGlucHV0LCBtYXApIDogaW5wdXQ7XG4gIH1cbn1cbiJdfQ==