// External Deps
import { Schema } from 'mongoose';

// AOM Deps

export interface ConsoleQuiz {
  question: string;
  answer: string;
}

export const consoleQuizSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});
