// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Dependencies
import ProfileComponent from './profile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})

export class ProfileModule { }