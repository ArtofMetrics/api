// NPM Deps
import { Router } from 'express';

import { getCourses } from './courses.controller';
export function coursesRouter(di): Router {
  const api = Router();
  
  api.route('/')
    .get(di.invoke(getCourses));

  return api;
};