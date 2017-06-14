// NPM Deps
import * as express from 'express';

// AOM Deps
import { Middleware } from '../middleware';
import { editRole, getUsers, getCoupons, createCoupon } from './routes';

export function AdminRouter(di) {
  const api: express.Router = express.Router();

  const middleware = new Middleware(di);

  api.use(middleware.jwtDecoder);

  api.use(middleware.requireLogin);

  api.use(middleware.requireAdmin);

  api.route('/users')
    .get(di.invoke(getUsers));
  
  api.route('/users/:id/role')
    .put(di.invoke(editRole));
  
  api.route(`/coupons`)
    .get(di.invoke(getCoupons))
    .post(di.invoke(createCoupon));

  return api;
}