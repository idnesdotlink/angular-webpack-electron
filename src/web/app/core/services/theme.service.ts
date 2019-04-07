import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class ThemeService {
  renderer: Renderer2;
  theme: string;
  dark = false;

  constructor() { }

  toggle(renderer: Renderer2) {
    // this.dark = !this.dark;
    this.renderer = renderer;
    const current = !this.dark ? 'dark' : 'light';
    const next = this.dark ? 'dark' : 'light';
    this.dark = !this.dark;
    this.changeClass(current, next);
  }

  changeClass(from: string, to: string) {
    this.theme = to;
    this.renderer.removeClass(document.body, `${from}-theme`);
    this.renderer.addClass(document.body, `${to}-theme`);
  }
}
