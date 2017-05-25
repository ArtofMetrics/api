// External Deps
import { Schema, Document } from 'mongoose';

// Our Deps
import { consoleQuizSchema} from './console-quiz';
import { questionQuizSchema, QuestionQuiz } from './question-quiz';

export interface Drip extends Document {
  isVisible: boolean;
  title: string;
  text: string;
  consoleQuiz: any;
  questionQuiz: QuestionQuiz;
}

const data = {
  isVisible: { type: Boolean, default: false },
  title: { type: String, required: true },
  text: { type: String, required: function() { return this.isVisible } },
  consoleQuiz: consoleQuizSchema,
  questionQuiz: questionQuizSchema
};

export const dripSchema = new Schema(data);
