import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { SplitComponent } from '../component/split.component';
import { getInputPositiveNumber, getInputBoolean } from '../utils';
let SplitAreaDirective = class SplitAreaDirective {
    constructor(ngZone, elRef, renderer, split) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        ////
        this._size = null;
        ////
        this._minSize = null;
        ////
        this._maxSize = null;
        ////
        this._lockSize = false;
        ////
        this._visible = true;
        this.lockListeners = [];
        this.renderer.addClass(this.elRef.nativeElement, 'as-split-area');
    }
    set order(v) {
        this._order = getInputPositiveNumber(v, null);
        this.split.updateArea(this, true, false);
    }
    get order() {
        return this._order;
    }
    set size(v) {
        this._size = getInputPositiveNumber(v, null);
        this.split.updateArea(this, false, true);
    }
    get size() {
        return this._size;
    }
    set minSize(v) {
        this._minSize = getInputPositiveNumber(v, null);
        this.split.updateArea(this, false, true);
    }
    get minSize() {
        return this._minSize;
    }
    set maxSize(v) {
        this._maxSize = getInputPositiveNumber(v, null);
        this.split.updateArea(this, false, true);
    }
    get maxSize() {
        return this._maxSize;
    }
    set lockSize(v) {
        this._lockSize = getInputBoolean(v);
        this.split.updateArea(this, false, true);
    }
    get lockSize() {
        return this._lockSize;
    }
    set visible(v) {
        this._visible = getInputBoolean(v);
        if (this._visible) {
            this.split.showArea(this);
            this.renderer.removeClass(this.elRef.nativeElement, 'as-hidden');
        }
        else {
            this.split.hideArea(this);
            this.renderer.addClass(this.elRef.nativeElement, 'as-hidden');
        }
    }
    get visible() {
        return this._visible;
    }
    ngOnInit() {
        this.split.addArea(this);
        this.ngZone.runOutsideAngular(() => {
            this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (event) => {
                // Limit only flex-basis transition to trigger the event
                if (event.propertyName === 'flex-basis') {
                    this.split.notify('transitionEnd', -1);
                }
            });
        });
    }
    setStyleOrder(value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    setStyleFlex(grow, shrink, basis, isMin, isMax) {
        // Need 3 separated properties to work on IE11 (https://github.com/angular/flex-layout/issues/323)
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', grow);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', shrink);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', basis);
        if (isMin === true)
            this.renderer.addClass(this.elRef.nativeElement, 'as-min');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'as-min');
        if (isMax === true)
            this.renderer.addClass(this.elRef.nativeElement, 'as-max');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'as-max');
    }
    lockEvents() {
        this.ngZone.runOutsideAngular(() => {
            this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'selectstart', (e) => false));
            this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'dragstart', (e) => false));
        });
    }
    unlockEvents() {
        while (this.lockListeners.length > 0) {
            const fct = this.lockListeners.pop();
            if (fct)
                fct();
        }
    }
    ngOnDestroy() {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "order", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "size", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "minSize", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "maxSize", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], SplitAreaDirective.prototype, "lockSize", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], SplitAreaDirective.prototype, "visible", null);
