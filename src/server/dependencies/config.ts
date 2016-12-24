import { injectable } from 'stejar-di';

@injectable
export class Config {
  log = {
    dev: false
  };

}