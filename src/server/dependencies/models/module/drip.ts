// External Deps
import { Schema } from 'mongoose';

// Our Deps
import { consoleQuizSchema} from './console-quiz';
import { questionQuizSchema } from './question-quiz';

export interface Drip {
}

const data = {
  isVisible: { type: Boolean, default: false },
  title: { type: String, required: true },
  text: { type: String, required: function() { return this.isVisible } },
  consoleQuiz: consoleQuizSchema,
  questionQuiz: questionQuizSchema
};

export const dripSchema = new Schema(data);