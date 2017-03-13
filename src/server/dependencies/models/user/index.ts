// NPM Dependencies
import { Schema, Document, Model, model, DocumentQuery } from 'mongoose';
import { studentCourseSchema } from '../student-course';

import * as emailValidator from 'email-validator';

const { Types: { ObjectId } } = Schema;

export const userSchema: Schema = new Schema({
  status: { type: String, default: 'active' },

  // Internal
  internal: {
    password: { type: ObjectId, select: false, ref: 'passwords' },
    
    // machines
    machines: [String]
  },

  // Profile
  profile: {
    email: { type: String, required: true, validate: [emailValidator.validate, `{VALUE} invalid value for {PATH}`] },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
    education: {
      kind: { type: String },
      institution: { type: String }
    },
    location: {
      city: { type: String },
      country: { type: String },
      zipcode: { type: String }
    }
  },
  
  // Courses
  courses: {
    active: [{ type: ObjectId, ref: 'courses' }],
    completed: [{ type: ObjectId, ref: 'courses' }]
  },

  // Roles
  roles: [{
    type: String,
    enum: ['instructor', 'admin', 'super-admin']
  }]
}, { timestamps: true });

userSchema.methods.fullName = function() {
  return `${ this.first.name.trim() } ${ this.last.name.trim() }`;
}

userSchema.methods.email = function() {
  return this.get('profile.email');
}

userSchema.methods.firstName = function() {
  return this.get('profile.name.first');
}
