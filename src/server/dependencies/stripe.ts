// External dependencies
const stripe = require('stripe');

// AOM dependencies
import { Config } from './config';

// AOM interfaces

export function stripeService($config: Config) {
  const s = stripe($config.stripe.secret);
  s.setApiVersion($config.stripe.apiVersion);
  return s;
}
