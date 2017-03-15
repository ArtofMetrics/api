import { Schema } from 'mongoose';
import { Lesson, lessonSchema } from './lesson';

export interface CourseModule {
  
  lessons: Lesson[]
}

export const courseModuleSchema = new Schema({
  lessons: [lessonSchema]
});