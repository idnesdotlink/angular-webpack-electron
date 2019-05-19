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
            if (element) {
                Prism.highlightAllUnder(element);
            }
            else {
                Prism.highlightAll(false);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvbWFyay1kb3duLyIsInNvdXJjZXMiOlsibGliL21hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU9uRCwyQ0FBMkM7QUFDM0MsTUFBTSxDQUFDLElBQU0seUJBQXlCLEdBQUcsMkpBQTJKLENBQUM7QUFHck07SUFrQkU7SUFDRSxzQ0FBc0M7SUFDVCxRQUFnQixFQUN6QixJQUFnQixFQUM1QixZQUEwQixFQUNsQyxPQUFzQjtRQUhPLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDekIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUdsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBdEJELHNCQUFJLG9DQUFPO2FBQVgsY0FBK0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUN0RCxVQUFZLEtBQW9CO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FB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QUN6QixhQUFhO09BdkJiLGVBQWUsQ0F1RzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXZHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdtYXJrZWQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXJrZWRPcHRpb25zIH0gZnJvbSAnLi9tYXJrZWQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZWRSZW5kZXJlciB9IGZyb20gJy4vbWFya2VkLXJlbmRlcmVyJztcblxuZGVjbGFyZSB2YXIgUHJpc206IHtcbiAgaGlnaGxpZ2h0QWxsOiAoYXN5bmM6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGhpZ2hsaWdodEFsbFVuZGVyOiAoZWxlbWVudDogRWxlbWVudCkgPT4gdm9pZDtcbn07XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbmV4cG9ydCBjb25zdCBlcnJvclNyY1dpdGhvdXRIdHRwQ2xpZW50ID0gJ1tuZ3gtbWFya2Rvd25dIFdoZW4gdXNpbmcgdGhlIFtzcmNdIGF0dHJpYnV0ZSB5b3UgKmhhdmUgdG8qIHBhc3MgdGhlIGBIdHRwQ2xpZW50YCBhcyBhIHBhcmFtZXRlciBvZiB0aGUgYGZvclJvb3RgIG1ldGhvZC4gU2VlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrZG93blNlcnZpY2Uge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgcHJpdmF0ZSBfb3B0aW9uczogTWFya2VkT3B0aW9ucztcblxuICBnZXQgb3B0aW9ucygpOiBNYXJrZWRPcHRpb25zIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cbiAgc2V0IG9wdGlvbnModmFsdWU6IE1hcmtlZE9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgIHsgcmVuZGVyZXI6IG5ldyBNYXJrZWRSZW5kZXJlcigpIH0sXG4gICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgfVxuXG4gIGdldCByZW5kZXJlcigpOiBNYXJrZWRSZW5kZXJlciB7IHJldHVybiB0aGlzLm9wdGlvbnMucmVuZGVyZXI7IH1cbiAgc2V0IHJlbmRlcmVyKHZhbHVlOiBNYXJrZWRSZW5kZXJlcikge1xuICAgIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBiYW4tdHlwZXNcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgb3B0aW9uczogTWFya2VkT3B0aW9ucyxcbiAgKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIGNvbXBpbGUobWFya2Rvd246IHN0cmluZywgZGVjb2RlSHRtbCA9IGZhbHNlLCBtYXJrZWRPcHRpb25zID0gdGhpcy5vcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCBwcmVjb21waWxlZCA9IHRoaXMucHJlY29tcGlsZShtYXJrZG93bik7XG4gICAgY29uc3QgY29tcGlsZWQgPSBwYXJzZShcbiAgICAgIGRlY29kZUh0bWwgPyB0aGlzLmRlY29kZUh0bWwocHJlY29tcGlsZWQpIDogcHJlY29tcGlsZWQsXG4gICAgICBtYXJrZWRPcHRpb25zKTtcbiAgICByZXR1cm4gbWFya2VkT3B0aW9ucy5zYW5pdGl6ZSAmJiAhbWFya2VkT3B0aW9ucy5zYW5pdGl6ZXJcbiAgICAgID8gdGhpcy5kb21TYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIGNvbXBpbGVkKVxuICAgICAgOiBjb21waWxlZDtcbiAgfVxuXG4gIGdldFNvdXJjZShzcmM6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgaWYgKCF0aGlzLmh0dHApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclNyY1dpdGhvdXRIdHRwQ2xpZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldChzcmMsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcbiAgICAgIC5waXBlKG1hcChtYXJrZG93biA9PiB0aGlzLmhhbmRsZUV4dGVuc2lvbihzcmMsIG1hcmtkb3duKSkpO1xuICB9XG5cbiAgaGlnaGxpZ2h0KGVsZW1lbnQ/OiBFbGVtZW50KSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pICYmIHR5cGVvZiBQcmlzbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlY29kZUh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pKSB7XG4gICAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICB0ZXh0YXJlYS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXh0ZW5zaW9uKHNyYzogc3RyaW5nLCBtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBzcmNcbiAgICAgID8gc3JjLnNwbGl0KCc/JylbMF0uc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKVxuICAgICAgOiBudWxsO1xuICAgIHJldHVybiBleHRlbnNpb24gIT09ICdtZCdcbiAgICAgID8gJ2BgYCcgKyBleHRlbnNpb24gKyAnXFxuJyArIG1hcmtkb3duICsgJ1xcbmBgYCdcbiAgICAgIDogbWFya2Rvd247XG4gIH1cblxuICBwcml2YXRlIHByZWNvbXBpbGUobWFya2Rvd246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFtYXJrZG93bikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgaW5kZW50U3RhcnQ6IG51bWJlcjtcbiAgICByZXR1cm4gbWFya2Rvd25cbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgIC5tYXAobGluZSA9PiB7XG4gICAgICAgIC8vIHNldCBjdXJyZW50IGxpbmUgaWRlbnQgc3RhcnQgdG8gYmFzZSByZWZlcmVuY2UgaW5kZW50YXRpb25cbiAgICAgICAgbGV0IGxpbmVJZGVudFN0YXJ0ID0gaW5kZW50U3RhcnQ7XG4gICAgICAgIC8vIGZpbmQgcG9zaXRpb24gb2YgMXN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlclxuICAgICAgICAvLyB0byBkZXRlcm1pbmUgdGhlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvbiBzdGFydFxuICAgICAgICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGluZUlkZW50U3RhcnQgPSBpc05hTihsaW5lSWRlbnRTdGFydClcbiAgICAgICAgICAgID8gbGluZS5zZWFyY2goL1xcU3wkLylcbiAgICAgICAgICAgIDogTWF0aC5taW4obGluZS5zZWFyY2goL1xcU3wkLyksIGxpbmVJZGVudFN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBrZWVwIDFzdCBub24td2hpdGVzcGFjZSBsaW5lIGluZGVudGF0aW9uXG4gICAgICAgIC8vIGFzIGJhc2UgcmVmZXJlbmNlIGZvciBvdGhlciBsaW5lc1xuICAgICAgICBpZiAoaXNOYU4oaW5kZW50U3RhcnQpKSB7XG4gICAgICAgICAgaW5kZW50U3RhcnQgPSBsaW5lSWRlbnRTdGFydDtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgd2hpdGVzcGFjZXMgYmVmb3JlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvblxuICAgICAgICByZXR1cm4gISFsaW5lSWRlbnRTdGFydFxuICAgICAgICAgID8gbGluZS5zdWJzdHJpbmcobGluZUlkZW50U3RhcnQpXG4gICAgICAgICAgOiBsaW5lO1xuICAgICAgfSkuam9pbignXFxuJyk7XG4gIH1cbn1cbiJdfQ==