import * as tslib_1 from "tslib";
import { ElementRef, NgZone, ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent as observableFromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { VisibilityObserver } from '../../utils';
let BaseChartComponent = class BaseChartComponent {
    constructor(chartElement, zone, cd) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.scheme = 'cool';
        this.schemeType = 'ordinal';
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngAfterViewInit() {
        this.bindWindowResizeEvent();
        // listen for visibility of the element for hidden by default scenario
        this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
        this.visibilityObserver.visible.subscribe(this.update.bind(this));
    }
    ngOnDestroy() {
        this.unbindEvents();
        if (this.visibilityObserver) {
            this.visibilityObserver.visible.unsubscribe();
            this.visibilityObserver.destroy();
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        else {
            this.results = [];
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            const dims = this.getContainerDims();
            if (dims) {
                this.width = dims.width;
                this.height = dims.height;
            }
        }
        // default values if width or height are 0 or undefined
        if (!this.width) {
            this.width = 600;
        }
        if (!this.height) {
            this.height = 400;
        }
        // tslint:disable-next-line: no-bitwise
        this.width = ~~this.width;
        // tslint:disable-next-line: no-bitwise
        this.height = ~~this.height;
        if (this.cd) {
            this.cd.markForCheck();
        }
    }
    getContainerDims() {
        let width;
        let height;
        const hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode !== null) {
            // Get the container dimensions
            const dims = hostElem.parentNode.getBoundingClientRect();
            width = dims.width;
            height = dims.height;
        }
        if (width && height) {
            return { width, height };
        }
        return null;
    }
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    formatDates() {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.results.length; i++) {
            const g = this.results[i];
            if (g.name instanceof Date) {
                g.name = g.name.toLocaleDateString();
            }
            if (g.series) {
                // tslint:disable-next-line: prefer-for-of
                for (let j = 0; j < g.series.length; j++) {
                    const d = g.series[j];
                    if (d.name instanceof Date) {
                        d.name = d.name.toLocaleDateString();
                    }
                }
            }
        }
    }
    unbindEvents() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    bindWindowResizeEvent() {
        const source = observableFromEvent(window, 'resize');
        const subscription = source.pipe(debounceTime(200)).subscribe(e => {
            this.update();
            if (this.cd) {
                this.cd.markForCheck();
            }
        });
        this.resizeSubscription = subscription;
    }
    /**
     * Clones the data into a new object
     *
     * @private
     * @param {any} data
     * @returns {*}
     *
     * @memberOf BaseChart
     */
    cloneData(data) {
        const results = [];
        for (const item of data) {
            const copy = {
                name: item['name']
            };
            if (item['value'] !== undefined) {
                copy['value'] = item['value'];
            }
            if (item['series'] !== undefined) {
                copy['series'] = [];
                for (const seriesItem of item['series']) {
                    const seriesItemCopy = Object.assign({}, seriesItem);
                    copy['series'].push(seriesItemCopy);
                }
            }
            if (item['extra'] !== undefined) {
                copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
            }
            results.push(copy);
        }
        return results;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BaseChartComponent.prototype, "results", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], BaseChartComponent.prototype, "view", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BaseChartComponent.prototype, "scheme", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BaseChartComponent.prototype, "schemeType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BaseChartComponent.prototype, "customColors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], BaseChartComponent.prototype, "animations", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], BaseChartComponent.prototype, "select", void 0);
