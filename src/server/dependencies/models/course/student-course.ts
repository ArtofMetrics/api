import * as mongoose from 'mongoose';

/**
 * Copy of a course so that a student's version of a course does not change
 * while an instructor is editing it. Since the slug can be dynamic, queries
 * for these should be by `_id`
 */
export const studentCourseSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true },
  subscribed: { type: Boolean, required: true },

  data: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    photos: []
  }
});