// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Dependencies
import { SharedCourseModule } from 'client/courses/shared/shared.module';
import { TakeModuleModule } from './take-module/take-module.module';
import { StudentCourseHeaderComponent } from './student-course-header.component';
import { TakeCourseComponent } from './take-course.component';
import { BeginCourseComponent } from './begin-course.component';
import { ContinueCourseComponent } from './continue-course.component';

// AOM interfaces

@NgModule({
  imports: [CommonModule, TakeModuleModule, SharedCourseModule],
  declarations: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent, StudentCourseHeaderComponent],
  exports: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent],
})

export class TakeCourseModule {}
