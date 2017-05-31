// External Dependencies
import { Observable } from 'rxjs/Observable';

// AOM Dependencies
import { AomHTTPService } from 'client/core/aom-http.service';

// AOM Types

export function usersApi(API_ROOT: string, http: AomHTTPService) {
  const BASE_URL = `${ API_ROOT }/users`;

  return {
    getUsers() {
      return http.get(BASE_URL);
    }
  };
}