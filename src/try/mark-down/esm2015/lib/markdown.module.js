import * as tslib_1 from "tslib";
var MarkdownModule_1;
import { NgModule } from '@angular/core';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';
const ɵ0 = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
};
export const initialMarkedOptions = {
    provide: MarkedOptions,
    useValue: ɵ0,
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9tYXJrLWRvd24vIiwic291cmNlcyI6WyJsaWIvbWFya2Rvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO1dBYXJDO0lBQ1IsR0FBRyxFQUFFLElBQUk7SUFDVCxNQUFNLEVBQUUsSUFBSTtJQUNaLE1BQU0sRUFBRSxLQUFLO0lBQ2IsUUFBUSxFQUFFLEtBQUs7SUFDZixRQUFRLEVBQUUsS0FBSztJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFdBQVcsRUFBRSxLQUFLO0NBQ25CO0FBVkgsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWE7SUFDNUMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsUUFBUSxJQVFQO0NBQ0YsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUc7SUFDekIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixZQUFZO0NBQ2IsQ0FBQztBQVVGLElBQWEsY0FBYyxzQkFBM0IsTUFBYSxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQTJDO1FBQ3hELE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2YsR0FBRyxDQUFDLG9CQUFvQjtvQkFDdEIsQ0FBQyxDQUFDO3dCQUNFLG9CQUFvQixDQUFDLE1BQU0sSUFBSSxFQUFFO3dCQUNqQyxvQkFBb0IsQ0FBQyxhQUFhLElBQUksb0JBQW9CO3FCQUMzRDtvQkFDSCxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQzVCO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNiLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWM7U0FDekIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBckJZLGNBQWM7SUFSMUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsR0FBRyxrQkFBa0I7U0FDdEI7UUFDRCxZQUFZLEVBQUU7WUFDWixHQUFHLGtCQUFrQjtTQUN0QjtLQUNGLENBQUM7R0FDVyxjQUFjLENBcUIxQjtTQXJCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExhbmd1YWdlUGlwZSB9IGZyb20gJy4vbGFuZ3VhZ2UucGlwZSc7XG5pbXBvcnQgeyBNYXJrZG93bkNvbXBvbmVudCB9IGZyb20gJy4vbWFya2Rvd24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtkb3duUGlwZSB9IGZyb20gJy4vbWFya2Rvd24ucGlwZSc7XG5pbXBvcnQgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICcuL21hcmtkb3duLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VkT3B0aW9ucyB9IGZyb20gJy4vbWFya2VkLW9wdGlvbnMnO1xuXG4vLyBoYXZpbmcgYSBkZXBlbmRlbmN5IG9uIGBIdHRwQ2xpZW50TW9kdWxlYCB3aXRoaW4gYSBsaWJyYXJ5XG4vLyBicmVha3MgYWxsIHRoZSBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgYXBwIGNvbnN1bWluZyB0aGUgbGlicmFyeVxuLy8gaGVyZSwgd2UgZXhwbGljaXRlbHkgYXNrIHRoZSB1c2VyIHRvIHBhc3MgYSBwcm92aWRlciB3aXRoXG4vLyB0aGVpciBvd24gaW5zdGFuY2Ugb2YgYEh0dHBDbGllbnRNb2R1bGVgXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duTW9kdWxlQ29uZmlnIHtcbiAgbG9hZGVyPzogUHJvdmlkZXI7XG4gIG1hcmtlZE9wdGlvbnM/OiBQcm92aWRlcjtcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxNYXJrZWRPcHRpb25zOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTWFya2VkT3B0aW9ucyxcbiAgdXNlVmFsdWU6IHtcbiAgICBnZm06IHRydWUsXG4gICAgdGFibGVzOiB0cnVlLFxuICAgIGJyZWFrczogZmFsc2UsXG4gICAgcGVkYW50aWM6IGZhbHNlLFxuICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICBzbWFydExpc3RzOiB0cnVlLFxuICAgIHNtYXJ0eXBhbnRzOiBmYWxzZSxcbiAgfSxcbn07XG5cbmNvbnN0IHNoYXJlZERlY2xhcmF0aW9ucyA9IFtcbiAgTGFuZ3VhZ2VQaXBlLFxuICBNYXJrZG93bkNvbXBvbmVudCxcbiAgTWFya2Rvd25QaXBlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1xuICAgIC4uLnNoYXJlZERlY2xhcmF0aW9ucyxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLi4uc2hhcmVkRGVjbGFyYXRpb25zLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZG93bk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1hcmtkb3duTW9kdWxlQ29uZmlnPzogTWFya2Rvd25Nb2R1bGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hcmtkb3duTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1hcmtkb3duU2VydmljZSxcbiAgICAgICAgLi4uKG1hcmtkb3duTW9kdWxlQ29uZmlnXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIG1hcmtkb3duTW9kdWxlQ29uZmlnLmxvYWRlciB8fCBbXSxcbiAgICAgICAgICAgICAgbWFya2Rvd25Nb2R1bGVDb25maWcubWFya2VkT3B0aW9ucyB8fCBpbml0aWFsTWFya2VkT3B0aW9ucyxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IFtpbml0aWFsTWFya2VkT3B0aW9uc10pLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWFya2Rvd25Nb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuIl19