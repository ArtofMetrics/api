// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AOM Dependencies
import CoreModule from 'client/core/core.module';
import ProfileComponent from './profile.component';

@NgModule({
  imports: [CommonModule, RouterModule, CoreModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})

export class ProfileModule { }