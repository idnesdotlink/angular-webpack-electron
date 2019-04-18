import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var WrapPipe = /** @class */ (function () {
    function WrapPipe() {
    }
    WrapPipe.prototype.transform = function (str, prefix, suffix) {
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = ''; }
        if (!isString(str)) {
            return str;
        }
        return (!!prefix && isString(prefix) ? prefix : '') + str + (!!suffix && isString(suffix) ? suffix : '');
    };
    WrapPipe = tslib_1.__decorate([
        Pipe({ name: 'wrap' })
    ], WrapPipe);
    return WrapPipe;
}());
export { WrapPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvd3JhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFRQSxDQUFDO0lBUEMsNEJBQVMsR0FBVCxVQUFVLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQW1CO1FBQXhDLHVCQUFBLEVBQUEsV0FBbUI7UUFBRSx1QkFBQSxFQUFBLFdBQW1CO1FBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBUFUsUUFBUTtRQURwQixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDVixRQUFRLENBUXBCO0lBQUQsZUFBQztDQUFBLEFBUkQsSUFRQztTQVJZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3dyYXAnIH0pXG5leHBvcnQgY2xhc3MgV3JhcFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHN0cjogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyA9ICcnLCBzdWZmaXg6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzU3RyaW5nKHN0cikpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcmV0dXJuICghIXByZWZpeCAmJiBpc1N0cmluZyhwcmVmaXgpID8gcHJlZml4IDogJycpICsgc3RyICsgKCEhc3VmZml4ICYmIGlzU3RyaW5nKHN1ZmZpeCkgPyBzdWZmaXggOiAnJyk7XG4gIH1cbn1cbiJdfQ==