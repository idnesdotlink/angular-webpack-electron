import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
var LineComponent = /** @class */ (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    };
    LineComponent.prototype.updatePathEl = function () {
        var node = select(this.element.nativeElement).select('.line');
        if (this.animations) {
            node
                .transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LineComponent.prototype, "path", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LineComponent.prototype, "stroke", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LineComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LineComponent.prototype, "fill", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LineComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LineComponent.prototype, "select", void 0);
    LineComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-line]',
            template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000,
                        }),
                        animate(1000, style({
                            strokeDashoffset: 0
                        }))
                    ])
                ])
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], LineComponent);
    return LineComponent;
}());
export { LineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLFVBQVUsRUFDVix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDWCxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUE2QnRDO0lBYUUsdUJBQW9CLE9BQW1CO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFSOUIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFJcEIsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDOUI7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0UsSUFBTSxJQUFJLEdBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJO2lCQUNELFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7aUJBQzFCLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBakNRO1FBQVIsS0FBSyxFQUFFOzsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOztpREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzsrQ0FBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOztxREFBbUI7SUFFakI7UUFBVCxNQUFNLEVBQUU7O2lEQUE2QjtJQVIzQixhQUFhO1FBM0J6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSxtTkFTVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQzs0QkFDSixlQUFlLEVBQUUsSUFBSTs0QkFDckIsZ0JBQWdCLEVBQUUsSUFBSTt5QkFDdkIsQ0FBQzt3QkFDRixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzs0QkFDbEIsZ0JBQWdCLEVBQUUsQ0FBQzt5QkFDcEIsQ0FBQyxDQUFDO3FCQUNKLENBQUM7aUJBQ0gsQ0FBQzthQUNIO1NBQ0YsQ0FBQztpREFjNkIsVUFBVTtPQWI1QixhQUFhLENBb0N6QjtJQUFELG9CQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FwQ1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtbGluZV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6cGF0aFxuICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICBjbGFzcz1cImxpbmVcIlxuICAgICAgW2F0dHIuZF09XCJpbml0aWFsUGF0aFwiXG4gICAgICBbYXR0ci5maWxsXT1cImZpbGxcIlxuICAgICAgW2F0dHIuc3Ryb2tlXT1cInN0cm9rZVwiXG4gICAgICBzdHJva2Utd2lkdGg9XCIxLjVweFwiXG4gICAgLz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHN0cm9rZURhc2hhcnJheTogMjAwMCxcbiAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0OiAyMDAwLFxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgxMDAwLCBzdHlsZSh7XG4gICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldDogMFxuICAgICAgICB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBwYXRoO1xuICBASW5wdXQoKSBzdHJva2U7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIGZpbGwgPSAnbm9uZSc7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgaW5pdGlhbFBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pbml0aWFsUGF0aCA9IHRoaXMucGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVQYXRoRWwoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVQYXRoRWwoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZTogYW55ID0gc2VsZWN0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KS5zZWxlY3QoJy5saW5lJyk7XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XG4gICAgICBub2RlXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNzUwKVxuICAgICAgICAuYXR0cignZCcsIHRoaXMucGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuYXR0cignZCcsIHRoaXMucGF0aCk7XG4gICAgfVxuICB9XG59XG4iXX0=