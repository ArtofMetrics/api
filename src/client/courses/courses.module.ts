import { NgModule } from '@angular/core';

// AOM Deps
import { CoursesRoutingModule } from 'client/courses/courses-routing.module';
import { CourseViewComponent } from 'client/courses/course-view.component';

@NgModule({

  imports: [CoursesRoutingModule],
  declarations: [CourseViewComponent],
  exports: [CoursesRoutingModule]
})

export class CoursesModule { }