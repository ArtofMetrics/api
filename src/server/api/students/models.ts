// External Dependencies

// AOM Dependencies
import { AuthenticatedRequest } from '../models';
import { StudentCourse } from '../../dependencies/models/course/student-course';

// Get one student course
export interface GetOneCourseRequest extends AuthenticatedRequest {
  params: { identifier: string };
}

export interface GetOneCourseResponse {
  course: any;
}

// Subscribe to course
export interface SubscribeToCourseRequestBody {
  cardDetails: any;
}

export interface SubscribeToCourseRequest extends AuthenticatedRequest {
  params: { identifier: string };
  body: SubscribeToCourseRequestBody
}

export interface SubscribeToCourseResponse {
  studentCourse: StudentCourse;
}
