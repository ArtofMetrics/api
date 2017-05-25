// External Deps
import { Schema, Document } from 'mongoose';
import * as includes from 'lodash/includes';

// AOM Deps

export interface CheckedAnswer {
  passed: boolean;
  incorrectAnswers?: Set<number>;
  missingAnswers: Set<number>;
}

export interface QuestionQuiz extends Document {
  question: string;
  answers: string[];
  correctAnswers: number[];

  checkAnswers: (nums: number[]) => CheckedAnswer;
  markComplete: () => QuestionQuiz;
}

export const questionQuizSchema = new Schema({
  complete: { type: Boolean, default: false },
  question: { type: String, required: true },
  answers: [{
    text: { type: String, required: true }
  }],
  correctAnswers: [{ type: Number, required: true, minlength: 1 }]
});

questionQuizSchema.methods.checkAnswers = function(nums: number[]): CheckedAnswer {
  const correct = this.correctAnswers.sort().join('') === nums.sort().join('');

  let incorrectAnswers;
  if (!correct) {
    incorrectAnswers = new Set(nums.filter(num => !this.correctAnswers.includes(num)));
  }

  let missingAnswers;
  if (!correct) {
    missingAnswers = new Set(this.correctAnswers.filter(num => !includes(nums, num)));
  }

  return { passed: correct, incorrectAnswers, missingAnswers };
};

questionQuizSchema.methods.markComplete = function(): QuestionQuiz {
  this.complete = true;
  return this;
};
