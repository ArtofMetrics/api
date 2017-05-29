// NPM Deps
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Our Deps
import { CourseViewComponent } from 'client/courses/course-view.component';
import { CreateCourseComponent } from 'client/courses/instructor/create-course';
import { EditCourseComponent } from 'client/courses/instructor/edit-course/edit-course.component';
import { EditModuleComponent } from 'client/courses/instructor/edit-module/edit-module.component';
import { EditLessonComponent } from 'client/courses/instructor/edit-lesson/edit-lesson.component';
import { FinishCourseComponent } from 'client/courses/student/take-course/finish-course.component';

// Our Guards
import { LoginGuard } from 'client/auth/auth-guard.service';

const coursesRoutes: Routes = [
  {
    path: 'course',
    children: [
      {
        path: 'new',
        canActivate: [LoginGuard],
        component: CreateCourseComponent
      },
      {
        path: ':slug',
        component: CourseViewComponent
      },
      {
        path: ':slug/finish',
        component: FinishCourseComponent
      },
      {
        path: ':slug/edit',
        canActivate: [LoginGuard],
        component: EditCourseComponent
      },
      {
        path: ':slug/module/:module/edit',
        canActivate: [LoginGuard],
        component: EditModuleComponent
      },
      {
        path: ':slug/module/:module/lesson/:lesson/edit',
        canActivate: [LoginGuard],
        component: EditLessonComponent
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