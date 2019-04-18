import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/**
 * FORMS
 */
// Form Directives
import { TdAutoTrimDirective } from './forms/auto-trim/auto-trim.directive';
var TD_FORMS = [
    TdAutoTrimDirective,
];
// Validators
var TD_VALIDATORS = [];
/**
 * PIPES
 */
import { TdTimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { TdTimeDifferencePipe } from './pipes/time-difference/time-difference.pipe';
import { TdTimeUntilPipe } from './pipes/time-until/time-until.pipe';
import { TdBytesPipe } from './pipes/bytes/bytes.pipe';
import { TdDecimalBytesPipe } from './pipes/decimal-bytes/decimal-bytes.pipe';
import { TdDigitsPipe } from './pipes/digits/digits.pipe';
import { TdTruncatePipe } from './pipes/truncate/truncate.pipe';
var TD_PIPES = [
    TdTimeAgoPipe,
    TdTimeDifferencePipe,
    TdTimeUntilPipe,
    TdBytesPipe,
    TdDecimalBytesPipe,
    TdDigitsPipe,
    TdTruncatePipe,
];
/**
 * Services
 */
import { RouterPathService } from './services/router-path.service';
import { IconService } from './services/icon.service';
var CovalentCommonModule = /** @class */ (function () {
    function CovalentCommonModule() {
    }
    CovalentCommonModule = tslib_1.__decorate([
        NgModule({
            imports: [
                FormsModule,
                CommonModule,
            ],
            declarations: [
                TD_FORMS,
                TD_PIPES,
                TD_VALIDATORS,
            ],
            exports: [
                FormsModule,
                CommonModule,
                TD_FORMS,
                TD_PIPES,
                TD_VALIDATORS,
            ],
            providers: [
                RouterPathService,
                IconService,
            ],
        })
    ], CovalentCommonModule);
    return CovalentCommonModule;
}());
export { CovalentCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0M7O0dBRUc7QUFFSCxrQkFBa0I7QUFDbEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFNUUsSUFBTSxRQUFRLEdBQWdCO0lBQzVCLG1CQUFtQjtDQUNwQixDQUFDO0FBRUYsYUFBYTtBQUNiLElBQU0sYUFBYSxHQUFnQixFQUNsQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRWhFLElBQU0sUUFBUSxHQUFnQjtJQUM1QixhQUFhO0lBQ2Isb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixjQUFjO0NBQ2YsQ0FBQztBQUVGOztHQUVHO0FBRUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBd0J0RDtJQUFBO0lBRUEsQ0FBQztJQUZZLG9CQUFvQjtRQXRCaEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFdBQVc7Z0JBQ1gsWUFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixhQUFhO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsV0FBVztnQkFDWCxZQUFZO2dCQUNaLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixhQUFhO2FBQ2Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCO2dCQUNqQixXQUFXO2FBQ1o7U0FDRixDQUFDO09BQ1csb0JBQW9CLENBRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQUZELElBRUM7U0FGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogRk9STVNcbiAqL1xuXG4vLyBGb3JtIERpcmVjdGl2ZXNcbmltcG9ydCB7IFRkQXV0b1RyaW1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm1zL2F1dG8tdHJpbS9hdXRvLXRyaW0uZGlyZWN0aXZlJztcblxuY29uc3QgVERfRk9STVM6IFR5cGU8YW55PltdID0gW1xuICBUZEF1dG9UcmltRGlyZWN0aXZlLFxuXTtcblxuLy8gVmFsaWRhdG9yc1xuY29uc3QgVERfVkFMSURBVE9SUzogVHlwZTxhbnk+W10gPSBbXG5dO1xuXG4vKipcbiAqIFBJUEVTXG4gKi9cbmltcG9ydCB7IFRkVGltZUFnb1BpcGUgfSBmcm9tICcuL3BpcGVzL3RpbWUtYWdvL3RpbWUtYWdvLnBpcGUnO1xuaW1wb3J0IHsgVGRUaW1lRGlmZmVyZW5jZVBpcGUgfSBmcm9tICcuL3BpcGVzL3RpbWUtZGlmZmVyZW5jZS90aW1lLWRpZmZlcmVuY2UucGlwZSc7XG5pbXBvcnQgeyBUZFRpbWVVbnRpbFBpcGUgfSBmcm9tICcuL3BpcGVzL3RpbWUtdW50aWwvdGltZS11bnRpbC5waXBlJztcbmltcG9ydCB7IFRkQnl0ZXNQaXBlIH0gZnJvbSAnLi9waXBlcy9ieXRlcy9ieXRlcy5waXBlJztcbmltcG9ydCB7IFRkRGVjaW1hbEJ5dGVzUGlwZSB9IGZyb20gJy4vcGlwZXMvZGVjaW1hbC1ieXRlcy9kZWNpbWFsLWJ5dGVzLnBpcGUnO1xuaW1wb3J0IHsgVGREaWdpdHNQaXBlIH0gZnJvbSAnLi9waXBlcy9kaWdpdHMvZGlnaXRzLnBpcGUnO1xuaW1wb3J0IHsgVGRUcnVuY2F0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL3RydW5jYXRlL3RydW5jYXRlLnBpcGUnO1xuXG5jb25zdCBURF9QSVBFUzogVHlwZTxhbnk+W10gPSBbXG4gIFRkVGltZUFnb1BpcGUsXG4gIFRkVGltZURpZmZlcmVuY2VQaXBlLFxuICBUZFRpbWVVbnRpbFBpcGUsXG4gIFRkQnl0ZXNQaXBlLFxuICBUZERlY2ltYWxCeXRlc1BpcGUsXG4gIFRkRGlnaXRzUGlwZSxcbiAgVGRUcnVuY2F0ZVBpcGUsXG5dO1xuXG4vKipcbiAqIFNlcnZpY2VzXG4gKi9cblxuaW1wb3J0IHsgUm91dGVyUGF0aFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3JvdXRlci1wYXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWNvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ljb24uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFREX0ZPUk1TLFxuICAgIFREX1BJUEVTLFxuICAgIFREX1ZBTElEQVRPUlMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVERfRk9STVMsXG4gICAgVERfUElQRVMsXG4gICAgVERfVkFMSURBVE9SUyxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUm91dGVyUGF0aFNlcnZpY2UsXG4gICAgSWNvblNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvdmFsZW50Q29tbW9uTW9kdWxlIHtcblxufVxuIl19