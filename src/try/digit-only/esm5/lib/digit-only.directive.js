import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener } from '@angular/core';
var DigitOnlyDirective = /** @class */ (function () {
    function DigitOnlyDirective(el) {
        this.el = el;
        this.navigationKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'Home',
            'End',
            'ArrowLeft',
            'ArrowRight',
            'Clear',
            'Copy',
            'Paste'
        ];
        this.inputElement = el.nativeElement;
    }
    DigitOnlyDirective.prototype.onKeyDown = function (e) {
        if (this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
            (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
            (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
            (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
            (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
        ) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if (
        // tslint:disable-next-line: deprecation
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
    DigitOnlyDirective.prototype.onPaste = function (event) {
        event.preventDefault();
        if (event.clipboardData === null) {
            return;
        }
        var pastedInput = event.clipboardData
            .getData('text/plain')
            .replace(/\D/g, ''); // get a digit-only string
        document.execCommand('insertText', false, pastedInput);
    };
    DigitOnlyDirective.prototype.onDrop = function (event) {
        event.preventDefault();
        if (event.dataTransfer === null) {
            return;
        }
        var textData = event.dataTransfer.getData('text').replace(/\D/g, '');
        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    };
    tslib_1.__decorate([
        HostListener('keydown', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DigitOnlyDirective.prototype, "onKeyDown", null);
    tslib_1.__decorate([
        HostListener('paste', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [ClipboardEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DigitOnlyDirective.prototype, "onPaste", null);
    tslib_1.__decorate([
        HostListener('drop', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DragEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DigitOnlyDirective.prototype, "onDrop", null);
    DigitOnlyDirective = tslib_1.__decorate([
        Directive({
            selector: '[digitOnly]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], DigitOnlyDirective);
    return DigitOnlyDirective;
}());
export { DigitOnlyDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlnaXQtb25seS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2RpZ2l0LW9ubHkvIiwic291cmNlcyI6WyJsaWIvZGlnaXQtb25seS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtwRTtJQWdCRSw0QkFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFmekIsbUJBQWMsR0FBRztZQUN2QixXQUFXO1lBQ1gsUUFBUTtZQUNSLEtBQUs7WUFDTCxRQUFRO1lBQ1IsT0FBTztZQUNQLE1BQU07WUFDTixLQUFLO1lBQ0wsV0FBVztZQUNYLFlBQVk7WUFDWixPQUFPO1lBQ1AsTUFBTTtZQUNOLE9BQU87U0FDUixDQUFDO1FBR0EsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxzQ0FBUyxHQUFULFVBQVUsQ0FBZ0I7UUFDeEIsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUkseURBQXlEO1lBQ3BHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxnQkFBZ0I7WUFDekQsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLGdCQUFnQjtZQUN6RCxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksZ0JBQWdCO1lBQ3pELENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxnQkFBZ0I7WUFDekQsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLHFCQUFxQjtZQUM5RCxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUkscUJBQXFCO1lBQzlELENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxxQkFBcUI7WUFDOUQsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLHFCQUFxQjtVQUMzRDtZQUNBLG1DQUFtQztZQUNuQyxPQUFPO1NBQ1I7UUFDRCxtREFBbUQ7UUFDbkQ7UUFDRSx3Q0FBd0M7UUFDeEMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsRUFDekY7WUFDQSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBR0Qsb0NBQU8sR0FBUCxVQUFRLEtBQXFCO1FBQzNCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLEtBQUssQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQ2hDLE9BQU87U0FDUjtRQUNELElBQU0sV0FBVyxHQUFXLEtBQUssQ0FBQyxhQUFhO2FBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUM7YUFDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtRQUNqRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUdELG1DQUFNLEdBQU4sVUFBTyxLQUFnQjtRQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUMvQixPQUFPO1NBQ1I7UUFDRCxJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUE3Q0Q7UUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUN2QixhQUFhOzt1REFzQnpCO0lBR0Q7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUNuQixjQUFjOztxREFTNUI7SUFHRDtRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7aURBQ25CLFNBQVM7O29EQVF0QjtJQWxFVSxrQkFBa0I7UUFIOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQztpREFpQnVCLFVBQVU7T0FoQnRCLGtCQUFrQixDQW1FOUI7SUFBRCx5QkFBQztDQUFBLEFBbkVELElBbUVDO1NBbkVZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkaWdpdE9ubHldJ1xufSlcbmV4cG9ydCBjbGFzcyBEaWdpdE9ubHlEaXJlY3RpdmUge1xuICBwcml2YXRlIG5hdmlnYXRpb25LZXlzID0gW1xuICAgICdCYWNrc3BhY2UnLFxuICAgICdEZWxldGUnLFxuICAgICdUYWInLFxuICAgICdFc2NhcGUnLFxuICAgICdFbnRlcicsXG4gICAgJ0hvbWUnLFxuICAgICdFbmQnLFxuICAgICdBcnJvd0xlZnQnLFxuICAgICdBcnJvd1JpZ2h0JyxcbiAgICAnQ2xlYXInLFxuICAgICdDb3B5JyxcbiAgICAnUGFzdGUnXG4gIF07XG4gIGlucHV0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubmF2aWdhdGlvbktleXMuaW5kZXhPZihlLmtleSkgPiAtMSB8fCAvLyBBbGxvdzogbmF2aWdhdGlvbiBrZXlzOiBiYWNrc3BhY2UsIGRlbGV0ZSwgYXJyb3dzIGV0Yy5cbiAgICAgIChlLmtleSA9PT0gJ2EnICYmIGUuY3RybEtleSA9PT0gdHJ1ZSkgfHwgLy8gQWxsb3c6IEN0cmwrQVxuICAgICAgKGUua2V5ID09PSAnYycgJiYgZS5jdHJsS2V5ID09PSB0cnVlKSB8fCAvLyBBbGxvdzogQ3RybCtDXG4gICAgICAoZS5rZXkgPT09ICd2JyAmJiBlLmN0cmxLZXkgPT09IHRydWUpIHx8IC8vIEFsbG93OiBDdHJsK1ZcbiAgICAgIChlLmtleSA9PT0gJ3gnICYmIGUuY3RybEtleSA9PT0gdHJ1ZSkgfHwgLy8gQWxsb3c6IEN0cmwrWFxuICAgICAgKGUua2V5ID09PSAnYScgJiYgZS5tZXRhS2V5ID09PSB0cnVlKSB8fCAvLyBBbGxvdzogQ21kK0EgKE1hYylcbiAgICAgIChlLmtleSA9PT0gJ2MnICYmIGUubWV0YUtleSA9PT0gdHJ1ZSkgfHwgLy8gQWxsb3c6IENtZCtDIChNYWMpXG4gICAgICAoZS5rZXkgPT09ICd2JyAmJiBlLm1ldGFLZXkgPT09IHRydWUpIHx8IC8vIEFsbG93OiBDbWQrViAoTWFjKVxuICAgICAgKGUua2V5ID09PSAneCcgJiYgZS5tZXRhS2V5ID09PSB0cnVlKSAvLyBBbGxvdzogQ21kK1ggKE1hYylcbiAgICApIHtcbiAgICAgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIGEgbnVtYmVyIGFuZCBzdG9wIHRoZSBrZXlwcmVzc1xuICAgIGlmIChcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIChlLnNoaWZ0S2V5IHx8IChlLmtleUNvZGUgPCA0OCB8fCBlLmtleUNvZGUgPiA1NykpICYmIChlLmtleUNvZGUgPCA5NiB8fCBlLmtleUNvZGUgPiAxMDUpXG4gICAgKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigncGFzdGUnLCBbJyRldmVudCddKVxuICBvblBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGV2ZW50LmNsaXBib2FyZERhdGEgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGFzdGVkSW5wdXQ6IHN0cmluZyA9IGV2ZW50LmNsaXBib2FyZERhdGFcbiAgICAgIC5nZXREYXRhKCd0ZXh0L3BsYWluJylcbiAgICAgIC5yZXBsYWNlKC9cXEQvZywgJycpOyAvLyBnZXQgYSBkaWdpdC1vbmx5IHN0cmluZ1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIHBhc3RlZElucHV0KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBvbkRyb3AoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0RGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIHRleHREYXRhKTtcbiAgfVxufVxuIl19