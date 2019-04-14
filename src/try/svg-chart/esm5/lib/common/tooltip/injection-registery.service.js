import * as tslib_1 from "tslib";
var InjectionRegistery = /** @class */ (function () {
    function InjectionRegistery(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    InjectionRegistery.prototype.getByType = function (type) {
        if (type === void 0) { type = this.type; }
        return this.components.get(type);
    };
    InjectionRegistery.prototype.create = function (bindings) {
        return this.createByType(this.type, bindings);
    };
    InjectionRegistery.prototype.createByType = function (type, bindings) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    };
    InjectionRegistery.prototype.destroy = function (instance) {
        var compsByType = this.components.get(instance.componentType);
        if (compsByType) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegistery.prototype.destroyAll = function () {
        this.destroyByType(this.type);
    };
    InjectionRegistery.prototype.destroyByType = function (type) {
        var e_1, _a;
        var comps = this.components.get(type);
        if (comps) {
            try {
                for (var comps_1 = tslib_1.__values(comps), comps_1_1 = comps_1.next(); !comps_1_1.done; comps_1_1 = comps_1.next()) {
                    var comp = comps_1_1.value;
                    this.destroy(comp);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (comps_1_1 && !comps_1_1.done && (_a = comps_1.return)) _a.call(comps_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    InjectionRegistery.prototype.assignDefaults = function (bindings) {
        var _a = this.defaults, inputs = _a.inputs, outputs = _a.outputs;
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = Object.assign(inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = Object.assign(outputs, bindings.outputs);
        }
        return bindings;
    };
    InjectionRegistery.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegistery.prototype.register = function (type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        var types = this.components.get(type);
        types.push(component);
    };
    return InjectionRegistery;
}());
export { InjectionRegistery };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3Rvb2x0aXAvaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTtJQU9FLDRCQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUgzQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBa0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVTLENBQUM7SUFFMUQsc0NBQVMsR0FBVCxVQUFVLElBQXFCO1FBQXJCLHFCQUFBLEVBQUEsT0FBWSxJQUFJLENBQUMsSUFBSTtRQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxtQ0FBTSxHQUFOLFVBQU8sUUFBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLElBQVMsRUFBRSxRQUFhO1FBQ25DLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsUUFBUTtRQUNkLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRSxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFMUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BCLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsSUFBSTs7UUFDaEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsSUFBSSxLQUFLLEVBQUU7O2dCQUNULEtBQWtCLElBQUEsVUFBQSxpQkFBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7b0JBQXJCLElBQU0sSUFBSSxrQkFBQTtvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQjs7Ozs7Ozs7O1NBQ0Y7SUFDSCxDQUFDO0lBRVMsMkNBQWMsR0FBeEIsVUFBeUIsUUFBUTtRQUN6QixJQUFBLGtCQUFtQyxFQUFqQyxrQkFBTSxFQUFFLG9CQUF5QixDQUFDO1FBRTFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUN6QyxRQUFRLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFEO1FBRUQsSUFBSSxPQUFPLEVBQUU7WUFDWCxRQUFRLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3RDtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFUyw0Q0FBZSxHQUF6QixVQUEwQixJQUFJLEVBQUUsUUFBUTtRQUN0QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFUyxxQ0FBUSxHQUFsQixVQUFtQixJQUFJLEVBQUUsU0FBUztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUgseUJBQUM7QUFBRCxDQUFDLEFBckZELElBcUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbmplY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmplY3Rpb25SZWdpc3Rlcnkge1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB0eXBlOiBhbnk7XG5cbiAgcHJvdGVjdGVkIGRlZmF1bHRzOiBhbnkgPSB7fTtcbiAgcHJvdGVjdGVkIGNvbXBvbmVudHM6IE1hcDxhbnksIGFueT4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluamVjdGlvblNlcnZpY2U6IEluamVjdGlvblNlcnZpY2UpIHsgfVxuXG4gIGdldEJ5VHlwZSh0eXBlOiBhbnkgPSB0aGlzLnR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmdldCh0eXBlKTtcbiAgfVxuXG4gIGNyZWF0ZShiaW5kaW5nczogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVCeVR5cGUodGhpcy50eXBlLCBiaW5kaW5ncyk7XG4gIH1cblxuICBjcmVhdGVCeVR5cGUodHlwZTogYW55LCBiaW5kaW5nczogYW55KTogYW55IHtcbiAgICBiaW5kaW5ncyA9IHRoaXMuYXNzaWduRGVmYXVsdHMoYmluZGluZ3MpO1xuXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5pbmplY3RDb21wb25lbnQodHlwZSwgYmluZGluZ3MpO1xuICAgIHRoaXMucmVnaXN0ZXIodHlwZSwgY29tcG9uZW50KTtcblxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cblxuICBkZXN0cm95KGluc3RhbmNlKTogdm9pZCB7XG4gICAgY29uc3QgY29tcHNCeVR5cGUgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGluc3RhbmNlLmNvbXBvbmVudFR5cGUpO1xuXG4gICAgaWYgKGNvbXBzQnlUeXBlKSB7XG4gICAgICBjb25zdCBpZHggPSBjb21wc0J5VHlwZS5pbmRleE9mKGluc3RhbmNlKTtcblxuICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBzQnlUeXBlW2lkeF07XG4gICAgICAgIGNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgIGNvbXBzQnlUeXBlLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95QnlUeXBlKHRoaXMudHlwZSk7XG4gIH1cblxuICBkZXN0cm95QnlUeXBlKHR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wcyA9IHRoaXMuY29tcG9uZW50cy5nZXQodHlwZSk7XG5cbiAgICBpZiAoY29tcHMpIHtcbiAgICAgIGZvcihjb25zdCBjb21wIG9mIGNvbXBzKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveShjb21wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXNzaWduRGVmYXVsdHMoYmluZGluZ3MpOiBhbnkge1xuICAgIGNvbnN0IHsgaW5wdXRzLCBvdXRwdXRzIH0gPSB0aGlzLmRlZmF1bHRzO1xuXG4gICAgaWYgKCFiaW5kaW5ncy5pbnB1dHMgJiYgIWJpbmRpbmdzLm91dHB1dHMpIHtcbiAgICAgIGJpbmRpbmdzID0geyBpbnB1dHM6IGJpbmRpbmdzIH07XG4gICAgfVxuXG4gICAgaWYgKGlucHV0cykge1xuICAgICAgYmluZGluZ3MuaW5wdXRzID0gT2JqZWN0LmFzc2lnbihpbnB1dHMsIGJpbmRpbmdzLmlucHV0cyk7XG4gICAgfVxuXG4gICAgaWYgKG91dHB1dHMpIHtcbiAgICAgIGJpbmRpbmdzLm91dHB1dHMgPSBPYmplY3QuYXNzaWduKG91dHB1dHMsIGJpbmRpbmdzLm91dHB1dHMpO1xuICAgIH1cblxuICAgIHJldHVybiBiaW5kaW5ncztcbiAgfVxuXG4gIHByb3RlY3RlZCBpbmplY3RDb21wb25lbnQodHlwZSwgYmluZGluZ3MpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0aW9uU2VydmljZS5hcHBlbmRDb21wb25lbnQodHlwZSwgYmluZGluZ3MpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyKHR5cGUsIGNvbXBvbmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb21wb25lbnRzLmhhcyh0eXBlKSkge1xuICAgICAgdGhpcy5jb21wb25lbnRzLnNldCh0eXBlLCBbXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZXMgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KHR5cGUpO1xuICAgIHR5cGVzLnB1c2goY29tcG9uZW50KTtcbiAgfVxuXG59XG4iXX0=