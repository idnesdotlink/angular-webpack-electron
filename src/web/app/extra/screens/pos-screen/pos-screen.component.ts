// import faker from 'faker';
import { Component, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { expandTableRows } from '@shared/animations/expandTableRow';
@Component({
  selector: 'pos-page-component',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [
    expandTableRows,
  ],
})
export class PosScreenComponent {
  expandedElement: any;
  selection: any;
  items = [];
  wishes = [];
  columnsToDisplay = ['id', 'name', 'quantity', 'price', 'select'];
  columnsTitle = ['ID', 'Name', 'qty', 'Price', 'Select'];
  psg = [
    {
      id: 1,
      name: 'hallo',
      price: 30.5,
      quantity: '',
    }
  ];

  todo = [
  ];

  done = [
  ];
  dataSource = new MatTableDataSource(this.todo);

  constructor() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);
    for (let i = 0; i < 30; i++) {
      this.todo.push(
        {
          id: i + 1,
          name: '', // faker.commerce.productName(),
          price: '', // faker.commerce.price(10000, 3000000, 2),
          quantity: '', // faker.finance.amount(1, 5, 0),
          color: '' // faker.internet.color()
        }
      );
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
