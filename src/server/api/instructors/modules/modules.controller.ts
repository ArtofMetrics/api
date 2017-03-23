// External Deps
import { Model } from 'mongoose';
import { Response } from 'express';

// AOM Deps
import { CustomErrorService } from '../../../dependencies/custom-error.service';
import { findCourseOrThrow } from '../find-helpers';

// AOM Interfaces
import { AddModuleRequest } from './models';

export function addModule($Course: Model<any>, $customError: CustomErrorService, $Module: Model<any>) {
  return async (req: AddModuleRequest, res: Response) => {
    try {
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, $customError });

      const newModule = new $Module({
        name: req.body.module.name,
        description: req.body.module.description,
        isVisible: false
      })

      const update = await $Course
        .findByIdAndUpdate(
          course._id, 
          { $addToSet: { 'data.module': newModule } },
          { new: true })
        .setOptions({ skipVisibility: true })
      
      res.json({ data: { course: update } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}