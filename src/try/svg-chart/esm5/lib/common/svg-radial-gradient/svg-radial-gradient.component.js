import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var SvgRadialGradientComponent = /** @class */ (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
        get: function () {
            return this.stopsInput || this.stopsDefault;
        },
        set: function (value) {
            this.stopsInput = value;
        },
        enumerable: true,
        configurable: true
    });
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = '30%';
        if (('color' in changes) ||
            ('startOpacity' in changes) ||
            ('endOpacity' in changes)) {
            this.stopsDefault = [{
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                }, {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }];
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SvgRadialGradientComponent.prototype, "color", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SvgRadialGradientComponent.prototype, "name", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SvgRadialGradientComponent.prototype, "cx", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SvgRadialGradientComponent.prototype, "cy", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], SvgRadialGradientComponent.prototype, "stops", null);
    SvgRadialGradientComponent = tslib_1.__decorate([
        Component({
            selector: 'g[ng-svg-charts-svg-radial-gradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], SvgRadialGradientComponent);
    return SvgRadialGradientComponent;
}());
export { SvgRadialGradientComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vc3ZnLXJhZGlhbC1ncmFkaWVudC9zdmctcmFkaWFsLWdyYWRpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQ3JELE1BQU0sZUFBZSxDQUFDO0FBb0J2QjtJQWxCQTtRQXVCVyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLE9BQUUsR0FBRyxDQUFDLENBQUM7SUFrQ2xCLENBQUM7SUEvQkMsc0JBQUksNkNBQUs7YUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzlDLENBQUM7YUFFRCxVQUFVLEtBQVk7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BSkE7SUFXRCxnREFBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDZixJQUNFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztZQUNwQixDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUM7WUFDM0IsQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDO29CQUNuQixNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtpQkFDM0IsRUFBRTtvQkFDRCxNQUFNLEVBQUUsR0FBRztvQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDekIsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBckNRO1FBQVIsS0FBSyxFQUFFOzs2REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzs0REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFOztvRUFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O2tFQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzswREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzswREFBUTtJQUdoQjtRQURDLEtBQUssRUFBRTs7OzJEQUdQO0lBWlUsMEJBQTBCO1FBbEJ0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0NBQXNDO1lBQ2hELFFBQVEsRUFBRSw2WEFhVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVywwQkFBMEIsQ0F5Q3RDO0lBQUQsaUNBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQXpDWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtc3ZnLXJhZGlhbC1ncmFkaWVudF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6cmFkaWFsR3JhZGllbnRcbiAgICAgIFtpZF09XCJuYW1lXCJcbiAgICAgIFthdHRyLmN4XT1cImN4XCJcbiAgICAgIFthdHRyLmN5XT1cImN5XCJcbiAgICAgIFthdHRyLnJdPVwiclwiXG4gICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgIDxzdmc6c3RvcCAqbmdGb3I9XCJsZXQgc3RvcCBvZiBzdG9wc1wiXG4gICAgICAgIFthdHRyLm9mZnNldF09XCJzdG9wLm9mZnNldCArICclJ1wiXG4gICAgICAgIFtzdHlsZS5zdG9wLWNvbG9yXT1cInN0b3AuY29sb3JcIlxuICAgICAgICBbc3R5bGUuc3RvcC1vcGFjaXR5XT1cInN0b3Aub3BhY2l0eVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOnJhZGlhbEdyYWRpZW50PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBzdGFydE9wYWNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgZW5kT3BhY2l0eSA9IDE7XG4gIEBJbnB1dCgpIGN4ID0gMDtcbiAgQElucHV0KCkgY3kgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBzdG9wcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcHNJbnB1dCB8fCB0aGlzLnN0b3BzRGVmYXVsdDtcbiAgfVxuXG4gIHNldCBzdG9wcyh2YWx1ZTogYW55W10pIHtcbiAgICB0aGlzLnN0b3BzSW5wdXQgPSB2YWx1ZTtcbiAgfVxuXG4gIHI6IHN0cmluZztcblxuICBwcml2YXRlIHN0b3BzSW5wdXQ6IGFueVtdO1xuICBwcml2YXRlIHN0b3BzRGVmYXVsdDogYW55W107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuciA9ICczMCUnO1xuICAgIGlmIChcbiAgICAgICgnY29sb3InIGluIGNoYW5nZXMpIHx8XG4gICAgICAoJ3N0YXJ0T3BhY2l0eScgaW4gY2hhbmdlcykgfHxcbiAgICAgICgnZW5kT3BhY2l0eScgaW4gY2hhbmdlcykpIHtcbiAgICAgICAgdGhpcy5zdG9wc0RlZmF1bHQgPSBbe1xuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLnN0YXJ0T3BhY2l0eVxuICAgICAgICB9LCB7XG4gICAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgb3BhY2l0eTogdGhpcy5lbmRPcGFjaXR5XG4gICAgICAgIH1dO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=