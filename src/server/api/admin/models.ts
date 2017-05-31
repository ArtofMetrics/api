// External Dependencies

// AOM Dependencise

// AOM Types
import { AuthenticatedRequest } from '../models';
import { IUser } from '../../dependencies/models/user/user.model';

// Get Users

export interface GetUsersRequest extends AuthenticatedRequest { }

export interface GetUsersResponse {
  users: IUser[];
}