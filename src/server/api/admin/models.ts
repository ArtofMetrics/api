// External Dependencies

// AOM Dependencise

// AOM Types
import { AuthenticatedRequest } from '../models';
import { IUser, Role } from '../../dependencies/models/user/user.model';

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