// NPM Dependencies
import { Schema, Document, Model, model, DocumentQuery } from 'mongoose';
import * as find from 'lodash/find';

// AOM Plugins
import { visibilityPlugin } from '../plugins/visibility';
import { isVisible } from '../helpers/isVisible';
import { isPublished } from '../helpers/isPublished';

// AOM Dependencies
import { commonCourseProps } from './common-course';

// AOM Schemas
import { CourseModule, courseModuleSchema } from '../module';

export interface CourseData {
  name: string;
  description: string;
  category: string;
  photos: { url: string; caption: string; isCover: boolean }[];
  modules: { R: CourseModule[], STATA: CourseModule[] };
}

export interface Course extends Document {
  _id: string;
  isVisible: boolean;
  isDeleted: boolean;
  status: string;
  difficulty: string;
  timeToComplete: number;
  slug: string;
  instructors: (Schema.Types.ObjectId | string | {})[];

  //
  internal: {};

  admin: {
    readableId: number;
    isFree: boolean;
  };

  subscription: {
    currency?: string;
    annualCostCents?: number;
    semesterCostCents?: number;
  };

  data: CourseData;

  createdAt: string;
  updatedAt: string;

  // methods
  getModule: (id: string | Schema.Types.ObjectId, language: string) => CourseModule;

  isFree: () => boolean;
}

export const courseSchema: Schema = new Schema({
  isVisible: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  status: { type: String, required: true, default: 'Incomplete' },
  slug: { type: String, required: true },
  instructors: [{ type: Schema.Types.ObjectId, ref: 'users' }],

  // Should not really be touched by admins or instructors
  internal: {},

  // Should only be editable by admins
  admin: {
    readableId: { type: Number, required: true },
    isFree: { type: Boolean, default: false }
  },

  difficulty: {
    type: String,
    enum: ['Beginner', 'Medium', 'Advanced'],
    required: function() { return this.isVisible }
  },

  timeToComplete: {
    type: Number,
    required: function() { return this.isVisible }
  },

  // editable by instructors or admins
  data: {
    ...commonCourseProps.data,
    description: { type: String, required: isPublished }
  },

  // subscription information
  subscription: {
    currency: { type: String, default: 'usd' },
    semesterCostCents: {
      type: Number,
      required: [isPublished, `Please select a semesterly price for your course`]
    },
    annualCostCents: {
      type: Number,
      required: [isPublished, `Please select an annual price for your course`]
    }
  }
}, { timestamps: true });

// validators
courseSchema.path('data.photos').validate(function(photos) {
  return this.isVisible ? photos && photos.length : true;
});

// methods
courseSchema.methods.getModule = function (id, language: string) {
  return this.data.modules[language].id(id);
}

courseSchema.methods.isFree = function(): boolean {
  return this.admin.isFree;
};

export interface CourseModel extends Model<Course> {

  getVisibleCourses: () => Course[];
}

// statics
courseSchema.statics.getVisibleCourses = function() {
  return this
    .find({
      isVisible: true
    });
};

