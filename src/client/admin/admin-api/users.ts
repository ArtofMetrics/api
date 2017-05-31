// External Dependencies
import { Observable } from 'rxjs/Observable';

// AOM Dependencies
import { AomHTTPService } from 'client/core/aom-http.service';

// AOM Types
import {
  GetUsersResponse,
  EditRoleResponse, EditRoleRequestBody
} from 'server/api/admin/models';
import { IUser, Role } from 'server/dependencies/models/user/user.model';

export function usersApi(API_ROOT: string, http: AomHTTPService) {
  const BASE_URL = `${API_ROOT}/users`;

  return {
    getUsers(): Observable<GetUsersResponse> {
      return http.get(BASE_URL);
    },
    editRole({ user, role, remove }: { user: IUser, role?: Role, remove?: boolean }): Observable<EditRoleResponse> {
      const data: EditRoleRequestBody = { role, remove };
      return http.put(`${ BASE_URL }/${ user._id }/role`, data);
    },
  };
}