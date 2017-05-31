// NPM Deps
import * as express from 'express';

// AOM Deps
import { Middleware } from '../middleware';

export function AdminRouter(di) {
  const api: express.Router = express.Router();

  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder);

  api.use(middleware.requireLogin);
  
  api.use(middleware.requireAdmin);


  return api;
}