// NPM Deps
import { Request } from 'express';

// Our Deps
import { AuthenticatedRequest } from '../models';

/**
 * Login Params
 */
export interface LoginEmailRequest {
  email: string;
  password: string;
}

export interface LoginEmailRequestBody extends AuthenticatedRequest {
  body: LoginEmailRequest;
}

export interface LoginEmailResponse {
  data: {
    user: any;
    token?: string;
  };
}

/**
 * Registration Params
 */

export interface RegistrationEmailRequest {
  doc: any;

  password: string;

  confirmPassword: string;
}

export interface RegistrationEmailRequestBody extends AuthenticatedRequest {
  body: RegistrationEmailRequest;
}

export interface RegistrationEmailResponse {
  user: any;
  token: string;
}

// Get Credit Cards

export interface StripeCard {
  last4: string;
  exp_month: string;
  exp_year: string;
  id: string;
}

export interface GetCreditCardsRequest extends AuthenticatedRequest {

}

export interface GetCreditCardsResponse {
  cards: StripeCard[];
}