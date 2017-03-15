// NPM Dependencies
import { Schema, Document, Model, model, DocumentQuery } from 'mongoose';

// AOM Plugins
import { visibilityPlugin } from '../plugins/visibility';
import { isVisible } from '../helpers/isVisible';
import { isPublished } from '../helpers/isPublished';

// AOM Schemas
import { CourseModule, courseModuleSchema } from '../module';

export interface Course {
  isVisible: boolean;
  isDeleted: boolean;
  status: string;
  slug: string;
  internal: {};

  admin: {
    readableId: number;
    subscription: { };
  };

  data: {
    name: string;
    description: string;
    category: string;
    photos: { url: string; caption: string; isCover: boolean}[];
    modules: CourseModule[]
  }
  
  createdAt: string;
  updatedAt: string;
}

export const courseSchema: Schema = new Schema({
  isVisible: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  status: { type: String, required: true, default: 'Incomplete' },
  slug: { type: String, required: true },

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
    name: { type: String, required: true },
    description: { type: String, required: isPublished },
    category: { type: String },
    photos: [
      { 
        url: { type: String, required: true },
        caption: { type: String },
        isCover: { type: Boolean, default: false, required: true }
      }
    ],
    modules: [courseModuleSchema]
  }
}, { timestamps: true });

