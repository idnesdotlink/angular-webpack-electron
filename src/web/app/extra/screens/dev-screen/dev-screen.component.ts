import { Component, ElementRef } from '@angular/core';
import { Dummy } from '@core/services';
import { x } from '@lib';
import { take } from 'rxjs/operators';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'dev-screen-member',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [Dummy]
})
export class DevScreenComponent {
  abc: string;
  xyz: string;
  www: string;
  rt: string;
  rw: string;
  paz: string;
  mypattern = { 'A': { pattern: new RegExp('[1-9]') }, 'B': { pattern: new RegExp('[0-9]') } };
  rtrw = { 'A': { pattern: new RegExp('[1-9]') }, 'B': { pattern: new RegExp('[0-9]') } }

  constructor(public dummy: Dummy) {
    this.xyz = '';
  }
  loadData() {
    this.dummy.getMemberDummy().subscribe(
      y => console.log(y)
    );
  }

  calculateData() {
    this.dummy.fromdexie();
  }

  findChild() {
    this.dummy.fdx();
  }

  wow() {
    // console.log(this.xyz);
    this.dummy.calconworker(this.xyz).pipe(take(1)).subscribe(i => console.log(i));
  }

  toCanvas(el: ElementRef) {

  }
}
