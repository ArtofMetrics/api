// NPM Deps
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// AOM Deps
import { AdminGuard } from 'client/auth/admin-guard.service';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { CouponsDashboardComponent } from './coupons-dashboard/coupons-dashboard.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersDashboardComponent
      },
      {
        path: 'coupons',
        canActivate: [AdminGuard],
        component: CouponsDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule {}