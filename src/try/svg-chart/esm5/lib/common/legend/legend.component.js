import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
var LegendComponent = /** @class */ (function () {
    function LegendComponent(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var e_1, _a;
        var items = [];
        var _loop_1 = function (label) {
            var formattedLabel = formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        try {
            for (var _b = tslib_1.__values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var label = _c.value;
                _loop_1(label);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        this.labelActivate.emit(item);
    };
    LegendComponent.prototype.deactivate = function (item) {
        this.labelDeactivate.emit(item);
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "height", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "activeEntries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LegendComponent.prototype, "horizontal", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendComponent.prototype, "labelClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendComponent.prototype, "labelActivate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], LegendComponent.prototype, "labelDeactivate", void 0);
    LegendComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-legend',
            template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\" *ngIf=\"title?.length > 0\">\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n            [class.horizontal-legend]=\"horizontal\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ng-svg-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ng-svg-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef])
    ], LegendComponent);
    return LegendComponent;
}());
export { LegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDckMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQzlELE1BQU0sZUFBZSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWtDOUM7SUFnQkUseUJBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBUmhDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbEIsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEQsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQUVtQixDQUFDO0lBRTlDLHFDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELDBDQUFnQixHQUFoQjs7UUFDRSxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0NBRVAsS0FBSztZQUNiLElBQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsS0FBSyxPQUFBO29CQUNMLGNBQWMsZ0JBQUE7b0JBQ2QsS0FBSyxFQUFFLE9BQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQ25DLENBQUMsQ0FBQzthQUNKOzs7O1lBYkgsS0FBbUIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxJQUFJLENBQUEsZ0JBQUE7Z0JBQXhCLElBQU0sS0FBSyxXQUFBO3dCQUFMLEtBQUs7YUFjZDs7Ozs7Ozs7O1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsa0NBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN0QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7WUFDcEMsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksS0FBSyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELGtDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQWpFUTtRQUFSLEtBQUssRUFBRTs7aURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7a0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTs7bURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7bURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7a0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTs7MERBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7dURBQW9CO0lBRWxCO1FBQVQsTUFBTSxFQUFFOzBDQUFhLFlBQVk7dURBQTJCO0lBQ25EO1FBQVQsTUFBTSxFQUFFOzBDQUFnQixZQUFZOzBEQUEyQjtJQUN0RDtRQUFULE1BQU0sRUFBRTswQ0FBa0IsWUFBWTs0REFBMkI7SUFadkQsZUFBZTtRQWhDM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsKzdCQXlCVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO2lEQWlCd0IsaUJBQWlCO09BaEI5QixlQUFlLENBcUUzQjtJQUFELHNCQUFDO0NBQUEsQUFyRUQsSUFxRUM7U0FyRVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0VuY2Fwc3VsYXRpb25cbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIj5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJsZWdlbmQtdGl0bGVcIiAqbmdJZj1cInRpdGxlPy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLXRpdGxlLXRleHRcIj57e3RpdGxlfX08L3NwYW4+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtd3JhcFwiPlxuICAgICAgICA8dWwgY2xhc3M9XCJsZWdlbmQtbGFiZWxzXCJcbiAgICAgICAgICAgIFtjbGFzcy5ob3Jpem9udGFsLWxlZ2VuZF09XCJob3Jpem9udGFsXCJcbiAgICAgICAgICBbc3R5bGUubWF4LWhlaWdodC5weF09XCJoZWlnaHQgLSA0NVwiPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGVudHJ5IG9mIGxlZ2VuZEVudHJpZXM7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgICAgICAgY2xhc3M9XCJsZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgICAgIDxuZy1zdmctY2hhcnRzLWxlZ2VuZC1lbnRyeVxuICAgICAgICAgICAgICBbbGFiZWxdPVwiZW50cnkubGFiZWxcIlxuICAgICAgICAgICAgICBbZm9ybWF0dGVkTGFiZWxdPVwiZW50cnkuZm9ybWF0dGVkTGFiZWxcIlxuICAgICAgICAgICAgICBbY29sb3JdPVwiZW50cnkuY29sb3JcIlxuICAgICAgICAgICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoZW50cnkpXCJcbiAgICAgICAgICAgICAgKHNlbGVjdCk9XCJsYWJlbENsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L25nLXN2Zy1jaGFydHMtbGVnZW5kLWVudHJ5PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIExlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgdGl0bGU7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgaGVpZ2h0O1xuICBASW5wdXQoKSB3aWR0aDtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllcztcbiAgQElucHV0KCkgaG9yaXpvbnRhbCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBsYWJlbENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxhYmVsQWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGFiZWxEZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBsZWdlbmRFbnRyaWVzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMubGVnZW5kRW50cmllcyA9IHRoaXMuZ2V0TGVnZW5kRW50cmllcygpO1xuICB9XG5cbiAgZ2V0TGVnZW5kRW50cmllcygpOiBhbnlbXSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcblxuICAgIGZvcihjb25zdCBsYWJlbCBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuXG4gICAgICBjb25zdCBpZHggPSBpdGVtcy5maW5kSW5kZXgoKGkpID0+IHtcbiAgICAgICAgcmV0dXJuIGkubGFiZWwgPT09IGZvcm1hdHRlZExhYmVsO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGZvcm1hdHRlZExhYmVsLFxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5sYWJlbCA9PT0gZC5uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBhY3RpdmF0ZShpdGVtKSB7XG4gICAgdGhpcy5sYWJlbEFjdGl2YXRlLmVtaXQoaXRlbSk7XG4gIH1cblxuICBkZWFjdGl2YXRlKGl0ZW0pIHtcbiAgICB0aGlzLmxhYmVsRGVhY3RpdmF0ZS5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gIH1cblxufVxuIl19