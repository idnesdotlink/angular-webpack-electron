import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
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
    return MatPassToggleVisibilityComponent;
}());
export { MatPassToggleVisibilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9wYXNzd29yZC1zdHJlbmd0aC8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVVsRTtJQU5BO1FBV0UsVUFBSyxHQUFTLE1BQU0sQ0FBQztJQU12QixDQUFDO0lBSkMsc0JBQUksa0RBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFORDtRQURDLEtBQUssRUFBRTs7dUVBQ1c7SUFIUixnQ0FBZ0M7UUFONUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0Qyx1UkFBMEQ7WUFFMUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7T0FDVyxnQ0FBZ0MsQ0FXNUM7SUFBRCx1Q0FBQztDQUFBLEFBWEQsSUFXQztTQVhZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG50eXBlIFR5cGUgPSAndGV4dCcgfCAncGFzc3dvcmQnIDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHknLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgX3R5cGU6IFR5cGUgPSAndGV4dCc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcbiAgfVxuXG59XG4iXX0=