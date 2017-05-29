// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AOM Dependencies
import ProfileComponent from './profile.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})

export class ProfileModule { }