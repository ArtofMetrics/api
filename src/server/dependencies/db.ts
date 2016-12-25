// NPM Deps
import * as mongoose from 'mongoose';
import { each } from 'lodash';
import * as pluralize from 'pluralize';

// SixPlus Deps
import { models } from './models';

export function db(di) {
  each(models, (schema, name) => {
    di.bind(name, schema);
  });
}