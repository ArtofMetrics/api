import * as express from 'express';

import { Routes } from './routes';

export function AuthRouter(di) {
  const api: express.Router = express.Router();
  const AuthRoutes = new Routes(di);

  /**
   * route: /api/auth/me
   */
  api.route('/me')
    .get(AuthRoutes.getMe);
    
  return api;
}