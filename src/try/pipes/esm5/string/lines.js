import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var LinesPipe = /** @class */ (function () {
    function LinesPipe() {
    }
    LinesPipe.prototype.transform = function (text, chars) {
        if (chars === void 0) { chars = '\\s'; }
        return isString(text) ? text.replace(/\r\n/g, '\n').split('\n') : text;
    };
    LinesPipe = tslib_1.__decorate([
        Pipe({ name: 'lines' })
    ], LinesPipe);
    return LinesPipe;
}());
export { LinesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3BpcGVzLyIsInNvdXJjZXMiOlsic3RyaW5nL2xpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUM7SUFBQTtJQUlBLENBQUM7SUFIQyw2QkFBUyxHQUFULFVBQVUsSUFBUyxFQUFFLEtBQXFCO1FBQXJCLHNCQUFBLEVBQUEsYUFBcUI7UUFDeEMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pFLENBQUM7SUFIVSxTQUFTO1FBRHJCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztPQUNYLFNBQVMsQ0FJckI7SUFBRCxnQkFBQztDQUFBLEFBSkQsSUFJQztTQUpZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ2xpbmVzJyB9KVxuZXhwb3J0IGNsYXNzIExpbmVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odGV4dDogYW55LCBjaGFyczogc3RyaW5nID0gJ1xcXFxzJyk6IEFycmF5PHN0cmluZz4gfCBhbnkge1xuICAgIHJldHVybiBpc1N0cmluZyh0ZXh0KSA/IHRleHQucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKS5zcGxpdCgnXFxuJykgOiB0ZXh0O1xuICB9XG59XG4iXX0=