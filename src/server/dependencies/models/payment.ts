// External Dependencies
import { Document, Schema, Model } from 'mongoose';

// AOM Dependencies

// AOM Interfaces
import { Course } from './course/course';
import { StudentCourse } from './course/student-course';
import { IUser } from './user/user.model';

type MongoId = Schema.Types.ObjectId | string;

export interface Payment extends Document {
  studentCourse: MongoId | StudentCourse;
  course: MongoId | Course;
  student: MongoId | IUser;
  token: string;

  createdAt: string;
  updatedAt: string;
  status: string;
  response: any;
}

/**
 * Payment object that stores a given Response
 * and can be joined on different core documents
 */
export const paymentSchema = new Schema({
  studentCourse: { type: Schema.Types.ObjectId, ref: 'studentcourses', required: function () { return this.status !== 'FAILED' } },
  course: { type: Schema.Types.ObjectId, ref: 'studentcourses', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  status: { type: String, enum: ['COMPLETED', 'PENDING', 'FAILED'], required: true },
  response: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

/**
 * Model Statics
 */
export interface PaymentModel extends Model<Payment> {
  createSuccessfulPayment: ({ course, studentCourse, user, response }: { course: Course, studentCourse: StudentCourse, user: IUser, response: any }) => Promise<Payment>;
  createFailedPayment: ({ course, user, response }) => Promise<Payment>;
}

paymentSchema.statics.createSuccessfulPayment = function ({ course, studentCourse, user, response }: { course: Course, studentCourse: StudentCourse, user: IUser, response: any }) {
  return this.create({
    response,
    status: 'COMPLETED',
    course: course._id,
    student: user._id,
    studentCourse: studentCourse._id
  });
};

paymentSchema.statics.createFailedPayment = function ({ course, user, response }: { course: Course, user: IUser, response: any }): Promise<Payment> {
  return this.create({
    status: 'FAILED',
    course: course._id,
    student: user._id,
    response
  });
};