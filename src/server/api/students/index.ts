// External Dependencies
import { Router } from 'express';

// AOM Dependencies
import { Middleware } from '../middleware';
import { getOneCourse, subscribeToCourse } from './routes';

export function studentsRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder);

  api.route('/course/:identifier')
    .get(di.invoke(getOneCourse))
    .post(di.invoke(subscribeToCourse))
    
  return api;
}