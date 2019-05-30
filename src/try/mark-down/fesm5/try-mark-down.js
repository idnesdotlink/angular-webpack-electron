import { __decorate, __extends, __param, __metadata, __spread } from 'tslib';
import { Pipe, SecurityContext, Injectable, Inject, PLATFORM_ID, Optional, Input, Output, Component, ElementRef, EventEmitter, NgZone, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer, parse } from 'marked';
import { map, first } from 'rxjs/operators';

var LanguagePipe = /** @class */ (function () {
    function LanguagePipe() {
    }
    LanguagePipe.prototype.transform = function (value, language) {
        if (typeof value !== 'string') {
            console.error("LanguagePipe has been invoked with an invalid value type [" + value + "]");
            return value;
        }
        if (typeof language !== 'string') {
            console.error("LanguagePipe has been invoked with an invalid parameter [" + language + "]");
            return value;
        }
        return '```' + language + '\n' + value + '\n```';
    };
    LanguagePipe = __decorate([
        Pipe({
            name: 'language',
        })
    ], LanguagePipe);
    return LanguagePipe;
}());

var MarkedOptions = /** @class */ (function () {
    function MarkedOptions() {
    }
    return MarkedOptions;
}());

var MarkedRenderer = /** @class */ (function (_super) {
    __extends(MarkedRenderer, _super);
    function MarkedRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MarkedRenderer;
}(Renderer));

// tslint:disable-next-line:max-line-length
var errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
var MarkdownService = /** @class */ (function () {
    function MarkdownService(platform, http, domSanitizer, options) {
        this.platform = platform;
        this.http = http;
        this.domSanitizer = domSanitizer;
        this.options = options;
    }
    Object.defineProperty(MarkdownService.prototype, "options", {
        get: function () { return this._options; },
        set: function (value) {
            this._options = Object.assign({}, { renderer: new MarkedRenderer() }, this._options, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownService.prototype, "renderer", {
        get: function () { return this.options.renderer; },
        set: function (value) {
            this.options.renderer = value;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownService.prototype.compile = function (markdown, decodeHtml, markedOptions) {
        if (decodeHtml === void 0) { decodeHtml = false; }
        if (markedOptions === void 0) { markedOptions = this.options; }
        var precompiled = this.precompile(markdown);
        var compiled = parse(decodeHtml ? this.decodeHtml(precompiled) : precompiled, markedOptions);
        return markedOptions.sanitize && !markedOptions.sanitizer
            ? this.domSanitizer.sanitize(SecurityContext.HTML, compiled)
            : compiled;
    };
    MarkdownService.prototype.getSource = function (src) {
        var _this = this;
        if (!this.http) {
            throw new Error(errorSrcWithoutHttpClient);
        }
        return this.http
            .get(src, { responseType: 'text' })
            .pipe(map(function (markdown) { return _this.handleExtension(src, markdown); }));
    };
    MarkdownService.prototype.highlight = function (element) {
        if (isPlatformBrowser(this.platform) && typeof Prism !== 'undefined') {
            if (!element) {
                element = document;
            }
            element
                .querySelectorAll('pre code:not([class*="language-"])')
                .forEach(function (x) { return x.classList.add('language-none'); });
            Prism.highlightAllUnder(element);
        }
    };
    MarkdownService.prototype.decodeHtml = function (html) {
        if (isPlatformBrowser(this.platform)) {
            var textarea = document.createElement('textarea');
            textarea.innerHTML = html;
            return textarea.value;
        }
        return html;
    };
    MarkdownService.prototype.handleExtension = function (src, markdown) {
        var extension = src
            ? src.split('?')[0].split('.').splice(-1).join()
            : null;
        return extension !== 'md'
            ? '```' + extension + '\n' + markdown + '\n```'
            : markdown;
    };
    MarkdownService.prototype.precompile = function (markdown) {
        if (!markdown) {
            return '';
        }
        var indentStart;
        return markdown
            .split('\n')
            .map(function (line) {
            // set current line ident start to base reference indentation
            var lineIdentStart = indentStart;
            // find position of 1st non-whitespace character
            // to determine the current line indentation start
            if (line.length > 0) {
                lineIdentStart = isNaN(lineIdentStart)
                    ? line.search(/\S|$/)
                    : Math.min(line.search(/\S|$/), lineIdentStart);
            }
            // keep 1st non-whitespace line indentation
            // as base reference for other lines
            if (isNaN(indentStart)) {
                indentStart = lineIdentStart;
            }
            // remove whitespaces before current line indentation
            return !!lineIdentStart
                ? line.substring(lineIdentStart)
                : line;
        }).join('\n');
    };
    MarkdownService = __decorate([
        Injectable(),
        __param(0, Inject(PLATFORM_ID)),
        __param(1, Optional()),
        __metadata("design:paramtypes", [Object,
            HttpClient,
            DomSanitizer,
            MarkedOptions])
    ], MarkdownService);
    return MarkdownService;
}());

var PrismPlugin;
(function (PrismPlugin) {
    PrismPlugin["LineHighlight"] = "line-highlight";
    PrismPlugin["LineNumbers"] = "line-numbers";
})(PrismPlugin || (PrismPlugin = {}));

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
            (_a = preElements.item(i).classList).add.apply(_a, __spread(classes));
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MarkdownComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MarkdownComponent.prototype, "src", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MarkdownComponent.prototype, "lineNumbers", null);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MarkdownComponent.prototype, "start", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MarkdownComponent.prototype, "lineHighlight", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MarkdownComponent.prototype, "line", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MarkdownComponent.prototype, "lineOffset", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MarkdownComponent.prototype, "error", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MarkdownComponent.prototype, "load", void 0);
    MarkdownComponent = __decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: 'markdown, [markdown]',
            template: '<ng-content></ng-content>'
        }),
        __metadata("design:paramtypes", [ElementRef,
            MarkdownService])
    ], MarkdownComponent);
    return MarkdownComponent;
}());

