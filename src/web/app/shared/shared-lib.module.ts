import { NgModule } from '@angular/core';
import { DigitOnlyModule } from '@lib/digit-only';
import { AngularResizedEventModule } from '@lib/resize-event';
import { ResizeListenerService } from '@lib/window-resize-listener';
import { NgxCurrencyModule } from '@lib/currency-mask';
// import { NgxQRCodeModule } from '@lib/qrcode';
// import { NgxBarcodeModule } from '@lib/barcode';

import {
  NgArrayPipesModule,
  NgStringPipesModule,
  NgMathPipesModule,
  NgBooleanPipesModule,
  NgObjectPipesModule,
} from '@lib/pipes';

@NgModule({
  providers: [ResizeListenerService]
})
export class ResizeListenerModule {
  /* static forRoot(): ModuleWithProviders {
    return {
      ngModule: ResizeListenerModule,
      providers: [
        ResizeListenerService
      ]
    };
  } */
}

const modules = [
  DigitOnlyModule,
  AngularResizedEventModule,
  NgxCurrencyModule,
  NgArrayPipesModule,
  NgStringPipesModule,
  NgMathPipesModule,
  NgBooleanPipesModule,
  NgObjectPipesModule,
  ResizeListenerModule,
  // NgxBarcodeModule,
  // NgxQRCodeModule
];

@NgModule({
  imports: [... modules],
  exports: [... modules],
  providers: []
})
export class SharedLibModule { }
