// External Deps
import { Router } from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { getCourses, getOneCourse } from './instructors.controller';
import { addModule, getOneModule, addNewLesson, deleteLesson } from './modules/modules.controller';
import { getOneLesson, addDrip, deleteDrip, updateDrip } from './lessons/lessons.controller';

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
  
  api.route('/course/:slug/module/:module/edit')
    .get(di.invoke(getOneModule));
    
  api.route('/course/:slug/module/:module')
    .get(di.invoke(getOneModule));
    
  // Create Lesson
  api.route('/course/:slug/module/:module/lesson')
    .post(di.invoke(addNewLesson));
  
  // Edit Lesson
  api.route('/course/:slug/module/:module/lesson/:lesson')
    .get(di.invoke(getOneLesson))
    .delete(di.invoke(deleteLesson));
  
  // Create Drip
  api.route('/course/:slug/module/:module/lesson/:lesson/drip')
    .post(di.invoke(addDrip));
  
  // Edit Drips
  api.route('/course/:slug/module/:module/lesson/:lesson/drip/:drip')
    .put(di.invoke(updateDrip))
    .delete(di.invoke(deleteDrip));
    
  return api;
}