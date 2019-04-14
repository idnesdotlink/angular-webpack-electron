import * as tslib_1 from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
var LegendEntryComponent = /** @class */ (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
        get: function () {
            return this.formattedLabel || '(empty)';
        },
        enumerable: true,
        configurable: true
    });
    LegendEntryComponent.prototype.onMouseEnter = function () {
        this.activate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit({ name: this.label });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LegendEntryComponent.prototype, "color", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendEntryComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LegendEntryComponent.prototype, "formattedLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendEntryComponent.prototype, "isActive", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendEntryComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendEntryComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendEntryComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendEntryComponent.prototype, "toggle", void 0);
    tslib_1.__decorate([
        HostListener('mouseenter'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], LegendEntryComponent.prototype, "onMouseEnter", null);
    tslib_1.__decorate([
        HostListener('mouseleave'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], LegendEntryComponent.prototype, "onMouseLeave", null);
    LegendEntryComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-legend-entry',
            template: "\n    <span\n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], LegendEntryComponent);
    return LegendEntryComponent;
}());
export { LegendEntryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBc0J4QjtJQXBCQTtRQXlCVyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWhCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWdCM0QsQ0FBQztJQWRDLHNCQUFJLDhDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUdELDJDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBR0QsMkNBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUF0QlE7UUFBUixLQUFLLEVBQUU7O3VEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3VEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7O2dFQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTs7MERBQWtCO0lBRWhCO1FBQVQsTUFBTSxFQUFFOzBDQUFTLFlBQVk7d0RBQTJCO0lBQy9DO1FBQVQsTUFBTSxFQUFFOzBDQUFXLFlBQVk7MERBQTJCO0lBQ2pEO1FBQVQsTUFBTSxFQUFFOzBDQUFhLFlBQVk7NERBQTJCO0lBQ25EO1FBQVQsTUFBTSxFQUFFOzBDQUFTLFlBQVk7d0RBQTJCO0lBT3pEO1FBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs7Ozs0REFHMUI7SUFHRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7NERBRzFCO0lBeEJVLG9CQUFvQjtRQXBCaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsNlpBZVQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csb0JBQW9CLENBMEJoQztJQUFELDJCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSG9zdExpc3RlbmVyLFxuICBFdmVudEVtaXR0ZXJcbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLWxlZ2VuZC1lbnRyeScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIFt0aXRsZV09XCJmb3JtYXR0ZWRMYWJlbFwiXG4gICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdC5lbWl0KGZvcm1hdHRlZExhYmVsKVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9XCJsZWdlbmQtbGFiZWwtY29sb3JcIlxuICAgICAgICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJjb2xvclwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGUuZW1pdChmb3JtYXR0ZWRMYWJlbClcIj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsLXRleHRcIj5cbiAgICAgICAge3t0cmltbWVkTGFiZWx9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTGVnZW5kRW50cnlDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxhYmVsOiBhbnk7XG4gIEBJbnB1dCgpIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IHRyaW1tZWRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdHRlZExhYmVsIHx8ICcoZW1wdHkpJztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtuYW1lOiB0aGlzLmxhYmVsfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHtuYW1lOiB0aGlzLmxhYmVsfSk7XG4gIH1cblxufVxuIl19