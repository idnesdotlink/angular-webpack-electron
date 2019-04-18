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
const OBJECT_PIPES = [KeysPipe, ValuesPipe, PairsPipe, PickPipe, InvertPipe, InvertByPipe, OmitPipe, DiffObjPipe];
let NgObjectPipesModule = class NgObjectPipesModule {
};
NgObjectPipesModule = tslib_1.__decorate([
    NgModule({
        declarations: OBJECT_PIPES,
        imports: [],
        exports: OBJECT_PIPES,
    })
], NgObjectPipesModule);
export { NgObjectPipesModule };
export { KeysPipe } from './keys';
export { ValuesPipe } from './values';
export { PairsPipe } from './pairs';
export { PickPipe } from './pick';
export { OmitPipe } from './omit';
export { InvertPipe } from './invert';
export { InvertByPipe } from './invert-by';
export { DiffObjPipe } from './diff-obj';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsib2JqZWN0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQU9sSCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtDQUFHLENBQUE7QUFBdEIsbUJBQW1CO0lBTC9CLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxZQUFZO1FBQzFCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLFlBQVk7S0FDdEIsQ0FBQztHQUNXLG1CQUFtQixDQUFHO1NBQXRCLG1CQUFtQjtBQUVoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLZXlzUGlwZSB9IGZyb20gJy4va2V5cyc7XG5pbXBvcnQgeyBWYWx1ZXNQaXBlIH0gZnJvbSAnLi92YWx1ZXMnO1xuaW1wb3J0IHsgUGFpcnNQaXBlIH0gZnJvbSAnLi9wYWlycyc7XG5pbXBvcnQgeyBQaWNrUGlwZSB9IGZyb20gJy4vcGljayc7XG5pbXBvcnQgeyBPbWl0UGlwZSB9IGZyb20gJy4vb21pdCc7XG5pbXBvcnQgeyBJbnZlcnRQaXBlIH0gZnJvbSAnLi9pbnZlcnQnO1xuaW1wb3J0IHsgSW52ZXJ0QnlQaXBlIH0gZnJvbSAnLi9pbnZlcnQtYnknO1xuaW1wb3J0IHsgRGlmZk9ialBpcGUgfSBmcm9tICcuL2RpZmYtb2JqJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IE9CSkVDVF9QSVBFUyA9IFtLZXlzUGlwZSwgVmFsdWVzUGlwZSwgUGFpcnNQaXBlLCBQaWNrUGlwZSwgSW52ZXJ0UGlwZSwgSW52ZXJ0QnlQaXBlLCBPbWl0UGlwZSwgRGlmZk9ialBpcGVdO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IE9CSkVDVF9QSVBFUyxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IE9CSkVDVF9QSVBFUyxcbn0pXG5leHBvcnQgY2xhc3MgTmdPYmplY3RQaXBlc01vZHVsZSB7fVxuXG5leHBvcnQgeyBLZXlzUGlwZSB9IGZyb20gJy4va2V5cyc7XG5leHBvcnQgeyBWYWx1ZXNQaXBlIH0gZnJvbSAnLi92YWx1ZXMnO1xuZXhwb3J0IHsgUGFpcnNQaXBlIH0gZnJvbSAnLi9wYWlycyc7XG5leHBvcnQgeyBQaWNrUGlwZSB9IGZyb20gJy4vcGljayc7XG5leHBvcnQgeyBPbWl0UGlwZSB9IGZyb20gJy4vb21pdCc7XG5leHBvcnQgeyBJbnZlcnRQaXBlIH0gZnJvbSAnLi9pbnZlcnQnO1xuZXhwb3J0IHsgSW52ZXJ0QnlQaXBlIH0gZnJvbSAnLi9pbnZlcnQtYnknO1xuZXhwb3J0IHsgRGlmZk9ialBpcGUgfSBmcm9tICcuL2RpZmYtb2JqJztcbiJdfQ==