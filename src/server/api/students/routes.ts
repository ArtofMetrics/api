// External Dependencies
import { Model } from 'mongoose';
import { Response } from 'express';
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Dependencies
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { findCourseBySlugOrThrow, findCourseByIdOrThrow, throwIfSubscribed } from './course-helpers';
import { SubscriptionService } from '../../dependencies/subscription';
import { PaymentService } from '../../dependencies/payment';

// AOM Interfaces
import { HTTPResponse } from '../models';
import {
  GetOneCourseRequest, GetOneCourseResponse,
  SubscribeToCourseRequest, SubscribeToCourseResponse,
} from './models';
import { IUser } from '../../dependencies/models/user/user.model';
import { Payment } from '../../dependencies/models/payment';

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
  $stripe, $subscription: SubscriptionService, $Payment: Model<any>, $payment: PaymentService) {
  return async (req: SubscribeToCourseRequest, res: Response) => {
    try {
      validateParams(req.body);

      const course = await findCourseByIdOrThrow({ $Course, courseId: req.params.identifier });
      await throwIfSubscribed({ $StudentCourse, user: req.user, courseId: course._id.toString() });

      const { cardDetails } = req.body;

      const sourceToken = cardDetails.id;
      const stripeCustomer = await getOrCreateCustomer({ token: sourceToken, user: req.user });

      console.log(`======= STRIPE CUSTOMER ========= `);
      console.log(stripeCustomer);
      if (!stripeCustomer) {
        throw new StandardError({
          error: `Could not create stripe customer`,
          readableError: `Could not create stripe customer`,
          code: status.INTERNAL_SERVER_ERROR
        });
      }

      let stripePayment;
      try {
        stripePayment = await $subscription.createSubscriptionPayment({
          course,
          token: cardDetails.id,
          user: req.user,
          customer: stripeCustomer
        });
      } catch (error) {
        await $Payment.create({
          status: 'FAILED',
          course: course._id,
          student: req.user._id,
          response: error,
        });

        throw new StandardError({ error, code: status.BAD_REQUEST });
      }

      const studentCourse = await $StudentCourse.create({
        course: course._id,

        data: course.data,

        subscription: {
          subscribed: true,
          costCents: course.subscription.costCents,
          length: course.subscription.length,
          currency: course.subscription.currency
        }
      });

      const payment: Payment = await $Payment.create({
        response: stripePayment,
        status: 'COMPLETED',
        course: course._id,
        student: req.user._id,
        studentCourse: studentCourse._id
      });

      const data: HTTPResponse<SubscribeToCourseResponse> = { data: { studentCourse } };
      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };

  /**
   * For the time being, users can only have one credit card on file
   */
  async function getOrCreateCustomer({ token, user }: { token: string, user: IUser }) {
    const existingCustomer = await $payment.getCustomer({ user });
    if (existingCustomer) {
      return await $payment.updateCustomerSource({ user, newSource: token });
    } else {
      return await $payment.createCustomer({ user, source: token });
    }
  }
}

function validateParams({ cardDetails }: { cardDetails: string }) {
  if (!cardDetails) {
    throw new StandardError({
      error: `Token is required to subscribe to course`,
      readableError: `Token is required to subscribe to course`,
      code: status.BAD_REQUEST
    });
  }
}
