import { Injectable } from '@angular/core';
import { Dexie, IndexableType } from 'dexie';
import { IDBService } from '../services/idb.service';
import { from, defer } from 'rxjs';

export interface IMembers {
  id?: number;
  name?: string;
  level?: number;
  address?: string;
  parentMemberId?: string;
  memberId?: string;
  parentId?: number;
}

@Injectable()
export class MembersDB {

  table: Dexie.Table<IMembers, number>;

  constructor(idb: IDBService) {
    this.table = idb.table('members');
  }

  find(id: number) {
    return defer(() => from(this.table.get(id)));
  }

  add(item: IMembers, id?: number) {
    return from(this.table.add(item, id));
  }

  bulkAdd(items: IMembers[]) {
    return from(this.table.bulkAdd(items));
  }

  bulkPut(items: IMembers[]) {
    return from(this.table.bulkPut(items));
  }

  bulkDelete(keys: ReadonlyArray< string | number | Array<Array<void>> >) {
    return from(this.table.bulkDelete(keys));
  }

  update(id: number, change: {[keyPath: string]: any}) {
    return defer(() => from(this.table.update(id, change)));
  }

  put(id: number, value: IMembers) {
    return defer(() => from(this.table.put(value, id)));
  }

  where(key: string, value: any) {
    return defer(() => from(this.table.where(key).equals(value).toArray()));
  }

  notEqual(key: string, value: any) {
    return defer(() => from(this.table.where(key).notEqual(value).toArray()));
  }

}
