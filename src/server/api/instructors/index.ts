// External Deps
import { Router } from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { getCourses } from './instructors.controller';

export function instructorsRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder);

  api.route(`/courses`)
    .get(di.invoke(getCourses));
    
  return api;
}