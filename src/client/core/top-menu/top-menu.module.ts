import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import TopMenuComponent from './top-menu.component';
import TopMenuService from './top-menu.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [TopMenuComponent],
  providers: [TopMenuService],
  exports: [TopMenuComponent]
})
export default class TopMenuModule { }