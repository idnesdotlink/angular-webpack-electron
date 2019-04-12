import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener } from '@angular/core';
let DigitOnlyDirective = class DigitOnlyDirective {
    constructor(el) {
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
    onKeyDown(e) {
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
    }
    onPaste(event) {
        event.preventDefault();
        const pastedInput = event.clipboardData
            .getData('text/plain')
            .replace(/\D/g, ''); // get a digit-only string
        document.execCommand('insertText', false, pastedInput);
    }
    onDrop(event) {
        event.preventDefault();
        const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    }
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
export { DigitOnlyDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlnaXQtb25seS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHJ5L2RpZ2l0LW9ubHkvIiwic291cmNlcyI6WyJsaWIvZGlnaXQtb25seS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtwRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQWdCN0IsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFmekIsbUJBQWMsR0FBRztZQUN2QixXQUFXO1lBQ1gsUUFBUTtZQUNSLEtBQUs7WUFDTCxRQUFRO1lBQ1IsT0FBTztZQUNQLE1BQU07WUFDTixLQUFLO1lBQ0wsV0FBVztZQUNYLFlBQVk7WUFDWixPQUFPO1lBQ1AsTUFBTTtZQUNOLE9BQU87U0FDUixDQUFDO1FBR0EsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxTQUFTLENBQUMsQ0FBZ0I7UUFDeEIsSUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUkseURBQXlEO1lBQ3BHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxnQkFBZ0I7WUFDekQsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLGdCQUFnQjtZQUN6RCxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksZ0JBQWdCO1lBQ3pELENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxnQkFBZ0I7WUFDekQsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLHFCQUFxQjtZQUM5RCxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUkscUJBQXFCO1lBQzlELENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxxQkFBcUI7WUFDOUQsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLHFCQUFxQjtVQUMzRDtZQUNBLG1DQUFtQztZQUNuQyxPQUFPO1NBQ1I7UUFDRCxtREFBbUQ7UUFDbkQ7UUFDRSx3Q0FBd0M7UUFDeEMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsRUFDekY7WUFDQSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBR0QsT0FBTyxDQUFDLEtBQXFCO1FBQzNCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixNQUFNLFdBQVcsR0FBVyxLQUFLLENBQUMsYUFBYTthQUM1QyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQywwQkFBMEI7UUFDakQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFHRCxNQUFNLENBQUMsS0FBZ0I7UUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGLENBQUE7QUF4Q0M7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUN2QixhQUFhOzttREFzQnpCO0FBR0Q7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNuQixjQUFjOztpREFNNUI7QUFHRDtJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ25CLFNBQVM7O2dEQUt0QjtBQTVEVSxrQkFBa0I7SUFIOUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7S0FDeEIsQ0FBQzs2Q0FpQnVCLFVBQVU7R0FoQnRCLGtCQUFrQixDQTZEOUI7U0E3RFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RpZ2l0T25seV0nXG59KVxuZXhwb3J0IGNsYXNzIERpZ2l0T25seURpcmVjdGl2ZSB7XG4gIHByaXZhdGUgbmF2aWdhdGlvbktleXMgPSBbXG4gICAgJ0JhY2tzcGFjZScsXG4gICAgJ0RlbGV0ZScsXG4gICAgJ1RhYicsXG4gICAgJ0VzY2FwZScsXG4gICAgJ0VudGVyJyxcbiAgICAnSG9tZScsXG4gICAgJ0VuZCcsXG4gICAgJ0Fycm93TGVmdCcsXG4gICAgJ0Fycm93UmlnaHQnLFxuICAgICdDbGVhcicsXG4gICAgJ0NvcHknLFxuICAgICdQYXN0ZSdcbiAgXTtcbiAgaW5wdXRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBlbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5uYXZpZ2F0aW9uS2V5cy5pbmRleE9mKGUua2V5KSA+IC0xIHx8IC8vIEFsbG93OiBuYXZpZ2F0aW9uIGtleXM6IGJhY2tzcGFjZSwgZGVsZXRlLCBhcnJvd3MgZXRjLlxuICAgICAgKGUua2V5ID09PSAnYScgJiYgZS5jdHJsS2V5ID09PSB0cnVlKSB8fCAvLyBBbGxvdzogQ3RybCtBXG4gICAgICAoZS5rZXkgPT09ICdjJyAmJiBlLmN0cmxLZXkgPT09IHRydWUpIHx8IC8vIEFsbG93OiBDdHJsK0NcbiAgICAgIChlLmtleSA9PT0gJ3YnICYmIGUuY3RybEtleSA9PT0gdHJ1ZSkgfHwgLy8gQWxsb3c6IEN0cmwrVlxuICAgICAgKGUua2V5ID09PSAneCcgJiYgZS5jdHJsS2V5ID09PSB0cnVlKSB8fCAvLyBBbGxvdzogQ3RybCtYXG4gICAgICAoZS5rZXkgPT09ICdhJyAmJiBlLm1ldGFLZXkgPT09IHRydWUpIHx8IC8vIEFsbG93OiBDbWQrQSAoTWFjKVxuICAgICAgKGUua2V5ID09PSAnYycgJiYgZS5tZXRhS2V5ID09PSB0cnVlKSB8fCAvLyBBbGxvdzogQ21kK0MgKE1hYylcbiAgICAgIChlLmtleSA9PT0gJ3YnICYmIGUubWV0YUtleSA9PT0gdHJ1ZSkgfHwgLy8gQWxsb3c6IENtZCtWIChNYWMpXG4gICAgICAoZS5rZXkgPT09ICd4JyAmJiBlLm1ldGFLZXkgPT09IHRydWUpIC8vIEFsbG93OiBDbWQrWCAoTWFjKVxuICAgICkge1xuICAgICAgLy8gbGV0IGl0IGhhcHBlbiwgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgYSBudW1iZXIgYW5kIHN0b3AgdGhlIGtleXByZXNzXG4gICAgaWYgKFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgKGUuc2hpZnRLZXkgfHwgKGUua2V5Q29kZSA8IDQ4IHx8IGUua2V5Q29kZSA+IDU3KSkgJiYgKGUua2V5Q29kZSA8IDk2IHx8IGUua2V5Q29kZSA+IDEwNSlcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdwYXN0ZScsIFsnJGV2ZW50J10pXG4gIG9uUGFzdGUoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwYXN0ZWRJbnB1dDogc3RyaW5nID0gZXZlbnQuY2xpcGJvYXJkRGF0YVxuICAgICAgLmdldERhdGEoJ3RleHQvcGxhaW4nKVxuICAgICAgLnJlcGxhY2UoL1xcRC9nLCAnJyk7IC8vIGdldCBhIGRpZ2l0LW9ubHkgc3RyaW5nXG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnLCBmYWxzZSwgcGFzdGVkSW5wdXQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIG9uRHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0ZXh0RGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRUZXh0JywgZmFsc2UsIHRleHREYXRhKTtcbiAgfVxufVxuIl19