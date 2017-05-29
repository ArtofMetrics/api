// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Dependencies
import { ActiveModuleComponent } from './active-module.component';
import { TakeDripComponent } from './take-drip.component';
import { SharedCourseModule } from '../../../shared/shared.module';

// AOM Interfaces


@NgModule({
  imports: [CommonModule, SharedCourseModule, FormsModule],
  declarations: [ActiveModuleComponent, TakeDripComponent],
  exports: [ActiveModuleComponent],
})

export class TakeModuleModule {}
