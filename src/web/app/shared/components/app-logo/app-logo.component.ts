import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOADING } from '@core/services';

@Component({
  selector: 'app-logo',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  animations: [],
  providers: [
    // ActivatedRouteSnapshot
  ]
})
export class AppLogoComponent implements OnInit {

  constructor(private loading: LOADING, private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this.route.snapshot.queryParams);
    // this.loading.loadingSubject$.next(false);
    // this.router.navigate()
  }
}
