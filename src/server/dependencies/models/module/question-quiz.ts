// External Deps
import { Schema } from 'mongoose';

// AOM Deps

export interface QuestionQuiz {
  question: string;
  answer: string;
}

export const questionQuizSchema = new Schema({
  question: { type: String, required: true },
  answers: [{ type: String, required: true }],
  correctAnswers: [{ type: Number, required: true }]
});