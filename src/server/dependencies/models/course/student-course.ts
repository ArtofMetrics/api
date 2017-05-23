// External Dependencies
import { Schema, Model } from 'mongoose';

// AOM Dependencies
import { commonCourseProps } from './common-course';
import { Course } from './course';

export interface StudentCourse extends Course {
  subscription: {
    costCents: number;
    length: string;
    currency: string;
    subscribed: boolean;
    subscribedOn: Date;
  };
}
/**
 * Copy of a course so that a student's version of a course does not change
 * while an instructor is editing it. Since the slug can be dynamic, queries
 * for these should be by `_id`
 */
export const studentCourseSchema = new Schema({
  slug: String,

  course: { type: Schema.Types.ObjectId, ref: 'courses', required: true },

  /**
   * Internal subscription information. A user should not be able to directly
   * modify this information through the GUI
   */
  subscription: {
    subscribed: { type: Boolean, required: true },
    subscribedOn: { type: Date, default: Date.now },
    costCents: { type: Number, required: true },
    length: { type: String, enum: ['semester', 'annual'], required: true }
  },

  data: {
    ...commonCourseProps.data,
    description: { type: String, required: true },
    lastCompleted: { type: String, required: true }
  },
});

export interface StudentCourseModel extends Model<StudentCourse> {
  createFromCourse: ({ course }: { course: Course }) => Promise<StudentCourse>;
}

studentCourseSchema.statics.createFromCourse = function({ course }: { course: Course }): Promise<StudentCourse> {
  const courseData: any = (course.toObject() as any).data;

  return this.create({
    slug: course.slug,
    course: course._id,

    data: Object.assign({}, courseData, { lastCompleted: '0.0.0' }),

    subscription: {
      subscribed: true,
      subscribedOn: Date.now(),
      costCents: course.subscription.costCents,
      length: course.subscription.length,
      currency: course.subscription.currency
    }
  });
};
