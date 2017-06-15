// External Dependencies
import { Observable } from 'rxjs/Observable';

// AOM Dependencies
import { AomHTTPService } from 'client/core/aom-http.service';

// AOM Types
import { GetCouponsResponse, CreateCouponRequestBody, CreateCouponResponse } from 'server/api/admin/models';
import { Coupon } from 'server/dependencies/models/coupon';

export const couponsApi = (API_ROOT: string, http: AomHTTPService) => {

  const BASE_URL = `${ API_ROOT }/coupons`;

  return {
    getCoupons(): Observable<GetCouponsResponse> {
      return http.get(BASE_URL);
    },
    createCoupon({ coupon }: { coupon: Coupon }): Observable<CreateCouponResponse> {
      const data: CreateCouponRequestBody = { coupon };
      return http.post(BASE_URL, data);
    }
  }
};