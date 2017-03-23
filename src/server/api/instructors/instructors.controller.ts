// External Deps
import { Response } from 'express';
import { Model } from 'mongoose';
import * as status from 'http-status';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';

// AOM Models
import { Course } from 'dependencies/models/course';
import { HTTPResponse } from '../models';
import { 
  GetCoursesResponse, 
  GetCoursesRequest, 
  GetOneCourseRequest, 
  GetOneCourseResponse } from './models';

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

export function getOneCourse($customError: CustomErrorService, $Course: Model<any>) {
  return async (req: GetOneCourseRequest, res) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      const data: HTTPResponse<GetOneCourseResponse> = { data: { course } };

      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

async function findCourseOrThrow({ $Course, slug, $customError, options }: { $Course: Model<any>, slug: string, $customError: CustomErrorService, options?: any }) {
  const course = await $Course
    .findOne({ slug })
    .setOptions(options ? options : { skipVisibility: true });
  if (!course) {
    $customError.defaultError({
      error: `Could not find course with slug ${ slug }`,
      code: status.NOT_FOUND
    });
  }

  return course;
}