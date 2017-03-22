// External Deps
import { Response } from 'express';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';
// AOM Models
import { HTTPResponse } from '../models';

export function getCourses($customError: CustomErrorService, $Course) {
  return async (req, res: Response) => {
    try { 
      const courses = await $Course
        .find({ instructors: req.user._id });

      return res.json({ data: { courses } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}