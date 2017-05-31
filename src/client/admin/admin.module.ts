// External Dependencies
import { NgModule } from '@angular/core';

// AOM Dependencies
import { UsersDashboardService, UsersDashboardComponent } from './users-dashboard';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminApiService } from './admin-api/admin-api.service';

// AOM Interfaces

@NgModule({
  imports: [AdminRoutingModule],
  providers: [UsersDashboardService, AdminApiService],
  declarations: [UsersDashboardComponent],
  exports: [AdminRoutingModule]
})

export class AdminModule {}
