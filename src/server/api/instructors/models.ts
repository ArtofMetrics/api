// External Deps
import { Course } from '../../dependencies/models/course/course';
// AOM interfaces
import { AuthenticatedRequest } from '../models';

// Params interface
export interface GetSpecificCourseParams {
  slug: string;
}

export interface GetSpecificCourseRequest extends AuthenticatedRequest {
  params: GetSpecificCourseParams;
}

// Get one course
export interface GetOneCourseRequestBody {
  
}

export interface GetOneCourseRequest extends GetSpecificCourseRequest{
  body: GetOneCourseRequestBody;
}

export interface GetOneCourseResponse {
  course: Course;
}

export interface GetCoursesRequest extends AuthenticatedRequest {
}

export interface GetCoursesResponse {
  courses: any[];
}