// NPM Deps
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_PROVIDERS } from 'angular2-jwt';

// AOM Modules
import { SharedModule } from 'client/shared/shared.module';
import {ViewWrapperModule} from './view-wrapper/view-wrapper.module';
import TopMenuModule from './top-menu/top-menu.module';
import { HttpModule } from '@angular/http';

// AOM Services
import { JWTService } from './jwt.service';
import { UserService } from './user.service';
import { ApiService } from 'client/core/api/api.service';

// AOM Components
import TopMenuComponent from './top-menu/top-menu.component';
import {ViewWrapperComponent} from './view-wrapper/view-wrapper.component';

// AOM Directives
import { CarouselDirective } from './carousel.directive';

@NgModule({
  imports: [CommonModule, SharedModule, TopMenuModule, ViewWrapperModule],
  exports: [TopMenuComponent, ViewWrapperComponent, CarouselDirective, SharedModule],
  declarations: [CarouselDirective],
  providers: [AUTH_PROVIDERS, JWTService, UserService, ApiService]
})

export default class CoreModule {

}