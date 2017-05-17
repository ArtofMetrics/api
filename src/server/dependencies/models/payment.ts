// External Dependencies
import { Document, Schema } from 'mongoose';

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
  studentCourse: { type: Schema.Types.ObjectId, ref: 'studentcourses', required: function() { return this.status !== 'FAILED' } },
  course: { type: Schema.Types.ObjectId, ref: 'studentcourses', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  status: { type: String, enum: ['COMPLETED', 'PENDING', 'FAILED'], required: true },
  response: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });
