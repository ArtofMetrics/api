// External Deps
import { Model } from 'mongoose';
import { Response } from 'express';
import * as StandardError from 'standard-error';
import * as status from 'http-status';
import * as findIndex from 'lodash/findIndex';

// AOM Deps
import { CustomErrorService } from '../../../dependencies/custom-error.service';
import { findCourseOrThrow } from '../find-helpers';
import { checkAuthorizedInstructor } from '../permissions-helpers';

// AOM Interfaces
import { Course } from '../../../dependencies/models/course/course';
import { HTTPResponse } from '../../models';
import {
  GetOneLessonRequest, GetOneLessonResponse,
  AddDripRequest, AddDripResponse,
  UpdateDripRequest, UpdateDripResponse,
  UpdateLessonRequest, UpdateLessonResponse
} from './models';

export function getOneLesson($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: GetOneLessonRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const module = course.getModule(req.params.module, req.query.language);
      if (!module) {
        throw new StandardError({
          error: `Could not find module ${req.params.module}`,
          code: status.NOT_FOUND
        });
      }

      const lesson = module.lessons.id(req.params.lesson);
      if (!lesson) {
        throw new StandardError({
          error: `Could not find lesson ${req.params.lesson}`,
          code: status.NOT_FOUND
        });
      }

      const data: HTTPResponse<GetOneLessonResponse> = {
        data: {
          lesson,
          language: req.query.language
        }
      };

      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function addDrip($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: AddDripRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const { language } = req.body;
      const modules = course.data.modules[language];
      const moduleIdx = findWithinMongooseArrayOrThrow(
        modules,
        req.params.module,
        'module');
      const lessonIdx = findWithinMongooseArrayOrThrow(
        modules[moduleIdx].lessons,
        req.params.lesson,
        'lesson');

      const pathToDrips = `data.modules.${language}.${moduleIdx}.lessons.${lessonIdx}.drips`;
      const op = {
        $addToSet: {
          [pathToDrips]: {
            isVisible: false, title: 'Incomplete Drip'
          }
        }
      };

      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });

      const drips = update.get(pathToDrips);

      const data: HTTPResponse<AddDripResponse> = { data: { drips, language: req.body.language } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function deleteDrip($Course: Model<any>, $customError: CustomErrorService) {
  return async (req, res) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const { language } = req.params;
      const modules = course.data.modules[language];
      const moduleIdx = findWithinMongooseArrayOrThrow(modules, req.params.module, 'module');
      const lessonIdx = findWithinMongooseArrayOrThrow(modules[moduleIdx].lessons, req.params.lesson, 'lesson');
      const op = { $pull: {} };
      const pathToDrips = `data.modules.${ language }.${ moduleIdx }.lessons.${lessonIdx}.drips`;
      op.$pull[pathToDrips] = { _id: req.params.drip };

      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });

      const drips = update.get(pathToDrips);

      res.json({ data: { drips, language } });

    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function updateDrip($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: UpdateDripRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const { language } = req.body;
      const modules = course.data.modules[language];
      const moduleIdx = findWithinMongooseArrayOrThrow(modules, req.params.module, 'module');
      const lessonIdx = findWithinMongooseArrayOrThrow(modules[moduleIdx].lessons, req.params.lesson, 'lesson');
      const dripIdx = findWithinMongooseArrayOrThrow(modules[moduleIdx].lessons[lessonIdx].drips, req.body.drip._id, 'drip');
      const op = {};

      const pathToDrip = `data.modules.${ language }.${moduleIdx}.lessons.${lessonIdx}.drips.${dripIdx}`;
      op[pathToDrip] = req.body.drip;

      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });

      const updatedDrip = update.get(pathToDrip);

      const data: HTTPResponse<UpdateDripResponse> = {
        data: { drip: updatedDrip, language }
      };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function updateLesson($customError: CustomErrorService, $Course: Model<any>) {
  return async (req: UpdateLessonRequest, res: Response) => {
    try {

      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const { language, lesson } = req.body;
      const modules = course.data.modules[language];
      const moduleIdx = findWithinMongooseArrayOrThrow(modules, req.params.module, 'module');
      const lessonIdx = findWithinMongooseArrayOrThrow(modules[moduleIdx].lessons, req.params.lesson, 'lesson'); 

      
      const updateOp = {
        [`data.modules.${ language }.${ moduleIdx }.lessons.${ lessonIdx }.difficulty`]: lesson.difficulty,
        [`data.modules.${ language }.${ moduleIdx }.lessons.${ lessonIdx }.timeToComplete`]: lesson.timeToComplete
      };
      
      const update = await $Course
        .findByIdAndUpdate(course._id, updateOp, { new: true })
        .setOptions({ skipVisibility: true });

      const data: HTTPResponse<UpdateLessonResponse> = { data: { lesson: update } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

function findWithinMongooseArrayOrThrow(arr: any[], id: string, elemName: string): number {
  const idx = findIndex(arr, (m: any) => m._id.toString() === id);
  if (idx === -1) {
    throw new StandardError({
      error: `Could not find ${elemName} ${id}`,
      code: status.NOT_FOUND
    });
  }

  return idx;
}
