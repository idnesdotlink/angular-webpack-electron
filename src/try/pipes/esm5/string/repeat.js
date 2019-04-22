import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var RepeatPipe = /** @class */ (function () {
    function RepeatPipe() {
    }
    RepeatPipe.prototype.transform = function (str, n, separator) {
        if (n === void 0) { n = 1; }
        if (separator === void 0) { separator = ''; }
        if (n <= 0) {
            throw new RangeError();
        }
        return n === 1 ? str : this.repeat(str, n - 1, separator);
    };
    RepeatPipe.prototype.repeat = function (str, n, separator) {
        return isString(str) ? (n === 0 ? str : str + separator + this.repeat(str, n - 1, separator)) : str;
    };
    RepeatPipe = tslib_1.__decorate([
        Pipe({ name: 'repeat' })
    ], RepeatPipe);
    return RepeatPipe;
}());
export { RepeatPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbInN0cmluZy9yZXBlYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc5QztJQUFBO0lBWUEsQ0FBQztJQVhDLDhCQUFTLEdBQVQsVUFBVSxHQUFXLEVBQUUsQ0FBYSxFQUFFLFNBQXNCO1FBQXJDLGtCQUFBLEVBQUEsS0FBYTtRQUFFLDBCQUFBLEVBQUEsY0FBc0I7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1YsTUFBTSxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLDJCQUFNLEdBQWQsVUFBZSxHQUFXLEVBQUUsQ0FBUyxFQUFFLFNBQWlCO1FBQ3RELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN0RyxDQUFDO0lBWFUsVUFBVTtRQUR0QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7T0FDWixVQUFVLENBWXRCO0lBQUQsaUJBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdyZXBlYXQnIH0pXG5leHBvcnQgY2xhc3MgUmVwZWF0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oc3RyOiBzdHJpbmcsIG46IG51bWJlciA9IDEsIHNlcGFyYXRvcjogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgIGlmIChuIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG4gPT09IDEgPyBzdHIgOiB0aGlzLnJlcGVhdChzdHIsIG4gLSAxLCBzZXBhcmF0b3IpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXBlYXQoc3RyOiBzdHJpbmcsIG46IG51bWJlciwgc2VwYXJhdG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1N0cmluZyhzdHIpID8gKG4gPT09IDAgPyBzdHIgOiBzdHIgKyBzZXBhcmF0b3IgKyB0aGlzLnJlcGVhdChzdHIsIG4gLSAxLCBzZXBhcmF0b3IpKSA6IHN0cjtcbiAgfVxufVxuIl19