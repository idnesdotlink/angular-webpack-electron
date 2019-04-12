import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
let MatPassToggleVisibilityComponent = class MatPassToggleVisibilityComponent {
    constructor() {
        this._type = 'text';
    }
    get type() {
        return this.isVisible ? 'text' : 'password';
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], MatPassToggleVisibilityComponent.prototype, "isVisible", void 0);
MatPassToggleVisibilityComponent = tslib_1.__decorate([
    Component({
        selector: 'mat-pass-toggle-visibility',
        template: "<button (click)=\"isVisible = !isVisible\"\n        class=\"mat-icon-button cdk-focused cdk-mouse-focused\" mat-icon-button\n        matRippleCentered=\"true\"\n        matRipple>\n  <mat-icon>{{isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>\n</button>\n\n",
        encapsulation: ViewEncapsulation.None,
        styles: [""]
    })
], MatPassToggleVisibilityComponent);
export { MatPassToggleVisibilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9wYXNzd29yZC1zdHJlbmd0aC8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVVsRSxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQU43QztRQVdFLFVBQUssR0FBUyxNQUFNLENBQUM7SUFNdkIsQ0FBQztJQUpDLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQztDQUVGLENBQUE7QUFSQztJQURDLEtBQUssRUFBRTs7bUVBQ1c7QUFIUixnQ0FBZ0M7SUFONUMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDRCQUE0QjtRQUN0Qyx1UkFBMEQ7UUFFMUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O0tBQ3RDLENBQUM7R0FDVyxnQ0FBZ0MsQ0FXNUM7U0FYWSxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBUeXBlID0gJ3RleHQnIHwgJ3Bhc3N3b3JkJyA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wYXNzLXRvZ2dsZS12aXNpYmlsaXR5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1wYXNzLXRvZ2dsZS12aXNpYmlsaXR5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuXG4gIF90eXBlOiBUeXBlID0gJ3RleHQnO1xuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmlzaWJsZSA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gIH1cblxufVxuIl19