import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { filter, map, every } from 'lodash';
@Component({
  selector: 'filter-box',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class FilterBoxComponent implements OnInit {
  @Input() filterItem: any[];

  @Input() title: string;

  @Input() allText: string;

  @Output() change: EventEmitter<any> = new EventEmitter();

  items: any[];
  all = true;

  ngOnInit() {
    this.items = map(this.filterItem, this.createCheckboxItem);
  }

  createCheckboxItem(item: any[]) {
    return { name: item[0], value: item[1], checked: true };
  }

  changeAll(e: MatCheckboxChange) {
    this.items = map(this.items, i => { i.checked = e.checked; return i; } );
    this.change.emit(this.checked());
  }

  changeOne(e: MatCheckboxChange) {
    this.all = every(this.items, i => i.checked === true );
    this.change.emit(this.checked());
  }

  checked() {
    return map(filter(this.items, (i) => i.checked), (i) => i.value);
  }
}
