import * as some from 'lodash/some';
import * as includes from 'lodash/includes';

export function isAdmin(user): boolean {
  return some(user.roles, (role: string) => {
    return role === 'admin' || role === 'super-admin';
  });
}

export function isInstructor(user): boolean {
  return isAdmin(user) || includes(user.roles, 'instructor');
}

export function isInstructorOfCourse(course, user): boolean {
  return isAdmin(user) || 
    (course.instructors && some(course.instructors, instructorId => instructorId.toString() === user._id.toString()));
}