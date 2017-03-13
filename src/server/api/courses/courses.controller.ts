// NPM Deps
import * as express from 'express';
import * as StandardError from 'standard-error';
import * as kebabCase from 'lodash/kebabCase';
import * as slugify from 'slug';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';

// AOM Models
import { CreateCourseRequest, CreateCourseResponse } from './models';

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

export function createCourse($customError: CustomErrorService, $Course) {
  return async (req: CreateCourseRequest, res: express.Response) => {
    try {
      const { course } = req.body;
      if (!course) {
        throw new StandardError(`Course data is required to create new course`);
      }

      const data = req.body.course.data;
      let newCourse = {
        data,
        slug: await createSlug(data.name.toLowerCase(), $Course),
        admin: { readableId: (await $Course.count()) + 1 }
      };

      
      const doc = await $Course.create(newCourse);

      const responseBody: CreateCourseResponse = { course: doc.toObject({ virtuals: false }) };
      return res.json(responseBody);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  }
}

async function createSlug(name: string, $Course: any) {
  const kebabName = slugify(name);
  const exists = await $Course.count({ slug: kebabName });
  if (!exists) {
    return kebabName;
  }
  
  return await ensureUniqueSlug(`${ kebabName }-1`, $Course);
}

async function ensureUniqueSlug(slug: string, $Course: any) {
  const numWithSlug = await $Course.count({ slug });
  if (!numWithSlug) {
    return slug;
  }

  return await ensureUniqueSlug(incrementSlug(slug), $Course);
}

function incrementSlug(slug: string): string {
  const num = parseInt(slug[slug.length - 1], 10);
  return slug
    .split('')
    .slice(0, slug.length - 1)
    .concat([(num + 1).toFixed(0)])
    .join('');
}