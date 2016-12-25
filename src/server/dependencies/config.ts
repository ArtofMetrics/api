import { injectable } from 'stejar-di';
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { defaultsDeep, cloneDeep } from 'lodash';

export interface Config {
  serve: string;

  log?: { 
    dev?: boolean;
    prod?: boolean;
  };

  database: { uri: string };

  users: { secret: string };

  ssl: {
    enabled: boolean;
    port: number;
  };

  domain: string;

}

export function config() {
  const CONFIG_PATH = process.env.CONFIG || 'dev.config.yml';

  const contents = yaml.safeLoad(fs.readFileSync(CONFIG_PATH, 'utf-8'));

  return recursiveMerge(contents, {
    serve: './dist',
    
    // DB Config
    database: {
      uri: `mongodb://localhost:27017/art-of-metrics`
    },

    // Auth Config
    users: {
      secret: 'fAn7aSmicH0rrorTaco'
    },

    // SSL
    ssl: {
      enabled: false,
      port: 3001,
    },

    // domain
    domain: `http://localhost:${ process.env.PORT }`
  });
}

function recursiveMerge(source, target: Config) {
  return defaultsDeep(source, target)
}