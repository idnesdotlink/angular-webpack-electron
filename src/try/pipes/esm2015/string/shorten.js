import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
let ShortenPipe = class ShortenPipe {
    transform(text, length = 0, suffix = '', wordBreak = true) {
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
    }
};
ShortenPipe = tslib_1.__decorate([
    Pipe({ name: 'shorten' })
], ShortenPipe);
export { ShortenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRlbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc2hvcnRlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFJdEIsU0FBUyxDQUFDLElBQVMsRUFBRSxTQUFpQixDQUFDLEVBQUUsU0FBaUIsRUFBRSxFQUFFLFlBQXFCLElBQUk7UUFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUN4QixJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUN2QztZQUVELHNDQUFzQztZQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2FBQzFEO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBO0FBdEJZLFdBQVc7SUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ2IsV0FBVyxDQXNCdkI7U0F0QlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuQFBpcGUoeyBuYW1lOiAnc2hvcnRlbicgfSlcbmV4cG9ydCBjbGFzcyBTaG9ydGVuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IHN0cmluZywgbGVuZ3RoPzogbnVtYmVyLCBzdWZmaXg/OiBzdHJpbmcsIHdvcmRCcmVhaz86IGJvb2xlYW4pOiBzdHJpbmc7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBsZW5ndGg/OiBudW1iZXIsIHN1ZmZpeD86IHN0cmluZywgd29yZEJyZWFrPzogYm9vbGVhbik6IGFueTtcblxuICB0cmFuc2Zvcm0odGV4dDogYW55LCBsZW5ndGg6IG51bWJlciA9IDAsIHN1ZmZpeDogc3RyaW5nID0gJycsIHdvcmRCcmVhazogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGlmICghaXNTdHJpbmcodGV4dCkpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIGlmICh0ZXh0Lmxlbmd0aCA+IGxlbmd0aCkge1xuICAgICAgaWYgKHdvcmRCcmVhaykge1xuICAgICAgICByZXR1cm4gdGV4dC5zbGljZSgwLCBsZW5ndGgpICsgc3VmZml4O1xuICAgICAgfVxuXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgaWYgKCEhfnRleHQuaW5kZXhPZignICcsIGxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoMCwgdGV4dC5pbmRleE9mKCcgJywgbGVuZ3RoKSkgKyBzdWZmaXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cbiJdfQ==