import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let WithoutPipe = class WithoutPipe {
    transform(input, args = []) {
        return Array.isArray(input)
            ? // tslint:disable-next-line:no-bitwise
                input.filter(e => !~args.indexOf(e))
            : input;
    }
};
WithoutPipe = tslib_1.__decorate([
    Pipe({ name: 'without' })
], WithoutPipe);
export { WithoutPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aG91dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS93aXRob3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBSXRCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsT0FBYyxFQUFFO1FBQ3BDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDekIsQ0FBQyxDQUFDLHNDQUFzQztnQkFDdEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDWixDQUFDO0NBQ0YsQ0FBQTtBQVZZLFdBQVc7SUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ2IsV0FBVyxDQVV2QjtTQVZZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ3dpdGhvdXQnIH0pXG5leHBvcnQgY2xhc3MgV2l0aG91dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSwgYXJncz86IGFueVtdKTogYW55W107XG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBhcmdzPzogYW55W10pOiBhbnk7XG5cbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIGFyZ3M6IGFueVtdID0gW10pOiBhbnlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpXG4gICAgICA/IC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gICAgICAgIGlucHV0LmZpbHRlcihlID0+ICF+YXJncy5pbmRleE9mKGUpKVxuICAgICAgOiBpbnB1dDtcbiAgfVxufVxuIl19