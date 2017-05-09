// External Deps
import { Model } from 'mongoose';
import { Response } from 'express';
import * as status from 'http-status';
import * as findIndex from 'lodash/findIndex';
import * as find from 'lodash/find';
import * as omit from 'lodash/omit';
import * as get from 'lodash/get';

// AOM Deps
import { CustomErrorService } from '../../../dependencies/custom-error.service';
import { findCourseOrThrow } from '../find-helpers';
import { checkAuthorizedInstructor } from '../permissions-helpers';

// AOM Interfaces
import { HTTPResponse } from '../../models';

import {
  AddModuleRequest,
  AddModuleResponse,
  GetOneModuleRequest,
  GetOneModuleResponse,
  AddNewLessonRequest,
  AddNewLessonResponse
} from './models';

export function addModule($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: AddModuleRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      checkAuthorizedInstructor({ course, user: req.user });

      const newModule = {
        name: req.body.module.name,
        description: req.body.module.description,
        isVisible: false
      };

      const update = await $Course
        .findByIdAndUpdate(
        course._id,
        { $addToSet: { [`data.modules.${req.body.language}`]: newModule } },
        { new: true })
        .setOptions({ skipVisibility: true })

      const data: HTTPResponse<AddModuleResponse> = { data: { course: update, language: req.body.language } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function getOneModule($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: GetOneModuleRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      checkAuthorizedInstructor({ course, user: req.user });

      console.log('req.query', req.originalUrl);
      const module = findModule({ course, moduleId: req.params.module, $customError, language: req.query.language });

      const courseData = omit(course.toObject(), ['data.modules'])
      const data: HTTPResponse<GetOneModuleResponse> = { data: { course: courseData, module } };

      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function addNewLesson($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: AddNewLessonRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      checkAuthorizedInstructor({ course, user: req.user });

      const modules = course.data.modules[req.body.language];
      const moduleIdx = findIndex(modules, m => m._id.toString() === req.params.module);

      if (moduleIdx === -1) {
        $customError.defaultError({ error: `Could not find module ${req.params.module}`, code: status.NOT_FOUND });
      }

      const newLesson = {
        name: get(req, 'body.lesson.name') || `Lesson ${modules[moduleIdx].lessons.length + 1}`,
        isVisible: false
      };

      const op = {
        $addToSet: {
          [`data.modules.${req.body.language}.${moduleIdx}.lessons`]: newLesson
        }
      };
      
      
      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });

      const data: HTTPResponse<AddNewLessonResponse> = {
        data: {
          lessons: update.data.modules[req.body.language][moduleIdx].lessons,
          language: req.body.language
        }
      };

      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function deleteLesson($Course: Model<any>, $customError: CustomErrorService) {
  return async (req, res) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      checkAuthorizedInstructor({ course, user: req.user });
      
      $customError.defaultError({ 
        readableError: `Need to figure out delete`,
        error: `need to figure out delete`,
        code: status.BAD_REQUEST });

      const moduleIdx = findIndex(course.data.modules, m => m._id.toString() === req.params.module);

      if (moduleIdx === -1) {
        $customError.defaultError({ error: `Could not find module ${req.params.module}`, code: status.NOT_FOUND });
      }

      const op = { $pull: {} };
      op.$pull[`data.modules.${moduleIdx}.lessons`] = { _id: req.params.lesson };

      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });

      res.json({ data: { lessons: update.data.modules[moduleIdx].lessons } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

function findModule({ course, moduleId, $customError, language }: { course: any, moduleId: string, $customError: CustomErrorService, language: string }) {
  const module = find(course.data.modules[language],
    (m: any) => m._id.toString() === moduleId);

  if (!module) {
    $customError.defaultError({
      error: `Could not find module with id ${moduleId}`,
      code: status.NOT_FOUND
    });
  }

  return module;
}