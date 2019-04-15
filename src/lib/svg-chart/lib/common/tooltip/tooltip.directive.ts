import {
  Directive, Input, Output, EventEmitter, HostListener,
  ViewContainerRef,
  Renderer2, OnDestroy
} from '@angular/core';

import { PlacementTypes } from './position/placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';

import { TooltipService } from './tooltip.service';

@Directive({ selector: '[ngx-tooltip]' })
export class TooltipDirective implements OnDestroy {

  @Input() tooltipCssClass = '';
  @Input() tooltipTitle = '';
  @Input() tooltipAppendToBody = true;
  @Input() tooltipSpacing = 10;
  @Input() tooltipDisabled = false;
  @Input() tooltipShowCaret = true;
  @Input() tooltipPlacement: PlacementTypes = PlacementTypes.top;
  @Input() tooltipAlignment: AlignmentTypes = AlignmentTypes.center;
  @Input() tooltipType: StyleTypes = StyleTypes.popover;
  @Input() tooltipCloseOnClickOutside = true;
  @Input() tooltipCloseOnMouseLeave = true;
  @Input() tooltipHideTimeout = 300;
  @Input() tooltipShowTimeout = 100;
  @Input() tooltipTemplate: any;
  @Input() tooltipShowEvent: ShowTypes = ShowTypes.all;
  @Input() tooltipContext: any;
  @Input() tooltipImmediateExit = false;

  @Output() show = new EventEmitter();
  @Output() hide = new EventEmitter();

  private get listensForFocus(): boolean {
    return this.tooltipShowEvent === ShowTypes.all ||
      this.tooltipShowEvent === ShowTypes.focus;
  }

  private get listensForHover(): boolean {
    return this.tooltipShowEvent === ShowTypes.all ||
      this.tooltipShowEvent === ShowTypes.mouseover;
  }

  private component: any;
  private timeout: any;
  private mouseLeaveContentEvent: any;
  private mouseEnterContentEvent: any;
  private documentClickEvent: any;

  constructor(
    private tooltipService: TooltipService,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2) {
  }

  ngOnDestroy(): void {
    this.hideTooltip(true);
  }

  @HostListener('focusin')
  onFocus(): void {
    if (this.listensForFocus) {
      this.showTooltip();
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (this.listensForFocus) {
      this.hideTooltip(true);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.listensForHover) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target): void {
    if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
      clearTimeout(this.timeout);

      if (this.component) {
        const contentDom = this.component.instance.element.nativeElement;
        const contains = contentDom.contains(target);
        if (contains) { return; }
      }

      this.hideTooltip(this.tooltipImmediateExit);
    }
  }

  @HostListener('click')
  onMouseClick() {
    if (this.listensForHover) {
      this.hideTooltip(true);
    }
  }

  showTooltip(immediate?: boolean): void {
    if (this.component || this.tooltipDisabled) { return; }

    const time = immediate ? 0 : this.tooltipShowTimeout;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tooltipService.destroyAll();

      const options = this.createBoundOptions();
      this.component = this.tooltipService.create(options);

      // add a tiny timeout to avoid event re-triggers
      setTimeout(() => {
        if (this.component) {
          this.addHideListeners(this.component.instance.element.nativeElement);
        }
      }, 10);

      this.show.emit(true);
    }, time);
  }

  addHideListeners(tooltip): void {
    // on mouse enter, cancel the hide triggered by the leave
    this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
      clearTimeout(this.timeout);
    });

    // content mouse leave listener
    if (this.tooltipCloseOnMouseLeave) {
      this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
        this.hideTooltip(this.tooltipImmediateExit);
      });
    }

    // content close on click outside
    if (this.tooltipCloseOnClickOutside) {
      this.documentClickEvent = this.renderer.listen(document, 'click', (event) => {
        const contains = tooltip.contains(event.target);
        if (!contains) { this.hideTooltip(); }
      });
    }
  }

  hideTooltip(immediate = false): void {
    if (!this.component) { return; }

    const destroyFn = () => {
      // remove events
      if (this.mouseLeaveContentEvent) { this.mouseLeaveContentEvent(); }
      if (this.mouseEnterContentEvent) { this.mouseEnterContentEvent(); }
      if (this.documentClickEvent) { this.documentClickEvent(); }

      // emit events
      this.hide.emit(true);

      // destroy component
      this.tooltipService.destroy(this.component);
      this.component = undefined;
    };

    clearTimeout(this.timeout);
    if (!immediate) {
      this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
    } else {
      destroyFn();
    }
  }

  private createBoundOptions(): any {
    return {
      title: this.tooltipTitle,
      template: this.tooltipTemplate,
      host: this.viewContainerRef.element,
      placement: this.tooltipPlacement,
      alignment: this.tooltipAlignment,
      type: this.tooltipType,
      showCaret: this.tooltipShowCaret,
      cssClass: this.tooltipCssClass,
      spacing: this.tooltipSpacing,
      context: this.tooltipContext
    };
  }

}
