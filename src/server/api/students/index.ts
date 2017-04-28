// External Dependencies
import { Router } from 'express';

// AOM Dependencies
import { Middleware } from '../middleware';
import { getOneCourse } from './routes';

export function studentsRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder);

  api.use('/course/:slug', di.invoke(getOneCourse));

  return api;
}