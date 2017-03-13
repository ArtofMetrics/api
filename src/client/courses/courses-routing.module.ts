// NPM Deps
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Our Deps
import { CourseViewComponent } from 'client/courses/course-view.component';
import { CreateCourseComponent } from 'client/courses/instructor/create-course';
const coursesRoutes: Routes = [
  {
    path: 'course',
    children: [
      {
        path: 'new',
        component: CreateCourseComponent
      },
      {
        path: ':id',
        component: CourseViewComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(coursesRoutes)
  ],
  exports: [RouterModule]
})

export class CoursesRoutingModule { }