// NPM Dependencies
import { Schema, Document, Model, model, DocumentQuery } from 'mongoose';
import { studentCourseSchema } from '../course/student-course';

import * as emailValidator from 'email-validator';

const { Types: { ObjectId } } = Schema;

export const userSchema: Schema = new Schema({
  status: { type: String, default: 'active' },

  // Internal
  internal: {
    password: { type: ObjectId, select: false, ref: 'passwords' },

    // machines
    machines: [String],

    // stripe
    stripeId: { type: String, required: false },
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
    active: [{
      course: { type: ObjectId, ref: 'courses' },
      lastCompleted: { type: String, default: '0.0.0' }
    }],
    completed: [{ type: ObjectId, ref: 'courses' }]
  },

  // Roles
  roles: [{
    type: String,
    enum: ['instructor', 'admin', 'super-admin']
  }]
}, { timestamps: true });


// Virtuals
userSchema.virtual('stripeId').get(function() {
  return this.internal.stripeId;
});

// Methods
userSchema.methods.isActivelySubscribedToCourse = function({ id }: { id: any }): boolean {
  return this.courses.active
    .map(activeCourse => activeCourse.course.toString())
    .includes(id);
};

userSchema.methods.wasEverSubscribedToCourse = function({ id }: { id: any }): boolean {
  return this.courses.active
    .map(activeCourse => activeCourse.course.toString())
    .concat(this.courses.completed.map(course => course.toString()))
    .includes(id);
};

userSchema.methods.fullName = function(): string {
  return `${ this.profile.name.first.trim() } ${ this.profile.name.last.trim() }`;
};

userSchema.methods.email = function(): string {
  return this.get('profile.email');
};

userSchema.methods.firstName = function(): string {
  return this.get('profile.name.first');
};


