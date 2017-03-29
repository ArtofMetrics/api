// NPM Deps
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Our Deps
import { CourseViewComponent } from 'client/courses/course-view.component';
import { CreateCourseComponent } from 'client/courses/instructor/create-course';
import { EditCourseComponent } from 'client/courses/instructor/edit-course/edit-course.component';
import { EditModuleComponent } from 'client/courses/instructor/edit-module/edit-module.component';

const coursesRoutes: Routes = [
  {
    path: 'course',
    children: [
      {
        path: 'new',
        component: CreateCourseComponent
      },
      {
        path: ':slug',
        component: CourseViewComponent
      },
      {
        path: ':slug/edit',
        component: EditCourseComponent
      },
      {
        path: ':slug/module/:module/edit',
        component: EditModuleComponent
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