import { Component } from '@angular/core';

@Component({
  selector: 'extra-screen-member',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class MemberScreenComponent {
  constructor() {
    console.log('constructor');
  }
}
