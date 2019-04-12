(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/material'), require('@angular/forms'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@try/password-strength', ['exports', '@angular/common', '@angular/core', '@angular/material', '@angular/forms', '@angular/animations'], factory) :
    (global = global || self, factory((global.try = global.try || {}, global.try['password-strength'] = {}), global.ng.common, global.ng.core, global.ng.material, global.ng.forms, global.ng.animations));
}(this, function (exports, common, core, material, forms, animations) { 'use strict';

    /*! *****************************************************************************

    Copyright (c) Microsoft Corporation. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License"); you may not use

    this file except in compliance with the License. You may obtain a copy of the

    License at http://www.apache.org/licenses/LICENSE-2.0



    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY

    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED

    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,

    MERCHANTABLITY OR NON-INFRINGEMENT.



    See the Apache Version 2.0 License for specific language governing permissions

    and limitations under the License.

    ***************************************************************************** */



    function __decorate(decorators, target, key, desc) {

        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);

        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;

        return c > 3 && r && Object.defineProperty(target, key, r), r;

    }



    function __metadata(metadataKey, metadataValue) {

        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);

    }

    var Colors;
    (function (Colors) {
        Colors["primary"] = "primary";
        Colors["accent"] = "accent";
        Colors["warn"] = "warn";
    })(Colors || (Colors = {}));
    var Criteria;
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
            this.onStrengthChanged = new core.EventEmitter();
            this.criteriaMap = new Map();
            this.passwordFormControl = new forms.FormControl();
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
            this.passwordFormControl.setValidators(forms.Validators.pattern(this.criteriaMap.get(Criteria.at_least_eight_chars)));
            this.validators.map(function (criteria) {
                _this.passwordFormControl.setValidators(forms.Validators.pattern(_this.criteriaMap.get(criteria)));
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
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MatPasswordStrengthComponent.prototype, "password", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], MatPasswordStrengthComponent.prototype, "validators", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], MatPasswordStrengthComponent.prototype, "externalError", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "enableLengthRule", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "enableLowerCaseLetterRule", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "enableUpperCaseLetterRule", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "enableDigitRule", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "enableSpecialCharRule", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "min", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthComponent.prototype, "max", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], MatPasswordStrengthComponent.prototype, "onStrengthChanged", void 0);
        MatPasswordStrengthComponent = __decorate([
            core.Component({
                selector: 'mat-password-strength',
                exportAs: 'matPasswordStrength',
                template: "<mat-progress-bar mode=\"determinate\"\n                  [color]=\"color\"\n                  [value]=\"strength\">\n</mat-progress-bar>\n",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [""]
            })
        ], MatPasswordStrengthComponent);
        return MatPasswordStrengthComponent;
    }());

    function flipIn(timing, rotateX, rotateY) {
        var params = { timing: timing, delay: 0, rotateX: rotateX, rotateY: rotateY };
        return animations.animation([
            animations.style({ 'backface-visibility': 'visible' }),
            animations.animate('{{ timing }}s {{ delay }}s ease-in', animations.keyframes([
                animations.style({
                    opacity: 0,
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                    offset: 0,
                }),
                animations.style({
                    opacity: 1,
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                    offset: 0.4,
                }),
                animations.style({
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                    offset: 0.6,
                }),
                animations.style({
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                    offset: 0.8,
                }),
                animations.style({
                    transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                    offset: 1,
                }),
            ])),
        ], { params: params });
    }
    var flipInX = flipIn(1, 1, 0);
    var flipInY = flipIn(1, 0, 1);
    var shake = animations.animation(animations.animate('{{ timing }}s {{ delay }}s', animations.keyframes([
        animations.style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
        animations.style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
    ])), { params: { timing: 1, delay: 0 } });

    var MatPasswordStrengthInfoComponent = /** @class */ (function () {
        function MatPasswordStrengthInfoComponent() {
            this.enableScoreInfo = false;
            this.lowerCaseCriteriaMsg = 'contains at least one lower character';
            this.upperCaseCriteriaMsg = 'contains at least one upper character';
            this.digitsCriteriaMsg = 'contains at least one digit character';
            this.specialCharsCriteriaMsg = 'contains at least one special character';
        }
        MatPasswordStrengthInfoComponent.prototype.ngOnInit = function () {
            if (!this.minCharsCriteriaMsg) {
                this.minCharsCriteriaMsg = "contains at least " + this.passwordComponent.min + " characters";
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", MatPasswordStrengthComponent)
        ], MatPasswordStrengthInfoComponent.prototype, "passwordComponent", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthInfoComponent.prototype, "enableScoreInfo", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthInfoComponent.prototype, "lowerCaseCriteriaMsg", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthInfoComponent.prototype, "upperCaseCriteriaMsg", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthInfoComponent.prototype, "digitsCriteriaMsg", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MatPasswordStrengthInfoComponent.prototype, "specialCharsCriteriaMsg", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MatPasswordStrengthInfoComponent.prototype, "minCharsCriteriaMsg", void 0);
        MatPasswordStrengthInfoComponent = __decorate([
            core.Component({
                selector: 'mat-password-strength-info',
                exportAs: 'matPasswordStrengthInfo',
                template: "<mat-card @list>\n  <mat-card-content>\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLowerCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneLowerCaseLetter; then done else error\" @flipY>\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{lowerCaseCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableUpperCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneUpperCaseLetter; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{upperCaseCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableDigitRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneDigit; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{digitsCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableSpecialCharRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneSpecialChar; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{specialCharsCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLengthRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastMinChars; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{minCharsCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div *ngIf=\"enableScoreInfo\" class=\"info-row\" @items>\n      <div *ngIf=\"passwordComponent.strength === 100; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>Password's strength = {{passwordComponent.strength}} %100</p>\n      </div>\n    </div>\n\n  </mat-card-content>\n</mat-card>\n",
                animations: [
                    // nice stagger effect when showing existing elements
                    animations.trigger('list', [
                        animations.transition(':enter', [
                            // child animation selector + stagger
                            animations.query('@items', animations.stagger(300, animations.animateChild()))
                        ]),
                    ]),
                    animations.trigger('items', [
                        // cubic-bezier for a tiny bouncing feel
                        animations.transition(':enter', [
                            animations.style({ transform: 'scale(0.5)', opacity: 0 }),
                            animations.animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', animations.style({ transform: 'scale(1)', opacity: 1 }))
                        ]),
                        animations.transition(':leave', [
                            animations.style({ transform: 'scale(1)', opacity: 1, height: '*' }),
                            animations.animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', animations.style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
                        ]),
                    ]),
                    animations.trigger('positiveState', [
                        animations.transition(':enter', [
                            animations.style({ 'backface-visibility': 'visible' }),
                            animations.animate('{{ timing }}s {{ delay }}s ease-in', animations.keyframes([
                                animations.style({
                                    opacity: 0,
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                                    offset: 0,
                                }),
                                animations.style({
                                    opacity: 1,
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                                    offset: 0.4,
                                }),
                                animations.style({
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                                    offset: 0.6,
                                }),
                                animations.style({
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                                    offset: 0.8,
                                }),
                                animations.style({
                                    transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                                    offset: 1,
                                }),
                            ])),
                        ], { params: { timing: 1, delay: 0, rotateX: 1, rotateY: 0 } }),
                    ]),
                    animations.trigger('negativeState', [
                        animations.transition(':enter', animations.useAnimation(shake)),
                    ]),
                ],
                styles: ["mat-card{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;place-content:stretch center;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-flex:1;-ms-flex:1 1 0%;flex:1 1 0%}mat-card mat-card-content{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:100%;place-content:stretch flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}mat-card mat-card-content mat-icon{margin-right:10px}mat-card mat-card-content .info-row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex}"]
            })
        ], MatPasswordStrengthInfoComponent);
        return MatPasswordStrengthInfoComponent;
    }());

    var MatPassToggleVisibilityComponent = /** @class */ (function () {
        function MatPassToggleVisibilityComponent() {
            this._type = 'text';
        }
        Object.defineProperty(MatPassToggleVisibilityComponent.prototype, "type", {
            get: function () {
                return this.isVisible ? 'text' : 'password';
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], MatPassToggleVisibilityComponent.prototype, "isVisible", void 0);
        MatPassToggleVisibilityComponent = __decorate([
            core.Component({
                selector: 'mat-pass-toggle-visibility',
                template: "<button (click)=\"isVisible = !isVisible\"\n        class=\"mat-icon-button cdk-focused cdk-mouse-focused\" mat-icon-button\n        matRippleCentered=\"true\"\n        matRipple>\n  <mat-icon>{{isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>\n</button>\n\n",
                encapsulation: core.ViewEncapsulation.None,
                styles: [""]
            })
        ], MatPassToggleVisibilityComponent);
        return MatPassToggleVisibilityComponent;
    }());

    var MatPasswordStrengthModule = /** @class */ (function () {
        function MatPasswordStrengthModule() {
        }
        MatPasswordStrengthModule_1 = MatPasswordStrengthModule;
        MatPasswordStrengthModule.forRoot = function () {
            return {
                ngModule: MatPasswordStrengthModule_1,
                providers: []
            };
        };
        var MatPasswordStrengthModule_1;
        MatPasswordStrengthModule = MatPasswordStrengthModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    material.MatProgressBarModule,
                    material.MatCardModule,
                    material.MatIconModule,
                    material.MatRippleModule
                ],
                exports: [
                    MatPasswordStrengthComponent,
                    MatPasswordStrengthInfoComponent,
                    MatPassToggleVisibilityComponent
                ],
                declarations: [
                    MatPasswordStrengthComponent,
                    MatPasswordStrengthInfoComponent,
                    MatPassToggleVisibilityComponent
                ],
                entryComponents: [MatPassToggleVisibilityComponent]
            })
        ], MatPasswordStrengthModule);
        return MatPasswordStrengthModule;
    }());

    exports.MatPassToggleVisibilityComponent = MatPassToggleVisibilityComponent;
    exports.MatPasswordStrengthComponent = MatPasswordStrengthComponent;
    exports.MatPasswordStrengthInfoComponent = MatPasswordStrengthInfoComponent;
    exports.MatPasswordStrengthModule = MatPasswordStrengthModule;
    exports.ɵa = shake;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=try-password-strength.umd.js.map
