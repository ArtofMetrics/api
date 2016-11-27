import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import ProfileComponent from 'client/profile/profile.component';

export const routing = RouterModule.forRoot([
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
])
// export const routes: Routes = [
//   { path: '', redirectTo: '/', pathMatch: 'full' },
// ]