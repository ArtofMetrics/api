// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Modules
import { SharedCourseModule } from 'client/courses/shared/shared.module';

// AOM Components
import { EditCourseComponent } from './edit-course.component';
import { ModuleRowComponent } from './module-row.component';
import { EditCourseService } from './edit-course.service';
import { EditPriceComponent } from './edit-price.component';
import { ToggleCourseVisibilityComponent } from './toggle-course-visibility.component';
import { EditDifficultyComponent } from './edit-difficulty.component';
import { EditTimeToCompleteComponent } from './edit-time-to-complete.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedCourseModule],
  declarations: [
    EditCourseComponent,
    ModuleRowComponent, 
    EditPriceComponent, 
    ToggleCourseVisibilityComponent,
    EditDifficultyComponent,
    EditTimeToCompleteComponent],
  providers: [EditCourseService],
  exports: [EditCourseComponent, EditPriceComponent]
})

export class EditCourseModule { }
