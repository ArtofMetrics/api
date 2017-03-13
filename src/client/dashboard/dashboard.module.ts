// External Deps
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// AOM Deps
import { InstructorDashboardComponent } from './instructor';
import { StudentDashboardComponent, StudentDescriptionComponent } from './student';
import { UserDashboardComponent } from './user-dashboard.component';

@NgModule({
  imports: [RouterModule],
  declarations: [UserDashboardComponent, StudentDashboardComponent, StudentDescriptionComponent, InstructorDashboardComponent],
  exports: [UserDashboardComponent]
})

export class DashboardModule {}