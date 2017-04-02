// External Deps
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Deps
import { EditLessonComponent } from './edit-lesson.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EditLessonComponent],
  exports: [EditLessonComponent]
})

export class EditLessonModule {
  
}