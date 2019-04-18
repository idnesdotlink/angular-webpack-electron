import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
let SlugifyPipe = class SlugifyPipe {
    transform(str) {
        return isString(str)
            ? str
                .toLowerCase()
                .trim()
                .replace(/[^\w\-]+/g, ' ')
                .replace(/\s+/g, '-')
            : str;
    }
};
SlugifyPipe = tslib_1.__decorate([
    Pipe({ name: 'slugify' })
], SlugifyPipe);
export { SlugifyPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2x1Z2lmeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvc2x1Z2lmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFDdEIsU0FBUyxDQUFDLEdBQVc7UUFDbkIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxHQUFHO2lCQUNBLFdBQVcsRUFBRTtpQkFDYixJQUFJLEVBQUU7aUJBQ04sT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDVixDQUFDO0NBQ0YsQ0FBQTtBQVZZLFdBQVc7SUFEdkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ2IsV0FBVyxDQVV2QjtTQVZZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3NsdWdpZnknIH0pXG5leHBvcnQgY2xhc3MgU2x1Z2lmeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoc3RyKVxuICAgICAgPyBzdHJcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAucmVwbGFjZSgvW15cXHdcXC1dKy9nLCAnICcpXG4gICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKVxuICAgICAgOiBzdHI7XG4gIH1cbn1cbiJdfQ==