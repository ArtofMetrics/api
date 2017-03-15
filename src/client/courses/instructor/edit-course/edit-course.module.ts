// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Components
import { EditCourseComponent } from './edit-course.component';
import { EditModuleComponent } from './edit-module.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [EditCourseComponent, EditModuleComponent],
  exports: [EditCourseComponent]
})

export class EditCourseModule {}