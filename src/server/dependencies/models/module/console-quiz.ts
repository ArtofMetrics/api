// External Deps
import { Schema, Document } from 'mongoose';

// AOM Deps

export interface ConsoleQuiz extends Document {
  question: string;
  answers: string[];
}

export const consoleQuizSchema = new Schema({
  question: { type: String, required: true },
  answers: [{ type: String, required: true }]
});
