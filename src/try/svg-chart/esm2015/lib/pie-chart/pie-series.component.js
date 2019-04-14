import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { max } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { formatLabel } from '../common/label.helper';
let PieSeriesComponent = class PieSeriesComponent {
    constructor() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        const pieGenerator = pie()
            .value(d => d.value)
            .sort(null);
        const arcData = pieGenerator(this.series);
        this.max = max(arcData, d => {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    outerArc() {
        const factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    }
    calculateLabelPositions(pieData) {
        const factor = 1.5;
        const minDistance = 10;
        const labelPositions = pieData;
        labelPositions.forEach(d => {
            d.pos = this.outerArc().centroid(d);
            d.pos[0] = factor * this.outerRadius * (this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (let i = 0; i < labelPositions.length - 1; i++) {
            const a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (let j = i + 1; j < labelPositions.length; j++) {
                const b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    }
    labelVisible(myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    }
    getTooltipTitle(a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    }
    labelText(myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    }
    label(myArc) {
        return formatLabel(myArc.data.name);
    }
    defaultTooltipText(myArc) {
        const label = this.label(myArc);
        const val = formatLabel(myArc.data.value);
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
    color(myArc) {
        return this.colors.getColor(this.label(myArc));
    }
    trackBy(index, item) {
        return item.data.name;
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "series", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "dims", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "innerRadius", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "outerRadius", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "explodeSlices", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "showLabels", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], PieSeriesComponent.prototype, "gradient", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], PieSeriesComponent.prototype, "activeEntries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "labelFormatting", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "trimLabels", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "maxLabelLength", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], PieSeriesComponent.prototype, "tooltipText", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "select", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "activate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "deactivate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], PieSeriesComponent.prototype, "dblclick", void 0);
PieSeriesComponent = tslib_1.__decorate([
    Component({
        selector: 'g[ng-svg-charts-pie-series]',
        template: "<svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n  <svg:g ng-svg-charts-pie-label\n    *ngIf=\"labelVisible(arc)\"\n    [data]=\"arc\"\n    [radius]=\"outerRadius\"\n    [color]=\"color(arc)\"\n    [label]=\"labelText(arc)\"\n    [labelTrim]=\"trimLabels\"\n    [labelTrimSize]=\"maxLabelLength\"\n    [max]=\"max\"\n    [value]=\"arc.value\"\n    [explodeSlices]=\"explodeSlices\"\n    [animations]=\"animations\">\n  </svg:g>\n  <svg:g\n    ng-svg-charts-pie-arc\n    [startAngle]=\"arc.startAngle\"\n    [endAngle]=\"arc.endAngle\"\n    [innerRadius]=\"innerRadius\"\n    [outerRadius]=\"outerRadius\"\n    [fill]=\"color(arc)\"\n    [value]=\"arc.data.value\"\n    [gradient]=\"gradient\"\n    [data]=\"arc.data\"\n    [max]=\"max\"\n    [explodeSlices]=\"explodeSlices\"\n    [isActive]=\"isActive(arc.data)\"\n    [animate]=\"animations\"\n    (select)=\"onClick($event)\"\n    (activate)=\"activate.emit($event)\"\n    (deactivate)=\"deactivate.emit($event)\"\n    (dblclick)=\"dblclick.emit($event)\"\n    ngx-tooltip\n    [tooltipDisabled]=\"tooltipDisabled\"\n    [tooltipPlacement]=\"'top'\"\n    [tooltipType]=\"'tooltip'\"\n    [tooltipTitle]=\"getTooltipTitle(arc)\"\n    [tooltipTemplate]=\"tooltipTemplate\"\n    [tooltipContext]=\"arc.data\">\n  </svg:g>\n</svg:g>",
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PieSeriesComponent);
export { PieSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU9yRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUwvQjtRQU9XLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFFakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFNakIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV4QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBd0gxQyxDQUFDO0lBbkhDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLFlBQVksR0FBRyxHQUFHLEVBQVk7YUFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZCxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pFLENBQUM7SUFFRCxRQUFRLENBQUMsQ0FBQztRQUNSLE9BQU8sQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUVuQixPQUFPLEdBQUcsRUFBRTthQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQzthQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsT0FBTztRQUM3QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUUvQixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixTQUFTO2FBQ1Y7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pCLFNBQVM7aUJBQ1Y7Z0JBQ0QsOEJBQThCO2dCQUM5QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLHlCQUF5QjtvQkFDekIsTUFBTSxDQUFDLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDVCw2QkFBNkI7d0JBQzdCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjthQUNGO1NBQ0Y7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUs7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUM3RSxDQUFDO0lBRUQsZUFBZSxDQUFDLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUs7UUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBSztRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFDLE9BQU87b0NBQ3lCLEtBQUs7a0NBQ1AsR0FBRztLQUNoQyxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0NBQ0YsQ0FBQTtBQTVJVTtJQUFSLEtBQUssRUFBRTs7a0RBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7a0RBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOztnREFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzt1REFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7O3VEQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7eURBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7c0RBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTs7b0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzt5REFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7OzJEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7c0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzswREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7O3VEQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTs7MkRBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFO3NDQUFrQixXQUFXOzJEQUFNO0FBQ2xDO0lBQVIsS0FBSyxFQUFFOztzREFBbUI7QUFFakI7SUFBVCxNQUFNLEVBQUU7O2tEQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTs7b0RBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFOztzREFBaUM7QUFDaEM7SUFBVCxNQUFNLEVBQUU7O29EQUErQjtBQXJCN0Isa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsaXhDQUF1QztRQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csa0JBQWtCLENBNkk5QjtTQTdJWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXggfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQgeyBhcmMsIHBpZSB9IGZyb20gJ2QzLXNoYXBlJztcblxuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZy1zdmctY2hhcnRzLXBpZS1zZXJpZXNdJyxcbiAgdGVtcGxhdGVVcmw6ICdwaWUtc2VyaWVzLnRlbXBsYXRlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQaWVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIHNlcmllczogYW55ID0gW107XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIGlubmVyUmFkaXVzID0gNjA7XG4gIEBJbnB1dCgpIG91dGVyUmFkaXVzID0gODA7XG4gIEBJbnB1dCgpIGV4cGxvZGVTbGljZXM7XG4gIEBJbnB1dCgpIHNob3dMYWJlbHM7XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIHRyaW1MYWJlbHMgPSB0cnVlO1xuICBASW5wdXQoKSBtYXhMYWJlbExlbmd0aCA9IDEwO1xuICBASW5wdXQoKSB0b29sdGlwVGV4dDogKG86IGFueSkgPT4gYW55O1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBhbmltYXRpb25zID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWF4OiBudW1iZXI7XG4gIGRhdGE6IGFueTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBwaWVHZW5lcmF0b3IgPSBwaWU8YW55LCBhbnk+KClcbiAgICAgIC52YWx1ZShkID0+IGQudmFsdWUpXG4gICAgICAuc29ydChudWxsKTtcblxuICAgIGNvbnN0IGFyY0RhdGEgPSBwaWVHZW5lcmF0b3IodGhpcy5zZXJpZXMpO1xuXG4gICAgdGhpcy5tYXggPSBtYXgoYXJjRGF0YSwgZCA9PiB7XG4gICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuY2FsY3VsYXRlTGFiZWxQb3NpdGlvbnMoYXJjRGF0YSk7XG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcFRleHQgfHwgdGhpcy5kZWZhdWx0VG9vbHRpcFRleHQ7XG4gIH1cblxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZC5zdGFydEFuZ2xlICsgKGQuZW5kQW5nbGUgLSBkLnN0YXJ0QW5nbGUpIC8gMjtcbiAgfVxuXG4gIG91dGVyQXJjKCk6IGFueSB7XG4gICAgY29uc3QgZmFjdG9yID0gMS41O1xuXG4gICAgcmV0dXJuIGFyYygpXG4gICAgICAuaW5uZXJSYWRpdXModGhpcy5vdXRlclJhZGl1cyAqIGZhY3RvcilcbiAgICAgIC5vdXRlclJhZGl1cyh0aGlzLm91dGVyUmFkaXVzICogZmFjdG9yKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxhYmVsUG9zaXRpb25zKHBpZURhdGEpOiBhbnkge1xuICAgIGNvbnN0IGZhY3RvciA9IDEuNTtcbiAgICBjb25zdCBtaW5EaXN0YW5jZSA9IDEwO1xuICAgIGNvbnN0IGxhYmVsUG9zaXRpb25zID0gcGllRGF0YTtcblxuICAgIGxhYmVsUG9zaXRpb25zLmZvckVhY2goZCA9PiB7XG4gICAgICBkLnBvcyA9IHRoaXMub3V0ZXJBcmMoKS5jZW50cm9pZChkKTtcbiAgICAgIGQucG9zWzBdID0gZmFjdG9yICogdGhpcy5vdXRlclJhZGl1cyAqICh0aGlzLm1pZEFuZ2xlKGQpIDwgTWF0aC5QSSA/IDEgOiAtMSk7XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYmVsUG9zaXRpb25zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY29uc3QgYSA9IGxhYmVsUG9zaXRpb25zW2ldO1xuICAgICAgaWYgKCF0aGlzLmxhYmVsVmlzaWJsZShhKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgbGFiZWxQb3NpdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYiA9IGxhYmVsUG9zaXRpb25zW2pdO1xuICAgICAgICBpZiAoIXRoaXMubGFiZWxWaXNpYmxlKGIpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhleSdyZSBvbiB0aGUgc2FtZSBzaWRlXG4gICAgICAgIGlmIChiLnBvc1swXSAqIGEucG9zWzBdID4gMCkge1xuICAgICAgICAgIC8vIGlmIHRoZXkncmUgb3ZlcmxhcHBpbmdcbiAgICAgICAgICBjb25zdCBvID0gbWluRGlzdGFuY2UgLSBNYXRoLmFicyhiLnBvc1sxXSAtIGEucG9zWzFdKTtcbiAgICAgICAgICBpZiAobyA+IDApIHtcbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlY29uZCB1cCBvciBkb3duXG4gICAgICAgICAgICBiLnBvc1sxXSArPSBNYXRoLnNpZ24oYi5wb3NbMF0pICogbztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWxQb3NpdGlvbnM7XG4gIH1cblxuICBsYWJlbFZpc2libGUobXlBcmMpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93TGFiZWxzICYmIG15QXJjLmVuZEFuZ2xlIC0gbXlBcmMuc3RhcnRBbmdsZSA+IE1hdGguUEkgLyAzMDtcbiAgfVxuXG4gIGdldFRvb2x0aXBUaXRsZShhKSB7XG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdGhpcy50b29sdGlwVGV4dChhKTtcbiAgfVxuXG4gIGxhYmVsVGV4dChteUFyYyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubGFiZWxGb3JtYXR0aW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYWJlbEZvcm1hdHRpbmcobXlBcmMuZGF0YS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGFiZWwobXlBcmMpO1xuICB9XG5cbiAgbGFiZWwobXlBcmMpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXRMYWJlbChteUFyYy5kYXRhLm5hbWUpO1xuICB9XG5cbiAgZGVmYXVsdFRvb2x0aXBUZXh0KG15QXJjKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWwobXlBcmMpO1xuICAgIGNvbnN0IHZhbCA9IGZvcm1hdExhYmVsKG15QXJjLmRhdGEudmFsdWUpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7bGFiZWx9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsfTwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgY29sb3IobXlBcmMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbG9ycy5nZXRDb2xvcih0aGlzLmxhYmVsKG15QXJjKSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5kYXRhLm5hbWU7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWUgJiYgZW50cnkuc2VyaWVzID09PSBkLnNlcmllcztcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=