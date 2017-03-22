// External Deps
import { Response } from 'express';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';
// AOM Models
import { HTTPResponse } from '../models';
import { GetCoursesResponse, GetCoursesRequest } from './models';

export function getCourses($customError: CustomErrorService, $Course) {
  return async (req: GetCoursesRequest, res: Response) => {
    try { 
      const courses = await $Course
        .find({ instructors: req.user._id });
      
      const data: HTTPResponse<GetCoursesResponse> = { data: { courses } };

      return res.json({ data: { courses } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}