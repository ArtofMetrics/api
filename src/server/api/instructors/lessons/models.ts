import { AuthenticatedRequest } from '../../models';

interface Params {
  module: string;
  lesson: string;
  slug: string;
}

interface DripParams extends Params {
  drip: string;
}
// Get One Lesson
export interface GetOneLessonQuery {
  language: string;
}

export interface GetOneLessonRequest extends AuthenticatedRequest {
  query: GetOneLessonQuery;
  params: Params;
};

export interface GetOneLessonResponse {
  lesson: any;
  language: string;
}

// Add Drip
export interface AddDripRequestBody {
  language: string;
}

export interface AddDripRequest extends AuthenticatedRequest{
  body: AddDripRequestBody;
  params: DripParams;
}

export interface AddDripResponse {
  drips: any[];
  language: string;
}

// Update Drip
export interface UpdateDripRequestBody {
  language: string;
  drip: any;
}

export interface UpdateDripRequest extends AuthenticatedRequest {
  body: UpdateDripRequestBody;
  params: DripParams;
}

export interface UpdateDripResponse {
  drip: any;
  language: string;
}