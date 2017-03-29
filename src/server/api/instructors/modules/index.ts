// External Deps
import { Router } from 'express';

// AOM Deps
import { addModule } from './modules.controller';

/**
 * BASE_URL = `/course/:slug/module
 * @param di
 */
export function modulesRouter(di): Router {
  const api = Router();

  api.route(`/`)
    .post(di.invoke(addModule));
  return api;
}