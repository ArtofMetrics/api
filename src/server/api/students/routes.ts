// External Dependencies
import { Model } from 'mongoose';
import { Response } from 'express';
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Dependencies
import { CustomErrorService } from '../../dependencies/custom-error.service';

// AOM Interfaces
import { HTTPResponse } from '../models';
import { GetOneCourseRequest, GetOneCourseResponse } from './models';

export function getOneCourse($customError: CustomErrorService, $StudentCourse: Model<any>, $Course: Model<any>, $User: Model<any>) {
  return async (req: GetOneCourseRequest, res: Response) => {
    try {
      const options = {
        populate: { path: 'instructors', model: $User },
        lean: true,
        skipVisibility: false
      };

      let course = await $StudentCourse
        .findOne({ slug: req.params.slug })
        .setOptions(options);

      if (!course) {
        course = await $Course.findOne({ 
          $or: [
            { slug: req.params.slug },
            { 'internal.previousSlugs': req.params.slug }
          ]
        })
        .setOptions(options);
      }

      console.log('course', course);

      if (!course) {
        throw new StandardError(`Could not find course with slug ${req.params.slug}`, { code: status.NOT_FOUND });
      }

      const data: HTTPResponse<GetOneCourseResponse> = { data: { course } };
      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}