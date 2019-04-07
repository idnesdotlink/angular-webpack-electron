import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  isLogin = false;
  authenticating = false;

  constructor(private router: Router) { }

  login() {
    this.authenticating = true;
    this.isLogin = true;
    return this.router.navigate(['/admin/home']);
  }

  logout() {
    this.authenticating = true;
    this.isLogin = false;
    this.router.navigate(['/login']);
  }
}
