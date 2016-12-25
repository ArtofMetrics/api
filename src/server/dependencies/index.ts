import { ServiceManager } from 'stejar-di';
import { config } from './config';
import { CustomErrorService } from './custom-error.service';

export function dependencies() {
  const di = new ServiceManager();

  // Config
  di.bind('$config', config());

  di.bind('$customError', new CustomErrorService());
  return di;
}