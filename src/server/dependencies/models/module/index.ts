import { Schema } from 'mongoose';
import { Lesson, lessonSchema } from './lesson';

export interface CourseModule {
  name: string;
  description: string;
  lessons: Lesson[]
}

export const courseModuleSchema = new Schema({
  name: String,
  description: String,
  lessons: [lessonSchema]
});