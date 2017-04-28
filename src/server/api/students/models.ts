// External Dependencies

// AOM Dependencies
import { AuthenticatedRequest } from '../models';

// Get one student course
export interface GetOneCourseRequest extends AuthenticatedRequest {
  params: { slug: string };
}

export interface GetOneCourseResponse {
  course: any;
}