// NPM Deps
import * as express from 'express';
import * as StandardError from 'standard-error';
import { inspect } from 'util';

export class CustomErrorService {
  
  public httpError(res: express.Response) {
    return (error: any) => {
      console.error(error);
      // if (error.stack) {
      //   console.error(`Error: ${ error }\n${ error.stack }`)
      // } else {
      //   console.error(error);
      // }
      const formatted = error;
      formatted.ok = false;
      res.json({ data: formatted });
    }
  }

  public defaultError(obj: { error: Error | string, readableError?: string, code?: number}) {
    throw new StandardError(obj);
  }
}