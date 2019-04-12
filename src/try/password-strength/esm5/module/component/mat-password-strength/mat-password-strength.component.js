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
var MatPasswordStrengthComponent = /** @class */ (function () {
    function MatPasswordStrengthComponent() {
        this.validators = Object.keys(Criteria).map(function (key) { return Criteria[key]; });
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
    MatPasswordStrengthComponent.prototype.ngOnInit = function () {
        this.setRulesAndValidators();
        if (this.password) {
            this.calculatePasswordStrength();
        }
    };
    MatPasswordStrengthComponent.prototype.ngOnChanges = function (changes) {
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
    };
    Object.defineProperty(MatPasswordStrengthComponent.prototype, "strength", {
        get: function () {
            return this._strength ? this._strength : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPasswordStrengthComponent.prototype, "color", {
        get: function () {
            if (this._strength <= 20) {
                return Colors.warn;
            }
            else if (this._strength <= 80) {
                return Colors.accent;
            }
            else {
                return Colors.primary;
            }
        },
        enumerable: true,
        configurable: true
    });
    MatPasswordStrengthComponent.prototype._containAtLeastMinChars = function () {
        this.containAtLeastMinChars = this.password.length >= this.min;
        return this.containAtLeastMinChars;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneLowerCaseLetter = function () {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_lower_case_char)
                .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneUpperCaseLetter = function () {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_upper_case_char)
                .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneDigit = function () {
        this.containAtLeastOneDigit =
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char)
                .test(this.password);
        return this.containAtLeastOneDigit;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneSpecialChar = function () {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
                .get(Criteria.at_least_one_special_char)
                .test(this.password);
        return this.containAtLeastOneSpecialChar;
    };
    MatPasswordStrengthComponent.prototype.setRulesAndValidators = function () {
        var _this = this;
        if (this.enableLengthRule) {
            this.criteriaMap.set(Criteria.at_least_eight_chars, RegExp("^.{" + this.min + "," + this.max + "$"));
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
        this.validators.map(function (criteria) {
            _this.passwordFormControl.setValidators(Validators.pattern(_this.criteriaMap.get(criteria)));
        });
    };
    MatPasswordStrengthComponent.prototype.calculatePasswordStrength = function () {
        var requirements = [];
        var unit = 100 / this.criteriaMap.size;
        // console.log('this.criteriaMap.size = ', this.criteriaMap.size);
        // console.log('unit = ', unit);
        requirements.push(this.enableLengthRule ? this._containAtLeastMinChars() : false, this.enableLowerCaseLetterRule ? this._containAtLeastOneLowerCaseLetter() : false, this.enableUpperCaseLetterRule ? this._containAtLeastOneUpperCaseLetter() : false, this.enableDigitRule ? this._containAtLeastOneDigit() : false, this.enableSpecialCharRule ? this._containAtLeastOneSpecialChar() : false);
        this._strength = requirements.filter(function (v) { return v; }).length * unit;
        // console.log('length = ', this._strength / unit);
        this.onStrengthChanged.emit(this.strength);
    };
    MatPasswordStrengthComponent.prototype.reset = function () {
        this._strength = 0;
        this.containAtLeastMinChars =
            this.containAtLeastOneLowerCaseLetter =
                this.containAtLeastOneUpperCaseLetter =
                    this.containAtLeastOneDigit =
                        this.containAtLeastOneSpecialChar = false;
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
    return MatPasswordStrengthComponent;
}());
export { MatPasswordStrengthComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJtb2R1bGUvY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFrQixXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsTUFBTSxDQUFOLElBQVksTUFJWDtBQUpELFdBQVksTUFBTTtJQUNoQiw2QkFBbUIsQ0FBQTtJQUNuQiwyQkFBaUIsQ0FBQTtJQUNqQix1QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUpXLE1BQU0sS0FBTixNQUFNLFFBSWpCO0FBRUQsTUFBTSxDQUFOLElBQVksUUFNWDtBQU5ELFdBQVksUUFBUTtJQUNsQix1RUFBb0IsQ0FBQTtJQUNwQix1RkFBNEIsQ0FBQTtJQUM1Qix1RkFBNEIsQ0FBQTtJQUM1Qiw2RUFBdUIsQ0FBQTtJQUN2QixpRkFBeUIsQ0FBQTtBQUMzQixDQUFDLEVBTlcsUUFBUSxLQUFSLFFBQVEsUUFNbkI7QUFTRDtJQVBBO1FBVVcsZUFBVSxHQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBR3pFLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4Qiw4QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDakMsOEJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUU3QixRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUdsQixzQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVyRSxnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBUTFDLHdCQUFtQixHQUFvQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWpELGNBQVMsR0FBRyxDQUFDLENBQUM7SUFpSXhCLENBQUM7SUE3SEMsK0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxrREFBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3BHLE9BQU87U0FDUjthQUFNLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTztTQUNSO2FBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQzVHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELHNCQUFJLGtEQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFLO2FBQVQ7WUFFRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFO2dCQUN4QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDcEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN2QjtRQUNILENBQUM7OztPQUFBO0lBRU8sOERBQXVCLEdBQS9CO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDckMsQ0FBQztJQUVPLHdFQUFpQyxHQUF6QztRQUNFLElBQUksQ0FBQyxnQ0FBZ0M7WUFDbkMsSUFBSSxDQUFDLFdBQVc7aUJBQ2IsR0FBRyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztJQUMvQyxDQUFDO0lBRU8sd0VBQWlDLEdBQXpDO1FBQ0UsSUFBSSxDQUFDLGdDQUFnQztZQUNuQyxJQUFJLENBQUMsV0FBVztpQkFDYixHQUFHLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGdDQUFnQyxDQUFDO0lBQy9DLENBQUM7SUFFTyw4REFBdUIsR0FBL0I7UUFDRSxJQUFJLENBQUMsc0JBQXNCO1lBQ3pCLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7aUJBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDckMsQ0FBQztJQUVPLG9FQUE2QixHQUFyQztRQUNFLElBQUksQ0FBQyw0QkFBNEI7WUFDL0IsSUFBSSxDQUFDLFdBQVc7aUJBQ2IsR0FBRyxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztJQUMzQyxDQUFDO0lBRUQsNERBQXFCLEdBQXJCO1FBQUEsaUJBdUJDO1FBdEJDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsUUFBTSxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxHQUFHLE1BQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUY7UUFDRCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDdEY7UUFDRCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDdEY7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDLENBQUM7U0FDbkg7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhILElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTtZQUMxQixLQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLENBQUMsQ0FBQyxDQUFBO0lBRUosQ0FBQztJQUVELGdFQUF5QixHQUF6QjtRQUNFLElBQU0sWUFBWSxHQUFtQixFQUFFLENBQUM7UUFDeEMsSUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBRXpDLGtFQUFrRTtRQUNsRSxnQ0FBZ0M7UUFFaEMsWUFBWSxDQUFDLElBQUksQ0FDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQzlELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFDakYsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUNqRixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUM3RCxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzRCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDRDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsc0JBQXNCO1lBQ3pCLElBQUksQ0FBQyxnQ0FBZ0M7Z0JBQ25DLElBQUksQ0FBQyxnQ0FBZ0M7b0JBQ25DLElBQUksQ0FBQyxzQkFBc0I7d0JBQ3pCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQTFKUTtRQUFSLEtBQUssRUFBRTs7a0VBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOztvRUFBMEU7SUFDekU7UUFBUixLQUFLLEVBQUU7O3VFQUF3QjtJQUV2QjtRQUFSLEtBQUssRUFBRTs7MEVBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzttRkFBa0M7SUFDakM7UUFBUixLQUFLLEVBQUU7O21GQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTs7eUVBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFOzsrRUFBOEI7SUFFN0I7UUFBUixLQUFLLEVBQUU7OzZEQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7OzZEQUFVO0lBR2xCO1FBREMsTUFBTSxFQUFFOzBDQUNVLFlBQVk7MkVBQXNDO0lBaEIxRCw0QkFBNEI7UUFQeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLHVKQUFxRDtZQUVyRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLDRCQUE0QixDQTZKeEM7SUFBRCxtQ0FBQztDQUFBLEFBN0pELElBNkpDO1NBN0pZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGVudW0gQ29sb3JzIHtcbiAgcHJpbWFyeSA9ICdwcmltYXJ5JyxcbiAgYWNjZW50ID0gJ2FjY2VudCcsXG4gIHdhcm4gPSAnd2Fybidcbn1cblxuZXhwb3J0IGVudW0gQ3JpdGVyaWEge1xuICBhdF9sZWFzdF9laWdodF9jaGFycyxcbiAgYXRfbGVhc3Rfb25lX2xvd2VyX2Nhc2VfY2hhcixcbiAgYXRfbGVhc3Rfb25lX3VwcGVyX2Nhc2VfY2hhcixcbiAgYXRfbGVhc3Rfb25lX2RpZ2l0X2NoYXIsXG4gIGF0X2xlYXN0X29uZV9zcGVjaWFsX2NoYXIsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wYXNzd29yZC1zdHJlbmd0aCcsXG4gIGV4cG9ydEFzOiAnbWF0UGFzc3dvcmRTdHJlbmd0aCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWF0UGFzc3dvcmRTdHJlbmd0aENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBwYXNzd29yZDogc3RyaW5nO1xuICBASW5wdXQoKSB2YWxpZGF0b3JzOiBDcml0ZXJpYVtdID0gT2JqZWN0LmtleXMoQ3JpdGVyaWEpLm1hcChrZXkgPT4gQ3JpdGVyaWFba2V5XSk7XG4gIEBJbnB1dCgpIGV4dGVybmFsRXJyb3I6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgZW5hYmxlTGVuZ3RoUnVsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZUxvd2VyQ2FzZUxldHRlclJ1bGUgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGVVcHBlckNhc2VMZXR0ZXJSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlRGlnaXRSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlU3BlY2lhbENoYXJSdWxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSBtaW4gPSA4O1xuICBASW5wdXQoKSBtYXggPSAzMDtcblxuICBAT3V0cHV0KClcbiAgb25TdHJlbmd0aENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgY3JpdGVyaWFNYXAgPSBuZXcgTWFwPENyaXRlcmlhLCBSZWdFeHA+KCk7XG5cbiAgY29udGFpbkF0TGVhc3RNaW5DaGFyczogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXI6IGJvb2xlYW47XG4gIGNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyOiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZURpZ2l0OiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyOiBib29sZWFuO1xuXG4gIHBhc3N3b3JkRm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG4gIHByaXZhdGUgX3N0cmVuZ3RoID0gMDtcblxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0UnVsZXNBbmRWYWxpZGF0b3JzKCk7XG4gICAgaWYgKHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoKGNoYW5nZXMuZXh0ZXJuYWxFcnJvciAmJiBjaGFuZ2VzLmV4dGVybmFsRXJyb3IuZmlyc3RDaGFuZ2UpIHx8IGNoYW5nZXMucGFzc3dvcmQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzLmV4dGVybmFsRXJyb3IgJiYgY2hhbmdlcy5leHRlcm5hbEVycm9yLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5fY29sb3IgPSBDb2xvcnMud2FybjtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXMucGFzc3dvcmQucHJldmlvdXNWYWx1ZSA9PT0gY2hhbmdlcy5wYXNzd29yZC5jdXJyZW50VmFsdWUgJiYgIWNoYW5nZXMucGFzc3dvcmQuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhc3N3b3JkICYmIHRoaXMucGFzc3dvcmQubGVuZ3RoID4gMCA/XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpIDogdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdHJlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdHJlbmd0aCA/IHRoaXMuX3N0cmVuZ3RoIDogMDtcbiAgfVxuXG4gIGdldCBjb2xvcigpOiBzdHJpbmcge1xuXG4gICAgaWYgKHRoaXMuX3N0cmVuZ3RoIDw9IDIwKSB7XG4gICAgICByZXR1cm4gQ29sb3JzLndhcm47XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zdHJlbmd0aCA8PSA4MCkge1xuICAgICAgcmV0dXJuIENvbG9ycy5hY2NlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb2xvcnMucHJpbWFyeTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE1pbkNoYXJzKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RNaW5DaGFycyA9IHRoaXMucGFzc3dvcmQubGVuZ3RoID49IHRoaXMubWluO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0TWluQ2hhcnM7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlcigpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfbG93ZXJfY2FzZV9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV91cHBlcl9jYXNlX2NoYXIpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVEaWdpdCgpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lRGlnaXQgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9kaWdpdF9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZURpZ2l0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcigpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9zcGVjaWFsX2NoYXIpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXI7XG4gIH1cblxuICBzZXRSdWxlc0FuZFZhbGlkYXRvcnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW5hYmxlTGVuZ3RoUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3RfZWlnaHRfY2hhcnMsIFJlZ0V4cChgXi57JHt0aGlzLm1pbn0sJHt0aGlzLm1heH0kYCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmFibGVMb3dlckNhc2VMZXR0ZXJSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfbG93ZXJfY2FzZV9jaGFyLCBSZWdFeHAoL14oPz0uKj9bYS16XSkvKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZVVwcGVyQ2FzZUxldHRlclJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV91cHBlcl9jYXNlX2NoYXIsIFJlZ0V4cCgvXig/PS4qP1tBLVpdKS8pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlRGlnaXRSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfZGlnaXRfY2hhciwgUmVnRXhwKC9eKD89Lio/WzAtOV0pLykpO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmFibGVTcGVjaWFsQ2hhclJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9zcGVjaWFsX2NoYXIsIFJlZ0V4cCgvXig/PS4qP1tcIiAhXCIjJCUmJygpKissLS4vOjs8PT4/QFtcXF1eX2B7fH1+XCJdKS8pKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhc3N3b3JkRm9ybUNvbnRyb2wuc2V0VmFsaWRhdG9ycyhWYWxpZGF0b3JzLnBhdHRlcm4odGhpcy5jcml0ZXJpYU1hcC5nZXQoQ3JpdGVyaWEuYXRfbGVhc3RfZWlnaHRfY2hhcnMpKSk7XG5cbiAgICB0aGlzLnZhbGlkYXRvcnMubWFwKGNyaXRlcmlhID0+IHtcbiAgICAgIHRoaXMucGFzc3dvcmRGb3JtQ29udHJvbC5zZXRWYWxpZGF0b3JzKFZhbGlkYXRvcnMucGF0dGVybih0aGlzLmNyaXRlcmlhTWFwLmdldChjcml0ZXJpYSkpKTtcbiAgICB9KVxuXG4gIH1cblxuICBjYWxjdWxhdGVQYXNzd29yZFN0cmVuZ3RoKCk6IHZvaWQge1xuICAgIGNvbnN0IHJlcXVpcmVtZW50czogQXJyYXk8Ym9vbGVhbj4gPSBbXTtcbiAgICBjb25zdCB1bml0ID0gMTAwIC8gdGhpcy5jcml0ZXJpYU1hcC5zaXplO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMuY3JpdGVyaWFNYXAuc2l6ZSA9ICcsIHRoaXMuY3JpdGVyaWFNYXAuc2l6ZSk7XG4gICAgLy8gY29uc29sZS5sb2coJ3VuaXQgPSAnLCB1bml0KTtcblxuICAgIHJlcXVpcmVtZW50cy5wdXNoKFxuICAgICAgdGhpcy5lbmFibGVMZW5ndGhSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RNaW5DaGFycygpIDogZmFsc2UsXG4gICAgICB0aGlzLmVuYWJsZUxvd2VyQ2FzZUxldHRlclJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlcigpIDogZmFsc2UsXG4gICAgICB0aGlzLmVuYWJsZVVwcGVyQ2FzZUxldHRlclJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcigpIDogZmFsc2UsXG4gICAgICB0aGlzLmVuYWJsZURpZ2l0UnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lRGlnaXQoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVTcGVjaWFsQ2hhclJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyKCkgOiBmYWxzZSk7XG5cbiAgICB0aGlzLl9zdHJlbmd0aCA9IHJlcXVpcmVtZW50cy5maWx0ZXIodiA9PiB2KS5sZW5ndGggKiB1bml0O1xuICAgIC8vIGNvbnNvbGUubG9nKCdsZW5ndGggPSAnLCB0aGlzLl9zdHJlbmd0aCAvIHVuaXQpO1xuICAgIHRoaXMub25TdHJlbmd0aENoYW5nZWQuZW1pdCh0aGlzLnN0cmVuZ3RoKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX3N0cmVuZ3RoID0gMDtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0TWluQ2hhcnMgPVxuICAgICAgdGhpcy5jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlciA9XG4gICAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIgPVxuICAgICAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVEaWdpdCA9XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIgPSBmYWxzZTtcbiAgfVxufVxuIl19