import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sentimentator';
  isAuth: Boolean;

  constructor(public router: Router) {}

  logout() {
		localStorage.removeItem("accessToken");
		this.router.navigate(['signin']);
  }
  
  ngDoCheck( ) {
		if(localStorage.getItem("accessToken") === null) {
			this.isAuth = false;
		} else {
			this.isAuth = true;
		}
	}
}
