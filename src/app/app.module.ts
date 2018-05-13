import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CountUpModule } from 'countup.js-angular2';


import { AppComponent } from './app.component';
import { ClassifyComponent } from './classify/classify.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TweetAnalyzerComponent } from './tweet-analyzer/tweet-analyzer.component';
import { TweetAnalyzeService } from './tweet-analyzer/tweet-analyze.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'analyze', pathMatch: 'full'},
  { path: 'classify', component: ClassifyComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: AuthComponent },
  { path: 'analyze', component: TweetAnalyzerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    ClassifyComponent,
    AuthComponent,
    TweetAnalyzerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    CountUpModule,
    RouterModule.forRoot(
      appRoutes
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        },
        whitelistedDomains: ['localhost:8080']
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    TweetAnalyzeService,
    {
			provide: HTTP_INTERCEPTORS,
   		useClass: AuthInterceptor,
   		multi: true
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
