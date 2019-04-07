import { NgModule, ModuleWithProviders } from '@angular/core';
import { ResizeListenerService } from './window-resize-listener.service';

@NgModule()
export class WindowScrollResizeEventModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WindowScrollResizeEventModule,
      providers: [
        ResizeListenerService
      ]
    };
  }
}
