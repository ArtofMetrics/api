import { Schema } from 'mongoose';

import { Drip, dripSchema } from './drip';

export interface Lesson {
  drips: Drip[];
}

export const lessonSchema = new Schema({
  drips: [dripSchema]
});