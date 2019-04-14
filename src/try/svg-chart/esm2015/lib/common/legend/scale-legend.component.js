import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let ScaleLegendComponent = class ScaleLegendComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = (this.horizontal) ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to ${direction}, ${gradientValues})`);
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScaleLegendComponent.prototype, "valueRange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScaleLegendComponent.prototype, "colors", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScaleLegendComponent.prototype, "height", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScaleLegendComponent.prototype, "width", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScaleLegendComponent.prototype, "horizontal", void 0);
ScaleLegendComponent = tslib_1.__decorate([
    Component({
        selector: 'ng-svg-charts-scale-legend',
        template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width">
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div
        class="scale-legend-wrap"
        [style.background]="gradient">
      </div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;-webkit-box-flex:1;-ms-flex:1;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [DomSanitizer])
], ScaleLegendComponent);
export { ScaleLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3ZnLWNoYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUN2RixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUEwQnpELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBVS9CLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFKbEMsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUltQixDQUFDO0lBRWhELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsc0JBQXNCLFNBQVMsS0FBSyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUMzQixlQUFlO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FFRixDQUFBO0FBakNVO0lBQVIsS0FBSyxFQUFFOzt3REFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOztvREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOztvREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzttREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzt3REFBb0I7QUFOakIsb0JBQW9CO0lBeEJoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7UUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQzs2Q0FXK0IsWUFBWTtHQVZoQyxvQkFBb0IsQ0FtQ2hDO1NBbkNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXN2Zy1jaGFydHMtc2NhbGUtbGVnZW5kJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInNjYWxlLWxlZ2VuZFwiXG4gICAgICBbY2xhc3MuaG9yaXpvbnRhbC1sZWdlbmRdPVwiaG9yaXpvbnRhbFwiXG4gICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvcml6b250YWwgPyB1bmRlZmluZWQgOiBoZWlnaHRcIlxuICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLWxhYmVsXCI+XG4gICAgICAgIDxzcGFuPnt7IHZhbHVlUmFuZ2VbMV0udG9Mb2NhbGVTdHJpbmcoKSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInNjYWxlLWxlZ2VuZC13cmFwXCJcbiAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwiZ3JhZGllbnRcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzBdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vc2NhbGUtbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNjYWxlTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSB2YWx1ZVJhbmdlO1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIGhlaWdodDtcbiAgQElucHV0KCkgd2lkdGg7XG4gIEBJbnB1dCgpIGhvcml6b250YWwgPSBmYWxzZTtcblxuICBncmFkaWVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBncmFkaWVudFZhbHVlcyA9IHRoaXMuZ3JhZGllbnRTdHJpbmcodGhpcy5jb2xvcnMucmFuZ2UoKSwgdGhpcy5jb2xvcnMuZG9tYWluKCkpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9ICh0aGlzLmhvcml6b250YWwpID8gJ3JpZ2h0JyA6ICdib3R0b20nO1xuICAgIHRoaXMuZ3JhZGllbnQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYGxpbmVhci1ncmFkaWVudCh0byAke2RpcmVjdGlvbn0sICR7Z3JhZGllbnRWYWx1ZXN9KWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgc3RyaW5nIHVzZWQgaW4gdGhlIGdyYWRpZW50IHN0eWxlc2hlZXQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0gIHthcnJheX0gY29sb3JzIGFycmF5IG9mIGNvbG9yc1xuICAgKiBAcGFyYW0gIHthcnJheX0gc3BsaXRzIGFycmF5IG9mIHNwbGl0cyBvbiBhIHNjYWxlIG9mICgwLCAxKVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBncmFkaWVudFN0cmluZyhjb2xvcnMsIHNwbGl0cyk6IHN0cmluZyB7XG4gICAgLy8gYWRkIHRoZSAxMDAlXG4gICAgc3BsaXRzLnB1c2goMSk7XG4gICAgY29uc3QgcGFpcnMgPSBbXTtcbiAgICBjb2xvcnMucmV2ZXJzZSgpLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgIHBhaXJzLnB1c2goYCR7Y30gJHtNYXRoLnJvdW5kKHNwbGl0c1tpXSAqIDEwMCl9JWApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhaXJzLmpvaW4oJywgJyk7XG4gIH1cblxufVxuIl19