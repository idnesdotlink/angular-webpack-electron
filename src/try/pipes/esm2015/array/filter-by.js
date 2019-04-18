import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { extractDeepPropertyByMapKey, extractDeepPropertyByParentMapKey, isBoolean, isNumberFinite, isString, isUndefined, } from '../helpers/helpers';
// tslint:disable no-bitwise
let FilterByPipe = class FilterByPipe {
    transform(input, props, search = '', strict = false) {
        if (!Array.isArray(input) ||
            (!Array.isArray(search) && !isString(search) && !isNumberFinite(search) && !isBoolean(search))) {
            return input;
        }
        const terms = String(search)
            .toLowerCase()
            .split(',');
        return input.filter(obj => {
            return props.some(prop => {
                return terms.some(term => {
                    const value = extractDeepPropertyByMapKey(obj, prop);
                    const { props, tail } = extractDeepPropertyByParentMapKey(obj, prop);
                    if (isUndefined(value) && !isUndefined(props) && Array.isArray(props)) {
                        return props.some(parent => {
                            const str = String(parent[tail]).toLowerCase();
                            return strict ? str === term : !!~str.indexOf(term);
                        });
                    }
                    if (isUndefined(value)) {
                        return false;
                    }
                    const strValue = String(value).toLowerCase();
                    return strict ? term === strValue : !!~strValue.indexOf(term);
                });
            });
        });
    }
};
FilterByPipe = tslib_1.__decorate([
    Pipe({ name: 'filterBy' })
], FilterByPipe);
export { FilterByPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImFycmF5L2ZpbHRlci1ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixpQ0FBaUMsRUFDakMsU0FBUyxFQUNULGNBQWMsRUFDZCxRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsNEJBQTRCO0FBRTVCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFHdkIsU0FBUyxDQUFDLEtBQVUsRUFBRSxLQUFvQixFQUFFLFNBQWMsRUFBRSxFQUFFLFNBQWtCLEtBQUs7UUFDbkYsSUFDRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQzlGO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDekIsV0FBVyxFQUFFO2FBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QixNQUFNLEtBQUssR0FBRywyQkFBMkIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JELE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsaUNBQWlDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUVyRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNyRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7NEJBQ3pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFFL0MsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RELENBQUMsQ0FBQyxDQUFDO3FCQUNKO29CQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN0QixPQUFPLEtBQUssQ0FBQztxQkFDZDtvQkFFRCxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBRXJELE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXhDWSxZQUFZO0lBRHhCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztHQUNkLFlBQVksQ0F3Q3hCO1NBeENZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBleHRyYWN0RGVlcFByb3BlcnR5QnlNYXBLZXksXG4gIGV4dHJhY3REZWVwUHJvcGVydHlCeVBhcmVudE1hcEtleSxcbiAgaXNCb29sZWFuLFxuICBpc051bWJlckZpbml0ZSxcbiAgaXNTdHJpbmcsXG4gIGlzVW5kZWZpbmVkLFxufSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZSBuby1iaXR3aXNlXG5AUGlwZSh7IG5hbWU6ICdmaWx0ZXJCeScgfSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJCeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnlbXSwgcHJvcHM6IEFycmF5PHN0cmluZz4sIHNlYXJjaD86IGFueSwgc3RyaWN0PzogYm9vbGVhbik6IGFueVtdO1xuICB0cmFuc2Zvcm08VD4oaW5wdXQ6IFQsIHByb3BzOiBBcnJheTxzdHJpbmc+LCBzZWFyY2g/OiBhbnksIHN0cmljdD86IGJvb2xlYW4pOiBUO1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgcHJvcHM6IEFycmF5PHN0cmluZz4sIHNlYXJjaDogYW55ID0gJycsIHN0cmljdDogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcbiAgICBpZiAoXG4gICAgICAhQXJyYXkuaXNBcnJheShpbnB1dCkgfHxcbiAgICAgICghQXJyYXkuaXNBcnJheShzZWFyY2gpICYmICFpc1N0cmluZyhzZWFyY2gpICYmICFpc051bWJlckZpbml0ZShzZWFyY2gpICYmICFpc0Jvb2xlYW4oc2VhcmNoKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXJtcyA9IFN0cmluZyhzZWFyY2gpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnNwbGl0KCcsJyk7XG5cbiAgICByZXR1cm4gaW5wdXQuZmlsdGVyKG9iaiA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMuc29tZShwcm9wID0+IHtcbiAgICAgICAgcmV0dXJuIHRlcm1zLnNvbWUodGVybSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBleHRyYWN0RGVlcFByb3BlcnR5QnlNYXBLZXkob2JqLCBwcm9wKTtcbiAgICAgICAgICBjb25zdCB7IHByb3BzLCB0YWlsIH0gPSBleHRyYWN0RGVlcFByb3BlcnR5QnlQYXJlbnRNYXBLZXkob2JqLCBwcm9wKTtcblxuICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkgJiYgIWlzVW5kZWZpbmVkKHByb3BzKSAmJiBBcnJheS5pc0FycmF5KHByb3BzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzLnNvbWUocGFyZW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RyID0gU3RyaW5nKHBhcmVudFt0YWlsXSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICByZXR1cm4gc3RyaWN0ID8gc3RyID09PSB0ZXJtIDogISF+c3RyLmluZGV4T2YodGVybSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc3RyVmFsdWU6IHN0cmluZyA9IFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgIHJldHVybiBzdHJpY3QgPyB0ZXJtID09PSBzdHJWYWx1ZSA6ICEhfnN0clZhbHVlLmluZGV4T2YodGVybSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==