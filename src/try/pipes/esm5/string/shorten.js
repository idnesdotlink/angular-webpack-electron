import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var ShortenPipe = /** @class */ (function () {
    function ShortenPipe() {
    }
    ShortenPipe.prototype.transform = function (text, length, suffix, wordBreak) {
        if (length === void 0) { length = 0; }
        if (suffix === void 0) { suffix = ''; }
        if (wordBreak === void 0) { wordBreak = true; }
        if (!isString(text)) {
            return text;
        }
        if (text.length > length) {
            if (wordBreak) {
                return text.slice(0, length) + suffix;
            }
            // tslint:disable-next-line:no-bitwise
            if (!!~text.indexOf(' ', length)) {
                return text.slice(0, text.indexOf(' ', length)) + suffix;
            }
        }
        return text;
    };
    ShortenPipe = tslib_1.__decorate([
        Pipe({ name: 'shorten' })
    ], ShortenPipe);
    return ShortenPipe;
}());
export { ShortenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRlbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc2hvcnRlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFzQkEsQ0FBQztJQWxCQywrQkFBUyxHQUFULFVBQVUsSUFBUyxFQUFFLE1BQWtCLEVBQUUsTUFBbUIsRUFBRSxTQUF5QjtRQUFsRSx1QkFBQSxFQUFBLFVBQWtCO1FBQUUsdUJBQUEsRUFBQSxXQUFtQjtRQUFFLDBCQUFBLEVBQUEsZ0JBQXlCO1FBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDeEIsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDdkM7WUFFRCxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUMxRDtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBckJVLFdBQVc7UUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO09BQ2IsV0FBVyxDQXNCdkI7SUFBRCxrQkFBQztDQUFBLEFBdEJELElBc0JDO1NBdEJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3Nob3J0ZW4nIH0pXG5leHBvcnQgY2xhc3MgU2hvcnRlblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBzdHJpbmcsIGxlbmd0aD86IG51bWJlciwgc3VmZml4Pzogc3RyaW5nLCB3b3JkQnJlYWs/OiBib29sZWFuKTogc3RyaW5nO1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueSwgbGVuZ3RoPzogbnVtYmVyLCBzdWZmaXg/OiBzdHJpbmcsIHdvcmRCcmVhaz86IGJvb2xlYW4pOiBhbnk7XG5cbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgbGVuZ3RoOiBudW1iZXIgPSAwLCBzdWZmaXg6IHN0cmluZyA9ICcnLCB3b3JkQnJlYWs6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzU3RyaW5nKHRleHQpKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICBpZiAodGV4dC5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICAgIGlmICh3b3JkQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoMCwgbGVuZ3RoKSArIHN1ZmZpeDtcbiAgICAgIH1cblxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcbiAgICAgIGlmICghIX50ZXh0LmluZGV4T2YoJyAnLCBsZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKDAsIHRleHQuaW5kZXhPZignICcsIGxlbmd0aCkpICsgc3VmZml4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG4iXX0=