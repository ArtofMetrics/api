import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import ProfileComponent from 'client/profile/profile.component';
import { HomeComponent } from 'client/home/home.component';
import { RegisterComponent } from 'client/auth/register';
import { LoginComponent } from 'client/auth/login';

export const routing: Routes = [
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
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routing)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
// export const routes: Routes = [
//   { path: '', redirectTo: '/', pathMatch: 'full' },
// ]