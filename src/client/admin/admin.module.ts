// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Dependencies
import { UsersDashboardService, UsersDashboardComponent } from './users-dashboard';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminApiService } from './admin-api/admin-api.service';
import { CouponsDashboardModule } from './coupons-dashboard/coupons-dashboard.module';

// AOM Interfaces

@NgModule({
  imports: [AdminRoutingModule, CommonModule, FormsModule, CouponsDashboardModule],
  providers: [UsersDashboardService, AdminApiService],
  declarations: [UsersDashboardComponent],
  exports: [AdminRoutingModule]
})

export class AdminModule {}
