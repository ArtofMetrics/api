import * as express from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { Config } from './dependencies/config';

export function app(Container) {
  const app = express();

  const config: Config = Container.get(Config);
  if (config.log.dev) {
    app.use(morgan('combined'));
  }

  app.get('/', (req: express.Request, res: express.Response) => {
    const indexPath: string = `dist/index.html`;
    const encodeType: string = `utf-8`;
    const html = fs.readFile(indexPath, encodeType, (err: Error, result: string) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.send(result);
    });
  });

  return app;
}