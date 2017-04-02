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

export function getOneLesson($Course: Model<any>, $customError: CustomErrorService) {
  return async (req, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const module = course.data.modules.id(req.params.module);
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

      res.json({ data: { lesson } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

export function addDrip($Course: Model<any>, $customError: CustomErrorService) {
  return async (req, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      checkAuthorizedInstructor({ course, user: req.user });

      const moduleIdx = findWithinMongooseArrayOrThrow(course.data.modules, req.params.module, 'module');
      const lessonIdx = findWithinMongooseArrayOrThrow(course.data.modules[moduleIdx].lessons, req.params.lesson, 'lesson');

      const op = { $addToSet: {} };
      const pathToDrips = `data.modules.${moduleIdx}.lessons.${lessonIdx}.drips`;
      op.$addToSet[pathToDrips] = { isVisible: false, title: 'Incomplete Drip' };

      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });

      const drips = update.get(pathToDrips);
      console.log('drips', drips);
      res.json({ data: { drips } });
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

      const moduleIdx = findWithinMongooseArrayOrThrow(course.data.modules, req.params.module, 'module');
      const lessonIdx = findWithinMongooseArrayOrThrow(course.data.modules[moduleIdx].lessons, req.params.lesson, 'lesson');
      // const dripidx = findWithinMongooseArrayOrThrow(course.data.modules[moduleIdx].lessons[lessonIdx].drips, req.params.drip, 'drip');
      const op = { $pull: { } };
      const pathToDrips = `data.modules.${moduleIdx}.lessons.${lessonIdx}.drips`;
      op.$pull[pathToDrips] = { _id: req.params.drip };

      const update = await $Course
        .findByIdAndUpdate(course._id, op, { new: true })
        .setOptions({ skipVisibility: true });
      
      const drips = update.get(pathToDrips);

      res.json({ data: { drips } });

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
