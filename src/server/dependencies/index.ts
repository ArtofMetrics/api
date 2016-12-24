import { ServiceManager } from 'stejar-di';
import { Config } from './config';

export function dependencies() {
  const di = new ServiceManager();

  // Config
  di.bind('config', new Config());

  return di;
}