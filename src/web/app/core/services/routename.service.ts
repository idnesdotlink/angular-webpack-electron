import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, pairwise, map, filter } from 'rxjs/operators';

@Injectable()
export class RouteNameService {

  routeNameSubject$: BehaviorSubject<string>;

  constructor() {
    this.routeNameSubject$ = new BehaviorSubject(null);
  }

  observable(): Observable<string> {
    return this.routeNameSubject$
      .asObservable()
      .pipe(
        startWith(null),
        pairwise(),
        filter((x: any) => (x[1] !== x[0])),
        // map(w => (`${w[0]}=>${w[1]}`)),
      );
  }

  snapshot(): string {
    return this.routeNameSubject$.value;
  }

  save(name: string): void {
    this.routeNameSubject$.next(name);
  }

}
