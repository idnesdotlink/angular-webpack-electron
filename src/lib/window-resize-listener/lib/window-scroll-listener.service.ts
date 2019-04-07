import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class ScrollListenerService implements OnDestroy {
  private static readonly OPTIMIZED_SCROLL_NAME = 'optimizedScroll';
  private scrollObservable: Observable<any>;
  private nativeScrollCallback;
  private optimizedScrollCallback;

  constructor() {
    this.initOptimizedSCrollEvent();
    this.scrollObservable = Observable.create((observer: Observer<any>) => {
      this.optimizedScrollCallback = () => {
        observer.next(0);
      };
      window.addEventListener(
        ScrollListenerService.OPTIMIZED_SCROLL_NAME,
        this.optimizedScrollCallback
      );
    });

    this.scrollObservable.pipe(shareReplay(1));
  }

  public ngOnDestroy() {
    this.stopListening();
  }

  /**
   * Emits when a window scroll event occurs.
   */
  public scrolled(): Observable<any> {
    return this.scrollObservable;
  }

  /**
   * Stops listening routines. Because this service
   * correctly implements the onDestroy method, it is not
   * necessary to call this method in client components
   * onDestroy method.
   */
  public stopListening() {
    if (this.nativeScrollCallback) {
      window.removeEventListener('scroll', this.nativeScrollCallback);
    }

    if (this.optimizedScrollCallback) {
      window.removeEventListener(
        ScrollListenerService.OPTIMIZED_SCROLL_NAME,
        this.optimizedScrollCallback
      );
    }
  }

  private initOptimizedSCrollEvent() {
    const throttle = type => {
      let running = false;
      this.nativeScrollCallback = function() {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(function() {
          window.dispatchEvent(
            new CustomEvent(ScrollListenerService.OPTIMIZED_SCROLL_NAME)
          );
          running = false;
        });
      };
      window.addEventListener(type, this.nativeScrollCallback);
    };

    throttle('scroll');
  }
}
