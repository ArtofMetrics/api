// NPM Deps
import { injectable } from 'stejar-di';
import * as express from 'express';
import * as StandardError from 'standard-error';

export class CustomErrorService {
  
  public httpError(error: any) {
    return (res: express.Response) => {
      res.json({ error });
    }
  }

  public defaultError(obj: { error: Error | string, readableError: string, code?: number}) {
    throw new StandardError(obj);
  }
}