// External Dependencies
import { Model } from 'mongoose';
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Dependencies

// AOM interfaces
import { IUser } from '../../dependencies/models/user/user.model';
import { Course } from '../../dependencies/models/course/course';

export const findCourseBySlugOrThrow = async ({ $Course, slug }: { $Course: Model<any>, slug: string }): Promise<Course> => {
  const course = await $Course.findOne({ slug });

  if (!course) {
    throw new StandardError({
      error: `Could not find course with slug ${ slug }`,
      readableError: `Could not find course with slug ${ slug }`,
      code: status.NOT_FOUND,
    });
  }

  return course;
};

export const findCourseByIdOrThrow = async ({ $Course, courseId }: { $Course: Model<any>, courseId: string }): Promise<Course> => {
  const course = await $Course.findOne({ _id: courseId });
  if (!course) {
    throw new StandardError({
      error: `Could not find course with _id ${ courseId }`,
      readableError: `Could not find course with _id ${ courseId }`,
      code: status.NOT_FOUND
    });
  }

  return course;
};

export const throwIfSubscribed = async ({ $StudentCourse, user, courseId }: { $StudentCourse: Model<any>, user: IUser, courseId: string }) => {
  const course = await $StudentCourse.findOne({
    course: courseId
  }).select('_id course').lean();

  if (!course) {
    return;
  }

  if (user.isActivelySubscribedToCourse(courseId)){
    throw new StandardError({
      error: `User is already subscribed to course with course id ${ courseId }`,
      readableError: `User is already subscribed to course with course id ${ courseId }`,
      code: status.BAD_REQUEST
    });
  }
};
