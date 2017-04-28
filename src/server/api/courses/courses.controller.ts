// NPM Deps
import * as express from 'express';
import * as StandardError from 'standard-error';
import * as kebabCase from 'lodash/kebabCase';
import * as some from 'lodash/some';
import * as status from 'http-status';
import { Model } from 'mongoose';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { isInstructor, isInstructorOfCourse } from '../utils';
import { findCourseOrThrow, createSlug } from './helpers';

// AOM models
import { HTTPResponse } from '../models';
import {
  CreateCourseRequest,
  CreateCourseResponse, 
  GetOneCourseResponse
} from './models';

export function getCourses($customError: CustomErrorService, $Course) {
  return async (req, res: express.Response) => {

    const SAMPLE_URL = 'http://lorempixel.com/400/200';
    try {
      const courses = [
        new $Course({
          slug: 'course-1',
          data: { title: 'Course 1', description: 'Random Description 1', category: 'Econ', photos: [{ url: SAMPLE_URL, isCover: true }] },
        }),
        new $Course({
          slug: 'course-2',
          data: { title: 'Course 2', description: 'Random Description 2', category: 'R', photos: [{ url: SAMPLE_URL, isCover: true }] }
        }),
        new $Course({
          slug: 'course-3',
          data: { title: 'Course 3', description: 'Random Description 3', category: 'R', photos: [{ url: SAMPLE_URL, isCover: true }] }
        })
      ];

      res.json({ data: { courses } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function createCourse($customError: CustomErrorService, $Course) {
  return async (req: CreateCourseRequest, res: express.Response) => {
    try {
      const { course } = req.body;
      if (!course) {
        throw new StandardError(`Course data is required to create new course`);
      }

      const data = req.body.course.data;
      let newCourse = {
        data,
        slug: await createSlug(data.name.toLowerCase(), $Course),
        admin: { readableId: (await $Course.count()) + 1 },
        instructors: [req.user._id]
      };

      const doc = await $Course.create(newCourse);

      const responseBody: CreateCourseResponse = { course: doc.toObject({ virtuals: false }) };
      return res.json({ data: responseBody });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function getOneCourse($customError: CustomErrorService, $Course: Model<any>, $StudentCourse) {
  return async (req, res: express.Response) => {
    try {
      const options = { skipVisibility: isInstructor(req.user) }

      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, options });

      const responseBody: HTTPResponse<GetOneCourseResponse> = { data: { course } };
      return res.json(responseBody);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}