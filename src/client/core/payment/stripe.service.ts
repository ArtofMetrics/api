// External Dependnecies
import { Injectable } from '@angular/core';

// AOM Dependencies
import { Config } from '../config';

@Injectable()
export class StripeService {
  stripe: any;
  
  constructor(
    config: Config
  ) {
    this.stripe = (window as any).Stripe((config as any).stripe.apiKey);
  }

}