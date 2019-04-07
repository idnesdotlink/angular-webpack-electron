import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: 'template.html',

})
export class AppThemeComponent {
  constructor(public themeService: ThemeService, private renderer: Renderer2) { }

  click() {
    this.themeService.toggle(this.renderer);
  }
}
