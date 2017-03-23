// External Deps
import { AuthenticatedRequest } from '../../models';

// AOM Deps
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