import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
export var Colors;
(function (Colors) {
    Colors["primary"] = "primary";
    Colors["accent"] = "accent";
    Colors["warn"] = "warn";
})(Colors || (Colors = {}));
export var Criteria;
(function (Criteria) {
    Criteria[Criteria["at_least_eight_chars"] = 0] = "at_least_eight_chars";
    Criteria[Criteria["at_least_one_lower_case_char"] = 1] = "at_least_one_lower_case_char";
    Criteria[Criteria["at_least_one_upper_case_char"] = 2] = "at_least_one_upper_case_char";
    Criteria[Criteria["at_least_one_digit_char"] = 3] = "at_least_one_digit_char";
    Criteria[Criteria["at_least_one_special_char"] = 4] = "at_least_one_special_char";
})(Criteria || (Criteria = {}));
let MatPasswordStrengthComponent = class MatPasswordStrengthComponent {
    constructor() {
        this.validators = Object.keys(Criteria).map(key => Criteria[key]);
        this.enableLengthRule = true;
        this.enableLowerCaseLetterRule = true;
        this.enableUpperCaseLetterRule = true;
        this.enableDigitRule = true;
        this.enableSpecialCharRule = true;
        this.min = 8;
        this.max = 30;
        this.onStrengthChanged = new EventEmitter();
        this.criteriaMap = new Map();
        this.passwordFormControl = new FormControl();
        this._strength = 0;
    }
    ngOnInit() {
        this.setRulesAndValidators();
        if (this.password) {
            this.calculatePasswordStrength();
        }
    }
    ngOnChanges(changes) {
        if ((changes.externalError && changes.externalError.firstChange) || changes.password.isFirstChange()) {
            return;
        }
        else if (changes.externalError && changes.externalError.currentValue) {
            this._color = Colors.warn;
            return;
        }
        else if (changes.password.previousValue === changes.password.currentValue && !changes.password.firstChange) {
            this.calculatePasswordStrength();
        }
        else {
            this.password && this.password.length > 0 ?
                this.calculatePasswordStrength() : this.reset();
        }
    }
    get strength() {
        return this._strength ? this._strength : 0;
    }
    get color() {
        if (this._strength <= 20) {
            return Colors.warn;
        }
        else if (this._strength <= 80) {
            return Colors.accent;
        }
        else {
            return Colors.primary;
        }
    }
    _containAtLeastMinChars() {
        this.containAtLeastMinChars = this.password.length >= this.min;
        return this.containAtLeastMinChars;
    }
    _containAtLeastOneLowerCaseLetter() {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_lower_case_char)
                .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    }
    _containAtLeastOneUpperCaseLetter() {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_upper_case_char)
                .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    }
    _containAtLeastOneDigit() {
        this.containAtLeastOneDigit =
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char)
                .test(this.password);
        return this.containAtLeastOneDigit;
    }
    _containAtLeastOneSpecialChar() {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
                .get(Criteria.at_least_one_special_char)
                .test(this.password);
        return this.containAtLeastOneSpecialChar;
    }
    setRulesAndValidators() {
        if (this.enableLengthRule) {
            this.criteriaMap.set(Criteria.at_least_eight_chars, RegExp(`^.{${this.min},${this.max}$`));
        }
        if (this.enableLowerCaseLetterRule) {
            this.criteriaMap.set(Criteria.at_least_one_lower_case_char, RegExp(/^(?=.*?[a-z])/));
        }
        if (this.enableUpperCaseLetterRule) {
            this.criteriaMap.set(Criteria.at_least_one_upper_case_char, RegExp(/^(?=.*?[A-Z])/));
        }
        if (this.enableDigitRule) {
            this.criteriaMap.set(Criteria.at_least_one_digit_char, RegExp(/^(?=.*?[0-9])/));
        }
        if (this.enableSpecialCharRule) {
            this.criteriaMap.set(Criteria.at_least_one_special_char, RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/));
        }
        this.passwordFormControl.setValidators(Validators.pattern(this.criteriaMap.get(Criteria.at_least_eight_chars)));
        this.validators.map(criteria => {
            this.passwordFormControl.setValidators(Validators.pattern(this.criteriaMap.get(criteria)));
        });
    }
    calculatePasswordStrength() {
        const requirements = [];
        const unit = 100 / this.criteriaMap.size;
        // console.log('this.criteriaMap.size = ', this.criteriaMap.size);
        // console.log('unit = ', unit);
        requirements.push(this.enableLengthRule ? this._containAtLeastMinChars() : false, this.enableLowerCaseLetterRule ? this._containAtLeastOneLowerCaseLetter() : false, this.enableUpperCaseLetterRule ? this._containAtLeastOneUpperCaseLetter() : false, this.enableDigitRule ? this._containAtLeastOneDigit() : false, this.enableSpecialCharRule ? this._containAtLeastOneSpecialChar() : false);
        this._strength = requirements.filter(v => v).length * unit;
        // console.log('length = ', this._strength / unit);
        this.onStrengthChanged.emit(this.strength);
    }
    reset() {
        this._strength = 0;
        this.containAtLeastMinChars =
            this.containAtLeastOneLowerCaseLetter =
                this.containAtLeastOneUpperCaseLetter =
                    this.containAtLeastOneDigit =
                        this.containAtLeastOneSpecialChar = false;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], MatPasswordStrengthComponent.prototype, "password", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], MatPasswordStrengthComponent.prototype, "validators", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], MatPasswordStrengthComponent.prototype, "externalError", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "enableLengthRule", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "enableLowerCaseLetterRule", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "enableUpperCaseLetterRule", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "enableDigitRule", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "enableSpecialCharRule", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], MatPasswordStrengthComponent.prototype, "onStrengthChanged", void 0);
