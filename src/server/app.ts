import * as express from 'express';


export class App {
  constructor(private app = express()) {
  }

  public init(injector) {
    this.app.use('/', (req: express.Request, res: express.Response) => {
      res.json({ hello: 'hi' })
    });
  }
}

// export function app(injector) {
//   const app = express();

  
//   app.use('/', (req: express.Request, res: express.Response) => {
//     res.json({ hello: 'hi' });
//   });
  
//   return app;
// }