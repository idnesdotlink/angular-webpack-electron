import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, state, transition, query, group } from '@angular/animations';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [
    trigger('hidebg', [
      state('true', style({
        opacity: 1,
        zIndex: 1
      })),
      state('false', style({
        opacity: 0,
        zIndex: -1
      })),
      transition(
        '*=>true', [
          animate('1000ms', style({ opacity: 1 })),
        ]
      ),
      transition(
        '*=>false', group([
          animate('1000ms', style({ opacity: 0 })),
          query(
            '.placeholder',
            [animate('1000ms', style({ transform: 'scale(.5)' }))]
          )
        ])
      )
    ])
  ]
})
export class AppBaseComponent implements OnInit {
  logoShow = true;
  sideNavShow = false;

  constructor() { }

  ngOnInit() {
    of(true).pipe(delay(1000)).subscribe(() => this.logoShow = false);
  }
}