MatPasswordStrengthComponent = tslib_1.__decorate([
    Component({
        selector: 'mat-password-strength',
        exportAs: 'matPasswordStrength',
        template: "<mat-progress-bar mode=\"determinate\"\n                  [color]=\"color\"\n                  [value]=\"strength\">\n</mat-progress-bar>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [""]
    })
], MatPasswordStrengthComponent);
export { MatPasswordStrengthComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJtb2R1bGUvY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFrQixXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsTUFBTSxDQUFOLElBQVksTUFJWDtBQUpELFdBQVksTUFBTTtJQUNoQiw2QkFBbUIsQ0FBQTtJQUNuQiwyQkFBaUIsQ0FBQTtJQUNqQix1QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUpXLE1BQU0sS0FBTixNQUFNLFFBSWpCO0FBRUQsTUFBTSxDQUFOLElBQVksUUFNWDtBQU5ELFdBQVksUUFBUTtJQUNsQix1RUFBb0IsQ0FBQTtJQUNwQix1RkFBNEIsQ0FBQTtJQUM1Qix1RkFBNEIsQ0FBQTtJQUM1Qiw2RUFBdUIsQ0FBQTtJQUN2QixpRkFBeUIsQ0FBQTtBQUMzQixDQUFDLEVBTlcsUUFBUSxLQUFSLFFBQVEsUUFNbkI7QUFTRCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQVB6QztRQVVXLGVBQVUsR0FBZSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBR3pFLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4Qiw4QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDakMsOEJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUU3QixRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUdsQixzQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVyRSxnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBUTFDLHdCQUFtQixHQUFvQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWpELGNBQVMsR0FBRyxDQUFDLENBQUM7SUFpSXhCLENBQUM7SUE3SEMsUUFBUTtRQUNOLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3BHLE9BQU87U0FDUjthQUFNLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTztTQUNSO2FBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQzVHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFFUCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFO1lBQ3hCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNwQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JDLENBQUM7SUFFTyxpQ0FBaUM7UUFDdkMsSUFBSSxDQUFDLGdDQUFnQztZQUNuQyxJQUFJLENBQUMsV0FBVztpQkFDYixHQUFHLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGdDQUFnQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxpQ0FBaUM7UUFDdkMsSUFBSSxDQUFDLGdDQUFnQztZQUNuQyxJQUFJLENBQUMsV0FBVztpQkFDYixHQUFHLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGdDQUFnQyxDQUFDO0lBQy9DLENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsSUFBSSxDQUFDLHNCQUFzQjtZQUN6QixJQUFJLENBQUMsV0FBVztpQkFDYixHQUFHLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDO2lCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JDLENBQUM7SUFFTyw2QkFBNkI7UUFDbkMsSUFBSSxDQUFDLDRCQUE0QjtZQUMvQixJQUFJLENBQUMsV0FBVztpQkFDYixHQUFHLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDO2lCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDO0lBQzNDLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1RjtRQUNELElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUN0RjtRQUNELElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUN0RjtRQUNELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDakY7UUFDRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLCtDQUErQyxDQUFDLENBQUMsQ0FBQztTQUNuSDtRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsTUFBTSxZQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUN4QyxNQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFFekMsa0VBQWtFO1FBQ2xFLGdDQUFnQztRQUVoQyxZQUFZLENBQUMsSUFBSSxDQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFDOUQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUNqRixJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ2pGLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQzdELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0QsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLHNCQUFzQjtZQUN6QixJQUFJLENBQUMsZ0NBQWdDO2dCQUNuQyxJQUFJLENBQUMsZ0NBQWdDO29CQUNuQyxJQUFJLENBQUMsc0JBQXNCO3dCQUN6QixJQUFJLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFBO0FBM0pVO0lBQVIsS0FBSyxFQUFFOzs4REFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7O2dFQUEwRTtBQUN6RTtJQUFSLEtBQUssRUFBRTs7bUVBQXdCO0FBRXZCO0lBQVIsS0FBSyxFQUFFOztzRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7OytFQUFrQztBQUNqQztJQUFSLEtBQUssRUFBRTs7K0VBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFOztxRUFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7OzJFQUE4QjtBQUU3QjtJQUFSLEtBQUssRUFBRTs7eURBQVM7QUFDUjtJQUFSLEtBQUssRUFBRTs7eURBQVU7QUFHbEI7SUFEQyxNQUFNLEVBQUU7c0NBQ1UsWUFBWTt1RUFBc0M7QUFoQjFELDRCQUE0QjtJQVB4QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsdUpBQXFEO1FBRXJELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csNEJBQTRCLENBNkp4QztTQTdKWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBlbnVtIENvbG9ycyB7XG4gIHByaW1hcnkgPSAncHJpbWFyeScsXG4gIGFjY2VudCA9ICdhY2NlbnQnLFxuICB3YXJuID0gJ3dhcm4nXG59XG5cbmV4cG9ydCBlbnVtIENyaXRlcmlhIHtcbiAgYXRfbGVhc3RfZWlnaHRfY2hhcnMsXG4gIGF0X2xlYXN0X29uZV9sb3dlcl9jYXNlX2NoYXIsXG4gIGF0X2xlYXN0X29uZV91cHBlcl9jYXNlX2NoYXIsXG4gIGF0X2xlYXN0X29uZV9kaWdpdF9jaGFyLFxuICBhdF9sZWFzdF9vbmVfc3BlY2lhbF9jaGFyLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFzc3dvcmQtc3RyZW5ndGgnLFxuICBleHBvcnRBczogJ21hdFBhc3N3b3JkU3RyZW5ndGgnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgcGFzc3dvcmQ6IHN0cmluZztcbiAgQElucHV0KCkgdmFsaWRhdG9yczogQ3JpdGVyaWFbXSA9IE9iamVjdC5rZXlzKENyaXRlcmlhKS5tYXAoa2V5ID0+IENyaXRlcmlhW2tleV0pO1xuICBASW5wdXQoKSBleHRlcm5hbEVycm9yOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGVuYWJsZUxlbmd0aFJ1bGUgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGVMb3dlckNhc2VMZXR0ZXJSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlVXBwZXJDYXNlTGV0dGVyUnVsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZURpZ2l0UnVsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZVNwZWNpYWxDaGFyUnVsZSA9IHRydWU7XG5cbiAgQElucHV0KCkgbWluID0gODtcbiAgQElucHV0KCkgbWF4ID0gMzA7XG5cbiAgQE91dHB1dCgpXG4gIG9uU3RyZW5ndGhDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIGNyaXRlcmlhTWFwID0gbmV3IE1hcDxDcml0ZXJpYSwgUmVnRXhwPigpO1xuXG4gIGNvbnRhaW5BdExlYXN0TWluQ2hhcnM6IGJvb2xlYW47XG4gIGNvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyOiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcjogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVEaWdpdDogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcjogYm9vbGVhbjtcblxuICBwYXNzd29yZEZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICBwcml2YXRlIF9zdHJlbmd0aCA9IDA7XG5cbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFJ1bGVzQW5kVmFsaWRhdG9ycygpO1xuICAgIGlmICh0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVBhc3N3b3JkU3RyZW5ndGgoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKChjaGFuZ2VzLmV4dGVybmFsRXJyb3IgJiYgY2hhbmdlcy5leHRlcm5hbEVycm9yLmZpcnN0Q2hhbmdlKSB8fCBjaGFuZ2VzLnBhc3N3b3JkLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlcy5leHRlcm5hbEVycm9yICYmIGNoYW5nZXMuZXh0ZXJuYWxFcnJvci5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuX2NvbG9yID0gQ29sb3JzLndhcm47XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzLnBhc3N3b3JkLnByZXZpb3VzVmFsdWUgPT09IGNoYW5nZXMucGFzc3dvcmQuY3VycmVudFZhbHVlICYmICFjaGFuZ2VzLnBhc3N3b3JkLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVBhc3N3b3JkU3RyZW5ndGgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXNzd29yZCAmJiB0aGlzLnBhc3N3b3JkLmxlbmd0aCA+IDAgP1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVBhc3N3b3JkU3RyZW5ndGgoKSA6IHRoaXMucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3RyZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyZW5ndGggPyB0aGlzLl9zdHJlbmd0aCA6IDA7XG4gIH1cblxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcblxuICAgIGlmICh0aGlzLl9zdHJlbmd0aCA8PSAyMCkge1xuICAgICAgcmV0dXJuIENvbG9ycy53YXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc3RyZW5ndGggPD0gODApIHtcbiAgICAgIHJldHVybiBDb2xvcnMuYWNjZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29sb3JzLnByaW1hcnk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RNaW5DaGFycygpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0TWluQ2hhcnMgPSB0aGlzLnBhc3N3b3JkLmxlbmd0aCA+PSB0aGlzLm1pbjtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE1pbkNoYXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlciA9XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwXG4gICAgICAgIC5nZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2xvd2VyX2Nhc2VfY2hhcilcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcigpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfdXBwZXJfY2FzZV9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lRGlnaXQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZURpZ2l0ID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfZGlnaXRfY2hhcilcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RPbmVEaWdpdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfc3BlY2lhbF9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyO1xuICB9XG5cbiAgc2V0UnVsZXNBbmRWYWxpZGF0b3JzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVuYWJsZUxlbmd0aFJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X2VpZ2h0X2NoYXJzLCBSZWdFeHAoYF4ueyR7dGhpcy5taW59LCR7dGhpcy5tYXh9JGApKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlTG93ZXJDYXNlTGV0dGVyUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2xvd2VyX2Nhc2VfY2hhciwgUmVnRXhwKC9eKD89Lio/W2Etel0pLykpO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmFibGVVcHBlckNhc2VMZXR0ZXJSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfdXBwZXJfY2FzZV9jaGFyLCBSZWdFeHAoL14oPz0uKj9bQS1aXSkvKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZURpZ2l0UnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2RpZ2l0X2NoYXIsIFJlZ0V4cCgvXig/PS4qP1swLTldKS8pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlU3BlY2lhbENoYXJSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfc3BlY2lhbF9jaGFyLCBSZWdFeHAoL14oPz0uKj9bXCIgIVwiIyQlJicoKSorLC0uLzo7PD0+P0BbXFxdXl9ge3x9flwiXSkvKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXNzd29yZEZvcm1Db250cm9sLnNldFZhbGlkYXRvcnMoVmFsaWRhdG9ycy5wYXR0ZXJuKHRoaXMuY3JpdGVyaWFNYXAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X2VpZ2h0X2NoYXJzKSkpO1xuXG4gICAgdGhpcy52YWxpZGF0b3JzLm1hcChjcml0ZXJpYSA9PiB7XG4gICAgICB0aGlzLnBhc3N3b3JkRm9ybUNvbnRyb2wuc2V0VmFsaWRhdG9ycyhWYWxpZGF0b3JzLnBhdHRlcm4odGhpcy5jcml0ZXJpYU1hcC5nZXQoY3JpdGVyaWEpKSk7XG4gICAgfSlcblxuICB9XG5cbiAgY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpOiB2b2lkIHtcbiAgICBjb25zdCByZXF1aXJlbWVudHM6IEFycmF5PGJvb2xlYW4+ID0gW107XG4gICAgY29uc3QgdW5pdCA9IDEwMCAvIHRoaXMuY3JpdGVyaWFNYXAuc2l6ZTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmNyaXRlcmlhTWFwLnNpemUgPSAnLCB0aGlzLmNyaXRlcmlhTWFwLnNpemUpO1xuICAgIC8vIGNvbnNvbGUubG9nKCd1bml0ID0gJywgdW5pdCk7XG5cbiAgICByZXF1aXJlbWVudHMucHVzaChcbiAgICAgIHRoaXMuZW5hYmxlTGVuZ3RoUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0TWluQ2hhcnMoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVMb3dlckNhc2VMZXR0ZXJSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVVcHBlckNhc2VMZXR0ZXJSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVEaWdpdFJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE9uZURpZ2l0KCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlU3BlY2lhbENoYXJSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcigpIDogZmFsc2UpO1xuXG4gICAgdGhpcy5fc3RyZW5ndGggPSByZXF1aXJlbWVudHMuZmlsdGVyKHYgPT4gdikubGVuZ3RoICogdW5pdDtcbiAgICAvLyBjb25zb2xlLmxvZygnbGVuZ3RoID0gJywgdGhpcy5fc3RyZW5ndGggLyB1bml0KTtcbiAgICB0aGlzLm9uU3RyZW5ndGhDaGFuZ2VkLmVtaXQodGhpcy5zdHJlbmd0aCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9zdHJlbmd0aCA9IDA7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE1pbkNoYXJzID1cbiAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIgPVxuICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyID1cbiAgICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lRGlnaXQgPVxuICAgICAgICAgICAgdGhpcy5jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==