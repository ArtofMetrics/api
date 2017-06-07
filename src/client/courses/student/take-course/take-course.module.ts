// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// AOM Dependencies
import { SidebarModule } from 'client/sidebar/sidebar.module';
import { SharedCourseModule } from 'client/courses/shared/shared.module';
import { TakeModuleModule } from './take-module/take-module.module';
import { StudentCourseHeaderComponent } from './student-course-header.component';
import { TakeCourseComponent } from './take-course.component';
import { BeginCourseComponent } from './begin-course.component';
import { ContinueCourseComponent } from './continue-course.component';
import { FinishCourseComponent } from './finish-course.component';

// AOM interfaces

@NgModule({
  imports: [CommonModule, TakeModuleModule, SharedCourseModule, SidebarModule],
  declarations: [
    BeginCourseComponent,
    TakeCourseComponent,
    ContinueCourseComponent, 
    StudentCourseHeaderComponent,
    FinishCourseComponent],
  exports: [BeginCourseComponent, TakeCourseComponent, ContinueCourseComponent, FinishCourseComponent],
})

export class TakeCourseModule { }
