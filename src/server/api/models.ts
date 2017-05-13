// External Dependencies
import { Request } from 'express';

// AOM Dependencies

// AOM interfaces
import { IUser } from '../dependencies/models/user/user.model';

export interface HTTPResponse<T> {
  data: T
}

export interface AuthenticatedRequest extends Request {
  user: IUser;
}
