import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { IDBService } from '../services/idb.service';
import { from, defer, Observable } from 'rxjs';

export interface IPreferences {
  id?: number;
  key?: string;
  value?: any;
}
@Injectable()
export class PreferencesDB {

  table: Dexie.Table<IPreferences, number>;

  constructor(idb: IDBService) {
    this.table = idb.table('preferences');
  }

  find(id: number): Observable<IPreferences> {
    return defer(() => {
      return from(this.table.get(id));
    });
  }

  create(item: IPreferences, id?: number): Observable<number> {
    return defer(() => {
      from(this.table.add(item, id));
    });
  }

  update(id: number, change: {[keyPath: string]: any}): Observable<number> {
    return defer(() => {
      return from(this.table.update(id, change));
    });
  }

  put(id: number, value: IPreferences): Observable<number> {
    return defer(() => {
      return from(this.table.put(value, id));
    });
  }
}
