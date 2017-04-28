import * as express from 'express';
import * as bodyParser from 'body-parser';

// AOM Deps
import { AuthRouter } from './auth';
import { coursesRouter } from './courses';
import { instructorsRouter } from './instructors';
import { studentsRouter } from './students';

export function Api(di) {
  const api = express.Router();
  api.use(bodyParser.json());
  
  api.use('/auth', AuthRouter(di));
  api.use('/courses', coursesRouter(di));
  api.use('/instructors', instructorsRouter(di));
  api.use('/students', studentsRouter(di));
  
  return api;
}