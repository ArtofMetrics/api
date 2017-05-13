// External Dependencies
import { Model } from 'mongoose';
import { Response } from 'express';
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Dependencies
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { findCourseBySlugOrThrow, findCourseByIdOrThrow, throwIfSubscribed } from './course-helpers';
import { SubscriptionService } from '../../dependencies/subscription';

// AOM Interfaces
import { HTTPResponse } from '../models';
import {
  GetOneCourseRequest, GetOneCourseResponse,
  SubscribeToCourseRequest, SubscribeToCourseResponse,
} from './models';
import { IUser } from '../../dependencies/models/user/user.model';

export function getOneCourse($customError: CustomErrorService, $StudentCourse: Model<any>, $Course: Model<any>, $User: Model<any>) {
  return async (req: GetOneCourseRequest, res: Response) => {
    try {
      const options = {
        populate: { path: 'instructors', model: $User },
        lean: true,
        skipVisibility: false
      };

      let course = await $StudentCourse
        .findOne({ slug: req.params.identifier })
        .setOptions(options);

      if (!course) {
        course = await $Course.findOne({
          $or: [
            { slug: req.params.identifier },
            { 'internal.previousSlugs': req.params.identifier }
          ]
        }).setOptions(options);
      }

      if (!course) {
        throw new StandardError(`Could not find course with slug ${req.params.identifier}`, { code: status.NOT_FOUND });
      }

      const data: HTTPResponse<GetOneCourseResponse> = { data: { course } };
      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function subscribeToCourse($Course: Model<any>, $StudentCourse: Model<any>, $customError: CustomErrorService,
  $stripe, $subscription: SubscriptionService, $Payment: Model<any> ) {
  return async (req: SubscribeToCourseRequest, res: Response) => {
    try {
      validateParams(req.body);

      const course = await findCourseByIdOrThrow({ $Course, courseId: req.params.identifier });
      await throwIfSubscribed({ $StudentCourse, user: req.user, courseId: course._id.toString() });

      const { token } = req.body;

      const payment = await $subscription.createSubscriptionPayment({
        course,
        token,
        user: req.user
      });



      const data: HTTPResponse<SubscribeToCourseResponse> = { data: { } };
      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

function validateParams({ token }: { token: string }) {
  if (!token) {
    throw new StandardError({
      error: `Token is required to subscribe to course`,
      readableError: `Token is required to subscribe to course`,
      code: status.BAD_REQUEST
    });
  }
}
