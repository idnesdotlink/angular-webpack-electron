import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
let ContextMenuItemDirective = class ContextMenuItemDirective {
    constructor(template, elementRef) {
        this.template = template;
        this.elementRef = elementRef;
        this.divider = false;
        this.enabled = true;
        this.passive = false;
        this.visible = true;
        this.execute = new EventEmitter();
        this.isActive = false;
    }
    get disabled() {
        return this.passive ||
            this.divider ||
            !this.evaluateIfFunction(this.enabled, this.currentItem);
    }
    evaluateIfFunction(value, item) {
        if (value instanceof Function) {
            return value(item);
        }
        return value;
    }
    setActiveStyles() {
        this.isActive = true;
    }
    setInactiveStyles() {
        this.isActive = false;
    }
    triggerExecute(item, $event) {
        if (!this.evaluateIfFunction(this.enabled, item)) {
            return;
        }
        this.execute.emit({ event: $event, item });
    }
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
export { ContextMenuItemDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tZW51Lml0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPaEcsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFnQm5DLFlBQW1CLFFBQW9DLEVBQVMsVUFBc0I7UUFBbkUsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBZHRFLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUF1QyxJQUFJLENBQUM7UUFDbkQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQXVDLElBQUksQ0FBQztRQUNsRCxZQUFPLEdBQThDLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEYsYUFBUSxHQUFHLEtBQUssQ0FBQztJQU9rRSxDQUFDO0lBTjNGLElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPO1lBQ2pCLElBQUksQ0FBQyxPQUFPO1lBQ1osQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUlNLGtCQUFrQixDQUFDLEtBQVUsRUFBRSxJQUFTO1FBQzdDLElBQUksS0FBSyxZQUFZLFFBQVEsRUFBRTtZQUM3QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUNNLGlCQUFpQjtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRU0sY0FBYyxDQUFDLElBQVMsRUFBRSxNQUFtQztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDaEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGLENBQUE7QUFyQ1U7SUFBUixLQUFLLEVBQUU7O3lEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTs7eURBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFOzt5REFBMkQ7QUFDMUQ7SUFBUixLQUFLLEVBQUU7O3lEQUF3QjtBQUN2QjtJQUFSLEtBQUssRUFBRTs7eURBQTJEO0FBQ3pEO0lBQVQsTUFBTSxFQUFFO3NDQUFpQixZQUFZO3lEQUFtRDtBQU45RSx3QkFBd0I7SUFMcEMsU0FBUyxDQUFDO1FBQ1QsNENBQTRDO1FBQzVDLFFBQVEsRUFBRSxtQkFBbUI7S0FFOUIsQ0FBQzs2Q0FpQjZCLFdBQVcsRUFBb0MsVUFBVTtHQWhCM0Usd0JBQXdCLENBc0NwQztTQXRDWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIaWdobGlnaHRhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvKiB0c2xpbnQ6ZGlzYWJsZTpkaXJlY3RpdmUtc2VsZWN0b3ItdHlwZSAqL1xuICBzZWxlY3RvcjogJ1tjb250ZXh0TWVudUl0ZW1dJyxcbiAgLyogdHNsaW50OmVuYWJsZTpkaXJlY3RpdmUtc2VsZWN0b3ItdHlwZSAqL1xufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudUl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBIaWdobGlnaHRhYmxlIHtcbiAgQElucHV0KCkgcHVibGljIHN1Yk1lbnU6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGRpdmlkZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gfCAoKGl0ZW06IGFueSkgPT4gYm9vbGVhbikgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFzc2l2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgdmlzaWJsZTogYm9vbGVhbiB8ICgoaXRlbTogYW55KSA9PiBib29sZWFuKSA9IHRydWU7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZXhlY3V0ZTogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IEV2ZW50LCBpdGVtOiBhbnkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGN1cnJlbnRJdGVtOiBhbnk7XG4gIHB1YmxpYyBpc0FjdGl2ZSA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLnBhc3NpdmUgfHxcbiAgICAgIHRoaXMuZGl2aWRlciB8fFxuICAgICAgIXRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKHRoaXMuZW5hYmxlZCwgdGhpcy5jdXJyZW50SXRlbSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgaXRlbTogYW55IH0+LCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgcHVibGljIGV2YWx1YXRlSWZGdW5jdGlvbih2YWx1ZTogYW55LCBpdGVtOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUoaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gIH1cbiAgcHVibGljIHNldEluYWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyB0cmlnZ2VyRXhlY3V0ZShpdGVtOiBhbnksICRldmVudD86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV2YWx1YXRlSWZGdW5jdGlvbih0aGlzLmVuYWJsZWQsIGl0ZW0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZXhlY3V0ZS5lbWl0KHsgZXZlbnQ6ICRldmVudCwgaXRlbSB9KTtcbiAgfVxufVxuIl19