// NPM Deps
import * as mongoose from 'mongoose';
import { each } from 'lodash';
import * as pluralize from 'pluralize';

// AOM Deps
import { models } from './models';

export function db(di) {
  each(models, (schema, name) => {
    di.factory(`$${ name }`, function() {
      return schema;
    });
  });
}