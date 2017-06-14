// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// AOM Dependencies
import { CouponsDashboardComponent } from './coupons-dashboard.component';

// AOM Types

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CouponsDashboardComponent],
  exports: [CouponsDashboardComponent]
})

export class CouponsDashboardModule { }