import * as mongoose from 'mongoose';
import { userSchema } from './user';
import { passwordSchema } from './password';
import { courseSchema } from './course';

export const models = {
  Course: mongoose.model('Course', courseSchema),
  User: mongoose.model('User', userSchema),
  Password: mongoose.model('Password', passwordSchema)
}