BaseChartComponent = tslib_1.__decorate([
    Component({
        selector: 'base-chart',
        template: `<div></div>`
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        NgZone,
        ChangeDetectorRef])
], BaseChartComponent);
export { BaseChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L3N2Zy1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYmFzZS1jaGFydC9iYXNlLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFVBQVUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDdkQsTUFBTSxFQUFFLFlBQVksRUFDckIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsSUFBSSxtQkFBbUIsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTWpELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBZ0I3QixZQUNZLFlBQXdCLEVBQ3hCLElBQVksRUFDWixFQUFxQjtRQUZyQixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFmeEIsV0FBTSxHQUFRLE1BQU0sQ0FBQztRQUNyQixlQUFVLEdBQUcsU0FBUyxDQUFDO1FBRXZCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFXdEMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUksRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDckMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDM0I7U0FDRjtRQUVELHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDbkI7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxNQUFNLENBQUM7UUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVqRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ2hDLCtCQUErQjtZQUMvQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDekQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7UUFFRCxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDbkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUMxQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVc7UUFDVCwwQ0FBMEM7UUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUIsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksRUFBRTtnQkFDMUIsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDdEM7WUFFRCxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osMENBQTBDO2dCQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLEVBQUU7d0JBQzFCLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3FCQUN0QztpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRVMsWUFBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRU8scUJBQXFCO1FBQzNCLE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSyxTQUFTLENBQUMsSUFBSTtRQUNwQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbkIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbkIsQ0FBQztZQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvQjtZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3ZDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUNyQzthQUNGO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUVGLENBQUE7QUFqTFU7SUFBUixLQUFLLEVBQUU7O21EQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7O2dEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOztrREFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7O3NEQUF3QjtBQUN2QjtJQUFSLEtBQUssRUFBRTs7d0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOztzREFBbUI7QUFFakI7SUFBVCxNQUFNLEVBQUU7O2tEQUE2QjtBQVQzQixrQkFBa0I7SUFKOUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLGFBQWE7S0FDeEIsQ0FBQzs2Q0FrQjBCLFVBQVU7UUFDbEIsTUFBTTtRQUNSLGlCQUFpQjtHQW5CdEIsa0JBQWtCLENBbUw5QjtTQW5MWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLCBOZ1pvbmUsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGZyb21FdmVudCBhcyBvYnNlcnZhYmxlRnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFZpc2liaWxpdHlPYnNlcnZlciB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYmFzZS1jaGFydCcsXG4gIHRlbXBsYXRlOiBgPGRpdj48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSByZXN1bHRzOiBhbnk7XG4gIEBJbnB1dCgpIHZpZXc6IG51bWJlcltdO1xuICBASW5wdXQoKSBzY2hlbWU6IGFueSA9ICdjb29sJztcbiAgQElucHV0KCkgc2NoZW1lVHlwZSA9ICdvcmRpbmFsJztcbiAgQElucHV0KCkgY3VzdG9tQ29sb3JzOiBhbnk7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogYW55O1xuICB2aXNpYmlsaXR5T2JzZXJ2ZXI6IFZpc2liaWxpdHlPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2hhcnRFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYmluZFdpbmRvd1Jlc2l6ZUV2ZW50KCk7XG5cbiAgICAvLyBsaXN0ZW4gZm9yIHZpc2liaWxpdHkgb2YgdGhlIGVsZW1lbnQgZm9yIGhpZGRlbiBieSBkZWZhdWx0IHNjZW5hcmlvXG4gICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIgPSBuZXcgVmlzaWJpbGl0eU9ic2VydmVyKHRoaXMuY2hhcnRFbGVtZW50LCB0aGlzLnpvbmUpO1xuICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLnZpc2libGUuc3Vic2NyaWJlKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICBpZiAodGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLnZpc2libGUudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXN1bHRzKSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmNsb25lRGF0YSh0aGlzLnJlc3VsdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSAgW107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlldykge1xuICAgICAgdGhpcy53aWR0aCA9IHRoaXMudmlld1swXTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy52aWV3WzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaW1zID0gdGhpcy5nZXRDb250YWluZXJEaW1zKCk7XG4gICAgICBpZiAoZGltcykge1xuICAgICAgICB0aGlzLndpZHRoID0gZGltcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkaW1zLmhlaWdodDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0IHZhbHVlcyBpZiB3aWR0aCBvciBoZWlnaHQgYXJlIDAgb3IgdW5kZWZpbmVkXG4gICAgaWYgKCF0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gNjAwO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gNDAwO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxuICAgIHRoaXMud2lkdGggPSB+fnRoaXMud2lkdGg7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgdGhpcy5oZWlnaHQgPSB+fnRoaXMuaGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMuY2QpIHtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29udGFpbmVyRGltcygpOiBhbnkge1xuICAgIGxldCB3aWR0aDtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGNvbnN0IGhvc3RFbGVtID0gdGhpcy5jaGFydEVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChob3N0RWxlbS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvbnRhaW5lciBkaW1lbnNpb25zXG4gICAgICBjb25zdCBkaW1zID0gaG9zdEVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHdpZHRoID0gZGltcy53aWR0aDtcbiAgICAgIGhlaWdodCA9IGRpbXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbGwgZGF0ZSBvYmplY3RzIHRoYXQgYXBwZWFyIGFzIG5hbWVcbiAgICogaW50byBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdzXG4gICAqL1xuICBmb3JtYXREYXRlcygpOiB2b2lkIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZyA9IHRoaXMucmVzdWx0c1tpXTtcblxuICAgICAgaWYgKGcubmFtZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgZy5uYW1lID0gZy5uYW1lLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZy5zZXJpZXMpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZy5zZXJpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBkID0gZy5zZXJpZXNbal07XG4gICAgICAgICAgaWYgKGQubmFtZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGQubmFtZSA9IGQubmFtZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdW5iaW5kRXZlbnRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJpbmRXaW5kb3dSZXNpemVFdmVudCgpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2UgPSBvYnNlcnZhYmxlRnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5waXBlKGRlYm91bmNlVGltZSgyMDApKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgaWYgKHRoaXMuY2QpIHtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIGRhdGEgaW50byBhIG5ldyBvYmplY3RcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICogQHJldHVybnMgeyp9XG4gICAqXG4gICAqIEBtZW1iZXJPZiBCYXNlQ2hhcnRcbiAgICovXG4gIHByaXZhdGUgY2xvbmVEYXRhKGRhdGEpOiBhbnkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBkYXRhKSB7XG4gICAgICBjb25zdCBjb3B5ID0ge1xuICAgICAgICBuYW1lOiBpdGVtWyduYW1lJ11cbiAgICAgIH07XG5cbiAgICAgIGlmIChpdGVtWyd2YWx1ZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29weVsndmFsdWUnXSA9IGl0ZW1bJ3ZhbHVlJ107XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWydzZXJpZXMnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvcHlbJ3NlcmllcyddID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc2VyaWVzSXRlbSBvZiBpdGVtWydzZXJpZXMnXSkge1xuICAgICAgICAgIGNvbnN0IHNlcmllc0l0ZW1Db3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgc2VyaWVzSXRlbSk7XG4gICAgICAgICAgY29weVsnc2VyaWVzJ10ucHVzaChzZXJpZXNJdGVtQ29weSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bJ2V4dHJhJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb3B5WydleHRyYSddID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtWydleHRyYSddKSk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaChjb3B5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG59XG4iXX0=