var MarkdownPipe = /** @class */ (function () {
    function MarkdownPipe(elementRef, markdownService, zone) {
        this.elementRef = elementRef;
        this.markdownService = markdownService;
        this.zone = zone;
    }
    MarkdownPipe.prototype.transform = function (value) {
        var _this = this;
        if (value == null) {
            return '';
        }
        if (typeof value !== 'string') {
            console.error("MarkdownPipe has been invoked with an invalid value type [" + value + "]");
            return value;
        }
        var markdown = this.markdownService.compile(value);
        this.zone.onStable
            .pipe(first())
            .subscribe(function () { return _this.markdownService.highlight(_this.elementRef.nativeElement); });
        return markdown;
    };
    MarkdownPipe = __decorate([
        Pipe({
            name: 'markdown',
        }),
        __metadata("design:paramtypes", [ElementRef,
            MarkdownService,
            NgZone])
    ], MarkdownPipe);
    return MarkdownPipe;
}());

var ɵ0 = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
};
var initialMarkedOptions = {
    provide: MarkedOptions,
    useValue: ɵ0,
};
var sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
var MarkdownModule = /** @class */ (function () {
    function MarkdownModule() {
    }
    MarkdownModule_1 = MarkdownModule;
    MarkdownModule.forRoot = function (markdownModuleConfig) {
        return {
            ngModule: MarkdownModule_1,
            providers: __spread([
                MarkdownService
            ], (markdownModuleConfig
                ? [
                    markdownModuleConfig.loader || [],
                    markdownModuleConfig.markedOptions || initialMarkedOptions,
                ]
                : [initialMarkedOptions])),
        };
    };
    MarkdownModule.forChild = function () {
        return {
            ngModule: MarkdownModule_1,
        };
    };
    var MarkdownModule_1;
    MarkdownModule = MarkdownModule_1 = __decorate([
        NgModule({
            exports: __spread(sharedDeclarations),
            declarations: __spread(sharedDeclarations),
        })
    ], MarkdownModule);
    return MarkdownModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { LanguagePipe, MarkdownComponent, MarkdownModule, MarkdownPipe, MarkdownService, MarkedOptions, MarkedRenderer, PrismPlugin, errorSrcWithoutHttpClient, initialMarkedOptions, ɵ0 };
//# sourceMappingURL=try-mark-down.js.map
