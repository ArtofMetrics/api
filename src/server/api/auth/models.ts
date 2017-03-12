// NPM Deps
import { Request } from 'express';

// Our Deps
import { AuthenticatedRequest } from '../interfaces/authenticated-request.model';

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