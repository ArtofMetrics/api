// External Dependencies
import { Schema, Model } from 'mongoose';

// AOM Dependencies
import { commonCourseProps } from './common-course';
import { Course, CourseData } from './course';
import { CourseModule } from '../module';
import { Lesson } from '../module/lesson';

export interface ParsedCompleted {
  module?: number;
  lesson?: number;
  drip?: number;
}

export interface StudentCourse extends Course {
  isCompleted: true;

  subscription: {
    costCents: number;
    length: string;
    currency: string;
    subscribed: boolean;
    subscribedOn: Date;
  };

  data: CourseData & {
    lastCompleted: {
      R: string;
      STATA: string;
    };

    activeLanguage: string;
  };

  /**
   * Gets the currently active module (0 indexed)
   * @return {number} Module idx
   */
  getActiveModule: ({ language }: { language: string }) => CourseModule;

  /**
   * Parses a studentCourse's `data.lastCompleted` and returns an object with the module, lesson, and drip as numbers
   * @return {Object} Object with properties module, lesson, and drip
   */
  parseLastCompleted: ({ language }: { language: string }) => ParsedCompleted;

  getActiveLesson: ({ language }: { language: string }) => Lesson;

}

/**
 * Copy of a course so that a student's version of a course does not change
 * while an instructor is editing it. Since the slug can be dynamic, queries
 * for these should be by `_id`
 */
export const studentCourseSchema = new Schema({
  slug: String,
  isCompleted: { type: Boolean, default: false };

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
    lastCompleted: {
      R: { type: String, required: true, default: `0.0.0` },
      STATA: { type: String, required: true, default: `0.0.0`},
    },
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

studentCourseSchema.methods.getActiveModule = function({ language }: { language: string }): CourseModule {
  const { module: idx } = this.parseLastCompleted({ language });
  return this.get(`data.modules.${ language }.${ idx }`);
};

studentCourseSchema.methods.parseLastCompleted = function({ language }: { language: string }): ParsedCompleted {
  const lastCompleted = this.get(`data.lastCompleted.${ language }`);
  const [module, lesson, drip] = this
    .parseCompleted({ complete: lastCompleted })
    .split('.')
    .map(num => parseInt(num, 10));
  return { module, lesson, drip };
};

studentCourseSchema.methods.getActiveLesson = function({ language }: { language: string }): Lesson {
  const { module, lesson, drip } = this.parseLastCompleted({ language });
  return this.get(`data.modules.${ language }.${ module }.lessons.${ lesson }`);
};

studentCourseSchema.methods.changeLastCompleted = function({ language, justCompleted }: { language: string, justCompleted }): Lesson {
  const currentLastCompleted: ParsedCompleted = this.parseLastCompleted({ language });
  const [module, lesson, drip] = this.parseCompleted({ completed: justCompleted });

  let newCompleted: ParsedCompleted = {};
  if (currentLastCompleted.module < module) {
    return this;
  }

  if (currentLastCompleted.module === module) {
    if (currentLastCompleted.lesson === lesson) {
      return this.incrementDrip({ language, justCompleted, lastCompleted: { module, lesson, drip } });
    } else if (currentLastCompleted.lesson < lesson) {
      return this;
    } else {
      return this.incrementLesson({ language, lastCompleted: { module, lesson, drip } });
    }
  }
};

studentCourseSchema.methods.incrementDrip = function({ language, justCompleted, lastCompleted }: { language: string, justCompleted: ParsedCompleted, lastCompleted?: ParsedCompleted }): StudentCourse {
  const { module, lesson, drip } = lastCompleted || this.parseLastCompleted({ language });
  if (justCompleted.drip < drip) {
    return this;
  }

  if (justCompleted.drip === drip) {
    const newDripIdx = justCompleted.drip + 1;
    const newDrip = this.get(`data.modules.${ language }.${ module }.lessons.${ lesson }.drips.${ newDripIdx }`);
    if (!newDrip) {
      return this.incrementLesson({ language, lastCompleted: { module, lesson, drip } });
    }

    return this.set(`data.lastCompleted.${ language }`, `${ module }.${ lesson }.{ newDripIdx }`);
  }
};

studentCourseSchema.methods.incrementLesson = function({ language, lastCompleted }: { language: string, lastCompleted?: ParsedCompleted }): StudentCourse {
  const { module, lesson, drip } = lastCompleted || this.parseLastCompleted({ language });
  const newLessonIdx = lesson + 1;
  const newLesson = this.get(`data.modules.${ language }.${ module }.lessons.${ newLessonIdx }`);
  if (!newLesson) {
    return this.incrementModule({ language, lastCompleted: { module, lesson, drip } });
  }

  this.set(`data.lastCompleted.${ language }`, `${ module }.${ newLessonIdx }.0`);
  return this;
};

studentCourseSchema.methods.incrementModule = function({ language, lastCompleted }: { language: string, lastCompleted?: ParsedCompleted }): StudentCourse {
  const { module, lesson, drip } = lastCompleted || this.parseLastCompleted({ language });
  const newModuleIdx = module + 1;
  const newModule = this.get(`data.modules.${ language }.${ newModuleIdx }`);
  if (!newModule) {
    return this.finishCourse();
  }

  this.set(`data.lastCompleted.${ language }`, `${ module }.0.0`);
};

studentCourseSchema.methods.finishCourse = function(): StudentCourse {
  this.set(`isCompleted`, true);
  return this;
};

studentCourseSchema.methods.parseCompleted = function({ completed }: { completed: string }): number[] {
  return completed.split('.').map(num => parseInt(num, 10));
};

// statics

studentCourseSchema.statics.createFromCourse = function({ course }: { course: Course }): Promise<StudentCourse> {
  const courseData: any = (course.toObject() as any).data;

  return this.create({
    slug: course.slug,
    course: course._id,

    data: Object.assign(
      {},
      courseData,
      { lastCompleted: { R: '0.0.0', STATA: '0.0.0' }, activeLanguage: 'R' }
    ),

    subscription: {
      subscribed: true,
      subscribedOn: Date.now(),
      costCents: course.subscription.costCents,
      length: course.subscription.length,
      currency: course.subscription.currency
    }
  });
};

studentCourseSchema.statics.deltaLastCompleted = function ({ course }: { course: Course }) {

};