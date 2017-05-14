// External Dependencies
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import * as slugify from 'speakingurl';
import { Model } from 'mongoose';

// AOM Dependencies

// Interfaces

export async function findCourseOrThrow({ $Course, slug, options }: { $Course: Model<any>, slug: string, options?: any }) {
  const course = await $Course
    .findOne({ slug })
    .setOptions(options);
  if (!course) {
    throw new StandardError(`Could not find course with slug ${ slug }`, { code: status.NOT_FOUND });
  }

  return course;
}

export async function createSlug(name: string, $Course: Model<any>) {
  const kebabName = slugify(name);
  const exists = await $Course.count({ slug: kebabName });
  if (!exists) {
    return kebabName;
  }
  
  return await ensureUniqueSlug(`${ kebabName }-1`, $Course);
}

/**
 * Non exported / Private methods
 */

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