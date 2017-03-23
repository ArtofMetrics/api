// External Deps
import { Model } from 'mongoose';
import { Response } from 'express';

// AOM Deps
import { CustomErrorService } from '../../../dependencies/custom-error.service';
import { findCourseOrThrow } from '../find-helpers';

// AOM Interfaces
import { HTTPResponse } from '../../models';

import { AddModuleRequest, AddModuleResponse } from './models';

export function addModule($Course: Model<any>, $customError: CustomErrorService) {
  return async (req: AddModuleRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      const newModule = {
        name: req.body.module.name,
        description: req.body.module.description,
        isVisible: false
      };

      const update = await $Course
        .findByIdAndUpdate(
          course._id, 
          { $addToSet: { 'data.module': newModule } },
          { new: true })
        .setOptions({ skipVisibility: true })
      
      const data: HTTPResponse<AddModuleResponse> = { data: { course: update } };
      res.json(data);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}