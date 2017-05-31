// NPM Deps
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// AOM Deps
import { ApiService } from 'client/core/api/api.service';
import { JWTService } from 'client/core/jwt.service';
import { AomHTTPService } from 'client/core/aom-http.service';
import { usersApi } from './users';

@Injectable()
export class AdminApiService {
  constructor(
    private apiService: ApiService,
    private aomHttp: AomHTTPService
  ) {}

  private API_ROOT: string = `${ this.apiService.API_ROOT }/admin`;

  public users = usersApi(this.API_ROOT, this.aomHttp);
}