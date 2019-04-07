import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from './qrcode.component';

export * from './qrcode.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    QRCodeComponent
  ],
  exports: [
    QRCodeComponent
  ]
})
export class QRCodeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: QRCodeModule,
      providers: []
    };
  }
}
