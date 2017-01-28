import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import TopMenuComponent from './top-menu.component';
import TopMenuService from './top-menu.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TopMenuComponent],
  providers: [TopMenuService],
  exports: [TopMenuComponent]
})
export default class TopMenuModule { }