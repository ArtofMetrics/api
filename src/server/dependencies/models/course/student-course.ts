// External Dependencies
import { Schema, Model } from 'mongoose';

// AOM Dependencies
import { commonCourseProps } from './common-course';
import { Course, CourseData } from './course';

export interface ParsedCompleted {
  module: number;
  lesson: number;
  drip: number;
}

export interface StudentCourse extends Course {
  subscription: {
    costCents: number;
    length: string;
    currency: string;
    subscribed: boolean;
    subscribedOn: Date;
  };

  data: CourseData & {
    lastCompleted?: string;
    activeLanguage: string;
  };

  /**
   * Gets the currently active module (0 indexed)
   * @return {number} Module idx
   */
  getActiveModule: () => number;

  /**
   * Parses a studentCourse's `data.lastCompleted` and returns an object with the module, lesson, and drip as numbers
   * @return {Object} Object with properties module, lesson, and drip
   */
  parseLastCompleted: () => ParsedCompleted;
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
    lastCompleted: { type: String, required: true },
    activeLanguage: { type: String, required: true, enum: ['R', 'STATA'], default: 'R' }
  },
});

export interface StudentCourseModel extends Model<StudentCourse> {
  /**
   * Creates a student course object from a Course object
   * @param  {Course}} {course}      Course
   * @return {Promise<StudentCourse>}
   */
  createFromCourse: ({ course }: { course: Course }) => Promise<StudentCourse>;
}

// methods

studentCourseSchema.methods.getActiveModule = function(): number {
  return this.parseLastCompleted().module;
};

studentCourseSchema.methods.parseLastCompleted = function(): { module: number, lesson: number, drip: number } {
  const lastCompleted = this.get('data.lastCompleted');
  const [module, lesson, drip] = lastCompleted.split('.').map(num => parseInt(num, 10));
  return { module, lesson, drip };
};

// statics

studentCourseSchema.statics.createFromCourse = function({ course }: { course: Course }): Promise<StudentCourse> {
  const courseData: any = (course.toObject() as any).data;

  return this.create({
    slug: course.slug,
    course: course._id,

    data: Object.assign({}, courseData, { lastCompleted: '0.0.0', activeLanguage: 'R' }),

    subscription: {
      subscribed: true,
      subscribedOn: Date.now(),
      costCents: course.subscription.costCents,
      length: course.subscription.length,
      currency: course.subscription.currency
    }
  });
};
