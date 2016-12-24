import * as express from 'express';

import { Routes } from './routes';

export function AuthRouter(di) {
  const api: express.Router = express.Router();
  const AuthRoutes = new Routes(di);

  // AuthRoutes.getMe();
  api.use('/me', AuthRoutes.getMe);
  return api;
}