import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger, group, sequence, animateChild, keyframes } from '@angular/animations';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RouteNameService } from '../../core/services/routename.service';
import { ActivatedRoute } from '@angular/router';
import { from, of, Subject } from 'rxjs';
import {  delay, take, mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'login-screen',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [
    trigger(
      'animatecard',
      [
        state('showSpinner', style({transform: 'scale(0)'})),
        state('hideSpinner', style({transform: 'scale(1)'})),
        transition('* => showSpinner', [
          query('*', animate('0ms', style({opacity: '0'}))),
          query(':self', [stagger('350ms', animate('350ms', style({height: '40px', width: '40px', borderRadius: '50%'})))]),
          query(':self', [stagger('350ms', animate('350ms', style({transform: 'scale(0)'})))]),
        ]),
        transition('* => hideSpinner', [
          animate('350ms', style({transform: 'scale(1)'}))
        ])
      ]
    ),
    trigger(
      'animatespinner', [
        state('showSpinner', style({opacity: '1', display: 'flex', transform: 'scale(1)'})),
        state('hideSpinner', style({opacity: '0', display: 'none', transform: 'scale(0)'})),
        transition('* => showSpinner', [animate('350ms')]),
        transition('* => hideSpinner', [animate('350ms')])
      ]
    )
  ],
})
export class LoginScreenComponent implements OnInit {

  animationState = 'hideSpinner';
  stoper$: Subject<boolean>;

  constructor(
    private authenticationService: AuthenticationService,
    private routeName: RouteNameService, private activateRoute: ActivatedRoute
    ) {
      this.stoper$ = new Subject();
      this.routeName.save(this.activateRoute.snapshot.data.name);
  }

  ngOnInit() {
  }

  login() {
    this.animationState = 'showSpinner';
    // from(this.authenticationService.login())
    of(true)
      .pipe(
        delay(6000),
        mergeMap(() => this.authenticationService.login()),
        takeUntil(this.stoper$.asObservable())
      )
      .subscribe(
        v => {
          this.animationState = 'hideSpinner';
        }
      );
  }

  cancel() {
    this.stoper$.next(false);
    this.animationState = 'hideSpinner';
  }

  inc() {
  }

}
