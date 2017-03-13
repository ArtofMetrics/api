import { AuthenticatedRequest } from '../interfaces/authenticated-request.model';

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