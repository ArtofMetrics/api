import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import ProfileComponent from 'client/profile/profile.component';
import {HomeComponent} from 'client/home/home.component';

export const routing = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
])
// export const routes: Routes = [
//   { path: '', redirectTo: '/', pathMatch: 'full' },
// ]