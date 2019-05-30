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
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
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
MarkdownService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__param(1, Optional()),
    tslib_1.__metadata("design:paramtypes", [Object,
        HttpClient,
        DomSanitizer,
        MarkedOptions])
], MarkdownService);
export { MarkdownService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvbWFyay1kb3duLyIsInNvdXJjZXMiOlsibGliL21hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU1uRCwyQ0FBMkM7QUFDM0MsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsMkpBQTJKLENBQUM7QUFHck0sSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWlCMUIsWUFDK0IsUUFBZ0IsRUFDekIsSUFBZ0IsRUFDNUIsWUFBMEIsRUFDbEMsT0FBc0I7UUFITyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFHbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQXJCRCxJQUFJLE9BQU8sS0FBb0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFJLE9BQU8sQ0FBQyxLQUFvQjtRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFH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QUFNO1FBQ25CLFVBQVU7UUFDZCxZQUFZO1FBQ3pCLGFBQWE7R0FyQmIsZUFBZSxDQXVHM0I7U0F2R1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgU2VjdXJpdHlDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnbWFya2VkJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWFya2VkT3B0aW9ucyB9IGZyb20gJy4vbWFya2VkLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2VkUmVuZGVyZXIgfSBmcm9tICcuL21hcmtlZC1yZW5kZXJlcic7XG5cbmRlY2xhcmUgdmFyIFByaXNtOiB7XG4gIGhpZ2hsaWdodEFsbFVuZGVyOiAoZWxlbWVudDogRWxlbWVudCB8IERvY3VtZW50KSA9PiB2b2lkO1xufTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGNvbnN0IGVycm9yU3JjV2l0aG91dEh0dHBDbGllbnQgPSAnW25neC1tYXJrZG93bl0gV2hlbiB1c2luZyB0aGUgW3NyY10gYXR0cmlidXRlIHlvdSAqaGF2ZSB0byogcGFzcyB0aGUgYEh0dHBDbGllbnRgIGFzIGEgcGFyYW1ldGVyIG9mIHRoZSBgZm9yUm9vdGAgbWV0aG9kLiBTZWUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duU2VydmljZSB7XG4gIHByaXZhdGUgX29wdGlvbnM6IE1hcmtlZE9wdGlvbnM7XG5cbiAgZ2V0IG9wdGlvbnMoKTogTWFya2VkT3B0aW9ucyB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XG4gIHNldCBvcHRpb25zKHZhbHVlOiBNYXJrZWRPcHRpb25zKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sXG4gICAgICB7IHJlbmRlcmVyOiBuZXcgTWFya2VkUmVuZGVyZXIoKSB9LFxuICAgICAgdGhpcy5fb3B0aW9ucyxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gIH1cblxuICBnZXQgcmVuZGVyZXIoKTogTWFya2VkUmVuZGVyZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmVyOyB9XG4gIHNldCByZW5kZXJlcih2YWx1ZTogTWFya2VkUmVuZGVyZXIpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVuZGVyZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBvcHRpb25zOiBNYXJrZWRPcHRpb25zLFxuICApIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgY29tcGlsZShtYXJrZG93bjogc3RyaW5nLCBkZWNvZGVIdG1sID0gZmFsc2UsIG1hcmtlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHByZWNvbXBpbGVkID0gdGhpcy5wcmVjb21waWxlKG1hcmtkb3duKTtcbiAgICBjb25zdCBjb21waWxlZCA9IHBhcnNlKFxuICAgICAgZGVjb2RlSHRtbCA/IHRoaXMuZGVjb2RlSHRtbChwcmVjb21waWxlZCkgOiBwcmVjb21waWxlZCxcbiAgICAgIG1hcmtlZE9wdGlvbnMpO1xuICAgIHJldHVybiBtYXJrZWRPcHRpb25zLnNhbml0aXplICYmICFtYXJrZWRPcHRpb25zLnNhbml0aXplclxuICAgICAgPyB0aGlzLmRvbVNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgY29tcGlsZWQpXG4gICAgICA6IGNvbXBpbGVkO1xuICB9XG5cbiAgZ2V0U291cmNlKHNyYzogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuaHR0cCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3JjV2l0aG91dEh0dHBDbGllbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHNyYywgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxuICAgICAgLnBpcGUobWFwKG1hcmtkb3duID0+IHRoaXMuaGFuZGxlRXh0ZW5zaW9uKHNyYywgbWFya2Rvd24pKSk7XG4gIH1cblxuICBoaWdobGlnaHQoZWxlbWVudD86IEVsZW1lbnQgfCBEb2N1bWVudCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSAmJiB0eXBlb2YgUHJpc20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50O1xuICAgICAgfVxuICAgICAgZWxlbWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgncHJlIGNvZGU6bm90KFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0pJylcbiAgICAgICAgLmZvckVhY2goeCA9PiB4LmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLW5vbmUnKSk7XG4gICAgICBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcihlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlY29kZUh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pKSB7XG4gICAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICB0ZXh0YXJlYS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXh0ZW5zaW9uKHNyYzogc3RyaW5nLCBtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBzcmNcbiAgICAgID8gc3JjLnNwbGl0KCc/JylbMF0uc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKVxuICAgICAgOiBudWxsO1xuICAgIHJldHVybiBleHRlbnNpb24gIT09ICdtZCdcbiAgICAgID8gJ2BgYCcgKyBleHRlbnNpb24gKyAnXFxuJyArIG1hcmtkb3duICsgJ1xcbmBgYCdcbiAgICAgIDogbWFya2Rvd247XG4gIH1cblxuICBwcml2YXRlIHByZWNvbXBpbGUobWFya2Rvd246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFtYXJrZG93bikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgaW5kZW50U3RhcnQ6IG51bWJlcjtcbiAgICByZXR1cm4gbWFya2Rvd25cbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgIC5tYXAobGluZSA9PiB7XG4gICAgICAgIC8vIHNldCBjdXJyZW50IGxpbmUgaWRlbnQgc3RhcnQgdG8gYmFzZSByZWZlcmVuY2UgaW5kZW50YXRpb25cbiAgICAgICAgbGV0IGxpbmVJZGVudFN0YXJ0ID0gaW5kZW50U3RhcnQ7XG4gICAgICAgIC8vIGZpbmQgcG9zaXRpb24gb2YgMXN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlclxuICAgICAgICAvLyB0byBkZXRlcm1pbmUgdGhlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvbiBzdGFydFxuICAgICAgICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGluZUlkZW50U3RhcnQgPSBpc05hTihsaW5lSWRlbnRTdGFydClcbiAgICAgICAgICAgID8gbGluZS5zZWFyY2goL1xcU3wkLylcbiAgICAgICAgICAgIDogTWF0aC5taW4obGluZS5zZWFyY2goL1xcU3wkLyksIGxpbmVJZGVudFN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBrZWVwIDFzdCBub24td2hpdGVzcGFjZSBsaW5lIGluZGVudGF0aW9uXG4gICAgICAgIC8vIGFzIGJhc2UgcmVmZXJlbmNlIGZvciBvdGhlciBsaW5lc1xuICAgICAgICBpZiAoaXNOYU4oaW5kZW50U3RhcnQpKSB7XG4gICAgICAgICAgaW5kZW50U3RhcnQgPSBsaW5lSWRlbnRTdGFydDtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgd2hpdGVzcGFjZXMgYmVmb3JlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvblxuICAgICAgICByZXR1cm4gISFsaW5lSWRlbnRTdGFydFxuICAgICAgICAgID8gbGluZS5zdWJzdHJpbmcobGluZUlkZW50U3RhcnQpXG4gICAgICAgICAgOiBsaW5lO1xuICAgICAgfSkuam9pbignXFxuJyk7XG4gIH1cbn1cbiJdfQ==