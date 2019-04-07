import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'page-standard',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class PageStandardComponent implements OnInit {
  @Input() title: string;

  @Input() padding  = 10;

  @Input() background = 'grey';

  @Input() boxBackground = '#424242';

  @Input() barBottom = false;

  @Output() clickBack: EventEmitter<any> = new EventEmitter();

  classes: string[] = [];

  constructor(private location: Location) { }

  ngOnInit() {
    if (this.barBottom) { this.classes.push('bottom'); }
  }

  close(e: any) {
    if (this.clickBack) {
      this.clickBack.emit();
    } else {
      console.log('test');
    }
  }
}
