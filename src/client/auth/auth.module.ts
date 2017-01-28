import { NgModule } from '@angular/core';
import { RegisterComponent, RegisterFormComponent } from 'client/auth/register';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [RegisterComponent, RegisterFormComponent],
  exports: [RegisterComponent, RegisterFormComponent]
})

export class AuthModule { }