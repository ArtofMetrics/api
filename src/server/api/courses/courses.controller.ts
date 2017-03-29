// NPM Deps
import * as express from 'express';
import * as StandardError from 'standard-error';
import * as kebabCase from 'lodash/kebabCase';
import * as some from 'lodash/some';
import * as slugify from 'slug';
import * as status from 'http-status';

// AOM Deps
import { CustomErrorService } from '../../dependencies/custom-error.service';
import { isInstructor, isInstructorOfCourse } from '../utils';

// AOM models
import { HTTPResponse } from '../models';
import { CreateCourseRequest, CreateCourseResponse, GetOneCourseResponse } from './models';

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
        admin: { readableId: (await $Course.count()) + 1 },
        instructors: [req.user._id]
      };

      
      const doc = await $Course.create(newCourse);

      const responseBody: CreateCourseResponse = { course: doc.toObject({ virtuals: false }) };
      return res.json({ data: responseBody });
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

export function getOneCourse($customError: CustomErrorService, $Course) {
  return async (req, res: express.Response) => {
    try {
      const options = { skipVisibility: isInstructor(req.user)}
      const course = await findCourseOrThrow({ $Course, slug: req.params.slug, options });

      const responseBody: HTTPResponse<GetOneCourseResponse> = { data: { course } };
      return res.json(responseBody);
    } catch (error) {
      return $customError.httpError(res)(error);
    }
  };
}

async function findCourseOrThrow({ $Course, slug, options }: { $Course: any, slug: string, options?: any }) {
  const course = await $Course
    .findOne({ slug })
    .setOptions(options);
  if (!course) {
    throw new StandardError(`Could not find course with slug ${ slug }`, { code: status.NOT_FOUND });
  }

  return course;

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