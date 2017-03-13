// NPM Deps
import { Router } from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { getCourses, createCourse } from './courses.controller';
export function coursesRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);
  
  api.use(di.invoke(middleware.jwtDecoder));
  api.route('/')
    .get(di.invoke(getCourses))
    .post(di.invoke(middleware.requireLogin), di.invoke(createCourse));

  return api;
};