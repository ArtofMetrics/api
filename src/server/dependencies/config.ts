import { Service } from 'typedi';

@Service()
export class Config {
  log = {
    dev: false
  };

}