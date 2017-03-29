// NPM Deps
import { Router } from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { getCourses, getOneModule, createCourse, getOneCourse } from './courses.controller';
export function coursesRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);
  
  api.use(middleware.jwtDecoder);
  api.route('/')
    .get(di.invoke(getCourses))
    .post(middleware.requireLogin, di.invoke(createCourse));
  
  api.route('/:slug')
    .get(di.invoke(getOneCourse));
  
  api.route('/:slug/module/:module')
    .get(di.invoke(getOneModule));

  return api;
};