import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ClassifyComponent } from './classify/classify.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'classify', pathMatch: 'full'},
  { path: 'classify', component: ClassifyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ClassifyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
