// External Deps
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// AOM Deps
import { InstructorDashboardComponent, InstructorDescriptionComponent, InstructorCourseService } from './instructor';
import { StudentDashboardComponent, StudentDescriptionComponent } from './student';
import { UserDashboardComponent } from './user-dashboard.component';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [
    UserDashboardComponent, 
    StudentDashboardComponent, 
    StudentDescriptionComponent, 
    InstructorDashboardComponent,
    InstructorDescriptionComponent],
  providers: [InstructorCourseService],
  exports: [UserDashboardComponent]
})

export class DashboardModule {}