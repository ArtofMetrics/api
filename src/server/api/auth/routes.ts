// NPM Dependencies
import { ServiceManager, injectable } from 'stejar-di';
import * as express from 'express';

// SixPlus Deps
import { autoInject } from '../../utils';
import { Config } from '../../dependencies/config';


export class Routes {
  private config: Config;

  constructor(di) {
    const self = this;
    [{ name: 'config', type: Config }]
      .forEach(dep => self[dep.name] = di.get(dep));
  }

  public async getMe(req: express.Request, res: express.Response) {

    res.json({ success: true })
  }
}