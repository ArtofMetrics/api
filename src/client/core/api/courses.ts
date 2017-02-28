// NPM Deps
import { Observable } from 'rxjs/Observable';

// AOM Deps
import {JWTService } from 'client/core/jwt.service';
import { AomHTTPService } from 'client/core/aom-http.service';
import { extractData } from 'client/core/api/helpers';

export function courses(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/courses`;

  return {
    getCourses(searchParams?: any): Observable<any[]> {
      return http
        .get(BASE_URL)
        .map(data => extractData(data).courses);
    }
  }
}