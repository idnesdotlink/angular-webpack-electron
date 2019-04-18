import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString, isUndefined } from '../helpers/helpers';
let ScanPipe = class ScanPipe {
    transform(text, args = []) {
        return isString(text)
            ? text.replace(/\{(\d+)}/g, (match, index) => (!isUndefined(args[index]) ? args[index] : match))
            : text;
    }
};
ScanPipe = tslib_1.__decorate([
    Pipe({ name: 'scan' })
], ScanPipe);
export { ScanPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc2Nhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczRCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBQ25CLFNBQVMsQ0FBQyxJQUFZLEVBQUUsT0FBaUIsRUFBRTtRQUN6QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQztDQUNGLENBQUE7QUFOWSxRQUFRO0lBRHBCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUNWLFFBQVEsQ0FNcEI7U0FOWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnc2NhbicgfSlcbmV4cG9ydCBjbGFzcyBTY2FuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSA9IFtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNTdHJpbmcodGV4dClcbiAgICAgID8gdGV4dC5yZXBsYWNlKC9cXHsoXFxkKyl9L2csIChtYXRjaCwgaW5kZXgpID0+ICghaXNVbmRlZmluZWQoYXJnc1tpbmRleF0pID8gYXJnc1tpbmRleF0gOiBtYXRjaCkpXG4gICAgICA6IHRleHQ7XG4gIH1cbn1cbiJdfQ==