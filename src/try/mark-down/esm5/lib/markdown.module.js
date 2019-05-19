import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';
export var initialMarkedOptions = {
    provide: MarkedOptions,
    useValue: {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    },
};
var sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
var MarkdownModule = /** @class */ (function () {
    function MarkdownModule() {
    }
    MarkdownModule_1 = MarkdownModule;
    MarkdownModule.forRoot = function (markdownModuleConfig) {
        return {
            ngModule: MarkdownModule_1,
            providers: tslib_1.__spread([
                MarkdownService
            ], (markdownModuleConfig
                ? [
                    markdownModuleConfig.loader || [],
                    markdownModuleConfig.markedOptions || initialMarkedOptions,
                ]
                : [initialMarkedOptions])),
        };
    };
    MarkdownModule.forChild = function () {
        return {
            ngModule: MarkdownModule_1,
        };
    };
    var MarkdownModule_1;
    MarkdownModule = MarkdownModule_1 = tslib_1.__decorate([
        NgModule({
            exports: tslib_1.__spread(sharedDeclarations),
            declarations: tslib_1.__spread(sharedDeclarations),
        })
    ], MarkdownModule);
    return MarkdownModule;
}());
export { MarkdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9tYXJrLWRvd24vIiwic291cmNlcyI6WyJsaWIvbWFya2Rvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUV4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFXakQsTUFBTSxDQUFDLElBQU0sb0JBQW9CLEdBQWE7SUFDNUMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFLElBQUk7UUFDVCxNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFdBQVcsRUFBRSxLQUFLO0tBQ25CO0NBQ0YsQ0FBQztBQUVGLElBQU0sa0JBQWtCLEdBQUc7SUFDekIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixZQUFZO0NBQ2IsQ0FBQztBQVVGO0lBQUE7SUFxQkEsQ0FBQzt1QkFyQlksY0FBYztJQUNsQixzQkFBTyxHQUFkLFVBQWUsb0JBQTJDO1FBQ3hELE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7WUFDeEIsU0FBUztnQkFDUCxlQUFlO2VBQ1osQ0FBQyxvQkFBb0I7Z0JBQ3RCLENBQUMsQ0FBQztvQkFDRSxvQkFBb0IsQ0FBQyxNQUFNLElBQUksRUFBRTtvQkFDakMsb0JBQW9CLENBQUMsYUFBYSxJQUFJLG9CQUFvQjtpQkFDM0Q7Z0JBQ0gsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUM1QjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRU0sdUJBQVEsR0FBZjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7U0FDekIsQ0FBQztJQUNKLENBQUM7O0lBcEJVLGNBQWM7UUFSMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxtQkFDRixrQkFBa0IsQ0FDdEI7WUFDRCxZQUFZLG1CQUNQLGtCQUFrQixDQUN0QjtTQUNGLENBQUM7T0FDVyxjQUFjLENBcUIxQjtJQUFELHFCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYW5ndWFnZVBpcGUgfSBmcm9tICcuL2xhbmd1YWdlLnBpcGUnO1xuaW1wb3J0IHsgTWFya2Rvd25Db21wb25lbnQgfSBmcm9tICcuL21hcmtkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZG93blBpcGUgfSBmcm9tICcuL21hcmtkb3duLnBpcGUnO1xuaW1wb3J0IHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlZE9wdGlvbnMgfSBmcm9tICcuL21hcmtlZC1vcHRpb25zJztcblxuLy8gaGF2aW5nIGEgZGVwZW5kZW5jeSBvbiBgSHR0cENsaWVudE1vZHVsZWAgd2l0aGluIGEgbGlicmFyeVxuLy8gYnJlYWtzIGFsbCB0aGUgaW50ZXJjZXB0b3JzIGZyb20gdGhlIGFwcCBjb25zdW1pbmcgdGhlIGxpYnJhcnlcbi8vIGhlcmUsIHdlIGV4cGxpY2l0ZWx5IGFzayB0aGUgdXNlciB0byBwYXNzIGEgcHJvdmlkZXIgd2l0aFxuLy8gdGhlaXIgb3duIGluc3RhbmNlIG9mIGBIdHRwQ2xpZW50TW9kdWxlYFxuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bk1vZHVsZUNvbmZpZyB7XG4gIGxvYWRlcj86IFByb3ZpZGVyO1xuICBtYXJrZWRPcHRpb25zPzogUHJvdmlkZXI7XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsTWFya2VkT3B0aW9uczogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE1hcmtlZE9wdGlvbnMsXG4gIHVzZVZhbHVlOiB7XG4gICAgZ2ZtOiB0cnVlLFxuICAgIHRhYmxlczogdHJ1ZSxcbiAgICBicmVha3M6IGZhbHNlLFxuICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgc21hcnRMaXN0czogdHJ1ZSxcbiAgICBzbWFydHlwYW50czogZmFsc2UsXG4gIH0sXG59O1xuXG5jb25zdCBzaGFyZWREZWNsYXJhdGlvbnMgPSBbXG4gIExhbmd1YWdlUGlwZSxcbiAgTWFya2Rvd25Db21wb25lbnQsXG4gIE1hcmtkb3duUGlwZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICAuLi5zaGFyZWREZWNsYXJhdGlvbnMsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLnNoYXJlZERlY2xhcmF0aW9ucyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChtYXJrZG93bk1vZHVsZUNvbmZpZz86IE1hcmtkb3duTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXJrZG93bk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNYXJrZG93blNlcnZpY2UsXG4gICAgICAgIC4uLihtYXJrZG93bk1vZHVsZUNvbmZpZ1xuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBtYXJrZG93bk1vZHVsZUNvbmZpZy5sb2FkZXIgfHwgW10sXG4gICAgICAgICAgICAgIG1hcmtkb3duTW9kdWxlQ29uZmlnLm1hcmtlZE9wdGlvbnMgfHwgaW5pdGlhbE1hcmtlZE9wdGlvbnMsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBbaW5pdGlhbE1hcmtlZE9wdGlvbnNdKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hcmtkb3duTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==