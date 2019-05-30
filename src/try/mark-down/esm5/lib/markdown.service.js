import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { parse } from 'marked';
import { map } from 'rxjs/operators';
import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
// tslint:disable-next-line:max-line-length
export var errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
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
    MarkdownService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(PLATFORM_ID)),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [Object,
            HttpClient,
            DomSanitizer,
            MarkedOptions])
    ], MarkdownService);
    return MarkdownService;
}());
export { MarkdownService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvbWFyay1kb3duLyIsInNvdXJjZXMiOlsibGliL21hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU1uRCwyQ0FBMkM7QUFDM0MsTUFBTSxDQUFDLElBQU0seUJBQXlCLEdBQUcsMkpBQTJKLENBQUM7QUFHck07SUFpQkUseUJBQytCLFFBQWdCLEVBQ3pCLElBQWdCLEVBQzVCLFlBQTBCLEVBQ2xDLE9BQXNCO1FBSE8sYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUN6QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBR2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFyQkQsc0JBQUksb0NBQU87YUFBWCxjQUErQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ3RELFVBQVksS0FBb0I7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFD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VUFBVSxFQUFFO1FBbUJSLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFENEIsTUFBTTtZQUNuQixVQUFVO1lBQ2QsWUFBWTtZQUN6QixhQUFhO09BckJiLGVBQWUsQ0F1RzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXZHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdtYXJrZWQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXJrZWRPcHRpb25zIH0gZnJvbSAnLi9tYXJrZWQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZWRSZW5kZXJlciB9IGZyb20gJy4vbWFya2VkLXJlbmRlcmVyJztcblxuZGVjbGFyZSB2YXIgUHJpc206IHtcbiAgaGlnaGxpZ2h0QWxsVW5kZXI6IChlbGVtZW50OiBFbGVtZW50IHwgRG9jdW1lbnQpID0+IHZvaWQ7XG59O1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgY29uc3QgZXJyb3JTcmNXaXRob3V0SHR0cENsaWVudCA9ICdbbmd4LW1hcmtkb3duXSBXaGVuIHVzaW5nIHRoZSBbc3JjXSBhdHRyaWJ1dGUgeW91ICpoYXZlIHRvKiBwYXNzIHRoZSBgSHR0cENsaWVudGAgYXMgYSBwYXJhbWV0ZXIgb2YgdGhlIGBmb3JSb290YCBtZXRob2QuIFNlZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya2Rvd25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfb3B0aW9uczogTWFya2VkT3B0aW9ucztcblxuICBnZXQgb3B0aW9ucygpOiBNYXJrZWRPcHRpb25zIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cbiAgc2V0IG9wdGlvbnModmFsdWU6IE1hcmtlZE9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgIHsgcmVuZGVyZXI6IG5ldyBNYXJrZWRSZW5kZXJlcigpIH0sXG4gICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgfVxuXG4gIGdldCByZW5kZXJlcigpOiBNYXJrZWRSZW5kZXJlciB7IHJldHVybiB0aGlzLm9wdGlvbnMucmVuZGVyZXI7IH1cbiAgc2V0IHJlbmRlcmVyKHZhbHVlOiBNYXJrZWRSZW5kZXJlcikge1xuICAgIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybTogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIG9wdGlvbnM6IE1hcmtlZE9wdGlvbnMsXG4gICkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBjb21waWxlKG1hcmtkb3duOiBzdHJpbmcsIGRlY29kZUh0bWwgPSBmYWxzZSwgbWFya2VkT3B0aW9ucyA9IHRoaXMub3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgcHJlY29tcGlsZWQgPSB0aGlzLnByZWNvbXBpbGUobWFya2Rvd24pO1xuICAgIGNvbnN0IGNvbXBpbGVkID0gcGFyc2UoXG4gICAgICBkZWNvZGVIdG1sID8gdGhpcy5kZWNvZGVIdG1sKHByZWNvbXBpbGVkKSA6IHByZWNvbXBpbGVkLFxuICAgICAgbWFya2VkT3B0aW9ucyk7XG4gICAgcmV0dXJuIG1hcmtlZE9wdGlvbnMuc2FuaXRpemUgJiYgIW1hcmtlZE9wdGlvbnMuc2FuaXRpemVyXG4gICAgICA/IHRoaXMuZG9tU2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCBjb21waWxlZClcbiAgICAgIDogY29tcGlsZWQ7XG4gIH1cblxuICBnZXRTb3VyY2Uoc3JjOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5odHRwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTcmNXaXRob3V0SHR0cENsaWVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoc3JjLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gICAgICAucGlwZShtYXAobWFya2Rvd24gPT4gdGhpcy5oYW5kbGVFeHRlbnNpb24oc3JjLCBtYXJrZG93bikpKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChlbGVtZW50PzogRWxlbWVudCB8IERvY3VtZW50KSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pICYmIHR5cGVvZiBQcmlzbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQ7XG4gICAgICB9XG4gICAgICBlbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdwcmUgY29kZTpub3QoW2NsYXNzKj1cImxhbmd1YWdlLVwiXSknKVxuICAgICAgICAuZm9yRWFjaCh4ID0+IHguY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2Utbm9uZScpKTtcbiAgICAgIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybSkpIHtcbiAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgIHRleHRhcmVhLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFeHRlbnNpb24oc3JjOiBzdHJpbmcsIG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNyY1xuICAgICAgPyBzcmMuc3BsaXQoJz8nKVswXS5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpXG4gICAgICA6IG51bGw7XG4gICAgcmV0dXJuIGV4dGVuc2lvbiAhPT0gJ21kJ1xuICAgICAgPyAnYGBgJyArIGV4dGVuc2lvbiArICdcXG4nICsgbWFya2Rvd24gKyAnXFxuYGBgJ1xuICAgICAgOiBtYXJrZG93bjtcbiAgfVxuXG4gIHByaXZhdGUgcHJlY29tcGlsZShtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIW1hcmtkb3duKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBpbmRlbnRTdGFydDogbnVtYmVyO1xuICAgIHJldHVybiBtYXJrZG93blxuICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgLm1hcChsaW5lID0+IHtcbiAgICAgICAgLy8gc2V0IGN1cnJlbnQgbGluZSBpZGVudCBzdGFydCB0byBiYXNlIHJlZmVyZW5jZSBpbmRlbnRhdGlvblxuICAgICAgICBsZXQgbGluZUlkZW50U3RhcnQgPSBpbmRlbnRTdGFydDtcbiAgICAgICAgLy8gZmluZCBwb3NpdGlvbiBvZiAxc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgY3VycmVudCBsaW5lIGluZGVudGF0aW9uIHN0YXJ0XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsaW5lSWRlbnRTdGFydCA9IGlzTmFOKGxpbmVJZGVudFN0YXJ0KVxuICAgICAgICAgICAgPyBsaW5lLnNlYXJjaCgvXFxTfCQvKVxuICAgICAgICAgICAgOiBNYXRoLm1pbihsaW5lLnNlYXJjaCgvXFxTfCQvKSwgbGluZUlkZW50U3RhcnQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGtlZXAgMXN0IG5vbi13aGl0ZXNwYWNlIGxpbmUgaW5kZW50YXRpb25cbiAgICAgICAgLy8gYXMgYmFzZSByZWZlcmVuY2UgZm9yIG90aGVyIGxpbmVzXG4gICAgICAgIGlmIChpc05hTihpbmRlbnRTdGFydCkpIHtcbiAgICAgICAgICBpbmRlbnRTdGFydCA9IGxpbmVJZGVudFN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSB3aGl0ZXNwYWNlcyBiZWZvcmUgY3VycmVudCBsaW5lIGluZGVudGF0aW9uXG4gICAgICAgIHJldHVybiAhIWxpbmVJZGVudFN0YXJ0XG4gICAgICAgICAgPyBsaW5lLnN1YnN0cmluZyhsaW5lSWRlbnRTdGFydClcbiAgICAgICAgICA6IGxpbmU7XG4gICAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxufVxuIl19