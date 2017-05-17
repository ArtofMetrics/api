// NPM Deps
import * as express from 'express';

// AOM Deps
import { AuthController } from './auth.controller';
import { Middleware } from '../middleware';

export function AuthRouter(di) {
  const api: express.Router = express.Router();
  const AuthRoutes = new AuthController();

  const middleware = new Middleware(di);
  api.use(middleware.jwtDecoder);

  /**
   * route: /api/auth/me
   */
  api.route('/')
    .get(di.invoke(AuthRoutes.getMe));
  
  api.route('/register/email')
    .post(di.invoke(AuthRoutes.registerEmail));
  api.route('/login/email')
    .post(di.invoke(AuthRoutes.loginEmail));
    
  api.route('/cards')
    .get(di.invoke(AuthRoutes.getCreditCards));
    
  return api;
}