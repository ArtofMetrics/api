// NPM Deps
import { NgModule } from '@angular/core';

// Our Deps

// Module Deps
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  exports: [LoginComponent, LoginFormComponent],
})

export class LoginModule {

}