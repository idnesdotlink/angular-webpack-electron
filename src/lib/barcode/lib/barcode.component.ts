import { Component, Input, OnChanges, ViewChild, Renderer2, ElementRef } from '@angular/core';
// import {api} from 'jsbarcode';
// declare var JsBarcode: any;
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'bar-code',
  template: `<div #bcElement [class]="cssClass"></div>`,
  styles: [
    `:host {
      display: inline-block;
    }`
  ]
})
export class BarcodeComponent implements OnChanges {

  @Input() elementType: 'svg' | 'img' | 'canvas' = 'svg';
  @Input() cssClass = 'barcode'; // this should be done more elegantly

  @Input() format: '' | 'CODE128' | 'CODE128A' | 'CODE128B' | 'CODE128C' | 'EAN' | 'UPC' | 'EAN8' | 'EAN5' |
  'EAN2' | 'CODE39' | 'ITF14' | 'MSI' | 'MSI10' | 'MSI11' | 'MSI1010' | 'MSI1110' | 'pharmacode' | 'codabar' = 'CODE128';
  @Input() lineColor = '#000000';
  @Input() width = 2;
  @Input() height = 100;
  @Input() displayValue = false;
  @Input() fontOptions = '';
  @Input() font = 'monospace';
  @Input() textAlign = 'center';
  @Input() textPosition = 'bottom';
  @Input() textMargin = 2;
  @Input() fontSize = 20;
  @Input() background = '#ffffff';
  @Input() margin = 10;
  @Input() marginTop = 10;
  @Input() marginBottom = 10;
  @Input() marginLeft = 10;
  @Input() marginRight = 10;
  @Input() value = '';
  @ViewChild('bcElement') bcElement: ElementRef;

  @Input() valid: () => boolean = () => true;


  get options() {
    return {
      format: this.format,
      lineColor: this.lineColor,
      width: this.width,
      height: this.height,
      displayValue: this.displayValue,
      fontOptions: this.fontOptions,
      font: this.font,
      textAlign: this.textAlign,
      textPosition: this.textPosition,
      textMargin: this.textMargin,
      fontSize: this.fontSize,
      background: this.background,
      margin: this.margin,
      marginTop: this.marginTop,
      marginBottom: this.marginBottom,
      marginLeft: this.marginLeft,
      marginRight: this.marginRight,
      valid: this.valid,
    };
  }
  constructor(private renderer: Renderer2) { }

  ngOnChanges() {
    this.createBarcode();
  }

  createBarcode() {
    if (!this.value) { return; }
    let element: Element;
    switch (this.elementType) {
      case 'img':
        element = this.renderer.createElement('img');
        break;
      case 'canvas':
        element = this.renderer.createElement('canvas');
        break;
      case 'svg':
      default:
        element = this.renderer.createElement('svg', 'svg');
    }

    JsBarcode(element, this.value, this.options);

    for (const node of this.bcElement.nativeElement.childNodes) {
      this.renderer.removeChild(this.bcElement.nativeElement, node);
    }
    this.renderer.appendChild(this.bcElement.nativeElement, element);

  }

}
