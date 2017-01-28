// NPM Dependencies
import { Schema, Document, Model, model, DocumentQuery } from 'mongoose';
import * as emailValidator from 'email-validator';

export const userSchema: Schema = new Schema({
  status: { type: String, default: 'active' },

  // Internal
  internal: {
    password: { type: Schema.Types.ObjectId }
  },

  // Profile
  profile: {
    email: { type: String, required: true, validate: [emailValidator.validate, `{VALUE} invalid value for {PATH}`] },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    }
  },

  // Roles
  roles: [{
    type: String,
    enum: ['student', 'instructor', 'admin', 'super-admin']
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
