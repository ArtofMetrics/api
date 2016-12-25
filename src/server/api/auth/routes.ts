// NPM Dependencies
import { ServiceManager, injectable } from 'stejar-di';
import * as express from 'express';

// AOM Deps
import { Config } from '../../dependencies/config';
import { CustomErrorService } from '../../dependencies/custom-error.service';


export class Routes {
  private config: Config;
  private customError: CustomErrorService;

  constructor(di) {
    const self = this;
    
    ['$config', '$customError']
      .forEach(dep => self[dep] = di.get(dep));
  }

  public async getMe(req: express.Request, res: express.Response) {
    const self = this;
    try {
      res.json({ success: true })
    } catch (error) {
      return self.customError.httpError(error)(res);
    }
  }
}