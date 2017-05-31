// External Dependencies
import { Response } from 'express';
import { Model } from 'mongoose';

// AOM Dependencies
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { IUser } from '../../dependencies/models/user/user.model';

// AOM Types
import { HTTPResponse } from '../models';
import {
  GetUsersRequest, GetUsersResponse
} from './models';

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