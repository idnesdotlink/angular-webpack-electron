import Dexie from 'dexie';
import * as d3Hierarchy from 'd3-hierarchy';
import { from, defer, of, Observable, SubscriptionLike, concat, Subject } from 'rxjs';
import { mergeMap, expand, take, map, toArray, startWith, takeUntil } from 'rxjs/operators';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { ApiService } from '@core/services/api.service';

import { funca } from '@core/data/funca';

const ctx: Worker = self as any;


ctx.addEventListener(
  'message', (event) => {
  const closed$: Subject<boolean> = new Subject();
  const calculateTree = () => {
    const action$ = funca(event.data);
    const subcription$: SubscriptionLike = action$
    .subscribe(message => {
      ctx.postMessage(message);
      // closed$.next(true);
      subcription$.unsubscribe();
      close();
      }
    );
  };

  calculateTree();

    // const memberDB = new MemberDB(new WorkerDB());

    // const myfunc = () => {
    //   console.log(event.data);
    //   const root: string = (event.data && event.data.value) ? event.data.value  : '';
    //   const getChild = (x: string) => memberDB.where('parentMemberId', x)
    //   .pipe(
    //     mergeMap((arr) => from(arr).pipe(map(i => {
    //         return { parentId: i.parentMemberId, id: i.memberId, level: i.level };
    //     }))),
    //   );
    //   const y = (z: any) => {
    //     // if
    //     return memberDB.one('memberId', z).pipe(
    //     map(i => {
    //       return { parentId: '', id: i.memberId, level: i.level };
    //     })
    //     );
    //   };
    //   const req = (d: string) => {
    //     return getChild(d).pipe(
    //       expand(
    //         itm => of(itm).pipe(mergeMap(i => getChild(i.id)))
    //       ),
    //       // startWith(y(root)),
    //       // take(500),
    //       //        toArray()
    //     );
    //   };
    //   const w: SubscriptionLike = req(root).pipe(toArray())
    //     .subscribe(arr => {
    //       /* const stratify = d3Hierarchy.stratify();
    //       const stratified = stratify(arr);
    //       ctx.postMessage(stratified); */
    //       ctx.postMessage(arr);
    //       w.unsubscribe();
    //       close();
    //     }
    //     );
    // };

    // const myfunc2 = () => memberDB.cnt(
    //   event.data.key,
    //   event.data.value
    // ).subscribe(x => ctx.postMessage(x));

    // // const myfunc3 = () => ((new HttpClient(new Hand())).get('assets/member.json')).subscribe(x => ctx.postMessage(x));
    // // myfunc3();
    // // myfunc2();
    // const myfunc3 = () => {
    //   // const msg = (new ApiService()).logging(`${event.data}`);
    //   const msg = event.data;
    //   console.log(d3Hierarchy);
    //   console.log(ctx);
    //   ctx.postMessage(msg);
    //   close();
    // };
    // // myfunc();
    // funca(event.data, ctx);

  }
);

export default null as any;
