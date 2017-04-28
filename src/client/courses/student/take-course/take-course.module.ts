// External Dependencies
import { NgModule } from '@angular/core';

// AOM Dependencies
import { TakeCourseComponent } from './take-course.component';
import { BeginCourseComponent } from './begin-course.component';
import { ContinueCourseComponent } from './continue-course.component';

// AOM interfaces

@NgModule({
  declarations: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent],
  exports: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent],
})

export class TakeCourseModule {}