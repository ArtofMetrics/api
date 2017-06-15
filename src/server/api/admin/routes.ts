// External Dependencies
import { Response } from 'express';
import { Model } from 'mongoose';

// AOM Dependencies
import { CustomErrorService } from 'dependencies/custom-error.service';
import { IUser } from 'dependencies/models/user/user.model';

// AOM Types
import { HTTPResponse } from '../models';
import {
  GetUsersRequest, GetUsersResponse,
  EditRoleRequest, EditRoleResponse,
  GetCouponsRequest, GetCouponsResponse,
  CreateCouponRequest, CreateCouponResponse
} from './models';
import { CouponModel } from 'dependencies/models/coupon';

export function getUsers($customError: CustomErrorService, $User: Model<any>) {
  return async (req, res: Response) => {
    try {
      const users = await $User.find();

      const data: HTTPResponse<GetUsersResponse> = { data: { users } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function editRole($customError: CustomErrorService, $User: Model<any>) {
  return async (req: EditRoleRequest, res: Response) => {
    try {
      const { role, remove } = req.body;
      if (!role) {
        await $User.findByIdAndUpdate(req.params.id, {
          roles: []
        });
      } else {
        await $User.findByIdAndUpdate(req.params.id, {
          [remove ? '$pull' : '$addToSet']: { roles: role }
        });
      }

      const data: HTTPResponse<EditRoleResponse> = { data: { } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function getCoupons($customError: CustomErrorService, $Coupon: CouponModel) {
  return async (req: GetCouponsRequest, res: Response) => {
    try {
      const coupons = await $Coupon.find();
      const data: HTTPResponse<GetCouponsResponse> = { data: { coupons } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function createCoupon($customError: CustomErrorService, $Coupon: CouponModel) {
  return async (req: CreateCouponRequest, res: Response) => {
    try {
      const coupon = await $Coupon.create(req.body.coupon);
      const data: HTTPResponse<CreateCouponResponse> = { data: { coupon } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}