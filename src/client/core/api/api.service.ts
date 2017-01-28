// NPM Deps
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';
import { authApi } from './auth';
import { courses } from './courses';

@Injectable()
export class ApiService {
  private API_ROOT: string = '/api/v1';

  constructor(private http: Http, jwtService: JWTService) {}

  public auth = authApi(this.API_ROOT, this.http, this.jwtService);
  public courses = courses(this.API_ROOT, this.http, this.jwtService);

}