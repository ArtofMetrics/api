import { Request } from 'express';

export interface HTTPResponse<T> {
  data: T
}

export interface AuthenticatedRequest extends Request {
  user: any;
}