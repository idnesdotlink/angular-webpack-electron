import { Component, Input, OnInit, HostBinding } from '@angular/core'
@Component({
  selector: 'box-padding',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class BoxPaddingComponent implements OnInit {
  @Input() padding = 0;

  @Input() background = 'transparent';

  @Input() boxBackground = 'transparent';

  @HostBinding() class = 'box-padding-wow';

  padStyle: {
    backgroundColor: string,
    padding: string
  };
  boxStyle: {
    backgroundColor: string
  };

  constructor() {
    this.padStyle = { backgroundColor: null, padding: null };
    this.boxStyle = { backgroundColor: null };
  }

  ngOnInit() {
    this.padStyle.backgroundColor = `${this.background}`;
    this.padStyle.padding = `${this.padding}px`;
    this.boxStyle.backgroundColor = `${this.boxBackground}`;
  }
}
