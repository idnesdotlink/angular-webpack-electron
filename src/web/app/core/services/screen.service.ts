import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pairwise, startWith, filter } from 'rxjs/operators';

@Injectable()
export class ScreenService {
  screen$: BehaviorSubject<string[]>;

  constructor() { this.screen$ = new BehaviorSubject([null, null]); }

  prevSnapshot(): string {
    return this.screen$.value[0];
  }

  currentSnapshot(): string {
    return this.screen$.value[1];
  }

  set(previous: string, current: string) {
    this.screen$.next([previous, current]);
  }
}
