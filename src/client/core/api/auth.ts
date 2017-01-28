// NPM Deps
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';

export function authApi(API_ROOT: string, http: Http, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/auth`;
  return {
    
    getMe(): Promise<{ user?: any }> {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${ jwtService.getToken() }`);
      return http
        .get(BASE_URL, { headers })
        .toPromise()
        .then(result => result.json());
    },

    register(doc ): Promise<{ user: any }> {
      return http
        .post(`${ BASE_URL }/register/email`, { doc })
        .toPromise()
        .then(result => result.json())
    }
  };
}