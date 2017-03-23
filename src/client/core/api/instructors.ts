// NPM Deps
import { Observable } from 'rxjs/Observable';

// AOM Deps
import { AomHTTPService } from 'client/core/aom-http.service';
import { JWTService } from 'client/core/jwt.service';

// AOM Interfaces
import { GetCoursesResponse, GetOneCourseResponse } from 'server/api/instructors/models';

export function instructors(API_ROOT: string, http: AomHTTPService, jwtService: JWTService) {
  const BASE_URL = `${ API_ROOT }/instructors`;

  return {
    getCourse({ slug }): Observable<GetOneCourseResponse> {
      return http
        .get(`${ BASE_URL }/course/${ slug }`);
    },

    getCourses(): Observable<GetCoursesResponse> {
      return http
        .get(`${ BASE_URL }/courses`);
    }
  };
}