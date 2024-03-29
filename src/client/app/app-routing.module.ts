// External Deps
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Our Deps
import ProfileComponent from 'client/profile/profile.component';
import { HomeComponent } from 'client/home/home.component';
import { RegisterComponent } from 'client/auth/register';
import { LoginComponent } from 'client/auth/login';
import { UserDashboardComponent } from 'client/dashboard/user-dashboard.component';

// Our Guards
import { LoginGuard } from 'client/auth/auth-guard.service';

export const routing: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    canActivate: [LoginGuard],
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [LoginGuard],
    component: UserDashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'student',
    canActivate: [LoginGuard],
    component: UserDashboardComponent,
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