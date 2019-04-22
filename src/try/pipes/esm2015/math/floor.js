import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let FloorPipe = class FloorPipe {
    transform(num, precision = 0) {
        if (precision <= 0) {
            return Math.floor(num);
        }
        const tho = Math.pow(10, precision);
        return Math.floor(num * tho) / tho;
    }
};
FloorPipe = tslib_1.__decorate([
    Pipe({ name: 'floor' })
], FloorPipe);
export { FloorPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsibWF0aC9mbG9vci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUNwQixTQUFTLENBQUMsR0FBVyxFQUFFLFlBQW9CLENBQUM7UUFDMUMsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUVELE1BQU0sR0FBRyxHQUFHLFNBQUEsRUFBRSxFQUFJLFNBQVMsQ0FBQSxDQUFDO1FBRTVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JDLENBQUM7Q0FDRixDQUFBO0FBVlksU0FBUztJQURyQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7R0FDWCxTQUFTLENBVXJCO1NBVlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnZmxvb3InIH0pXG5leHBvcnQgY2xhc3MgRmxvb3JQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShudW06IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICBpZiAocHJlY2lzaW9uIDw9IDApIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGhvID0gMTAgKiogcHJlY2lzaW9uO1xuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogdGhvKSAvIHRobztcbiAgfVxufVxuIl19