// External Deps
import { Schema } from 'mongoose';

// AOM Deps

export interface ConsoleQuiz {

}

export const consoleQuizSchema = new Schema({
  stata: {
    complete: { type: Boolean, default: false },
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  r: {
    complete: { type: Boolean, default: false },
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }
});

