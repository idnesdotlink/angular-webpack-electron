import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { SplitComponent } from '../component/split.component';
import { getInputPositiveNumber, getInputBoolean } from '../utils';
var SplitAreaDirective = /** @class */ (function () {
    function SplitAreaDirective(ngZone, elRef, renderer, split) {
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
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (v) {
            this._order = getInputPositiveNumber(v, null);
            this.split.updateArea(this, true, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            this._size = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSize", {
        get: function () {
            return this._minSize;
        },
        set: function (v) {
            this._minSize = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "maxSize", {
        get: function () {
            return this._maxSize;
        },
        set: function (v) {
            this._maxSize = getInputPositiveNumber(v, null);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "lockSize", {
        get: function () {
            return this._lockSize;
        },
        set: function (v) {
            this._lockSize = getInputBoolean(v);
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (v) {
            this._visible = getInputBoolean(v);
            if (this._visible) {
                this.split.showArea(this);
                this.renderer.removeClass(this.elRef.nativeElement, 'as-hidden');
            }
            else {
                this.split.hideArea(this);
                this.renderer.addClass(this.elRef.nativeElement, 'as-hidden');
            }
        },
        enumerable: true,
        configurable: true
    });
    SplitAreaDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.split.addArea(this);
        this.ngZone.runOutsideAngular(function () {
            _this.transitionListener = _this.renderer.listen(_this.elRef.nativeElement, 'transitionend', function (event) {
                // Limit only flex-basis transition to trigger the event
                if (event.propertyName === 'flex-basis') {
                    _this.split.notify('transitionEnd', -1);
                }
            });
        });
    };
    SplitAreaDirective.prototype.setStyleOrder = function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    SplitAreaDirective.prototype.setStyleFlex = function (grow, shrink, basis, isMin, isMax) {
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
    };
    SplitAreaDirective.prototype.lockEvents = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'selectstart', function (e) { return false; }));
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'dragstart', function (e) { return false; }));
        });
    };
    SplitAreaDirective.prototype.unlockEvents = function () {
        while (this.lockListeners.length > 0) {
            var fct = this.lockListeners.pop();
            if (fct)
                fct();
        }
    };
    SplitAreaDirective.prototype.ngOnDestroy = function () {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
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
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRBcmVhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBTW5FO0lBZ0dFLDRCQUFvQixNQUFjLEVBQ3pCLEtBQWlCLEVBQ2hCLFFBQW1CLEVBQ25CLEtBQXFCO1FBSFgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFqR3ZCLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBWXJDLElBQUk7UUFFSSxVQUFLLEdBQWtCLElBQUksQ0FBQztRQVlwQyxJQUFJO1FBRUksYUFBUSxHQUFrQixJQUFJLENBQUM7UUFZdkMsSUFBSTtRQUVJLGFBQVEsR0FBa0IsSUFBSSxDQUFDO1FBWXZDLElBQUk7UUFFSSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBWW5DLElBQUk7UUFFSSxhQUFRLEdBQVksSUFBSSxDQUFDO1FBc0JoQixrQkFBYSxHQUFvQixFQUFFLENBQUM7UUFNbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQWpHUSxzQkFBSSxxQ0FBSzthQU1sQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO2FBUlEs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RTs7O21EQUlQO0lBVVE7UUFBUixLQUFLLEVBQUU7OztrREFJUDtJQVVRO1FBQVIsS0FBSyxFQUFFOzs7cURBSVA7SUFVUTtRQUFSLEtBQUssRUFBRTs7O3FEQUlQO0lBVVE7UUFBUixLQUFLLEVBQUU7OztzREFJUDtJQVVRO1FBQVIsS0FBSyxFQUFFOzs7cURBV1A7SUFyRlUsa0JBQWtCO1FBSjlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQ0FBZ0M7WUFDMUMsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQztpREFpRzRCLE1BQU07WUFDbEIsVUFBVTtZQUNOLFNBQVM7WUFDWixjQUFjO09BbkdwQixrQkFBa0IsQ0E0SjlCO0lBQUQseUJBQUM7Q0FBQSxBQTVKRCxJQTRKQztTQTVKWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE9uSW5pdCwgT25EZXN0cm95LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3BsaXRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50JztcbmltcG9ydCB7IGdldElucHV0UG9zaXRpdmVOdW1iZXIsIGdldElucHV0Qm9vbGVhbiB9IGZyb20gJy4uL3V0aWxzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYXMtc3BsaXQtYXJlYSwgW2FzLXNwbGl0LWFyZWFdJyxcbiAgZXhwb3J0QXM6ICdhc1NwbGl0QXJlYSdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX29yZGVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX29yZGVyID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCBudWxsKTtcblxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZXQgb3JkZXIoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX29yZGVyO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX3NpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNldCBzaXplKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLl9zaXplID0gZ2V0SW5wdXRQb3NpdGl2ZU51bWJlcih2LCBudWxsKTtcblxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIC8vLy9cblxuICBwcml2YXRlIF9taW5TaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBzZXQgbWluU2l6ZSh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluU2l6ZSA9IGdldElucHV0UG9zaXRpdmVOdW1iZXIodiwgbnVsbCk7XG5cbiAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgZ2V0IG1pblNpemUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21pblNpemU7XG4gIH1cblxuICAvLy8vXG5cbiAgcHJpdmF0ZSBfbWF4U2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KCkgc2V0IG1heFNpemUodjogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX21heFNpemUgPSBnZXRJbnB1dFBvc2l0aXZlTnVtYmVyKHYsIG51bGwpO1xuXG4gICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIGdldCBtYXhTaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9tYXhTaXplO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX2xvY2tTaXplOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IGxvY2tTaXplKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9sb2NrU2l6ZSA9IGdldElucHV0Qm9vbGVhbih2KTtcblxuICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICBnZXQgbG9ja1NpemUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2tTaXplO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNldCB2aXNpYmxlKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92aXNpYmxlID0gZ2V0SW5wdXRCb29sZWFuKHYpO1xuXG4gICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgIHRoaXMuc3BsaXQuc2hvd0FyZWEodGhpcyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLWhpZGRlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc3BsaXQuaGlkZUFyZWEodGhpcyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLWhpZGRlbicpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICB9XG5cbiAgLy8vL1xuXG4gIHByaXZhdGUgdHJhbnNpdGlvbkxpc3RlbmVyPzogRnVuY3Rpb247XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9ja0xpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgc3BsaXQ6IFNwbGl0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdhcy1zcGxpdC1hcmVhJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zcGxpdC5hZGRBcmVhKHRoaXMpO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgLy8gTGltaXQgb25seSBmbGV4LWJhc2lzIHRyYW5zaXRpb24gdG8gdHJpZ2dlciB0aGUgZXZlbnRcbiAgICAgICAgaWYgKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ2ZsZXgtYmFzaXMnKSB7XG4gICAgICAgICAgdGhpcy5zcGxpdC5ub3RpZnkoJ3RyYW5zaXRpb25FbmQnLCAtMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldFN0eWxlT3JkZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3JkZXInLCB2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0U3R5bGVGbGV4KGdyb3c6IG51bWJlciwgc2hyaW5rOiBudW1iZXIsIGJhc2lzOiBzdHJpbmcsIGlzTWluOiBib29sZWFuLCBpc01heDogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIE5lZWQgMyBzZXBhcmF0ZWQgcHJvcGVydGllcyB0byB3b3JrIG9uIElFMTEgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2ZsZXgtbGF5b3V0L2lzc3Vlcy8zMjMpXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWdyb3cnLCBncm93KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtc2hyaW5rJywgc2hyaW5rKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtYmFzaXMnLCBiYXNpcyk7XG5cbiAgICBpZiAoaXNNaW4gPT09IHRydWUpIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYXMtbWluJyk7XG4gICAgZWxzZSB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLW1pbicpO1xuXG4gICAgaWYgKGlzTWF4ID09PSB0cnVlKSB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLW1heCcpO1xuICAgIGVsc2UgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdhcy1tYXgnKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubG9ja0xpc3RlbmVycy5wdXNoKHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3NlbGVjdHN0YXJ0JywgKGU6IEV2ZW50KSA9PiBmYWxzZSkpO1xuICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZHJhZ3N0YXJ0JywgKGU6IEV2ZW50KSA9PiBmYWxzZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVubG9ja0V2ZW50cygpOiB2b2lkIHtcbiAgICB3aGlsZSAodGhpcy5sb2NrTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZjdCA9IHRoaXMubG9ja0xpc3RlbmVycy5wb3AoKTtcbiAgICAgIGlmIChmY3QpIGZjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVubG9ja0V2ZW50cygpO1xuXG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHRoaXMuc3BsaXQucmVtb3ZlQXJlYSh0aGlzKTtcbiAgfVxufVxuIl19