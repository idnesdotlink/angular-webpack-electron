import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { extractDeepPropertyByMapKey, extractDeepPropertyByParentMapKey, isBoolean, isNumberFinite, isString, isUndefined, } from '../helpers/helpers';
// tslint:disable no-bitwise
var FilterByPipe = /** @class */ (function () {
    function FilterByPipe() {
    }
    FilterByPipe.prototype.transform = function (input, props, search, strict) {
        if (search === void 0) { search = ''; }
        if (strict === void 0) { strict = false; }
        if (!Array.isArray(input) ||
            (!Array.isArray(search) && !isString(search) && !isNumberFinite(search) && !isBoolean(search))) {
            return input;
        }
        var terms = String(search)
            .toLowerCase()
            .split(',');
        return input.filter(function (obj) {
            return props.some(function (prop) {
                return terms.some(function (term) {
                    var value = extractDeepPropertyByMapKey(obj, prop);
                    var _a = extractDeepPropertyByParentMapKey(obj, prop), props = _a.props, tail = _a.tail;
                    if (isUndefined(value) && !isUndefined(props) && Array.isArray(props)) {
                        return props.some(function (parent) {
                            var str = String(parent[tail]).toLowerCase();
                            return strict ? str === term : !!~str.indexOf(term);
                        });
                    }
                    if (isUndefined(value)) {
                        return false;
                    }
                    var strValue = String(value).toLowerCase();
                    return strict ? term === strValue : !!~strValue.indexOf(term);
                });
            });
        });
    };
    FilterByPipe = tslib_1.__decorate([
        Pipe({ name: 'filterBy' })
    ], FilterByPipe);
    return FilterByPipe;
}());
export { FilterByPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWJ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImFycmF5L2ZpbHRlci1ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixpQ0FBaUMsRUFDakMsU0FBUyxFQUNULGNBQWMsRUFDZCxRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsNEJBQTRCO0FBRTVCO0lBQUE7SUF3Q0EsQ0FBQztJQXJDQyxnQ0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLEtBQW9CLEVBQUUsTUFBZ0IsRUFBRSxNQUF1QjtRQUF6Qyx1QkFBQSxFQUFBLFdBQWdCO1FBQUUsdUJBQUEsRUFBQSxjQUF1QjtRQUNuRixJQUNFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDckIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDOUY7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN6QixXQUFXLEVBQUU7YUFDYixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFZCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ3BCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7b0JBQ3BCLElBQU0sS0FBSyxHQUFHLDJCQUEyQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0MsSUFBQSxpREFBOEQsRUFBNUQsZ0JBQUssRUFBRSxjQUFxRCxDQUFDO29CQUVyRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNyRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNOzRCQUN0QixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBRS9DLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0RCxDQUFDLENBQUMsQ0FBQztxQkFDSjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDdEIsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7b0JBRUQsSUFBTSxRQUFRLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUVyRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXZDVSxZQUFZO1FBRHhCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztPQUNkLFlBQVksQ0F3Q3hCO0lBQUQsbUJBQUM7Q0FBQSxBQXhDRCxJQXdDQztTQXhDWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZXh0cmFjdERlZXBQcm9wZXJ0eUJ5TWFwS2V5LFxuICBleHRyYWN0RGVlcFByb3BlcnR5QnlQYXJlbnRNYXBLZXksXG4gIGlzQm9vbGVhbixcbiAgaXNOdW1iZXJGaW5pdGUsXG4gIGlzU3RyaW5nLFxuICBpc1VuZGVmaW5lZCxcbn0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuLy8gdHNsaW50OmRpc2FibGUgbm8tYml0d2lzZVxuQFBpcGUoeyBuYW1lOiAnZmlsdGVyQnknIH0pXG5leHBvcnQgY2xhc3MgRmlsdGVyQnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55W10sIHByb3BzOiBBcnJheTxzdHJpbmc+LCBzZWFyY2g/OiBhbnksIHN0cmljdD86IGJvb2xlYW4pOiBhbnlbXTtcbiAgdHJhbnNmb3JtPFQ+KGlucHV0OiBULCBwcm9wczogQXJyYXk8c3RyaW5nPiwgc2VhcmNoPzogYW55LCBzdHJpY3Q/OiBib29sZWFuKTogVDtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIHByb3BzOiBBcnJheTxzdHJpbmc+LCBzZWFyY2g6IGFueSA9ICcnLCBzdHJpY3Q6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKFxuICAgICAgIUFycmF5LmlzQXJyYXkoaW5wdXQpIHx8XG4gICAgICAoIUFycmF5LmlzQXJyYXkoc2VhcmNoKSAmJiAhaXNTdHJpbmcoc2VhcmNoKSAmJiAhaXNOdW1iZXJGaW5pdGUoc2VhcmNoKSAmJiAhaXNCb29sZWFuKHNlYXJjaCkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgY29uc3QgdGVybXMgPSBTdHJpbmcoc2VhcmNoKVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5zcGxpdCgnLCcpO1xuXG4gICAgcmV0dXJuIGlucHV0LmZpbHRlcihvYmogPT4ge1xuICAgICAgcmV0dXJuIHByb3BzLnNvbWUocHJvcCA9PiB7XG4gICAgICAgIHJldHVybiB0ZXJtcy5zb21lKHRlcm0gPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZXh0cmFjdERlZXBQcm9wZXJ0eUJ5TWFwS2V5KG9iaiwgcHJvcCk7XG4gICAgICAgICAgY29uc3QgeyBwcm9wcywgdGFpbCB9ID0gZXh0cmFjdERlZXBQcm9wZXJ0eUJ5UGFyZW50TWFwS2V5KG9iaiwgcHJvcCk7XG5cbiAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpICYmICFpc1VuZGVmaW5lZChwcm9wcykgJiYgQXJyYXkuaXNBcnJheShwcm9wcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5zb21lKHBhcmVudCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0ciA9IFN0cmluZyhwYXJlbnRbdGFpbF0pLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmljdCA/IHN0ciA9PT0gdGVybSA6ICEhfnN0ci5pbmRleE9mKHRlcm0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0clZhbHVlOiBzdHJpbmcgPSBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICByZXR1cm4gc3RyaWN0ID8gdGVybSA9PT0gc3RyVmFsdWUgOiAhIX5zdHJWYWx1ZS5pbmRleE9mKHRlcm0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=