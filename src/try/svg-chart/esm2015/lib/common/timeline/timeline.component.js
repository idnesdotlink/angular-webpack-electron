import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { select, event as d3event } from 'd3-selection';
import { id } from '../../utils/id';
let TimelineComponent = class TimelineComponent {
    constructor(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    }
    update() {
        this.dims = this.getDims();
        this.height = this.dims.height;
        const offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = `translate(0 , ${offsetY})`;
        this.filterId = 'filter' + id().toString();
        this.filter = `url(#${this.filterId})`;
        this.cd.markForCheck();
    }
    getXDomain() {
        let values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        let domain = [];
        let max;
        let min;
        if (this.scaleType === 'time') {
            min = Math.min(...values);
            max = Math.max(...values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            min = Math.min(...values);
            max = Math.max(...values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    }
    getXScale() {
        let scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    }
    addBrush() {
        if (this.brush) {
            return;
        }
        const height = this.height;
        const width = this.view[0];
        this.brush = brushX()
            .extent([[0, 0], [width, height]])
            .on('brush end', () => {
            const selection = d3event.selection || this.xScale.range();
            const newDomain = selection.map(this.xScale.invert);
            this.onDomainChange.emit(newDomain);
            this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    }
    updateBrush() {
        if (!this.brush) {
            return;
        }
        const height = this.height;
        const width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        select(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        select(this.element).select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    }
    getDims() {
        const width = this.view[0];
        const dims = {
            width,
            height: this.height
        };
        return dims;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "view", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "state", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "results", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "scheme", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "customColors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "legend", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "miniChart", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "autoScale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "scaleType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "height", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], TimelineComponent.prototype, "onDomainChange", void 0);
TimelineComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-timeline]',
        template: `
    <svg:g
      class="timeline"
      [attr.transform]="transform">
      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix in="SourceGraphic"
            type="matrix"
            values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
      </svg:filter>
      <svg:g class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>
      <svg:rect x="0"
        [attr.width]="view[0]"
        y="0"
        [attr.height]="height"
        class="brush-background"
      />
      <svg:g class="brush"></svg:g>
    </svg:g>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef])
], TimelineComponent);
export { TimelineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9zdmctY2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQ3ZDLHVCQUF1QixFQUNsQyxpQkFBaUIsRUFBaUIsaUJBQWlCLEVBQ3BELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUE2QnBDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBMEI1QixZQUNFLE9BQW1CLEVBQ1gsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFqQnRCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFROUMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFPbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFX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Q0FBQztDQUVGLENBQUE7QUFsS1U7SUFBUixLQUFLLEVBQUU7OytDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7O2dEQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7O2tEQUFTO0FBQ1I7SUFBUixLQUFLLEVBQUU7O2lEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O3VEQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7O2lEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O29EQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7O29EQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7O29EQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7O2lEQUFhO0FBRVg7SUFBVCxNQUFNLEVBQUU7O2lEQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTs7eURBQXFDO0FBZG5DLGlCQUFpQjtJQTNCN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO1FBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7NkNBNEJXLFVBQVU7UUFDUCxpQkFBaUI7R0E1QnBCLGlCQUFpQixDQW9LN0I7U0FwS1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGJydXNoWCB9IGZyb20gJ2QzLWJydXNoJztcbmltcG9ydCB7IHNjYWxlTGluZWFyLCBzY2FsZVRpbWUsIHNjYWxlUG9pbnQgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBzZWxlY3QsIGV2ZW50IGFzIGQzZXZlbnQgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uLy4uL3V0aWxzL2lkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXRpbWVsaW5lXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnXG4gICAgICBjbGFzcz1cInRpbWVsaW5lXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cbiAgICAgIDxzdmc6ZmlsdGVyIFthdHRyLmlkXT1cImZpbHRlcklkXCI+XG4gICAgICAgIDxzdmc6ZmVDb2xvck1hdHJpeCBpbj1cIlNvdXJjZUdyYXBoaWNcIlxuICAgICAgICAgICAgdHlwZT1cIm1hdHJpeFwiXG4gICAgICAgICAgICB2YWx1ZXM9XCIwLjMzMzMgMC4zMzMzIDAuMzMzMyAwIDAgMC4zMzMzIDAuMzMzMyAwLjMzMzMgMCAwIDAuMzMzMyAwLjMzMzMgMC4zMzMzIDAgMCAwIDAgMCAxIDBcIiAvPlxuICAgICAgPC9zdmc6ZmlsdGVyPlxuICAgICAgPHN2ZzpnIGNsYXNzPVwiZW1iZWRkZWQtY2hhcnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9zdmc6Zz5cbiAgICAgIDxzdmc6cmVjdCB4PVwiMFwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cInZpZXdbMF1cIlxuICAgICAgICB5PVwiMFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICBjbGFzcz1cImJydXNoLWJhY2tncm91bmRcIlxuICAgICAgLz5cbiAgICAgIDxzdmc6ZyBjbGFzcz1cImJydXNoXCI+PC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi90aW1lbGluZS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgdmlldztcbiAgQElucHV0KCkgc3RhdGU7XG4gIEBJbnB1dCgpIHJlc3VsdHM7XG4gIEBJbnB1dCgpIHNjaGVtZTtcbiAgQElucHV0KCkgY3VzdG9tQ29sb3JzO1xuICBASW5wdXQoKSBsZWdlbmQ7XG4gIEBJbnB1dCgpIG1pbmlDaGFydDtcbiAgQElucHV0KCkgYXV0b1NjYWxlO1xuICBASW5wdXQoKSBzY2FsZVR5cGU7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDUwO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkRvbWFpbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgZGltczogYW55O1xuICB4RG9tYWluOiBhbnlbXTtcbiAgeFNjYWxlOiBhbnk7XG4gIGJydXNoOiBhbnk7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBmaWx0ZXJJZDogYW55O1xuICBmaWx0ZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuYWRkQnJ1c2goKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpbXMgPSB0aGlzLmdldERpbXMoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XG4gICAgY29uc3Qgb2Zmc2V0WSA9IHRoaXMudmlld1sxXSAtIHRoaXMuaGVpZ2h0O1xuXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSgpO1xuXG4gICAgaWYgKHRoaXMuYnJ1c2gpIHtcbiAgICAgIHRoaXMudXBkYXRlQnJ1c2goKTtcbiAgICB9XG5cbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoMCAsICR7b2Zmc2V0WX0pYDtcblxuICAgIHRoaXMuZmlsdGVySWQgPSAnZmlsdGVyJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmZpbHRlciA9IGB1cmwoIyR7dGhpcy5maWx0ZXJJZH0pYDtcblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXRYRG9tYWluKCk6IGFueVtdIHtcbiAgICBsZXQgdmFsdWVzID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XG4gICAgICBmb3IgKGNvbnN0IGQgb2YgcmVzdWx0cy5zZXJpZXMpIHtcbiAgICAgICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXMoZC5uYW1lKSkge1xuICAgICAgICAgIHZhbHVlcy5wdXNoKGQubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZG9tYWluID0gW107XG4gICAgbGV0IG1heDogbnVtYmVyO1xuICAgIGxldCBtaW46IG51bWJlcjtcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcbiAgICAgIG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcbiAgICAgIG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XG4gICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xuICAgICAgZG9tYWluID0gW21pbiwgbWF4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdmFsdWVzO1xuICAgIH1cblxuICAgIHJldHVybiBkb21haW47XG4gIH1cblxuICBnZXRYU2NhbGUoKSB7XG4gICAgbGV0IHNjYWxlO1xuXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcbiAgICAgIHNjYWxlID0gc2NhbGVUaW1lKClcbiAgICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIHNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgICAucmFuZ2UoWzAsIHRoaXMuZGltcy53aWR0aF0pXG4gICAgICAgIC5kb21haW4odGhpcy54RG9tYWluKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgIHNjYWxlID0gc2NhbGVQb2ludCgpXG4gICAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcbiAgICAgICAgLnBhZGRpbmcoMC4xKVxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgYWRkQnJ1c2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYnJ1c2gpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMudmlld1swXTtcblxuICAgIHRoaXMuYnJ1c2ggPSBicnVzaFgoKVxuICAgICAgLmV4dGVudChbWzAsIDBdLCBbd2lkdGgsIGhlaWdodF1dKVxuICAgICAgLm9uKCdicnVzaCBlbmQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGQzZXZlbnQuc2VsZWN0aW9uIHx8IHRoaXMueFNjYWxlLnJhbmdlKCk7XG4gICAgICAgIGNvbnN0IG5ld0RvbWFpbiA9IHNlbGVjdGlvbi5tYXAodGhpcy54U2NhbGUuaW52ZXJ0KTtcblxuICAgICAgICB0aGlzLm9uRG9tYWluQ2hhbmdlLmVtaXQobmV3RG9tYWluKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuXG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudClcbiAgICAgIC5zZWxlY3QoJy5icnVzaCcpXG4gICAgICAuY2FsbCh0aGlzLmJydXNoKTtcbiAgfVxuXG4gIHVwZGF0ZUJydXNoKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5icnVzaCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xuXG4gICAgdGhpcy5icnVzaC5leHRlbnQoW1swLCAwXSwgW3dpZHRoLCBoZWlnaHRdXSk7XG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudClcbiAgICAgIC5zZWxlY3QoJy5icnVzaCcpXG4gICAgICAuY2FsbCh0aGlzLmJydXNoKTtcblxuICAgIC8vIGNsZWFyIGhhcmRjb2RlZCBwcm9wZXJ0aWVzIHNvIHRoZXkgY2FuIGJlIGRlZmluZWQgYnkgQ1NTXG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudCkuc2VsZWN0KCcuc2VsZWN0aW9uJylcbiAgICAgIC5hdHRyKCdmaWxsJywgdW5kZWZpbmVkKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIHVuZGVmaW5lZClcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB1bmRlZmluZWQpO1xuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldERpbXMoKTogYW55IHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMudmlld1swXTtcblxuICAgIGNvbnN0IGRpbXMgPSB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHRcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpbXM7XG4gIH1cblxufVxuIl19