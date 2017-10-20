import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {appRoutes} from './app.routes';

import {Constants} from './constants';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/user/header/header.component';
import {HomeComponent} from './components/user/home/home.component';

import {LoginService} from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, appRoutes, HttpModule
  ],
  providers: [Constants, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
