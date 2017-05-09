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

export interface Course {
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
    subscription: {};
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
    subscription: {

    }
  },

  // editable by instructors or admins
  data: {
    ...commonCourseProps.data,
    description: { type: String, required: isPublished }
  }
}, { timestamps: true });

courseSchema.methods.getModule = function (id, language) {
  return find(this.modules[language], (m: CourseModule) => m._id.toString() === id.toString());
}