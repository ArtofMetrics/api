import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import JWTService from './jwt.service';
import UserService from './user.service';
import TopMenuModule from './top-menu/top-menu.module';
import TopMenuComponent from './top-menu/top-menu.component';

@NgModule({
  imports: [BrowserModule, TopMenuModule],
  exports: [TopMenuComponent],
  providers: [AUTH_PROVIDERS, JWTService, UserService]
})

export default class CoreModule {

}