// NPM Deps
import * as express from 'express';
import * as StandardError from 'standard-error';
import { inspect } from 'util';

export class CustomErrorService {
  
  public httpError(res: express.Response) {
    return (error: any) => {
      console.log('Error: ', error);
      const formatted = error;
      formatted.ok = false;
      res.status(error.code || 500).json({ data: formatted });
    }
  }

  public defaultError(obj: { error: Error | string, readableError?: string, code?: number}) {
    throw new StandardError(obj);
  }
}