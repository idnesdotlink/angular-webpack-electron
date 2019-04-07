import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, MediaMatcher, Breakpoints } from '@angular/cdk/layout';
import { ResizedEvent } from '@lib/resize-event';
import { from, of } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'extra-screen-admin',
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export class AdminScreenComponent {

  @HostBinding() class = 'fill-parent';

  cols = 1;
  width = 0;
  height: 0;
  onResized(event: ResizedEvent) {
    of(event).pipe(
      throttleTime(60)
    ).subscribe(x => console.log(x));
  }

  constructor( private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 2;
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 1;
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(
      result => {
        if (result.matches) {
          this.cols = 2;
        }
      }
    );
    this.breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(
      result => {
        if (result.matches) {
          this.cols = 3;
        }
      }
    );
    this.breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(
      result => {
        if (result.matches) {
          this.cols = 3;
        }
      }
    );

    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(
      result => {
        if (result.matches) {
          this.cols = 1;
        }
      }
    );
  }

}
