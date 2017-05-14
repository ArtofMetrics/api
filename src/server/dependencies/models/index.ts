import * as mongoose from 'mongoose';
import { userSchema } from './user';
import { passwordSchema } from './password';
import { courseSchema } from './course/course';
import { studentCourseSchema } from './course/student-course';

export const models = {
  Course: courseSchema,
  User: userSchema,
  Password: passwordSchema,
  StudentCourse: studentCourseSchema
}