import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ContextMenuAttachDirective } from './context-menu.attach.directive';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuItemDirective } from './context-menu.item.directive';
import { IContextMenuOptions } from './options';
import { ContextMenuService } from './context-menu.service';
import { CONTEXT_MENU_OPTIONS } from './tokens';
import { ContextMenuContentComponent } from './context-menu.content.component';

@NgModule({
  declarations: [
    ContextMenuAttachDirective,
    ContextMenuComponent,
    ContextMenuContentComponent,
    ContextMenuItemDirective,
  ],
  entryComponents: [
    ContextMenuContentComponent,
  ],
  exports: [
    ContextMenuAttachDirective,
    ContextMenuComponent,
    ContextMenuItemDirective,
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
})
export class ContextMenuModule {
  public static forRoot(options?: IContextMenuOptions): ModuleWithProviders {
    return {
      ngModule: ContextMenuModule,
      providers: [
        ContextMenuService,
        {
          provide: CONTEXT_MENU_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
