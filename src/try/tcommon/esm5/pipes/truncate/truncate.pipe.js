import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var TdTruncatePipe = /** @class */ (function () {
    function TdTruncatePipe() {
    }
    TdTruncatePipe.prototype.transform = function (text, length) {
        if (typeof text !== 'string') {
            return '';
        }
        // Truncate
        var truncated = text.substr(0, length);
        if (text.length > length) {
            if (truncated.lastIndexOf(' ') > 0) {
                truncated = truncated.trim();
            }
            truncated += '…';
        }
        return truncated;
    };
    TdTruncatePipe = tslib_1.__decorate([
        Pipe({
            name: 'truncate',
        })
    ], TdTruncatePipe);
    return TdTruncatePipe;
}());
export { TdTruncatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGNvbW1vbi8iLCJzb3VyY2VzIjpbInBpcGVzL3RydW5jYXRlL3RydW5jYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTXBEO0lBQUE7SUFtQkEsQ0FBQztJQWxCQyxrQ0FBUyxHQUFULFVBQVUsSUFBUyxFQUFFLE1BQWM7UUFDakMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELFdBQVc7UUFDWCxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ3hCLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDOUI7WUFFRCxTQUFTLElBQUksR0FBRyxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQWxCVSxjQUFjO1FBSjFCLElBQUksQ0FBQztZQUNKLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUM7T0FFVyxjQUFjLENBbUIxQjtJQUFELHFCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndHJ1bmNhdGUnLFxufSlcblxuZXhwb3J0IGNsYXNzIFRkVHJ1bmNhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRleHQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLy8gVHJ1bmNhdGVcbiAgICBsZXQgdHJ1bmNhdGVkOiBzdHJpbmcgPSB0ZXh0LnN1YnN0cigwLCBsZW5ndGgpO1xuXG4gICAgaWYgKHRleHQubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICBpZiAodHJ1bmNhdGVkLmxhc3RJbmRleE9mKCcgJykgPiAwKSB7XG4gICAgICAgIHRydW5jYXRlZCA9IHRydW5jYXRlZC50cmltKCk7XG4gICAgICB9XG5cbiAgICAgIHRydW5jYXRlZCArPSAn4oCmJztcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1bmNhdGVkO1xuICB9XG59XG4iXX0=