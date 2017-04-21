// External Deps
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Deps
import { isInstructorOfCourse } from '../utils';

export function checkAuthorizedInstructor({ course, user }: { course: any, user: any }) {
  const authorized = isInstructorOfCourse(course, user);
  if (!authorized) {
    throw new StandardError(`User ${ user._id } is not an instructor for course ${ course._id }`, { code: status.UNAUTHORIZED });
  }
}