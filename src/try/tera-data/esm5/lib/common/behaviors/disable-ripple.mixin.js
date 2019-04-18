import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** Mixin to augment a component or directive with a `disabled` property. */
export function mixinDisableRipple(base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread(args)) || this;
            _this._disableRipple = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disableRipple", {
            get: function () {
                return this._disableRipple;
            },
            set: function (value) {
                var newValue = coerceBooleanProperty(value);
                if (this._disableRipple !== newValue) {
                    this._disableRipple = newValue;
                    this.onDisableRippleChange(this._disableRipple);
                }
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.onDisableRippleChange = function (v) {
            /** NOT IMPLEMENTED, this needs to be overriden by subclasses if needed */
        };
        return class_1;
    }(base));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZS1yaXBwbGUubWl4aW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3RlcmEtZGF0YS8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYmVoYXZpb3JzL2Rpc2FibGUtcmlwcGxlLm1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVU5RCw0RUFBNEU7QUFDNUUsTUFBTSxVQUFVLGtCQUFrQixDQUE0QixJQUFPO0lBQ25FO1FBQXFCLG1DQUFJO1FBR3ZCO1lBQVksY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUExQixnREFDVyxJQUFJLFdBQ2Q7WUFKTyxvQkFBYyxHQUFZLEtBQUssQ0FBQzs7UUFJeEMsQ0FBQztRQUVELHNCQUFJLGtDQUFhO2lCQUFqQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDN0IsQ0FBQztpQkFDRCxVQUFrQixLQUFjO2dCQUM5QixJQUFJLFFBQVEsR0FBWSxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFFBQVEsRUFBRTtvQkFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7b0JBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ2pEO1lBQ0gsQ0FBQzs7O1dBUEE7UUFTRCx1Q0FBcUIsR0FBckIsVUFBc0IsQ0FBVTtZQUM5QiwwRUFBMEU7UUFDNUUsQ0FBQztRQUNILGNBQUM7SUFBRCxDQUFDLEFBckJNLENBQWMsSUFBSSxHQXFCdkI7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxudHlwZSBDb25zdHJ1Y3RvcjxUPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbi8qKiBJbnRlcmZhY2UgdG8gaW1wbGVtZW50IHdoZW4gYXBwbHlpbmcgdGhlIGRpc2FibGVkIG1peGluICovXG5leHBvcnQgaW50ZXJmYWNlIElDYW5EaXNhYmxlUmlwcGxlIHtcbiAgZGlzYWJsZVJpcHBsZTogYm9vbGVhbjtcbiAgb25EaXNhYmxlUmlwcGxlQ2hhbmdlKHY6IGJvb2xlYW4pOiB2b2lkO1xufVxuXG4vKiogTWl4aW4gdG8gYXVnbWVudCBhIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgd2l0aCBhIGBkaXNhYmxlZGAgcHJvcGVydHkuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5EaXNhYmxlUmlwcGxlPFQgZXh0ZW5kcyBDb25zdHJ1Y3Rvcjx7fT4+KGJhc2U6IFQpOiBDb25zdHJ1Y3RvcjxJQ2FuRGlzYWJsZVJpcHBsZT4gJiBUIHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlUmlwcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlUmlwcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICBsZXQgbmV3VmFsdWU6IGJvb2xlYW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVSaXBwbGUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5vbkRpc2FibGVSaXBwbGVDaGFuZ2UodGhpcy5fZGlzYWJsZVJpcHBsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlUmlwcGxlQ2hhbmdlKHY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIC8qKiBOT1QgSU1QTEVNRU5URUQsIHRoaXMgbmVlZHMgdG8gYmUgb3ZlcnJpZGVuIGJ5IHN1YmNsYXNzZXMgaWYgbmVlZGVkICovXG4gICAgfVxuICB9O1xufVxuIl19