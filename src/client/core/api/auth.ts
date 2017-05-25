// NPM Deps
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

// AOM Deps
import { AomHTTPService } from 'client/core/aom-http.service';
import { JWTService } from 'client/core/jwt.service';

// Interfaces
import { 
  RegistrationEmailRequest, 
  RegistrationEmailResponse, 
  LoginEmailRequest,
  LoginEmailResponse,
  GetCreditCardsResponse } from 'server/api/auth/models';

export function authApi(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/auth`;
  return {
    authenticateOauth(code: string, type: string): Observable<{ user: any }> {
      return this.http
        .post(`${ BASE_URL }/register/email`, { code, type })
        .catch(error => Observable.throw(error));
    },

    getMe(): Observable<{ user: any }> {
      return http
        .get(BASE_URL)
        .catch(error => Observable.throw(error));
    },

    register(params: RegistrationEmailRequest): Observable<RegistrationEmailResponse> {
      return http
        .post(`${ BASE_URL }/register/email`, params)
        .catch(error => Observable.throw(error));
    },

    authenticateEmail(params: LoginEmailRequest): Observable<LoginEmailResponse> {
      return http
        .post(`${ BASE_URL }/login/email`, params)
        .catch(error => Observable.throw(error));
    },

    getCreditCards(): Observable<GetCreditCardsResponse> {
      return http
        .get(`${ BASE_URL }/cards`);
    }
  };
}