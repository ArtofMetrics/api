import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import TopMenuComponent from './top-menu.component';
import TopMenuService from './top-menu.service';
import { routing } from 'client/app/app.routing';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [TopMenuComponent],
  providers: [TopMenuService],
  exports: [TopMenuComponent]
})
export default class TopMenuModule { }