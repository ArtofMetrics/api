// External Deps
import * as status from 'http-status';
import { Model } from 'mongoose';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';

// AOM Interfaces

export async function findCourseOrThrow({ $Course, slug, $customError, options }: { $Course: Model<any>, slug: string, $customError: CustomErrorService, options?: any }) {
  const course = await $Course
    .findOne({ slug })
    .setOptions(options ? options : { skipVisibility: true });
  if (!course) {
    return $customError.defaultError({
      error: `Could not find course with slug ${ slug }`,
      code: status.NOT_FOUND
    });
  }

  return course;
}