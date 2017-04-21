// External Deps
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Deps
import { EditModuleComponent } from './edit-module.component';

@NgModule({
  imports: [CommonModule],
  exports: [EditModuleComponent],
  declarations: [EditModuleComponent]
})

export class EditModuleModule { }