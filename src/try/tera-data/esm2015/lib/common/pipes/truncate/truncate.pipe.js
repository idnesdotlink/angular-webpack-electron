import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let TdTruncatePipe = class TdTruncatePipe {
    transform(text, length) {
        if (typeof text !== 'string') {
            return '';
        }
        // Truncate
        let truncated = text.substr(0, length);
        if (text.length > length) {
            if (truncated.lastIndexOf(' ') > 0) {
                truncated = truncated.trim();
            }
            truncated += '…';
        }
        return truncated;
    }
};
TdTruncatePipe = tslib_1.__decorate([
    Pipe({
        name: 'truncate',
    })
], TdTruncatePipe);
export { TdTruncatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvdGVyYS1kYXRhLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9waXBlcy90cnVuY2F0ZS90cnVuY2F0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQU1wRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCLFNBQVMsQ0FBQyxJQUFTLEVBQUUsTUFBYztRQUNqQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsV0FBVztRQUNYLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDeEIsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM5QjtZQUVELFNBQVMsSUFBSSxHQUFHLENBQUM7U0FDbEI7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQTtBQW5CWSxjQUFjO0lBSjFCLElBQUksQ0FBQztRQUNKLElBQUksRUFBRSxVQUFVO0tBQ2pCLENBQUM7R0FFVyxjQUFjLENBbUIxQjtTQW5CWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0cnVuY2F0ZScsXG59KVxuXG5leHBvcnQgY2xhc3MgVGRUcnVuY2F0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHRleHQ6IGFueSwgbGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgdGV4dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvLyBUcnVuY2F0ZVxuICAgIGxldCB0cnVuY2F0ZWQ6IHN0cmluZyA9IHRleHQuc3Vic3RyKDAsIGxlbmd0aCk7XG5cbiAgICBpZiAodGV4dC5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICAgIGlmICh0cnVuY2F0ZWQubGFzdEluZGV4T2YoJyAnKSA+IDApIHtcbiAgICAgICAgdHJ1bmNhdGVkID0gdHJ1bmNhdGVkLnRyaW0oKTtcbiAgICAgIH1cblxuICAgICAgdHJ1bmNhdGVkICs9ICfigKYnO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVuY2F0ZWQ7XG4gIH1cbn1cbiJdfQ==