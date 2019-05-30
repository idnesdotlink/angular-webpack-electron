import { __decorate, __param, __metadata } from 'tslib';
import { Pipe, SecurityContext, Injectable, Inject, PLATFORM_ID, Optional, EventEmitter, Input, Output, Component, ElementRef, NgZone, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer, parse } from 'marked';
import { map, first } from 'rxjs/operators';

let LanguagePipe = class LanguagePipe {
    transform(value, language) {
        if (typeof value !== 'string') {
            console.error(`LanguagePipe has been invoked with an invalid value type [${value}]`);
            return value;
        }
        if (typeof language !== 'string') {
            console.error(`LanguagePipe has been invoked with an invalid parameter [${language}]`);
            return value;
        }
        return '```' + language + '\n' + value + '\n```';
    }
};
LanguagePipe = __decorate([
    Pipe({
        name: 'language',
    })
], LanguagePipe);

class MarkedOptions {
}

class MarkedRenderer extends Renderer {
}

// tslint:disable-next-line:max-line-length
const errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
let MarkdownService = class MarkdownService {
    constructor(platform, http, domSanitizer, options) {
        this.platform = platform;
        this.http = http;
        this.domSanitizer = domSanitizer;
        this.options = options;
    }
    get options() { return this._options; }
    set options(value) {
        this._options = Object.assign({}, { renderer: new MarkedRenderer() }, this._options, value);
    }
    get renderer() { return this.options.renderer; }
    set renderer(value) {
        this.options.renderer = value;
    }
    compile(markdown, decodeHtml = false, markedOptions = this.options) {
        const precompiled = this.precompile(markdown);
        const compiled = parse(decodeHtml ? this.decodeHtml(precompiled) : precompiled, markedOptions);
        return markedOptions.sanitize && !markedOptions.sanitizer
            ? this.domSanitizer.sanitize(SecurityContext.HTML, compiled)
            : compiled;
    }
    getSource(src) {
        if (!this.http) {
            throw new Error(errorSrcWithoutHttpClient);
        }
        return this.http
            .get(src, { responseType: 'text' })
            .pipe(map(markdown => this.handleExtension(src, markdown)));
    }
    highlight(element) {
        if (isPlatformBrowser(this.platform) && typeof Prism !== 'undefined') {
            if (!element) {
                element = document;
            }
            element
                .querySelectorAll('pre code:not([class*="language-"])')
                .forEach(x => x.classList.add('language-none'));
            Prism.highlightAllUnder(element);
        }
    }
    decodeHtml(html) {
        if (isPlatformBrowser(this.platform)) {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = html;
            return textarea.value;
        }
        return html;
    }
    handleExtension(src, markdown) {
        const extension = src
            ? src.split('?')[0].split('.').splice(-1).join()
            : null;
        return extension !== 'md'
            ? '```' + extension + '\n' + markdown + '\n```'
            : markdown;
    }
    precompile(markdown) {
        if (!markdown) {
            return '';
        }
        let indentStart;
        return markdown
            .split('\n')
            .map(line => {
            // set current line ident start to base reference indentation
            let lineIdentStart = indentStart;
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
    }
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

var PrismPlugin;
(function (PrismPlugin) {
    PrismPlugin["LineHighlight"] = "line-highlight";
    PrismPlugin["LineNumbers"] = "line-numbers";
})(PrismPlugin || (PrismPlugin = {}));

let MarkdownComponent = class MarkdownComponent {
    constructor(element, markdownService) {
        this.element = element;
        this.markdownService = markdownService;
        this.error = new EventEmitter();
        this.load = new EventEmitter();
        this._lineHighlight = false;
        this._lineNumbers = false;
    }
    // Plugin - lineNumbers
    get lineNumbers() { return this._lineNumbers; }
    set lineNumbers(value) { this._lineNumbers = this.coerceBooleanProperty(value); }
    // Plugin - lineHighlight
    get lineHighlight() { return this._lineHighlight; }
    set lineHighlight(value) { this._lineHighlight = this.coerceBooleanProperty(value); }
    ngOnChanges() {
        if (this.data) {
            this.handleData();
            return;
        }
        if (this.src) {
            this.handleSrc();
            return;
        }
    }
    ngAfterViewInit() {
        if (!this.data && !this.src) {
            this.handleTransclusion();
        }
    }
    render(markdown, decodeHtml = false) {
        this.element.nativeElement.innerHTML = this.markdownService.compile(markdown, decodeHtml);
        this.handlePlugins();
        this.markdownService.highlight(this.element.nativeElement);
    }
    coerceBooleanProperty(value) {
        return value != null && `${value}` !== 'false';
    }
    handleData() {
        this.render(this.data);
    }
    handleSrc() {
        this.markdownService
            .getSource(this.src)
            .subscribe(markdown => {
            this.render(markdown);
            this.load.emit(markdown);
        }, error => this.error.emit(error));
    }
    handleTransclusion() {
        this.render(this.element.nativeElement.innerHTML, true);
    }
    handlePlugins() {
        if (this.lineHighlight) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.LineHighlight);
            this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
        }
        if (this.lineNumbers) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
            this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
        }
    }
    setPluginClass(element, plugin) {
        const preElements = element.querySelectorAll('pre');
        for (let i = 0; i < preElements.length; i++) {
            const classes = plugin instanceof Array ? plugin : [plugin];
            preElements.item(i).classList.add(...classes);
        }
    }
    setPluginOptions(element, options) {
        const preElements = element.querySelectorAll('pre');
        for (let i = 0; i < preElements.length; i++) {
            Object.keys(options).forEach(option => {
                const attributeValue = options[option];
                if (!!attributeValue) {
                    const attributeName = this.toLispCase(option);
                    preElements.item(i).setAttribute(attributeName, attributeValue.toString());
                }
            });
        }
    }
    toLispCase(value) {
        const upperChars = value.match(/([A-Z])/g);
        if (!upperChars) {
            return value;
        }
        let str = value.toString();
        for (let i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
        }
        if (str.slice(0, 1) === '-') {
            str = str.slice(1);
        }
        return str;
    }
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

let MarkdownPipe = class MarkdownPipe {
    constructor(elementRef, markdownService, zone) {
        this.elementRef = elementRef;
        this.markdownService = markdownService;
        this.zone = zone;
    }
    transform(value) {
        if (value == null) {
            return '';
        }
        if (typeof value !== 'string') {
            console.error(`MarkdownPipe has been invoked with an invalid value type [${value}]`);
            return value;
        }
        const markdown = this.markdownService.compile(value);
        this.zone.onStable
            .pipe(first())
            .subscribe(() => this.markdownService.highlight(this.elementRef.nativeElement));
        return markdown;
    }
};
MarkdownPipe = __decorate([
    Pipe({
        name: 'markdown',
    }),
    __metadata("design:paramtypes", [ElementRef,
        MarkdownService,
        NgZone])
], MarkdownPipe);

var MarkdownModule_1;
const ɵ0 = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
};
const initialMarkedOptions = {
    provide: MarkedOptions,
    useValue: ɵ0,
};
const sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
let MarkdownModule = MarkdownModule_1 = class MarkdownModule {
    static forRoot(markdownModuleConfig) {
        return {
            ngModule: MarkdownModule_1,
            providers: [
                MarkdownService,
                ...(markdownModuleConfig
                    ? [
                        markdownModuleConfig.loader || [],
                        markdownModuleConfig.markedOptions || initialMarkedOptions,
                    ]
                    : [initialMarkedOptions]),
            ],
        };
    }
    static forChild() {
        return {
            ngModule: MarkdownModule_1,
        };
    }
};
MarkdownModule = MarkdownModule_1 = __decorate([
    NgModule({
        exports: [
            ...sharedDeclarations,
        ],
        declarations: [
            ...sharedDeclarations,
        ],
    })
], MarkdownModule);

/**
 * Generated bundle index. Do not edit.
 */

export { LanguagePipe, MarkdownComponent, MarkdownModule, MarkdownPipe, MarkdownService, MarkedOptions, MarkedRenderer, PrismPlugin, errorSrcWithoutHttpClient, initialMarkedOptions, ɵ0 };
//# sourceMappingURL=try-mark-down.js.map
