import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextDirective, SliderDirective } from './helpers';
import { ColorPickerService } from './color-picker.service';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDirective } from './color-picker.directive';
import { OverlayModule } from '@angular/cdk/overlay';
var ColorPickerModule = /** @class */ (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, OverlayModule],
            exports: [ColorPickerDirective],
            providers: [ColorPickerService],
            declarations: [ColorPickerComponent, ColorPickerDirective, TextDirective, SliderDirective],
            entryComponents: [ColorPickerComponent]
        })
    ], ColorPickerModule);
    return ColorPickerModule;
}());
export { ColorPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvY29sb3ItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQVNsRDtJQUFBO0lBQWdDLENBQUM7SUFBcEIsaUJBQWlCO1FBUDdCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxhQUFhLENBQUU7WUFDeEMsT0FBTyxFQUFFLENBQUUsb0JBQW9CLENBQUU7WUFDakMsU0FBUyxFQUFFLENBQUUsa0JBQWtCLENBQUU7WUFDakMsWUFBWSxFQUFFLENBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBRTtZQUM1RixlQUFlLEVBQUUsQ0FBRSxvQkFBb0IsQ0FBRTtTQUMxQyxDQUFDO09BQ1csaUJBQWlCLENBQUc7SUFBRCx3QkFBQztDQUFBLEFBQWpDLElBQWlDO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBUZXh0RGlyZWN0aXZlLCBTbGlkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5pbXBvcnQgeyBDb2xvclBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2NvbG9yLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yUGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2xvci1waWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlIF0sXG4gIGV4cG9ydHM6IFsgQ29sb3JQaWNrZXJEaXJlY3RpdmUgXSxcbiAgcHJvdmlkZXJzOiBbIENvbG9yUGlja2VyU2VydmljZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgQ29sb3JQaWNrZXJDb21wb25lbnQsIENvbG9yUGlja2VyRGlyZWN0aXZlLCBUZXh0RGlyZWN0aXZlLCBTbGlkZXJEaXJlY3RpdmUgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIENvbG9yUGlja2VyQ29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJNb2R1bGUge31cbiJdfQ==