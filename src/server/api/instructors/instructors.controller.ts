// External Deps
import { Response } from 'express';
import { Model } from 'mongoose';
import * as status from 'http-status';
import * as StandardError from 'standard-error';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { findCourseOrThrow } from './find-helpers';
import { checkAuthorizedInstructor } from './permissions-helpers';

// AOM Models
import { Course, CourseModel } from 'dependencies/models/course/course';
import { HTTPResponse } from '../models';
import {
  GetCoursesResponse, GetCoursesRequest,
  GetOneCourseRequest, GetOneCourseResponse,
  UpdateCourseRequest, UpdateCourseResponse,
  ChangeVisibilityRequest, ChangeVisibilityResponse
} from './models';

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
      checkAuthorizedInstructor({ course, user: req.user });

      const data: HTTPResponse<GetOneCourseResponse> = { data: { course } };

      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function updateCourse($customError: CustomErrorService, $Course: Model<any>, $docUpdate) {
  return async (req: UpdateCourseRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const { course: update } = req.body;

      $docUpdate(course, update, [/^subscription/, /^data\.description/]);

      await course.save();
      
      const data: HTTPResponse<UpdateCourseResponse> = { data: { course } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function changeVisibility($customError: CustomErrorService, $Course: CourseModel) {
  return async (req: ChangeVisibilityRequest, res: Response) => {
    try {
      const course: Course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      checkAuthorizedInstructor({ course, user: req.user });

      course.isVisible = !course.isVisible;
      try {
        await course.save();
      } catch (error) {
        throw new StandardError({
          error: `Course is not valid to be visible`,
          readableError: `Course is not valid to be visible`,
          code: status.BAD_REQUEST
        });
      }

      const data: HTTPResponse<ChangeVisibilityResponse> = { data: { visibility: course.isVisible } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

