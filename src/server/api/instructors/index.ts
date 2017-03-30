// External Deps
import { Router } from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { getCourses, getOneCourse } from './instructors.controller';
import { addModule, getOneModule, addNewLesson } from './modules/modules.controller';

export function instructorsRouter(di): Router {
  const api = Router();
  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder, middleware.requireLogin);

  api.route(`/courses`)
    .get(di.invoke(getCourses));
  
  api.route(`/course/:slug`)
    .get(di.invoke(getOneCourse));
  
  api.route(`/course/:slug/module`)
    .post(di.invoke(addModule));
  
  api.route('/course/:slug/module/:module')
    .get(di.invoke(getOneModule));
    
  api.route('/course/:slug/module/:module/lesson')
    .post(di.invoke(addNewLesson));
  return api;
}