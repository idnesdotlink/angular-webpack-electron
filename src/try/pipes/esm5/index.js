import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { NgArrayPipesModule } from './array/index';
import { NgObjectPipesModule } from './object/index';
import { NgStringPipesModule } from './string/index';
import { NgMathPipesModule } from './math/index';
import { NgBooleanPipesModule } from './boolean/index';
var NgPipesModule = /** @class */ (function () {
    function NgPipesModule() {
    }
    NgPipesModule = tslib_1.__decorate([
        NgModule({
            exports: [NgArrayPipesModule, NgStringPipesModule, NgMathPipesModule, NgBooleanPipesModule, NgObjectPipesModule],
        })
    ], NgPipesModule);
    return NgPipesModule;
}());
export { NgPipesModule };
export * from './array/index';
export * from './object/index';
export * from './string/index';
export * from './math/index';
export * from './boolean/index';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUt2RDtJQUFBO0lBQTRCLENBQUM7SUFBaEIsYUFBYTtRQUh6QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQztTQUNqSCxDQUFDO09BQ1csYUFBYSxDQUFHO0lBQUQsb0JBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixhQUFhO0FBRTFCLGNBQWMsZUFBZSxDQUFDO0FBQzlCLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGNBQWMsQ0FBQztBQUM3QixjQUFjLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQXJyYXlQaXBlc01vZHVsZSB9IGZyb20gJy4vYXJyYXkvaW5kZXgnO1xuaW1wb3J0IHsgTmdPYmplY3RQaXBlc01vZHVsZSB9IGZyb20gJy4vb2JqZWN0L2luZGV4JztcbmltcG9ydCB7IE5nU3RyaW5nUGlwZXNNb2R1bGUgfSBmcm9tICcuL3N0cmluZy9pbmRleCc7XG5pbXBvcnQgeyBOZ01hdGhQaXBlc01vZHVsZSB9IGZyb20gJy4vbWF0aC9pbmRleCc7XG5pbXBvcnQgeyBOZ0Jvb2xlYW5QaXBlc01vZHVsZSB9IGZyb20gJy4vYm9vbGVhbi9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtOZ0FycmF5UGlwZXNNb2R1bGUsIE5nU3RyaW5nUGlwZXNNb2R1bGUsIE5nTWF0aFBpcGVzTW9kdWxlLCBOZ0Jvb2xlYW5QaXBlc01vZHVsZSwgTmdPYmplY3RQaXBlc01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUGlwZXNNb2R1bGUge31cblxuZXhwb3J0ICogZnJvbSAnLi9hcnJheS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL29iamVjdC9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3N0cmluZy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL21hdGgvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9ib29sZWFuL2luZGV4JztcbiJdfQ==