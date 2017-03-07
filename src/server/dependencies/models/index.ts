import * as mongoose from 'mongoose';
import { userSchema } from './user';
import { passwordSchema } from './password';
import { courseSchema } from './course';
import { studentCourseSchema } from './student-course';

export const models = {
  Course: courseSchema,
  User: userSchema,
  Password: passwordSchema,
  StudentCourse: studentCourseSchema
}