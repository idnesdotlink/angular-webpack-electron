import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'page-bottom-sheet',
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class PageBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ds(e: Event) {
    e.preventDefault();
    return null;
  }

  openlink(e: Event) {
    e.preventDefault();
    console.log('e');
  }
}
