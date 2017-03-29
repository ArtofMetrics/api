// External Deps
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// AOM Modules
import { EditCourseModule} from './edit-course/edit-course.module';
import { EditModuleModule } from './edit-module/edit-module.module';

// AOM Components
import { CreateCourseFormComponent, CreateCourseComponent } from './create-course';

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [EditCourseModule, EditModuleModule],
  declarations: [CreateCourseFormComponent, CreateCourseComponent]
})

export class InstructorCourseModule {}