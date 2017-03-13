// External Deps
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// AOM Deps
import { CreateCourseFormComponent, CreateCourseComponent } from './create-course';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [CreateCourseFormComponent, CreateCourseComponent]
})

export class InstructorCourseModule {}