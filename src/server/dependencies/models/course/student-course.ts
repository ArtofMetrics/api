// External Dependencies
import { Schema, Model } from 'mongoose';

// AOM Dependencies
import { commonCourseProps } from './common-course';

/**
 * Copy of a course so that a student's version of a course does not change
 * while an instructor is editing it. Since the slug can be dynamic, queries
 * for these should be by `_id`
 */
export const studentCourseSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
  subscribed: { type: Boolean, required: true },

  data: {
    ...commonCourseProps.data,
    description: { type: String, required: true },
    lastCompleted: { type: String }
  },
});
