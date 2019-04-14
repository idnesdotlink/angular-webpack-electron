import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { invertColor } from '../utils/color-utils';
var CardSeriesComponent = /** @class */ (function () {
    function CardSeriesComponent() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        if (this.data.length > 2) {
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var sortedLengths = this.data
                .map(function (d) {
                var hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue ? valueFormatting_1({
                    data: d.data,
                    label: d ? d.data.name : '',
                    value: (d && d.data) ? d.data.value : ''
                }).length : 0;
            })
                .sort(function (a, b) { return b - a; });
            var idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        var cards = this.getCards();
        this.cards = cards.filter(function (d) { return d.data.value !== null; });
        this.emptySlots = cards.filter(function (d) { return d.data.value === null; });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        var yPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[0] + this.innerPadding[2];
        var xPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[1] + this.innerPadding[3];
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            d.data.name = label;
            var value = d.data.value;
            var valueColor = label ? _this.colors.getColor(label) : _this.emptyColor;
            var color = _this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color: color,
                bandColor: _this.bandColor || valueColor,
                textColor: _this.textColor || invertColor(color),
                label: label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeriesComponent.prototype.trackBy = function (index, card) {
        return card.label;
    };
    CardSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
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
            template: "\n    <svg:rect\n      *ngFor=\"let c of emptySlots; trackBy:trackBy\"\n      class=\"card-empty\"\n      [attr.x]=\"c.x\"\n      [attr.y]=\"c.y\"\n      [style.fill]=\"emptyColor\"\n      [attr.width]=\"c.width\"\n      [attr.height]=\"c.height\"\n      rx=\"3\"\n      ry=\"3\"\n    />\n    <svg:g ng-svg-charts-card *ngFor=\"let c of cards; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [bandColor]=\"c.bandColor\"\n      [textColor]=\"c.textColor\"\n      [data]=\"c.data\"\n      [medianSize]=\"medianSize\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CardSeriesComponent);
    return CardSeriesComponent;
}());
export { CardSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvY2FyZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUE2Q25EO0lBaENBO1FBc0NXLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBSWxCLGVBQVUsR0FBRyxrQkFBa0IsQ0FBQztRQUloQyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBNkV4QyxDQUFDO0lBdkVDLHlDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFNLGlCQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1lBRXRGLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJO2lCQUM1QixHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUNKLElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztnQkFDN0YsT0FBTyxRQUFR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QUFFOzt1REFBNkI7SUFoQjNCLG1CQUFtQjtRQWhDL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxRQUFRLEVBQUUsbXhCQTJCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxtQkFBbUIsQ0E2Ri9CO0lBQUQsMEJBQUM7Q0FBQSxBQTdGRCxJQTZGQztTQTdGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludmVydENvbG9yIH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRNb2RlbCB7XG4gIHg7XG4gIHk7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBkYXRhO1xuICB0b29sdGlwVGV4dDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25nLXN2Zy1jaGFydHMtY2FyZC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnJlY3RcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGVtcHR5U2xvdHM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBjbGFzcz1cImNhcmQtZW1wdHlcIlxuICAgICAgW2F0dHIueF09XCJjLnhcIlxuICAgICAgW2F0dHIueV09XCJjLnlcIlxuICAgICAgW3N0eWxlLmZpbGxdPVwiZW1wdHlDb2xvclwiXG4gICAgICBbYXR0ci53aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFthdHRyLmhlaWdodF09XCJjLmhlaWdodFwiXG4gICAgICByeD1cIjNcIlxuICAgICAgcnk9XCIzXCJcbiAgICAvPlxuICAgIDxzdmc6ZyBuZy1zdmctY2hhcnRzLWNhcmQgKm5nRm9yPVwibGV0IGMgb2YgY2FyZHM7IHRyYWNrQnk6dHJhY2tCeVwiXG4gICAgICBbeF09XCJjLnhcIlxuICAgICAgW3ldPVwiYy55XCJcbiAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxuICAgICAgW2NvbG9yXT1cImMuY29sb3JcIlxuICAgICAgW2JhbmRDb2xvcl09XCJjLmJhbmRDb2xvclwiXG4gICAgICBbdGV4dENvbG9yXT1cImMudGV4dENvbG9yXCJcbiAgICAgIFtkYXRhXT1cImMuZGF0YVwiXG4gICAgICBbbWVkaWFuU2l6ZV09XCJtZWRpYW5TaXplXCJcbiAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcbiAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgIC8+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGRhdGE6IGFueVtdO1xuICBASW5wdXQoKSBzbG90czogYW55W107XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgaW5uZXJQYWRkaW5nID0gMTU7XG5cbiAgQElucHV0KCkgY2FyZENvbG9yO1xuICBASW5wdXQoKSBiYW5kQ29sb3I7XG4gIEBJbnB1dCgpIGVtcHR5Q29sb3IgPSAncmdiYSgwLCAwLCAwLCAwKSc7XG4gIEBJbnB1dCgpIHRleHRDb2xvcjtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNhcmRzOiBDYXJkTW9kZWxbXTtcbiAgZW1wdHlTbG90czogYW55W107XG4gIG1lZGlhblNpemU6IG51bWJlcjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG5cbiAgICAgIGNvbnN0IHNvcnRlZExlbmd0aHMgPSB0aGlzLmRhdGFcbiAgICAgICAgLm1hcChkID0+IHtcbiAgICAgICAgICBjb25zdCBoYXNWYWx1ZSA9IGQgJiYgZC5kYXRhICYmIHR5cGVvZiBkLmRhdGEudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIGQuZGF0YS52YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gaGFzVmFsdWUgPyB2YWx1ZUZvcm1hdHRpbmcoe1xuICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxuICAgICAgICAgICAgbGFiZWw6IGQgPyBkLmRhdGEubmFtZSA6ICcnLFxuICAgICAgICAgICAgdmFsdWU6IChkICYmIGQuZGF0YSkgPyBkLmRhdGEudmFsdWUgOiAnJ1xuICAgICAgICAgIH0pLmxlbmd0aCA6IDA7XG4gICAgICAgIH0pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiIC0gYSk7XG4gICAgICBjb25zdCBpZHggPSBNYXRoLmNlaWwodGhpcy5kYXRhLmxlbmd0aCAvIDIpO1xuICAgICAgdGhpcy5tZWRpYW5TaXplID0gc29ydGVkTGVuZ3Roc1tpZHhdO1xuICAgIH1cblxuICAgIGNvbnN0IGNhcmRzID0gdGhpcy5nZXRDYXJkcygpO1xuICAgIHRoaXMuY2FyZHMgPSBjYXJkcy5maWx0ZXIoZCA9PiBkLmRhdGEudmFsdWUgIT09IG51bGwpO1xuICAgIHRoaXMuZW1wdHlTbG90cyA9IGNhcmRzLmZpbHRlcihkID0+IGQuZGF0YS52YWx1ZSA9PT0gbnVsbCk7XG4gIH1cblxuICBnZXRDYXJkcygpOiBhbnlbXSB7XG4gICAgY29uc3QgeVBhZGRpbmcgPSB0eXBlb2YgdGhpcy5pbm5lclBhZGRpbmcgPT09ICdudW1iZXInID9cbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nIDpcbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nWzBdICsgdGhpcy5pbm5lclBhZGRpbmdbMl07XG4gICAgY29uc3QgeFBhZGRpbmcgPSB0eXBlb2YgdGhpcy5pbm5lclBhZGRpbmcgPT09ICdudW1iZXInID9cbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nIDpcbiAgICAgIHRoaXMuaW5uZXJQYWRkaW5nWzFdICsgdGhpcy5pbm5lclBhZGRpbmdbM107XG5cbiAgICByZXR1cm4gdGhpcy5kYXRhXG4gICAgICAubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgbGFiZWwgPSBkLmRhdGEubmFtZTtcbiAgICAgICAgaWYgKGxhYmVsICYmIGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xuICAgICAgICAgIGxhYmVsID0gbGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbCA/IGxhYmVsLnRvTG9jYWxlU3RyaW5nKCkgOiBsYWJlbDtcbiAgICAgICAgfVxuICAgICAgICBkLmRhdGEubmFtZSA9IGxhYmVsO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZC5kYXRhLnZhbHVlO1xuICAgICAgICBjb25zdCB2YWx1ZUNvbG9yID0gbGFiZWwgPyB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCkgOiB0aGlzLmVtcHR5Q29sb3I7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jYXJkQ29sb3IgfHwgdmFsdWVDb2xvciB8fCAnIzAwMCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogZC54LFxuICAgICAgICAgIHk6IGQueSxcbiAgICAgICAgICB3aWR0aDogZC53aWR0aCAtIHhQYWRkaW5nLFxuICAgICAgICAgIGhlaWdodDogZC5oZWlnaHQgLSB5UGFkZGluZyxcbiAgICAgICAgICBjb2xvcixcbiAgICAgICAgICBiYW5kQ29sb3I6IHRoaXMuYmFuZENvbG9yIHx8IHZhbHVlQ29sb3IsXG4gICAgICAgICAgdGV4dENvbG9yOiB0aGlzLnRleHRDb2xvciB8fCBpbnZlcnRDb2xvcihjb2xvciksXG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZGF0YTogZC5kYXRhLFxuICAgICAgICAgIHRvb2x0aXBUZXh0OiBgJHtsYWJlbH06ICR7dmFsdWV9YFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBjYXJkKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY2FyZC5sYWJlbDtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxufVxuIl19