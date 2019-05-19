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
    constructor(
    // tslint:disable-next-line: ban-types
    platform, http, domSanitizer, options) {
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
            if (element) {
                Prism.highlightAllUnder(element);
            }
            else {
                Prism.highlightAll(false);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0cnkvbWFyay1kb3duLyIsInNvdXJjZXMiOlsibGliL21hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU9uRCwyQ0FBMkM7QUFDM0MsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsMkpBQTJKLENBQUM7QUFHck0sSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWtCMUI7SUFDRSxzQ0FBc0M7SUFDVCxRQUFnQixFQUN6QixJQUFnQixFQUM1QixZQUEwQixFQUNsQyxPQUFzQjtRQUhPLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDekIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUdsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBdEJELElBQUksT0FBTyxLQUFvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3RELElBQUksT0FBTyxDQUFDLEtBQW9CO1FBQzlCLElBQUksQ0FB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c1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hcmtlZE9wdGlvbnMgfSBmcm9tICcuL21hcmtlZC1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlZFJlbmRlcmVyIH0gZnJvbSAnLi9tYXJrZWQtcmVuZGVyZXInO1xuXG5kZWNsYXJlIHZhciBQcmlzbToge1xuICBoaWdobGlnaHRBbGw6IChhc3luYzogYm9vbGVhbikgPT4gdm9pZDtcbiAgaGlnaGxpZ2h0QWxsVW5kZXI6IChlbGVtZW50OiBFbGVtZW50KSA9PiB2b2lkO1xufTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGNvbnN0IGVycm9yU3JjV2l0aG91dEh0dHBDbGllbnQgPSAnW25neC1tYXJrZG93bl0gV2hlbiB1c2luZyB0aGUgW3NyY10gYXR0cmlidXRlIHlvdSAqaGF2ZSB0byogcGFzcyB0aGUgYEh0dHBDbGllbnRgIGFzIGEgcGFyYW1ldGVyIG9mIHRoZSBgZm9yUm9vdGAgbWV0aG9kLiBTZWUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duU2VydmljZSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9vcHRpb25zOiBNYXJrZWRPcHRpb25zO1xuXG4gIGdldCBvcHRpb25zKCk6IE1hcmtlZE9wdGlvbnMgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxuICBzZXQgb3B0aW9ucyh2YWx1ZTogTWFya2VkT3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgeyByZW5kZXJlcjogbmV3IE1hcmtlZFJlbmRlcmVyKCkgfSxcbiAgICAgIHRoaXMuX29wdGlvbnMsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgZ2V0IHJlbmRlcmVyKCk6IE1hcmtlZFJlbmRlcmVyIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5yZW5kZXJlcjsgfVxuICBzZXQgcmVuZGVyZXIodmFsdWU6IE1hcmtlZFJlbmRlcmVyKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBvcHRpb25zOiBNYXJrZWRPcHRpb25zLFxuICApIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgY29tcGlsZShtYXJrZG93bjogc3RyaW5nLCBkZWNvZGVIdG1sID0gZmFsc2UsIG1hcmtlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHByZWNvbXBpbGVkID0gdGhpcy5wcmVjb21waWxlKG1hcmtkb3duKTtcbiAgICBjb25zdCBjb21waWxlZCA9IHBhcnNlKFxuICAgICAgZGVjb2RlSHRtbCA/IHRoaXMuZGVjb2RlSHRtbChwcmVjb21waWxlZCkgOiBwcmVjb21waWxlZCxcbiAgICAgIG1hcmtlZE9wdGlvbnMpO1xuICAgIHJldHVybiBtYXJrZWRPcHRpb25zLnNhbml0aXplICYmICFtYXJrZWRPcHRpb25zLnNhbml0aXplclxuICAgICAgPyB0aGlzLmRvbVNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgY29tcGlsZWQpXG4gICAgICA6IGNvbXBpbGVkO1xuICB9XG5cbiAgZ2V0U291cmNlKHNyYzogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuaHR0cCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3JjV2l0aG91dEh0dHBDbGllbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHNyYywgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxuICAgICAgLnBpcGUobWFwKG1hcmtkb3duID0+IHRoaXMuaGFuZGxlRXh0ZW5zaW9uKHNyYywgbWFya2Rvd24pKSk7XG4gIH1cblxuICBoaWdobGlnaHQoZWxlbWVudD86IEVsZW1lbnQpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybSkgJiYgdHlwZW9mIFByaXNtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXIoZWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBQcmlzbS5oaWdobGlnaHRBbGwoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybSkpIHtcbiAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgIHRleHRhcmVhLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFeHRlbnNpb24oc3JjOiBzdHJpbmcsIG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNyY1xuICAgICAgPyBzcmMuc3BsaXQoJz8nKVswXS5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpXG4gICAgICA6IG51bGw7XG4gICAgcmV0dXJuIGV4dGVuc2lvbiAhPT0gJ21kJ1xuICAgICAgPyAnYGBgJyArIGV4dGVuc2lvbiArICdcXG4nICsgbWFya2Rvd24gKyAnXFxuYGBgJ1xuICAgICAgOiBtYXJrZG93bjtcbiAgfVxuXG4gIHByaXZhdGUgcHJlY29tcGlsZShtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIW1hcmtkb3duKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBpbmRlbnRTdGFydDogbnVtYmVyO1xuICAgIHJldHVybiBtYXJrZG93blxuICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgLm1hcChsaW5lID0+IHtcbiAgICAgICAgLy8gc2V0IGN1cnJlbnQgbGluZSBpZGVudCBzdGFydCB0byBiYXNlIHJlZmVyZW5jZSBpbmRlbnRhdGlvblxuICAgICAgICBsZXQgbGluZUlkZW50U3RhcnQgPSBpbmRlbnRTdGFydDtcbiAgICAgICAgLy8gZmluZCBwb3NpdGlvbiBvZiAxc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgY3VycmVudCBsaW5lIGluZGVudGF0aW9uIHN0YXJ0XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsaW5lSWRlbnRTdGFydCA9IGlzTmFOKGxpbmVJZGVudFN0YXJ0KVxuICAgICAgICAgICAgPyBsaW5lLnNlYXJjaCgvXFxTfCQvKVxuICAgICAgICAgICAgOiBNYXRoLm1pbihsaW5lLnNlYXJjaCgvXFxTfCQvKSwgbGluZUlkZW50U3RhcnQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGtlZXAgMXN0IG5vbi13aGl0ZXNwYWNlIGxpbmUgaW5kZW50YXRpb25cbiAgICAgICAgLy8gYXMgYmFzZSByZWZlcmVuY2UgZm9yIG90aGVyIGxpbmVzXG4gICAgICAgIGlmIChpc05hTihpbmRlbnRTdGFydCkpIHtcbiAgICAgICAgICBpbmRlbnRTdGFydCA9IGxpbmVJZGVudFN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSB3aGl0ZXNwYWNlcyBiZWZvcmUgY3VycmVudCBsaW5lIGluZGVudGF0aW9uXG4gICAgICAgIHJldHVybiAhIWxpbmVJZGVudFN0YXJ0XG4gICAgICAgICAgPyBsaW5lLnN1YnN0cmluZyhsaW5lSWRlbnRTdGFydClcbiAgICAgICAgICA6IGxpbmU7XG4gICAgICB9KS5qb2luKCdcXG4nKTtcbiAgfVxufVxuIl19