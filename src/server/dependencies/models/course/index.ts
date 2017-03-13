// NPM Dependencies
import { Schema, Document, Model, model, DocumentQuery } from 'mongoose';

// AOM Deps
import { visibilityPlugin } from '../plugins/visibility';
import { isVisible } from '../helpers/isVisible';
import { isPublished } from '../helpers/isPublished';

export interface ICourse {
  isVisible: boolean;
  isDeleted: boolean;
  status: String;
  slug: String;
  internal: {};

  admin: {
    readableId: Number;
    subscription: { };
  };

  data: {
    name: String;
    description: String;
    category: String;
    photos: { url: String; caption: String; isCover: Boolean}[];
  }
  
  createdAt: String;
  updatedAt: String;
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
    ]
  }
}, { timestamps: true });

