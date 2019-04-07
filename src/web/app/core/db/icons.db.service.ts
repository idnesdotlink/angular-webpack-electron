import { Injectable } from '@angular/core';
import { Dexie, IndexableType } from 'dexie';
import { IDBService } from '@core/services/idb.service';
import { from, defer } from 'rxjs';

export interface IIcons {
  title?: number;
  text?: string;
  code?: number;
}

@Injectable()
export class IconsDB {

  table: Dexie.Table<IIcons, number>;

  constructor(idb: IDBService) {
    this.table = idb.table('icons');
  }

  find(id: number) {
    return defer(() => from(this.table.get(id)));
  }

  add(item: IIcons, id?: number) {
    return from(this.table.add(item, id));
  }

  bulkAdd(items: IIcons[]) {
    return from(this.table.bulkAdd(items));
  }

  bulkPut(items: IIcons[]) {
    return from(this.table.bulkPut(items));
  }

  bulkDelete(keys: ReadonlyArray< string | number | Array<Array<void>> >) {
    return from(this.table.bulkDelete(keys));
  }

  update(id: number, change: {[keyPath: string]: any}) {
    return defer(() => from(this.table.update(id, change)));
  }

  put(id: number, value: IIcons) {
    return defer(() => from(this.table.put(value, id)));
  }

  where(key: string, value: any) {
    return defer(() => from(this.table.where(key).equals(value).count()));
  }
}
