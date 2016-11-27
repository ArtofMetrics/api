import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import CoreModule from 'client/core/core.module';
// import { AppRoutingModule } from 'client/app/app-routing.module';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ProfileModule } from 'client/profile/profile.module';

// test
@NgModule({
  imports: [
    BrowserModule, 
    HttpModule, 
    CoreModule, 
    routing,
    ProfileModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }