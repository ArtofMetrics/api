// External Deps
import { Router } from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { getCourses, getOneCourse } from './instructors.controller';

export function instructorsRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder, middleware.requireLogin);

  api.route(`/courses`)
    .get(di.invoke(getCourses));
  
  api.route(`/course/:slug`)
    .get(di.invoke(getOneCourse));
  return api;
}