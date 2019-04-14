import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { invertColor } from '../utils/color-utils';
let CardSeriesComponent = class CardSeriesComponent {
    constructor() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        if (this.data.length > 2) {
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const sortedLengths = this.data
                .map(d => {
                const hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue ? valueFormatting({
                    data: d.data,
                    label: d ? d.data.name : '',
                    value: (d && d.data) ? d.data.value : ''
                }).length : 0;
            })
                .sort((a, b) => b - a);
            const idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        const cards = this.getCards();
        this.cards = cards.filter(d => d.data.value !== null);
        this.emptySlots = cards.filter(d => d.data.value === null);
    }
    getCards() {
        const yPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[0] + this.innerPadding[2];
        const xPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[1] + this.innerPadding[3];
        return this.data
            .map((d, index) => {
            let label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            d.data.name = label;
            const value = d.data.value;
            const valueColor = label ? this.colors.getColor(label) : this.emptyColor;
            const color = this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color,
                bandColor: this.bandColor || valueColor,
                textColor: this.textColor || invertColor(color),
                label,
                data: d.data,
                tooltipText: `${label}: ${value}`
            };
        });
    }
    trackBy(index, card) {
        return card.label;
    }
    onClick(data) {
        this.select.emit(data);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CardSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CardSeriesComponent.prototype, "slots", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "dims", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "innerPadding", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "cardColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "bandColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "emptyColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "textColor", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "valueFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "labelFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CardSeriesComponent.prototype, "select", void 0);
CardSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-card-series]',
        template: `
    <svg:rect
      *ngFor="let c of emptySlots; trackBy:trackBy"
      class="card-empty"
      [attr.x]="c.x"
      [attr.y]="c.y"
      [style.fill]="emptyColor"
      [attr.width]="c.width"
      [attr.height]="c.height"
      rx="3"
      ry="3"
    />
    <svg:g ng-svg-charts-card *ngFor="let c of cards; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [textColor]="c.textColor"
      [data]="c.data"
      [medianSize]="medianSize"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [animations]="animations"
      (select)="onClick($event)"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CardSeriesComponent);
export { CardSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvY2FyZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUE2Q25ELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBaENoQztRQXNDVyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUlsQixlQUFVLEdBQUcsa0JBQWtCLENBQUM7UUFJaEMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTZFeEMsQ0FBQztJQXZFQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBRXRGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJO2lCQUM1QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1AsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO2dCQUM3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Qy9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw4QkFBOEI7UUFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csbUJBQW1CLENBNkYvQjtTQTdGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludmVydENvbG9yIH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRNb2RlbCB7XG4gIHg7XG4gIHk7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBkYXRhO1xuICB0b29sdGlwVGV4dDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtY2FyZC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnJlY3RcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGVtcHR5U2xvdHM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBjbGFzcz1cImNhcmQtZW1wdHlcIlxuICAgICAgW2F0dHIueF09XCJjLnhcIlxuICAgICAgW2F0dHIueV09XCJjLnlcIlxuICAgICAgW3N0eWxlLmZpbGxdPVwiZW1wdHlDb2xvclwiXG4gICAgICBbYXR0ci53aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFthdHRyLmhlaWdodF09XCJjLmhlaWdodFwiXG4gICAgICByeD1cIjNcIlxuICAgICAgcnk9XCIzXCJcbiAgICAvPlxuICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWNhcmQgKm5nRm9yPVwibGV0IGMgb2YgY2FyZHM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBbeF09XCJjLnhcIlxuICAgICAgW3ldPVwiYy55XCJcbiAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxuICAgICAgW2NvbG9yXT1cImMuY29sb3JcIlxuICAgICAgW2JhbmRDb2xvcl09XCJjLmJhbmRDb2xvclwiXG4gICAgICBbdGV4dENvbG9yXT1cImMudGV4dENvbG9yXCJcbiAgICAgIFtkYXRhXT1cImMuZGF0YVwiXG4gICAgICBbbWVkaWFuU2l6ZV09XCJtZWRpYW5TaXplXCJcbiAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcbiAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgIC8+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGRhdGE6IGFueVtdO1xuICBASW5wdXQoKSBzbG90czogYW55W107XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgaW5uZXJQYWRkaW5nID0gMTU7XG5cbiAgQElucHV0KCkgY2FyZENvbG9yO1xuICBASW5wdXQoKSBiYW5kQ29sb3I7XG4gIEBJbnB1dCgpIGVtcHR5Q29sb3IgPSAncmdiYSgwLCAwLCAwLCAwKSc7XG4gIEBJbnB1dCgpIHRleHRDb2xvcjtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNhcmRzOiBDYXJkTW9kZWxbXTtcbiAgZW1wdHlTbG90czogYW55W107XG4gIG1lZGlhblNpemU6IG51bWJlcjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG5cbiAgICAgIGNvbnN0IHNvcnRlZExlbmd0aHMgPSB0aGlzLmRhdGFcbiAgICAgICAgLm1hcChkID0+IHtcbiAgICAgICAgICBjb25zdCBoYXNWYWx1ZSA9IGQgJiYgZC5kYXRhICYmIHR5cGVvZiBkLmRhdGEudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIGQuZGF0YS52YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gaGFzVmFsdWUgPyB2YWx1ZUZvcm1hdHRpbmcoe1xuICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxuICAgICAgICAgICAgbGFiZWw6IGQgPyBkLmRhdGEubmFtZSA6ICcnLFxuICAgICAgICAgICAgdmFsdWU6IChkICYmIGQuZGF0YSkgPyBkLmRhdGEudmFsdWUgOiAnJ1xuICAgICAgICAgIH0pLmxlbmd0aCA6IDA7XG4gICAgICAgIH0pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiIC0gYSk7XG4gICAgICBjb25zdCBpZHggPSBNYXRoLmNlaWwodGhpcy5kYXRhLmxlbmd0aCAvIDIpO1xuICAgICAgdGhpcy5tZWRpYW5TaXplID0gc29ydGVkTGVuZ3Roc1tpZHhdO1xuICAgIH1cblxuICAgIGNvbnN0IGNhcmRzID0gdGhpcy5nZXRDYXJkcygpO1xuICAgIHRoaXMuY2FyZHMgPSBjYXJkcy5maWx0ZXIoZCA9PiBkLmRhdGEudmFsdWUgIT09IG51bGwpO1xuICAgIHRoaXMuZW1wdHlTbG90cyA9IGNhcmRzLmZpbHRlcihkID0+IGQuZGF0YS52YWx1ZSA9PT0gbnVsbCk7XG4gIH1cblxuICBnZXRDYXJkcygpOiBhbnlbXSB7XG4gICAgY29uc3QgeVBhZGRpbmcgPSB0eXBlb2YgdGhpcy5pbm5lclBhZGRpbmcgPT09ICdudW1iZXInID9cbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nIDpcbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nWzBdICsgdGhpcy5pbm5lclBhZGRpbmdbMl07XG4gICAgY29uc3QgeFBhZGRpbmcgPSB0eXBlb2YgdGhpcy5pbm5lclBhZGRpbmcgPT09ICdudW1iZXInID9cbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nIDpcbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nWzFdICsgdGhpcy5pbm5lclBhZGRpbmdbM107XG5cbiAgICByZXR1cm4gdGhpcy5kYXRhXG4gICAgICAubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgbGFiZWwgPSBkLmRhdGEubmFtZTtcbiAgICAgICAgaWYgKGxhYmVsICYmIGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xuICAgICAgICAgIGxhYmVsID0gbGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbCA/IGxhYmVsLnRvTG9jYWxlU3RyaW5nKCkgOiBsYWJlbDtcbiAgICAgICAgfVxuICAgICAgICBkLmRhdGEubmFtZSA9IGxhYmVsO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZC5kYXRhLnZhbHVlO1xuICAgICAgICBjb25zdCB2YWx1ZUNvbG9yID0gbGFiZWwgPyB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCkgOiB0aGlzLmVtcHR5Q29sb3I7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jYXJkQ29sb3IgfHwgdmFsdWVDb2xvciB8fCAnIzAwMCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogZC54LFxuICAgICAgICAgIHk6IGQueSxcbiAgICAgICAgICB3aWR0aDogZC53aWR0aCAtIHhQYWRkaW5nLFxuICAgICAgICAgIGhlaWdodDogZC5oZWlnaHQgLSB5UGFkZGluZyxcbiAgICAgICAgICBjb2xvcixcbiAgICAgICAgICBiYW5kQ29sb3I6IHRoaXMuYmFuZENvbG9yIHx8IHZhbHVlQ29sb3IsXG4gICAgICAgICAgdGV4dENvbG9yOiB0aGlzLnRleHRDb2xvciB8fCBpbnZlcnRDb2xvcihjb2xvciksXG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZGF0YTogZC5kYXRhLFxuICAgICAgICAgIHRvb2x0aXBUZXh0OiBgJHtsYWJlbH06ICR7dmFsdWV9YFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBjYXJkKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY2FyZC5sYWJlbDtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxufVxuIl19