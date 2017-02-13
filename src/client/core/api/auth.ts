// NPM Deps
import { AomHTTPService } from 'client/core/aom-http.service';
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';

// Interfaces
import { RegistrationParams } from 'shared/interfaces/user-registration.model';

export function authApi(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/auth`;
  return {
    authenticateOauth(code: string, type: string): Observable<{ user?: any }> {
      return this.http
        .post(`${ BASE_URL }/register/email`, { code, type });
    },

    getMe(): Promise<{ user?: any }> {
      return http
        .get(BASE_URL)
        .toPromise()
        .then(result => result.json())
    },

    register(params: RegistrationParams): Promise<{ user: any }> {
      return http
        .post(`${ BASE_URL }/register/email`, params)
        .toPromise()
        .then(result => result.json())
        .then(data => {
          console.log('DATA', data);
          return { user: data }
        })
    }
  };
}