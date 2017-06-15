// External Dependencies

// AOM Dependencise

// AOM Types
import { AuthenticatedRequest } from '../models';
import { IUser, Role } from '../../dependencies/models/user/user.model';
import { Coupon } from '../../dependencies/models/coupon';

// Get Users

export interface GetUsersRequest extends AuthenticatedRequest { }

export interface GetUsersResponse {
  users: IUser[];
}

// Edit Role

export interface EditRoleRequestBody {
  role?: Role;
  remove?: boolean;
}

export interface EditRoleRequest extends AuthenticatedRequest {
  body: EditRoleRequestBody;
  params: { id: string };
}

export interface EditRoleResponse {
  
}

// Get Coupons

export interface GetCouponsRequest extends AuthenticatedRequest {

}

export interface GetCouponsResponse {
  coupons: Coupon[];
}

// CreateCoupon

export interface CreateCouponRequestBody {
  coupon: Coupon;
}
export interface CreateCouponRequest extends AuthenticatedRequest {
  body: CreateCouponRequestBody;
}

export interface CreateCouponResponse {
  coupon: Coupon;
}