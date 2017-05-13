// External Deps
import { Response } from 'express';
import { Model } from 'mongoose';
import * as status from 'http-status';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { findCourseOrThrow } from './find-helpers';

// AOM Models
import { Course } from 'dependencies/models/course/course';
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
