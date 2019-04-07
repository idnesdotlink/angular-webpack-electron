import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';

@Injectable()
export class SizingService {
  BreakPointsRegistry = Breakpoints;
  constructor(public breakpointObserver: BreakpointObserver, public mediaMatcher: MediaMatcher) {
    // this.BreakPointsRegistry = Breakpoints;
  }
}
