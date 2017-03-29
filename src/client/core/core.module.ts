// NPM Deps
import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_PROVIDERS } from 'angular2-jwt';

// AOM Modules
import { SharedModule } from 'client/shared/shared.module';
import { ViewWrapperModule } from './view-wrapper/view-wrapper.module';
import TopMenuModule from './top-menu/top-menu.module';
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';

// AOM Services
import { JWTService } from './jwt.service';
import { UserService } from './user.service';
import { ApiService } from 'client/core/api/api.service';
import { AomHTTPService } from './aom-http.service';

// AOM Configs
import { Config } from './config';

// AOM Components
import TopMenuComponent from './top-menu/top-menu.component';
import { ViewWrapperComponent } from './view-wrapper/view-wrapper.component';
import { FooterComponent } from './footer';

// AOM Directives
import { CarouselDirective } from './carousel.directive';

@NgModule({
  imports: [CommonModule, SharedModule, TopMenuModule, ViewWrapperModule],
  exports: [TopMenuComponent, ViewWrapperComponent, CarouselDirective, SharedModule, FooterComponent],
  declarations: [CarouselDirective, FooterComponent],
  providers: [
    AUTH_PROVIDERS,
    JWTService,
    UserService,
    ApiService,
    AomHTTPService,
    Config]
})

export default class CoreModule {

}