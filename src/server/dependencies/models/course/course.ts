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

export interface Course extends Document {
  _id: string;
  isVisible: boolean;
  isDeleted: boolean;
  status: string;
  slug: string;
  instructors: (Schema.Types.ObjectId | string | {})[];

  //
  internal: {};

  admin: {
    readableId: number;
  };

  subscription: {
    currency?: string;
    costCents: number;
    length: string;
  };

  data: {
    name: string;
    description: string;
    category: string;
    photos: { url: string; caption: string; isCover: boolean }[];
    modules: CourseModule[]
  }

  createdAt: string;
  updatedAt: string;

  // methods
  getModule: (id: string | Schema.Types.ObjectId, language: string) => CourseModule;
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
  },

  // editable by instructors or admins
  data: {
    ...commonCourseProps.data,
    description: { type: String, required: isPublished }
  },

  // subscription information
  subscription: {
    currency: { type: String, default: 'usd' },
    costCents: {
      type: Number,
      required: [isPublished, `Please select a price for your course`]
    },
    length: {
      type: String,
      enum: ['semester', 'annual'],
      required: [isPublished, `Please select a course length`]
    }
  }
}, { timestamps: true });

courseSchema.methods.getModule = function (id, language: string) {
  return this.data.modules[language].id(id);
}
