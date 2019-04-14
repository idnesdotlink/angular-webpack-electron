import * as tslib_1 from "tslib";
import { ElementRef, NgZone, Pipe } from '@angular/core';
import { first } from 'rxjs/operators';
import { MarkdownService } from './markdown.service';
var MarkdownPipe = /** @class */ (function () {
    function MarkdownPipe(elementRef, markdownService, zone) {
        this.elementRef = elementRef;
        this.markdownService = markdownService;
        this.zone = zone;
    }
    MarkdownPipe.prototype.transform = function (value) {
        var _this = this;
        if (value == null) {
            return '';
        }
        if (typeof value !== 'string') {
            console.error("MarkdownPipe has been invoked with an invalid value type [" + value + "]");
            return value;
        }
        var markdown = this.markdownService.compile(value);
        this.zone.onStable
            .pipe(first())
            .subscribe(function () { return _this.markdownService.highlight(_this.elementRef.nativeElement); });
        return markdown;
    };
    MarkdownPipe = tslib_1.__decorate([
        Pipe({
            name: 'markdown',
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            MarkdownService,
            NgZone])
    ], MarkdownPipe);
    return MarkdownPipe;
}());
export { MarkdownPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvbWFyay1kb3duLyIsInNvdXJjZXMiOlsibGliL21hcmtkb3duLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUtyRDtJQUVFLHNCQUNVLFVBQW1DLEVBQ25DLGVBQWdDLEVBQ2hDLElBQVk7UUFGWixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUNsQixDQUFDO0lBRUwsZ0NBQVMsR0FBVCxVQUFVLEtBQWE7UUFBdkIsaUJBaUJDO1FBaEJDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQywrREFBNkQsS0FBSyxNQUFHLENBQUMsQ0FBQztZQUNyRixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ2YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUE3RCxDQUE2RCxDQUFDLENBQUM7UUFFbEYsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQXpCVSxZQUFZO1FBSHhCLElBQUksQ0FBQztZQUNKLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUM7aURBSXNCLFVBQVU7WUFDTCxlQUFlO1lBQzFCLE1BQU07T0FMWCxZQUFZLENBMEJ4QjtJQUFELG1CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIE5nWm9uZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJy4vbWFya2Rvd24uc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ21hcmtkb3duJyxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIG1hcmtkb3duU2VydmljZTogTWFya2Rvd25TZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICApIHsgfVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBNYXJrZG93blBpcGUgaGFzIGJlZW4gaW52b2tlZCB3aXRoIGFuIGludmFsaWQgdmFsdWUgdHlwZSBbJHt2YWx1ZX1dYCk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2Rvd24gPSB0aGlzLm1hcmtkb3duU2VydmljZS5jb21waWxlKHZhbHVlKTtcblxuICAgIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tYXJrZG93blNlcnZpY2UuaGlnaGxpZ2h0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG5cbiAgICByZXR1cm4gbWFya2Rvd247XG4gIH1cbn1cbiJdfQ==