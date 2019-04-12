import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { SplitComponent } from '../component/split.component';
import { getInputBoolean } from '../utils';
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
        this._visible = true;
        this.lockListeners = [];
        this.renderer.addClass(this.elRef.nativeElement, 'as-split-area');
    }
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (v) {
            v = Number(v);
            this._order = !isNaN(v) ? v : null;
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
            v = Number(v);
            this._size = (!isNaN(v) && v >= 0 && v <= 100) ? (v / 100) : null;
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
                this.renderer.removeClass(this.elRef.nativeElement, 'is-hided');
            }
            else {
                this.split.hideArea(this);
                this.renderer.addClass(this.elRef.nativeElement, 'is-hided');
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
                    _this.split.notify('transitionEnd');
                }
            });
        });
    };
    SplitAreaDirective.prototype.setStyleOrder = function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    SplitAreaDirective.prototype.setStyleFlexbasis = function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
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
            if (fct) {
                fct();
            }
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
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], SplitAreaDirective.prototype, "visible", null);
    SplitAreaDirective = tslib_1.__decorate([
        Directive({
            selector: 'as-split-area, [as-split-area]'
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone,
            ElementRef,
            Renderer2,
            SplitComponent])
    ], SplitAreaDirective);
    return SplitAreaDirective;
}());
export { SplitAreaDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRBcmVhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvc3BsaXQtcGFuZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBSzNDO0lBd0RJLDRCQUFvQixNQUFjLEVBQ2YsS0FBaUIsRUFDaEIsUUFBbUIsRUFDbkIsS0FBcUI7UUFIckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQXpEakMsV0FBTSxHQUFrQixJQUFJLENBQUM7UUFhckMsSUFBSTtRQUVJLFVBQUssR0FBa0IsSUFBSSxDQUFDO1FBYXBDLElBQUk7UUFFSSxhQUFRLEdBQVksSUFBSSxDQUFDO1FBc0JoQixrQkFBYSxHQUFvQixFQUFFLENBQUM7UUFNakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQXpEUSxzQkFBSSxxQ0FBSzthQU9sQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBVFEsVUFBVSxDQUFnQjtZQUMvQixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQVVRLHNCQUFJLG9DQUFJO2FBT2pCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFUUSxVQUFTLENBQWdCO1lBQzlCLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQVVRLHNCQUFJLHVDQUFPO2FBYXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFmUSxVQUFZLENBQVU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkMsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNuRTtpQkFDSTtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDaEU7UUFDTCxDQUFDOzs7T0FBQTtJQWtCTSxxQ0FBUSxHQUFmO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQzFCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsVUFBQyxLQUFzQjtnQkFDN0csd0RBQXdEO2dCQUN4RCxJQUFHLEtBQUssQ0FBQyxZQUFZLEtBQUssWUFBWSxFQUFFO29CQUNwQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDBDQUFhLEdBQXBCLFVBQXFCLEtBQWE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSw4Q0FBaUIsR0FBeEIsVUFBeUIsS0FBYTtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVNLHVDQUFVLEdBQWpCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQzFCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFDLENBQVEsSUFBSyxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMsQ0FBRSxDQUFDO1lBQzlHLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFDLENBQVEsSUFBSyxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMsQ0FBRSxDQUFDO1FBQ2hILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHlDQUFZLEdBQW5CO1FBQ0ksT0FBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQyxJQUFHLEdBQUcsRUFBRTtnQkFDSixHQUFHLEVBQUUsQ0FBQzthQUNUO1NBQ0o7SUFDTCxDQUFDO0lBRU0sd0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBeEdRO1FBQVIsS0FBSyxFQUFFOzs7bURBS1A7SUFVUTtRQUFSLEtBQUssRUFBRTs7O2tEQUtQO0lBVVE7UUFBUixLQUFLLEVBQUU7OztxREFXUDtJQTdDUSxrQkFBa0I7UUFIOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdDQUFnQztTQUM3QyxDQUFDO2lEQXlEOEIsTUFBTTtZQUNSLFVBQVU7WUFDTixTQUFTO1lBQ1osY0FBYztPQTNEaEMsa0JBQWtCLENBNkc5QjtJQUFELHlCQUFDO0NBQUEsQUE3R0QsSUE2R0M7U0E3R1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBnZXRJbnB1dEJvb2xlYW4gfSBmcm9tICcuLi91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQtYXJlYSwgW2FzLXNwbGl0LWFyZWFdJ1xufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9vcmRlcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9vcmRlciA9ICFpc05hTih2KSA/IHYgOiBudWxsO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCB0cnVlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZ2V0IG9yZGVyKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgc2l6ZSh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX3NpemUgPSAoIWlzTmFOKHYpICYmIHYgPj0gMCAmJiB2IDw9IDEwMCkgPyAodi8xMDApIDogbnVsbDtcblxuICAgICAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xuICAgIH1cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB2aXNpYmxlKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGdldElucHV0Qm9vbGVhbih2KTtcblxuICAgICAgICBpZih0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0LnNob3dBcmVhKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1oaWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcGxpdC5oaWRlQXJlYSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaXMtaGlkZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIHRyYW5zaXRpb25MaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2NrTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNwbGl0OiBTcGxpdENvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2FzLXNwbGl0LWFyZWEnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXQuYWRkQXJlYSh0aGlzKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCAoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIExpbWl0IG9ubHkgZmxleC1iYXNpcyB0cmFuc2l0aW9uIHRvIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgaWYoZXZlbnQucHJvcGVydHlOYW1lID09PSAnZmxleC1iYXNpcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGxpdC5ub3RpZnkoJ3RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0eWxlT3JkZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ29yZGVyJywgdmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdHlsZUZsZXhiYXNpcyh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9ja0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3NlbGVjdHN0YXJ0JywgKGU6IEV2ZW50KSA9PiBmYWxzZSkgKTtcbiAgICAgICAgICAgIHRoaXMubG9ja0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5sb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB3aGlsZSh0aGlzLmxvY2tMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5sb2NrTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgICAgICAgaWYoZmN0KSB7XG4gICAgICAgICAgICAgICAgZmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5sb2NrRXZlbnRzKCk7XG5cbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwbGl0LnJlbW92ZUFyZWEodGhpcyk7XG4gICAgfVxufVxuIl19