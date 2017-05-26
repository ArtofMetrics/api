// External Dependencies
import * as StandardError from 'standard-error';
import * as status from 'http-status';

// AOM Dependencies

// AOM types
import { StudentCourse } from '../../dependencies/models/course/student-course';
import { IUser } from '../../dependencies/models/user/user.model';

export const checkSubscribed = ({ user, studentCourse }: { user: IUser, studentCourse: StudentCourse }) => {
  if (user.courses.active.find(courseId => courseId.toString() === studentCourse._id.toString())) {
    return;
  }

  throw new StandardError({
    error: `User ${ user._id } is not subscribed to studentCourse ${ studentCourse._id }`,
    readableError: `User ${ user._id } is not subscribed to studentCourse ${ studentCourse._id }`,
    code: status.UNAUTHORIZED
  });
};
