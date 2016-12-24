import * as express from 'express';
import * as bodyParser from 'body-parser';

import { ServiceManager } from 'stejar-di';
// SixPlus Deps
import { AuthRouter } from './auth';

export function Api(di: ServiceManager) {
  const api = express.Router();
  api.use(bodyParser.json());
  
  api.use('/auth', AuthRouter(di));
  return api;
}