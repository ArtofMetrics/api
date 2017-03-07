import * as mongoose from 'mongoose';

export const studentCourseSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true },
  subscribed: {type: Boolean, required: true },
  signedUp: { type: Date, required: true }
})