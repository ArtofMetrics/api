// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AOM Dependencies
import { SidebarModule } from 'client/sidebar/sidebar.module';
import { SharedCourseModule } from 'client/courses/shared/shared.module';
import { TakeModuleModule } from './take-module/take-module.module';
import { StudentCourseHeaderComponent } from './student-course-header.component';
import { TakeCourseComponent } from './take-course.component';
import { BeginCourseComponent } from './begin-course.component';
import { ContinueCourseComponent } from './continue-course.component';
import { FinishCourseComponent } from './finish-course.component';
import { CourseExpirationComponent } from './course-expiration.component';
import { ResubscribeCourseComponent } from './resubscribe-course.component';

// AOM interfaces

@NgModule({
  imports: [CommonModule, TakeModuleModule, SharedCourseModule, SidebarModule, RouterModule],
  declarations: [
    BeginCourseComponent,
    TakeCourseComponent,
    ContinueCourseComponent, 
    StudentCourseHeaderComponent,
    FinishCourseComponent,
    CourseExpirationComponent,
    ResubscribeCourseComponent],
  exports: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent, FinishCourseComponent],
})

export class TakeCourseModule { }
