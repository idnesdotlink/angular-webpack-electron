import * as tslib_1 from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** Mixin to augment a component or directive with a `disabled` property. */
export function mixinDisabled(base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread(args)) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                var newValue = coerceBooleanProperty(value);
                if (this._disabled !== newValue) {
                    this._disabled = newValue;
                    this.onDisabledChange(this._disabled);
                }
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.onDisabledChange = function (v) {
            /** NOT IMPLEMENTED, this needs to be overriden by subclasses if needed */
        };
        return class_1;
    }(base));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZWQubWl4aW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3RlcmEtZGF0YS8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYmVoYXZpb3JzL2Rpc2FibGVkLm1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVU5RCw0RUFBNEU7QUFDNUUsTUFBTSxVQUFVLGFBQWEsQ0FBNEIsSUFBTztJQUM5RDtRQUFxQixtQ0FBSTtRQUd2QjtZQUFZLGNBQWM7aUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztnQkFBZCx5QkFBYzs7WUFBMUIsZ0RBQ1csSUFBSSxXQUNkO1lBSk8sZUFBUyxHQUFZLEtBQUssQ0FBQzs7UUFJbkMsQ0FBQztRQUVELHNCQUFJLDZCQUFRO2lCQUFaO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN4QixDQUFDO2lCQUNELFVBQWEsS0FBYztnQkFDekIsSUFBSSxRQUFRLEdBQVkscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO29CQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN2QztZQUNILENBQUM7OztXQVBBO1FBU0Qsa0NBQWdCLEdBQWhCLFVBQWlCLENBQVU7WUFDekIsMEVBQTBFO1FBQzVFLENBQUM7UUFDSCxjQUFDO0lBQUQsQ0FBQyxBQXJCTSxDQUFjLElBQUksR0FxQnZCO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbnR5cGUgQ29uc3RydWN0b3I8VD4gPSBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBUO1xuXG4vKiogSW50ZXJmYWNlIHRvIGltcGxlbWVudCB3aGVuIGFwcGx5aW5nIHRoZSBkaXNhYmxlZCBtaXhpbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ2FuRGlzYWJsZSB7XG4gIGRpc2FibGVkOiBib29sZWFuO1xuICBvbkRpc2FibGVkQ2hhbmdlKHY6IGJvb2xlYW4pOiB2b2lkO1xufVxuXG4vKiogTWl4aW4gdG8gYXVnbWVudCBhIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgd2l0aCBhIGBkaXNhYmxlZGAgcHJvcGVydHkuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5EaXNhYmxlZDxUIGV4dGVuZHMgQ29uc3RydWN0b3I8e30+PihiYXNlOiBUKTogQ29uc3RydWN0b3I8SUNhbkRpc2FibGU+ICYgVCB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIGxldCBuZXdWYWx1ZTogYm9vbGVhbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMub25EaXNhYmxlZENoYW5nZSh0aGlzLl9kaXNhYmxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNhYmxlZENoYW5nZSh2OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAvKiogTk9UIElNUExFTUVOVEVELCB0aGlzIG5lZWRzIHRvIGJlIG92ZXJyaWRlbiBieSBzdWJjbGFzc2VzIGlmIG5lZWRlZCAqL1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==