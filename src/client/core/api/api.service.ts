// NPM Deps
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// AOM Deps
import { JWTService } from 'client/core/jwt.service';
import { AomHTTPService } from 'client/core/aom-http.service';

import { authApi } from './auth';
import { courses } from './courses';
import { instructors } from './instructors';
import { students } from './students';

@Injectable()
export class ApiService {
  public API_ROOT: string = '/api/v1';

  constructor(private aomHttp: AomHTTPService, private jwtService: JWTService) {}

  public auth = authApi(this.API_ROOT, this.aomHttp, this.jwtService);
  public courses = courses(this.API_ROOT, this.aomHttp, this.jwtService);
  public instructors = instructors(this.API_ROOT, this.aomHttp, this.jwtService);
  public students = students(this.API_ROOT, this.aomHttp);
}