// External Deps

// AOM interfaces
import { AuthenticatedRequest } from '../models';

export interface GetCoursesRequest extends AuthenticatedRequest {
}

export interface GetCoursesResponse {
  courses: any[];
}