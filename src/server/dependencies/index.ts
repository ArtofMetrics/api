// NPM Deps
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// AOM Deps
import { config, Config } from './config';
import { CustomErrorService } from './custom-error.service';
import { db } from './db';
import { AuthenticationService } from './authentication';
import * as wagner from 'wagner-core';
import { stripeService } from './stripe';
import { createSubscriptionService } from './subscription';
import { createPaymentService } from './payment';

export function dependencies() {
  const di = wagner.module('server.api');

  // Custom Error
  di.factory('$customError', function () {
    return new CustomErrorService()
  });

  // Config
  di.factory('$config', function() {
    return config()
  });

  // Mongoose db
  di.factory('db', function($config) {
    return mongoose.createConnection($config.database.uri);
  });

  di.factory('$authentication', function($customError: CustomErrorService, $User, $config, $Password) {
    return new AuthenticationService($customError, $User, $config, $Password);
  });

  di.factory('$stripe', stripeService);

  di.factory('$subscription', createSubscriptionService);
  di.factory('$payment', createPaymentService);
  
  db(di);

  return di;
};
