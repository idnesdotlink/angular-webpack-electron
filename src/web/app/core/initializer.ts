import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PreferencesDB, MembersDB } from './db';
import { Preference, LOADING, Theme, SIZE } from './services';
import { Renderer2, RendererFactory2 } from '@angular/core';
import Promise from 'bluebird';


const appInit = (
  db: PreferencesDB,
  preference: Preference,
  loading: LOADING,
  theme: Theme,
  rendererFactory2: RendererFactory2,
  size: SIZE
) => {
  const observable$ = of(true);
  const renderer = rendererFactory2.createRenderer(null, null);
  // console.log(window.innerWidth);
  // return async () => await pref.create({key: 'hello', value: 'world'}).toPromise();
  // return async () => await db.update(1, {key: 'saya', value: {saya: 'pusing'}}).toPromise();

  // return async () => await observable$.pipe(delay(2000)).toPromise();
  return () => {
    return new Promise(
      (resolve, reject) => {
        theme.toggle(renderer);
        size.set([window.innerWidth, window.innerHeight]);
        loading.isLoading$.next(true);
        resolve();
      }
    );
  };
};

export { appInit };


