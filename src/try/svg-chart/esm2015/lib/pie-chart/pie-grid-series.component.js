import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { pie } from 'd3-shape';
let PieGridSeriesComponent = class PieGridSeriesComponent {
    constructor(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.layout = pie()
            .value((d) => d.data.value).sort(null);
        this.arcs = this.getArcs();
    }
    getArcs() {
        return this.layout(this.data).map((arc, index) => {
            const label = arc.data.data.name;
            const other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            const color = this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: this.animations && !other,
                pointerEvents: !other
            };
        });
    }
    onClick(data) {
        this.select.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    }
    trackBy(index, item) {
        return item.data.name;
    }
    label(arc) {
        return arc.data.name;
    }
    color(arc) {
        return this.colors(this.label(arc));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "innerRadius", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "outerRadius", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "select", void 0);
PieGridSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-pie-grid-series]',
        template: `
    <svg:g class="pie-grid-arcs">
      <svg:g ng-svg-charts-pie-arc *ngFor="let arc of arcs; trackBy:trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)">
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], PieGridSeriesComponent);
export { PieGridSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtZ3JpZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFHVix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQXlCL0IsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFjakMsWUFBWSxPQUFtQjtRQVZ0QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFZO2FBQzFCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWxDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUNwQjtZQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsT0FBTztnQkFDTCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNuQixLQUFLLEVBQUUsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLO2dCQUM3QixJQUFJLEVBQUUsS0FBSztnQkFDWCxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVO2dCQUN0QyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSztnQkFDbEMsYUFBYSxFQUFFLENBQUMsS0FBSzthQUN0QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUVGLENBQUE7QUFwRVU7SUFBUixLQUFLLEVBQUU7O3NEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O29EQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7OzJEQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7MkRBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOzswREFBbUI7QUFFakI7SUFBVCxNQUFNLEVBQUU7O3NEQUE2QjtBQVIzQixzQkFBc0I7SUF2QmxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQ0FBa0M7UUFDNUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7NkNBZ0JxQixVQUFVO0dBZHBCLHNCQUFzQixDQXNFbEM7U0F0RVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwaWUgfSBmcm9tICdkMy1zaGFwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmctc3ZnLWNoYXJ0cy1waWUtZ3JpZC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgY2xhc3M9XCJwaWUtZ3JpZC1hcmNzXCI+XG4gICAgICA8c3ZnOmcgbmctc3ZnLWNoYXJ0cy1waWUtYXJjICpuZ0Zvcj1cImxldCBhcmMgb2YgYXJjczsgdHJhY2tCeTp0cmFja0J5XCJcbiAgICAgICAgW2F0dHIuY2xhc3NdPVwiYXJjLmNsYXNzXCJcbiAgICAgICAgW3N0YXJ0QW5nbGVdPVwiYXJjLnN0YXJ0QW5nbGVcIlxuICAgICAgICBbZW5kQW5nbGVdPVwiYXJjLmVuZEFuZ2xlXCJcbiAgICAgICAgW2lubmVyUmFkaXVzXT1cImlubmVyUmFkaXVzXCJcbiAgICAgICAgW291dGVyUmFkaXVzXT1cIm91dGVyUmFkaXVzXCJcbiAgICAgICAgW2ZpbGxdPVwiY29sb3IoYXJjKVwiXG4gICAgICAgIFt2YWx1ZV09XCJhcmMuZGF0YS52YWx1ZVwiXG4gICAgICAgIFtkYXRhXT1cImFyYy5kYXRhXCJcbiAgICAgICAgW2dyYWRpZW50XT1cImZhbHNlXCJcbiAgICAgICAgW3BvaW50ZXJFdmVudHNdPVwiYXJjLnBvaW50ZXJFdmVudHNcIlxuICAgICAgICBbYW5pbWF0ZV09XCJhcmMuYW5pbWF0ZVwiXG4gICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcblxuZXhwb3J0IGNsYXNzIFBpZUdyaWRTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgaW5uZXJSYWRpdXMgPSA3MDtcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXMgPSA4MDtcbiAgQElucHV0KCkgYW5pbWF0aW9ucyA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgbGF5b3V0OiBhbnk7XG4gIGFyY3M6IGFueTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5sYXlvdXQgPSBwaWU8YW55LCBhbnk+KClcbiAgICAgIC52YWx1ZSgoZCkgPT4gZC5kYXRhLnZhbHVlKS5zb3J0KG51bGwpO1xuXG4gICAgdGhpcy5hcmNzID0gdGhpcy5nZXRBcmNzKCk7XG4gIH1cblxuICBnZXRBcmNzKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQodGhpcy5kYXRhKS5tYXAoKGFyYywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gYXJjLmRhdGEuZGF0YS5uYW1lO1xuICAgICAgY29uc3Qgb3RoZXIgPSBhcmMuZGF0YS5kYXRhLm90aGVyO1xuXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgYXJjLnN0YXJ0QW5nbGUgPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JzKGxhYmVsKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGFyYy5kYXRhLmRhdGEsXG4gICAgICAgIGNsYXNzOiAnYXJjICcgKyAnYXJjJyArIGluZGV4LFxuICAgICAgICBmaWxsOiBjb2xvcixcbiAgICAgICAgc3RhcnRBbmdsZTogb3RoZXIgPyAwIDogYXJjLnN0YXJ0QW5nbGUsXG4gICAgICAgIGVuZEFuZ2xlOiBhcmMuZW5kQW5nbGUsXG4gICAgICAgIGFuaW1hdGU6IHRoaXMuYW5pbWF0aW9ucyAmJiAhb3RoZXIsXG4gICAgICAgIHBvaW50ZXJFdmVudHM6ICFvdGhlclxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgbmFtZTogdGhpcy5kYXRhWzBdLmRhdGEubmFtZSxcbiAgICAgIHZhbHVlOiB0aGlzLmRhdGFbMF0uZGF0YS52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0uZGF0YS5uYW1lO1xuICB9XG5cbiAgbGFiZWwoYXJjKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYXJjLmRhdGEubmFtZTtcbiAgfVxuXG4gIGNvbG9yKGFyYyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JzKHRoaXMubGFiZWwoYXJjKSk7XG4gIH1cblxufVxuIl19