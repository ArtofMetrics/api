// External Deps
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// AOM Deps
import { CreateCourseFormComponent, CreateCourseComponent } from './create-course';
import { EditCourseComponent } from './edit-course';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [CreateCourseFormComponent, CreateCourseComponent, EditCourseComponent]
})

export class InstructorCourseModule {}