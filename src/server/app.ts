import * as express from 'express';

export function app(injector) {
  const app = express();

  
  app.use('/', (req: express.Request, res: express.Response) => {
    res.json({ hello: 'hi' });
  });
  
  return app;
}