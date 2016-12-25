// NPM Deps
import * as express from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { ServiceManager } from 'stejar-di';

// AOM Deps
import { Config } from './dependencies/config';
import { Api } from './api';

export function app(Container: ServiceManager) {
  const app = express();
  app.use(helmet());
  
  const config: any = Container.get('$config');
  
  if (config.log.dev) {
    app.use(morgan('combined'));
  }

  app.use(express.static('dist'));

  app.use(express.static('assets'))
  
  app.use('/api', Api(Container));

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