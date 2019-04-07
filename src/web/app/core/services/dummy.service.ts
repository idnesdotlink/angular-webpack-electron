import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MembersDB, IMembers } from '@core/db/members.db.service';
import { IconsDB, IIcons } from '@core/db/icons.db.service';
// import { IMembers } from './idb.service';
import { of, from, Observable, BehaviorSubject, defer } from 'rxjs';
import * as d3Hierarchy from 'd3-hierarchy';
import {
  map, mergeMap, toArray, take,
  takeUntil, tap, concatMap, filter,
  mergeAll, expand } from 'rxjs/operators';
import { camelCase, zip, fromPairs } from 'lodash';
// import { Promise } from 'bluebird';

import * as WebWorker from '@worker/hard';

interface DummyResponse {
  columns: string[];
  rows: Array<Array<any>>;
}

@Injectable()
export class DummyService implements OnDestroy {

  beforeDestroy$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private membersDB: MembersDB, private iconsDB: IconsDB) {
    this.beforeDestroy$ = new BehaviorSubject<boolean>(false);
  }

  transform(response: DummyResponse): Observable<any> {
    return from(response.rows)
      .pipe(
        mergeMap(value => from(response.columns).pipe(
          map(column => `${camelCase(column)}`),
          toArray(),
          map(key => fromPairs(zip(key, value)))))
      );
  }

  hallo2() {
    const data$ = this.http.get('assets/icon.json');
    data$
      .pipe(
        mergeMap((response: DummyResponse) => this.transform(response)),
        // take(10000),
        // mergeMap(member => this.membersDB.add(member))
        toArray(),
        // tap(x => console.log(x))
        mergeMap(icons => this.iconsDB.bulkAdd(icons)),
        takeUntil(this.beforeDestroy$)
      )
      .subscribe(x => null, x => null, () => console.log('complete'));
  }

  getMemberDummy() {
    const data$ = this.http.get('assets/member.json');
    const a = data$
      .pipe(
        mergeMap((response: DummyResponse) => this.transform(response)),
        // take(10000),
        // mergeMap(member => this.membersDB.add(member))
        toArray(),
        mergeMap(members => this.membersDB.bulkAdd(members)),
        // takeUntil(this.beforeDestroy$)
      );
    return a;
  }

  calconworker(xyz: string) {
    return defer(() => {
      const a = new Promise(
        (resolve, reject) => {
          const worker = new (WebWorker as any)();
          worker.postMessage({ key: 'parentId', value: xyz });
          worker.addEventListener('message', (event) => {
            worker.terminate();
            resolve({ondummy1: event.data});
          });
        }
      );
      return from(a);
    });
  }

  fdx() {

    const getChild = (x: string) => this.membersDB.where('parentMemberId', x)
    .pipe(
      mergeMap((arr) => from(arr).pipe(map(i => ({pid: i.parentMemberId, id: i.memberId, l: i.level})))),
    );

    getChild('').pipe(
      expand(
        itm => of(itm).pipe(mergeMap(i => getChild(i.id)))
      ),
      take(500),
      toArray()
    )
      .subscribe(x => console.log(x));
  }

  fromdexie() {
    const fromArr = (root: number) => {
      const data$ = from([
        {p: 0, i: 1},
        {p: 1, i: 2},
        {p: 1, i: 3},
        {p: 1, i: 4},
        {p: 2, i: 5},
        {p: 2, i: 6},
        {p: 2, i: 7},
        {p: 3, i: 8}
      ]);

      const getChild = (parent: number) => {
        return data$
          .pipe(
            filter(i => i.p === parent),
            // map(i => i.i),
            // toArray()
          );
      };

      const root$ = of(root);

      const rec$ = getChild(root);
      return rec$.pipe(
        expand(
          id => of(id).pipe(mergeMap(i => getChild(i.i)))
        ),
        toArray()
      );
    };
    fromArr(1).subscribe(x => console.log(x));
  }

  fromarray() {
    const fromArr = (root: number) => {
      const data$ = from([
        {p: 0, i: 1},
        {p: 1, i: 2},
        {p: 1, i: 3},
        {p: 1, i: 4},
        {p: 2, i: 5},
        {p: 2, i: 6},
        {p: 2, i: 7},
        {p: 3, i: 8}
      ]);

      const getChild = (parent: number) => {
        return data$
          .pipe(
            filter(i => i.p === parent),
            // map(i => i.i),
            // toArray()
          );
      };

      const root$ = of(root);

      const rec$ = getChild(root);
      return rec$.pipe(
        expand(
          id => of(id).pipe(mergeMap(i => getChild(i.i)))
        ),
        toArray()
      );
    };
    fromArr(0).subscribe(x => console.log(x));
  }

  hallo() {
    this.membersDB.where('level', 2).subscribe(
      x => console.log(x)
    );
  }

  ngOnDestroy() {
    this.beforeDestroy$.next(true);
    this.beforeDestroy$.complete();
    console.log('destroy');
  }
}
