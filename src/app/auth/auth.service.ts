import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(
    public _jwtHelper: JwtHelperService,
    private _http: HttpClient
  ) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    // Check whether the token is expired and return
    // true or false
    return !this._jwtHelper.isTokenExpired(token);
  }

  signin(username, password) {
    return this._http.post('/api/signin', { username, password })
  }

}
