import { Component, Input, OnChanges, ViewChild, Renderer2, ElementRef } from '@angular/core';
// import {toCanvas, toDataURL, toFile, toString, QRCodeRenderersOptions, QRCodeToDataURLOptions, QRCodeOptions} from 'qrcode';
// declare var require: any;
// declare var QRCode: any;

import QRCode from 'qrcode';

@Component({
  selector: 'qr-code',
  templateUrl: 'template.html',
  styles: [
    `:host {
      display: inline-block;
    }`
  ]
})
export class QRCodeComponent implements OnChanges {

  @Input() elementType: 'svg' | 'url' | 'img' | 'canvas' = 'url';
  @Input() cssClass = 'qrcode';
  @Input() value = 'autodrive';
  @Input() version:
    '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' |
    '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' |
    '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' |
    '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '' = '';

  @Input() errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M';
  @Input() margin = 4;
  @Input() scale = 4;
  @Input() width = 10;
  @Input() colorDark = '#000000';
  @Input() colorLight = '#ffffff';

  @ViewChild('qrcElement') qrcElement: ElementRef;


  constructor(private renderer: Renderer2) {

  }

  ngOnChanges() {
    this.createQRCode();
  }
  toDataURL() {
    return new Promise(
      (resolve, reject) => {
        QRCode.toDataURL(this.value,
          {
            version: parseInt(this.version, 2),
            errorCorrectionLevel: this.errorCorrectionLevel,
            margin: this.margin,
            scale: this.scale,
            width: this.width,
            color: {
              dark: this.colorDark,
              light: this.colorLight
            }

          },
          (err, url) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              // console.log(url);
              resolve(url);
            }
          }
        );
      }
    );
  }
  toCanvas(canvas) {
    return new Promise((resolve, reject) => {
      QRCode.toCanvas(canvas, this.value, {
        version: parseInt(this.version, 2),
        errorCorrectionLevel: this.errorCorrectionLevel,
        /* margin: this.margin,
        scale: this.scale,
        width: this.width,
        color: {
          dark: this.colorDark,
          light: this.colorLight
        } */
      }, (error) => {
        if (error) {
          // console.error(error);
          reject(error);
        } else {
          // console.log('success!');
          resolve('success');
        }
      });
    });
  }
  toString() {
    return new Promise(
      (resolve, reject) => {
        QRCode.toString(
          this.value,
          {
            margin: 1,
            width: 150,
            height: 150
          },
          (error, str) => {
            if (error) {
              reject(error);
            } else {
              resolve(str);
            }
          }
        );
      }
    );
  }
  renderElement(element) {
    for (const node of this.qrcElement.nativeElement.childNodes) {
      this.renderer.removeChild(this.qrcElement.nativeElement, node);
    }
    this.renderer.appendChild(this.qrcElement.nativeElement, element);
  }
  createQRCode() {
    if (!this.value) {
      return;
    }

    let element: Element;
    // console.log("QR Encoding " + this.value);

    switch (this.elementType) {

      case 'svg':
        element = this.renderer.createElement('svg');
        this.toString().then(
          v => {
            this.qrcElement.nativeElement.innerHTML = v;
            // console.log(v)
            // this.renderElement(this.renderer.);
          }
        );
        break;
      case 'canvas':
        element = this.renderer.createElement('canvas');
        this.toCanvas(element).then((v) => {
          // console.log(v);
          this.renderElement(element);
        }).catch((e) => {
          console.error(e);
        });
        break;
      case 'url':
      case 'img':
      default:
        element = this.renderer.createElement('img');
        this.toDataURL().then((v: string) => {
          // console.log(v);
          element.setAttribute('src', v);
          this.renderElement(element);
        }).catch((e) => {
          console.error(e);
        });

    }


  }

}
