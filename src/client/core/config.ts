import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  
  public static linkedin = {
    client_id: generateConfig({ dev: 'adsf', prod: 'asdf' })
  };

  public static facebook = {
    client_id: generateConfig({ dev: 'asdf', prod: 'asdf' })
  };
}

function generateConfig({dev, prod}) {
  return APP_ENV === 'production' ? prod : dev;
}