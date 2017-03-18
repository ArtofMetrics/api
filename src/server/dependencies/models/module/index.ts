import { Schema } from 'mongoose';
import { Lesson, lessonSchema } from './lesson';

export interface CourseModule {
  name: string;
  description: string;
  lessons: Schema.Types.ObjectId | Lesson[]
}

export const courseModuleSchema = new Schema({
  name: String,
  description: String,
  lessons: [{ type: Schema.Types.ObjectId, ref: 'lessons' }]
});