// External Deps
import { AuthenticatedRequest } from '../../models';

// AOM Deps
import { Course } from '../../../dependencies/models/course/course';
import { CourseModule } from '../../../dependencies/models/module';

// AOM Interfaces

export interface NewCourse extends CourseModule {
  $isNew: boolean;
}

export interface AddModuleRequestBody {
  module: NewCourse;
  language: string;
}

export interface AddModuleRequest extends AuthenticatedRequest {
  body: AddModuleRequestBody;
}

export interface AddModuleResponse {
  course: Course;
  language: string;
}

// Get one Module Response

export interface GetOneModuleQuery {
  language: string;
}

export interface GetOneModuleRequest extends AuthenticatedRequest {
  params: {
    slug: string;
    module: string;
  };

  query: GetOneModuleQuery;
}

export interface GetOneModuleResponse {
  course: any;
  module: any;
}

// Delete module
export interface DeleteModuleParams {
  slug: string;
  module: string;
  language: string;
}

export interface DeleteModuleRequest extends AuthenticatedRequest {
  params: DeleteModuleParams;
}

export interface DeleteModuleResponse {
  course: Course;
  language: string;
}

// Add new Lesson

export interface AddNewLessonRequestBody {
  language: string;
  lesson: any;
}

export interface AddNewLessonRequest extends AuthenticatedRequest {
  body: AddNewLessonRequestBody;
  query: null;
}

export interface AddNewLessonResponse {
  lessons: any[];
  language: string;
}
