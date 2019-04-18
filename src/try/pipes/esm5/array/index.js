import * as tslib_1 from "tslib";
import { DiffPipe } from './diff';
import { InitialPipe } from './initial';
import { FlattenPipe } from './flatten';
import { IntersectionPipe } from './intersection';
import { ReversePipe } from './reverse';
import { TailPipe } from './tail';
import { TrurthifyPipe } from './truthify';
import { UnionPipe } from './union';
import { UniquePipe } from './unique';
import { WithoutPipe } from './without';
import { PluckPipe } from './pluck';
import { ShufflePipe } from './shuffle';
import { EveryPipe } from './every';
import { SomePipe } from './some';
import { SamplePipe } from './sample';
import { GroupByPipe } from './group-by';
import { FilterByPipe } from './filter-by';
import { OrderByPipe } from './order-by';
import { NgModule } from '@angular/core';
import { GroupByImpurePipe } from './group-by-impure';
import { FilterByImpurePipe } from './filter-by-impure';
import { OrderByImpurePipe } from './order-by-impure';
import { RangePipe } from './range';
var ARRAY_PIPES = [
    DiffPipe,
    FlattenPipe,
    InitialPipe,
    IntersectionPipe,
    ReversePipe,
    TailPipe,
    TrurthifyPipe,
    UnionPipe,
    UniquePipe,
    WithoutPipe,
    PluckPipe,
    ShufflePipe,
    EveryPipe,
    SomePipe,
    SamplePipe,
    GroupByPipe,
    GroupByImpurePipe,
    FilterByPipe,
    FilterByImpurePipe,
    OrderByPipe,
    OrderByImpurePipe,
    RangePipe,
];
var NgArrayPipesModule = /** @class */ (function () {
    function NgArrayPipesModule() {
    }
    NgArrayPipesModule = tslib_1.__decorate([
        NgModule({
            declarations: ARRAY_PIPES,
            imports: [],
            exports: ARRAY_PIPES,
        })
    ], NgArrayPipesModule);
    return NgArrayPipesModule;
}());
export { NgArrayPipesModule };
export { DiffPipe } from './diff';
export { InitialPipe } from './initial';
export { FlattenPipe } from './flatten';
export { IntersectionPipe } from './intersection';
export { ReversePipe } from './reverse';
export { TailPipe } from './tail';
export { TrurthifyPipe } from './truthify';
export { UnionPipe } from './union';
export { UniquePipe } from './unique';
export { WithoutPipe } from './without';
export { PluckPipe } from './pluck';
export { ShufflePipe } from './shuffle';
export { EveryPipe } from './every';
export { SomePipe } from './some';
export { SamplePipe } from './sample';
export { GroupByPipe } from './group-by';
export { FilterByPipe } from './filter-by';
export { OrderByPipe } from './order-by';
export { GroupByImpurePipe } from './group-by-impure';
export { FilterByImpurePipe } from './filter-by-impure';
export { OrderByImpurePipe } from './order-by-impure';
export { RangePipe } from './range';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFcEMsSUFBTSxXQUFXLEdBQUc7SUFDbEIsUUFBUTtJQUNSLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxRQUFRO0lBQ1IsYUFBYTtJQUNiLFNBQVM7SUFDVCxVQUFVO0lBQ1YsV0FBVztJQUNYLFNBQVM7SUFDVCxXQUFXO0lBQ1gsU0FBUztJQUNULFFBQVE7SUFDUixVQUFVO0lBQ1YsV0FBVztJQUNYLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsU0FBUztDQUNWLENBQUM7QUFPRjtJQUFBO0lBQWlDLENBQUM7SUFBckIsa0JBQWtCO1FBTDlCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxXQUFXO1lBQ3pCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLFdBQVc7U0FDckIsQ0FBQztPQUNXLGtCQUFrQixDQUFHO0lBQUQseUJBQUM7Q0FBQSxBQUFsQyxJQUFrQztTQUFyQixrQkFBa0I7QUFFL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaWZmUGlwZSB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQgeyBJbml0aWFsUGlwZSB9IGZyb20gJy4vaW5pdGlhbCc7XG5pbXBvcnQgeyBGbGF0dGVuUGlwZSB9IGZyb20gJy4vZmxhdHRlbic7XG5pbXBvcnQgeyBJbnRlcnNlY3Rpb25QaXBlIH0gZnJvbSAnLi9pbnRlcnNlY3Rpb24nO1xuaW1wb3J0IHsgUmV2ZXJzZVBpcGUgfSBmcm9tICcuL3JldmVyc2UnO1xuaW1wb3J0IHsgVGFpbFBpcGUgfSBmcm9tICcuL3RhaWwnO1xuaW1wb3J0IHsgVHJ1cnRoaWZ5UGlwZSB9IGZyb20gJy4vdHJ1dGhpZnknO1xuaW1wb3J0IHsgVW5pb25QaXBlIH0gZnJvbSAnLi91bmlvbic7XG5pbXBvcnQgeyBVbmlxdWVQaXBlIH0gZnJvbSAnLi91bmlxdWUnO1xuaW1wb3J0IHsgV2l0aG91dFBpcGUgfSBmcm9tICcuL3dpdGhvdXQnO1xuaW1wb3J0IHsgUGx1Y2tQaXBlIH0gZnJvbSAnLi9wbHVjayc7XG5pbXBvcnQgeyBTaHVmZmxlUGlwZSB9IGZyb20gJy4vc2h1ZmZsZSc7XG5pbXBvcnQgeyBFdmVyeVBpcGUgfSBmcm9tICcuL2V2ZXJ5JztcbmltcG9ydCB7IFNvbWVQaXBlIH0gZnJvbSAnLi9zb21lJztcbmltcG9ydCB7IFNhbXBsZVBpcGUgfSBmcm9tICcuL3NhbXBsZSc7XG5pbXBvcnQgeyBHcm91cEJ5UGlwZSB9IGZyb20gJy4vZ3JvdXAtYnknO1xuaW1wb3J0IHsgRmlsdGVyQnlQaXBlIH0gZnJvbSAnLi9maWx0ZXItYnknO1xuaW1wb3J0IHsgT3JkZXJCeVBpcGUgfSBmcm9tICcuL29yZGVyLWJ5JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcm91cEJ5SW1wdXJlUGlwZSB9IGZyb20gJy4vZ3JvdXAtYnktaW1wdXJlJztcbmltcG9ydCB7IEZpbHRlckJ5SW1wdXJlUGlwZSB9IGZyb20gJy4vZmlsdGVyLWJ5LWltcHVyZSc7XG5pbXBvcnQgeyBPcmRlckJ5SW1wdXJlUGlwZSB9IGZyb20gJy4vb3JkZXItYnktaW1wdXJlJztcbmltcG9ydCB7IFJhbmdlUGlwZSB9IGZyb20gJy4vcmFuZ2UnO1xuXG5jb25zdCBBUlJBWV9QSVBFUyA9IFtcbiAgRGlmZlBpcGUsXG4gIEZsYXR0ZW5QaXBlLFxuICBJbml0aWFsUGlwZSxcbiAgSW50ZXJzZWN0aW9uUGlwZSxcbiAgUmV2ZXJzZVBpcGUsXG4gIFRhaWxQaXBlLFxuICBUcnVydGhpZnlQaXBlLFxuICBVbmlvblBpcGUsXG4gIFVuaXF1ZVBpcGUsXG4gIFdpdGhvdXRQaXBlLFxuICBQbHVja1BpcGUsXG4gIFNodWZmbGVQaXBlLFxuICBFdmVyeVBpcGUsXG4gIFNvbWVQaXBlLFxuICBTYW1wbGVQaXBlLFxuICBHcm91cEJ5UGlwZSxcbiAgR3JvdXBCeUltcHVyZVBpcGUsXG4gIEZpbHRlckJ5UGlwZSxcbiAgRmlsdGVyQnlJbXB1cmVQaXBlLFxuICBPcmRlckJ5UGlwZSxcbiAgT3JkZXJCeUltcHVyZVBpcGUsXG4gIFJhbmdlUGlwZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogQVJSQVlfUElQRVMsXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBBUlJBWV9QSVBFUyxcbn0pXG5leHBvcnQgY2xhc3MgTmdBcnJheVBpcGVzTW9kdWxlIHt9XG5cbmV4cG9ydCB7IERpZmZQaXBlIH0gZnJvbSAnLi9kaWZmJztcbmV4cG9ydCB7IEluaXRpYWxQaXBlIH0gZnJvbSAnLi9pbml0aWFsJztcbmV4cG9ydCB7IEZsYXR0ZW5QaXBlIH0gZnJvbSAnLi9mbGF0dGVuJztcbmV4cG9ydCB7IEludGVyc2VjdGlvblBpcGUgfSBmcm9tICcuL2ludGVyc2VjdGlvbic7XG5leHBvcnQgeyBSZXZlcnNlUGlwZSB9IGZyb20gJy4vcmV2ZXJzZSc7XG5leHBvcnQgeyBUYWlsUGlwZSB9IGZyb20gJy4vdGFpbCc7XG5leHBvcnQgeyBUcnVydGhpZnlQaXBlIH0gZnJvbSAnLi90cnV0aGlmeSc7XG5leHBvcnQgeyBVbmlvblBpcGUgfSBmcm9tICcuL3VuaW9uJztcbmV4cG9ydCB7IFVuaXF1ZVBpcGUgfSBmcm9tICcuL3VuaXF1ZSc7XG5leHBvcnQgeyBXaXRob3V0UGlwZSB9IGZyb20gJy4vd2l0aG91dCc7XG5leHBvcnQgeyBQbHVja1BpcGUgfSBmcm9tICcuL3BsdWNrJztcbmV4cG9ydCB7IFNodWZmbGVQaXBlIH0gZnJvbSAnLi9zaHVmZmxlJztcbmV4cG9ydCB7IEV2ZXJ5UGlwZSB9IGZyb20gJy4vZXZlcnknO1xuZXhwb3J0IHsgU29tZVBpcGUgfSBmcm9tICcuL3NvbWUnO1xuZXhwb3J0IHsgU2FtcGxlUGlwZSB9IGZyb20gJy4vc2FtcGxlJztcbmV4cG9ydCB7IEdyb3VwQnlQaXBlIH0gZnJvbSAnLi9ncm91cC1ieSc7XG5leHBvcnQgeyBGaWx0ZXJCeVBpcGUgfSBmcm9tICcuL2ZpbHRlci1ieSc7XG5leHBvcnQgeyBPcmRlckJ5UGlwZSB9IGZyb20gJy4vb3JkZXItYnknO1xuZXhwb3J0IHsgR3JvdXBCeUltcHVyZVBpcGUgfSBmcm9tICcuL2dyb3VwLWJ5LWltcHVyZSc7XG5leHBvcnQgeyBGaWx0ZXJCeUltcHVyZVBpcGUgfSBmcm9tICcuL2ZpbHRlci1ieS1pbXB1cmUnO1xuZXhwb3J0IHsgT3JkZXJCeUltcHVyZVBpcGUgfSBmcm9tICcuL29yZGVyLWJ5LWltcHVyZSc7XG5leHBvcnQgeyBSYW5nZVBpcGUgfSBmcm9tICcuL3JhbmdlJztcbiJdfQ==