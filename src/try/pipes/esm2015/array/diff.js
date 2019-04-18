import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let DiffPipe = class DiffPipe {
    transform(input, ...args) {
        if (!Array.isArray(input)) {
            return input;
        }
        // tslint:disable-next-line no-bitwise
        return args.reduce((d, c) => d.filter((e) => !~c.indexOf(e)), input);
    }
};
DiffPipe = tslib_1.__decorate([
    Pipe({ name: 'diff' })
], DiffPipe);
export { DiffPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9kaWZmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBSW5CLFNBQVMsQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFXO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxzQ0FBc0M7UUFDdEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQ0YsQ0FBQTtBQVpZLFFBQVE7SUFEcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0dBQ1YsUUFBUSxDQVlwQjtTQVpZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2RpZmYnIH0pXG5leHBvcnQgY2xhc3MgRGlmZlBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSwgLi4uYXJnczogYW55W10pOiBhbnlbXTtcbiAgdHJhbnNmb3JtPFQ+KGlucHV0OiBULCAuLi5hcmdzOiBhbnlbXSk6IFQ7XG5cbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICByZXR1cm4gYXJncy5yZWR1Y2UoKGQsIGMpID0+IGQuZmlsdGVyKChlOiBhbnkpID0+ICF+Yy5pbmRleE9mKGUpKSwgaW5wdXQpO1xuICB9XG59XG4iXX0=