// External Dependencies
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// AOM Dependencies
import { ViewReadyService } from 'client/shared/view-ready.service';
import { ApiService } from 'client/core/api/api.service';
import { AdminApiService } from 'client/admin/admin-api/admin-api.service';
import { ErrorService } from 'client/core/error.service';

// AOM Types
import { Coupon, couponSchema } from 'server/dependencies/models/coupon';

@Component({
  selector: 'coupons-dashboard',
  templateUrl: './coupons-dashboard.component.jade'
})

export class CouponsDashboardComponent implements OnInit {
  coupons: Coupon[];
  coupon: Coupon;
  state: { creatingCoupon: boolean } = { creatingCoupon: false };
  
  constructor(
    private viewState: ViewReadyService,
    private apiService: ApiService,
    private adminApiService: AdminApiService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.adminApiService.coupons.getCoupons()
      .subscribe(
        data => {
          this.coupons = data.coupons;
          this.viewState.emitFinished();
        },
        error => this.handleHttpError(error)
      );
  }

  handleHttpError = (error: Error) => {
    this.errorService.handleHttpError(error);
  };

  startCreateCoupon = () => {
    this.coupon = new mongoose.Document({ forever: false, startDate: Date.now() }, couponSchema);
    this.state.creatingCoupon = true;
    $('#startDatePicker').pickadate({ selectMonths: true, selectYears: 15 });
    $('#endDatePicker').pickadate({ selectMonths: true, selectYears: 15 });
  }

  setStartDate = (date: string) => {
    this.coupon.startDate = moment(date).toDate();
  }

  setEndDate = (date: string) => {
    this.coupon.endDate = moment(date).toDate();
  }

  setForever = () => {
    this.coupon.forever = !this.coupon.forever;
    if (this.coupon.forever) {
      this.coupon.startDate = null;
      this.coupon.endDate = null;
    }
  }

  showDate = (coupon: Coupon, date?: Date) => {
    return coupon.forever ? `Lasts Forever` : moment(date).format('MMMM Do, YYYY');
  }
  createCoupon = () => {
    this.adminApiService.coupons
      .createCoupon({ coupon: this.coupon })
      .subscribe(
        data => {
          this.coupons.push(data.coupon);
          this.state.creatingCoupon = false;
        },
        error => this.handleHttpError(error)
      );

  }
}