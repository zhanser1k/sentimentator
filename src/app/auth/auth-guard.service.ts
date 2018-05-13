import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate {

	constructor(public auth: AuthService, public router: Router) {}
	
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem('accessToken');
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
