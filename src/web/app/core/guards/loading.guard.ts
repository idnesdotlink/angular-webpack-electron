import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LOADING } from '@core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoadingGuard implements CanActivate {

  constructor(private router: Router, private loading: LOADING) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log(state.url);
    return this.loading.isLoading$.asObservable().pipe(
      map(val => {
        if (val) {
          // this.router.navigate(['logo']);
          this.router.navigateByUrl('/logo?test=[true]');
          return false;
        }
        this.router.navigateByUrl('/logo?test=[true]');
        return false;
      })
    );
  }
}
