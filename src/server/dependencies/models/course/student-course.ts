// External Dependencies
import { Schema, Model } from 'mongoose';
import * as moment from 'moment';

// AOM Dependencies
import { commonCourseProps } from './common-course';
import { Course, CourseData } from './course';
import { CourseModule } from '../module';
import { Lesson } from '../module/lesson';
import { Drip } from '../module/drip';

export interface ParsedCompleted {
  module?: number;
  lesson?: number;
  drip?: number;
}

export interface StudentCourse extends Course {
  isCompleted: boolean;

  difficulty: string;

  timeToComplete: number;

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

  getActiveDrip: ({ language }: { language: string }) => Drip;

  /**
   * Changes a student course's `data.${ language }.lastCompleted` property to reflect that it has moved
   * to the next drip/lesson/module
   */
  changeLastCompleted: ({ language, justCompleted }: { language: string, justCompleted: ParsedCompleted }) => StudentCourse;

  /**
   * Usually a private method, increments the drip or the lesson if it is the last drip in a lesson
   */
  incrementDrip: ({ language, justCompleted, lastCompleted }: { language: string, justCompleted: ParsedCompleted, lastCompleted?: ParsedCompleted }) => StudentCourse;

  /**
   * Usually a private method, increments the lesson or the module if it is the last lesson in a module
   */
  incrementLesson: ({ language, lastCompleted }: { language: string, lastCompleted: ParsedCompleted }) => StudentCourse;
  
  /**
   * Usually a private method, increments the module or finishes the course if itis the last module in a course
   */
  incrementModule: ({ language, lastCompleted }: { language: string, lastCompleted?: ParsedCompleted }) => StudentCourse;

  /**
   * Finishes a course and sets the `isCompleted` flag
   */
  finishCourse: () => StudentCourse;

  expirationDate: () => moment.Moment;

  isExpired: () => boolean;
}

/**
 * Copy of a course so that a student's version of a course does not change
 * while an instructor is editing it. Since the slug can be dynamic, queries
 * for these should be by `_id`
 */
export const studentCourseSchema = new Schema({
  slug: String,
  isCompleted: { type: Boolean, default: false },

  course: { type: Schema.Types.ObjectId, ref: 'courses', required: true },

  difficulty: String,
  
  timeToComplete: Number,

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
  createFromCourse: ({ course, language, length }: { course: Course, language: string, length: string }) => Promise<StudentCourse>;
}

// methods

studentCourseSchema.methods.getActiveModule = function({ language }: { language: string }): CourseModule {
  const { module: idx } = this.parseLastCompleted({ language });
  return this.get(`data.modules.${ language }.${ idx }`);
};

studentCourseSchema.methods.getActiveDrip = function({ language }: { language: string }): Drip {
  const { module, lesson, drip: idx } = this.parseLastCompleted({ language });
  return this.get(`data.modules.${ language }.${ module }.lessons.${ lesson }.drips.${ idx }`);
};

studentCourseSchema.methods.parseLastCompleted = function({ language }: { language: string }): ParsedCompleted {
  const lastCompleted = this.get(`data.lastCompleted.${ language }`);
  const [module, lesson, drip] = this
    .parseCompleted({ completed: lastCompleted });
  return { module, lesson, drip };
};

studentCourseSchema.methods.getActiveLesson = function({ language }: { language: string }): Lesson {
  const { module, lesson, drip } = this.parseLastCompleted({ language });
  return this.get(`data.modules.${ language }.${ module }.lessons.${ lesson }`);
};

studentCourseSchema.methods.changeLastCompleted = function({ language, justCompleted }: { language: string, justCompleted: string }): StudentCourse {
  const currentLastCompleted: ParsedCompleted = this.parseLastCompleted({ language });
  const [module, lesson, drip] = this.parseCompleted({ completed: justCompleted });

  if (module < currentLastCompleted.module) {
    return this;
  }

  if (currentLastCompleted.module === module) {
    if (currentLastCompleted.lesson === lesson) {
      return this.incrementDrip({ language, justCompleted: { module, lesson, drip }, lastCompleted: currentLastCompleted });
    } else if (lesson < currentLastCompleted.lesson) {
      return this;
    } else {
      return this.incrementLesson({ language, lastCompleted: currentLastCompleted });
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

    return this.set(`data.lastCompleted.${ language }`, `${ module }.${ lesson }.${ newDripIdx }`);
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

studentCourseSchema.methods.expirationDate = function(): moment.Moment {
  const argsMap = {
    annual: [1, 'year'],
    semester: [180, 'days']
  };

  const subscribedOn = moment(this.subscription.subscribedOn);

  switch(this.get('subscription.length')) {
    case 'annual':
      return subscribedOn
        .add(1, 'year');
    case 'semester':
      return subscribedOn
        .add(180, 'days');
  }
};

studentCourseSchema.methods.isExpired = function(): boolean {
  return this.expirationDate() < moment();
};

// statics

studentCourseSchema.statics.createFromCourse = function({ course, language, length }: { course: Course, language: string, length: string }): Promise<StudentCourse> {
  const courseData: any = (course.toObject() as any).data;

  const lengthType = {
    semester: `semesterCostCents`,
    annual: `annualCostCents`
  }[length];

  return this.create({
    slug: course.slug,
    course: course._id,
    difficulty: course.difficulty,

    data: Object.assign(
      {},
      courseData,
      { lastCompleted: { R: '0.0.0', STATA: '0.0.0' }, activeLanguage: language }
    ),
    timeToComplete: course.timeToComplete,
    
    subscription: {
      subscribed: true,
      subscribedOn: Date.now(),
      costCents: course.subscription[lengthType],
      length,
      currency: course.subscription.currency
    }
  });
};

studentCourseSchema.statics.deltaLastCompleted = function ({ course }: { course: Course }) {

};