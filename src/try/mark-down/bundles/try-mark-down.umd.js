(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser'), require('marked'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@try/mark-down', ['exports', '@angular/core', '@angular/common', '@angular/common/http', '@angular/platform-browser', 'marked', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.try = global.try || {}, global.try['mark-down'] = {}), global.ng.core, global.ng.common, global.ng.common.http, global.ng.platformBrowser, global.marked, global.rxjs.operators));
}(this, function (exports, core, common, http, platformBrowser, marked, operators) { 'use strict';

    /*! *****************************************************************************

    Copyright (c) Microsoft Corporation. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License"); you may not use

    this file except in compliance with the License. You may obtain a copy of the

    License at http://www.apache.org/licenses/LICENSE-2.0



    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY

    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED

    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,

    MERCHANTABLITY OR NON-INFRINGEMENT.



    See the Apache Version 2.0 License for specific language governing permissions

    and limitations under the License.

    ***************************************************************************** */

    /* global Reflect, Promise */



    var extendStatics = function(d, b) {

        extendStatics = Object.setPrototypeOf ||

            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||

            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

        return extendStatics(d, b);

    };



    function __extends(d, b) {

        extendStatics(d, b);

        function __() { this.constructor = d; }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());

    }



    function __decorate(decorators, target, key, desc) {

        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);

        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;

        return c > 3 && r && Object.defineProperty(target, key, r), r;

    }



    function __param(paramIndex, decorator) {

        return function (target, key) { decorator(target, key, paramIndex); }

    }



    function __metadata(metadataKey, metadataValue) {

        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);

    }



    function __read(o, n) {

        var m = typeof Symbol === "function" && o[Symbol.iterator];

        if (!m) return o;

        var i = m.call(o), r, ar = [], e;

        try {

            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);

        }

        catch (error) { e = { error: error }; }

        finally {

            try {

                if (r && !r.done && (m = i["return"])) m.call(i);

            }

            finally { if (e) throw e.error; }

        }

        return ar;

    }



    function __spread() {

        for (var ar = [], i = 0; i < arguments.length; i++)

            ar = ar.concat(__read(arguments[i]));

        return ar;

    }

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
            core.Pipe({
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
    }(marked.Renderer));

    // tslint:disable-next-line:max-line-length
    var errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
    var MarkdownService = /** @class */ (function () {
        function MarkdownService(
        // tslint:disable-next-line: ban-types
        platform, http, domSanitizer, options) {
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
            var compiled = marked.parse(decodeHtml ? this.decodeHtml(precompiled) : precompiled, markedOptions);
            return markedOptions.sanitize && !markedOptions.sanitizer
                ? this.domSanitizer.sanitize(core.SecurityContext.HTML, compiled)
                : compiled;
        };
        MarkdownService.prototype.getSource = function (src) {
            var _this = this;
            if (!this.http) {
                throw new Error(errorSrcWithoutHttpClient);
            }
            return this.http
                .get(src, { responseType: 'text' })
                .pipe(operators.map(function (markdown) { return _this.handleExtension(src, markdown); }));
        };
        MarkdownService.prototype.highlight = function (element) {
            if (common.isPlatformBrowser(this.platform) && typeof Prism !== 'undefined') {
                if (element) {
                    Prism.highlightAllUnder(element);
                }
                else {
                    Prism.highlightAll(false);
                }
            }
        };
        MarkdownService.prototype.decodeHtml = function (html) {
            if (common.isPlatformBrowser(this.platform)) {
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
            core.Injectable(),
            __param(0, core.Inject(core.PLATFORM_ID)),
            __param(1, core.Optional()),
            __metadata("design:paramtypes", [Object,
                http.HttpClient,
                platformBrowser.DomSanitizer,
                MarkedOptions])
        ], MarkdownService);
        return MarkdownService;
    }());


    (function (PrismPlugin) {
        PrismPlugin["LineHighlight"] = "line-highlight";
        PrismPlugin["LineNumbers"] = "line-numbers";
    })(exports.PrismPlugin || (exports.PrismPlugin = {}));

    var MarkdownComponent = /** @class */ (function () {
        function MarkdownComponent(element, markdownService) {
            this.element = element;
            this.markdownService = markdownService;
            this.error = new core.EventEmitter();
            this.load = new core.EventEmitter();
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
                this.setPluginClass(this.element.nativeElement, exports.PrismPlugin.LineHighlight);
                this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
            }
            if (this.lineNumbers) {
                this.setPluginClass(this.element.nativeElement, exports.PrismPlugin.LineNumbers);
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
            core.Input(),
            __metadata("design:type", String)
        ], MarkdownComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], MarkdownComponent.prototype, "src", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], MarkdownComponent.prototype, "lineNumbers", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], MarkdownComponent.prototype, "start", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], MarkdownComponent.prototype, "lineHighlight", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], MarkdownComponent.prototype, "line", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], MarkdownComponent.prototype, "lineOffset", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], MarkdownComponent.prototype, "error", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], MarkdownComponent.prototype, "load", void 0);
        MarkdownComponent = __decorate([
            core.Component({
                // tslint:disable-next-line:component-selector
                selector: 'markdown, [markdown]',
                template: '<ng-content></ng-content>'
            }),
            __metadata("design:paramtypes", [core.ElementRef,
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
                .pipe(operators.first())
                .subscribe(function () { return _this.markdownService.highlight(_this.elementRef.nativeElement); });
            return markdown;
        };
        MarkdownPipe = __decorate([
            core.Pipe({
                name: 'markdown',
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                MarkdownService,
                core.NgZone])
        ], MarkdownPipe);
        return MarkdownPipe;
    }());

    var initialMarkedOptions = {
        provide: MarkedOptions,
        useValue: {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
        },
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
            core.NgModule({
                exports: __spread(sharedDeclarations),
                declarations: __spread(sharedDeclarations),
            })
        ], MarkdownModule);
        return MarkdownModule;
    }());

    exports.LanguagePipe = LanguagePipe;
    exports.MarkdownComponent = MarkdownComponent;
    exports.MarkdownModule = MarkdownModule;
    exports.MarkdownPipe = MarkdownPipe;
    exports.MarkdownService = MarkdownService;
    exports.MarkedOptions = MarkedOptions;
    exports.MarkedRenderer = MarkedRenderer;
    exports.errorSrcWithoutHttpClient = errorSrcWithoutHttpClient;
    exports.initialMarkedOptions = initialMarkedOptions;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=try-mark-down.umd.js.map
