// External Dependencies
import { Observable } from 'rxjs/Observable';

// AOM Dependencies
import { AomHTTPService } from 'client/core/aom-http.service';

// AOM Interfaces
import { GetOneCourseResponse} from 'server/api/students/models';

export function students(API_ROOT: string, http: AomHTTPService) {
  const BASE_URL = `${ API_ROOT }/students`;

  return {
    getCourseBySlug({ slug }: { slug: string }): Observable<GetOneCourseResponse> {
      return http
        .get(`${ BASE_URL }/course/${ slug }`);
    }
  };
}