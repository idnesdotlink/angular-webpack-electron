import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { trigger, state, style, transition, query, animate, group } from '@angular/animations';
import { Theme, SCREEN, SIZING } from '@core/services';
import { filter, pairwise, map, takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [
    trigger(
      'tologin', [
        transition(
          '*=>true', [
            query(
              ':enter',
              [
                animate('0ms', style({ transform: 'scale(0)' })),
                animate('300ms', style({ transform: 'scale(1)' }))
              ]
            )
          ]
        )
      ]
    ),
    trigger(
      'fromlogin', [
        transition(
          '*=>true', [
            query(
              ':enter',
              [
                animate('0ms', style({ transform: 'scale(0)' })),
                animate('300ms', style({ transform: 'scale(1)' }))
              ]
            ),
            query(
              ':leave',
              [
                animate('0ms', style({ position: 'absolute', top: 0, left: 0, transform: 'scale(1)', opacity: '1'  })),
                animate('600ms', style({ position: 'absolute', top: 0, left: 0, transform: 'scale(.5)', opacity: '0' }))
              ]
            )
          ]
        )
      ]
    )
  ]
})
export class AppRootComponent {
  tologin = false;
  fromlogin = false;
  constructor( public theme: Theme, private router: Router, private sizing: SIZING ) {
    const navEnd$ = this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => (event.urlAfterRedirects)),
        pairwise()
      );
    navEnd$.subscribe((pairs: string[]) => {
      if (pairs[1] === '/login') {
        this.tologin = true;
      } else {
        this.tologin = false;
      }
      if (pairs[0] === '/login') {
        this.fromlogin = true;
      } else {
        this.fromlogin = false;
      }
      console.log(pairs);

    });
    this.sizing.breakpointObserver.observe([
      this.sizing.BreakPointsRegistry.HandsetPortrait
    ]).subscribe(x => console.log(x));
  }
}
