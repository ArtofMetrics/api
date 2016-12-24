import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { SharedModule } from 'client/shared/shared.module';

import JWTService from './jwt.service';
import UserService from './user.service';
import TopMenuModule from './top-menu/top-menu.module';
import TopMenuComponent from './top-menu/top-menu.component';
import {ViewWrapperModule} from './view-wrapper/view-wrapper.module';
import {ViewWrapperComponent} from './view-wrapper/view-wrapper.component';
import { CarouselDirective } from './carousel.directive';
@NgModule({
  imports: [CommonModule, SharedModule, TopMenuModule, ViewWrapperModule],
  exports: [TopMenuComponent, ViewWrapperComponent, CarouselDirective],
  declarations: [CarouselDirective],
  providers: [AUTH_PROVIDERS, JWTService, UserService]
})

export default class CoreModule {

}