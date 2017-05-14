// External Dependnecies
import { Injectable } from '@angular/core';

// AOM Dependencies
import { Config } from '../config';

@Injectable()
export class StripeService {
  stripe: any;
  
  constructor(
  ) {
    this.stripe = (window as any).Stripe(Config.stripe.apiKey);
  }

}