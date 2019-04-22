import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let InitialPipe = class InitialPipe {
    transform(input, num = 0) {
        return Array.isArray(input) ? input.slice(0, input.length - num) : input;
    }
};
InitialPipe = tslib_1.__decorate([
    Pipe({ name: 'initial' })
], InitialPipe);
export { InitialPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9pbml0aWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBSXRCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBYyxDQUFDO1FBQ25DLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzNFLENBQUM7Q0FDRixDQUFBO0FBUFksV0FBVztJQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7R0FDYixXQUFXLENBT3ZCO1NBUFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnaW5pdGlhbCcgfSlcbmV4cG9ydCBjbGFzcyBJbml0aWFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdLCBudW06IG51bWJlcik6IGFueVtdO1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSk6IGFueTtcblxuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgbnVtOiBudW1iZXIgPSAwKTogYW55W10ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0LnNsaWNlKDAsIGlucHV0Lmxlbmd0aCAtIG51bSkgOiBpbnB1dDtcbiAgfVxufVxuIl19