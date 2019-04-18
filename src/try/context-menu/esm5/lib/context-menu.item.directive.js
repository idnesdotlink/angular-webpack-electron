import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
var ContextMenuItemDirective = /** @class */ (function () {
    function ContextMenuItemDirective(template, elementRef) {
        this.template = template;
        this.elementRef = elementRef;
        this.divider = false;
        this.enabled = true;
        this.passive = false;
        this.visible = true;
        this.execute = new EventEmitter();
        this.isActive = false;
    }
    Object.defineProperty(ContextMenuItemDirective.prototype, "disabled", {
        get: function () {
            return this.passive ||
                this.divider ||
                !this.evaluateIfFunction(this.enabled, this.currentItem);
        },
        enumerable: true,
        configurable: true
    });
    ContextMenuItemDirective.prototype.evaluateIfFunction = function (value, item) {
        if (value instanceof Function) {
            return value(item);
        }
        return value;
    };
    ContextMenuItemDirective.prototype.setActiveStyles = function () {
        this.isActive = true;
    };
    ContextMenuItemDirective.prototype.setInactiveStyles = function () {
        this.isActive = false;
    };
    ContextMenuItemDirective.prototype.triggerExecute = function (item, $event) {
        if (!this.evaluateIfFunction(this.enabled, item)) {
            return;
        }
        this.execute.emit({ event: $event, item: item });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuItemDirective.prototype, "subMenu", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuItemDirective.prototype, "divider", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuItemDirective.prototype, "enabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuItemDirective.prototype, "passive", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ContextMenuItemDirective.prototype, "visible", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ContextMenuItemDirective.prototype, "execute", void 0);
    ContextMenuItemDirective = tslib_1.__decorate([
        Directive({
            /* tslint:disable:directive-selector-type */
            selector: '[contextMenuItem]',
        }),
        tslib_1.__metadata("design:paramtypes", [TemplateRef, ElementRef])
    ], ContextMenuItemDirective);
    return ContextMenuItemDirective;
}());
export { ContextMenuItemDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPaEc7SUFnQkUsa0NBQW1CLFFBQW9DLEVBQVMsVUFBc0I7UUFBbkUsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBZHRFLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUF1QyxJQUFJLENBQUM7UUFDbkQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQXVDLElBQUksQ0FBQztRQUNsRCxZQUFPLEdBQThDLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEYsYUFBUSxHQUFHLEtBQUssQ0FBQztJQU9rRSxDQUFDO0lBTjNGLHNCQUFXLDhDQUFRO2FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTztnQkFDakIsSUFBSSxDQUFDLE9BQU87Z0JBQ1osQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFJTSxxREFBa0IsR0FBekIsVUFBMEIsS0FBVSxFQUFFLElBQVM7UUFDN0MsSUFBSSxLQUFLLFlBQVksUUFBUSxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sa0RBQWUsR0FBdEI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBQ00sb0RBQWlCLEdBQXhCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVNLGlEQUFjLEdBQXJCLFVBQXNCLElBQVMsRUFBRSxNQUFtQztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDaEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBcENRO1FBQVIsS0FBSyxFQUFFOzs2REFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7OzZEQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTs7NkRBQTJEO0lBQzFEO1FBQVIsS0FBSyxFQUFFOzs2REFBd0I7SUFDdkI7UUFBUixLQUFLLEVBQUU7OzZEQUEyRDtJQUN6RDtRQUFULE1BQU0sRUFBRTswQ0FBaUIsWUFBWTs2REFBbUQ7SUFOOUUsd0JBQXdCO1FBTHBDLFNBQVMsQ0FBQztZQUNULDRDQUE0QztZQUM1QyxRQUFRLEVBQUUsbUJBQW1CO1NBRTlCLENBQUM7aURBaUI2QixXQUFXLEVBQW9DLFVBQVU7T0FoQjNFLHdCQUF3QixDQXNDcEM7SUFBRCwrQkFBQztDQUFBLEFBdENELElBc0NDO1NBdENZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhpZ2hsaWdodGFibGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIC8qIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1zZWxlY3Rvci10eXBlICovXG4gIHNlbGVjdG9yOiAnW2NvbnRleHRNZW51SXRlbV0nLFxuICAvKiB0c2xpbnQ6ZW5hYmxlOmRpcmVjdGl2ZS1zZWxlY3Rvci10eXBlICovXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEhpZ2hsaWdodGFibGUge1xuICBASW5wdXQoKSBwdWJsaWMgc3ViTWVudTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZGl2aWRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbiB8ICgoaXRlbTogYW55KSA9PiBib29sZWFuKSA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXNzaXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuIHwgKChpdGVtOiBhbnkpID0+IGJvb2xlYW4pID0gdHJ1ZTtcbiAgQE91dHB1dCgpIHB1YmxpYyBleGVjdXRlOiBFdmVudEVtaXR0ZXI8eyBldmVudDogRXZlbnQsIGl0ZW06IGFueSB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgY3VycmVudEl0ZW06IGFueTtcbiAgcHVibGljIGlzQWN0aXZlID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFzc2l2ZSB8fFxuICAgICAgdGhpcy5kaXZpZGVyIHx8XG4gICAgICAhdGhpcy5ldmFsdWF0ZUlmRnVuY3Rpb24odGhpcy5lbmFibGVkLCB0aGlzLmN1cnJlbnRJdGVtKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8eyBpdGVtOiBhbnkgfT4sIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnksIGl0ZW06IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB2YWx1ZShpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgfVxuICBwdWJsaWMgc2V0SW5hY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHRyaWdnZXJFeGVjdXRlKGl0ZW06IGFueSwgJGV2ZW50PzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKHRoaXMuZW5hYmxlZCwgaXRlbSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5leGVjdXRlLmVtaXQoeyBldmVudDogJGV2ZW50LCBpdGVtIH0pO1xuICB9XG59XG4iXX0=