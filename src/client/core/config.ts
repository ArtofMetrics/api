import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  
  public static linkedin = {
    client_id: generateConfig({ dev: 'adsf', prod: 'asdf' })
  };

  public static facebook = {
    client_id: generateConfig({ dev: 'asdf', prod: 'asdf' })
  };

  public static stripe = {
    apiKey: generateConfig({ dev: `pk_test_MUsm4NzLIdnsMyrclQMTxSrv`, prod: `pk_live_w9Z3CAqGD5SAqRCtYtCD0L9o` })
  };
}

function generateConfig({dev, prod}) {
  return APP_ENV === 'production' ? prod : dev;
}