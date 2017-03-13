import { AuthenticatedRequest } from '../interfaces/authenticated-request.model';

// Create Course models
export interface CreateCourseData {
  course: {
    data: {
      name: string;
    }
  }
}

export interface CreateCourseRequest extends AuthenticatedRequest {
  body: CreateCourseData;
}

export interface CreateCourseResponse {
  course: any;
}

// Get one course models
export interface GetOneCourseResponse {
  course: any;
}
