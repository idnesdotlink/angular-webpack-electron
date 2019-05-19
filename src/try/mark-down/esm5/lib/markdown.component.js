import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { PrismPlugin } from './prism-plugin';
var MarkdownComponent = /** @class */ (function () {
    function MarkdownComponent(element, markdownService) {
        this.element = element;
        this.markdownService = markdownService;
        this.error = new EventEmitter();
        this.load = new EventEmitter();
        this._lineHighlight = false;
        this._lineNumbers = false;
    }
    Object.defineProperty(MarkdownComponent.prototype, "lineNumbers", {
        // Plugin - lineNumbers
        get: function () { return this._lineNumbers; },
        set: function (value) { this._lineNumbers = this.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownComponent.prototype, "lineHighlight", {
        // Plugin - lineHighlight
        get: function () { return this._lineHighlight; },
        set: function (value) { this._lineHighlight = this.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    MarkdownComponent.prototype.ngOnChanges = function () {
        if (this.data) {
            this.handleData();
            return;
        }
        if (this.src) {
            this.handleSrc();
            return;
        }
    };
    MarkdownComponent.prototype.ngAfterViewInit = function () {
        if (!this.data && !this.src) {
            this.handleTransclusion();
        }
    };
    MarkdownComponent.prototype.render = function (markdown, decodeHtml) {
        if (decodeHtml === void 0) { decodeHtml = false; }
        this.element.nativeElement.innerHTML = this.markdownService.compile(markdown, decodeHtml);
        this.handlePlugins();
        this.markdownService.highlight(this.element.nativeElement);
    };
    MarkdownComponent.prototype.coerceBooleanProperty = function (value) {
        return value != null && "" + value !== 'false';
    };
    MarkdownComponent.prototype.handleData = function () {
        this.render(this.data);
    };
    MarkdownComponent.prototype.handleSrc = function () {
        var _this = this;
        this.markdownService
            .getSource(this.src)
            .subscribe(function (markdown) {
            _this.render(markdown);
            _this.load.emit(markdown);
        }, function (error) { return _this.error.emit(error); });
    };
    MarkdownComponent.prototype.handleTransclusion = function () {
        this.render(this.element.nativeElement.innerHTML, true);
    };
    MarkdownComponent.prototype.handlePlugins = function () {
        if (this.lineHighlight) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.LineHighlight);
            this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
        }
        if (this.lineNumbers) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
            this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
        }
    };
    MarkdownComponent.prototype.setPluginClass = function (element, plugin) {
        var _a;
        var preElements = element.querySelectorAll('pre');
        for (var i = 0; i < preElements.length; i++) {
            var classes = plugin instanceof Array ? plugin : [plugin];
            (_a = preElements.item(i).classList).add.apply(_a, tslib_1.__spread(classes));
        }
    };
    MarkdownComponent.prototype.setPluginOptions = function (element, options) {
        var _this = this;
        var preElements = element.querySelectorAll('pre');
        var _loop_1 = function (i) {
            Object.keys(options).forEach(function (option) {
                var attributeValue = options[option];
                if (!!attributeValue) {
                    var attributeName = _this.toLispCase(option);
                    preElements.item(i).setAttribute(attributeName, attributeValue.toString());
                }
            });
        };
        for (var i = 0; i < preElements.length; i++) {
            _loop_1(i);
        }
    };
    MarkdownComponent.prototype.toLispCase = function (value) {
        var upperChars = value.match(/([A-Z])/g);
        if (!upperChars) {
            return value;
        }
        var str = value.toString();
        for (var i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
        }
        if (str.slice(0, 1) === '-') {
            str = str.slice(1);
        }
        return str;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MarkdownComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MarkdownComponent.prototype, "src", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], MarkdownComponent.prototype, "lineNumbers", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], MarkdownComponent.prototype, "start", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], MarkdownComponent.prototype, "lineHighlight", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], MarkdownComponent.prototype, "line", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], MarkdownComponent.prototype, "lineOffset", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarkdownComponent.prototype, "error", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarkdownComponent.prototype, "load", void 0);
    MarkdownComponent = tslib_1.__decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: 'markdown, [markdown]',
            template: '<ng-content></ng-content>'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            MarkdownService])
    ], MarkdownComponent);
    return MarkdownComponent;
}());
export { MarkdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9tYXJrLWRvd24vIiwic291cmNlcyI6WyJsaWIvbWFya2Rvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0csT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU83QztJQXVCRSwyQkFDUyxPQUFnQyxFQUNoQyxlQUFnQztRQURoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFSL0IsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFLekIsQ0FBQztJQXBCTCxzQkFBSSwwQ0FBVztRQUZmLHVCQUF1QjthQUV2QixjQUE2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ3hELFVBQWdCLEtBQWMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQURsQztJQU14RCxzQkFBSSw0Q0FBYTtRQUZqQix5QkFBeUI7YUFFekIsY0FBK0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUM1RCxVQUFrQixLQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEbEM7SUFnQjVELHVDQUFX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b250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7IFByaXNtUGx1Z2luIH0gZnJvbSAnLi9wcmlzbS1wbHVnaW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ21hcmtkb3duLCBbbWFya2Rvd25dJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBkYXRhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nO1xuXG4gIC8vIFBsdWdpbiAtIGxpbmVOdW1iZXJzXG4gIEBJbnB1dCgpXG4gIGdldCBsaW5lTnVtYmVycygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2xpbmVOdW1iZXJzOyB9XG4gIHNldCBsaW5lTnVtYmVycyh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9saW5lTnVtYmVycyA9IHRoaXMuY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBASW5wdXQoKSBzdGFydDogbnVtYmVyO1xuXG4gIC8vIFBsdWdpbiAtIGxpbmVIaWdobGlnaHRcbiAgQElucHV0KClcbiAgZ2V0IGxpbmVIaWdobGlnaHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9saW5lSGlnaGxpZ2h0OyB9XG4gIHNldCBsaW5lSGlnaGxpZ2h0KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2xpbmVIaWdobGlnaHQgPSB0aGlzLmNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgQElucHV0KCkgbGluZTogc3RyaW5nIHwgc3RyaW5nW107XG4gIEBJbnB1dCgpIGxpbmVPZmZzZXQ6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwcml2YXRlIF9saW5lSGlnaGxpZ2h0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2xpbmVOdW1iZXJzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHB1YmxpYyBtYXJrZG93blNlcnZpY2U6IE1hcmtkb3duU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLmhhbmRsZURhdGEoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICB0aGlzLmhhbmRsZVNyYygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSAmJiAhdGhpcy5zcmMpIHtcbiAgICAgIHRoaXMuaGFuZGxlVHJhbnNjbHVzaW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKG1hcmtkb3duOiBzdHJpbmcsIGRlY29kZUh0bWwgPSBmYWxzZSkge1xuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmNvbXBpbGUobWFya2Rvd24sIGRlY29kZUh0bWwpO1xuICAgIHRoaXMuaGFuZGxlUGx1Z2lucygpO1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlLmhpZ2hsaWdodCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGAke3ZhbHVlfWAgIT09ICdmYWxzZSc7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZURhdGEoKSB7XG4gICAgdGhpcy5yZW5kZXIodGhpcy5kYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU3JjKCkge1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlXG4gICAgICAuZ2V0U291cmNlKHRoaXMuc3JjKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgbWFya2Rvd24gPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyKG1hcmtkb3duKTtcbiAgICAgICAgICB0aGlzLmxvYWQuZW1pdChtYXJrZG93bik7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvciksXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVUcmFuc2NsdXNpb24oKSB7XG4gICAgdGhpcy5yZW5kZXIodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUGx1Z2lucygpIHtcbiAgICBpZiAodGhpcy5saW5lSGlnaGxpZ2h0KSB7XG4gICAgICB0aGlzLnNldFBsdWdpbkNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBQcmlzbVBsdWdpbi5MaW5lSGlnaGxpZ2h0KTtcbiAgICAgIHRoaXMuc2V0UGx1Z2luT3B0aW9ucyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgeyBkYXRhTGluZTogdGhpcy5saW5lLCBkYXRhTGluZU9mZnNldDogdGhpcy5saW5lT2Zmc2V0IH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5saW5lTnVtYmVycykge1xuICAgICAgdGhpcy5zZXRQbHVnaW5DbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgUHJpc21QbHVnaW4uTGluZU51bWJlcnMpO1xuICAgICAgdGhpcy5zZXRQbHVnaW5PcHRpb25zKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB7IGRhdGFTdGFydDogdGhpcy5zdGFydCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBsdWdpbkNsYXNzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbHVnaW46IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgcHJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBwbHVnaW4gaW5zdGFuY2VvZiBBcnJheSA/IHBsdWdpbiA6IFtwbHVnaW5dO1xuICAgICAgcHJlRWxlbWVudHMuaXRlbShpKS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UGx1Z2luT3B0aW9ucyhlbGVtZW50OiBIVE1MRWxlbWVudCwgb3B0aW9uczogb2JqZWN0KSB7XG4gICAgY29uc3QgcHJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIGlmICghIWF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHRoaXMudG9MaXNwQ2FzZShvcHRpb24pO1xuICAgICAgICAgIHByZUVsZW1lbnRzLml0ZW0oaSkuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvTGlzcENhc2UodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHVwcGVyQ2hhcnMgPSB2YWx1ZS5tYXRjaCgvKFtBLVpdKS9nKTtcbiAgICBpZiAoIXVwcGVyQ2hhcnMpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IHN0ciA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSB1cHBlckNoYXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cCh1cHBlckNoYXJzW2ldKSwgJy0nICsgdXBwZXJDaGFyc1tpXS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gICAgaWYgKHN0ci5zbGljZSgwLCAxKSA9PT0gJy0nKSB7XG4gICAgICBzdHIgPSBzdHIuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiJdfQ==