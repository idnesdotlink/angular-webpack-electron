import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, from } from 'rxjs';
import { PreferencesDB } from '../db/preferences.db.service';


@Injectable()
export class PreferenceService {

  preferenceSubject$: BehaviorSubject<any>;

  constructor(private db: PreferencesDB) {
    this.preferenceSubject$ = new BehaviorSubject(null);
  }

  snapshot() {
    return this.preferenceSubject$.value;
  }

  save(value: any) {
    return this.preferenceSubject$.next(value);
  }
}
