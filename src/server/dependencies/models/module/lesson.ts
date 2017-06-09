import { Schema, Document } from 'mongoose';

import { Drip, dripSchema } from './drip';

export interface Lesson extends Document {
  name: string;
  description: string;
  drips: Drip[];
  isVisible: boolean;
  isDeleted: boolean;
  difficulty: string;
  timeToComplete: number;
}

/**
 * Embedded within a module. Does not persist to db
 */
export const lessonSchema: Schema = new Schema({
  isVisible: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  name: { type: String, required: true },
  description: { type: String },
  drips: [dripSchema],
  difficulty: { type: String },
  timeToComplete: { type: String }
});