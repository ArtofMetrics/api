// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Components
import { EditCourseComponent } from './edit-course.component';
import { ModuleRowComponent } from './module-row.component';
import { EditCourseService } from './edit-course.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [EditCourseComponent, ModuleRowComponent],
  providers: [EditCourseService],
  exports: [EditCourseComponent]
})

export class EditCourseModule {}