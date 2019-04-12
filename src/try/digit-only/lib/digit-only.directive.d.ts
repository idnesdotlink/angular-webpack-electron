import { ElementRef } from '@angular/core';
export declare class DigitOnlyDirective {
    el: ElementRef;
    private navigationKeys;
    inputElement: HTMLElement;
    constructor(el: ElementRef);
    onKeyDown(e: KeyboardEvent): void;
    onPaste(event: ClipboardEvent): void;
    onDrop(event: DragEvent): void;
}
