// NPM Deps
import { Request } from 'express';

// AOM Deps
import { RequestUser } from './request-user.model';

export interface AuthenticatedRequest extends Request {
  headers: {
    authorization: string;
  }

  user?: RequestUser
}