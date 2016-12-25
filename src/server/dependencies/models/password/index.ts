// NPM Deps
import { Schema, Document, Model, model, SchemaTypes } from 'mongoose';

import { IPassword } from './password.model';

export interface IPasswordModel extends IPassword, Document {}

export const passwordSchema: Schema = new Schema({
  hash: { type: String }
});

export const Password = model<IPasswordModel>('Password', passwordSchema);