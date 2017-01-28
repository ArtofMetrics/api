// NPM Deps
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';

// Interfaces
import { RegistrationParams } from 'shared/interfaces/user-registration.model';

export function authApi(API_ROOT: string, http: Http, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/auth`;
  return {
    
    getMe(): Promise<{ user?: any }> {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${ jwtService.getToken() }`);
      return http
        .get(BASE_URL, { headers })
        .toPromise()
        .then(result => result.json())
    },

    register(params: RegistrationParams): Promise<{ user: any }> {
      console.log('registering')
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