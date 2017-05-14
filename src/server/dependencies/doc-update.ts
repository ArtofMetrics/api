'use strict';
import * as _ from 'lodash';
import * as StandardError from 'standard-error';
import * as status from 'http-status';

export function DocUpdate() {
  function getChanges(obj : any) : any[] {
    const updates = [];
    const getPathAndValues = function(obj : any, path?: string) {
      for (let p in obj) {
        if (Object.prototype.toString.call(obj[p]) === '[object Object]') {
          getPathAndValues(obj[p], (path ? path + p : p) + '.');
        } else {
          updates.push({path: (path ? path + p : p), value: obj[p]});
        }
      }
    };

    getPathAndValues(obj);
    return updates;
  }

  return function applyChanges(obj : any, update : any, allowedPaths : RegExp[]) : any {
    // do not allow blindly applying changes
    if (!allowedPaths || !allowedPaths.length) {
      throw new StandardError('You must pass in a whitelist to use docUpdate. Blindly applying changes is not supported',
        { code: status.INTERNAL_SERVER_ERROR });
    }

    const updates = getChanges(update)
      .filter(function(u) {
        return _.some(allowedPaths, (p: RegExp) => p.test(u.path));
      });
    _.each(updates, function(update, updateKey) {
      obj.set(update.path, update.value);
      obj.markModified(update.path);
    });
    return obj;
  };
};
