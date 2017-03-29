// External Deps
import { Model } from 'mongoose';
import { Response } from 'express';
import * as status from 'http-status';
import * as findIndex from 'lodash/findIndex';
import * as find from 'lodash/find';

// AOM Deps
import { CustomErrorService } from '../../../dependencies/custom-error.service';
import { findCourseOrThrow } from '../find-helpers';
import { checkAuthorizedInstructor } from '../permissions-helpers';

// AOM Interfaces
import { HTTPResponse } from '../../models';

import { AddModuleRequest, AddModuleResponse, GetOneModuleRequest, GetOneModuleResponse } from './models';

export function addModule($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: AddModuleRequest, res: Response) => {
    try {
      console.log('params.slug', req.params);
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
          { $addToSet: { 'data.modules': newModule } },
          { new: true })
        .setOptions({ skipVisibility: true })
      
      const data: HTTPResponse<AddModuleResponse> = { data: { course: update } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function getOneModule($Course: Model<any>, $Lesson: Model<any>, $customError: CustomErrorService) {
  return async (req: GetOneModuleRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });
      
      checkAuthorizedInstructor({ course, user: req.user });
      
      const moduleIdx = findIndex(course.modules, (m: any) => m._id.toString() === req.params.module));

      if (moduleIdx === -1) {
        $customError.defaultError({
          error: `Could not find module with id ${ req.params.module }`,
          code: status.NOT_FOUND
        });
      }
      
      const lessons = await $Lesson
        .find({ _id: { $in: course.modules[moduleIdx].lessons } })
        .setOptions({ skipVisibility: true });
      
      course.module[moduleIdx].lessons = course.module[moduleIdx].lessons.map(lessonId => {
        const idStr = lessonId.toString();
        find(lessons, lesson => lesson._id.toString() === idStr);
      });
      
      const data: HTTPResponse<GetOneModuleResponse> = { data: { course } };

      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}