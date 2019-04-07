import { Component, Input } from '@angular/core';
import { ResizedEvent } from '@lib/resize-event';
@Component({
  selector: 'home-card',
  styleUrls: ['style.scss'],
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class HomeCardComponent {

  @Input() title = '';

  onResized(event: ResizedEvent) {
    console.log(event);
  }
}
