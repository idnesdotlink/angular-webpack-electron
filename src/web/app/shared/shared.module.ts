import { NgModule, ModuleWithProviders, APP_INITIALIZER, RendererFactory2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';
import {
  Preference,
  IDB,
  providers as CoreProviders,
  LOADING,
  Theme,
  SIZE
} from '@core/services';
import { PreferencesDB, DBS } from '@core/db';
import { appInit } from '@core/initializer';
import { LoadingGuard } from '@core/guards/loading.guard';
import { SharedComponentModule } from './shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
  ],
  exports: [
    CommonModule,
    SharedComponentModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ... CoreProviders,
        IDB,
        ... DBS,
        LoadingGuard,
        {
          provide: APP_INITIALIZER,
          useFactory: appInit,
          multi: true,
          deps: [PreferencesDB, Preference, LOADING, Theme, RendererFactory2, SIZE]
        }
      ]
    };
  }
}
