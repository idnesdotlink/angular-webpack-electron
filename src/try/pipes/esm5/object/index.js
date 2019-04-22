import * as tslib_1 from "tslib";
import { KeysPipe } from './keys';
import { ValuesPipe } from './values';
import { PairsPipe } from './pairs';
import { PickPipe } from './pick';
import { OmitPipe } from './omit';
import { InvertPipe } from './invert';
import { InvertByPipe } from './invert-by';
import { DiffObjPipe } from './diff-obj';
import { NgModule } from '@angular/core';
var OBJECT_PIPES = [KeysPipe, ValuesPipe, PairsPipe, PickPipe, InvertPipe, InvertByPipe, OmitPipe, DiffObjPipe];
var NgObjectPipesModule = /** @class */ (function () {
    function NgObjectPipesModule() {
    }
    NgObjectPipesModule = tslib_1.__decorate([
        NgModule({
            declarations: OBJECT_PIPES,
            imports: [],
            exports: OBJECT_PIPES,
        })
    ], NgObjectPipesModule);
    return NgObjectPipesModule;
}());
export { NgObjectPipesModule };
export { KeysPipe } from './keys';
export { ValuesPipe } from './values';
export { PairsPipe } from './pairs';
export { PickPipe } from './pick';
export { OmitPipe } from './omit';
export { InvertPipe } from './invert';
export { InvertByPipe } from './invert-by';
export { DiffObjPipe } from './diff-obj';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsib2JqZWN0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxJQUFNLFlBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQU9sSDtJQUFBO0lBQWtDLENBQUM7SUFBdEIsbUJBQW1CO1FBTC9CLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxZQUFZO1lBQzFCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLFlBQVk7U0FDdEIsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixtQkFBbUI7QUFFaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS2V5c1BpcGUgfSBmcm9tICcuL2tleXMnO1xuaW1wb3J0IHsgVmFsdWVzUGlwZSB9IGZyb20gJy4vdmFsdWVzJztcbmltcG9ydCB7IFBhaXJzUGlwZSB9IGZyb20gJy4vcGFpcnMnO1xuaW1wb3J0IHsgUGlja1BpcGUgfSBmcm9tICcuL3BpY2snO1xuaW1wb3J0IHsgT21pdFBpcGUgfSBmcm9tICcuL29taXQnO1xuaW1wb3J0IHsgSW52ZXJ0UGlwZSB9IGZyb20gJy4vaW52ZXJ0JztcbmltcG9ydCB7IEludmVydEJ5UGlwZSB9IGZyb20gJy4vaW52ZXJ0LWJ5JztcbmltcG9ydCB7IERpZmZPYmpQaXBlIH0gZnJvbSAnLi9kaWZmLW9iaic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBPQkpFQ1RfUElQRVMgPSBbS2V5c1BpcGUsIFZhbHVlc1BpcGUsIFBhaXJzUGlwZSwgUGlja1BpcGUsIEludmVydFBpcGUsIEludmVydEJ5UGlwZSwgT21pdFBpcGUsIERpZmZPYmpQaXBlXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBPQkpFQ1RfUElQRVMsXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBPQkpFQ1RfUElQRVMsXG59KVxuZXhwb3J0IGNsYXNzIE5nT2JqZWN0UGlwZXNNb2R1bGUge31cblxuZXhwb3J0IHsgS2V5c1BpcGUgfSBmcm9tICcuL2tleXMnO1xuZXhwb3J0IHsgVmFsdWVzUGlwZSB9IGZyb20gJy4vdmFsdWVzJztcbmV4cG9ydCB7IFBhaXJzUGlwZSB9IGZyb20gJy4vcGFpcnMnO1xuZXhwb3J0IHsgUGlja1BpcGUgfSBmcm9tICcuL3BpY2snO1xuZXhwb3J0IHsgT21pdFBpcGUgfSBmcm9tICcuL29taXQnO1xuZXhwb3J0IHsgSW52ZXJ0UGlwZSB9IGZyb20gJy4vaW52ZXJ0JztcbmV4cG9ydCB7IEludmVydEJ5UGlwZSB9IGZyb20gJy4vaW52ZXJ0LWJ5JztcbmV4cG9ydCB7IERpZmZPYmpQaXBlIH0gZnJvbSAnLi9kaWZmLW9iaic7XG4iXX0=