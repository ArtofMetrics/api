// External Deps
import { AuthenticatedRequest } from '../../models';

// AOM Deps
import { Course } from '../../../dependencies/models/course';
import { CourseModule } from '../../../dependencies/models/module';

// AOM Interfaces

export interface NewCourse extends CourseModule {
  $isNew: boolean;
}

export interface AddModuleRequestBody {
  module: NewCourse;
}

export interface AddModuleRequest extends AuthenticatedRequest {
  body: AddModuleRequestBody;
}

export interface AddModuleResponse {
  course: Course;
}

// Get one Module Response

export interface GetOneModuleRequest extends AuthenticatedRequest {
  params: {
    slug: string;
    module: string;
  };
}

export interface GetOneModuleResponse {
  course: any;
  module: any;
}