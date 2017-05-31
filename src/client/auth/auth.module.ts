// External Deps
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// AOM Deps

// Module Deps
import { RegisterComponent, RegisterFormComponent } from 'client/auth/register';
import { LoginComponent, LoginFormComponent} from 'client/auth/login';
import { LoginGuard } from './auth-guard.service';
import { AdminGuard } from './admin-guard.service';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [RegisterComponent, RegisterFormComponent, LoginComponent, LoginFormComponent],
  providers: [LoginGuard, AdminGuard],
  exports: [RegisterComponent, RegisterFormComponent, LoginComponent, LoginFormComponent]
})

export class AuthModule { }