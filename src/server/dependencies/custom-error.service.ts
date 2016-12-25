// NPM Deps
import { injectable } from 'stejar-di';
import * as express from 'express';


export class CustomErrorService {
  
  public httpError(error: any) {
    return (res: express.Response) => {
      res.json({ error });
    }
  }
}