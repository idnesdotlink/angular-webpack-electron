import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatPasswordStrengthComponent } from '../mat-password-strength/mat-password-strength.component';
import { animate, animateChild, keyframes, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake } from '../../animations/index';
let MatPasswordStrengthInfoComponent = class MatPasswordStrengthInfoComponent {
    constructor() {
        this.enableScoreInfo = false;
        this.lowerCaseCriteriaMsg = 'contains at least one lower character';
        this.upperCaseCriteriaMsg = 'contains at least one upper character';
        this.digitsCriteriaMsg = 'contains at least one digit character';
        this.specialCharsCriteriaMsg = 'contains at least one special character';
    }
    ngOnInit() {
        if (!this.minCharsCriteriaMsg) {
            this.minCharsCriteriaMsg = `contains at least ${this.passwordComponent.min} characters`;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", MatPasswordStrengthComponent)
], MatPasswordStrengthInfoComponent.prototype, "passwordComponent", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthInfoComponent.prototype, "enableScoreInfo", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthInfoComponent.prototype, "lowerCaseCriteriaMsg", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthInfoComponent.prototype, "upperCaseCriteriaMsg", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthInfoComponent.prototype, "digitsCriteriaMsg", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], MatPasswordStrengthInfoComponent.prototype, "specialCharsCriteriaMsg", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], MatPasswordStrengthInfoComponent.prototype, "minCharsCriteriaMsg", void 0);
MatPasswordStrengthInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'mat-password-strength-info',
        exportAs: 'matPasswordStrengthInfo',
        template: "<mat-card @list>\n  <mat-card-content>\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLowerCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneLowerCaseLetter; then done else error\" @flipY>\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{lowerCaseCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableUpperCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneUpperCaseLetter; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{upperCaseCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableDigitRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneDigit; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{digitsCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableSpecialCharRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneSpecialChar; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{specialCharsCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLengthRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastMinChars; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>{{minCharsCriteriaMsg}}</p>\n      </div>\n    </div>\n\n    <div *ngIf=\"enableScoreInfo\" class=\"info-row\" @items>\n      <div *ngIf=\"passwordComponent.strength === 100; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <div>\n        <p>Password's strength = {{passwordComponent.strength}} %100</p>\n      </div>\n    </div>\n\n  </mat-card-content>\n</mat-card>\n",
        animations: [
            // nice stagger effect when showing existing elements
            trigger('list', [
                transition(':enter', [
                    // child animation selector + stagger
                    query('@items', stagger(300, animateChild()))
                ]),
            ]),
            trigger('items', [
                // cubic-bezier for a tiny bouncing feel
                transition(':enter', [
                    style({ transform: 'scale(0.5)', opacity: 0 }),
                    animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', style({ transform: 'scale(1)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
                    animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
                ]),
            ]),
            trigger('positiveState', [
                transition(':enter', [
                    style({ 'backface-visibility': 'visible' }),
                    animate('{{ timing }}s {{ delay }}s ease-in', keyframes([
                        style({
                            opacity: 0,
                            transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                            offset: 0,
                        }),
                        style({
                            opacity: 1,
                            transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                            offset: 0.4,
                        }),
                        style({
                            transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                            offset: 0.6,
                        }),
                        style({
                            transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                            offset: 0.8,
                        }),
                        style({
                            transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                            offset: 1,
                        }),
                    ])),
                ], { params: { timing: 1, delay: 0, rotateX: 1, rotateY: 0 } }),
            ]),
            trigger('negativeState', [
                transition(':enter', useAnimation(shake)),
            ]),
        ],
        styles: ["mat-card{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;place-content:stretch center;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-flex:1;-ms-flex:1 1 0%;flex:1 1 0%}mat-card mat-card-content{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:100%;place-content:stretch flex-start;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}mat-card mat-card-content mat-icon{margin-right:10px}mat-card mat-card-content .info-row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex}"]
    })
], MatPasswordStrengthInfoComponent);
export { MatPasswordStrengthInfoComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9wYXNzd29yZC1zdHJlbmd0aC8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21wb25lbnQvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUN0RyxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMvSCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUF1RTdDLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWdDO0lBckU3QztRQTJFRSxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4Qix5QkFBb0IsR0FBRyx1Q0FBdUMsQ0FBQztRQUcvRCx5QkFBb0IsR0FBRyx1Q0FBdUMsQ0FBQztRQUcvRCxzQkFBaUIsR0FBRyx1Q0FBdUMsQ0FBQztRQUc1RCw0QkFBdUIsR0FBRyx5Q0FBeUMsQ0FBQztJQVd0RSxDQUFDO0lBTkMsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLHFCQUFxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxhQUFhLENBQUE7U0FDeEY7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQTFCQztJQURDLEtBQUssRUFBRTtzQ0FDVyw0QkFBNEI7MkVBQUM7QUFHaEQ7SUFEQyxLQUFLLEVBQUU7O3lF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cHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50fSBmcm9tICcuLi9tYXQtcGFzc3dvcmQtc3RyZW5ndGgvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudCc7XG5pbXBvcnQge2FuaW1hdGUsIGFuaW1hdGVDaGlsZCwga2V5ZnJhbWVzLCBxdWVyeSwgc3RhZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIsIHVzZUFuaW1hdGlvbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge3NoYWtlfSBmcm9tICcuLi8uLi9hbmltYXRpb25zL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8nLFxuICBleHBvcnRBczogJ21hdFBhc3N3b3JkU3RyZW5ndGhJbmZvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8uY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIC8vIG5pY2Ugc3RhZ2dlciBlZmZlY3Qgd2hlbiBzaG93aW5nIGV4aXN0aW5nIGVsZW1lbnRzXG4gICAgdHJpZ2dlcignbGlzdCcsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgLy8gY2hpbGQgYW5pbWF0aW9uIHNlbGVjdG9yICsgc3RhZ2dlclxuICAgICAgICBxdWVyeSgnQGl0ZW1zJyxcbiAgICAgICAgICBzdGFnZ2VyKDMwMCwgYW5pbWF0ZUNoaWxkKCkpXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2l0ZW1zJywgW1xuICAgICAgLy8gY3ViaWMtYmV6aWVyIGZvciBhIHRpbnkgYm91bmNpbmcgZmVlbFxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMC41KScsIG9wYWNpdHk6IDB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMXMgY3ViaWMtYmV6aWVyKC44LC0wLjYsMC4yLDEuNSknLFxuICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKScsIG9wYWNpdHk6IDF9KSlcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMSknLCBvcGFjaXR5OiAxLCBoZWlnaHQ6ICcqJ30pLFxuICAgICAgICBhbmltYXRlKCcxcyBjdWJpYy1iZXppZXIoLjgsLTAuNiwwLjIsMS41KScsXG4gICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDAuNSknLCBvcGFjaXR5OiAwLCBoZWlnaHQ6ICcwcHgnLCBtYXJnaW46ICcwcHgnfSkpXG4gICAgICBdKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdwb3NpdGl2ZVN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7J2JhY2tmYWNlLXZpc2liaWxpdHknOiAndmlzaWJsZSd9KSxcbiAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAne3sgdGltaW5nIH19cyB7eyBkZWxheSB9fXMgZWFzZS1pbicsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAgICdwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2Qoe3sgcm90YXRlWCB9fSwge3sgcm90YXRlWSB9fSwgMCwgOTBkZWcpJyxcbiAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAncGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKHt7IHJvdGF0ZVggfX0sIHt7IHJvdGF0ZVkgfX0sIDAsIC0yMGRlZyknLFxuICAgICAgICAgICAgICBvZmZzZXQ6IDAuNCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCAxMGRlZyknLFxuICAgICAgICAgICAgICBvZmZzZXQ6IDAuNixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCAtNWRlZyknLFxuICAgICAgICAgICAgICBvZmZzZXQ6IDAuOCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2QoMCwgMCwgMCwgMCknLFxuICAgICAgICAgICAgICBvZmZzZXQ6IDEsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBdKVxuICAgICAgICApLFxuICAgICAgXSwge3BhcmFtczoge3RpbWluZzogMSwgZGVsYXk6IDAsIHJvdGF0ZVg6IDEsIHJvdGF0ZVk6IDB9fSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignbmVnYXRpdmVTdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIHVzZUFuaW1hdGlvbihzaGFrZSkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQYXNzd29yZFN0cmVuZ3RoSW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcGFzc3dvcmRDb21wb25lbnQ6IE1hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnQ7XG5cbiAgQElucHV0KClcbiAgZW5hYmxlU2NvcmVJbmZvID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgbG93ZXJDYXNlQ3JpdGVyaWFNc2cgPSAnY29udGFpbnMgYXQgbGVhc3Qgb25lIGxvd2VyIGNoYXJhY3Rlcic7XG5cbiAgQElucHV0KClcbiAgdXBwZXJDYXNlQ3JpdGVyaWFNc2cgPSAnY29udGFpbnMgYXQgbGVhc3Qgb25lIHVwcGVyIGNoYXJhY3Rlcic7XG5cbiAgQElucHV0KClcbiAgZGlnaXRzQ3JpdGVyaWFNc2cgPSAnY29udGFpbnMgYXQgbGVhc3Qgb25lIGRpZ2l0IGNoYXJhY3Rlcic7XG5cbiAgQElucHV0KClcbiAgc3BlY2lhbENoYXJzQ3JpdGVyaWFNc2cgPSAnY29udGFpbnMgYXQgbGVhc3Qgb25lIHNwZWNpYWwgY2hhcmFjdGVyJztcblxuICBASW5wdXQoKVxuICBtaW5DaGFyc0NyaXRlcmlhTXNnOiBzdHJpbmc7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm1pbkNoYXJzQ3JpdGVyaWFNc2cpIHtcbiAgICAgIHRoaXMubWluQ2hhcnNDcml0ZXJpYU1zZyA9IGBjb250YWlucyBhdCBsZWFzdCAke3RoaXMucGFzc3dvcmRDb21wb25lbnQubWlufSBjaGFyYWN0ZXJzYFxuICAgIH1cbiAgfVxuXG59XG4iXX0=