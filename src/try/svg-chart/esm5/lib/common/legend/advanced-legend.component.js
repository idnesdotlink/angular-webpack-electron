import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
var AdvancedLegendComponent = /** @class */ (function () {
    function AdvancedLegendComponent() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = function (label) { return label; };
        this.percentageFormatting = function (percentage) { return percentage; };
        this.defaultValueFormatting = function (value) { return value.toLocaleString(); };
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d) {
            var label = formatLabel(d.name);
            var value = d.value;
            var color = _this.colors.getColor(label);
            var percentage = _this.total > 0 ? (value / _this.total) * 100 : 0;
            var formattedLabel = typeof _this.labelFormatting === 'function' ? _this.labelFormatting(label) : label;
            return {
                _value: value,
                value: value,
                color: color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: _this.percentageFormatting ? _this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AdvancedLegendComponent.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "animations", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AdvancedLegendComponent.prototype, "select", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AdvancedLegendComponent.prototype, "activate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AdvancedLegendComponent.prototype, "deactivate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "valueFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "labelFormatting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "percentageFormatting", void 0);
    AdvancedLegendComponent = tslib_1.__decorate([
        Component({
            selector: 'ng-svg-charts-advanced-legend',
            template: "\n    <div class=\"advanced-pie-legend\" [style.width.px]=\"width\">\n      <div\n        *ngIf=\"animations\"\n        class=\"total-value\"\n        ng-svg-charts-count-up\n        [countTo]=\"roundedTotal\"\n        [valueFormatting]=\"valueFormatting\">\n      </div>\n      <div class=\"total-value\" *ngIf=\"!animations\">\n        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}\n      </div>\n      <div class=\"total-label\">\n        {{ label }}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy: trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div class=\"item-color\" [style.border-left-color]=\"legendItem.color\"></div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-value\"\n              ng-svg-charts-count-up\n              [countTo]=\"legendItem._value\"\n              [valueFormatting]=\"valueFormatting\">\n            </div>\n            <div *ngIf=\"!animations\" class=\"item-value\">\n              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}\n            </div>\n            <div class=\"item-label\">{{ legendItem.displayLabel }}</div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-percent\"\n              ng-svg-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n            <div *ngIf=\"!animations\" class=\"item-percent\">{{ legendItem.percentage.toLocaleString() }}%</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            preserveWhitespaces: false,
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".advanced-pie-legend{float:left;position:relative;top:50%;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"]
        })
    ], AdvancedLegendComponent);
    return AdvancedLegendComponent;
}());
export { AdvancedLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUEwRDlDO0lBeERBO1FBNERXLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3RCxnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUtmLG9CQUFlLEdBQTJCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQztRQUN6RCx5QkFBb0IsR0FBMkIsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLEVBQVYsQ0FBVSxDQUFDO1FBRWpGLDJCQUFzQixHQUEyQixVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQztJQXdDbkYsQ0FBQztJQXRDQyw2Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFB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IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vdHJpbS1sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zdmctY2hhcnRzLWFkdmFuY2VkLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFkdmFuY2VkLXBpZS1sZWdlbmRcIiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcbiAgICAgICAgY2xhc3M9XCJ0b3RhbC12YWx1ZVwiXG4gICAgICAgIG5nLXN2Zy1jaGFydHMtY291bnQtdXBcbiAgICAgICAgW2NvdW50VG9dPVwicm91bmRlZFRvdGFsXCJcbiAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXZhbHVlXCIgKm5nSWY9XCIhYW5pbWF0aW9uc1wiPlxuICAgICAgICB7eyB2YWx1ZUZvcm1hdHRpbmcgPyB2YWx1ZUZvcm1hdHRpbmcocm91bmRlZFRvdGFsKSA6IGRlZmF1bHRWYWx1ZUZvcm1hdHRpbmcocm91bmRlZFRvdGFsKSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidG90YWwtbGFiZWxcIj5cbiAgICAgICAge3sgbGFiZWwgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtcy1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtc1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBsZWdlbmRJdGVtIG9mIGxlZ2VuZEl0ZW1zOyB0cmFja0J5OiB0cmFja0J5XCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgY2xhc3M9XCJsZWdlbmQtaXRlbVwiXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJhY3RpdmF0ZS5lbWl0KGxlZ2VuZEl0ZW0ubGFiZWwpXCJcbiAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cImRlYWN0aXZhdGUuZW1pdChsZWdlbmRJdGVtLmxhYmVsKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0LmVtaXQoeyBuYW1lOiBsZWdlbmRJdGVtLmxhYmVsLCB2YWx1ZTogbGVnZW5kSXRlbS52YWx1ZSB9KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tY29sb3JcIiBbc3R5bGUuYm9yZGVyLWxlZnQtY29sb3JdPVwibGVnZW5kSXRlbS5jb2xvclwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAqbmdJZj1cImFuaW1hdGlvbnNcIlxuICAgICAgICAgICAgICBjbGFzcz1cIml0ZW0tdmFsdWVcIlxuICAgICAgICAgICAgICBuZy1zdmctY2hhcnRzLWNvdW50LXVwXG4gICAgICAgICAgICAgIFtjb3VudFRvXT1cImxlZ2VuZEl0ZW0uX3ZhbHVlXCJcbiAgICAgICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFhbmltYXRpb25zXCIgY2xhc3M9XCJpdGVtLXZhbHVlXCI+XG4gICAgICAgICAgICAgIHt7IHZhbHVlRm9ybWF0dGluZyA/IHZhbHVlRm9ybWF0dGluZyhsZWdlbmRJdGVtLnZhbHVlKSA6IGRlZmF1bHRWYWx1ZUZvcm1hdHRpbmcobGVnZW5kSXRlbS52YWx1ZSkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbGFiZWxcIj57eyBsZWdlbmRJdGVtLmRpc3BsYXlMYWJlbCB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAqbmdJZj1cImFuaW1hdGlvbnNcIlxuICAgICAgICAgICAgICBjbGFzcz1cIml0ZW0tcGVyY2VudFwiXG4gICAgICAgICAgICAgIG5nLXN2Zy1jaGFydHMtY291bnQtdXBcbiAgICAgICAgICAgICAgW2NvdW50VG9dPVwibGVnZW5kSXRlbS5wZXJjZW50YWdlXCJcbiAgICAgICAgICAgICAgW2NvdW50U3VmZml4XT1cIiclJ1wiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWFuaW1hdGlvbnNcIiBjbGFzcz1cIml0ZW0tcGVyY2VudFwiPnt7IGxlZ2VuZEl0ZW0ucGVyY2VudGFnZS50b0xvY2FsZVN0cmluZygpIH19JTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9hZHZhbmNlZC1sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBsYWJlbCA9ICdUb3RhbCc7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbGVnZW5kSXRlbXM6IGFueVtdID0gW107XG4gIHRvdGFsOiBudW1iZXI7XG4gIHJvdW5kZWRUb3RhbDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogKHZhbHVlOiBudW1iZXIpID0+IGFueTtcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiAodmFsdWU6IHN0cmluZykgPT4gYW55ID0gbGFiZWwgPT4gbGFiZWw7XG4gIEBJbnB1dCgpIHBlcmNlbnRhZ2VGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55ID0gcGVyY2VudGFnZSA9PiBwZXJjZW50YWdlO1xuXG4gIGRlZmF1bHRWYWx1ZUZvcm1hdHRpbmc6ICh2YWx1ZTogbnVtYmVyKSA9PiBhbnkgPSB2YWx1ZSA9PiB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0VG90YWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvdGFsID0gdGhpcy5nZXRUb3RhbCgpO1xuICAgIHRoaXMucm91bmRlZFRvdGFsID0gdGhpcy50b3RhbDtcblxuICAgIHRoaXMubGVnZW5kSXRlbXMgPSB0aGlzLmdldExlZ2VuZEl0ZW1zKCk7XG4gIH1cblxuICBnZXRMZWdlbmRJdGVtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGQgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBmb3JtYXRMYWJlbChkLm5hbWUpO1xuICAgICAgY29uc3QgdmFsdWUgPSBkLnZhbHVlO1xuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCk7XG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gdGhpcy50b3RhbCA+IDAgPyAodmFsdWUgLyB0aGlzLnRvdGFsKSAqIDEwMCA6IDA7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IHR5cGVvZiB0aGlzLmxhYmVsRm9ybWF0dGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMubGFiZWxGb3JtYXR0aW5nKGxhYmVsKSA6IGxhYmVsO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBfdmFsdWU6IHZhbHVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIGxhYmVsOiBmb3JtYXR0ZWRMYWJlbCxcbiAgICAgICAgZGlzcGxheUxhYmVsOiB0cmltTGFiZWwoZm9ybWF0dGVkTGFiZWwsIDIwKSxcbiAgICAgICAgb3JpZ2lhbExhYmVsOiBkLm5hbWUsXG4gICAgICAgIHBlcmNlbnRhZ2U6IHRoaXMucGVyY2VudGFnZUZvcm1hdHRpbmcgPyB0aGlzLnBlcmNlbnRhZ2VGb3JtYXR0aW5nKHBlcmNlbnRhZ2UpIDogcGVyY2VudGFnZS50b0xvY2FsZVN0cmluZygpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgdHJhY2tCeShpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uZm9ybWF0dGVkTGFiZWw7XG4gIH1cbn1cbiJdfQ==