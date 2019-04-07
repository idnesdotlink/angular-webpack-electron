import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, ConnectionPositionPair, PositionStrategy, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal, PortalInjector } from '@angular/cdk/portal';
import { Popover } from './popover/popover.service';
import { InsidePopoverComponent } from './inside-popover/inside-popover.component';

@Component({
  selector: 'context-menu2',
  templateUrl: 'context-menu.component.html',
})
export class ContextMenuComponent {
  constructor(private popper: Popover) { }

  show(content: TemplateRef<any>, origin) {
    const ref = this.popper.open<{ skills: number[] }>({
      content,
      //  content: 'Hello world!',
      // content: InsidePopoverComponent,
      origin,
      width: '200px',
      data: {
        skills: [1, 2, 3]
      }
    });

    ref.afterClosed$.subscribe(res => {
        console.log(res);
    });

  }
}
