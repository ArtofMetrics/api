// External Deps
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Deps
import { SharedCourseModule } from '../../shared/shared.module';
import { EditLessonComponent } from './edit-lesson.component';
import { EditDripComponent } from './edit-drip.component';
import { DripTextEditor } from './drip-text-editor.directive';
import { EditDripService } from './edit-drip.service';

@NgModule({
  imports: [CommonModule, FormsModule, SharedCourseModule],
  declarations: [EditLessonComponent, EditDripComponent, DripTextEditor],
  providers: [EditDripService],
  exports: [EditLessonComponent, DripTextEditor]
})

export class EditLessonModule {

}
