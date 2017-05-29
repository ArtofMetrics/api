// External Deps
import { Schema, Document } from 'mongoose';

// AOM Deps

export interface ConsoleQuiz extends Document {
  question: string;
  answer: string;
}

export const consoleQuizSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});
