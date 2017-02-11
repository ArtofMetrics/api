// NPM Deps
import * as mongoose from 'mongoose';
import { each } from 'lodash';
import * as pluralize from 'pluralize';

// AOM Deps
import { models } from './models';

export function db(di) {
  di.invoke(function(db) {
    each(models, (schema, name) => {
      const model = db.model(name, schema);
      di.factory(`$${ name }`, function() {
        return model;
      });
    });
  });
}