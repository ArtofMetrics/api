import { Schema } from 'mongoose';
import { Lesson, lessonSchema } from './lesson';


export interface CourseModule {
  _id?: string;
  name: string;
  description: string;
  isVisible: boolean;
  lessons: Schema.Types.ObjectId | Lesson[]
}

export const courseModuleSchema = new Schema({
  name: String,
  description: String,
  isVisible: { type: Boolean, default: false },
  lessons: [lessonSchema]
});