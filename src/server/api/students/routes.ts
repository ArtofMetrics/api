// External Dependencies
import { Model } from 'mongoose';
import { Response } from 'express';
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Dependencies
import { CustomErrorService } from '../../dependencies/custom-error.service';
import {
  findCourseBySlugOrThrow,
  findCourseByIdOrThrow,
  throwIfSubscribed,
  findStudentCourseByIdOrThrow
}
  from './course-helpers';
import { checkSubscribed } from './permission-helpers';

import { SubscriptionService } from '../../dependencies/subscription';
import { PaymentService } from '../../dependencies/payment';

// AOM Interfaces
import { HTTPResponse } from '../models';
import {
  GetOneCourseRequest, GetOneCourseResponse,
  SubscribeToCourseRequest, SubscribeToCourseResponse,
  SubmitDripRequest, SubmitDripResponse
} from './models';
import { StudentCourseModel, StudentCourse } from '../../dependencies/models/course/student-course';
import { IUser } from '../../dependencies/models/user/user.model';
import { Payment, PaymentModel } from '../../dependencies/models/payment';

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
        .setOptions(Object.assign({}, options, {
          populate: {
            path: 'course',
            model: $Course,
            options: { select: 'instructors' },
            populate: { path: 'instructors', model: $User, options: { select: 'profile' } }
          }
        }));

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

/**
 * Subscribes a user to a given course, creates a payment object and stores in db
 * with reference to the `studentCourse` and `course` objects
 */
export function subscribeToCourse($Course: Model<any>, $StudentCourse: StudentCourseModel, $customError: CustomErrorService,
  $stripe, $subscription: SubscriptionService, $Payment: PaymentModel, $payment: PaymentService, $User: Model<any>) {
  return async (req: SubscribeToCourseRequest, res: Response) => {
    try {
      validateParams(req.body);

      const course = await findCourseByIdOrThrow({ $Course, courseId: req.params.identifier });
      await throwIfSubscribed({ $StudentCourse, user: req.user, courseId: course._id.toString() });

      const { cardDetails } = req.body;

      const sourceToken = cardDetails.id;
      const { stripeCustomer, updatedUser } = await getOrCreateCustomer({ token: sourceToken, user: req.user });

      req.user = updatedUser ? updatedUser : req.user;
      if (!stripeCustomer) {
        throw new StandardError({
          error: `Could not create stripe customer`,
          readableError: `Could not create stripe customer`,
          code: status.INTERNAL_SERVER_ERROR
        });
      }

      let stripePayment;
      try {
        stripePayment = await $subscription
          .createSubscriptionPayment({ course, token: cardDetails.id, user: req.user, customer: stripeCustomer });
      } catch (error) {
        const failedPayment = await $Payment
          .createFailedPayment({ course, user: req.user, response: error });

        throw new StandardError({ error, code: status.BAD_REQUEST });
      }

      const studentCourse = await $StudentCourse.createFromCourse({ course });

      await Promise.all([
        addStudentCourseToCoursesArray({ studentCourse, user: req.user, $User }),
        $Payment.createSuccessfulPayment({ course, studentCourse, user: req.user, response: stripePayment })
      ]);

      const data: HTTPResponse<SubscribeToCourseResponse> = { data: { studentCourse } };
      return res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };

  /**
   * For the time being, users can only have one credit card on file
   */
  async function getOrCreateCustomer({ token, user }: { token: string, user: IUser }): Promise<{ updatedUser?: IUser, stripeCustomer: any }> {
    const existingCustomer = await $payment.getCustomer({ user });
    if (existingCustomer) {
      return { stripeCustomer: await $payment.updateCustomerSource({ user, newSource: token }), updatedUser: null };
    } else {
      const { updatedUser, stripeCustomer } = await $payment.createCustomer({ user, source: token });
      return { updatedUser, stripeCustomer };
    }
  }
}

export function submitDrip($customError: CustomErrorService, $StudentCourse: StudentCourseModel, $User: Model<any>) {
  return async (req: SubmitDripRequest, res: Response) => {
    try {
      const studentCourse = await findStudentCourseByIdOrThrow({ $StudentCourse, id: req.params.identifier });
      await checkSubscribed({ user: req.user, studentCourse, $User });

      const { language, completed } = req.body;

      studentCourse.changeLastCompleted({ language, justCompleted: completed });

      const update = await $StudentCourse.findByIdAndUpdate(
        studentCourse._id,
        {
          $set: {
            [`data.lastCompleted.${ language }`]: studentCourse.get(`data.lastCompleted.${language}`),
            isCompleted: studentCourse.isCompleted
          }
        },
        { new: true }
      );

      const data: HTTPResponse<SubmitDripResponse> = {
        data: {
          // isCompleted: update.get('isCompleted'),
          // lastCompleted: update.data.lastCompleted
          studentCourse: update
        }
      };
      
      res.json(data);
    } catch (error) {
      $customError.httpError(res)(error);
    }
  };
}

export function getCourses($customError: CustomErrorService, $User, $StudentCourse: StudentCourseModel) {
  return async (req, res) => {
    try {
      const updatedUser = await $User
        .findById(req.user._id)
        .select('courses')
        .lean();

      const courses = await $StudentCourse
        .find({ _id: { $in: updatedUser.courses.active.concat(updatedUser.courses.completed) } });
      
      res.json({ data: { courses } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function changeActiveLanguage($customError: CustomErrorService, $StudentCourse: StudentCourseModel, $User: Model<any>) {
  return async (req, res) => {
    try {
      const studentCourse = await findStudentCourseByIdOrThrow({ $StudentCourse, id: req.params.identifier });
      await checkSubscribed({ user: req.user, studentCourse, $User });

      const update = await $StudentCourse
        .findByIdAndUpdate(studentCourse._id, { 'data.activeLanguage': req.body.language }, { new: true });
      
      res.json({ data: { studentCourse: update } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function resetCourse($User: Model<any>, $customError: CustomErrorService, $StudentCourse: StudentCourseModel) {
  return async (req, res) => {
    try {
      const studentCourse = await findStudentCourseByIdOrThrow({ $StudentCourse, id: req.params.identifier });

      await checkSubscribed({ user: req.user, studentCourse, $User });

      studentCourse.isCompleted = false;
      studentCourse.data.lastCompleted = { R: '0.0.0', STATA: '0.0.0' };
      await studentCourse.save();
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

async function addStudentCourseToCoursesArray({ studentCourse, user, $User }: { studentCourse: StudentCourse, user: IUser, $User: Model<any> }): Promise<IUser> {
  return $User.findByIdAndUpdate(
    user._id,
    { $push: { 'courses.active': studentCourse._id } },
    { new: true }
  );
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
