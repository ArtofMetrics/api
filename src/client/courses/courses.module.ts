import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Deps
import { InstructorCourseModule } from 'client/courses/instructor/instructor-course.module';
import { StudentCourseModule } from 'client/courses/student/student-course.module';
import { CoursesRoutingModule } from 'client/courses/courses-routing.module';
import { CourseViewComponent } from 'client/courses/course-view.component';

@NgModule({
  imports: [CoursesRoutingModule, InstructorCourseModule, StudentCourseModule, CommonModule],
  declarations: [CourseViewComponent],
  exports: [CoursesRoutingModule]
})

export class CoursesModule { }