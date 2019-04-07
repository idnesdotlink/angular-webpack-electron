import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RedirectService {
  redirectUrl$: BehaviorSubject<string>;

  constructor() {
    this.redirectUrl$ = new BehaviorSubject(null);
  }
}
