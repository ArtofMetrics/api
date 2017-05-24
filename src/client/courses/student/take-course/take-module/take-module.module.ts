// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Dependencies
import { ActiveModuleComponent } from './active-module.component';
import { TakeDripComponent } from './take-drip.component';

// AOM Interfaces


@NgModule({
  imports: [CommonModule],
  declarations: [ActiveModuleComponent, TakeDripComponent],
  exports: [ActiveModuleComponent],
})

export class TakeModuleModule {}
