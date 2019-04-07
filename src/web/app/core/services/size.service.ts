import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pairwise, startWith, filter } from 'rxjs/operators';

@Injectable()
export class SizeService {
  size$: BehaviorSubject<number[]>;

  constructor() { this.size$ = new BehaviorSubject([null, null]); }

  snapshot(): number[] {
    return this.size$.value;
  }

  set(size: number[]) {
    this.size$.next(size);
  }
}
