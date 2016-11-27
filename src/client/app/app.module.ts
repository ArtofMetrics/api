import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import CoreModule from '../core/core.module';
import { AppComponent } from './app.component';
// test
@NgModule({
  imports: [BrowserModule, HttpModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }