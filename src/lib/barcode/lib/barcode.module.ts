import { NgModule, ModuleWithProviders } from '@angular/core';
import { BarcodeComponent } from './barcode.component';

@NgModule({
  imports: [],
  declarations: [
    BarcodeComponent,

  ],
  exports: [
    BarcodeComponent,
  ]
})
export class BarcodeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BarcodeModule,
      providers: []
    };
  }
}
