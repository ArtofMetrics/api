// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Dependencies
import { TakeCourseComponent } from './take-course.component';
import { BeginCourseComponent } from './begin-course.component';
import { ContinueCourseComponent } from './continue-course.component';

// AOM interfaces

@NgModule({
  imports: [CommonModule],
  declarations: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent],
  exports: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent],
})

export class TakeCourseModule {}