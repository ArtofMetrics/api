// NPM Deps
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

// AOM Deps
import { AomHTTPService } from 'client/core/aom-http.service';
import { JWTService } from 'client/core/jwt.service';
import { extractData } from 'client/core/api/helpers';

// Interfaces
import { RegistrationParams } from 'shared/interfaces/user-registration.model';

export function authApi(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/auth`;
  return {
    authenticateOauth(code: string, type: string): Observable<{ user: any }> {
      return this.http
        .post(`${ BASE_URL }/register/email`, { code, type })
        .map(result => toObject(result, data => ({ user: data })))
        .catch(error => Observable.throw(error));
    },

    getMe(): Observable<{ user: any }> {
      return http
        .get(BASE_URL)
        .map(result => toObject(result, data => ({ user: data })))
        .catch(error => Observable.throw(error));
    },

    register(params: RegistrationParams): Observable<{ user: any }> {
      return http
        .post(`${ BASE_URL }/register/email`, params)
        .map(result => toObject(result, data => ({ user: data })))
        .catch(error => Observable.throw(error));
    }
  };

  function toObject(resp: Response, transformFunc?: (obj: any) => any) {
    const data = extractData(resp.json());
    return transformFunc ? transformFunc(data) : data;
  }
}