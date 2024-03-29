// NPM Deps
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// AOM Deps
import CoreModule from 'client/core/core.module';
import { SharedModule } from 'client/shared/shared.module';
import { HomeModule } from 'client/home/home.module';
import { AppRoutingModule } from 'client/app/app-routing.module';

import { AppComponent } from 'client/app/app.component';
import { ProfileModule } from 'client/profile/profile.module';
import { AuthModule } from 'client/auth/auth.module';
import { CoursesModule } from 'client/courses';
import { SidebarModule } from 'client/sidebar/sidebar.module';
import { DashboardModule } from 'client/dashboard/dashboard.module';
import { AdminModule } from 'client/admin/admin.module';

// test
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    SharedModule,

    // Component Modules
    CoursesModule,
    SidebarModule,
    DashboardModule,
    HomeModule,
    ProfileModule,
    AuthModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }