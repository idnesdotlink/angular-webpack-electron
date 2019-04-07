import Dexie from 'dexie';
import * as d3Hierarchy from 'd3-hierarchy';
import { from, defer, of, Observable, SubscriptionLike, concat } from 'rxjs';
import { mergeMap, expand, take, map, toArray, startWith } from 'rxjs/operators';
import { MemberDB } from './member.db';
import { WorkerDB } from './idb';

const memberDB = new MemberDB(new WorkerDB());

const funca =  (data: any) => {
  const root: string = (data && data.value) ? data.value  : '';
  const getChild = (x: string) => memberDB.where('parentMemberId', x)
  .pipe(
    mergeMap((arr) => from(arr).pipe(map(i => {
        return { parentId: i.parentMemberId, id: i.memberId, level: i.level };
    }))),
  );
  const y = (z: any) => {
    // if
    return memberDB.one('memberId', z).pipe(
    map(i => {
      return { parentId: '', id: i.memberId, level: i.level };
    })
    );
  };
  const req = (d: string) => {
    return getChild(d).pipe(
      expand(
        itm => of(itm).pipe(mergeMap(i => getChild(i.id)))
      ),
      // startWith(y(root)),
      // take(500),
      //        toArray()
    );
  };
  return req(root).pipe(toArray());
};

export { funca };