SplitAreaDirective = tslib_1.__decorate([
    Directive({
        selector: 'as-split-area, [as-split-area]',
        exportAs: 'asSplitArea'
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone,
        ElementRef,
        Renderer2,
        SplitComponent])
], SplitAreaDirective);
export { SplitAreaDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRBcmVhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBTW5FLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBZ0c3QixZQUFvQixNQUFjLEVBQ3pCLEtBQWlCLEVBQ2hCLFFBQW1CLEVBQ25CLEtBQXFCO1FBSFgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFqR3ZCLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBWXJDLElBQUk7UUFFSSxVQUFLLEdBQWtCLElBQUksQ0FBQztRQVlwQyxJQUFJO1FBRUksYUFBUSxHQUFrQixJQUFJLENBQUM7UUFZdkMsSUFBSTtRQUVJLGFBQVEsR0FBa0IsSUFBSSxDQUFDO1FBWXZDLElBQUk7UUFFSSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBWW5DLElBQUk7UUFFSSxhQUFRLEdBQVksSUFBSSxDQUFDO1FBc0JoQixrQkFBYSxHQUFvQixFQUFFLENBQUM7UUFNbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQWpHUSxJQUFJLEtBQUssQ0FBQyxDQUFnQjtRQUNqQyxJQUFJLENB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QVVRO0lBQVIsS0FBSyxFQUFFOzs7aURBSVA7QUFVUTtJQUFSLEtBQUssRUFBRTs7O2lEQUlQO0FBVVE7SUFBUixLQUFLLEVBQUU7OztrREFJUDtBQVVRO0lBQVIsS0FBSyxFQUFFOzs7aURBV1A7QUFyRlUsa0JBQWtCO0lBSjlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQ0FBZ0M7UUFDMUMsUUFBUSxFQUFFLGFBQWE7S0FDeEIsQ0FBQzs2Q0FpRzRCLE1BQU07UUFDbEIsVUFBVTtRQUNOLFNBQVM7UUFDWixjQUFjO0dBbkdwQixrQkFBa0IsQ0E0SjlCO1NBNUpZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTcGxpdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ2V0SW5wdXRQb3NpdGl2ZU51bWJlciwgZ2V0SW5wdXRCb29sZWFuIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhcy1zcGxpdC1hcmVhLCBbYXMtc3BsaXQtYXJlYV0nLFxuICBleHBvcnRBczogJ2FzU3BsaXRBcmVhJ1xufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNldCBvcmRlcih2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5fb3JkZXIgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIG51bGwpO1xuXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIHRydWUsIGZhbHNlKTtcbiAgfVxuXG4gIGdldCBvcmRlcigpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KCkgc2V0IHNpemUodjogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX3NpemUgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIG51bGwpO1xuXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX21pblNpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNldCBtaW5TaXplKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLl9taW5TaXplID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCBudWxsKTtcblxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICBnZXQgbWluU2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluU2l6ZTtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9tYXhTaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBzZXQgbWF4U2l6ZSh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4U2l6ZSA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgbnVsbCk7XG5cbiAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgZ2V0IG1heFNpemUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21heFNpemU7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfbG9ja1NpemU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZXQgbG9ja1NpemUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2xvY2tTaXplID0gZ2V0SW5wdXRCb29sZWFuKHYpO1xuXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIGdldCBsb2NrU2l6ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9ja1NpemU7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgc2V0IHZpc2libGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3Zpc2libGUgPSBnZXRJbnB1dEJvb2xlYW4odik7XG5cbiAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgdGhpcy5zcGxpdC5zaG93QXJlYSh0aGlzKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtaGlkZGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zcGxpdC5oaWRlQXJlYSh0aGlzKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtaGlkZGVuJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSB0cmFuc2l0aW9uTGlzdGVuZXI/OiBGdW5jdGlvbjtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2NrTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBzcGxpdDogU3BsaXRDb21wb25lbnQpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLXNwbGl0LWFyZWEnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNwbGl0LmFkZEFyZWEodGhpcyk7XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCAoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkgPT4ge1xuICAgICAgICAvLyBMaW1pdCBvbmx5IGZsZXgtYmFzaXMgdHJhbnNpdGlvbiB0byB0cmlnZ2VyIHRoZSBldmVudFxuICAgICAgICBpZiAoZXZlbnQucHJvcGVydHlOYW1lID09PSAnZmxleC1iYXNpcycpIHtcbiAgICAgICAgICB0aGlzLnNwbGl0Lm5vdGlmeSgndHJhbnNpdGlvbkVuZCcsIC0xKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0U3R5bGVPcmRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdHlsZUZsZXgoZ3JvdzogbnVtYmVyLCBzaHJpbms6IG51bWJlciwgYmFzaXM6IHN0cmluZywgaXNNaW46IGJvb2xlYW4sIGlzTWF4OiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gTmVlZCAzIHNlcGFyYXRlZCBwcm9wZXJ0aWVzIHRvIHdvcmsgb24gSUUxMSAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvZmxleC1sYXlvdXQvaXNzdWVzLzMyMylcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtZ3JvdycsIGdyb3cpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1zaHJpbmsnLCBzaHJpbmspO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIGJhc2lzKTtcblxuICAgIGlmIChpc01pbiA9PT0gdHJ1ZSkgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdhcy1taW4nKTtcbiAgICBlbHNlIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtbWluJyk7XG5cbiAgICBpZiAoaXNNYXggPT09IHRydWUpIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtbWF4Jyk7XG4gICAgZWxzZSB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLW1heCcpO1xuICB9XG5cbiAgcHVibGljIGxvY2tFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSk7XG4gICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdW5sb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgIHdoaWxlICh0aGlzLmxvY2tMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmN0ID0gdGhpcy5sb2NrTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgaWYgKGZjdCkgZmN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5sb2NrRXZlbnRzKCk7XG5cbiAgICBpZiAodGhpcy50cmFuc2l0aW9uTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zcGxpdC5yZW1vdmVBcmVhKHRoaXMpO1xuICB9XG59XG4iXX0=