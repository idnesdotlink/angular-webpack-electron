import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let FlattenPipe = class FlattenPipe {
    transform(input, shallow = false) {
        if (!Array.isArray(input)) {
            return input;
        }
        return shallow ? [].concat.apply([], input) : this.flatten(input);
    }
    flatten(array) {
        return array.reduce((arr, elm) => {
            if (Array.isArray(elm)) {
                return arr.concat(this.flatten(elm));
            }
            return arr.concat(elm);
        }, []);
    }
};
FlattenPipe = tslib_1.__decorate([
    Pipe({ name: 'flatten' })
], FlattenPipe);
export { FlattenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJhcnJheS9mbGF0dGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBSXRCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsVUFBbUIsS0FBSztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU8sT0FBTyxDQUFDLEtBQVk7UUFDMUIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBVSxFQUFFLEdBQVEsRUFBRSxFQUFFO1lBQzNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0NBQ0YsQ0FBQTtBQXJCWSxXQUFXO0lBRHZCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztHQUNiLFdBQVcsQ0FxQnZCO1NBckJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2ZsYXR0ZW4nIH0pXG5leHBvcnQgY2xhc3MgRmxhdHRlblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSwgc2hhbGxvdz86IGJvb2xlYW4pOiBhbnlbXTtcbiAgdHJhbnNmb3JtPFQ+KGlucHV0OiBULCBzaGFsbG93PzogYm9vbGVhbik6IFQ7XG5cbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIHNoYWxsb3c6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIHJldHVybiBzaGFsbG93ID8gW10uY29uY2F0LmFwcGx5KFtdLCBpbnB1dCkgOiB0aGlzLmZsYXR0ZW4oaW5wdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBmbGF0dGVuKGFycmF5OiBhbnlbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKChhcnI6IGFueVtdLCBlbG06IGFueSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxtKSkge1xuICAgICAgICByZXR1cm4gYXJyLmNvbmNhdCh0aGlzLmZsYXR0ZW4oZWxtKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcnIuY29uY2F0KGVsbSk7XG4gICAgfSwgW10pO1xuICB9XG59XG4iXX0=