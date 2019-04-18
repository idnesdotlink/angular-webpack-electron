import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { extractDeepPropertyByMapKey, isFunction } from '../helpers/helpers';
var GroupByPipe = /** @class */ (function () {
    function GroupByPipe() {
    }
    GroupByPipe.prototype.transform = function (input, discriminator, delimiter) {
        if (discriminator === void 0) { discriminator = []; }
        if (delimiter === void 0) { delimiter = '|'; }
        if (!Array.isArray(input)) {
            return input;
        }
        return this.groupBy(input, discriminator, delimiter);
    };
    GroupByPipe.prototype.groupBy = function (list, discriminator, delimiter) {
        var _this = this;
        return list.reduce(function (acc, payload) {
            var key = _this.extractKeyByDiscriminator(discriminator, payload, delimiter);
            acc[key] = Array.isArray(acc[key]) ? acc[key].concat([payload]) : [payload];
            return acc;
        }, {});
    };
    GroupByPipe.prototype.extractKeyByDiscriminator = function (discriminator, payload, delimiter) {
        if (isFunction(discriminator)) {
            // tslint:disable-next-line: ban-types
            return discriminator(payload);
        }
        if (Array.isArray(discriminator)) {
            return discriminator.map(function (k) { return extractDeepPropertyByMapKey(payload, k); }).join(delimiter);
        }
        return extractDeepPropertyByMapKey(payload, discriminator);
    };
    GroupByPipe = tslib_1.__decorate([
        Pipe({ name: 'groupBy' })
    ], GroupByPipe);
    return GroupByPipe;
}());
export { GroupByPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtYnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsiYXJyYXkvZ3JvdXAtYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc3RTtJQUFBO0lBK0JBLENBQUM7SUE5QkMsK0JBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxhQUF1QixFQUFFLFNBQXVCO1FBQWhELDhCQUFBLEVBQUEsa0JBQXVCO1FBQUUsMEJBQUEsRUFBQSxlQUF1QjtRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLDZCQUFPLEdBQWYsVUFBZ0IsSUFBVyxFQUFFLGFBQWtCLEVBQUUsU0FBaUI7UUFBbEUsaUJBUUM7UUFQQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFRLEVBQUUsT0FBZTtZQUMzQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU5RSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUUsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRU8sK0NBQXlCLEdBQWpDLFVBQWtDLGFBQWtCLEVBQUUsT0FBZSxFQUFFLFNBQWlCO1FBQ3RGLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdCLHNDQUFzQztZQUN0QyxPQUFRLGFBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDaEMsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsMkJBQTJCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hGO1FBRUQsT0FBTywyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsYUFBdUIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUE5QlUsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7T0FDYixXQUFXLENBK0J2QjtJQUFELGtCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0EvQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGV4dHJhY3REZWVwUHJvcGVydHlCeU1hcEtleSwgaXNGdW5jdGlvbiB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ2dyb3VwQnknIH0pXG5leHBvcnQgY2xhc3MgR3JvdXBCeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBhbnksIGRpc2NyaW1pbmF0b3I6IGFueSA9IFtdLCBkZWxpbWl0ZXI6IHN0cmluZyA9ICd8Jyk6IGFueSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdyb3VwQnkoaW5wdXQsIGRpc2NyaW1pbmF0b3IsIGRlbGltaXRlcik7XG4gIH1cblxuICBwcml2YXRlIGdyb3VwQnkobGlzdDogYW55W10sIGRpc2NyaW1pbmF0b3I6IGFueSwgZGVsaW1pdGVyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbGlzdC5yZWR1Y2UoKGFjYzogYW55LCBwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZXh0cmFjdEtleUJ5RGlzY3JpbWluYXRvcihkaXNjcmltaW5hdG9yLCBwYXlsb2FkLCBkZWxpbWl0ZXIpO1xuXG4gICAgICBhY2Nba2V5XSA9IEFycmF5LmlzQXJyYXkoYWNjW2tleV0pID8gYWNjW2tleV0uY29uY2F0KFtwYXlsb2FkXSkgOiBbcGF5bG9hZF07XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0S2V5QnlEaXNjcmltaW5hdG9yKGRpc2NyaW1pbmF0b3I6IGFueSwgcGF5bG9hZDogc3RyaW5nLCBkZWxpbWl0ZXI6IHN0cmluZykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGRpc2NyaW1pbmF0b3IpKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGJhbi10eXBlc1xuICAgICAgcmV0dXJuIChkaXNjcmltaW5hdG9yIGFzIEZ1bmN0aW9uKShwYXlsb2FkKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkaXNjcmltaW5hdG9yKSkge1xuICAgICAgcmV0dXJuIGRpc2NyaW1pbmF0b3IubWFwKGsgPT4gZXh0cmFjdERlZXBQcm9wZXJ0eUJ5TWFwS2V5KHBheWxvYWQsIGspKS5qb2luKGRlbGltaXRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dHJhY3REZWVwUHJvcGVydHlCeU1hcEtleShwYXlsb2FkLCBkaXNjcmltaW5hdG9yIGFzIHN0cmluZyk7XG4gIH1cbn1cbiJdfQ==