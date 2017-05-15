// External Dependencies
import { NgModule } from '@angular/core';

// AOM Dependencies
import { UsersDashboardService, UsersDashboardComponent } from './users-dashboard';

// AOM Interfaces

@NgModule({
  providers: [UsersDashboardService],
  declarations: [UsersDashboardComponent],
})

export class AdminModule {}
