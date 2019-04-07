import { 
  Directive,
  ElementRef,
  forwardRef, HostListener,
  Inject, Input,
  OnChanges, OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, COMPOSITION_BUFFER_MODE } from '@angular/forms';

@Directive({
  selector: '[pD]'
})
export class PhoneDirective {

  private selectionStart: number;
  private selectionEnd: number;
  private isFocus: boolean;
  private inputLength: number;
  private navigationKeys = [
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
  inputElement: HTMLInputElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
    this.selectionStart = null;
    this.isFocus = false;
    this.inputLength = 0;
  }

  private setSelection() {
    if (this.isFocus) {
      this.selectionStart = this.inputElement.selectionStart as number;
      this.selectionEnd = this.inputElement.selectionEnd as number;
    }
  }

  private setLength() {
    if (this.isFocus) {
      this.inputLength = this.inputElement.value.length as number;
    }    
  }

  @HostListener('select', ['$event'])
  onSelect(e: Event) {
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.setSelection();
  }

  @HostListener('input', ['$event'])
  onInput(e: KeyboardEvent) {
  }

  @HostListener('blur', ['$event'])
  onBlur(e: FocusEvent) {
    this.isFocus = false;
  }

  @HostListener('focus', ['$event'])
  onFocus(e: FocusEvent) {
    this.setSelection();
    this.setLength();
    this.isFocus = true;
    console.log({focus: e, start: this.selectionStart, end: this.selectionEnd, length: this.inputLength});
  }

  @HostListener('textinput', ['$event'])  
  onTextInput(e: Event) {
    console.log(e);
  }

  @HostListener('keyup', ['$event'])  
  onKeyUp(e: KeyboardEvent) {
    console.log({keyup: e, start: this.selectionStart, end: this.selectionEnd, length: this.inputLength});
    if (this.isFocus) {
      this.setLength();
      this.setSelection();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    console.log({keydown: e, start: this.selectionStart, end: this.selectionEnd, length: this.inputLength});
    if (this.selectionStart < 1 && e.key === '0') {
      e.preventDefault();
    }
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
  }
}
