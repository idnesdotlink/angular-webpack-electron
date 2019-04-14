import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
let AdvancedLegendComponent = class AdvancedLegendComponent {
    constructor() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = label => label;
        this.percentageFormatting = percentage => percentage;
        this.defaultValueFormatting = value => value.toLocaleString();
    }
    ngOnChanges(changes) {
        this.update();
    }
    getTotal() {
        return this.data.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }
    update() {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    }
    getLegendItems() {
        return this.data.map(d => {
            const label = formatLabel(d.name);
            const value = d.value;
            const color = this.colors.getColor(label);
            const percentage = this.total > 0 ? (value / this.total) * 100 : 0;
            const formattedLabel = typeof this.labelFormatting === 'function' ? this.labelFormatting(label) : label;
            return {
                _value: value,
                value,
                color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: this.percentageFormatting ? this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    }
    trackBy(item) {
        return item.formattedLabel;
    }
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
        template: `
    <div class="advanced-pie-legend" [style.width.px]="width">
      <div
        *ngIf="animations"
        class="total-value"
        ng-svg-charts-count-up
        [countTo]="roundedTotal"
        [valueFormatting]="valueFormatting">
      </div>
      <div class="total-value" *ngIf="!animations">
        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}
      </div>
      <div class="total-label">
        {{ label }}
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy: trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.label)"
            (mouseleave)="deactivate.emit(legendItem.label)"
            (click)="select.emit({ name: legendItem.label, value: legendItem.value })">
            <div class="item-color" [style.border-left-color]="legendItem.color"></div>
            <div
              *ngIf="animations"
              class="item-value"
              ng-svg-charts-count-up
              [countTo]="legendItem._value"
              [valueFormatting]="valueFormatting">
            </div>
            <div *ngIf="!animations" class="item-value">
              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}
            </div>
            <div class="item-label">{{ legendItem.displayLabel }}</div>
            <div
              *ngIf="animations"
              class="item-percent"
              ng-svg-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'">
            </div>
            <div *ngIf="!animations" class="item-percent">{{ legendItem.percentage.toLocaleString() }}%</div>
          </div>
        </div>
      </div>
    </div>
  `,
        preserveWhitespaces: false,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".advanced-pie-legend{float:left;position:relative;top:50%;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"]
    })
], AdvancedLegendComponent);
export { AdvancedLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUEwRDlDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBeERwQztRQTREVyxVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0QsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFLZixvQkFBZSxHQUEyQixLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUN6RCx5QkFBb0IsR0FBMkIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFFakYsMkJBQXNCLEdBQTJCLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBd0NuRixDQUFDO0lBdENDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxD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cG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2xhYmVsLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXN2Zy1jaGFydHMtYWR2YW5jZWQtbGVnZW5kJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYWR2YW5jZWQtcGllLWxlZ2VuZFwiIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdJZj1cImFuaW1hdGlvbnNcIlxuICAgICAgICBjbGFzcz1cInRvdGFsLXZhbHVlXCJcbiAgICAgICAgbmctc3ZnLWNoYXJ0cy1jb3VudC11cFxuICAgICAgICBbY291bnRUb109XCJyb3VuZGVkVG90YWxcIlxuICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidG90YWwtdmFsdWVcIiAqbmdJZj1cIiFhbmltYXRpb25zXCI+XG4gICAgICAgIHt7IHZhbHVlRm9ybWF0dGluZyA/IHZhbHVlRm9ybWF0dGluZyhyb3VuZGVkVG90YWwpIDogZGVmYXVsdFZhbHVlRm9ybWF0dGluZyhyb3VuZGVkVG90YWwpIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0b3RhbC1sYWJlbFwiPlxuICAgICAgICB7eyBsYWJlbCB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1zLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1zXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGxlZ2VuZEl0ZW0gb2YgbGVnZW5kSXRlbXM7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICBjbGFzcz1cImxlZ2VuZC1pdGVtXCJcbiAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImFjdGl2YXRlLmVtaXQobGVnZW5kSXRlbS5sYWJlbClcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwiZGVhY3RpdmF0ZS5lbWl0KGxlZ2VuZEl0ZW0ubGFiZWwpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QuZW1pdCh7IG5hbWU6IGxlZ2VuZEl0ZW0ubGFiZWwsIHZhbHVlOiBsZWdlbmRJdGVtLnZhbHVlIH0pXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1jb2xvclwiIFtzdHlsZS5ib3JkZXItbGVmdC1jb2xvcl09XCJsZWdlbmRJdGVtLmNvbG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaXRlbS12YWx1ZVwiXG4gICAgICAgICAgICAgIG5nLXN2Zy1jaGFydHMtY291bnQtdXBcbiAgICAgICAgICAgICAgW2NvdW50VG9dPVwibGVnZW5kSXRlbS5fdmFsdWVcIlxuICAgICAgICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWFuaW1hdGlvbnNcIiBjbGFzcz1cIml0ZW0tdmFsdWVcIj5cbiAgICAgICAgICAgICAge3sgdmFsdWVGb3JtYXR0aW5nID8gdmFsdWVGb3JtYXR0aW5nKGxlZ2VuZEl0ZW0udmFsdWUpIDogZGVmYXVsdFZhbHVlRm9ybWF0dGluZyhsZWdlbmRJdGVtLnZhbHVlKSB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1sYWJlbFwiPnt7IGxlZ2VuZEl0ZW0uZGlzcGxheUxhYmVsIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaXRlbS1wZXJjZW50XCJcbiAgICAgICAgICAgICAgbmctc3ZnLWNoYXJ0cy1jb3VudC11cFxuICAgICAgICAgICAgICBbY291bnRUb109XCJsZWdlbmRJdGVtLnBlcmNlbnRhZ2VcIlxuICAgICAgICAgICAgICBbY291bnRTdWZmaXhdPVwiJyUnXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwiaXRlbS1wZXJjZW50XCI+e3sgbGVnZW5kSXRlbS5wZXJjZW50YWdlLnRvTG9jYWxlU3RyaW5nKCkgfX0lPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2FkdmFuY2VkLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWR2YW5jZWRMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIGxhYmVsID0gJ1RvdGFsJztcbiAgQElucHV0KCkgYW5pbWF0aW9ucyA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBsZWdlbmRJdGVtczogYW55W10gPSBbXTtcbiAgdG90YWw6IG51bWJlcjtcbiAgcm91bmRlZFRvdGFsOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55O1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6ICh2YWx1ZTogc3RyaW5nKSA9PiBhbnkgPSBsYWJlbCA9PiBsYWJlbDtcbiAgQElucHV0KCkgcGVyY2VudGFnZUZvcm1hdHRpbmc6ICh2YWx1ZTogbnVtYmVyKSA9PiBhbnkgPSBwZXJjZW50YWdlID0+IHBlcmNlbnRhZ2U7XG5cbiAgZGVmYXVsdFZhbHVlRm9ybWF0dGluZzogKHZhbHVlOiBudW1iZXIpID0+IGFueSA9IHZhbHVlID0+IHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBnZXRUb3RhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IHN1bSArIGQsIDApO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudG90YWwgPSB0aGlzLmdldFRvdGFsKCk7XG4gICAgdGhpcy5yb3VuZGVkVG90YWwgPSB0aGlzLnRvdGFsO1xuXG4gICAgdGhpcy5sZWdlbmRJdGVtcyA9IHRoaXMuZ2V0TGVnZW5kSXRlbXMoKTtcbiAgfVxuXG4gIGdldExlZ2VuZEl0ZW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZCA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGZvcm1hdExhYmVsKGQubmFtZSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcbiAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0aGlzLnRvdGFsID4gMCA/ICh2YWx1ZSAvIHRoaXMudG90YWwpICogMTAwIDogMDtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gdHlwZW9mIHRoaXMubGFiZWxGb3JtYXR0aW5nID09PSAnZnVuY3Rpb24nID8gdGhpcy5sYWJlbEZvcm1hdHRpbmcobGFiZWwpIDogbGFiZWw7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIF92YWx1ZTogdmFsdWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgbGFiZWw6IGZvcm1hdHRlZExhYmVsLFxuICAgICAgICBkaXNwbGF5TGFiZWw6IHRyaW1MYWJlbChmb3JtYXR0ZWRMYWJlbCwgMjApLFxuICAgICAgICBvcmlnaWFsTGFiZWw6IGQubmFtZSxcbiAgICAgICAgcGVyY2VudGFnZTogdGhpcy5wZXJjZW50YWdlRm9ybWF0dGluZyA/IHRoaXMucGVyY2VudGFnZUZvcm1hdHRpbmcocGVyY2VudGFnZSkgOiBwZXJjZW50YWdlLnRvTG9jYWxlU3RyaW5nKClcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICB0cmFja0J5KGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5mb3JtYXR0ZWRMYWJlbDtcbiAgfVxufVxuIl19