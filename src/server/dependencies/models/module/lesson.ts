import { Schema } from 'mongoose';

import { Drip, dripSchema } from './drip';

export interface Lesson {
  name: string;
  description: string;
  drips: Drip[];
}

export const lessonSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  drips: [dripSchema]
});