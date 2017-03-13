// NPM Deps
import { Observable } from 'rxjs/Observable';

// AOM Deps
import {JWTService } from 'client/core/jwt.service';
import { AomHTTPService } from 'client/core/aom-http.service';
import { extractData } from 'client/core/api/helpers';

// AOM Models
import { CreateCourseResponse, GetOneCourseResponse } from 'server/api/courses/models';

export function courses(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/courses`;

  return {

    getCourse({ id }: { id: string }): Observable<GetOneCourseResponse> {
      return http
        .get(`${ BASE_URL }/${ id }`);
    },

    getCourses(searchParams?: any): Observable<any[]> {
      return http
        .get(BASE_URL)
        .map(data => data.courses);
    },

    createCourse({ course }): Observable<CreateCourseResponse> {
      return http
        .post(BASE_URL, { course });
    }
  }
}