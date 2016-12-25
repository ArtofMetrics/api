// NPM Dependencies
import { Schema, Document, Model, model, SchemaTypes } from 'mongoose';
import * as emailValidator from 'email-validator';

// SixPlus Deps
import { IUser } from './user.model';

export interface IUserModel extends IUser, Document {}

export const userSchema: Schema = new Schema({
  status: { type: String, default: 'Active' },

  // Internal
  internal: {
    password: { type: SchemaTypes.ObjectId }
  },

  // Profile
  profile: {
    email: { type: String, required: true, validate: emailValidator.validate },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    }
  }
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

export const User = model<IUserModel>('User', userSchema);
