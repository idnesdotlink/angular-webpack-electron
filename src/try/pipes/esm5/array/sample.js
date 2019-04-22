import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var SamplePipe = /** @class */ (function () {
    function SamplePipe() {
    }
    SamplePipe.prototype.transform = function (input, len) {
        if (len === void 0) { len = 1; }
        if (!Array.isArray(input)) {
            return input;
        }
        var sample = [];
        var tmp = tslib_1.__spread(input);
        var l = len < tmp.length ? len : tmp.length;
        for (var i = 0; i < l; ++i) {
            sample = sample.concat(tmp.splice(Math.floor(Math.random() * tmp.length), 1));
        }
        return sample;
    };
    SamplePipe = tslib_1.__decorate([
        Pipe({ name: 'sample' })
    ], SamplePipe);
    return SamplePipe;
}());
export { SamplePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbImFycmF5L3NhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQWtCQSxDQUFDO0lBZEMsOEJBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxHQUFlO1FBQWYsb0JBQUEsRUFBQSxPQUFlO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7UUFDdkIsSUFBTSxHQUFHLG9CQUFPLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9FO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWpCVSxVQUFVO1FBRHRCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztPQUNaLFVBQVUsQ0FrQnRCO0lBQUQsaUJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdzYW1wbGUnIH0pXG5leHBvcnQgY2xhc3MgU2FtcGxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5wdXQ6IGFueVtdLCBsZW4/OiBudW1iZXIpOiBhbnlbXTtcbiAgdHJhbnNmb3JtPFQ+KGlucHV0OiBULCBsZW4/OiBudW1iZXIpOiBUO1xuXG4gIHRyYW5zZm9ybShpbnB1dDogYW55LCBsZW46IG51bWJlciA9IDEpOiBhbnkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICBsZXQgc2FtcGxlOiBhbnlbXSA9IFtdO1xuICAgIGNvbnN0IHRtcCA9IFsuLi5pbnB1dF07XG4gICAgY29uc3QgbCA9IGxlbiA8IHRtcC5sZW5ndGggPyBsZW4gOiB0bXAubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICBzYW1wbGUgPSBzYW1wbGUuY29uY2F0KHRtcC5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdG1wLmxlbmd0aCksIDEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2FtcGxlO1xuICB9XG59XG4iXX0=