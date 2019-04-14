import * as tslib_1 from "tslib";
var MarkdownModule_1;
import { NgModule } from '@angular/core';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';
export const initialMarkedOptions = {
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
const sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
let MarkdownModule = MarkdownModule_1 = class MarkdownModule {
    static forRoot(markdownModuleConfig) {
        return {
            ngModule: MarkdownModule_1,
            providers: [
                MarkdownService,
                ...(markdownModuleConfig
                    ? [
                        markdownModuleConfig.loader || [],
                        markdownModuleConfig.markedOptions || initialMarkedOptions,
                    ]
                    : [initialMarkedOptions]),
            ],
        };
    }
    static forChild() {
        return {
            ngModule: MarkdownModule_1,
        };
    }
};
MarkdownModule = MarkdownModule_1 = tslib_1.__decorate([
    NgModule({
        exports: [
            ...sharedDeclarations,
        ],
        declarations: [
            ...sharedDeclarations,
        ],
    })
], MarkdownModule);
export { MarkdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9tYXJrLWRvd24vIiwic291cmNlcyI6WyJsaWIvbWFya2Rvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBV2pELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFhO0lBQzVDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxJQUFJO1FBQ1QsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQUUsSUFBSTtRQUNoQixXQUFXLEVBQUUsS0FBSztLQUNuQjtDQUNGLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHO0lBQ3pCLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsWUFBWTtDQUNiLENBQUM7QUFVRixJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUEyQztRQUN4RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEdBQUcsQ0FBQyxvQkFBb0I7b0JBQ3RCLENBQUMsQ0FBQzt3QkFDRSxvQkFBb0IsQ0FBQyxNQUFNLElBQUksRUFBRTt3QkFDakMsb0JBQW9CLENBQUMsYUFBYSxJQUFJLG9CQUFvQjtxQkFDM0Q7b0JBQ0gsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUM1QjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1NBQ3pCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXJCWSxjQUFjO0lBUjFCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLEdBQUcsa0JBQWtCO1NBQ3RCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osR0FBRyxrQkFBa0I7U0FDdEI7S0FDRixDQUFDO0dBQ1csY0FBYyxDQXFCMUI7U0FyQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYW5ndWFnZVBpcGUgfSBmcm9tICcuL2xhbmd1YWdlLnBpcGUnO1xuaW1wb3J0IHsgTWFya2Rvd25Db21wb25lbnQgfSBmcm9tICcuL21hcmtkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZG93blBpcGUgfSBmcm9tICcuL21hcmtkb3duLnBpcGUnO1xuaW1wb3J0IHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlZE9wdGlvbnMgfSBmcm9tICcuL21hcmtlZC1vcHRpb25zJztcblxuLy8gaGF2aW5nIGEgZGVwZW5kZW5jeSBvbiBgSHR0cENsaWVudE1vZHVsZWAgd2l0aGluIGEgbGlicmFyeVxuLy8gYnJlYWtzIGFsbCB0aGUgaW50ZXJjZXB0b3JzIGZyb20gdGhlIGFwcCBjb25zdW1pbmcgdGhlIGxpYnJhcnlcbi8vIGhlcmUsIHdlIGV4cGxpY2l0ZWx5IGFzayB0aGUgdXNlciB0byBwYXNzIGEgcHJvdmlkZXIgd2l0aFxuLy8gdGhlaXIgb3duIGluc3RhbmNlIG9mIGBIdHRwQ2xpZW50TW9kdWxlYFxuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bk1vZHVsZUNvbmZpZyB7XG4gIGxvYWRlcj86IFByb3ZpZGVyO1xuICBtYXJrZWRPcHRpb25zPzogUHJvdmlkZXI7XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsTWFya2VkT3B0aW9uczogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE1hcmtlZE9wdGlvbnMsXG4gIHVzZVZhbHVlOiB7XG4gICAgZ2ZtOiB0cnVlLFxuICAgIHRhYmxlczogdHJ1ZSxcbiAgICBicmVha3M6IGZhbHNlLFxuICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgc21hcnRMaXN0czogdHJ1ZSxcbiAgICBzbWFydHlwYW50czogZmFsc2UsXG4gIH0sXG59O1xuXG5jb25zdCBzaGFyZWREZWNsYXJhdGlvbnMgPSBbXG4gIExhbmd1YWdlUGlwZSxcbiAgTWFya2Rvd25Db21wb25lbnQsXG4gIE1hcmtkb3duUGlwZSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICAuLi5zaGFyZWREZWNsYXJhdGlvbnMsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLnNoYXJlZERlY2xhcmF0aW9ucyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChtYXJrZG93bk1vZHVsZUNvbmZpZz86IE1hcmtkb3duTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXJrZG93bk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNYXJrZG93blNlcnZpY2UsXG4gICAgICAgIC4uLihtYXJrZG93bk1vZHVsZUNvbmZpZ1xuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBtYXJrZG93bk1vZHVsZUNvbmZpZy5sb2FkZXIgfHwgW10sXG4gICAgICAgICAgICAgIG1hcmtkb3duTW9kdWxlQ29uZmlnLm1hcmtlZE9wdGlvbnMgfHwgaW5pdGlhbE1hcmtlZE9wdGlvbnMsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBbaW5pdGlhbE1hcmtlZE9wdGlvbnNdKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hcmtkb3duTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==