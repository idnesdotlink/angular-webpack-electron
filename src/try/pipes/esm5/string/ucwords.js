import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isString } from '../helpers/helpers';
var UcWordsPipe = /** @class */ (function () {
    function UcWordsPipe() {
    }
    UcWordsPipe.prototype.transform = function (text) {
        if (isString(text)) {
            return text
                .split(' ')
                .map(function (sub) { return sub.slice(0, 1).toUpperCase() + sub.slice(1); })
                .join(' ');
        }
        return text;
    };
    UcWordsPipe = tslib_1.__decorate([
        Pipe({ name: 'ucwords' })
    ], UcWordsPipe);
    return UcWordsPipe;
}());
export { UcWordsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWN3b3Jkcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvcGlwZXMvIiwic291cmNlcyI6WyJzdHJpbmcvdWN3b3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzlDO0lBQUE7SUFjQSxDQUFDO0lBVkMsK0JBQVMsR0FBVCxVQUFVLElBQVM7UUFDakIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEIsT0FBTyxJQUFJO2lCQUNSLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLFVBQUMsR0FBUSxJQUFLLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQztpQkFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFiVSxXQUFXO1FBRHZCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztPQUNiLFdBQVcsQ0FjdkI7SUFBRCxrQkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHsgbmFtZTogJ3Vjd29yZHMnIH0pXG5leHBvcnQgY2xhc3MgVWNXb3Jkc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGlucHV0OiBzdHJpbmcpOiBzdHJpbmc7XG4gIHRyYW5zZm9ybShpbnB1dDogYW55KTogYW55O1xuXG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChpc1N0cmluZyh0ZXh0KSkge1xuICAgICAgcmV0dXJuIHRleHRcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLm1hcCgoc3ViOiBhbnkpID0+IHN1Yi5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3ViLnNsaWNlKDEpKVxuICAgICAgICAuam9pbignICcpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG4iXX0=