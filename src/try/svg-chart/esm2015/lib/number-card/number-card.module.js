import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { CardComponent } from './card.component';
import { CardSeriesComponent } from './card-series.component';
import { NumberCardComponent } from './number-card.component';
let NumberCardModule = class NumberCardModule {
};
NumberCardModule = tslib_1.__decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [
            CardComponent,
            CardSeriesComponent,
            NumberCardComponent
        ],
        exports: [
            CardComponent,
            CardSeriesComponent,
            NumberCardComponent
        ]
    })
], NumberCardModule);
export { NumberCardModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWNhcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvbnVtYmVyLWNhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWU5RCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUFHLENBQUE7QUFBbkIsZ0JBQWdCO0lBYjVCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1FBQzVCLFlBQVksRUFBRTtZQUNaLGFBQWE7WUFDYixtQkFBbUI7WUFDbkIsbUJBQW1CO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsYUFBYTtZQUNiLG1CQUFtQjtZQUNuQixtQkFBbUI7U0FDcEI7S0FDRixDQUFDO0dBQ1csZ0JBQWdCLENBQUc7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FyZFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vY2FyZC1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IE51bWJlckNhcmRDb21wb25lbnQgfSBmcm9tICcuL251bWJlci1jYXJkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcmRDb21wb25lbnQsXG4gICAgQ2FyZFNlcmllc0NvbXBvbmVudCxcbiAgICBOdW1iZXJDYXJkQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYXJkQ29tcG9uZW50LFxuICAgIENhcmRTZXJpZXNDb21wb25lbnQsXG4gICAgTnVtYmVyQ2FyZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckNhcmRNb2R1bGUge31cbiJdfQ==