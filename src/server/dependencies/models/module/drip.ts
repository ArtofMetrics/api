// External Deps
import { Schema } from 'mongoose';

// Our Deps
import { questionKinds } from '../../../../shared/enums/gateway';
import { consoleQuizSchema} from './console-quiz';
import { questionQuizSchema } from './question-quiz';

export interface Drip {
}

const data = {
  text: { type: String, required: true },
  consoleQuiz: consoleQuizSchema,
  questionQuiz: questionQuizSchema
};

export const dripSchema = new Schema(data);