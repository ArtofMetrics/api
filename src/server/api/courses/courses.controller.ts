// NPM Deps
import * as express from 'express';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';

export function getCourses($customError: CustomErrorService, $Course) {
  return async(req, res: express.Response) => {

    const SAMPLE_URL = 'http://lorempixel.com/400/200';
    try {
      const courses = [
        new $Course({
          slug: 'course-1',
          data: { title: 'Course 1', description: 'Random Description 1', category: 'Econ', photos: [{ url: SAMPLE_URL, isCover: true }] },
        }),
        new $Course({
          slug: 'course-2',
          data: { title: 'Course 2', description: 'Random Description 2', category: 'R', photos: [{ url: SAMPLE_URL, isCover: true }] }
        }),
        new $Course({
          slug: 'course-3',
          data: { title: 'Course 3', description: 'Random Description 3', category: 'R', photos: [{ url: SAMPLE_URL, isCover: true }] }
        })
      ];

      res.json({ data: { courses } });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}