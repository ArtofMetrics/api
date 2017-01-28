// NPM Deps
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Our Deps
import { CourseViewComponent } from 'client/courses/course-view.component';

const coursesRoutes: Routes = [
  {
    path: 'course',
    children: [
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