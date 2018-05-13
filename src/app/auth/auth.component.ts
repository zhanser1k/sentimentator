import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  data: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  signin() {
    this.loading = true;  
    this._authService.signin(this.model.username, this.model.password)
      .subscribe(res => {
        this.data = res;
        localStorage.setItem('accessToken', this.data.token);
        this._router.navigate(['analyze']);
      }, err => {
        console.log(err);
        this.error = err.error.message;
        this.loading = false;
      });
  }

  ngOnInit() {
  }
}
