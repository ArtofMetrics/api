import * as mongoose from 'mongoose';
import { userSchema } from './user';
import { passwordSchema } from './password';
import { courseSchema } from './course/course';
import { studentCourseSchema } from './course/student-course';
import { paymentSchema } from './payment';
import { couponSchema } from './coupon';

export const models = {
  Course: courseSchema,
  User: userSchema,
  Password: passwordSchema,
  StudentCourse: studentCourseSchema,
  Payment: paymentSchema,
  Coupon: couponSchema
};
