import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { PopoverRef, PopoverContent } from './popover-ref';

@Component({
  templateUrl: 'popover.component.html',
  styles: [
    `
      .popover {
        background-color: #fff;
        padding: 1rem;
        font-size: 14px;
        box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.2);
      }
    `
  ]
})
export class PopoverComponent implements OnInit {
  renderMethod: 'template' | 'component' | 'text' = 'component';
  content: PopoverContent;
  context;

  constructor(private popoverRef: PopoverRef) {
  }

  ngOnInit() {
    this.content = this.popoverRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef)
      };
    }

  }
}
